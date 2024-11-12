namespace KanbanApp.Models
{
    public class ProjectItem
    {
        public int Id { get; set; }
        public ICollection<TaskItem>? Tasks { get; set; }

        public string? Description { get; set; }


    }
}
