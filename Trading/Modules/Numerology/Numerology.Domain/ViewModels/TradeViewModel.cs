using Trades.Domain.Models;

namespace Trades.Domain.ViewModels
{
    public class TradeViewModel
    {
        public int Id { get; set; }
        public int BrokerAccountId { get; set; }
        public int TradingPairId { get; set; }
        public bool TradeConsistentStrategy { get; set; }
        public virtual DateTime StartTrade { get; set; } //
        public virtual DateTime? EndTrade { get; set; } //
        public virtual double? ProfitLoos { get; set; } //
        public virtual string Note { get; set; }
        public virtual IList<int> Confirmations { get; set; } = new List<int>();

        public TradeViewModel(TradeModel model)
        {
            Id = model.Id;
            BrokerAccountId = model.BrokerAccountId;
            TradingPairId = model.TradingPairId;
            TradeConsistentStrategy = model.TradeConsistentStrategy;
            Note = model.Note;
            StartTrade = model.StartTrade;
            EndTrade = model.EndTrade;
            ProfitLoos = model.ProfitLoos;
            Confirmations = model.Confirmations?.Select(x => x.Id).ToList() ?? new List<int>();
        }
    }
}
