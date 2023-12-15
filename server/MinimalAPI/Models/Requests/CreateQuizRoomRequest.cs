namespace MinimalAPI.Models.Requests;
public record CreateQuizRoomRequest(string Name, Guid UserId, int MaxPartecipants) { }
