using ElectronNET.API;
using ElectronNET.API.Entities;
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

                var browserWindow = await Electron.WindowManager.CreateWindowAsync(new BrowserWindowOptions
                {
                    Show = false,
                    WebPreferences = new WebPreferences { NodeIntegration = true, ContextIsolation = true, EnableRemoteModule = true, DevTools = true },
                    Frame = false,
                    Resizable = true,
                    TitleBarStyle = TitleBarStyle.hidden,
                    AutoHideMenuBar = true,
                }, viewPath);
                browserWindow.SetMenuBarVisibility(false);
                browserWindow.OnReadyToShow += () => browserWindow.Show();
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