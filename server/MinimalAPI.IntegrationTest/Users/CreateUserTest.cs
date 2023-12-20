using MinimalAPI.Middlewares.Models.Exception;
using MinimalAPI.Models.Requests;
using MinimalAPI.Models.Responses;

namespace MinimalAPI.IntegrationTest.Users;
public class CreateUserTest : BaseTest
{
    [Fact]
    public async Task CreateUser_ShouldReturnCreatedUser()
    {
        CreateUserRequest payload = new("test");
        HttpResponseMessage response = await _httpClient.PostAsJsonAsync("/api/users", payload);
        UserResponse? data = await response.Content.ReadFromJsonAsync<UserResponse>();

        Assert.True(response.IsSuccessStatusCode);
        Assert.NotNull(data);
        Assert.NotEmpty(data.Id.ToString());
    }

    [Fact]
    public async Task CreateUser_UsernameMustNotBeEmpty()
    {
        CreateUserRequest payload = new("");
        HttpResponseMessage response = await _httpClient.PostAsJsonAsync("/api/users", payload);
        APIExceptionModel? error = await response.Content.ReadFromJsonAsync<APIExceptionModel>();

        Assert.True(!response.IsSuccessStatusCode);
        Assert.NotNull(error);
        Assert.Equal("Username must not be empty", error.Message);
    }

    [Fact]
    public async Task CreateUser_ShouldReturnErrorIfUsernameExists()
    {
        CreateUserRequest payload = new("test");
        _ = await _httpClient.PostAsJsonAsync("/api/users", payload);
        HttpResponseMessage response = await _httpClient.PostAsJsonAsync("/api/users", payload);
        APIExceptionModel? error = await response.Content.ReadFromJsonAsync<APIExceptionModel>();

        Assert.True(!response.IsSuccessStatusCode);
        Assert.NotNull(error);
        Assert.Equal("User already exists", error.Message);
    }
}
