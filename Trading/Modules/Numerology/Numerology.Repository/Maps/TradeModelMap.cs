using FluentNHibernate.Mapping;
using Trades.Domain.Models;

namespace Trades.Repository.Maps
{
    public class TradeModelMap : ClassMap<TradeModel>
    {
        public TradeModelMap()
        {
            Table("Trades");
            Id(x => x.Id).GeneratedBy.Identity();
            Map(x => x.TradeConsistentStrategy).Not.Nullable();
            Map(x => x.Note).Nullable().Length(5000);
            Map(x => x.ProfitLoss).Nullable();
            Map(x => x.BrokerAccountId).Not.Nullable();
            References(x => x.BrokerAccount).Not.Nullable().Column("BrokerAccountId").ReadOnly().LazyLoad();
            Map(x => x.TradingPairId).Not.Nullable();
            References(x => x.TradingPair).Not.Nullable().Column("TradingPairId").ReadOnly().LazyLoad();
            Map(x => x.StartTrade).Not.Nullable();
            Map(x => x.EndTrade).Nullable();

            HasMany(x => x.Confirmations).KeyColumn("TradeId").NotFound.Ignore().LazyLoad();
        }
    }
}
