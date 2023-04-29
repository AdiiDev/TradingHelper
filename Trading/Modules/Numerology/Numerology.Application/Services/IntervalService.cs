using Core.QueryCriteria;
using Core.Services;
using Trades.Application.Interfaces;
using Trades.Domain.Models;
using Trades.Repository.Interfaces;

namespace Trades.Application.Services
{
    public class IntervalService : BaseService<IIntervalModelRepository, IntervalModel>, IIntervalService
    {
        public IntervalService(IIntervalModelRepository repository) : base(repository)
        {
        }

        public void Init()
        {
            var records = _repository.Count(new QuerySpecification<IntervalModel>(x => x.Id > 0));
            if (records == 0)
            {
                var toAdd = new List<IntervalModel>()
                {
                    new IntervalModel(0, "1 min", "1"),
                    new IntervalModel(0, "5 min", "5"),
                    new IntervalModel(0, "10 min", "10"),
                    new IntervalModel(0, "15 min", "15"),
                    new IntervalModel(0, "30 min", "30"),
                    new IntervalModel(0, "1 h", "60"),
                    new IntervalModel(0, "4 h", "240"),
                    new IntervalModel(0, "D", "D"),
                    new IntervalModel(0, "W", "W"),
                };

                _repository.Save(toAdd);
                _repository.Flush();
            }
        }
    }
}
