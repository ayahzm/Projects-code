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
    [RoutePrefix("api/child")]
    public class ChildController : ApiController
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString);
        SqlCommand cmd = null;
        SqlDataAdapter da = null;

        [HttpPost]
        [Route("AddNewChild")]
        public string AddNewChild(Child child)
        {
            string msg = string.Empty;
            try
            {
                cmd = new SqlCommand("usp_AddNewChild", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ParentId", child.ParentId);
                cmd.Parameters.AddWithValue("@FirstName", child.FirstName);
                cmd.Parameters.AddWithValue("@LastName", child.LastName);
                cmd.Parameters.AddWithValue("@BirthYear", child.BirthYear);
                cmd.Parameters.AddWithValue("@BloodType", child.BloodType);
                cmd.Parameters.AddWithValue("@Weight", child.Weight);
                cmd.Parameters.AddWithValue("@MedicalNotes", child.MedicalNotes);
                

                conn.Open();
                int i = cmd.ExecuteNonQuery();
                conn.Close();

                if (i > 0)
                {
                    msg = "Child added successfully";
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
        [Route("GetAllChildren")]
        public IEnumerable<Child> GetAllChildren(int id)
        {
            List<Child> children = new List<Child>();
            try
            {
                cmd = new SqlCommand("usp_GetAllChildren", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", id);
                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    Child child = new Child();
                    child.Id = (int)reader["Id"];
                    child.ParentId = (int)reader["ParentId"];
                    child.FirstName = reader["FirstName"].ToString();
                    child.LastName = reader["LastName"].ToString();
                    child.BirthYear = (int)reader["BirthYear"];
                    child.BloodType = reader["BloodType"].ToString();
                    child.Weight = (int)reader["Weight"];
                    child.MedicalNotes = reader["MedicalNotes"].ToString();
                    child.AvatarUrl = reader["AvatarUrl"].ToString();
                    children.Add(child);
                }
                conn.Close();
            }
            catch (Exception ex)
            {
                // Handle exception
            }
            return children;
        }


        [HttpPut]
        [Route("UpdateChild")]
        public string UpdateChild(Child child)
        {
            string msg = string.Empty;
            try
            {
                cmd = new SqlCommand("usp_UpdateChild", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", child.Id);
                cmd.Parameters.AddWithValue("@FirstName", child.FirstName);
                cmd.Parameters.AddWithValue("@LastName", child.LastName);
                cmd.Parameters.AddWithValue("@BirthYear", child.BirthYear);
                cmd.Parameters.AddWithValue("@BloodType", child.BloodType);
                cmd.Parameters.AddWithValue("@Weight", child.Weight);
                cmd.Parameters.AddWithValue("@MedicalNotes", child.MedicalNotes);

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
                    SqlCommand cmd = new SqlCommand("UPDATE ChildDetails SET AvatarUrl = @AvatarUrl WHERE Id = @Id", conn);
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
        public async Task<IHttpActionResult> RemoveAvatar(int id)
        {
            try
            {
                // Update database to remove avatar URL
                SqlCommand cmd = new SqlCommand("UPDATE ChildDetails SET AvatarUrl = NULL WHERE Id = @Id", conn);
                cmd.Parameters.AddWithValue("@Id", id);

                conn.Open();
                int rowsAffected = cmd.ExecuteNonQuery();
                conn.Close();

                if (rowsAffected > 0)
                {
                    return Ok(); // Return success status to the client
                }
                else
                {
                    return BadRequest("Error removing avatar URL");
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("GetChildInfo/{id}")]
        public Child GetChildInfo(int id)
        {
            
                Child child = new Child();
                SqlCommand cmd = new SqlCommand("select * from ChildDetails WHERE Id = @Id", conn);
                cmd.Parameters.AddWithValue("@Id", id);

                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    
                    child.Id = (int)reader["Id"];
                    child.ParentId = (int)reader["ParentId"];
                    child.FirstName = reader["FirstName"].ToString();
                    child.LastName = reader["LastName"].ToString();
                    child.BirthYear = (int)reader["BirthYear"];
                    child.BloodType = reader["BloodType"].ToString();
                    child.Weight = (int)reader["Weight"];
                    child.MedicalNotes = reader["MedicalNotes"].ToString();
                    child.AvatarUrl = reader["AvatarUrl"].ToString();
                }
                conn.Close();
                return child;
            
        }

        [HttpPost]
        [Route("DeleteChild")]
        public string DeleteChild(int id)
        {
            string msg = string.Empty;
            try
            {
                SqlCommand cmd = new SqlCommand("usp_DeleteChild", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", id);

                conn.Open();
                int rowsAffected = cmd.ExecuteNonQuery();
                conn.Close();

                if (rowsAffected > 0)
                {
                    msg = "Child profile removed successfully";
                }
                else
                {
                    msg = "Error deleting profile";
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
