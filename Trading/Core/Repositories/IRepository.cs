namespace Core.Repositories
{
    public interface IRepositoryGenerator { }
    public interface IRepository<T> : IRepositoryGenerator, IReadRepository<T>, IWriteRepository<T> where T : class
    {
        
    }
}
