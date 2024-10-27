using LiquibaseAdmin.Configuration.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Reflection;
using System.Text.Json.Serialization;
using Alpi.Server.Configuration.Extensions;
using LiquibaseAdmin.Database;
using Microsoft.EntityFrameworkCore;
using LiquibaseAdmin.Lib.Di.Extensions;
using LiquibaseAdmin.Server.Cors;

namespace LiquibaseAdmin
{
    public class Startup
    {
        private readonly IConfigurationRoot configuration;
        private readonly IWebHostEnvironment env;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="env"></param>
        public Startup(IWebHostEnvironment env)
        {
            Console.WriteLine("Environment: " + env.EnvironmentName);
            IConfigurationBuilder builder = new ConfigurationBuilder().SetBasePath(env.ContentRootPath);
            builder.AddYamlFile(Path.Combine("appConfig", "app.yaml"), true, true);
            builder.AddYamlFile(Path.Combine("appConfig", $"app.{env.EnvironmentName}.yaml"), optional: true, true);
            configuration = builder.Build();
            this.env = env;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        /// <summary>
        /// 
        /// </summary>
        /// <param name="services"></param>
        public void ConfigureServices(IServiceCollection services)
        {
            JsonConvert.DefaultSettings = () => new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };
            services.AddControllersWithViews().AddJsonOptions(options =>
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter())
            );

            services.LoadConfigurationEntities(configuration, Assembly.GetExecutingAssembly());

            DatabaseConfig databaseConfig = configuration.GetEntityStrict<DatabaseConfig>();

            services.AddControllers().AddNewtonsoftJson();
            services.AddCors();
            services.AddControllers();

            services.AddDbContext<MainDbContext>(options => options.UseNpgsql(databaseConfig.GetConnectionString()));

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.RegisterAutoinjections(Assembly.GetExecutingAssembly());

            services.AddCors(options =>
            {
                options.AddPolicy(DefaultCorsPolicy.Name, new DefaultCorsPolicy("https://liquibase.mlmsoft.app"));
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /// <summary>
        /// 
        /// </summary>
        /// <param name="app"></param>
        /// <param name="configuration"></param>
        /// <param name="loggerFactory"></param>
        public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory)
        {
            app.UseRouting();

            app.UseCors(DefaultCorsPolicy.Name);

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
