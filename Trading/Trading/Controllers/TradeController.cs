using Microsoft.AspNetCore.Mvc;
using Trades.Application.Interfaces;
using Trades.Application.Requests;
using Trades.Domain.Models;
using Trades.Domain.ViewModels;

namespace Trading.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TradeController : ControllerBase
    {
        private readonly ILogger<TradeController> _logger;
        private readonly ITradeService _tradeService;
        private readonly ITradeConfirmationService _tradeConfirmationService;

        public TradeController(ILogger<TradeController> logger, ITradeService tradeService, ITradeConfirmationService tradeConfirmationService)
        {
            _logger = logger;
            _tradeService = tradeService;
            _tradeConfirmationService = tradeConfirmationService;
        }

        [HttpPost("filtered")]
        public IActionResult Get([FromBody] TradesFilterRequest filter)
        {
            var result = _tradeService.GetTrades(filter);
            return Ok(new
            {
                Count = result.Item2,
                Trades = result.Item1.Select(x => new TradeViewModel(x)).ToArray(),
            });
        }

        [HttpPost]
        public IActionResult AddOrUpdate([FromBody] TradeViewModel viewModel)
        {
            var modelId = _tradeService.AddOrUpdate(viewModel.ToModel()).Id;
            var model = _tradeService.GetById(modelId);

            for (int i = 0; i < viewModel.Confirmations.Count; i++)
            {
                if (!model.Confirmations.Any(x => viewModel.Confirmations[i] == x.ConfirmationId))
                    _tradeConfirmationService.AddOrUpdate(new TradeConfirmationModel { TradeId = model.Id, ConfirmationId = viewModel.Confirmations[i] });
            }
            for (int i = 0; i < model.Confirmations.Count; i++)
            {
                if (!viewModel.Confirmations.Any(x => model.Confirmations[i].Id == x))
                    _tradeConfirmationService.Delete(model.Confirmations[i].Id);
            }

            return Ok(new TradeViewModel(_tradeService.GetById(modelId)));
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var result = _tradeService.Delete(id);

            return result ? Ok() : NotFound();
        }
    }
}
