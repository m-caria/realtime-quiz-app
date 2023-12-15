namespace MinimalAPI.Hubs.Models;
public record OnPlayerJoinInRoomData
{
    public Guid RoomId { get; set; }
    public string PlayerName { get; set; } = string.Empty;
    public int TotalRoomPlayers { get; set; }
}
