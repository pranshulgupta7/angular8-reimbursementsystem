using DataAccessLayer;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;

namespace FinalExitProject.Controllers
{
    public class AccountController : ApiController
    {
        [Route("api/User/Register")]
        [HttpPost]
        [AllowAnonymous]
        public IdentityResult Register(UserTable model)
        {
            var userStore = new UserStore<ApplicationUser>(new ApplicationDbContext());
            var manager = new UserManager<ApplicationUser>(userStore);
            var user = new ApplicationUser() { Email = model.Email, UserName = model.Email };
            user.FullName = model.FullName;
            user.PanNumber = model.PanNumber;
            user.Bank = model.Bank;
            user.BankAccountNumber = model.BankAccountNumber;
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 8
            };
            IdentityResult result = manager.Create(user, model.Password);
            return result;
        }

        [HttpGet]
        [Route("api/GetUserClaims")]
        public UserTable GetUserClaims()
        {
            var identityClaims = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identityClaims.Claims;
            UserTable model = new UserTable()
            {
                UserName = identityClaims.FindFirst("Username").Value,
                Email = identityClaims.FindFirst("Email").Value,
                FullName = identityClaims.FindFirst("FirstName").Value,
                LoggedOn = identityClaims.FindFirst("LoggedOn").Value
            };
            return model;
        }
    }
}
