using Core.Services;
using Trades.Application.Interfaces;
using Trades.Domain.Models;
using Trades.Repository.Interfaces;

namespace Trades.Application.Services
{
    public class TradeConfirmationService : BaseService<ITradeConfirmationModelRepository, TradeConfirmationModel>, ITradeConfirmationService
    {
        public TradeConfirmationService(ITradeConfirmationModelRepository repository) : base(repository)
        {
        }
    }
}
