using MinimalAPI.Middlewares.Models.Exception;
using System.Net;

namespace MinimalAPI.ErrorMapping;
public class UserErrorMapping
{
    public static APIExceptionModel UsernameRequired => new()
    {
        StatusCode = HttpStatusCode.BadRequest,
        Code = "user/emptyUsername",
        Message = "Username must not be empty",
        Detail = ""
    };

    public static APIExceptionModel UserIdRequired => new()
    {
        StatusCode = HttpStatusCode.BadRequest,
        Code = "user/emptyId",
        Message = "User Id must not be empty",
        Detail = ""
    };

    public static APIExceptionModel UserNotFound(string username) => new()
    {
        StatusCode = HttpStatusCode.NotFound,
        Code = "user/notFound",
        Message = "User not found",
        Detail = $"The user {username} not exists."
    };

    public static APIExceptionModel UserNotFound(Guid id) => new()
    {
        StatusCode = HttpStatusCode.NotFound,
        Code = "user/notFound",
        Message = "User not found",
        Detail = $"The user {id} not exists."
    };

    public static APIExceptionModel UserAlreadyExists(string username) => new()
    {
        StatusCode = HttpStatusCode.Conflict,
        Code = "user/alreadyExists",
        Message = "User already exists",
        Detail = $"The user {username} already registered."
    };
}
