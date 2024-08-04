using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Child_Guardian.Models;

namespace Child_Guardian.Controllers
{
    [RoutePrefix("api/Medicine")]
    public class MedicineController : ApiController
    {
        Child_GuardianEntities DB = new Child_GuardianEntities();
        [HttpPost]
        public string AddNewMedicine(MedicineDetail m)
        {
            string Message = "";
            try
            {
                MedicineDetail medicinedetail = new MedicineDetail();
                medicinedetail.ParentId = m.ParentId;
                medicinedetail.Name = m.Name;
                medicinedetail.TimeToTake = m.TimeToTake;
                medicinedetail.IntervalHours = m.IntervalHours;
                medicinedetail.ScheduleType = m.ScheduleType;
                medicinedetail.DosesPerWeek = m.DosesPerWeek;
                medicinedetail.Note = m.Note;
                medicinedetail.Reminder = m.Reminder;
                DB.MedicineDetails.Add(medicinedetail);
                DB.SaveChanges();

                Message = "Medicine Added";
            }
            catch (Exception ex)
            {

                Message = ex.Message;
            }
            return Message;
        }

        /*[HttpPost]
        public IHttpActionResult AddNewMedicine(MedicineDetailDTO m)
        {
            try
            {
                var medicinedetail = new MedicineDetail
                {
                    ParentId = m.ParentId,
                    Name = m.Name,
                    ScheduleType = m.ScheduleType,
                    DosesPerWeek = m.DosesPerWeek,
                    DosesPerDay = m.DosesPerDay,
                    IntervalHours = m.IntervalHours,
                    TimesToTake = m.TimesToTake != null ? string.Join(",", m.TimesToTake) : null,
                    Note = m.Note,
                    Reminder = m.Reminder,
                    DaysOfWeek = m.DaysOfWeek != null ? string.Join(",", m.DaysOfWeek) : null
                };

                DB.MedicineDetails.Add(medicinedetail);
                DB.SaveChanges();

                return Ok("Medicine Added");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }*/

        [HttpGet]
        public object GetAllMedicines(int parentId)
        {
            return DB.MedicineDetails.Where(x => x.ParentId == parentId).ToList();
        }

        [HttpDelete]
        public object DeleteMedicine(int id)
        {
            try
            {
                MedicineDetail medicine = DB.MedicineDetails.FirstOrDefault(x => x.Id == id);
                DB.MedicineDetails.Remove(medicine);
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
        [Route("MedicineDetails")]
        [HttpGet]
        public object GetMedicineById(int id)
        {
            return DB.MedicineDetails.Where(x => x.Id == id).ToList().FirstOrDefault();
            //return DB.MedicineDetails.FirstOrDefault(medicine => medicine.Id == id);
        }

        [Route("UpdateMedicine")]
        [HttpPut]
        public object UpdateMedicine(MedicineDetail m)
        {
            string status = "";
            string message = "";
            try
            {
                // Retrieve the entity from the database
                var obj = DB.MedicineDetails.Where(x => x.Id == m.Id).ToList().FirstOrDefault();

                // Check if the entity is not null and is not being tracked
                if (obj != null && DB.Entry(obj).State == EntityState.Detached)
                {
                    // Attach the entity to the context
                    DB.MedicineDetails.Attach(obj);
                }

                // Update the properties of the entity
                obj.Name = m.Name;
                obj.TimeToTake = m.TimeToTake;
                obj.DosesPerWeek = m.DosesPerWeek;
                obj.Note = m.Note;
                obj.Reminder = m.Reminder;
                obj.TimeToTake = m.TimeToTake;
                obj.IntervalHours = m.IntervalHours;

                // Save changes to the database
                DB.SaveChanges();

                status = "Success";
                message = "Medicine Updated";
            }
            catch (Exception ex)
            {
                status = "Failed";
                message = "Medicine Not Updated";
            }
            return new Response
            {
                Status = status,
                Message = message
            };
        }



    }
}

        
        
    

