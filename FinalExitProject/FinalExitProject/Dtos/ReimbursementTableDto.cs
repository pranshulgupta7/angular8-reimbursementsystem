using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FinalExitProject.Dtos
{
    public class ReimbursementTableDto
    {
        public int Id { get; set; }

        //[Required]
        public DateTime Date { get; set; }

        //[Required]
        public string ReimbursementType { get; set; }

        //[Required]
        public int RequestedValue { get; set; }

        //[Required]
        public int ApprovedValue { get; set; }

        //[Required]
        public string Currency { get; set; }

        //[Required]
        public string RequestedPhase { get; set; }

        //[Required]
        public string ReceiptAttached { get; set; }
    }
}