using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Child_Guardian.Models
{
    public class Parent
    {
        public int Id { get; set; }
        public string MotherFname { get; set; }
        public string MotherLname { get; set; }
        public string FatherFname { get; set; }
        public string FatherLname { get; set; }
        public int PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string AvatarUrl { get; set; }
    }
}