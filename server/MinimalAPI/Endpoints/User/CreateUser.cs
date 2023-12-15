using Microsoft.AspNetCore.Mvc;
using Entities = MinimalAPI.Data.Entities;
using MinimalAPI.Middlewares.Models.Exception;
using MinimalAPI.Models.Responses;
using MinimalAPI.Services;
using MinimalAPI.Middlewares.Extensions;
using MinimalAPI.ErrorMapping;
using MinimalAPI.Models.Requests;

namespace MinimalAPI.Endpoints.User;
public partial class UserEndpoints
{
    [ProducesResponseType(typeof(UserResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(APIExceptionModel), StatusCodes.Status500InternalServerError)]
    private static async Task<IResult> CreateUser(IUserServices userService, [FromBody]CreateUserRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Username)) throw new APIException(UserErrorMapping.UsernameRequired);

        Entities.User user = await userService.CreateUserAsync(request.Username);

        return Results.Ok(new UserResponse(user.UserName, user.Id));
    }
}
