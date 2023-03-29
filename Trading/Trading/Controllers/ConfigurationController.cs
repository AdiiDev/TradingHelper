using Core.Configs;
using Core.Security;
using ElectronNET.API;
using Microsoft.AspNetCore.Mvc;

namespace Trading.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConfigurationController : ControllerBase
    {
        private readonly ILogger<ConfigurationController> _logger;
        private readonly AppConfiguration _appConfiguration;

        public ConfigurationController(ILogger<ConfigurationController> logger, AppConfiguration appConfiguration)
        {
            _logger = logger;
            _appConfiguration = appConfiguration;
        }

        [HttpGet]
        public IActionResult GetBaseConfig()
        {
            return Ok(_appConfiguration);
        }

        [HttpPost]
        public IActionResult InitConfig([FromBody] AppConfiguration appConfig)
        {
            try
            {
                var basePath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.CommonApplicationData), "Trading");
                var filePath = Path.Combine(basePath, "appConfig");

                if (string.IsNullOrEmpty(appConfig.ConnectionString))
                    appConfig.ConnectionString = _appConfiguration.ConnectionString;

                var appConfigString = Newtonsoft.Json.JsonConvert.SerializeObject(appConfig, Newtonsoft.Json.Formatting.Indented);
                var guard = new ConfigurationGuard();
                var appConfigBytes = guard.Encrypt(appConfigString);
                System.IO.File.WriteAllBytes(filePath, appConfigBytes);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error writing app settings");
                return BadRequest(ex.Message);
            }

            // Restart App
            if (HybridSupport.IsElectronActive)
            {
                Electron.Notification.Show(new ElectronNET.API.Entities.NotificationOptions("Trading Reastart", "Change in configuration needs restart"));
                Electron.App.Relaunch();
                Electron.App.Exit();
            }

            return Ok();
        }
    }
}
