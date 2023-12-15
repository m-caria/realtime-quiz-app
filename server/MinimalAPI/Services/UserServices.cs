using MinimalAPI.Data.CQRS;
using MinimalAPI.Data.Entities;
using MinimalAPI.ErrorMapping;
using MinimalAPI.Middlewares.Extensions;

namespace MinimalAPI.Services;
public class UserServices(IQuizRoomQueryWrapper queryWrapper, IQuizRoomCommandWrapper commandWrapper) : IUserServices
{
    private readonly IQuizRoomQueryWrapper _queryWrapper = queryWrapper;
    private readonly IQuizRoomCommandWrapper _commandWrapper = commandWrapper;

    public async Task<User> CreateUserAsync(string username)
    {
        User? findedUser = await _queryWrapper.User.GetUserByNameAsync(username);
        if (findedUser != null) throw new APIException(UserErrorMapping.UserAlreadyExists(username));

        User user = new() { UserName = username };
        await _commandWrapper.User.AddUserAsync(user);
        await _commandWrapper.SaveChangesAsync();

        return user;
    }

    public async Task<User> GetUserByIdAsync(Guid id)
         => await _queryWrapper.User.GetUserByIdAsync(id) ?? throw new APIException(UserErrorMapping.UserNotFound(id));

    public async Task<User> GetUserByNameAsync(string username)
        => await _queryWrapper.User.GetUserByNameAsync(username) ?? throw new APIException(UserErrorMapping.UserNotFound(username));
}

public interface IUserServices
{
    Task<User> CreateUserAsync(string username);
    Task<User> GetUserByNameAsync(string username);
    Task<User> GetUserByIdAsync(Guid id);
}
