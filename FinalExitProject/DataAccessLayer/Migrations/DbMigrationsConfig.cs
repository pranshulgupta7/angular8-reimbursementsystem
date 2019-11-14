namespace DataAccessLayer.Migrations
{
    using DataAccessLayer;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Data.Entity.Migrations;
    using System.Linq;

    public sealed class DbMigrationsConfig : DbMigrationsConfiguration<DataAccessLayer.ApplicationDbContext>
    {
        public DbMigrationsConfig()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(DataAccessLayer.ApplicationDbContext context)
        {
            //Seed initial data only if the database is empty
            if (!context.Users.Any())
            {
                var adminEmail = "admin@admin.com";
                var adminUserName = "adminEmail";
                var adminFullName = "System Administrator";
                var adminPassword = adminEmail;
                string adminRole = "Administrator";
                var adminPanNumber = "1234567";
                var adminBank = "Icici";
                var adminBankAccountNumber = 1234;
                CreateAdminUser(context, adminEmail, adminUserName, adminFullName, adminPassword, adminRole, adminPanNumber, adminBank, adminBankAccountNumber);
                CreateSeveralReimbursement(context);
            }
        }

        private void CreateSeveralReimbursement(ApplicationDbContext context)
        {
            context.ReimbursementTables.Add(new ReimbursementTable()
            {
                ReimbursementType = "Medical",
                RequestedValue = 12000,
                ApprovedValue = 11000,
                Date = DateTime.Now,
                ReceiptAttached = "No"
            });

            context.ReimbursementTables.Add(new ReimbursementTable()
            {
                ReimbursementType = "Insurance",
                RequestedValue = 2000,
                ApprovedValue = 1000,
                Date = DateTime.Now,
                ReceiptAttached = "No"
            });
        }

        private void CreateAdminUser(ApplicationDbContext context, string adminEmail, string adminUserName, string adminFullName, string adminPassword, string adminRole, string adminPanNumber, string adminBank, int adminBankAccountNumber)
        {
            //Create the admin user
            var adminUser = new ApplicationUser
            {
                UserName = adminUserName,
                FullName = adminFullName,
                Email = adminEmail,
                PanNumber = adminPanNumber,
                Bank = adminBank,
                BankAccountNumber = adminBankAccountNumber
            };
            var userStore = new UserStore<ApplicationUser>(context);
            var userManager = new UserManager<ApplicationUser>(userStore);
            userManager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 1,
                RequireNonLetterOrDigit = false,
                RequireLowercase = false,
                RequireUppercase = false,
                RequireDigit = false
            };
            var userCreateResult = userManager.Create(adminUser, adminPassword);
            if (!userCreateResult.Succeeded)
            {
                throw new Exception(String.Join(";", userCreateResult.Errors));
            }

            // Create the "administrator" role
            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));
            var roleCreateResult = roleManager.Create(new IdentityRole(adminRole));
            if (!roleCreateResult.Succeeded)
            {
                throw new Exception(String.Join(";", roleCreateResult.Errors));
            }
            //add admin user to the administrator role
            var addAdminRoleResult = userManager.AddToRole(adminUser.Id, adminRole);
            if (!addAdminRoleResult.Succeeded)
            {
                throw new Exception(String.Join(";", addAdminRoleResult.Errors));
            }
        }
    }
}
