using System;
using System.Collections.Generic;
using System.Web;

namespace szcs.SVR
{
    public class Feedback : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}
