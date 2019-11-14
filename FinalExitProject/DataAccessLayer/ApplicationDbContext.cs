using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;

namespace DataAccessLayer
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        //public virtual IDbSet<UserTable> UserTable { get; set; }
        //public virtual IDbSet<ReimbursementTable> ReimbursementTable { get; set; }
        public System.Data.Entity.DbSet<DataAccessLayer.UserTable> UserTables { get; set; }

        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //AspNetUsers -> User
            modelBuilder.Entity<ApplicationUser>()
                .ToTable("User");
            //AspNetRoles -> Role
            modelBuilder.Entity<IdentityRole>()
                .ToTable("Role");
            //AspNetUserRoles -> UserRole
            modelBuilder.Entity<IdentityUserRole>()
                .ToTable("UserRole");
            //AspNetUserClaims -> UserClaim
            modelBuilder.Entity<IdentityUserClaim>()
                .ToTable("UserClaim");
            //AspNetUserLogins -> UserLogin
            modelBuilder.Entity<IdentityUserLogin>()
                .ToTable("UserLogin");
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }

        public System.Data.Entity.DbSet<DataAccessLayer.ReimbursementTable> ReimbursementTables { get; set; }
        public System.Data.Entity.DbSet<DataAccessLayer.ImageTable> ImageTable { get; set; }
    }
}