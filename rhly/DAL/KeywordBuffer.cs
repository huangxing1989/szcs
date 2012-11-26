using System;
using System.Data;
using System.Text;
using System.Data.OracleClient;
using szcs.Util;

namespace szcs.DAL
{
    public static class KeywordBuffer
    {
        private static string SQL_BUFFER_KEYWORD = "SELECT * FROM (SELECT T0.*,ROWNUM SEQ FROM MAPPOI T0 WHERE LONGITUDE BETWEEN {0} AND {1} AND LATITUDE BETWEEN {2} AND {3} AND (POWER(LONGITUDE-{4},2)+POWER(LATITUDE-{5},2))<={6} AND {7})T1 WHERE SEQ<={8} AND SEQ>{9} ";
        private static string SQL_BUFFER_KEYWORD_TOTAL = "SELECT CEIL(COUNT(*)/{0}) FROM MAPPOI WHERE LONGITUDE BETWEEN {1} AND {2} AND LATITUDE BETWEEN {3} AND {4} AND (POWER(LONGITUDE-{5},2)+POWER(LATITUDE-{6},2))<={7} AND {8}";

        public static string GetFeature(string p_key,int p_size,int p_page,double p_x,double p_y,double p_radius){
            StringBuilder sb = new StringBuilder();
            using (OracleConnection conn = new OracleConnection(OraHelper.str))
            {
                conn.Open();
                OracleCommand comm = conn.CreateCommand();
                comm.CommandText = string.Format(SQL_BUFFER_KEYWORD_TOTAL, p_size,p_x-p_radius,p_x+p_radius,p_y-p_radius,p_y+p_radius,p_x,p_y,p_radius*p_radius,p_key);
                object total = comm.ExecuteScalar();

                comm.CommandText = string.Format(SQL_BUFFER_KEYWORD, p_x - p_radius, p_x + p_radius, p_y - p_radius, p_y + p_radius, p_x, p_y, p_radius, p_key, p_page * p_size, (p_page - 1) * p_size);
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
