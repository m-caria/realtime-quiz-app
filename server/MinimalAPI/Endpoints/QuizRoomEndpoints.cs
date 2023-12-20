namespace MinimalAPI.Endpoints.QuizRoom;
public static partial class QuizRoomEndpoints
{
    public static void QuizRoomEndpointsMap(this WebApplication app)
    {
        app.MapPost("/api/rooms", CreateQuizRoom);
        app.MapGet("/api/rooms", GetAllQuizRooms);
        app.MapGet("/api/rooms/{roomId}", GetQuizRoom);
        app.MapPost("/api/rooms/{roomId}/players", ManageQuizRoomPlayers);
    }
}
