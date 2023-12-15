using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MinimalAPI.Data.Entities;

namespace MinimalAPI.Data.EntitiesConfigurations;
public class QuizRoomConfiguration : IEntityTypeConfiguration<QuizRoom>
{
    public void Configure(EntityTypeBuilder<QuizRoom> builder)
    {
        builder.HasKey(e => e.Id);

        builder.HasMany(e => e.Players)
            .WithMany(e => e.QuizRooms)
            .UsingEntity("PlayersRooms");

        builder.HasOne(e => e.Owner)
            .WithMany(e => e.OwnershipQuizRooms)
            .HasForeignKey(e => e.OwnerId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(e => e.Winner)
            .WithMany(e => e.WinnerQuizRooms)
            .HasForeignKey(e => e.WinnerId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(e => e.Scores)
            .WithOne(e => e.Room)
            .HasForeignKey(e => e.RoomId);

        builder.Property(e => e.Name).IsRequired();
        builder.Property(e => e.TotalQuestions).HasColumnType("integer");
        builder.Property(e => e.MaxPartecipants).HasColumnType("integer");

        builder.HasIndex(e => e.Name);
    }
}
