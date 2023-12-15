namespace MinimalAPI.Data.Entities;
public class QuizRoom : EntityBase
{
    public string Name { get; set; } = string.Empty;
    public int MaxPartecipants { get; set; }
    public int TotalQuestions { get; set; }
    public Guid OwnerId { get; set; }
    public Guid WinnerId { get; set; }

    public virtual User Owner { get; set; } = new();
    public virtual User Winner { get; set; } = new();
    public ICollection<User> Players { get; set; } = new List<User>();
    public virtual ICollection<QuizRoomScore> Scores { get; set; } = new List<QuizRoomScore>();
}
