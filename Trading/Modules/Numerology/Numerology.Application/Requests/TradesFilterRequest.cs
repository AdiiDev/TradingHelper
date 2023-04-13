using Core.BaseModels;

namespace Trades.Application.Requests
{
    public class TradesFilterRequest : BaseFilterRequest
    {
        public int BrokerId { get; set; }
        public IList<int> TradingPairs = new List<int>(); // ?
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
        public bool? TradeConsistentStrategy { get; set; }
        public int? NumberOfConfirmations { get; set; }
        public IList<int> Confirmations = new List<int>();
        public double? Profit { get; set; }
        public double? Loos { get; set; }
        public bool? OnlyProfit { get; set; }
        public bool? OnlyLoss { get; set; }
    }
}
