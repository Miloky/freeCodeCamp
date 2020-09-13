using System.Threading.Tasks;
using FreeCodeCamp.Domain;
using FreeCodeCamp.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FreeCodeCamp.FileMetadata.Controllers
{
    [ApiController]
    [Produces("application/json")]
    [Route("api/exercise")]
    public class ExerciseController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ExerciseController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> FindExercise(int id)
        {
            var exersice = await _context.Exercises.FirstOrDefaultAsync(exersice => exersice.Id == id);
            if (exersice == null)
            {
                return NotFound();
            }

            return Ok(exersice);
        }

        [HttpGet]
        [Route("")]
        public async Task<IActionResult> Exercises()
        {
            var exersices = await _context.Exercises.ToListAsync();
            return Ok(exersices);
        }

        [HttpPost]
        // TODO: Create view models
        public async Task<IActionResult> AddExercise(Exercise exercise)
        {
            // TODO: validate data
            await _context.Exercises.AddAsync(exercise);
            await _context.SaveChangesAsync();
            return Ok(exercise.Id);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var exercise = await _context.Exercises.FirstOrDefaultAsync(exercise => exercise.Id == id);
            if (exercise == null)
            {
                return NotFound();
            }

            _context.Exercises.Remove(exercise);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}