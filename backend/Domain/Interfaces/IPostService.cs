namespace WebApiMongoDbDemo.Domain.Interfaces;

public interface IPostService
{
    Task<Post?> GetByIdAsync(string id);
    Task<IEnumerable<Post>> GetAllAsync();
    Task<IEnumerable<Post>> GetPaginatedAsync(int skip, int take);
    Task<Post> CreateAsync(Post post);
    Task<Post?> UpdateAsync(Post post);
    Task DeleteAsync(string id);
    Task DeleteAllAsync();
}
