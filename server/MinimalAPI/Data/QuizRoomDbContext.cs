using Microsoft.EntityFrameworkCore;
using MinimalAPI.Data.Entities;
using MinimalAPI.Data.EntitiesConfigurations;

namespace MinimalAPI.Data;
public class QuizRoomDbContext(DbContextOptions<QuizRoomDbContext> options) : DbContext(options)
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new UserConfiguration());
        modelBuilder.ApplyConfiguration(new QuizRoomConfiguration());
        modelBuilder.ApplyConfiguration(new QuizRoomScoreConfiguration());

        base.OnModelCreating(modelBuilder);
    }

    public DbSet<User> Users { get; set; }
    public DbSet<QuizRoom> QuizRooms { get; set; }
    public DbSet<QuizRoomScore> QuizRoomsScore { get; set; }
}
