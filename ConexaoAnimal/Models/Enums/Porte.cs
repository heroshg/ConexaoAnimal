using System.Text.Json.Serialization;

namespace API.Models.Enums;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum Porte
{
    [JsonPropertyName("Pequeno")]
    P,

    [JsonPropertyName("Medio")]
    M,

    [JsonPropertyName("Grande")]
    G
}
