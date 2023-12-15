using Microsoft.AspNetCore.SignalR;
using MinimalAPI.Hubs.Messages;

namespace MinimalAPI.Hubs;
public class QuizRoomHub : Hub<IQuizRoomHubMessages> 
{ 
    public async Task CreateQuestion(Guid roomId, string question)
    {
        await Clients.Group(roomId.ToString()).OnQuestionCreated(new() { Question = question, RoomId = roomId });
    }

    public async Task TryToAnswer(Guid roomId, string playerName, string answer)
    {
        await Clients.Group(roomId.ToString()).OnAnswer(new() { Answer = answer, PlayerName = playerName, RoomId = roomId });
    }
}
