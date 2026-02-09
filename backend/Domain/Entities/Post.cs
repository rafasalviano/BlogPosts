namespace WebApiMongoDbDemo.Domain;

public class Post
{
    public string? Id { get; set; }
    public string Title { get; set; } = default!;
    public string Content { get; set; } = default!;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
}