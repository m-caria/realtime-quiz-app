using MinimalAPI.Data.CQRS.Base;
using MinimalAPI.Data.Entities;

namespace MinimalAPI.Data.CQRS.Queries;
public class QuizRoomQueries(QuizRoomDbContext context) : QueryBase<QuizRoom>(context), IQuizRoomQueries
{
    public async Task<IEnumerable<QuizRoom>> GetAllAsync()
        => await FindAllAsync(r => r.Players, r => r.Owner);

    public async Task<QuizRoom?> GetRoomByIdAsync(Guid id)
        => await FindSingleAsync(r => r.Id == id, r => r.Players, r => r.Owner);

    public async Task<QuizRoom?> GetRoomByNameAsync(string name)
        => await FindSingleAsync(r => r.Name == name, r => r.Players, r => r.Owner);
}

public interface IQuizRoomQueries
{
    Task<QuizRoom?> GetRoomByIdAsync(Guid id);
    Task<QuizRoom?> GetRoomByNameAsync(string name);
    Task<IEnumerable<QuizRoom>> GetAllAsync();
}
