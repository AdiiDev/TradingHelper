using Core.Services;
using Trades.Application.Interfaces;
using Trades.Domain.Models;
using Trades.Repository.Interfaces;

namespace Trades.Application.Services
{
    public class TradingPairService : BaseService<ITradingPairModelRepository, TradingPairModel>, ITradingPairService
    {
        public TradingPairService(ITradingPairModelRepository repository) : base(repository)
        {
        }
    }
}
