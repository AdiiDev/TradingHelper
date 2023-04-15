using Core.Services;
using Trades.Application.Requests;
using Trades.Domain.Models;

namespace Trades.Application.Interfaces
{
    public interface ITradeService : IBaseService<TradeModel>
    {
        TradeModel AddOrUpdate(TradeModel obj);
        Tuple<List<TradeModel>, long> GetTrades(TradesFilterRequest filter);
    }
}
