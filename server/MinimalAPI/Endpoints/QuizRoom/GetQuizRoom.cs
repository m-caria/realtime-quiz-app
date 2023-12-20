using Microsoft.AspNetCore.Mvc;
using MinimalAPI.ErrorMapping;
using MinimalAPI.Middlewares.Extensions;
using MinimalAPI.Middlewares.Models.Exception;
using MinimalAPI.Models.Responses;
using MinimalAPI.Services;
using Entities = MinimalAPI.Data.Entities;

namespace MinimalAPI.Endpoints.QuizRoom;
public partial class QuizRoomEndpoints
{
    [ProducesResponseType(typeof(QuizRoomResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(APIExceptionModel), StatusCodes.Status500InternalServerError)]
    private static async Task<IResult> GetQuizRoom(IQuizRoomServices quizRoomServices, Guid roomId)
    {
        if (string.IsNullOrEmpty(roomId.ToString())) throw new APIException(QuizRoomErrorMapping.RoomIdRequired);

        Entities.QuizRoom room = await quizRoomServices.GetQuizRoomByIdAsync(roomId);

        return Results.Ok(new QuizRoomResponse()
        {
            Id = room.Id,
            Name = room.Name,
            MaxPartecipants = room.MaxPartecipants,
            OwnerName = room.Owner?.UserName ?? "",
            Winner = room.Scores.Where(s => s.Score == 5).FirstOrDefault()?.PlayerId.ToString() ?? string.Empty,
            Players = [.. room.Players.Select(p => new Player(p.Id, p.UserName, room.Scores.FirstOrDefault(s => s.PlayerId == p.Id)?.Score ?? 0))]
        });
    }
}
