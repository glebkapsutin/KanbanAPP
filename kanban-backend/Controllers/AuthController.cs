
using Microsoft.AspNetCore.Mvc;

using KanbanApp.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace KanbanApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<UserItem>? _userManager;
        private readonly SignInManager<UserItem>? _signInManager;
        private readonly RoleManager<IdentityRole<int>>? _roleManager;

        public AuthController(UserManager<UserItem>? userManager, SignInManager<UserItem>? signInManager, RoleManager<IdentityRole<int>>? roleManager)
        {   
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            try
            {   if (await _userManager.FindByEmailAsync(model.Email)!=null)
                {
                    return BadRequest(new {Message = "User with this email already exists"});
                }
               
                var user = new UserItem
                {
                    UserName = model.Email,
                    Email = model.Email,
                    Name = model.Name,
                    SurName = model.SurName,
                    Age = model.Age,
                    Description = model.Description

                };
                var regist = await _userManager.CreateAsync(user, model.Password);
                if (regist.Succeeded)
                {
                    return Ok(new { Message = "Registration successful" });
                }
                return BadRequest(regist.Errors);
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);

            }


        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] RegisterModel model)
        {
            try
            {   
               
                var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);
                if (result.Succeeded)
                {
                    // 3. Если успешно, возвращаем сообщение
                    return Ok(new { Message = "Login successful" });
                }
                // 4. Если нет, возвращаем статус 401
                return Unauthorized();

            }
            catch (System.Exception ex)
            {

                return StatusCode(500, "Internal server error: " + ex.Message);
            }


        }
        [Authorize(Roles = "Admin")]
        [HttpPost("assign-role")]
        public async Task<IActionResult> AssignRole(string userId, string roleName )
        {
            var user = await _userManager.FindByIdAsync(userId );
            if (user == null)
            {
                return NotFound("User is not found!");
            }
            var roleExists = await _roleManager.RoleExistsAsync(roleName );
            if(!roleExists)
            {
                return BadRequest("role is not found!");
            }
            var result = await _userManager.AddToRoleAsync(user,roleName );
            if (result.Succeeded)
            {
                return Ok(new {Message = "Role is successful"});
            }
            return BadRequest(new { Message = "Failed to assign role", Errors = result.Errors });
        }
        [HttpGet("get-user-roles/{userId}")]
        public async Task<IActionResult> GetRoleUser(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound("User is not found!");
            }
            var role = await _userManager.GetRolesAsync(user);
            if(role!=null)
            {
                return Ok(role);
            }
            return NotFound();
            
        }
        [HttpDelete("remove-role")]
        public async Task <IActionResult> RemoveRole(string userId,string roleName)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if(user==null)
            {
                return NotFound("User not Found");
            }
            var roleExists = await _roleManager.RoleExistsAsync(roleName);
            if (!roleExists)
            {
                return BadRequest("Role does not exist!");
            }
            var result = await _userManager.RemoveFromRoleAsync(user, roleName);
            if (result.Succeeded)
            {
                return Ok(new { Message = "Role removed successfully" });
            }

            return BadRequest(result.Errors);
        }    

        [HttpGet("get-all-users-with-roles")]
        public async Task<IActionResult> GetAllUsersAndRoles(string userId,string roleName)
        {
            var users = await _userManager.Users.ToListAsync();
            var userRoles = new List<object>();
            foreach(var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                userRoles.Add(new
                {
                    UserId = userId,
                    UserName = user.Name,
                    Roles = roles
                });
            }   
            return Ok(userRoles);
        }
        [HttpPost("edit-user-roles")]
        public async Task<IActionResult> EditUserRoles(string userId,List <string> rolesName)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound("User not found!");
            }
            var currentRoles = await _userManager.GetRolesAsync(user);
            var removeRolesResult = await _userManager.RemoveFromRolesAsync(user, currentRoles);
            if (!removeRolesResult.Succeeded)
            {
                return BadRequest(removeRolesResult.Errors);
            }
            var newRoles = await _userManager.AddToRolesAsync(user, rolesName);

            if (!newRoles.Succeeded)
            {
                return BadRequest(newRoles.Errors);
            }
            return Ok(new { Message = "User roles updated successfully" });

            


        }

       
    }
}

