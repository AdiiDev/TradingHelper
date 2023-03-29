using FluentNHibernate.Mapping;
using Trades.Domain.Models;

namespace Trades.Repository.Maps
{
    public class TradeConfirmationModelMap : ClassMap<TradeConfirmationModel>
    {
        public TradeConfirmationModelMap()
        {
            Table("TradeConfirmation");
            Id(x => x.Id).GeneratedBy.Identity();
            Map(x => x.TradeId).Not.Nullable();
            Map(x => x.ConfirmationId).Not.Nullable();
        }
    }
}
