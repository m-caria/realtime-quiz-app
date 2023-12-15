namespace MinimalAPI.Models.Responses;
public record QuizRoomResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string OwnerName { get; set; } = string.Empty;
    public int MaxPartecipants { get; set; }
    public List<UserResponse> Players { get; set; } = [];
}
