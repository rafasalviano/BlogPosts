using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace WebApiMongoDbDemo.Entities
{
    public class Post
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }     

        [BsonElement("title")]
        public string Title { get; set; } = default!;

        [BsonElement("content")]
        public string Content { get; set; } = default!;

        [BsonElement("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [BsonElement("updated_at")]
        public DateTime? UpdatedAt { get; set; }
    }
}
