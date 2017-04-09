namespace ModernWebStore.Infra.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Profile : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.OrderItems", "OrderId", "dbo.Order");
            DropForeignKey("dbo.Order", "UserId", "dbo.User");
            DropForeignKey("dbo.OrderItems", "ProductId", "dbo.Product");
            DropIndex("dbo.OrderItems", new[] { "ProductId" });
            DropIndex("dbo.OrderItems", new[] { "OrderId" });
            DropIndex("dbo.Order", new[] { "UserId" });
            CreateTable(
                "dbo.Cliente",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Nome = c.String(nullable: false, maxLength: 60),
                        Rua = c.String(nullable: false, maxLength: 60),
                        Numero = c.String(nullable: false, maxLength: 10),
                        Bairro = c.String(nullable: false, maxLength: 60),
                        CEP = c.String(nullable: false, maxLength: 9),
                        Celular = c.String(maxLength: 14),
                        Telefone = c.String(maxLength: 13),
                        Observacao = c.String(maxLength: 500),
                        CPF = c.String(maxLength: 14),
                        CNPJ = c.String(maxLength: 18),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.OrdemServico",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        servicoSolicitado = c.String(nullable: false),
                        DataInicial = c.DateTime(nullable: false),
                        DataEncerramento = c.DateTime(),
                        Status = c.Int(nullable: false),
                        ClienteId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Cliente", t => t.ClienteId, cascadeDelete: true)
                .Index(t => t.ClienteId);
            
            CreateTable(
                "dbo.Servico",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Date = c.DateTime(nullable: false),
                        Status = c.Int(nullable: false),
                        OrdemServicoId = c.Int(nullable: false),
                        UserId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.User", t => t.UserId, cascadeDelete: true)
                .ForeignKey("dbo.OrdemServico", t => t.OrdemServicoId, cascadeDelete: true)
                .Index(t => t.OrdemServicoId)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.ServicoItems",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Quantity = c.Int(nullable: false),
                        ProductId = c.Int(nullable: false),
                        ServicoId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Product", t => t.ProductId, cascadeDelete: true)
                .ForeignKey("dbo.Servico", t => t.ServicoId, cascadeDelete: true)
                .Index(t => t.ProductId)
                .Index(t => t.ServicoId);
            
            DropTable("dbo.OrderItems");
            DropTable("dbo.Order");
            DropTable("dbo.PessoaFisica");
            DropTable("dbo.PessoaJuridica");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.PessoaJuridica",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CNPJ = c.String(nullable: false, maxLength: 11),
                        Nome = c.String(nullable: false, maxLength: 60),
                        Rua = c.String(nullable: false, maxLength: 60),
                        Numero = c.String(nullable: false, maxLength: 10),
                        Bairro = c.String(nullable: false, maxLength: 60),
                        CEP = c.String(nullable: false, maxLength: 8),
                        Telefone = c.String(nullable: false, maxLength: 12),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.PessoaFisica",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CPF = c.String(nullable: false, maxLength: 11),
                        Nome = c.String(nullable: false, maxLength: 60),
                        Rua = c.String(nullable: false, maxLength: 60),
                        Numero = c.String(nullable: false, maxLength: 10),
                        Bairro = c.String(nullable: false, maxLength: 60),
                        CEP = c.String(nullable: false, maxLength: 8),
                        Telefone = c.String(nullable: false, maxLength: 12),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Order",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Date = c.DateTime(nullable: false),
                        UserId = c.Int(nullable: false),
                        Status = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.OrderItems",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Quantity = c.Int(nullable: false),
                        Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                        ProductId = c.Int(nullable: false),
                        OrderId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            DropForeignKey("dbo.OrdemServico", "ClienteId", "dbo.Cliente");
            DropForeignKey("dbo.Servico", "OrdemServicoId", "dbo.OrdemServico");
            DropForeignKey("dbo.Servico", "UserId", "dbo.User");
            DropForeignKey("dbo.ServicoItems", "ServicoId", "dbo.Servico");
            DropForeignKey("dbo.ServicoItems", "ProductId", "dbo.Product");
            DropIndex("dbo.ServicoItems", new[] { "ServicoId" });
            DropIndex("dbo.ServicoItems", new[] { "ProductId" });
            DropIndex("dbo.Servico", new[] { "UserId" });
            DropIndex("dbo.Servico", new[] { "OrdemServicoId" });
            DropIndex("dbo.OrdemServico", new[] { "ClienteId" });
            DropTable("dbo.ServicoItems");
            DropTable("dbo.Servico");
            DropTable("dbo.OrdemServico");
            DropTable("dbo.Cliente");
            CreateIndex("dbo.Order", "UserId");
            CreateIndex("dbo.OrderItems", "OrderId");
            CreateIndex("dbo.OrderItems", "ProductId");
            AddForeignKey("dbo.OrderItems", "ProductId", "dbo.Product", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Order", "UserId", "dbo.User", "Id", cascadeDelete: true);
            AddForeignKey("dbo.OrderItems", "OrderId", "dbo.Order", "Id", cascadeDelete: true);
        }
    }
}
