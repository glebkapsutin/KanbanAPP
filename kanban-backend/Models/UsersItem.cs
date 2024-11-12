using Microsoft.AspNetCore.Identity;

namespace KanbanApp.Models
{
    public class UserItem : IdentityUser<int>
    {


        public string? Name { get; set; }

        public string? SurName { get; set; }

        public int Age { get; set; }

        public string? Description { get; set; }


        public ICollection<ProjectItem>? Projects { get; set; }


    }
}
