namespace MinimalAPI.Endpoints.QuizRoomScore;
public static partial class QuizRoomScoreEndpoints
{
    public static void QuizRoomScoreEndpointsMap(this WebApplication app)
    {
        app.MapPost("/api/scores/{roomId}", AddPointToPlayer);
    }
}
