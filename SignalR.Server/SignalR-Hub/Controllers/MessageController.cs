using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalRHub.Classes;
using SignalRHub.Interfaces;
using SignalRHub.Models;

namespace SignalRHub.Controllers
{
    [Route("api/v1.0/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private IHubContext<NotifyHub, ITypedHubClient> _hubContext;

        public MessageController(IHubContext<NotifyHub, ITypedHubClient> hubContext)
        {
            _hubContext = hubContext;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Message msg)
        {
            string retMessage = string.Empty;
            try
            {
                await _hubContext.Clients.All.BroadcastMessage(msg.AccountGUID, msg.Type, msg.Payload);
                retMessage = "Success";
            }
            catch (Exception e)
            {
                retMessage = e.ToString();
            }
            return Ok(retMessage);
        }
    }
}
