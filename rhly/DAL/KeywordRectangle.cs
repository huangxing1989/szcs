using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OracleClient;
using szcs.Util;
using System.Text;

namespace szcs.DAL
{
    public static class KeywordRectangle
    {
        private static string SQL_RECTANGLE_KEYWORD = "SELECT * FROM (SELECT T0.*,ROWNUM SEQ FROM MAPPOI T0 WHERE LONGITUDE BETWEEN {1} AND {2} AND LATITUDE BETWEEN {3} AND {4} AND {0})T1 WHERE SEQ<={5} AND SEQ>{6}";
        private static string SQL_RECTANGLE_KEYWORD_TOTAL = "SELECT CEIL(COUNT(*)/{0}) FROM MAPPOI WHERE LONGITUDE BETWEEN {1} AND {2} AND LATITUDE BETWEEN {3} AND {4} AND {5}";

        public static string GetFeature(string p_key, int p_size, int p_page, double p_left, double p_bottom, double p_right,double p_top )
        {
            StringBuilder sb = new StringBuilder();
            using (OracleConnection conn = new OracleConnection(OraHelper.str))
            {
                conn.Open();
                OracleCommand comm = conn.CreateCommand();
                comm.CommandText = string.Format(SQL_RECTANGLE_KEYWORD_TOTAL, p_size,p_left,p_right,p_bottom,p_top,p_key);
                object total = comm.ExecuteScalar();

                comm.CommandText = string.Format(SQL_RECTANGLE_KEYWORD, p_key,p_left, p_right,p_bottom,p_top,p_page * p_size,(p_page-1)*p_size);
                OracleDataReader rdr = comm.ExecuteReader();
                string str = Reader2JSON.ToJSON(rdr);

                sb.Append("{total:");
                sb.Append(total);
                sb.Append(",page:");
                sb.Append(p_page);
                sb.Append(",content:");
                sb.Append(str);
                sb.Append("}");

                conn.Close();

            }

            return sb.ToString();
        }
    }
}
