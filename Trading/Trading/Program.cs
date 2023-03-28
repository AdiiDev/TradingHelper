using ElectronNET.API;
using NLog;
using NLog.Extensions.Logging;
using NLog.Web;

namespace Trading
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var logger = NLog.LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();
            logger.Debug("init main");

            try
            {
                logger.Info("Starting up");
                CreateHostBuilder(args).Build().Run();
            }
            catch (Exception ex)
            {
                logger.Fatal(ex, "Stopped program because of exception");
                throw;
            }
            finally
            {
                NLog.LogManager.Shutdown();
            }
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
                Host.CreateDefaultBuilder(args)
                    .ConfigureWebHostDefaults(webBuilder =>
                    {
                        webBuilder.ConfigureLogging(x => {
                            x.ClearProviders();
                            x.AddNLog();
                            });
                        webBuilder.UseNLog();
                        webBuilder.UseElectron(args);
                        webBuilder.UseStartup<Startup>();
                    });
    }
}