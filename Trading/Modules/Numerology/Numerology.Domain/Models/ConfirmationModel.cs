using Core.BaseModels;

namespace Trades.Domain.Models
{
    public class ConfirmationModel : IBaseModel<ConfirmationModel>
    {
        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual bool Favourite { get; set; }


        public virtual ConfirmationModel CopyFrom(ConfirmationModel newObject)
        {
            Name = newObject.Name;
            Favourite = newObject.Favourite;
            return this;
        }
    }
}
