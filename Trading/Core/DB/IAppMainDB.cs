using Core.UnitOfWork;

namespace Core.DB
{
    public interface IAppMainDB : IUnitOfWork
    {
        public void PrepareDB();
    }
}
