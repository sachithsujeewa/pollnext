using Microsoft.EntityFrameworkCore;
using webapi.Models;

namespace webapi.DB
{
    public class AskDBContext : DbContext
    {
        public AskDBContext(DbContextOptions options)
            : base(options)
        {

        }

        public DbSet<Question> Questions { get; set; }
        public DbSet<Member> Members { get; set; }
    }
}
