using Microsoft.AspNetCore.Mvc;
using MinimalAPI.ErrorMapping;
using MinimalAPI.Middlewares.Extensions;
using MinimalAPI.Middlewares.Models.Exception;
using MinimalAPI.Models.Responses;
using MinimalAPI.Services;
using Entities = MinimalAPI.Data.Entities;

namespace MinimalAPI.Endpoints.User;
public partial class UserEndpoints
{
    [ProducesResponseType(typeof(UserResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(APIExceptionModel), StatusCodes.Status500InternalServerError)]
    private static async Task<IResult> GetUser(IUserServices userService, string username)
    {
        if (string.IsNullOrWhiteSpace(username)) throw new APIException(UserErrorMapping.UsernameRequired);

        Entities.User user = await userService.GetUserByNameAsync(username);

        return Results.Ok(new UserResponse(user.UserName, user.Id));
    }
}
