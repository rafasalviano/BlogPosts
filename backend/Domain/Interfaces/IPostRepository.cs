using WebApiMongoDbDemo.Data.Entities;

namespace WebApiMongoDbDemo.Domain.Interfaces;

public interface IPostRepository
{
    Task<PostDto?> GetByIdAsync(string id);
    Task<IEnumerable<PostDto>> GetAllAsync();
    Task<PostDto> CreateAsync(PostDto post);
    Task<PostDto?> UpdateAsync(PostDto post);
    Task DeleteAsync(string id);
}
