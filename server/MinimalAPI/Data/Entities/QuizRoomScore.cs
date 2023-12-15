namespace MinimalAPI.Data.Entities;
public class QuizRoomScore : EntityBase
{
    public Guid RoomId { get; set; }
    public Guid PlayerId { get; set; }
    public int Score { get; set; }

    public virtual User Player { get; set; } = new();
    public virtual QuizRoom Room { get; set; } = new();
}
