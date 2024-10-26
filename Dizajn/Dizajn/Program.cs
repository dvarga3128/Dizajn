using Dizajn.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);



builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddDbContext<DizajnContext>(opcije =>
{
    opcije.UseSqlServer(builder.Configuration.GetConnectionString("DizajnContext"));
});


// Svi se od svuda na sve moguæe naèine mogu spojitina naš API
// Čitati https://code-maze.com/aspnetcore-webapi-best-practices/
builder.Services.AddCors(opcije =>
{
    opcije.AddPolicy("CorsPolicy",
        builder =>
            builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
    );

});



var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(o => {

    o.ConfigObject.AdditionalItems.Add("requestSnippetsEnabled", true);
    o.EnableTryItOutByDefault();

});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// za potrebe produkcije
app.UseStaticFiles();
app.UseDefaultFiles();
app.MapFallbackToFile("index.html");

app.UseCors("CorsPolicy");

app.Run();
