using System;
using szcs.Util;
using System.Text;
using System.Data;
using System.Data.OracleClient;

namespace szcs.DAL
{
    public class LabelEdit
    {
        private static string SQL_UPDATE_LABEL = "UPDATE MAPLABEL SET TITLE=:TITLE,CONTENT=:CONTENT WHERE LABELID=:LABELID";
        public static bool EditFeature(string labelid,string title,string content)
        {
            StringBuilder sb = new StringBuilder();
            using (OracleConnection conn = new OracleConnection(OraHelper.str))
            {
                conn.Open();
                OracleCommand comm = conn.CreateCommand();
                OracleParameter[] parms = new OracleParameter[]{
                    new OracleParameter(":LABELID",OracleType.VarChar),
                    new OracleParameter(":TITLE",OracleType.VarChar),
                    new OracleParameter(":CONTENT",OracleType.VarChar)
                };
                parms[0].Value = labelid;
                parms[1].Value = title;
                parms[2].Value = content;

                comm.CommandText = SQL_UPDATE_LABEL;
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
