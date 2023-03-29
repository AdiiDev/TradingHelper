using FluentNHibernate.Mapping;
using Trades.Domain.Models;

namespace Trades.Repository.Maps
{
    public class ConfirmationModelMap : ClassMap<ConfirmationModel>
    {
        public ConfirmationModelMap()
        {
            Table("Confirmations");
            Id(x => x.Id).GeneratedBy.Identity();
            Map(x => x.Name).Not.Nullable().Length(220);
            Map(x => x.Favourite).Not.Nullable();
        }
    }
}
