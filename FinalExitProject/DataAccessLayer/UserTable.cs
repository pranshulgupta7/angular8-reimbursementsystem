using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DataAccessLayer
{
    public class UserTable
    {
        public UserTable()
        {
            this.ReimbursementTables = new HashSet<ReimbursementTable>();
        }

        public int Id { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        [Display(Name = "Re-Type Password")]
        public string ReTypePassword { get; set; }

        [Required]
        [Display(Name = "Full Name")]
        public string FullName { get; set; }

        [Required]
        [Display(Name = "PAN Number")]
        public string PanNumber { get; set; }

        [Required]
        public string Bank { get; set; }

        [Required]
        [Display(Name = "Bank Account Number")]
        public int BankAccountNumber { get; set; }

        public virtual ICollection<ReimbursementTable> ReimbursementTables { get; set; }
        public string LoggedOn { get; set; }
        public string UserName { get; set; }
    }
}
