using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.DB;
using webapi.Models;

namespace webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MemberController : ControllerBase
    {
        private readonly AskDBContext _context;

        public MemberController(AskDBContext context)
        {
            _context = context;
        }


        [HttpPost(Name = "SaveMember")]
        public void Post(Member member)
        {
            _context.Members.Add(member);
            _context.SaveChanges();
        }
    }
}
