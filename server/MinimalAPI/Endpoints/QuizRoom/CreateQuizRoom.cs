using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using MinimalAPI.ErrorMapping;
using MinimalAPI.Hubs;
using MinimalAPI.Hubs.Messages;
using MinimalAPI.Hubs.Models;
using MinimalAPI.Middlewares.Extensions;
using MinimalAPI.Middlewares.Models.Exception;
using MinimalAPI.Models.Requests;
using MinimalAPI.Models.Responses;
using MinimalAPI.Services;
using Entities = MinimalAPI.Data.Entities;

namespace MinimalAPI.Endpoints.QuizRoom;
public partial class QuizRoomEndpoints
{
    [ProducesResponseType(typeof(QuizRoomResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(APIExceptionModel), StatusCodes.Status500InternalServerError)]
    private static async Task<IResult> CreateQuizRoom(
        IQuizRoomServices quizRoomServices, 
        IHubContext<QuizRoomHub> quizRoomHub,
        [FromBody]CreateQuizRoomRequest request
    ) {
        if (string.IsNullOrWhiteSpace(request.Name)) throw new APIException(QuizRoomErrorMapping.RoomNameRequired);

        Entities.QuizRoom quizRoom = await quizRoomServices.CreateQuizRoomAsync(request.Name, request.UserId, request.MaxPartecipants);
        await quizRoomHub.Clients.All.SendAsync(nameof(IQuizRoomHubMessages.OnRoomCreated), new OnCreateRoomData()
        {
            Id = quizRoom.Id,
            MaxPlayers = quizRoom.MaxPartecipants,
            Name = quizRoom.Name,
            OwnerName = quizRoom.Owner?.UserName ?? ""
        });

        return Results.Ok(new QuizRoomResponse()
        {
            Id = quizRoom.Id,
            Name = quizRoom.Name,
            MaxPartecipants = quizRoom.MaxPartecipants,
            OwnerName = quizRoom.Owner?.UserName ?? ""
        });
    }
}
