using MinimalAPI.Data.CQRS;
using MinimalAPI.Data.Entities;

namespace MinimalAPI.Services;
public class QuizRoomScoreServices(IQuizRoomQueryWrapper queryWrapper, IQuizRoomCommandWrapper commandWrapper, IUserServices userServices, IQuizRoomServices quizRoomServices) : IQuizRoomScoreServices
{
    private readonly IUserServices _userServices = userServices;
    private readonly IQuizRoomServices _quizRoomServices = quizRoomServices;
    private readonly IQuizRoomQueryWrapper _queryWrapper = queryWrapper;
    private readonly IQuizRoomCommandWrapper _commandWrapper = commandWrapper;

    public async Task<IEnumerable<QuizRoomScore>> AddPointToPlayerAsync(Guid roomId, Guid playerId)
    {
        User user = await _userServices.GetUserByIdAsync(playerId);
        QuizRoom room = await _quizRoomServices.GetQuizRoomByIdAsync(roomId);

        IEnumerable<QuizRoomScore> scores = await _queryWrapper.QuizRoomScore.GetRoomScoreAsync(roomId);
        QuizRoomScore? playerScore = scores.FirstOrDefault(s => s.PlayerId == playerId);

        if (playerScore == null)
        {
            playerScore = new()
            {
                Player = user,
                Room = room,
                Score = 1,
                CreatedAt = DateTime.UtcNow,
                EditedAt = DateTime.UtcNow,
            };
            await _commandWrapper.QuizRoomScore.AddPlayerScore(playerScore);
        }
        else playerScore.Score += 1;

        await _commandWrapper.SaveChangesAsync();
        return scores;
    }
}

public interface IQuizRoomScoreServices
{
    Task<IEnumerable<QuizRoomScore>> AddPointToPlayerAsync(Guid roomId, Guid playerId);
}
