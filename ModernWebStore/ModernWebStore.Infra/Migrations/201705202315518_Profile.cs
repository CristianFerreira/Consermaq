namespace ModernWebStore.Infra.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Profile : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Cliente", "Bloqueado", c => c.Boolean(nullable: false));
            AddColumn("dbo.User", "Bloqueado", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.User", "Bloqueado");
            DropColumn("dbo.Cliente", "Bloqueado");
        }
    }
}
