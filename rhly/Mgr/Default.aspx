<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="szcs.Mgr.Default" %>

<!DOCTYPE html>
<html>
    <head runat="server">
        <title>系统后台管理</title>
        <script type="text/javascript" src="../JS/jquery-1.4.1.min.js"></script>
        <script type="text/javascript" src="../JS/jquery.cookie.js"></script>
        <script type="text/javascript" src="../JS/template.js"></script>
        <script type="text/javascript" src="../JS/mgr.js"></script>
        <script type="text/javascript" src="../SDK/NewMapServerJsAPI.js"></script>
        <script type="text/javascript" src="../SDK/SZCSJsAPI.js"></script>
        <script type="text/javascript" src="../SDK/scroll.min.js"></script>
        <link rel="Stylesheet" href="../SDK/theme/default/style.css" />
        <link rel="Stylesheet" href="../SDK/theme/default/szcs.css" />
        <link rel="Stylesheet" href="../CSS/sty.css" />
        <link rel="Stylesheet" href="../CSS/mgr.css" />
    </head>
    <body id="body" runat="server">
        <div id="banner"></div>
        <div id="main">
            <div id="sideBar" runat="server">
               <img runat="server" id="btn0" alt="page0" src="../IMG/mgr/sideBtn/ctrl_0.png" />
               <img runat="server" id="btn1" alt="page1" src="../IMG/mgr/sideBtn/ctrl_1.png" />
               <img runat="server" id="btn2" alt="page2" src="../IMG/mgr/sideBtn/ctrl_2.png" />
            </div>
            <div id="mainContain" runat="server">
                <div id="page0" runat="server" style="display:block;"></div>
                <div id="page1" runat="server" style="display:none;">敬请期待</div>
                <div id="page2" runat="server" style="display:none;">
                    <div id="labelToolBar">
                        <label for="labelType">标注类型</label>
                        <select id="labelType">
                            <option value="point" selected="selected">点标注</option>
                            <option value="line">线标注</option>
                            <option value="poly">面标注</option>
                        </select>
                        <label for="labelPerPage">每页显示</label>
                        <select id="labelPerPage">
                            <option value="10" selected="selected">10个</option>
                            <option value="20">20个</option>
                            <option value="50">50个</option>
                        </select>
                        <div id="labelMsg"></div>
                        <div id="labelPager"></div>
                    </div>
                    <div id="labelContent">
                        <div id="labelMap"></div>
                        <div id="labelList"></div>
                    </div>
                    <script type="text/javascript">
                        (function() {
                            var winH = (typeof window.innerHeight != 'undefined') ? window.innerHeight : document.documentElement.clientHeight;
                            var winW = (typeof window.innerWidth != 'undefined') ? window.innerWidth : document.documentElement.clientWidth;
                            var labelMap = document.getElementById("labelMap");
                            var labelContent = document.getElementById("labelContent");
                            labelContent.style.height = (winH - 125) + "px";
                            labelMap.style.width = (winW - 600) + "px";

                            jQuery(window).ready(function() {
                                var winH = (typeof window.innerHeight != 'undefined') ? window.innerHeight : document.documentElement.clientHeight;
                                var winW = (typeof window.innerWidth != 'undefined') ? window.innerWidth : document.documentElement.clientWidth;
                                var labelMap = document.getElementById("labelMap");
                                var labelContent = document.getElementById("labelContent");
                                labelContent.style.height = (winH - 125) + "px";
                                labelMap.style.width = (winW - 500) + "px";
                            });

                        })();      
                    </script>
                </div>
                
            </div>
        </div>
        <div id="footer">
            <a href="javascript:void(0);" id="logout">退出登录</a>
            <a href="../index.htm">回到首页</a>
        </div>
        <script type="text/javascript">
            (function() {
                var main = document.getElementById("main");
                var mainContain = document.getElementById("mainContain");
                var winH = (typeof window.innerHeight != 'undefined') ? window.innerHeight : document.documentElement.clientHeight;
                var winW = (typeof window.innerWidth != 'undefined') ? window.innerWidth : document.documentElement.clientWidth;
                main.style.height = (winH - 101) + "px";
                mainContain.style.width = (winW - 200) + "px";

                var logout = document.getElementById("logout");
                logout.onclick = function() {
                    jQuery.post("../SVR/Account.ashx?method=logout", {}, function(data, status) {
                        jQuery.cookie("username", null, { path: "/", expires: -1 });
                        jQuery.cookie("userid", null, { path: "/", expires: -1 });
                        location.href = "../index.htm";
                    });
                }

                var sideBar = document.getElementById("sideBar");
                var sideBarBtns = sideBar.getElementsByTagName("img");
                for (var i = 0, len = sideBarBtns.length; i < len; i++) {
                    var img = sideBarBtns[i];
                    img.onclick = function() {
                        for (var i = 0, len = sideBarBtns.length; i < len; i++) {
                            document.getElementById(sideBarBtns[i].alt).style.display = "none";
                        }
                        document.getElementById(this.alt).style.display = "block";
                        window[this.alt+"Model"]();
                    }
                }
            })();

            jQuery(window).resize(function() {
                var main = document.getElementById("main");
                var mainContain = document.getElementById("mainContain");
                var winH = (typeof window.innerHeight != 'undefined') ? window.innerHeight : document.documentElement.clientHeight;
                var winW = (typeof window.innerWidth != 'undefined') ? window.innerWidth : document.documentElement.clientWidth;
                main.style.height = (winH - 101) + "px";
                mainContain.style.width = (winW - 200) + "px";
            });
            template.openTag = "<?";
            template.closeTag = "?>";

        </script>
        <--!
        <script type="text/html" id="tmpl-label-parameter">
            <div class="tmpl-label-parameter-container">
                <input type="text" class="tmpl-label-parameter-input-title" id="<?=params["titleid"] ?>" value="<?=params["title"] ?>" />
                <textarea class="tmpl-label-parameter-input-content" id="<?=params["contid"] ?>"><?=params["content"] ?></textarea>
                <input type="button" value="确定" class="tmpl-label-parameter-button-sure" id="<?=params["sureid"] ?>" />
                <input type="button" value="取消" class="tmpl-label-parameter-button-cancel" id="<?=params["cancelid"] ?>" />
            </div>
        </script>
        <script type="text/html" id="tmpl-label-panel">
            <div class="tmpl-label-display-container">
                <div class="tmpl-label-display-title"><?=params["title"] ?></div>
                <div class="tmpl-label-display-content"><?=params["content"] ?></div>
            </div>
        </script>
        
        -->

    </body>
</html>
