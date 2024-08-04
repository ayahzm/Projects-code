using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Child_Guardian.Models
{
    public class Doctor
    {

        public int Id { get; set; }       
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Major { get; set; }
        public string University { get; set; }
        public string Country { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public string Password { get; set; }
        public int BirthYear { get; set; }
        public int YearOfGraduation { get; set; }
        public string Role { get; set; }
        public int MedicalLicenseNumber { get; set; }
        
    }
}