namespace SignalRHub.Interfaces
{
    public interface ITypedHubClient
    {
      Task BroadcastMessage(string accountGUID, string type, string payload);
    }
}
