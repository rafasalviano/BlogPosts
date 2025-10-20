using Bogus;
using Microsoft.AspNetCore.ResponseCompression;
using System.IO.Compression;
using WebApiMongoDbDemo.Data;
using WebApiMongoDbDemo.Domain.Interfaces;
using WebApiMongoDbDemo.Application;

var builder = WebApplication.CreateBuilder(args);

// --- Compression setup ---
builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true; // compress even over HTTPS
    options.Providers.Add<BrotliCompressionProvider>();
    options.Providers.Add<GzipCompressionProvider>();
});

builder.Services.Configure<BrotliCompressionProviderOptions>(opts =>
{
    opts.Level = CompressionLevel.Fastest; // or Optimal if you want more compression
});

builder.Services.Configure<GzipCompressionProviderOptions>(opts =>
{
    opts.Level = CompressionLevel.Fastest;
});

// --- Existing setup ---
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IPostRepository, PostRepository>();
builder.Services.AddScoped<IPostService, PostService>();

builder.Services.AddCors(opt =>
{
    opt.AddDefaultPolicy(p =>
        p.WithOrigins("http://localhost:3000")
         .AllowAnyHeader()
         .AllowAnyMethod());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// --- Use compression middleware before endpoints ---
app.UseResponseCompression();

app.UseCors();
app.UseAuthorization();
app.MapControllers();

app.Run();