using Core.QueryCriteria;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel;
using Trades.Application.Interfaces;
using Trades.Domain.Models;

namespace Trading.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TradingPairsController : ControllerBase
    {
        private readonly ILogger<TradingPairsController> _logger;
        private readonly ITradingPairService _tradingPairService;

        public TradingPairsController(ILogger<TradingPairsController> logger, ITradingPairService tradingPairService)
        {
            _logger = logger;
            _tradingPairService = tradingPairService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_tradingPairService.Get(new QuerySpecification<TradingPairModel>(x => x.Id > 0),
                sortSpecification: new QuerySortSpecification<TradingPairModel>(x => x.Favourite, ListSortDirection.Descending)));
        }

        [HttpPost]
        public IActionResult AddOrUpdate([FromBody] TradingPairModel model)
        {
            _tradingPairService.AddOrUpdate(model);
            return Ok(model);
        }

        [HttpPost("bulk")]
        public IActionResult AddOrUpdateBul([FromBody] TradingPairModel[] models)
        {
            for (int i = 0; i < models.Length; i++)
            {
                _tradingPairService.AddOrUpdate(models[i]);
            }

            return Ok(models);
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var result = _tradingPairService.Delete(id);

            return result ? Ok() : NotFound();
        }
    }
}
