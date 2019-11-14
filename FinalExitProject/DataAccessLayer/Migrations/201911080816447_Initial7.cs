namespace DataAccessLayer.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial7 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ReimbursementTables", "userName", c => c.String());
            DropColumn("dbo.ReimbursementTables", "UserId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ReimbursementTables", "UserId", c => c.Int(nullable: false));
            DropColumn("dbo.ReimbursementTables", "userName");
        }
    }
}
