namespace ModernWebStore.Infra.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Profile : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Product", "CodeProduct", c => c.String(nullable: false, maxLength: 30));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Product", "CodeProduct", c => c.String());
        }
    }
}
