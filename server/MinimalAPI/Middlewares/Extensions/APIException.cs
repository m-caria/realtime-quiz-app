using MinimalAPI.Middlewares.Models.Exception;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Net;

namespace MinimalAPI.Middlewares.Extensions;
public class APIException : Exception
{
    public APIExceptionModel WebApiError { get; set; } = new();

    public APIException() : base("There is an error with the request") { }
    public APIException(APIExceptionModel exception) : base(exception.Message) => WebApiError = exception;
    public APIException(APIExceptionModel apiException, Exception inner) : base(apiException.Message, inner) => WebApiError = apiException;

    public APIException(string message, string code, string detail, HttpStatusCode statusCode) : base(message)
    {
        WebApiError = new APIExceptionModel
        {
            Code = code,
            Detail = detail,
            Message = message,
            StatusCode = statusCode
        };
    }

    public static Task HandleExceptionAsync(HttpContext httpContext, Exception exception)
    {
        HttpResponse response = httpContext.Response;
        response.ContentType = "application/json";

        if (exception is APIException ex)
        {
            response.StatusCode = (int)ex.WebApiError.StatusCode;
            return response.WriteAsync(JsonConvert.SerializeObject(new APIExceptionResponse
            {
                StatusCode = ex.WebApiError.StatusCode,
                Detail = ex.WebApiError.Detail,
                InternalCode = ex.WebApiError.Code,
                Message = ex.WebApiError.Message,
                Endpoint = httpContext.Request.Path
            }, new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            }));
        }

        response.StatusCode = (int)HttpStatusCode.InternalServerError;

        return response.WriteAsync(JsonConvert.SerializeObject(new APIExceptionResponse
        {
            StatusCode = HttpStatusCode.InternalServerError,
            Detail = exception.InnerException?.Message ?? string.Empty,
            InternalCode = "serverError",
            Message = exception.Message,
            Endpoint = httpContext.Request.Path
        }, new JsonSerializerSettings
        {
            ContractResolver = new CamelCasePropertyNamesContractResolver()
        }));
    }
}
