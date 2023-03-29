using Core.BaseModels;

namespace Trades.Domain.Models
{
    public class TradeConfirmationModel : IBaseModel<TradeConfirmationModel>
    {
        public virtual int Id { get; set; }
        public virtual int TradeId { get; set; }
        public virtual int ConfirmationId { get; set; }

        public virtual object CopyFrom(TradeConfirmationModel newObject)
        {
            TradeId = newObject.TradeId;
            ConfirmationId = newObject.ConfirmationId;
            return this;
        }

        public virtual string ToLogString()
        {
            return "";
        }

        public virtual string WhatChanged(TradeConfirmationModel newObject)
        {
            return "";
        }
    }
}
