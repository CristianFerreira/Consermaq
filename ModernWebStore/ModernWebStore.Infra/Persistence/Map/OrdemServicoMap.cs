
using ModernWebStore.Domain.Entities;
using System.Data.Entity.ModelConfiguration;

namespace ModernWebStore.Infra.Persistence.Map
{
    public class OrdemServicoMap : EntityTypeConfiguration<OrdemServico>
    {
        public OrdemServicoMap()
        {
            ToTable("OrdemServico");

            HasKey(x => x.Id);

            Property(x => x.DataInicial).IsRequired();
            Property(x => x.servicoSolicitado).HasMaxLength(300).IsRequired();
            Property(x => x.DataEncerramento).IsOptional();
            Property(x => x.ValorTotal).IsOptional();


            Property(x => x.Status).IsRequired();

            HasRequired(x => x.Cliente);
       
            HasMany(x => x.Servicos)
                .WithRequired(x => x.OrdemServico);

            Ignore(x => x.MateriaisAtualizados);
            Ignore(x => x.ServicoItemsRemovidos);
            Ignore(x => x.ServicosRemovidos);
        }
    }
}
