using ModernWebStore.Domain.Entities;
using System.Data.Entity.ModelConfiguration;

namespace ModernWebStore.Infra.Persistence.Map
{
    public class ServicoItemMap : EntityTypeConfiguration<ServicoItem>
    {
        public ServicoItemMap()
        {
            ToTable("ServicoItems");

            HasKey(x => x.Id);

            Property(x => x.Quantity).IsRequired();

            HasRequired(x => x.Servico);
            HasRequired(x => x.Product);
        }
    }
}
