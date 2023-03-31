using Core.QueryCriteria;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel;
using Trades.Application.Interfaces;
using Trades.Domain.Models;

namespace Trading.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConfirmationController : ControllerBase
    {
        private readonly ILogger<ConfirmationController> _logger;
        private readonly IConfirmationService _confirmationService;

        public ConfirmationController(ILogger<ConfirmationController> logger, IConfirmationService confirmationService)
        {
            _logger = logger;
            _confirmationService = confirmationService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_confirmationService.Get(new QuerySpecification<ConfirmationModel>(x => x.Id > 0),
                sortSpecification: new QuerySortSpecification<ConfirmationModel>(x => x.Favourite, ListSortDirection.Descending)));
        }

        [HttpPost]
        public IActionResult AddOrUpdate([FromBody] ConfirmationModel model)
        {
            _confirmationService.AddOrUpdate(model);
            return Ok(model);
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var result = _confirmationService.Delete(id);

            return result ? Ok() : NotFound();
        }
    }
}
