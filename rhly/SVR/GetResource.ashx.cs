using System;
using System.Collections.Generic;
using System.Web;
using System.IO;
using System.Text;
using System.Xml;
using szcs.DAL;

namespace szcs.SVR
{

    public class GetResource : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string type=context.Request.QueryString["type"].Trim().ToLower();
            string param=context.Request.QueryString["ids"].Trim();
            string callback = context.Request.QueryString["callback"].Trim();
            string phypath = (string)context.Cache["IMAGEPATH"];
            string webpath = (string)context.Cache["IMAGEURL"];
            context.Response.Write(callback + "(" + GetImages.getResource(phypath + "\\" + type, webpath + "/" + type, param) + ")");
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
