using MinimalAPI.Data.CQRS.Base;
using MinimalAPI.Data.Entities;

namespace MinimalAPI.Data.CQRS.Queries;
public class UserQueries(QuizRoomDbContext context) : QueryBase<User>(context), IUserQueries
{
    public async Task<User?> GetUserByIdAsync(Guid id)
        => await FindSingleAsync(u => u.Id == id);

    public async Task<User?> GetUserByNameAsync(string name)
        => await FindSingleAsync(u => u.UserName == name);
}

public interface IUserQueries
{
    Task<User?> GetUserByIdAsync(Guid id);
    Task<User?> GetUserByNameAsync(string name);
}