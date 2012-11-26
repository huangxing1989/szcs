using System;
using szcs.Util;
using System.Text;
using System.Data;
using System.Data.OracleClient;

namespace szcs.DAL
{
    public class UserAdd
    {
        private static string SQL_INSERT_USER = "INSERT INTO MAPUSER VALUES(:USRID,:USRNAME,:PASSWORD,:PRIVILEGE)";
        public static bool AddFeature(string usrid,string usrname,string password,int privilege)
        {
            StringBuilder sb = new StringBuilder();
            using (OracleConnection conn = new OracleConnection(OraHelper.str))
            {
                conn.Open();
                OracleCommand comm = conn.CreateCommand();
                OracleParameter[] parms = new OracleParameter[]{
                    new OracleParameter(":USRID",OracleType.VarChar),
                    new OracleParameter(":USRNAME",OracleType.VarChar),
                    new OracleParameter(":PASSWORD",OracleType.VarChar),
                    new OracleParameter(":PRIVILEGE",OracleType.UInt32)
                };
                parms[0].Value = usrid;
                parms[1].Value = usrname;
                parms[2].Value = password;
                parms[3].Value = privilege;

                comm.CommandText = SQL_INSERT_USER;
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
