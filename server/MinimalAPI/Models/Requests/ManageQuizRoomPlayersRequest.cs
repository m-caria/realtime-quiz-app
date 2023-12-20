namespace MinimalAPI.Models.Requests;
public record ManageQuizRoomPlayersRequest(Guid PlayerId, bool IsJoined) { }
