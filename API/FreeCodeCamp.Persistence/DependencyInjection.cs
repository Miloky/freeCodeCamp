using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;

namespace FreeCodeCamp.Persistence
{
    public static class DependencyInjection
    {
        public static void AddPersistence(this IServiceCollection services)
        {
            services.AddDbContext<AppDbContext>(options =>
            {
                options.UseInMemoryDatabase("FreeCodeCamp");
            });
        }
    }
}
