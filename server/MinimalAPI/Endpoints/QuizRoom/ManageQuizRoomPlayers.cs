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
    private static async Task<IResult> ManageQuizRoomPlayers(
        IQuizRoomServices quizRoomServices, IHubContext<QuizRoomHub> quizRoomHub,
        IUserServices userServices,
        Guid roomId, [FromBody]ManageQuizRoomPlayersRequest request
    ) {
        if (string.IsNullOrEmpty(roomId.ToString())) throw new APIException(QuizRoomErrorMapping.RoomIdRequired);
        Entities.User user = await userServices.GetUserByIdAsync(request.PlayerId);

        Entities.QuizRoom room = new();

        if (request.IsJoined) room = await quizRoomServices.JoinToQuizRoomAsync(roomId, request.PlayerId);
        else room = await quizRoomServices.LeaveFromQuizRoomAsync(roomId, request.PlayerId);

        await quizRoomHub.Clients.All.SendAsync(nameof(IQuizRoomHubMessages.OnPlayerJoinOrLeftInRoom), new OnPlayerJoinOrLeftInRoomData()
        {
            RoomId = roomId,
            Players = [.. room.Players.Select(p => new UserResponse(p.UserName, p.Id))]
        });

        return Results.Ok(new QuizRoomResponse()
        {
            Id = room.Id,
            Name = room.Name,
            MaxPartecipants = room.MaxPartecipants,
            OwnerName = room.Owner?.UserName ?? "",
            Players = [.. room.Players.Select(p => new Player(p.Id, p.UserName, room.Scores.FirstOrDefault(s => s.PlayerId == p.Id)?.Score ?? 0))]
        });
    }
}
