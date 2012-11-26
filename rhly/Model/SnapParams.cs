using System;
using System.Collections.Generic;
using System.Web;

namespace szcs.Model
{
    public class SnapParams
    {
        public string m_Url;
        public string m_Path;
        public int m_WinWidth;
        public int m_WinHeight;
        public int m_Left;
        public int m_Top;
        public int m_SnapWidth;
        public int m_SnapHeight;

        public SnapParams():this("","",0,0,0,0,0,0)
        {
            

        }

        public SnapParams(string url,string path,int mww, int mwh, int ml, int mt,int msw,int msh)
        {
            this.m_Url = url;
            this.m_Path = path;
            this.m_WinWidth = mww;
            this.m_WinHeight = mwh;
            this.m_Left = ml;
            this.m_Top = mt;
            this.m_SnapWidth = msw;
            this.m_SnapHeight = msh;

        }

    }
}
