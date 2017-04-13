namespace ModernWebStore.Infra.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Profile : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.OrdemServico", "servicoSolicitado", c => c.String(nullable: false, maxLength: 300));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.OrdemServico", "servicoSolicitado", c => c.String(nullable: false, maxLength: 100));
        }
    }
}
