using MinimalAPI.Data.CQRS;
using MinimalAPI.Data.Entities;
using MinimalAPI.ErrorMapping;
using MinimalAPI.Middlewares.Extensions;

namespace MinimalAPI.Services;
public class QuizRoomServices(IQuizRoomQueryWrapper queryWrapper, IQuizRoomCommandWrapper commandWrapper, IUserServices userServices) : IQuizRoomServices
{
    private readonly IUserServices _userServices = userServices;
    private readonly IQuizRoomQueryWrapper _queryWrapper = queryWrapper;
    private readonly IQuizRoomCommandWrapper _commandWrapper = commandWrapper;

    public async Task<QuizRoom> CreateQuizRoomAsync(string name, Guid userId, int maxPartecipants)
    {
        QuizRoom? openedRoom = await _queryWrapper.QuizRoom.GetRoomByNameAsync(name);
        if (openedRoom != null) throw new APIException(QuizRoomErrorMapping.QuizRoomAlreadyExists(name));

        QuizRoom room = new()
        {
            Name = name,
            MaxPartecipants = maxPartecipants,
            CreatedAt = DateTime.UtcNow,
        };

        await _commandWrapper.QuizRoom.CreateRoomAsync(room);

        User user = await _userServices.GetUserByIdAsync(userId);
        user.OwnershipQuizRooms.Add(room);

        await _commandWrapper.SaveChangesAsync();

        return room;
    }

    public async Task<IEnumerable<QuizRoom>> GetAllQuizRoomsAsync()
        => await _queryWrapper.QuizRoom.GetAllAsync();

    public async Task<QuizRoom> GetQuizRoomByIdAsync(Guid id)
        => await _queryWrapper.QuizRoom.GetRoomByIdAsync(id) ?? throw new APIException(QuizRoomErrorMapping.QuizRoomNotFound(id));

    public async Task<QuizRoom> JoinToQuizRoomAsync(Guid roomId, Guid userId)
    {
        QuizRoom room = await GetQuizRoomByIdAsync(roomId);
        User user = await _userServices.GetUserByIdAsync(userId);

        room.Players ??= new List<User>();
        room.Players.Add(user);
        room.Scores ??= new List<QuizRoomScore>();
        room.Scores.Add(new() { Score = 0, Player = user });

        await _commandWrapper.SaveChangesAsync();
        return room;
    }

    public async Task<QuizRoom> LeaveFromQuizRoomAsync(Guid roomId, Guid userId)
    {
        QuizRoom room = await GetQuizRoomByIdAsync(roomId);
        User user = await _userServices.GetUserByIdAsync(userId);
        QuizRoomScore? score = room.Scores.FirstOrDefault(s => s.PlayerId == userId);

        if (room.Players.Any(p => p.Id == userId) && score != null)
        {
            room.Players.Remove(user);
            room.Scores.Remove(score);
            await _commandWrapper.SaveChangesAsync();
        }

        return room;
    }
}

public interface IQuizRoomServices
{
    Task<QuizRoom> CreateQuizRoomAsync(string name, Guid userId, int maxPartecipants);
    Task<QuizRoom> GetQuizRoomByIdAsync(Guid id);
    Task<IEnumerable<QuizRoom>> GetAllQuizRoomsAsync();
    Task<QuizRoom> JoinToQuizRoomAsync(Guid roomId, Guid userId);
    Task<QuizRoom> LeaveFromQuizRoomAsync(Guid roomId, Guid userId);
}
