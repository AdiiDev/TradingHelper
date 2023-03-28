using Core.QueryCriteria;

namespace Core.Services
{
    // Special interface for MTool
    public interface IBaseServiceGenerator { }
    public interface IBaseService<T>: IBaseServiceGenerator where T : class
    {
        Task<string> AddOrUpdateAsync(T obj, bool log = true);
        string AddOrUpdate(T obj, bool log = true);
        Task<bool> DeleteAsync(int id);
        bool Delete(int id);
        Task DeleteAsync(T obj);
        void Delete(T obj);
        Task<T> GetByIdAsync(int id);
        T GetById(int id);
        long Count();
        Task<long> CountAsync();
        long Count(QuerySpecification<T> specification);
        Task<long> CountAsync(QuerySpecification<T> specification);
        IQueryable<T> Get(QuerySpecification<T> specification, int page = -1, int pageSize = -1, QuerySortSpecification<T> sortSpecification = null);
    }
}
