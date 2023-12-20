using Microsoft.AspNetCore.Mvc.Testing;

namespace MinimalAPI.IntegrationTest;
public abstract class BaseTest
{
    protected readonly HttpClient _httpClient;

    public BaseTest()
    {
        WebApplicationFactory<Program> applicationFactory = new WebApplicationFactory<Program>();
        _httpClient = applicationFactory.CreateClient();
    }
}
