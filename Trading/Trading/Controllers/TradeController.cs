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

        public TradeController(ILogger<TradeController> logger, ITradeService tradeService)
        {
            _logger = logger;
            _tradeService = tradeService;
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
        public IActionResult AddOrUpdate([FromBody] TradeModel model)
        {
            _tradeService.AddOrUpdate(model);
            return Ok(model);
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var result = _tradeService.Delete(id);

            return result ? Ok() : NotFound();
        }
    }
}
