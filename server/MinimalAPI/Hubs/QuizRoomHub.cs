using Microsoft.AspNetCore.SignalR;
using MinimalAPI.Hubs.Messages;
using MinimalAPI.Hubs.Models;
using MinimalAPI.Utils;
using System.Collections.Concurrent;

namespace MinimalAPI.Hubs;
public class QuizRoomHub : Hub<IQuizRoomHubMessages> 
{
    private static readonly ConcurrentDictionary<Guid, QuizRoomTimer> _roomTimers = new();

    public async Task CreateGroup(Guid roomId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, roomId.ToString());
    }

    public async Task OnOwnerTypingQuestion(Guid roomId, bool isTyping)
    {
        if (isTyping) await Clients.Group(roomId.ToString()).OnStartTypingQuestion();
        else await Clients.Group(roomId.ToString()).OnEndTypingQuestion();
    }

    public async Task CreateQuestion(Guid roomId, string question)
    {
        Guid questionId = Guid.NewGuid();
        await Clients.Group(roomId.ToString()).OnEndTypingQuestion();
        await Clients.Group(roomId.ToString()).OnQuestionCreated(new() { Question = question, RoomId = roomId, Id = questionId });

        QuizRoomTimer roomTimer = new(roomId, 1000);
        roomTimer.StartTimer(questionId, 30, TimerElapsed);
        _roomTimers[roomId] = roomTimer;
    }

    public async Task BookAnswer(Guid roomId, string playerName)
    {
        await Clients.Group(roomId.ToString()).OnBookAnswer(playerName);
    }

    public async Task TryToAnswer(OnTryToAnswerData message)
    {
        await Clients.Group(message.RoomId.ToString()).OnAnswer(new() 
            { Id = Guid.NewGuid(), QuestionId = message.QuestionId, Answer = message.Answer, PlayerName = message.PlayerName, RoomId = message.RoomId });
    }

    public async Task OnAcceptOrRejectAnswer(OnAcceptOrRejectAnswerData message)
    {
        await Clients.Group(message.RoomId.ToString()).OnValidAnswer(message);
        _roomTimers.TryGetValue(message.RoomId, out QuizRoomTimer? roomTimer);

        if (!message.IsAccepted && roomTimer != null)
        {
            roomTimer.RestartTimer(message.QuestionId, 10, TimerElapsed);
        }
    }

    public async Task TimerElapsed(double elapsed, Guid roomId, Guid questionId, int duration) 
    {
        if (elapsed < 0)
        {
            await Clients.Group(roomId.ToString()).OnTimerExpired(roomId, questionId);
            _roomTimers.TryGetValue(roomId, out QuizRoomTimer? roomTimer);
            roomTimer?.StopTimer(questionId);
        } else await Clients.Group(roomId.ToString()).OnTimerElapsed(elapsed, roomId, questionId);
    }

    public async Task StopTimer(Guid roomId, Guid questionId)
    {
        _roomTimers.TryGetValue(roomId, out QuizRoomTimer? roomTimer);
        if (roomTimer != null)
        {
            roomTimer.StopTimer(questionId);
            await Clients.Group(roomId.ToString()).OnTimerStopped(roomId, questionId);
        }
    }
}
