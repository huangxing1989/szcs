
/*跨域请求对象*/
NCrossDomainRequest = function (url, callback) {
    url+="&callback=?";
    jQuery.getJSON(url,{},callback);
};

/*放大缩小、拉框放大缩小、长度、面积量测工具
因为是单击button类型，不需要保存鼠标类型
*/
NSZCSZoomInTool = NObject(NZoomInTool, {
    toolType: "NSZCSZoomInTool",
    type: NTool.TYPE_BUTTON,
    _CLASS_NAME: "NSZCSZoomInTool"
});
NSZCSZoomOutTool = NObject(NZoomOutTool, {
    toolType: "NSZCSZoomOutTool",
    type: NTool.TYPE_BUTTON,
    _CLASS_NAME: "NSZCSZoomOutTool"
});

/*下面的按钮应该换成放大缩小镜的形式*/
NSZCSZoomBoxTool = NObject(NZoomBoxTool, {
    toolType: "NSZCSZoomBoxTool",
    inCursor: ["url('" + NUtility.getImagesLocation() + "crosshair.cur'),crosshair", '-moz-grab', 'zoomin', 'move'],
    outCursor: ["url('" + NUtility.getImagesLocation() + "crosshair.cur'),crosshair", '-moz-grab', 'zoomout', 'move'],
    prevCursor: "",
    draw: function() {
        this.processor = new NSZCSDrawRectProcessor(this, {
            done: this.zoomBox
        }, {
            keyMask: this.keyMask
        })
    },
    enable: function() {
        if (NZoomBoxTool.prototype.enable.apply(this, arguments)) {
            if (!this.setCursor) {
                return true
            }
            this.prevCursor = this.map.div.style.cursor;
            if (this.out) {
                this.map.div.style.cursor = this.outCursor
            } else {
                this.map.div.style.cursor = this.inCursor
            }
            return true
        } else {

            return false;
        }

    },
    disable: function() {
        if (NZoomBoxTool.prototype.disable.apply(this, arguments)) {

            this.map.div.style.cursor = this.prevCursor;
        } else {

            return false;
        }
    },
    _CLASS_NAME: "NSZCSZoomBoxTool"
});


NSZCSZoomBoxInTool = NObject(NSZCSZoomBoxTool, {
    out: false,
    toolType: "NSZCSZoomBoxInTool",
    _CLASS_NAME: "NSZCSZoomBoxInTool"
});
NSZCSZoomBoxOutTool = NObject(NSZCSZoomBoxTool, {
    out: true,
    toolType: "NSZCSZoomBoxOutTool",
    _CLASS_NAME: "NSZCSZoomBoxOutTool"
});

NSZCSZoomToMaxExtentTool = NObject(NZoomToMaxExtentTool, {
    toolType: "NSZCSZoomToMaxExtentTool",
    _CLASS_NAME: "NSZCSZoomToMaxExtentTool",
	excute: function () {
        if (this.map) {
            this.map.zoomToExtent(Global.maxExtent);
        }
    }
});


NSZCSFullScreenTool = NObject(NButtonTool, {
    toolType: "NSZCSFullScreenTool",
    _CLASS_NAME: "NSZCSFullScreenTool",
    excute: function() {
        if (Global.screen == "normal") {
            Global.handler.FullScreen();
            Global.screen = "full";
            Global.map.updateSize();
        } else {
            Global.handler.NormalScreen();
            Global.screen = "normal";
            Global.map.updateSize();
        }
    }
});


NSZCSCloudDialog = NObject(NCloudDialog,{
    _CLASS_NAME: "NSZCSCloudDialog"

});

NSZCSMeasureTool = NObject(NMeasureTool, {
    prevCursor: "",
    isDone: false,
    dialogs: null,
    toolType: "NSZCSMeasureTool",
    enable: function() {
        if (NMeasureTool.prototype.enable.apply(this, arguments)) {
            this.prevCursor = this.map.div.style.cursor;
            this.map.div.style.cursor = "url('" + NUtility.getImagesLocation() + "ruler.cur'),crosshair";
            this.dialogs = [];
            this.isDone = false;
            return true
        } else {
            return false;
        }
    },
    disable: function() {
        if (NMeasureTool.prototype.disable.apply(this, arguments)) {
            this.disposeDialog();
            this.map.div.style.cursor = this.prevCursor;
            return true
        } else {
            return false;
        }
    },
    disposeDialog: function() {
        if (this.dialogs != null) {
            for (var i = 0; i < this.dialogs.length; i++) {
                this.map.removeDialog(this.dialogs[i]);
                this.dialogs[i].dispose();

            }
        }
        this.dialogs = [];
    },
    measureComplete: function(geometry) {
        this.isDone = true;
        /*给最后一个对话框加上关闭按钮*/
        var len = this.dialogs.length;
        var dlg = this.dialogs[len - 1];
        /*利用一个闭包来传递this对象*/
        var obj = this;
        dlg.addCloseBox(function() {
            obj.disable();
            obj.enable();
        });
        dlg.updateSize();
    },
    measurePartial: function(point, geometry) {
        if (this.isDone) {
            this.disposeDialog();
            this.isDone = false;
        }
        var stat;
        if (geometry._CLASS_NAME.indexOf('LineString') > -1) {
            stat = this.getFitLength(geometry);
            if (stat[0] == 0.0) {
                var dlg = new NSZCSDialog(null, new NLatLng(point.x, point.y), null, "起点", false);
            }
            else {
                var dlg = new NSZCSDialog(null, new NLatLng(point.x, point.y), null, stat[0].toFixed(1) + " " + stat[1], false);
            }
            this.dialogs.push(dlg);
            this.map.addDialog(dlg);
        } else {
            stat = this.getFitArea(geometry);
            if (this.dialogs.length != 0) {
                this.disposeDialog();
            }
            var center = geometry.getBounds().getCenterInLatLng();
            var dlg = new NSZCSDialog(null, center, null, stat[0].toFixed(1) + " " + stat[1], false);
            this.dialogs.push(dlg);
            this.map.addDialog(dlg);
        }
    },
    getFitArea: function(geometry) {
        var units = this.displaySystemUnits[this.displaySystem];
        var unit, area;
        for (var i = 0, len = units.length; i < len; ++i) {
            unit = units[i];
            area = this.getArea(geometry, unit);
            if (area > 1) {
                break
            }
        }
        switch (unit) {
            case "km":
                unit = "平方千米";
                break;
            case "m":
                unit = "平方米";
                break;
        }
        return [area, unit]
    },
    getFitLength: function(geometry) {
        var units = this.displaySystemUnits[this.displaySystem];
        var unit, length;
        for (var i = 0, len = units.length; i < len; ++i) {
            unit = units[i];
            length = this.getLength(geometry, unit);
            if (length > 1) {
                break
            }
        }
        switch (unit) {
            case "km":
                unit = "千米";
                break;
            case "m":
                unit = "米";
                break;
        }
        return [length, unit]
    },
    _CLASS_NAME: "NSZCSMeasureTool"
});

NSZCSMeasureAreaTool = NObject(NSZCSMeasureTool, {
    toolType: "NSZCSMeasureAreaTool",
    mode: 'area',
    _CLASS_NAME: "NSZCSMeasureAreaTool"
});



/*测量时候用的对话框NMeasureDialog*/

NSZCSDialog = NObject(NDialog, {
    backgroundColor: "#fffeee",
    opacity: 0.9,
    border: "solid 1px #4c7b11",
    autoSize: true,
    toolType: "NSZCSDialog",
    cssClassName: "nmSZCSDialog",
    contentDivClass: "nmSZCSDialogContent",
    construct: function(id, latlng, contentSize, contentHTML, closeBox, closeBoxCallback) {
        if (id == null) {
            id = NUtility.createUniqueID(this._CLASS_NAME + "_")
        }
        this.id = id;
        this.latlng = latlng;
        this.contentSize = (contentSize != null) ? contentSize : new NSize(NDialog.WIDTH, NDialog.HEIGHT);
        if (contentHTML != null) {
            this.contentHTML = contentHTML
        }
        this.backgroundColor = NDialog.COLOR;
        this.div = NUtility.createDiv(this.id, null, null, null, null, null, "hidden");
        this.div.className = this.cssClassName;
        var groupDivId = this.id + "_GroupDiv";
        this.groupDiv = NUtility.createDiv(groupDivId, null, null, null, "relative", null, "hidden");
        var id = this.div.id + "_contentDiv";
        this.contentDiv = NUtility.createDiv(id, null, this.contentSize.clone(), null, "relative");
        this.contentDiv.className = this.contentDivClass;
        if (typeof (document.selection) == "undefined") {
            this.contentDiv.onselectstart = function() { return (false) };
        } else {
            this.contentDiv.onmouseup = function() { document.selection.empty(); };

        }
        this.groupDiv.appendChild(this.contentDiv);
        this.div.appendChild(this.groupDiv);
        if (closeBox) {
            this.addCloseBox(closeBoxCallback)
        }
        this.registerEvents()
    },
    dispose: function() {
        NDialog.prototype.dispose.apply(this, arguments);

    },
    addCloseBox: function(callback) {
        this.closeDiv = NUtility.createDiv(this.id + "_close", null, new NSize(14, 14));
        this.closeDiv.className = "nmSZCSDialogCloseBox";
        var contentDivPadding = this.getContentDivPadding();
        this.closeDiv.style.right = contentDivPadding.right + "px";
        this.closeDiv.style.top = contentDivPadding.top + "px";
        this.groupDiv.appendChild(this.closeDiv);
        var closePopup = callback ||
        function(e) {
            this.hide();
            NEvent.stop(e)
        };
        NEvent.observe(this.closeDiv, "click", NFunction.bindAsEventListener(closePopup, this))
    },
    onclick: function(evt) {

    },
    onmouseout: function(evt) {
        this.mousedown = false
    },
    ondblclick: function(evt) {

    },
    _CLASS_NAME: "NSZCSDialog"
});


NSZCSArrowDialog = NObject(NDialog, {
    latlng: null,
    div: null,
    backgroundColor: "#fff",
    opacity: "0.9",
    border: "none",
    contentDiv: null,
    arrowDiv: null,
    groupDiv: null,
    closeDiv: null,
    offset: null,
    autoSize: true,
    cssClassName: "nmSZCSArrowSDialog",
    contentDivClass: "nmSZCSArrowDialogContent",
    padding: 0,
    alwaysInView: true,
    construct: function(id, latlng, contentSize, contentHTML, closeBox, closeBoxCallback) {
        if (id == null) {
            id = NUtility.createUniqueID(this._CLASS_NAME + "_")
        }
        this.id = id;
        this.latlng = latlng;
        this.contentSize = (contentSize != null) ? contentSize : new NSize(NDialog.WIDTH, NDialog.HEIGHT);
        if (contentHTML != null) {
            this.contentHTML = contentHTML
        }
        this.div = NUtility.createDiv(this.id, null, null, null, null, null, "hidden");
        var groupDivId = this.id + "_GroupDiv";
        this.groupDiv = NUtility.createDiv(groupDivId, null, null, null, "relative", null, "hidden");
        this.groupDiv.className = this.cssClassName;
        var id = this.div.id + "_contentDiv";
        this.contentDiv = NUtility.createDiv(id, null, this.contentSize.clone(), null, "relative");
        this.contentDiv.className = this.contentDivClass;
        this.arrowDiv = NUtility.createDiv(this.div.id + "_arrowDiv", null, new NSize(51, 29), null, "relative");
        this.arrowDiv.className = "nmSZCSArrow";
        this.offset = new NPixel(0, 0);
        if (typeof (document.selection) == "undefined") {
            this.contentDiv.onselectstart = function() { return false; };
        } else {
            this.contentDiv.onmouseup = function() { /*document.selection.empty();*/ };
        }
        this.groupDiv.appendChild(this.contentDiv);
        this.groupDiv.appendChild(this.arrowDiv);
        this.div.appendChild(this.groupDiv);
        if (closeBox) {
            this.addCloseBox(closeBoxCallback)
        }
        this.registerEvents()
    },
    dispose: function() {
        this.arrowDiv.parent.removeChild(this.arrowDiv);
        this.offset = null;
        NDialog.prototype.dispose.apply(this, arguments);

    },

    draw: function(px) {
        if (px == null) {
            if ((this.latlng != null) && (this.map != null)) {
                px = this.map.worldToLayerPx(this.latlng)
            }
        }
        if (NUtility.getBrowserName() == 'firefox') {
            this.map.events._register("movestart", this, function() {
                var style = document.defaultView.getComputedStyle(this.contentDiv, null);
                var currentOverflow = style.getPropertyValue("overflow");
                if (currentOverflow != "hidden") {
                    this.contentDiv._oldOverflow = currentOverflow;
                    this.contentDiv.style.overflow = "hidden"
                }
            });
            this.map.events._register("moveend", this, function() {
                var oldOverflow = this.contentDiv._oldOverflow;
                if (oldOverflow) {
                    this.contentDiv.style.overflow = oldOverflow;
                    this.contentDiv._oldOverflow = null
                }
            })
        }

        if (!this.autoSize && !this.size) {
            this.setSize(this.contentSize)
        }
        this.setBackgroundColor();
        this.setOpacity();
        this.setBorder();
        this.setContentHTML();
        this.updateSize();
        this.updatePosition();
        if (this.alwaysInView) {
            this.panIntoView()
        }
        return this.div
    },
    updatePosition: function() {
        if ((this.latlng) && (this.map)) {
            var px = this.map.worldToLayerPx(this.latlng);
            if (px) {
                px = px.offset(this.offset);
                this.moveTo(px)
                this.arrowDiv.style.left = parseInt(this.size.w / 2) - 25 + "px";
            }
        }
    },
    moveTo: function(px) {
        if ((px != null) && (this.div != null)) {
            this.div.style.left = px.x + "px";
            this.div.style.top = px.y + "px"
        }
    },
    visible: function() {
        return NElement.visible(this.div)
    },
    toggle: function() {
        if (this.visible()) {
            this.hide()
        } else {
            this.show()
        }
    },
    show: function() {
        NElement.show(this.div);
        if (this.alwaysInView) {
            this.panIntoView()
        }
    },
    hide: function() {
        NElement.hide(this.div)
    },
    setSize: function(contentSize) {
        this.size = contentSize.clone();
        var contentDivPadding = this.getContentDivPadding();
        var wPadding = contentDivPadding.left + contentDivPadding.right;
        var hPadding = contentDivPadding.top + contentDivPadding.bottom;
        this.fixPadding();
        wPadding += this.padding.left + this.padding.right;
        hPadding += this.padding.top + this.padding.bottom;
        if (this.closeDiv) {
            var closeDivWidth = parseInt(this.closeDiv.style.width);
            wPadding += closeDivWidth + contentDivPadding.right
        }
        this.size.w += wPadding;
        this.size.h += hPadding;
        if (NUtility.getBrowserName() == "msie") {
            this.contentSize.w += contentDivPadding.left + contentDivPadding.right;
            this.contentSize.h += contentDivPadding.bottom + contentDivPadding.top
        }
        if (this.GroupDiv != null) {
            this.GroupDiv.style.width = this.size.w + "px";
            this.GroupDiv.style.height = this.size.h + "px"
        }
        if (this.contentDiv != null) {
            this.contentDiv.style.width = contentSize.w + "px";
            this.contentDiv.style.height = contentSize.h + "px"
        }

        var width = this.size.w;
        var height = this.size.h;
        this.offset = new NPixel(25 - parseInt(width / 2), -height - 31);

    },
    setBackgroundColor: function(color) {
        if (color != undefined) {
            this.backgroundColor = color
        }
        if (this.contentDiv != null) {
            this.contentDiv.style.backgroundColor = this.backgroundColor
        }
    },
    setOpacity: function(opacity) {
        if (opacity != undefined) {
            this.opacity = opacity
        }
        if (this.groupDiv != null) {
            this.groupDiv.style.opacity = this.opacity
        }
    },
    setBorder: function(border) {
        if (border != undefined) {
            this.border = border
        }
        if (this.groupDiv != null) {
            this.groupDiv.style.border = this.border
        }
    },
    setContentHTML: function(contentHTML) {
        if (contentHTML != null) {
            this.contentHTML = contentHTML
        }
        if ((this.contentDiv != null) && (this.contentHTML != null) && (this.contentHTML != this.contentDiv.innerHTML)) {
            this.contentDiv.innerHTML = this.contentHTML;
            if (this.autoSize) {
                this.registerImageListeners();
                this.updateSize()
            }
        }
    },
    registerImageListeners: function() {
        var onImgLoad = function() {
            this.dialog.updateSize();
            if (this.dialog.visible() && this.dialog.alwaysInView) {
                this.dialog.panIntoView()
            }
            NEvent.stopObserving(this.img, "load", this.img._onImageLoad)
        };
        var images = this.contentDiv.getElementsByTagName("img");
        for (var i = 0, len = images.length; i < len; i++) {
            var img = images[i];
            if (img.width == 0 || img.height == 0) {
                var context = {
                    'dialog': this,
                    'img': img
                };
                img._onImgLoad = NFunction.bind(onImgLoad, context);
                NEvent.observe(img, 'load', img._onImgLoad)
            }
        }
    },
    getSafeContentSize: function(size) {
        var safeContentSize = size.clone();
        var contentDivPadding = this.getContentDivPadding();
        var wPadding = contentDivPadding.left + contentDivPadding.right;
        var hPadding = contentDivPadding.top + contentDivPadding.bottom;
        this.fixPadding();
        wPadding += this.padding.left + this.padding.right;
        hPadding += this.padding.top + this.padding.bottom;
        if (this.closeDiv) {
            var closeDivWidth = parseInt(this.closeDiv.style.width);
            wPadding += closeDivWidth + contentDivPadding.right
        }
        if (this.minSize) {
            safeContentSize.w = Math.max(safeContentSize.w, (this.minSize.w - wPadding));
            safeContentSize.h = Math.max(safeContentSize.h, (this.minSize.h - hPadding))
        }
        if (this.maxSize) {
            safeContentSize.w = Math.min(safeContentSize.w, (this.maxSize.w - wPadding));
            safeContentSize.h = Math.min(safeContentSize.h, (this.maxSize.h - hPadding))
        }
        if (this.map && this.map.size) {
            var maxY = this.map.size.h - this.map.dialogsPad.top - this.map.dialogsPad.bottom - hPadding;
            var maxX = this.map.size.w - this.map.dialogsPad.left - this.map.dialogsPad.right - wPadding;
            safeContentSize.w = Math.min(safeContentSize.w, maxX);
            safeContentSize.h = Math.min(safeContentSize.h, maxY)
        }
        return safeContentSize
    },
    getContentDivPadding: function() {
        var contentDivPadding = this._contentDivPadding;
        if (!contentDivPadding) {
            this.div.style.display = "none";
            document.body.appendChild(this.div);
            contentDivPadding = new NBounds(NElement.getStyle(this.contentDiv, "padding-left"), NElement.getStyle(this.contentDiv, "padding-bottom"), NElement.getStyle(this.contentDiv, "padding-right"), NElement.getStyle(this.contentDiv, "padding-top"));
            this._contentDivPadding = contentDivPadding;
            document.body.removeChild(this.div);
            this.div.style.display = ""
        }
        return contentDivPadding
    },
    addCloseBox: function(callback) {
        this.closeDiv = NUtility.createDiv(this.id + "_close", null, new NSize(14, 14));
        this.closeDiv.className = "nmSZCSDialogCloseBox";
        var contentDivPadding = this.getContentDivPadding();
        this.closeDiv.style.right = contentDivPadding.right + "px";
        this.closeDiv.style.top = contentDivPadding.top + "px";
        this.groupDiv.appendChild(this.closeDiv);
        var closePopup = callback ||
        function(e) {
            this.hide();
            NEvent.stop(e)
        };
        NEvent.observe(this.closeDiv, "click", NFunction.bindAsEventListener(closePopup, this))
    },
    panIntoView: function() {
        var mapSize = this.map.getSize();
        var origTL = this.map.layerPxToMapViewPortPx(new NPixel(parseInt(this.div.style.left), parseInt(this.div.style.top)));
        var newTL = origTL.clone();
        if (origTL.x < this.map.dialogsPad.left) {
            newTL.x = this.map.dialogsPad.left
        } else if ((origTL.x + this.size.w) > (mapSize.w - this.map.dialogsPad.right)) {
            newTL.x = mapSize.w - this.map.dialogsPad.right - this.size.w
        }
        if (origTL.y < this.map.dialogsPad.top) {
            newTL.y = this.map.dialogsPad.top
        } else if ((origTL.y + this.size.h) > (mapSize.h - this.map.dialogsPad.bottom)) {
            newTL.y = mapSize.h - this.map.dialogsPad.bottom - this.size.h
        }
        var dx = origTL.x - newTL.x;
        var dy = origTL.y - newTL.y;
        this.map.pan(dx, dy)
    },
    registerEvents: function() {
        this.events = new NEvents(this, this.div, null, true);
        this.events.addListener({
            "mousedown": this.onmousedown,
            "mousemove": this.onmousemove,
            "mouseup": this.onmouseup,
            "click": this.onclick,
            "mouseout": this.onmouseout,
            "dblclick": this.ondblclick,
            scope: this
        })
    },
    onmousedown: function(evt) {
        this.mousedown = true;
        NEvent.stop(evt, true)
    },
    onmousemove: function(evt) {
        if (this.mousedown) {
            NEvent.stop(evt, true)
        }
    },
    onmouseup: function(evt) {
        if (this.mousedown) {
            this.mousedown = false;
            NEvent.stop(evt, true)
        }
    },
    onclick: function(evt) {
        NEvent.stop(evt, true)
    },
    onmouseout: function(evt) {
        this.mousedown = false
    },
    ondblclick: function(evt) {
        NEvent.stop(evt, true)
    },
    _CLASS_NAME: "NSZCSArrowDialog"
});



NSZCSMarker = NObject(NMarker, {
    data: null,
    dialog: null,
    construct: function(latlng, icon, data) {
        NMarker.prototype.construct.apply(this, [latlng, icon])
        this.data = data || {};
    },
    createDialog: function() {
        var displaystr = "";
        for (var i in this.data) {
            displaystr += i + ":";
            displaystr += this.data[i] + "<br />";
        }
        /*dialog没有创建*/
        if (this.dialog == null) {
            this.dialog = new NSZCSDialog(null, this.latlng, null, "", true);
            this.map.addDialog(this.dialog);
        }
        this.dialog.setContentHTML(displaystr);
    },
    dispose: function() {
        if (this.dialog) {
            this.map.removeDialog(this.dialog);
            this.dialog.dispose();
        }
        this.map = null;
        this.events.dispose();
        this.events = null;
        if (this.icon != null) {
            this.icon.dispose();
            this.icon = null
        }
    },
    draw: function(px) {
        return this.icon.draw(px)
    },
    updatePosition: function() {
        if ((this.latlng) && (this.map)) {
            var px = this.map.worldToLayerPx(this.latlng);
            if (px) {
                this.moveTo(px)
            }
        }
    },
    moveTo: function(px) {
        if ((px != null) && (this.icon != null)) {
            this.icon.moveTo(px)
        }
        this.latlng = this.map.layerPxToWorld(px)
    },
    InMapViewPort: function() {
        var InMapViewPort = false;
        if (this.map) {
            var screenBounds = this.map.getExtent();
            InMapViewPort = screenBounds.containsLonLat(this.latlng)
        }
        return InMapViewPort
    },
    inflate: function(inflate) {
        if (this.icon) {
            var newSize = new NSize(this.icon.size.w * inflate, this.icon.size.h * inflate);
            this.icon.setSize(newSize)
        }
    },
    setOpacity: function(opacity) {
        this.icon.setOpacity(opacity)
    },
    setURL: function(url) {
        this.icon.setURL(url)
    },
    display: function(display) {
        this.icon.display(display)
    },
    _CLASS_NAME: "NMarker"
});

NSZCSVectorFeature = NObject(NVectorFeature, {
    construct: function(geometry, attributes, symbol) {
        NVectorFeature.prototype.construct.apply(this, [null, null, attributes]);
        this.latlng = null;
        this.geometry = geometry ? geometry : null;
        this.state = null;
        this.attributes = {};
        if (attributes) {
            this.attributes = NUtility.extend(this.attributes, attributes)
        }
        this.symbol = symbol ? symbol : null
    },
    dispose: function() {
        if (this.layer) {
            this.layer.removeFeatures(this);
            this.layer = null
        }
        this.geometry = null;
        NFeature.prototype.dispose.apply(this, arguments)
    },
    clone: function() {
        return new NSZCSVectorFeature(this.geometry ? this.geometry.clone() : null, this.attributes, this.symbol)
    },

    createMarker: function() {
        return null
    },
    disposeMarker: function() { },
    createDialog: function() {
        return null
    },
    disposeDialog: function() { },
    _CLASS_NAME: "NSZCSVectorFeature"
});



NSZCSPointLabelTool = NObject(NPointLabelTool, {
    toolType: "NSZCSPointLabelTool",
    type: NTool.TYPE_TOGGLE,
    icon: null,
    load: null,
    unload: null,
    prevCursor: "pointer",
    icon: null,
    markers: null,
    excute: function(e) {
        var latlng = this.map._mapViewPortPxToWorld(e.xy);
        var icon = new NIcon("IMG/common/marker.png", new NSize(25, 34), new NPixel(-12, -34));
        var newIcon = (icon) ?icon : NMarker.defaultIcon();
        var marker = new NMarker(new NLatLng(latlng.lon, latlng.lat), newIcon);
        this.markers.addMarker(marker);
        if (this.callback != null) {
            this.callback(marker)
        }
    },
    enable: function() {
        if (NPointLabelTool.prototype.enable.apply(this, arguments)) {
            this.prevCursor = this.map.div.style.cursor;
            this.map.div.style.cursor = "url('" + NUtility.getImagesLocation() + "crosshair.cur') -16 -16,pointer";
            if (this.markers == null) {
                this.markers = new NMarkersLayer("Markers");
                this.markers.layersort = 2000;
            }
            this.map.addLayer(this.markers)
            if (this.load) {
                this.load(this.markers);
            }
            return true
        } else {
            return false;
        }
    },
    disable: function() {
        if (NPointLabelTool.prototype.disable.apply(this, arguments)) {
            this.map.div.style.cursor = this.prevCursor;
            if (this.markers != null) {
                this.map.removeLayer(this.markers);
            }
            if (this.unload != null) {
                this.unload();
            }
        } else {
            return false;
        }
    },
    _CLASS_NAME: "NSZCSPointLabelTool"
});

NSZCSLineLabelTool = NObject(NLineLabelTool, {
    toolType: "NSZCSLineLabelTool",
    type: NTool.TYPE_TOGGLE,
    layer: null,
    prevCursor: "",
    callback: null,
    load: null,
    unload: null,
    enable: function() {
        if (NTool.prototype.enable.apply(this, arguments)) {
            this.prevCursor = this.map.div.style.cursor;
            this.map.div.style.cursor = "url('" + NUtility.getImagesLocation() + "crosshair.cur'),pointer";

            if (this.layer == null) {
                this.layer = new NVectorLayer("Label Vector Layer");
            }
            this.map.addLayer(this.layer);
            if (this.load) {
                this.load(this.layer);
            }
            return true
        } else {
            return false;
        }
    },
    disable: function() {
        if (NLineLabelTool.prototype.disable.apply(this, arguments)) {
            this.map.div.style.cursor = this.prevCursor;
            if (this.layer != null) {
                this.layer.disposeFeatures();
                this.map.removeLayer(this.layer);
            }
            if (this.unload != null) {
                this.unload();
            }
        } else {
            return false;

        }
    },
    drawFeature: function(geometry) {
        var feature = new NVectorFeature(geometry, null, NVectorFeature.symbol["linelabel"]);
        this.layer.addFeatures([feature]);
        this.featureAdded(feature);
        if (this.callback != null) {
            this.callback(feature);
        }
    },
    _CLASS_NAME: "NSZCSLineLabelTool"
});


NSZCSSnapProcessor = NObject(NDrawRectProcessor, {
    boxDivClassName: 'nmSZCSDrawRectProcessor',
    controlBox: null,
    result: null,
    startBox: function(xy) {
        this.zoomBox = NUtility.createDiv('zoomBox', this.dragProcessor.start);
        this.zoomBox.className = this.boxDivClassName;
        this.zoomBox.style.zIndex = this.map.NMAP_Z_INDEX["Dialog"] - 1;
        this.map.mapViewPortDiv.appendChild(this.zoomBox)
    },
    moveBox: function(xy) {
        var startX = this.dragProcessor.start.x;
        var startY = this.dragProcessor.start.y;
        var deltaX = Math.abs(startX - xy.x);
        var deltaY = Math.abs(startY - xy.y);
        this.zoomBox.style.width = Math.max(1, deltaX) + "px";
        this.zoomBox.style.height = Math.max(1, deltaY) + "px";
        this.zoomBox.style.left = xy.x < startX ? xy.x + "px" : startX + "px";
        this.zoomBox.style.top = xy.y < startY ? xy.y + "px" : startY + "px";
        var box = this._getBoxCharacteristics(deltaX, deltaY);
        if (box.newBoxModel) {
            if (xy.x > startX) {
                this.zoomBox.style.width = Math.max(1, deltaX - box.xOffset) + "px"
            }
            if (xy.y > startY) {
                this.zoomBox.style.height = Math.max(1, deltaY - box.yOffset) + "px"
            }
        }
    },
    endBox: function(end) {
        var result;
        if (Math.abs(this.dragProcessor.start.x - end.x) > 5 || Math.abs(this.dragProcessor.start.y - end.y) > 5) {
            var start = this.dragProcessor.start;
            var top = Math.min(start.y, end.y);
            var bottom = Math.max(start.y, end.y);
            var left = Math.min(start.x, end.x);
            var right = Math.max(start.x, end.x);
            result = new NBounds(left, bottom, right, top)
        } else {
            result = this.dragProcessor.start.clone()
        }
        this.result = result;
        this.addControlBox(this.dragProcessor.start, end);
        this.disable();
    },
    removeBox: function() {
        this.map.mapViewPortDiv.removeChild(this.zoomBox);
        this.zoomBox = null;
        this.map.mapViewPortDiv.removeChild(this.controlBox);
        this.controlBox = null;
        this.boxCharacteristics = null
    },
    addControlBox: function(start, end) {

        var bottom = Math.max(start.y, end.y);
        var right = Math.max(start.x, end.x);
        bottom = bottom + 2;
        right = right - 177;
        this.controlBox = NUtility.createDiv("controlBox");
        this.controlBox.className = "nmSZCSControlBox";
        this.controlBox.style.left = right + "px";
        this.controlBox.style.top = bottom + "px";
        this.controlBox.style.zIndex = this.map.NMAP_Z_INDEX["Dialog"] - 1;

        var toolObject = this; /*纯粹为闭包使用变量*/
        var clear = NUtility.createDiv("controlBoxClear");
        clear.className = "ClearInactive";
        clear.style.left = "0px";
        clear.style.top = "0px";
        clear.onmouseover = function() {

            this.className = "ClearActive";


        };
        clear.onmouseout = function() {

            this.className = "ClearInactive";
        };
        clear.onclick = function(evt) {
            NEvent.stop(evt, true);
            toolObject.removeBox();
            toolObject.enable();
        };

        this.controlBox.appendChild(clear);

//        var sure = NUtility.createDiv("controlBoxSure");
//        sure.className = "SureInactive";
//        sure.style.left = "57px";
//        sure.style.top = "0px";
//        sure.onmouseover = function() {

//            this.className = "SureActive";

//        };
//        sure.onmouseout = function() {

//            this.className = "SureInactive";
//        }

//        this.controlBox.appendChild(sure);

        var save = NUtility.createDiv("controlBoxSave");
        save.className = "SaveInactive";
        save.style.left = "115px";
        save.style.top = "0px";
        save.onmouseover = function() {

            this.className = "SaveActive";

        };
        save.onmouseout = function() {

            this.className = "SaveInactive";
        };
        save.onclick = function() {
            toolObject.removeBox();
            var tool = toolObject;
            var map = tool.map;
            var html = map.div.innerHTML;
            var ww = map.getSize().w;
            var wh = map.getSize().h;
            var sx = tool.result.left;
            var sy = tool.result.top;
            var cw = tool.result.right - sx;
            var ch = tool.result.bottom - sy;


            var data = { 'html': html, 'ww': ww, 'wh': wh, 'x': sx, 'y': sy, 'cw': cw, 'ch': ch };

            jQuery.post(Global.urls.URL_SNAP, data, function(data, statue) { eval(data); });
            toolObject.control.disable();

        };
        this.controlBox.appendChild(save);

        this.map.mapViewPortDiv.appendChild(this.controlBox)
    },
    enable: function() {
        if (NDrawRectProcessor.prototype.enable.apply(this, arguments)) {

            return true
        } else {
            return false
        }
    },
    disable: function() {
        if (NDrawRectProcessor.prototype.disable.apply(this, arguments)) {
            return true
        } else {
            return false
        }
    },
    _CLASS_NAME: "NSZCSSnapProcessor"
});



NSZCSDrawRectProcessor = NObject(NDrawRectProcessor, {
    boxDivClassName: 'nmSZCSDrawRectProcessor',
    controlBox: null,
    startBox: function(xy) {
        this.zoomBox = NUtility.createDiv('zoomBox', this.dragProcessor.start);
        this.zoomBox.className = this.boxDivClassName;
        this.zoomBox.style.zIndex = this.map.NMAP_Z_INDEX["Dialog"] - 1;
        this.map.mapViewPortDiv.appendChild(this.zoomBox)
    },
    moveBox: function(xy) {
        var startX = this.dragProcessor.start.x;
        var startY = this.dragProcessor.start.y;
        var deltaX = Math.abs(startX - xy.x);
        var deltaY = Math.abs(startY - xy.y);
        this.zoomBox.style.width = Math.max(1, deltaX) + "px";
        this.zoomBox.style.height = Math.max(1, deltaY) + "px";
        this.zoomBox.style.left = xy.x < startX ? xy.x + "px" : startX + "px";
        this.zoomBox.style.top = xy.y < startY ? xy.y + "px" : startY + "px";
        var box = this._getBoxCharacteristics(deltaX, deltaY);
        if (box.newBoxModel) {
            if (xy.x > startX) {
                this.zoomBox.style.width = Math.max(1, deltaX - box.xOffset) + "px"
            }
            if (xy.y > startY) {
                this.zoomBox.style.height = Math.max(1, deltaY - box.yOffset) + "px"
            }
        }
    },
    endBox: function(end) {
        var result;
        if (Math.abs(this.dragProcessor.start.x - end.x) > 5 || Math.abs(this.dragProcessor.start.y - end.y) > 5) {
            var start = this.dragProcessor.start;
            var top = Math.min(start.y, end.y);
            var bottom = Math.max(start.y, end.y);
            var left = Math.min(start.x, end.x);
            var right = Math.max(start.x, end.x);
            result = new NBounds(left, bottom, right, top)
        } else {
            result = this.dragProcessor.start.clone()
        }
        this.removeBox();
        this.callback("done", [result])
    },
    removeBox: function() {
        this.map.mapViewPortDiv.removeChild(this.zoomBox);
        this.zoomBox = null;
        this.boxCharacteristics = null
    },
    enable: function() {
        if (NDrawRectProcessor.prototype.enable.apply(this, arguments)) {

            return true
        } else {
            return false
        }
    },
    disable: function() {
        if (NDrawRectProcessor.prototype.disable.apply(this, arguments)) {
            return true
        } else {
            return false
        }
    },
    _CLASS_NAME: "NSZCSDrawRectProcessor"
});

NSZCSSnapTool = NObject(NTool, {
    toolType: "NSZCSSnapTool",
    cursor: ["url('" + NUtility.getImagesLocation() + "crosshair.cur'),crosshair", '-moz-grab', 'zoomin', 'move'],
    type: NTool.TYPE_TOOL,
    setCursor: true,
    prevCursor: "",
    draw: function() {
        this.processor = new NSZCSSnapProcessor(this, {
            done: this.zoomBox
        }, {
            keyMask: this.keyMask
        })
    },
    zoomBox: function(position) {
        return;
        if (position instanceof NBounds) {
            if (!this.out) {
                var minXY = this.map.pixelToWorld(new NPixel(position.left, position.bottom));
                var maxXY = this.map.pixelToWorld(new NPixel(position.right, position.top));
                var bounds = new NBounds(minXY.lon, minXY.lat, maxXY.lon, maxXY.lat)
            } else {
                var pixWidth = Math.abs(position.right - position.left);
                var pixHeight = Math.abs(position.top - position.bottom);
                var zoomFactor = Math.min((this.map.size.h / pixHeight), (this.map.size.w / pixWidth));
                var extent = this.map.getExtent();
                var center = this.map.pixelToWorld(position.getCenterInPixel());
                var xmin = center.lon - (extent.getWidth() / 2) * zoomFactor;
                var xmax = center.lon + (extent.getWidth() / 2) * zoomFactor;
                var ymin = center.lat - (extent.getHeight() / 2) * zoomFactor;
                var ymax = center.lat + (extent.getHeight() / 2) * zoomFactor;
                var bounds = new NBounds(xmin, ymin, xmax, ymax)
            }
            this.map.zoomToExtent(bounds)
        } else {
            if (!this.out) {
                this.map.setCenter(this.map.pixelToWorld(position), this.map.getZoomLevel() + 1)
            } else {
                this.map.setCenter(this.map.pixelToWorld(position), this.map.getZoomLevel() - 1)
            }
        }
    },
    enable: function() {
        if (NTool.prototype.enable.apply(this, arguments)) {
            if (!this.setCursor) {
                return true
            }
            this.prevCursor = this.map.div.style.cursor;
            this.map.div.style.cursor = this.cursor;
            return true
        } else {

            return false;
        }
    },
    disable: function() {
        if (NTool.prototype.disable.apply(this, arguments)) {
            this.map.div.style.cursor = this.prevCursor;
        } else {
            return false;

        }

    },
    _CLASS_NAME: "NSZCSSnapTool"
});


NSZCSPolyLabelTool = NObject(NPolyLabelTool, {
    toolType: "NSZCSPolyLabelTool",
    type: NTool.TYPE_TOGGLE,
    layer: null,
    prevCursor: "",
    load: null,
    unload: null,
    callback: null,
    enable: function() {
        if (NTool.prototype.enable.apply(this, arguments)) {
            this.prevCursor = this.map.div.style.cursor;
            this.map.div.style.cursor = "url('" + NUtility.getImagesLocation() + "crosshair.cur'),crosshair";
            if (this.layer == null) {
                this.layer = new NVectorLayer("Label Vector Layer");
            }
            console.log(this.layer);
            this.map.addLayer(this.layer);
            if (this.load != null) {
                this.load(this.layer);
            }
            return true
        } else {

            return false;
        }
    },
    disable: function() {
        if (NPolyLabelTool.prototype.disable.apply(this, arguments)) {
            if (this.layer != null) {
                this.layer.disposeFeatures();
                this.map.removeLayer(this.layer);
            }
            if (this.unload != null) {
                this.unload();
            }
            this.map.div.style.cursor = this.prevCursor;
        } else {

            return false;

        }
    },
    drawFeature: function(geometry) {
        var feature = new NVectorFeature(geometry, null, NVectorFeature.symbol["polylabel"]);
        this.layer.addFeatures([feature]);
        this.featureAdded(feature);
        if (this.callback != null) {
            this.callback(feature);
        }
    },
    _CLASS_NAME: "NSZCSPolyLabelTool"
});



/*数字城市工具条*/
NSZCSToolbarControl = NObject(NPanelControl, {
    construct: function(options) {
        NPanelControl.prototype.construct.apply(this, [options]);
        this.addTools([new NSZCSZoomToMaxExtentTool(), new NSZCSSnapTool(), new NSZCSZoomInTool(), new NSZCSZoomOutTool(), new NSZCSZoomBoxInTool(), new NSZCSZoomBoxOutTool(), new NSZCSLabelButtonTool(), new NSZCSMeasureTool({}), new NSZCSMeasureAreaTool({}), new NSZCSPointLabelTool(), new NSZCSLineLabelTool(), new NSZCSPolyLabelTool()]);
    },
    draw: function() {
        var div = NPanelControl.prototype.draw.apply(this, arguments);
        return div
    },
    _CLASS_NAME: "NSZCSToolbarControl"
});

NSZCSThemeControl = NObject(NControl, {
    controlType: 'NSZCSThemeControl',
    button: null,
	_enable:false,
    position: null,
    construct: function (options) {
        this.position = new NPixel(NSZCSThemeControl.X, NSZCSThemeControl.Y);
        NControl.prototype.construct.apply(this, arguments)
    },
    dispose: function () {
        NControl.prototype.dispose.apply(this, arguments);
		if(this.button!=null){
		
			var btn=this.button;
			btn.map=null;
			NEvent.stopObservingElement(btn);
		}
        this.button = null;
        this.position = null
    },
    draw: function (px) {
		NControl.prototype.draw.apply(this, arguments);
        px = this.position;
        this.button =document.createElement("div");
		this.button.className="nmSZCSBtn";
		this.button.innerHTML="旅游专题";
        this.button.left=px.x+"px";
		this.button.top=px.y+"px";
		this.button.map= this.map;
		
		NEvent.observe(this.button, "click", NFunction.bindAsEventListener(this.click, this));
		NEvent.observe(this.button, "mousemove", NFunction.bindAsEventListener(this.mousemove, this.button));
		NEvent.observe(this.button, "doubleclick", NFunction.bindAsEventListener(this.mousemove, this.button));
		
		
		this.div.appendChild(this.button);
        return this.div
    },
    click: function (evt) {
        NEvent.stop(evt);
        if(this._enable){
			this.button.className="nmSZCSBtn";
			this._enable=false;
			this.button.innerHTML="旅游专题";
		}else{
			this.button.className="nmSZCSBtn";
			this._enable=true;
			this.button.innerHTML="公众信息";
		}
		this.toggle();
    },
	toggle:function(){
		var facepanel=document.getElementById("facePanel");
		var modulepanel=document.getElementById("modulePanel");
		if(Global.handler["Query"]!=null){
			Global.handler["Query"].abort();
			Global.handler["Query"]=null;
		}
		if(this._enable){
			facepanel.style.display="none";
			modulepanel.style.display="block";
		}else{
			modulepanel.style.display="none";
			facepanel.style.display="block";
		}
	},
	mousemove:function(evt){
		NEvent.stop(evt);
	},
    _CLASS_NAME: "NSZCSThemeControl"
});

NSZCSThemeControl.X=80;
NSZCSThemeControl.Y=20;

NSZCSLabelControl = NObject(NPanelControl, {
    construct: function(options) {
        NPanelControl.prototype.construct.apply(this, [options]);
        this.addTools([new NSZCSPointLabelTool({ load: pointLabelLoad }), new NSZCSLineLabelTool(null, { load: lineLabelLoad }), new NSZCSPolyLabelTool(null, { load: polyLabelLoad })]);
    },
    draw: function() {
        var div = NPanelControl.prototype.draw.apply(this, arguments);
        return div
    },
    addTools: function(tools) {
        if (!(tools instanceof Array)) {
            tools = [tools]
        }
        this.tools = this.tools.concat(tools);
        for (var i = 0, len = tools.length; i < len; i++) {
            var element = document.createElement("div");
            var textNode = document.createTextNode(" ");
            tools[i].panel_div = element;
            if (tools[i].title != "") {
                tools[i].panel_div.title = tools[i].title
            }
            NEvent.observe(tools[i].panel_div, "click", NFunction.bind(this.onClick, this, tools[i]));
            NEvent.observe(tools[i].panel_div, "mousedown", NFunction.bindAsEventListener(NEvent.stop))
        }
        if (this.map) {
            for (var i = 0, len = tools.length; i < len; i++) {
                this.map.addTool(tools[i]);
                tools[i].disable();
                tools[i].events.addListener({
                    "enable": this.redraw,
                    "disable": this.redraw,
                    scope: this
                })
            }
            this.redraw()
        }
    },
    enableTool: function(tool) {
        if (!this._enable) {
            return false
        }
        if (tool.type == NTool.TYPE_BUTTON) {
            tool.excute();
            this.redraw();
            return
        }
        for (var i = 0, len = this.tools.length; i < len; i++) {
            if (this.tools[i] != tool) {
                if (this.tools[i]._enable) {
                    this.tools[i].disable()
                }
            }
        }
        if (tool.type == NTool.TYPE_TOGGLE) {
            if (tool._enable) {
                tool.disable()
            } else {
                tool.enable()
            }
        }
        this.redraw();
        return
    },
    _CLASS_NAME: "NSZCSLabelControl"
});



NSZCSMenuItem = NObject(NTool, {
    toolType: "NSZCSMenuItem",
    text: "",
    callback: null,
    type: NTool.TYPE_BUTTON,
    excute: function(evt) {
		var latlng=Global.map.pixelToWorld(new NPixel(evt.x,evt.y));
		this.callback(latlng);
    },
    _CLASS_NAME: "NSZCSMenuItem"
});

NSZCSContextPanel = NObject(NPanelControl, {
    controlType: 'NSZCSContextPanel',
    down: null,
    construct: function(options) {
        NPanelControl.prototype.construct.apply(this, [options]);
        this.addTools([
			new NSZCSMenuItem({ "text": "从这出发", "callback": function(evt) {
                if (Global.handler.Query != null) {
                    Global.handler.Query.abort();
                    Global.handler.Query = null;
                };
                Global.start = { "x": evt.lon, "y": evt.lat, "name": "", "sure": false };
			    NetworkQueryOnLatlng(0.0009, "keyPanel","facePanel");
			} 
			}),
			new NSZCSMenuItem({ "text": "到这里去", "callback": function(evt) {
			    if (Global.handler.Query != null) {
			        Global.handler.Query.abort();
			        Global.handler.Query = null;
			    };
			    Global.end = { "x": evt.lon, "y": evt.lat, "name": "", "sure": false };
			    NetworkQueryOnLatlng(0.0009, "keyPanel","facePanel");
			} 
			}),
			new NSZCSMenuItem({ "text": "报告错误", "callback": function(evt) {
			    var url = "feedback.htm?";
			    url += "x=" + evt.lon + "&y=" + evt.lat;
			    window.open(url);
			} 
			})
		]);
    },
    enable: function() {
        if (NControl.prototype.enable.apply(this, arguments)) {
            for (var i = 0, len = this.tools.length; i < len; i++) {
                if (this.tools[i] == this.defaultControl) {
                    this.tools[i].enable()
                }
            }
            this.redraw();
            return true
        } else {
            return false
        }
    },
    disable: function() {
        this.map.events._unregister("mouseup", this, this.toggle);
        if (NControl.prototype.disable.apply(this, arguments)) {
            for (var i = 0, len = this.tools.length; i < len; i++) {
                this.tools[i].disable()
            }
            return true
        } else {
            return false
        }
    },
    setMap: function(map) {
        NPanelControl.prototype.setMap.apply(this, arguments);
        document.oncontextmenu = function() { return false; };
        this.map.events._registerPriority("mouseup", this, this.toggle);
    },
    draw: function() {
        NControl.prototype.draw.apply(this, arguments);
        for (var i = 0, len = this.tools.length; i < len; i++) {
            this.map.addTool(this.tools[i]);
            this.tools[i].disable();
            this.tools[i].events.addListener({
                "enable": this.redraw,
                "disable": this.redraw,
                scope: this
            })
        }
        this.enable();
        this.hide();
        return this.div
    },
    redraw: function() {
        this.div.innerHTML = "";
        if (this._enable) {
            for (var i = 0, len = this.tools.length; i < len; i++) {
                var element = this.tools[i].panel_div;
                element.className = this.tools[i].cssClassName + "ItemInactive"
                element.innerHTML = this.tools[i].text;
                this.div.appendChild(element)
            }
        }
    },
    enableTool: function(tool) {
        if (!this._enable) {
            return false
        }
        if (tool.type == NTool.TYPE_BUTTON) {
            tool.excute(this.down);
            this.redraw();
            return
        }
    },
    addTools: function(tools) {
        if (!(tools instanceof Array)) {
            tools = [tools]
        }
        this.tools = this.tools.concat(tools);
        for (var i = 0, len = tools.length; i < len; i++) {
            var element = document.createElement("div");
            if (tools[i].panel_div != null) {
                tools[i].panel_div.parent.removeChild(tools[i].panel_div);
            }
            tools[i].panel_div = element;
            if (tools[i].title != "") {
                tools[i].panel_div.title = tools[i].title
            }
            NEvent.observe(tools[i].panel_div, "click", NFunction.bind(this.onClick, this, tools[i]));
            NEvent.observe(tools[i].panel_div, "mousedown", NFunction.bindAsEventListener(NEvent.stop))
        }
        if (this.map) {
            for (var i = 0, len = tools.length; i < len; i++) {
                this.map.addTool(tools[i]);
                tools[i].disable();
                tools[i].events.addListener({
                    "enable": this.redraw,
                    "disable": this.redraw,
                    scope: this
                })
            }
            this.redraw()
        }
    },
    onClick: function(ctrl, evt) {
        NEvent.stop(evt ? evt : window.event);
        this.hide();
        this.enableTool(ctrl)
    },
    show: function(x, y) {
        this.div.style.left = x + "px";
        this.div.style.top = y + "px";
        NElement.show(this.div);
    },
    hide: function() {
        NElement.hide(this.div);
    },
    toggle: function(evt) {
        if (NEvent.isRightClick(evt)) {
            NEvent.stop(evt);
            this.show(evt.xy.x, evt.xy.y);
            this.down = evt.xy;
        } else {
            this.hide();
        }

    },
    _CLASS_NAME: "NSZCSContextPanel"
});

/*样式定义*/
NVectorFeature.symbol["linelabel"] = { 
    fillColor: "blue",
    fillOpacity: 0.5,
    hoverFillColor: "white",
    hoverFillOpacity: 0.5,
    strokeColor: "blue",
    strokeOpacity: 0.5,
    strokeLinecap: "round",
    strokeWidth: 4,
    strokeDashstyle: "solid",
    hoverStrokeColor: "red",
    hoverStrokeOpacity: 1,
    hoverStrokeWidth: 4,
    pointRadius: 5,
    hoverPointRadius: 1,
    hoverPointUnit: "%",
    pointerEvents: "visiblePainted",
    cursor: "inherit"
};
NVectorFeature.symbol["pointlabel"] = {
    fillColor: "blue",
    fillOpacity: 0.5,
    hoverFillColor: "white",
    hoverFillOpacity: 0.8,
    strokeColor: "blue",
    strokeOpacity: 0.5,
    strokeLinecap: "round",
    strokeWidth: 4,
    strokeDashstyle: "solid",
    hoverStrokeColor: "red",
    hoverStrokeOpacity: 1,
    hoverStrokeWidth: 0.2,
    pointRadius: 4,
    hoverPointRadius: 1,
    hoverPointUnit: "%",
    pointerEvents: "visiblePainted",
    cursor: "inherit"
};
NVectorFeature.symbol["polylabel"] = {
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
    hoverPointUnit: "%",
    pointerEvents: "visiblePainted",
    cursor: "pointer"
};
NVectorFeature.symbol["default"] = {
    fillColor: "blue",
    fillOpacity: 0.3,
    hoverFillColor: "white",
    hoverFillOpacity: 0.8,
    strokeColor: "blue",
    strokeOpacity: 0.5,
    strokeLinecap: "round",
    strokeWidth: 2,
    strokeDashstyle: "solid",
    hoverStrokeColor: "red",
    hoverStrokeOpacity: 1,
    hoverStrokeWidth: 0.2,
    pointRadius:2,
    hoverPointRadius: 1,
    hoverPointUnit: "%",
    pointerEvents: "visiblePainted",
    cursor: "inherit"
};


NSZCSLabelButtonTool = NObject(NButtonTool, {
    toolType: "NSZCSLabelButtonTool",
    _CLASS_NAME: "NSZCSLabelButtonTool",
	ctrl:null,
	_able:false,
	excute:function(){
		if(this.ctrl==null){
			this.ctrl=new NSZCSLabelControl();
			Global.map.addControl(this.ctrl);
			this._able=true;
			return;
		}
		if(this._able){
			this.ctrl.disable();
			NElement.hide(this.ctrl.div);
			this._able=false;
		}else{
			NElement.show(this.ctrl.div);
			this.ctrl.enable();
			this._able=true;
		}
	},
	disable:function(){
		NButtonTool.prototype.disable.apply(this,arguments);
		if(this._able){
			this.ctrl.disable();
			NElement.hide(this.ctrl.div);
			this._able=false;
		}
	}
});


NSZCSClearTool = NObject(NButtonTool, {
    toolType: "NSZCSClearTool",
    _CLASS_NAME: "NSZCSClearTool",
	excute:function(){
		if(Global.handler["Query"]!=null){
			Global.handler["Query"].abort();
			Global.handler["Query"]=null;
		}
	}
});

NSZCSExploreTool = NObject(NButtonTool, {
    toolType: "NSZCSExploreTool",
    _CLASS_NAME: "NSZCSExploreTool",
    excute: function() {

        Global.map.tools[0].enable();
        Global.map.div.style.cursor = "default";
    }
});

NSZCSShareTool = NObject(NButtonTool, {
    toolType: "NSZCSShareTool",
    _CLASS_NAME: "NSZCSShareTool",
    excute: function() {
        var html = Global.map.div.innerHTML;
        var ww = Global.map.getSize().w;
        var wh = Global.map.getSize().h;
        var data = { 'html': html, 'ww': ww, 'wh': wh };
        var me = this;
        jQuery.post(Global.urls.URL_SHARE, data, function(data, statue) { me.shareToSina(data); });
    },
    shareToSina: function(data) {
        if (data != null) {
            var url = "http://v.t.qq.com/share/share.php?title=数字河源旅游地理信息网#&url=" + encodeURIComponent(data.url);
            window.open(url, '', 'width=500, height=400, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=no, resizable=no, status=no');
        } else {
            alert("内部服务出现错误,请稍候再试");
        }
    }
});

NSZCSPrintTool = NObject(NPrintTool, {
    toolType: "NSZCSPrintTool",
    _CLASS_NAME: "NSZCSPrintTool",
	printPageUrl: 'printpage.htm'
});



NSZCSTerrainTool = NObject(NButtonTool, {
    toolType: "NSZCSTerrainTool",
    _CLASS_NAME: "NSZCSTerrainTool",
	asrc:"SDK/img/aterrain.png",
	isrc:"SDK/img/iterrain.png",
    excute: function() {
		Global.handler["Transition"].ToVector();
    }
});

NSZCSRasterTool = NObject(NButtonTool, {
    toolType: "NSZCSRasterTool",
    _CLASS_NAME: "NSZCSRasterTool",
	asrc:"SDK/img/araster.png",
	isrc:"SDK/img/iraster.png",
    excute: function() {
		Global.handler["Transition"].ToRaster();
    }
});
NSZCS3DTool = NObject(NButtonTool, {
    toolType: "NSZCS3DTool",
    _CLASS_NAME: "NSZCS3DTool",
	asrc:"SDK/img/a3d.png",
	isrc:"SDK/img/i3d.png",
    excute: function() {
		Global.handler["Transition"].To3D();
    }
});


NSZCSMaptypeControl = NObject(NPanelControl, {
	construct: function(options) {
        NPanelControl.prototype.construct.apply(this, [options]);
        //this.addTools([new NSZCSTerrainTool(), new NSZCSRasterTool(),new NSZCS3DTool()]);
    },
	draw: function () {
        NControl.prototype.draw.apply(this, arguments);
        for (var i = 0, len = this.tools.length; i < len; i++) {
            this.map.addTool(this.tools[i]);
            this.tools[i].disable();
            this.tools[i].events.addListener({
                "enable": this.redraw,
                "disable": this.redraw,
                scope: this
            })
        }
        this.enable();
		this.tools[0].enable();
        return this.div;
    },
	addTools: function (tools) {
        if (!(tools instanceof Array)) {
            tools = [tools]
        }
        this.tools = this.tools.concat(tools);
        for (var i = 0, len = tools.length; i < len; i++) {
            var element = document.createElement("img");
			element.src=tools[i].asrc;
			element.style.cssText="border:none;width:45px;height:45px;";
            tools[i].panel_div = element;
            if (tools[i].title != "") {
                tools[i].panel_div.title = tools[i].title
            }
            NEvent.observe(tools[i].panel_div, "click", NFunction.bind(this.onClick, this, tools[i]));
            NEvent.observe(tools[i].panel_div, "mousedown", NFunction.bindAsEventListener(NEvent.stop));
        }
        if (this.map) {
            for (var i = 0, len = tools.length; i < len; i++) {
                this.map.addTool(tools[i]);
                tools[i].disable();
                tools[i].events.addListener({
                    "enable": this.redraw,
                    "disable": this.redraw,
                    scope: this
                })
            }
            this.redraw()
        }
    },
	redraw: function () {
        this.div.innerHTML = "";
        if (this._enable) {
            for (var i = 0, len = this.tools.length; i < len; i++) {
                var element = this.tools[i].panel_div;
                if (this.tools[i]._enable) {
                    element.className = this.tools[i].cssClassName + "ItemActive"
					element.src=this.tools[i].asrc;
                } else {
                    element.className = this.tools[i].cssClassName + "ItemInactive"
					element.src=this.tools[i].isrc;
				}
                this.div.appendChild(element)
            }
        }
    },
    enableTool: function (tool) {
        if (!this._enable) {
            return false
        }
        if (tool.type == NTool.TYPE_BUTTON) {
            tool.excute();
			for(var i=0;i<this.tools.length;i++){
				this.tools[i]._enable=false;
			}
			tool._enable=true;
            this.redraw();
            return
        }
		for (var i = 0, len = this.tools.length; i < len; i++) {
            if (this.tools[i] != tool) {
                if (this.tools[i]._enable) {
                    this.tools[i].disable()
                }
            }
        }
        if (tool.type == NTool.TYPE_TOGGLE) {
            if (tool._enable) {
                tool.disable()
            } else {
                tool.enable()
            }
        }
        this.redraw();
        return
    },
    _CLASS_NAME: "NSZCSMaptypeControl"
});


NNetworkLayer = NObject({
    url: '',
    name: '',
    type: 'NNetworkLayer',
    qtype: 'JSON',
    maxtolerance:100,
    callback: null,
    buffer: 0,
    searchstring: '',
    labelfield: '',
    construct: function (name, url, params) {
        this.name = name;
        this.url = url;
        NUtility.extend(this, params)
    },
    query: function (options) {
        if (options != null && options != undefined) {
            NUtility.extend(this, options)
        }
        var strRequest = this.url+"&features=" + encodeURI(this.searchstring);
        strRequest += "&request=shortestpath&maxtolerance="+this.maxtolerance;
        NCrossDomainRequest(strRequest,this.callback);
        return true
    },
    _CLASS_NAME: "NNetworkLayer"
});

NSZCSModuleBoard = NObject({
    Div: null,
    Modules: {},
    activemod:null,
    construct: function(div) {
        this.Div = document.getElementById(div);
    },
    addModule: function(name, mod) {
        if (this.Modules[name] != null) {
            alert("该模块已经存在");
            return;
        }
        this.Modules[name] = mod;
        if (mod.Div) {
            this.Div.appendChild(mod.Div);
        }
        var par = this;
        mod.parent = par;
    },
    removeModule: function(name) {
        var mod = this.Modules[name];
        mod.disable();
        this.Div.removeChild(mod.Div);
        delete this.Modules[name];
    },
    dactivateModule: function() {
        for (var i in this.Modules) {
            if (this.Modules[i]._enable) {
                this.Modules[i].disable();
            }
        }
    }
});

NSZCSModule = NObject({
    type: "button",
    name: "",
    text: "",
    IMG: "",
    Div: "",
    parent: null,
    callback: null,
    _enable: false,
    className: "nmSZCSModule",
    construct: function(name, params) {
        var module = this;
        this.name = name;
        NUtility.extend(this, params);
        this.Div = document.createElement("div");
        this.Div.className = this.className;
        var img = document.createElement("img");
        img.src = this.IMG;
        this.Div.appendChild(img);
        var span = document.createElement("span");
        span.innerHTML = this.text;
        this.Div.appendChild(span);
        this.Div.onmouseover = function() {
            this.className = "nmSZCSModuleActive";
        };
        this.Div.onmouseout = function() {
            this.className = "nmSZCSModule";
        };
        this.Div.onclick = function() {
            module.handle();
        };
    },
    handle: function() {
        switch (this.type) {
            case "toggle":
                this.toggle();
                break;
            case "button":
                this.enable();
                break;
        }

    },
    toggle: function() {
        if (this._enable) {
            this.disable();
            this._enable = false;
        } else {
            this.enable();
            this._enable = true;
        }
    },
    enable: function() {
        return;
    },
    disable: function() {
        return;
    },
    _CLASS_NAME: "NSZCSModule"
});

NSZCSMonitorModule = NObject(NSZCSModule, {
    type: "button",
    enable: function() {
        if (this.parent.activemod != null) {
            this.parent.activemod.disable();
        }
        this.parent.activemod = this;
        MonitorQuery("keyPanel", "facePanel");
    },
    disable: function() {
        this.parent.activemod = null;
    },
    _CLASS_NAME: "NSZCSMonitorModule"
});

NSZCSShelterModule=NObject(NSZCSModule,{
    type: "button",
    enable: function() {
        if (this.parent.activemod != null) {
            this.parent.activemod.disable();
        }
        this.parent.activemod = this;
        ShelterQuery("keyPanel", "facePanel"); ;
    },
    disable: function() {
        this.parent.activemod = null;
    },
	_CLASS_NAME: "NSZCSShelterModule"
});


NSZCSEmergencyModule=NObject(NSZCSModule,{
    type: "button",
    enable: function() {
        if (this.parent.activemod != null) {
            this.parent.activemod.disable();
        }
        this.parent.activemod = this;
        EmergencyQuery("keyPanel", "facePanel");
    },
    disable: function() {
        this.parent.activemod = null;
    },
	_CLASS_NAME: "NSZCSEmergencyModule"
});

NSZCSGardenModule = NObject(NSZCSModule, {
    type: "button",
    enable: function() {
        if (this.parent.activemod != null) {
            this.parent.activemod.disable();
        }
        this.parent.activemod = this;
        GardenQuery("keyPanel", "facePanel");
    },
    disable: function() {
        this.parent.activemod = null;
    },
    _CLASS_NAME: "NSZCSGardenModule"
});
NSZCSParkModule = NObject(NSZCSModule, {
    type: "button",
    enable: function() {
        if (this.parent.activemod != null) {
            this.parent.activemod.disable();
        }
        this.parent.activemod = this;
        ParkQuery("keyPanel", "facePanel");
    },
    disable: function() {
        this.parent.activemod = null;
    },
    _CLASS_NAME: "NSZCSParkModule"
});
NSZCSSquareModule = NObject(NSZCSModule, {
    type: "button",
    enable: function() {
        if (this.parent.activemod != null) {
            this.parent.activemod.disable();
        }
        this.parent.activemod = this;
        SquareQuery("keyPanel", "facePanel");
    },
    disable: function() {
        this.parent.activemod = null;
    },
    _CLASS_NAME: "NSZCSSquareModule"
});

NSZCSO3DModule = NObject(NSZCSModule, {
    type: "toggle",
    enable: function() {
        if (this.parent.activemod != null) {
            this.parent.activemod.disable();
        }
        this.parent.activemod = this;
        document.getElementById("newmap").style.display = "none";
        document.getElementById("ocnmap").style.display = "block";
       
        this.Div.onmouseover = function() {
            this.className = "nmSZCSModuleActive";
        };
        this.Div.onmouseout = function() {
            this.className = "nmSZCSModuleActive";
        };
    },
    disable: function() {
        document.getElementById("ocnmap").style.display = "none";
        document.getElementById("newmap").style.display = "block";
        this.parent.activemod = null;
        this.className = "nmSZCSModule";
        this.Div.onmouseover = function() {
            this.className = "nmSZCSModuleActive";
        };
        this.Div.onmouseout = function() {
            this.className = "nmSZCSModule";
        };
    },
    _CLASS_NAME: "NSZCSO3DModule"
});

NGeometry.Point.fromSimpleString=function(str){
	str=str.trim();
	var t=str.split(" ");
	var x=parseFloat(t[0]);
	var y=parseFloat(t[1]);
	return new NGeometry.Point(x,y);
}

NGeometry.LineString.fromSimpleString =function(str){
	str=str.trim();
	var pts=str.split(",");
	var points=[];
	for(var i=0;i<pts.length;i++){
		var pt=NGeometry.Point.fromSimpleString(pts[i]);
		points.push(pt);
	}
	return new NGeometry.LineString(points);
}

NGeometry.Polygon.fromSimpleString = function(str) {
    str = str.trim();
    var rings = str.split("|");
    var rins = [];
    for (var i = 0; i < rings.length; i++) {
        var ring = NGeometry.LinearRing.fromSimpleString(rings[i]);
        rins.push(ring);
    }
    return new NGeometry.Polygon(rins);
}

NGeometry.LinearRing.fromSimpleString = function(str) {
    str = str.trim();
    var pts = str.split(",");
    var points = [];
    for (var i = 0; i < pts.length; i++) {
        var pt = NGeometry.Point.fromSimpleString(pts[i]);
        points.push(pt);
    }
    return new NGeometry.LinearRing(points);
}

NLatLng.fromSimpleString = function(str) {
    str = str.trim();
    var t = str.split(" ");
    var x = parseFloat(t[0]);
    var y = parseFloat(t[1]);
    return new NLatLng(x, y);
}

