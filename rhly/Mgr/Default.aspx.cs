using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using szcs.Model;
using szcs.DAL;

namespace szcs.Mgr
{
    public partial class Default : System.Web.UI.Page
    {
        protected  User usr = null;
        protected void Page_Load(object sender, EventArgs e)
        {
            /*从session里获取用户，没有的话用cookie获取用户，否则跳转*/
            
            if (Session["USER"] != null)
            {
                usr = (User)Session["USER"]; 
            }
            else
            {
                string username = (Request.Cookies["username"]!=null)?Request.Cookies["username"].Value.ToString().Trim():"";
                if (username != "")
                {
                    usr = UserGet.GetFeature(username);
                    Session["USER"] = usr;
                }
                if (usr == null)
                {
                    Response.Redirect("../Usr/UsrLogin.htm");
                    Response.Flush();
                    Response.End();
                }
            }
            if (usr.Privilege < 0)
            {
                Response.Write("您没有后台管理权限！");
                Response.Flush();
                Response.End();
            }
            else
            {
                page0.InnerHtml = "欢迎您！"+usr.Name;
            }
        }
    }
}
