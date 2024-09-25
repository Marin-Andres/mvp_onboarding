using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace mvp_onboarding.Server.Models;

public partial class TalentOnboardingContext : DbContext
{
    private readonly IConfiguration _configuration;
    public TalentOnboardingContext(DbContextOptions<TalentOnboardingContext> options, IConfiguration configuration)
        : base(options)
    {
        _configuration = configuration;
    }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<Sale> Sales { get; set; }

    public virtual DbSet<SalesView> SalesViews { get; set; }

    public virtual DbSet<Store> Stores { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            var connectionString = _configuration.GetConnectionString("Onboarding");
            //optionsBuilder.UseSqlServer("Name=ConnectionStrings:Onboarding");
            optionsBuilder.UseSqlServer(connectionString);
        }
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Customer>(entity =>
        {
            entity.ToTable("Customer");

            entity.Property(e => e.Address).HasMaxLength(500);
            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.ToTable("Product");

            entity.Property(e => e.Name).HasMaxLength(200);
            entity.Property(e => e.Price).HasColumnType("money");
        });

        modelBuilder.Entity<Sale>(entity =>
        {
            entity.HasOne(d => d.Customer).WithMany(p => p.Sales)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Sales_Customer");

            entity.HasOne(d => d.Product).WithMany(p => p.Sales)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Sales_Product");

            entity.HasOne(d => d.Store).WithMany(p => p.Sales)
                .HasForeignKey(d => d.StoreId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Sales_Store");
        });

        modelBuilder.Entity<SalesView>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("SalesView");

            entity.Property(e => e.Customer).HasMaxLength(100);
            entity.Property(e => e.Product).HasMaxLength(200);
            entity.Property(e => e.Store).HasMaxLength(100);
        });

        modelBuilder.Entity<Store>(entity =>
        {
            entity.ToTable("Store");

            entity.Property(e => e.Address).HasMaxLength(500);
            entity.Property(e => e.Name).HasMaxLength(100);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
