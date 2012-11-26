using System;
using System.Collections.Generic;
using System.Web;
using System.Data;
using System.Data.OracleClient;

namespace szcs.SVR
{

    public class ShareMap : IHttpHandler
    {
        private const string SQL_INSERT = @"INSERT INTO MAPSHARE VALUES(:GUID,:DATA)";

        public void ProcessRequest(HttpContext context)
        {
            string htmltext = string.Empty;
            string guid = string.Empty;
            int ww;
            int wh;

            htmltext = context.Request["HTML"];
            ww = Convert.ToInt32(context.Request["ww"]);
            wh = Convert.ToInt32(context.Request["wh"]);
            guid = Guid.NewGuid().ToString();

            using (OracleConnection conn = new OracleConnection(context.Cache["ORASTR"].ToString()))
            {
                conn.Open();
                OracleCommand comm = conn.CreateCommand();
                OracleParameter[] parms = new OracleParameter[]{
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
                string url = context.Request.Url.AbsoluteUri.Substring(0, context.Request.Url.AbsoluteUri.IndexOf("SVR/ShareMap.ashx"));
                context.Response.Write("window.open(\'"+url+"Delegate.aspx?q="+guid+"&w="+ww+"&h="+wh+"\')");
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
