using Microsoft.EntityFrameworkCore;
using KanbanApp.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace KanbanApp.Data
{
    public class KanbanAppDbContext : IdentityDbContext<UserItem,IdentityRole<int>,int>
    {
        public KanbanAppDbContext(DbContextOptions<KanbanAppDbContext> options)
        : base(options)
        {
            
        }
        public DbSet<TaskItem> TaskItems { get; set; }
        public DbSet<UserItem> UserItems { get; set; }
        public DbSet<ProjectItem> ProjectItems { get; set; }

        public DbSet<Comment> Comments{ get; set; }



       
    }
}