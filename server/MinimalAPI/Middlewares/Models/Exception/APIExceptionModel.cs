using System.Net;

namespace MinimalAPI.Middlewares.Models.Exception;
public record APIExceptionModel
{
    public string Code { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public string Detail { get; set; } = string.Empty;
    public HttpStatusCode StatusCode { get; set; }
}
