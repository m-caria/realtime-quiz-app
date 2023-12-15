using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using MinimalAPI.Data;
using MinimalAPI.Data.CQRS;
using MinimalAPI.Services;
using MinimalAPI.Settings;

namespace MinimalAPI.Extensions;
public static class ServicesExtensions
{
    public static IApiSettings ConfigureSettings(this IServiceCollection services, IConfiguration configuration)
    {
        IApiSettings settings = configuration.GetSection("ApiSettings").Get<ApiSettings>() ?? new ApiSettings();
        services.AddSingleton(settings);

        return settings;
    }

    public static void ConfigureSwagger(this IServiceCollection services, string version, string title, string description)
    {
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(setup =>
        {
            setup.SwaggerDoc(version, new Microsoft.OpenApi.Models.OpenApiInfo
            {
                Version = version,
                Title = title,
                Description = description,
                Contact = new Microsoft.OpenApi.Models.OpenApiContact
                {
                    Email = "mail@manuelcaria.it",
                    Name = "Realtime Quiz Room",
                    Url = new Uri("https://www.manuelcaria.dev")
                }
            });
        });
    }

    public static void ConfigureDbContext(this IServiceCollection services, IApiSettings settings)
    {
        SqliteConnection connection = new(settings.ConnectionString);
        connection.Open();

        services.AddDbContext<QuizRoomDbContext>(options =>
        {
            options.UseSqlite(connection);
        });
    }

    public static void InjectDependecies(this IServiceCollection services)
    {
        services.AddScoped<IQuizRoomCommandWrapper, QuizRoomCommandWrapper>();
        services.AddScoped<IQuizRoomQueryWrapper, QuizRoomQueryWrapper>();
        services.AddScoped<IUserServices, UserServices>();
        services.AddScoped<IQuizRoomServices, QuizRoomServices>();
    }

    public static void ApplyDbContextMigration(this IApplicationBuilder app)
    {
        using IServiceScope serviceScope = app.ApplicationServices.CreateScope();
        QuizRoomDbContext? context = serviceScope.ServiceProvider.GetService<QuizRoomDbContext>();

        if (context != null && context.Database != null)
        {
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();
        } 
    }
}
