using Core.Configs;
using Core.DB;
using Core.Security;
using DatabaseContext;
using ElectronNET.API;
using ElectronNET.API.Entities;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Newtonsoft.Json;
using Trading.Application;

namespace Trading
{
    // TODO: Add autoupdated -
    // https://github.com/ElectronNET/electron.net-api-demos/blob/master/ElectronNET-API-Demos/electron.manifest.json
    // https://github.com/ElectronNET/electron.net-api-demos/blob/master/ElectronNET-API-Demos/Controllers/UpdateController.cs
    // https://github.com/zaherg/electron-auto-update-example/blob/master/electron-builder.json
    // https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
    public class Startup
    {
        private readonly AppConfiguration _appConfiguration;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            _appConfiguration = EnsureAppConfig();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddElectron();
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });
            services.AddCors();
            services.AddControllersWithViews();

            //_appConfiguration.ConnectionString = "Server=.\\SQLEXPRESS;Database=TradingApp;Trusted_Connection=True;MultipleActiveResultSets=true;";
            services.AddSingleton<AppConfiguration>(_appConfiguration);
            // Secure AppMainDB
            if (!string.IsNullOrEmpty(_appConfiguration.ConnectionString))
            {
                services.AddScoped<IAppMainDB>(x => new AppMainDB(_appConfiguration.ConnectionString, "MSSQL", true));
                services.AddTradesModule();
            }

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "clientapp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider serviceProvider)
        {
            if (!string.IsNullOrEmpty(_appConfiguration.ConnectionString))
                ConfigureDB(serviceProvider);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            if (!env.IsDevelopment())
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseRouting();
            app.UseCors(builder =>
            {
                builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "clientapp";
                var reactEnv = HybridSupport.IsElectronActive ? "win" : "web";
                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: reactEnv);
                }
            });

            if (HybridSupport.IsElectronActive)
            {
                CreateElectronWindow();
            }
        }

        private AppConfiguration EnsureAppConfig()
        {
            var basePath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.CommonApplicationData), "Trading");
            if (!Directory.Exists(basePath))
                Directory.CreateDirectory(basePath);

            var filePath = Path.Combine(basePath, "appConfig");

            if (File.Exists(filePath))
            {
                var guard = new ConfigurationGuard();
                var fileBytes = File.ReadAllBytes(filePath);
                var fileString = guard.Decrypt(fileBytes);

                // !TODO: Not sure how it will behave. It may create config each time app is run
                if (!fileString.Contains("Username"))
                {
                    return CreateConfig(filePath);
                }
                else
                {
                    return JsonConvert.DeserializeObject<AppConfiguration>(fileString);
                }
            }
            else
            {
                return CreateConfig(filePath);
            }
        }

        private void ConfigureDB(IServiceProvider service)
        {
            IAppMainDB? mainDB = service?.GetService<IAppMainDB>();
            if (mainDB == null)
            {
                throw new ArgumentNullException($"Missing IAppMainDB from service provider");
            }

            mainDB?.PrepareDB();
        }

        private static AppConfiguration CreateConfig(string filePath)
        {
            var appConfig = new AppConfiguration();
            var appConfigString = JsonConvert.SerializeObject(appConfig, Formatting.Indented);
            var guard = new ConfigurationGuard();
            var appConfigBytes = guard.Encrypt(appConfigString);
            File.WriteAllBytes(filePath, appConfigBytes);

            return appConfig;
        }

        private async void CreateElectronWindow()
        {
            //https://www.electronjs.org/docs/latest/tutorial/windows-taskbar

            var browserWindow = await Electron.WindowManager.CreateWindowAsync(new BrowserWindowOptions
            {
                Show = false,
                WebPreferences = new WebPreferences { NodeIntegration = true, ContextIsolation = true, EnableRemoteModule = true, DevTools = true },
                Frame = false,
                Resizable = true,
                TitleBarStyle = TitleBarStyle.hidden,
                AutoHideMenuBar = true,
            });
            browserWindow.SetMenuBarVisibility(false);

            browserWindow.OnReadyToShow += () => browserWindow.Show();

            AddIPCListeners();

            Electron.Notification.Show(new ElectronNET.API.Entities.NotificationOptions("Trading start", "Current Version: 1.0.0"));
        }

        private void AddIPCListeners()
        {
            Electron.IpcMain.On("toggle-maximize-window", async (args) =>
            {
                var mainWindow = Electron.WindowManager.BrowserWindows.First();
                var res = await mainWindow.IsMaximizedAsync();
                if (res)
                    mainWindow.Unmaximize();
                else
                    mainWindow.Maximize();
                //Electron.IpcMain.Send(mainWindow, "asynchronous-reply", "pong");
            });
            //https://github.com/ElectronNET/electron.net-api-demos/blob/master/ElectronNET-API-Demos/Views/Ipc/Index.cshtml
            Electron.IpcMain.On("reload-web", async (args) =>
            {
                var mainWindow = Electron.WindowManager.BrowserWindows.First();
                mainWindow.Reload();
            });
            Electron.IpcMain.On("reload-web", async (args) =>
            {
                var mainWindow = Electron.WindowManager.BrowserWindows.First();
                mainWindow.Reload();
            });
            Electron.IpcMain.On("minimize", async (args) =>
            {
                var mainWindow = Electron.WindowManager.BrowserWindows.First();
                mainWindow.Minimize();
            });
            Electron.IpcMain.On("dev-tools", async (args) =>
            {
                var mainWindow = Electron.WindowManager.BrowserWindows.First();
                mainWindow.WebContents.OpenDevTools();
            });
            Electron.IpcMain.On("close", async (args) =>
            {
                var mainWindow = Electron.WindowManager.BrowserWindows.First();
                mainWindow.Close();
            });
        }
    }
}
