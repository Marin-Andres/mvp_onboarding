using Microsoft.EntityFrameworkCore;
using mvp_onboarding.Server.Interfaces;
using mvp_onboarding.Server.Models;
using mvp_onboarding.Server.Classes;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Logging.ClearProviders();
builder.Logging.AddConsole();


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<ICustomerMethods, CustomerMethods>();
builder.Services.AddScoped<IProductMethods, ProductMethods>();
builder.Services.AddScoped<IStoreMethods, StoreMethods>();
builder.Services.AddScoped<ISaleMethods, SaleMethods>();
builder.Services.AddScoped<ISalesViewMethods, SalesViewMethods>();

builder.Services.AddDbContext<TalentOnboardingContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Onboarding")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowViteLocalhost",
        policy =>
        {
            policy.WithOrigins("https://localhost:5173")  
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

app.UseCors("AllowViteLocalhost");

app.UseDefaultFiles();
app.UseStaticFiles();
app.UseExceptionHandler("/error");
app.UseHsts();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
