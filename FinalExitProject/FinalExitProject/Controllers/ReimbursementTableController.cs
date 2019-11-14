using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Description;
using DataAccessLayer;

namespace FinalExitProject.Controllers
{
    public class ReimbursementTableController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/ReimbursementTable
        [AllowAnonymous]
        public IQueryable<ReimbursementTable> GetReimbursementTables()
        {
            return db.ReimbursementTables;
        }

        // GET: api/ReimbursementTable/5
        [ResponseType(typeof(ReimbursementTable))]
        public IHttpActionResult GetReimbursementTable(int id)
        {
            ReimbursementTable reimbursementTable = db.ReimbursementTables.Find(id);
            if (reimbursementTable == null)
            {
                return NotFound();
            }

            return Ok(reimbursementTable);
        }

        // PUT: api/ReimbursementTable/5
        [ResponseType(typeof(void))]
        [AllowAnonymous]
        public IHttpActionResult PutReimbursementTable(int id, ReimbursementTable reimbursementTable)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != reimbursementTable.Id)
            {
                return BadRequest();
            }

            db.Entry(reimbursementTable).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReimbursementTableExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/ReimbursementTable
        [ResponseType(typeof(ReimbursementTable))]
        [AllowAnonymous]
        public IHttpActionResult PostReimbursementTable(ReimbursementTable reimbursementTable)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.ReimbursementTables.Add(reimbursementTable);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = reimbursementTable.Id }, reimbursementTable);
        }

        // DELETE: api/ReimbursementTable/5
        [ResponseType(typeof(ReimbursementTable))]
        [AllowAnonymous]
        public IHttpActionResult DeleteReimbursementTable(int id)
        {
            ReimbursementTable reimbursementTable = db.ReimbursementTables.Find(id);
            if (reimbursementTable == null)
            {
                return NotFound();
            }

            db.ReimbursementTables.Remove(reimbursementTable);
            db.SaveChanges();

            return Ok(reimbursementTable);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ReimbursementTableExists(int id)
        {
            return db.ReimbursementTables.Count(e => e.Id == id) > 0;
        }

        [HttpGet]
        [Route("api/GetUserClaims")]
        [Authorize]
        public ReimbursementTable GetUserClaims()
        {
            var identityClaims = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identityClaims.Claims;
            ReimbursementTable model = new ReimbursementTable()
            {
                ReimbursementType = identityClaims.FindFirst("ReimbursementType").Value,
                LoggedOn = identityClaims.FindFirst("LoggedOn").Value
            };
            return model;
        }

    }
}