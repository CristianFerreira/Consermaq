namespace ModernWebStore.Infra.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Profile : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Cliente", "Bloqueado", c => c.Boolean(nullable: false));
            AddColumn("dbo.OrdemServico", "ValorTotal", c => c.Decimal(precision: 18, scale: 2));
            AddColumn("dbo.Servico", "Valor", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AddColumn("dbo.User", "Bloqueado", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.User", "Bloqueado");
            DropColumn("dbo.Servico", "Valor");
            DropColumn("dbo.OrdemServico", "ValorTotal");
            DropColumn("dbo.Cliente", "Bloqueado");
        }
    }
}
