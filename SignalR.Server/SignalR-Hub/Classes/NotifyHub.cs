using Microsoft.AspNetCore.SignalR;
using SignalRHub.Interfaces;

namespace SignalRHub.Classes
{
    public class NotifyHub : Hub<ITypedHubClient>
    {
    }
}
