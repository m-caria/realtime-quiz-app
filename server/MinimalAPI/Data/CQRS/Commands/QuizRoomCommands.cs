using MinimalAPI.Data.CQRS.Base;
using MinimalAPI.Data.Entities;

namespace MinimalAPI.Data.CQRS.Commands;
public class QuizRoomCommands(QuizRoomDbContext context) : CommandBase<QuizRoom>(context), IQuizRoomCommands
{
    public async Task CreateRoomAsync(QuizRoom room)
        => await AddAsync(room);
}

public interface IQuizRoomCommands
{
    Task CreateRoomAsync(QuizRoom room);
}
