using Microsoft.AspNetCore.Mvc;
using WebApiMongoDbDemo.Domain;
using WebApiMongoDbDemo.Domain.Interfaces;

namespace WebApiMongoDbDemo.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PostController : ControllerBase
{
    private readonly IPostService _service;

    public PostController(IPostService service)
    {
        _service = service;
    }

    public record CreatePostRequest(string Title, string Content);

    [HttpPost]
    public async Task<ActionResult<Post>> Create([FromBody] CreatePostRequest req)
    {
        var post = new Post
        {
            Title = req.Title,
            Content = req.Content,
            CreatedAt = DateTime.UtcNow
        };

        var created = await _service.CreateAsync(post);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Post>> GetById(string id)
    {
        var post = await _service.GetByIdAsync(id);
        return post is null ? NotFound() : Ok(post);
    }

    [HttpGet]
    public async Task<IEnumerable<Post>> GetAll()
        => await _service.GetAllAsync();

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, [FromBody] CreatePostRequest req)
    {
        var post = new Post { Id = id, Title = req.Title, Content = req.Content };
        var updated = await _service.UpdateAsync(post);
        return updated is null ? NotFound() : NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        await _service.DeleteAsync(id);
        return NoContent();
    }
}