namespace Core.Configs
{
    public class AppConfiguration
    {
        public string Username { get; set; } = "";
        public string ConnectionString { get; set; } = "";
        public string Language { get; set; } = "pl";
        public string Theme { get; set; } = "dark";
        public string SavePath { get; set; } = "";
        public string DBEngine { get; set; } = "MSSQL";
    }
}
