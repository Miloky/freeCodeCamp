using System.Linq;
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
        public IActionResult GetMetadata(IFormFileCollection files)
        {

          var metadata =  files.Select(FileMetadataVM.Projection).ToList();
            return Ok(metadata);
        }
    }
}
