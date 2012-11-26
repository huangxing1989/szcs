using System;
using System.Collections.Generic;
using System.Text;
using System.Web;
using System.IO;

namespace szcs.DAL
{
    public static class GetImages
    {
        public static string getResource(string phypath,string webpath,string ids)
        {
            StringBuilder sb = new StringBuilder();
            string[] id = ids.Split(new char[] { ',' });
            sb.Append("[");
            for (int i = 0; i < id.Length; i++)
            {
                if (i != 0)
                {
                    sb.Append(",");
                }
                sb.Append("{");
                sb.Append("\""+id[i]+"\":[");
                string path = phypath + "\\" + id[i];
                DirectoryInfo di = new DirectoryInfo(path);
                if (di.Exists){
                    FileInfo[] file = di.GetFiles();
                    if (file != null && file.Length != 0)
                    {
                        int isimg = 0;
                        for (int j = 0; j< file.Length; j++)
                        { 
                           switch(file[j].Extension.ToLower()){
                               case ".png":
                               case ".jpg":
                               case ".bmp":
                               case ".jpeg":
                                   if (isimg != 0)
                                   {
                                       sb.Append(",");   
                                   }
                                   sb.Append("\"");
                                   string wpath = webpath +"/"+id[i]+ "/"+file[j].Name;
                                   sb.Append(wpath);
                                   sb.Append("\"");
                                   isimg += 1;
                                   break;
                           }
                        }
                    }
                }
                sb.Append("]");
                sb.Append("}");

            }
            sb.Append("]");
            return sb.ToString();
        }
    }
}
