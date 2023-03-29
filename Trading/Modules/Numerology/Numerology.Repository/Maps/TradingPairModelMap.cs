using FluentNHibernate.Mapping;
using Trades.Domain.Models;

namespace Trades.Repository.Maps
{
    public class TradingPairModelMap : ClassMap<TradingPairModel>
    {
        public TradingPairModelMap()
        {
            Table("TradingPairs");
            Id(x => x.Id).GeneratedBy.Identity();
            Map(x => x.Symbol).Not.Nullable().Length(16);
            Map(x => x.Favourite).Not.Nullable();
        }
    }
}
