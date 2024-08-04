using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Child_Guardian.Models
{
    public class Child
    {
        public int Id { get; set; }
        public int ParentId { get; set; }
        public int BirthYear { get; set; }
        public string BloodType { get; set; }
        public int Weight { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MedicalNotes { get; set; }
        public string AvatarUrl { get; set; }
    }
}