using MinimalAPI.Middlewares;

namespace MinimalAPI.Extensions;
public static class AppBuilderExtensions
{
    public static IApplicationBuilder UseAPIExceptionMiddleware(this IApplicationBuilder builder)
        => builder.UseMiddleware<ExceptionMiddleware>();
}
