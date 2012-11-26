using System;
using System.Collections.Generic;
using System.Web;
using System.Data;
using System.Data.OracleClient;
using System.Text;
using System.IO;

namespace szcs.Util
{
    public static class OraHelper
    {
        public static string str;
        static OraHelper(){

            str = "Data Source=oraforst;User Id=szst;Password=mapuser;";

        }
        

    }
}
