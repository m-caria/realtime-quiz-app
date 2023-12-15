using Microsoft.AspNetCore.Mvc;
using MinimalAPI.Middlewares.Models.Exception;
using MinimalAPI.Models.Responses;
using MinimalAPI.Services;
using Entities = MinimalAPI.Data.Entities;

namespace MinimalAPI.Endpoints.QuizRoom;
public partial class QuizRoomEndpoints
{
    [ProducesResponseType(typeof(QuizRoomResponse[]), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(APIExceptionModel), StatusCodes.Status500InternalServerError)]
    private static async Task<IResult> GetAllQuizRooms(IQuizRoomServices quizRoomServices)
    {
        IEnumerable<Entities.QuizRoom> rooms = await quizRoomServices.GetAllQuizRoomsAsync();

        return Results.Ok(rooms.Select(r => new QuizRoomResponse()
        {
            Id = r.Id,
            Name = r.Name,
            MaxPartecipants = r.MaxPartecipants,
            OwnerName = r.Owner?.UserName ?? "",
            Players = [.. r.Players.Select(p => new UserResponse(p.UserName, p.Id))]
        }));
    }
}
