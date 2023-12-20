namespace MinimalAPI.Models.Responses;
public record QuizRoomScore(Guid PlayerId, string Username, int Score) { }
public record QuizRoomScoreResponse
{
    public Guid RoomId { get; set; }
    public List<QuizRoomScore> Scores { get; set; } = [];
}
