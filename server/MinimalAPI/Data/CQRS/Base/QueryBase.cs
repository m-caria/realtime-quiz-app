using Microsoft.EntityFrameworkCore;
using MinimalAPI.Data.Entities;
using System.Linq.Expressions;

namespace MinimalAPI.Data.CQRS.Base;
public class QueryBase<T>(QuizRoomDbContext context) : IQueryBase<T> where T : EntityBase
{
    protected QuizRoomDbContext Context { get; set; } = context;

    public IQueryable<T> FindAll() => Context.Set<T>().AsNoTracking();
    public async Task<IEnumerable<T>> FindAllAsync(params Expression<Func<T, object>>[] includes)
        => await includes.Aggregate(Context.Set<T>().AsQueryable(), (current, include) => current.Include(include)).ToListAsync();

    public async Task<T?> FindSingleAsync(Expression<Func<T, bool>> expression, params Expression<Func<T, object>>[] includes)
        => await includes.Aggregate(Context.Set<T>().AsQueryable(), (current, include) => current.Include(include)).SingleOrDefaultAsync(expression);

    public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression) => Context.Set<T>().Where(expression).AsNoTracking();
    public async Task<IEnumerable<T>> FindByConditionAsync(Expression<Func<T, bool>> expression, params Expression<Func<T, object>>[] includes)
        => await includes.Aggregate(Context.Set<T>().AsQueryable(), (current, include) => current.Include(include)).Where(expression).ToListAsync();

    public IQueryable<T> FromRaw(string query, params object[] parameters)
        => Context.Set<T>().FromSqlRaw(query, parameters);
}

public interface IQueryBase<T>
{
    IQueryable<T> FindAll();
    Task<IEnumerable<T>> FindAllAsync(params Expression<Func<T, object>>[] includes);
    Task<T?> FindSingleAsync(Expression<Func<T, bool>> expression, params Expression<Func<T, object>>[] includes);
    IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression);
    Task<IEnumerable<T>> FindByConditionAsync(Expression<Func<T, bool>> expression, params Expression<Func<T, object>>[] includes);
    IQueryable<T> FromRaw(string query, params object[] parameters);
}
