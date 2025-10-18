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
        return CSVHelper.GetQuestions();
    }

    [HttpPost(Name = "SaveQuestion")]
    public IEnumerable<Question> Post(Question question)
    {
        try
        {
            question.Id = Guid.NewGuid().ToString();
            CSVHelper.AddQuestion(question);
            return CSVHelper.GetQuestions();
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    [HttpPut(Name = "likeQuestion")]
    public IEnumerable<Question> put(Question questionModel)
    {
        var question = CSVHelper.GetQuestions().FirstOrDefault(d => d.Id == questionModel.Id);
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
            CSVHelper.UpdateQuestion(question);
        }
        return CSVHelper.GetQuestions().OrderByDescending(d => d.NoOfLikes).ToArray();

    }
}

