namespace KanbanApp.Models
{
    public class RegisterModel
    {


        public string? Email { get; set; }= string.Empty;
        public string? Password { get; set; }= string.Empty;
        public string Name { get; set; } = string.Empty; // Имя пользователя
        public string SurName { get; set; } = string.Empty; // Фамилия пользователя
        public int Age { get; set; } // Возраст пользователя
        public string Description { get; set; } = string.Empty; // Описание пользователя

    }
}
