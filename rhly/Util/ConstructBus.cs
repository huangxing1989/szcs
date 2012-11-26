using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OracleClient;
using szcs.Util;
using szcs.DAL;

namespace szcs.Util
{
    public static class ConstructBus
    {
        private static readonly string SQL_CREATE_POINT = "create table _point(sid )";
        private static readonly string SQL_CREATE_ROUTE = "";
        private static readonly string SQL_CREATE_SWITCH = "";
        public static void Do(string ptable,string rtable)
        {
            using (OracleConnection conn = new OracleConnection(OraHelper.str))
            {






            }
        }

    }
}
