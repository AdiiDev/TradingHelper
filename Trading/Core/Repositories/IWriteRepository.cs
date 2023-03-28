using Core.QueryCriteria;

namespace Core.Repositories
{
    public interface IWriteRepository<T> where T : class
    {
        Task SaveAsync(T entity);
        Task SaveAsync(IEnumerable<T> entities);

        void Save(T entity);
        void Save(IEnumerable<T> entities);
        void SaveBulk(IList<T> entities);
        void SaveBulk(T[] entities);

        Task RemoveAsync(T entity);
        Task RemoveAsync(IEnumerable<T> entities);
        Task RemoveAsync(QuerySpecification<T> predicate);

        void Remove(T entity);
        void Remove(IEnumerable<T> entities);
        void Remove(QuerySpecification<T> predicate);

        Task<object> ExecuteCommandAsync(string command);

        Task FlushAsync();
        void Flush();
    }
}
