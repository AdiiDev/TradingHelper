using Core.BaseModels;

namespace Trades.Domain.Models
{
    public class BrokerAccountModel : IBaseModel<BrokerAccountModel>
    {
        public virtual int Id { get; set; }
        public virtual string BrokerName { get; set; }
        public virtual string? AccountNumber { get; set; }
        public virtual string Name { get; set; }
        public virtual bool Favourite { get; set; }

        public virtual object CopyFrom(BrokerAccountModel newObject)
        {
            BrokerName = newObject.BrokerName;
            AccountNumber = newObject.AccountNumber;
            Name = newObject.Name;
            Favourite = newObject.Favourite;
            return this;
        }

        public virtual string ToLogString()
        {
            return "";
        }

        public virtual string WhatChanged(BrokerAccountModel newObject)
        {
            return "";
        }
    }
}
