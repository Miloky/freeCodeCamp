using System;

namespace FreeCodeCamp.Domain
{
    public class Exercise
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
    }
}
