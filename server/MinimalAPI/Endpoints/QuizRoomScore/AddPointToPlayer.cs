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
using Response = MinimalAPI.Models.Responses;

namespace MinimalAPI.Endpoints.QuizRoomScore;
public partial class QuizRoomScoreEndpoints
{
    [ProducesResponseType(typeof(QuizRoomScoreResponse[]), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(APIExceptionModel), StatusCodes.Status500InternalServerError)]
    private static async Task<IResult> AddPointToPlayer(
        IUserServices userServices,
        IQuizRoomScoreServices quizRoomScoreServices,
        IHubContext<QuizRoomHub> quizRoomHub,
        Guid roomId, [FromBody] AddPointToPlayerRequest request
    )
    {
        if (string.IsNullOrWhiteSpace(roomId.ToString())) throw new APIException(QuizRoomErrorMapping.RoomIdRequired);
        if (string.IsNullOrWhiteSpace(request.PlayerId.ToString())) throw new APIException(UserErrorMapping.UserIdRequired);

        IEnumerable<Entities.QuizRoomScore> scores = await quizRoomScoreServices.AddPointToPlayerAsync(roomId, request.PlayerId);
        Entities.QuizRoomScore? playerScore = scores.FirstOrDefault(p => p.Player.Id == request.PlayerId);
        Entities.User user = await userServices.GetUserByIdAsync(request.PlayerId);

        await quizRoomHub.Clients.Group(roomId.ToString()).SendAsync(nameof(IQuizRoomHubMessages.OnAddedPlayerScore), new OnAddPlayerScoreData(roomId, user.Id, user.UserName, playerScore?.Score ?? 0));

        return Results.Ok(new QuizRoomScoreResponse()
        {
            RoomId = roomId,
            Scores = scores.Select(s => new Response.QuizRoomScore(s.PlayerId, s.Player.UserName, s.Score)).ToList(),
        });
    }
}
