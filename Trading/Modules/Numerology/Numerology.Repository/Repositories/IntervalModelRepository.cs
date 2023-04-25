using Core.DB;
using Core.Repositories;
using Trades.Domain.Models;
using Trades.Repository.Interfaces;

namespace Trades.Repository.Repositories
{
    public class IntervalModelRepository : RepositoryBase<IntervalModel, IAppMainDB>, IIntervalModelRepository
    {
        public IntervalModelRepository(IAppMainDB unitOfWork) : base(unitOfWork)
        {
        }
    }
}
