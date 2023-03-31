using Core.QueryCriteria;
using Microsoft.AspNetCore.Mvc;
using Trades.Application.Interfaces;
using Trades.Domain.Models;

namespace Trading.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrokerAccountController : ControllerBase
    {
        private readonly ILogger<BrokerAccountController> _logger;
        private readonly IBrokerAccountService _brokerAccountService;

        public BrokerAccountController(ILogger<BrokerAccountController> logger, IBrokerAccountService brokerAccountService)
        {
            _logger = logger;
            _brokerAccountService = brokerAccountService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_brokerAccountService.Get(new QuerySpecification<BrokerAccountModel>(x => x.Id > 0)));
        }

        [HttpPost]
        public IActionResult AddOrUpdate([FromBody] BrokerAccountModel model)
        {
            _brokerAccountService.AddOrUpdate(model);
            return Ok(model);
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var result = _brokerAccountService.Delete(id);

            return result ? Ok() : NotFound();
        }
    }
}
