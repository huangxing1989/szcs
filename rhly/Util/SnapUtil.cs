using System;
using szcs.Model;
using System.Drawing;
using System.Drawing.Imaging;
using System.Windows.Forms;
using System.Threading;
using System.Xml;

namespace szcs.Util
{
    public static class SnapUtil
    {
        private static SnapParams para = null;
        private static SnapResult result = null;
        
        public static SnapResult Snap(SnapParams p){
            //多线程传递参数麻烦，用静态变量来储存当前截图的参数

            SnapUtil.para = new SnapParams(p.m_Url,p.m_Path,p.m_WinWidth, p.m_WinHeight, p.m_Left, p.m_Top, p.m_SnapWidth, p.m_SnapHeight);
            Thread t = new Thread(new ThreadStart(t_callback));
            t.SetApartmentState(ApartmentState.STA);
            t.Priority = ThreadPriority.Highest;
            t.Start();


            while (t.ThreadState != ThreadState.Stopped)
            {
                System.Windows.Forms.Application.DoEvents();

            }

            //线程返回结果

            return SnapUtil.result;
        }
        private static void t_callback()
        {
            WebBrowser wb = new WebBrowser();
            wb.ScrollBarsEnabled = false;
            wb.DocumentCompleted += new WebBrowserDocumentCompletedEventHandler(wb_callback);
            wb.Navigate(SnapUtil.para.m_Url);
            while (wb.ReadyState != WebBrowserReadyState.Complete)
            {
                System.Windows.Forms.Application.DoEvents();

            }
        }

        private static void wb_callback(Object sender,WebBrowserDocumentCompletedEventArgs args)
        {
            WebBrowser wb = (WebBrowser)sender;
            if (wb.ReadyState == WebBrowserReadyState.Complete)
            {
                //将浏览器的长宽设置成参数里的长宽
                wb.Width = para.m_WinWidth;
                wb.Height = para.m_WinHeight;

                int left = para.m_Left;
                int top = para.m_Top; 
                int width = para.m_SnapWidth;
                int height = para.m_SnapHeight;
				
                Bitmap tmp = new Bitmap(para.m_WinWidth,para.m_WinHeight);		
                Rectangle rect = new Rectangle(0,0,para.m_WinWidth,para.m_WinHeight);
                wb.DrawToBitmap(tmp, rect);  //进行截图,完整的一张图

				Bitmap bm=new Bitmap(width,height);
				Graphics g=Graphics.FromImage(bm);
				Rectangle src=new Rectangle(left,top,width,height);
				Rectangle des=new Rectangle(0,0,width,height);
				g.DrawImage(tmp,des,src,GraphicsUnit.Pixel);

                bm.Save(para.m_Path);              //将截图储存
                SnapUtil.result = new SnapResult(tmp); 
            }
        }   
    }
}
