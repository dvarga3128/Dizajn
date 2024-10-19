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



var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(o => {

    o.ConfigObject.AdditionalItems.Add("requestSnippetsEnabled", true);
    o.EnableTryItOutByDefault();

});


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
