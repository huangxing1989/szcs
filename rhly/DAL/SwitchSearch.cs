using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.Data.OracleClient;
using szcs.Util;

namespace szcs.DAL
{
    public static class SwitchSearch
    {
        private static string SQL_SEARCH_SWITCH = "SELECT T1.* FROM (SELECT T0.SCASE,ROWNUM SEQ FROM ORGSWITCH T0 WHERE {0})T1 WHERE SEQ<={1} AND SEQ>{2}";
        private static string SQL_SEARCH_SWITCH_TOTAL = "SELECT CEIL(COUNT(*)/{0}) FROM ORGSWITCH WHERE {1}";

        public static string GetFeature(string p_key, int p_size, int p_page)
        {
            StringBuilder sb = new StringBuilder();
            using (OracleConnection conn = new OracleConnection(OraHelper.str))
            {
                conn.Open();
                OracleCommand comm = conn.CreateCommand();
                comm.CommandText = string.Format(SQL_SEARCH_SWITCH_TOTAL, p_size, p_key);
                object total = comm.ExecuteScalar();

                comm.CommandText = string.Format(SQL_SEARCH_SWITCH, p_key, p_page * p_size, (p_page - 1) * p_size);
                OracleDataReader rdr = comm.ExecuteReader();
                string str = string.Empty;

                StringBuilder bb = new StringBuilder();

                if (rdr.HasRows)
                {
                    bb.Append("[");
                    while (rdr.Read())
                    {
                        bb.Append("{");
                        for (var i = 0; i < rdr.FieldCount; i++)
                        {
                            bb.Append("\"" + rdr.GetName(i) + "\":");
                            bb.Append(rdr[i].ToString().Trim() + ",");

                        }
                        bb.Remove(bb.Length - 1, 1);
                        bb.Append("},");

                    }
                    bb.Remove(bb.Length - 1, 1);
                    bb.Append("]");
                }
                else
                {

                    bb.Append("[]");

                }

                str = bb.ToString();
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
