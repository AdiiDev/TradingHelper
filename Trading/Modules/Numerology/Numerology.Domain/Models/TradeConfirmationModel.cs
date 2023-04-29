using Core.BaseModels;

namespace Trades.Domain.Models
{
    public class TradeConfirmationModel : IBaseModel<TradeConfirmationModel>
    {
        public virtual int Id { get; set; }
        public virtual int TradeId { get; set; }
        public virtual int ConfirmationId { get; set; }

        public virtual TradeConfirmationModel CopyFrom(TradeConfirmationModel newObject)
        {
            TradeId = newObject.TradeId;
            ConfirmationId = newObject.ConfirmationId;
            return this;
        }
    }
}
