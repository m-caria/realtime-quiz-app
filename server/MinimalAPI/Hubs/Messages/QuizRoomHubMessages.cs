using MinimalAPI.Hubs.Models;

namespace MinimalAPI.Hubs.Messages;
public interface IQuizRoomHubMessages
{
    Task OnRoomCreated(OnCreateRoomData message);
    Task OnPlayerJoinOrLeftInRoom(OnPlayerJoinOrLeftInRoomData message);
    Task OnQuestionCreated(OnQuestionCreatedData message);
    Task OnAnswer(OnAnswerData message);
    Task OnStartTypingQuestion();
    Task OnEndTypingQuestion();
    Task OnBookAnswer(string playerName);
    Task OnTimerElapsed(double seconds, Guid roomId, Guid questionId);
    Task OnTimerExpired(Guid roomId, Guid questionId);
    Task OnTimerStopped(Guid roomId, Guid questionId);
    Task OnAddedPlayerScore(Guid roomId, Guid playerId);
    Task OnValidAnswer(OnAcceptOrRejectAnswerData message);
}
