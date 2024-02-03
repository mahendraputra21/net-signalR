using System.Text.Json.Serialization;

namespace SignalRHub.Models
{
    public class Message
    {
        [JsonPropertyName("accountGUID")]
        public string? AccountGUID { get; set; }
        public string? Type { get; set; }
        public string? Payload { get; set; }
    }
}
