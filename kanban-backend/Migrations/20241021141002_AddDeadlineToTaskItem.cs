using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace KanbanApp.Migrations
{
    /// <inheritdoc />
    public partial class AddDeadlineToTaskItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_ProjectItems_ProjectsId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectItems_TaskItems_TaskId",
                table: "ProjectItems");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_ProjectsId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ProjectsId",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "TaskId",
                table: "ProjectItems",
                newName: "UserItemId");

            migrationBuilder.RenameIndex(
                name: "IX_ProjectItems_TaskId",
                table: "ProjectItems",
                newName: "IX_ProjectItems_UserItemId");

            migrationBuilder.AddColumn<DateTime>(
                name: "Deadline",
                table: "TaskItems",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProjectId",
                table: "TaskItems",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "TaskItems",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CreatedComment = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    TaskId = table.Column<int>(type: "integer", nullable: false),
                    UserItemId = table.Column<int>(type: "integer", nullable: false),
                    TaskItemId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comments_AspNetUsers_UserItemId",
                        column: x => x.UserItemId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Comments_TaskItems_TaskItemId",
                        column: x => x.TaskItemId,
                        principalTable: "TaskItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TaskItems_ProjectId",
                table: "TaskItems",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskItems_UserId",
                table: "TaskItems",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_TaskItemId",
                table: "Comments",
                column: "TaskItemId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_UserItemId",
                table: "Comments",
                column: "UserItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectItems_AspNetUsers_UserItemId",
                table: "ProjectItems",
                column: "UserItemId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskItems_AspNetUsers_UserId",
                table: "TaskItems",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TaskItems_ProjectItems_ProjectId",
                table: "TaskItems",
                column: "ProjectId",
                principalTable: "ProjectItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectItems_AspNetUsers_UserItemId",
                table: "ProjectItems");

            migrationBuilder.DropForeignKey(
                name: "FK_TaskItems_AspNetUsers_UserId",
                table: "TaskItems");

            migrationBuilder.DropForeignKey(
                name: "FK_TaskItems_ProjectItems_ProjectId",
                table: "TaskItems");

            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropIndex(
                name: "IX_TaskItems_ProjectId",
                table: "TaskItems");

            migrationBuilder.DropIndex(
                name: "IX_TaskItems_UserId",
                table: "TaskItems");

            migrationBuilder.DropColumn(
                name: "Deadline",
                table: "TaskItems");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "TaskItems");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "TaskItems");

            migrationBuilder.RenameColumn(
                name: "UserItemId",
                table: "ProjectItems",
                newName: "TaskId");

            migrationBuilder.RenameIndex(
                name: "IX_ProjectItems_UserItemId",
                table: "ProjectItems",
                newName: "IX_ProjectItems_TaskId");

            migrationBuilder.AddColumn<int>(
                name: "ProjectsId",
                table: "AspNetUsers",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_ProjectsId",
                table: "AspNetUsers",
                column: "ProjectsId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_ProjectItems_ProjectsId",
                table: "AspNetUsers",
                column: "ProjectsId",
                principalTable: "ProjectItems",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectItems_TaskItems_TaskId",
                table: "ProjectItems",
                column: "TaskId",
                principalTable: "TaskItems",
                principalColumn: "Id");
        }
    }
}
