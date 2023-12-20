namespace MinimalAPI.Hubs.Models;
public class OnQuestionCreatedData
{
    public Guid Id { get; set; }
    public Guid RoomId { get; set; }
    public string User { get; set; } = string.Empty;
    public string Question { get; set; } = string.Empty;
    public DateTime CreatedAt { get => DateTime.Now; }
}
