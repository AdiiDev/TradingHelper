using Core.BaseModels;

namespace Trades.Domain.Models
{
    public class TradingPairModel : IBaseModel<TradingPairModel>
    {
        public virtual int Id { get; set; }
        public virtual string Symbol { get; set; }
        public virtual bool Favourite { get; set; }

        public virtual TradingPairModel CopyFrom(TradingPairModel newObject)
        {
            Symbol = newObject.Symbol;
            Favourite = newObject.Favourite;

            return this;
        }
    }
}
