namespace MinimalAPI.Hubs.Models;
public record OnTryToAnswerData
{
    public Guid RoomId { get; set; }
    public Guid QuestionId { get; set; }
    public string PlayerName { get; set; } = string.Empty;
    public string Answer { get; set; } = string.Empty;
}
