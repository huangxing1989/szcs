using System;
using szcs.Util;
using System.Text;
using System.Data;
using System.Data.OracleClient;
using szcs.Model;

namespace szcs.DAL
{
    public class UserGet
    {
        private static string SQL_SEARCH_USER_TOTAL = "SELECT * FROM MAPUSER WHERE USRNAME=:NAME";

        public static User GetFeature(string usrname)
        {
            StringBuilder sb = new StringBuilder();
            User usr = null;
            using (OracleConnection conn = new OracleConnection(OraHelper.str))
            {
                conn.Open();
                OracleCommand comm = conn.CreateCommand();
                OracleParameter[] parms = new OracleParameter[]{
                    new OracleParameter(":NAME",OracleType.VarChar)
                };
                parms[0].Value = usrname;
                comm.CommandText = SQL_SEARCH_USER_TOTAL;
                comm.CommandType = CommandType.Text;
                foreach (OracleParameter parm in parms)
                {
                    comm.Parameters.Add(parm);

                }
                OracleDataReader rdr = comm.ExecuteReader();
                if (rdr.HasRows)
                {
                    rdr.Read();
                    usr = new User(rdr[0].ToString(), rdr[1].ToString(), rdr[2].ToString(), int.Parse(rdr[3].ToString()));

                }
                else
                {
                    return null;

                }
                conn.Close();
            }

            return usr;
        }
    }
}
