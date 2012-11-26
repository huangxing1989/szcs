using System;
using System.Collections.Generic;
using System.Web;
using System.Xml;
using System.IO;
using System.Text;
using szcs.Util;

namespace szcs.SVR
{

    public class GetConfig : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            
            context.Response.ContentType = "text/plain";
            string type=context.Request["type"].Trim().ToLower();
            string file = string.Empty;

            switch (type)
            {
                case "map":
                    context.Response.Write((string)context.Cache["MAP"]);
                    break;
                case "clsy":
                    context.Response.Write((string)context.Cache["CLS"]);
                    break;

            }

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
