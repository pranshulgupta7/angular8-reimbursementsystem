using DataAccessLayer;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace FinalExitProject.Controllers
{
    public class ImageController : ApiController
    {
        [HttpPost]
        [Route("api/UploadImage")]
        [AllowAnonymous]
        public HttpResponseMessage UploadImage()
        {
            string imageName = null;
            var httpRequest = HttpContext.Current.Request;
            //Upload Image
            var postedFile = httpRequest.Files["Image"];
            //Create custom filename
            imageName = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(10).ToArray()).Replace(" ", "-");
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedFile.FileName);
            var filePath = HttpContext.Current.Server.MapPath("~/Image/" + imageName);
            postedFile.SaveAs(filePath);
            //Save to DB
            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                ImageTable image = new ImageTable()
                {
                    ImageCaption = httpRequest["ImageCaption"],
                    ImageName = imageName
                };
                db.ImageTable.Add(image);
                db.SaveChanges();
            }
            return Request.CreateResponse(HttpStatusCode.Created);
        }

    }
}
