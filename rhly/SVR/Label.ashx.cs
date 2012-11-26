using System;
using System.Collections.Generic;
using System.Web;
using System.Data;
using System.Data.OracleClient;
using szcs.Util;
using szcs.DAL;
using System.Web.SessionState;
using szcs.Model;

namespace szcs.SVR
{

    public class Label : IHttpHandler,IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/json";
            string method=context.Request["method"].ToString().Trim().ToLower();
            string usrid = string.Empty;
            string type=context.Request["type"].ToString().Trim().ToLower();
            string labelid = string.Empty;
            string title = string.Empty;
            string content = string.Empty;

            User usr = (context.Session["USER"] != null) ? (User)context.Session["USER"] : null;
            if (usr == null)
            {
                string username = (context.Request.Cookies["username"] != null) ? context.Request.Cookies["username"].ToString().Trim() : "";
                if (username != "")
                {
                    usr = UserGet.GetFeature(username);
                }
            }
            if (usr == null)
            {
                context.Response.Write("{\"status\":\"fail\",\"message\":\"用户没登录\"}");
                context.Response.Flush();
                context.Response.End();
            }
            else
            {
                if (usr.Privilege == 0)
                {
                    usrid = "%";
                }
                else
                {
                    usrid = usr.Id;

                }
            }

            switch (method)
            {
                case "add":
                    labelid = Guid.NewGuid().ToString();
                    string geometry = context.Request["geometry"].ToString().Trim();
                    title = context.Request["title"].ToString().Trim();
                    content = context.Request["content"].ToString().Trim();
                    
                    if (LabelAdd.AddFeature(type,labelid, usrid,geometry,title,content))
                    {
                        context.Response.Write("{\"status\":\"success\"}");
                    }
                    else
                    {
                        context.Response.Write("{\"status\":\"fail\"}");
                    }
                    break;
                case "get":
                    int page =Int32.Parse(context.Request["page"].ToString());
                    int size =Int32.Parse(context.Request["size"].ToString());
                    context.Response.Write(LabelGet.GetFeature(type,usrid,size,page));
                    break;
                case "del":
                    labelid = context.Request["labelid"].ToString().Trim();
                    if (LabelDel.DelFeature(labelid))
                    {
                        context.Response.Write("{\"status\":\"success\"}");
                    }
                    else
                    {
                        context.Response.Write("{\"status\":\"fail\"}");
                    }
                    break;
                case "edit":
                    labelid = context.Request["labelid"].ToString().Trim();
                    title = context.Request["title"].ToString().Trim();
                    content = context.Request["content"].ToString().Trim();
                    if (LabelEdit.EditFeature(labelid,title,content))
                    {
                        context.Response.Write("{\"status\":\"success\"}");
                    }
                    else
                    {
                        context.Response.Write("{\"status\":\"fail\"}");
                    }
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
