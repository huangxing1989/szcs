using System;
using System.Web;
using System.Web.UI;
using System.Drawing;
using szcs.Util;
using szcs.Model;
using System.Data;
using System.Data.OracleClient;

namespace szcs
{
    public partial class SnapDelegate : System.Web.UI.Page
    {
        private static string SQL_SELECT = "SELECT * FROM MAPSHARE WHERE GID='{0}'";

        protected void Page_Load(object sender, EventArgs e)
        {
            string guid = string.Empty;
            guid = Request["q"];
            int ww = Convert.ToInt32(Request["w"]);
            int wh = Convert.ToInt32(Request["h"]);
            if (guid == null || guid == string.Empty)
            {

                this.map.InnerHtml = "<h1 style='font-size:24px;text-align:center;'>输入参数无效</h1>";
                Response.End();

            }
            else
            {
                using (OracleConnection conn = new OracleConnection(OraHelper.str))
                {
                    conn.Open();
                    OracleCommand comm = conn.CreateCommand();
                    comm.CommandText = string.Format(SQL_SELECT, guid);
                    OracleDataReader dr = comm.ExecuteReader();
                    if (dr.Read())
                    {
                        string innerHTML = dr["DATA"].ToString();
                        this.map.InnerHtml = innerHTML;
                        this.map.Style.Value = "display:block;width:" + ww + "px;height:" + wh + "px;";
                    }
                    else
                    {
                        this.map.InnerHtml = "<h1 style='font-size:24px;text-align:center;'>该分享不存在</h1>";
                    }
                }
            }

        }

       
    }
}
