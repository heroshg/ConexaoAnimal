using System.Text.Json.Serialization;

namespace API.Models.Enums;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum UnidadeTempo
{
    [JsonPropertyName("meses")]
    meses,
    [JsonPropertyName("anos")]
    anos
}

