using Core.BaseModels;

namespace Trades.Domain.Models
{
    public class ConfirmationModel : IBaseModel<ConfirmationModel>
    {
        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual bool Favourite { get; set; }


        public virtual object CopyFrom(ConfirmationModel newObject)
        {
            Name = newObject.Name;
            Favourite = newObject.Favourite;
            return this;
        }

        public virtual string ToLogString()
        {
            throw new NotImplementedException();
        }

        public virtual string WhatChanged(ConfirmationModel newObject)
        {
            throw new NotImplementedException();
        }
    }
}
