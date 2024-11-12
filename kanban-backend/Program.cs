using Microsoft.EntityFrameworkCore; // Необходимо для использования DbContext
using KanbanApp.Data; // Убедись, что у тебя правильное пространство имен для AppDbContext
using Microsoft.AspNetCore.Identity;
using KanbanApp.Models; // Для использования Identity

var builder = WebApplication.CreateBuilder(args);

// Настройка Swagger для документации API
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers(); // Добавлено для поддержки контроллеров

// Настройка CORS политики
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Настройка строки подключения к базе данных
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<KanbanAppDbContext>(options =>
    options.UseNpgsql(connectionString)); // Подключаем контекст базы данных

// Подключаем Identity для работы с пользователями и ролями
builder.Services.AddIdentity<UserItem, IdentityRole<int>>() // Добавляем Identity
    .AddEntityFrameworkStores<KanbanAppDbContext>() // Указываем, что храним пользователей и роли в нашей БД через KanbanAppDbContext
    .AddDefaultTokenProviders(); // Добавляем поддержку токенов для, например, сброса пароля

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    await RoleIntializer.InitializeRoles(services);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting(); // Включение маршрутизации

// Подключаем политику CORS
app.UseCors("AllowAllOrigins");

app.UseAuthentication(); // Подключаем аутентификацию для работы с пользователями
app.UseAuthorization(); // Подключаем авторизацию для защиты маршрутов

app.MapControllers(); // Подключение маршрутов контроллеров

app.Run();
