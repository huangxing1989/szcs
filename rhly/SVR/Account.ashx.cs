using System;
using System.Collections.Generic;
using System.Web;
using System.Data;
using System.Data.OracleClient;
using System.Web.SessionState;
using szcs.Util;
using szcs.DAL;
using szcs.Model;
namespace szcs.SVR
{

    public class Account : IHttpHandler,IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/json";
            string method=context.Request["method"].ToString().Trim().ToLower();
            string usrid = string.Empty;
            string usrname = string.Empty;
            string password = string.Empty;
            User usr = null;


            switch (method)
            {
                case "add":
                    usrid = Guid.NewGuid().ToString();
                    usrname = context.Request["usrname"].ToString().Trim();
                    password = context.Request["password"].ToString().Trim();
                    int privilege = 1;
                    
                    if (UserAdd.AddFeature(usrid,usrname,password,privilege))
                    {
                        context.Response.Write("{\"status\":\"success\"}");
                    }
                    else
                    {
                        context.Response.Write("{\"status\":\"fail\"}");
                    }
                    break;
                case "chk":
                    usrname = context.Request["usrname"].ToString().Trim();
                    if (UserGet.GetFeature(usrname)==null)
                    {
                        context.Response.Write("{\"status\":\"success\"}");
                    }
                    else
                    {
                        context.Response.Write("{\"status\":\"fail\"}");
                    }
                    break;
                case "login":
                    usrname = context.Request["usrname"].ToString().Trim();
                    password = context.Request["password"].ToString().Trim();
                    usr=UserGet.GetFeature(usrname);
                    if (usr!= null)
                    {
                        if (usr.Password == password)
                        {
                            context.Session.Timeout = 60;
                            context.Session.Add("USER", usr);
                            context.Response.Write("{\"status\":\"success\",\"usrid\":\""+usr.Id+"\",\"usrname\":\""+usr.Name+"\"}");
                        }
                        else
                        {
                            context.Response.Write("{\"status\":\"fail\",\"message\":\"密码错误\"}");
                        }
                    }
                    else
                    {
                        context.Response.Write("{\"status\":\"fail\",\"message\":\"用户名不存在\"}");
                    }
                    break;
                case "logout":
                    
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
