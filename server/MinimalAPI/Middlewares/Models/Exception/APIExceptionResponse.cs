using System.Net;

namespace MinimalAPI.Middlewares.Models.Exception;
public record APIExceptionResponse
{
    public HttpStatusCode StatusCode { get; set; }
    public string InternalCode { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public string Detail { get; set; } = string.Empty;
    public string Endpoint { get; set; } = string.Empty;
    public static DateTime TimeStamp => DateTime.UtcNow;
}
