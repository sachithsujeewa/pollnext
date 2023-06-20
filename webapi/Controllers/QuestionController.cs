using Microsoft.AspNetCore.Mvc;
using webapi.DB;
using webapi.Models;

namespace webapi.Controllers;

[ApiController]
[Route("[controller]")]
public class QuestionController : ControllerBase
{
    private readonly AskDBContext _context;
    /// <summary>
    /// main controller
    /// </summary>
    /// <param name="context"></param>
    public QuestionController(AskDBContext context)
    {
        _context = context;
    }

    [HttpGet(Name = "GetQuestion")]
    public IEnumerable<Question> Get()
    {
        return _context.Questions.OrderByDescending(d => d.NoOfLikes).ToArray();
    }

    [HttpPost(Name = "SaveQuestion")]
    public IEnumerable<Question> Post(Question question)
    {
        _context.Questions.Add(question);
        _context.SaveChanges();
        return _context.Questions.OrderByDescending(d => d.NoOfLikes).ToArray();

    }

    [HttpPut(Name = "likeQuestion")]
    public IEnumerable<Question> put(Question questionModel)
    {
        var question = _context.Questions.FirstOrDefault(d => d.Id == questionModel.Id);
        if (question != null)
        {
            if (questionModel.NoOfLikes > 0)
            {
                question.NoOfLikes++;
            }
            else
            {
                question.NoOfLikes--;
            }
            _context.SaveChanges();
        }
        return _context.Questions.OrderByDescending(d => d.NoOfLikes).ToArray();

    }
}

