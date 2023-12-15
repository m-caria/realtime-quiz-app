using MinimalAPI.Hubs.Models;

namespace MinimalAPI.Hubs.Messages;
public interface IQuizRoomHubMessages
{
    Task OnRoomCreated(OnCreateRoomData message);
    Task OnPlayerJoinInRoom(OnPlayerJoinInRoomData message);
    Task OnQuestionCreated(OnQuestionCreatedData message);
    Task OnAnswer(OnAnswerData message);
}
