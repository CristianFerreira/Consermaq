namespace ModernWebStore.Infra.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Profile : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Servico", "InicioServico", c => c.DateTime(nullable: false));
            AddColumn("dbo.Servico", "FimServico", c => c.DateTime(nullable: false));
            AddColumn("dbo.Servico", "ServicoEfetuado", c => c.String(nullable: false, maxLength: 200));
            AddColumn("dbo.Servico", "Ocorrencia", c => c.String(maxLength: 200));
            AddColumn("dbo.Servico", "Causa", c => c.String(maxLength: 200));
            DropColumn("dbo.Servico", "Date");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Servico", "Date", c => c.DateTime(nullable: false));
            DropColumn("dbo.Servico", "Causa");
            DropColumn("dbo.Servico", "Ocorrencia");
            DropColumn("dbo.Servico", "ServicoEfetuado");
            DropColumn("dbo.Servico", "FimServico");
            DropColumn("dbo.Servico", "InicioServico");
        }
    }
}
