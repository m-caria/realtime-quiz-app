namespace MinimalAPI.Hubs.Models;
public record OnAcceptOrRejectAnswerData
{
    public Guid RoomId { get; set; }
    public Guid QuestionId { get; set; }
    public Guid AnswerId { get; set; }
    public bool IsAccepted { get; set; }
}
