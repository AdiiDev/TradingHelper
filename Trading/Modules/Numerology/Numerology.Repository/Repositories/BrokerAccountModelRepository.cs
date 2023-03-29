using Core.DB;
using Core.Repositories;
using Trades.Domain.Models;
using Trades.Repository.Interfaces;

namespace Trades.Repository.Repositories
{
    public class BrokerAccountModelRepository : RepositoryBase<BrokerAccountModel, IAppMainDB>, IBrokerAccountModelRepository
    {
        public BrokerAccountModelRepository(IAppMainDB unitOfWork) : base(unitOfWork)
        {
        }
    }
}
