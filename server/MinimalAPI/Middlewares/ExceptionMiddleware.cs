using MinimalAPI.Middlewares.Extensions;

namespace MinimalAPI.Middlewares;
public class ExceptionMiddleware(RequestDelegate next)
{
    private readonly RequestDelegate next = next;

    public async Task InvokeAsync(HttpContext httpContext)
    {
        try { await next(httpContext); }
        catch (Exception ex) { await APIException.HandleExceptionAsync(httpContext, ex); }
    }
}
