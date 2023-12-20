using MinimalAPI.Endpoints.QuizRoom;
using MinimalAPI.Endpoints.QuizRoomScore;
using MinimalAPI.Endpoints.User;
using MinimalAPI.Extensions;
using MinimalAPI.Hubs;
using MinimalAPI.Settings;

var builder = WebApplication.CreateBuilder(args);

IApiSettings settings = builder.Services.ConfigureSettings(builder.Configuration);
builder.Services.ConfigureDbContext(settings);
builder.Services.InjectDependecies();
builder.Services.ConfigureSwagger("v1", "Realtime Quiz App API", "Web API for realtime quiz app");
builder.Services.AddSignalR();
builder.Services.ConfigureCors();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowClient");
app.UseAPIExceptionMiddleware();
app.ApplyDbContextMigration();

app.UseHttpsRedirection();
app.MapHub<QuizRoomHub>("/quiz-hub");

app.UserEndpointsMap();
app.QuizRoomEndpointsMap();
app.QuizRoomScoreEndpointsMap();

app.Run();

public partial class Program { }