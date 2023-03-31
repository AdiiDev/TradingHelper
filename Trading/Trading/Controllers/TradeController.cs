using Microsoft.AspNetCore.Mvc;
using Trades.Application.Interfaces;
using Trades.Domain.Models;

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

        [HttpGet]
        public IActionResult Get()
        {
            return Ok();
            //return Ok(_tradeService.Get(new QuerySpecification<BrokerAccountModel>(x => x.Id > 0)));
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
