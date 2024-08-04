// ArticleController.cs

using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Child_Guardian.Models; // Assuming your models are in a namespace called YourProject.Models

namespace Child_Guardian.Controllers
{
   
    [RoutePrefix("api/Article")]
    public class ArticleController : ApiController

    {
        Child_GuardianEntities DB = new Child_GuardianEntities();
        /* [HttpPost]
         public string AddNewArticle(ArticleDetail a)
         {
             string Message = "";
             try
             {
                 ArticleDetail articledetail = new ArticleDetail();
                 articledetail.DoctorId = a.DoctorId;
                 articledetail.Author = a.Author;
                 articledetail.Title = a.Title;
                 articledetail.Form = a.Form;
                 articledetail.DateOfRelease = a.DateOfRelease;
                 DB.ArticleDetails.Add(articledetail);
                 DB.SaveChanges();

                 Message = "Article Added";

             }
             catch (Exception ex)
             {

                 Message = ex.Message;
             }
             return Message;
         }*/

        /*[HttpPost]
        [Route("AddNewArticle")]
        public async Task<IHttpActionResult> AddNewArticle()
        {
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count != 1)
            {
                return BadRequest("One file must be uploaded.");
            }

            var file = httpRequest.Files[0];
            var filePath = HttpContext.Current.Server.MapPath("~/Uploads/");
            if (!Directory.Exists(filePath))
            {
                Directory.CreateDirectory(filePath);
            }

            string originalFileName = Path.GetFileName(file.FileName);
            string uniqueFileName = $"{Guid.NewGuid()}_{originalFileName}";
            string fullPath = Path.Combine(filePath, uniqueFileName);

            file.SaveAs(fullPath);

            var request = HttpContext.Current.Request;
            var baseUrl = $"{request.Url.Scheme}://{request.Url.Authority}{request.ApplicationPath.TrimEnd('/')}/";
            string fileUrl = $"{baseUrl}Uploads/{uniqueFileName}";

            try
            {
                ArticleDetail articledetail = new ArticleDetail
                {
                    DoctorId = Convert.ToInt32(httpRequest.Form["DoctorId"]),
                    Author = httpRequest.Form["Author"],
                    Title = httpRequest.Form["Title"],
                    Form = httpRequest.Form["Form"],
                    DateOfRelease = Convert.ToDateTime(httpRequest.Form["DateOfRelease"]),
                    ArticleUrl = fileUrl
                };

                Child_GuardianEntities DB = new Child_GuardianEntities();
                DB.ArticleDetails.Add(articledetail);
                DB.SaveChanges();

                return Ok(new { Message = "Article Added", FileUrl = fileUrl });
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }*/
        [HttpPost]
        [Route("AddNewArticle")]
        public async Task<IHttpActionResult> AddNewArticle()
        {
            var httpRequest = HttpContext.Current.Request;

            // Check for at least one file (the article file)
            if (httpRequest.Files.Count < 1)
            {
                return BadRequest("At least one file (article) must be uploaded.");
            }

            var articleFile = httpRequest.Files[0];
            var uploadsPath = HttpContext.Current.Server.MapPath("~/Uploads/");
            if (!Directory.Exists(uploadsPath))
            {
                Directory.CreateDirectory(uploadsPath);
            }

            string originalArticleFileName = Path.GetFileName(articleFile.FileName);
            string uniqueArticleFileName = $"{Guid.NewGuid()}_{originalArticleFileName}";
            string fullArticlePath = Path.Combine(uploadsPath, uniqueArticleFileName);
            articleFile.SaveAs(fullArticlePath);
            var request = HttpContext.Current.Request;
            var baseUrl = $"{request.Url.Scheme}://{request.Url.Authority}{request.ApplicationPath.TrimEnd('/')}/";
            string articleFileUrl = $"{baseUrl}Uploads/{uniqueArticleFileName}";

            string imageFileUrl = null;

            // Check if an image file is uploaded
            if (httpRequest.Files.Count > 1)
            {
                var imageFile = httpRequest.Files[1];
                string originalImageFileName = Path.GetFileName(imageFile.FileName);
                string uniqueImageFileName = $"{Guid.NewGuid()}_{originalImageFileName}";
                string fullImagePath = Path.Combine(uploadsPath, uniqueImageFileName);
                imageFile.SaveAs(fullImagePath);

                imageFileUrl = $"{baseUrl}Uploads/{uniqueImageFileName}";
            }

            try
            {
                ArticleDetail articledetail = new ArticleDetail
                {
                    DoctorId = Convert.ToInt32(httpRequest.Form["DoctorId"]),
                    Author = httpRequest.Form["Author"],
                    Title = httpRequest.Form["Title"],
                    Form = httpRequest.Form["Form"],
                    DateOfRelease = Convert.ToDateTime(httpRequest.Form["DateOfRelease"]),
                    ArticleUrl = articleFileUrl,
                    ImageUrl = imageFileUrl
                };

                Child_GuardianEntities DB = new Child_GuardianEntities();
                DB.ArticleDetails.Add(articledetail);
                DB.SaveChanges();

                return Ok(new { Message = "Article Added", ArticleFileUrl = articleFileUrl, ImageFileUrl = imageFileUrl });
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        [HttpPost]
        [Route("EditArticle")]
        public async Task<IHttpActionResult> EditArticle()
        {
            var httpRequest = HttpContext.Current.Request;

            // Check if files are included in the request
            var articleFile = httpRequest.Files.Count > 0 ? httpRequest.Files[0] : null;
            var imageFile = httpRequest.Files.Count > 1 ? httpRequest.Files[1] : null;

            string articleFileUrl = null;
            string imageFileUrl = null;

            if (articleFile != null)
            {
                var uploadsPath = HttpContext.Current.Server.MapPath("~/Uploads/");
                if (!Directory.Exists(uploadsPath))
                {
                    Directory.CreateDirectory(uploadsPath);
                }

                string originalArticleFileName = Path.GetFileName(articleFile.FileName);
                string uniqueArticleFileName = $"{Guid.NewGuid()}_{originalArticleFileName}";
                string fullArticlePath = Path.Combine(uploadsPath, uniqueArticleFileName);
                articleFile.SaveAs(fullArticlePath);

                var request = HttpContext.Current.Request;
                var baseUrl = $"{request.Url.Scheme}://{request.Url.Authority}{request.ApplicationPath.TrimEnd('/')}/";
                articleFileUrl = $"{baseUrl}Uploads/{uniqueArticleFileName}";
            }

            if (imageFile != null)
            {
                var uploadsPath = HttpContext.Current.Server.MapPath("~/Uploads/");
                if (!Directory.Exists(uploadsPath))
                {
                    Directory.CreateDirectory(uploadsPath);
                }

                string originalImageFileName = Path.GetFileName(imageFile.FileName);
                string uniqueImageFileName = $"{Guid.NewGuid()}_{originalImageFileName}";
                string fullImagePath = Path.Combine(uploadsPath, uniqueImageFileName);
                imageFile.SaveAs(fullImagePath);

                var request = HttpContext.Current.Request;
                var baseUrl = $"{request.Url.Scheme}://{request.Url.Authority}{request.ApplicationPath.TrimEnd('/')}/";
                imageFileUrl = $"{baseUrl}Uploads/{uniqueImageFileName}";
            }

            int articleId = Convert.ToInt32(httpRequest.Form["Id"]);

            try
            {
                var obj = DB.ArticleDetails.FirstOrDefault(x => x.Id == articleId);

                if (obj == null)
                {
                    return NotFound();
                }

                // Update the properties of the entity
                obj.DoctorId = Convert.ToInt32(httpRequest.Form["DoctorId"]);
                obj.Author = httpRequest.Form["Author"];
                obj.Title = httpRequest.Form["Title"];
                obj.Form = httpRequest.Form["Form"];
                obj.DateOfRelease = Convert.ToDateTime(httpRequest.Form["DateOfRelease"]);

                // Update URLs only if files were provided
                if (articleFileUrl != null)
                {
                    obj.ArticleUrl = articleFileUrl;
                }

                if (imageFileUrl != null)
                {
                    obj.ImageUrl = imageFileUrl;
                }

                // Save changes to the database
                DB.SaveChanges();

                return Ok(new { Message = "Article Updated", ArticleFileUrl = articleFileUrl, ImageFileUrl = imageFileUrl });
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }





        [HttpGet]
        public object GetAllArticles()
        {
            return DB.ArticleDetails.OrderByDescending(a => a.Id).ToList();
        }

        [HttpGet]
        [Route("GetAllArticleTitles")]
        public object GetAllArticleTitles()
        {
            return DB.ArticleDetails.Select(article => article.Title).ToList();
        }


        [HttpGet]
        [Route("GetLikedArticles")]
        public object GetLikedArticles()
        {
            try
            {
                var likedArticles = DB.ArticleDetails.Where(article => article.IsLiked == true).ToList();
                return likedArticles;
            }
            catch (Exception ex)
            {
                
                Console.WriteLine("Exception: " + ex.Message);
                return new Response { Status = "Failed", Message = "An error occurred while retrieving liked articles" };
            }
        }

        [HttpGet]
        [Route("GetArticlesByDoctorId")]
        public object GetArticlesByDoctorId(int doctorId)
        {
            return DB.ArticleDetails.Where(x => x.DoctorId == doctorId).ToList();
        }

        [HttpDelete]
        public object DeleteArticle(int id)
        {
            try
            {
                ArticleDetail article = DB.ArticleDetails.FirstOrDefault(x => x.Id == id);
                DB.ArticleDetails.Remove(article);
                DB.SaveChanges();
                return new Response
                {
                    Status = "Success",
                    Message = "Medicine Deleted"
                };
            }
            catch (Exception ex)
            {
                return new Response
                {
                    Status = "Failed",
                    Message = ex.Message
                };
            }
        }

        [HttpGet]
        [Route("GetArticleById")]
        public object GetArticleById(int id)
        {
            var article = DB.ArticleDetails
                .Where(x => x.Id == id)
                .Select(x => new
                {
                    x.Id,
                    x.DoctorId,
                    x.Author,
                    x.Title,
                    x.Form,
                    x.DateOfRelease,
                    // Exclude ArticleUrl and ImageUrl here
                })
                .FirstOrDefault();

            return article;
        }

        [HttpPut]
        [Route("UpdateLikeStatus")]
        public object UpdateLikeStatus(ArticleDetail a)
        {
            string status = "";
            string message = "";
            try
            {
                // Ensure that ArticleDetail object 'a' is not null
                if (a == null)
                {
                    status = "Failed";
                    message = "Invalid request data";
                    return new Response { Status = status, Message = message };
                }

                // Retrieve the entity from the database
                var obj = DB.ArticleDetails.FirstOrDefault(x => x.Id == a.Id);

                // Ensure that the entity is found
                if (obj == null)
                {
                    status = "Failed";
                    message = "Article not found";
                    return new Response { Status = status, Message = message };
                }

                // Update the IsLiked property of the entity
                obj.IsLiked = a.IsLiked ?? false; // Handle nullable boolean

                // Save changes to the database
                DB.SaveChanges();

                status = "Success";
                message = "Article Updated";
            }
            catch (Exception ex)
            {
                // Log the exception for debugging purposes
                Console.WriteLine("Exception: " + ex.Message);

                status = "Failed";
                message = "An error occurred while updating the article";
            }

            return new Response { Status = status, Message = message };
        }





        /*[Route("UpdateArticle")]
        [HttpPut]
        public string UpdateArticle(ArticleDetail a)
        {
            string message = "";
            try
            {
                // Retrieve the entity from the database
                var obj = DB.ArticleDetails.Where(x => x.Id == a.Id).ToList().FirstOrDefault();

                // Check if the entity is not null and is not being tracked
                if (obj != null && DB.Entry(obj).State == EntityState.Detached)
                {
                    // Attach the entity to the context
                    DB.ArticleDetails.Attach(obj);
                }

                // Update the properties of the entity
                obj.DoctorId = a.DoctorId;
                obj.Author = a.Author;
                obj.Title = a.Title;
                obj.Form = a.Form;
                obj.DateOfRelease = a.DateOfRelease;

                // Save changes to the database
                DB.SaveChanges();

                message = "Article Updated";
            }
            catch (Exception ex)
            {
                
                message = "Article Not Updated";
            }

            return message;
        }*/

    }
}
