using System;
using szcs.Util;
using System.Text;
using System.Data;
using System.Data.OracleClient;

namespace szcs.DAL
{
    public static class LineSearch
    {
        private static string SQL_SEARCH_LINE = "SELECT T1.* FROM (SELECT T0.*,ROWNUM SEQ FROM ORGLINE T0 WHERE {0})T1 WHERE SEQ<={1} AND SEQ>{2}";
        private static string SQL_SEARCH_LINE_TOTAL = "SELECT CEIL(COUNT(*)/{0}) FROM ORGLINE WHERE {1}";

        public static string GetFeature(string p_key, int p_size, int p_page)
        {
            StringBuilder sb = new StringBuilder();
            using (OracleConnection conn = new OracleConnection(OraHelper.str))
            {
                conn.Open();

                OracleCommand comm = conn.CreateCommand();
                comm.CommandText = string.Format(SQL_SEARCH_LINE_TOTAL, p_size, p_key);
                object total = comm.ExecuteScalar();

                comm.CommandText = string.Format(SQL_SEARCH_LINE, p_key, p_page * p_size, (p_page - 1) * p_size);
                OracleDataReader rdr = comm.ExecuteReader();
                string str = Reader2JSON.ToJSON(rdr);

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
