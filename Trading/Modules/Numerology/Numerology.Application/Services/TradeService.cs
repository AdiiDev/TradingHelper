using Core.BaseModels;
using Core.QueryCriteria;
using Core.Services;
using System.ComponentModel;
using Trades.Application.Interfaces;
using Trades.Application.Requests;
using Trades.Domain.Models;
using Trades.Repository.Interfaces;

namespace Trades.Application.Services
{
    public class TradeService : BaseService<ITradeModelRepository, TradeModel>, ITradeService
    {
        public TradeService(ITradeModelRepository repository) : base(repository)
        {
        }

        public TradeModel AddOrUpdate(TradeModel obj)
        {
            if (!(obj is IBaseModel<TradeModel>))
                throw new ArgumentException("Passed object does not implement IBaseModel");

            if (((IBaseModel<TradeModel>)obj).Id > 0)
            {
                var objInDB = GetById(((IBaseModel<TradeModel>)obj).Id);


                objInDB = (TradeModel)(((IBaseModel<TradeModel>)objInDB).CopyFrom(obj));

                _repository.Save(objInDB);
                _repository.Flush();

                return objInDB;
            }
            _repository.Save(obj);
            _repository.Flush();

            return obj;
        }

        public Tuple<List<TradeModel>, long> GetTrades(TradesFilterRequest filter)
        {
            var spec = new QuerySpecification<TradeModel>(x => x.BrokerAccountId == filter.BrokerId);

            if (filter.DateFrom.HasValue)
                spec &= new QuerySpecification<TradeModel>(x => x.StartTrade >= filter.DateFrom.Value);
            if (filter.DateTo.HasValue)
                spec &= new QuerySpecification<TradeModel>(x => x.StartTrade <= filter.DateTo.Value);
            if (filter.TradingPairs.Count > 0)
                spec &= new QuerySpecification<TradeModel>(x => filter.TradingPairs.Contains(x.TradingPairId));
            if (filter.Confirmations.Count > 0)
                spec &= new QuerySpecification<TradeModel>(x => x.Confirmations.Any(y => filter.Confirmations.Contains(y.ConfirmationId)));
            if (filter.NumberOfConfirmations.HasValue)
                spec &= new QuerySpecification<TradeModel>(x => x.Confirmations.Count >= filter.NumberOfConfirmations.Value);
            if (filter.Profit.HasValue)
                spec &= new QuerySpecification<TradeModel>(x => x.ProfitLoos >= filter.Profit.Value);
            if (filter.Loos.HasValue)
                spec &= new QuerySpecification<TradeModel>(x => x.ProfitLoos <= filter.Loos.Value);
            if (filter.OnlyProfit.HasValue)
                spec &= new QuerySpecification<TradeModel>(x => x.ProfitLoos > 0);
            if (filter.OnlyLoss.HasValue)
                spec &= new QuerySpecification<TradeModel>(x => x.ProfitLoos < 0);

            var sort = new QuerySortSpecification<TradeModel>(x => x.StartTrade, ListSortDirection.Descending);

            var count = base.Count(spec);
            var result = base.Get(spec, filter.Page ?? -1, filter.PageSize ?? -1, sort).ToList();

            return Tuple.Create(result, count);
        }
    }
}
