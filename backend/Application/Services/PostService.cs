using WebApiMongoDbDemo.Data.Entities;
using WebApiMongoDbDemo.Domain;
using WebApiMongoDbDemo.Domain.Interfaces;

namespace WebApiMongoDbDemo.Application;

public class PostService : IPostService
{
    private readonly IPostRepository _repo;

    public PostService(IPostRepository repo)
    {
        _repo = repo;
    }

    private static Post MapToDomain(PostDto dto) => new()
    {
        Id = dto.Id,
        Title = dto.Title,
        Content = dto.Content,
        CreatedAt = dto.CreatedAt,
        UpdatedAt = dto.UpdatedAt
    };

    private static PostDto MapToDto(Post post) => new()
    {
        Id = post.Id,
        Title = post.Title,
        Content = post.Content,
        CreatedAt = post.CreatedAt,
        UpdatedAt = post.UpdatedAt
    };

    public async Task<Post> CreateAsync(Post post)
    {
        var dto = MapToDto(post);
        var created = await _repo.CreateAsync(dto);
        return MapToDomain(created);
    }

    public async Task DeleteAsync(string id)
        => await _repo.DeleteAsync(id);

    public async Task DeleteAllAsync()
    {
        await _repo.DeleteAllAsync();
    }
    public async Task<IEnumerable<Post>> GetAllAsync()
    {
        var dtos = await _repo.GetAllAsync();
        return dtos.Select(MapToDomain);
    }

    public async Task<IEnumerable<Post>> GetPaginatedAsync(int skip, int take)
    {
        var dtos = await _repo.GetPaginatedAsync(skip, take);
        return dtos.Select(dto => new Post
        {
            Id = dto.Id.ToString(),
            Title = dto.Title,
            Content = dto.Content,
            CreatedAt = dto.CreatedAt,
            UpdatedAt = dto.UpdatedAt
        });
    }

    public async Task<Post?> GetByIdAsync(string id)
    {
        var dto = await _repo.GetByIdAsync(id);
        return dto is null ? null : MapToDomain(dto);
    }

    public async Task<Post?> UpdateAsync(Post post)
    {
        var dto = MapToDto(post);
        var updated = await _repo.UpdateAsync(dto);
        return updated is null ? null : MapToDomain(updated);
    }
}