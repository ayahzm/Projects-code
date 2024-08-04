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

    [RoutePrefix("api/Test")]
    public class TestController : ApiController
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString);
        SqlCommand cmd = null;
        SqlDataAdapter da = null;

        [HttpPost]
        [Route("Registration")]
        public string Registration(Parent parent)
        {
            string msg = string.Empty;
            try
            {
                if (string.IsNullOrEmpty(parent.Email) ||
                    string.IsNullOrEmpty(parent.Password) ||
                    string.IsNullOrEmpty(parent.MotherFname) ||
                    string.IsNullOrEmpty(parent.MotherLname) ||
                    string.IsNullOrEmpty(parent.FatherFname) ||
                    string.IsNullOrEmpty(parent.FatherLname) ||
                    parent.PhoneNumber == 0 || // Assuming PhoneNumber is required and 0 means not provided
                    string.IsNullOrEmpty(parent.Address))
                {
                    return "Error: One or more required fields are empty.";
                }

                    cmd = new SqlCommand("usp_Registration", conn);
                    cmd.CommandType = CommandType.StoredProcedure;  
                    cmd.Parameters.AddWithValue("@Email", parent.Email);
                    cmd.Parameters.AddWithValue("@Password", parent.Password);
                    cmd.Parameters.AddWithValue("@MotherFname", parent.MotherFname);
                    cmd.Parameters.AddWithValue("@MotherLname", parent.MotherLname);
                    cmd.Parameters.AddWithValue("@FatherFname", parent.FatherFname);
                    cmd.Parameters.AddWithValue("@FatherLname", parent.FatherLname);
                    cmd.Parameters.AddWithValue("@PhoneNumber", parent.PhoneNumber);
                    cmd.Parameters.AddWithValue("@Address", parent.Address);

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


        [HttpPost]
        [Route("Login")]

        public string Login(Parent parent)
        {

            string msg = string.Empty;
            string role = string.Empty;
            try
            {

                da = new SqlDataAdapter("usp_Login", conn);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                da.SelectCommand.Parameters.AddWithValue("@Email", parent.Email);
                da.SelectCommand.Parameters.AddWithValue("@Password", parent.Password);
                //da.SelectCommand.Parameters.AddWithValue("@Email", doctor.Email);
                // da.SelectCommand.Parameters.AddWithValue("@Password", doctor.Password);
                DataTable dt = new DataTable();
                da.Fill(dt);


                if (dt.Rows.Count > 0)
                {

                    role = dt.Rows[0]["Role"].ToString();

                    // Check the role and navigate accordingly
                    if (role == "Parent")
                    {
                        msg = "Parent user is valid";
                        // Redirect to parent dashboard or home page
                    }
                    else if (role == "Doctor")
                    {
                        msg = "Doctor user is valid";
                        // Redirect to doctor dashboard or home page
                    }
                    else if (role == "Admin")
                    {
                        msg = "Admin acc is valid";
                        // Redirect to doctor dashboard or home page
                    }
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
            //return $"{msg},{role}";

        }


        [HttpPost]
        [Route("GetUserInfo")]
        public IHttpActionResult GetUserInfo(Parent parent)
        {
            string role = string.Empty;
            try
            {
                da = new SqlDataAdapter("usp_GetUserInfo", conn);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                da.SelectCommand.Parameters.AddWithValue("@Email", parent.Email);
                da.SelectCommand.Parameters.AddWithValue("@Password", parent.Password);
                DataTable dt = new DataTable();
                da.Fill(dt);

                if (dt.Rows.Count > 0)
                { 
               
                    role = dt.Rows[0]["Role"].ToString();

                    
                    if (role == "Parent")
                    {
                        var userData = new
                        {
                            Id = dt.Rows[0]["ID"].ToString(),
                            Email = dt.Rows[0]["Email"].ToString(),
                            Password = dt.Rows[0]["Password"].ToString(),
                            MotherFname = dt.Rows[0]["MotherFname"].ToString(),
                            MotherLname = dt.Rows[0]["MotherLname"].ToString(),
                            FatherFname = dt.Rows[0]["FatherFname"].ToString(),
                            FatherLname = dt.Rows[0]["FatherLname"].ToString(),
                            PhoneNumber = dt.Rows[0]["PhoneNumber"].ToString(),
                            Address = dt.Rows[0]["Address"].ToString(),
                            AvatarUrl = dt.Rows[0]["AvatarUrl"].ToString(),
                            Role = dt.Rows[0]["Role"].ToString()
                        };

                        return Ok(userData);

                    }
                    
                    else return BadRequest("User not found");

                }
                else return BadRequest("User not found");
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
            
        }

        [HttpPost]
        [Route("GetUserInfo2")]
        public IHttpActionResult GetUserInfo2(Parent parent)
        {
            string role = string.Empty;
            try
            {
                da = new SqlDataAdapter("usp_GetUserInfo2", conn);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                da.SelectCommand.Parameters.AddWithValue("@Email", parent.Email);
                da.SelectCommand.Parameters.AddWithValue("@Password", parent.Password);
                DataTable dt = new DataTable();
                da.Fill(dt);

                if (dt.Rows.Count > 0)
                {

                    role = dt.Rows[0]["Role"].ToString();


                    if (role == "Doctor")
                    {
                        var userData = new
                        {
                            Id = dt.Rows[0]["ID"].ToString(),
                            Email = dt.Rows[0]["Email"].ToString(),
                            Password = dt.Rows[0]["Password"].ToString(),
                            FirstName = dt.Rows[0]["FirstName"].ToString(),
                            LastName = dt.Rows[0]["LastName"].ToString(),
                            Major = dt.Rows[0]["Major"].ToString(),
                            University = dt.Rows[0]["University"].ToString(),
                            Country = dt.Rows[0]["Country"].ToString(),
                            Gender = dt.Rows[0]["Gender"].ToString(),
                            BirthYear = dt.Rows[0]["BirthYear"].ToString(),
                            YearOfGraduation = dt.Rows[0]["YearOfGraduation"].ToString(),
                            AvatarUrl = dt.Rows[0]["AvatarUrl"].ToString(),
                            Role = dt.Rows[0]["Role"].ToString()

                        };

                        return Ok(userData);

                    }
                    else return BadRequest("User not found");

                }
                else return BadRequest("User not found");
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

        }

        [HttpPost]
        [Route("GetAllEmails")]
        public IHttpActionResult GetAllEmails()
        {
            da = new SqlDataAdapter("GetAllEmails", conn);
            da.SelectCommand.CommandType = CommandType.StoredProcedure;
            DataTable dt = new DataTable();
            da.Fill(dt);

            if (dt.Rows.Count > 0)
            {
                List<string> emails = new List<string>();

                foreach (DataRow row in dt.Rows)
                {
                    emails.Add(row["Email"].ToString());
                }

                return Ok(emails);
            }
            else return BadRequest("emails not found");
        }

        [HttpPost]
        [Route("GetUserInfo3")]
        public IHttpActionResult GetUserInfo3(Parent parent)
        {
            string role = string.Empty;
            try
            {
                da = new SqlDataAdapter("usp_GetUserInfo3", conn);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                da.SelectCommand.Parameters.AddWithValue("@Email", parent.Email);
                da.SelectCommand.Parameters.AddWithValue("@Password", parent.Password);
                DataTable dt = new DataTable();
                da.Fill(dt);

                if (dt.Rows.Count > 0)
                {

                    role = dt.Rows[0]["Role"].ToString();


                    if (role == "Admin")
                    {
                        var userData = new
                        {
                            Id = dt.Rows[0]["ID"].ToString(),
                            Email = dt.Rows[0]["Email"].ToString(),
                            Password = dt.Rows[0]["Password"].ToString(),
                            Role = dt.Rows[0]["Role"].ToString(),
                            AvatarUrl = dt.Rows[0]["AvatarUrl"].ToString()

                        };

                        return Ok(userData);

                    }
                    else return BadRequest("User not found");

                }
                else return BadRequest("User not found");
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

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
                    SqlCommand cmd = new SqlCommand("UPDATE ParentManagement SET AvatarUrl = @AvatarUrl WHERE Id = @Id", conn);
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

        [HttpPost]
        [Route("RemoveAvatar/{id}")]
        public async Task<IHttpActionResult> RemoveAvatar(int id)
        {
            try
            {
                // Get the current user's avatar URL from the database
                SqlCommand selectCmd = new SqlCommand("SELECT AvatarUrl FROM ParentManagement WHERE Id = @Id", conn);
                selectCmd.Parameters.AddWithValue("@Id", id);

                conn.Open();
                var result = selectCmd.ExecuteScalar();
                conn.Close();

                if (result != DBNull.Value && result != null)
                {
                    string avatarUrl = (string)result;

                    // Delete the file from the server
                    string filePath = HttpContext.Current.Server.MapPath("~/Uploads/") + Path.GetFileName(avatarUrl);
                    if (File.Exists(filePath))
                    {
                        File.Delete(filePath);
                    }

                    // Update the database to remove the avatar URL
                    SqlCommand cmd = new SqlCommand("UPDATE ParentManagement SET AvatarUrl = NULL WHERE Id = @Id", conn);
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
                else
                {
                    return BadRequest("No avatar to remove");
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        [HttpPut]
        [Route("UpdateParent")]
        public string UpdateParent(Parent parent)
        {
            string msg = string.Empty;
            try
            {
                cmd = new SqlCommand("usp_UpdateParent", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Email", parent.Email);
                cmd.Parameters.AddWithValue("@MotherFname", parent.MotherFname);
                cmd.Parameters.AddWithValue("@MotherLname", parent.MotherLname);
                cmd.Parameters.AddWithValue("@FatherFname", parent.FatherFname);
                cmd.Parameters.AddWithValue("@FatherLname", parent.FatherLname);
                cmd.Parameters.AddWithValue("@PhoneNumber", parent.PhoneNumber);
                cmd.Parameters.AddWithValue("@Address", parent.Address);

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
        [Route("UpdatePass")]
        public string UpdatePass(Parent parent)
        {
            string msg = string.Empty;
            try
            {
                if (
                    string.IsNullOrEmpty(parent.Password))
                {
                    return "Error: One or more required fields are empty.";
                }

                cmd = new SqlCommand("usp_UpdatePass", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                if (parent != null)
                {
                    cmd.Parameters.AddWithValue("@Id", parent.Id);
                    cmd.Parameters.AddWithValue("@Password", parent.Password);
                }

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
    }
}
