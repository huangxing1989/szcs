var Global = { "map": null, city: "", map3d: null, COUNT: 100, maxExtent: null, html: {}, mapDiv: "newmap", "lays": {}, "NEWMAP": false, "Symbol": {}, "maxtolerance": 500, "user": null, "screen": "normal", "start": null, "end": null, "scripts": null, "urls": null, "type3d": "", "debug": true, "sync": true, "delay": 50, "state": "", "param": "", "handler": {} };
Global.urls = {
    "URL_LAYER": "../SVR/GetConfig.ashx?type=map",
    "URL_CLASSIFY": "../SVR/GetConfig.ashx?type=clsy",
    "URL_SNAP": "SVR/GetSnap.ashx",
    "URL_RESOURCE": "SVR/GetResource.ashx?",
    "URL_FEEDBACK": "",
    "URL_SHARE": "SVR/ShareMap.ashx?",
    "URL_LABEL": "../SVR/LABEL.ashx"
};

Global.html.BUSY = "<div style='width:100%;line-height:300px;height:300px;'><img style='width:50px;height:50px;margin:125px 123px 125px 123px;' src='../IMG/common/loading.gif' /></div>";
Global.html.TIMEOUT = "<div style='width:296x;line-height:300px;height:300px;margin:100px 0px;color:#4c7b11;font-size:12px;text-align:center;'>网络状态不佳,请稍后再查询</div>";
Global.html.NODATA = "<div style='width:296x;line-height:300px;height:300px;margin:100px 0px;color:#4c7b11;font-size:12px;text-align:center;'>没有检索到相关信息</div>";
Global.html.NOLABEL = "<div style='width:296x;line-height:300px;height:300px;margin:100px 0px;color:#4c7b11;font-size:12px;text-align:center;'>没有该类型标注收藏</div>";
if (typeof console == "undefined") {
    window.console = { "log": function() { return arguments; } };
};


/*初始化地图函数*/
function initMap(mapDiv) {
    /*初始化地图对象开始*/
    mapDiv = (mapDiv == null) ? Global.mapDiv : mapDiv;
    var maincontain = document.getElementById(mapDiv);
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
    var _layCount = 4;
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
                Global.map.zoomToExtent(extent);
                /*设置*/
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
    };
    jQuery.getJSON(Global.urls["URL_LAYER"], {}, ajaxLays);

    var _timercall = function() {
        //initToolsAndCtrls();

        /*返回影像过渡的函数*/
        var obj = {};
        /*切换线划图函数*/
        obj["ToVector"] = function() {
            switch (Global.state) {
                case "vector":
                    return false;
                    break;
                case "raster":
                    var ext = map.getBounds();
                    map.removeLayer(Global.lays["raster"], false);
                    map.removeLayer(Global.lays["imglabel"], false);
                    map.addLayers([Global.lays["vector"], Global.lays["maplabel"]]);
                    map.zoomToExtent(ext);
                    Global.state = "vector";
                    break;
            }
        };

        /*切换影像图函数*/
        obj["ToRaster"] = function() {
            switch (Global.state) {
                case "raster":
                    return false;
                    break;
                case "vector":
                    var ext = map.getBounds();
                    map.removeLayer(Global.lays["vector"], false);
                    map.removeLayer(Global.lays["maplabel"], false);
                    map.addLayers([Global.lays["raster"], Global.lays["imglabel"]]);
                    map.zoomToExtent(ext);
                    Global.state = "raster";
                    break;
            }
        };
        Global.handler["Transition"] = obj;
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
                if (_time >= Global.COUNT) {
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

/*每个模块分别管理*/
function page0Model() {
    if (Global.handler["Query"] != null) {
        Global.handler["Query"].abort();
        Global.handler["Query"] = null;
    }
    return;
}

function page1Model() {
    if (Global.handler["Query"] != null) {
        Global.handler["Query"].abort();
        Global.handler["Query"] = null;
    }
    return;
}

function page2Model() {
    if (Global.handler["Query"] != null) {
        Global.handler["Query"].abort();
        Global.handler["Query"] = null;
    }
    var mapDiv = "labelMap";
    initMap(mapDiv);
    /*初始化标注用小地图*/
    var Map = Global.map;
    var container = document.getElementById("labelList");
    var pager = document.getElementById("labelPager");
    var msg = document.getElementById("labelMsg");
    var pageList = null;
    var labelType = document.getElementById("labelType");
    var labelCount = document.getElementById("labelPerPage");
    var type = labelType.value;
    var size = parseInt(labelCount.value);

    var page = 1;
    var totalPage = -1;
    var content = null;

    var _timer = null;
    var isAlive = false;
    var markerList = [];
    var featureList = [];
    var cDlg=null;
    var posted=true;

    var scrollPanel=null;
    var contentList=null;

    var markers = new NMarkersLayer("点标注图层");
    var layers = new NVectorLayer("线标注图层");
    Map.addLayers([layers,markers]);
    
    var QueryObject = { "type": type, "page": page, "size": size };

    container.innerHTML = "";
    var totalContainer = document.createElement("div");
    totalContainer.className = "QueryContainer";
    totalContainer.id = "_con_" + Math.random();
    container.appendChild(totalContainer);
    totalContainer.style.cssText = "display:block;width:"+container.clientWidth+"px;height:"+container.clientHeight+"px;";
    contentList = document.createElement("div");
    contentList.className = "QueryContentList";
    totalContainer.appendChild(contentList);
    scrollPanel = new baidu.ui.ScrollPanel({ container: totalContainer.id, overflow: "overflow-y" });
    scrollPanel.render(totalContainer.id);
    /*给下拉框添加监听事件*/
    labelType.onchange = function() {
        type = this.value;
        cbObj.go(1);
    };
    labelCount.onchange = function() {
        size = parseInt(this.value);
        cbObj.go(1);
    }

    function _callback(data,status) {
        if (!isAlive) {
            return;
        }
        totalPage = (totalPage == -1) ? data.total : totalPage;
        switch (type) {
            case "point":
                msg.innerHTML = "您有" + totalPage + "页点标注,当前第"+page+"页";
                break;
            case "line":
                msg.innerHTML = "您有" + totalPage + "页线标注,当前第" + page + "页";
                break;
            case "poly":
                msg.innerHTML = "您有" + totalPage + "页面标注,当前第" + page + "页";
                break;
        }
        if (totalPage == 0) {
            isAlive = false;
            clearInterval(_timer);
            _timer = null;
            showResult("fail", Global.html.NOLABEL);
        } else {
            content = data.content;
        }
    };

    function showResult(ty,msg) {
        switch (ty) {
            case "busy":
            case "fail":
                contentList.innerHTML = msg;
                break;
            case "success":
                contentList.innerHTML = "";
                var pct = new NGeometry.MultiPoint();
                for (var i = 0, len = content.length; i < len; i++) {
                    var item = document.createElement("div");
                    item.className = "LabelContentListItem";
                    /*添加图片标头*/
                    var ctn = document.createElement("div");
                    ctn.className = "LabelContent";
                    var img = document.createElement("img");
                    img.className = "LabelContentListIMG";
                    img.src = "../IMG/common/marker.png";
                    ctn.appendChild(img);
                    /*添加文字信息*/
                    var div = document.createElement("div");
                    div.className = "LabelContentListText";
                    var span = document.createElement("span");
                    span.innerHTML = content[i].TITLE;
                    div.appendChild(span);
                    ctn.appendChild(div);
                    var mgr = document.createElement("div");
                    mgr.className = "LabelContentListMgr";
                    var a = document.createElement("a");
                    a.innerHTML = "修改";
                    a.href = "javascript:void(0);";
                    a.index = i;
                    a.onclick = function(evt) {
                        evt = evt || window.Event;
                        if (evt.stopPropagation) {
                            evt.stopPropagation();
                        } else {
                            evt.cancelBubble = true;
                        }
                        /*弹出修改框*/
                        if (!posted) {
                            return;
                        }
                        posted = false;
                        var index = parseInt(this.index);
                        var latlng = null;
                        if (type == "point") {
                            var marker = markerList[index];
                            latlng = marker.latlng;
                        } else {
                            var feature = featureList[index];
                            latlng = feature.latlng;
                        }
                        var data = { params: { "title": content[index].TITLE, "content": content[index].CONTENT, "titleid": "titleid", "contid": "contid", "sureid": "sureid", "cancelid": "cancelid"} };
                        var dlgstr = template("tmpl-label-parameter", data);
                        var dlg = new NSZCSArrowDialog(null, latlng, null, dlgstr, false, null);
                        cDlg = dlg;
                        Map.addDialog(dlg, true);

                        jQuery("#" + data.params.sureid).click(function() {
                            function _cb(data, status) {
                                if (data.status == "success") {
                                    posted = true;
                                    if (cDlg != null) {
                                        Map.removeDialog(cDlg);
                                        cDlg = null;
                                    }
                                    cbObj.go(1);
                                } else {
                                    alert("标注修改失败，请稍后再试");
                                }
                            }
                            var title = jQuery("#" + data.params.titleid).val().trim();
                            var cont = jQuery("#" + data.params.contid).val().trim();
                            title = (title == "") ? "我的标注" : title;
                            var postdata = { "type": type, "labelid": content[index].LABELID, "title": title, "content": cont };
                            jQuery.post(Global.urls.URL_LABEL + "?method=edit", postdata, _cb);
                        });
                        jQuery("#" + data.params.cancelid).click(function() {
                            if (cDlg != null) {
                                Map.removeDialog(cDlg);
                                cDlg = null;
                            }
                            posted = true;
                        });
                    };
                    mgr.appendChild(a);
                    a = document.createElement("a");
                    a.innerHTML = "删除";
                    a.index = i;
                    a.onclick = function(evt) {
                        evt = evt || window.Event;
                        if (evt.stopPropagation) {
                            evt.stopPropagation();
                        } else {
                            evt.cancelBubble = true;
                        }
                        /*提示删除*/
                        function _cb(data, status) {
                            if (data.status == "success") {
                                cbObj.go(1);
                            } else {
                                alert("删除过程出错");
                            }
                        };
                        var i = parseInt(this.index);
                        var postdata = { "type": type, "labelid": content[i].LABELID };
                        jQuery.post(Global.urls.URL_LABEL + "?method=del", postdata, _cb);
                    };
                    mgr.appendChild(a);
                    ctn.appendChild(mgr);
                    item.appendChild(ctn);

                    item.onmouseover = function() {
                        this.className = "LabelContentListItemActive";
                        if (type == "point") {
                            this.marker.events.triggerEvent("mouseover");
                        } else {
                            var feature = this.feature;
                            feature.symbol = Global.Symbol["PolyLabelActivate"];
                            layers.redraw();
                        }
                    };
                    item.onmouseout = function() {
                        this.className = "LabelContentListItem";
                        if (type == "point") {
                            this.marker.events.triggerEvent("mouseout");
                        } else {
                            var feature = this.feature;
                            feature.symbol = Global.Symbol["linelabel"];
                            layers.redraw();
                        }
                    };
                    item.onclick = function() {
                        if (type == "point") {
                            this.marker.events.triggerEvent("click");
                        }
                        else {
                            var feature = this.feature;
                            Map.addDialog(feature.dialog, true);
                            cDlg = feature.dialog;
                            feature.dialog.show();
                            Map.setCenter(feature.latlng);
                            var ext = feature.geometry.getBounds();
                            Map.zoomToExtent(ext);
                        }
                    };
                    if (type == "point") {
                        var ico = new NIcon("../IMG/common/marker.png", new NSize(25, 34), new NPixel(-12, -34));
                        var latlng = NLatLng.fromSimpleString(content[i].GEOMETRY);
                        var marker = new NMarker(latlng, ico);
                        markers.addMarker(marker);
                        var data = { params: { "title": content[i].TITLE, "content": content[i].CONTENT} };
                        var dlgstr = template("tmpl-label-panel", data);
                        var dlg = new NSZCSArrowDialog(null, latlng, null, dlgstr, true);
                        marker.dialog = dlg;
                        marker.events.bind("mouseover", marker, function() { this.icon.imageDiv.style.zIndex = "5000"; });
                        marker.events.bind("mouseout", marker, function() { this.icon.imageDiv.style.zIndex = ""; });
                        marker.events.bind("click", marker, function() {
                            if (!posted) {
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
                        pct.addComponent(new NGeometry.Point(latlng.lon, latlng.lat));
                    } else if (type == "line") {
                        var geometry = NGeometry.LineString.fromSimpleString(content[i].GEOMETRY);
                        var feature = new NVectorFeature(geometry, null, Global.Symbol["PolyLabel"]);
                        var bounds = geometry.getBounds();
                        var x = (bounds.right + bounds.left) / 2;
                        var y = (bounds.top + bounds.bottom) / 2;
                        var latlng = new NLatLng(x, y);
                        var data = { params: { "title": content[i].TITLE, "content": content[i].CONTENT} };
                        var dlgstr = template("tmpl-label-panel", data);
                        var dlg = new NSZCSArrowDialog(null, latlng, null, dlgstr, true);
                        feature.dialog = dlg;
                        feature.latlng = latlng;
                        featureList.push(feature);
                        item.feature = feature;
                        dlg.feature = feature;
                        layers.addFeatures([feature]);
                        pct.addComponent(new NGeometry.Point(latlng.lon, latlng.lat));
                    } else if (type == "poly") {
                        var geometry = NGeometry.Polygon.fromSimpleString(content[i].GEOMETRY);
                        var feature = new NVectorFeature(geometry, null, Global.Symbol["PolyLabel"]);
                        var bounds = geometry.getBounds();
                        var x = (bounds.right + bounds.left) / 2;
                        var y = (bounds.top + bounds.bottom) / 2;
                        var latlng = new NLatLng(x, y);
                        var data = { params: { "title": content[i].TITLE, "content": content[i].CONTENT} };
                        var dlgstr = template("tmpl-label-panel", data);
                        var dlg = new NSZCSArrowDialog(null, latlng, null, dlgstr, true);
                        feature.dialog = dlg;
                        feature.latlng = latlng;
                        featureList.push(feature);
                        item.feature = feature;
                        dlg.feature = feature;
                        layers.addFeatures([feature]);
                        pct.addComponent(new NGeometry.Point(latlng.lon, latlng.lat));
                    }
                    contentList.appendChild(item);
                }
                BuildPageList();
                scrollPanel.update();
                if (pct.components.length > 1) {
                    var ext = pct.getBounds();
                    Map.zoomToExtent(ext);
                } else {
                    var point = pct.components[0];
                    Map.panTo(new NLatLng(point.x, point.y));
                }
                /*构建*/
                break;
        }
    };

    var cbObj = {};
    cbObj.Query = function() {
        content = null;
        isAlive = true;
        totalPage = -1;
        if (_timer != null) {
            clearInterval(_timer);
            _timer = null;
        };
        QueryObject.page = page;
        QueryObject.type = type;
        QueryObject.size = size;
        pager.innerHTML = "";
        markers.clearMarkers();
        layers.disposeFeatures();
        for (var i = 0; i < markerList.length; i++) {
            markerList[i].dispose();
        }
        markerList = [];
        for (var i = 0; i < featureList.length; i++) {
            featureList[i].dispose();
        }
        featureList = [];
        cDlg ? Map.removeDialog(cDlg) : null;
        cDlg = null;
        jQuery.post(Global.urls.URL_LABEL + "?method=get", QueryObject, _callback);
        showResult("busy", Global.html.BUSY);
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
            } else if (_time >= Global.COUNT || !isAlive) {
                /*当前查询已经被抛弃了*/
                isAlive = false;
                clearInterval(_timer);
                _timer = null;
                showResult("fail", Global.html.TIMEOUT);
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
        isAlive = false;
        content = null;
        if (_timer != null) {
            clearInterval(_timer);
            _timer = null;
        }
        markers.clearMarkers();
        layers.disposeFeatures();
        Map.removeLayer(markers);
        Map.removeLayer(layers);
        markers.dispose();
        layers.dispose();
        Map.dispose();
        document.getElementById(mapDiv).innerHTML = "";
        scrollPanel.dispose();
        scrollPanel = null;

        container.innerHTML = "";
    };


    /*列表创建函数*/
    function BuildPageList() {
        /*最快捷的清空内容*/
        if (totalPage == 0) {
            return;
        }
        pageList = document.createElement("div");
        pageList.className = "QueryPageList";
        pager.appendChild(pageList);

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
    Global.handler["Query"] = cbObj;
    cbObj.go(1);
}

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
