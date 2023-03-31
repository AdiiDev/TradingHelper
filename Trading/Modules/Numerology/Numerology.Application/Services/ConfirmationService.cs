using Core.Services;
using Trades.Application.Interfaces;
using Trades.Domain.Models;
using Trades.Repository.Interfaces;

namespace Trades.Application.Services
{
    public class ConfirmationService : BaseService<IConfirmationModelRepository, ConfirmationModel>, IConfirmationService
    {
        public ConfirmationService(IConfirmationModelRepository repository) : base(repository)
        {
        }
    }
}
