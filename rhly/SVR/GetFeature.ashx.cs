using System;
using System.Collections.Generic;
using System.Web;
using System.Data;
using System.Data.OracleClient;
using szcs.Util;
using szcs.DAL;

namespace szcs.SVR
{
    public class GetFeature : IHttpHandler
    {
       
        public void ProcessRequest(HttpContext context)
        {
            string m_Type = context.Request["request"].ToLower();
            string m_Key = context.Request["where"];
            int m_Page=Convert.ToInt32(context.Request["page"]);
            int m_Size=Convert.ToInt32(context.Request["maxfeatures"]);
            string callback=Convert.ToString(context.Request["callback"]);

            context.Response.ContentType = "text/plain";
            switch (m_Type)
            {
                case "query":
                    switch (context.Request.QueryString["type"])
                    {
                        case "poi":
                            context.Response.Write(callback + "(" + KeywordSearch.GetFeature(m_Key, m_Size, m_Page) + ")");
                            break;
                        case "station":
                            context.Response.Write(callback + "(" + StationSearch.GetFeature(m_Key, m_Size, m_Page) + ")");
                            break;
                        case "line":
                            context.Response.Write(callback + "(" + LineSearch.GetFeature(m_Key, m_Size, m_Page) + ")");
                            break;
                        case "switch":
                            context.Response.Write(callback + "(" + SwitchSearch.GetFeature(m_Key, m_Size, m_Page) + ")");
                            break;
                    }
                    if (context.Request.QueryString["type"]=="poi")
                    {
                        
                    }
                    else if (context.Request.QueryString["type"] == "station")
                    {

                        

                    }
                    else if (context.Request.QueryString["type"] == "line")
                    {

                        

                    }
                    else if (context.Request.QueryString["type"] == "switch")
                    {
                        

                    }   
                    break;
                case "buff":
                    double m_X=Convert.ToDouble(context.Request["x"]);
                    double m_Y = Convert.ToDouble(context.Request["y"]);
                    double m_Radius = Convert.ToDouble(context.Request["r"]);

                    context.Response.Write(callback+"("+KeywordBuffer.GetFeature(m_Key,m_Size,m_Page,m_X,m_Y,m_Radius)+")");
                    break;
                case "spatialquery":
                    if (context.Request.QueryString["bbox"] != null)
                    {
                        string bbox = context.Request["bbox"];
                        string[] ls = bbox.Split(new char[] { ',' });
                        double m_l = Convert.ToDouble(ls[0]);
                        double m_b = Convert.ToDouble(ls[1]);
                        double m_r = Convert.ToDouble(ls[2]);
                        double m_t = Convert.ToDouble(ls[3]);
                        context.Response.Write(callback + "(" + KeywordRectangle.GetFeature(m_Key, m_Size, m_Page, m_l, m_b, m_r, m_t) + ")");
                    }
                    else if(context.Request.QueryString["point"]!=null)
                    {
                        string paras = context.Request["point"];
                        string[] parms = paras.Split(new char[]{','});
                        double m_x = Convert.ToDouble(parms[0]);
                        double m_y = Convert.ToDouble(parms[1]);
                        double m_r = Convert.ToDouble(parms[2]);
                        context.Response.Write(callback + "(" + KeywordBuffer.GetFeature(m_Key, m_Size, m_Page,m_x,m_y,m_r) + ")");
                    }
                    break;
            }
        }


        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}
