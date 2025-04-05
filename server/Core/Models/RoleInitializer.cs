using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
namespace KanbanApp.Core.Models
{
    public class RoleIntializer
    {
        public static async Task InitializeRoles(IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole<int>>>();
            string[] roleNames = {"Admin","User"};

            foreach (var roleName in roleNames)
            {
                if(!await roleManager.RoleExistsAsync(roleName))
                {
                    await roleManager.CreateAsync(new IdentityRole<int>(roleName));
                }
                
            }
        }
    }
    
}