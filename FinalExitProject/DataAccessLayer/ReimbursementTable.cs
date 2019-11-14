using System;
using System.ComponentModel.DataAnnotations;

namespace DataAccessLayer
{
    public class ReimbursementTable
    {
        public int Id { get; set; }

        //[Required]
        public DateTime Date { get; set; }

        //[Required]
        [Display(Name = "Reimbursement Type")]
        public string ReimbursementType { get; set; }

        //[Required]
        [Display(Name = "Requested Value")]
        public int RequestedValue { get; set; }

        //[Required]
        [Display(Name = "Approved Value")]
        public int ApprovedValue { get; set; }

        //[Required]
        public string Currency { get; set; }

        //[Required]
        [Display(Name = "Requested Phase")]
        public string RequestedPhase { get; set; }

        //[Required]
        [Display(Name = "Receipt Attached")]
        public string ReceiptAttached { get; set; }

        // public int UserId { get; set; }
        public string userName { get; set; }

        public virtual UserTable UserTable { get; set; }
        public string LoggedOn { get; set; }
    }
}
