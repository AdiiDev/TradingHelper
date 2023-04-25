using Core.Services;
using Trades.Domain.Models;

namespace Trades.Application.Interfaces
{
    public interface IIntervalService : IBaseService<IntervalModel>
    {
        void Init();
    }
}
