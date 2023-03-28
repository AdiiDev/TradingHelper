namespace Core.JWT
{
    public interface IJWTGenerator
    {
        string GenerateJWT(int userId, string name, int roleId, string key, string issuer, int validTime);
    }
}
