using System;
using szcs.Util;
using System.Text;
using System.Data;
using System.Data.OracleClient;

namespace szcs.DAL
{
    public class LabelGet
    {
        private static string SQL_SEARCH_LINE = "SELECT T2.* FROM (SELECT T1.*,ROWNUM SEQ FROM (SELECT T0.LABELID,T0.GEOMETRY,T0.TITLE,T0.CONTENT FROM MAPLABEL T0 WHERE TYPE=\'{0}\' AND USRID LIKE \'{1}\' ORDER BY CTIME DESC)T1 WHERE ROWNUM<={2})T2 WHERE SEQ>{3}";
        private static string SQL_SEARCH_LINE_TOTAL = "SELECT CEIL(COUNT(*)/{0}) FROM MAPLABEL WHERE TYPE=\'{1}\' AND USRID LIKE \'{2}\'";

        public static string GetFeature(string type,string usrid,int p_size, int p_page)
        {
            StringBuilder sb = new StringBuilder();
            using (OracleConnection conn = new OracleConnection(OraHelper.str))
            {
                conn.Open();

                OracleCommand comm = conn.CreateCommand();
                comm.CommandText = string.Format(SQL_SEARCH_LINE_TOTAL, p_size,type,usrid);
                object total = comm.ExecuteScalar();

                comm.CommandText = string.Format(SQL_SEARCH_LINE, type,usrid, p_page * p_size, (p_page - 1) * p_size);
                OracleDataReader rdr = comm.ExecuteReader();
                string str = Reader2JSON.ToJSON(rdr);
                StringBuilder bb = new StringBuilder();

                sb.Append("{\"total\":");
                sb.Append(total);
                sb.Append(",\"page\":");
                sb.Append(p_page);
                sb.Append(",\"content\":");
                sb.Append(str);
                sb.Append("}");

                conn.Close();
            }
            return sb.ToString();
        }
    }
}
