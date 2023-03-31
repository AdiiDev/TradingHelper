using Core.Services;
using Trades.Application.Interfaces;
using Trades.Domain.Models;
using Trades.Repository.Interfaces;

namespace Trades.Application.Services
{
    public class TradeService : BaseService<ITradeModelRepository, TradeModel>, ITradeService
    {
        public TradeService(ITradeModelRepository repository) : base(repository)
        {
        }
    }
}
