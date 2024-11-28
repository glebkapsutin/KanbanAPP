using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KanbanApp.Migrations
{
    /// <inheritdoc />
    public partial class AddProjectName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "ProjectItems",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "ProjectItems");
        }
    }
}
