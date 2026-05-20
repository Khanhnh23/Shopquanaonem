namespace SHOP_BE.Models
{
    public class Product
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public string Image { get; set; } = string.Empty;

        public string Category { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string Material { get; set; } = string.Empty;

        public string Color { get; set; } = string.Empty;

        public string Size { get; set; } = string.Empty;
    }
}