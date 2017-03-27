using ModernWebStore.Domain.Entities;
using System.Data.Entity.ModelConfiguration;

namespace ModernWebStore.Infra.Persistence.Map
{
    public class PessoaFisicaMap : EntityTypeConfiguration<PessoaFisica>
    {
        public PessoaFisicaMap()
        {
            ToTable("PessoaFisica");

            HasKey(x => x.Id);
        
            Property(x => x.Nome)
                .HasMaxLength(60)
                .IsRequired();

            Property(x => x.CPF)
                .HasMaxLength(14)
                .IsRequired();

            Property(x => x.Rua)
                .HasMaxLength(60)
                .IsRequired();

            Property(x => x.Numero)
                .HasMaxLength(10)
                .IsRequired();

            Property(x => x.Bairro)
                .HasMaxLength(60)
                .IsRequired();

            Property(x => x.CEP)
                .HasMaxLength(9)
                .IsRequired();

            Property(x => x.Telefone)
                .HasMaxLength(14)
                .IsRequired();
        }
    }
}
