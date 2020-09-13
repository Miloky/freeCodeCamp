using FreeCodeCamp.Persistence;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;

namespace FreeCodeCamp.FileMetadata
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddPersistence();
            // Register the Swagger services
            services.AddSwaggerDocument();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // Register the Swagger generator and the Swagger UI middlewares
            app.UseOpenApi();
            app.UseSwaggerUi3();
            
            app.UseRouting();
            app.UseEndpoints(options =>
            {
                options.MapDefaultControllerRoute();
            });
        }
    }
}
