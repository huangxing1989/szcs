using System;
using szcs.Util;
using System.Text;
using System.Data;
using System.Data.OracleClient;

namespace szcs.DAL
{
    public class LabelAdd
    {
        private static string SQL_INSERT_LABEL = "INSERT INTO MAPLABEL VALUES(:LABELID,:USRID,:TYPE,:CDATE,:GEOM,:TITLE,:CONTENT)";
        public static bool AddFeature(string type,string labelid,string usrid,string geom,string title,string content)
        {
            StringBuilder sb = new StringBuilder();
            using (OracleConnection conn = new OracleConnection(OraHelper.str))
            {
                conn.Open();
                OracleCommand comm = conn.CreateCommand();
                OracleParameter[] parms = new OracleParameter[]{
                    new OracleParameter(":LABELID",OracleType.VarChar),
                    new OracleParameter(":USRID",OracleType.VarChar),
                    new OracleParameter(":TYPE",OracleType.VarChar),
                    new OracleParameter(":CDATE",OracleType.DateTime),
                    new OracleParameter(":GEOM",OracleType.NClob),
                    new OracleParameter(":TITLE",OracleType.NVarChar),
                    new OracleParameter(":CONTENT",OracleType.VarChar),
                };
                parms[0].Value = labelid;
                parms[1].Value = usrid;
                parms[2].Value = type;
                parms[3].Value = DateTime.Now;
                parms[4].Value = geom;
                parms[5].Value = title;
                parms[6].Value = content;

                comm.CommandText = SQL_INSERT_LABEL;
                comm.CommandType = CommandType.Text;
                foreach (OracleParameter parm in parms)
                {
                    comm.Parameters.Add(parm);

                }
                comm.ExecuteNonQuery();
                conn.Close();
                return true;
            }
        }
    }
}
