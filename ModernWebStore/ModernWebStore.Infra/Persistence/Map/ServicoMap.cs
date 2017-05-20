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

            Property(x => x.InicioServico).IsRequired();
            Property(x => x.FimServico).IsRequired();
            Property(x => x.Status).IsRequired();
            Property(x => x.Valor).IsRequired();
            Property(x => x.ServicoEfetuado).IsRequired().HasMaxLength(200);

            Property(x => x.Ocorrencia).IsOptional().HasMaxLength(200); ;
            Property(x => x.Causa).IsOptional().HasMaxLength(200); ;



            HasRequired(x => x.User);
            HasRequired(x => x.OrdemServico);
            HasMany(x => x.ServicoItems)
                .WithRequired(x => x.Servico);
        }
    }
}
