using Core.DB;
using NHibernate;

namespace Core.UnitOfWork
{
    public interface IUnitOfWork
    {
        bool IsTransactionOpen { get; set; }

        void BeginTransaction();

        void Commit();

        void Rollback();

        ISession? GetSession();

        object CreateNewInstance();

        ISessionFactory GetSessionFactory();
        void CreateSessionFactory(MappingFluentConfig mappingFluentConfig);
        void UpdateDB(MappingFluentConfig mappingFluentConfig);
    }
}
