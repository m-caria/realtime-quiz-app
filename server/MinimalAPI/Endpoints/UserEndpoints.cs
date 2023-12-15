namespace MinimalAPI.Endpoints.User;
public static partial class UserEndpoints
{
    public static void UserEndpointsMap(this WebApplication app)
    {
        app.MapPost("/api/users", CreateUser);
        app.MapGet("/api/users/{username}", GetUser);
    }
}
