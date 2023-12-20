namespace MinimalAPI.Models.Responses;
public record Player(Guid PlayerId, string Username, int Score);
public record QuizRoomResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string OwnerName { get; set; } = string.Empty;
    public int MaxPartecipants { get; set; }
    public string Winner { get; set; } = string.Empty;
    public List<Player> Players { get; set; } = [];
}
