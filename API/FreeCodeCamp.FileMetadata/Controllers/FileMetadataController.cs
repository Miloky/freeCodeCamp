using FreeCodeCamp.FileMetadata.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FreeCodeCamp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class FileMetadataController : ControllerBase
    {
        [HttpPost]
        [DisableRequestSizeLimit]
        public IActionResult GetMetadata(IFormFile file)
        {
            var metadata = new FileMetadataVM
            {
                Name = file.FileName,
                Type = file.ContentType,
                Size = file.Length
            };
            return Ok(metadata);
        }
    }
}
