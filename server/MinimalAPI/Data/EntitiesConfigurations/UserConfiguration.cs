using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MinimalAPI.Data.Entities;

namespace MinimalAPI.Data.EntitiesConfigurations;
public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(e => e.Id);

        builder.HasMany(e => e.OwnershipQuizRooms)
            .WithOne(e => e.Owner)
            .HasForeignKey(e => e.OwnerId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(e => e.QuizRooms)
            .WithMany(e => e.Players)
            .UsingEntity("PlayersRooms");

        builder.HasMany(e => e.Scores)
            .WithOne(e => e.Player)
            .HasForeignKey(e => e.PlayerId);

        builder.Property(e => e.UserName).IsRequired();

        builder.HasIndex(e => e.UserName);
    }
}
