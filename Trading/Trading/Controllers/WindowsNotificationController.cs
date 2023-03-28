using Core.Electron.DTOs;
using ElectronNET.API;
using Microsoft.AspNetCore.Mvc;

namespace Trading.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WindowsNotificationController : ControllerBase
    {
        [HttpPost]
        public IActionResult Notify([FromBody] WindowsNotificationDTO info)
        {
            if (HybridSupport.IsElectronActive)
            {
                Electron.Notification.Show(new ElectronNET.API.Entities.NotificationOptions(info.Title, info.Message));
            }
            return Ok();
        }
    }
}
