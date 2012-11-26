using System;
using System.Web;
using System.Web.UI;
using System.Data;
using System.Data.OracleClient;
using szcs.Util;
using szcs.Model;

namespace szcs.SVR
{
	public class GetSnap : System.Web.IHttpHandler
	{

        private const string SQL_INSERT = @"INSERT INTO MAPSHARE VALUES(:GUID,:DATA)";
		public virtual bool IsReusable {
			get {
				return false;
			}
		}
		
		public virtual void ProcessRequest (HttpContext context)
		{
            string htmltext = string.Empty;
            string guid = string.Empty;
            int ww;
            int wh;
            int x;
            int y;
            int cw;
            int ch;

            htmltext = context.Request["HTML"];
            ww = Convert.ToInt32(context.Request["ww"]);
            wh = Convert.ToInt32(context.Request["wh"]);
            x = Convert.ToInt32(context.Request["x"]);
            y = Convert.ToInt32(context.Request["y"]);
            cw = Convert.ToInt32(context.Request["cw"]);
            ch = Convert.ToInt32(context.Request["ch"]);
            guid = Guid.NewGuid().ToString();

            using (OracleConnection conn = new OracleConnection(context.Cache["ORASTR"].ToString()))
            {
                conn.Open();
                OracleCommand comm = conn.CreateCommand();
                OracleParameter[] parms=new OracleParameter[]{
                    new OracleParameter(":GUID",OracleType.VarChar),
                    new OracleParameter(":DATA",OracleType.NClob),
                };
                parms[0].Value = guid;
                parms[1].Value = htmltext;

                comm.CommandText = SQL_INSERT;
                comm.CommandType = CommandType.Text;
                foreach (OracleParameter parm in parms)
                {
                    comm.Parameters.Add(parm);

                }
                comm.ExecuteNonQuery();
            }
            string URL = context.Request.Url.AbsoluteUri.Substring(0, context.Request.Url.AbsoluteUri.IndexOf("SVR/GetSnap.ashx"));
            string url=URL + "Delegate.aspx?q="+guid+"&w="+ww+"&h="+wh;

            string PATH=@""+context.Server.MapPath(@"~")+context.Cache["CACHEPATH"].ToString()+guid+".png";

            SnapParams para = new SnapParams(url,PATH,ww, wh, x, y, cw, ch);
            SnapResult res = SnapUtil.Snap(para);
            context.Response.Write("window.open('" + URL+ context.Cache["CACHEURL"].ToString()+guid+".png')");
		}
	}
}

