using MongoDB.Driver;
using WebApiMongoDbDemo.Data.Entities;
using WebApiMongoDbDemo.Domain.Interfaces;

namespace WebApiMongoDbDemo.Data;

public class PostRepository : IPostRepository
{
    private readonly IMongoCollection<PostDto> _posts;

    public PostRepository(IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DbConnection");
        var mongoUrl = MongoUrl.Create(connectionString);
        var client = new MongoClient(mongoUrl);
        var database = client.GetDatabase(mongoUrl.DatabaseName);
        _posts = database.GetCollection<PostDto>("posts");
    }

    public async Task<PostDto> CreateAsync(PostDto post)
    {
        await _posts.InsertOneAsync(post);
        Console.WriteLine($"[Repository] Inserting type: {post.GetType().FullName}");

        return post;
    }

    public async Task DeleteAsync(string id)
        => await _posts.DeleteOneAsync(x => x.Id == id);

    public async Task DeleteAllAsync()
        => await _posts.DeleteManyAsync(Builders<PostDto>.Filter.Empty);
    public async Task<IEnumerable<PostDto>> GetAllAsync()
        => await _posts.Find(FilterDefinition<PostDto>.Empty).ToListAsync();
    public async Task<IEnumerable<PostDto>> GetPaginatedAsync(int skip, int take)
    {
        return await _posts.Find(_ => true)
            .Skip(skip)
            .Limit(take)
            .ToListAsync();
    }


    public async Task<PostDto?> GetByIdAsync(string id)
        => await _posts.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task<PostDto?> UpdateAsync(PostDto post)
    {
        var filter = Builders<PostDto>.Filter.Eq(x => x.Id, post.Id);
        var update = Builders<PostDto>.Update
            .Set(x => x.Title, post.Title)
            .Set(x => x.Content, post.Content)
            .Set(x => x.UpdatedAt, DateTime.UtcNow);

        var result = await _posts.UpdateOneAsync(filter, update);
        if (result.MatchedCount == 0) return null;

        return await GetByIdAsync(post.Id!);
    }
}