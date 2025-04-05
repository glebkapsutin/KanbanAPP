using System.Text.Json.Serialization;

namespace KanbanApp.Core.Models
{
    public class ProjectItem
    {
        public int Id { get; set; }
        public string? Name { get; set; }
       
        public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();


        public string? Description { get; set; }


    }
}
