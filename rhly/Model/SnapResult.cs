using System;
using System.Collections.Generic;
using System.Web;
using System.Drawing;

namespace szcs.Model
{
    public class SnapResult
    {
        public Bitmap image;

        public SnapResult():this(null)
        {


        }
        public SnapResult(Bitmap pic)
        {
            this.image = pic;

        }
    }
}
