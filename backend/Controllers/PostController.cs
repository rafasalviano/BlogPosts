//para o endpoind de compressão
using System.IO.Compression;
using System.Text;
using System.Text.Json;

using Bogus; // criador de blablabla
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

    [HttpPost("seed")]
    public async Task<IActionResult> SeedPosts()
    {
        var faker = new Faker<Post>() //“Faker” is the main class inside the Bogus library
            .RuleFor(p => p.Title, f => f.Lorem.Sentence(5))
            .RuleFor(p => p.Content, f => f.Lorem.Paragraphs(3))
            .RuleFor(p => p.CreatedAt, f => DateTime.UtcNow)
            .RuleFor(p => p.UpdatedAt, f => DateTime.UtcNow);

        var posts = faker.Generate(500); // generate 500 fake posts
        foreach (var post in posts)
        {
            await _service.CreateAsync(post);
        }

        return Ok(new { message = "500 posts seeded successfully." });
    }


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

    [HttpGet("compare")]
    public async Task<IActionResult> CompareCompression()
    {
        // todos os posts
        var posts = await _service.GetAllAsync();

        // json
        var json = JsonSerializer.Serialize(posts);
        var uncompressedBytes = Encoding.UTF8.GetBytes(json);
        var uncompressed = uncompressedBytes.Length;

        // comprimir usando Brotli
        byte[] compressedBytes;
        using (var input = new MemoryStream(uncompressedBytes))
        using (var output = new MemoryStream())
        {
            using (var brotli = new BrotliStream(output, CompressionMode.Compress, leaveOpen: true))
            {
                await input.CopyToAsync(brotli);
            }
            compressedBytes = output.ToArray();
        }

        var compressed = compressedBytes.Length;

        // retorne ambos e %
        var reductionPercent = Math.Round((1 - (double)compressed / uncompressed) * 100, 2);

        return Ok(new { uncompressed, compressed, reductionPercent });
    }

    [HttpGet]
    public async Task<IEnumerable<Post>> GetAll()
        => await _service.GetAllAsync();

    [HttpGet("paginated")]
    public async Task<IEnumerable<Post>> GetPaginated(
        [FromQuery] int page = 1, 
        [FromQuery] int take = 25)
    {
        var skip = (page - 1) * take;
        return await _service.GetPaginatedAsync(skip, take);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, [FromBody] CreatePostRequest req)
    {
        var post = new Post { Id = id, Title = req.Title, Content = req.Content };
        var updated = await _service.UpdateAsync(post);
        return updated is null ? NotFound() : NoContent();
    }

    [HttpDelete("all")]
    public async Task<IActionResult> DeleteAll()
    {
        await _service.DeleteAllAsync();
        return Ok(new { message = "Todos os posts foram deletados com sucesso." });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        await _service.DeleteAsync(id);
        return NoContent();
    }
}