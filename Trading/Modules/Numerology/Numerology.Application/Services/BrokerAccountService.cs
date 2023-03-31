using Core.Services;
using Trades.Application.Interfaces;
using Trades.Domain.Models;
using Trades.Repository.Interfaces;

namespace Trades.Application.Services
{
    public class BrokerAccountService : BaseService<IBrokerAccountModelRepository, BrokerAccountModel>, IBrokerAccountService
    {
        public BrokerAccountService(IBrokerAccountModelRepository repository) : base(repository)
        {
        }
    }
}
