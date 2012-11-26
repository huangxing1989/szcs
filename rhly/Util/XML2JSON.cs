using System;
using System.Xml;
using System.IO;
using System.Text;

namespace szcs.Util
{
	public static class XML2JSON
	{		
		public static string ToJSON(XmlNode xml){

            return XML2JSON.Recursion(xml);
		}

        private static string Recursion(XmlNode xml)
        {

            StringBuilder sb = new StringBuilder();

            if (xml.Attributes.Count == 0)
            {
                if (xml.ChildNodes.Count == 0)
                {

                    sb.Append("{\"" + xml.Name + "\":\"\"}");
                    return sb.ToString();

                }
                else
                {
                    if (xml.ChildNodes[0].NodeType == XmlNodeType.Text)
                    {
                        //只有一个节点，且为文字节点
                        sb.Append("{\"" + xml.Name + "\":\"" + xml.ChildNodes[0].Value.Trim() + "\"}");
                        return sb.ToString();
                    }
                    else
                    {
                        if (xml.ChildNodes.Count == 1)
                        {

                            sb.Append("{\"" + xml.Name + "\":");
                            sb.Append(Recursion(xml.ChildNodes[0]));
                            sb.Append("}");

                        }
                        else
                        {
                            bool isSameChild = true;
                            for (int i = 0, len = xml.ChildNodes.Count; i < len; i++)
                            {
                                if (xml.ChildNodes[0].Name != xml.ChildNodes[i].Name)
                                {
                                    isSameChild = false;
                                    break;

                                }

                            }
                            if (isSameChild)
                            {
                                sb.Append("{\"" + xml.Name + "\":{");
                                sb.Append("\"" + xml.ChildNodes[0].Name + "\":[");
                                for (int i = 0, len = xml.ChildNodes.Count; i < len; i++)
                                {
                                    string str = Recursion(xml.ChildNodes[i]);
                                    str = str.Substring(str.IndexOf(":")+1);  //剪切掉：前面的部分
                                    str = str.Substring(0, str.Length - 1); //剪切掉最后的一个｝
                                    sb.Append(str);
                                    sb.Append(",");

                                }
                                sb.Remove(sb.Length - 1, 1);
                                sb.Append("]}}");
                            }
                            else
                            {
                                sb.Append("{\"" + xml.Name + "\":{");
                                for (int i = 0, len = xml.ChildNodes.Count; i < len; i++)
                                {
                                    string str = Recursion(xml.ChildNodes[i]);
                                    str = str.Substring(1, str.Length - 2);
                                    sb.Append(str);
                                    sb.Append(",");

                                }
                                sb.Remove(sb.Length - 1, 1);
                                sb.Append("}}");
                            }

                        }

                        return sb.ToString();

                    }

                }

            }
            else
            {
                sb.Append("{\""+xml.Name+"\":{");
                XmlAttributeCollection clt = xml.Attributes;
                foreach (XmlAttribute att in clt)
                {
                    sb.Append("\"" + att.Name + "\":\""+att.Value+"\",");

                }

                if (xml.HasChildNodes)
                {

                    if (xml.ChildNodes[0].NodeType == XmlNodeType.Text)
                    {
                        sb.Append("\"Text\":\"" + xml.ChildNodes[0].Value.Trim() + "\",");

                    }
                    else
                    {
                        if (xml.ChildNodes.Count == 1)
                        {
                            sb.Append("\"" + xml.ChildNodes[0].Name + "\":");
                            sb.Append(Recursion(xml.ChildNodes[0]));
                            sb.Append(",");


                        }
                        else
                        {
                            bool isSameChild = true;
                            for (int i = 0, len = xml.ChildNodes.Count; i < len; i++)
                            {
                                if (xml.ChildNodes[0].Name != xml.ChildNodes[i].Name)
                                {
                                    isSameChild = false;
                                    break;

                                }

                            }
                            if (isSameChild)
                            {
                                sb.Append("\"" + xml.ChildNodes[0].Name + "\":[");
                                for (int i = 0, len = xml.ChildNodes.Count; i < len; i++)
                                {
                                    string str = Recursion(xml.ChildNodes[i]);
                                    str = str.Substring(str.IndexOf(":")+1);
                                    str = str.Substring(0,str.Length - 1);
                                    sb.Append(str);
                                    sb.Append(",");

                                }
                                sb.Remove(sb.Length - 1, 1);
                                sb.Append("],");
                            }
                            else
                            {
                        
                                for (int i = 0, len = xml.ChildNodes.Count; i < len; i++)
                                {
                                    string str = Recursion(xml.ChildNodes[i]);
                                    str = str.Substring(1, str.Length - 2);
                                    sb.Append(str);
                                    sb.Append(",");

                                }
                            }



                        }


                    }


                }

                sb.Remove(sb.Length - 1, 1);
                sb.Append("}}");
                return sb.ToString();

            }
        }
		
	}
}

