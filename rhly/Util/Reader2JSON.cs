using System;
using System.Collections.Generic;
using System.Web;
using System.Text;
using System.Data;
using System.Data.OracleClient;

namespace szcs.Util
{
    public static class Reader2JSON
    {
        public static string ToJSON(OracleDataReader rdr)
        {
            StringBuilder sb = new StringBuilder();
            
            if (rdr.HasRows)
            {
                sb.Append("[");
                while (rdr.Read())
                {
                    sb.Append("{");
                    for (var i = 0; i < rdr.FieldCount; i++)
                    {
                        sb.Append("\""+rdr.GetName(i)+"\":\"");
                        sb.Append(rdr[i].ToString().Trim() + "\",");

                    }
                    sb.Remove(sb.Length - 1, 1);
                    sb.Append("},");

                }
                sb.Remove(sb.Length - 1, 1);
                sb.Append("]");
            }
            else
            {
                sb.Append("[]");

            }
            return sb.ToString();
        }
    }
}
