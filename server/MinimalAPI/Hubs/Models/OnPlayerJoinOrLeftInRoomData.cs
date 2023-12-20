using MinimalAPI.Models.Responses;

namespace MinimalAPI.Hubs.Models;
public record OnPlayerJoinOrLeftInRoomData
{
    public Guid RoomId { get; set; }
    public List<UserResponse> Players { get; set; } = [];
}
