using Core.QueryCriteria;
using Microsoft.AspNetCore.Mvc;
using Trades.Application.Interfaces;
using Trades.Domain.Models;

namespace Trading.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IntervalsController : ControllerBase
    {
        private readonly ILogger<IntervalsController> _logger;
        private readonly IIntervalService _intervalService;

        public IntervalsController(ILogger<IntervalsController> logger, IIntervalService intervalService)
        {
            _logger = logger;
            _intervalService = intervalService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_intervalService.Get(new QuerySpecification<IntervalModel>(x => x.Hide != true)));
        }

        [HttpPost]
        public IActionResult AddOrUpdate([FromBody] IntervalModel model)
        {
            _intervalService.AddOrUpdate(model);
            return Ok(model);
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var result = _intervalService.Delete(id);

            return result ? Ok() : NotFound();
        }
    }
}
