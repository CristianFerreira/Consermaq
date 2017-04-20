namespace ModernWebStore.Infra.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Profile : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Servico", "ServicoEfetuado", c => c.String(nullable: false, maxLength: 200));
            AlterColumn("dbo.Servico", "Ocorrencia", c => c.String(maxLength: 200));
            AlterColumn("dbo.Servico", "Causa", c => c.String(maxLength: 200));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Servico", "Causa", c => c.String());
            AlterColumn("dbo.Servico", "Ocorrencia", c => c.String());
            DropColumn("dbo.Servico", "ServicoEfetuado");
        }
    }
}
