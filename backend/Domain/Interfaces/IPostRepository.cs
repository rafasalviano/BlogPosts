using WebApiMongoDbDemo.Data.Entities;

namespace WebApiMongoDbDemo.Domain.Interfaces;

public interface IPostRepository
{
    Task<PostDto?> GetByIdAsync(string id);
    Task<IEnumerable<PostDto>> GetAllAsync();
    Task<IEnumerable<PostDto>> GetPaginatedAsync(int skip, int take);
    Task<PostDto> CreateAsync(PostDto post);
    Task<PostDto?> UpdateAsync(PostDto post);
    Task DeleteAsync(string id);
    Task DeleteAllAsync();

}
