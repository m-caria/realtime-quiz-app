using MinimalAPI.Data.CQRS.Commands;

namespace MinimalAPI.Data.CQRS;
public class QuizRoomCommandWrapper(QuizRoomDbContext context) : IQuizRoomCommandWrapper
{
    private readonly QuizRoomDbContext _context = context;

    private IUserCommands? _user;
    private IQuizRoomCommands? _quizRoom;
    private IQuizRoomScoreCommands? _quizRoomScore;

    public IUserCommands User => _user ??= new UserCommands(_context);
    public IQuizRoomCommands QuizRoom => _quizRoom ??= new QuizRoomCommands(_context);
    public IQuizRoomScoreCommands QuizRoomScore => _quizRoomScore ??= new QuizRoomScoreCommands(_context);

    public void SaveChanges()
    {
        if (_context.ChangeTracker.HasChanges())
            _context.SaveChanges();
    }

    public async Task SaveChangesAsync()
    {
        if (_context.ChangeTracker.HasChanges())
            await _context.SaveChangesAsync();
    }
}

public interface IQuizRoomCommandWrapper
{
    IUserCommands User { get; }
    IQuizRoomCommands QuizRoom { get; }
    IQuizRoomScoreCommands QuizRoomScore { get; }
    void SaveChanges();
    Task SaveChangesAsync();
}
