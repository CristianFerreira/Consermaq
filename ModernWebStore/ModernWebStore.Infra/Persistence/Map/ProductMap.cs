using ModernWebStore.Domain.Entities;
using System.Data.Entity.ModelConfiguration;

namespace ModernWebStore.Infra.Persistence.Map
{
    public class ProductMap : EntityTypeConfiguration<Product>
    {
        public ProductMap()
        {
            ToTable("Product");

            HasKey(x => x.Id);

            Property(x => x.CodeProduct).HasMaxLength(30).IsRequired();

            Property(x => x.Description)
                .HasMaxLength(1024)
                .IsRequired();

            Property(x => x.PriceBuy)
                .IsRequired();

            Property(x => x.QuantityOnHand)
                .IsRequired();

            Property(x => x.Title)
                .HasMaxLength(60)
                .IsRequired();
        }
    }
}
