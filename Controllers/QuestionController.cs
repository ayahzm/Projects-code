using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Child_Guardian.Models;

namespace Child_Guardian.Controllers
{
    [RoutePrefix("api/Question")]
    public class QuestionController : ApiController
    {

        Child_GuardianEntities DB = new Child_GuardianEntities();
        [HttpPost]
        public string AskNewQuestion(QuestionDetail q)
        {
            string Message = "";
            try
            {
                QuestionDetail questiondetail = new QuestionDetail();
                questiondetail.QuestionContent = q.QuestionContent;
                questiondetail.Answer = q.Answer;
                questiondetail.ParentId = q.ParentId;
                questiondetail.ChildId = q.ChildId;
                DB.QuestionDetails.Add(questiondetail);

                DB.SaveChanges();

                Message = "Question Added";
            }
            catch (Exception ex)
            {

                Message = ex.Message;
            }
            return Message;
        }

        [HttpGet]
        public object GetAllQuestions()
        {
            return DB.QuestionDetails.OrderByDescending(q => q.Id).ToList();
        }


        [HttpGet]
        [Route("GetQuestionsByParentId")]
        public object GetQuestionsByParentId(int parentId)
        {
            return DB.QuestionDetails.Where(x => x.ParentId == parentId).ToList();
        }

        [HttpGet]
        [Route("GetQuestionsByDoctorId")]
        public object GetQuestionsByDoctorId(int doctorId)
        {
            return DB.QuestionDetails.Where(x => x.DoctorId == doctorId).ToList();
        }

        [HttpGet]
        [Route("GetQuestionsWithEmptyAnswers")]
        public object GetQuestionsWithEmptyAnswers()
        {
            return DB.QuestionDetails
                     .Where(q => string.IsNullOrEmpty(q.Answer))
                     .ToList();
        }


        [HttpDelete]
        public object DeleteQuestion(int id)
        {
            try
            {
                QuestionDetail question = DB.QuestionDetails.FirstOrDefault(x => x.Id == id);
                DB.QuestionDetails.Remove(question);
                DB.SaveChanges();
                return new Response
                {
                    Status = "Success",
                    Message = "Question Deleted"
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

        [HttpPut]
        public object UpdateQuestion(QuestionDetail updatedQuestion)
        {
            try
            {
                var question = DB.QuestionDetails.FirstOrDefault(q => q.Id == updatedQuestion.Id);
                if (question == null)
                {
                    return new Response
                    {
                        Status ="failed",
                        Message="No question"
                    };
                }
                question.DoctorId = updatedQuestion.DoctorId;
                question.Answer = updatedQuestion.Answer;
                DB.SaveChanges();

                return Ok("Question updated successfully");
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
    }
}
