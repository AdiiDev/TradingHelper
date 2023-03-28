using Core.DB;
using Core.UnitOfWork;
using Trading.Application;

namespace DatabaseContext
{
    public sealed class AppMainDB : UnitOfWork, IAppMainDB
    {
        public AppMainDB(string connectionString, string databaseEngine, bool updateSchema) : base(connectionString, databaseEngine, updateSchema)
        {
        }

        public void PrepareDB()
        {
            var map = new MappingFluentConfig("Trading");
            map.AddTradingModuleMapping();
            UpdateDB(map);
            CreateSessionFactory(map);
        }
    }
}