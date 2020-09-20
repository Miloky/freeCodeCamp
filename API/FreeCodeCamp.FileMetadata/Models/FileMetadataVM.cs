using System;
using Microsoft.AspNetCore.Http;

namespace FreeCodeCamp.FileMetadata.Models
{
    public class FileMetadataVM
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public long Size { get; set; }

        public static Func<IFormFile, FileMetadataVM> Projection = file => new FileMetadataVM
        {
            Name = file.FileName,
            Type = file.ContentType,
            Size = file.Length
        };
    }
}