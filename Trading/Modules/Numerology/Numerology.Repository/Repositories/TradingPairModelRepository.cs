using Core.DB;
using Core.Repositories;
using Trades.Domain.Models;
using Trades.Repository.Interfaces;

namespace Trades.Repository.Repositories
{
    public class TradingPairModelRepository : RepositoryBase<TradingPairModel, IAppMainDB>, ITradingPairModelRepository
    {
        public TradingPairModelRepository(IAppMainDB unitOfWork) : base(unitOfWork)
        {
        }
    }
}
