var Global = { "map": null,city:"", map3d: null,COUNT:100,maxExtent: null, html: {}, mapDiv: "newmap", "lays": {}, "NEWMAP": false, "Symbol": {}, "maxtolerance": 500, "user": null, "screen": "normal", "start": null, "end": null, "scripts": null, "urls": null, "type3d": "", "debug": true, "sync": true, "delay": 50, "state": "", "param": "", "handler": {} };
Global.urls={
    "URL_LAYER":"SVR/GetConfig.ashx?type=map",
    "URL_CLASSIFY": "SVR/GetConfig.ashx?type=clsy",
    "URL_SNAP":"SVR/GetSnap.ashx",
    "URL_RESOURCE":"SVR/GetResource.ashx?",
    "URL_FEEDBACK":"",
    "URL_SHARE":"SVR/ShareMap.ashx?",
    "URL_LABEL":"SVR/LABEL.ashx"
};

Global.html.BUSY = "<div style='width:240px;line-height:300px;height:300px;'><img style='width:50px;height:50px;margin:125px 123px 125px 123px;' src='IMG/common/loading.gif' /></div>";
Global.html.TIMEOUT="<div style='width:240x;line-height:300px;height:300px;margin:100px 0px;color:#4c7b11;font-size:12px;text-align:center;'>网络状态不佳,请稍后再查询</div>";
Global.html.NODATA="<div style='width:240x;line-height:300px;height:300px;margin:100px 0px;color:#4c7b11;font-size:12px;text-align:center;'>没有检索到相关信息</div>";
Global.html.NOLABEL="<div style='width:240x;line-height:300px;height:300px;margin:100px 0px;color:#4c7b11;font-size:12px;text-align:center;'>没有该类型标注收藏</div>";
if(typeof console=="undefined"){
    window.console={"log":function(){return arguments;}};
};

function init(div) {
    div=Global.mapDiv;
    /*初始化地图对象开始*/
    var maincontain = document.getElementById(div);
    var width = maincontain.clientWidth;
    var height = maincontain.clientHeight;
    var map2d = document.createElement("div");
    map2d.id = "map2d";
    map2d.className = "map2dDisplay";
    maincontain.appendChild(map2d);

    var map = new NMap("map2d", { projection: "epsg:4610", units: "dd" });
    Global.map = map;
    /*初始化地图对象结束*/

    /*初始化lays对象*/
    var _layDelay = 0;
    var _layCount = 3;
    function ajaxLays(res) {
        /*函数区开始*/
        function ajaxLyrMap(res) {
            var type = res.type.toLowerCase();
            if (type == "wmtslayer") {
                var ary = res.tile.resolutions.split(",");
                var alias = res.tile["alias"];
                var xmin = res.bbox["xmin"];
                var xmax = res.bbox["xmax"];
                var ymin = res.bbox["ymin"];
                var ymax = res.bbox["ymax"];
                var extent = new NBounds(xmin, ymin, xmax, ymax);
                Global.lays["vector"] = new NWMTSLayer("线划地图", alias, {
                    tileOrigin: new NLatLng(-180, 90),
                    transitionEffect: 'resize',
                    resolutions: ary,
                    format: "image/png",
                    isBasicLayer: true
                });
                Global.map.addLayer(Global.lays["vector"]);
                //Global.map.zoomToExtent(extent);
                /*设置*/
                Global.map.setCenter(new NLatLng(113.74572290234406, 25.091086861928698), 3);
                extent = new NBounds(113.72587199877464,25.079431376711256,113.77119060229026,25.102691493288404);
                Global.maxExtent = extent;
                Global.state = "vector";
            };
            _layDelay++;
            if (Global.debug) {
                console.log("地形图加载成功");
            }
        };

        function ajaxLyrImg(res) {
            var type = res.type.toLowerCase();
            if (type == "wmtslayer") {
                var ary = res.tile.resolutions.split(",");
                var alias = res.tile["alias"];
                Global.lays["raster"] = new NWMTSLayer("影像地图", alias, {
                    tileOrigin: new NLatLng(-180, 90),
                    transitionEffect: 'resize',
                    resolutions: ary,
                    format: "image/png",
                    isBasicLayer: true
                });
            };

            _layDelay++;
            if (Global.debug) {
                console.log("影像层加载成功");
            }
        };

        function ajaxLyrImgLab(res) {
            var type = res.type.toLowerCase();
            if (type == "wmtslayer") {
                var ary = res.tile.resolutions.split(",");
                var alias = res.tile["alias"];
                Global.lays["imglabel"] = new NWMTSLayer("影像注记", alias, {
                    tileOrigin: new NLatLng(-180, 90),
                    resolutions: ary,
                    format: "image/png",
                    isBasicLayer: false
                });
            };

            _layDelay++;
            if (Global.debug) {
                console.log("影像注记加载成功");
            }
        };


        function ajaxLyrMapLab(res) {
            var type = res.type.toLowerCase();
            if (type == "wmtslayer") {
                var ary = res.tile.resolutions.split(",");
                var alias = res.tile["alias"];
                Global.lays["maplabel"] = new NWMTSLayer("矢量注记", alias, {
                    tileOrigin: new NLatLng(-180, 90),
                    resolutions: ary,
                    format: "image/png",
                    isBasicLayer: false
                });
            };

            _layDelay++;
            Global.map.addLayer(Global.lays["maplabel"]);
            if (Global.debug) {
                console.log("矢量注记加载成功");
            }
        };

        /*函数区结束*/

        var app = res.SZCS;
        var lys = app.MAP.Layer;

        for (var i = 0, j = lys.length; i < j; i++) {
            var lyr = lys[i];
            if (lyr.running != 1) {
                if (Global.debug) {
                    console.log("该图层未激活");
                }
                continue;
            }
            var url = "http://" + lyr.server + "/NewMapServer/WebServices/Catalog.php?request=GetLayer&layerid=" + lyr.layerid + "";
            switch (lyr.name) {
                case "线划地图":
                    NCrossDomainRequest(url, ajaxLyrMap);
                    break;
                case "影像地图":
                    NCrossDomainRequest(url, ajaxLyrImg);
                    break;
                case "影像注记":
                    NCrossDomainRequest(url, ajaxLyrImgLab);
                    break;
                case "矢量注记":
                    NCrossDomainRequest(url, ajaxLyrMapLab);
                    break;
            };
        };
        /*其他参数，网络分析，公交*/
        var type3d = app.THREED.type;
        Global.type3d = type3d;

        /*服务类型*/
        if (app.FEATURESERVER == "NEWMAP") {
            Global.NEWMAP = true;
        } else {
            Global.NEWMAP = false;
        };
        /*城市名称*/
        Global.city = app.CITY;
        /*热门词汇*/
        Global.hotwords = app.HOTWORDS;
        Global.bufferwords = app.BUFFERWORDS.Value.split(",");

        var dmdz = new NQueryLayer("地名地址", app.DMDZ.OnlineResource, { queryfields: app.DMDZ.QueryField, displayfields: app.DMDZ.DisplayField });
        Global.lays["地名地址"] = dmdz;

        var clsy = new NQueryLayer("分类搜索", app.CLASSIFY.OnlineResource, { queryfields: app.CLASSIFY.QueryField, displayfields: app.CLASSIFY.DisplayField });
        Global.lays["分类搜索"] = clsy;

        var network = new NNetworkLayer("路径分析", app.ROUTE.OnlineResource, { queryfields: app.ROUTE.QueryField, displayfields: app.ROUTE.DisplayField });
        Global.lays["路径分析"] = network;

        var line = new NQueryLayer("公交换乘", app.BUS.LINE.OnlineResource, { queryfields: app.BUS.LINE.QueryField, displayfields: app.BUS.LINE.DisplayField });
        var arcs = new NQueryLayer("公交弧段", app.BUS.ARC.OnlineResource, { queryfields: app.BUS.ARC.QueryField, displayfields: app.BUS.ARC.QueryField });
        var stat = new NQueryLayer("公交站点", app.BUS.STATION.OnlineResource, { queryfields: app.BUS.STATION.QueryField, displayfields: app.BUS.STATION.DisplayField });
        var swit = new NQueryLayer("公交站点", app.BUS.SWITCH.OnlineResource, { queryfields: app.BUS.SWITCH.QueryField, displayfields: app.BUS.SWITCH.DisplayField });

        Global.lays["公交线路"] = line;
        Global.lays["公交弧段"] = arcs;
        Global.lays["公交站点"] = stat;
        Global.lays["公交换乘"] = swit;

        /*其他的图层*/
        var marker = new NMarkersLayer("POI搜索专用图层");
        Global.lays["POI图层"] = marker;

        var networkLayer = new NVectorLayer("路径分析图层");
        Global.lays["Network图层"] = networkLayer;

        var bufferLayer = new NVectorLayer("缓冲分析图层");
        Global.lays["Buffer图层"] = bufferLayer;

        /*模块用图层*/
        Global.Module = {};
        var mod = app.MODULES.MODULE;
        for (var i = 0; i < mod.length; i++) {
            var name = mod[i].name;
            var fealayer = new NQueryLayer(name, mod[i].OnlineResource, { queryfields: mod[i].QueryField, displayfields: mod[i].DisplayField });
            Global.Module[name] = fealayer;
        }
    };

    /*分类搜索回调*/
    function ajaxClassify(res) {
        Global.debug ? console.log("分类搜索定义返回") : null;
        Global.clsdt = res.SZCS;
    };

    jQuery.getJSON(Global.urls["URL_LAYER"], {}, ajaxLays);
    jQuery.getJSON(Global.urls["URL_CLASSIFY"], {}, ajaxClassify);


    var _timercall = function() {
        initPara();
        //initUser();
        initToolsAndCtrls();

        /*返回影像过渡的函数*/
        var obj = {};
        /*切换线划图函数*/
        obj["ToVector"] = function() {
            //Global.map3d.exit3D();
            switch (Global.state) {
                case "vector":
                    return false;
                    break;
                case "raster":
                    var ext = map.getBounds();
                    map.removeLayer(Global.lays["raster"], false);
                    map.removeLayer(Global.lays["imglabel"], false);
                    map.addLayers([Global.lays["vector"]]);
                    map.zoomToExtent(ext);
                    Global.state = "vector";
                    break;
                case "transition":
                    var extent = Global.map.getExtent();
                    map.removeLayer(Global.lays["rasterOpacity"], false);
                    map.removeLayer(Global.lays["vectorOpacity"], false);
                    map.addLayer(Global.lays["vector"]);
                    map.setBasicLayer(Global.lays["vector"]);
                    map.zoomToExtent(extent);
                    Global.state = "vector";
                    break;
            }
        };

        /*切换影像图函数*/
        obj["ToRaster"] = function() {
            //Global.map3d.exit3D();
            switch (Global.state) {
                case "raster":
                    return false;
                    break;
                case "vector":
                    var ext = map.getBounds();
                    map.removeLayer(Global.lays["vector"], false);
                    map.addLayers([Global.lays["raster"], Global.lays["imglabel"]]);
                    map.zoomToExtent(ext);
                    Global.state = "raster";
                    break;
                case "transition":
                    var extent = Global.map.getExtent();
                    map.removeLayer(Global.lays["rasterOpacity"]);
                    map.removeLayer(Global.lays["vectorOpacity"]);
                    map.addLayers([Global.lays["raster"], Global.lays["label"]]);
                    map.setBasicLayer(Global.lays["raster"]);
                    map.zoomToExtent(extent);
                    Global.state = "raster";
                    break;
            }

        };
        obj["ToOpacity"] = function(val) {
            /*val介于0-100之间，0表示线划，100表示影像*/
            //Global.map3d.exit3D();
            if (0 == val) {
                this.ToVector();
            } else if (100 == val) {
                this.ToRaster();
            } else {
                switch (Global.state) {
                    case "vector":
                        var extent = Global.map.getExtent();
                        map.removeLayer(Global.lays["vector"]);
                        map.addLayers([Global.lays["vectorOpacity"], Global.lays["rasterOpacity"]]);
                        Global.lays["rasterOpacity"].setOpacity(val / 100);
                        map.setBasicLayer(Global.lays["vectorOpacity"]);
                        map.zoomToExtent(extent);
                        Global.state = "transition";
                        break;

                    case "raster":
                        var extent = Global.map.getExtent();
                        map.removeLayer(Global.lays["raster"]);
                        map.removeLayer(Global.lays["label"]);
                        map.addLayers([Global.lays["vectorOpacity"], Global.lays["rasterOpacity"]]);
                        map.setBasicLayer(Global.lays["vectorOpacity"]);
                        Global.lays["rasterOpacity"].setOpacity(val / 100);
                        map.zoomToExtent(extent);
                        Global.state = "transition";
                        break;

                    case "transition":
                        Global.lays["rasterOpacity"].setOpacity(val / 100);
                        break;
                }
            }

        };
        //obj["To3D"] = function() {
        //    Global.map3d.into3D();
        //};
        Global.handler["Transition"] = obj;
        /*Transition里边是操作图层透明和切换的函数*/
        /*把3d初始化放到最后面，这个没装插件会出错*/
        //init3D("map3d");
    };

    var _time = 0;
    if (Global.sync) {
        var _timer = setInterval(function() {
            _time++;
            if (_layCount == _layDelay) {
                Global.debug ? console.log("加载地图延迟函数返回") : null;
                clearInterval(_timer);
                /*加入延迟调用函数*/
                _timercall();
            } else {
                /*继续重复测试*/
                if (_time >=Global.COUNT) {
                    /*等待了10秒*/
                    console.log("网速不给力，确保网络畅通,可能有图层没加载成功");
                    clearInterval(_timer);
                    _timercall();
                }
            }
        }, Global.delay);
    } else {
        _timercall();
    };
};

/*初始化地址里边的参数，参数名为type和value*/
function initPara(){
    var url=location.search||"a";
    url=url.substring(1);/*去除掉？号*/
    if(url==""){
        console.log("没有初始化内容，功能尚未完成");
        return;
    }
    var params=url.split("&");
    var type=params["type"];
    var value=params["value"];
    
    switch(type){
        case "0":
        
        case "1":
    }   
};

/*初始化地址参数结束*/

/*初始化用户*/
function initUser() {
    Global.debug ? console.log("初始化用户信息") : null;
    var username = jQuery.cookie("username");
    var userid = jQuery.cookie("userid");
    if (username == null) {
        Global.debug ? console.log("用户没登录") : null;
        document.getElementById("loginBtn").onclick = function() {
            location.href = "Usr/UsrLogin.htm";
        }
    } else {
        var userPanel = document.getElementById("userPanel");
        userPanel.innerHTML = "";
        var span = document.createElement("span");
        span.innerText = username;
        var logout = document.createElement("a");
        logout.innerHTML = "退出";
        logout.title="退出系统";
        logout.onclick = function() {
            jQuery.post("SVR/Account.ashx?method=logout", {}, function(data, status) {
                jQuery.cookie("username", null, { path: "/", expires: -1 });
                jQuery.cookie("userid", null, { path: "/", expires: -1 });
                location.href = location.href;
            });
        }
        userPanel.appendChild(span);
        userPanel.appendChild(logout);
    }
};

/*初始化控件和工具*/
function initToolsAndCtrls(){
    NRHLYControlBar();
    var menu = new NSZCSContextPanel();
    Global.map.addControl(menu);
	var ctrl=new NScaleBarControl();
	Global.map.addControl(ctrl);
	ctrl=new NPanZoomBarControl();
	Global.map.addControl(ctrl);
	ctrl = new NSZCSMaptypeControl();
	ctrl.addTools([new NSZCSTerrainTool(), new NSZCSRasterTool()]);
	Global.map.addControl(ctrl);

	/*热门关键词*/
    var hotword=document.getElementById("hotwords");
    hotword.innerHTML="热门搜索：";
    var str=Global.hotwords.Value;
    str=str.split(",");
    for(var i=0,len=str.length;i<len;i++){
        var anc=document.createElement("a");
        anc.innerText=str[i];
        anc.onclick=function(){
            var txt=document.getElementById("keywordInput");
            txt.value=this.innerText;
            document.getElementById("poiSearchBtn").onclick();
        }
        hotword.appendChild(anc);
    }
	/*关键词搜索开始*/
    var keysearchBtn = document.getElementById("poiSearchBtn");
    keysearchBtn.onclick = function() {
        var searchtxt = document.getElementById("keywordInput");
        var txt = searchtxt.value.trim();
        if ("" == txt) {
            alert("搜索关键词不能为空");
            searchtxt.focus();
            return;
        }
        /*将前一个搜索状态清空*/
        if (Global.handler.Query != null) {
            Global.handler.Query.abort();
            Global.handler.Query = null;
        };
        searchtxt.value = "";
        if (false) {
            FuzzyQuery(txt, "buffer", "poiSearchResult");
        } else {
            FuzzyQuery(txt, "key", "poiSearchResult");
        }
    };
	
    
//	/*路径搜索*/
//    var networkBtn=document.getElementById("routeSearchBtn");
//    networkBtn.onclick = function() {
//        var start = document.getElementById("routeSearchStart");
//        var end = document.getElementById("routeSearchEnd");
//        var stxt = start.value.trim();
//        var etxt = end.value.trim();
//        if (stxt == "") {
//            alert("请输入起点");
//            start.focus();
//            return;
//        }

//        if (etxt == "") {
//            alert("请输入终点");
//            end.focus();
//            return;
//        }

//        /*开始搜索起终点*/
//        if (Global.handler.Query != null) {
//            Global.handler.Query.abort();
//            Global.handler.Query = null;
//        };

//        Global.start = null;
//        Global.end = null;
//        start.value = "";
//        end.value = "";
//        NetworkQuery(stxt, etxt, "welcomePage", "routeSearchResult");
//    };
//	
//	/*公交站点*/
//    var linestationBtn = document.getElementById("linestationBtn");
//    var lineInput = document.getElementById("lineInput");
//    linestationBtn.onclick = function() {
//        if (Global.state == "3d") {
//            alert("请切换回二维地图模式");
//            return;
//        }
//        if (!lineInput.checked) {
//            var ipt = document.getElementById("linestationInput");
//            var txt = ipt.value.trim();
//            if (txt == "") {
//                alert("请输入站点名称");
//                ipt.focus();
//                return;
//            }
//            /*开始搜索站点*/
//            if (Global.handler.Query != null) {
//                Global.handler.Query.abort();
//                Global.handler.Query = null;
//            };
//            ipt.value = "";
//            StationQuery(txt, "keyPanel", "facePanel");

//        } else {
//            var ipt = document.getElementById("linestationInput");
//            var txt = ipt.value.trim();
//            if (txt == "") {
//                alert("请输入线路名称");
//                btn.focus();
//                return;
//            }
//            /*开始搜索线路*/
//            if (Global.handler.Query != null) {
//                Global.handler.Query.abort();
//                Global.handler.Query = null;
//            };
//            ipt.value = "";
//            LineQuery(txt, "keyPanel", "facePanel");
//        }
//    };
//	

//	/*公交换乘*/
//	var busBtn=document.getElementById("bussearchbtn");
//	busBtn.onclick = function() {
//	    if (Global.state == "3d") {
//	        alert("请切换回二维地图模式");
//	        return;
//	    }
//	    var start = document.getElementById("bussearchstart");
//	    var end = document.getElementById("bussearchend");
//	    var stxt = start.value.trim();
//	    var etxt = end.value.trim();
//	    if (stxt == "") {
//	        alert("请输入起点");
//	        start.focus();
//	        return;
//	    }
//	    if (etxt == "") {
//	        alert("请输入起点");
//	        end.focus();
//	        return;
//	    }
//	    /*开始搜索起终点*/
//	    if (Global.handler.Query != null) {
//	        Global.handler.Query.abort();
//	        Global.handler.Query = null;
//	    };

//	    Global.start = null;
//	    Global.end = null;
//	    start.value = "";
//	    end.value = "";
//	    BusQuery(stxt, etxt, "keyPanel", "facePanel");
//	};
//	
//	
//	/*加载特色功能模块*/
//	Global.Modules = new NSZCSModuleBoard("modulePanel");
//	var mod = Global.Module["旅游景点"];
//	var module = new NSZCSViewModule(mod.name, { "text": mod.name, "IMG": "IMG/module/tourview.png"});
//	Global.Modules.addModule(module.text, module);

//	mod = Global.Module["星级酒店"];
//	module = new NSZCSHotelModule(mod.name, { "text": mod.name, "IMG": "IMG/module/hotel.png"});
//	Global.Modules.addModule(module.text, module);

//	mod = Global.Module["旅行社"];
//	module = new NSZCSAgencyModule(mod.name, { "text": mod.name, "IMG": "IMG/module/agency.png"});
//	Global.Modules.addModule(module.text, module);
//	
	
};


/*初始化三维*/
function init3D(contain,type){
    /*判断类型，可加载newmap、天地图等三维空间*/
    /*汕头仍然使用天地图三维，从云浮开始使用都市圈的2.5D*/    
	Global.map3d=new NOCNLayer(Global.map,Global.type3d);

};

/*三维初始化完成*/

/*功能函数分区*/

/*模糊搜索函数*/

function FuzzyQuery(qstr,type,div,extent){
	var lay=Global.lays["地名地址"];
    var keys=lay.queryfields;
    var displayfield=lay.displayfields;
    var querytype=type;
    var page = 1;
    var totalPage = -1;
    var maxfeatures = 10;
    var QueryObject = {};
    var container = document.getElementById(div);
    var parent = container.parentElement;
    var contentList = null;
    var pageList = null;
    var content = null;
	var imgcol=null;
    var markerList = [];
    var Map = Global.map;
    var cDlg = null;
    var isAlive = false;
    var markers = Global.lays["POI图层"];
    var buffers=Global.lays["Buffer图层"];
    var _timer = null;
    var scrollPanel = null;

    /*计算container的大小*/
    var width = parent.clientWidth;
    var height = parent.clientHeight;
    parent.style.width = width + "px";
    parent.style.height = height + "px";
    scrollPanel = new baidu.ui.ScrollPanel({ container:parent.id, overflow: "overflow-y" });
    scrollPanel.render(parent.id);
    markers.clearMarkers();
    buffers.disposeFeatures();
    Map.addLayer(buffers);
    Map.addLayer(markers);
    /*将查询字段和关键词分段*/
    qstr=qstr.replace(/\s+/,"%");
    keysa=keys.split(",");
    /*构造查询语句where=*,关键词分词还未实现，用一个查询语句对多个字段进行查询*/
    var str="";
    for(var i=0,j=keysa.length;i<j;i++){
        if(i!=0){
            str+=" OR ";
        }
        str+=keysa[i]+" LIKE ";
        str+="'%"+qstr+"%'";
    };
    /*最短的名称应该是最符合条件的*/
    if (!Global.NEWMAP) {
        
        str += " ORDER BY LENGTH(" + keysa[0] + ")";
    }

    if (querytype == "key") {

        QueryObject = { "searchstring": str, "callback": callback, "page": page, "maxfeatures": maxfeatures };
        
    } else if (querytype = "buffer") {
   
        extent = extent ? extent : Global.map.getBounds();
        QueryObject = { "spatialQueryFilter": str, "callback": callback, "page": page, "maxfeatures": maxfeatures, "coords": extent.toBBOX()};
    }

    /*清除以前的查询结果*/
    container.innerHTML = "";
    var totalContainer = document.createElement("div");
    totalContainer.className = "QueryContainer";
    container.appendChild(totalContainer);
    var returnDiv = document.createElement("div");
    returnDiv.className = "QueryReturnDiv";
    var msg = document.createElement("span");
    msg.innerHTML = "正在搜索之中";
    returnDiv.appendChild(msg);
    var anchor = document.createElement("a");
    anchor.title = "返回主页面板";
    anchor.innerHTML = "返回首页";
    returnDiv.appendChild(anchor);

    anchor.onclick = function() {
        isAlive = false;
        if (_timer != null) {
            clearInterval(_timer);
            _timer = null;
        }
        markers.clearMarkers();
        buffers.disposeFeatures();
        for (var i = 0; i < markerList.length; i++) {
            markerList[i].dispose();
        }
        Map.removeLayer(markers);
        Map.removeLayer(buffers);
        cDlg ? Map.removeDialog(cDlg) : null;
        scrollPanel.dispose();
        container.style.display = "none";
        prevDiv.style.display = "block";
        Global.handler["Query"] = null;
    };
    totalContainer.appendChild(returnDiv);
    contentList = document.createElement("div");
    contentList.className = "QueryContentList";
    totalContainer.appendChild(contentList);


    function callback(res) {
        /*判断总页数有没有记录*/
        if(!isAlive){
            return;
        }   
        if(Global.NEWMAP){ 
            if (totalPage == -1) {
                totalPage = res.header.pages;
            }
			if(totalPage==0){
				isAlive=false;
				clearInterval(_timer);
				_timer=null;
				showResult("fail",Global.html.NODATA);
			}
			content=res.content.features;
        }else{
            if (totalPage == -1) {
                totalPage = res.total;
            }
			if(totalPage==0){
				isAlive=false;
				clearInterval(_timer);
				_timer=null;
				showResult("fail",Global.html.NODATA);
			}
			content=res.content;
        }
        msg.innerHTML = "总共搜索到"+totalPage+"页内容";
		
		/*获取图片列表*/
		if(totalPage!=0){
			var reqstr="";
			for(var i=0;i<content.length;i++){
				if(Global.NEWMAP){
					if(i!=0){
						reqstr+=",";
					}
					reqstr+=content[i].properties[ADDCODE];
				}else{
					if(i!=0){
						reqstr+=",";
					}
					reqstr+=content[i][ADDCODE];
				}
			}
			NCrossDomainRequest(Global.urls["URL_RESOURCE"]+"type=poi&ids="+reqstr,function(res){imgcol=res;});
		}
    };

    function _circleBuffer(latlng,radius) {
        buffers.disposeFeatures();
        /*将km的半径转换成度*/
        radius = radius * NINCHES_PER_UNIT["km"] / NINCHES_PER_UNIT["dd"];
        var center = new NGeometry.Point(latlng.lon, latlng.lat);
        var circle = NGeometry.Polygon.createRegularPolygon(center, radius, 200, null);
        var fea = new NVectorFeature(circle);
        buffers.addFeatures([fea]);
    };
    function _changeBuffer(latlng, radius) {
        buffers.disposeFeatures();
        radius = radius * NINCHES_PER_UNIT["km"] / NINCHES_PER_UNIT["dd"];
        var center = new NGeometry.Point(latlng.lon, latlng.lat);
        var circle = NGeometry.Polygon.createRegularPolygon(center, radius, 200, null);
        var fea = new NVectorFeature(circle);
        buffers.addFeatures([fea]);
        var ext = buffers.getLayerExtent();
        Global.map.zoomToExtent(ext);
    };
    function _buffer(keys) {
        var ext = buffers.getLayerExtent();
        isAlive = false;
        if (_timer != null) {
            clearInterval(_timer);
            _timer = null;
        }
        markers.clearMarkers();
        buffers.disposeFeatures();
        for (var i = 0; i < markerList.length; i++) {
            markerList[i].dispose();
        }
        Map.removeLayer(markers);
        Map.removeLayer(buffers);
        cDlg ? Map.removeDialog(cDlg) : null;
        scrollPanel.dispose();
        Global.handler["Query"] = null;
        FuzzyQuery(keys, "buffer", "keyPanel", "facePanel",ext);
    };

    function _setStart(latlng,name,val) {
        if (val == "") {
            alert("请输入终点");
            return;
        }
        isAlive = false;
        if (_timer != null) {
            clearInterval(_timer);
            _timer = null;
        }
        markers.clearMarkers();
        buffers.disposeFeatures();
        for (var i = 0; i < markerList.length; i++) {
            markerList[i].dispose();
        }
        Map.removeLayer(markers);
        Map.removeLayer(buffers);
        cDlg ? Map.removeDialog(cDlg) : null;
        scrollPanel.dispose();
        Global.handler["Query"] = null;

        Global.start = { "x": latlng.lon, "y": latlng.lat, "name": name, "sure": true };
        Global.end = null;
        NetworkQuery(name,val,"keyPanel", "facePanel");
    };
    function _setEnd(latlng,name,val) {
        if (val == "") {
            alert("请输入终点");
            return;
        }
        isAlive = false;
        if (_timer != null) {
            clearInterval(_timer);
            _timer = null;
        }
        markers.clearMarkers();
        buffers.disposeFeatures();
        for (var i = 0; i < markerList.length; i++) {
            markerList[i].dispose();
        }
        Map.removeLayer(markers);
        Map.removeLayer(buffers);
        cDlg ? Map.removeDialog(cDlg) : null;
        scrollPanel.dispose();
        Global.handler["Query"] = null;
        Global.start = null;
        Global.end = { "x": latlng.lon, "y": latlng.lat, "name": name, "sure": true };
        NetworkQuery(val, name, "keyPanel", "facePanel");
    };

    function showResult(type,msg) {
        switch (type) {
            case "success":
                contentList.innerHTML = "";
                var displayArray = displayfield.split(",");
                var pct = new NGeometry.MultiPoint();
                for (var i = 0, len = content.length; i < len; i++) {
                    var item = document.createElement("div");
                    item.className = "QueryContentListItem";
                    /*添加图片标头*/
                    var img = document.createElement("img");
                    img.className = "QueryContentListTitle";
                    img.src = "IMG/list/b_" + (i + 1) + ".png";
                    item.appendChild(img);
                    /*添加文字信息*/
                    var div = document.createElement("div");
                    div.className = "QueryContentListText";
                    var span = null;
                    var addcode = null;
                    for (var j = 0; j < displayArray.length; j++) {
                        span = document.createElement("span");
                        if (Global.NEWMAP) {
                            span.innerText = content[i].properties[displayArray[j]];
                        } else {
                            span.innerText = content[i][displayArray[j]];
                        }
                        div.appendChild(span);
                    }

                    item.appendChild(div);
                    /*添加兴趣点图片*/
                    if (Global.NEWMAP) {
                        addcode = content[i].properties[ADDCODE];

                    } else {
                        addcode = content[i][ADDCODE];
                    }

                    img = document.createElement("img");
                    img.className = "QueryContentListIMG";

                    if (imgcol[i][addcode].length != 0) {
                        img.src = imgcol[i][addcode][0];
                    } else {
                        img.src = "IMG/common/nopic.jpg";
                    }
                    item.appendChild(img);
                    item.onmouseover = function() {
                        this.className = "QueryContentListItemActive";
                        this.marker.events.triggerEvent("mouseover");
                    };
                    item.onmouseout = function() {
                        this.className = "QueryContentListItem";
                        this.marker.events.triggerEvent("mouseout");
                    };
                    item.onclick = function() {
                        this.marker.events.triggerEvent("click");
                    };

                    var ico = new NIcon("IMG/list/b_" + (i + 1) + ".png", new NSize(28, 43), new NPixel(-14, -36));
                    var latlng = null;
                    if (Global.NEWMAP) {
                        latlng = new NLatLng(parseFloat(content[i].geometry.coordinates[0]), parseFloat(content[i].geometry.coordinates[1]));

                    } else {

                        latlng = new NLatLng(parseFloat(content[i]["LONGITUDE"]), parseFloat(content[i]["LATITUDE"]));

                    }
                    var marker = new NMarker(latlng, ico);
                    markers.addMarker(marker);
                    var dlgstr = "";
                    var barid = "_scroll_" + i;
                    var iptid = "_ipt_" + i;
                    var msgid = "_msg_" + i;
                    var btnid = "_btn_" + i;
                    var siptid = "_sipt_" + i;
                    var eiptid = "_eipt_" + i;
                    var sbtnid = "_sbtn_" + i;
                    var ebtnid = "_ebtn_" + i;
                    var dlgid = "";
                    if (Global.NEWMAP) {
                        dlgid = content[i].properties[SHORTNAME];
                        dlgstr = "<div class='POI'>";
                        dlgstr += "<div class='POITitle'>" + content[i].properties[SHORTNAME] + "</div>";
                        dlgstr += "<div class='POIContain'>";
                        dlgstr += "<div class='POIText'>";
                        dlgstr += "<span style='POISpan'>地址：" + content[i].properties[ADDRESS] + "</span>";
                        dlgstr += "<span style='POISpan'>电话：" + ((content[i].properties[TELEPHONE] == "") ? "暂无" : content[i].properties[TELEPHONE]) + "</span>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='POIImage'>";
                        if (imgcol[i][addcode].length != 0) {
                            dlgstr += "<img title='点击图片放大' src='" + imgcol[i][addcode][0] + "' " + " alt='" + imgcol[i][addcode].join(",") + "' onclick='ExploreImage(this.alt);' />"

                        } else {
                            dlgstr += "<img title='没有预览图片' src='IMG/common/nopic.jpg' />";
                        }
                        dlgstr += "</div>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='POITool'>";
                        dlgstr += "<a href='javascript:void(0);' style='margin-left:20px;'>周边搜索</a>";
                        dlgstr += "<a href='javascript:void(0);'>从这出发</a>";
                        dlgstr += "<a href='javascript:void(0);'>到这里去</a>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='POIBuffer'>";
                        dlgstr += "<div class='POIBufferKeys'>";
                        for (var j = 0; j < Global.bufferwords.length; j++) {
                            dlgstr += "<a href='javascript:void(0);'>" + Global.bufferwords[j] + "</a>";
                        }
                        dlgstr += "<input type='text' id='" + iptid + "' style='width:60px;height:16px;margin:1px 1px 1px 1px;border:solid 1px #82B9B4;' />";
                        dlgstr += "<input type='button' id='" + btnid + "' value='搜索' style='width:40px;height:20px;margin:0px 2px;padding:0px;border:solid 1px #82B9B4;display:inline-block;' />";
                        dlgstr += "<span style='color:#E78F08;width:14px;text-align:right;display:inline-block;margin:0px;padding:0px;' id='" + msgid + "'>2</span>公里";
                        dlgstr += "</div>";
                        dlgstr += "<div class='POIBufferBar' id='" + barid + "'>";
                        dlgstr += "</div>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='POISetStart'>";
                        dlgstr += "<span style='color:#333;font-size:12px;height:16px;width:70px;text-align:right;display:inline-block;margin:12px 0px;padding:0px;'>输入终点：</span>";
                        dlgstr += "<input type='text' id='" + siptid + "' style='display:inline-block;width:110px;height:16px;margin:11px 1px 11px 1px;border:solid 1px #82b9b4;' />";
                        dlgstr += "<input type='button' id='" + sbtnid + "' value='查询' style='width:40px;height:20px;margin:10px 13px 10px 3px;padding:0px;border:solid 1px #82B9B4;display:inline-block;' />";
                        dlgstr += "</div>";
                        dlgstr += "<div class='POISetEnd'>";
                        dlgstr += "<span style='color:#333;font-size:12px;height:16px;width:70px;text-align:right;display:inline-block;margin:12px 0px;padding:0px;'>输入起点：</span>";
                        dlgstr += "<input type='text' id='" + eiptid + "' style='display:inline-block;width:110px;height:16px;margin:11px 1px 11px 1px;border:solid 1px #82b9b4;' />";
                        dlgstr += "<input type='button' id='" + ebtnid + "' value='查询' style='width:40px;height:20px;margin:10px 13px 10px 3px;padding:0px;border:solid 1px #82B9B4;display:inline-block;' />";
                        dlgstr += "</div>";
                        dlgstr += "</div>";

                    } else {
                        dlgid = content[i][SHORTNAME];
                        dlgstr = "<div class='POI'>";
                        dlgstr += "<div class='POITitle'>" + content[i][SHORTNAME] + "</div>";
                        dlgstr += "<div class='POIContain'>";
                        dlgstr += "<div class='POIText'>";
                        dlgstr += "<span style='POISpan'>地址：" + content[i][ADDRESS] + "</span>";
                        dlgstr += "<span style='POISpan'>电话：" + ((content[i][TELEPHONE] == "") ? "暂无" : content[i][TELEPHONE]) + "</span>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='POIImage'>";
                        if (imgcol[i][addcode].length != 0) {
                            dlgstr += "<img title='点击图片放大' src='" + imgcol[i][addcode][0] + "' " + " alt='" + imgcol[i][addcode].join(",") + "' onclick='ExploreImage(this.alt);' />"

                        } else {
                            dlgstr += "<img title='没有预览图片' src='IMG/common/nopic.jpg' />";
                        }

                        dlgstr += "</div>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='POITool'>";
                        dlgstr += "<a href='javascript:void(0);' style='margin-left:20px;'>周边搜索</a>";
                        dlgstr += "<a href='javascript:void(0);'>从这出发</a>";
                        dlgstr += "<a href='javascript:void(0);'>到这里去</a>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='POIBuffer'>";
                        dlgstr += "<div class='POIBufferKeys'>";
                        for (var j = 0; j < Global.bufferwords.length; j++) {
                            dlgstr += "<a href='javascript:void(0);'>" + Global.bufferwords[j] + "</a>";
                        }
                        dlgstr += "<input type='text' id='" + iptid + "' style='width:60px;height:16px;margin:1px 1px 1px 1px;border:solid 1px #82B9B4;' />";
                        dlgstr += "<input type='button' id='" + btnid + "' value='搜索' style='width:40px;height:20px;margin:0px 2px;padding:0px;border:solid 1px #82B9B4;display:inline-block;' />";
                        dlgstr += "<span style='color:#E78F08;width:14px;text-align:right;display:inline-block;margin:0px;padding:0px;' id='" + msgid + "'>2</span>公里";
                        dlgstr += "</div>";
                        dlgstr += "<div class='POIBufferBar' id='" + barid + "'>";
                        dlgstr += "</div>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='POISetStart'>";
                        dlgstr += "<span style='color:#333;font-size:12px;height:16px;width:70px;text-align:right;display:inline-block;margin:12px 0px;padding:0px;'>输入终点：</span>";
                        dlgstr += "<input type='text' id='" + siptid + "' style='display:inline-block;width:110px;height:16px;margin:11px 1px 11px 1px;border:solid 1px #82b9b4;' />";
                        dlgstr += "<input type='button' id='" + sbtnid + "' value='查询' style='width:40px;height:20px;margin:10px 13px 10px 3px;padding:0px;border:solid 1px #82B9B4;display:inline-block;' />";
                        dlgstr += "</div>";
                        dlgstr += "<div class='POISetEnd'>";
                        dlgstr += "<span style='color:#333;font-size:12px;height:16px;width:70px;text-align:right;display:inline-block;margin:12px 0px;padding:0px;'>输入起点：</span>";
                        dlgstr += "<input type='text' id='" + eiptid + "' style='display:inline-block;width:110px;height:16px;margin:11px 1px 11px 1px;border:solid 1px #82b9b4;' />";
                        dlgstr += "<input type='button' id='" + ebtnid + "' value='查询' style='width:40px;height:20px;margin:10px 13px 10px 3px;padding:0px;border:solid 1px #82B9B4;display:inline-block;' />";
                        dlgstr += "</div>";
                        dlgstr += "</div>";
                    }
                    var dlg = new NSZCSArrowDialog(null, latlng, null, dlgstr, true, function(e) { this.hide(); buffers.disposeFeatures(); });
                    marker.dialog = dlg;
                    marker.barid = barid;
                    marker.msgid = msgid;
                    marker.iptid = iptid;
                    marker.btnid = btnid;
                    marker.dlgid = dlgid;
                    marker.sbtnid = sbtnid;
                    marker.ebtnid = ebtnid;
                    marker.siptid = siptid;
                    marker.eiptid = eiptid;

                    marker.events.bind("mouseover", marker, function() { this.setURL(this.icon.url.replace("b_", "r_")); this.icon.imageDiv.style.zIndex = "5000"; });
                    marker.events.bind("mouseout", marker, function() { this.setURL(this.icon.url.replace("r_", "b_")); this.icon.imageDiv.style.zIndex = ""; });
                    marker.events.bind("click", marker, function() {
                        buffers.disposeFeatures();
                        Map.addDialog(this.dialog, true);
                        cDlg = this.dialog;
                        this.dialog.show();
                        jQuery(".POITool>a").click(function(e) {
                            var me = cDlg.mark;
                            switch (this.innerHTML) {
                                case "周边搜索":
                                    if (jQuery(this).attr("_init") == "true") {
                                        return;
                                    }
                                    jQuery(".POISetStart").css({ "display": "none" });
                                    jQuery(".POISetEnd").css({ "display": "none" });
                                    jQuery(".POIBuffer").css({ "display": "block" });
                                    jQuery(".POITool>a").attr("_init", false);
                                    cDlg.updateSize();
                                    cDlg.updatePosition();
                                    jQuery(this).attr("_init", true);

                                    jQuery("#" + me.barid).slider({
                                        min: 0,
                                        max: 6,
                                        step: 1,
                                        value: 2,
                                        range: "min",
                                        slide: function(event, ui) {
                                            jQuery("#" + me.msgid)[0].innerHTML = ui.value;
                                            _circleBuffer(me.latlng, ui.value);
                                        },
                                        change: function(event, ui) {
                                            _changeBuffer(me.latlng, ui.value);
                                        }
                                    });
                                    jQuery(".POIBufferKeys>a").click(function(e) {

                                        _buffer(this.innerText);

                                    });
                                    jQuery("#" + me.btnid).click(function(e) {

                                        _buffer(jQuery("#" + me.iptid).val());

                                    });
                                    _changeBuffer(me.latlng, 2);
                                    break;
                                case "从这出发":
                                    if (jQuery(this).attr("_init") == "true") {
                                        return;
                                    }
                                    buffers.disposeFeatures();
                                    jQuery(".POIBuffer").css({ "display": "none" });
                                    jQuery(".POISetEnd").css({ "display": "none" });
                                    jQuery(".POISetStart").css({ "display": "block" });
                                    jQuery(".POITool>a").attr("_init", false);
                                    cDlg.updateSize();
                                    cDlg.updatePosition();
                                    jQuery(this).attr("_init", true);
                                    jQuery("#" + me.sbtnid).click(function(e) {
                                        var val = jQuery("#" + me.siptid).val();
                                        jQuery("#" + me.siptid).val("");
                                        _setStart(me.latlng, me.dlgid, val);

                                    });
                                    break;
                                case "到这里去":

                                    if (jQuery(this).attr("_init") == "true") {
                                        return;
                                    }
                                    buffers.disposeFeatures();
                                    jQuery(".POIBuffer").css({ "display": "none" });
                                    jQuery(".POISetStart").css({ "display": "none" });
                                    jQuery(".POISetEnd").css({ "display": "block" });
                                    jQuery(".POITool>a").attr("_init", false);
                                    cDlg.updateSize();
                                    cDlg.updatePosition();
                                    jQuery(this).attr("_init", true);
                                    jQuery("#" + me.ebtnid).click(function(e) {
                                        var val = jQuery("#" + me.eiptid).val();
                                        jQuery("#" + me.eiptid).val("");
                                        _setEnd(me.latlng, me.dlgid, val);

                                    });
                                    break;

                            }
                        });

                        Map.panTo(this.latlng);
                    });
                    markerList.push(marker);
                    item.marker = marker;
                    dlg.mark = marker;
                    contentList.appendChild(item);
                    pct.addComponent(new NGeometry.Point(latlng.lon, latlng.lat));
                }
                scrollPanel.update();
                if (pct.components.length > 1) {
                    var ext = pct.getBounds();
                    Map.zoomToExtent(ext);
                } else {
                    var point = pct.components[0];
                    Map.panTo(new NLatLng(point.x, point.y));
                }

                /*构建pagelist*/
                BuildPageList();
                break;
            case "busy":
                contentList.innerHTML = msg;
                break;
            case "fail":
                contentList.innerHTML = msg;
                break;
        }
    };
    
    /*返回对象，保存闭包的许多函数*/
    var retObj = {};
    retObj.Query = function() {
        content = null;
        imgcol = null;
        isAlive = true;
        if (_timer != null) {
            clearInterval(_timer);
            _timer = null;
        };
        QueryObject.page = page;
        if (querytype == "key") {
            lay.query(QueryObject);
        }
        else {
            lay.spatialQuery("bbox", QueryObject);
        }
        showResult("busy", Global.html.BUSY);
        markers.clearMarkers();
        buffers.disposeFeatures();
        for (var i = 0; i < markerList.length; i++) {
            markerList[i].dispose();
        }
        markerList = [];
        cDlg ? Map.removeDialog(cDlg) : null;
        /*查询之后，等待显示结果，如果时间太长则abort掉查询*/
        var _time = 0;
        _timer = setInterval(function() {
            _time++;
            if (content != null && imgcol != null) {
                /*函数返回了*/
                clearInterval(_timer);
                _timer = null;
                isAlive = false;
                showResult("success", "");
            } else {
                if (_time >=Global.COUNT || !isAlive) {
                    /*当前查询已经被抛弃了*/
                    isAlive = false;
                    clearInterval(_timer);
                    _timer = null;
                    showResult("fail", Global.html.TIMEOUT);
                }
            }
        }, Global.delay);
    };
    /*下一页*/
    retObj.next = function() {
        if (page<totalPage) {
            page++;
            retObj.Query();

        } else {
            console.log("当前已经是末页");
        }

    };
    /*上一页*/
    retObj.prev = function() {
        if (page > 1) {
            page--;
            retObj.Query();
        } else {
            console.log("当前已经是首页");
        }
    };
    /*跳到第p页*/
    retObj.go = function(p) {
        page = p;
        retObj.Query();
    };
    retObj.refresh = function() {
        retObj.Query();
    };
    retObj.abort = function() {
        anchor.onclick();
    };
    

    /*列表创建函数*/
    function BuildPageList() {
        /*最快捷的清空内容*/
        if (totalPage == 0) {
            return;
        }
        pageList = document.createElement("div");
        pageList.className = "QueryPageList";
        contentList.appendChild(pageList);

        pageList.innerHTML = "";

        var div = document.createElement("div");
        div.className = "PageList";

        var entity = document.createElement("a");
        entity.className = "QueryPageItem";
        entity.innerText = "首页";

        entity.onclick = function() {
            retObj.go(1);
        };
        div.appendChild(entity);
        /*首页部分完成*/
        
        /*页码的开始部分和结束部分，要判断是否小于0或者超过最大值*/

        var startNum;
        var endNum;
        if (totalPage >= 5) {
            if (page <= 3) {
                /*当前页码还是在1-3之间时，如果-2就变成负值了*/
                startNum = 1;
                endNum = 5;

            } else if (page >= totalPage - 2) {
                /*原理和上边类似*/
                endNum = totalPage;
                startNum = totalPage - 4;

            } else {
                /*这是最一般的情况*/
                startNum = page - 2;
                endNum = page + 2;

            }

        } else {
            /*页数不够5页，就把全部显示出来*/
            startNum = 1;
            endNum = totalPage;   
        };
        for (var i = startNum; i <=endNum; i++) {
            entity = document.createElement("a");
            entity.className = "QueryPageItem";
            entity.innerText = i;
            if (i == page) {
                /*当前页面鼠标动作不反应，单击也不反应*/
                entity.style.backgroundColor = "rgb(161,201,200)";
            }
            else {
            	var index=i;
            	entity.onclick = function() {
            	/*这个部分闭包不好使，还没想出对策，直接用标签值代替*/
            	    var index = parseInt(this.innerText);
            	    retObj.go(index);
            	};
            }
            div.appendChild(entity);
        };
        /*中间部分*/
        entity = document.createElement("a");
        entity.className = "QueryPageItem";
        entity.innerText = "末页";
        entity.onclick = function() {
            retObj.go(totalPage);

        };
        div.appendChild(entity);
        pageList.appendChild(div);

    };
    Global.handler["Query"]=retObj;
    retObj.go(1);
};



/*分类搜索定义*/
function ClassQuery(classname, div, prevDiv,extent) {
    var lay = Global.lays["分类搜索"];
    var clsdt = Global.clsdt;
    var querytype = "buffer";
    var cNode = clsdt;
    var field = lay.queryfields;
    var qstr = "";
    var displayfield = lay.displayfields;
    var page = 1;
    var totalPage = -1;
    var maxfeatures = 10;
    var QueryObject = {};
    var container = document.getElementById(div);
    var prevDiv = document.getElementById(prevDiv);
    prevDiv.style.display = "none";
    container.style.display = "block";
    var contentList = null;
    var pageList = null;
    var content = null;
    var imgcol = null;
    var markerList = [];
    var Map = Global.map;
    var cDlg = null;
    var isAlive = false;
    var markers = Global.lays["POI图层"];
    var buffers = Global.lays["Buffer图层"];
    markers.clearMarkers();
    buffers.disposeFeatures();
    Map.addLayer(buffers);
    Map.addLayer(markers);
    var _timer = null;
    var scrollPanel = null;
    
    if (querytype == "key") {

        QueryObject = { "searchstring": qstr, "callback": callback, "page": page, "maxfeatures": maxfeatures };

    } else if (querytype = "buffer") {
        extent = extent || Map.getBounds();
        QueryObject = { "spatialQueryFilter": qstr, "callback": callback, "page": page, "maxfeatures": maxfeatures, "coords":extent.toBBOX() };
    };

    /*清除以前的查询结果*/
    container.innerHTML = "";
    var totalContainer = document.createElement("div");
    totalContainer.className = "QueryContainer";
    totalContainer.id = "_con_" + Math.random();
    totalContainer.style.cssText = "display:block;width:" + container.clientWidth + "px;height:" + container.clientHeight + "px;";
    container.appendChild(totalContainer);
    var returnDiv = document.createElement("div");
    returnDiv.className = "QueryReturnDiv";
    var msg = document.createElement("span");
    msg.innerHTML = "正在搜索之中";
    returnDiv.appendChild(msg);
    var anchor = document.createElement("a");
    anchor.title = "返回前一面板";
    anchor.innerHTML = "返回首页";
    returnDiv.appendChild(anchor);

    returnDiv.onmouseover = function() {
        this.backgroundColor = "#F5F7FF";
    };
    returnDiv.onmouseout = function() {
        this.backgroundColor = "#fff";
    };
    anchor.onclick = function() {
        isAlive = false;
        if (_timer != null) {
            clearInterval(_timer);
            _timer = null;
        }
        markers.clearMarkers();
        buffers.disposeFeatures();
        for (var i = 0; i < markerList.length; i++) {
            markerList[i].dispose();
        }
        Map.removeLayer(markers);
        Map.removeLayer(buffers);
        cDlg ? Map.removeDialog(cDlg) : null;
        scrollPanel.dispose();
        container.style.display = "none";
        prevDiv.style.display = "block";
        Global.handler["Query"] = null;
    };

    totalContainer.appendChild(returnDiv);

    var classifyContainer = document.createElement("div");
    classifyContainer.className = "ClassifyContainer";
    var classifyTitle = document.createElement("div");
    classifyTitle.className = "ClassifyTitle";
    var classifyContent = document.createElement("div");
    classifyContent.className = "ClassifyContent";

    classifyContainer.appendChild(classifyTitle);
    classifyContainer.appendChild(classifyContent);
    totalContainer.appendChild(classifyContainer);

    contentList = document.createElement("div");
    contentList.className = "QueryContentList";
    totalContainer.appendChild(contentList);
    /*初始化模拟拖动条*/
    scrollPanel = new baidu.ui.ScrollPanel({ container: totalContainer.id, overflow: "overflow-y" });
    scrollPanel.render(totalContainer.id);

    function callback(res) {
        /*判断总页数有没有记录*/
        if (!isAlive) {
            return;
        }
        if (Global.NEWMAP) {
            if (totalPage == -1) {
                totalPage = res.header.pages;
            }
            if (totalPage == 0) {
                isAlive = false;
                clearInterval(_timer);
                _timer = null;
                showResult("fail", Global.html.NODATA);
            }
            content = res.content.features;
        } else {
            if (totalPage == -1) {
                totalPage = res.total;
            }
            if (totalPage == 0) {
                isAlive = false;
                clearInterval(_timer);
                _timer = null;
                showResult("fail", Global.html.NODATA);
            }
            content = res.content;
        }
        /*获取图片列表*/
        if (totalPage != 0) {
            var reqstr = "";
            for (var i = 0; i < content.length; i++) {
                if (Global.NEWMAP) {
                    if (i != 0) {
                        reqstr += ",";
                    }
                    reqstr += content[i].properties[ADDCODE];
                } else {
                    if (i != 0) {
                        reqstr += ",";
                    }
                    reqstr += content[i][ADDCODE];
                }
            }
            NCrossDomainRequest(Global.urls["URL_RESOURCE"] + "type=poi&ids=" + reqstr, function(res) { imgcol = res; });
        }
        msg.innerHTML = "总共搜索到" + totalPage + "页内容";
    };


    function _circleBuffer(latlng, radius) {
        buffers.disposeFeatures();
        /*将km的半径转换成度*/
        radius = radius * NINCHES_PER_UNIT["km"] / NINCHES_PER_UNIT["dd"];
        var center = new NGeometry.Point(latlng.lon, latlng.lat);
        var circle = NGeometry.Polygon.createRegularPolygon(center, radius, 200, null);
        var fea = new NVectorFeature(circle);
        buffers.addFeatures([fea]);
    };
    function _changeBuffer(latlng, radius) {
        buffers.disposeFeatures();
        radius = radius * NINCHES_PER_UNIT["km"] / NINCHES_PER_UNIT["dd"];
        var center = new NGeometry.Point(latlng.lon, latlng.lat);
        var circle = NGeometry.Polygon.createRegularPolygon(center, radius, 200, null);
        var fea = new NVectorFeature(circle);
        buffers.addFeatures([fea]);
        var ext = buffers.getLayerExtent();
        Global.map.zoomToExtent(ext);
    };
    function _buffer(keys) {
        var ext = buffers.getLayerExtent();
        isAlive = false;
        if (_timer != null) {
            clearInterval(_timer);
            _timer = null;
        }
        markers.clearMarkers();
        buffers.disposeFeatures();
        for (var i = 0; i < markerList.length; i++) {
            markerList[i].dispose();
        }
        Map.removeLayer(markers);
        Map.removeLayer(buffers);
        cDlg ? Map.removeDialog(cDlg) : null;
        scrollPanel.dispose();
        Global.handler["Query"] = null;
        FuzzyQuery(keys, "buffer", "keyPanel", "facePanel", ext);
    };
    
    function _setStart(latlng, name, val) {
        if (val == "") {
            alert("请输入终点");
            return;
        }
        isAlive = false;
        if (_timer != null) {
            clearInterval(_timer);
            _timer = null;
        }
        markers.clearMarkers();
        buffers.disposeFeatures();
        for (var i = 0; i < markerList.length; i++) {
            markerList[i].dispose();
        }
        Map.removeLayer(markers);
        Map.removeLayer(buffers);
        cDlg ? Map.removeDialog(cDlg) : null;
        scrollPanel.dispose();
        Global.handler["Query"] = null;

        Global.start = { "x": latlng.lon, "y": latlng.lat, "name": name, "sure": true };
        Global.end = null;
        NetworkQuery(name, val, "keyPanel", "facePanel");
    };
    function _setEnd(latlng, name, val) {
        if (val == "") {
            alert("请输入终点");
            return;
        }
        isAlive = false;
        if (_timer != null) {
            clearInterval(_timer);
            _timer = null;
        }
        markers.clearMarkers();
        buffers.disposeFeatures();
        for (var i = 0; i < markerList.length; i++) {
            markerList[i].dispose();
        }
        Map.removeLayer(markers);
        Map.removeLayer(buffers);
        cDlg ? Map.removeDialog(cDlg) : null;
        scrollPanel.dispose();
        Global.handler["Query"] = null;
        Global.start = null;
        Global.end = { "x": latlng.lon, "y": latlng.lat, "name": name, "sure": true };
        NetworkQuery(val, name, "keyPanel", "facePanel");
    };


    function showResult(type, msg) {
        switch (type) {
            case "success":
                contentList.innerHTML = "";
                var displayArray = displayfield.split(",");
                var pct = new NGeometry.MultiPoint();
                for (var i = 0; i < markerList.length; i++) {
                    markerList[i].dispose();
                }
                markerList = [];
                for (var i = 0, len = content.length; i < len; i++) {
                    var item = document.createElement("div");
                    item.className = "QueryContentListItem";
                    /*添加图片标头*/
                    var img = document.createElement("img");
                    img.className = "QueryContentListTitle";
                    img.src = "IMG/list/b_" + (i + 1) + ".png";
                    item.appendChild(img);
                    /*添加文字信息*/
                    var div = document.createElement("div");
                    div.className = "QueryContentListText";
                    var span = null;
                    var addcode = null;
                    for (var j = 0; j < displayArray.length; j++) {
                        span = document.createElement("span");
                        if (Global.NEWMAP) {
                            span.innerText = content[i].properties[displayArray[j]];
                            addcode = content[i].properties[ADDCODE];
                        } else {
                            span.innerText = content[i][displayArray[j]];
                            addcode = content[i][ADDCODE];
                        }
                        div.appendChild(span);
                    }
                    item.appendChild(div);
                    /*添加兴趣点图片*/
                    img = document.createElement("img");
                    img.className = "QueryContentListIMG";
                    if (imgcol[i][addcode].length != 0) {
                        img.src = imgcol[i][addcode][0];
                    } else {
                        img.src = "IMG/common/nopic.jpg";
                    }
                    item.appendChild(img);
                    item.onmouseover = function() {
                        this.className = "QueryContentListItemActive";
                        this.marker.events.triggerEvent("mouseover");
                    };
                    item.onmouseout = function() {
                        this.className = "QueryContentListItem";
                        this.marker.events.triggerEvent("mouseout");
                    };
                    item.onclick = function() {

                        this.marker.events.triggerEvent("click");
                    };

                    var ico = new NIcon("IMG/list/b_" + (i + 1) + ".png", new NSize(28, 43), new NPixel(-14, -36));
                    var latlng = null;
                    if (Global.NEWMAP) {
                        latlng = new NLatLng(parseFloat(content[i].geometry.coordinates[0]), parseFloat(content[i].geometry.coordinates[1]));

                    } else {

                        latlng = new NLatLng(parseFloat(content[i]["LONGITUDE"]), parseFloat(content[i]["LATITUDE"]));

                    }
                    var marker = new NMarker(latlng, ico);
                    markers.addMarker(marker);
                    var dlg;
                    var dlgstr = "";
                    var barid = "_scroll_" + i;
                    var iptid = "_ipt_" + i;
                    var msgid = "_msg_" + i;
                    var btnid = "_btn_" + i;
                    var siptid = "_sipt_" + i;
                    var eiptid = "_eipt_" + i;
                    var sbtnid = "_sbtn_" + i;
                    var ebtnid = "_ebtn_" + i;
                    var dlgid = "";

                    if (Global.NEWMAP) {
                        dlgid = content[i].properties[SHORTNAME];
                        dlgstr = "<div class='POI'>";
                        dlgstr += "<div class='POITitle'>" + content[i].properties[SHORTNAME] + "</div>";
                        dlgstr += "<div class='POIContain'>";
                        dlgstr += "<div class='POIText'>";
                        dlgstr += "<span style='POISpan'>地址：" + content[i].properties[ADDRESS] + "</span>";
                        dlgstr += "<span style='POISpan'>电话：" + ((content[i].properties[TELEPHONE] == "") ? "暂无" : content[i].properties[TELEPHONE]) + "</span>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='POIImage'>";
                        if (imgcol[i][addcode].length != 0) {
                            dlgstr += "<img src='" + imgcol[i][addcode][0] + "' " + " alt='" + imgcol[i][addcode].join(",") + "' onclick='ExploreImage(this.alt);' />"

                        } else {
                            dlgstr += "<img src='IMG/common/nopic.jpg' />";
                        }
                        dlgstr += "</div>";
                        dlgstr += "</div>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='POITool'>";
                        dlgstr += "<a href='javascript:void(0);' style='margin-left:20px;'>周边搜索</a>";
                        dlgstr += "<a href='javascript:void(0);'>从这出发</a>";
                        dlgstr += "<a href='javascript:void(0);'>到这里去</a>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='POIBuffer'>";
                        dlgstr += "<div class='POIBufferKeys'>";
                        for (var j = 0; j < Global.bufferwords.length; j++) {
                            dlgstr += "<a href='javascript:void(0);'>" + Global.bufferwords[j] + "</a>";
                        }
                        dlgstr += "<input type='text' id='" + iptid + "' style='width:60px;height:16px;margin:1px 1px 1px 1px;border:solid 1px #82B9B4;' />";
                        dlgstr += "<input type='button' id='" + btnid + "' value='搜索' style='width:40px;height:20px;margin:0px 2px;padding:0px;border:solid 1px #82B9B4;display:inline-block;' />";
                        dlgstr += "<span style='color:#E78F08;width:14px;text-align:right;display:inline-block;margin:0px;padding:0px;' id='" + msgid + "'>2</span>公里";
                        dlgstr += "</div>";
                        dlgstr += "<div class='POIBufferBar' id='" + barid + "'>";
                        dlgstr += "</div>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='POISetStart'>";
                        dlgstr += "<span style='color:#333;font-size:12px;height:16px;width:70px;text-align:right;display:inline-block;margin:12px 0px;padding:0px;'>输入终点：</span>";
                        dlgstr += "<input type='text' id='" + siptid + "' style='display:inline-block;width:110px;height:16px;margin:11px 1px 11px 1px;border:solid 1px #82b9b4;' />";
                        dlgstr += "<input type='button' id='" + sbtnid + "' value='查询' style='width:40px;height:20px;margin:10px 13px 10px 3px;padding:0px;border:solid 1px #82B9B4;display:inline-block;' />";
                        dlgstr += "</div>";
                        dlgstr += "<div class='POISetEnd'>";
                        dlgstr += "<span style='color:#333;font-size:12px;height:16px;width:70px;text-align:right;display:inline-block;margin:12px 0px;padding:0px;'>输入起点：</span>";
                        dlgstr += "<input type='text' id='" + eiptid + "' style='display:inline-block;width:110px;height:16px;margin:11px 1px 11px 1px;border:solid 1px #82b9b4;' />";
                        dlgstr += "<input type='button' id='" + ebtnid + "' value='查询' style='width:40px;height:20px;margin:10px 13px 10px 3px;padding:0px;border:solid 1px #82B9B4;display:inline-block;' />";
                        dlgstr += "</div>";
                        dlgstr += "</div>";

                    } else {
                        dlgid = content[i][SHORTNAME];
                        dlgstr = "<div class='POI'>";
                        dlgstr += "<div class='POITitle'>" + content[i][SHORTNAME] + "</div>";
                        dlgstr += "<div class='POIContain'>";
                        dlgstr += "<div class='POIText'>";
                        dlgstr += "<span style='POISpan'>地址：" + content[i][ADDRESS] + "</span>";
                        dlgstr += "<span style='POISpan'>电话：" + ((content[i][TELEPHONE] == "") ? "暂无" : content[i][TELEPHONE]) + "</span>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='POIImage'>";
                        if (imgcol[i][addcode].length != 0) {
                            dlgstr += "<img src='" + imgcol[i][addcode][0] + "' " + " alt='" + imgcol[i][addcode].join(",") + "' onclick='ExploreImage(this.alt);' />"

                        } else {
                            dlgstr += "<img src='IMG/common/nopic.jpg' />";
                        }

                        dlgstr += "</div>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='POITool'>";
                        dlgstr += "<a href='javascript:void(0);' style='margin-left:20px;'>周边搜索</a>";
                        dlgstr += "<a href='javascript:void(0);'>从这出发</a>";
                        dlgstr += "<a href='javascript:void(0);'>到这里去</a>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='POIBuffer'>";
                        dlgstr += "<div class='POIBufferKeys'>";
                        for (var j = 0; j < Global.bufferwords.length; j++) {
                            dlgstr += "<a href='javascript:void(0);'>" + Global.bufferwords[j] + "</a>";
                        }
                        dlgstr += "<input type='text' id='" + iptid + "' style='width:60px;height:16px;margin:1px 1px 1px 1px;border:solid 1px #82B9B4;' />";
                        dlgstr += "<input type='button' id='" + btnid + "' value='搜索' style='width:40px;height:20px;margin:0px 2px;padding:0px;border:solid 1px #82B9B4;display:inline-block;' />";
                        dlgstr += "<span style='color:#E78F08;width:14px;text-align:right;display:inline-block;margin:0px;padding:0px;' id='" + msgid + "'>2</span>公里";
                        dlgstr += "</div>";
                        dlgstr += "<div class='POIBufferBar' id='" + barid + "'>";
                        dlgstr += "</div>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='POISetStart'>";
                        dlgstr += "<span style='color:#333;font-size:12px;height:16px;width:70px;text-align:right;display:inline-block;margin:12px 0px;padding:0px;'>输入终点：</span>";
                        dlgstr += "<input type='text' id='" + siptid + "' style='display:inline-block;width:110px;height:16px;margin:11px 1px 11px 1px;border:solid 1px #82b9b4;' />";
                        dlgstr += "<input type='button' id='" + sbtnid + "' value='查询' style='width:40px;height:20px;margin:10px 13px 10px 3px;padding:0px;border:solid 1px #82B9B4;display:inline-block;' />";
                        dlgstr += "</div>";
                        dlgstr += "<div class='POISetEnd'>";
                        dlgstr += "<span style='color:#333;font-size:12px;height:16px;width:70px;text-align:right;display:inline-block;margin:12px 0px;padding:0px;'>输入起点：</span>";
                        dlgstr += "<input type='text' id='" + eiptid + "' style='display:inline-block;width:110px;height:16px;margin:11px 1px 11px 1px;border:solid 1px #82b9b4;' />";
                        dlgstr += "<input type='button' id='" + ebtnid + "' value='查询' style='width:40px;height:20px;margin:10px 13px 10px 3px;padding:0px;border:solid 1px #82B9B4;display:inline-block;' />";
                        dlgstr += "</div>";
                        dlgstr += "</div>";
                    };
                    dlg = new NSZCSArrowDialog(null, latlng, null, dlgstr, true, function(e) { this.hide(); buffers.disposeFeatures(); });
                    marker.dialog = dlg;
                    marker.barid = barid;
                    marker.msgid = msgid;
                    marker.iptid = iptid;
                    marker.btnid = btnid;
                    marker.dlgid = dlgid;
                    marker.sbtnid = sbtnid;
                    marker.ebtnid = ebtnid;
                    marker.siptid = siptid;
                    marker.eiptid = eiptid;
                    marker.events.bind("mouseover", marker, function() { this.setURL(this.icon.url.replace("b_", "r_")); this.icon.imageDiv.style.zIndex = "5000"; });
                    marker.events.bind("mouseout", marker, function() { this.setURL(this.icon.url.replace("r_", "b_")); this.icon.imageDiv.style.zIndex = ""; });
                    marker.events.bind("click", marker, function() {
                        buffers.disposeFeatures();
                        Map.addDialog(this.dialog, true);
                        cDlg = this.dialog;
                        this.dialog.show();
                        jQuery(".POITool>a").click(function(e) {
                            var me = cDlg.mark;
                            switch (this.innerHTML) {
                                case "周边搜索":
                                    if (jQuery(this).attr("_init") == "true") {
                                        return;
                                    }
                                    jQuery(".POISetStart").css({ "display": "none" });
                                    jQuery(".POISetEnd").css({ "display": "none" });
                                    jQuery(".POIBuffer").css({ "display": "block" });
                                    jQuery(".POITool>a").attr("_init", false);
                                    cDlg.updateSize();
                                    cDlg.updatePosition();
                                    jQuery(this).attr("_init", true);

                                    jQuery("#" + me.barid).slider({
                                        min: 0,
                                        max: 6,
                                        step: 1,
                                        value: 2,
                                        range: "min",
                                        slide: function(event, ui) {
                                            jQuery("#" + me.msgid)[0].innerHTML = ui.value;
                                            _circleBuffer(me.latlng, ui.value);
                                        },
                                        change: function(event, ui) {
                                            _changeBuffer(me.latlng, ui.value);
                                        }
                                    });
                                    jQuery(".POIBufferKeys>a").click(function(e) {

                                        _buffer(this.innerText);

                                    });
                                    jQuery("#" + me.btnid).click(function(e) {

                                        _buffer(jQuery("#" + me.iptid).val());

                                    });
                                    _changeBuffer(me.latlng, 2);
                                    break;
                                case "从这出发":
                                    if (jQuery(this).attr("_init") == "true") {
                                        return;
                                    }
                                    buffers.disposeFeatures();
                                    jQuery(".POIBuffer").css({ "display": "none" });
                                    jQuery(".POISetEnd").css({ "display": "none" });
                                    jQuery(".POISetStart").css({ "display": "block" });
                                    jQuery(".POITool>a").attr("_init", false);
                                    cDlg.updateSize();
                                    cDlg.updatePosition();
                                    jQuery(this).attr("_init", true);
                                    jQuery("#" + me.sbtnid).click(function(e) {
                                        var val = jQuery("#" + me.siptid).val();
                                        jQuery("#" + me.siptid).val("");
                                        _setStart(me.latlng, me.dlgid, val);

                                    });
                                    break;
                                case "到这里去":

                                    if (jQuery(this).attr("_init") == "true") {
                                        return;
                                    }
                                    buffers.disposeFeatures();
                                    jQuery(".POIBuffer").css({ "display": "none" });
                                    jQuery(".POISetStart").css({ "display": "none" });
                                    jQuery(".POISetEnd").css({ "display": "block" });
                                    jQuery(".POITool>a").attr("_init", false);
                                    cDlg.updateSize();
                                    cDlg.updatePosition();
                                    jQuery(this).attr("_init", true);
                                    jQuery("#" + me.ebtnid).click(function(e) { 
                                        var val = jQuery("#" + me.eiptid).val();
                                        jQuery("#" + me.eiptid).val("");
                                        _setEnd(me.latlng, me.dlgid, val);
                                    });
                                    break;
                            }
                        });
                        Map.panTo(this.latlng);
                    });
                    markerList.push(marker);
                    item.marker = marker;
                    dlg.mark = marker;
                    contentList.appendChild(item);
                    pct.addComponent(new NGeometry.Point(latlng.lon, latlng.lat));

                }
                scrollPanel.update();
                if (pct.components.length > 1) {
                    var ext = pct.getBounds();
                    Map.zoomToExtent(ext);
                } else {
                    var point = pct.components[0];
                    Map.panTo(new NLatLng(point.x, point.y));
                }
                /*构建pagelist*/
                BuildPageList();
                break;
            case "busy":
                contentList.innerHTML = msg;
                break;

            case "fail":
                contentList.innerHTML = msg;
                break;
        }
    };

    /*返回对象，保存闭包的许多函数*/
    var retObj = {};
    retObj.Query = function() {
        content = null;
        imgcol = null;
        isAlive = true;
        QueryObject.page = page;
        if (_timer != null) {
            clearInterval(_timer);
            _timer = null;
        }
        if (querytype == "key") {
            lay.query(QueryObject);
        }
        else {
            lay.spatialQuery("bbox", QueryObject);
        }
        showResult("busy", Global.html.BUSY);
        markers.clearMarkers();
        buffers.disposeFeatures();
        for (var i = 0; i < markerList.length; i++) {
            markerList[i].dispose();
        }
        markerList = [];
        cDlg ? Map.removeDialog(cDlg) : null;
        /*查询之后，等待显示结果，如果时间太长则abort掉查询*/
        var _time = 0;
        _timer = setInterval(function() {
            _time++;
            if (content != null && imgcol != null) {
                /*函数返回了*/
                if (isAlive) {
                    clearInterval(_timer);
                    _timer = null;
                    isAlive = false;
                    showResult("success", "");
                }
            } else {
                if (_time >= Global.COUNT|| !isAlive) {
                    /*当前查询已经被抛弃了*/
                    isAlive = false;
                    showResult("fail", Global.html.TIMEOUT);
                    clearInterval(_timer);
                    _timer = null;
                }
            }
        }, Global.delay);
    };
    /*下一页*/
    retObj.next = function() {

        if (page < totalPage) {
            page++;
            retObj.Query();

        } else {
            console.log("当前已经是末页");

        }

    };
    /*上一页*/
    retObj.prev = function() {

        if (page > 1) {
            page--;
            retObj.Query();
        } else {

            console.log("当前已经是首页");

        }

    };
    /*跳到第p页*/
    retObj.go = function(p) {
        page = p;
        retObj.Query();
    };
    retObj.refresh = function() {
        retObj.Query();
    };
    retObj.abort = function() {
        anchor.onclick();
    };


    /*列表创建函数*/
    function BuildPageList() {
        /*最快捷的清空内容*/

        pageList = document.createElement("div");
        pageList.className = "QueryPageList";
        contentList.appendChild(pageList);

        pageList.innerHTML = "";
        if (totalPage == 0) {
            return;
        }
        var div = document.createElement("div");
        div.className = "PageList";

        var entity = document.createElement("a");
        entity.className = "QueryPageItem";
        entity.innerText = "首页";

        entity.onclick = function() {
            retObj.go(1);
        };
        div.appendChild(entity);
        /*首页部分完成*/

        /*页码的开始部分和结束部分，要判断是否小于0或者超过最大值*/

        var startNum;
        var endNum;
        if (totalPage >= 5) {
            if (page <= 3) {
                /*当前页码还是在1-3之间时，如果-2就变成负值了*/
                startNum = 1;
                endNum = 5;

            } else if (page >= totalPage - 2) {
                /*原理和上边类似*/
                endNum = totalPage;
                startNum = totalPage - 4;

            } else {
                /*这是最一般的情况*/
                startNum = page - 2;
                endNum = page + 2;
            }

        } else {
            /*页数不够5页，就把全部显示出来*/
            startNum = 1;
            endNum = totalPage;
        };
        for (var i = startNum; i <= endNum; i++) {
            entity = document.createElement("a");
            entity.className = "QueryPageItem";
            entity.innerText = i;
            if (i == page) {
                /*当前页面鼠标动作不反应，单击也不反应*/
                entity.style.backgroundColor = "rgb(161,201,200)";
            }
            else {
                var index = i;
                entity.onclick = function() {
                    /*这个部分闭包不好使，还没想出对策，直接用标签值代替*/
                    var index = parseInt(this.innerText);
                    retObj.go(index);
                };
            }
            div.appendChild(entity);
        };
        /*中间部分*/
        entity = document.createElement("a");
        entity.className = "QueryPageItem";
        entity.innerText = "末页";
        entity.onclick = function() {
            retObj.go(totalPage);

        };
        div.appendChild(entity);
        pageList.appendChild(div);

    };

    Global.handler["Query"] = retObj;
    /*从一个节点搜索下面的分类码*/
    /*从输入的分类文字描述确定是哪个节点*/
    function _selectNode(name) {
        /*广度优先搜索*/
        var nd = clsdt;
        var stack = [];
        for (var i = 0, len = nd.NODE.length; i < len; i++) {
            stack.push(nd.NODE[i]);
        }
        while (stack.length != 0) {
            var nd = stack.shift();
            if (nd.name == name) {
                return nd;
            } else {
                if (nd.leaf == "false") {
                    for (var i = 0; i < nd.NODE.length; i++) {
                        stack.push(nd.NODE[i]);
                    }
                }
            }
        }
        return null;
    };

    function _filter(node) {
        var str = "";
        for (var i in node) {
            if (node[i].leaf == "false") {
                str += _filter(node[i].NODE);
            }
            else if (node[i].leaf == "true") {
                str += node[i].Text + ",";
            }
        }
        return str;
    };

    function _classQuery(name) {
        var tmp = _selectNode(name);
        var nd = [tmp];
        if (tmp.leaf == "false") {
            nd = tmp.NODE;
            cNode = tmp;
        }
        var codes = _filter(nd);
        codes = (codes != "") ? codes.substr(0, codes.length - 1) : "";
        codes = codes.split(",");
        qstr = "(";
        for (var i = 0, len = codes.length; i < len; i++) {
            if (i != 0) {
                qstr += " OR ";
            }
            qstr += field + " LIKE " + codes[i];
            if (i >= 10) {
                break;
            }
        }
        qstr += ")";
        QueryObject.spatialQueryFilter = qstr;
        QueryObject.coords = Map.getBounds().toBBOX();
        totalPage = -1;
        msg.innerHTML = "正在搜索之中";
        retObj.go(1);
        /*建立下级分类列表*/
        if (cNode.leaf == "true") {
            return;
        };
        var doc = document;
        classifyContent.innerHTML = "";
        for (var i = 0, len = cNode.NODE.length; i < len; i++) {
            var a = doc.createElement("a");
            a.innerHTML = cNode.NODE[i].name;
            a.onclick = function() {
                _classQuery(this.innerText);
            };
            classifyContent.appendChild(a);
        }

    }
    _classQuery(classname);
};


/*路径分析*/
function NetworkQuery(sname,ename,div,prevDiv){
    var lay=Global.lays["地名地址"];
    var route=Global.lays["路径分析"];
    var keys=route.queryfields;/*在地名地址里边搜索的字段*/
    var displayfield=route.displayfields;/*显示起终点的字段，都在xml里配置*/
    var querytype="key";/*保留这个参数的原因是可以用来周边搜索*/
    var page = 1;
    var totalPage = -1;
    var maxfeatures = 10;
    var QueryObject = {};
    var container = document.getElementById(div);
	var prevDiv=document.getElementById(prevDiv);
	prevDiv.style.display="none";
	container.style.display="block";
    var contentList = null;
    var pageList = null;
    var content = null;
    var markerList = [];
    var Map = Global.map;
    var cDlg = null;
    var isAlive = false;
    var scrollPanel = null;
    var markers = Global.lays["POI图层"];
    var fealayer=Global.lays["Network图层"];
    /*先加入要素层后加注记层防止chrome下被遮盖*/
    fealayer.disposeFeatures();
    Map.addLayer(fealayer);
    markers.clearMarkers();
    Map.addLayer(markers);

    var networkResult = null;
    var parser = new NParser.GeoJSON();
    var _timer=null;
    var _outtimer=null;
    var sPoint=null;
    var ePoint=null;
    var ctype="start";
    var maxtolerance=Global.maxtolerance;

    if (Global.start != null) {
        sPoint = new NGeometry.Point(Global.start.x, Global.start.y);
    }
    if (Global.end != null) {
        ePoint = new NGeometry.Point(Global.end.x, Global.end.y);
    }


    var _getPosition = function(name) {
        /*将查询字段和关键词分段*/
        var nm = name.replace(/\s+/, "%");
        name = name.replace(/\s+/, "");
        keysa = keys.split(",");
        /*构造查询语句where=*,关键词分词还未实现，用一个查询语句对多个字段进行查询*/
        var str = "";
        for (var i = 0, j = keysa.length; i < j; i++) {
            if (i != 0) {
                str += " OR ";
            }
            str += keysa[i] + " LIKE ";
            str += "'%" + nm + "%'";
        };
        if (!Global.NEWMAP) {
            str += " ORDER BY LENGTH(" + keysa[0] + ")";
        }
        /*构造查询对象*/
        if (querytype == "key") {

            QueryObject = { "searchstring": str, "callback": callback, "page": page, "maxfeatures": maxfeatures };

        } else if (querytype = "buffer") {

            QueryObject = { "spatialQueryFilter": str, "callback": callback, "page": page, "maxfeatures": maxfeatures, "coords": Global.map.getBounds().toBBOX() };

        };

        /*清除以前的查询结果*/
        container.innerHTML = "";
        var totalContainer = document.createElement("div");
        totalContainer.className = "QueryContainer";
        totalContainer.id = "_con_" + Math.random();
        totalContainer.style.cssText = "display:block;width:" + container.clientWidth + "px;height:" + container.clientHeight + "px;";
        container.appendChild(totalContainer);
        var returnDiv = document.createElement("div");
        returnDiv.className = "QueryReturnDiv";
        var msg = document.createElement("span");
        if (ctype == "start") {
            msg.innerHTML = "正在搜索起点";

        } else {
            msg.innerHTML = "正在搜索终点";
        }

        returnDiv.appendChild(msg);
        var anchor = document.createElement("a");
        anchor.title = "点击返回主页面板";
        anchor.innerHTML = "返回首页";
        returnDiv.appendChild(anchor);
        /*清除一切状态，返回主界面*/
        anchor.onclick = function() {
            isAlive = false;
            if (_timer != null) {
                clearInterval(_timer);
                _timer = null;
            }
            if (_outtimer != null) {
                clearInterval(_outtimer);
                _outtimer = null;
            }
            markers.clearMarkers();
            fealayer.disposeFeatures();
            Map.removeLayer(markers);
            Map.removeLayer(fealayer);
            for (var i = 0; i < markerList.length; i++) {
                markerList[i].dispose();
            }
            markerList = [];
            cDlg ? Map.removeDialog(cDlg) : null;
            scrollPanel.dispose();
            scrollPanel = null;
            Global.start = null;
            Global.end = null;
            container.style.display = "none";
            prevDiv.style.display = "block";
            Global.handler["Query"] = null;
        };

        totalContainer.appendChild(returnDiv);
        contentList = document.createElement("div");
        contentList.className = "QueryContentList";
        totalContainer.appendChild(contentList);

        scrollPanel = new baidu.ui.ScrollPanel({ container: totalContainer.id, overflow: "overflow-y" });
        scrollPanel.render(totalContainer.id);

        function callback(res) {
            /*判断总页数有没有记录*/
            if (!isAlive) {
                return;
            };
            if (Global.NEWMAP) {
                if (totalPage == -1) {
                    totalPage = res.header.pages;
                }
                if (totalPage == 0) {
                    clearInterval(_timer);
                    _timer = null;
                    clearInterval(_outtimer);
                    _outtimer = null;
                    isAlive = false;
                    showResult("fail", Global.html.NODATA);
                }
                content = res.content.features;
            } else {
                if (totalPage == -1) {
                    totalPage = res.total;
                }
                if (totalPage == 0) {
                    clearInterval(_timer);
                    _timer = null;
                    clearInterval(_outtimer);
                    _outtimer = null;
                    isAlive = false;
                    showResult("fail", Global.html.NODATA);
                }
                content = res.content;
            };
            if (totalPage == 0) {
                /*没有找到相关点,就退出*/
                return;
            };
            /*先进行一步筛选,用数据库的结果是按照相关度排序的，所以名称相同的肯定在第一页*/
            if (Global.NEWMAP) {
                for (var i = 0, len = content.length; i < len; i++) {
                    if (content[i].properties[lay.displayfields] == name) {
                        /*查到一致的名称*/
                        if (ctype == "start") {
                            sPoint = new NGeometry.Point(content[i].geometry.coordinates[0], content[i].geometry.coordinates[1]);
                            Global.start = { "x": sPoint.x, "y": sPoint.y, "name": name, "sure": true };
                        } else {
                            ePoint = new NGeometry.Point(content[i].geometry.coordinates[0], content[i].geometry.coordinates[1]);
                            Global.end = Global.start = { "x": ePoint.x, "y": ePoint.y, "name": name, "sure": true };
                        }
                        isAlive = false;
                        clearInterval(_timer);
                        _timer = null;
                        scrollPanel.dispose();
                        scrollPanel = null;
                        break;
                    };
                }
            } else {
                for (var i = 0, len = content.length; i < len; i++) {
                    if (content[i][lay.displayfields] == name) {
                        /*查到一致的名称*/
                        if (ctype == "start") {
                            sPoint = new NGeometry.Point(parseFloat(content[i]["LONGITUDE"]), parseFloat(content[i]["LATITUDE"]));
                            Global.start = { "x": sPoint.x, "y": sPoint.y, "name": name, "sure": true };
                        } else {
                            ePoint = new NGeometry.Point(parseFloat(content[i]["LONGITUDE"]), parseFloat(content[i]["LATITUDE"]));
                            Global.end = { "x": sPoint.x, "y": sPoint.y, "name": name, "sure": true };
                        }
                        isAlive = false;
                        clearInterval(_timer);
                        _timer = null;
                        scrollPanel.dispose();
                        scrollPanel = null;
                        break;
                        /*滚动条需要dispose掉*/
                    };
                }
            }
            if (ctype == "start") {

                msg.innerHTML = "搜索到起点" + totalPage + "页";

            } else {

                msg.innerHTML = "搜索到终点" + totalPage + "页";

            }
        };

        function showResult(type, msg) {
            switch (type) {
                case "success":
                    contentList.innerHTML = "";
                    var displayArray = displayfield.split(",");
                    for (var i = 0; i < markerList.length; i++) {
                        markerList[i].dispose();
                    }
                    markerList = [];
                    var pct = new NGeometry.MultiPoint();
                    for (var i = 0, len = content.length; i < len; i++) {
                        var item = document.createElement("div");
                        item.className = "NetworkContentListItem";
                        /*添加图片标头*/
                        var img = document.createElement("img");
                        img.className = "NetworkContentListTitle";
                        img.src = "IMG/list/b_" + (i + 1) + ".png";
                        item.appendChild(img);
                        /*添加文字信息*/
                        var div = document.createElement("div");
                        div.className = "NetworkContentListText";
                        var span = null;
                        for (var j = 0; j < displayArray.length; j++) {
                            span = document.createElement("span");
                            if (Global.NEWMAP) {
                                span.innerText = content[i].properties[displayArray[j]];
                            } else {
                                span.innerText = content[i][displayArray[j]];
                            }
                            div.appendChild(span);
                        }
                        item.appendChild(div);
                        /*添加兴趣点图片*/
                        img = document.createElement("div");
                        img.className = "NetworkContentListIMG";
                        if (ctype == "start") {
                            img.innerText = "设为起点";
                        } else {
                            img.innerText = "设为终点";
                        }
                        img.val = i;
                        img.onmouseover = function() {

                            this.className = "NetworkContentListIMGActive";
                        }
                        img.onmouseout = function() {

                            this.className = "NetworkContentListIMG";
                        }
                        img.onclick = function(evt) {
                            evt = evt || window.Event;
                            NEvent.stop(evt);
                            var fea = content[parseInt(this.val)];
                            var x;
                            var y;
                            var name;
                            if (Global.NEWMAP) {
                                x = fea.geometry.coordinates[0];
                                y = fea.geometry.coordinates[1];
                                name = fea.properties[displayfield];
                            } else {
                                x = fea["LONGITUDE"];
                                y = fea["LATITUDE"];
                                name = fea[displayfield];
                            }
                            /*这里调用就可以省去用timer延迟执行*/
                            /*为之后的拖曳准备*/
                            if (ctype == "start") {
                                sPoint = new NGeometry.Point(x, y);
                                Global.start = { "x": x, "y": y, "name": name, "sure": true };
                            } else {
                                ePoint = new NGeometry.Point(x, y);
                                Global.end = { "x": x, "y": y, "name": name, "sure": true };
                            };
                            scrollPanel.dispose();
                            scrollPanel = null;
                        };
                        item.appendChild(img);

                        item.onmouseover = function() {
                            this.className = "NetworkContentListItemActive";
                            this.marker.events.triggerEvent("mouseover");
                        };
                        item.onmouseout = function() {
                            this.className = "NetworkContentListItem";
                            this.marker.events.triggerEvent("mouseout");
                        };
                        item.onclick = function() {
                            this.marker.events.triggerEvent("click");
                        };
                        var ico = new NIcon("IMG/list/b_" + (i + 1) + ".png", new NSize(28, 43), new NPixel(-14, -36));
                        var latlng = null;
                        if (Global.NEWMAP) {
                            latlng = new NLatLng(parseFloat(content[i].geometry.coordinates[0]), parseFloat(content[i].geometry.coordinates[1]));
                        } else {
                            latlng = new NLatLng(parseFloat(content[i]["LONGITUDE"]), parseFloat(content[i]["LATITUDE"]));
                        }
                        var marker = new NMarker(latlng, ico);
                        markers.addMarker(marker);

                        marker.events.bind("mouseover", marker, function() { this.setURL(this.icon.url.replace("b_", "r_")); this.icon.imageDiv.style.zIndex = "5000"; });
                        marker.events.bind("mouseout", marker, function() { this.setURL(this.icon.url.replace("r_", "b_")); this.icon.imageDiv.style.zIndex = ""; });
                        marker.events.bind("click", marker, function() { Map.panTo(this.latlng); });

                        markerList.push(marker);
                        item.marker = marker;
                        contentList.appendChild(item);
                        pct.addComponent(new NGeometry.Point(latlng.lon, latlng.lat));
                    }
                    scrollPanel.update();
                    if (pct.components.length > 1) {
                        var ext = pct.getBounds();
                        Map.zoomToExtent(ext);
                    } else {
                        var point = pct.components[0];
                        Map.panTo(new NLatLng(point.x, point.y));
                    }
                    /*构建pagelist*/
                    BuildPageList();
                    break;
                case "busy":
                    contentList.innerHTML = msg;
                    break;
                case "fail":
                    contentList.innerHTML = msg;
                    break;
            }
        };

        /*返回对象，保存闭包的许多函数*/
        var retObj = {};
        retObj.Query = function() {
            content = null;
            isAlive = true;
            if (_timer != null) {
                clearInterval(_timer);
                _timer = null;
            }
            QueryObject.page = page;
            if (querytype == "key") {
                lay.query(QueryObject);
            }
            else {
                lay.spatialQuery("bbox", QueryObject);
            }
            showResult("busy", Global.html.BUSY);
            markers.clearMarkers();
            for (var i = 0; i < markerList.length; i++) {
                markerList[i].dispose();
            }
            markerList = [];
            cDlg ? Map.removeDialog(cDlg) : null;
            /*查询之后，等待显示结果，如果时间太长则abort掉查询*/
            var _time = 0;
            _timer = setInterval(function() {
                _time++;
                if (content != null) {
                    /*函数返回了*/
                    clearInterval(_timer);
                    _timer = null;
                    isAlive = false;
                    if ((ctype == "start" && sPoint != null) || (ctype == "end" && ePoint != null)) {
                        /*do nothing*/
                    } else {
                        showResult("success", "");
                    }
                } else {
                    if (_time >= Global.COUNT) {
                        /*当前查询已经被抛弃了*/
                        clearInterval(_timer);
                        clearInterval(_outtimer);
                        _timer = null;
                        _couttimer = null;
                        isAlive = false;
                        showResult("fail", Global.html.TIMEOUT);
                    }
                }
            }, Global.delay);
        };
        /*下一页*/
        retObj.next = function() {
            if (page < totalPage) {
                page++;
                retObj.Query();
            } else {
                if (Global.debug) {
                    console.log("当前已经是末页");
                }
            }
        };
        /*上一页*/
        retObj.prev = function() {
            if (page > 1) {
                page--;
                retObj.Query();
            } else {
                if (Global.debug) {
                    console.log("当前已经是首页");
                }
            }
        };
        /*跳到第p页*/
        retObj.go = function(p) {

            page = p;
            retObj.Query();

        };
        retObj.refresh = function() {
            retObj.Query();
        };
        retObj.abort = function() {
            anchor.onclick();
        };

        /*列表创建函数*/
        function BuildPageList() {
            /*最快捷的清空内容*/
            pageList = document.createElement("div");
            pageList.className = "QueryPageList";
            contentList.appendChild(pageList);

            pageList.innerHTML = "";
            if (totalPage == 0) {
                return;
            }
            var div = document.createElement("div");
            div.className = "PageList";

            var entity = document.createElement("a");
            entity.className = "QueryPageItem";
            entity.innerText = "首页";

            entity.onclick = function() {
                retObj.go(1);
            };
            div.appendChild(entity);
            /*首页部分完成*/

            /*页码的开始部分和结束部分，要判断是否小于0或者超过最大值*/

            var startNum;
            var endNum;
            if (totalPage >= 5) {
                if (page <= 3) {
                    /*当前页码还是在1-3之间时，如果-2就变成负值了*/
                    startNum = 1;
                    endNum = 5;

                } else if (page >= totalPage - 2) {
                    /*原理和上边类似*/
                    endNum = totalPage;
                    startNum = totalPage - 4;

                } else {
                    /*这是最一般的情况*/
                    startNum = page - 2;
                    endNum = page + 2;
                }

            } else {
                /*页数不够5页，就把全部显示出来*/
                startNum = 1;
                endNum = totalPage;
            };
            for (var i = startNum; i <= endNum; i++) {
                entity = document.createElement("a");
                entity.className = "QueryPageItem";
                entity.innerText = i;
                if (i == page) {
                    /*当前页面鼠标动作不反应，单击也不反应*/
                    entity.style.backgroundColor = "rgb(161,201,200)";
                }
                else {
                    var index = i;
                    entity.onclick = function() {
                        /*这个部分闭包不好使，还没想出对策，直接用标签值代替*/
                        var index = parseInt(this.innerText);
                        retObj.go(index);
                    };
                }
                div.appendChild(entity);
            };
            /*中间部分*/
            entity = document.createElement("a");
            entity.className = "QueryPageItem";
            entity.innerText = "末页";
            entity.onclick = function() {
                retObj.go(totalPage);

            };
            div.appendChild(entity);
            pageList.appendChild(div);

        };
        Global.handler["Query"] = retObj;
        retObj.go(1);
    };


    var _getNetwork = function() {
        /*清除以前的查询结果*/
        Global.handler["Query"] = null;
        container.innerHTML = "";
        var totalContainer = document.createElement("div");
        totalContainer.className = "QueryContainer";
        totalContainer.id = "_con_" + Math.random();
        totalContainer.style.cssText = "display:block;width:" + container.clientWidth + "px;height:" + container.clientHeight + "px;";
        container.appendChild(totalContainer);
        var returnDiv = document.createElement("div");
        returnDiv.className = "QueryReturnDiv";
        var msg = document.createElement("span");
        msg.innerHTML = "正在搜索路径";

        returnDiv.appendChild(msg);
        var anchor = document.createElement("a");
        anchor.title = "返回主页面板";
        anchor.innerHTML = "返回首页";
        returnDiv.appendChild(anchor);

        anchor.onclick = function() {
            isAlive = false;
            markers.clearMarkers();
            fealayer.disposeFeatures();
            Map.removeLayer(markers);
            Map.removeLayer(fealayer);
            for (var i = 0; i < markerList.length; i++) {
                markerList[i].dispose();
            };
            scrollPanel.dispose();
            scrollPanel = null;
            container.style.display = "none";
            prevDiv.style.display = "block";
            Global.start = null;
            Global.end = null;
            Global.handler["Query"] = null;
        };
        totalContainer.appendChild(returnDiv);
        contentList = document.createElement("div");
        contentList.className = "QueryContentList";
        totalContainer.appendChild(contentList);
        scrollPanel = new baidu.ui.ScrollPanel({ container: totalContainer.id, overflow: "overflow-y" });
        scrollPanel.render(totalContainer.id);

        /*本来是想弄道格拉斯普克的简化方法，现在变成了将线段分组的函数*/
        function _peucker(res) {
            res = parser.read(res);
            var ccode = null;
            var cname = null;
            var feas = [];
            var fea = null;
            var cfea = null;

            for (var i = 0, len = res.length; i < len; i++) {
                fea = res[i];
                if (i == 0) {
                    cname = fea.attributes["NAME"].trim();
                    ccode = fea.attributes["CODE"].trim();
                    cfea = new NGeometry.LineString();
                    cfea.addComponents(fea.geometry.components);
                } else {
                    if (cname != fea.attributes["NAME"].trim() || ccode != fea.attributes["CODE"].trim()) {
                        cname = (cname == "") ? "未知路" : cname;
                        cfea = new NVectorFeature(cfea, { "NAME": cname, "CODE": ccode }, Global.Symbol["Network"]);
                        feas.push(cfea);

                        cfea = new NGeometry.LineString();
                        cfea.addComponents(fea.geometry.components);
                        cname = fea.attributes["NAME"].trim();
                        ccode = fea.attributes["CODE"].trim();

                    } else {
                        var a = fea.geometry.components[0];
                        var b = fea.geometry.components[fea.geometry.components.length - 1];
                        var c = cfea.components[0];
                        var d = cfea.components[cfea.components.length - 1];

                        var tt = Math.pow((a.x - c.x), 2) + Math.pow((a.y - c.y), 2);
                        var tw = Math.pow((a.x - d.x), 2) + Math.pow((a.y - d.y), 2);
                        var wt = Math.pow((b.x - c.x), 2) + Math.pow((b.y - c.y), 2);
                        var ww = Math.pow((b.x - d.x), 2) + Math.pow((b.y - d.y), 2);

                        var min = Math.min(tt, tw, wt, ww);
                        if (min == tt) {
                            /*说明第一个方向反了*/
                            cfea.components = cfea.components.reverse();
                            cfea.addComponents(fea.geometry.components);

                        } else if (min == tw) {
                            /*正常顺序*/
                            cfea.addComponents(fea.geometry.components);

                        } else if (min == wt) {
                            /*第二个应该在第一个之前,且反置*/
                            cfea.components = fea.geometry.components.concat(cfea.components).reverse();

                        } else if (min == ww) {

                            cfea.components = cfea.components.concat(fea.geometry.components.reverse());
                        }

                    }
                };
                if (i == len - 1) {
                    cname = (cname == "") ? "未知路" : cname;
                    cfea = new NVectorFeature(cfea, { "NAME": cname, "CODE": ccode }, Global.Symbol["Network"]);
                    feas.push(cfea);
                }
            }
            return feas;
        };

        function _callback(res) {
            msg.innerHTML = "路径搜索结果";
            if (typeof res == "string") {
                showResult("fail", res);
            } else {
                networkResult = _peucker(res);
            }
        };
        function showResult(type, msg) {
            switch (type) {
                case "success":
                    var ico = new NIcon("IMG/common/s.png", new NSize(23, 35), new NPixel(-12, -35));
                    var latlng = new NLatLng(sPoint.x, sPoint.y);
                    var mark = new NMarker(latlng, ico);
                    markers.addMarker(mark);
                    markerList.push(mark);
                    jQuery("#" + mark.icon.imageDiv.id).draggable(
                        {
                            cursor: "pointer",
                            start: function(event, ui) { event.stopPropagation(); Map.tools[0].disable(); },
                            stop: function(event, ui) {
                                event.stopPropagation();
                                /*获取屏幕坐标*/
                                var x = ui.position.left + 12;
                                var y = ui.position.top + 35;
                                var latlng = Map.pixelToWorld(new NPixel(x, y));
                                Map.tools[0].enable();
                                Global.start = { "x": latlng.lon, "y": latlng.lat, "name": "", "sure": false };
                                markers.clearMarkers();
                                fealayer.disposeFeatures();
                                for (var i = 0; i < markerList.length; i++) {
                                    markerList[i].dispose();
                                }
                                markerList = [];
                                Map.removeLayer(markers);
                                Map.removeLayer(fealayer);
                                scrollPanel.dispose();
                                scrollPanel = null;
                                container.innerHTML = "";
                                Global.handler["Query"] = null;
                                NetworkQueryOnLatlng(0.0002, "keyPanel", "facePanel");
                            }
                        }
                    );
                    ico = new NIcon("IMG/common/e.png", new NSize(23, 35), new NPixel(-12, -35));
                    latlng = new NLatLng(ePoint.x, ePoint.y);
                    mark = new NMarker(latlng, ico);
                    markers.addMarker(mark);
                    markerList.push(mark);
                    jQuery("#" + mark.icon.imageDiv.id).draggable(
                        {
                            cursor: "pointer",
                            start: function(event, ui) { event.stopPropagation(); Map.tools[0].disable(); },
                            stop: function(event, ui) {
                                event.stopPropagation();
                                /*获取屏幕坐标*/
                                var x = ui.position.left + 12;
                                var y = ui.position.top + 35;
                                var latlng = Map.pixelToWorld(new NPixel(x, y));
                                Map.tools[0].enable();
                                Global.end = { "x": latlng.lon, "y": latlng.lat, "name": "", "sure": false };
                                markers.clearMarkers();
                                fealayer.disposeFeatures();
                                for (var i = 0; i < markerList.length; i++) {
                                    markerList[i].dispose();
                                }
                                markerList = [];
                                Map.removeLayer(markers);
                                Map.removeLayer(fealayer);
                                scrollPanel.dispose();
                                scrollPanel = null;
                                container.innerHTML = "";
                                Global.handler["Query"] = null;
                                NetworkQueryOnLatlng(0.0002, "keyPanel", "facePanel");
                            }
                        }
                    );
                    contentList.innerHTML = "";

                    var div = document.createElement("div");
                    div.className = "NetworkResultListItem";
                    var img = document.createElement("div");
                    img.className = "NetworkResultListItemIMGF";
                    div.appendChild(img);
                    var span = document.createElement("span");
                    span.className = "NetworkResultListItemSpan";
                    span.innerHTML = Global.start.name;
                    div.appendChild(span);
                    contentList.appendChild(div);
                    for (var i = 0, len = networkResult.length; i < len; i++) {

                        var div = document.createElement("div");
                        div.className = "NetworkResultListItem";
                        var img = document.createElement("div");
                        img.className = "NetworkResultListItemIMG";
                        div.appendChild(img);
                        var span = document.createElement("span");
                        span.className = "NetworkResultListItemSpan";
                        span.innerHTML = networkResult[i].attributes["NAME"];
                        var lspan=document.createElement("span");
                        lspan.className="NetworkResultListItemLength";
                        lspan.innerHTML="约"+(networkResult[i].geometry.getLength()*NINCHES_PER_UNIT["dd"]/NINCHES_PER_UNIT["km"]).toFixed(2)+"千米";
                        span.appendChild(lspan)
                        div.appendChild(span);
                        div.val = i;
                        div.onmouseover = function() {
                            this.className = "NetworkResultListItemActive";
                            var fea = networkResult[parseInt(this.val)];
                            fea.symbol = Global.Symbol["NetworkActivate"];
                            fealayer.redraw();

                        };
                        div.onmouseout = function() {
                            this.className = "NetworkResultListItem";
                            var fea = networkResult[parseInt(this.val)];
                            fea.symbol = Global.Symbol["Network"];
                            fealayer.redraw();
                        };
                        div.onclick = function() {
                            var fea = networkResult[parseInt(this.val)];
                            var ext = fea.geometry.getBounds();
                            Map.zoomToExtent(ext);
                        };
                        contentList.appendChild(div);
                    };
                    /*构建结束点*/
                    var div = document.createElement("div");
                    div.className = "NetworkResultListItem";
                    var img = document.createElement("div");
                    img.className = "NetworkResultListItemIMGL";
                    div.appendChild(img);
                    var span = document.createElement("span");
                    span.className = "NetworkResultListItemSpan";
                    span.innerHTML = Global.end.name;
                    div.appendChild(span);
                    contentList.appendChild(div);
                    fealayer.addFeatures(networkResult);
                    var ext = fealayer.getLayerExtent();
                    Map.zoomToExtent(ext);
                    /*滚动条更新*/
                    scrollPanel.update();

                    for (var i = 1; i < networkResult.length - 1; i++) {
                        var pt = networkResult[i].geometry.components[0];
                        var latlng = new NLatLng(pt.x, pt.y);
                        var ico = new NIcon("IMG/common/carswitch.png", new NSize(23, 29), new NPixel(0, -29));
                        var mark = new NMarker(latlng, ico);
                        markers.addMarker(mark);
                        markerList.push(mark);

                        pt = networkResult[i].geometry.components[networkResult[i].geometry.components.length - 1];
                        latlng = new NLatLng(pt.x, pt.y);
                        ico = new NIcon("IMG/common/carswitch.png", new NSize(23, 29), new NPixel(0, -29));
                        mark = new NMarker(latlng, ico);
                        markers.addMarker(mark);
                        markerList.push(mark);
                    }
                    break;
                case "busy":
                    contentList.innerHTML = msg;
                    break;
                case "fail":
                    contentList.innerHTML = msg;
                    break;
            }
        };

        //保存闭包函数
        var retObj = {};
        retObj.Query = function() {
            var feas = [new NVectorFeature(ePoint), new NVectorFeature(sPoint)];
            var str = parser.write(feas);
            markers.clearMarkers();
            for (var i = 0; i < markerList.length; i++) {
                markerList[i].dispose();
            }
            markerList = [];
            fealayer.disposeFeatures();
            var NetworkObject = { "searchstring": str, "maxtolerance": maxtolerance, "callback": _callback };
            showResult("busy", Global.html.BUSY);

            route.query(NetworkObject);
            if (_timer != null) {
                clearInterval(_timer);
                _timer = null;
            }

            var _time = 0;
            isAlive = true;

            _timer = setInterval(function() {
                if (networkResult != null && isAlive) {
                    clearInterval(_timer);
                    _timer = null;
                    _time = 0;
                    isAlive = false;
                    showResult("success", "");
                } else {
                    _time++;
                    if (_time >= Global.COUNT || !isAlive) {
                        showResult("fail", Global.html.TIMEOUT);
                        clearInterval(_timer);
                        _timer = null;
                        _time = 0;
                        isAlive = false;
                    }
                }
            }, Global.delay);
        };
        retObj.refresh = function() {
            retObj.Query();
        };
        retObj.abort = function() {
            anchor.onclick();
        };
        Global.handler["Query"] = retObj;
        retObj.Query();

    };
	
	
	/*这里不能进行延迟判断，因为当用户选择起终点的时候，这个时间段是不可预测的*/
    console.log(sPoint,ePoint);
    if (sPoint == null) {
        _getPosition(sname);
    }
    _outtimer = setInterval(function() {
        if (sPoint != null) {
            clearInterval(_outtimer);
            _outtimer = null;
            ctype = "end";
            if (ePoint == null) {
                _getPosition(ename);
            }
            _outtimer = setInterval(function() {
                if (ePoint != null) {
                    clearInterval(_outtimer);
                    _outtimer = null;
                    _getNetwork();
                }
            }, Global.delay);
        }
    }, Global.delay); 
};


/*路径分析*/
function NetworkQueryOnLatlng(range,div,prevDiv){
    var sPoint=Global.start;
    var ePoint=Global.end;
    var lay=Global.lays["地名地址"];
    var route=Global.lays["路径分析"];
    var keys=route.queryfields;
    var displayfield=route.displayfields;
    var totalpage=-1;
    var maxfeatures=200;
    var QueryObject = {};
    var container = document.getElementById(div);
	var prevDiv=document.getElementById(prevDiv);
    var contentList = null;
    var pageList = null;
    var content = null;
    var markerList = [];
    var Map = Global.map;
    var isAlive = false;
    var markers = Global.lays["POI图层"];
    var fealayer=Global.lays["Network图层"];
    var scrollPanel = null;

    fealayer.disposeFeatures();
    Map.addLayer(fealayer);
    markers.clearMarkers();
    Map.addLayer(markers);
    var _timer=null;
    var _outtimer=null;
    var ctype="start";
    var maxtolerance=Global.maxtolerance;
	var networkResult=null;
	var parser = new NParser.GeoJSON();
	
	if(sPoint!=null){
		var ico = new NIcon("IMG/common/s.png", new NSize(23, 35), new NPixel(-12, -35));
		var latlng=new NLatLng(sPoint.x,sPoint.y);
		var mark=new NMarker(latlng,ico);    
		markers.addMarker(mark);
		markerList.push(mark);
	}
	if(ePoint!=null){
		var ico = new NIcon("IMG/common/e.png", new NSize(23, 35), new NPixel(-12, -35));
		var latlng=new NLatLng(ePoint.x,ePoint.y);
		var mark=new NMarker(latlng,ico);    
		markers.addMarker(mark);
		markerList.push(mark);
	}
    if(sPoint==null||ePoint==null){
        /*起始点如果有一个没有，返回*/
        return;
    }
    prevDiv.style.display = "none";
    container.style.display = "block";

    var _getPosition = function(pt) {
        /*将查询字段和关键词分段*/
        QueryObject = { "spatialQueryFilter": "SHORTNAME LIKE '%'", "callback": callback, "coords": pt.x + "," + pt.y, "buffer": range, "maxfeatures": maxfeatures };

        /*清除以前的查询结果*/
        container.innerHTML = "";
        var totalContainer = document.createElement("div");
        totalContainer.className = "QueryContainer";
        totalContainer.id = "_con_" + Math.random();
        totalContainer.style.cssText = "display:block;width:" + container.clientWidth + "px;height:" + container.clientHeight + "px;";
        container.appendChild(totalContainer);
        var returnDiv = document.createElement("div");
        returnDiv.className = "QueryReturnDiv";
        var msg = document.createElement("span");
        if (ctype == "start") {
            msg.innerHTML = "正在搜索起点";
        } else {
            msg.innerHTML = "正在搜索终点";
        }
        returnDiv.appendChild(msg);
        var anchor = document.createElement("a");
        anchor.title = "点击返回主页面板";
        anchor.innerHTML = "返回首页";
        returnDiv.appendChild(anchor);
        anchor.onclick = function() {
            isAlive = false;
            clearInterval(_outtimer);
            clearInterval(_timer);
            markers.clearMarkers();
            for (var i = 0; i < markerList.length; i++) {
                markerList[i].dispose();
            }
            fealayer.disposeFeatures();
            Map.removeLayer(markers);
            Map.removeLayer(fealayer);
            scrollPanel.dispose();
            scrollPanel = null;
            container.style.display = "none";
            prevDiv.style.display = "block";
            Global.handler["Query"] = null;
        };

        totalContainer.appendChild(returnDiv);
        contentList = document.createElement("div");
        contentList.className = "QueryContentList";
        totalContainer.appendChild(contentList);

        scrollPanel = new baidu.ui.ScrollPanel({ container: totalContainer.id, overflow: "overflow-y" });
        scrollPanel.render(totalContainer.id);

        function callback(res) {
            /*判断总页数有没有记录*/
            if (!isAlive) {
                return;
            }
            if (Global.NEWMAP) {
                content = res.content.features;
                if (totalPage == -1) {
                    totalPage = res.header.pages;
                }
            } else {
                content = res.content;
                if (totalPage == -1) {
                    totalPage = res.total;
                }
            }
            if (totalPage == 0) {
                if (ctype == "start") {
                    sPoint = new NGeometry.Point(Global.start.x, Global.start.y);
                    Global.start = { "x": sPoint.x, "y": sPoint.y, "name": "未知地点", "sure": true };

                } else {
                    ePoint = new NGeometry.Point(Global.end.x, Global.end.y);
                    Global.end = { "x": ePoint.x, "y": ePoint.y, "name": "未知地点", "sure": true };
                }
                scrollPanel.dispose();
                return;
            }
            /*先进行一步筛选,查找最近的点*/
            if (Global.NEWMAP) {
                var len = Math.pow(content[0].geometry.coordinates[0] - pt.x, 2) + Math.pow(content[0].geometry.coordinates[1] - pt.y, 2);
                var min = 0;
                for (var i = 1; i < content.length; i++) {
                    var fea = content[i].geometry.coordinates;
                    var dis = Math.pow(fea[0] - pt.x, 2) + Math.pow(fea[1] - pt.y, 2);
                    if (dis < len) {
                        min = i;
                        len = dis;
                    }
                }
                if (ctype == "start") {
                    sPoint = new NGeometry.Point(content[min].geometry.coordinates[0], content[min].geometry.coordinates[1]);
                    Global.start = { "x": sPoint.x, "y": sPoint.y, "name": content[min].properties[displayfield], "sure": true };

                } else {
                    ePoint = new NGeometry.Point(content[min].geometry.coordinates[0], content[min].geometry.coordinates[1]);
                    Global.end = { "x": ePoint.x, "y": ePoint.y, "name": content[min].properties[displayfield], "sure": true };
                }
                scrollPanel.dispose();
            } else {
                var len = Math.pow(parseInt(content[0]["LONGITUDE"]) - pt.x, 2) + Math.pow(parseInt(content[0]["LATITUDE"]) - pt.y, 2);
                var min = 0;
                for (var i = 1; i < content.length; i++) {
                    var x = parseFloat(content[i]["LONGITUDE"]);
                    var y = parseFloat(content[i]["LATITUDE"]);
                    var dis = Math.pow(x - pt.x, 2) + Math.pow(y - pt.y, 2);
                    if (dis < len) {
                        min = i;
                        len = dis;
                    }
                }
                if (ctype == "start") {
                    sPoint = new NGeometry.Point(parseFloat(content[min]["LONGITUDE"]), parseFloat(content[min]["LATITUDE"]));
                    Global.start = { "x": sPoint.x, "y": sPoint.y, "name": content[min][displayfield], "sure": true };
                } else {
                    ePoint = new NGeometry.Point(parseFloat(content[min]["LONGITUDE"]), parseFloat(content[min]["LATITUDE"]));
                    Global.end = { "x": ePoint.x, "y": ePoint.y, "name": content[min][displayfield], "sure": true };
                }
                scrollPanel.dispose();
            }
        };

        function showResult(type, msg) {
            switch (type) {
                case "busy":
                    contentList.innerHTML = msg;
                    break;
                case "fail":
                    contentList.innerHTML = msg;
                    break;
            }
        };
        /*返回对象，保存闭包的许多函数*/
        var retObj = {};
        retObj.Query = function() {
            content = null;
            isAlive = true;
            totalPage = -1;
            if (_timer != null) {
                clearInterval(_timer);
                _timer = null;
            }
            if (ctype == "start") {
                msg.innerHTML = "正在搜索起点";
            }
            else if (ctype == "end") {
                msg.innerHTML = "正在搜索终点";
            }

            lay.spatialQuery("point", QueryObject);
            showResult("busy", Global.html.BUSY);
            markers.clearMarkers();
            for (var i = 0; i < markerList.length; i++) {
                markerList[i].dispose();
            }
            markerList = [];
            /*查询之后，等待显示结果，如果时间太长则abort掉查询*/
            var _time = 0;
            _timer = setInterval(function() {
                _time++;
                if (content != null) {
                    /*函数返回了*/
                    if (isAlive) {
                        clearInterval(_timer);
                        _timer = null;
                        isAlive = false;
                    }
                } else {
                    if (_time >= Global.COUNT|| !isAlive) {
                        /*当前查询已经被抛弃了*/
                        isAlive = false;
                        showResult("fail", Global.html.TIMEOUT);
                        clearInterval(_timer);
                        clearInterval(_outtimer);
                        _timer = null;
                        _outtimer = null;
                    }
                }
            }, Global.delay);
        };
        /*下一页*/
        retObj.next = function() {
            if (page < totalPage) {
                page++;
                retObj.Query();
            } else {
                if (Global.debug) {
                    console.log("当前已经是末页");
                }
            }
        };
        /*上一页*/
        retObj.prev = function() {
            if (page > 1) {
                page--;
                retObj.Query();
            } else {
                if (Global.debug) {
                    console.log("当前已经是首页");
                }
            }
        };
        /*跳到第p页*/
        retObj.go = function(p) {
            page = p;
            retObj.Query();
        };
        retObj.refresh = function() {
            retObj.Query();
        };
        retObj.abort = function() {
            anchor.onclick();
        };
        Global.handler["Query"] = retObj;
        retObj.go(1);
    };

    var _getNetwork = function() {
        /*清除以前的查询结果*/
        Global.handler["Query"] = null;
        container.innerHTML = "";
        var totalContainer = document.createElement("div");
        totalContainer.className = "QueryContainer";
        totalContainer.id = "_con_" + Math.random();
        totalContainer.style.cssText = "display:block;width:" + container.clientWidth + "px;height:" + container.clientHeight + "px;";
        container.appendChild(totalContainer);
        var returnDiv = document.createElement("div");
        returnDiv.className = "QueryReturnDiv";
        var msg = document.createElement("span");
        msg.innerHTML = "正在搜索路径";

        returnDiv.appendChild(msg);
        var anchor = document.createElement("a");
        anchor.title = "返回主页面板";
        anchor.innerHTML = "返回首页";
        returnDiv.appendChild(anchor);

        anchor.onclick = function() {
            isAlive = false;
            markers.clearMarkers();
            clearInterval(_timer);
            clearInterval(_outtimer);
            for (var i = 0; i < markerList.length; i++) {

                markerList[i].dispose();
            }
            fealayer.disposeFeatures();
            Map.removeLayer(markers);
            Map.removeLayer(fealayer);
            scrollPanel.dispose();
            scrollPanel = null;
            Global.start=null;
            Global.end=null;
            container.style.display = "none";
            prevDiv.style.display = "block";
            Global.handler["Query"] = null;
        };

        totalContainer.appendChild(returnDiv);
        contentList = document.createElement("div");
        contentList.className = "QueryContentList";
        totalContainer.appendChild(contentList);
        scrollPanel = new baidu.ui.ScrollPanel({ container: totalContainer.id, overflow: "overflow-y" });
        scrollPanel.render(totalContainer.id);

        function _peucker(res) {
            res = parser.read(res);
            var ccode = null;
            var cname = null;
            var feas = [];
            var fea = null;
            var cfea = null;

            for (var i = 0, len = res.length; i < len; i++) {
                fea = res[i];
                if (i == 0) {
                    cname = fea.attributes["NAME"].trim();
                    ccode = fea.attributes["CODE"].trim();
                    cfea = new NGeometry.LineString();
                    cfea.addComponents(fea.geometry.components);
                } else {
                    if (cname != fea.attributes["NAME"].trim() || ccode != fea.attributes["CODE"].trim()) {

                        cname = (cname == "") ? "未知路" : cname;
                        cfea = new NVectorFeature(cfea, { "NAME": cname, "CODE": ccode }, Global.Symbol["Network"]);
                        feas.push(cfea);
                        cfea = new NGeometry.LineString();
                        cfea.addComponents(fea.geometry.components);
                        cname = fea.attributes["NAME"].trim();
                        ccode = fea.attributes["CODE"].trim();

                    } else {
                        var a = fea.geometry.components[0];
                        var b = fea.geometry.components[fea.geometry.components.length - 1];
                        var c = cfea.components[0];
                        var d = cfea.components[cfea.components.length - 1];
                        var tt = Math.pow((a.x - c.x), 2) + Math.pow((a.y - c.y), 2);
                        var tw = Math.pow((a.x - d.x), 2) + Math.pow((a.y - d.y), 2);
                        var wt = Math.pow((b.x - c.x), 2) + Math.pow((b.y - c.y), 2);
                        var ww = Math.pow((b.x - d.x), 2) + Math.pow((b.y - d.y), 2);

                        var min = Math.min(tt, tw, wt, ww);
                        if (min == tt) {
                            /*说明第一个方向反了*/
                            cfea.components = cfea.components.reverse();
                            cfea.addComponents(fea.geometry.components);

                        } else if (min == tw) {
                            /*正常顺序*/
                            cfea.addComponents(fea.geometry.components);

                        } else if (min == wt) {
                            /*第二个应该在第一个之前,且反置*/
                            cfea.components = fea.geometry.components.concat(cfea.components).reverse();

                        } else if (min == ww) {

                            cfea.components = cfea.components.concat(fea.geometry.components.reverse());
                        }
                    }
                }
                if (i == len - 1) {
                    cname = (cname == "") ? "未知路" : cname;
                    cfea = new NVectorFeature(cfea, { "NAME": cname, "CODE": ccode }, Global.Symbol["Network"]);
                    feas.push(cfea);
                }
            }
            return feas;
        };

        function _callback(res) {
            msg.innerHTML = "路径搜索结果";
            if (typeof res == "string") {
                showResult("fail", res);
                isAlive = false;
                clearInterval(_timer);
                return;
            }
            networkResult = _peucker(res);
        };

        function showResult(type, msg) {
            switch (type) {
                case "success":
                    var ico = new NIcon("IMG/common/s.png", new NSize(23, 35), new NPixel(-12, -35));
                    var latlng = new NLatLng(sPoint.x, sPoint.y);
                    var mark = new NMarker(latlng, ico);
                    markers.addMarker(mark);
                    markerList.push(mark);
                    jQuery("#" + mark.icon.imageDiv.id).draggable(
                        {
                            cursor: "pointer",
                            start: function(event, ui) { event.stopPropagation(); Map.tools[0].disable(); },
                            stop: function(event, ui) {
                                event.stopPropagation();
                                /*获取屏幕坐标*/
                                var x = ui.position.left + 12;
                                var y = ui.position.top + 35;
                                var latlng = Map.pixelToWorld(new NPixel(x, y));
                                Map.tools[0].enable();
                                sPoint=Global.start = { "x": latlng.lon, "y": latlng.lat, "name": "", "sure": false };                                markers.clearMarkers();
                                fealayer.disposeFeatures();
                                for (var i = 0; i < markerList.length; i++) {
                                    markerList[i].dispose();
                                }
                                scrollPanel.dispose();
                                markerList = [];
                                container.innerHTML = "";
                                Global.handler["Query"] = null;
                                autoExecute();
                            }
                        }
                    );
                    ico = new NIcon("IMG/common/e.png", new NSize(23, 35), new NPixel(-12, -35));
                    latlng = new NLatLng(ePoint.x, ePoint.y);
                    mark = new NMarker(latlng, ico);
                    markers.addMarker(mark);
                    markerList.push(mark);
                    jQuery("#" + mark.icon.imageDiv.id).draggable(
                        {
                            cursor: "pointer",
                            start: function(event, ui) { event.stopPropagation(); Map.tools[0].disable(); },
                            stop: function(event, ui) {
                                event.stopPropagation();
                                /*获取屏幕坐标*/
                                var x = ui.position.left + 12;
                                var y = ui.position.top + 35;
                                var latlng = Map.pixelToWorld(new NPixel(x, y));
                                Map.tools[0].enable();
                                ePoint=Global.end = { "x": latlng.lon, "y": latlng.lat, "name": "", "sure": false };
                                markers.clearMarkers();
                                fealayer.disposeFeatures();
                                for (var i = 0; i < markerList.length; i++) {
                                    markerList[i].dispose();
                                }
                                scrollPanel.dispose();
                                markerList = [];
                                container.innerHTML = "";
                                Global.handler["Query"] = null;
                                autoExecute();
                            }
                        }
                    );

                    contentList.innerHTML = "";
                    var div = document.createElement("div");
                    div.className = "NetworkResultListItem";
                    var img = document.createElement("div");
                    img.className = "NetworkResultListItemIMGF";
                    div.appendChild(img);
                    var span = document.createElement("span");
                    span.className = "NetworkResultListItemSpan";
                    span.innerHTML = Global.start.sure?Global.start.name:networkResult[0].attributes["NAME"];
                    div.appendChild(span);
                    contentList.appendChild(div);
                    for (var i = 0, len = networkResult.length; i < len; i++) {
                        var div = document.createElement("div");
                        div.className = "NetworkResultListItem";
                        var img = document.createElement("div");
                        img.className = "NetworkResultListItemIMG";
                        div.appendChild(img);
                        var span = document.createElement("span");
                        span.className = "NetworkResultListItemSpan";
                        span.innerHTML = networkResult[i].attributes["NAME"];
                        var lspan=document.createElement("span");
                        lspan.className="NetworkResultListItemLength";
                        lspan.innerHTML="约"+(networkResult[i].geometry.getLength()*NINCHES_PER_UNIT["dd"]/NINCHES_PER_UNIT["km"]).toFixed(2)+"千米";
                        span.appendChild(lspan)
                        div.appendChild(span);
                        div.val = i;
                        div.onmouseover = function() {
                            this.className = "NetworkResultListItemActive";
                            var fea = networkResult[parseInt(this.val)];
                            fea.symbol = Global.Symbol["NetworkActivate"];
                            fealayer.redraw();

                        };
                        div.onmouseout = function() {
                            this.className = "NetworkResultListItem";
                            var fea = networkResult[parseInt(this.val)];
                            fea.symbol = Global.Symbol["Network"];
                            fealayer.redraw();
                        };
                        div.onclick = function() {
                            var fea = networkResult[parseInt(this.val)];
                            var ext = fea.geometry.getBounds();
                            Map.zoomToExtent(ext);
                        };
                        contentList.appendChild(div);
                    };
                    /*构建结束点*/
                    var div = document.createElement("div");
                    div.className = "NetworkResultListItem";
                    var img = document.createElement("div");
                    img.className = "NetworkResultListItemIMGL";
                    div.appendChild(img);
                    var span = document.createElement("span");
                    span.className = "NetworkResultListItemSpan";
                    span.innerHTML = Global.end.sure?Global.end.name:networkResult[networkResult.length-1].attributes["NAME"];
                    div.appendChild(span);
                    contentList.appendChild(div);
                    fealayer.addFeatures(networkResult);
                    var ext = fealayer.getLayerExtent();
                    scrollPanel.update();
                    if (ext != null) {
                        Map.zoomToExtent(ext);
                    }
                    for (var i = 1; i < networkResult.length - 1; i++) {
                        var pt = networkResult[i].geometry.components[0];
                        var latlng = new NLatLng(pt.x, pt.y);
                        var ico = new NIcon("IMG/common/carswitch.png", new NSize(23, 29), new NPixel(0, -29));
                        var mark = new NMarker(latlng, ico);
                        markers.addMarker(mark);
                        markerList.push(mark);

                        pt = networkResult[i].geometry.components[networkResult[i].geometry.components.length - 1];
                        latlng = new NLatLng(pt.x, pt.y);
                        ico = new NIcon("IMG/common/carswitch.png", new NSize(23, 29), new NPixel(0, -29));
                        mark = new NMarker(latlng, ico);
                        markers.addMarker(mark);
                        markerList.push(mark);
                    };
                    break;
                case "busy":
                    contentList.innerHTML = msg;
                    break;
                case "fail":
                    contentList.innerHTML = msg;
                    break;
            }
        };

        //创建闭包变量
        var retObj = {};
        retObj.query = function() {
            networkResult = null;

            var feas = [new NVectorFeature(new NGeometry.Point(ePoint.x, ePoint.y)), new NVectorFeature(new NGeometry.Point(sPoint.x, sPoint.y))];
            var str = parser.write(feas);
            markers.clearMarkers();
            for (var i = 0; i < markerList.length; i++) {
                markerList[i].dispose();
            }
            markerList = [];
            fealayer.disposeFeatures();

            var NetworkObject = { "searchstring": str, "maxtolerance": Global.maxtolerance, "callback": _callback };
            showResult("busy", Global.html.BUSY);
            route.query(NetworkObject);
            if (_timer != null) {
                clearInterval(_timer);
                _timer = null;
            }

            var _time = 0;
            isAlive = true;

            _timer = setInterval(function() {
                if (networkResult != null) {
                    if (isAlive) {
                        clearInterval(_timer);
                        _timer = null;
                        _time = 0;
                        isAlive = false;
                        showResult("success", "");
                    }
                } else {
                    _time++;
                    if (_time >=Global.COUNT) {
                        showResult("fail", "");
                        clearInterval(_timer);
                        _timer = null;
                        _time = 0;
                        isAlive = false;
                    }
                }
            }, Global.delay);
        };
        retObj.refresh = function() {

            retObj.query();

        };
        retObj.abort = function() {

            anchor.onclick();
        };

        Global.handler["Query"] = retObj;
        retObj.query();
    };
    /*2012-11-13修改，去掉路径搜索时查找附近点位的操作*/
    /*function autoExecute(){
        ctype="start";
		if(!Global.start.sure){   
            _getPosition(Global.start);
        }
        _outtimer=setInterval(function(){
            if(Global.start.sure){
                clearInterval(_outtimer);
                _outtimer=null;
                if(!Global.end.sure){
					ctype="end";
                    _getPosition(Global.end);        
                }
                _outtimer=setInterval(function(){         
                    if(Global.end.sure){
                        clearInterval(_outtimer);
                        _outtimer=null;
                        _getNetwork();  
                    }  
                },Global.delay);
            }
        },Global.delay);
    };*/

    function autoExecute(){       
            
        _getNetwork(); 

    };
    autoExecute();
};


/*公交站点的搜索，输入站点名*/
function StationQuery(qstr,div,prevDiv){
    var lay=Global.lays["公交站点"];
    var keys=lay.queryfields;
    var displayfield=lay.displayfields;
    var querytype="key";
    var page = 1;
    var totalPage = -1;
    var maxfeatures = 10;
    var QueryObject = {};
    var container = document.getElementById(div);
	var prevDiv=document.getElementById(prevDiv);
	prevDiv.style.display="none";
	container.style.display="block";
    var contentList = null;
    var pageList = null;
    var content = null;
    var markerList = [];
    var Map = Global.map;
    var cDlg = null;
    var isAlive = false;
    var markers = Global.lays["POI图层"];
    var _timer = null;
    var scrollPanel = null;
    markers.clearMarkers();
    Map.addLayer(markers);
    /*将查询字段和关键词分段*/
    qstr=qstr.replace(/\s+/,"%");
    keysa=keys.split(",");
    /*构造查询语句where=*,关键词分词还未实现，用一个查询语句对多个字段进行查询*/
    var str="";
    for(var i=0,j=keysa.length;i<j;i++){
        if(i!=0){
            str+=" OR ";
        }
        str+=keysa[i]+" LIKE ";
        str+="'%"+qstr+"%'";
    };   
	//str+=" ORDER BY LENGTH("+keysa[0]+")";
	
    QueryObject = { "searchstring": str, "callback": callback,"page":page,"maxfeatures":maxfeatures};
    /*清除以前的查询结果*/
    container.innerHTML = "";
    var totalContainer = document.createElement("div");
    totalContainer.className = "QueryContainer";
    totalContainer.id = "_con_" + Math.random();
    totalContainer.style.cssText = "display:block;width:" + container.clientWidth + "px;height:" + container.clientHeight + "px;";
    container.appendChild(totalContainer);
    var returnDiv = document.createElement("div");
    returnDiv.className = "QueryReturnDiv";
    var msg = document.createElement("span");
    msg.innerHTML = "正在搜索站点";
    returnDiv.appendChild(msg);
    var anchor = document.createElement("a");
    anchor.title = "点击返回主页面板";
    anchor.innerHTML = "返回首页";
    returnDiv.appendChild(anchor);


    anchor.onclick = function() {
        isAlive = false;
        if (_timer != null) {
            clearInterval(_timer);
            _timer = null;
        }
        markers.clearMarkers();
        Map.removeLayer(markers);
        for (var i = 0; i < markerList.length; i++) {
            markerList[i].dispose();
        }
        markerList = [];
        cDlg ? Map.removeDialog(cDlg) : null;
        scrollPanel.dispose();
        container.style.display = "none";
        prevDiv.style.display = "block";
        Global.handler["Query"] = null;
    };

    totalContainer.appendChild(returnDiv);
    contentList = document.createElement("div");
    contentList.className = "QueryContentList";
    totalContainer.appendChild(contentList);

    scrollPanel = new baidu.ui.ScrollPanel({ container: totalContainer.id, overflow: "overflow-y" });
    scrollPanel.render(totalContainer.id);

    function callback(res) {
        /*判断总页数有没有记录*/
        if(!isAlive){
            return;
        } 
		/*由于采用timer控制回调，在未确定返回结果数目是不能随意给content赋值*/
		/*在查找出错、没有数据的时候服务器返回400错误*/
		if(typeof res=="string"){
			showResult("fail",res);
			return;
		}
        if(Global.NEWMAP){
            if (totalPage == -1) {
                totalPage = res.header.pages;
            }
            if (totalPage == 0) {
                showResult("fail", Global.html.NODATA);
                isAlive = false;
                clearInterval(_timer);
                _timer = null;
                return;
            }
            content = res.content.features;
        }else{
            if (totalPage == -1) {
                totalPage = res.total;
            }
			if(totalPage==0){
				showResult("fail", Global.html.NODATA);
				isAlive=false;
				clearInterval(_timer);
				_timer=null;
			}
			content=res.content;
        }
        msg.innerHTML = "总共搜索到"+totalPage+"页内容";
    };

    function showResult(type,msg) {
        switch (type) {
            case "success":
                contentList.innerHTML = "";
                var displayArray = displayfield.split(",");
                var pct = new NGeometry.MultiPoint();
                for (var i = 0; i < markerList.length; i++) {
                    markerList[i].dispose();
                }
                markerList = [];
                for (var i = 0, len = content.length; i < len; i++) {
                    var item = document.createElement("div");
                    item.className = "StationContentListItem";
                    /*添加图片标头*/
                    var img = document.createElement("img");
                    img.className = "StationContentListTitle";
                    img.src = "IMG/list/b_" + (i + 1) + ".png";
                    item.appendChild(img);
                    /*添加文字信息*/
                    var div = document.createElement("div");
                    div.className = "StationContentListText";
                    var span = null;
                    for (var j = 0; j < displayArray.length; j++) {
                        span = document.createElement("span");
                        if (Global.NEWMAP) {
                            span.innerText = content[i].properties[displayArray[j]];
                        } else {
                            span.innerText = content[i][displayArray[j]];
                        }
                        div.appendChild(span);
                    }
                    item.appendChild(div);

                    item.onmouseover = function() {
                        this.className = "StationContentListItemActive";
                        this.marker.events.triggerEvent("mouseover");
                    };
                    item.onmouseout = function() {
                        this.className = "StationContentListItem";
                        this.marker.events.triggerEvent("mouseout");
                    };
                    item.onclick = function() {
                        this.marker.events.triggerEvent("click");
                    };

                    var ico = new NIcon("IMG/list/b_" + (i + 1) + ".png", new NSize(28, 43), new NPixel(-14, -36));
                    var latlng = null;
                    if (Global.NEWMAP) {
                        latlng = new NLatLng(parseFloat(content[i].geometry.coordinates[0]), parseFloat(content[i].geometry.coordinates[1]));
                    } else {
                        latlng = new NLatLng(parseFloat(content[i]["LONGITUDE"]), parseFloat(content[i]["LATITUDE"]));
                    }

                    var marker = new NMarker(latlng, ico);
                    markers.addMarker(marker);
                    var dlg, str;
                    if (Global.NEWMAP) {
                        str = "<div class='StationDialog'>";
                        str += "<div class='Title'>" + content[i].properties[displayArray[0]] + "</div>";
                        str += "<div class='Content'>途经线路：<br />";
                        str += "</div></div>";
                        marker.route = content[i].properties["LNAMES"];
                    } else {
                        str = "<div class='StationDialog'>";
                        str += "<div class='Title'>" + content[i][displayArray[0]] + "</div>";
                        str += "<div class='Content'>途经线路：<br />";
                        str += "</div></div>";
                        marker.route = content[i]["LNAMES"];
                    }
                    dlg = new NSZCSArrowDialog(null, latlng, null, str, true);

                    marker.dialog = dlg;
                    marker.events.bind("mouseover", marker, function() { this.setURL(this.icon.url.replace("b_", "r_")); this.icon.imageDiv.style.zIndex = "5000"; });
                    marker.events.bind("mouseout", marker, function() { this.setURL(this.icon.url.replace("r_", "b_")); this.icon.imageDiv.style.zIndex = ""; });
                    marker.events.bind("click", marker, function() {
                        Map.addDialog(this.dialog, true);
                        cDlg = this.dialog;
                        this.dialog.show();
                        Map.panTo(this.latlng);
                        var div = this.dialog.contentDiv.getElementsByTagName("div")[2];
                        var lname = this.route.split(",");
                        for (var j = 0; j < lname.length; j++) {
                            var a = document.createElement("a");
                            a.innerHTML = lname[j];
                            a.onclick = function() {
                                lineClick(this.innerText);
                            };
                            div.appendChild(a);
                        }
                    });
                    markerList.push(marker);
                    item.marker = marker;
                    contentList.appendChild(item);
                    pct.addComponent(new NGeometry.Point(latlng.lon, latlng.lat));
                }
                scrollPanel.update();
                if (pct.components.length > 1) {
                    var ext = pct.getBounds();
                    Map.zoomToExtent(ext);
                } else {
                    var point = pct.components[0];
                    Map.panTo(new NLatLng(point.x, point.y));
                }
                /*构建pagelist*/
                BuildPageList();
                break;
            case "busy":
                contentList.innerHTML = msg;
                break;
            case "fail":
                contentList.innerHTML = msg;
                break;
        }
    };
    
	/*这个函数将是对线路点击是切换到线路搜索的函数，要先清除站点搜索的状态*/
    function lineClick(txt){
        isAlive = false;
        if (_timer != null) {
            clearInterval(_timer);
            _timer = null;
        }
        markers.clearMarkers();
		for(var i=0;i<markerList.length;i++){
			markerList[i].dispose();
		}
		markerList=[];
        Map.removeLayer(markers);
        cDlg ? Map.removeDialog(cDlg) : null;
        scrollPanel.dispose();
        scrollPanel = null;
        Global.handler["Query"] = null;
		LineQuery(txt,"keyPanel","facePanel");
    }

    /*返回对象，保存闭包的许多函数*/
    var retObj = {};
    retObj.Query = function() {
        content = null;
        isAlive = true;
        totalPage = -1;
        if (_timer != null) {
            clearInterval(_timer);
            _timer = null;
        };
        QueryObject.page = page;
        if (querytype == "key") {
            lay.query(QueryObject);
        }
        else {
            lay.spatialQuery("bbox", QueryObject);
        }
        showResult("busy", Global.html.BUSY);
        markers.clearMarkers();
        for (var i = 0; i < markerList.length; i++) {
            markerList[i].dispose();
        }
        markerList = [];
        cDlg ? Map.removeDialog(cDlg) : null;
        /*查询之后，等待显示结果，如果时间太长则abort掉查询*/
        var _time = 0;
        _timer = setInterval(function() {
            _time++;
            if (content != null && isAlive) {
                /*函数返回了*/
                clearInterval(_timer);
                _timer = null;
                isAlive = false;
                showResult("success", "");
            } else {
                if (_time >= Global.COUNT || !isAlive) {
                    /*当前查询已经被抛弃了*/
                    isAlive = false;
                    showResult("fail", Global.html.TIMEOUT);
                    clearInterval(_timer);
                    _timer = null;
                }
            }
        }, Global.delay);
    };
    /*下一页*/
    retObj.next = function() {
        
        if (page<totalPage) {
            page++;
            retObj.Query();

        } else {
            console.log("当前已经是末页");
        }

    };
    /*上一页*/
    retObj.prev = function() {

        if (page > 1) {
            page--;
            retObj.Query();
        } else {
            console.log("当前已经是首页");
        }

    };
    /*跳到第p页*/
    retObj.go = function(p) {
        page = p;
        retObj.Query();
    };
    retObj.refresh = function() {
        retObj.Query();
    };
    retObj.abort = function() {
        anchor.onclick();
    };
    
    /*列表创建函数*/
    function BuildPageList() {
        /*最快捷的清空内容*/

        pageList = document.createElement("div");
        pageList.className = "QueryPageList";
        contentList.appendChild(pageList);

        pageList.innerHTML = "";
        if(totalPage==0){
			return;
		}
        var div = document.createElement("div");
        div.className = "PageList";

        var entity = document.createElement("a");
        entity.className = "QueryPageItem";
        entity.innerText = "首页";

        entity.onclick = function() {
            retObj.go(1);
        };
        div.appendChild(entity);
        /*首页部分完成*/
        
        /*页码的开始部分和结束部分，要判断是否小于0或者超过最大值*/
        var startNum;
        var endNum;
        if (totalPage >= 5) {
            if (page <= 3) {
                /*当前页码还是在1-3之间时，如果-2就变成负值了*/
                startNum = 1;
                endNum = 5;

            } else if (page >= totalPage - 2) {
                /*原理和上边类似*/
                endNum = totalPage;
                startNum = totalPage - 4;

            } else {
                /*这是最一般的情况*/
                startNum = page - 2;
                endNum = page + 2;

            }

        } else {
            /*页数不够5页，就把全部显示出来*/
            startNum = 1;
            endNum = totalPage;   
        };
        for (var i = startNum; i <=endNum; i++) {
            entity = document.createElement("a");
            entity.className = "QueryPageItem";
            entity.innerText = i;
            if (i == page) {
                /*当前页面鼠标动作不反应，单击也不反应*/
                entity.style.backgroundColor = "rgb(161,201,200)";
            }
            else {
            	var index=i;
            	entity.onclick = function() {
            	/*这个部分闭包不好使，还没想出对策，直接用标签值代替*/
            	    var index = parseInt(this.innerText);
            	    retObj.go(index);
            	};
            }
            div.appendChild(entity);
        };
        /*中间部分*/
        entity = document.createElement("a");
        entity.className = "QueryPageItem";
        entity.innerText = "末页";
        entity.onclick = function() {
            retObj.go(totalPage);
        };
        div.appendChild(entity);
        pageList.appendChild(div);
    };

    Global.handler["Query"]=retObj;
    retObj.go(1);
};

/*公交线路的搜索，输入线路名称*/
function LineQuery(qstr,div,prevDiv){
    var lay=Global.lays["公交线路"];
	var arc=Global.lays["公交弧段"];
    var keys=lay.queryfields;
    var displayfield=lay.displayfields;
    var querytype="key";
    var page = 1;
    var totalPage = -1;
    var maxfeatures = 10;
    var QueryObject = {};
	var ArcsObject={};
    var container = document.getElementById(div);
	var prevDiv=document.getElementById(prevDiv);
	prevDiv.style.display="none";
	container.style.display="block";
    var contentList = null;
    var pageList = null;
    var content = null;
	var arcarray=null;
    var markerList = [];
    var Map = Global.map;
    var cDlg = null;
    var isAlive = false;
    var markers = Global.lays["POI图层"];
	var fealayer=Global.lays["Network图层"];
	var scrollPane = null;
    var _timer=null;
    markers.clearMarkers();
	fealayer.disposeFeatures();
	Map.addLayer(fealayer);
    Map.addLayer(markers);
    /*将查询字段和关键词分段*/
    qstr=qstr.replace(/\s+/,"%");
    keysa=keys.split(",");
    /*构造查询语句where=*,关键词分词还未实现，用一个查询语句对多个字段进行查询*/
    var str="";
    for(var i=0,j=keysa.length;i<j;i++){
        if(i!=0){
            str+=" OR ";
        }
        str+=keysa[i]+" LIKE ";
        str+="'%"+qstr+"%'";
    };   
    QueryObject = { "searchstring": str, "callback": callback,"page":page,"maxfeatures":maxfeatures};

    /*清除以前的查询结果*/
    container.innerHTML = "";
    var totalContainer = document.createElement("div");
    totalContainer.className = "QueryContainer";
    totalContainer.id = "_con_" + Math.random();
    totalContainer.style.cssText = "display:block;width:" + container.clientWidth + "px;height:" + container.clientHeight + "px;";
    container.appendChild(totalContainer);
    var returnDiv = document.createElement("div");
    returnDiv.className = "QueryReturnDiv";
    var msg = document.createElement("span");
    msg.innerHTML = "正在搜索线路";
    returnDiv.appendChild(msg);
    var anchor = document.createElement("a");
    anchor.title = "返回主页面板";
    anchor.innerHTML = "返回首页";
    returnDiv.appendChild(anchor);

    anchor.onclick = function() {
        isAlive = false;
        if (_timer != null) {
            clearInterval(_timer);
            _timer = null;
        }
        markers.clearMarkers();
        fealayer.disposeFeatures();
        Map.removeLayer(markers);
        Map.removeLayer(fealayer);
        for (var i = 0; i < markerList.length; i++) {
            markerList[i].dispose();
        }
        markerList = [];
        cDlg ? Map.removeDialog(cDlg) : null;
        scrollPanel.dispose();
        container.style.display = "none";
        prevDiv.style.display = "block";
        Global.handler["Query"] = null;
    };

    totalContainer.appendChild(returnDiv);
    
    contentList = document.createElement("div");
    contentList.className = "QueryContentList";
    totalContainer.appendChild(contentList);
    scrollPanel = new baidu.ui.ScrollPanel({ container: totalContainer.id, overflow: "overflow-y" });
    scrollPanel.render(totalContainer.id);
	
    function callback(res) {
        /*判断总页数有没有记录*/
        if(!isAlive){
            return;
        }  
        if(Global.NEWMAP){
            if (totalPage == -1) {
                totalPage = res.total;
            }
            if (totalPage == 0) {
                showResult("fail", Global.html.NODATA);
                isAlive = false;
                clearInterval(_timer);
                _timer = null;
            }
            content = res.content;
        }else{  
            if (totalPage == -1) {
                totalPage = res.total;
            }
            if (totalPage == 0) {
			    showResult("fail", Global.html.NODATA);
				isAlive=false;
				clearInterval(_timer);
				_timer=null;
			}
			content=res.content;
        }
        msg.innerHTML = "总共搜索到"+totalPage+"页内容";
    };

    function showResult(type,msg) {
        switch (type) {
            case "success":
                contentList.innerHTML = "";
                var displayArray = displayfield.split(",");
                for (var i = 0; i < markerList.length; i++) {
                    markerList[i].dispose();
                }
                markerList = [];
                for (var i = 0, len = content.length; i < len; i++) {
                    var item = document.createElement("div");
                    item.className = "StationContentListItem";
                    /*添加图片标头*/
                    var img = document.createElement("img");
                    img.className = "StationContentListTitle";
                    img.src = "IMG/list/b_" + (i + 1) + ".png";
                    item.appendChild(img);
                    /*添加文字信息*/
                    var div = document.createElement("div");
                    div.className = "StationContentListText";
                    var span = null;
                    for (var j = 0; j < displayArray.length; j++) {
                        span = document.createElement("span");
                        if (Global.NEWMAP) {
                            span.innerText = content[i][displayArray[j]];
                        } else {
                            span.innerText = content[i][displayArray[j]];
                        }
                        div.appendChild(span);
                    }
                    item.appendChild(div);
                    item.val = i;
                    item.onmouseover = function() {
                        this.className = "StationContentListItemActive";
                    };
                    item.onmouseout = function() {
                        this.className = "StationContentListItem";
                    };
                    item.onclick = function() {
                        function _cb(res) {
                            if (!isAlive) {
                                return;
                            }
                            clearInterval(_timer);
                            isAlive = false;
                            var parser = new NParser.GeoJSON();
                            arcarray = parser.read(res.content);
                            fealayer.addFeatures(arcarray);
                            var ext = fealayer.getLayerExtent();
                            Map.zoomToExtent(ext);
                        }

                        var aids = content[parseInt(this.val)]["ARCS"];
                        aid = aids.split(",");
                        var str = "";
                        for (var j = 0; j < aid.length; j++) {
                            if (j != 0) {
                                str += " OR ";
                            }
                            str += "ARCID=" + aid[j];
                        }
                        ArcsObject = { "searchstring": str, "callback": _cb, "maxfeatures": 500 };
                        fealayer.disposeFeatures();
                        arcarray = [];
                        isAlive = true;
                        arc.query(ArcsObject);

                        var _time = 0;
                        _timer = setInterval(function() {
                            _time++;
                            if (_time >= Global.COUNT || !isAlive) {
                                /*当前查询已经被抛弃了*/
                                isAlive = false;
                                clearInterval(_timer);
                                _timer = null;
                                alert("服务器响应慢，请检查网络");
                            }
                        }, Global.delay);

                    };
                    contentList.appendChild(item);
                }
                /*构建pagelist*/
                scrollPanel.update();
                BuildPageList();
                break;
            case "busy":
                contentList.innerHTML = msg;
                break;

            case "fail":
                contentList.innerHTML = msg;
                break;
        }
    };

    /*返回对象，保存闭包的许多函数*/
    var retObj = {};
    retObj.Query = function() {
        content = null;
        isAlive = true;
        totalPage=-1;
        if(_timer!=null){
            clearInterval(_timer);
            _timer=null;
        };
        QueryObject.page = page;
        if(querytype=="key"){
            lay.query(QueryObject);
        }
        else{
            lay.spatialQuery("bbox",QueryObject);
        }
        showResult("busy", Global.html.BUSY);
        markers.clearMarkers();
        cDlg ? Map.removeDialog(cDlg) : null;
        /*查询之后，等待显示结果，如果时间太长则abort掉查询*/
        var _time = 0;
        _timer = setInterval(function() {
            _time++;
            if (content != null) {
                /*函数返回了*/
                if (isAlive) {
                    clearInterval(_timer);
                    _timer = null;
                    isAlive = false;
                    showResult("success", "");
                }
            } else {
                if (_time>=Global.COUNT || !isAlive) {
                    /*当前查询已经被抛弃了*/
                    isAlive = false;
                    showResult("fail", Global.html.TIMEOUT);
                    clearInterval(_timer);
                    _timer = null;
                }
            }
        }, Global.delay);
    };
    /*下一页*/
    retObj.next = function() {
        if (page<totalPage) {
            page++;
            retObj.Query();
        } else {
            console.log("当前已经是末页");
        }
    };
    /*上一页*/
    retObj.prev = function() {
        if (page > 1) {
            page--;
            retObj.Query();
        } else {
            console.log("当前已经是首页");
        }
    };
    /*跳到第p页*/
    retObj.go = function(p) {
        page = p;
        retObj.Query();
    };
    retObj.refresh = function() {
        retObj.Query();
    };
    retObj.abort = function() {
        anchor.onclick();
    };
    

    /*列表创建函数*/
    function BuildPageList() {
        /*最快捷的清空内容*/

        pageList = document.createElement("div");
        pageList.className = "QueryPageList";
        contentList.appendChild(pageList);

        pageList.innerHTML = "";
        if(totalPage==0){
			return;
		}
        var div = document.createElement("div");
        div.className = "PageList";

        var entity = document.createElement("a");
        entity.className = "QueryPageItem";
        entity.innerText = "首页";

        entity.onclick = function() {
            retObj.go(1);
        };
        div.appendChild(entity);
        /*首页部分完成*/
        
        /*页码的开始部分和结束部分，要判断是否小于0或者超过最大值*/

        var startNum;
        var endNum;
        if (totalPage >= 5) {
            if (page <= 3) {
                /*当前页码还是在1-3之间时，如果-2就变成负值了*/
                startNum = 1;
                endNum = 5;

            } else if (page >= totalPage - 2) {
                /*原理和上边类似*/
                endNum = totalPage;
                startNum = totalPage - 4;

            } else {
                /*这是最一般的情况*/
                startNum = page - 2;
                endNum = page + 2;

            }

        } else {
            /*页数不够5页，就把全部显示出来*/
            startNum = 1;
            endNum = totalPage;   
        };
        for (var i = startNum; i <=endNum; i++) {
            entity = document.createElement("a");
            entity.className = "QueryPageItem";
            entity.innerText = i;
            if (i == page) {
                /*当前页面鼠标动作不反应，单击也不反应*/
                entity.style.backgroundColor = "rgb(161,201,200)";
            }
            else {
            	var index=i;
            	entity.onclick = function() {
            	/*这个部分闭包不好使，还没想出对策，直接用标签值代替*/
            	    var index = parseInt(this.innerText);
            	    retObj.go(index);
            	};
            }
            div.appendChild(entity);
        };
        /*中间部分*/
        entity = document.createElement("a");
        entity.className = "QueryPageItem";
        entity.innerText = "末页";
        entity.onclick = function() {
            retObj.go(totalPage);

        };
        div.appendChild(entity);
        pageList.appendChild(div);

    };

    Global.handler["Query"]=retObj;
    retObj.go(1);
};



/*公交换乘*/
function BusQuery(sname,ename,div,prevDiv){
    var lay=Global.lays["地名地址"];
    var stat=Global.lays["公交站点"];
    var arc=Global.lays["公交弧段"];
    var route=Global.lays["公交换乘"];
    var keys=lay.queryfields;/*在地名地址里边搜索的字段*/
    var displayfield=lay.displayfields;/*显示起终点的字段，都在xml里配置*/
    var querytype="key";/*保留这个参数的原因是可以用来周边搜索*/
    var page = 1;
    var totalPage = -1;
    var maxfeatures = 10;
    var QueryObject = {};
    var container = document.getElementById(div);
    var prevDiv=document.getElementById(prevDiv);
    prevDiv.style.display="none";
    container.style.display="block";
    var contentList = null;
    var pageList = null;
    var content = null;
    var markerList = [];
    var Map = Global.map;
    var cDlg = null;
    var isAlive = false;
    var scrollPanel = null;
    var markers = Global.lays["POI图层"];
    var fealayer=Global.lays["Network图层"];
    /*先加入要素层后加注记层防止chrome下被遮盖*/
    fealayer.disposeFeatures();
    Map.addLayer(fealayer);
    markers.clearMarkers();
    Map.addLayer(markers);

    var networkResult=null;
    var parser = new NParser.GeoJSON();
    var _timer=null;
    var _outtimer=null;
    var sPoint=null;
    var ePoint=null;
    var ctype="start";
    var maxtolerance=Global.maxtolerance;

    var _getPosition = function(name) {
        /*将查询字段和关键词分段*/
        var nm = name.replace(/\s+/, "%");
        name = name.replace(/\s+/, "");
        keysa = keys.split(",");
        /*构造查询语句where=*,关键词分词还未实现，用一个查询语句对多个字段进行查询*/
        var str = "";
        for (var i = 0, j = keysa.length; i < j; i++) {
            if (i != 0) {
                str += " OR ";
            }
            str += keysa[i] + " LIKE ";
            str += "'%" + nm + "%'";
        };
        if (!Global.NEWMAP) {
            str += " ORDER BY LENGTH(" + keysa[0] + ")";
        }
        /*构造查询对象*/
        QueryObject = { "searchstring": str, "callback": callback, "page": page, "maxfeatures": maxfeatures };

        /*清除以前的查询结果*/
        container.innerHTML = "";
        var totalContainer = document.createElement("div");
        totalContainer.className = "QueryContainer";
        totalContainer.id = "_con_" + Math.random();
        totalContainer.style.cssText = "display:block;width:" + container.clientWidth + "px;height:" + container.clientHeight + "px;";
        container.appendChild(totalContainer);
        var returnDiv = document.createElement("div");
        returnDiv.className = "QueryReturnDiv";
        var msg = document.createElement("span");
        if (ctype == "start") {
            msg.innerHTML = "正在搜索起点";

        } else {
            msg.innerHTML = "正在搜索终点";
        }

        returnDiv.appendChild(msg);
        var anchor = document.createElement("a");
        anchor.title = "点击返回主页面板";
        anchor.innerHTML = "返回首页";
        returnDiv.appendChild(anchor);
        /*清除一切状态，返回主界面*/
        anchor.onclick = function() {
            isAlive = false;
            if (_timer != null) {
                clearInterval(_timer);
                _timer = null;
            }
            if (_outtimer != null) {
                clearInterval(_outtimer);
                _outtimer = null;
            }
            markers.clearMarkers();
            fealayer.disposeFeatures();
            Map.removeLayer(markers);
            Map.removeLayer(fealayer);
            for (var i = 0; i < markerList.length; i++) {
                markerList[i].dispose();
            }
            markerList = [];
            cDlg ? Map.removeDialog(cDlg) : null;
            scrollPanel.dispose();
            scrollPanel = null;
            Global.start = null;
            Global.end = null;
            container.style.display = "none";
            prevDiv.style.display = "block";
            Global.handler["Query"] = null;
        };

        totalContainer.appendChild(returnDiv);
        contentList = document.createElement("div");
        contentList.className = "QueryContentList";
        totalContainer.appendChild(contentList);

        scrollPanel = new baidu.ui.ScrollPanel({ container: totalContainer.id, overflow: "overflow-y" });
        scrollPanel.render(totalContainer.id);

        function callback(res) {
            /*判断总页数有没有记录*/
            if (!isAlive) {
                return;
            };
            if (Global.NEWMAP) {
                if (totalPage == -1) {
                    totalPage = res.header.pages;
                }
                if (totalPage == 0) {
                    clearInterval(_timer);
                    _timer = null;
                    clearInterval(_outtimer);
                    _outtimer = null;
                    isAlive = false;
                    showResult("fail", Global.html.NODATA);
                }
                content = res.content.features;
            } else {
                if (totalPage == -1) {
                    totalPage = res.total;
                }
                if (totalPage == 0) {
                    clearInterval(_timer);
                    _timer = null;
                    clearInterval(_outtimer);
                    _outtimer = null;
                    isAlive = false;
                    showResult("fail", Global.html.NODATA);
                }
                content = res.content;
            };
            if (totalPage == 0) {
                /*没有找到相关点,就退出*/
                return;
            };
            /*先进行一步筛选,用数据库的结果是按照相关度排序的，所以名称相同的肯定在第一页*/
            if (Global.NEWMAP) {
                for (var i = 0, len = content.length; i < len; i++) {
                    if (content[i].properties[lay.displayfields] == name) {
                        /*查到一致的名称*/
                        if (ctype == "start") {
                            sPoint = new NGeometry.Point(content[i].geometry.coordinates[0], content[i].geometry.coordinates[1]);
                            sPoint.name=content[i].properties[lay.displayfields];
                            sPoint.stat="";
                        } else {
                            ePoint = new NGeometry.Point(content[i].geometry.coordinates[0], content[i].geometry.coordinates[1]);
                            ePoint.name=content[i].properties[lay.displayfields];
                            ePoint.stat="";
                        }
                        isAlive = false;
                        clearInterval(_timer);
                        _timer = null;
                        scrollPanel.dispose();
                        scrollPanel = null;
                        break;
                    };
                }
            } else {
                for (var i = 0, len = content.length; i < len; i++) {
                    if (content[i][lay.displayfields] == name) {
                        /*查到一致的名称*/
                        if (ctype == "start") {
                            sPoint = new NGeometry.Point(parseFloat(content[i]["LONGITUDE"]), parseFloat(content[i]["LATITUDE"]));
                            Global.start = { "x": sPoint.x, "y": sPoint.y, "name": name, "sure": true };
                        } else {
                            ePoint = new NGeometry.Point(parseFloat(content[i]["LONGITUDE"]), parseFloat(content[i]["LATITUDE"]));
                            Global.end = { "x": sPoint.x, "y": sPoint.y, "name": name, "sure": true };
                        }
                        isAlive = false;
                        clearInterval(_timer);
                        _timer = null;
                        scrollPanel.dispose();
                        scrollPanel = null;
                        break;
                        /*滚动条需要dispose掉*/
                    };
                }
            }
            if (ctype == "start") {

                msg.innerHTML = "搜索到起点" + totalPage + "页";

            } else {

                msg.innerHTML = "搜索到终点" + totalPage + "页";

            }
        };

        function showResult(type, msg) {
            switch (type) {
                case "success":
                    contentList.innerHTML = "";
                    var displayArray = displayfield.split(",");
                    for (var i = 0; i < markerList.length; i++) {
                        markerList[i].dispose();
                    }
                    markerList = [];
                    var pct = new NGeometry.MultiPoint();
                    for (var i = 0, len = content.length; i < len; i++) {
                        var item = document.createElement("div");
                        item.className = "NetworkContentListItem";
                        /*添加图片标头*/
                        var img = document.createElement("img");
                        img.className = "NetworkContentListTitle";
                        img.src = "IMG/list/b_" + (i + 1) + ".png";
                        item.appendChild(img);
                        /*添加文字信息*/
                        var div = document.createElement("div");
                        div.className = "NetworkContentListText";
                        var span = null;
                        for (var j = 0; j < displayArray.length; j++) {
                            span = document.createElement("span");
                            if (Global.NEWMAP) {
                                span.innerText = content[i].properties[displayArray[j]];
                            } else {
                                span.innerText = content[i][displayArray[j]];
                            }
                            div.appendChild(span);
                        }
                        item.appendChild(div);
                        /*添加兴趣点图片*/
                        img = document.createElement("div");
                        img.className = "NetworkContentListIMG";
                        if (ctype == "start") {
                            img.innerText = "设为起点";
                        } else {
                            img.innerText = "设为终点";
                        }
                        img.val = i;
                        img.onmouseover = function() {

                            this.className = "NetworkContentListIMGActive";
                        }
                        img.onmouseout = function() {

                            this.className = "NetworkContentListIMG";
                        }
                        img.onclick = function(evt) {
                            evt = evt || window.Event;
                            NEvent.stop(evt);
                            var fea = content[parseInt(this.val)];
                            var x;
                            var y;
                            var name;
                            if (Global.NEWMAP) {
                                x = fea.geometry.coordinates[0];
                                y = fea.geometry.coordinates[1];
                                name = fea.properties[displayfield];
                            } else {
                                x = fea["LONGITUDE"];
                                y = fea["LATITUDE"];
                                name = fea[displayfield];
                            }
                            /*这里调用就可以省去用timer延迟执行*/
                            /*为之后的拖曳准备*/
                            if (ctype == "start") {
                                sPoint = new NGeometry.Point(x, y);
                                sPoint.name=name;
                                sPoint.stat="";
                            } else {
                                ePoint = new NGeometry.Point(x, y);
                                ePoint.name=name;
                                ePoint.stat="";
                            };
                            scrollPanel.dispose();
                            scrollPanel = null;
                        };
                        item.appendChild(img);

                        item.onmouseover = function() {
                            this.className = "NetworkContentListItemActive";
                            this.marker.events.triggerEvent("mouseover");
                        };
                        item.onmouseout = function() {
                            this.className = "NetworkContentListItem";
                            this.marker.events.triggerEvent("mouseout");
                        };
                        item.onclick = function() {
                            this.marker.events.triggerEvent("click");
                        };
                        var ico = new NIcon("IMG/list/b_" + (i + 1) + ".png", new NSize(28, 43), new NPixel(-14, -36));
                        var latlng = null;
                        if (Global.NEWMAP) {
                            latlng = new NLatLng(parseFloat(content[i].geometry.coordinates[0]), parseFloat(content[i].geometry.coordinates[1]));
                        } else {
                            latlng = new NLatLng(parseFloat(content[i]["LONGITUDE"]), parseFloat(content[i]["LATITUDE"]));
                        }
                        var marker = new NMarker(latlng, ico);
                        markers.addMarker(marker);

                        marker.events.bind("mouseover", marker, function() { this.setURL(this.icon.url.replace("b_", "r_")); this.icon.imageDiv.style.zIndex = "5000"; });
                        marker.events.bind("mouseout", marker, function() { this.setURL(this.icon.url.replace("r_", "b_")); this.icon.imageDiv.style.zIndex = ""; });
                        marker.events.bind("click", marker, function() { Map.panTo(this.latlng); });

                        markerList.push(marker);
                        item.marker = marker;
                        contentList.appendChild(item);
                        pct.addComponent(new NGeometry.Point(latlng.lon, latlng.lat));
                    }
                    scrollPanel.update();
                    if (pct.components.length > 1) {
                        var ext = pct.getBounds();
                        Map.zoomToExtent(ext);
                    } else {
                        var point = pct.components[0];
                        Map.panTo(new NLatLng(point.x, point.y));
                    }
                    /*构建pagelist*/
                    BuildPageList();
                    break;
                case "busy":
                    contentList.innerHTML = msg;
                    break;
                case "fail":
                    contentList.innerHTML = msg;
                    break;
            }
        };

        /*返回对象，保存闭包的许多函数*/
        var retObj = {};
        retObj.Query = function() {
            content = null;
            totalPage = -1;
            isAlive = true;
            if (_timer != null) {
                clearInterval(_timer);
                _timer = null;
            }
            QueryObject.page = page;
            if (querytype == "key") {
                lay.query(QueryObject);
            }
            else {
                lay.spatialQuery("bbox", QueryObject);
            }
            showResult("busy", Global.html.BUSY);
            markers.clearMarkers();
            for (var i = 0; i < markerList.length; i++) {
                markerList[i].dispose();
            }
            markerList = [];
            cDlg ? Map.removeDialog(cDlg) : null;
            /*查询之后，等待显示结果，如果时间太长则abort掉查询*/
            var _time = 0;
            _timer = setInterval(function() {
                _time++;
                if (content != null) {
                    /*函数返回了*/
                    clearInterval(_timer);
                    _timer = null;
                    isAlive = false;
                    if ((ctype == "start" && sPoint != null) || (ctype == "end" && ePoint != null)) {
                        /*do nothing*/
                    } else {
                        showResult("success", "");
                    }
                } else {
                    if (_time >= Global.COUNT) {
                        /*当前查询已经被抛弃了*/
                        clearInterval(_timer);
                        clearInterval(_outtimer);
                        _timer = null;
                        _couttimer = null;
                        isAlive = false;
                        showResult("fail", Global.html.TIMEOUT);
                    }
                }
            }, Global.delay);
        };
        /*下一页*/
        retObj.next = function() {
            if (page < totalPage) {
                page++;
                retObj.Query();
            } else {
                if (Global.debug) {
                    console.log("当前已经是末页");
                }
            }
        };
        /*上一页*/
        retObj.prev = function() {
            if (page > 1) {
                page--;
                retObj.Query();
            } else {
                if (Global.debug) {
                    console.log("当前已经是首页");
                }
            }
        };
        /*跳到第p页*/
        retObj.go = function(p) {

            page = p;
            retObj.Query();

        };
        retObj.refresh = function() {
            retObj.Query();
        };
        retObj.abort = function() {
            anchor.onclick();
        };

        /*列表创建函数*/
        function BuildPageList() {
            /*最快捷的清空内容*/
            pageList = document.createElement("div");
            pageList.className = "QueryPageList";
            contentList.appendChild(pageList);

            pageList.innerHTML = "";
            if (totalPage == 0) {
                return;
            }
            var div = document.createElement("div");
            div.className = "PageList";

            var entity = document.createElement("a");
            entity.className = "QueryPageItem";
            entity.innerText = "首页";

            entity.onclick = function() {
                retObj.go(1);
            };
            div.appendChild(entity);
            /*首页部分完成*/

            /*页码的开始部分和结束部分，要判断是否小于0或者超过最大值*/

            var startNum;
            var endNum;
            if (totalPage >= 5) {
                if (page <= 3) {
                    /*当前页码还是在1-3之间时，如果-2就变成负值了*/
                    startNum = 1;
                    endNum = 5;

                } else if (page >= totalPage - 2) {
                    /*原理和上边类似*/
                    endNum = totalPage;
                    startNum = totalPage - 4;

                } else {
                    /*这是最一般的情况*/
                    startNum = page - 2;
                    endNum = page + 2;
                }

            } else {
                /*页数不够5页，就把全部显示出来*/
                startNum = 1;
                endNum = totalPage;
            };
            for (var i = startNum; i <= endNum; i++) {
                entity = document.createElement("a");
                entity.className = "QueryPageItem";
                entity.innerText = i;
                if (i == page) {
                    /*当前页面鼠标动作不反应，单击也不反应*/
                    entity.style.backgroundColor = "rgb(161,201,200)";
                }
                else {
                    var index = i;
                    entity.onclick = function() {
                        /*这个部分闭包不好使，还没想出对策，直接用标签值代替*/
                        var index = parseInt(this.innerText);
                        retObj.go(index);
                    };
                }
                div.appendChild(entity);
            };
            /*中间部分*/
            entity = document.createElement("a");
            entity.className = "QueryPageItem";
            entity.innerText = "末页";
            entity.onclick = function() {
                retObj.go(totalPage);

            };
            div.appendChild(entity);
            pageList.appendChild(div);

        };
        Global.handler["Query"] = retObj;
        retObj.go(1);
    };

    var _getStation = function(pt) {
        /*将查询字段和关键词分段*/
        QueryObject = { "spatialQueryFilter": stat.queryfields+" LIKE '%'", "callback": callback, "coords": pt.x + "," + pt.y, "buffer": 0.0036, "maxfeatures": maxfeatures };

        /*清除以前的查询结果*/
        container.innerHTML = "";
        var totalContainer = document.createElement("div");
        totalContainer.className = "QueryContainer";
        totalContainer.id = "_con_" + Math.random();
        totalContainer.style.cssText = "display:block;width:" + container.clientWidth + "px;height:" + container.clientHeight + "px;";
        container.appendChild(totalContainer);
        var returnDiv = document.createElement("div");
        returnDiv.className = "QueryReturnDiv";
        var msg = document.createElement("span");
        if (ctype == "start") {
            msg.innerHTML = "正在搜索附近公交站";
        } else {
            msg.innerHTML = "正在搜索附近公交站";
        }
        returnDiv.appendChild(msg);
        var anchor = document.createElement("a");
        anchor.title = "点击返回主页面板";
        anchor.innerHTML = "返回首页";
        returnDiv.appendChild(anchor);
        anchor.onclick = function() {
            isAlive = false;
            clearInterval(_outtimer);
            clearInterval(_timer);
            markers.clearMarkers();
            for (var i = 0; i < markerList.length; i++) {
                markerList[i].dispose();
            }
            fealayer.disposeFeatures();
            Map.removeLayer(markers);
            Map.removeLayer(fealayer);
            scrollPanel.dispose();
            scrollPanel = null;
            container.style.display = "none";
            prevDiv.style.display = "block";
            Global.handler["Query"] = null;
        };

        totalContainer.appendChild(returnDiv);
        contentList = document.createElement("div");
        contentList.className = "QueryContentList";
        totalContainer.appendChild(contentList);

        scrollPanel = new baidu.ui.ScrollPanel({ container: totalContainer.id, overflow: "overflow-y" });
        scrollPanel.render(totalContainer.id);

        function callback(res) {
            /*判断总页数有没有记录*/
            if (!isAlive) {
                return;
            }
            if (Global.NEWMAP) {
                content = res.content.features;
                if (totalPage == -1) {
                    totalPage = res.header.pages;
                }
            } else {
                content = res.content;
                if (totalPage == -1) {
                    totalPage = res.total;
                }
            }
            if (totalPage == 0) {
                if (ctype == "start") {
                    showResult("fail","起点500米范围内没有找到公交站点")

                } else {
                    showResult("fail","终点500米范围内没有找到公交站点")
                }
                scrollPanel.dispose();
                return;
            }
            /*先进行一步筛选,查找最近的点*/
            if (Global.NEWMAP) {
                var len = Math.pow(content[0].geometry.coordinates[0] - pt.x, 2) + Math.pow(content[0].geometry.coordinates[1] - pt.y, 2);
                var min = 0;
                for (var i = 1; i < content.length; i++) {
                    var fea = content[i].geometry.coordinates;
                    var dis = Math.pow(fea[0] - pt.x, 2) + Math.pow(fea[1] - pt.y, 2);
                    if (dis < len) {
                        min = i;
                        len = dis;
                    }
                }
                if (ctype == "start") {
                    sPoint.stat=content[min].properties[stat.displayfields];
                } else {
                    ePoint.stat=content[min].properties[stat.displayfields];
                }
                scrollPanel.dispose();
            } else {
                var len = Math.pow(parseInt(content[0]["LONGITUDE"]) - pt.x, 2) + Math.pow(parseInt(content[0]["LATITUDE"]) - pt.y, 2);
                var min = 0;
                for (var i = 1; i < content.length; i++) {
                    var x = parseFloat(content[i]["LONGITUDE"]);
                    var y = parseFloat(content[i]["LATITUDE"]);
                    var dis = Math.pow(x - pt.x, 2) + Math.pow(y - pt.y, 2);
                    if (dis < len) {
                        min = i;
                        len = dis;
                    }
                }
                if (ctype == "start") {
                    Global.start.stat=content[min].properties[displayfield];

                } else {
                    Global.end.stat=content[min].properties[displayfield];
                }
                scrollPanel.dispose();
            }
        };

        function showResult(type, msg) {
            switch (type) {
                case "busy":
                    contentList.innerHTML = msg;
                    break;
                case "fail":
                    contentList.innerHTML = msg;
                    break;
            }
        };
        /*返回对象，保存闭包的许多函数*/
        var retObj = {};
        retObj.Query = function() {
            content = null;
            isAlive = true;
            totalPage = -1;
            if (_timer != null) {
                clearInterval(_timer);
                _timer = null;
            }
            if (ctype == "start") {
                msg.innerHTML = "正在搜索附近公交站";
            }
            else if (ctype == "end") {
                msg.innerHTML = "正在搜索附近公交站";
            }

            stat.spatialQuery("point", QueryObject);
            showResult("busy", Global.html.BUSY);
            markers.clearMarkers();
            for (var i = 0; i < markerList.length; i++) {
                markerList[i].dispose();
            }
            markerList = [];
            /*查询之后，等待显示结果，如果时间太长则abort掉查询*/
            var _time = 0;
            _timer = setInterval(function() {
                _time++;
                if (content != null) {
                    /*函数返回了*/
                    if (isAlive) {
                        clearInterval(_timer);
                        _timer = null;
                        isAlive = false;
                    }
                } else {
                    if (_time >= Global.COUNT || !isAlive) {
                        /*当前查询已经被抛弃了*/
                        isAlive = false;
                        showResult("fail", Global.html.TIMEOUT);
                        clearInterval(_timer);
                        clearInterval(_outtimer);
                        _timer = null;
                        _outtimer = null;
                    }
                }
            }, Global.delay);
        };
        /*下一页*/
        retObj.next = function() {
            if (page < totalPage) {
                page++;
                retObj.Query();
            } else {
                if (Global.debug) {
                    console.log("当前已经是末页");
                }
            }
        };
        /*上一页*/
        retObj.prev = function() {
            if (page > 1) {
                page--;
                retObj.Query();
            } else {
                if (Global.debug) {
                    console.log("当前已经是首页");
                }
            }
        };
        /*跳到第p页*/
        retObj.go = function(p) {
            page = p;
            retObj.Query();
        };
        retObj.refresh = function() {
            retObj.Query();
        };
        retObj.abort = function() {
            anchor.onclick();
        };
        Global.handler["Query"] = retObj;
        retObj.go(1);
    };

    var _getBusArc = function() {
        /*清除以前的查询结果*/
        Global.handler["Query"] = null;
        container.innerHTML = "";
        var totalContainer = document.createElement("div");
        totalContainer.className = "QueryContainer";
        totalContainer.id = "_con_" + Math.random();
        totalContainer.style.cssText = "display:block;width:" + container.clientWidth + "px;height:" + container.clientHeight + "px;";
        container.appendChild(totalContainer);
        var returnDiv = document.createElement("div");
        returnDiv.className = "QueryReturnDiv";
        var msg = document.createElement("span");
        msg.innerHTML = "正在搜索换乘方案";

        returnDiv.appendChild(msg);
        var anchor = document.createElement("a");
        anchor.title = "返回主页面板";
        anchor.innerHTML = "返回首页";
        returnDiv.appendChild(anchor);

        anchor.onclick = function() {
            isAlive = false;
            if (_timer != null) {
                clearInterval(_timer);
                _timer = null;
            }
            if (_outtimer != null) {

                clearInterval(_outtimer);
                _outtimer = null;
            }
            markers.clearMarkers();
            fealayer.disposeFeatures();
            Map.removeLayer(markers);
            Map.removeLayer(fealayer);
            for (var i = 0; i < markerList.length; i++) {
                markerList[i].dispose();
            };
            scrollPanel.dispose();
            container.style.display = "none";
            prevDiv.style.display = "block";
            Global.handler["Query"] = null;
        };

        totalContainer.appendChild(returnDiv);
        contentList = document.createElement("div");
        contentList.className = "QueryContentList";
        totalContainer.appendChild(contentList);

        scrollPanel = new baidu.ui.ScrollPanel({ container: totalContainer.id, overflow: "overflow-y" });
        scrollPanel.render(totalContainer.id);

        function _callback(res) {

            msg.innerHTML = "公交搜索结果";
            if (res.total == 0) {
                showResult("fail", Global.html.NODATA);
            } else {
                networkResult = res.content;
            }
        };
        function showResult(type, msg) {
            switch (type) {
                case "success":
                    contentList.innerHTML = "";
                    for (var i = 0, len = networkResult.length; i < len; i++) {
                        var div = document.createElement("div");
                        div.className = "NetworkResultListItem";
                        var img = document.createElement("div");
                        img.className = "NetworkResultListItemIMG";
                        div.appendChild(img);
                        var span = document.createElement("span");
                        span.className = "NetworkResultListItemSpan";
                        span.innerHTML = "方案" + (i + 1) + "&nbsp;&nbsp;" + (networkResult[i].SCASE.LENGTH / 1000).toFixed(1) + "千米";
                        div.appendChild(span);
                        var switchMSG = document.createElement("div");
                        switchMSG.className = "BusResultMSG";
                        for (var j = 0; j < networkResult[i].SCASE.MSGS.length; j++) {
                            var sp = document.createElement("div");

                            sp.innerHTML = networkResult[i].SCASE.MSGS[j];

                            switchMSG.appendChild(sp);
                        }

                        div.val = i;
                        div.msg = switchMSG;
                        div.onmouseover = function() {
                            this.className = "NetworkResultListItemActive";
                        };
                        div.onmouseout = function() {
                            this.className = "NetworkResultListItem";
                        };
                        div.onclick = function() {
                            var scase = networkResult[parseInt(this.val)].SCASE;
                            var arcs = scase.ARCS;
                            var aid = arcs.join(",").split(",");

                            function _cb(res) {
                                var parser = new NParser.GeoJSON();
                                arcarray = parser.read(res.content);
                                fealayer.addFeatures(arcarray);
                                var ext = fealayer.getLayerExtent();
                                Map.zoomToExtent(ext);

                                /*添加起始点的标注*/
                                var ico = new NIcon("IMG/common/s.png", new NSize(23, 35), new NPixel(-12, -35));
                                var latlng = new NLatLng(scase.PTS[0].x, scase.PTS[0].y);
                                var mark = new NMarker(latlng, ico);
                                markers.addMarker(mark);
                                markerList.push(mark);

                                var las = scase.PTS.length-1;
                                ico = new NIcon("IMG/common/e.png", new NSize(23, 35), new NPixel(-12, -35));
                                latlng = new NLatLng(scase.PTS[las].x, scase.PTS[las].y);
                                mark = new NMarker(latlng, ico);
                                markers.addMarker(mark);
                                markerList.push(mark);
                            }
                            var str = "";
                            for (var j = 0; j < aid.length; j++) {
                                if (j != 0) {
                                    str += " OR ";
                                }
                                str += "ARCID=" + aid[j];
                            }
                            ArcsObject = { "searchstring": str, "callback": _cb, "maxfeatures": 500 };
                            fealayer.disposeFeatures();
                            markers.clearMarkers();
                            for (var i = 0; i < markerList.length; i++) {
                                markerList[i].dispose();
                            }
                            markerList = [];
                            arcarray = [];
                            isAlive = true;
                            arc.query(ArcsObject);
                        };
                        contentList.appendChild(div);
                        contentList.appendChild(switchMSG);
                        scrollPanel.update();
                    };
                    break;
                case "busy":
                    contentList.innerHTML = msg;
                    break;
                case "fail":
                    contentList.innerHTML = msg;
                    break;
            }
        };

        //闭包函数对象变量
        var retObj = {};
        retObj.query = function() {
            var str = "SNAME='" + sPoint.stat + "' AND ENAME='" + ePoint.stat + "' ORDER BY RCOUNT,ACOUNT,LENGTH";
            markers.clearMarkers();
            for (var i = 0; i < markerList.length; i++) {
                markerList[i].dispose();
            }
            markerList = [];
            fealayer.disposeFeatures();
            var NetworkObject = { "searchstring": str, "callback": _callback };

            showResult("busy", Global.html.BUSY);
            route.query(NetworkObject);
            if (_timer != null) {
                clearInterval(_timer);
                _timer = null;
            }

            var _time = 0;
            isAlive = true;

            _timer = setInterval(function() {
                if (networkResult != null) {
                    if (isAlive) {
                        clearInterval(_timer);
                        _timer = null;
                        _time = 0;
                        isAlive = false;
                        showResult("success", "");
                    }
                } else {
                    _time++;
                    if (_time > Global.COUNT) {
                        showResult("fail", Global.html.TIMEOUT);
                        clearInterval(_timer);
                        _timer = null;
                        _time = 0;
                        isAlive = false;
                    }
                }
            }, Global.delay);
        };
        retObj.refresh = function() {

            retObj.query();
        };
        retObj.abort = function() {
            anchor.onclick();
        };
        Global.handler["Query"] = retObj;
        retObj.query();

    };
    
    
    /*这里不能进行延迟判断，因为当用户选择起终点的时候，这个时间段是不可预测的*/
    if (sPoint == null) {
        _getPosition(sname);
    }
    _outtimer = setInterval(function() {
        if (sPoint != null) {
            clearInterval(_outtimer);
            _outtimer = null;
            ctype = "end";
            if (ePoint == null) {
                _getPosition(ename);
            }
            _outtimer = setInterval(function() {
                if (ePoint != null) {
                    clearInterval(_outtimer);
                    _outtimer = null;
                    ctype="start";
                    _getStation(sPoint);
                    _outtimer=setInterval(function(){
                        if(sPoint.stat!=""){
                            clearInterval(_outtimer);
                            _outtimer = null;
                            ctype="end";
                            _getStation(ePoint)
                            _outtimer=setInterval(function(){
                                if(ePoint.stat!=""){
                                    clearInterval(_outtimer);
                                    _outtimer=null;
                                    _getBusArc();
                                }
                            },Global.delay);
                        }
                    },Global.delay);
                }
            }, Global.delay);
        }
    }, Global.delay); 
};



Global.Symbol["Network"] = {
    fillColor: "green",
    fillOpacity: 0.7,
    strokeColor: "green",
    strokeOpacity: 0.7,
    strokeLinecap: "round",
    strokeWidth: 2,
    strokeDashstyle: "solid",
    pointRadius:2,
    pointerEvents: "visiblePainted",
    cursor: "inherit"
};
Global.Symbol["PolyLabel"] = {
    fillColor: "blue",
    fillOpacity: 0.5,
    hoverFillColor: "white",
    hoverFillOpacity: 0.8,
    strokeColor: "blue",
    strokeOpacity: 0.5,
    strokeLinecap: "round",
    strokeWidth: 1,
    strokeDashstyle: "solid",
    hoverStrokeColor: "red",
    hoverStrokeOpacity: 1,
    hoverStrokeWidth: 0.2,
    pointRadius: 4,
    hoverPointRadius: 1,
    hoverPointUnit: "%"
};

Global.Symbol["PolyLabelActivate"] = {
    fillColor: "red",
    fillOpacity: 0.5,
    hoverFillColor: "white",
    hoverFillOpacity: 0.8,
    strokeColor: "red",
    strokeOpacity: 0.5,
    strokeLinecap: "round",
    strokeWidth: 1,
    strokeDashstyle: "solid",
    hoverStrokeColor: "red",
    hoverStrokeOpacity: 1,
    hoverStrokeWidth: 0.2,
    pointRadius: 4,
    hoverPointRadius: 1,
    hoverPointUnit: "%"
};


Global.Symbol["NetworkActivate"] = {
    fillColor: "red",
    fillOpacity: 0.9,
    strokeColor: "red",
    strokeOpacity: 0.9,
    strokeLinecap: "round",
    strokeWidth: 4,
    strokeDashstyle: "solid",
    pointRadius:3,
    pointerEvents: "visiblePainted",
    cursor: "inherit"
};
//*专题模块搜索*/
/*模糊搜索函数*/


function TourAgencyQuery(div, prevDiv) {
    if (Global.state == "3d") {
        alert("请切换回二维地图显示方式");
        return false;
    }
    var lay = Global.Module["旅行社"];
    var keys = lay.queryfields;
    var displayfield = lay.displayfields;
    var querytype = "key";
    var qstr = "";
    var page = 1;
    var totalPage = -1;
    var maxfeatures = 10;
    var QueryObject = {};
    var container = document.getElementById(div);
    var prevDiv = document.getElementById(prevDiv);
    prevDiv.style.display = "none";
    container.style.display = "block";
    var contentList = null;
    var pageList = null;
    var content = null;
    var searchPanel = null;
    var searchIpt = null;
    var searchBtn = null;
    var imgcol = null;
    var markerList = [];
    var Map = Global.map;
    var cDlg = null;
    var isAlive = false;
    var markers = Global.lays["POI图层"];
    var buffers = Global.lays["Buffer图层"];
    var _timer = null;
    var scrollPanel = null;

    markers.clearMarkers();
    buffers.disposeFeatures();
    Map.addLayer(buffers);
    Map.addLayer(markers);
    /*将查询字段和关键词分段*/

    /*构造查询语句where=*,关键词分词还未实现，用一个查询语句对多个字段进行查询*/

    function _getKey() {
        var qs = qstr.replace(/\s+/, "%");
        var keysa = keys.split(",");
        var str = "";
        for (var i = 0, j = keysa.length; i < j; i++) {
            if (i != 0) {
                str += " OR ";
            }
            str += keysa[i] + " LIKE ";
            str += "'%" + qs + "%'";
        };
        if (!Global.NEWMAP) {
            str += " ORDER BY LENGTH(" + keysa[0] + ")";
        }
        return str;
    };

    if (querytype == "key") {

        QueryObject = { "searchstring": _getKey(), "callback": callback, "page": page, "maxfeatures": maxfeatures };

    } else if (querytype = "buffer") {

        QueryObject = { "spatialQueryFilter": _getKey(), "callback": callback, "page": page, "maxfeatures": maxfeatures, "coords": Global.map.getBounds().toBBOX() };
    };

    /*清除以前的查询结果*/
    container.innerHTML = "";
    var totalContainer = document.createElement("div");
    totalContainer.className = "QueryContainer";
    totalContainer.id = "_con_" + Math.random();
    totalContainer.style.cssText = "display:block;width:" + container.clientWidth + "px;height:" + container.clientHeight + "px;";
    container.appendChild(totalContainer);
    var returnDiv = document.createElement("div");
    returnDiv.className = "QueryReturnDiv";
    var msg = document.createElement("span");
    msg.innerHTML = "正在搜索之中";
    returnDiv.appendChild(msg);
    var anchor = document.createElement("a");
    anchor.title = "返回前一面板";
    anchor.innerHTML = "返回专题";
    returnDiv.appendChild(anchor);

    anchor.onclick = function() {
        isAlive = false;
        if (_timer != null) {
            clearInterval(_timer);
            _timer = null;
        }
        markers.clearMarkers();
        buffers.disposeFeatures();
        for (var i = 0; i < markerList.length; i++) {
            markerList[i].dispose();
        }
        Map.removeLayer(markers);
        Map.removeLayer(buffers);
        scrollPanel.dispose();
        cDlg ? Map.removeDialog(cDlg) : null;
        container.style.display = "none";
        prevDiv.style.display = "block";
        Global.handler["Query"] = null;
    };

    searchPanel = document.createElement("div");
    searchPanel.className = "ThemeSearchPanel";
    searchIpt = document.createElement("input");
    searchIpt.type = "text";
    searchIpt.className = "searchInput";
    searchPanel.appendChild(searchIpt);
    searchBtn = document.createElement("input");
    searchBtn.type = "button";
    searchBtn.style.cssText = "width:40px;height:24px;display:inline-block;";
    searchBtn.value = "筛选";
    searchBtn.className = "searchBtn";
    searchBtn.onclick = function() {
        var val = searchIpt.value.trim();
        if (val == "") {
            return;
        } else {
            qstr = val;
        }
        totalPage = -1;
        retObj.go(1);
    };
    searchPanel.appendChild(searchBtn);
    returnDiv.appendChild(searchPanel);
    totalContainer.appendChild(returnDiv);
    contentList = document.createElement("div");
    contentList.className = "QueryContentList";
    totalContainer.appendChild(contentList);
    scrollPanel = new baidu.ui.ScrollPanel({ container: totalContainer.id, overflow: "overflow-y" });
    scrollPanel.render(totalContainer.id);

    function callback(res) {
        /*判断总页数有没有记录*/
        if (!isAlive) {
            return;
        }
        if (Global.NEWMAP) {
            if (totalPage == -1) {
                totalPage = res.header.pages;
            }
            if (totalPage == 0) {
                isAlive = false;
                clearInterval(_timer);
                _timer = null;
                showResult("fail", Global.html.NODATA);
            }
            content = res.content.features;
        } else {
            if (totalPage == -1) {
                totalPage = res.total;
            }
            if (totalPage == 0) {
                isAlive = false;
                clearInterval(_timer);
                _timer = null;
                showResult("fail", Global.html.NODATA);
            }
            content = res.content;
        }

        /*获取图片列表*/
        if (totalPage != 0) {
            var reqstr = "";
            for (var i = 0; i < content.length; i++) {
                if (Global.NEWMAP) {
                    if (i != 0) {
                        reqstr += ",";
                    }
                    reqstr += content[i].properties[ADDCODE];
                } else {
                    if (i != 0) {
                        reqstr += ",";
                    }
                    reqstr += content[i][ADDCODE];
                }
            }
            NCrossDomainRequest(Global.urls["URL_RESOURCE"] + "type=agency&ids=" + reqstr, function(res) { imgcol = res; });
        }

        msg.innerHTML = "总共搜索到" + totalPage + "页内容";
    };



    function _circleBuffer(latlng, radius) {
        buffers.disposeFeatures();
        /*将km的半径转换成度*/
        radius = radius * NINCHES_PER_UNIT["km"] / NINCHES_PER_UNIT["dd"];
        var center = new NGeometry.Point(latlng.lon, latlng.lat);
        var circle = NGeometry.Polygon.createRegularPolygon(center, radius, 200, null);
        var fea = new NVectorFeature(circle);
        buffers.addFeatures([fea]);
    };
    function _changeBuffer(latlng, radius) {
        buffers.disposeFeatures();
        radius = radius * NINCHES_PER_UNIT["km"] / NINCHES_PER_UNIT["dd"];
        var center = new NGeometry.Point(latlng.lon, latlng.lat);
        var circle = NGeometry.Polygon.createRegularPolygon(center, radius, 200, null);
        var fea = new NVectorFeature(circle);
        buffers.addFeatures([fea]);
        var ext = buffers.getLayerExtent();
        Global.map.zoomToExtent(ext);
    };
    function _buffer(keys) {
        var ext = buffers.getLayerExtent();
        isAlive = false;
        if (_timer != null) {
            clearInterval(_timer);
            _timer = null;
        }
        markers.clearMarkers();
        buffers.disposeFeatures();
        for (var i = 0; i < markerList.length; i++) {
            markerList[i].dispose();
        }
        Map.removeLayer(markers);
        Map.removeLayer(buffers);
        cDlg ? Map.removeDialog(cDlg) : null;
        scrollPanel.dispose();
        Global.handler["Query"] = null;
        FuzzyQuery(keys, "buffer", "keyPanel", "facePanel", ext);
    };


    function _setStart(latlng, name, val) {
        if (val == "") {
            alert("请输入终点");
            return;
        }
        isAlive = false;
        if (_timer != null) {
            clearInterval(_timer);
            _timer = null;
        }
        markers.clearMarkers();
        buffers.disposeFeatures();
        for (var i = 0; i < markerList.length; i++) {
            markerList[i].dispose();
        }
        Map.removeLayer(markers);
        Map.removeLayer(buffers);
        cDlg ? Map.removeDialog(cDlg) : null;
        scrollPanel.dispose();
        Global.handler["Query"] = null;

        Global.start = { "x": latlng.lon, "y": latlng.lat, "name": name, "sure": true };
        Global.end = null;
        NetworkQuery(name, val, "keyPanel", "yfPanel");
    };
    function _setEnd(latlng, name, val) {
        if (val == "") {
            alert("请输入终点");
            return;
        }
        isAlive = false;
        if (_timer != null) {
            clearInterval(_timer);
            _timer = null;
        }
        markers.clearMarkers();
        buffers.disposeFeatures();
        for (var i = 0; i < markerList.length; i++) {
            markerList[i].dispose();
        }
        Map.removeLayer(markers);
        Map.removeLayer(buffers);
        cDlg ? Map.removeDialog(cDlg) : null;
        scrollPanel.dispose();
        Global.handler["Query"] = null;
        Global.start = null;
        Global.end = { "x": latlng.lon, "y": latlng.lat, "name": name, "sure": true };
        NetworkQuery(val, name, "keyPanel", "yfPanel");
    };


    function showResult(type, msg) {
        switch (type) {
            case "success":
                contentList.innerHTML = "";
                var displayArray = displayfield.split(",");
                var pct = new NGeometry.MultiPoint();
                for (var i = 0, len = content.length; i < len; i++) {
                    var item = document.createElement("div");
                    item.className = "QueryContentListItem";
                    /*添加图片标头*/
                    var img = document.createElement("img");
                    img.className = "QueryContentListTitle";
                    img.src = "IMG/list/b_" + (i + 1) + ".png";
                    item.appendChild(img);
                    /*添加文字信息*/
                    var div = document.createElement("div");
                    div.className = "QueryContentListText";
                    var span = null;
                    var addcode = null;
                    for (var j = 0; j < displayArray.length; j++) {
                        span = document.createElement("span");
                        if (Global.NEWMAP) {
                            span.innerText = content[i].properties[displayArray[j]];

                        } else {
                            span.innerText = content[i][displayArray[j]];

                        }
                        div.appendChild(span);
                    }
                    /*添加兴趣点图片*/
                    if (Global.NEWMAP) {
                        addcode = content[i].properties[ADDCODE];

                    } else {
                        addcode = content[i][ADDCODE];
                    }

                    item.appendChild(div);
                    img = document.createElement("img");
                    img.className = "QueryContentListIMG";
                    if (imgcol[i][addcode].length != 0) {
                        img.src = imgcol[i][addcode][0];

                    } else {
                        img.src = "IMG/common/nopic.jpg";

                    }
                    item.appendChild(img);
                    item.onmouseover = function() {
                        this.className = "QueryContentListItemActive";
                        this.marker.events.triggerEvent("mouseover");
                    };
                    item.onmouseout = function() {
                        this.className = "QueryContentListItem";
                        this.marker.events.triggerEvent("mouseout");
                    };
                    item.onclick = function() {
                        this.marker.events.triggerEvent("click");
                    };

                    var ico = new NIcon("IMG/list/b_" + (i + 1) + ".png", new NSize(28, 43), new NPixel(-14, -36));
                    var latlng = null;
                    if (Global.NEWMAP) {
                        latlng = new NLatLng(parseFloat(content[i].geometry.coordinates[0]), parseFloat(content[i].geometry.coordinates[1]));

                    } else {

                        latlng = new NLatLng(parseFloat(content[i]["LONGITUDE"]), parseFloat(content[i]["LATITUDE"]));

                    }
                    var marker = new NMarker(latlng, ico);
                    markers.addMarker(marker);
                    var dlgstr = "";
                    var barid = "_scroll_" + i;
                    var iptid = "_ipt_" + i;
                    var msgid = "_msg_" + i;
                    var btnid = "_btn_" + i;
                    var siptid = "_sipt_" + i;
                    var eiptid = "_eipt_" + i;
                    var sbtnid = "_sbtn_" + i;
                    var ebtnid = "_ebtn_" + i;
                    var dlgid = "";
                    if (Global.NEWMAP) {
                        dlgid = content[i].properties[SHORTNAME];
                        dlgstr = "<div class='AGENCY'>";
                        dlgstr += "<div class='AGENCYTitle'>" + content[i].properties[SHORTNAME] + "</div>";
                        dlgstr += "<div class='AGENCYContain'>";
                        dlgstr += "<div class='HOTELText'>";
                        dlgstr += "<span>地址：" + content[i].properties[ADDRESS] + "</span>";
                        dlgstr += "<span>电话：" + ((content[i].properties[TELEPHONE] == "") ? "暂无" : content[i].properties[TELEPHONE]) + "</span>";
                        dlgstr += "<span>执照：" + ((content[i].properties[LICENCE] == "") ? "暂无" : content[i].properties[LICENCE]) + "</span>";
                        dlgstr += "<span><a style='text-decoration:none;padding-left:5px;' href='http://www.baidu.com/s?wd=河源+" + content[i].properties[SHORTNAME] + "' target='_blank'>更多信息</a></span>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='AGENCYImage'>";
                        if (imgcol[i][addcode].length != 0) {
                            dlgstr += "<img src='" + imgcol[i][addcode][0] + "' " + " alt='" + imgcol[i][addcode].join(",") + "' onclick='ExploreImage(this.alt);' />"

                        } else {
                            dlgstr += "<img src='IMG/common/nopic.jpg' />";
                        }

                        dlgstr += "</div>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='AGENCYMeno' title='" + ((content[i].properties[NOTES] == "") ? "" : content[i].properties[NOTES]) + "'>";
                        dlgstr += (content[i].properties[NOTES] == "") ? "" : (content[i].properties[NOTES].substr(0, 80) + "…");
                        dlgstr += "</div>";
                        dlgstr += "<div class='ThemeTool'>";
                        dlgstr += "<a href='javascript:void(0);' style='margin-left:20px;'>周边搜索</a>";
                        dlgstr += "<a href='javascript:void(0);'>从这出发</a>";
                        dlgstr += "<a href='javascript:void(0);'>到这里去</a>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='ThemeBuffer'>";
                        dlgstr += "<div class='ThemeBufferKeys'>";
                        for (var j = 0; j < Global.bufferwords.length; j++) {
                            dlgstr += "<a href='javascript:void(0);'>" + Global.bufferwords[j] + "</a>";
                        }
                        dlgstr += "<input type='text' id='" + iptid + "' style='width:60px;height:16px;margin:1px 1px 1px 1px;border:solid 1px #82B9B4;' />";
                        dlgstr += "<input type='button' id='" + btnid + "' value='搜索' style='width:40px;height:20px;margin:0px 2px;padding:0px;border:solid 1px #82B9B4;display:inline-block;' />";
                        dlgstr += "<span style='color:#E78F08;width:14px;text-align:right;display:inline-block;margin:0px;padding:0px;' id='" + msgid + "'>2</span>公里";
                        dlgstr += "</div>";
                        dlgstr += "<div class='ThemeBufferBar' id='" + barid + "'>";
                        dlgstr += "</div>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='ThemeSetStart'>";
                        dlgstr += "<span style='color:#333;font-size:12px;height:16px;width:70px;text-align:right;display:inline-block;margin:12px 0px;padding:0px;'>输入终点：</span>";
                        dlgstr += "<input type='text' id='" + siptid + "' style='display:inline-block;width:110px;height:16px;margin:11px 1px 11px 1px;border:solid 1px #82b9b4;' />";
                        dlgstr += "<input type='button' id='" + sbtnid + "' value='查询' style='width:40px;height:20px;margin:10px 13px 10px 3px;padding:0px;border:solid 1px #82B9B4;display:inline-block;' />";
                        dlgstr += "</div>";
                        dlgstr += "<div class='ThemeSetEnd'>";
                        dlgstr += "<span style='color:#333;font-size:12px;height:16px;width:70px;text-align:right;display:inline-block;margin:12px 0px;padding:0px;'>输入起点：</span>";
                        dlgstr += "<input type='text' id='" + eiptid + "' style='display:inline-block;width:110px;height:16px;margin:11px 1px 11px 1px;border:solid 1px #82b9b4;' />";
                        dlgstr += "<input type='button' id='" + ebtnid + "' value='查询' style='width:40px;height:20px;margin:10px 13px 10px 3px;padding:0px;border:solid 1px #82B9B4;display:inline-block;' />";
                        dlgstr += "</div>";
                        dlgstr += "</div>";
                    } else {
                        dlgid = content[i][SHORTNAME];
                        dlgstr = "<div class='AGENCY'>";
                        dlgstr += "<div class='AGENCYTitle'>" + content[i][SHORTNAME] + "</div>";
                        dlgstr += "<div class='AGENCYContain'>";
                        dlgstr += "<div class='HOTELText'>";
                        dlgstr += "<span>地址：" + content[i][ADDRESS] + "</span>";
                        dlgstr += "<span>电话：" + ((content[i][TELEPHONE] == "") ? "暂无" : content[i][TELEPHONE]) + "</span>";
                        dlgstr += "<span>执照：" + ((content[i]["LICENCE"] == "") ? "暂无" : content[i]["LICENCE"]) + "</span>";
                        dlgstr += "<span><a style='text-decoration:none;padding-left:5px;' href='http://www.baidu.com/s?wd=河源+" + content[i][SHORTNAME] + "' target='_blank'>更多信息</a></span>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='AGENCYImage'>";
                        if (imgcol[i][addcode].length != 0) {
                            dlgstr += "<img src='" + imgcol[i][addcode][0] + "' " + " alt='" + imgcol[i][addcode].join(",") + "' onclick='ExploreImage(this.alt);' />"

                        } else {
                            dlgstr += "<img src='IMG/common/nopic.jpg' />";
                        }

                        dlgstr += "</div>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='AGENCYMeno' title='" + ((content[i][NOTES] == "") ? "" : content[i][NOTES]) + "'>";
                        dlgstr += (content[i][NOTES] == "") ? "" : (content[i][NOTES].substr(0, 80) + "…");
                        dlgstr += "</div>";
                        dlgstr += "<div class='ThemeTool'>";
                        dlgstr += "<a href='javascript:void(0);' style='margin-left:20px;'>周边搜索</a>";
                        dlgstr += "<a href='javascript:void(0);'>从这出发</a>";
                        dlgstr += "<a href='javascript:void(0);'>到这里去</a>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='ThemeBuffer'>";
                        dlgstr += "<div class='ThemeBufferKeys'>";
                        for (var j = 0; j < Global.bufferwords.length; j++) {
                            dlgstr += "<a href='javascript:void(0);'>" + Global.bufferwords[j] + "</a>";
                        }
                        dlgstr += "<input type='text' id='" + iptid + "' style='width:60px;height:16px;margin:1px 1px 1px 1px;border:solid 1px #82B9B4;' />";
                        dlgstr += "<input type='button' id='" + btnid + "' value='搜索' style='width:40px;height:20px;margin:0px 2px;padding:0px;border:solid 1px #82B9B4;display:inline-block;' />";
                        dlgstr += "<span style='color:#E78F08;width:14px;text-align:right;display:inline-block;margin:0px;padding:0px;' id='" + msgid + "'>2</span>公里";
                        dlgstr += "</div>";
                        dlgstr += "<div class='ThemeBufferBar' id='" + barid + "'>";
                        dlgstr += "</div>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='ThemeSetStart'>";
                        dlgstr += "<span style='color:#333;font-size:12px;height:16px;width:70px;text-align:right;display:inline-block;margin:12px 0px;padding:0px;'>输入终点：</span>";
                        dlgstr += "<input type='text' id='" + siptid + "' style='display:inline-block;width:110px;height:16px;margin:11px 1px 11px 1px;border:solid 1px #82b9b4;' />";
                        dlgstr += "<input type='button' id='" + sbtnid + "' value='查询' style='width:40px;height:20px;margin:10px 13px 10px 3px;padding:0px;border:solid 1px #82B9B4;display:inline-block;' />";
                        dlgstr += "</div>";
                        dlgstr += "<div class='ThemeSetEnd'>";
                        dlgstr += "<span style='color:#333;font-size:12px;height:16px;width:70px;text-align:right;display:inline-block;margin:12px 0px;padding:0px;'>输入起点：</span>";
                        dlgstr += "<input type='text' id='" + eiptid + "' style='display:inline-block;width:110px;height:16px;margin:11px 1px 11px 1px;border:solid 1px #82b9b4;' />";
                        dlgstr += "<input type='button' id='" + ebtnid + "' value='查询' style='width:40px;height:20px;margin:10px 13px 10px 3px;padding:0px;border:solid 1px #82B9B4;display:inline-block;' />";
                        dlgstr += "</div>";
                        dlgstr += "</div>";

                    }
                    var dlg = new NSZCSArrowDialog(null, latlng, null, dlgstr, true, function(e) { this.hide(); buffers.disposeFeatures(); });
                    marker.dialog = dlg;
                    marker.barid = barid;
                    marker.msgid = msgid;
                    marker.iptid = iptid;
                    marker.btnid = btnid;
                    marker.dlgid = dlgid;
                    marker.sbtnid = sbtnid;
                    marker.ebtnid = ebtnid;
                    marker.siptid = siptid;
                    marker.eiptid = eiptid;
                    
                    marker.events.bind("mouseover", marker, function() { this.setURL(this.icon.url.replace("b_", "r_")); this.icon.imageDiv.style.zIndex = "5000"; });
                    marker.events.bind("mouseout", marker, function() { this.setURL(this.icon.url.replace("r_", "b_")); this.icon.imageDiv.style.zIndex = ""; });
                    marker.events.bind("click", marker, function() {
                        buffers.disposeFeatures();
                        Map.addDialog(this.dialog, true);
                        cDlg = this.dialog;
                        this.dialog.show();
                        jQuery(".ThemeTool>a").click(function(e) {
                            var me = cDlg.mark;
                            switch (this.innerHTML) {
                                case "周边搜索":
                                    if (jQuery(this).attr("_init") == "true") {
                                        return;
                                    }
                                    jQuery(".ThemeSetStart").css({ "display": "none" });
                                    jQuery(".ThemeSetEnd").css({ "display": "none" });
                                    jQuery(".ThemeBuffer").css({ "display": "block" });
                                    jQuery(".ThemeTool>a").attr("_init", false);
                                    cDlg.updateSize();
                                    cDlg.updatePosition();
                                    jQuery(this).attr("_init", true);

                                    jQuery("#" + me.barid).slider({
                                        min: 0,
                                        max: 6,
                                        step: 1,
                                        value: 2,
                                        range: "min",
                                        slide: function(event, ui) {
                                            jQuery("#" + me.msgid)[0].innerHTML = ui.value;
                                            _circleBuffer(me.latlng, ui.value);
                                        },
                                        change: function(event, ui) {
                                            _changeBuffer(me.latlng, ui.value);
                                        }
                                    });
                                    jQuery(".ThemeBufferKeys>a").click(function(e) {

                                        _buffer(this.innerText);

                                    });
                                    jQuery("#" + me.btnid).click(function(e) {

                                        _buffer(jQuery("#" + me.iptid).val());

                                    });
                                    _changeBuffer(me.latlng, 2);
                                    break;
                                case "从这出发":
                                    if (jQuery(this).attr("_init") == "true") {
                                        return;
                                    }
                                    buffers.disposeFeatures();
                                    jQuery(".ThemeBuffer").css({ "display": "none" });
                                    jQuery(".ThemeSetEnd").css({ "display": "none" });
                                    jQuery(".ThemeSetStart").css({ "display": "block" });
                                    jQuery(".ThemeTool>a").attr("_init", false);
                                    cDlg.updateSize();
                                    cDlg.updatePosition();
                                    jQuery(this).attr("_init", true);
                                    jQuery("#" + me.sbtnid).click(function(e) {
                                        var val = jQuery("#" + me.siptid).val();
                                        jQuery("#" + me.siptid).val("");
                                        _setStart(me.latlng, me.dlgid, val);

                                    });
                                    break;
                                case "到这里去":
                                    if (jQuery(this).attr("_init") == "true") {
                                        return;
                                    }
                                    buffers.disposeFeatures();
                                    jQuery(".ThemeBuffer").css({ "display": "none" });
                                    jQuery(".ThemeSetStart").css({ "display": "none" });
                                    jQuery(".ThemeSetEnd").css({ "display": "block" });
                                    jQuery(".ThemeTool>a").attr("_init", false);
                                    cDlg.updateSize();
                                    cDlg.updatePosition();
                                    jQuery(this).attr("_init", true);
                                    jQuery("#" + me.ebtnid).click(function(e) {
                                        var val = jQuery("#" + me.eiptid).val();
                                        jQuery("#" + me.eiptid).val("");
                                        _setEnd(me.latlng, me.dlgid, val);

                                    });
                                    break;
                            }
                        });
                        Map.panTo(this.latlng);
                    });
                    markerList.push(marker);
                    item.marker = marker;
                    dlg.mark = marker;
                    contentList.appendChild(item);
                    pct.addComponent(new NGeometry.Point(latlng.lon, latlng.lat));
                }
                scrollPanel.update();
                if (pct.components.length > 1) {
                    var ext = pct.getBounds();
                    Map.zoomToExtent(ext);
                } else {
                    var point = pct.components[0];
                    Map.panTo(new NLatLng(point.x, point.y));
                }
                /*构建pagelist*/
                BuildPageList();
                break;
            case "busy":
                contentList.innerHTML = msg;
                break;

            case "fail":
                contentList.innerHTML = msg;
                break;
        }
    };

    /*返回对象，保存闭包的许多函数*/
    var retObj = {};
    retObj.Query = function() {
        content = null;
        imgcol = null;
        isAlive = true;
        if (_timer != null) {
            clearInterval(_timer);
            _timer = null;
        };
        QueryObject.page = page;
        QueryObject.searchstring = _getKey();
        if (querytype == "key") {
            lay.query(QueryObject);
        }
        else {
            lay.spatialQuery("bbox", QueryObject);
        }
        showResult("busy", Global.html.BUSY);
        markers.clearMarkers();
        for (var i = 0; i < markerList.length; i++) {
            markerList[i].dispose();
        }
        markerList = [];
        cDlg ? Map.removeDialog(cDlg) : null;
        /*查询之后，等待显示结果，如果时间太长则abort掉查询*/
        var _time = 0;
        _timer = setInterval(function() {
            _time++;
            if (content != null && imgcol != null) {
                /*函数返回了*/
                clearInterval(_timer);
                _timer = null;
                isAlive = false;
                showResult("success", "");
            } else {
                if (_time>=Global.COUNT) {
                    /*当前查询已经被抛弃了*/
                    isAlive = false;
                    showResult("fail", Global.html.TIMEOUT);
                    clearInterval(_timer);
                    _timer = null;
                }
            }
        }, Global.delay);
    };
    /*下一页*/
    retObj.next = function() {
        if (page < totalPage) {
            page++;
            retObj.Query();

        } else {
            console.log("当前已经是末页");
        }

    };
    /*上一页*/
    retObj.prev = function() {
        if (page > 1) {
            page--;
            retObj.Query();
        } else {
            console.log("当前已经是首页");
        }
    };
    /*跳到第p页*/
    retObj.go = function(p) {
        page = p;
        retObj.Query();
    };
    retObj.refresh = function() {
        retObj.Query();
    };
    retObj.abort = function() {
        anchor.onclick();
    };


    /*列表创建函数*/
    function BuildPageList() {
        /*最快捷的清空内容*/
        pageList = document.createElement("div");
        pageList.className = "QueryPageList";
        contentList.appendChild(pageList);

        pageList.innerHTML = "";
        if (totalPage == 0) {
            return;
        }
        var div = document.createElement("div");
        div.className = "PageList";

        var entity = document.createElement("a");
        entity.className = "QueryPageItem";
        entity.innerText = "首页";

        entity.onclick = function() {
            retObj.go(1);
        };
        div.appendChild(entity);
        /*首页部分完成*/

        /*页码的开始部分和结束部分，要判断是否小于0或者超过最大值*/

        var startNum;
        var endNum;
        if (totalPage >= 5) {
            if (page <= 3) {
                /*当前页码还是在1-3之间时，如果-2就变成负值了*/
                startNum = 1;
                endNum = 5;

            } else if (page >= totalPage - 2) {
                /*原理和上边类似*/
                endNum = totalPage;
                startNum = totalPage - 4;

            } else {
                /*这是最一般的情况*/
                startNum = page - 2;
                endNum = page + 2;

            }

        } else {
            /*页数不够5页，就把全部显示出来*/
            startNum = 1;
            endNum = totalPage;
        };
        for (var i = startNum; i <= endNum; i++) {
            entity = document.createElement("a");
            entity.className = "QueryPageItem";
            entity.innerText = i;
            if (i == page) {
                /*当前页面鼠标动作不反应，单击也不反应*/
                entity.style.backgroundColor = "rgb(161,201,200)";
            }
            else {
                var index = i;
                entity.onclick = function() {
                    /*这个部分闭包不好使，还没想出对策，直接用标签值代替*/
                    var index = parseInt(this.innerText);
                    retObj.go(index);
                };
            }
            div.appendChild(entity);
        };
        /*中间部分*/
        entity = document.createElement("a");
        entity.className = "QueryPageItem";
        entity.innerText = "末页";
        entity.onclick = function() {
            retObj.go(totalPage);

        };
        div.appendChild(entity);
        pageList.appendChild(div);

    };
    Global.handler["Query"] = retObj;
    retObj.go(1);
};




/*星级酒店*/
function TourHotelQuery(div, prevDiv) {
    if (Global.state == "3d") {
        alert("请切换回二维地图显示方式");
        return false;
    }
    var lay = Global.Module["星级酒店"];
    var keys = lay.queryfields;
    var displayfield = lay.displayfields;
    var querytype = "key";
    var qstr = "";
    var page = 1;
    var totalPage = -1;
    var maxfeatures = 10;
    var QueryObject = {};
    var container = document.getElementById(div);
    var prevDiv = document.getElementById(prevDiv);
    prevDiv.style.display = "none";
    container.style.display = "block";
    var contentList = null;
    var pageList = null;
    var content = null;
    var searchPanel = null;
    var searchIpt = null;
    var searchBtn = null;
    var imgcol = null;
    var markerList = [];
    var Map = Global.map;
    var cDlg = null;
    var isAlive = false;
    var markers = Global.lays["POI图层"];
    var buffers = Global.lays["Buffer图层"];
    var _timer = null;
    var scrollPanel = null;

    markers.clearMarkers();
    buffers.disposeFeatures();
    Map.addLayer(buffers);
    Map.addLayer(markers);
    /*将查询字段和关键词分段*/

    /*构造查询语句where=*,关键词分词还未实现，用一个查询语句对多个字段进行查询*/

    function _getKey() {
        var qs = qstr.replace(/\s+/, "%");
        var keysa = keys.split(",");
        var str = "";
        for (var i = 0, j = keysa.length; i < j; i++) {
            if (i != 0) {
                str += " OR ";
            }
            str += keysa[i] + " LIKE ";
            str += "'%" + qs + "%'";
        };
        if (!Global.NEWMAP) {
            str += " ORDER BY LENGTH(" + keysa[0] + ")";
        }
        return str;
    };

    if (querytype == "key") {

        QueryObject = { "searchstring": _getKey(), "callback": callback, "page": page, "maxfeatures": maxfeatures };

    } else if (querytype = "buffer") {

        QueryObject = { "spatialQueryFilter": _getKey(), "callback": callback, "page": page, "maxfeatures": maxfeatures, "coords": Global.map.getBounds().toBBOX() };
    };

    /*清除以前的查询结果*/
    container.innerHTML = "";
    var totalContainer = document.createElement("div");
    totalContainer.className = "QueryContainer";
    totalContainer.id = "_con_" + Math.random();
    totalContainer.style.cssText = "display:block;width:" + container.clientWidth + "px;height:" + container.clientHeight + "px;";
    container.appendChild(totalContainer);
    var returnDiv = document.createElement("div");
    returnDiv.className = "QueryReturnDiv";
    var msg = document.createElement("span");
    msg.innerHTML = "正在搜索之中";
    returnDiv.appendChild(msg);
    var anchor = document.createElement("a");
    anchor.title = "返回前一面板";
    anchor.innerHTML = "返回专题";
    returnDiv.appendChild(anchor);

    anchor.onclick = function() {
        isAlive = false;
        if (_timer != null) {
            clearInterval(_timer);
            _timer = null;
        }
        markers.clearMarkers();
        buffers.disposeFeatures();
        for (var i = 0; i < markerList.length; i++) {
            markerList[i].dispose();
        }
        markerList = [];
        Map.removeLayer(markers);
        Map.removeLayer(buffers);
        scrollPanel.dispose();
        cDlg ? Map.removeDialog(cDlg) : null;
        container.style.display = "none";
        prevDiv.style.display = "block";
        Global.handler["Query"] = null;
    };

    searchPanel = document.createElement("div");
    searchPanel.className = "ThemeSearchPanel";
    searchIpt = document.createElement("input");
    searchIpt.type = "text";
    searchIpt.className = "searchInput";
    searchPanel.appendChild(searchIpt);
    searchBtn = document.createElement("input");
    searchBtn.type = "button";
    searchBtn.style.cssText = "width:40px;height:24px;display:inline-block;";
    searchBtn.value = "筛选";
    searchBtn.className = "searchBtn";
    searchBtn.onclick = function() {
        var val = searchIpt.value.trim();
        if (val == "") {
            return;
        } else {
            qstr = val;
        }
        totalPage = -1;
        retObj.go(1);
    };
    searchPanel.appendChild(searchBtn);
    returnDiv.appendChild(searchPanel);
    totalContainer.appendChild(returnDiv);
    contentList = document.createElement("div");
    contentList.className = "QueryContentList";
    totalContainer.appendChild(contentList);
    scrollPanel = new baidu.ui.ScrollPanel({ container: totalContainer.id, overflow: "overflow-y" });
    scrollPanel.render(totalContainer.id);

    function callback(res) {
        /*判断总页数有没有记录*/
        if (!isAlive) {
            return;
        }
        if (Global.NEWMAP) {
            if (totalPage == -1) {
                totalPage = res.header.pages;
            }
            if (totalPage == 0) {
                isAlive = false;
                clearInterval(_timer);
                _timer = null;
                showResult("fail", Global.html.NODATA);
            }
            content = res.content.features;
        } else {
            if (totalPage == -1) {
                totalPage = res.total;
            }
            if (totalPage == 0) {
                isAlive = false;
                clearInterval(_timer);
                _timer = null;
                showResult("fail", Global.html.NODATA);
            }
            content = res.content;
        }

        /*获取图片列表*/
        if (totalPage != 0) {
            var reqstr = "";
            for (var i = 0; i < content.length; i++) {
                if (Global.NEWMAP) {
                    if (i != 0) {
                        reqstr += ",";
                    }
                    reqstr += content[i].properties[ADDCODE];
                } else {
                    if (i != 0) {
                        reqstr += ",";
                    }
                    reqstr += content[i][ADDCODE];
                }
            }
            NCrossDomainRequest(Global.urls["URL_RESOURCE"] + "type=hotel&ids=" + reqstr, function(res) { imgcol = res; });
        }

        msg.innerHTML = "总共搜索到" + totalPage + "页内容";
    };



    function _circleBuffer(latlng, radius) {
        buffers.disposeFeatures();
        /*将km的半径转换成度*/
        radius = radius * NINCHES_PER_UNIT["km"] / NINCHES_PER_UNIT["dd"];
        var center = new NGeometry.Point(latlng.lon, latlng.lat);
        var circle = NGeometry.Polygon.createRegularPolygon(center, radius, 200, null);
        var fea = new NVectorFeature(circle);
        buffers.addFeatures([fea]);
    };
    function _changeBuffer(latlng, radius) {
        buffers.disposeFeatures();
        radius = radius * NINCHES_PER_UNIT["km"] / NINCHES_PER_UNIT["dd"];
        var center = new NGeometry.Point(latlng.lon, latlng.lat);
        var circle = NGeometry.Polygon.createRegularPolygon(center, radius, 200, null);
        var fea = new NVectorFeature(circle);
        buffers.addFeatures([fea]);
        var ext = buffers.getLayerExtent();
        Global.map.zoomToExtent(ext);
    };
    function _buffer(keys) {
        var ext = buffers.getLayerExtent();
        isAlive = false;
        if (_timer != null) {
            clearInterval(_timer);
            _timer = null;
        }
        markers.clearMarkers();
        buffers.disposeFeatures();
        for (var i = 0; i < markerList.length; i++) {
            markerList[i].dispose();
        }
        Map.removeLayer(markers);
        Map.removeLayer(buffers);
        cDlg ? Map.removeDialog(cDlg) : null;
        scrollPanel.dispose();
        Global.handler["Query"] = null;
        FuzzyQuery(keys, "buffer", "keyPanel", "facePanel", ext);
    };

    function _setStart(latlng, name, val) {
        if (val == "") {
            alert("请输入终点");
            return;
        }
        isAlive = false;
        if (_timer != null) {
            clearInterval(_timer);
            _timer = null;
        }
        markers.clearMarkers();
        buffers.disposeFeatures();
        for (var i = 0; i < markerList.length; i++) {
            markerList[i].dispose();
        }
        Map.removeLayer(markers);
        Map.removeLayer(buffers);
        cDlg ? Map.removeDialog(cDlg) : null;
        scrollPanel.dispose();
        Global.handler["Query"] = null;

        Global.start = { "x": latlng.lon, "y": latlng.lat, "name": name, "sure": true };
        Global.end = null;
        NetworkQuery(name, val, "keyPanel", "facePanel");
    };
    function _setEnd(latlng, name, val) {
        if (val == "") {
            alert("请输入终点");
            return;
        }
        isAlive = false;
        if (_timer != null) {
            clearInterval(_timer);
            _timer = null;
        }
        markers.clearMarkers();
        buffers.disposeFeatures();
        for (var i = 0; i < markerList.length; i++) {
            markerList[i].dispose();
        }
        Map.removeLayer(markers);
        Map.removeLayer(buffers);
        cDlg ? Map.removeDialog(cDlg) : null;
        scrollPanel.dispose();
        Global.handler["Query"] = null;
        Global.start = null;
        Global.end = { "x": latlng.lon, "y": latlng.lat, "name": name, "sure": true };
        NetworkQuery(val, name, "keyPanel", "facePanel");
    };


    function showResult(type, msg) {
        switch (type) {
            case "success":
                contentList.innerHTML = "";
                var displayArray = displayfield.split(",");
                var pct = new NGeometry.MultiPoint();
                for (var i = 0, len = content.length; i < len; i++) {
                    var item = document.createElement("div");
                    item.className = "QueryContentListItem";
                    /*添加图片标头*/
                    var img = document.createElement("img");
                    img.className = "QueryContentListTitle";
                    img.src = "IMG/list/b_" + (i + 1) + ".png";
                    item.appendChild(img);
                    /*添加文字信息*/
                    var div = document.createElement("div");
                    div.className = "QueryContentListText";
                    var span = null;
                    var addcode = null;
                    for (var j = 0; j < displayArray.length; j++) {
                        span = document.createElement("span");
                        if (Global.NEWMAP) {
                            span.innerText = content[i].properties[displayArray[j]];

                        } else {
                            span.innerText = content[i][displayArray[j]];

                        }
                        div.appendChild(span);
                    }
                    if (Global.NEWMAP) {
                        addcode = content[i].properties[ADDCODE];

                    } else {
                        addcode = content[i][ADDCODE];
                    }
                    item.appendChild(div);
                    /*添加兴趣点图片*/
                    img = document.createElement("img");
                    img.className = "QueryContentListIMG";
                    if (imgcol[i][addcode].length != 0) {
                        img.src = imgcol[i][addcode][0];

                    } else {
                        img.src = "IMG/common/nopic.jpg";

                    }
                    item.appendChild(img);
                    item.onmouseover = function() {
                        this.className = "QueryContentListItemActive";
                        this.marker.events.triggerEvent("mouseover");
                    };
                    item.onmouseout = function() {
                        this.className = "QueryContentListItem";
                        this.marker.events.triggerEvent("mouseout");
                    };
                    item.onclick = function() {
                        this.marker.events.triggerEvent("click");
                    };

                    var ico = new NIcon("IMG/list/b_" + (i + 1) + ".png", new NSize(28, 43), new NPixel(-14, -36));
                    var latlng = null;
                    if (Global.NEWMAP) {
                        latlng = new NLatLng(parseFloat(content[i].geometry.coordinates[0]), parseFloat(content[i].geometry.coordinates[1]));

                    } else {

                        latlng = new NLatLng(parseFloat(content[i]["LONGITUDE"]), parseFloat(content[i]["LATITUDE"]));

                    }
                    var marker = new NMarker(latlng, ico);
                    markers.addMarker(marker);
                    
                    var dlgstr = "";
                    var barid = "_scroll_" + i;
                    var iptid = "_ipt_" + i;
                    var msgid = "_msg_" + i;
                    var btnid = "_btn_" + i;
                    var siptid = "_sipt_" + i;
                    var eiptid = "_eipt_" + i;
                    var sbtnid = "_sbtn_" + i;
                    var ebtnid = "_ebtn_" + i;
                    var dlgid = "";
                    
                    if (Global.NEWMAP) {
                        dlgid = content[i].properties[SHORTNAME];
                        dlgstr = "<div class='HOTEL'>";
                        dlgstr += "<div class='HOTELTitle'>" + content[i].properties[SHORTNAME] + "</div>";
                        dlgstr += "<div class='HOTELContain'>";
                        dlgstr += "<div class='HOTELText'>";
                        dlgstr += "<span>地址：" + content[i].properties[ADDRESS] + "</span>";
                        dlgstr += "<span>电话：" + ((content[i].properties[TELEPHONE] == "") ? "暂无" : content[i].properties[TELEPHONE]) + "</span>";
                        dlgstr += "<span>传真：" + ((content[i].properties[FAX] == "") ? "暂无" : content[i].properties[FAX]) + "</span>";
                        dlgstr += "<span><a style='text-decoration:none;padding-left:5px;' href='http://www.baidu.com/s?wd=河源+" + content[i].properties[SHORTNAME] + "' target='_blank'>更多信息</a></span>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='HOTELImage'>";
                        if (imgcol[i][addcode].length != 0) {
                            dlgstr += "<img src='" + imgcol[i][addcode][0] + "' " + " alt='" + imgcol[i][addcode].join(",") + "' onclick='ExploreImage(this.alt);' />"

                        } else {
                            dlgstr += "<img src='IMG/common/nopic.jpg' />";
                        }

                        dlgstr += "</div>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='HOTELMeno' title='" + ((content[i].properties[NOTES] == "") ? "" : content[i].properties[NOTES]) + "'>";
                        dlgstr += (content[i].properties[NOTES]== "") ? "" : (content[i].properties[NOTES].substr(0, 80) + "…");
                        dlgstr += "</div>";
                        dlgstr += "<div class='ThemeTool'>";
                        dlgstr += "<a href='javascript:void(0);' style='margin-left:20px;'>周边搜索</a>";
                        dlgstr += "<a href='javascript:void(0);'>从这出发</a>";
                        dlgstr += "<a href='javascript:void(0);'>到这里去</a>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='ThemeBuffer'>";
                        dlgstr += "<div class='ThemeBufferKeys'>";
                        for (var j = 0; j < Global.bufferwords.length; j++) {
                            dlgstr += "<a href='javascript:void(0);'>" + Global.bufferwords[j] + "</a>";
                        }
                        dlgstr += "<input type='text' id='" + iptid + "' style='width:60px;height:16px;margin:1px 1px 1px 1px;border:solid 1px #82B9B4;' />";
                        dlgstr += "<input type='button' id='" + btnid + "' value='搜索' style='width:40px;height:20px;margin:0px 2px;padding:0px;border:solid 1px #82B9B4;display:inline-block;' />";
                        dlgstr += "<span style='color:#E78F08;width:14px;text-align:right;display:inline-block;margin:0px;padding:0px;' id='" + msgid + "'>2</span>公里";
                        dlgstr += "</div>";
                        dlgstr += "<div class='ThemeBufferBar' id='" + barid + "'>";
                        dlgstr += "</div>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='ThemeSetStart'>";
                        dlgstr += "<span style='color:#333;font-size:12px;height:16px;width:70px;text-align:right;display:inline-block;margin:12px 0px;padding:0px;'>输入终点：</span>";
                        dlgstr += "<input type='text' id='" + siptid + "' style='display:inline-block;width:110px;height:16px;margin:11px 1px 11px 1px;border:solid 1px #82b9b4;' />";
                        dlgstr += "<input type='button' id='" + sbtnid + "' value='查询' style='width:40px;height:20px;margin:10px 13px 10px 3px;padding:0px;border:solid 1px #82B9B4;display:inline-block;' />";
                        dlgstr += "</div>";
                        dlgstr += "<div class='ThemeSetEnd'>";
                        dlgstr += "<span style='color:#333;font-size:12px;height:16px;width:70px;text-align:right;display:inline-block;margin:12px 0px;padding:0px;'>输入起点：</span>";
                        dlgstr += "<input type='text' id='" + eiptid + "' style='display:inline-block;width:110px;height:16px;margin:11px 1px 11px 1px;border:solid 1px #82b9b4;' />";
                        dlgstr += "<input type='button' id='" + ebtnid + "' value='查询' style='width:40px;height:20px;margin:10px 13px 10px 3px;padding:0px;border:solid 1px #82B9B4;display:inline-block;' />";
                        dlgstr += "</div>";
                        dlgstr += "</div>";
                    } else {
                        dlgid = content[i][SHORTNAME];
                        dlgstr = "<div class='HOTEL'>";
                        dlgstr += "<div class='HOTELTitle'>" + content[i][SHORTNAME] + "</div>";
                        dlgstr += "<div class='HOTELContain'>";
                        dlgstr += "<div class='HOTELText'>";
                        dlgstr += "<span>地址：" + content[i][ADDRESS] + "</span>";
                        dlgstr += "<span>电话：" + ((content[i][TELEPHONE] == "") ? "暂无" : content[i][TELEPHONE]) + "</span>";
                        dlgstr += "<span>传真：" + ((content[i][FAX] == "") ? "暂无" : content[i][FAX]) + "</span>";
                        dlgstr += "<span><a style='text-decoration:none;padding-left:5px;' href='http://www.baidu.com/s?wd=河源+" + content[i][SHORTNAME] + "' target='_blank'>更多信息</a></span>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='HOTELImage'>";
                        if (imgcol[i][addcode].length != 0) {
                            dlgstr += "<img src='" + imgcol[i][addcode][0] + "' " + " alt='" + imgcol[i][addcode].join(",") + "' onclick='ExploreImage(this.alt);' />"

                        } else {
                            dlgstr += "<img src='IMG/common/nopic.jpg' />";
                        }

                        dlgstr += "</div>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='HOTELMeno' title='" + ((content[i][NOTES] == "") ? "" : content[i][NOTES]) + "'>";
                        dlgstr += (content[i][NOTES] == "") ? "" : (content[i][NOTES].substr(0, 80) + "…");
                        dlgstr += "</div>";
                        dlgstr += "<div class='ThemeTool'>";
                        dlgstr += "<a href='javascript:void(0);' style='margin-left:20px;'>周边搜索</a>";
                        dlgstr += "<a href='javascript:void(0);'>从这出发</a>";
                        dlgstr += "<a href='javascript:void(0);'>到这里去</a>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='ThemeBuffer'>";
                        dlgstr += "<div class='ThemeBufferKeys'>";
                        for (var j = 0; j < Global.bufferwords.length; j++) {
                            dlgstr += "<a href='javascript:void(0);'>" + Global.bufferwords[j] + "</a>";
                        }
                        dlgstr += "<input type='text' id='" + iptid + "' style='width:60px;height:16px;margin:1px 1px 1px 1px;border:solid 1px #82B9B4;' />";
                        dlgstr += "<input type='button' id='" + btnid + "' value='搜索' style='width:40px;height:20px;margin:0px 2px;padding:0px;border:solid 1px #82B9B4;display:inline-block;' />";
                        dlgstr += "<span style='color:#E78F08;width:14px;text-align:right;display:inline-block;margin:0px;padding:0px;' id='" + msgid + "'>2</span>公里";
                        dlgstr += "</div>";
                        dlgstr += "<div class='ThemeBufferBar' id='" + barid + "'>";
                        dlgstr += "</div>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='ThemeSetStart'>";
                        dlgstr += "<span style='color:#333;font-size:12px;height:16px;width:70px;text-align:right;display:inline-block;margin:12px 0px;padding:0px;'>输入终点：</span>";
                        dlgstr += "<input type='text' id='" + siptid + "' style='display:inline-block;width:110px;height:16px;margin:11px 1px 11px 1px;border:solid 1px #82b9b4;' />";
                        dlgstr += "<input type='button' id='" + sbtnid + "' value='查询' style='width:40px;height:20px;margin:10px 13px 10px 3px;padding:0px;border:solid 1px #82B9B4;display:inline-block;' />";
                        dlgstr += "</div>";
                        dlgstr += "<div class='ThemeSetEnd'>";
                        dlgstr += "<span style='color:#333;font-size:12px;height:16px;width:70px;text-align:right;display:inline-block;margin:12px 0px;padding:0px;'>输入起点：</span>";
                        dlgstr += "<input type='text' id='" + eiptid + "' style='display:inline-block;width:110px;height:16px;margin:11px 1px 11px 1px;border:solid 1px #82b9b4;' />";
                        dlgstr += "<input type='button' id='" + ebtnid + "' value='查询' style='width:40px;height:20px;margin:10px 13px 10px 3px;padding:0px;border:solid 1px #82B9B4;display:inline-block;' />";
                        dlgstr += "</div>";
                        dlgstr += "</div>";

                    }
                    var dlg = new NSZCSArrowDialog(null, latlng, null, dlgstr, true, function(e) { this.hide(); buffers.disposeFeatures(); });
                    marker.dialog = dlg;
                    marker.barid = barid;
                    marker.msgid = msgid;
                    marker.iptid = iptid;
                    marker.btnid = btnid;
                    marker.dlgid = dlgid;
                    marker.sbtnid = sbtnid;
                    marker.ebtnid = ebtnid;
                    marker.siptid = siptid;
                    marker.eiptid = eiptid;

                    marker.dialog = dlg;
                    marker.events.bind("mouseover", marker, function() { this.setURL(this.icon.url.replace("b_", "r_")); this.icon.imageDiv.style.zIndex = "5000"; });
                    marker.events.bind("mouseout", marker, function() { this.setURL(this.icon.url.replace("r_", "b_")); this.icon.imageDiv.style.zIndex = ""; });
                    marker.events.bind("click", marker, function() {
                        buffers.disposeFeatures();
                        Map.addDialog(this.dialog, true);
                        cDlg = this.dialog;
                        this.dialog.show();
                        jQuery(".ThemeTool>a").click(function(e) {
                            var me = cDlg.mark;
                            switch (this.innerHTML) {
                                case "周边搜索":
                                    if (jQuery(this).attr("_init") == "true") {
                                        return;
                                    }
                                    jQuery(".ThemeSetStart").css({ "display": "none" });
                                    jQuery(".ThemeSetEnd").css({ "display": "none" });
                                    jQuery(".ThemeBuffer").css({ "display": "block" });
                                    jQuery(".ThemeTool>a").attr("_init", false);
                                    cDlg.updateSize();
                                    cDlg.updatePosition();
                                    jQuery(this).attr("_init", true);

                                    jQuery("#" + me.barid).slider({
                                        min: 0,
                                        max: 6,
                                        step: 1,
                                        value: 2,
                                        range: "min",
                                        slide: function(event, ui) {
                                            jQuery("#" + me.msgid)[0].innerHTML = ui.value;
                                            _circleBuffer(me.latlng, ui.value);
                                        },
                                        change: function(event, ui) {
                                            _changeBuffer(me.latlng, ui.value);
                                        }
                                    });
                                    jQuery(".ThemeBufferKeys>a").click(function(e) {

                                        _buffer(this.innerText);

                                    });
                                    jQuery("#" + me.btnid).click(function(e) {

                                        _buffer(jQuery("#" + me.iptid).val());

                                    });
                                    _changeBuffer(me.latlng, 2);
                                    break;
                                case "从这出发":
                                    if (jQuery(this).attr("_init") == "true") {
                                        return;
                                    }
                                    buffers.disposeFeatures();
                                    jQuery(".ThemeBuffer").css({ "display": "none" });
                                    jQuery(".ThemeSetEnd").css({ "display": "none" });
                                    jQuery(".ThemeSetStart").css({ "display": "block" });
                                    jQuery(".ThemeTool>a").attr("_init", false);
                                    cDlg.updateSize();
                                    cDlg.updatePosition();
                                    jQuery(this).attr("_init", true);
                                    jQuery("#" + me.sbtnid).click(function(e) {
                                        var val = jQuery("#" + me.siptid).val();
                                        jQuery("#" + me.siptid).val("");
                                        _setStart(me.latlng, me.dlgid, val);

                                    });
                                    break;
                                case "到这里去":

                                    if (jQuery(this).attr("_init") == "true") {
                                        return;
                                    }
                                    buffers.disposeFeatures();
                                    jQuery(".ThemeBuffer").css({ "display": "none" });
                                    jQuery(".ThemeSetStart").css({ "display": "none" });
                                    jQuery(".ThemeSetEnd").css({ "display": "block" });
                                    jQuery(".ThemeTool>a").attr("_init", false);
                                    cDlg.updateSize();
                                    cDlg.updatePosition();
                                    jQuery(this).attr("_init", true);
                                    jQuery("#" + me.ebtnid).click(function(e) {
                                        var val = jQuery("#" + me.eiptid).val();
                                        jQuery("#" + me.eiptid).val("");
                                        _setEnd(me.latlng, me.dlgid, val);

                                    });
                                    break;

                            }
                        });
                        Map.panTo(this.latlng);
                    });
                    markerList.push(marker);
                    item.marker = marker;
                    dlg.mark = marker;
                    contentList.appendChild(item);
                    pct.addComponent(new NGeometry.Point(latlng.lon, latlng.lat));
                }
                scrollPanel.update();
                if (pct.components.length > 1) {
                    var ext = pct.getBounds();
                    Map.zoomToExtent(ext);
                } else {
                    var point = pct.components[0];
                    Map.panTo(new NLatLng(point.x, point.y));
                }
                /*构建pagelist*/
                BuildPageList();
                break;
            case "busy":
                contentList.innerHTML = msg;
                break;

            case "fail":
                contentList.innerHTML = msg;
                break;
        }
    };

    /*返回对象，保存闭包的许多函数*/
    var retObj = {};
    retObj.Query = function() {
        content = null;
        imgcol = null;
        isAlive = true;
        if (_timer != null) {
            clearInterval(_timer);
            _timer = null;
        };
        QueryObject.page = page;
        QueryObject.searchstring = _getKey();
        if (querytype == "key") {
            lay.query(QueryObject);
        }
        else {
            lay.spatialQuery("bbox", QueryObject);
        }
        showResult("busy", Global.html.BUSY);
        markers.clearMarkers();
        for (var i = 0; i < markerList.length; i++) {
            markerList[i].dispose();
        }
        markerList = [];
        cDlg ? Map.removeDialog(cDlg) : null;
        /*查询之后，等待显示结果，如果时间太长则abort掉查询*/
        var _time = 0;
        _timer = setInterval(function() {
            _time++;
            if (content != null && imgcol != null) {
                /*函数返回了*/
                clearInterval(_timer);
                _timer = null;
                isAlive = false;
                showResult("success", "");
            } else {
                if (_time>=Global.COUNT) {
                    /*当前查询已经被抛弃了*/
                    isAlive = false;
                    showResult("fail", Global.html.TIMEOUT);
                    clearInterval(_timer);
                    _timer = null;
                }
            }
        }, Global.delay);
    };
    /*下一页*/
    retObj.next = function() {
        if (page < totalPage) {
            page++;
            retObj.Query();

        } else {
            console.log("当前已经是末页");
        }

    };
    /*上一页*/
    retObj.prev = function() {
        if (page > 1) {
            page--;
            retObj.Query();
        } else {
            console.log("当前已经是首页");
        }
    };
    /*跳到第p页*/
    retObj.go = function(p) {
        page = p;
        retObj.Query();
    };
    retObj.refresh = function() {
        retObj.Query();
    };
    retObj.abort = function() {
        anchor.onclick();
    };


    /*列表创建函数*/
    function BuildPageList() {
        /*最快捷的清空内容*/
        pageList = document.createElement("div");
        pageList.className = "QueryPageList";
        contentList.appendChild(pageList);

        pageList.innerHTML = "";
        if (totalPage == 0) {
            return;
        }
        var div = document.createElement("div");
        div.className = "PageList";

        var entity = document.createElement("a");
        entity.className = "QueryPageItem";
        entity.innerText = "首页";

        entity.onclick = function() {
            retObj.go(1);
        };
        div.appendChild(entity);
        /*首页部分完成*/

        /*页码的开始部分和结束部分，要判断是否小于0或者超过最大值*/

        var startNum;
        var endNum;
        if (totalPage >= 5) {
            if (page <= 3) {
                /*当前页码还是在1-3之间时，如果-2就变成负值了*/
                startNum = 1;
                endNum = 5;

            } else if (page >= totalPage - 2) {
                /*原理和上边类似*/
                endNum = totalPage;
                startNum = totalPage - 4;

            } else {
                /*这是最一般的情况*/
                startNum = page - 2;
                endNum = page + 2;

            }

        } else {
            /*页数不够5页，就把全部显示出来*/
            startNum = 1;
            endNum = totalPage;
        };
        for (var i = startNum; i <= endNum; i++) {
            entity = document.createElement("a");
            entity.className = "QueryPageItem";
            entity.innerText = i;
            if (i == page) {
                /*当前页面鼠标动作不反应，单击也不反应*/
                entity.style.backgroundColor = "rgb(161,201,200)";
            }
            else {
                var index = i;
                entity.onclick = function() {
                    /*这个部分闭包不好使，还没想出对策，直接用标签值代替*/
                    var index = parseInt(this.innerText);
                    retObj.go(index);
                };
            }
            div.appendChild(entity);
        };
        /*中间部分*/
        entity = document.createElement("a");
        entity.className = "QueryPageItem";
        entity.innerText = "末页";
        entity.onclick = function() {
            retObj.go(totalPage);

        };
        div.appendChild(entity);
        pageList.appendChild(div);

    };
    Global.handler["Query"] = retObj;
    retObj.go(1);
};
/*旅游景点搜索*/
function TourViewQuery(div, prevDiv) {
    if (Global.state == "3d") {
        alert("请切换回二维地图显示方式");
        return false;
    }
    var lay = Global.Module["旅游景点"];
    var keys = lay.queryfields;
    var displayfield = lay.displayfields;
    var querytype = "key";
    var qstr = "";
    var page = 1;
    var totalPage = -1;
    var maxfeatures = 10;
    var QueryObject = {};
    var container = document.getElementById(div);
    var prevDiv = document.getElementById(prevDiv);
    prevDiv.style.display = "none";
    container.style.display = "block";
    var contentList = null;
    var pageList = null;
    var content = null;
    var searchPanel = null;
    var searchIpt = null;
    var searchBtn = null;
    var imgcol = null;
    var markerList = [];
    var Map = Global.map;
    var cDlg = null;
    var isAlive = false;
    var markers = Global.lays["POI图层"];
    var buffers = Global.lays["Buffer图层"];
    var _timer = null;
    var scrollPanel = null;

    markers.clearMarkers();
    buffers.disposeFeatures();
    Map.addLayer(buffers);
    Map.addLayer(markers);
    /*将查询字段和关键词分段*/

    /*构造查询语句where=*,关键词分词还未实现，用一个查询语句对多个字段进行查询*/

    function _getKey() {
        var qs = qstr.replace(/\s+/, "%");
        var keysa = keys.split(",");
        var str = "";
        for (var i = 0, j = keysa.length; i < j; i++) {
            if (i != 0) {
                str += " OR ";
            }
            str += keysa[i] + " LIKE ";
            str += "'%" + qs + "%'";
        };
        if (!Global.NEWMAP) {
            str += " ORDER BY LENGTH(" + keysa[0] + ")";
        }
        return str;
    };

    if (querytype == "key") {

        QueryObject = { "searchstring": _getKey(), "callback": callback, "page": page, "maxfeatures": maxfeatures };

    } else if (querytype = "buffer") {

        QueryObject = { "spatialQueryFilter": _getKey(), "callback": callback, "page": page, "maxfeatures": maxfeatures, "coords": Global.map.getBounds().toBBOX() };
    };

    /*清除以前的查询结果*/
    container.innerHTML = "";
    var totalContainer = document.createElement("div");
    totalContainer.className = "QueryContainer";
    totalContainer.id = "_con_" + Math.random();
    totalContainer.style.cssText = "display:block;width:" + container.clientWidth + "px;height:" + container.clientHeight + "px;";
    container.appendChild(totalContainer);
    var returnDiv = document.createElement("div");
    returnDiv.className = "QueryReturnDiv";
    var msg = document.createElement("span");
    msg.innerHTML = "正在搜索之中";
    returnDiv.appendChild(msg);
    var anchor = document.createElement("a");
    anchor.title = "返回前一面板";
    anchor.innerHTML = "返回专题";
    returnDiv.appendChild(anchor);

    anchor.onclick = function() {
        isAlive = false;
        if (_timer != null) {
            clearInterval(_timer);
            _timer = null;
        }
        markers.clearMarkers();
        buffers.disposeFeatures();
        for (var i = 0; i < markerList.length; i++) {
            markerList[i].dispose();
        }
        Map.removeLayer(markers);
        Map.removeLayer(buffers);
        scrollPanel.dispose();
        cDlg ? Map.removeDialog(cDlg) : null;
        container.style.display = "none";
        prevDiv.style.display = "block";
        Global.handler["Query"] = null;
    };

    searchPanel = document.createElement("div");
    searchPanel.className = "ThemeSearchPanel";
    searchIpt = document.createElement("input");
    searchIpt.type = "text";
    searchIpt.className = "searchInput";
    searchPanel.appendChild(searchIpt);
    searchBtn = document.createElement("input");
    searchBtn.type = "button";
    searchBtn.style.cssText = "width:40px;height:24px;display:inline-block;";
    searchBtn.value = "筛选";
    searchBtn.className = "searchBtn";
    searchBtn.onclick = function() {
        var val = searchIpt.value.trim();
        if (val == "") {
            return;
        } else {
            qstr = val;
        }
        totalPage = -1;
        retObj.go(1);
    };
    searchPanel.appendChild(searchBtn);
    returnDiv.appendChild(searchPanel);
    totalContainer.appendChild(returnDiv);
    contentList = document.createElement("div");
    contentList.className = "QueryContentList";
    totalContainer.appendChild(contentList);
    scrollPanel = new baidu.ui.ScrollPanel({ container: totalContainer.id, overflow: "overflow-y" });
    scrollPanel.render(totalContainer.id);

    function callback(res) {
        /*判断总页数有没有记录*/
        if (!isAlive) {
            return;
        }
        if (Global.NEWMAP) {
            if (totalPage == -1) {
                totalPage = res.header.pages;
            }
            if (totalPage == 0) {
                isAlive = false;
                clearInterval(_timer);
                _timer = null;
                showResult("fail", Global.html.NODATA);
            }
            content = res.content.features;
        } else {
            if (totalPage == -1) {
                totalPage = res.total;
            }
            if (totalPage == 0) {
                isAlive = false;
                clearInterval(_timer);
                _timer = null;
                showResult("fail", Global.html.NODATA);
            }
            content = res.content;
        }

        /*获取图片列表*/
        if (totalPage != 0) {
            var reqstr = "";
            for (var i = 0; i < content.length; i++) {
                if (Global.NEWMAP) {
                    if (i != 0) {
                        reqstr += ",";
                    }
                    reqstr += content[i].properties[ADDCODE];
                } else {
                    if (i != 0) {
                        reqstr += ",";
                    }
                    reqstr += content[i][ADDCODE];
                }
            }
            NCrossDomainRequest(Global.urls["URL_RESOURCE"] + "type=view&ids=" + reqstr, function(res) { imgcol = res; });
        }

        msg.innerHTML = "总共搜索到" + totalPage + "页内容";
    };



    function _circleBuffer(latlng, radius) {
        buffers.disposeFeatures();
        /*将km的半径转换成度*/
        radius = radius * NINCHES_PER_UNIT["km"] / NINCHES_PER_UNIT["dd"];
        var center = new NGeometry.Point(latlng.lon, latlng.lat);
        var circle = NGeometry.Polygon.createRegularPolygon(center, radius, 200, null);
        var fea = new NVectorFeature(circle);
        buffers.addFeatures([fea]);
    };
    function _changeBuffer(latlng, radius) {
        buffers.disposeFeatures();
        radius = radius * NINCHES_PER_UNIT["km"] / NINCHES_PER_UNIT["dd"];
        var center = new NGeometry.Point(latlng.lon, latlng.lat);
        var circle = NGeometry.Polygon.createRegularPolygon(center, radius, 200, null);
        var fea = new NVectorFeature(circle);
        buffers.addFeatures([fea]);
        var ext = buffers.getLayerExtent();
        Global.map.zoomToExtent(ext);
    };
    function _buffer(keys) {
        var ext = buffers.getLayerExtent();
        isAlive = false;
        if (_timer != null) {
            clearInterval(_timer);
            _timer = null;
        }
        markers.clearMarkers();
        buffers.disposeFeatures();
        for (var i = 0; i < markerList.length; i++) {
            markerList[i].dispose();
        }
        Map.removeLayer(markers);
        Map.removeLayer(buffers);
        cDlg ? Map.removeDialog(cDlg) : null;
        scrollPanel.dispose();
        Global.handler["Query"] = null;
        FuzzyQuery(keys, "buffer", "keyPanel", "facePanel", ext);
    };

    function _setStart(latlng, name, val) {
        if (val == "") {
            alert("请输入终点");
            return;
        }
        isAlive = false;
        if (_timer != null) {
            clearInterval(_timer);
            _timer = null;
        }
        markers.clearMarkers();
        buffers.disposeFeatures();
        for (var i = 0; i < markerList.length; i++) {
            markerList[i].dispose();
        }
        Map.removeLayer(markers);
        Map.removeLayer(buffers);
        cDlg ? Map.removeDialog(cDlg) : null;
        scrollPanel.dispose();
        Global.handler["Query"] = null;

        Global.start = { "x": latlng.lon, "y": latlng.lat, "name": name, "sure": true };
        NetworkQuery(name, val, "keyPanel", "facePanel");
    };
    function _setEnd(latlng, name, val) {
        if (val == "") {
            alert("请输入终点");
            return;
        }
        isAlive = false;
        if (_timer != null) {
            clearInterval(_timer);
            _timer = null;
        }
        markers.clearMarkers();
        buffers.disposeFeatures();
        for (var i = 0; i < markerList.length; i++) {
            markerList[i].dispose();
        }
        Map.removeLayer(markers);
        Map.removeLayer(buffers);
        cDlg ? Map.removeDialog(cDlg) : null;
        scrollPanel.dispose();
        Global.handler["Query"] = null;

        Global.end = { "x": latlng.lon, "y": latlng.lat, "name": name, "sure": true };
        NetworkQuery(val, name, "keyPanel", "facePanel");
    };

    function showResult(type, msg) {
        switch (type) {
            case "success":
                contentList.innerHTML = "";
                var displayArray = displayfield.split(",");
                var pct = new NGeometry.MultiPoint();
                for (var i = 0, len = content.length; i < len; i++) {
                    var item = document.createElement("div");
                    item.className = "QueryContentListItem";
                    /*添加图片标头*/
                    var img = document.createElement("img");
                    img.className = "QueryContentListTitle";
                    img.src = "IMG/list/b_" + (i + 1) + ".png";
                    item.appendChild(img);
                    /*添加文字信息*/
                    var div = document.createElement("div");
                    div.className = "QueryContentListText";
                    var span = null;
                    var addcode = null;
                    for (var j = 0; j < displayArray.length; j++) {
                        span = document.createElement("span");
                        if (Global.NEWMAP) {
                            span.innerText = content[i].properties[displayArray[j]];

                        } else {
                            span.innerText = content[i][displayArray[j]];

                        }
                        div.appendChild(span);
                    }
                    if (Global.NEWMAP) {
                        addcode = content[i].properties[ADDCODE];

                    } else {
                        addcode = content[i][ADDCODE];
                    }
                    item.appendChild(div);
                    /*添加兴趣点图片*/
                    img = document.createElement("img");
                    img.className = "QueryContentListIMG";
                    if (imgcol[i][addcode].length != 0) {
                        img.src = imgcol[i][addcode][0];

                    } else {
                        img.src = "IMG/common/nopic.jpg";

                    }
                    item.appendChild(img);
                    item.onmouseover = function() {
                        this.className = "QueryContentListItemActive";
                        this.marker.events.triggerEvent("mouseover");
                    };
                    item.onmouseout = function() {
                        this.className = "QueryContentListItem";
                        this.marker.events.triggerEvent("mouseout");
                    };
                    item.onclick = function() {
                        this.marker.events.triggerEvent("click");
                    };

                    var ico = new NIcon("IMG/list/b_" + (i + 1) + ".png", new NSize(28, 43), new NPixel(-14, -36));
                    var latlng = null;
                    if (Global.NEWMAP) {
                        latlng = new NLatLng(parseFloat(content[i].geometry.coordinates[0]), parseFloat(content[i].geometry.coordinates[1]));

                    } else {

                        latlng = new NLatLng(parseFloat(content[i]["LONGITUDE"]), parseFloat(content[i]["LATITUDE"]));

                    }
                    var marker = new NMarker(latlng, ico);
                    markers.addMarker(marker);
                    var dlgstr = "";
                    var barid = "_scroll_" + i;
                    var iptid = "_ipt_" + i;
                    var msgid = "_msg_" + i;
                    var btnid = "_btn_" + i;
                    var siptid = "_sipt_" + i;
                    var eiptid = "_eipt_" + i;
                    var sbtnid = "_sbtn_" + i;
                    var ebtnid = "_ebtn_" + i;
                    var dlgid = "";
                    if (Global.NEWMAP) {
                        dlgid = content[i].properties[SHORTNAME];
                        dlgstr = "<div class='VIEW'>";
                        dlgstr += "<div class='VIEWTitle'>" + content[i].properties[SHORTNAME] + "</div>";
                        dlgstr += "<div class='VIEWContain'>";
                        dlgstr += "<div class='VIEWText'>";
                        dlgstr += "<span>地址：" + content[i].properties[ADDRESS] + "</span>";
                        dlgstr += "<span>电话：" + ((content[i].properties[TELEPHONE] == "") ? "暂无" : content[i].properties[TELEPHONE]) + "</span>";
                        dlgstr += "<span>传真：" + ((content[i].properties[FAX] == "") ? "暂无" : content[i].properties[FAX]) + "</span>";
                        dlgstr += "<span><a style='text-decoration:none;padding-left:5px;' href='http://www.baidu.com/s?wd=河源+" + content[i].properties[SHORTNAME] + "' target='_blank'>更多信息</a></span>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='VIEWImage'>";
                        if (imgcol[i][addcode].length != 0) {
                            dlgstr += "<img src='" + imgcol[i][addcode][0] + "' " + " alt='" + imgcol[i][addcode].join(",") + "' onclick='ExploreImage(this.alt);' />"

                        } else {
                            dlgstr += "<img src='IMG/common/nopic.jpg' />";
                        }

                        dlgstr += "</div>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='VIEWMeno' title='" + ((content[i].properties[NOTES] == "") ? "没有描述信息" : content[i].properties[NOTES]) + "'>";
                        dlgstr += (content[i].properties[NOTES] == "") ? "" : (content[i].properties[NOTES].substr(0, 120) + "…");
                        dlgstr += "</div>";

                        dlgstr += "<div class='ThemeTool'>";
                        dlgstr += "<a href='javascript:void(0);' style='margin-left:20px;'>周边搜索</a>";
                        dlgstr += "<a href='javascript:void(0);'>从这出发</a>";
                        dlgstr += "<a href='javascript:void(0);'>到这里去</a>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='ThemeBuffer'>";
                        dlgstr += "<div class='ThemeBufferKeys'>";
                        for (var j = 0; j < Global.bufferwords.length; j++) {
                            dlgstr += "<a href='javascript:void(0);'>" + Global.bufferwords[j] + "</a>";
                        }
                        dlgstr += "<input type='text' id='" + iptid + "' style='width:60px;height:16px;margin:1px 1px 1px 1px;border:solid 1px #82B9B4;' />";
                        dlgstr += "<input type='button' id='" + btnid + "' value='搜索' style='width:40px;height:20px;margin:0px 2px;padding:0px;border:solid 1px #82B9B4;display:inline-block;' />";
                        dlgstr += "<span style='color:#E78F08;width:14px;text-align:right;display:inline-block;margin:0px;padding:0px;' id='" + msgid + "'>2</span>公里";
                        dlgstr += "</div>";
                        dlgstr += "<div class='ThemeBufferBar' id='" + barid + "'>";
                        dlgstr += "</div>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='ThemeSetStart'>";
                        dlgstr += "<span style='color:#333;font-size:12px;height:16px;width:70px;text-align:right;display:inline-block;margin:12px 0px;padding:0px;'>输入终点：</span>";
                        dlgstr += "<input type='text' id='" + siptid + "' style='display:inline-block;width:110px;height:16px;margin:11px 1px 11px 1px;border:solid 1px #82b9b4;' />";
                        dlgstr += "<input type='button' id='" + sbtnid + "' value='查询' style='width:40px;height:20px;margin:10px 13px 10px 3px;padding:0px;border:solid 1px #82B9B4;display:inline-block;' />";
                        dlgstr += "</div>";
                        dlgstr += "<div class='ThemeSetEnd'>";
                        dlgstr += "<span style='color:#333;font-size:12px;height:16px;width:70px;text-align:right;display:inline-block;margin:12px 0px;padding:0px;'>输入起点：</span>";
                        dlgstr += "<input type='text' id='" + eiptid + "' style='display:inline-block;width:110px;height:16px;margin:11px 1px 11px 1px;border:solid 1px #82b9b4;' />";
                        dlgstr += "<input type='button' id='" + ebtnid + "' value='查询' style='width:40px;height:20px;margin:10px 13px 10px 3px;padding:0px;border:solid 1px #82B9B4;display:inline-block;' />";
                        dlgstr += "</div>";
                        dlgstr += "</div>";
                    } else {
                        dlgid = content[i][SHORTNAME];
                        dlgstr = "<div class='VIEW'>";
                        dlgstr += "<div class='VIEWTitle'>" + content[i][SHORTNAME] + "</div>";
                        dlgstr += "<div class='VIEWContain'>";
                        dlgstr += "<div class='VIEWText'>";
                        dlgstr += "<span>地址：" + content[i][ADDRESS] + "</span>";
                        dlgstr += "<span>电话：" + ((content[i][TELEPHONE] == "") ? "暂无" : content[i][TELEPHONE]) + "</span>";
                        dlgstr += "<span>传真：" + ((content[i][FAX] == "") ? "暂无" : content[i][FAX]) + "</span>";
                        dlgstr += "<span><a style='text-decoration:none;padding-left:5px;' href='http://www.baidu.com/s?wd=河源+" + content[i][SHORTNAME] + "' target='_blank'>更多信息</a></span>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='VIEWImage'>";
                        if (imgcol[i][addcode].length != 0) {
                            dlgstr += "<img src='" + imgcol[i][addcode][0] + "' " + " alt='" + imgcol[i][addcode].join(",") + "' onclick='ExploreImage(this.alt);' />"

                        } else {
                            dlgstr += "<img src='IMG/common/nopic.jpg' />";
                        }

                        dlgstr += "</div>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='VIEWMeno' title='" + ((content[i][NOTES] == "") ? "没有描述信息" : content[i][NOTES]) + "'>";
                        dlgstr += (content[i][NOTES] == "") ? "" : (content[i][NOTES].substr(0, 120) + "…");
                        dlgstr += "</div>";

                        dlgstr += "<div class='ThemeTool'>";
                        dlgstr += "<a href='javascript:void(0);' style='margin-left:20px;'>周边搜索</a>";
                        dlgstr += "<a href='javascript:void(0);'>从这出发</a>";
                        dlgstr += "<a href='javascript:void(0);'>到这里去</a>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='ThemeBuffer'>";
                        dlgstr += "<div class='ThemeBufferKeys'>";
                        for (var j = 0; j < Global.bufferwords.length; j++) {
                            dlgstr += "<a href='javascript:void(0);'>" + Global.bufferwords[j] + "</a>";
                        }
                        dlgstr += "<input type='text' id='" + iptid + "' style='width:60px;height:16px;margin:1px 1px 1px 1px;border:solid 1px #82B9B4;' />";
                        dlgstr += "<input type='button' id='" + btnid + "' value='搜索' style='width:40px;height:20px;margin:0px 2px;padding:0px;border:solid 1px #82B9B4;display:inline-block;' />";
                        dlgstr += "<span style='color:#E78F08;width:14px;text-align:right;display:inline-block;margin:0px;padding:0px;' id='" + msgid + "'>2</span>公里";
                        dlgstr += "</div>";
                        dlgstr += "<div class='ThemeBufferBar' id='" + barid + "'>";
                        dlgstr += "</div>";
                        dlgstr += "</div>";
                        dlgstr += "<div class='ThemeSetStart'>";
                        dlgstr += "<span style='color:#333;font-size:12px;height:16px;width:70px;text-align:right;display:inline-block;margin:12px 0px;padding:0px;'>输入终点：</span>";
                        dlgstr += "<input type='text' id='" + siptid + "' style='display:inline-block;width:110px;height:16px;margin:11px 1px 11px 1px;border:solid 1px #82b9b4;' />";
                        dlgstr += "<input type='button' id='" + sbtnid + "' value='查询' style='width:40px;height:20px;margin:10px 13px 10px 3px;padding:0px;border:solid 1px #82B9B4;display:inline-block;' />";
                        dlgstr += "</div>";
                        dlgstr += "<div class='ThemeSetEnd'>";
                        dlgstr += "<span style='color:#333;font-size:12px;height:16px;width:70px;text-align:right;display:inline-block;margin:12px 0px;padding:0px;'>输入起点：</span>";
                        dlgstr += "<input type='text' id='" + eiptid + "' style='display:inline-block;width:110px;height:16px;margin:11px 1px 11px 1px;border:solid 1px #82b9b4;' />";
                        dlgstr += "<input type='button' id='" + ebtnid + "' value='查询' style='width:40px;height:20px;margin:10px 13px 10px 3px;padding:0px;border:solid 1px #82B9B4;display:inline-block;' />";
                        dlgstr += "</div>";
                        dlgstr += "</div>";

                    }
                    var dlg = new NSZCSArrowDialog(null, latlng, null, dlgstr, true, function(e) { this.hide(); buffers.disposeFeatures(); });
                    marker.dialog = dlg;
                    marker.barid = barid;
                    marker.msgid = msgid;
                    marker.iptid = iptid;
                    marker.btnid = btnid;
                    marker.dlgid = dlgid;
                    marker.sbtnid = sbtnid;
                    marker.ebtnid = ebtnid;
                    marker.siptid = siptid;
                    marker.eiptid = eiptid;

                    marker.events.bind("mouseover", marker, function() { this.setURL(this.icon.url.replace("b_", "r_")); this.icon.imageDiv.style.zIndex = "5000"; });
                    marker.events.bind("mouseout", marker, function() { this.setURL(this.icon.url.replace("r_", "b_")); this.icon.imageDiv.style.zIndex = ""; });
                    marker.events.bind("click", marker, function() {
                        buffers.disposeFeatures();
                        Map.addDialog(this.dialog, true);
                        cDlg = this.dialog;
                        this.dialog.show();
                        jQuery(".ThemeTool>a").click(function(e) {
                            var me = cDlg.mark;
                            switch (this.innerHTML) {
                                case "周边搜索":
                                    if (jQuery(this).attr("_init") == "true") {
                                        return;
                                    }
                                    jQuery(".ThemeSetStart").css({ "display": "none" });
                                    jQuery(".ThemeSetEnd").css({ "display": "none" });
                                    jQuery(".ThemeBuffer").css({ "display": "block" });
                                    jQuery(".ThemeTool>a").attr("_init", false);
                                    cDlg.updateSize();
                                    cDlg.updatePosition();
                                    jQuery(this).attr("_init", true);

                                    jQuery("#" + me.barid).slider({
                                        min: 0,
                                        max: 6,
                                        step: 1,
                                        value: 2,
                                        range: "min",
                                        slide: function(event, ui) {
                                            jQuery("#" + me.msgid)[0].innerHTML = ui.value;
                                            _circleBuffer(me.latlng, ui.value);
                                        },
                                        change: function(event, ui) {
                                            _changeBuffer(me.latlng, ui.value);
                                        }
                                    });
                                    jQuery(".ThemeBufferKeys>a").click(function(e) {

                                        _buffer(this.innerText);

                                    });
                                    jQuery("#" + me.btnid).click(function(e) {

                                        _buffer(jQuery("#" + me.iptid).val());

                                    });
                                    _changeBuffer(me.latlng, 2);
                                    break;
                                case "从这出发":
                                    if (jQuery(this).attr("_init") == "true") {
                                        return;
                                    }
                                    buffers.disposeFeatures();
                                    jQuery(".ThemeBuffer").css({ "display": "none" });
                                    jQuery(".ThemeSetEnd").css({ "display": "none" });
                                    jQuery(".ThemeSetStart").css({ "display": "block" });
                                    jQuery(".ThemeTool>a").attr("_init", false);
                                    cDlg.updateSize();
                                    cDlg.updatePosition();
                                    jQuery(this).attr("_init", true);
                                    jQuery("#" + me.sbtnid).click(function(e) {
                                        var val = jQuery("#" + me.siptid).val();
                                        jQuery("#" + me.siptid).val("");
                                        _setStart(me.latlng, me.dlgid, val);

                                    });
                                    break;
                                case "到这里去":

                                    if (jQuery(this).attr("_init") == "true") {
                                        return;
                                    }
                                    buffers.disposeFeatures();
                                    jQuery(".ThemeBuffer").css({ "display": "none" });
                                    jQuery(".ThemeSetStart").css({ "display": "none" });
                                    jQuery(".ThemeSetEnd").css({ "display": "block" });
                                    jQuery(".ThemeTool>a").attr("_init", false);
                                    cDlg.updateSize();
                                    cDlg.updatePosition();
                                    jQuery(this).attr("_init", true);
                                    jQuery("#" + me.ebtnid).click(function(e) {
                                        var val = jQuery("#" + me.eiptid).val();
                                        jQuery("#" + me.eiptid).val("");
                                        _setEnd(me.latlng, me.dlgid, val);

                                    });
                                    break;

                            }
                        });
                        Map.panTo(this.latlng);
                    });
                    markerList.push(marker);
                    item.marker = marker;
                    dlg.mark = marker;
                    contentList.appendChild(item);
                    pct.addComponent(new NGeometry.Point(latlng.lon, latlng.lat));
                }
                scrollPanel.update();
                if (pct.components.length > 1) {
                    var ext = pct.getBounds();
                    Map.zoomToExtent(ext);
                } else {
                    var point = pct.components[0];
                    Map.panTo(new NLatLng(point.x, point.y));
                }
                /*构建pagelist*/
                BuildPageList();
                break;
            case "busy":
                contentList.innerHTML = msg;
                break;

            case "fail":
                contentList.innerHTML = msg;
                break;
        }
    };

    /*返回对象，保存闭包的许多函数*/
    var retObj = {};
    retObj.Query = function() {
        content = null;
        imgcol = null;
        isAlive = true;
        if (_timer != null) {
            clearInterval(_timer);
            _timer = null;
        };
        QueryObject.page = page;
        QueryObject.searchstring = _getKey();
        if (querytype == "key") {
            lay.query(QueryObject);
        }
        else {
            lay.spatialQuery("bbox", QueryObject);
        }
        showResult("busy", Global.html.BUSY);
        markers.clearMarkers();
        for (var i = 0; i < markerList.length; i++) {
            markerList[i].dispose();
        }
        markerList = [];
        cDlg ? Map.removeDialog(cDlg) : null;
        /*查询之后，等待显示结果，如果时间太长则abort掉查询*/
        var _time = 0;
        _timer = setInterval(function() {
            _time++;
            if (content != null && imgcol != null) {
                /*函数返回了*/
                clearInterval(_timer);
                _timer = null;
                isAlive = false;
                showResult("success", "");
            } else {
                if (_time>=Global.COUNT) {
                    /*当前查询已经被抛弃了*/
                    isAlive = false;
                    showResult("fail", Global.html.TIMEOUT);
                    clearInterval(_timer);
                    _timer = null;
                }
            }
        }, Global.delay);
    };
    /*下一页*/
    retObj.next = function() {
        if (page < totalPage) {
            page++;
            retObj.Query();

        } else {
            console.log("当前已经是末页");
        }

    };
    /*上一页*/
    retObj.prev = function() {
        if (page > 1) {
            page--;
            retObj.Query();
        } else {
            console.log("当前已经是首页");
        }
    };
    /*跳到第p页*/
    retObj.go = function(p) {
        page = p;
        retObj.Query();
    };
    retObj.refresh = function() {
        retObj.Query();
    };
    retObj.abort = function() {
        anchor.onclick();
    };


    /*列表创建函数*/
    function BuildPageList() {
        /*最快捷的清空内容*/
        pageList = document.createElement("div");
        pageList.className = "QueryPageList";
        contentList.appendChild(pageList);

        pageList.innerHTML = "";
        if (totalPage == 0) {
            return;
        }
        var div = document.createElement("div");
        div.className = "PageList";

        var entity = document.createElement("a");
        entity.className = "QueryPageItem";
        entity.innerText = "首页";

        entity.onclick = function() {
            retObj.go(1);
        };
        div.appendChild(entity);
        /*首页部分完成*/

        /*页码的开始部分和结束部分，要判断是否小于0或者超过最大值*/

        var startNum;
        var endNum;
        if (totalPage >= 5) {
            if (page <= 3) {
                /*当前页码还是在1-3之间时，如果-2就变成负值了*/
                startNum = 1;
                endNum = 5;

            } else if (page >= totalPage - 2) {
                /*原理和上边类似*/
                endNum = totalPage;
                startNum = totalPage - 4;

            } else {
                /*这是最一般的情况*/
                startNum = page - 2;
                endNum = page + 2;

            }

        } else {
            /*页数不够5页，就把全部显示出来*/
            startNum = 1;
            endNum = totalPage;
        };
        for (var i = startNum; i <= endNum; i++) {
            entity = document.createElement("a");
            entity.className = "QueryPageItem";
            entity.innerText = i;
            if (i == page) {
                /*当前页面鼠标动作不反应，单击也不反应*/
                entity.style.backgroundColor = "rgb(161,201,200)";
            }
            else {
                var index = i;
                entity.onclick = function() {
                    /*这个部分闭包不好使，还没想出对策，直接用标签值代替*/
                    var index = parseInt(this.innerText);
                    retObj.go(index);
                };
            }
            div.appendChild(entity);
        };
        /*中间部分*/
        entity = document.createElement("a");
        entity.className = "QueryPageItem";
        entity.innerText = "末页";
        entity.onclick = function() {
            retObj.go(totalPage);

        };
        div.appendChild(entity);
        pageList.appendChild(div);

    };
    Global.handler["Query"] = retObj;
    retObj.go(1);
};




function ExploreImage(imgstr){
	var busyStr="";
	var imgs=imgstr.split(",");
	var explorer=document.getElementById("ImageExplorer");
	var prev=document.getElementById("ImagePrev");
	var next=document.getElementById("ImageNext");
	var ImageContain=document.getElementById("ImgContainer");
	var img=document.createElement("img");
	explorer.style.display="block";
	var len=imgs.length;
	var cur=-1;
	
	var expo={};
	expo.get=function(){
	    ImageContain.innerHTML = busyStr;
		var url=imgs[cur];
		var img=new Image();
		img.onload=function(){
			var w=this.width;
			var h=this.height;
			/*先判断宽度，大于800px的时候要按比例缩放*/
			if(w>800){
				this.width=800;
				this.height=parseInt((800/w)*h);
			}
			if(h>600){
				this.height=600;
				this.width=parseInt((600/h)*w);
			}
			var deltax=parseInt((800-this.width)/2);
			var deltay=parseInt((600-this.height)/2);
			this.style.margin=(deltay+"px "+deltax+"px");
			/*清除正在转的圈*/
			ImageContain.innerHTML="";
			ImageContain.appendChild(this);
		}
		img.src=url;
		if(cur>0){
			prev.onclick=function(){
				expo.prev();
			}
		}else{
		
			prev.onclick=function(){
				alert("已经是第一张");
			}
		};
		if(cur<(len-1)){
			next.onclick=function(){
				expo.next();
			}
		}else{
			next.onclick=function(){
				alert("已经是最后一张");
			}
		}
	};
	expo.go=function(num){
		cur=num;
		this.get();
	};
	expo.next=function(){
		if(cur<(len-1)){
			cur++;
		}
		this.get();
	};
	expo.prev=function(){
		if(cur>0){
			cur--;
		}
		this.get();
	};
	expo.refresh=function(){
		this.get();
	};
	
	Global.handler["ImgExpo"]=expo;
	expo.go(0);
}



function NRHLYControlBar() {
    var tools = [];
    var imgs = [];
    var map = Global.map;
    tools = [new NSZCSZoomToMaxExtentTool(), new NSZCSExploreTool(), new NSZCSZoomBoxInTool(), new NSZCSZoomBoxOutTool(), new NSZCSMeasureTool({}), new NSZCSMeasureAreaTool({}), new NSZCSSnapTool(), new NSZCSShareTool(), new NSZCSLabelButtonTool(), new NSZCSPrintTool()];
    for (var i = 0; i < 10; i++) {
        var img = document.getElementById("ti_0" + (i + 1));
        imgs.push(img);
        img.tool = tools[i];
    }

    function onClick() {
        if (Global.state == "3d") {
            alert("请切换回二维地图再使用该功能");
            return;
        }
        var tool = this.tool;
        if (tool.type == NTool.TYPE_BUTTON) {
            tool.excute();
        }
        if (tool.type == NTool.TYPE_TOGGLE) {
            if (tool._enable) {
                tool.disable()
            } else {
                tool.enable()
            }
            return
        }
        for (var i = 0, len = tools.length; i < len; i++) {
            if (tools[i] == tool) {
                continue;
            }
            if (tools[i].type != NTool.TYPE_TOGGLE) {
                tools[i].disable()
            }
        }
        tool.enable()
    }

    for (var i = 0, len = tools.length; i < len; i++) {

        imgs[i].onclick = onClick;
    }
    if (map) {
        for (var i = 0, len = tools.length; i < len; i++) {
            map.addTool(tools[i]);
            tools[i].disable();
        }
    }
};

NOCNLayer = NObject({
    div: null,
    map2d: null,
    map3d: null,
    map: null,
    newmap: null,
    in3d: false,
    state: "",
    type: "",
    ctrl: [],
    construct: function(map, type) {
        this.newmap = map;
        this.type = type;
        switch (type) {
            case "tdt":
                var maincontain = document.getElementById(Global.mapDiv);
                var map2d = document.getElementById("map2d");
                this.map2d = map2d;
                var map3d = document.createElement("div");
                map3d.id = "map3d";
                map3d.className = "map3dHide";
                maincontain.appendChild(map3d);
                this.map3d = map3d;
                map3d.innerHTML = "";
                if (!(! +[1, ])) {
                    map3d.innerHTML = "<div style='width:100%;height:100%;line-height:200px;font-size:16px;color:#555;text-align:center;'>目前三维浏览只适用于IE浏览器或居于IE内核的浏览器</div>";
                    return;
                }
                /*用try catch来判断ie内核浏览器没装插件*/
                try {
                    var tdtmap = new Geo.View3D.Map("map3d");
                    var layer1 = new Geo.View3D.Layer.GlobeTile("底图", "http://tile0.tianditu.com/services/sbsm0210");
                    var layer2 = new Geo.View3D.Layer.GlobeTile("注记", "http://tile0.tianditu.com/services/AB0512_Anno");
                    var layer3 = new Geo.View3D.Layer.Terrain("高程模型", "http://tile0.tianditu.com/services/J07098");
                    tdtmap.addLayers([layer1, layer2, layer3]);
                } catch (Error) {
                    map3d.innerHTML = "<div style='width:100%;height:100%;line-height:200px;font-size:16px;color:#555;text-align:center;'>您尚未安装三维插件！<a href='http://www.tianditu.com/download/GeoGlobeRuntimeLite4.5.1.60451.exe'>下载插件</a></div>";
                    return;
                }
                this.map = tdtmap;
                this.in3d = false;
                break;
            case "ocn":
                var map3d = document.createElement("div");
                map3d.id = "map3d";
                map3d.className = "map3dHide";
                Global.map.mapViewPortDiv.appendChild(map3d);
                this.map3d = map3d;
                var omapApi = new omap.Api("map");
                omapApi.config.setFilePath("http://img0.o.cn");
                omapApi.config.addStyle("css1", "css/skin/map.css");
                omapApi.config.addStyle("css2", "css/v3/substance.css");
                omapApi.createMap("map3d");
                omapApi.setCurrentCity(Global.city);
                this.map = omapApi;
                this.in3d = false;
                break;
        }
    },
    into3D: function() {
        if (Global.handler.Query != null) {
            Global.handler.Query.abort();
            Global.handler.Query = null;
        };
        switch (this.type) {
            case "tdt":
                if (this.in3d) {
                    return;
                } else {
                    this.map2d.className = "map2dHide";
                    this.map3d.className = "map3dDisplay";
                    var exit3d = document.getElementById("exit3D");
                    exit3d.style.display = "inline-block";
                    exit3d.onclick = function() {
                        var ctrl = Global.map.getControlsByClass("NSZCSMaptypeControl")[0];
                        ctrl.enableTool(ctrl.tools[0]);
                        /*退出了三维界面*/
                        exit3d.style.display = "none";
                    }
                    var ext = this.newmap.getBounds();
                    this.map.zoomToExtent(new Geo.Bounds(ext.left, ext.bottom, ext.right, ext.top));
                    this.in3d = true;
                }
                break;
            case "ocn":
                if (this.in3d) {
                    return;
                }
                for (var i = 0; i < this.newmap.tools.length; i++) {
                    Global.map.tools[i].disable();
                }
                var maptypectrl = this.newmap.getControlsByClass("NSZCSMaptypeControl")[0];
                this.ctrl = [];
                for (var i = 0, len = this.newmap.controls.length; i < len; i++) {
                    var crl = this.newmap.controls[i];
                    if (crl != maptypectrl) {
                        this.ctrl.push(crl);
                    }
                }
                for (var i = 0; i < this.ctrl.length; i++) {
                    this.newmap.removeControl(this.ctrl[i]);
                }

                for (var i = 0; i < this.newmap.layers.length; i++) {
                    this.newmap.layers[i].setVisible(false);
                }
                for (var i = 0; i < this.newmap.dialogs.length; i++) {
                    var dlg = this.newmap.dialogs[i];
                    this.newmap.removeDialog(dlg);
                    delete dlg;
                }

                var latlng = this.newmap.getCenter();
                var _xy = this.map.coorGps2O(latlng.lon, latlng.lat, Global.city);
                var _z = this.newmap.getZoomLevelsCount() - this.newmap.getZoomLevel();
                _z = (_z > 6) ? 6 : _z;

                var minx = this.map.Config.minX;
                var maxx = this.map.Config.maxX;
                var miny = this.map.Config.minY;
                var maxy = this.map.Config.maxY;

                if (_xy.x < minx || _xy.x > maxx || _xy.y < miny || _xy.y > maxy) {
                    if (window.confirm("当前范围没有覆盖三维数据，是否跳转到三维场景范围？")) {

                        _xy = { x: this.map.Config.x, y: this.map.Config.y };
                    }

                } else {

                }
                this.map.go2xy(_xy.x, _xy.y);
                this.map.zoomto(_z);
                this.map3d.className = "map3dDisplay";
                this.map3d.style.display = "block";
                this.map.doc_resize();
                this.in3d = true;
                break;
        }
        this.state = Global.state;
        Global.state = "3d";
    },
    exit3D: function() {
        if (this.in3d) {
            switch (this.type) {
                case "tdt":
                    this.map3d.className = "map3dHide";
                    this.map2d.className = "map2dDisplay";
                    this.in3d = false;
                    break;
                case "ocn":
                    this.map3d.className = "map3dHide";
                    this.map3d.style.display = "none";
                    for (var i = 0; i < this.newmap.layers.length; i++) {
                        this.newmap.layers[i].setVisible(true);
                    }
                    var _xy = this.map.getCenter();
                    var ct = this.map.coorO2B(_xy.x, _xy.y, Global.city);
                    var latlng = new NLatLng(ct.lng, ct.lat);
                    var _z = this.newmap.getZoomLevelsCount() - this.map.getZoom();
                    this.newmap.setCenter(latlng, _z);

                    var menu = new NSZCSContextPanel();
                    Global.map.addControl(menu);
                    var ctrl = new NScaleBarControl();
                    Global.map.addControl(ctrl);
                    ctrl = new NPanZoomBarControl();
                    Global.map.addControl(ctrl);

                    this.newmap.tools[0].enable();
                    this.in3d = false;
                    break;
            }
            Global.state = this.state;
        }
    }
});

/*需要初始化tool的load和unload*/
function pointLabelLoad(markers) {
    var tool = this;
    var markers = markers;
    var Map=Global.map;
    var type="point";
    var cDlg=null;
    var totalPage = -1;
    var page = -1;
    var size = 10;
    var contents = null;
    var container = document.getElementById("keyPanel");
    var prevDiv=document.getElementById("facePanel");
    var usrid = jQuery.cookie("userid");
    var QueryObject={"usrid":usrid,"type":type,"page":page,"size":size};
    var isAlive=false;
    var _timer=null;
    var posted=true;
    var markerList=[];

    if(usrid==null){
        /*用户没有登录*/
        location.href="./Usr/UsrLogin.htm";
        return;
    }

    /*初始化，显示结果面板*/
    if(Global.Query!=null){
        Global.Query.abort();
        Global.Query=null;
    }
    prevDiv.style.display="none";
    container.style.display="block";


    /*清除以前的查询结果*/
    container.innerHTML = "";
    var totalContainer = document.createElement("div");
    totalContainer.className = "QueryContainer";
    totalContainer.id = "_con_" + Math.random();
    container.appendChild(totalContainer);
    totalContainer.style.cssText = "display:block;width:"+container.clientWidth+"px;height:"+container.clientHeight+"px;";
    var returnDiv = document.createElement("div");
    returnDiv.className = "LabelReturnDiv";
    var msg = document.createElement("span");
    msg.innerHTML = "点标注";
    returnDiv.appendChild(msg);

    totalContainer.appendChild(returnDiv);
    contentList = document.createElement("div");
    contentList.className = "QueryContentList";
    totalContainer.appendChild(contentList);
    scrollPanel = new baidu.ui.ScrollPanel({ container: totalContainer.id, overflow: "overflow-y" });
    scrollPanel.render(totalContainer.id);
    /*异步回调，查询第page页size个内容*/

    function _addMarker(marker){

        /*构造描述面板*/
        /*确保每个标注都能得到确认或取消*/
        if(!posted){
            markers.removeMarker(marker);
            return;
        }
        posted=false;
        var latlng=marker.latlng;
        var data={params:{"title":"我的标注","content":"","titleid":"titleid","contid":"contid","sureid":"sureid","cancelid":"cancelid"}}
        var dlgstr=template("tmpl-label-parameter",data);
        var dlg = new NSZCSArrowDialog(null, latlng, null, dlgstr,false,null);
        cDlg=dlg;
        Map.addDialog(dlg,true);

        jQuery("#"+data.params.sureid).click(function(){
            function _cb(data,status){
                if(data.status=="success"){
                    posted=true;
                    if(cDlg!=null){
                        Map.removeDialog(cDlg);
                        cDlg=null;
                    }
                    cbObj.go(1);
                }else{
                    alert("标注提交失败，请稍后再试");
                }
            }
            var title=jQuery("#"+data.params.titleid).val().trim();
            var cont=jQuery("#"+data.params.contid).val().trim();
            title=(title=="")?"我的标注":title;
            var postdata={"usrid":usrid,"type":type,"geometry":latlng.toSimpleString(),"title":title,"content":cont};
            jQuery.post(Global.urls.URL_LABEL+"?method=add",postdata,_cb);
        });
        jQuery("#"+data.params.cancelid).click(function(){
            markers.removeMarker(marker);
            if(cDlg!=null){
                Map.removeDialog(cDlg);
                cDlg=null;
            }
            posted=true;
        });
    };
    function _unload(){
        isAlive = false;
        if (_timer != null) {
            clearInterval(_timer);
            _timer = null;
        }
        markers.clearMarkers();
        for (var i = 0; i < markerList.length; i++) {
            markerList[i].dispose();
        }
        cDlg ? Map.removeDialog(cDlg) : null;
        scrollPanel.dispose();
        container.style.display = "none";
        prevDiv.style.display = "block";
        Global.handler["Query"] = null;
    };

    tool.callback=_addMarker;
    tool.unload=_unload;


    function showResult(type,msg){
        switch(type){
            case "success":
                contentList.innerHTML="";
                for (var i = 0, len = content.length; i < len; i++) {
                    var item = document.createElement("div");
                    item.className = "LabelContentListItem";
                    /*添加图片标头*/
                    var ctn=document.createElement("div");
                    ctn.className="LabelContent";
                    var img = document.createElement("img");
                    img.className = "LabelContentListIMG";
                    img.src = "IMG/list/b_" + (i + 1) + ".png";
                    ctn.appendChild(img);
                    /*添加文字信息*/
                    var div = document.createElement("div");
                    div.className = "LabelContentListText";
                    var span = document.createElement("span");
                    span.innerHTML=content[i].TITLE;
                    div.appendChild(span);
                    ctn.appendChild(div);
                    var mgr=document.createElement("div");
                    mgr.className="LabelContentListMgr";
                    var a=document.createElement("a");
                    a.innerHTML="修改";
                    a.href="javascript:void(0);";
                    a.index=i;
                    a.onclick=function(evt){
                        evt=evt||window.Event;
                        if(evt.stopPropagation){
                            evt.stopPropagation();
                        }else{
                            evt.cancelBubble=true;

                        }
                        /*弹出修改框*/
                        if(!posted){
                            return;
                        }
                        posted=false;
                        var index=parseInt(this.index);
                        var marker=markerList[index];
                        
                        var latlng=marker.latlng;
                        var data={params:{"title":content[index].TITLE,"content":content[index].CONTENT,"titleid":"titleid","contid":"contid","sureid":"sureid","cancelid":"cancelid"}};
                        var dlgstr=template("tmpl-label-parameter",data);
                        var dlg = new NSZCSArrowDialog(null, latlng, null, dlgstr,false,null);
                        cDlg=dlg;
                        Map.addDialog(dlg,true);

                        jQuery("#"+data.params.sureid).click(function(){
                            function _cb(data,status){
                                if(data.status=="success"){
                                    posted=true;
                                    if(cDlg!=null){
                                        Map.removeDialog(cDlg);
                                        cDlg=null;
                                    }
                                    cbObj.go(1);
                                }else{
                                    alert("标注修改失败，请稍后再试");
                                }
                            }
                            var title=jQuery("#"+data.params.titleid).val().trim();
                            var cont=jQuery("#"+data.params.contid).val().trim();
                            title=(title=="")?"我的标注":title;
                            var postdata={"type":type,"labelid":content[index].LABELID,"geometry":latlng.toSimpleString(),"title":title,"content":cont};
                            jQuery.post(Global.urls.URL_LABEL+"?method=edit",postdata,_cb);
                        });
                        jQuery("#"+data.params.cancelid).click(function(){
                            if(cDlg!=null){
                                Map.removeDialog(cDlg);
                                cDlg=null;
                            }
                            posted=true;
                        });
                    };
                    mgr.appendChild(a);
                    a=document.createElement("a");
                    a.innerHTML="删除";
                    a.index=i;
                    a.onclick=function(evt){
                        evt=evt||window.Event;
                        if(evt.stopPropagation){
                            evt.stopPropagation();
                        }else{
                            evt.cancelBubble=true;
                        }
                        /*提示删除*/
                        function _cb(data,status){
                            if(data.status=="success"){
                                cbObj.go(1);
                            }else{
                                alert("删除过程出错");
                            }
                        };
                        var i=parseInt(this.index);
                        var postdata={"type":type,"labelid":content[i].LABELID};
                        console.log(postdata);
                        jQuery.post(Global.urls.URL_LABEL+"?method=del",postdata,_cb);
                    };
                    mgr.appendChild(a);
                    ctn.appendChild(mgr);
                    item.appendChild(ctn);

                    item.onmouseover = function() {
                        this.className = "LabelContentListItemActive";
                        this.marker.events.triggerEvent("mouseover");
                    };
                    item.onmouseout = function() {
                        this.className = "LabelContentListItem";
                        this.marker.events.triggerEvent("mouseout");
                    };
                    item.onclick = function() {
                        this.marker.events.triggerEvent("click");
                    };

                    var ico = new NIcon("IMG/list/b_" + (i + 1) + ".png", new NSize(28, 43), new NPixel(-14, -36));
                    var latlng =NLatLng.fromSimpleString(content[i].GEOMETRY);
                    var marker = new NMarker(latlng, ico);
                    markers.addMarker(marker);
                    var data={params:{"title":content[i].TITLE,"content":content[i].CONTENT}};
                    var dlgstr=template("tmpl-label-panel",data);
                    var dlg = new NSZCSArrowDialog(null, latlng, null, dlgstr, true);
                    marker.dialog = dlg;
                    
                    marker.events.bind("mouseover", marker, function() { this.setURL(this.icon.url.replace("b_", "r_")); this.icon.imageDiv.style.zIndex = "5000"; });
                    marker.events.bind("mouseout", marker, function() { this.setURL(this.icon.url.replace("r_", "b_")); this.icon.imageDiv.style.zIndex = ""; });
                    marker.events.bind("click", marker, function() {
                        if(!posted){
                            return;
                        }
                        Map.addDialog(this.dialog, true);
                        cDlg = this.dialog;
                        this.dialog.show();
                        Map.panTo(this.latlng);
                    });
                    markerList.push(marker);
                    item.marker = marker;
                    dlg.mark = marker;
                    contentList.appendChild(item);
                }
                BuildPageList();
                scrollPanel.update();
                break;
            case "busy":
                contentList.innerHTML = msg;
                break;
            case "fail":
                contentList.innerHTML = msg;
                break;
        }
    };

    function _callback(data,status){
        if(!isAlive){
            return;
        }
        totalPage=(totalPage==-1)?data.total:totalPage;
        if(totalPage==0){
            isAlive=false;
            clearInterval(_timer);
            _timer=null;
            msg.innerHTML="您有"+totalPage+"页点标注";
            showResult("fail",Global.html.NOLABEL);
        }else{
            msg.innerHTML="您有"+totalPage+"页点标注";
            content=data.content;
        }
    };

    var cbObj={};
    cbObj.Query = function() {
        content = null;
        isAlive = true;
        totalPage=-1;
        if (_timer != null) {
            clearInterval(_timer);
            _timer = null;
        };
        QueryObject.page = page;
        jQuery.post(Global.urls.URL_LABEL+"?method=get",QueryObject,_callback);
        showResult("busy", Global.html.BUSY);
        markers.clearMarkers();
        for (var i = 0; i < markerList.length; i++) {
            markerList[i].dispose();
        }
        markerList = [];
        cDlg ? Map.removeDialog(cDlg) : null;
        /*查询之后，等待显示结果，如果时间太长则abort掉查询*/
        var _time = 0;
        _timer = setInterval(function() {
            _time++;
            if (content != null && isAlive) {
                /*函数返回了*/
                clearInterval(_timer);
                _timer = null;
                isAlive = false;
                showResult("success", "");
            } else {
                if (_time >= Global.COUNT || !isAlive) {
                    /*当前查询已经被抛弃了*/
                    isAlive = false;
                    clearInterval(_timer);
                    _timer = null;
                    showResult("fail", Global.html.TIMEOUT);
                }
            }
        }, Global.delay);
    };
    /*跳到第p页*/
    cbObj.go = function(p) {
        page = p;
        cbObj.Query();
    };
    cbObj.refresh = function() {
        cbObj.Query();
    };
    cbObj.abort = function() {
        _unload();
    };
    

    /*列表创建函数*/
    function BuildPageList() {
        /*最快捷的清空内容*/
        if (totalPage == 0) {
            return;
        }
        pageList = document.createElement("div");
        pageList.className = "QueryPageList";
        contentList.appendChild(pageList);

        pageList.innerHTML = "";

        var div = document.createElement("div");
        div.className = "PageList";

        var entity = document.createElement("a");
        entity.className = "QueryPageItem";
        entity.innerText = "首页";

        entity.onclick = function() {
            cbObj.go(1);
        };
        div.appendChild(entity);
        /*首页部分完成*/
        
        /*页码的开始部分和结束部分，要判断是否小于0或者超过最大值*/

        var startNum;
        var endNum;
        if (totalPage >= 5) {
            if (page <= 3) {
                /*当前页码还是在1-3之间时，如果-2就变成负值了*/
                startNum = 1;
                endNum = 5;

            } else if (page >= totalPage - 2) {
                /*原理和上边类似*/
                endNum = totalPage;
                startNum = totalPage - 4;

            } else {
                /*这是最一般的情况*/
                startNum = page - 2;
                endNum = page + 2;

            }

        } else {
            /*页数不够5页，就把全部显示出来*/
            startNum = 1;
            endNum = totalPage;   
        };
        for (var i = startNum; i <=endNum; i++) {
            entity = document.createElement("a");
            entity.className = "QueryPageItem";
            entity.innerText = i;
            if (i == page) {
                /*当前页面鼠标动作不反应，单击也不反应*/
                entity.style.backgroundColor = "rgb(161,201,200)";
            }
            else {
                var index=i;
                entity.onclick = function() {
                /*这个部分闭包不好使，还没想出对策，直接用标签值代替*/
                    var index = parseInt(this.innerText);
                    cbObj.go(index);
                };
            }
            div.appendChild(entity);
        };
        /*中间部分*/
        entity = document.createElement("a");
        entity.className = "QueryPageItem";
        entity.innerText = "末页";
        entity.onclick = function() {
            cbObj.go(totalPage);

        };
        div.appendChild(entity);
        pageList.appendChild(div);

    };
    Global.handler["Query"]=cbObj;
    cbObj.go(1);
    
};

/*需要初始化tool的load和unload*/
function lineLabelLoad(layer) {
    var tool = this;
    var layer = layer;
    var Map=Global.map;
    var type="line";
    var cDlg=null;
    var totalPage = -1;
    var page = -1;
    var size = 10;
    var contents = null;
    var container = document.getElementById("keyPanel");
    var prevDiv=document.getElementById("facePanel");
    var usrid = jQuery.cookie("userid");
    var QueryObject={"usrid":usrid,"type":type,"page":page,"size":size};
    var isAlive=false;
    var _timer=null;
    var posted=true;
    var featureList=[];
    if(usrid==null){
        /*用户没有登录*/
        location.href="./Usr/UsrLogin.htm";
        return;
    }
    /*初始化，显示结果面板*/
    if(Global.Query!=null){
        Global.Query.abort();
        Global.Query=null;
    }
    prevDiv.style.display="none";
    container.style.display="block";

    /*清除以前的查询结果*/
    container.innerHTML = "";
    var totalContainer = document.createElement("div");
    totalContainer.className = "QueryContainer";
    totalContainer.id = "_con_" + Math.random();
    container.appendChild(totalContainer);
    totalContainer.style.cssText = "display:block;width:"+container.clientWidth+"px;height:"+container.clientHeight+"px;";
    var returnDiv = document.createElement("div");
    returnDiv.className = "LabelReturnDiv";
    var msg = document.createElement("span");
    msg.innerHTML = "线标注";
    returnDiv.appendChild(msg);

    totalContainer.appendChild(returnDiv);
    contentList = document.createElement("div");
    contentList.className = "QueryContentList";
    totalContainer.appendChild(contentList);
    scrollPanel = new baidu.ui.ScrollPanel({ container: totalContainer.id, overflow: "overflow-y" });
    scrollPanel.render(totalContainer.id);
    /*异步回调，查询第page页size个内容*/

    function _addFeature(feature){
        /*构造描述面板*/
        /*确保每个标注都能得到确认或取消*/
        var geometry=feature.geometry;
        if(!posted){
            layer.removeFeatures([feature]);
            return;
        }
        posted=false;
        /*通过bounds计算中心点*/
        var bounds=geometry.getBounds();
        var x=(bounds.right+bounds.left)/2;
        var y=(bounds.top+bounds.bottom)/2;
        var latlng=new NLatLng(x,y);
        var data={params:{"title":"我的标注","content":"","titleid":"titleid","contid":"contid","sureid":"sureid","cancelid":"cancelid"}}
        var dlgstr=template("tmpl-label-parameter",data);
        var dlg = new NSZCSArrowDialog(null, latlng, null, dlgstr,false,null);
        cDlg=dlg;
        Map.addDialog(dlg,true);

        jQuery("#"+data.params.sureid).click(function(){
            function _cb(data,status){
                if(data.status=="success"){
                    posted=true;
                    if(cDlg!=null){
                        Map.removeDialog(cDlg);
                        cDlg=null;
                    }
                    cbObj.go(1);
                }else{
                    alert("标注提交失败，请稍后再试");
                }
            }
            var title=jQuery("#"+data.params.titleid).val().trim();
            var cont=jQuery("#"+data.params.contid).val().trim();
            title=(title=="")?"我的标注":title;
            var postdata={"type":type,"geometry":geometry.toSimpleString(),"title":title,"content":cont};
            jQuery.post(Global.urls.URL_LABEL+"?method=add",postdata,_cb);
        });
        jQuery("#"+data.params.cancelid).click(function(){
            layer.removeFeatures([feature]);
            if(cDlg!=null){
                Map.removeDialog(cDlg);
                cDlg=null;
            }
            posted=true;
        });
    };
    function _unload(){
        isAlive = false;
        if (_timer != null) {
            clearInterval(_timer);
            _timer = null;
        }
        featureList=[];
        layer.disposeFeatures();
        cDlg ? Map.removeDialog(cDlg) : null;
        scrollPanel.dispose();
        container.style.display = "none";
        prevDiv.style.display = "block";
        Global.handler["Query"] = null;
    };

    tool.callback=_addFeature;
    tool.unload=_unload;

    function showResult(type,msg){
        switch(type){
            case "success":
                contentList.innerHTML="";
                for (var i = 0, len = content.length; i < len; i++) {
                    var item = document.createElement("div");
                    item.index=i;
                    item.className = "LabelContentListItem";
                    /*添加图片标头*/
                    var ctn=document.createElement("div");
                    ctn.className="LabelContent";
                    var img = document.createElement("img");
                    img.className = "LabelContentListIMG";
                    img.src = "IMG/list/b_" + (i + 1) + ".png";
                    ctn.appendChild(img);
                    /*添加文字信息*/
                    var div = document.createElement("div");
                    div.className = "LabelContentListText";
                    var span = document.createElement("span");
                    span.innerHTML=content[i].TITLE;
                    div.appendChild(span);
                    ctn.appendChild(div);
                    var mgr=document.createElement("div");
                    mgr.className="LabelContentListMgr";
                    var a=document.createElement("a");
                    a.innerHTML="修改";
                    a.href="javascript:void(0);";
                    a.index=i;
                    a.onclick=function(evt){
                        evt=evt||window.Event;
                        if(evt.stopPropagation){
                            evt.stopPropagation();
                        }else{
                            evt.cancelBubble=true;
                        }
                        /*弹出修改框*/
                        if(!posted){
                            return;
                        }
                        posted=false;
                        var index=parseInt(this.index);
                        var feature=featureList[index];
                        var latlng=feature.latlng;
                        var data={params:{"title":content[index].TITLE,"content":content[index].CONTENT,"titleid":"titleid","contid":"contid","sureid":"sureid","cancelid":"cancelid"}};
                        var dlgstr=template("tmpl-label-parameter",data);
                        var dlg = new NSZCSArrowDialog(null, latlng, null, dlgstr,false,null);
                        cDlg=dlg;
                        Map.addDialog(dlg,true);

                        jQuery("#"+data.params.sureid).click(function(){
                            function _cb(data,status){
                                if(data.status=="success"){
                                    posted=true;
                                    if(cDlg!=null){
                                        Map.removeDialog(cDlg);
                                        cDlg=null;
                                    }
                                    cbObj.go(1);
                                }else{
                                    alert("标注修改失败，请稍后再试");
                                }
                            }
                            var title=jQuery("#"+data.params.titleid).val().trim();
                            var cont=jQuery("#"+data.params.contid).val().trim();
                            title=(title=="")?"我的标注":title;
                            var postdata={"type":type,"labelid":content[index].LABELID,"title":title,"content":cont};
                            jQuery.post(Global.urls.URL_LABEL+"?method=edit",postdata,_cb);
                        });
                        jQuery("#"+data.params.cancelid).click(function(){
                            if(cDlg!=null){
                                Map.removeDialog(cDlg);
                                cDlg=null;
                            }
                            posted=true;
                        });
                    };
                    mgr.appendChild(a);
                    a=document.createElement("a");
                    a.innerHTML="删除";
                    a.index=i;
                    a.onclick=function(evt){
                        evt=evt||window.Event;
                        if(evt.stopPropagation){
                            evt.stopPropagation();
                        }else{
                            evt.cancelBubble=true;
                        }
                        /*提示删除*/
                        function _cb(data,status){
                            if(data.status=="success"){
                                if(cDlg!=null){
                                    Map.removeDialog(cDlg);
                                    cDlg=null;
                                }
                                cbObj.go(1);
                            }else{
                                alert("删除过程出错");
                            }
                        };
                        var index=parseInt(this.index);
                        var postdata={"type":type,"labelid":content[index].LABELID};
                        jQuery.post(Global.urls.URL_LABEL+"?method=del",postdata,_cb);
                    };
                    mgr.appendChild(a);
                    ctn.appendChild(mgr);
                    item.appendChild(ctn);

                    item.onmouseover = function() {
                        this.className = "LabelContentListItemActive";
                        var index=parseInt(this.index);
                        var feature=featureList[index];
                        feature.symbol = Global.Symbol["PolyLabelActivate"];
                        layer.redraw();
                    };
                    item.onmouseout = function() {
                        this.className = "LabelContentListItem";
                        var index=parseInt(this.index);
                        var feature=featureList[index];
                        feature.symbol = Global.Symbol["PolyLabel"];
                        layer.redraw();
                    };
                    item.onclick = function(evt) {
                        var index=parseInt(this.index);
                        var feature=featureList[index];
                        Map.addDialog(feature.dialog, true);
                        cDlg = feature.dialog;
                        feature.dialog.show();
                        Map.setCenter(feature.latlng);
                    };
                    var geometry=NGeometry.LineString.fromSimpleString(content[i].GEOMETRY);
                    var feature = new NVectorFeature(geometry, null, NVectorFeature.symbol["PolyLabel"]);
                    var bounds=geometry.getBounds();
                    var x=(bounds.right+bounds.left)/2;
                    var y=(bounds.top+bounds.bottom)/2;
                    var latlng=new NLatLng(x,y);
                    var data={params:{"title":content[i].TITLE,"content":content[i].CONTENT}};
                    var dlgstr=template("tmpl-label-panel",data);
                    var dlg = new NSZCSArrowDialog(null, latlng, null, dlgstr, true);
                    feature.dialog = dlg;
                    feature.latlng=latlng;
                    featureList.push(feature);
                    item.feature = feature;
                    dlg.feature = feature;
                    layer.addFeatures([feature]);
                    contentList.appendChild(item);
                }
                layer.redraw();
                BuildPageList();
                scrollPanel.update();
                break;
            case "busy":
                contentList.innerHTML = msg;
                break;
            case "fail":
                contentList.innerHTML = msg;
                break;
        }
    };

    function _callback(data,status){
        if(!isAlive){
            return;
        }
        totalPage=(totalPage==-1)?data.total:totalPage;
        msg.innerHTML="您有"+totalPage+"页线标注";
        if(totalPage==0){
            isAlive=false;
            clearInterval(_timer);
            _timer=null;
            showResult("fail",Global.html.NOLABEL);
            alert(totalPage);
        }else{         
            content=data.content;
        }
    };

    var cbObj={};
    cbObj.Query = function() {
        content = null;
        isAlive = true;
        totalPage=-1;
        if (_timer != null) {
            clearInterval(_timer);
            _timer = null;
        };
        QueryObject.page = page;
        jQuery.post(Global.urls.URL_LABEL+"?method=get",QueryObject,_callback);
        showResult("busy", Global.html.BUSY);
        layer.disposeFeatures();
        featureList=[];
        cDlg ? Map.removeDialog(cDlg) : null;
        /*查询之后，等待显示结果，如果时间太长则abort掉查询*/
        var _time = 0;
        _timer = setInterval(function() {
            _time++;
            if (content != null && isAlive) {
                /*函数返回了*/
                clearInterval(_timer);
                _timer = null;
                isAlive = false;
                showResult("success", "");
            } else {
                if (_time >= Global.COUNT || !isAlive) {
                    /*当前查询已经被抛弃了*/
                    isAlive = false;
                    clearInterval(_timer);
                    _timer = null;
                    showResult("fail", Global.html.TIMEOUT);
                }
            }
        }, Global.delay);
    };
    /*跳到第p页*/
    cbObj.go = function(p) {
        page = p;
        cbObj.Query();
    };
    cbObj.refresh = function() {
        cbObj.Query();
    };
    cbObj.abort = function() {
        _unload();
    };
    

    /*列表创建函数*/
    function BuildPageList() {
        /*最快捷的清空内容*/
        if (totalPage == 0) {
            return;
        }
        pageList = document.createElement("div");
        pageList.className = "QueryPageList";
        contentList.appendChild(pageList);

        pageList.innerHTML = "";

        var div = document.createElement("div");
        div.className = "PageList";

        var entity = document.createElement("a");
        entity.className = "QueryPageItem";
        entity.innerText = "首页";

        entity.onclick = function() {
            cbObj.go(1);
        };
        div.appendChild(entity);
        /*首页部分完成*/
        
        /*页码的开始部分和结束部分，要判断是否小于0或者超过最大值*/

        var startNum;
        var endNum;
        if (totalPage >= 5) {
            if (page <= 3) {
                /*当前页码还是在1-3之间时，如果-2就变成负值了*/
                startNum = 1;
                endNum = 5;

            } else if (page >= totalPage - 2) {
                /*原理和上边类似*/
                endNum = totalPage;
                startNum = totalPage - 4;

            } else {
                /*这是最一般的情况*/
                startNum = page - 2;
                endNum = page + 2;

            }

        } else {
            /*页数不够5页，就把全部显示出来*/
            startNum = 1;
            endNum = totalPage;   
        };
        for (var i = startNum; i <=endNum; i++) {
            entity = document.createElement("a");
            entity.className = "QueryPageItem";
            entity.innerText = i;
            if (i == page) {
                /*当前页面鼠标动作不反应，单击也不反应*/
                entity.style.backgroundColor = "rgb(161,201,200)";
            }
            else {
                var index=i;
                entity.onclick = function() {
                /*这个部分闭包不好使，还没想出对策，直接用标签值代替*/
                    var index = parseInt(this.innerText);
                    cbObj.go(index);
                };
            }
            div.appendChild(entity);
        };
        /*中间部分*/
        entity = document.createElement("a");
        entity.className = "QueryPageItem";
        entity.innerText = "末页";
        entity.onclick = function() {
            cbObj.go(totalPage);

        };
        div.appendChild(entity);
        pageList.appendChild(div);

    };
    Global.handler["Query"]=cbObj;
    cbObj.go(1);
    
};

/*需要初始化tool的load和unload*/
function polyLabelLoad(layer) {
    var tool = this;
    var layer = layer;
    var Map=Global.map;
    var type="poly";
    var cDlg=null;
    var totalPage = -1;
    var page = -1;
    var size = 10;
    var contents = null;
    var container = document.getElementById("keyPanel");
    var prevDiv=document.getElementById("facePanel");
    var usrid = jQuery.cookie("userid");
    var QueryObject={"usrid":usrid,"type":type,"page":page,"size":size};
    var isAlive=false;
    var _timer=null;
    var posted=true;
    var featureList=[];
    if(usrid==null){
        /*用户没有登录*/
        location.href="./Usr/UsrLogin.htm";
        return;
    }
    /*初始化，显示结果面板*/
    if(Global.Query!=null){
        Global.Query.abort();
        Global.Query=null;
    }
    prevDiv.style.display="none";
    container.style.display="block";

    /*清除以前的查询结果*/
    container.innerHTML = "";
    var totalContainer = document.createElement("div");
    totalContainer.className = "QueryContainer";
    totalContainer.id = "_con_" + Math.random();
    container.appendChild(totalContainer);
    totalContainer.style.cssText = "display:block;width:"+container.clientWidth+"px;height:"+container.clientHeight+"px;";
    var returnDiv = document.createElement("div");
    returnDiv.className = "QueryReturnDiv";
    var msg = document.createElement("span");
    msg.innerHTML = "线标注";
    returnDiv.appendChild(msg);

    totalContainer.appendChild(returnDiv);
    contentList = document.createElement("div");
    contentList.className = "QueryContentList";
    totalContainer.appendChild(contentList);
    scrollPanel = new baidu.ui.ScrollPanel({ container: totalContainer.id, overflow: "overflow-y" });
    scrollPanel.render(totalContainer.id);
    /*异步回调，查询第page页size个内容*/

    function _addFeature(feature){
        /*构造描述面板*/
        /*确保每个标注都能得到确认或取消*/
        Global.aaa=feature;
        var geometry=feature.geometry;
        if(!posted){
            layer.removeFeatures([feature]);
            return;
        }
        posted=false;
        /*通过bounds计算中心点*/
        var bounds=geometry.getBounds();
        var x=(bounds.right+bounds.left)/2;
        var y=(bounds.top+bounds.bottom)/2;
        var latlng=new NLatLng(x,y);
        var data={params:{"title":"我的标注","content":"","titleid":"titleid","contid":"contid","sureid":"sureid","cancelid":"cancelid"}}
        var dlgstr=template("tmpl-label-parameter",data);
        var dlg = new NSZCSArrowDialog(null, latlng, null, dlgstr,false,null);
        cDlg=dlg;
        Map.addDialog(dlg,true);

        jQuery("#"+data.params.sureid).click(function(){
            function _cb(data,status){
                if(data.status=="success"){
                    posted=true;
                    if(cDlg!=null){
                        Map.removeDialog(cDlg);
                        cDlg=null;
                    }
                    cbObj.go(1);
                }else{
                    alert("标注提交失败，请稍后再试");
                }
            }
            var title=jQuery("#"+data.params.titleid).val().trim();
            var cont=jQuery("#"+data.params.contid).val().trim();
            title=(title=="")?"我的标注":title;
            var postdata={"type":type,"geometry":geometry.toSimpleString(),"title":title,"content":cont};
            console.log(postdata);
            jQuery.post(Global.urls.URL_LABEL+"?method=add",postdata,_cb);
        });
        jQuery("#"+data.params.cancelid).click(function(){
            layer.removeFeatures([feature]);
            if(cDlg!=null){
                Map.removeDialog(cDlg);
                cDlg=null;
            }
            posted=true;
        });
    };
    function _unload(){
        isAlive = false;
        if (_timer != null) {
            clearInterval(_timer);
            _timer = null;
        }
        layer.disposeFeatures();
        cDlg ? Map.removeDialog(cDlg) : null;
        scrollPanel.dispose();
        container.style.display = "none";
        prevDiv.style.display = "block";
        Global.handler["Query"] = null;
    };

    tool.callback=_addFeature;
    tool.unload=_unload;

    function showResult(type,msg){
        switch(type){
            case "success":
                contentList.innerHTML="";
                for (var i = 0, len = content.length; i < len; i++) {
                    var item = document.createElement("div");
                    item.index=i;
                    item.className = "LabelContentListItem";
                    /*添加图片标头*/
                    var ctn=document.createElement("div");
                    ctn.className="LabelContent";
                    var img = document.createElement("img");
                    img.className = "LabelContentListIMG";
                    img.src = "IMG/list/b_" + (i + 1) + ".png";
                    ctn.appendChild(img);
                    /*添加文字信息*/
                    var div = document.createElement("div");
                    div.className = "LabelContentListText";
                    var span = document.createElement("span");
                    span.innerHTML=content[i].TITLE;
                    div.appendChild(span);
                    ctn.appendChild(div);
                    var mgr=document.createElement("div");
                    mgr.className="LabelContentListMgr";
                    var a=document.createElement("a");
                    a.innerHTML="修改";
                    a.href="javascript:void(0);";
                    a.index=i;
                    a.onclick=function(evt){
                        evt=evt||window.Event;
                        if(evt.stopPropagation){
                            evt.stopPropagation();
                        }else{
                            evt.cancelBubble=true;
                        }
                        /*弹出修改框*/
                        if(!posted){
                            return;
                        }
                        posted=false;
                        var index=parseInt(this.index);
                        var feature=featureList[index];
                        var latlng=feature.latlng;
                        var data={params:{"title":content[index].TITLE,"content":content[index].CONTENT,"titleid":"titleid","contid":"contid","sureid":"sureid","cancelid":"cancelid"}};
                        var dlgstr=template("tmpl-label-parameter",data);
                        var dlg = new NSZCSArrowDialog(null, latlng, null, dlgstr,false,null);
                        cDlg=dlg;
                        Map.addDialog(dlg,true);

                        jQuery("#"+data.params.sureid).click(function(){
                            function _cb(data,status){
                                if(data.status=="success"){
                                    posted=true;
                                    if(cDlg!=null){
                                        Map.removeDialog(cDlg);
                                        cDlg=null;
                                    }
                                    cbObj.go(1);
                                }else{
                                    alert("标注修改失败，请稍后再试");
                                }
                            }
                            var title=jQuery("#"+data.params.titleid).val().trim();
                            var cont=jQuery("#"+data.params.contid).val().trim();
                            title=(title=="")?"我的标注":title;
                            var postdata={"type":type,"labelid":content[index].LABELID,"title":title,"content":cont};
                            jQuery.post(Global.urls.URL_LABEL+"?method=edit",postdata,_cb);
                        });
                        jQuery("#"+data.params.cancelid).click(function(){
                            if(cDlg!=null){
                                Map.removeDialog(cDlg);
                                cDlg=null;
                            }
                            posted=true;
                        });
                    };
                    mgr.appendChild(a);
                    a=document.createElement("a");
                    a.innerHTML="删除";
                    a.index=i;
                    a.onclick=function(evt){
                        evt=evt||window.Event;
                        if(evt.stopPropagation){
                            evt.stopPropagation();
                        }else{
                            evt.cancelBubble=true;
                        }
                        /*提示删除*/
                        function _cb(data,status){
                            if(data.status=="success"){
                                if(cDlg!=null){
                                    Map.removeDialog(cDlg);
                                    cDlg=null;
                                }
                                cbObj.go(1);
                            }else{
                                alert("删除过程出错");
                            }
                        };
                        var index=parseInt(this.index);
                        var postdata={"usrid":usrid,"type":type,"labelid":content[index].LABELID};
                        jQuery.post(Global.urls.URL_LABEL+"?method=del",postdata,_cb);
                    };
                    mgr.appendChild(a);
                    ctn.appendChild(mgr);
                    item.appendChild(ctn);

                    item.onmouseover = function() {
                        this.className = "LabelContentListItemActive";
                        var index=parseInt(this.index);
                        var feature=featureList[index];
                        feature.symbol = Global.Symbol["PolyLabelActivate"];
                        layer.redraw();
                    };
                    item.onmouseout = function() {
                        this.className = "LabelContentListItem";
                        var index=parseInt(this.index);
                        var feature=featureList[index];
                        feature.symbol = Global.Symbol["PolyLabel"];
                        layer.redraw();
                    };
                    item.onclick = function(evt) {
                        var index=parseInt(this.index);
                        var feature=featureList[index];
                        Map.addDialog(feature.dialog, true);
                        cDlg = feature.dialog;
                        feature.dialog.show();
                        Map.setCenter(feature.latlng);
                    };
                    var geometry=NGeometry.Polygon.fromSimpleString(content[i].GEOMETRY);
                    var feature = new NVectorFeature(geometry, null, Global.Symbol["PolyLabel"]);
                    var bounds=geometry.getBounds();
                    var x=(bounds.right+bounds.left)/2;
                    var y=(bounds.top+bounds.bottom)/2;
                    var latlng=new NLatLng(x,y);
                    var data={params:{"title":content[i].TITLE,"content":content[i].CONTENT}};
                    var dlgstr=template("tmpl-label-panel",data);
                    var dlg = new NSZCSArrowDialog(null, latlng, null, dlgstr, true);
                    feature.dialog = dlg;
                    feature.latlng=latlng;
                    featureList.push(feature);
                    item.feature = feature;
                    dlg.feature = feature;
                    layer.addFeatures([feature]);
                    contentList.appendChild(item);
                }
                BuildPageList();
                scrollPanel.update();
                break;
            case "busy":
                contentList.innerHTML = msg;
                break;
            case "fail":
                contentList.innerHTML = msg;
                break;
        }
    };

    function _callback(data,status){
        if(!isAlive){
            return;
        }
        totalPage=(totalPage==-1)?data.total:totalPage;
        msg.innerHTML="您有"+totalPage+"页线标注";
        if(totalPage==0){
            isAlive=false;
            clearInterval(_timer);
            _timer=null;
            showResult("fail",Global.html.NOLABEL);
        }else{         
            content=data.content;
        }
    };

    var cbObj={};
    cbObj.Query = function() {
        content = null;
        isAlive = true;
        totalPage=-1;
        if (_timer != null) {
            clearInterval(_timer);
            _timer = null;
        };
        QueryObject.page = page;
        jQuery.post(Global.urls.URL_LABEL+"?method=get",QueryObject,_callback);
        showResult("busy", Global.html.BUSY);
        layer.disposeFeatures();
        featureList=[];
        cDlg ? Map.removeDialog(cDlg) : null;
        /*查询之后，等待显示结果，如果时间太长则abort掉查询*/
        var _time = 0;
        _timer = setInterval(function() {
            _time++;
            if (content != null && isAlive) {
                /*函数返回了*/
                clearInterval(_timer);
                _timer = null;
                isAlive = false;
                showResult("success", "");
            } else {
                if (_time >= Global.COUNT || !isAlive) {
                    /*当前查询已经被抛弃了*/
                    isAlive = false;
                    clearInterval(_timer);
                    _timer = null;
                    showResult("fail", Global.html.TIMEOUT);
                }
            }
        }, Global.delay);
    };
    /*跳到第p页*/
    cbObj.go = function(p) {
        page = p;
        cbObj.Query();
    };
    cbObj.refresh = function() {
        cbObj.Query();
    };
    cbObj.abort = function() {
        _unload();
    };
    

    /*列表创建函数*/
    function BuildPageList() {
        /*最快捷的清空内容*/
        if (totalPage == 0) {
            return;
        }
        pageList = document.createElement("div");
        pageList.className = "QueryPageList";
        contentList.appendChild(pageList);

        pageList.innerHTML = "";

        var div = document.createElement("div");
        div.className = "PageList";

        var entity = document.createElement("a");
        entity.className = "QueryPageItem";
        entity.innerText = "首页";

        entity.onclick = function() {
            cbObj.go(1);
        };
        div.appendChild(entity);
        /*首页部分完成*/
        
        /*页码的开始部分和结束部分，要判断是否小于0或者超过最大值*/

        var startNum;
        var endNum;
        if (totalPage >= 5) {
            if (page <= 3) {
                /*当前页码还是在1-3之间时，如果-2就变成负值了*/
                startNum = 1;
                endNum = 5;

            } else if (page >= totalPage - 2) {
                /*原理和上边类似*/
                endNum = totalPage;
                startNum = totalPage - 4;

            } else {
                /*这是最一般的情况*/
                startNum = page - 2;
                endNum = page + 2;

            }

        } else {
            /*页数不够5页，就把全部显示出来*/
            startNum = 1;
            endNum = totalPage;   
        };
        for (var i = startNum; i <=endNum; i++) {
            entity = document.createElement("a");
            entity.className = "QueryPageItem";
            entity.innerText = i;
            if (i == page) {
                /*当前页面鼠标动作不反应，单击也不反应*/
                entity.style.backgroundColor = "rgb(161,201,200)";
            }
            else {
                var index=i;
                entity.onclick = function() {
                /*这个部分闭包不好使，还没想出对策，直接用标签值代替*/
                    var index = parseInt(this.innerText);
                    cbObj.go(index);
                };
            }
            div.appendChild(entity);
        };
        /*中间部分*/
        entity = document.createElement("a");
        entity.className = "QueryPageItem";
        entity.innerText = "末页";
        entity.onclick = function() {
            cbObj.go(totalPage);

        };
        div.appendChild(entity);
        pageList.appendChild(div);

    };
    Global.handler["Query"]=cbObj;
    cbObj.go(1);
    
};

NSZCSViewModule = NObject(NSZCSModule, {
    type: "button",
    enable: function() {
        if (this.parent.activemod != null) {
            this.parent.activemod.disable();
        }
        this.parent.activemod = this;
        TourViewQuery("keyPanel", "facePanel");
    },
    disable: function() {
        this.parent.activemod = null;
    },
    _CLASS_NAME: "NSZCSViewModule"
});

NSZCSHotelModule = NObject(NSZCSModule, {
    type: "button",
    enable: function() {
        if (this.parent.activemod != null) {
            this.parent.activemod.disable();
        }
        this.parent.activemod = this;
        TourHotelQuery("keyPanel", "facePanel"); ;
    },
    disable: function() {
        this.parent.activemod = null;
    },
    _CLASS_NAME: "NSZCSHotelModule"
});


NSZCSAgencyModule = NObject(NSZCSModule, {
    type: "button",
    enable: function() {
        if (this.parent.activemod != null) {
            this.parent.activemod.disable();
        }
        this.parent.activemod = this;
        TourAgencyQuery("keyPanel", "facePanel");
    },
    disable: function() {
        this.parent.activemod = null;
    },
    _CLASS_NAME: "NSZCSAgencyModule"
});
