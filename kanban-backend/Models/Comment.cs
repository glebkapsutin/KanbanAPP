namespace KanbanApp.Models
{
    public class Comment
    {
        public int Id { get; set;}
        public DateTime CreatedComment { get; set;}

        public string? Description { get; set;}

        public int UserId { get; set;}

        public int TaskId { get; set;}

        public UserItem UserItem{ get; set;}

        public TaskItem TaskItem{ get; set;}


        
    }
}