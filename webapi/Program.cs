using Microsoft.EntityFrameworkCore;
using webapi.DB;


var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("https://jjbstorage.z8.web.core.windows.net/",
                                              "*").AllowAnyHeader()
                                                  .AllowAnyMethod(); 
                      });
});

// Add services to the container.
builder.Services.AddDbContext<AskDBContext>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("AskDBConStr")));
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
