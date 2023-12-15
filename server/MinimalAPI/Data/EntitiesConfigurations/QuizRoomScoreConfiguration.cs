using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MinimalAPI.Data.Entities;

namespace MinimalAPI.Data.EntitiesConfigurations;
public class QuizRoomScoreConfiguration : IEntityTypeConfiguration<QuizRoomScore>
{
    public void Configure(EntityTypeBuilder<QuizRoomScore> builder)
    {
        builder.HasKey(e => e.Id);


        builder.HasOne(e => e.Room)
            .WithMany(e => e.Scores)
            .HasForeignKey(e => e.RoomId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(e => e.Player)
           .WithMany(e => e.Scores)
           .HasForeignKey(e => e.PlayerId)
           .OnDelete(DeleteBehavior.Cascade);

        builder.Property(e => e.Score).HasColumnType("integer");
    }
}
