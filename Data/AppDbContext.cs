using Microsoft.EntityFrameworkCore;
using SHOP_BE.Models;

namespace SHOP_BE.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Order> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ================= USER CONFIG =================
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(x => x.Id);

                entity.Property(x => x.Email)
                      .IsRequired();

                entity.Property(x => x.Password)
                      .IsRequired();

                // SEED DATA (admin mặc định)
                entity.HasData(
                    new User
                    {
                        Id = 1,
                        Email = "admin@gmail.com",
                        Password = "123456"
                    }
                );
            });
        }
    }
}