using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using WebApiMongoDbDemo.Data;
using WebApiMongoDbDemo.Entities;

namespace WebApiMongoDbDemo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostController : ControllerBase
    {
        private readonly IMongoCollection<Post> _posts;

        public PostController(MongoDbService mongoDbService)
        {
            _posts = mongoDbService.Database!.GetCollection<Post>("posts");
        }

        public record CreatePostRequest(string title, string post); // matches your frontend payload

        [HttpPost]
        public async Task<ActionResult<Post>> Create([FromBody] CreatePostRequest req)
        {
            TimeZoneInfo brasiliaTimeZone = TimeZoneInfo.FindSystemTimeZoneById("E. South America Standard Time");
            DateTimeOffset brasiliaTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, brasiliaTimeZone);
            // Console.WriteLine($"Timezone ID")
            var post = new Post
            {
                Title = req.title,
                Content = req.post,
                CreatedAt = brasiliaTime,
            };

            await _posts.InsertOneAsync(post);
            return CreatedAtAction(nameof(GetById), new { id = post.Id }, post);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> GetById(string id)
        {
            var filter = Builders<Post>.Filter.Eq(x => x.Id, id);
            var found = await _posts.Find(filter).FirstOrDefaultAsync();
            return found is not null ? Ok(found) : NotFound();
        }

        [HttpGet]
        public async Task<IEnumerable<Post>> GetAll()
        {
            return await _posts.Find(FilterDefinition<Post>.Empty).ToListAsync();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] CreatePostRequest req)
        {
            var update = Builders<Post>.Update
                .Set(x => x.Title, req.title)
                .Set(x => x.Content, req.post)
                .Set(x => x.UpdatedAt, DateTime.UtcNow);

            var result = await _posts.UpdateOneAsync(x => x.Id == id, update);
            return result.MatchedCount == 0 ? NotFound() : NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var result = await _posts.DeleteOneAsync(x => x.Id == id);
            return result.DeletedCount == 0 ? NotFound() : NoContent();
        }
    }
}