using System;
using szcs.Util;
using System.Text;
using System.Data;
using System.Data.OracleClient;

namespace szcs.DAL
{
    public class LabelDel
    {
        private static string SQL_DELETE_LABEL = "DELETE FROM MAPLABEL WHERE LABELID=:LABELID";
        public static bool DelFeature(string labelid)
        {
            using (OracleConnection conn = new OracleConnection(OraHelper.str))
            {
                conn.Open();
                OracleCommand comm = conn.CreateCommand();
                OracleParameter[] parms = new OracleParameter[]{
                    new OracleParameter(":LABELID",OracleType.VarChar),
                };
                parms[0].Value = labelid;
                comm.CommandText = SQL_DELETE_LABEL;
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
