using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using Child_Guardian.Models;
using System.Threading.Tasks;
using System.Web;
using System.IO;

namespace Child_Guardian.Controllers
{

    [RoutePrefix("api/doctor")]
    public class DoctorController : ApiController
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString);
        SqlCommand cmd = null;
        SqlDataAdapter da = null;

        [HttpPost]
        [Route("SendAccRequest")]
        public string SendAccRequest(Doctor doctor)
        {
            string msg = string.Empty;
            try
            {
                if (string.IsNullOrEmpty(doctor.FirstName) ||
                    string.IsNullOrEmpty(doctor.LastName) ||
                    string.IsNullOrEmpty(doctor.Email) ||
                    string.IsNullOrEmpty(doctor.Password) ||
                    string.IsNullOrEmpty(doctor.Major) ||
                    string.IsNullOrEmpty(doctor.University) ||
                    string.IsNullOrEmpty(doctor.Country) ||
                    string.IsNullOrEmpty(doctor.Gender) ||
                    doctor.BirthYear == 0 || // Assuming BirthYear is required and 0 means not provided
                    doctor.YearOfGraduation == 0 ||
                    doctor.MedicalLicenseNumber == 0)
                {
                    return "Error: One or more required fields are empty.";
                }

                    cmd = new SqlCommand("usp_SendAccRequest", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@FirstName", doctor.FirstName);
                    cmd.Parameters.AddWithValue("@LastName", doctor.LastName);
                    cmd.Parameters.AddWithValue("@Email", doctor.Email);
                    cmd.Parameters.AddWithValue("@Password", doctor.Password);
                    cmd.Parameters.AddWithValue("@Major", doctor.Major);
                    cmd.Parameters.AddWithValue("@University", doctor.University);
                    cmd.Parameters.AddWithValue("@Country", doctor.Country);
                    cmd.Parameters.AddWithValue("@Gender", doctor.Gender);
                    cmd.Parameters.AddWithValue("@BirthYear", doctor.BirthYear);
                    cmd.Parameters.AddWithValue("@YearOfGraduation", doctor.YearOfGraduation);
                    cmd.Parameters.AddWithValue("@MLN", doctor.MedicalLicenseNumber);

                conn.Open();
                    int i = cmd.ExecuteNonQuery();
                    conn.Close();

                    if (i > 0)
                    {
                        msg = "Data inserted";
                    }
                    else
                    {
                        msg = "Error!";
                    }
                
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }

            return msg;
        }

        [HttpGet]
        [Route("GetDoctorInfo/{id}")]
        public Doctor GetDoctorInfo(int id)
        {

            Doctor doctor = new Doctor();
            SqlCommand cmd = new SqlCommand("select * from DoctorManagement WHERE ID = @Id", conn);
            cmd.Parameters.AddWithValue("@Id", id);

            conn.Open();
            SqlDataReader reader = cmd.ExecuteReader();

            while (reader.Read())
            {

                doctor.Id = (int)reader["Id"];
                doctor.MedicalLicenseNumber = (int)reader["MLN"];
                doctor.FirstName = reader["FirstName"].ToString();
                doctor.LastName = reader["LastName"].ToString();
                doctor.Major = reader["Major"].ToString();
            }
            conn.Close();
            return doctor;

        }

        [HttpPost]
        [Route("UploadAvatar/{id}")]
        public async Task<IHttpActionResult> UploadAvatar(int id)
        {
            try
            {
                var httpRequest = HttpContext.Current.Request;

                // Check if file is uploaded
                if (httpRequest.Files.Count == 1)
                {
                    var postedFile = httpRequest.Files[0];

                    // Create folder path where you want to store files
                    string filePath = HttpContext.Current.Server.MapPath("~/Uploads/");
                    if (!Directory.Exists(filePath))
                    {
                        Directory.CreateDirectory(filePath);
                    }

                    // Ensure file name is unique by prepending a GUID
                    string originalFileName = Path.GetFileName(postedFile.FileName);
                    string uniqueFileName = $"{Guid.NewGuid()}_{originalFileName}";
                    string fullPath = Path.Combine(filePath, uniqueFileName);

                    // Save file to server
                    postedFile.SaveAs(fullPath);

                    // Create absolute URL
                    var request = HttpContext.Current.Request;
                    var baseUrl = $"{request.Url.Scheme}://{request.Url.Authority}{request.ApplicationPath.TrimEnd('/')}/";
                    string avatarUrl = $"{baseUrl}Uploads/{uniqueFileName}";

                    // Update database with avatar URL
                    SqlCommand cmd = new SqlCommand("UPDATE DoctorManagement SET AvatarUrl = @AvatarUrl WHERE Id = @Id", conn);
                    cmd.Parameters.AddWithValue("@Id", id);
                    cmd.Parameters.AddWithValue("@AvatarUrl", avatarUrl);

                    conn.Open();
                    int rowsAffected = cmd.ExecuteNonQuery();
                    conn.Close();

                    if (rowsAffected > 0)
                    {
                        return Ok(avatarUrl); // Return the full URL to the client
                    }
                    else
                    {
                        return BadRequest("Error updating avatar URL");
                    }
                }
                else
                {
                    return BadRequest("No file uploaded or more than one file uploaded.");
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpDelete]
        [Route("RemoveAvatar/{id}")]
        public IHttpActionResult RemoveAvatar(int id)
        {
            try
            {
                // Logic to remove avatar URL from database
                SqlCommand cmd = new SqlCommand("UPDATE DoctorManagement SET AvatarUrl = NULL WHERE Id = @Id", conn);
                cmd.Parameters.AddWithValue("@Id", id);

                conn.Open();
                int rowsAffected = cmd.ExecuteNonQuery();
                conn.Close();

                if (rowsAffected > 0)
                {
                    return Ok("Avatar removed successfully");
                }
                else
                {
                    return BadRequest("Error removing avatar");
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }



        [HttpGet]
        [Route("GetAllRequests")]
        public IEnumerable<Doctor> GetAllRequests()
        {
            List<Doctor> doctors = new List<Doctor>();
            try
            {
                cmd = new SqlCommand("usp_GetAllRequests", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    Doctor doctor = new Doctor();
                    doctor.Id = (int)reader["Id"];
                    doctor.Email = reader["Email"].ToString();
                    doctor.Password = reader["Password"].ToString();
                    doctor.FirstName = reader["FirstName"].ToString();
                    doctor.LastName = reader["LastName"].ToString();
                    doctor.Major = reader["Major"].ToString();
                    doctor.University = reader["University"].ToString();
                    doctor.Country = reader["Country"].ToString();
                    doctor.Gender = reader["Gender"].ToString();
                    doctor.BirthYear = (int)reader["BirthYear"];
                    doctor.YearOfGraduation = (int)reader["YearOfGraduation"];
                    doctor.MedicalLicenseNumber = (int)reader["MLN"];
                    // Populate other properties similarly
                    doctors.Add(doctor);
                }
                conn.Close();
            }
            catch (Exception ex)
            {
                // Handle exception
            }
            return doctors;
        }

        // Add a new endpoint to DoctorController
        [HttpPost]
        [Route("AddToTeam")]
        public string AddToTeam(Doctor doctor)
        {
            string msg = string.Empty;
            try
            {
                SqlCommand cmd = new SqlCommand("usp_AddDoctorToTeam", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Email", doctor.Email);
                cmd.Parameters.AddWithValue("@Password", doctor.Password);
                cmd.Parameters.AddWithValue("@FirstName", doctor.FirstName);
                cmd.Parameters.AddWithValue("@LastName", doctor.LastName);
                cmd.Parameters.AddWithValue("@Major", doctor.Major);
                cmd.Parameters.AddWithValue("@University", doctor.University);
                cmd.Parameters.AddWithValue("@Country", doctor.Country);
                cmd.Parameters.AddWithValue("@Gender", doctor.Gender);
                cmd.Parameters.AddWithValue("@BirthYear", doctor.BirthYear);
                cmd.Parameters.AddWithValue("@YearOfGraduation", doctor.YearOfGraduation);
                cmd.Parameters.AddWithValue("@MLN", doctor.MedicalLicenseNumber);

                conn.Open();
                int rowsAffected = cmd.ExecuteNonQuery();
                conn.Close();

                if (rowsAffected > 0)
                {
                    msg = "Doctor added to the team successfully";
                }
                else
                {
                    msg = "Error adding doctor to the team";
                }
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }

            return msg;
        }

        [HttpPost]
        [Route("DeleteRequest")]
        public string DeleteRequest(int id)
        {
            string msg = string.Empty;
            try
            {
                SqlCommand cmd = new SqlCommand("usp_DeleteRequest", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", id);

                conn.Open();
                int rowsAffected = cmd.ExecuteNonQuery();
                conn.Close();

                if (rowsAffected > 0)
                {
                    msg = "Request declined successfully";
                }
                else
                {
                    msg = "Error declining request";
                }
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }

            return msg;
        }

        [HttpPost]
        [Route("GetAllLicenses")]
        public IHttpActionResult GetAllEmails()
        {
            da = new SqlDataAdapter("GetAllLicenses", conn);
            da.SelectCommand.CommandType = CommandType.StoredProcedure;
            DataTable dt = new DataTable();
            da.Fill(dt);

            if (dt.Rows.Count > 0)
            {
                List<int> licenses = new List<int>();

                foreach (DataRow row in dt.Rows)
                {
                    licenses.Add((int)row["MLN"]);
                }

                return Ok(licenses);
            }
            else return BadRequest("Licenses not found");
        }

        [HttpPut]
        [Route("UpdateDoctorInfo")]
        public string UpdateDoctorInfo(Doctor doctor)
        {
            string msg = string.Empty;
            try
            {
                cmd = new SqlCommand("usp_UpdateDoctorInfo", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", doctor.Id);
                cmd.Parameters.AddWithValue("@Email", doctor.Email);
                cmd.Parameters.AddWithValue("@FirstName", doctor.FirstName);
                cmd.Parameters.AddWithValue("@LastName", doctor.LastName);
                cmd.Parameters.AddWithValue("@Major", doctor.Major);
                cmd.Parameters.AddWithValue("@University", doctor.University);
                cmd.Parameters.AddWithValue("@Country", doctor.Country);
                //cmd.Parameters.AddWithValue("@Gender", doctor.Gender);
                cmd.Parameters.AddWithValue("@BirthYear", doctor.BirthYear);
                cmd.Parameters.AddWithValue("@YearOfGraduation", doctor.YearOfGraduation);

                conn.Open();
                int i = cmd.ExecuteNonQuery();
                conn.Close();

                if (i > 0)
                {
                    msg = "Data updated";
                }
                else
                {
                    msg = "No rows updated!";
                }
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }

            return msg;
        }

        [HttpPut]
        [Route("UpdateDrPass")]
        public string UpdateDrPass(Doctor doctor)
        {
            string msg = string.Empty;
            try
            {
                if (
                    string.IsNullOrEmpty(doctor.Password))
                {
                    return "Error: One or more required fields are empty.";
                }

                cmd = new SqlCommand("usp_UpdateDrPass", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", doctor.Id);
                cmd.Parameters.AddWithValue("@Password", doctor.Password);


                conn.Open();
                int i = cmd.ExecuteNonQuery();
                conn.Close();

                if (i > 0)
                {
                    msg = "Password updated";
                }
                else
                {
                    msg = "No rows updated!";
                }
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }

            return msg;
        }


        [HttpPost]
        [Route("LoginAsDoctor")]

        public string Login(Doctor doctor)
        {
            string msg = string.Empty;
            try
            {
                da = new SqlDataAdapter("usp_LoginAsDoctor", conn);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                da.SelectCommand.Parameters.AddWithValue("@Email", doctor.Email);
                da.SelectCommand.Parameters.AddWithValue("@Password", doctor.Password);
                DataTable dt = new DataTable();
                da.Fill(dt);

                if (dt.Rows.Count > 0)
                {
                    msg = "User is valid";
                }
                else
                {
                    msg = "User is not valid";
                }
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }

            return msg;

        }
    }
}