using System.Collections.Concurrent;
using System.Timers;

namespace MinimalAPI.Utils;
public class QuizRoomTimer(Guid roomId, double interval) : System.Timers.Timer(interval)
{
    public struct QuestionTimer
    {
        public DateTime StartedAt { get; set; }
        public int Duration { get; set; }
        public System.Timers.Timer Timer { get; set; }
    }

    public ConcurrentDictionary<Guid, QuestionTimer> QuestionsTimers { get; set; } = new();

    public void StartTimer(Guid questionId, int duration, Func<double, Guid, Guid, int, Task> timerCallback)
    {
        DateTime now = DateTime.Now;
        QuestionTimer questionTimer = new() { Duration = duration, StartedAt = now };
        System.Timers.Timer timer = new(1000) { Enabled = true };

        timer.Elapsed += async (object? _, ElapsedEventArgs e) =>
        {
            int elapsed = (int)(duration - Math.Floor((e.SignalTime - now).TotalSeconds));
            await timerCallback(elapsed, roomId, questionId, duration);
        };

        timer.Start();
        questionTimer.Timer = timer;
        QuestionsTimers[questionId] = questionTimer;
    }

    public void RestartTimer(Guid questionId, int duration, Func<double, Guid, Guid, int, Task> timerCallback)
    {
        QuestionTimer timer = QuestionsTimers[questionId];
        timer.Duration = duration;
        timer.StartedAt = DateTime.Now;

        timer.Timer.Elapsed += async (object? _, ElapsedEventArgs e) =>
        {
            int elapsed = (int)(duration - Math.Floor((e.SignalTime - timer.StartedAt).TotalSeconds));
            await timerCallback(elapsed, roomId, questionId, duration);
        };

        timer.Timer.Start();
        QuestionsTimers[questionId] = timer;
    }

    public void StopTimer(Guid questionId)
    {
        QuestionsTimers[questionId].Timer.Stop();
    }
}
