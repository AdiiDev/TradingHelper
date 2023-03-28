using Core.QueryCriteria;

namespace Core.Repositories
{
    public interface IReadRepository<T> where T : class
    {
        Task<T> FindAsync(int entityId);
        Task<T> FindAsync(string entityId);
        Task<T> FindAsync(long entityId);

        T Find(int entityId);
        T Find(string entityId);
        T Find(long entityId);

        IQueryable<T> All();

        IQueryable<T> Find(QuerySpecification<T> predicate);
        IQueryable<T> Find(QuerySpecification<T> predicate, int pageNumber, int pageSize);
        IQueryable<T> Find(QuerySpecification<T> predicate, params QuerySortSpecification<T>[] sortSpecifications);
        IQueryable<T> Find(QuerySpecification<T> predicate, int pageNumber, int pageSize, params QuerySortSpecification<T>[] sortSpecifications);

        Task<long> CountAsync();
        Task<long> CountAsync(QuerySpecification<T> predicate);

        long Count();
        long Count(QuerySpecification<T> predicate);
    }
}
