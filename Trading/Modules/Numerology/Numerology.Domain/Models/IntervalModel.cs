using Core.BaseModels;

namespace Trades.Domain.Models
{
    public class IntervalModel : IBaseModel<IntervalModel>
    {
        public virtual int Id { get; set; }
        public virtual string Label { get; set; }
        public virtual string Interval { get; set; }
        public virtual bool? Hide { get; set; }

        public IntervalModel()
        {

        }

        public IntervalModel(int id, string label, string interval, bool? hide = false)
        {
            Id = id;
            Label = label;
            Interval = interval;
            Hide = hide;
        }

        public virtual IntervalModel CopyFrom(IntervalModel newObject)
        {
            Label = newObject.Label;
            Interval = newObject.Interval;
            Hide = newObject.Hide;
            return this;
        }
    }
}
