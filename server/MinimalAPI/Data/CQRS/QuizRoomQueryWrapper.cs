using MinimalAPI.Data.CQRS.Queries;

namespace MinimalAPI.Data.CQRS;
public class QuizRoomQueryWrapper(QuizRoomDbContext context) : IQuizRoomQueryWrapper
{
    private readonly QuizRoomDbContext _context = context;

    private IUserQueries? _user;
    private IQuizRoomQueries? _quizRoom;
    private IQuizRoomScoreQueries? _quizRoomScore;

    public IUserQueries User => _user ??= new UserQueries(_context);
    public IQuizRoomQueries QuizRoom => _quizRoom ??= new QuizRoomQueries(_context);
    public IQuizRoomScoreQueries QuizRoomScore => _quizRoomScore ??= new QuizRoomScoreQueries(_context);
}

public interface IQuizRoomQueryWrapper
{
    IUserQueries User { get; }
    IQuizRoomQueries QuizRoom { get; }
    IQuizRoomScoreQueries QuizRoomScore { get; }
}