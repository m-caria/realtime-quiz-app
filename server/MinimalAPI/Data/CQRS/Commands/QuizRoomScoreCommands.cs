using MinimalAPI.Data.CQRS.Base;
using MinimalAPI.Data.Entities;

namespace MinimalAPI.Data.CQRS.Commands;
public class QuizRoomScoreCommands(QuizRoomDbContext context) : CommandBase<QuizRoomScore>(context), IQuizRoomScoreCommands
{
    public async Task AddPlayerScore(QuizRoomScore score)
        => await AddAsync(score);
}

public interface IQuizRoomScoreCommands
{
    Task AddPlayerScore(QuizRoomScore score);
}
