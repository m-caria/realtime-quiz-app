namespace MinimalAPI.Data.Entities;
public class User : EntityBase
{
    public string UserName { get; set; } = string.Empty;

    public virtual ICollection<QuizRoom> OwnershipQuizRooms { get; set; } = new List<QuizRoom>();
    public virtual ICollection<QuizRoom> WinnerQuizRooms { get; set; } = new List<QuizRoom>();
    public virtual ICollection<QuizRoom> QuizRooms { get; set; } = new List<QuizRoom>();
    public virtual ICollection<QuizRoomScore> Scores { get; set; } = new List<QuizRoomScore>();
}
