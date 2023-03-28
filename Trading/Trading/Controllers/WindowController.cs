using ElectronNET.API;
using Microsoft.AspNetCore.Mvc;

namespace Trading.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WindowController : ControllerBase
    {
        private readonly ILogger<WindowController> _logger;

        public WindowController(ILogger<WindowController> logger)
        {
            _logger = logger;
            _logger.LogDebug(1, "NLog injected into HomeController");
        }

        [HttpGet("{path}")]
        public async Task<IActionResult> Get(string path)
        {
            if (HybridSupport.IsElectronActive)
            {
                string viewPath = $"http://localhost:{BridgeSettings.WebPort}/{path}";

                var win = await Electron.WindowManager.CreateWindowAsync(viewPath);
                win.Show();
            }
            return Ok();
        }

        [HttpGet("test/test")]
        public async Task<IActionResult> GetTest()
        {
            return Ok();
        }
    }
}