using Core.DB;
using Core.Repositories;
using Trades.Domain.Models;
using Trades.Repository.Interfaces;

namespace Trades.Repository.Repositories
{
    public class TradeModelRepository : RepositoryBase<TradeModel, IAppMainDB>, ITradeModelRepository
    {
        public TradeModelRepository(IAppMainDB unitOfWork) : base(unitOfWork)
        {
        }
    }
}
