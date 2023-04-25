using Core.Configs;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Trading.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LayoutsController : ControllerBase
    {
        private readonly ILogger<LayoutsController> _logger;

        public LayoutsController(ILogger<LayoutsController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(GetConfiguration(GetConfigPath()));
        }

        [HttpPost]
        public IActionResult AddOrUpdate([FromBody] Layout layout)
        {
            var filePath = GetConfigPath();
            var config = GetConfiguration(filePath);

            if (layout.Id > 0)
            {
                var gridRow = config.Layouts.FirstOrDefault(x => x.Id == layout.Id);
                if (gridRow != null)
                {
                    gridRow = layout;
                }
                return BadRequest(new { Info = $"Could not find layout with id: {layout.Id}" });
            }
            else
            {
                var lastId = config.Layouts.Max(x => x.Id);
                layout.Id = lastId++;
                config.Layouts.Add(layout);
            }
            SaveConfig(config, filePath);

            return Ok();
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            return Ok();
        }

        private LayoutsConfiguration GetConfiguration(string filePath)
        {
            LayoutsConfiguration? config = null;
            if (System.IO.File.Exists(filePath))
            {
                var configString = System.IO.File.ReadAllText(filePath);
                config = JsonConvert.DeserializeObject<LayoutsConfiguration>(configString);
            }
            else
            {
                config = new LayoutsConfiguration();
                var configString = JsonConvert.SerializeObject(config, Formatting.Indented);
                System.IO.File.WriteAllText(filePath, configString);
            }

            return config;
        }

        private void SaveConfig(LayoutsConfiguration layoutsConfiguration, string filePath)
        {
            var configString = JsonConvert.SerializeObject(layoutsConfiguration, Formatting.Indented);
            System.IO.File.WriteAllText(filePath, configString);
        }

        private string GetConfigPath()
        {
            var basePath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.CommonApplicationData), "Trading");
            if (!Directory.Exists(basePath))
                Directory.CreateDirectory(basePath);

            return Path.Combine(basePath, "layoutsConfig");
        }
    }
}
