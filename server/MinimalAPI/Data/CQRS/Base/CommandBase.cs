using Microsoft.EntityFrameworkCore;
using MinimalAPI.Data.Entities;

namespace MinimalAPI.Data.CQRS.Base;
public class CommandBase<T>(QuizRoomDbContext context) : ICommandBase<T> where T : EntityBase
{
    protected QuizRoomDbContext Context { get; set; } = context;

    public void Add(T entity) => Context.Set<T>().Add(entity);
    public async Task AddAsync(T entity) => await Context.Set<T>().AddAsync(entity);

    public void Update(T entity)
    {
        Context.Entry(entity).State = EntityState.Modified;
        Context.Set<T>().Update(entity);
    }

    public void Remove(T entity) => Context.Set<T>().Remove(entity);
}

public interface ICommandBase<T>
{
    void Add(T entity);
    Task AddAsync(T entity);
    void Update(T entity);
    void Remove(T entity);
}
