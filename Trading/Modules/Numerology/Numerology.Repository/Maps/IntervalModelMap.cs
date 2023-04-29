using FluentNHibernate.Mapping;
using Trades.Domain.Models;

namespace Trades.Repository.Maps
{
    public class IntervalModelMap : ClassMap<IntervalModel>
    {
        public IntervalModelMap()
        {
            Table("chart_intervals");
            Id(x => x.Id).GeneratedBy.Identity();
            Map(x => x.Label).Not.Nullable().Length(20).Column("nazwa");
            Map(x => x.Interval).Not.Nullable().Length(10).Column("interwal");
            Map(x => x.Hide).Nullable().Column("ukryte");
        }
    }
}
