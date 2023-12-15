namespace MinimalAPI.Hubs.Models;
public record OnCreateRoomData
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string OwnerName { get; set; } = string.Empty;
    public int MaxPlayers { get; set; }
}
