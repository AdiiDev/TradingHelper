using Core.DB;
using FluentNHibernate.Cfg;
using NHibernate;
using NHibernate.Dialect;
using NHibernate.Tool.hbm2ddl;

namespace Core.UnitOfWork
{
    /*
     IMPORTANT: This UnitOfWork allows us to use transaction for the whole API call but it also support non-transaction.
     See documentation for more information.
     */

    /// <summary>
    /// Main abstraction for UnitOfWork
    /// </summary>
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        /// <summary>
        /// Session factory. Must be called CreateSessionFactory to initailize session factory, otherwise session will be null
        /// </summary>
        private static ISessionFactory? sessionFactory = null;

        private static readonly Object _lockSessionFactory = new object();

        private NHibernate.Cfg.Configuration FluentConfiguration { get; set; } = new();

        /// <summary>
        /// Main transaction object for UOW pattern
        /// </summary>
        protected ITransaction? transaction;

        /// <summary>
        /// Main session for nhibernate connection with database
        /// </summary>
        protected ISession? session;

        /// <summary>
        /// Path to config that this object instance is using
        /// </summary>
        protected string ConfigPath { get; set; }

        /// <summary>
        /// Path to config that this object instance is using
        /// </summary>
        protected string ConnectionString { get; set; }

        /// <summary>
        /// Path to config that this object instance is using
        /// </summary>
        protected string DatabaseEngine { get; set; }

        /// <summary>
        /// Flag for updating schema
        /// </summary>
        protected bool UpdateSchema { get; set; }

        /// <summary>
        /// Cache expiration in seconds
        /// </summary>
        protected int CacheExpiration { get; set; }

        /// <summary>
        /// Returns whether the transaction to db is open
        /// </summary>
        public bool IsTransactionOpen { get; set; } = false;

        /// <summary>
        /// IDisposable flag helper
        /// </summary>
        private bool Disposed { get; set; } = false;

        /// <summary>
        /// UnifOfWorkBase constructor
        /// </summary>
        /// <param name="configPath">Path to nhibernate config file</param>
        /// <param name="updateSchema">If yes in the first creation of session factory nhibernate will update database based on loaded mapping. Only create and allert action.</param>
        /// <exception cref="ArgumentException">Throw when config path is null or empty</exception>
        /// <exception cref="FileNotFoundException">Throw when config in passed path is not found</exception>
        public UnitOfWork(string configPath, bool updateSchema)
        {
            if (string.IsNullOrEmpty(configPath))
                throw new ArgumentException("configPath to nhibernate configuration file is null or empty");
            if (!File.Exists(configPath))
                throw new FileNotFoundException("Could not find NHibernate config file");

            ConfigPath = configPath;
            UpdateSchema = updateSchema;
        }

        public UnitOfWork(string connectionString, string databaseEngine, bool updateSchema)
        {
            if (string.IsNullOrEmpty(connectionString))
                throw new ArgumentException("connectionString to nhibernate is null or empty");


            ConnectionString = connectionString;
            DatabaseEngine = databaseEngine;
            UpdateSchema = updateSchema;
        }

        /// <summary>
        /// This method create new session based on session facotory. Must be called after CreateSessionFactory
        /// </summary>
        protected virtual void CreateSession()
        {
            lock (_lockSessionFactory)
            {
                if (session is null)
                    session = sessionFactory!.OpenSession();
            }
        }

        public ISessionFactory GetSessionFactory()
        {
            return sessionFactory!;
        }

        /// <summary>
        /// This method create out SessionFactory. Can be overriden. YOU CAN RUN THIS ONLY ONCE
        /// </summary>
        public virtual void CreateSessionFactory(MappingFluentConfig mappingFluentConfig)
        {
            lock (_lockSessionFactory)
            {
                if (sessionFactory == null)
                {
                    var configuration = new NHibernate.Cfg.Configuration();

                    // A.K: I'm not sure if we should not encrypt/decode config file for security.
                    // I could not find any specific topis about encoding config, but i find some answers
                    // that if the file have the .config extencion then is automatically set as private

                    var logFilePathDirectory = AppDomain.CurrentDomain.BaseDirectory + "\\Logs";
                    var logFilePath = logFilePathDirectory +
                        "\\nhibernateUpdateOutput" + DateTime.Now.ToShortDateString() + "-" +
                        DateTime.Now.ToShortTimeString().Replace(":", "-") + ".log";

                    if (!string.IsNullOrEmpty(ConfigPath))
                    {
                        // Create config instance based on config file in passed path
                        configuration = configuration.Configure(ConfigPath);
                    }
                    if (!string.IsNullOrEmpty(ConnectionString))
                    {
                        configuration = configuration.DataBaseIntegration(db =>
                        {
                            if (DatabaseEngine == "MSSQL")
                                db.Dialect<MsSql2012Dialect>();
                            if (DatabaseEngine == "MYSQL")
                                db.Dialect<MySQL55Dialect>();
                            db.ConnectionString = ConnectionString;
                            db.BatchSize = 100; // ?
                        });
                    }

                    var fluentConfig = Fluently.Configure(configuration)
                                     .Mappings(m =>
                                     {
                                         for (int i = 0; i < mappingFluentConfig.MappingTypes.Count; i++)
                                         {
                                             m.FluentMappings.Add(mappingFluentConfig.MappingTypes[i]);
                                         }
                                         //mappingFluentConfig.MappingConfiguration;
                                     })
                                     .ExposeConfiguration(cfg =>
                                     {
                                         if (UpdateSchema)
                                         {
                                             if (!Directory.Exists(logFilePathDirectory))
                                                 Directory.CreateDirectory(logFilePathDirectory);
                                             using (var file = (File.Exists(logFilePath) ? File.OpenWrite(logFilePath) : File.Create(logFilePath)))
                                             {
                                                 using (var sw = new StreamWriter(file))
                                                 {
                                                     new SchemaUpdate(cfg).Execute(sw.WriteLine, true);
                                                 }
                                             }
                                         }
                                         else
                                             new SchemaUpdate(cfg).Execute(false, false);
                                     });
                    FluentConfiguration = fluentConfig.BuildConfiguration();

                    sessionFactory = fluentConfig.BuildSessionFactory();
                }
            }
        }

        public virtual object CreateNewInstance()
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// This method begin new transaction in our session. If session is null or is closed then this method handle recreating session
        /// </summary>
        public void BeginTransaction()
        {
            if (session is null || !session.IsOpen)
                CreateSession();

            transaction = session!.BeginTransaction();
            IsTransactionOpen = true;
        }

        /// <summary>
        /// This method commit all changes in transaction
        /// </summary>
        public void Commit()
        {
            try
            {
                if (transaction != null && transaction.IsActive)
                {
                    transaction.Commit();
                }

                transaction?.Dispose();
                session?.Dispose();

                IsTransactionOpen = false;
            }
            catch (Exception ex)
            {
                if (transaction != null && transaction.IsActive)
                {
                    transaction.Rollback();
                }

                transaction?.Dispose();
                session?.Dispose();

                IsTransactionOpen = false;

#pragma warning disable CA2200 // Rethrow to preserve stack details
                throw ex;
#pragma warning restore CA2200 // Rethrow to preserve stack details
            }
        }

        /// <summary>
        /// This method rollback all changes in transaction
        /// </summary>
        public void Rollback()
        {
            try
            {
                if (transaction != null && transaction.IsActive)
                {
                    transaction.Rollback();
                    transaction.Dispose();
                }

                if (session != null)
                    session.Dispose();

                IsTransactionOpen = false;
            }
            catch (Exception ex)
            {
                if (session != null)
                    session.Dispose();

                IsTransactionOpen = false;

#pragma warning disable CA2200 // Rethrow to preserve stack details
                throw ex;
#pragma warning restore CA2200 // Rethrow to preserve stack details
            }
        }

        /// <summary>
        /// Get nhibernate instance session
        /// </summary>
        /// <returns></returns>
        public ISession? GetSession()
        {
            CreateSession();
            return session;
        }

        /// <summary>
        /// Dispose method
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// Dispose 
        /// </summary>
        /// <param name="disposing"></param>
        protected virtual void Dispose(bool disposing)
        {
            if (Disposed)
                return;

            if (disposing)
            {
                if (transaction != null)
                    transaction!.Dispose();
                if (session != null)
                    session!.Dispose();
            }

            Disposed = true;
        }

        //TODO: Refactor this
        public void UpdateDB(MappingFluentConfig mappingFluentConfig)
        {
            var configuration = new NHibernate.Cfg.Configuration();

            var logFilePathDirectory = AppDomain.CurrentDomain.BaseDirectory + "\\Logs";
            var logFilePath = logFilePathDirectory +
                "\\nhibernateUpdateOutput" + DateTime.Now.ToShortDateString() + "-" +
                DateTime.Now.ToShortTimeString().Replace(":", "-") + ".log";

            // Create config instance based on config file in passed path
            if (!string.IsNullOrEmpty(ConfigPath))
            {
                // Create config instance based on config file in passed path
                configuration = configuration.Configure(ConfigPath);
            }
            if (!string.IsNullOrEmpty(ConnectionString))
            {
                configuration = configuration.DataBaseIntegration(db =>
                {
                    if (DatabaseEngine == "MSSQL")
                        db.Dialect<MsSql2012Dialect>();
                    if (DatabaseEngine == "MYSQL")
                        db.Dialect<MySQL55Dialect>();
                    db.ConnectionString = ConnectionString;
                    db.BatchSize = 100; // ?
                });
            }

            var fluentConfig = Fluently.Configure(configuration)
                                    .Mappings(m =>
                                    {
                                        for (int i = 0; i < mappingFluentConfig.MappingTypes.Count; i++)
                                        {
                                            m.FluentMappings.Add(mappingFluentConfig.MappingTypes[i]);
                                        }
                                        //mappingFluentConfig.MappingConfiguration;
                                    })
                                    .ExposeConfiguration(cfg =>
                                    {

                                        if (!Directory.Exists(logFilePathDirectory))
                                            Directory.CreateDirectory(logFilePathDirectory);
                                        using (var file = (File.Exists(logFilePath) ? File.OpenWrite(logFilePath) : File.Create(logFilePath)))
                                        {
                                            using (var sw = new StreamWriter(file))
                                            {
                                                new SchemaUpdate(cfg).Execute(sw.WriteLine, true);
                                            }
                                        }
                                    });
            var build = fluentConfig.BuildConfiguration();
            var factory = fluentConfig.BuildSessionFactory();
        }
    }
}
