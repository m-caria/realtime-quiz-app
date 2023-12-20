namespace MinimalAPI.Hubs.Models;
public record OnAddPlayerScoreData(Guid RoomId, Guid PlayerId, string Username, int Score) { }
