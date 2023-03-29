using Core.DB;
using Core.Repositories;
using Trades.Domain.Models;
using Trades.Repository.Interfaces;

namespace Trades.Repository.Repositories
{
    public class TradeConfirmationModelRepository : RepositoryBase<TradeConfirmationModel, IAppMainDB>, ITradeConfirmationModelRepository
    {
        public TradeConfirmationModelRepository(IAppMainDB unitOfWork) : base(unitOfWork)
        {
        }
    }
}
