using MinimalAPI.Middlewares.Models.Exception;
using System.Net;

namespace MinimalAPI.ErrorMapping;
public class QuizRoomErrorMapping
{
    public static APIExceptionModel RoomNameRequired => new()
    {
        StatusCode = HttpStatusCode.BadRequest,
        Code = "quizRoom/emptyRoomName",
        Message = "Room name must not be empty",
        Detail = ""
    };

    public static APIExceptionModel RoomIdRequired => new()
    {
        StatusCode = HttpStatusCode.BadRequest,
        Code = "quizRoom/emptyRoomId",
        Message = "Room id must not be empty",
        Detail = ""
    };

    public static APIExceptionModel QuizRoomNotFound(Guid roomId) => new()
    {
        StatusCode = HttpStatusCode.NotFound,
        Code = "quizRoom/notFound",
        Message = "Quiz room not found",
        Detail = $"The room with id {roomId} not exists."
    };

    public static APIExceptionModel QuizRoomNotFound(string name) => new()
    {
        StatusCode = HttpStatusCode.NotFound,
        Code = "quizRoom/notFound",
        Message = "Quiz room not found",
        Detail = $"The room with name {name} not exists."
    };

    public static APIExceptionModel QuizRoomAlreadyExists(string name) => new()
    {
        StatusCode = HttpStatusCode.Conflict,
        Code = "quizRoom/alreadyExists",
        Message = "Quiz room already exists",
        Detail = $"The room with name {name} already opened."
    };
}
