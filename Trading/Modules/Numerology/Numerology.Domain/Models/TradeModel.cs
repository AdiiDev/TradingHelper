﻿using Core.BaseModels;

namespace Trades.Domain.Models
{
    public class TradeModel : IBaseModel<TradeModel>
    {
        public virtual int Id { get; set; }
        public virtual int BrokerAccountId { get; set; }
        public virtual BrokerAccountModel BrokerAccount { get; set; }
        public virtual int TradingPairId { get; set; }
        public virtual TradeModel TradingPair { get; set; } //
        public virtual bool TradeConsistentStrategy { get; set; } //
        public virtual DateTime StartTrade { get; set; } //
        public virtual DateTime? EndTrade { get; set; } //
        public virtual double? ProfitLoss { get; set; } //
        public virtual string Note { get; set; } 
        public virtual IList<TradeConfirmationModel> Confirmations { get; set; } = new List<TradeConfirmationModel>(); //List<int>

        public virtual TradeModel CopyFrom(TradeModel newObject)
        {
            BrokerAccountId = newObject.BrokerAccountId;
            TradingPairId = newObject.TradingPairId;
            TradeConsistentStrategy = newObject.TradeConsistentStrategy;
            StartTrade = newObject.StartTrade;
            EndTrade = newObject.EndTrade;
            ProfitLoss = newObject.ProfitLoss;
            Note = newObject.Note;
            //Confirmations = newObject.Confirmations;
            return this;
        }
    }
}
