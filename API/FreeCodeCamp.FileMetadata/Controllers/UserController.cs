using System.Threading.Tasks;
using FreeCodeCamp.Domain;
using FreeCodeCamp.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FreeCodeCamp.FileMetadata.Controllers
{
    [ApiController]
    [Produces("application/json")]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        public UserController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> FindUser(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(user => user.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPost("{username}")]
        public async Task<IActionResult> Add(string username)
        {
            // TODO: Check for null and whitespace 
            // TODO: Check for wrong symbols
            var user = await _context.Users.FirstOrDefaultAsync(user => user.NormalizedUsername == username);
            if (user != null)
            {
                return BadRequest("User already exist!");
            }

            user = new User
            {
                Username = username,
                // TODO: Move to another place
                NormalizedUsername = username.ToUpperInvariant()
            };
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return Ok(user.Id);
        }
    }
}