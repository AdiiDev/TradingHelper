using Core.DB;
using Core.Repositories;
using Trades.Domain.Models;
using Trades.Repository.Interfaces;

namespace Trades.Repository.Repositories
{
    public class ConfirmationModelRepository : RepositoryBase<ConfirmationModel, IAppMainDB>, IConfirmationModelRepository
    {
        public ConfirmationModelRepository(IAppMainDB unitOfWork) : base(unitOfWork)
        {
        }
    }
}
