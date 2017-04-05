using ModernWebStore.Domain.Entities;
using ModernWebStore.Infra.Persistence.Map;
using System.Data.Entity;

namespace ModernWebStore.Infra.Persistence.DataContexts
{
    //[DbConfigurationType(typeof(MySql.Data.Entity.MySqlEFConfiguration))]
    public class StoreDataContext : DbContext
    {
        public StoreDataContext() :
            base("Consermaq")
        {
            Configuration.ProxyCreationEnabled = false;
            Configuration.LazyLoadingEnabled = false;
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Servico> Servicos { get; set; }
        public DbSet<ServicoItem> ServicosItems { get; set; }
        public DbSet<Cliente> Cliente { get; set; }
        public DbSet<OrdemServico> OrdemServico { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new UserMap());
            modelBuilder.Configurations.Add(new CategoryMap());
            modelBuilder.Configurations.Add(new ProductMap());
            modelBuilder.Configurations.Add(new ServicoMap());
            modelBuilder.Configurations.Add(new ServicoItemMap());
            modelBuilder.Configurations.Add(new ClienteMap());
            //modelBuilder.Configurations.Add(new PessoaFisicaMap());
            //modelBuilder.Configurations.Add(new PessoaJuridicaMap());
            modelBuilder.Configurations.Add(new OrdemServicoMap());
        }
    }
}
