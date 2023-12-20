using MinimalAPI.Data.CQRS.Base;
using MinimalAPI.Data.Entities;

namespace MinimalAPI.Data.CQRS.Queries;
public class QuizRoomScoreQueries(QuizRoomDbContext context) : QueryBase<QuizRoomScore>(context), IQuizRoomScoreQueries
{
    public async Task<QuizRoomScore?> GetPlayerScoreAsync(Guid roomId, Guid playerId)
        => await FindSingleAsync(r => r.PlayerId == playerId && r.RoomId == roomId, r => r.Player);

    public async Task<IEnumerable<QuizRoomScore>> GetRoomScoreAsync(Guid roomId)
        => await FindByConditionAsync(r => r.RoomId == roomId, r => r.Player);
}

public interface IQuizRoomScoreQueries
{
    Task<QuizRoomScore?> GetPlayerScoreAsync(Guid roomId, Guid playerId);
    Task<IEnumerable<QuizRoomScore>> GetRoomScoreAsync(Guid roomId);
}
