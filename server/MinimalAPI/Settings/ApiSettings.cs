namespace MinimalAPI.Settings;
public record ApiSettings : IApiSettings 
{
    public string ConnectionString { get; } = string.Empty;
}

public interface IApiSettings
{
    string ConnectionString { get; }
}