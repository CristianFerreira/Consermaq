using ModernWebStore.Domain.Entities;
using System.Data.Entity.ModelConfiguration;

namespace ModernWebStore.Infra.Persistence.Map
{
    public class ClienteMap : EntityTypeConfiguration<Cliente>
    {
        public ClienteMap()
        {
            ToTable("Cliente");

            HasKey(x => x.Id);

            Property(x => x.Nome)
                .HasMaxLength(60)
                .IsRequired();

            Property(x => x.CPF)
                .HasMaxLength(14)
                .IsOptional();

            Property(x => x.CNPJ)
               .HasMaxLength(18)
               .IsOptional();

            Property(x => x.Rua)
                .HasMaxLength(60)
                .IsRequired();

            Property(x => x.Numero)
                .HasMaxLength(10)
                .IsRequired();

            Property(x => x.Bairro)
                .HasMaxLength(60)
                .IsRequired();

            Property(x => x.Observacao)
               .HasMaxLength(500)
               .IsOptional();

            Property(x => x.CEP)
                .HasMaxLength(9)
                .IsRequired();

            Property(x => x.Celular)
                .HasMaxLength(14)
                .IsOptional();

            Property(x => x.Telefone)
                .HasMaxLength(13)
                .IsOptional();

            HasMany(x => x.OrdemServicos)
              .WithRequired(x => x.Cliente);
        }
    }
}
