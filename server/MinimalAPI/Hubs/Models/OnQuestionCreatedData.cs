namespace MinimalAPI.Hubs.Models;
public class OnQuestionCreatedData
{
    public Guid RoomId { get; set; }
    public string Question { get; set; } = string.Empty;
    public DateTime CreatedAt { get => DateTime.Now; }
}
