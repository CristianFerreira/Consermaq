using ModernWebStore.Domain.Entities;
using System.Data.Entity.ModelConfiguration;

namespace ModernWebStore.Infra.Persistence.Map
{
    public class ServicoMap : EntityTypeConfiguration<Servico>
    {
        public ServicoMap()
        {
            ToTable("Servico");

            HasKey(x => x.Id);

            Property(x => x.Date).IsRequired();
            Property(x => x.Status).IsRequired();

            HasRequired(x => x.User);
            HasRequired(x => x.OrdemServico);
            HasMany(x => x.ServicoItems)
                .WithRequired(x => x.Servico);
        }
    }
}
