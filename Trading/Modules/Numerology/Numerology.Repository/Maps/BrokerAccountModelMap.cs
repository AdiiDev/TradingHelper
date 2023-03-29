using FluentNHibernate.Mapping;
using Trades.Domain.Models;

namespace Trades.Repository.Maps
{
    public class BrokerAccountModelMap : ClassMap<BrokerAccountModel>
    {
        public BrokerAccountModelMap()
        {
            Table("BrokerAccounts");
            Id(x => x.Id).GeneratedBy.Identity();
            Map(x => x.BrokerName).Not.Nullable().Length(40);
            Map(x => x.AccountNumber).Nullable().Length(30);
            Map(x => x.Name).Not.Nullable().Length(60);
            Map(x => x.Favourite).Not.Nullable();
        }
    }
}
