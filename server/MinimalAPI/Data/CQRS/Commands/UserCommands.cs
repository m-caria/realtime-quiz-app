using MinimalAPI.Data.CQRS.Base;
using MinimalAPI.Data.Entities;

namespace MinimalAPI.Data.CQRS.Commands;
public class UserCommands(QuizRoomDbContext context) : CommandBase<User>(context), IUserCommands
{
    public async Task AddUserAsync(User user)
        => await AddAsync(user);
}

public interface IUserCommands
{
    Task AddUserAsync(User user);
}