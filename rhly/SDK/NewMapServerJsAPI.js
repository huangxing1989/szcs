(function () {
    window.NTools = {};
    window.NFilter = {};
    window.NParser = {};
    window.NGeometry = {};
    window.NProtocol = {};
    window.NStrategy = {};
    var singleFile = true;
    window.NTile = {};
    _scriptName = (!singleFile) ? "lib/NewMap.js" : "NewMapServerJsAPI.js", NGetScriptLocation = function () {
        var scriptLocation = "";
        var scriptName = _scriptName;
        var scripts = document.getElementsByTagName('script');
        for (var i = 0, len = scripts.length; i < len; i++) {
            var src = scripts[i].getAttribute('src');
            if (src) {
                var index = src.lastIndexOf(scriptName);
                if (index < 0) {
                    continue
                }
                var pathLength = src.lastIndexOf('?');
                if (pathLength < 0) {
                    pathLength = src.length
                }
                if ((index + scriptName.length) == pathLength) {
                    scriptLocation = src.slice(0, pathLength - scriptName.length);
                    break
                }
            }
        }
        return scriptLocation
    };
    if (!singleFile) {
        var jsfiles = new Array("NewMap/Utility.js", "NewMap/BaseTypes.js", "NewMap/BaseTypes/Object.js", "NewMap/BaseTypes/Bounds.js", "NewMap/BaseTypes/Element.js", "NewMap/BaseTypes/LatLng.js", "NewMap/BaseTypes/XYZ.js", "NewMap/BaseTypes/Pixel.js", "NewMap/BaseTypes/Size.js", "NewMap/Log.js", "NewMap/Transition.js", "Rico/Corner.js", "Rico/Color.js", "Gears/gears_init.js", "NewMap/Ajax.js", "NewMap/Request.js", "NewMap/Request/XMLHttpRequest.js", "NewMap/Events.js", "NewMap/Projection.js", "NewMap/Map.js", "NewMap/GlobalMap.js", "NewMap/Layer.js", "NewMap/Icon.js", "NewMap/Marker.js", "NewMap/Marker/Box.js", "NewMap/Dialog.js", "NewMap/Tile.js", "NewMap/Tile/Image.js", "NewMap/Tile/WFS.js", "NewMap/Layer/Image.js", "NewMap/Layer/SphericalMercator.js", "NewMap/Layer/EventPane.js", "NewMap/Layer/FixedZoomLevels.js", "NewMap/Layer/HTTPRequest.js", "NewMap/Layer/Grid.js", "NewMap/Layer/WMSTile.js", "NewMap/Layer/ATCache.js", "NewMap/Layer/Cache.js", "NewMap/Layer/Cache2.js", "NewMap/Layer/Query.js", "NewMap/Layer/Markers.js", "NewMap/Layer/Text.js", "NewMap/Layer/WMS.js", "NewMap/Layer/WMS/Untiled.js", "NewMap/Layer/GeoRSS.js", "NewMap/Layer/Boxes.js", "NewMap/Layer/TMS.js", "NewMap/Layer/TileCache.js", "NewMap/Layer/WMTS.js", "NewMap/Layer/Google.js", "NewMap/Layer/Yahoo.js", "NewMap/Layer/ArcGIS93Rest.js", "NewMap/Layer/OSMBase.js", "NewMap/Layer/Google/v3.js", "NewMap/Layer/SpaceEye.js", "NewMap/Layer/SpaceEye2.js", "NewMap/Dialog/AnchoredDialog.js", "NewMap/Dialog/AnchoredBubbleDialog.js", "NewMap/Dialog/FramedDialog.js", "NewMap/Dialog/FramedCloudDialog.js", "NewMap/Feature.js", "NewMap/Feature/VectorFeature.js", "NewMap/Feature/WFSFeature.js", "NewMap/Processor.js", "NewMap/Processor/Click.js", "NewMap/Processor/Hover.js", "NewMap/Processor/DrawPoint.js", "NewMap/Processor/DrawPath.js", "NewMap/Processor/DrawPolygon.js", "NewMap/Processor/DrawFeature.js", "NewMap/Processor/Drag.js", "NewMap/Processor/DrawRect.js", "NewMap/Processor/MouseWheel.js", "NewMap/Processor/Keyboard.js", "NewMap/Processor/RegularPolygon.js", "NewMap/Control.js", "NewMap/Tool.js", "NewMap/Tools/ZoomBox.js", "NewMap/Tools/Button.js", "NewMap/Tools/ZoomBoxIn.js", "NewMap/Tools/ZoomBoxOut.js", "NewMap/Tools/ZoomToMaxExtent.js", "NewMap/Tools/DragPan.js", "NewMap/Tools/Navigation.js", "NewMap/Control/CursorPosition.js", "NewMap/Control/OverviewMap.js", "NewMap/Tools/Keyboard.js", "NewMap/Control/PanZoom.js", "NewMap/Control/Panel.js", "NewMap/Control/PanZoomBar.js", "NewMap/Control/ScaleBar.js", "NewMap/Control/LayerList.js", "NewMap/Tools/DrawFeature.js", "NewMap/Tools/DragFeature.js", "NewMap/Tools/EditFeature.js", "NewMap/Tools/SelectFeature.js", "NewMap/Tools/ViewHistory.js", "NewMap/Tools/Measure.js", "NewMap/Tools/MeasureArea.js", "NewMap/Tools/NLMeasure.js", "NewMap/Geometry.js", "NewMap/Geometry/Rectangle.js", "NewMap/Geometry/Collection.js", "NewMap/Geometry/Point.js", "NewMap/Geometry/MultiPoint.js", "NewMap/Geometry/Curve.js", "NewMap/Geometry/LineString.js", "NewMap/Geometry/LinearRing.js", "NewMap/Geometry/Polygon.js", "NewMap/Geometry/MultiLineString.js", "NewMap/Geometry/MultiPolygon.js", "NewMap/Geometry/Surface.js", "NewMap/Render.js", "NewMap/Render/ElementsRender.js", "NewMap/Render/SVGRender.js", "NewMap/Render/CanvasRender.js", "NewMap/Render/VMLRender.js", "NewMap/Layer/Vector.js", "NewMap/Strategy.js", "NewMap/Strategy/Fixed.js", "NewMap/Strategy/Cluster.js", "NewMap/Strategy/Paging.js", "NewMap/Strategy/BBOX.js", "NewMap/Protocol.js", "NewMap/Protocol/HTTP.js", "NewMap/Protocol/SQL.js", "NewMap/Protocol/SQL/Gears.js", "NewMap/Layer/PointTrack.js", "NewMap/Layer/GML.js", "NewMap/Symbol.js", "NewMap/Symbols.js", "NewMap/Rule.js", "NewMap/Filter.js", "NewMap/Filter/FeatureId.js", "NewMap/Filter/Logical.js", "NewMap/Filter/Comparison.js", "NewMap/Filter/Spatial.js", "NewMap/Parser.js", "NewMap/Parser/XML.js", "NewMap/Parser/ArcXML.js", "NewMap/Parser/ArcXML/Features.js", "NewMap/Parser/GML.js", "NewMap/Parser/GML/Base.js", "NewMap/Parser/GML/v2.js", "NewMap/Parser/GML/v3.js", "NewMap/Parser/KML.js", "NewMap/Parser/GeoRSS.js", "NewMap/Parser/WFS.js", "NewMap/Parser/WKT.js", "NewMap/Parser/GPX.js", "NewMap/Parser/SLD.js", "NewMap/Parser/SLD/v1.js", "NewMap/Parser/SLD/v1_0_0.js", "NewMap/Parser/SLD/v1.js", "NewMap/Parser/Filter.js", "NewMap/Parser/Filter/v1.js", "NewMap/Parser/Filter/v1_0_0.js", "NewMap/Parser/Text.js", "NewMap/Parser/JSON.js", "NewMap/Parser/GeoJSON.js", "NewMap/Parser/WMC.js", "NewMap/Parser/WMC/v1.js", "NewMap/Parser/WMC/v1_0_0.js", "NewMap/Parser/WMC/v1_1_0.js", "NewMap/Layer/WFS.js", "NewMap/Control/NewMapToolbar.js", "NewMap/Control/MapToolbar.js", "NewMap/Tools/Pan.js", "NewMap/Tools/ZoomIn.js", "NewMap/Tools/ZoomOut.js", "NewMap/Control/EditingToolbar.js", "NewMap/Tools/ClearFeature.js", "NewMap/Tools/LineLabel.js", "NewMap/Tools/PolyLabel.js", "NewMap/Tools/CircleQuery.js", "NewMap/Tools/CircleStat.js", "NewMap/Tools/PolygonQuery.js", "NewMap/Tools/PolygonStat.js", "NewMap/Tools/RectQuery.js", "NewMap/Tools/RectStat.js", "NewMap/Language.js", "NewMap/Language/en.js", "NewMap/Language/zh-CN.js", "NewMap/NewMapBase.js", "NewMap/Tools/PointLabel.js", "NewMap/Tools/LineLabel.js", "NewMap/Tools/PolyLabel.js", "NewMap/Tools/CircleQuery.js", "NewMap/Tools/CircleStat.js", "NewMap/Tools/PolygonQuery.js", "NewMap/Tools/PolygonStat.js", "NewMap/Tools/print.js", "NewMap/Tools/RectQuery.js", "NewMap/Tools/RectStat.js", "NewMap/Tools/Resources.js", "NewMap/Tools/Flashstat.js");
        var agent = navigator.userAgent;
        var docWrite = (agent.match("MSIE") || agent.match("Safari"));
        if (docWrite) {
            var allScriptTags = new Array(jsfiles.length)
        }
        var host = NGetScriptLocation() + "lib/";
        for (var i = 0, len = jsfiles.length; i < len; i++) {
            if (docWrite) {
                allScriptTags[i] = "<script src='" + host + jsfiles[i] + "'></script>"
            } else {
                var s = document.createElement("script");
                s.src = host + jsfiles[i];
                var h = document.getElementsByTagName("head").length ? document.getElementsByTagName("head")[0] : document.body;
                h.appendChild(s)
            }
        }
        if (docWrite) {
            document.write(allScriptTags.join(""))
        }
    }
})();
NewMapAPIVERSION_NUMBER = "1.0";
NUtility = {};
NUtility.getElement = function () {
    var elements = [];
    for (var i = 0, len = arguments.length; i < len; i++) {
        var element = arguments[i];
        if (typeof element == 'string') {
            element = document.getElementById(element)
        }
        if (arguments.length == 1) {
            return element
        }
        elements.push(element)
    }
    return elements
};
if ($ == null) {
    var $ = NUtility.getElement
}
NUtility.extend = function (destination, source) {
    destination = destination || {};
    if (source) {
        for (var property in source) {
            var value = source[property];
            if (value !== undefined) {
                destination[property] = value
            }
        }
        var sourceIsEvt = typeof window.Event == "function" && source instanceof window.Event;
        if (!sourceIsEvt && source.hasOwnProperty && source.hasOwnProperty('toString')) {
            destination.toString = source.toString
        }
    }
    return destination
};
NUtility.removeItem = function (array, item) {
    for (var i = array.length - 1; i >= 0; i--) {
        if (array[i] == item) {
            array.splice(i, 1)
        }
    }
    return array
};
NUtility.clearArray = function (array) {
    NLog.warn(NMGISLG("methodDeprecated", {
        'newMethod': 'array = []'
    }));
    array.length = 0
};
NUtility.indexOf = function (array, obj) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (array[i] == obj) {
            return i
        }
    }
    return -1
};
NUtility.modifyDOMElement = function (element, id, px, sz, position, border, overflow, opacity) {
    if (id) {
        element.id = id
    }
    if (px) {
        element.style.left = px.x + "px";
        element.style.top = px.y + "px"
    }
    if (sz) {
        element.style.width = sz.w + "px";
        element.style.height = sz.h + "px"
    }
    if (position) {
        element.style.position = position
    }
    if (border) {
        element.style.border = border
    }
    if (overflow) {
        element.style.overflow = overflow
    }
    if (parseFloat(opacity) >= 0.0 && parseFloat(opacity) < 1.0) {
        element.style.filter = 'alpha(opacity=' + (opacity * 100) + ')';
        element.style.opacity = opacity
    } else if (parseFloat(opacity) == 1.0) {
        element.style.filter = '';
        element.style.opacity = ''
    }
};
NUtility.createDiv = function (id, px, sz, imgURL, position, border, overflow, opacity) {
    var dom = document.createElement('div');
    if (imgURL) {
        dom.style.backgroundImage = 'url(' + imgURL + ')'
    }
    if (!id) {
        id = NUtility.createUniqueID("NewMapDiv")
    }
    if (!position) {
        position = "absolute"
    }
    NUtility.modifyDOMElement(dom, id, px, sz, position, border, overflow, opacity);
    return dom
};
NUtility.createImage = function (id, px, sz, imgURL, position, border, opacity, delayDisplay) {
    var image = document.createElement("img");
    if (!id) {
        id = NUtility.createUniqueID("NewMapDiv")
    }
    if (!position) {
        position = "relative"
    }
    NUtility.modifyDOMElement(image, id, px, sz, position, border, null, opacity);
    if (delayDisplay) {
        image.style.display = "none";
        NEvent.observe(image, "load", NFunction.bind(NUtility.onImageLoad, image));
        NEvent.observe(image, "error", NFunction.bind(NUtility.onImageLoadError, image))
    }
    image.style.alt = id;
    image.galleryImg = "no";
    if (imgURL) {
        image.src = imgURL
    }
    return image
};
NUtility.setOpacity = function (element, opacity) {
    NUtility.modifyDOMElement(element, null, null, null, null, null, null, opacity)
};
NUtility.onImageLoad = function () {
    if (!this._viewChangedID || (this.map && this._viewChangedID == this.map._viewChangedID)) {
        this.style.backgroundColor = null;
        this.style.display = ""
    }
};
NUtility.onImageLoadErrorColor = "white";
NIMAGE_RELOAD_ATTEMPTS = 2;
NUtility.onImageLoadError = function () {
    this._attempts = (this._attempts) ? (this._attempts + 1) : 1;
    if (this._attempts <= NIMAGE_RELOAD_ATTEMPTS) {
        var urls = this.urls;
        if (urls && urls instanceof Array && urls.length > 1) {
            var src = this.src.toString();
            var current_url, k;
            for (k = 0; current_url = urls[k]; k++) {
                if (src.indexOf(current_url) != -1) {
                    break
                }
            }
            var guess = Math.floor(urls.length * Math.random());
            var new_url = urls[guess];
            k = 0;
            while (new_url == current_url && k++ < 4) {
                guess = Math.floor(urls.length * Math.random());
                new_url = urls[guess]
            }
            this.src = src.replace(current_url, new_url)
        } else {
            this.src = this.src
        }
    } else {
        this.style.backgroundColor = NUtility.onImageLoadErrorColor
    }
    this.style.display = ""
};
NUtility.alphaHack = function () {
    var arVersion = navigator.appVersion.split("MSIE");
    var version = parseFloat(arVersion[1]);
    var filter = false;
    try {
        filter = !! (document.body.filters)
    } catch (e) {}
    return (filter && (version >= 5.5) && (version < 7))
};
NUtility.modifyAlphaImageDiv = function (div, id, px, sz, imgURL, position, border, sizing, opacity) {
    NUtility.modifyDOMElement(div, id, px, sz, position, null, null, opacity);
    var img = div.childNodes[0];
    if (imgURL) {
        img.src = imgURL
    }
    NUtility.modifyDOMElement(img, div.id + "_innerImage", null, sz, "relative", border);
    if (NUtility.alphaHack()) {
        if (div.style.display != "none") {
            div.style.display = "inline-block"
        }
        if (sizing == null) {
            sizing = "scale"
        }
        div.style.filter = "progid:DXImageTransform.Microsoft" + ".AlphaImageLoader(src='" + img.src + "', " + "sizingMethod='" + sizing + "')";
        if (parseFloat(div.style.opacity) >= 0.0 && parseFloat(div.style.opacity) < 1.0) {
            div.style.filter += " alpha(opacity=" + div.style.opacity * 100 + ")"
        }
        img.style.filter = "alpha(opacity=0)"
    }
};
NUtility.createAlphaImageDiv = function (id, px, sz, imgURL, position, border, sizing, opacity, delayDisplay) {
    var div = NUtility.createDiv();
    var img = NUtility.createImage(null, null, null, null, null, null, null, false);
    div.appendChild(img);
    if (delayDisplay) {
        img.style.display = "none";
        NEvent.observe(img, "load", NFunction.bind(NUtility.onImageLoad, div));
        NEvent.observe(img, "error", NFunction.bind(NUtility.onImageLoadError, div))
    }
    NUtility.modifyAlphaImageDiv(div, id, px, sz, imgURL, position, border, sizing, opacity);
    return div
};
NUtility.createAlphaImageDivWithAlt = function (id, px, sz, imgURL, position, border, sizing, opacity, delayDisplay, altinfo) {
    var div = NUtility.createDiv();
    var img = NUtility.createImage(null, null, null, null, null, null, null, false);
    div.appendChild(img);
    if (altinfo) img.alt = altinfo;
    if (delayDisplay) {
        img.style.display = "none";
        NEvent.observe(img, "load", NFunction.bind(NUtility.onImageLoad, div));
        NEvent.observe(img, "error", NFunction.bind(NUtility.onImageLoadError, div))
    }
    NUtility.modifyAlphaImageDiv(div, id, px, sz, imgURL, position, border, sizing, opacity);
    return div
};
NUtility.upperCaseObject = function (object) {
    var uObject = {};
    for (var key in object) {
        uObject[key.toUpperCase()] = object[key]
    }
    return uObject
};
NUtility.applyDefaults = function (to, from) {
    to = to || {};
    var fromIsEvt = typeof window.Event == "function" && from instanceof window.Event;
    for (var key in from) {
        if (to[key] === undefined || (!fromIsEvt && from.hasOwnProperty && from.hasOwnProperty(key) && !to.hasOwnProperty(key))) {
            to[key] = from[key]
        }
    }
    if (!fromIsEvt && from && from.hasOwnProperty && from.hasOwnProperty('toString') && !to.hasOwnProperty('toString')) {
        to.toString = from.toString
    }
    return to
};
NUtility.getParameterString = function (params) {
    var paramsArray = [];
    for (var key in params) {
        var value = params[key];
        if ((value != null) && (typeof value != 'function')) {
            var encodedValue;
            if (typeof value == 'object' && value.constructor == Array) {
                var encodedItemArray = [];
                for (var itemIndex = 0, len = value.length; itemIndex < len; itemIndex++) {
                    encodedItemArray.push(encodeURIComponent(value[itemIndex]))
                }
                encodedValue = encodedItemArray.join(",")
            } else {
                encodedValue = encodeURIComponent(value)
            }
            paramsArray.push(encodeURIComponent(key) + "=" + encodedValue)
        }
    }
    return paramsArray.join("&")
};
NImgPath = '';
NUtility.getImagesLocation = function () {
    return NImgPath || (NGetScriptLocation() + "img/")
};
NUtility.Try = function () {
    var returnValue = null;
    for (var i = 0, len = arguments.length; i < len; i++) {
        var lambda = arguments[i];
        try {
            returnValue = lambda();
            break
        } catch (e) {}
    }
    return returnValue
};
NUtility.getNodes = function (p, tagName) {
    var nodes = NUtility.Try(function () {
        return NUtility._getNodes(p.documentElement.childNodes, tagName)
    }, function () {
        return NUtility._getNodes(p.childNodes, tagName)
    });
    return nodes
};
NUtility._getNodes = function (nodes, tagName) {
    var retArray = [];
    for (var i = 0, len = nodes.length; i < len; i++) {
        if (nodes[i].nodeName == tagName) {
            retArray.push(nodes[i])
        }
    }
    return retArray
};
NUtility.getTagText = function (parent, item, index) {
    var result = NUtility.getNodes(parent, item);
    if (result && (result.length > 0)) {
        if (!index) {
            index = 0
        }
        if (result[index].childNodes.length > 1) {
            return result.childNodes[1].nodeValue
        } else if (result[index].childNodes.length == 1) {
            return result[index].firstChild.nodeValue
        }
    } else {
        return ""
    }
};
NUtility.getXmlNodeValue = function (node) {
    var val = null;
    NUtility.Try(function () {
        val = node.text;
        if (!val) {
            val = node.textContent
        }
        if (!val) {
            val = node.firstChild.nodeValue
        }
    }, function () {
        val = node.textContent
    });
    return val
};
NUtility.mouseLeft = function (evt, div) {
    var target = (evt.relatedTarget) ? evt.relatedTarget : evt.toElement;
    while (target != div && target != null) {
        target = target.parentNode
    }
    return (target != div)
};
NUtility.rad = function (x) {
    return x * Math.PI / 180
};
NUtility.distVincenty = function (p1, p2) {
    var a = 6378137,
        b = 6356752.3142,
        f = 1 / 298.257223563;
    var L = NUtility.rad(p2.lon - p1.lon);
    var U1 = Math.atan((1 - f) * Math.tan(NUtility.rad(p1.lat)));
    var U2 = Math.atan((1 - f) * Math.tan(NUtility.rad(p2.lat)));
    var sinU1 = Math.sin(U1),
        cosU1 = Math.cos(U1);
    var sinU2 = Math.sin(U2),
        cosU2 = Math.cos(U2);
    var lambda = L,
        lambdaP = 2 * Math.PI;
    var iterLimit = 20;
    while (Math.abs(lambda - lambdaP) > 1e-12 && --iterLimit > 0) {
        var sinLambda = Math.sin(lambda),
            cosLambda = Math.cos(lambda);
        var sinSigma = Math.sqrt((cosU2 * sinLambda) * (cosU2 * sinLambda) + (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) * (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda));
        if (sinSigma == 0) {
            return 0
        }
        var cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
        var sigma = Math.atan2(sinSigma, cosSigma);
        var alpha = Math.asin(cosU1 * cosU2 * sinLambda / sinSigma);
        var cosSqAlpha = Math.cos(alpha) * Math.cos(alpha);
        var cos2SigmaM = cosSigma - 2 * sinU1 * sinU2 / cosSqAlpha;
        var C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
        lambdaP = lambda;
        lambda = L + (1 - C) * f * Math.sin(alpha) * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)))
    }
    if (iterLimit == 0) {
        return NaN
    }
    var uSq = cosSqAlpha * (a * a - b * b) / (b * b);
    var A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
    var B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
    var deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) - B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
    var s = b * A * (sigma - deltaSigma);
    var d = s.toFixed(3) / 1000;
    return d
};
NUtility.getParameters = function (url) {
    url = url || window.location.href;
    var paramsString = "";
    if (NString.contains(url, '?')) {
        var start = url.indexOf('?') + 1;
        var end = NString.contains(url, "#") ? url.indexOf('#') : url.length;
        paramsString = url.substring(start, end)
    }
    var parameters = {};
    var pairs = paramsString.split(/[&;]/);
    for (var i = 0, len = pairs.length; i < len; ++i) {
        var keyValue = pairs[i].split('=');
        if (keyValue[0]) {
            var key = decodeURIComponent(keyValue[0]);
            var value = keyValue[1] || '';
            value = value.split(",");
            for (var j = 0, jlen = value.length; j < jlen; j++) {
                value[j] = decodeURIComponent(value[j])
            }
            if (value.length == 1) {
                value = value[0]
            }
            parameters[key] = value
        }
    }
    return parameters
};
NUtility.getArgs = function (url) {
    NLog.warn(NMGISLG("methodDeprecated", {
        'newMethod': 'NUtility.getParameters'
    }));
    return NUtility.getParameters(url)
};
NUtility.lastSeqID = 0;
NUtility.createUniqueID = function (prefix) {
    if (prefix == null) {
        prefix = "id_"
    }
    NUtility.lastSeqID += 1;
    return prefix + NUtility.lastSeqID
};
NINCHES_PER_UNIT = {
    'inches': 1.0,
    'ft': 12.0,
    'mi': 63360.0,
    'm': 39.3701,
    'km': 39370.1,
    'dd': 4382659,
    'yd': 36
};
NINCHES_PER_UNIT["in"] = NINCHES_PER_UNIT.inches;
NINCHES_PER_UNIT["degrees"] = NINCHES_PER_UNIT.dd;
NINCHES_PER_UNIT["nmi"] = 1852 * NINCHES_PER_UNIT.m;
NDOTS_PER_INCH = 96;
NUtility.normalizeScale = function (scale) {
    var normScale = (scale > 1.0) ? (1.0 / scale) : scale;
    return normScale
};
NUtility.getResolutionFromScale = function (scale, units) {
    if (units == null) {
        units = "degrees"
    }
    var normScale = NUtility.normalizeScale(scale);
    var resolution = 1 / (normScale * NINCHES_PER_UNIT[units] * NDOTS_PER_INCH);
    return resolution
};
NUtility.getScaleFromResolution = function (resolution, units) {
    if (units == null) {
        units = "degrees"
    }
    var scale = resolution * NINCHES_PER_UNIT[units] * NDOTS_PER_INCH;
    return scale
};
NUtility.safeStopPropagation = function (evt) {
    NEvent.stop(evt, true)
};
NUtility.pagePosition = function (forElement) {
    var valueT = 0,
        valueL = 0;
    var element = forElement;
    var child = forElement;
    while (element) {
        if (element == document.body) {
            if (NElement.getStyle(child, 'position') == 'absolute') {
                break
            }
        }
        valueT += element.offsetTop || 0;
        valueL += element.offsetLeft || 0;
        child = element;
        try {
            element = element.offsetParent
        } catch (e) {
            NLog.error(NMGISLG("pagePositionFailed", {
                'elemId': element.id
            }));
            break
        }
    }
    element = forElement;
    while (element) {
        valueT -= element.scrollTop || 0;
        valueL -= element.scrollLeft || 0;
        element = element.parentNode
    }
    return [valueL, valueT]
};
NUtility.isEquivalentUrl = function (url1, url2, options) {
    options = options || {};
    NUtility.applyDefaults(options, {
        ignoreCase: true,
        ignorePort80: true,
        ignoreHash: true
    });
    var urlObj1 = NUtility.createUrlObject(url1, options);
    var urlObj2 = NUtility.createUrlObject(url2, options);
    for (var key in urlObj1) {
        if (options.test) {
            NLog.userError(key + "\n1:" + urlObj1[key] + "\n2:" + urlObj2[key])
        }
        var val1 = urlObj1[key];
        var val2 = urlObj2[key];
        switch (key) {
        case "args":
            break;
        case "host":
        case "port":
        case "protocol":
            if ((val1 == "") || (val2 == "")) {
                break
            }
        default:
            if ((key != "args") && (urlObj1[key] != urlObj2[key])) {
                return false
            }
            break
        }
    }
    for (var key in urlObj1.args) {
        if (urlObj1.args[key] != urlObj2.args[key]) {
            return false
        }
        delete urlObj2.args[key]
    }
    for (var key in urlObj2.args) {
        return false
    }
    return true
};
NUtility.createUrlObject = function (url, options) {
    options = options || {};
    var urlObject = {};
    if (options.ignoreCase) {
        url = url.toLowerCase()
    }
    var a = document.createElement('a');
    a.href = url;
    urlObject.host = a.host;
    var port = a.port;
    if (port.length <= 0) {
        var newHostLength = urlObject.host.length - (port.length);
        urlObject.host = urlObject.host.substring(0, newHostLength)
    }
    urlObject.protocol = a.protocol;
    urlObject.port = ((port == "80") && (options.ignorePort80)) ? "" : port;
    urlObject.hash = (options.ignoreHash) ? "" : a.hash;
    var queryString = a.search;
    if (!queryString) {
        var qMark = url.indexOf("?");
        queryString = (qMark != -1) ? url.substr(qMark) : ""
    }
    urlObject.args = NUtility.getParameters(queryString);
    if (((urlObject.protocol == "file:") && (url.indexOf("file:") != -1)) || ((urlObject.protocol != "file:") && (urlObject.host != ""))) {
        urlObject.pathname = a.pathname;
        var qIndex = urlObject.pathname.indexOf("?");
        if (qIndex != -1) {
            urlObject.pathname = urlObject.pathname.substring(0, qIndex)
        }
    } else {
        var relStr = NUtility.removeTail(url);
        var backs = 0;
        do {
            var index = relStr.indexOf("../");
            if (index == 0) {
                backs++;
                relStr = relStr.substr(3)
            } else if (index >= 0) {
                var prevChunk = relStr.substr(0, index - 1);
                var slash = prevChunk.indexOf("/");
                prevChunk = (slash != -1) ? prevChunk.substr(0, slash + 1) : "";
                var postChunk = relStr.substr(index + 3);
                relStr = prevChunk + postChunk
            }
        } while (index != -1) var windowAnchor = document.createElement("a");
        var windowUrl = window.location.href;
        if (options.ignoreCase) {
            windowUrl = windowUrl.toLowerCase()
        }
        windowAnchor.href = windowUrl;
        urlObject.protocol = windowAnchor.protocol;
        var splitter = (windowAnchor.pathname.indexOf("/") != -1) ? "/" : "\\";
        var dirs = windowAnchor.pathname.split(splitter);
        dirs.pop();
        while ((backs > 0) && (dirs.length > 0)) {
            dirs.pop();
            backs--
        }
        relStr = dirs.join("/") + "/" + relStr;
        urlObject.pathname = relStr
    }
    if ((urlObject.protocol == "file:") || (urlObject.protocol == "")) {
        urlObject.host = "localhost"
    }
    return urlObject
};
NUtility.removeTail = function (url) {
    var head = null;
    var qMark = url.indexOf("?");
    var hashMark = url.indexOf("#");
    if (qMark == -1) {
        head = (hashMark != -1) ? url.substr(0, hashMark) : url
    } else {
        head = (hashMark != -1) ? url.substr(0, Math.min(qMark, hashMark)) : url.substr(0, qMark)
    }
    return head
};
NUtility.getBrowserName = function () {
    var browserName = "";
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("opera") != -1) {
        browserName = "opera"
    } else if (ua.indexOf("msie") != -1) {
        browserName = "msie"
    } else if (ua.indexOf("safari") != -1) {
        browserName = "safari"
    } else if (ua.indexOf("mozilla") != -1) {
        if (ua.indexOf("firefox") != -1) {
            browserName = "firefox"
        } else {
            browserName = "mozilla"
        }
    }
    return browserName
};
NUtility.getRenderedDimensions = function (contentHTML, size, options) {
    var w, h;
    var container = document.createElement("div");
    container.style.overflow = "";
    container.style.position = "absolute";
    container.style.left = "-9999px";
    if (size) {
        if (size.w) {
            w = size.w;
            container.style.width = w + "px"
        } else if (size.h) {
            h = size.h;
            container.style.height = h + "px"
        }
    }
    if (options && options.cssClassName) {
        container.className = options.cssClassName
    }
    var content = document.createElement("div");
    content.innerHTML = contentHTML;
    container.appendChild(content);
    document.body.appendChild(container);
    if (!w) {
        w = parseInt(content.scrollWidth);
        container.style.width = w + "px"
    }
    if (!h) {
        h = parseInt(content.scrollHeight)
    }
    container.removeChild(content);
    document.body.removeChild(container);
    return new NSize(w, h)
};
NUtility.getScrollbarWidth = function () {
    var scrollbarWidth = NUtility._scrollbarWidth;
    if (scrollbarWidth == null) {
        var scr = null;
        var inn = null;
        var wNoScroll = 0;
        var wScroll = 0;
        scr = document.createElement('div');
        scr.style.position = 'absolute';
        scr.style.top = '-1000px';
        scr.style.left = '-1000px';
        scr.style.width = '100px';
        scr.style.height = '50px';
        scr.style.overflow = 'hidden';
        inn = document.createElement('div');
        inn.style.width = '100%';
        inn.style.height = '200px';
        scr.appendChild(inn);
        document.body.appendChild(scr);
        wNoScroll = inn.offsetWidth;
        scr.style.overflow = 'scroll';
        wScroll = inn.offsetWidth;
        document.body.removeChild(document.body.lastChild);
        NUtility._scrollbarWidth = (wNoScroll - wScroll);
        scrollbarWidth = NUtility._scrollbarWidth
    }
    return scrollbarWidth
};
NString = {
    startsWith: function (str, sub) {
        return (str.indexOf(sub) == 0)
    },
    contains: function (str, sub) {
        return (str.indexOf(sub) != -1)
    },
    trim: function (str) {
        return str.replace(/^\s*(.*?)\s*$/, "$1")
    },
    camelize: function (str) {
        var oStringList = str.split('-');
        var camelizedString = oStringList[0];
        for (var i = 1, len = oStringList.length; i < len; i++) {
            var s = oStringList[i];
            camelizedString += s.charAt(0).toUpperCase() + s.substring(1)
        }
        return camelizedString
    },
    format: function (template, context, args) {
        if (!context) {
            context = window
        }
        var tokens = template.split("${");
        var item, last, replacement;
        for (var i = 1, len = tokens.length; i < len; i++) {
            item = tokens[i];
            last = item.indexOf("}");
            if (last > 0) {
                replacement = context[item.substring(0, last)];
                if (typeof replacement == "function") {
                    replacement = args ? replacement.apply(null, args) : replacement()
                }
                tokens[i] = replacement + item.substring(++last)
            } else {
                tokens[i] = "${" + item
            }
        }
        return tokens.join("")
    },
    numberRegEx: /^([+-]?)(?=\d|\.\d)\d*(\.\d*)?([Ee]([+-]?\d+))?$/,
    isNumeric: function (value) {
        return NString.numberRegEx.test(value)
    }
};
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (sStart) {
        NLog.warn(NMGISLG("methodDeprecated", {
            'newMethod': 'NString.startsWith'
        }));
        return NString.startsWith(this, sStart)
    }
}
if (!String.prototype.contains) {
    String.prototype.contains = function (str) {
        NLog.warn(NMGISLG("methodDeprecated", {
            'newMethod': 'NString.contains'
        }));
        return NString.contains(this, str)
    }
}
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        NLog.warn(NMGISLG("methodDeprecated", {
            'newMethod': 'NString.trim'
        }));
        return NString.trim(this)
    }
}
if (!String.prototype.camelize) {
    String.prototype.camelize = function () {
        NLog.warn(NMGISLG("methodDeprecated", {
            'newMethod': 'NString.camelize'
        }));
        return NString.camelize(this)
    }
}
NNumber = {
    decimalSeparator: ".",
    thousandsSeparator: ",",
    setPrecision: function (num, sig) {
        var fig = 0;
        if (sig > 0) {
            fig = parseFloat(num.toPrecision(sig))
        }
        return fig
    },
    format: function (num, dec, tsep, dsep) {
        dec = (typeof dec != "undefined") ? dec : 0;
        tsep = (typeof tsep != "undefined") ? tsep : NNumber.thousandsSeparator;
        dsep = (typeof dsep != "undefined") ? dsep : NNumber.decimalSeparator;
        if (dec != null) {
            num = parseFloat(num.toFixed(dec))
        }
        var parts = num.toString().split(".");
        if (parts.length == 1 && dec == null) {
            dec = 0
        }
        var integer = parts[0];
        if (tsep) {
            var thousands = /(-?[0-9]+)([0-9]{3})/;
            while (thousands.test(integer)) {
                integer = integer.replace(thousands, "$1" + tsep + "$2")
            }
        }
        var str;
        if (dec == 0) {
            str = integer
        } else {
            var rem = parts.length > 1 ? parts[1] : "0";
            if (dec != null) {
                rem = rem + new Array(dec - rem.length + 1).join("0")
            }
            str = integer + dsep + rem
        }
        return str
    }
};
if (!Number.prototype.setPrecision) {
    Number.prototype.setPrecision = function (sig) {
        NLog.warn(NMGISLG("methodDeprecated", {
            'newMethod': 'NNumber.setPrecision'
        }));
        return NNumber.setPrecision(this, sig)
    }
}
NFunction = {
    bind: function (func, object) {
        var args = Array.prototype.slice.apply(arguments, [2]);
        return function () {
            var newArgs = args.concat(Array.prototype.slice.apply(arguments, [0]));
            return func.apply(object, newArgs)
        }
    },
    bindAsEventListener: function (func, object) {
        return function (event) {
            return func.call(object, event || window.event)
        }
    }
};
if (!Function.prototype.bind) {
    Function.prototype.bind = function () {
        NLog.warn(NMGISLG("methodDeprecated", {
            'newMethod': 'NFunction.bind'
        }));
        Array.prototype.unshift.apply(arguments, [this]);
        return NFunction.bind.apply(null, arguments)
    }
}
if (!Function.prototype.bindAsEventListener) {
    Function.prototype.bindAsEventListener = function (object) {
        NLog.warn(NMGISLG("methodDeprecated", {
            'newMethod': 'NFunction.bindAsEventListener'
        }));
        return NFunction.bindAsEventListener(this, object)
    }
}
NArray = {
    filter: function (array, callback, caller) {
        var selected = [];
        if (Array.prototype.filter) {
            selected = array.filter(callback, caller)
        } else {
            var len = array.length;
            if (typeof callback != "function") {
                throw new TypeError()
            }
            for (var i = 0; i < len; i++) {
                if (i in array) {
                    var val = array[i];
                    if (callback.call(caller, val, i, array)) {
                        selected.push(val)
                    }
                }
            }
        }
        return selected
    }
};
NObject = function () {
    var Class = function () {
            if (arguments && arguments[0] != NObject.isPrototype) {
                this.construct.apply(this, arguments)
            }
        };
    var extended = {};
    var parent;
    for (var i = 0, len = arguments.length; i < len; ++i) {
        if (typeof arguments[i] == "function") {
            parent = arguments[i].prototype
        } else {
            parent = arguments[i]
        }
        NUtility.extend(extended, parent)
    }
    Class.prototype = extended;
    return Class
};
NObject.isPrototype = function () {};
NObject.create = function () {
    return function () {
        if (arguments && arguments[0] != NObject.isPrototype) {
            this.construct.apply(this, arguments)
        }
    }
};
NObject.inherit = function () {
    var superClass = arguments[0];
    var proto = new superClass(NObject.isPrototype);
    for (var i = 1, len = arguments.length; i < len; i++) {
        if (typeof arguments[i] == "function") {
            var mixin = arguments[i];
            arguments[i] = new mixin(NObject.isPrototype)
        }
        NUtility.extend(proto, arguments[i])
    }
    return proto
};
NBounds = NObject({
    left: null,
    bottom: null,
    right: null,
    top: null,
    construct: function (left, bottom, right, top) {
        if (left != null) {
            this.left = parseFloat(left)
        }
        if (bottom != null) {
            this.bottom = parseFloat(bottom)
        }
        if (right != null) {
            this.right = parseFloat(right)
        }
        if (top != null) {
            this.top = parseFloat(top)
        }
    },
    clone: function () {
        return new NBounds(this.left, this.bottom, this.right, this.top)
    },
    equals: function (bounds) {
        var equals = false;
        if (bounds != null) {
            equals = ((this.left == bounds.left) && (this.right == bounds.right) && (this.top == bounds.top) && (this.bottom == bounds.bottom))
        }
        return equals
    },
    toString: function () {
        return ("left-bottom=(" + this.left + "," + this.bottom + ")" + " right-top=(" + this.right + "," + this.top + ")")
    },
    toArray: function () {
        return [this.left, this.bottom, this.right, this.top]
    },
    toBBOX: function (decimal) {
        if (decimal == null) {
            decimal = 6
        }
        var mult = Math.pow(10, decimal);
        var bbox = Math.round(this.left * mult) / mult + "," + Math.round(this.bottom * mult) / mult + "," + Math.round(this.right * mult) / mult + "," + Math.round(this.top * mult) / mult;
        return bbox
    },
    toGeometry: function () {
        return new NGeometry.Polygon([new NGeometry.LinearRing([new NGeometry.Point(this.left, this.bottom), new NGeometry.Point(this.right, this.bottom), new NGeometry.Point(this.right, this.top), new NGeometry.Point(this.left, this.top)])])
    },
    getWidth: function () {
        return (this.right - this.left)
    },
    getHeight: function () {
        return (this.top - this.bottom)
    },
    getSize: function () {
        return new NSize(this.getWidth(), this.getHeight())
    },
    getCenterInPixel: function () {
        return new NPixel((this.left + this.right) / 2, (this.bottom + this.top) / 2)
    },
    getCenterInLatLng: function () {
        return new NLatLng((this.left + this.right) / 2, (this.bottom + this.top) / 2)
    },
    scale: function (ratio, origin) {
        if (origin == null) {
            origin = this.getCenterInLatLng()
        }
        var bounds = [];
        var origx, origy;
        if (origin._CLASS_NAME == "NLatLng") {
            origx = origin.lon;
            origy = origin.lat
        } else {
            origx = origin.x;
            origy = origin.y
        }
        var left = (this.left - origx) * ratio + origx;
        var bottom = (this.bottom - origy) * ratio + origy;
        var right = (this.right - origx) * ratio + origx;
        var top = (this.top - origy) * ratio + origy;
        return new NBounds(left, bottom, right, top)
    },
    offsetByXY: function (x, y) {
        if ((x == null) || (y == null)) {
            var msg = NMGISLG("boundsoffsetByXYError");
            NLog.error(msg);
            return null
        }
        return new NBounds(this.left + x, this.bottom + y, this.right + x, this.top + y)
    },
    extend: function (object) {
        var bounds = null;
        if (object) {
            switch (object._CLASS_NAME) {
            case "NLatLng":
                bounds = new NBounds(object.lon, object.lat, object.lon, object.lat);
                break;
            case "NGeometry.Point":
                bounds = new NBounds(object.x, object.y, object.x, object.y);
                break;
            case "NBounds":
                bounds = object;
                break
            }
            if (bounds) {
                if ((this.left == null) || (bounds.left < this.left)) {
                    this.left = bounds.left
                }
                if ((this.bottom == null) || (bounds.bottom < this.bottom)) {
                    this.bottom = bounds.bottom
                }
                if ((this.right == null) || (bounds.right > this.right)) {
                    this.right = bounds.right
                }
                if ((this.top == null) || (bounds.top > this.top)) {
                    this.top = bounds.top
                }
            }
        }
    },
    containsLonLat: function (ll, inclusive) {
        return this.contains(ll.lon, ll.lat, inclusive)
    },
    containsPixel: function (px, inclusive) {
        return this.contains(px.x, px.y, inclusive)
    },
    contains: function (x, y, inclusive) {
        if (inclusive == null) {
            inclusive = true
        }
        var contains = false;
        if (inclusive) {
            contains = ((x >= this.left) && (x <= this.right) && (y >= this.bottom) && (y <= this.top))
        } else {
            contains = ((x > this.left) && (x < this.right) && (y > this.bottom) && (y < this.top))
        }
        return contains
    },
    intersectsBounds: function (bounds, inclusive) {
        if (inclusive == null) {
            inclusive = true
        }
        var inBottom = (bounds.bottom == this.bottom && bounds.top == this.top) ? true : (((bounds.bottom > this.bottom) && (bounds.bottom < this.top)) || ((this.bottom > bounds.bottom) && (this.bottom < bounds.top)));
        var inTop = (bounds.bottom == this.bottom && bounds.top == this.top) ? true : (((bounds.top > this.bottom) && (bounds.top < this.top)) || ((this.top > bounds.bottom) && (this.top < bounds.top)));
        var inRight = (bounds.right == this.right && bounds.left == this.left) ? true : (((bounds.right > this.left) && (bounds.right < this.right)) || ((this.right > bounds.left) && (this.right < bounds.right)));
        var inLeft = (bounds.right == this.right && bounds.left == this.left) ? true : (((bounds.left > this.left) && (bounds.left < this.right)) || ((this.left > bounds.left) && (this.left < bounds.right)));
        return (this.containsBounds(bounds, true, inclusive) || bounds.containsBounds(this, true, inclusive) || ((inTop || inBottom) && (inLeft || inRight)))
    },
    containsBounds: function (bounds, partial, inclusive) {
        if (partial == null) {
            partial = false
        }
        if (inclusive == null) {
            inclusive = true
        }
        var inLeft;
        var inTop;
        var inRight;
        var inBottom;
        if (inclusive) {
            inLeft = (bounds.left >= this.left) && (bounds.left <= this.right);
            inTop = (bounds.top >= this.bottom) && (bounds.top <= this.top);
            inRight = (bounds.right >= this.left) && (bounds.right <= this.right);
            inBottom = (bounds.bottom >= this.bottom) && (bounds.bottom <= this.top)
        } else {
            inLeft = (bounds.left > this.left) && (bounds.left < this.right);
            inTop = (bounds.top > this.bottom) && (bounds.top < this.top);
            inRight = (bounds.right > this.left) && (bounds.right < this.right);
            inBottom = (bounds.bottom > this.bottom) && (bounds.bottom < this.top)
        }
        return (partial) ? (inTop || inBottom) && (inLeft || inRight) : (inTop && inLeft && inBottom && inRight)
    },
    getQuadrant: function (latlng) {
        var quadrant = "";
        var center = this.getCenterInLatLng();
        quadrant += (latlng.lat < center.lat) ? "b" : "t";
        quadrant += (latlng.lon < center.lon) ? "l" : "r";
        return quadrant
    },
    transform: function (source, dest) {
        var ll = NProjection.transform({
            'x': this.left,
            'y': this.bottom
        }, source, dest);
        var lr = NProjection.transform({
            'x': this.right,
            'y': this.bottom
        }, source, dest);
        var ul = NProjection.transform({
            'x': this.left,
            'y': this.top
        }, source, dest);
        var ur = NProjection.transform({
            'x': this.right,
            'y': this.top
        }, source, dest);
        this.left = Math.min(ll.x, ul.x);
        this.bottom = Math.min(ll.y, lr.y);
        this.right = Math.max(lr.x, ur.x);
        this.top = Math.max(ul.y, ur.y);
        return this
    },
    repeatDisplay: function (maxExtent, options) {
        options = options || {};
        var leftTolerance = options.leftTolerance || 0;
        var rightTolerance = options.rightTolerance || 0;
        var newBounds = this.clone();
        if (maxExtent) {
            while (newBounds.left < maxExtent.left && (newBounds.right - rightTolerance) <= maxExtent.left) {
                newBounds = newBounds.offsetByXY(maxExtent.getWidth(), 0)
            }
            while ((newBounds.left + leftTolerance) >= maxExtent.right && newBounds.right > maxExtent.right) {
                newBounds = newBounds.offsetByXY(-maxExtent.getWidth(), 0)
            }
        }
        return newBounds
    },
    createFromStr: function (str) {
        var bounds = str.split(",");
        return NBounds.fromArray(bounds)
    },
    _CLASS_NAME: "NBounds"
});
NBounds.createFromString = function (str) {
    var bounds = str.split(",");
    return NBounds.fromArray(bounds)
};
NBounds.fromArray = function (bbox) {
    return new NBounds(parseFloat(bbox[0]), parseFloat(bbox[1]), parseFloat(bbox[2]), parseFloat(bbox[3]))
};
NBounds.createFromSize = function (size) {
    return new NBounds(0, 0, size.w, size.h)
};
NBounds.oppositeQuadrant = function (quadrant) {
    var opp = "";
    opp += (quadrant.charAt(0) == 't') ? 'b' : 't';
    opp += (quadrant.charAt(1) == 'l') ? 'r' : 'l';
    return opp
};
NElement = {
    visible: function (element) {
        return NUtility.getElement(element).style.display != 'none'
    },
    toggle: function () {
        for (var i = 0, len = arguments.length; i < len; i++) {
            var element = NUtility.getElement(arguments[i]);
            var display = NElement.visible(element) ? 'hide' : 'show';
            NElement[display](element)
        }
    },
    hide: function () {
        for (var i = 0, len = arguments.length; i < len; i++) {
            var element = NUtility.getElement(arguments[i]);
            element.style.display = 'none'
        }
    },
    show: function () {
        for (var i = 0, len = arguments.length; i < len; i++) {
            var element = NUtility.getElement(arguments[i]);
            element.style.display = ''
        }
    },
    remove: function (element) {
        element = NUtility.getElement(element);
        element.parentNode.removeChild(element)
    },
    getHeight: function (element) {
        element = NUtility.getElement(element);
        return element.offsetHeight
    },
    getDimensions: function (element) {
        element = NUtility.getElement(element);
        if (NElement.getStyle(element, 'display') != 'none') {
            return {
                width: element.offsetWidth,
                height: element.offsetHeight
            }
        }
        var els = element.style;
        var originalVisibility = els.visible;
        var originalPosition = els.position;
        els.visible = 'hidden';
        els.position = 'absolute';
        els.display = '';
        var originalWidth = element.clientWidth;
        var originalHeight = element.clientHeight;
        els.display = 'none';
        els.position = originalPosition;
        els.visible = originalVisibility;
        return {
            width: originalWidth,
            height: originalHeight
        }
    },
    hasClass: function (element, name) {
        var names = element.className;
        return ( !! names && new RegExp("(^|\\s)" + name + "(\\s|$)").test(names))
    },
    addClass: function (element, name) {
        if (!NElement.hasClass(element, name)) {
            element.className += (element.className ? " " : "") + name
        }
        return element
    },
    removeClass: function (element, name) {
        var names = element.className;
        if (names) {
            element.className = NString.trim(names.replace(new RegExp("(^|\\s+)" + name + "(\\s+|$)"), " "))
        }
        return element
    },
    toggleClass: function (element, name) {
        if (NElement.hasClass(element, name)) {
            NElement.removeClass(element, name)
        } else {
            NElement.addClass(element, name)
        }
        return element
    },
    getStyle: function (element, style) {
        element = NUtility.getElement(element);
        var value = null;
        if (element && element.style) {
            value = element.style[NString.camelize(style)];
            if (!value) {
                if (document.defaultView && document.defaultView.getComputedStyle) {
                    var css = document.defaultView.getComputedStyle(element, null);
                    value = css ? css.getPropertyValue(style) : null
                } else if (element.currentStyle) {
                    value = element.currentStyle[NString.camelize(style)]
                }
            }
            var positions = ['left', 'top', 'right', 'bottom'];
            if (window.opera && (NUtility.indexOf(positions, style) != -1) && (NElement.getStyle(element, 'position') == 'static')) {
                value = 'auto'
            }
        }
        return value == 'auto' ? null : value
    }
};
NLatLng = NObject({
    lon: 0.0,
    lat: 0.0,
    construct: function (lon, lat) {
        this.lon = parseFloat(lon);
        this.lat = parseFloat(lat)
    },
    toString: function () {
        return ("lon=" + this.lon + ",lat=" + this.lat)
    },
    toSimpleString: function () {
        return (this.lon + " " + this.lat)
    },
    clone: function () {
        return new NLatLng(this.lon, this.lat)
    },
    offsetByXY: function (lon, lat) {
        if ((lon == null) || (lat == null)) {
            var msg = NMGISLG("latlngoffsetByXYError");
            NLog.error(msg);
            return null
        }
        return new NLatLng(this.lon + lon, this.lat + lat)
    },
    equals: function (ll) {
        var equals = false;
        if (ll != null) {
            equals = ((this.lon == ll.lon && this.lat == ll.lat) || (isNaN(this.lon) && isNaN(this.lat) && isNaN(ll.lon) && isNaN(ll.lat)))
        }
        return equals
    },
    transform: function (source, dest) {
        var point = NProjection.transform({
            'x': this.lon,
            'y': this.lat
        }, source, dest);
        this.lon = point.x;
        this.lat = point.y;
        return this
    },
    repeatDisplay: function (maxExtent) {
        var newLonLat = this.clone();
        if (maxExtent) {
            while (newLonLat.lon < maxExtent.left) {
                newLonLat.lon += maxExtent.getWidth()
            }
            while (newLonLat.lon > maxExtent.right) {
                newLonLat.lon -= maxExtent.getWidth()
            }
        }
        return newLonLat
    },
    _CLASS_NAME: "NLatLng"
});
NLatLng.createFromString = function (str) {
    var pair = str.split(",");
    return new NLatLng(parseFloat(pair[0]), parseFloat(pair[1]))
};
NXYZ = NObject({
    x: 0.0,
    y: 0.0,
    z: 0.0,
    construct: function (x, y, z) {
        this.x = parseFloat(x);
        this.y = parseFloat(y);
        if (z != null) this.z = parseFloat(z)
    },
    toString: function () {
        return ("x=" + this.x + ",y=" + this.y + ",z=" + this.z)
    },
    toSimpleString: function () {
        return (this.x + ", " + this.y + ", " + this.z)
    },
    clone: function () {
        return new NXYZ(this.x, this.y, this.z)
    },
    offsetByXYZ: function (x, y, z) {
        if ((x == null) || (y == null)) {
            var msg = NMGISLG("XYZoffsetByXYZError");
            NLog.error(msg);
            return null
        }
        return new Nxyz(this.x + x, this.y + y, this.z + z)
    },
    equals: function (ll) {
        var equals = false;
        if (ll != null) {
            equals = ((this.x == ll.x && this.y == ll.y && this.z == ll.z) || (isNaN(this.x) && isNaN(this.y) && isNaN(this.z) && isNaN(ll.x) && isNaN(ll.y) && isNaN(ll.z)))
        }
        return equals
    },
    transform: function (source, dest) {
        var point = NProjection.transform({
            'x': this.x,
            'y': this.y
        }, source, dest);
        this.x = point.x;
        this.y = point.y;
        return this
    },
    repeatDisplay: function (maxExtent) {
        var newXYZ = this.clone();
        if (maxExtent) {
            while (newXYZ.x < maxExtent.left) {
                newXYZ.x += maxExtent.getWidth()
            }
            while (newXYZ.x > maxExtent.right) {
                newXYZ.x -= maxExtent.getWidth()
            }
        }
        return newXYZ
    },
    _CLASS_NAME: "NXYZ"
});
NXYZ.createFromString = function (str) {
    var pair = str.split(",");
    return new NXYZ(parseFloat(pair[0]), parseFloat(pair[1]), parseFloat(pair[2]))
};
NPixel = NObject({
    x: 0.0,
    y: 0.0,
    construct: function (x, y) {
        this.x = parseFloat(x);
        this.y = parseFloat(y)
    },
    toString: function () {
        return ("x=" + this.x + ",y=" + this.y)
    },
    clone: function () {
        return new NPixel(this.x, this.y)
    },
    equals: function (px) {
        var equals = false;
        if (px != null) {
            equals = ((this.x == px.x && this.y == px.y) || (isNaN(this.x) && isNaN(this.y) && isNaN(px.x) && isNaN(px.y)))
        }
        return equals
    },
    offsetByXY: function (x, y) {
        if ((x == null) || (y == null)) {
            var msg = NMGISLG("pixeloffsetByXYError");
            NLog.error(msg);
            return null
        }
        return new NPixel(this.x + x, this.y + y)
    },
    offset: function (px) {
        var newPx = this.clone();
        if (px) {
            newPx = this.offsetByXY(px.x, px.y)
        }
        return newPx
    },
    _CLASS_NAME: "NPixel"
});
NSize = NObject({
    w: 0.0,
    h: 0.0,
    construct: function (w, h) {
        this.w = parseFloat(w);
        this.h = parseFloat(h)
    },
    toString: function () {
        return ("w=" + this.w + ",h=" + this.h)
    },
    clone: function () {
        return new NSize(this.w, this.h)
    },
    equals: function (sz) {
        var equals = false;
        if (sz != null) {
            equals = ((this.w == sz.w && this.h == sz.h) || (isNaN(this.w) && isNaN(this.h) && isNaN(sz.w) && isNaN(sz.h)))
        }
        return equals
    },
    _CLASS_NAME: "NSize"
});
NLog = {
    log: function () {},
    debug: function () {},
    info: function () {},
    warn: function () {},
    error: function () {},
    userError: function (error) {
        alert(error)
    },
    assert: function () {},
    dir: function () {},
    dirxml: function () {},
    trace: function () {},
    group: function () {},
    groupEnd: function () {},
    time: function () {},
    timeEnd: function () {},
    profile: function () {},
    profileEnd: function () {},
    count: function () {},
    _CLASS_NAME: "NLog"
};
(function () {
    var scripts = document.getElementsByTagName("script");
    for (var i = 0, len = scripts.length; i < len; ++i) {
        if (scripts[i].src.indexOf("firebug.js") != -1) {
            if (console) {
                NUtility.extend(NLog, console);
                break
            }
        }
    }
})();
NTransition = NObject({
    INTERVAL: 10,
    easing: null,
    begin: null,
    finish: null,
    duration: null,
    callbacks: null,
    time: null,
    interval: null,
    playing: false,
    construct: function (easing) {
        this.easing = (easing) ? easing : NExpoEasing.easeOut
    },
    start: function (begin, finish, duration, options) {
        this.playing = true;
        this.begin = begin;
        this.finish = finish;
        this.duration = duration;
        this.callbacks = options.callbacks;
        this.time = 0;
        if (this.interval) {
            window.clearInterval(this.interval);
            this.interval = null
        }
        if (this.callbacks && this.callbacks.start) {
            this.callbacks.start.call(this, this.begin)
        }
        this.interval = window.setInterval(NFunction.bind(this.play, this), this.INTERVAL)
    },
    stop: function () {
        if (!this.playing) {
            return
        }
        if (this.callbacks && this.callbacks.done) {
            this.callbacks.done.call(this, this.finish)
        }
        window.clearInterval(this.interval);
        this.interval = null;
        this.playing = false
    },
    play: function () {
        var value = {};
        for (var i in this.begin) {
            var b = this.begin[i];
            var f = this.finish[i];
            if (b == null || f == null || isNaN(b) || isNaN(f)) {
                NLog.error('invalid value for Tween')
            }
            var c = f - b;
            value[i] = this.easing.apply(this, [this.time, b, c, this.duration])
        }
        this.time++;
        if (this.callbacks && this.callbacks.eachStep) {
            this.callbacks.eachStep.call(this, value)
        }
        if (this.time > this.duration) {
            if (this.callbacks && this.callbacks.done) {
                this.callbacks.done.call(this, this.finish);
                this.playing = false
            }
            window.clearInterval(this.interval);
            this.interval = null
        }
    },
    _CLASS_NAME: "NTransition"
});
NEasing = {
    _CLASS_NAME: "NEasing"
};
NLinearEasing = {
    easeIn: function (t, b, c, d) {
        return c * t / d + b
    },
    easeOut: function (t, b, c, d) {
        return c * t / d + b
    },
    easeInOut: function (t, b, c, d) {
        return c * t / d + b
    },
    _CLASS_NAME: "NLinearEasing"
};
NExpoEasing = {
    easeIn: function (t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b
    },
    easeOut: function (t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b
    },
    easeInOut: function (t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b
    },
    _CLASS_NAME: "NExpoEasing"
};
NQuadEasing = {
    easeIn: function (t, b, c, d) {
        return c * (t /= d) * t + b
    },
    easeOut: function (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b
    },
    easeInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b
    },
    _CLASS_NAME: "NQuadEasing"
};
NRico = new Object();
NRico.Corner = {
    round: function (e, options) {
        e = NUtility.getElement(e);
        this._setOptions(options);
        var color = this.options.color;
        if (this.options.color == "fromElement") {
            color = this._background(e)
        }
        var bgColor = this.options.bgColor;
        if (this.options.bgColor == "fromParent") {
            bgColor = this._background(e.offsetParent)
        }
        this._roundCornersImpl(e, color, bgColor)
    },
    changeColor: function (theDiv, newColor) {
        theDiv.style.backgroundColor = newColor;
        var spanElements = theDiv.parentNode.getElementsByTagName("span");
        for (var currIdx = 0; currIdx < spanElements.length; currIdx++) {
            spanElements[currIdx].style.backgroundColor = newColor
        }
    },
    changeOpacity: function (theDiv, newOpacity) {
        var mozillaOpacity = newOpacity;
        var ieOpacity = 'alpha(opacity=' + newOpacity * 100 + ')';
        theDiv.style.opacity = mozillaOpacity;
        theDiv.style.filter = ieOpacity;
        var spanElements = theDiv.parentNode.getElementsByTagName("span");
        for (var currIdx = 0; currIdx < spanElements.length; currIdx++) {
            spanElements[currIdx].style.opacity = mozillaOpacity;
            spanElements[currIdx].style.filter = ieOpacity
        }
    },
    reRound: function (theDiv, options) {
        var topRico = theDiv.parentNode.childNodes[0];
        var bottomRico = theDiv.parentNode.childNodes[2];
        theDiv.parentNode.removeChild(topRico);
        theDiv.parentNode.removeChild(bottomRico);
        this.round(theDiv.parentNode, options)
    },
    _roundCornersImpl: function (e, color, bgColor) {
        if (this.options.border) {
            this._renderBorder(e, bgColor)
        }
        if (this._isTopRounded()) {
            this._roundTopCorners(e, color, bgColor)
        }
        if (this._isBottomRounded()) {
            this._roundBottomCorners(e, color, bgColor)
        }
    },
    _renderBorder: function (el, bgColor) {
        var borderValue = "1px solid " + this._borderColor(bgColor);
        var borderL = "border-left: " + borderValue;
        var borderR = "border-right: " + borderValue;
        var style = "style='" + borderL + ";" + borderR + "'";
        el.innerHTML = "<div " + style + ">" + el.innerHTML + "</div>"
    },
    _roundTopCorners: function (el, color, bgColor) {
        var corner = this._createCorner(bgColor);
        for (var i = 0; i < this.options.numSlices; i++) {
            corner.appendChild(this._createCornerSlice(color, bgColor, i, "top"))
        }
        el.style.paddingTop = 0;
        el.insertBefore(corner, el.firstChild)
    },
    _roundBottomCorners: function (el, color, bgColor) {
        var corner = this._createCorner(bgColor);
        for (var i = (this.options.numSlices - 1); i >= 0; i--) {
            corner.appendChild(this._createCornerSlice(color, bgColor, i, "bottom"))
        }
        el.style.paddingBottom = 0;
        el.appendChild(corner)
    },
    _createCorner: function (bgColor) {
        var corner = document.createElement("div");
        corner.style.backgroundColor = (this._isTransparent() ? "transparent" : bgColor);
        return corner
    },
    _createCornerSlice: function (color, bgColor, n, position) {
        var slice = document.createElement("span");
        var inStyle = slice.style;
        inStyle.backgroundColor = color;
        inStyle.display = "block";
        inStyle.height = "1px";
        inStyle.overflow = "hidden";
        inStyle.fontSize = "1px";
        var borderColor = this._borderColor(color, bgColor);
        if (this.options.border && n == 0) {
            inStyle.borderTopStyle = "solid";
            inStyle.borderTopWidth = "1px";
            inStyle.borderLeftWidth = "0px";
            inStyle.borderRightWidth = "0px";
            inStyle.borderBottomWidth = "0px";
            inStyle.height = "0px";
            inStyle.borderColor = borderColor
        } else if (borderColor) {
            inStyle.borderColor = borderColor;
            inStyle.borderStyle = "solid";
            inStyle.borderWidth = "0px 1px"
        }
        if (!this.options.compact && (n == (this.options.numSlices - 1))) {
            inStyle.height = "2px"
        }
        this._setMargin(slice, n, position);
        this._setBorder(slice, n, position);
        return slice
    },
    _setOptions: function (options) {
        this.options = {
            corners: "all",
            color: "fromElement",
            bgColor: "fromParent",
            blend: true,
            border: false,
            compact: false
        };
        NUtility.extend(this.options, options || {});
        this.options.numSlices = this.options.compact ? 2 : 4;
        if (this._isTransparent()) {
            this.options.blend = false
        }
    },
    _whichSideTop: function () {
        if (this._hasString(this.options.corners, "all", "top")) {
            return ""
        }
        if (this.options.corners.indexOf("tl") >= 0 && this.options.corners.indexOf("tr") >= 0) {
            return ""
        }
        if (this.options.corners.indexOf("tl") >= 0) {
            return "left"
        } else if (this.options.corners.indexOf("tr") >= 0) {
            return "right"
        }
        return ""
    },
    _whichSideBottom: function () {
        if (this._hasString(this.options.corners, "all", "bottom")) {
            return ""
        }
        if (this.options.corners.indexOf("bl") >= 0 && this.options.corners.indexOf("br") >= 0) {
            return ""
        }
        if (this.options.corners.indexOf("bl") >= 0) {
            return "left"
        } else if (this.options.corners.indexOf("br") >= 0) {
            return "right"
        }
        return ""
    },
    _borderColor: function (color, bgColor) {
        if (color == "transparent") {
            return bgColor
        } else if (this.options.border) {
            return this.options.border
        } else if (this.options.blend) {
            return this._blend(bgColor, color)
        } else {
            return ""
        }
    },
    _setMargin: function (el, n, corners) {
        var marginSize = this._marginSize(n);
        var whichSide = corners == "top" ? this._whichSideTop() : this._whichSideBottom();
        if (whichSide == "left") {
            el.style.marginLeft = marginSize + "px";
            el.style.marginRight = "0px"
        } else if (whichSide == "right") {
            el.style.marginRight = marginSize + "px";
            el.style.marginLeft = "0px"
        } else {
            el.style.marginLeft = marginSize + "px";
            el.style.marginRight = marginSize + "px"
        }
    },
    _setBorder: function (el, n, corners) {
        var borderSize = this._borderSize(n);
        var whichSide = corners == "top" ? this._whichSideTop() : this._whichSideBottom();
        if (whichSide == "left") {
            el.style.borderLeftWidth = borderSize + "px";
            el.style.borderRightWidth = "0px"
        } else if (whichSide == "right") {
            el.style.borderRightWidth = borderSize + "px";
            el.style.borderLeftWidth = "0px"
        } else {
            el.style.borderLeftWidth = borderSize + "px";
            el.style.borderRightWidth = borderSize + "px"
        }
        if (this.options.border != false) {
            el.style.borderLeftWidth = borderSize + "px";
            el.style.borderRightWidth = borderSize + "px"
        }
    },
    _marginSize: function (n) {
        if (this._isTransparent()) {
            return 0
        }
        var marginSizes = [5, 3, 2, 1];
        var blendedMarginSizes = [3, 2, 1, 0];
        var compactMarginSizes = [2, 1];
        var smBlendedMarginSizes = [1, 0];
        if (this.options.compact && this.options.blend) {
            return smBlendedMarginSizes[n]
        } else if (this.options.compact) {
            return compactMarginSizes[n]
        } else if (this.options.blend) {
            return blendedMarginSizes[n]
        } else {
            return marginSizes[n]
        }
    },
    _borderSize: function (n) {
        var transparentBorderSizes = [5, 3, 2, 1];
        var blendedBorderSizes = [2, 1, 1, 1];
        var compactBorderSizes = [1, 0];
        var actualBorderSizes = [0, 2, 0, 0];
        if (this.options.compact && (this.options.blend || this._isTransparent())) {
            return 1
        } else if (this.options.compact) {
            return compactBorderSizes[n]
        } else if (this.options.blend) {
            return blendedBorderSizes[n]
        } else if (this.options.border) {
            return actualBorderSizes[n]
        } else if (this._isTransparent()) {
            return transparentBorderSizes[n]
        }
        return 0
    },
    _hasString: function (str) {
        for (var i = 1; i < arguments.length; i++) if (str.indexOf(arguments[i]) >= 0) {
            return true
        }
        return false
    },
    _blend: function (c1, c2) {
        var cc1 = NRico.Color.createFromHex(c1);
        cc1.blend(NRico.Color.createFromHex(c2));
        return cc1
    },
    _background: function (el) {
        try {
            return NRico.Color.createColorFromBackground(el).asHex()
        } catch (err) {
            return "#ffffff"
        }
    },
    _isTransparent: function () {
        return this.options.color == "transparent"
    },
    _isTopRounded: function () {
        return this._hasString(this.options.corners, "all", "top", "tl", "tr")
    },
    _isBottomRounded: function () {
        return this._hasString(this.options.corners, "all", "bottom", "bl", "br")
    },
    _hasSingleTextChild: function (el) {
        return el.childNodes.length == 1 && el.childNodes[0].nodeType == 3
    }
};
NRico.Color = NObject({
    construct: function (red, green, blue) {
        this.rgb = {
            r: red,
            g: green,
            b: blue
        }
    },
    setRed: function (r) {
        this.rgb.r = r
    },
    setGreen: function (g) {
        this.rgb.g = g
    },
    setBlue: function (b) {
        this.rgb.b = b
    },
    setHue: function (h) {
        var hsb = this.asHSB();
        hsb.h = h;
        this.rgb = NRico.Color.HSBtoRGB(hsb.h, hsb.s, hsb.b)
    },
    setSaturation: function (s) {
        var hsb = this.asHSB();
        hsb.s = s;
        this.rgb = NRico.Color.HSBtoRGB(hsb.h, hsb.s, hsb.b)
    },
    setBrightness: function (b) {
        var hsb = this.asHSB();
        hsb.b = b;
        this.rgb = NRico.Color.HSBtoRGB(hsb.h, hsb.s, hsb.b)
    },
    darken: function (percent) {
        var hsb = this.asHSB();
        this.rgb = NRico.Color.HSBtoRGB(hsb.h, hsb.s, Math.max(hsb.b - percent, 0))
    },
    brighten: function (percent) {
        var hsb = this.asHSB();
        this.rgb = NRico.Color.HSBtoRGB(hsb.h, hsb.s, Math.min(hsb.b + percent, 1))
    },
    blend: function (other) {
        this.rgb.r = Math.floor((this.rgb.r + other.rgb.r) / 2);
        this.rgb.g = Math.floor((this.rgb.g + other.rgb.g) / 2);
        this.rgb.b = Math.floor((this.rgb.b + other.rgb.b) / 2)
    },
    isBright: function () {
        var hsb = this.asHSB();
        return this.asHSB().b > 0.5
    },
    isDark: function () {
        return !this.isBright()
    },
    asRGB: function () {
        return "rgb(" + this.rgb.r + "," + this.rgb.g + "," + this.rgb.b + ")"
    },
    asHex: function () {
        return "#" + this.rgb.r.toColorPart() + this.rgb.g.toColorPart() + this.rgb.b.toColorPart()
    },
    asHSB: function () {
        return NRico.Color.RGBtoHSB(this.rgb.r, this.rgb.g, this.rgb.b)
    },
    toString: function () {
        return this.asHex()
    }
});
NRico.Color.createFromHex = function (hexCode) {
    if (hexCode.length == 4) {
        var shortHexCode = hexCode;
        var hexCode = '#';
        for (var i = 1; i < 4; i++) {
            hexCode += (shortHexCode.charAt(i) + shortHexCode.charAt(i))
        }
    }
    if (hexCode.indexOf('#') == 0) {
        hexCode = hexCode.substring(1)
    }
    var red = hexCode.substring(0, 2);
    var green = hexCode.substring(2, 4);
    var blue = hexCode.substring(4, 6);
    return new NRico.Color(parseInt(red, 16), parseInt(green, 16), parseInt(blue, 16))
};
NRico.Color.createColorFromBackground = function (elem) {
    var actualColor = RicoUtil.getElementsComputedStyle(NUtility.getElement(elem), "backgroundColor", "background-color");
    if (actualColor == "transparent" && elem.parentNode) {
        return NRico.Color.createColorFromBackground(elem.parentNode)
    }
    if (actualColor == null) {
        return new NRico.Color(255, 255, 255)
    }
    if (actualColor.indexOf("rgb(") == 0) {
        var colors = actualColor.substring(4, actualColor.length - 1);
        var colorArray = colors.split(",");
        return new NRico.Color(parseInt(colorArray[0]), parseInt(colorArray[1]), parseInt(colorArray[2]))
    } else if (actualColor.indexOf("#") == 0) {
        return NRico.Color.createFromHex(actualColor)
    } else {
        return new NRico.Color(255, 255, 255)
    }
};
NRico.Color.HSBtoRGB = function (hue, saturation, brightness) {
    var red = 0;
    var green = 0;
    var blue = 0;
    if (saturation == 0) {
        red = parseInt(brightness * 255.0 + 0.5);
        green = red;
        blue = red
    } else {
        var h = (hue - Math.floor(hue)) * 6.0;
        var f = h - Math.floor(h);
        var p = brightness * (1.0 - saturation);
        var q = brightness * (1.0 - saturation * f);
        var t = brightness * (1.0 - (saturation * (1.0 - f)));
        switch (parseInt(h)) {
        case 0:
            red = (brightness * 255.0 + 0.5);
            green = (t * 255.0 + 0.5);
            blue = (p * 255.0 + 0.5);
            break;
        case 1:
            red = (q * 255.0 + 0.5);
            green = (brightness * 255.0 + 0.5);
            blue = (p * 255.0 + 0.5);
            break;
        case 2:
            red = (p * 255.0 + 0.5);
            green = (brightness * 255.0 + 0.5);
            blue = (t * 255.0 + 0.5);
            break;
        case 3:
            red = (p * 255.0 + 0.5);
            green = (q * 255.0 + 0.5);
            blue = (brightness * 255.0 + 0.5);
            break;
        case 4:
            red = (t * 255.0 + 0.5);
            green = (p * 255.0 + 0.5);
            blue = (brightness * 255.0 + 0.5);
            break;
        case 5:
            red = (brightness * 255.0 + 0.5);
            green = (p * 255.0 + 0.5);
            blue = (q * 255.0 + 0.5);
            break
        }
    }
    return {
        r: parseInt(red),
        g: parseInt(green),
        b: parseInt(blue)
    }
};
NRico.Color.RGBtoHSB = function (r, g, b) {
    var hue;
    var saturation;
    var brightness;
    var cmax = (r > g) ? r : g;
    if (b > cmax) {
        cmax = b
    }
    var cmin = (r < g) ? r : g;
    if (b < cmin) {
        cmin = b
    }
    brightness = cmax / 255.0;
    if (cmax != 0) {
        saturation = (cmax - cmin) / cmax
    } else {
        saturation = 0
    }
    if (saturation == 0) {
        hue = 0
    } else {
        var redc = (cmax - r) / (cmax - cmin);
        var greenc = (cmax - g) / (cmax - cmin);
        var bluec = (cmax - b) / (cmax - cmin);
        if (r == cmax) {
            hue = bluec - greenc
        } else if (g == cmax) {
            hue = 2.0 + redc - bluec
        } else {
            hue = 4.0 + greenc - redc
        }
        hue = hue / 6.0;
        if (hue < 0) {
            hue = hue + 1.0
        }
    }
    return {
        h: hue,
        s: saturation,
        b: brightness
    }
};
(function () {
    if (window.google && google.gears) {
        return
    }
    var factory = null;
    if (typeof GearsFactory != 'undefined') {
        factory = new GearsFactory()
    } else {
        try {
            factory = new ActiveXObject('Gears.Factory');
            if (factory.getBuildInfo().indexOf('ie_mobile') != -1) {
                factory.privateSetGlobalObject(this)
            }
        } catch (e) {
            if ((typeof navigator.mimeTypes != 'undefined') && navigator.mimeTypes["application/x-googlegears"]) {
                factory = document.createElement("object");
                factory.style.display = "none";
                factory.width = 0;
                factory.height = 0;
                factory.type = "application/x-googlegears";
                document.documentElement.appendChild(factory)
            }
        }
    }
    if (!factory) {
        return
    }
    if (!window.google) {
        google = {}
    }
    if (!google.gears) {
        google.gears = {
            factory: factory
        }
    }
})();
NProxyHost = "";
NnullProcessor = function (request) {
    NLog.userError(NMGISLG("unhandledRequest", {
        'statusText': request.statusText
    }))
};
NAjaxRequest = function (uri, params, caller, onComplete, onFailure) {
    if (typeof params == 'string') {
        params = NUtility.getParameters(params)
    }
    var success = (onComplete) ? onComplete : NnullProcessor;
    var failure = (onFailure) ? onFailure : NnullProcessor;
    return NRequest.GET({
        url: uri,
        params: params,
        success: success,
        failure: failure,
        scope: caller
    })
};
NParseXMLString = function (text) {
    var index = text.indexOf('<');
    if (index > 0) {
        text = text.substring(index)
    }
    var ajaxResponse = NUtility.Try(function () {
        var xmldom = new ActiveXObject('Microsoft.XMLDOM');
        xmldom.loadXML(text);
        return xmldom
    }, function () {
        return new DOMParser().parseFromString(text, 'text/xml')
    }, function () {
        var req = new XMLHttpRequest();
        req.open("GET", "data:" + "text/xml" + ";charset=utf-8," + encodeURIComponent(text), false);
        if (req.overrideMimeType) {
            req.overrideMimeType("text/xml")
        }
        req.send(null);
        return req.responseXML
    });
    return ajaxResponse
};
NAjax = {
    emptyFunction: function () {},
    getTransport: function () {
        return NUtility.Try(function () {
            return new XMLHttpRequest()
        }, function () {
            return new ActiveXObject('Msxml2.XMLHTTP')
        }, function () {
            return new ActiveXObject('Microsoft.XMLHTTP')
        }) || false
    },
    activeRequestCount: 0
};
NAjax.Responders = {
    responders: [],
    register: function (responderToAdd) {
        for (var i = 0; i < this.responders.length; i++) {
            if (responderToAdd == this.responders[i]) {
                return
            }
        }
        this.responders.push(responderToAdd)
    },
    unregister: function (responderToRemove) {
        NUtility.removeItem(this.reponders, responderToRemove)
    },
    dispatch: function (callback, request, transport) {
        var responder;
        for (var i = 0; i < this.responders.length; i++) {
            responder = this.responders[i];
            if (responder[callback] && typeof responder[callback] == 'function') {
                try {
                    responder[callback].apply(responder, [request, transport])
                } catch (e) {}
            }
        }
    }
};
NAjax.Responders.register({
    onCreate: function () {
        NAjax.activeRequestCount++
    },
    onComplete: function () {
        NAjax.activeRequestCount--
    }
});
NAjax.Base = NObject({
    construct: function (options) {
        this.options = {
            method: 'post',
            asynchronous: true,
            contentType: 'application/xml',
            parameters: ''
        };
        NUtility.extend(this.options, options || {});
        this.options.method = this.options.method.toLowerCase();
        if (typeof this.options.parameters == 'string') {
            this.options.parameters = NUtility.getParameters(this.options.parameters)
        }
    }
});
NAjax.Request = NObject(NAjax.Base, {
    _complete: false,
    construct: function (url, options) {
        NAjax.Base.prototype.construct.apply(this, [options]);
        if (NProxyHost && NString.startsWith(url, "http")) {
            url = NProxyHost + encodeURIComponent(url)
        }
        this.transport = NAjax.getTransport();
        this.request(url)
    },
    request: function (url) {
        this.url = url;
        this.method = this.options.method;
        var params = NUtility.extend({}, this.options.parameters);
        if (this.method != 'get' && this.method != 'post') {
            params['_method'] = this.method;
            this.method = 'post'
        }
        this.parameters = params;
        if (params = NUtility.getParameterString(params)) {
            if (this.method == 'get') {
                this.url += ((this.url.indexOf('?') > -1) ? '&' : '?') + params
            } else if (/Konqueror|Safari|KHTML/.test(navigator.userAgent)) {
                params += '&_='
            }
        }
        try {
            var response = new NAjax.Response(this);
            if (this.options.onCreate) {
                this.options.onCreate(response)
            }
            NAjax.Responders.dispatch('onCreate', this, response);
            this.transport.open(this.method.toUpperCase(), this.url, this.options.asynchronous);
            if (this.options.asynchronous) {
                window.setTimeout(NFunction.bind(this.respondToReadyState, this, 1), 10)
            }
            this.transport.onreadystatechange = NFunction.bind(this.onStateChange, this);
            this.setRequestHeaders();
            this.body = this.method == 'post' ? (this.options.postBody || params) : null;
            this.transport.send(this.body);
            if (!this.options.asynchronous && this.transport.overrideMimeType) {
                this.onStateChange()
            }
        } catch (e) {
            this.dispatchException(e)
        }
    },
    onStateChange: function () {
        var readyState = this.transport.readyState;
        if (readyState > 1 && !((readyState == 4) && this._complete)) {
            this.respondToReadyState(this.transport.readyState)
        }
    },
    setRequestHeaders: function () {
        var headers = {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'text/javascript, text/html, application/xml, text/xml, */*',
            'NewMap': true
        };
        if (this.method == 'post') {
            headers['Content-type'] = this.options.contentType + (this.options.encoding ? '; charset=' + this.options.encoding : '');
            if (this.transport.overrideMimeType && (navigator.userAgent.match(/Gecko\/(\d{4})/) || [0, 2005])[1] < 2005) {
                headers['Connection'] = 'close'
            }
        }
        if (typeof this.options.requestHeaders == 'object') {
            var extras = this.options.requestHeaders;
            if (typeof extras.push == 'function') {
                for (var i = 0, length = extras.length; i < length; i += 2) {
                    headers[extras[i]] = extras[i + 1]
                }
            } else {
                for (var i in extras) {
                    headers[i] = extras[i]
                }
            }
        }
        for (var name in headers) {
            this.transport.setRequestHeader(name, headers[name])
        }
    },
    success: function () {
        var status = this.getStatus();
        return !status || (status >= 200 && status < 300)
    },
    getStatus: function () {
        try {
            return this.transport.status || 0
        } catch (e) {
            return 0
        }
    },
    respondToReadyState: function (readyState) {
        var state = NAjax.Request.Events[readyState];
        var response = new NAjax.Response(this);
        if (state == 'Complete') {
            try {
                this._complete = true;
                (this.options['on' + response.status] || this.options['on' + (this.success() ? 'Success' : 'Failure')] || NAjax.emptyFunction)(response)
            } catch (e) {
                this.dispatchException(e)
            }
            var contentType = response.getHeader('Content-type')
        }
        try {
            (this.options['on' + state] || NAjax.emptyFunction)(response);
            NAjax.Responders.dispatch('on' + state, this, response)
        } catch (e) {
            this.dispatchException(e)
        }
        if (state == 'Complete') {
            this.transport.onreadystatechange = NAjax.emptyFunction
        }
    },
    getHeader: function (name) {
        try {
            return this.transport.getResponseHeader(name)
        } catch (e) {
            return null
        }
    },
    dispatchException: function (exception) {
        var processor = this.options.onException;
        if (processor) {
            processor(this, exception);
            NAjax.Responders.dispatch('onException', this, exception)
        } else {
            var listener = false;
            var responders = NAjax.Responders.responders;
            for (var i = 0; i < responders.length; i++) {
                if (responders[i].onException) {
                    listener = true;
                    break
                }
            }
            if (listener) {
                NAjax.Responders.dispatch('onException', this, exception)
            } else {
                throw exception
            }
        }
    }
});
NAjax.Request.Events = ['Unconstructd', 'Loading', 'Loaded', 'Interactive', 'Complete'];
NAjax.Response = NObject({
    status: 0,
    statusText: '',
    construct: function (request) {
        this.request = request;
        var transport = this.transport = request.transport,
            readyState = this.readyState = transport.readyState;
        if ((readyState > 2 && !( !! (window.attachEvent && !window.opera))) || readyState == 4) {
            this.status = this.getStatus();
            this.statusText = this.getStatusText();
            this.responseText = transport.responseText == null ? '' : String(transport.responseText)
        }
        if (readyState == 4) {
            var xml = transport.responseXML;
            this.responseXML = xml === undefined ? null : xml
        }
    },
    getStatus: NAjax.Request.prototype.getStatus,
    getStatusText: function () {
        try {
            return this.transport.statusText || ''
        } catch (e) {
            return ''
        }
    },
    getHeader: NAjax.Request.prototype.getHeader,
    getResponseHeader: function (name) {
        return this.transport.getResponseHeader(name)
    }
});
NAjax.getElementsByTagNameNS = function (parentnode, nsuri, nsprefix, tagname) {
    var elem = null;
    if (parentnode.getElementsByTagNameNS) {
        elem = parentnode.getElementsByTagNameNS(nsuri, tagname)
    } else {
        elem = parentnode.getElementsByTagName(nsprefix + ':' + tagname)
    }
    return elem
};
NAjax.serializeXMLToString = function (xmldom) {
    var serializer = new XMLSerializer();
    var data = serializer.serializeToString(xmldom);
    return data
};
NRequest = {
    DEFAULT_CONFIG: {
        method: "GET",
        url: window.location.href,
        async: true,
        user: undefined,
        password: undefined,
        params: null,
        proxy: NProxyHost,
        headers: {},
        data: null,
        callback: function () {},
        success: null,
        failure: null,
        scope: null
    },
    issue: function (config) {
        var defaultConfig = NUtility.extend(this.DEFAULT_CONFIG, {
            proxy: NProxyHost
        });
        config = NUtility.applyDefaults(config, defaultConfig);
        var request = new NRequest.XMLHttpRequest();
        var url = config.url;
        if (config.params) {
            var paramString = NUtility.getParameterString(config.params);
            if (paramString.length > 0) {
                var separator = (url.indexOf('?') > -1) ? '&' : '?';
                url += separator + paramString
            }
        }
        if (config.proxy && (url.indexOf("http") == 0)) {
            url = config.proxy + encodeURIComponent(url)
        }
        request.open(config.method, url, config.async, config.user, config.password);
        for (var header in config.headers) {
            request.setRequestHeader(header, config.headers[header])
        }
        var complete = (config.scope) ? NFunction.bind(config.callback, config.scope) : config.callback;
        var success;
        if (config.success) {
            success = (config.scope) ? NFunction.bind(config.success, config.scope) : config.success
        }
        var failure;
        if (config.failure) {
            failure = (config.scope) ? NFunction.bind(config.failure, config.scope) : config.failure
        }
        request.onreadystatechange = function () {
            if (request.readyState == NRequest.XMLHttpRequest.DONE) {
                complete(request);
                if (success && (!request.status || (request.status >= 200 && request.status < 300))) {
                    success(request)
                }
                if (failure && (request.status && (request.status < 200 || request.status >= 300))) {
                    failure(request)
                }
            }
        };
        request.send(config.data);
        return request
    },
    GET: function (config) {
        config = NUtility.extend(config, {
            method: "GET"
        });
        return NRequest.issue(config)
    },
    POST: function (config) {
        config = NUtility.extend(config, {
            method: "POST"
        });
        config.headers = config.headers ? config.headers : {};
        if (!("CONTENT-TYPE" in NUtility.upperCaseObject(config.headers))) {
            config.headers["Content-Type"] = "application/xml"
        }
        return NRequest.issue(config)
    },
    PUT: function (config) {
        config = NUtility.extend(config, {
            method: "PUT"
        });
        config.headers = config.headers ? config.headers : {};
        if (!("CONTENT-TYPE" in NUtility.upperCaseObject(config.headers))) {
            config.headers["Content-Type"] = "application/xml"
        }
        return NRequest.issue(config)
    },
    DELETE: function (config) {
        config = NUtility.extend(config, {
            method: "DELETE"
        });
        return NRequest.issue(config)
    },
    HEAD: function (config) {
        config = NUtility.extend(config, {
            method: "HEAD"
        });
        return NRequest.issue(config)
    },
    OPTIONS: function (config) {
        config = NUtility.extend(config, {
            method: "OPTIONS"
        });
        return NRequest.issue(config)
    }
};
(function () {
    var oXMLHttpRequest = window.XMLHttpRequest;
    var bGecko = !! window.controllers,
        bIE = window.document.all && !window.opera;

    function cXMLHttpRequest() {
        this._object = oXMLHttpRequest ? new oXMLHttpRequest : new window.ActiveXObject('Microsoft.XMLHTTP')
    };
    if (bGecko && oXMLHttpRequest.wrapped) cXMLHttpRequest.wrapped = oXMLHttpRequest.wrapped;
    cXMLHttpRequest.UNSENT = 0;
    cXMLHttpRequest.OPENED = 1;
    cXMLHttpRequest.HEADERS_RECEIVED = 2;
    cXMLHttpRequest.LOADING = 3;
    cXMLHttpRequest.DONE = 4;
    cXMLHttpRequest.prototype.readyState = cXMLHttpRequest.UNSENT;
    cXMLHttpRequest.prototype.responseText = "";
    cXMLHttpRequest.prototype.responseXML = null;
    cXMLHttpRequest.prototype.status = 0;
    cXMLHttpRequest.prototype.statusText = "";
    cXMLHttpRequest.prototype.onreadystatechange = null;
    cXMLHttpRequest.onreadystatechange = null;
    cXMLHttpRequest.onopen = null;
    cXMLHttpRequest.onsend = null;
    cXMLHttpRequest.onabort = null;
    cXMLHttpRequest.prototype.open = function (sMethod, sUrl, bAsync, sUser, sPassword) {
        this._async = bAsync;
        var oRequest = this,
            nState = this.readyState;
        if (bIE) {
            var fOnUnload = function () {
                    if (oRequest._object.readyState != cXMLHttpRequest.DONE) fCleanTransport(oRequest)
                };
            if (bAsync) window.attachEvent("onunload", fOnUnload)
        }
        this._object.onreadystatechange = function () {
            if (bGecko && !bAsync) return;
            oRequest.readyState = oRequest._object.readyState;
            fSynchronizeValues(oRequest);
            if (oRequest._aborted) {
                oRequest.readyState = cXMLHttpRequest.UNSENT;
                return
            }
            if (oRequest.readyState == cXMLHttpRequest.DONE) {
                fCleanTransport(oRequest);
                if (bIE && bAsync) window.detachEvent("onunload", fOnUnload)
            }
            if (nState != oRequest.readyState) fReadyStateChange(oRequest);
            nState = oRequest.readyState
        };
        if (cXMLHttpRequest.onopen) cXMLHttpRequest.onopen.apply(this, arguments);
        this._object.open(sMethod, sUrl, bAsync, sUser, sPassword);
        if (!bAsync && bGecko) {
            this.readyState = cXMLHttpRequest.OPENED;
            fReadyStateChange(this)
        }
    };
    cXMLHttpRequest.prototype.send = function (vData) {
        if (cXMLHttpRequest.onsend) cXMLHttpRequest.onsend.apply(this, arguments);
        if (vData && vData.nodeType) {
            vData = window.XMLSerializer ? new window.XMLSerializer().serializeToString(vData) : vData.xml;
            if (!this._headers["Content-Type"]) this._object.setRequestHeader("Content-Type", "application/xml")
        }
        this._object.send(vData);
        if (bGecko && !this._async) {
            this.readyState = cXMLHttpRequest.OPENED;
            fSynchronizeValues(this);
            while (this.readyState < cXMLHttpRequest.DONE) {
                this.readyState++;
                fReadyStateChange(this);
                if (this._aborted) return
            }
        }
    };
    cXMLHttpRequest.prototype.abort = function () {
        if (cXMLHttpRequest.onabort) cXMLHttpRequest.onabort.apply(this, arguments);
        if (this.readyState > cXMLHttpRequest.UNSENT) this._aborted = true;
        this._object.abort();
        fCleanTransport(this)
    };
    cXMLHttpRequest.prototype.getAllResponseHeaders = function () {
        return this._object.getAllResponseHeaders()
    };
    cXMLHttpRequest.prototype.getResponseHeader = function (sName) {
        return this._object.getResponseHeader(sName)
    };
    cXMLHttpRequest.prototype.setRequestHeader = function (sName, sValue) {
        if (!this._headers) this._headers = {};
        this._headers[sName] = sValue;
        return this._object.setRequestHeader(sName, sValue)
    };
    cXMLHttpRequest.prototype.toString = function () {
        return '[' + "object" + ' ' + "XMLHttpRequest" + ']'
    };
    cXMLHttpRequest.toString = function () {
        return '[' + "XMLHttpRequest" + ']'
    };

    function fReadyStateChange(oRequest) {
        if (oRequest.onreadystatechange) oRequest.onreadystatechange.apply(oRequest);
        if (cXMLHttpRequest.onreadystatechange) cXMLHttpRequest.onreadystatechange.apply(oRequest)
    };

    function fGetDocument(oRequest) {
        var oDocument = oRequest.responseXML;
        if (bIE && oDocument && !oDocument.documentElement && oRequest.getResponseHeader("Content-Type").match(/[^\/]+\/[^\+]+\+xml/)) {
            oDocument = new ActiveXObject('Microsoft.XMLDOM');
            oDocument.loadXML(oRequest.responseText)
        }
        if (oDocument) if ((bIE && oDocument.parseError != 0) || (oDocument.documentElement && oDocument.documentElement.tagName == "parsererror")) return null;
        return oDocument
    };

    function fSynchronizeValues(oRequest) {
        try {
            oRequest.responseText = oRequest._object.responseText
        } catch (e) {}
        try {
            oRequest.responseXML = fGetDocument(oRequest._object)
        } catch (e) {}
        try {
            oRequest.status = oRequest._object.status
        } catch (e) {}
        try {
            oRequest.statusText = oRequest._object.statusText
        } catch (e) {}
    };

    function fCleanTransport(oRequest) {
        oRequest._object.onreadystatechange = new window.Function;
        delete oRequest._headers
    };
    if (!window.Function.prototype.apply) {
        window.Function.prototype.apply = function (oRequest, oArguments) {
            if (!oArguments) oArguments = [];
            oRequest.__func = this;
            oRequest.__func(oArguments[0], oArguments[1], oArguments[2], oArguments[3], oArguments[4]);
            delete oRequest.__func
        }
    };
    NRequest.XMLHttpRequest = cXMLHttpRequest
})();
NEvent = {
    observers: false,
    KEY_BACKSPACE: 8,
    KEY_TAB: 9,
    KEY_RETURN: 13,
    KEY_ESC: 27,
    KEY_LEFT: 37,
    KEY_UP: 38,
    KEY_RIGHT: 39,
    KEY_DOWN: 40,
    KEY_DELETE: 46,
    element: function (event) {
        return event.target || event.srcElement
    },
    isLeftClick: function (event) {
        return (((event.which) && (event.which == 1)) || ((event.button) && (event.button == 1)))
    },
    isRightClick: function (event) {
        return (((event.which) && (event.which == 3)) || ((event.button) && (event.button == 2)))
    },
    stop: function (event, allowDefault) {
        if (!allowDefault) {
            if (event.preventDefault) {
                event.preventDefault()
            } else {
                event.returnValue = false
            }
        }
        if (event.stopPropagation) {
            event.stopPropagation()
        } else {
            event.cancelBubble = true
        }
    },
    findElement: function (event, tagName) {
        var element = NEvent.element(event);
        while (element.parentNode && (!element.tagName || (element.tagName.toUpperCase() != tagName.toUpperCase()))) {
            element = element.parentNode
        }
        return element
    },
    observe: function (elementParam, name, observer, useCapture) {
        var element = NUtility.getElement(elementParam);
        useCapture = useCapture || false;
        if (name == 'keypress' && (navigator.appVersion.match(/Konqueror|Safari|KHTML/) || element.attachEvent)) {
            name = 'keydown'
        }
        if (!this.observers) {
            this.observers = {}
        }
        if (!element._eventCacheID) {
            var idPrefix = "eventCacheID_";
            if (element.id) {
                idPrefix = element.id + "_" + idPrefix
            }
            element._eventCacheID = NUtility.createUniqueID(idPrefix)
        }
        var cacheID = element._eventCacheID;
        if (!this.observers[cacheID]) {
            this.observers[cacheID] = []
        }
        this.observers[cacheID].push({
            'element': element,
            'name': name,
            'observer': observer,
            'useCapture': useCapture
        });
        if (element.addEventListener) {
            element.addEventListener(name, observer, useCapture)
        } else if (element.attachEvent) {
            element.attachEvent('on' + name, observer)
        }
    },
    stopObservingElement: function (elementParam) {
        var element = NUtility.getElement(elementParam);
        var cacheID = element._eventCacheID;
        this._removeElementObservers(NEvent.observers[cacheID])
    },
    _removeElementObservers: function (elementObservers) {
        if (elementObservers) {
            for (var i = elementObservers.length - 1; i >= 0; i--) {
                var entry = elementObservers[i];
                var args = new Array(entry.element, entry.name, entry.observer, entry.useCapture);
                var removed = NEvent.stopObserving.apply(this, args)
            }
        }
    },
    stopObserving: function (elementParam, name, observer, useCapture) {
        useCapture = useCapture || false;
        var element = NUtility.getElement(elementParam);
        var cacheID = element._eventCacheID;
        if (name == 'keypress') {
            if (navigator.appVersion.match(/Konqueror|Safari|KHTML/) || element.detachEvent) {
                name = 'keydown'
            }
        }
        var foundEntry = false;
        var elementObservers = NEvent.observers[cacheID];
        if (elementObservers) {
            var i = 0;
            while (!foundEntry && i < elementObservers.length) {
                var cacheEntry = elementObservers[i];
                if ((cacheEntry.name == name) && (cacheEntry.observer == observer) && (cacheEntry.useCapture == useCapture)) {
                    elementObservers.splice(i, 1);
                    if (elementObservers.length == 0) {
                        delete NEvent.observers[cacheID]
                    }
                    foundEntry = true;
                    break
                }
                i++
            }
        }
        if (foundEntry) {
            if (element.removeEventListener) {
                element.removeEventListener(name, observer, useCapture)
            } else if (element && element.detachEvent) {
                element.detachEvent('on' + name, observer)
            }
        }
        return foundEntry
    },
    unloadCache: function () {
        if (NEvent && NEvent.observers) {
            for (var cacheID in NEvent.observers) {
                var elementObservers = NEvent.observers[cacheID];
                NEvent._removeElementObservers.apply(this, [elementObservers])
            }
            NEvent.observers = false
        }
    },
    _CLASS_NAME: "NEvent"
};
NEvent.observe(window, 'unload', NEvent.unloadCache, false);
if (window.Event) {
    NUtility.applyDefaults(window.Event, NEvent)
} else {
    var Event = NEvent
}
NEvents = NObject({
    _BROWSER_EVENTS: ["mouseover", "mouseout", "mousedown", "mouseup", "mousemove", "click", "dblclick", "rightclick", "dblrightclick", "resize", "focus", "blur"],
    _listeners: null,
    object: null,
    element: null,
    eventTypes: null,
    eventProcessor: null,
    persistEvent: null,
    autoAddXYProp: false,
    construct: function (object, element, eventTypes, persistEvent, options) {
        NUtility.extend(this, options);
        this.object = object;
        this.element = element;
        this.persistEvent = persistEvent;
        this._listeners = {};
        this.eventProcessor = NFunction.bindAsEventListener(this.triggerBrowserEvent, this);
        this.eventTypes = [];
        if (eventTypes != null) {
            for (var i = 0, len = eventTypes.length; i < len; i++) {
                this.addEventType(eventTypes[i])
            }
        }
        if (this.element != null) {
            this._attachToElement(element)
        }
    },
    dispose: function () {
        if (this.element) {
            NEvent.stopObservingElement(this.element)
        }
        this.element = null;
        this._listeners = null;
        this.object = null;
        this.eventTypes = null;
        this.persistEvent = null;
        this.eventProcessor = null
    },
    addEventType: function (eventName) {
        if (!this._listeners[eventName]) {
            this.eventTypes.push(eventName);
            this._listeners[eventName] = []
        }
    },
    _attachToElement: function (element) {
        for (var i = 0, len = this._BROWSER_EVENTS.length; i < len; i++) {
            var eventType = this._BROWSER_EVENTS[i];
            this.addEventType(eventType);
            NEvent.observe(element, eventType, this.eventProcessor)
        }
        NEvent.observe(element, "dragstart", NEvent.stop)
    },
    addListener: function (object) {
        for (var type in object) {
            if (type != "scope") {
                this._register(type, object.scope, object[type])
            }
        }
        return object
    },
    bind: function (type, obj, func) {
        this._register(type, obj, func);
        return {
            type: func,
            scope: obj
        }
    },
    unbind: function (type, obj, func) {
        this._unregister(type, obj, func)
    },
    _register: function (type, obj, func) {
        if ((func != null) && (NUtility.indexOf(this.eventTypes, type) != -1)) {
            if (obj == null) {
                obj = this.object
            }
            var _listeners = this._listeners[type];
            _listeners.push({
                obj: obj,
                func: func
            })
        }
    },
    _registerPriority: function (type, obj, func) {
        if (func != null) {
            if (obj == null) {
                obj = this.object
            }
            var _listeners = this._listeners[type];
            if (_listeners != null) {
                _listeners.unshift({
                    obj: obj,
                    func: func
                })
            }
        }
    },
    removeListener: function (object) {
        for (var type in object) {
            if (type != "scope") {
                this._unregister(type, object.scope, object[type])
            }
        }
    },
    _unregister: function (type, obj, func) {
        if (obj == null) {
            obj = this.object
        }
        var _listeners = this._listeners[type];
        if (_listeners != null) {
            for (var i = 0, len = _listeners.length; i < len; i++) {
                if (_listeners[i].obj == obj && _listeners[i].func == func) {
                    _listeners.splice(i, 1);
                    break
                }
            }
        }
    },
    remove: function (type) {
        if (this._listeners[type] != null) {
            this._listeners[type] = []
        }
    },
    triggerEvent: function (type, evt) {
        if (evt == null) {
            evt = {}
        }
        evt.object = this.object;
        evt.element = this.element;
        if (!evt.type) {
            evt.type = type
        }
        var _listeners = (this._listeners[type]) ? this._listeners[type].slice() : null;
        if ((_listeners != null) && (_listeners.length > 0)) {
            var continueChain;
            for (var i = 0, len = _listeners.length; i < len; i++) {
                var callback = _listeners[i];
                continueChain = callback.func.apply(callback.obj, [evt]);
                if ((continueChain != undefined) && (continueChain == false)) {
                    break
                }
            }
            if (!this.persistEvent) {
                NEvent.stop(evt, true)
            }
        }
        return continueChain
    },
    triggerBrowserEvent: function (evt) {
        if (this.autoAddXYProp) {
            evt.xy = this.getCursorPosition(evt)
        }
        this.triggerEvent(evt.type, evt)
    },
    clearMouseCache: function () {
        this.element.scrolls = null;
        this.element.lefttop = null;
        this.element.offsets = null
    },
    getCursorPosition: function (evt) {
        if (!this.autoAddXYProp) {
            this.clearMouseCache()
        } else if (!this.element.hasScrollEvent) {
            NEvent.observe(window, 'scroll', NFunction.bind(this.clearMouseCache, this));
            this.element.hasScrollEvent = true
        }
        if (!this.element.scrolls) {
            this.element.scrolls = [];
            this.element.scrolls[0] = (document.documentElement.scrollLeft || document.body.scrollLeft);
            this.element.scrolls[1] = (document.documentElement.scrollTop || document.body.scrollTop)
        }
        if (!this.element.lefttop) {
            this.element.lefttop = [];
            this.element.lefttop[0] = (document.documentElement.clientLeft || 0);
            this.element.lefttop[1] = (document.documentElement.clientTop || 0)
        }
        if (!this.element.offsets) {
            this.element.offsets = NUtility.pagePosition(this.element);
            this.element.offsets[0] += this.element.scrolls[0];
            this.element.offsets[1] += this.element.scrolls[1]
        }
        return new NPixel((evt.clientX + this.element.scrolls[0]) - this.element.offsets[0] - this.element.lefttop[0], (evt.clientY + this.element.scrolls[1]) - this.element.offsets[1] - this.element.lefttop[1])
    },
    _CLASS_NAME: "NEvents"
});
window.NEventManager = {
    addListener: function (o, object) {
        if ((typeof o == 'object') && o.constructor == Object && o.events && (o.events instanceof NEvents)) {
            return o.events.addListener(object)
        } else return null
    },
    removeListener: function (o, object) {
        if ((typeof o == 'object') && o.constructor == Object && o.events && (o.events instanceof NEvents)) o.events.removeListener(object)
    },
    bind: function (o, type, obj, fun) {
        if (o != null && (typeof o == 'object') && o.events && (o.events instanceof NEvents)) return o.events.bind(type, obj, fun);
        else return false
    },
    unbind: function (o, type, obj, fun) {
        if (o != null && (typeof o == 'object') && o.events && (o.events instanceof NEvents)) o.events.unbind(type, obj, fun);
        else return false
    }
};
NProjection = NObject({
    proj: null,
    projCode: null,
    construct: function (projCode, options) {
        NUtility.extend(this, options);
        this.projCode = projCode;
        if (window.Proj4js) {
            this.proj = new Proj4js.Proj(projCode)
        }
    },
    getCode: function () {
        return this.proj ? this.proj.srsCode : this.projCode
    },
    getUnits: function () {
        return this.proj ? this.proj.units : null
    },
    toString: function () {
        return this.getCode()
    },
    equals: function (projection) {
        if (projection && projection.getCode) {
            return this.getCode() == projection.getCode()
        } else {
            return false
        }
    },
    dispose: function () {
        delete this.proj;
        delete this.projCode
    },
    _CLASS_NAME: "NProjection"
});
NProjection.transforms = {};
NProjection.addTransform = function (from, to, method) {
    if (!NProjection.transforms[from]) {
        NProjection.transforms[from] = {}
    }
    NProjection.transforms[from][to] = method
};
NProjection.transform = function (point, source, dest) {
    if (source.proj && dest.proj) {
        point = Proj4js.transform(source.proj, dest.proj, point)
    } else if (source && dest && NProjection.transforms[source.getCode()] && NProjection.transforms[source.getCode()][dest.getCode()]) {
        NProjection.transforms[source.getCode()][dest.getCode()](point)
    }
    return point
};
NMap = NObject({
    NMAP_Z_INDEX: {
        BasicLayer: 100,
        Overlay: 325,
        Feature: 725,
        Dialog: 750,
        Control: 1000,
        Tool: 1000
    },
    _EVENT_TYPES: ["preaddlayer", "addlayer", "removelayer", "changelayer", "movestart", "move", "moveend", "zoomend", "dialogopen", "dialogclose", "addmarker", "removemarker", "clearmarkers", "mouseover", "mouseout", "mousemove", "dragstart", "drag", "dragend", "changebasiclayer", "mapRefreshEnd"],
    id: null,
    arbitraryScale: false,
    events: null,
    div: null,
    needcallback: false,
    dragging: false,
    size: null,
    mapViewPortDiv: null,
    _layerContainerOrigin: null,
    _layerContainerDiv: null,
    layers: null,
    queryLayers: null,
    controls: null,
    tools: null,
    dialogs: null,
    basicLayer: null,
    center: null,
    resolution: null,
    zoomLevel: 0,
    panRatio: 1.5,
    _viewChangedID: 0,
    tileSize: null,
    projection: "EPSG:4326",
    units: 'dd',
    resolutions: null,
    maxResolution: 1.40625,
    minResolution: null,
    maxScale: null,
    minScale: null,
    maxExtent: null,
    minExtent: null,
    limitedZoomExtent: null,
    zoomLevelsCount: 16,
    theme: null,
    projection4Display: null,
    persistEvent: true,
    panTransition: null,
    eventListeners: null,
    panStyleFunc: NExpoEasing.easeOut,
    dialogsPad: null,
    construct: function (div, options) {
        this.tileSize = new NSize(NMap.TILE_WIDTH, NMap.TILE_HEIGHT);
        this.maxExtent = new NBounds(-180, -90, 180, 90);
        this.dialogsPad = new NBounds(15, 15, 15, 15);
        this.theme = NGetScriptLocation() + 'theme/default/style.css';
        NUtility.extend(this, options);
        this.id = NUtility.createUniqueID("NMap_");
        this.div = NUtility.getElement(div);
        NElement.addClass(this.div, 'nmMap');
        var id = this.div.id + "_NewMap_ViewPort";
        this.mapViewPortDiv = NUtility.createDiv(id, null, null, null, "relative", null, "hidden");
        this.mapViewPortDiv.style.width = "100%";
        this.mapViewPortDiv.style.height = "100%";
        this.mapViewPortDiv.className = "nmMapViewport";
        this.div.appendChild(this.mapViewPortDiv);
        id = this.div.id + "_NewMap_Container";
        this._layerContainerDiv = NUtility.createDiv(id);
        this._layerContainerDiv.style.zIndex = this.NMAP_Z_INDEX['Dialog'] - 1;
        this.mapViewPortDiv.appendChild(this._layerContainerDiv);
        this.events = new NEvents(this, this.div, this._EVENT_TYPES, this.persistEvent, {
            autoAddXYProp: true
        });
        this.updateSize();
        if (this.eventListeners instanceof Object) {
            this.events.addListener(this.eventListeners)
        }
        this.events._register("movestart", this, this.updateSize);
        if (NString.contains(navigator.appName, "Microsoft")) {
            this.events._register("resize", this, this.updateSize)
        } else {
            this._updateSizeDestroy = NFunction.bind(this.updateSize, this);
            NEvent.observe(window, 'resize', this._updateSizeDestroy)
        }
        if (this.theme) {
            var addNode = true;
            var nodes = document.getElementsByTagName('link');
            for (var i = 0, len = nodes.length; i < len; ++i) {
                if (NUtility.isEquivalentUrl(nodes.item(i).href, this.theme)) {
                    addNode = false;
                    break
                }
            }
            if (addNode) {
                var cssNode = document.createElement('link');
                cssNode.setAttribute('rel', 'stylesheet');
                cssNode.setAttribute('type', 'text/css');
                cssNode.setAttribute('href', this.theme);
                document.getElementsByTagName('head')[0].appendChild(cssNode)
            }
        }
        this.layers = [];
        this.queryLayers = [];
        if (this.controls == null) {
            this.controls = []
        }
        if (this.tools == null) {
            if (NTool != null) {
                this.tools = [new NNavigationTool()]
            } else {
                this.tools = []
            }
        }
        for (var i = 0, len = this.controls.length; i < len; i++) {
            this._addControlToMap(this.controls[i])
        }
        for (var i = 0, len = this.tools.length; i < len; i++) {
            this.addToolToMap(this.tools[i])
        }
        this.dialogs = [];
        this._unloadDestroy = NFunction.bind(this.dispose, this);
        NEvent.observe(window, 'unload', this._unloadDestroy)
    },
    _unloadDestroy: null,
    _updateSizeDestroy: null,
    dispose: function () {
        if (!this._unloadDestroy) {
            return false
        }
        NEvent.stopObserving(window, 'unload', this._unloadDestroy);
        this._unloadDestroy = null;
        if (this._updateSizeDestroy) {
            NEvent.stopObserving(window, 'resize', this._updateSizeDestroy)
        } else {
            this.events._unregister("resize", this, this.updateSize)
        }
        this.dialogsPad = null;
        if (this.controls != null) {
            for (var i = this.controls.length - 1; i >= 0; --i) {
                this.controls[i].dispose()
            }
            this.controls = null
        }
        if (this.tools != null) {
            for (var i = this.tools.length - 1; i >= 0; --i) {
                this.tools[i].dispose()
            }
            this.tools = null
        }
        if (this.layers != null) {
            for (var i = this.layers.length - 1; i >= 0; --i) {
                this.layers[i].dispose(false)
            }
            this.layers = null
        }
        if (this.mapViewPortDiv) {
            this.div.removeChild(this.mapViewPortDiv)
        }
        this.mapViewPortDiv = null;
        if (this.eventListeners) {
            this.events.removeListener(this.eventListeners);
            this.eventListeners = null
        }
        this.events.dispose();
        this.events = null
    },
    setParameters: function (options) {
        NUtility.extend(this, options)
    },
    getTileSize: function () {
        return this.tileSize
    },
    _By: function (array, property, match) {
        var test = (typeof match.test == "function");
        var found = NArray.filter(this[array], function (item) {
            return item[property] == match || (test && match.test(item[property]))
        });
        return found
    },
    _getLayersBy: function (property, match) {
        return this._By("layers", property, match)
    },
    getLayersByName: function (match) {
        return this._getLayersBy("name", match)
    },
    _getLayersByClass: function (match) {
        return this.getLayersBy("_CLASS_NAME", match)
    },
    _getControlsBy: function (property, match) {
        return this._By("controls", property, match)
    },
    getControlsByClass: function (match) {
        return this._getControlsBy("_CLASS_NAME", match)
    },
    getControlsCount: function () {
        try {
            if (this.controls != null) {
                return this.controls.length
            }
            return 0
        } catch (e) {
            return 0
        }
    },
    getLayerByID: function (id) {
        var foundLayer = null;
        for (var i = 0, len = this.layers.length; i < len; i++) {
            var layer = this.layers[i];
            if (layer.id == id) {
                foundLayer = layer;
                break
            }
        }
        return foundLayer
    },
    getLayerByIndex: function (index) {
        var foundLayer = null;
        if (this.layers == null) {
            return null
        }
        if (index < this.layers.length) {
            foundLayer = this.layers[index]
        }
        return foundLayer
    },
    setLayerZIndex: function (layer, zIndex) {
        layer.setZIndex(this.NMAP_Z_INDEX[layer.isBasicLayer ? 'BasicLayer' : 'Overlay'] + zIndex * 5)
    },
    resetLayersZIndex: function () {
        for (var i = 0, len = this.layers.length; i < len; i++) {
            var layer = this.layers[i];
            this.setLayerZIndex(layer, i)
        }
    },
    enableDefaultDblClick: function () {
        try {
            if (this.tools != null && this.tools.length > 0 && this.tools[0].toolType == "NNavigationTool") this.tools[0].processors.click.enable()
        } catch (e) {}
    },
    disableDefaultDblClick: function () {
        try {
            if (this.tools != null && this.tools.length > 0 && this.tools[0].toolType == "NNavigationTool") this.tools[0].processors.click.disable()
        } catch (e) {}
    },
    addLayer: function (layer) {
        for (var i = 0, len = this.layers.length; i < len; i++) {
            if (this.layers[i] == layer) {
                var msg = NMGISLG('layerAlreadyAdded', {
                    'layerName': layer.name
                });
                NLog.warn(msg);
                return false
            }
        }
        this.events.triggerEvent("preaddlayer", {
            layer: layer
        });
        layer.div.className = "nmLayerDiv";
        layer.div.style.overflow = "";
        this.setLayerZIndex(layer, this.layers.length);
        if (layer.isFixed) {
            this.mapViewPortDiv.appendChild(layer.div)
        } else {
            this._layerContainerDiv.appendChild(layer.div)
        }
        this.layers.push(layer);
        layer.setMap(this);
        if (layer.isBasicLayer) {
            if (this.basicLayer == null) {
                this.setBasicLayer(layer)
            } else {
                layer.setVisible(false)
            }
        } else {
            layer.redraw()
        }
        this.events.triggerEvent("addlayer", {
            layer: layer
        })
    },
    addLayers: function (layers) {
        for (var i = 0, len = layers.length; i < len; i++) {
            this.addLayer(layers[i])
        }
    },
    removeLayer: function (layer, newBasicLayer) {
        if (newBasicLayer == null) {
            newBasicLayer = true
        }
        if (layer.isFixed) {
            this.mapViewPortDiv.removeChild(layer.div)
        } else {
            this._layerContainerDiv.removeChild(layer.div)
        }
        NUtility.removeItem(this.layers, layer);
        layer.removeMap(this);
        layer.map = null;
        if (this.basicLayer == layer) {
            this.basicLayer = null;
            if (newBasicLayer) {
                for (var i = 0, len = this.layers.length; i < len; i++) {
                    var iLayer = this.layers[i];
                    if (iLayer.isBasicLayer) {
                        this.setBasicLayer(iLayer);
                        break
                    }
                }
            }
        }
        this.resetLayersZIndex();
        this.events.triggerEvent("removelayer", {
            layer: layer
        })
    },
    getLayersCount: function () {
        if (this.layers == null) {
            return 0
        }
        return this.layers.length
    },
    getLayerIndex: function (layer) {
        return NUtility.indexOf(this.layers, layer)
    },
    setLayerIndex: function (layer, index) {
        var base = this.getLayerIndex(layer);
        if (index < 0) {
            index = 0
        } else if (index > this.layers.length) {
            index = this.layers.length
        }
        if (base != index) {
            this.layers.splice(base, 1);
            this.layers.splice(index, 0, layer);
            for (var i = 0, len = this.layers.length; i < len; i++) {
                this.setLayerZIndex(this.layers[i], i)
            }
            this.events.triggerEvent("changelayer", {
                layer: layer,
                property: "order"
            })
        }
    },
    moveLayer: function (layer, delta) {
        var index = this.getLayerIndex(layer) + delta;
        this.setLayerIndex(layer, index)
    },
    setBasicLayer: function (newBaseLayer) {
        var oldExtent = null;
        if (this.basicLayer) {
            oldExtent = this.basicLayer.getExtent()
        }
        if (newBaseLayer != this.basicLayer) {
            if (NUtility.indexOf(this.layers, newBaseLayer) != -1) {
                if (this.basicLayer != null) {
                    this.basicLayer.setVisible(false)
                }
                this.basicLayer = newBaseLayer;
                this._viewChangedID++;
                this.basicLayer.visible = true;
                var center = this.getCenter();
                if (center != null) {
                    var newCenter = (oldExtent) ? oldExtent.getCenterInLatLng() : center;
                    if (this.basicLayer.maxExtent != null && !this.basicLayer.maxExtent.containsLonLat(newCenter)) {
                        this.zoomToMaxExtent()
                    } else {
                        var newZoom = (oldExtent) ? this.getZoomLevelByExtent(oldExtent, true) : this.getZoomLevelByResolution(this.resolution, true);
                        this.setCenter(newCenter, newZoom, false, true)
                    }
                }
                this.events.triggerEvent("changebasiclayer", {
                    layer: this.basicLayer
                })
            }
        }
    },
    addControl: function (control, pixel) {
        this.controls.push(control);
        this._addControlToMap(control, pixel)
    },
    addTool: function (tool, px) {
        this.tools.push(tool);
        this.addToolToMap(tool, px)
    },
    addTools: function (toolAry) {
        for (var i = 0, len = toolAry.length; i < len; i++) {
            this.addTool(toolAry[i])
        }
    },
    _addControlToMap: function (control, pixel) {
        control.outsideViewport = (control.div != null);
        if (this.projection4Display && !control.projection4Display) {
            control.projection4Display = this.projection4Display
        }
        control.setMap(this);
        var div = control.draw(pixel);
        if (div) {
            if (!control.outsideViewport) {
                div.style.zIndex = this.NMAP_Z_INDEX['Control'] + this.controls.length;
                this.mapViewPortDiv.appendChild(div)
            }
        }
    },
    addToolToMap: function (tool, pixel) {
        tool.outsideViewport = (tool.div != null);
        if (this.projection4Display && !tool.projection4Display) {
            tool.projection4Display = this.projection4Display
        }
        tool.setMap(this);
        var div = tool.draw(pixel);
        if (div) {
            if (!tool.outsideViewport) {
                div.style.zIndex = this.NMAP_Z_INDEX['Tool'] + this.controls.length;
                this.mapViewPortDiv.appendChild(div)
            }
        }
    },
    getControlByID: function (id) {
        var returnControl = null;
        for (var i = 0, len = this.controls.length; i < len; i++) {
            var control = this.controls[i];
            if (control.id == id) {
                returnControl = control;
                break
            }
        }
        return returnControl
    },
    getToolByID: function (id) {
        var returnTool = null;
        for (var i = 0, len = this.tools.length; i < len; i++) {
            var tool = this.tools[i];
            if (tool.id == id) {
                returnTool = tool;
                break
            }
        }
        return returnTool
    },
    removeControl: function (control) {
        if ((control) && (control == this.getControlByID(control.id))) {
            if (control.div && (control.div.parentNode == this.mapViewPortDiv)) {
                this.mapViewPortDiv.removeChild(control.div)
            }
            NUtility.removeItem(this.controls, control)
        }
    },
    removeTool: function (tool) {
        if ((tool) && (tool == this.getToolByID(tool.id))) {
            if (tool.div && (tool.div.parentNode == this.mapViewPortDiv)) {
                this.mapViewPortDiv.removeChild(tool.div)
            }
            NUtility.removeItem(this.tools, tool)
        }
    },
    addDialog: function (dialog, exclusive) {
        if (exclusive) {
            for (var i = this.dialogs.length - 1; i >= 0; --i) {
                this.removeDialog(this.dialogs[i])
            }
        }
        dialog.map = this;
        this.dialogs.push(dialog);
        var dialogDiv = dialog.draw();
        if (dialogDiv) {
            dialogDiv.style.zIndex = this.NMAP_Z_INDEX['Dialog'] + this.dialogs.length;
            this._layerContainerDiv.appendChild(dialogDiv)
        }
    },
    removeDialog: function (dialog) {
        NUtility.removeItem(this.dialogs, dialog);
        if (dialog.div) {
            try {
                this._layerContainerDiv.removeChild(dialog.div)
            } catch (e) {}
        }
        dialog.map = null
    },
    getSize: function () {
        var size = null;
        if (this.size != null) {
            size = this.size.clone()
        }
        return size
    },
    updateSize: function () {
        this.events.clearMouseCache();
        var newSize = this.getCurrentSize();
        var oldSize = this.getSize();
        if (oldSize == null) {
            this.size = oldSize = newSize
        }
        if (!newSize.equals(oldSize)) {
            this.size = newSize;
            for (var i = 0, len = this.layers.length; i < len; i++) {
                this.layers[i].onMapResize()
            }
            if (this.basicLayer != null) {
                var center = new NPixel(newSize.w / 2, newSize.h / 2);
                var centerLL = this._mapViewPortPxToWorld(center);
                var zoomLevel = this.getZoomLevel();
                this.zoomLevel = null;
                this.setCenter(this.getCenter(), zoomLevel)
            }
        }
    },
    getCurrentSize: function () {
        var size = new NSize(this.div.clientWidth, this.div.clientHeight);
        if (size.w == 0 && size.h == 0 || isNaN(size.w) && isNaN(size.h)) {
            var dim = NElement.getDimensions(this.div);
            size.w = dim.width;
            size.h = dim.height
        }
        if (size.w == 0 && size.h == 0 || isNaN(size.w) && isNaN(size.h)) {
            size.w = parseInt(this.div.style.width);
            size.h = parseInt(this.div.style.height)
        }
        return size
    },
    getBounds: function (center, resolution) {
        var extent = null;
        if (center == null) {
            center = this.getCenter()
        }
        if (resolution == null) {
            resolution = this.getResolution()
        }
        if ((center != null) && (resolution != null)) {
            var size = this.getSize();
            var w_deg = size.w * resolution;
            var h_deg = size.h * resolution;
            extent = new NBounds(center.lon - w_deg / 2, center.lat - h_deg / 2, center.lon + w_deg / 2, center.lat + h_deg / 2)
        }
        return extent
    },
    getCenter: function () {
        return this.center
    },
    getZoomLevel: function () {
        return this.zoomLevel
    },
    pan: function (dx, dy, options) {
        options = NUtility.applyDefaults(options, {
            animate: true,
            dragging: false
        });
        var centerPx = this._worldToMapViewPortPx(this.getCenter());
        var newCenterPx = centerPx.offsetByXY(dx, dy);
        if (!options.dragging || !newCenterPx.equals(centerPx)) {
            var newCenterLonLat = this._mapViewPortPxToWorld(newCenterPx);
            if (options.animate) {
                this.panTo(newCenterLonLat)
            } else {
                this.setCenter(newCenterLonLat, null, options.dragging)
            }
        }
    },
    panTo: function (latlng) {
        if (this.panStyleFunc && this.getExtent().scale(this.panRatio).containsLonLat(latlng)) {
            if (!this.panTransition) {
                this.panTransition = new NTransition(this.panStyleFunc)
            }
            var center = this.getCenter();
            if (latlng.lon == center.lon && latlng.lat == center.lat) {
                return
            }
            var from = {
                lon: center.lon,
                lat: center.lat
            };
            var to = {
                lon: latlng.lon,
                lat: latlng.lat
            };
            this.panTransition.start(from, to, 50, {
                callbacks: {
                    start: NFunction.bind(function (latlng) {
                        this.events.triggerEvent("movestart")
                    }, this),
                    eachStep: NFunction.bind(function (latlng) {
                        latlng = new NLatLng(latlng.lon, latlng.lat);
                        this.moveTo(latlng, this.zoomLevel, {
                            'dragging': true,
                            'noEvent': true
                        })
                    }, this),
                    done: NFunction.bind(function (latlng) {
                        latlng = new NLatLng(latlng.lon, latlng.lat);
                        this.moveTo(latlng, this.zoomLevel, {
                            'noEvent': true
                        });
                        this.events.triggerEvent("moveend")
                    }, this)
                }
            })
        } else {
            this.setCenter(latlng)
        }
    },
    setCenter: function (latlng, zoomLevel, dragging, forceZoomChange) {
        this.moveTo(latlng, zoomLevel, {
            'dragging': dragging,
            'forceZoomChange': forceZoomChange,
            'caller': 'setCenter'
        })
    },
    redrawcallback: function (latlng, zoomLevel, options) {},
    moveTo: function (latlng, zoomLevel, options) {
        if (!options) {
            options = {}
        }
        var dragging = options.dragging;
        var forceZoomChange = options.forceZoomChange;
        var noEvent = options.noEvent;
        if (this.panTransition && options.caller == "setCenter") {
            this.panTransition.stop()
        }
        if (!this.center && !this.isValidLonLat(latlng)) {
            latlng = this.maxExtent.getCenterInLatLng()
        }
        if (this.limitedZoomExtent != null) {
            if (latlng == null) {
                latlng = this.getCenter()
            }
            if (zoomLevel == null) {
                zoomLevel = this.getZoomLevel()
            }
            var resolution = this.getResolutionByZoomLevel(zoomLevel);
            var extent = this.getBounds(latlng, resolution);
            if (!this.limitedZoomExtent.containsBounds(extent)) {
                var maxCenter = this.limitedZoomExtent.getCenterInLatLng();
                if (extent.getWidth() > this.limitedZoomExtent.getWidth()) {
                    latlng = new NLatLng(maxCenter.lon, latlng.lat)
                } else if (extent.left < this.limitedZoomExtent.left) {
                    latlng = latlng.offsetByXY(this.limitedZoomExtent.left - extent.left, 0)
                } else if (extent.right > this.limitedZoomExtent.right) {
                    latlng = latlng.offsetByXY(this.limitedZoomExtent.right - extent.right, 0)
                }
                if (extent.getHeight() > this.limitedZoomExtent.getHeight()) {
                    latlng = new NLatLng(latlng.lon, maxCenter.lat)
                } else if (extent.bottom < this.limitedZoomExtent.bottom) {
                    latlng = latlng.offsetByXY(0, this.limitedZoomExtent.bottom - extent.bottom)
                } else if (extent.top > this.limitedZoomExtent.top) {
                    latlng = latlng.offsetByXY(0, this.limitedZoomExtent.top - extent.top)
                }
            }
        }
        var zoomChanged = forceZoomChange || ((this.isValidZoomLevel(zoomLevel)) && (zoomLevel != this.getZoomLevel()));
        var centerChanged = (this.isValidLonLat(latlng)) && (!latlng.equals(this.center));
        if (zoomChanged || centerChanged || !dragging) {
            if (!this.dragging && !noEvent) {
                this.events.triggerEvent("movestart")
            }
            if (centerChanged) {
                if ((!zoomChanged) && (this.center)) {
                    this._centerLayerContainer(latlng)
                }
                this.center = latlng.clone()
            }
            if ((zoomChanged) || (this._layerContainerOrigin == null)) {
                this._layerContainerOrigin = this.center.clone();
                this._layerContainerDiv.style.left = "0px";
                this._layerContainerDiv.style.top = "0px"
            }
            if (zoomChanged) {
                this.zoomLevel = zoomLevel;
                this.resolution = this.getResolutionByZoomLevel(zoomLevel);
                this._viewChangedID++
            }
            var bounds = this.getExtent();
            this.basicLayer.moveTo(bounds, zoomChanged, dragging);
            bounds = this.basicLayer.getExtent();
            for (var i = 0, len = this.layers.length; i < len; i++) {
                var layer = this.layers[i];
                if (!layer.isBasicLayer) {
                    var inRange = layer.calculateInRange();
                    if (layer.inRange != inRange) {
                        layer.inRange = inRange;
                        if (!inRange) {
                            layer.display(false)
                        }
                        this.events.triggerEvent("changelayer", {
                            layer: layer,
                            property: "visible"
                        })
                    }
                    if (inRange && layer.visible) {
                        layer.moveTo(bounds, zoomChanged, dragging);
                        layer.events.triggerEvent("moveend", {
                            "zoomChanged": zoomChanged
                        })
                    }
                }
            }
            if (zoomChanged) {
                for (var i = 0, len = this.dialogs.length; i < len; i++) {
                    this.dialogs[i].updatePosition()
                }
            }
            this.events.triggerEvent("move");
            if (zoomChanged) {
                this.events.triggerEvent("zoomend")
            }
        }
        if (!dragging && !noEvent) {
            this.events.triggerEvent("moveend")
        }
        this.dragging = !! dragging;
        this.events.triggerEvent("mapRefreshEnd");
        if (this.needcallback) {
            this.redrawcallback()
        }
    },
    _centerLayerContainer: function (latlng) {
        var originPx = this._worldToMapViewPortPx(this._layerContainerOrigin);
        var newPx = this._worldToMapViewPortPx(latlng);
        if ((originPx != null) && (newPx != null)) {
            this._layerContainerDiv.style.left = Math.round(originPx.x - newPx.x) + "px";
            this._layerContainerDiv.style.top = Math.round(originPx.y - newPx.y) + "px"
        }
    },
    isValidZoomLevel: function (zoomLevel) {
        return ((zoomLevel != null) && (zoomLevel >= 0) && (zoomLevel < this.getZoomLevelsCount()))
    },
    isValidLonLat: function (latlng) {
        var valid = false;
        if (latlng != null) {
            var maxExtent = this.getMaxExtent();
            valid = maxExtent.containsLonLat(latlng)
        }
        return valid
    },
    getProjectionCode: function () {
        var projection = this.getProjection();
        return projection ? projection.getCode() : null
    },
    getProjection: function () {
        var projection = null;
        if (this.basicLayer != null) {
            projection = this.basicLayer.projection
        }
        return projection
    },
    getMaxResolution: function () {
        var maxResolution = null;
        if (this.basicLayer != null) {
            maxResolution = this.basicLayer.maxResolution
        }
        return maxResolution
    },
    getMaxExtent: function (options) {
        var maxExtent = null;
        if (options && options.restricted && this.limitedZoomExtent) {
            maxExtent = this.limitedZoomExtent
        } else if (this.basicLayer != null) {
            maxExtent = this.basicLayer.maxExtent
        }
        return maxExtent
    },
    getZoomLevelsCount: function () {
        var zoomLevelsCount = null;
        if (this.basicLayer != null) {
            zoomLevelsCount = this.basicLayer.zoomLevelsCount
        }
        return zoomLevelsCount
    },
    addQueryLayer: function (queryLayer) {
        if (queryLayer == null || queryLayer._CLASS_NAME == undefined || queryLayer._CLASS_NAME != "NQueryLayer") {
            return false
        }
        for (var i = 0, len = this.queryLayers.length; i < len; i++) {
            if (this.queryLayers[i] == queryLayer) {
                var msg = NMGISLG('layerAlreadyAdded', {
                    'layerName': queryLayer.name
                });
                NLog.warn(msg);
                return false
            }
        }
        if (this.queryLayers == null) this.queryLayers = [];
        this.queryLayers.push(queryLayer);
        return true
    },
    getQueryLayerByIndex: function (index) {
        if (this.queryLayers == null || this.queryLayers.length <= index) {
            return null
        }
        return this.queryLayers[index]
    },
    getQueryLayersByName: function (name) {
        try {
            if (this.queryLayers == null || this.queryLayers.length <= index) {
                return null
            }
            var returnArr = null;
            for (var i = 0, len = this.queryLayers.length; i < len; i++) {
                if (this.queryLayers[i].name == name) {
                    if (returnArr == null) {
                        returnArr = []
                    }
                    returnArr.push[this.queryLayers[i]]
                }
            }
            return returnArr
        } catch (e) {
            return null
        }
    },
    removeQueryLayer: function (queryLayer) {
        if (queryLayer == null || queryLayer._CLASS_NAME == undefined || queryLayer._CLASS_NAME != "NQueryLayer" || this.queryLayers == null || this.queryLayers.length <= 0) {
            return false
        }
        NUtility.removeItem(this.queryLayers, queryLayer)
    },
    getQueryLayersCount: function () {
        if (this.queryLayers == null) {
            return 0
        }
        return this.queryLayers.length
    },
    getExtent: function () {
        var extent = null;
        if (this.basicLayer != null) {
            extent = this.basicLayer.getExtent()
        }
        return extent
    },
    getResolution: function () {
        var resolution = null;
        if (this.basicLayer != null) {
            resolution = this.basicLayer.getResolution()
        }
        return resolution
    },
    getUnits: function () {
        var units = null;
        if (this.basicLayer != null) {
            units = this.basicLayer.units
        }
        return units
    },
    getScale: function () {
        var scale = null;
        if (this.basicLayer != null) {
            var res = this.getResolution();
            var units = this.basicLayer.units;
            scale = NUtility.getScaleFromResolution(res, units)
        }
        return scale
    },
    getZoomLevelByExtent: function (bounds, closest) {
        var zoomLevel = null;
        if (this.basicLayer != null) {
            zoomLevel = this.basicLayer.getZoomLevelByExtent(bounds, closest)
        }
        return zoomLevel
    },
    getResolutionByZoomLevel: function (zoomLevel) {
        var resolution = null;
        if (this.basicLayer) {
            resolution = this.basicLayer.getResolutionByZoomLevel(zoomLevel)
        }
        return resolution
    },
    getZoomLevelByResolution: function (resolution, closest) {
        var zoomLevel = null;
        if (this.basicLayer != null) {
            zoomLevel = this.basicLayer.getZoomLevelByResolution(resolution, closest)
        }
        return zoomLevel
    },
    zoomTo: function (zoomLevel) {
        if (this.isValidZoomLevel(zoomLevel)) {
            this.setCenter(null, zoomLevel)
        }
    },
    zoomIn: function () {
        this.zoomTo(this.getZoomLevel() + 1)
    },
    zoomOut: function () {
        this.zoomTo(this.getZoomLevel() - 1)
    },
    zoomToExtent: function (bounds, closest) {
        var center = bounds.getCenterInLatLng();
        if (this.basicLayer.repeatDisplay) {
            var maxExtent = this.getMaxExtent();
            bounds = bounds.clone();
            while (bounds.right < bounds.left) {
                bounds.right += maxExtent.getWidth()
            }
            center = bounds.getCenterInLatLng().repeatDisplay(maxExtent)
        }
        this.setCenter(center, this.getZoomLevelByExtent(bounds, closest))
    },
    zoomToMaxExtent: function (options) {
        var restricted = (options) ? options.restricted : true;
        var maxExtent = this.getMaxExtent({
            'restricted': restricted
        });
        this.zoomToExtent(maxExtent)
    },
    zoomToScale: function (scale, closest) {
        var res = NUtility.getResolutionFromScale(scale, this.basicLayer.units);
        var size = this.getSize();
        var w_deg = size.w * res;
        var h_deg = size.h * res;
        var center = this.getCenter();
        var extent = new NBounds(center.lon - w_deg / 2, center.lat - h_deg / 2, center.lon + w_deg / 2, center.lat + h_deg / 2);
        this.zoomToExtent(extent, closest)
    },
    _mapViewPortPxToWorld: function (viewPortPx) {
        var latlng = null;
        if (this.basicLayer != null) {
            latlng = this.basicLayer._mapViewPortPxToWorld(viewPortPx)
        }
        return latlng
    },
    _worldToMapViewPortPx: function (latlng) {
        var pixel = null;
        if (this.basicLayer != null) {
            pixel = this.basicLayer._worldToMapViewPortPx(latlng)
        }
        return pixel
    },
    pixelToWorld: function (pixel) {
        return this._mapViewPortPxToWorld(pixel)
    },
    worldToPixel: function (latlng) {
        var pixel = this._worldToMapViewPortPx(latlng);
        pixel.x = Math.round(pixel.x);
        pixel.y = Math.round(pixel.y);
        return pixel
    },
    layerPxToMapViewPortPx: function (layerPx) {
        var viewPortPx = null;
        if (layerPx != null) {
            var dX = parseInt(this._layerContainerDiv.style.left);
            var dY = parseInt(this._layerContainerDiv.style.top);
            viewPortPx = layerPx.offsetByXY(dX, dY)
        }
        return viewPortPx
    },
    mapViewPortPxToLayerPx: function (viewPortPx) {
        var layerPx = null;
        if (viewPortPx != null) {
            var dX = -parseInt(this._layerContainerDiv.style.left);
            var dY = -parseInt(this._layerContainerDiv.style.top);
            layerPx = viewPortPx.offsetByXY(dX, dY);
            if (isNaN(layerPx.x) || isNaN(layerPx.y)) {
                layerPx = null
            }
        }
        return layerPx
    },
    layerPxToWorld: function (pixel) {
        pixel = this.layerPxToMapViewPortPx(pixel);
        return this._mapViewPortPxToWorld(pixel)
    },
    worldToLayerPx: function (latlng) {
        var pixel = this.worldToPixel(latlng);
        return this.mapViewPortPxToLayerPx(pixel)
    },
    _CLASS_NAME: "NMap"
});
NMap.TILE_WIDTH = 256;
NMap.TILE_HEIGHT = 256;
NGlobalMap = NObject({
    id: '',
    objectId: 'NGloMap_Object_2E32E11171D2_06469FAA',
    globalClassId: 'clsid:06469FAA-AF7A-3B92-8FEF-2E32E11171D2',
    div: null,
    globalMapObject: null,
    maxExtent: null,
    dataConfigUrl: '',
    maxZoomAltitude: 11000000,
    minZoomAltitude: 100,
    flatAltitude: 150,
    flatTilt: 80,
    altmax: 0,
    construct: function (div, url, tmaxextent, taltmax, options) {
        if (url == null || url == '') {
            alert("创建NGlobalMap对象失败，打开三维工作空间失败");
            return
        }
        this.dataConfigUrl = url;
        if (tmaxextent == null) this.maxExtent = new NBounds(70, 15, 140, 50);
        else this.maxExtent = tmaxextent;
        if (taltmax == null) this.altmax = this.scaleToAltitude(60000000);
        else this.altmax = taltmax;
        NUtility.extend(this, options);
        this.id = NUtility.createUniqueID("NGlobalMap_");
        this.div = NUtility.getElement(div);
        if (this.div == null) {
            alert("创建NGlobalMap对象失败，传入参数div:[" + div + "]无效！");
            return
        }
        var NGlobalMap_tempDiv = NUtility.getElement(this.objectId);
        if (NGlobalMap_tempDiv != null) {
            alert("创建NGlobalMap对象失败，请确保页面中不存在id为:[" + this.objectId + "]的元素！");
            return
        }
        this.div.innerHTML = '<object id="' + this.objectId + '" classid="' + this.globalClassId + '"  style=" position: absolute;  width: 100%; height: 100%;" onerror="NGlobalMap.setGlobalInstalled(false)"></object>';
        if (!NGlobalMap.is3DInstalled) {
            return
        }
        this.globalMapObject = document.getElementById(this.objectId);
        try {
            this.setMaxExtent(this.maxExtent, this.altmax)
        } catch (e) {}
        try {
            this.globalMapObject.InitConfig(this.dataConfigUrl)
        } catch (e) {
            alert('三维初始化失败,请检查工作空间配置');
            return
        }
    },
    transXYToLonLat: function (xyz, epsg, izoned) {
        try {
            if (izoned == null) izoned = 0;
            var strlonlat = this.globalMapObject.GetTransCoordPos(1, parseInt(izoned), parseInt(epsg), xyz.x, xyz.y);
            return new NLatLng(strlonlat.split("##")[0], strlonlat.split("##")[1])
        } catch (e) {
            alert(e)
        }
    },
    transLonLatToXY: function (lonlat, epsg, izoned) {
        try {
            if (izoned == null) izoned = 0;
            var strxy = this.globalMapObject.GetTransCoordPos(0, izoned, epsg, lonlat.lon, lonlat.lat);
            return new NXYZ(strxy.split("##")[0], strxy.split("##")[1], 0.0)
        } catch (e) {}
    },
    transGlobalExtent: function (epsg, extent) {
        if (epsg == null || extent == null) {
            return extent
        }
        if (epsg == '4326' || epsg == '4610' || epsg == '4214') {
            return extent
        } else {
            var tempExtent = new NBounds(0, 0, 0, 0);
            var WNpos = this.globalMapObject.GetTransCoordPos(1, 0, epsg, extent.left, extent.top);
            var ESpos = this.globalMapObject.GetTransCoordPos(1, 0, epsg, extent.right, extent.bottom);
            tempExtent.left = WNpos.split("##")[0];
            tempExtent.top = WNpos.split("##")[1];
            tempExtent.right = ESpos.split("##")[0];
            tempExtent.bottom = ESpos.split("##")[1];
            return tempExtent
        }
    },
    scaleToAltitude: function (scale) {
        var aalt = scale * 256 * 9.5543981481481481481481481481481e-4;
        return aalt
    },
    altitudeToScale: function (talt) {
        var sscale = talt * 1046.638400969109630526953361599 / 256;
        return sscale
    },
    scaleToZoomLevel: function (map, scale) {
        var zoom = 0;
        var sscales = map.basicLayer.scales;
        for (var i = 0; i < sscales.length; i++) {
            if (scale == sscales[sscales.length - 1 - i]) {
                zoom = i;
                break
            }
        }
        return zoom
    },
    altitudeToZoomLevel: function (map, talt) {
        try {
            if (map == null || map.basicLayer == null || map.basicLayer._CLASS_NAME != "NTileCacheLayer") {
                return 0
            }
            var tempDeltaLevel = map.basicLayer.deltaZoomLevels;
            var sscale = this.altitudeToScale(talt);
            var inchesPerUnit = new Array();
            inchesPerUnit['dd'] = 4374754;
            inchesPerUnit['m'] = 39.3701;
            inchesPerUnit['km'] = 39370.1;
            inchesPerUnit['feet'] = 12;
            inchesPerUnit['inch'] = 1;
            inchesPerUnit['mile'] = 63360.0;
            var res = sscale / (96 * inchesPerUnit[map.units]);
            var maxResolution = map.maxResolution;
            for (var i = 0; i < map.zoomLevelsCount; i++) {
                if (res >= maxResolution / Math.pow(2, i + 1) && res <= maxResolution / Math.pow(2, i)) {
                    tzoomlevel = i;
                    if (Math.abs(res - maxResolution / Math.pow(2, tzoomlevel)) > Math.abs(res - maxResolution / Math.pow(2, tzoomlevel + 1))) tzoomlevel++;
                    break
                } else if (res < maxResolution) {
                    tzoomlevel = map.zoomLevelsCount - 1
                }
            }
            if (tzoomlevel > map.zoomLevelsCount - 1) {
                tzoomlevel = map.zoomLevelsCount - 1
            }
            if (tzoomlevel < tempDeltaLevel) tzoomlevel = tempDeltaLevel;
            if (tzoomlevel > map.zoomLevelsCount - 2) tzoomlevel = map.zoomLevelsCount - 2;
            if (talt < 2000) return tzoomlevel = map.zoomLevelsCount - tempDeltaLevel;
            else return tzoomlevel - tempDeltaLevel
        } catch (e) {
            return 0
        }
    },
    getViewPositionStr: function () {
        try {
            var arr = this.globalMapObject.GetCameraPositon().split("##");
            return arr[0] + ',' + arr[1] + ',' + arr[2]
        } catch (e) {}
    },
    getViewPosition: function () {
        try {
            var arr = this.globalMapObject.GetCameraPositon().split("##");
            return new NXYZ(arr[1], arr[0], arr[2])
        } catch (e) {}
    },
    getLocalElevation: function () {
        try {
            return this.globalMapObject.GetLocalElevation()
        } catch (e) {}
    },
    setLayerVisible: function (name, state) {
        try {
            this.globalMapObject.SetLayerVisibility(name, state)
        } catch (e) {}
    },
    setViewPosition: function (lon, lat, alt, tilt) {
        try {
            this.globalMapObject.SetViewPosition2(lat, lon, alt, tilt)
        } catch (e) {}
    },
    setMaxExtent: function (extent, altitude) {
        try {
            if (extent == null) {
                return
            }
            if (altitude == null) {
                altitude = this.altmax
            }
            this.globalMapObject.SetCameraExtent(extent.top, extent.bottom, extent.left, extent.right, altitude);
            this.maxExtent = extent
        } catch (e) {}
    },
    zoomToMaxExtent: function () {
        try {
            if (this.maxExtent == null) {
                return
            }
            this.globalMapObject.SetViewPosition2((this.maxExtent.top + this.maxExtent.bottom) / 2, (this.maxExtent.left + this.maxExtent.right) / 2, this.altmax, 0)
        } catch (e) {}
    },
    zoomIn: function () {
        try {
            this.globalMapObject.Zoom(1, this.maxZoomAltitude, this.minZoomAltitude)
        } catch (e) {}
    },
    zoomOut: function () {
        try {
            this.globalMapObject.Zoom(-1, this.minZoomAltitude, this.maxZoomAltitude)
        } catch (e) {}
    },
    flat: function () {
        try {
            this.globalMapObject.FlytoFrontview(this.flatAltitude, this.flatTilt)
        } catch (e) {
            return
        }
    },
    rotateLeft: function () {
        try {
            this.globalMapObject.SetViewRotate(1, -1)
        } catch (e) {
            return
        }
    },
    rotateRight: function () {
        try {
            this.globalMapObject.SetViewRotate(1, 1)
        } catch (e) {
            return
        }
    },
    rotateUp: function () {
        try {
            this.globalMapObject.SetViewRotate(-1, -1)
        } catch (e) {
            return
        }
    },
    rotateDown: function () {
        try {
            this.globalMapObject.SetViewRotate(-1, 1)
        } catch (e) {
            return
        }
    },
    resetView: function () {
        try {
            this.globalMapObject.SetCameraReset()
        } catch (e) {
            return
        }
    },
    getLayersJson: function () {
        try {
            var json = this.globalMapObject.GetLayersItems();
            return json
        } catch (e) {
            return ''
        }
    },
    _CLASS_NAME: "NGlobalMap"
});
NGlobalMap.setGlobalInstalled = function (state) {
    NGlobalMap.is3DInstalled = state
};
NGlobalMap.is3DInstalled = true;
NLayer = NObject({
    id: null,
    type: "NLayer",
    isQueryable: false,
    description: null,
    layersort: null,
    queryable: null,
    name: null,
    div: null,
    opacity: null,
    displayByScale: null,
    _EVENT_TYPES: ["loadstart", "loadend", "loadcancel", "visiblechanged", "moveend"],
    events: null,
    map: null,
    isBasicLayer: false,
    alpha: false,
    showInLayerList: true,
    visible: true,
    attribution: null,
    inRange: false,
    imageSize: null,
    imageOffset: null,
    options: null,
    eventListeners: null,
    gutter: 0,
    projection: null,
    units: null,
    scales: null,
    resolutions: null,
    maxExtent: null,
    minExtent: null,
    maxResolution: null,
    minResolution: null,
    zoomLevelsCount: null,
    minScale: null,
    maxScale: null,
    displayOutsideMaxExtent: false,
    repeatDisplay: false,
    transitionEffect: null,
    _SUPPORTED_TRANSITIONS: ['resize'],
    construct: function (name, options) {
        this.addParameters(options);
        this.name = name;
        if (this.id == null) {
            this.id = NUtility.createUniqueID(this._CLASS_NAME + "_");
            this.div = NUtility.createDiv(this.id);
            this.div.style.width = "100%";
            this.div.style.height = "100%";
            this.events = new NEvents(this, this.div, this._EVENT_TYPES);
            if (this.eventListeners instanceof Object) {
                this.events.addListener(this.eventListeners)
            }
        }
        if (this.repeatDisplay) {
            this.displayOutsideMaxExtent = true
        }
    },
    dispose: function (newBasicLayer) {
        if (newBasicLayer == null) {
            newBasicLayer = true
        }
        if (this.map != null) {
            this.map.removeLayer(this, newBasicLayer)
        }
        this.projection = null;
        this.map = null;
        this.name = null;
        this.div = null;
        this.options = null;
        if (this.events) {
            if (this.eventListeners) {
                this.events.removeListener(this.eventListeners)
            }
            this.events.dispose()
        }
        this.eventListeners = null;
        this.events = null
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new NLayer(this.name, this.options)
        }
        NUtility.applyDefaults(obj, this);
        obj.map = null;
        return obj
    },
    setName: function (newName) {
        if (newName != this.name) {
            this.name = newName;
            if (this.map != null) {
                this.map.events.triggerEvent("changelayer", {
                    layer: this,
                    property: "name"
                })
            }
        }
    },
    spatialQuery: function (type, options) {
        return false
    },
    spatialStat: function (type, options) {
        return false
    },
    searchByKey: function (options) {
        return false
    },
    addParameters: function (newOptions) {
        if (this.options == null) {
            this.options = {}
        }
        NUtility.extend(this.options, newOptions);
        NUtility.extend(this, newOptions)
    },
    onMapResize: function () {},
    redraw: function () {
        var redrawn = false;
        if (this.map) {
            this.inRange = this.calculateInRange();
            var extent = this.getExtent();
            if (extent && this.inRange && this.visible) {
                this.moveTo(extent, true, false);
                redrawn = true
            }
        }
        return redrawn
    },
    moveTo: function (bounds, zoomChanged, dragging) {
        var display = this.visible;
        if (!this.isBasicLayer) {
            display = display && this.inRange
        }
        this.display(display)
    },
    setMap: function (map) {
        if (this.map == null) {
            this.map = map;
            this.maxExtent = this.maxExtent || this.map.maxExtent;
            this.projection = this.projection || this.map.projection;
            if (this.projection && typeof this.projection == "string") {
                this.projection = new NProjection(this.projection)
            }
            this.units = this.projection.getUnits() || this.units || this.map.units;
            if (this.maxExtent != null && this.map != null) {
                var viewSize = this.map.getSize();
                var idealResolution = Math.max(this.maxExtent.getWidth() / viewSize.w, this.maxExtent.getHeight() / viewSize.h);
                this.maxResolution = idealResolution
            }
            this.initResolutions();
            if (!this.isBasicLayer) {
                this.inRange = this.calculateInRange();
                var show = ((this.visible) && (this.inRange));
                this.div.style.display = show ? "" : "none"
            }
            this.setTileSize()
        }
    },
    removeMap: function (map) {},
    getImageSize: function () {
        return (this.imageSize || this.tileSize)
    },
    setTileSize: function (size) {
        var tileSize = (size) ? size : ((this.tileSize) ? this.tileSize : this.map.getTileSize());
        this.tileSize = tileSize;
        if (this.gutter) {
            this.imageOffset = new NPixel(-this.gutter, -this.gutter);
            this.imageSize = new NSize(tileSize.w + (2 * this.gutter), tileSize.h + (2 * this.gutter))
        }
    },
    getVisible: function () {
        return this.visible
    },
    setVisible: function (visible) {
        if (visible != this.visible) {
            this.visible = visible;
            this.display(visible);
            this.redraw();
            if (this.map != null) {
                this.map.events.triggerEvent("changelayer", {
                    layer: this,
                    property: "visible"
                })
            }
            this.events.triggerEvent("visiblechanged")
        }
    },
    display: function (display) {
        var inRange = this.calculateInRange();
        if (display != (this.div.style.display != "none")) {
            this.div.style.display = (display && inRange) ? "block" : "none"
        }
    },
    calculateInRange: function () {
        var inRange = false;
        if (this.displayByScale) {
            inRange = true
        } else {
            if (this.map) {
                var resolution = this.map.getResolution();
                inRange = ((resolution >= this.getResolutionByLayerType(this.minResolution)) && (resolution <= this.getResolutionByLayerType(this.maxResolution)))
            }
        }
        return inRange
    },
    setBasicLayer: function (isBasicLayer) {
        if (isBasicLayer != this.isBasicLayer) {
            this.isBasicLayer = isBasicLayer;
            if (this.map != null) {
                this.map.events.triggerEvent("changebasiclayer", {
                    layer: this
                })
            }
        }
    },
    initResolutions: function () {
        var props = new Array('projection', 'units', 'scales', 'resolutions', 'maxScale', 'minScale', 'maxResolution', 'minResolution', 'minExtent', 'maxExtent', 'zoomLevelsCount', 'maxZoomLevel');
        var notScaleProps = ['projection', 'units'];
        var useInRange = false;
        var confProps = {};
        for (var i = 0, len = props.length; i < len; i++) {
            var property = props[i];
            if (this.options[property] && NUtility.indexOf(notScaleProps, property) == -1) {
                useInRange = true
            }
            confProps[property] = this.options[property] || this.map[property]
        }
        if (this.options['maxResolution'] == undefined && confProps['maxResolution'] != undefined) {
            confProps['maxResolution'] = this.maxResolution
        }
        if (this.displayByScale == null) {
            this.displayByScale = !useInRange
        }
        if ((this.options.minScale != null || this.options.maxScale != null) && this.options.scales == null) {
            confProps.scales = null
        }
        if ((this.options.minResolution != null || this.options.maxResolution != null) && this.options.resolutions == null) {
            confProps.resolutions = null
        }
        if ((!confProps.zoomLevelsCount) && (confProps.maxZoomLevel)) {
            confProps.zoomLevelsCount = confProps.maxZoomLevel + 1
        }
        if ((confProps.scales != null) || (confProps.resolutions != null)) {
            if (confProps.scales != null) {
                confProps.resolutions = [];
                for (var i = 0, len = confProps.scales.length; i < len; i++) {
                    var scale = confProps.scales[i];
                    confProps.resolutions[i] = NUtility.getResolutionFromScale(scale, confProps.units)
                }
            }
            confProps.zoomLevelsCount = confProps.resolutions.length
        } else {
            if (confProps.minScale) {
                confProps.maxResolution = NUtility.getResolutionFromScale(confProps.minScale, confProps.units)
            } else if (confProps.maxResolution == "auto") {
                var viewSize = this.map.getSize();
                var wRes = confProps.maxExtent.getWidth() / viewSize.w;
                var hRes = confProps.maxExtent.getHeight() / viewSize.h;
                confProps.maxResolution = Math.max(wRes, hRes)
            }
            if (confProps.maxScale != null) {
                confProps.minResolution = NUtility.getResolutionFromScale(confProps.maxScale, confProps.units)
            } else if ((confProps.minResolution == "auto") && (confProps.minExtent != null)) {
                var viewSize = this.map.getSize();
                var wRes = confProps.minExtent.getWidth() / viewSize.w;
                var hRes = confProps.minExtent.getHeight() / viewSize.h;
                confProps.minResolution = Math.max(wRes, hRes)
            }
            if (confProps.minResolution != null && this.options.zoomLevelsCount == undefined) {
                var ratio = confProps.maxResolution / confProps.minResolution;
                confProps.zoomLevelsCount = Math.floor(Math.log(ratio) / Math.log(2)) + 1
            }
            confProps.resolutions = new Array(confProps.zoomLevelsCount);
            var base = 2;
            if (typeof confProps.minResolution == "number" && confProps.zoomLevelsCount > 1) {
                base = Math.pow((confProps.maxResolution / confProps.minResolution), (1 / (confProps.zoomLevelsCount - 1)))
            }
            for (var i = 0; i < confProps.zoomLevelsCount; i++) {
                var res = confProps.maxResolution / Math.pow(base, i);
                confProps.resolutions[i] = res
            }
        }
        confProps.resolutions.sort(function (a, b) {
            return (b - a)
        });
        this.resolutions = confProps.resolutions;
        this.maxResolution = confProps.resolutions[0];
        var lastIndex = confProps.resolutions.length - 1;
        this.minResolution = confProps.resolutions[lastIndex];
        this.scales = [];
        for (var i = 0, len = confProps.resolutions.length; i < len; i++) {
            this.scales[i] = NUtility.getScaleFromResolution(confProps.resolutions[i], confProps.units)
        }
        this.minScale = this.scales[0];
        this.maxScale = this.scales[this.scales.length - 1];
        this.zoomLevelsCount = confProps.zoomLevelsCount
    },
    getResolution: function () {
        var zoomLevel = this.map.getZoomLevel();
        return this.getResolutionByZoomLevel(zoomLevel)
    },
    getExtent: function () {
        return this.map.getBounds()
    },
    getZoomLevelByExtent: function (extent, closest) {
        var viewSize = this.map.getSize();
        var idealResolution = Math.max(extent.getWidth() / viewSize.w, extent.getHeight() / viewSize.h);
        return this.getZoomLevelByResolution(idealResolution, closest)
    },
    getLayerExtent: function () {},
    getResolutionByZoomLevel: function (zoomLevel) {
        zoomLevel = Math.max(0, Math.min(zoomLevel, this.resolutions.length - 1));
        var resolution;
        if (this.map.arbitraryScale) {
            var low = Math.floor(zoomLevel);
            var high = Math.ceil(zoomLevel);
            resolution = this.resolutions[high] + ((zoomLevel - low) * (this.resolutions[low] - this.resolutions[high]))
        } else {
            resolution = this.resolutions[Math.round(zoomLevel)]
        }
        return this.getResolutionByLayerType(resolution)
    },
    getResolutionByLayerType: function (res) {
        return res
    },
    getZoomLevelByResolution: function (resolution, closest) {
        var zoomLevel;
        if (this.map.arbitraryScale) {
            var lowZoom = 0;
            var highZoom = this.resolutions.length - 1;
            var highRes = this.resolutions[lowZoom];
            var lowRes = this.resolutions[highZoom];
            var res;
            for (var i = 0, len = this.resolutions.length; i < len; ++i) {
                res = this.resolutions[i];
                if (res >= resolution) {
                    highRes = res;
                    lowZoom = i
                }
                if (res <= resolution) {
                    lowRes = res;
                    highZoom = i;
                    break
                }
            }
            var dRes = highRes - lowRes;
            if (dRes > 0) {
                zoomLevel = lowZoom + ((resolution - lowRes) / dRes)
            } else {
                zoomLevel = lowZoom
            }
        } else {
            var diff;
            var minDiff = Number.POSITIVE_INFINITY;
            for (var i = 0, len = this.resolutions.length; i < len; i++) {
                if (closest) {
                    diff = Math.abs(this.resolutions[i] - resolution);
                    if (diff > minDiff) {
                        break
                    }
                    minDiff = diff
                } else {
                    if (this.resolutions[i] < resolution) {
                        break
                    }
                }
            }
            zoomLevel = Math.max(0, i - 1)
        }
        return zoomLevel
    },
    _mapViewPortPxToWorld: function (viewPortPx) {
        var latlng = null;
        if (viewPortPx != null) {
            var size = this.map.getSize();
            var center = this.map.getCenter();
            if (center) {
                var res = this.map.getResolution();
                var delta_x = viewPortPx.x - (size.w / 2);
                var delta_y = viewPortPx.y - (size.h / 2);
                latlng = new NLatLng(center.lon + delta_x * res, center.lat - delta_y * res);
                if (this.repeatDisplay) {
                    latlng = latlng.repeatDisplay(this.maxExtent)
                }
            }
        }
        return latlng
    },
    _worldToMapViewPortPx: function (latlng) {
        var px = null;
        if (latlng != null) {
            var resolution = this.map.getResolution();
            var extent = this.map.getExtent();
            px = new NPixel((1 / resolution * (latlng.lon - extent.left)), (1 / resolution * (extent.top - latlng.lat)))
        }
        return px
    },
    setOpacity: function (opacity) {
        if (opacity != this.opacity) {
            this.opacity = opacity;
            for (var i = 0, len = this.div.childNodes.length; i < len; ++i) {
                var element = this.div.childNodes[i].firstChild;
                NUtility.modifyDOMElement(element, null, null, null, null, null, null, opacity)
            }
        }
    },
    getZIndex: function () {
        return this.div.style.zIndex
    },
    setZIndex: function (zIndex) {
        this.div.style.zIndex = zIndex
    },
    adjustBounds: function (bounds) {
        if (this.gutter) {
            var mapGutter = this.gutter * this.map.getResolution();
            bounds = new NBounds(bounds.left - mapGutter, bounds.bottom - mapGutter, bounds.right + mapGutter, bounds.top + mapGutter)
        }
        if (this.repeatDisplay) {
            var wrappingOptions = {
                'rightTolerance': this.getResolution()
            };
            bounds = bounds.repeatDisplay(this.maxExtent, wrappingOptions)
        }
        return bounds
    },
    _CLASS_NAME: "NLayer"
});
NIcon = NObject({
    url: null,
    size: null,
    offset: null,
    calculateOffset: null,
    imageDiv: null,
    posInPixel: null,
    altinfo: null,
    construct: function (url, size, offset, calculateOffset, altinfo) {
        this.url = url;
        this.size = (size) ? size : new NSize(20, 20);
        this.offset = offset ? offset : new NPixel(-(this.size.w / 2), -(this.size.h / 2));
        this.calculateOffset = calculateOffset;
        if (altinfo) {
            this.altinfo = altinfo
        }
        var id = NUtility.createUniqueID("OL_Icon_");
        this.imageDiv = NUtility.createAlphaImageDivWithAlt(id, null, null, null, null, null, null, null, null, altinfo)
    },
    dispose: function () {
        NEvent.stopObservingElement(this.imageDiv.firstChild);
        this.imageDiv.innerHTML = "";
        this.imageDiv = null
    },
    clone: function () {
        return new NIcon(this.url, this.size, this.offset, this.calculateOffset, this.altinfo)
    },
    setSize: function (size) {
        if (size != null) {
            this.size = size
        }
        this.draw()
    },
    setURL: function (url) {
        if (url != null) {
            this.url = url
        }
        this.draw()
    },
    draw: function (px) {
        NUtility.modifyAlphaImageDiv(this.imageDiv, null, null, this.size, this.url, "absolute");
        this.moveTo(px);
        return this.imageDiv
    },
    setOpacity: function (opacity) {
        NUtility.modifyAlphaImageDiv(this.imageDiv, null, null, null, null, null, null, null, opacity)
    },
    moveTo: function (px) {
        if (px != null) {
            this.posInPixel = px
        }
        if (this.imageDiv != null) {
            if (this.posInPixel == null) {
                this.display(false)
            } else {
                if (this.calculateOffset) {
                    this.offset = this.calculateOffset(this.size)
                }
                var offsetPx = this.posInPixel.offset(this.offset);
                NUtility.modifyAlphaImageDiv(this.imageDiv, null, offsetPx)
            }
        }
    },
    display: function (display) {
        this.imageDiv.style.display = (display) ? "" : "none"
    },
    _CLASS_NAME: "NIcon"
});
NMarker = NObject({
    icon: null,
    latlng: null,
    events: null,
    map: null,
    uid: null,
    construct: function (latlng, icon) {
        this.latlng = latlng;
        var newIcon = (icon) ? icon : NMarker.defaultIcon();
        if (this.icon == null) {
            this.icon = newIcon
        } else {
            this.icon.url = newIcon.url;
            this.icon.size = newIcon.size;
            this.icon.offset = newIcon.offset;
            this.icon.calculateOffset = newIcon.calculateOffset
        }
        this.events = new NEvents(this, this.icon.imageDiv, null)
    },
    dispose: function () {
        this.map = null;
        this.events.dispose();
        this.events = null;
        if (this.icon != null) {
            this.icon.dispose();
            this.icon = null
        }
    },
    draw: function (px) {
        return this.icon.draw(px)
    },
    updatePosition: function () {
        if ((this.latlng) && (this.map)) {
            var px = this.map.worldToLayerPx(this.latlng);
            if (px) {
                this.moveTo(px)
            }
        }
    },
    moveTo: function (px) {
        if ((px != null) && (this.icon != null)) {
            this.icon.moveTo(px)
        }
        this.latlng = this.map.layerPxToWorld(px)
    },
    InMapViewPort: function () {
        var InMapViewPort = false;
        if (this.map) {
            var screenBounds = this.map.getExtent();
            InMapViewPort = screenBounds.containsLonLat(this.latlng)
        }
        return InMapViewPort
    },
    inflate: function (inflate) {
        if (this.icon) {
            var newSize = new NSize(this.icon.size.w * inflate, this.icon.size.h * inflate);
            this.icon.setSize(newSize)
        }
    },
    setOpacity: function (opacity) {
        this.icon.setOpacity(opacity)
    },
    setURL: function (url) {
        this.icon.setURL(url)
    },
    display: function (display) {
        this.icon.display(display)
    },
    _CLASS_NAME: "NMarker"
});
NMarker.defaultIcon = function () {
    var url = NUtility.getImagesLocation() + "marker.png";
    var size = new NSize(32, 32);
    var calculateOffset = function (size) {
            return new NPixel(0, -size.h)
        };
    return new NIcon(url, size, null, calculateOffset)
};
NBoxMarker = NObject(NMarker, {
    bounds: null,
    div: null,
    construct: function (bounds, borderColor, borderWidth) {
        this.bounds = bounds;
        this.div = NUtility.createDiv();
        this.div.style.overflow = 'hidden';
        this.events = new NEvents(this, this.div, null);
        this.setBorder(borderColor, borderWidth)
    },
    dispose: function () {
        this.bounds = null;
        this.div = null;
        NMarker.prototype.dispose.apply(this, arguments)
    },
    setBorder: function (color, width) {
        if (!color) {
            color = "red"
        }
        if (!width) {
            width = 2
        }
        this.div.style.border = width + "px solid " + color
    },
    draw: function (px, sz) {
        NUtility.modifyDOMElement(this.div, null, px, sz);
        return this.div
    },
    InMapViewPort: function () {
        var InMapViewPort = false;
        if (this.map) {
            var screenBounds = this.map.getExtent();
            InMapViewPort = screenBounds.containsBounds(this.bounds, true, true)
        }
        return InMapViewPort
    },
    display: function (display) {
        this.div.style.display = (display) ? "" : "none"
    },
    _CLASS_NAME: "NBoxMarker"
});
NDialog = NObject({
    events: null,
    id: "",
    latlng: null,
    div: null,
    contentSize: null,
    size: null,
    contentHTML: null,
    backgroundColor: "",
    opacity: "",
    border: "",
    contentDiv: null,
    groupDiv: null,
    closeDiv: null,
    autoSize: false,
    minSize: null,
    maxSize: null,
    cssClassName: "nmDialog",
    contentDivClass: "nmDialogContent",
    padding: 0,
    fixPadding: function () {
        if (typeof this.padding == "number") {
            this.padding = new NBounds(this.padding, this.padding, this.padding, this.padding)
        }
    },
    alwaysInView: false,
    map: null,
    construct: function (id, latlng, contentSize, contentHTML, closeBox, closeBoxCallback) {
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
        this.opacity = NDialog.OPACITY;
        this.border = NDialog.BORDER;
        this.div = NUtility.createDiv(this.id, null, null, null, null, null, "hidden");
        this.div.className = this.cssClassName;
        var groupDivId = this.id + "_GroupDiv";
        this.groupDiv = NUtility.createDiv(groupDivId, null, null, null, "relative", null, "hidden");
        var id = this.div.id + "_contentDiv";
        this.contentDiv = NUtility.createDiv(id, null, this.contentSize.clone(), null, "relative");
        this.contentDiv.className = this.contentDivClass;
        this.groupDiv.appendChild(this.contentDiv);
        this.div.appendChild(this.groupDiv);
        if (closeBox) {
            this.addCloseBox(closeBoxCallback)
        }
        this.registerEvents()
    },
    dispose: function () {
        this.id = null;
        this.latlng = null;
        this.size = null;
        this.contentHTML = null;
        this.backgroundColor = null;
        this.opacity = null;
        this.border = null;
        this.events.dispose();
        this.events = null;
        if (this.closeDiv) {
            NEvent.stopObservingElement(this.closeDiv);
            this.groupDiv.removeChild(this.closeDiv)
        }
        this.closeDiv = null;
        this.div.removeChild(this.groupDiv);
        this.groupDiv = null;
        if (this.map != null) {
            this.map.removeDialog(this)
        }
        this.map = null;
        this.div = null;
        this.autoSize = null;
        this.minSize = null;
        this.maxSize = null;
        this.padding = null;
        this.alwaysInView = null
    },
    draw: function (px) {
        if (px == null) {
            if ((this.latlng != null) && (this.map != null)) {
                px = this.map.worldToLayerPx(this.latlng)
            }
        }
        if (NUtility.getBrowserName() == 'firefox') {
            this.map.events._register("movestart", this, function () {
                var style = document.defaultView.getComputedStyle(this.contentDiv, null);
                var currentOverflow = style.getPropertyValue("overflow");
                if (currentOverflow != "hidden") {
                    this.contentDiv._oldOverflow = currentOverflow;
                    this.contentDiv.style.overflow = "hidden"
                }
            });
            this.map.events._register("moveend", this, function () {
                var oldOverflow = this.contentDiv._oldOverflow;
                if (oldOverflow) {
                    this.contentDiv.style.overflow = oldOverflow;
                    this.contentDiv._oldOverflow = null
                }
            })
        }
        this.moveTo(px);
        if (!this.autoSize && !this.size) {
            this.setSize(this.contentSize)
        }
        this.setBackgroundColor();
        this.setOpacity();
        this.setBorder();
        this.setContentHTML();
        if (this.alwaysInView) {
            this.panIntoView()
        }
        return this.div
    },
    updatePosition: function () {
        if ((this.latlng) && (this.map)) {
            var px = this.map.worldToLayerPx(this.latlng);
            if (px) {
                this.moveTo(px)
            }
        }
    },
    moveTo: function (px) {
        if ((px != null) && (this.div != null)) {
            this.div.style.left = px.x + "px";
            this.div.style.top = px.y + "px"
        }
    },
    visible: function () {
        return NElement.visible(this.div)
    },
    toggle: function () {
        if (this.visible()) {
            this.hide()
        } else {
            this.show()
        }
    },
    show: function () {
        NElement.show(this.div);
        if (this.alwaysInView) {
            this.panIntoView()
        }
    },
    hide: function () {
        NElement.hide(this.div)
    },
    setSize: function (contentSize) {
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
        if (this.div != null) {
            this.div.style.width = this.size.w + "px";
            this.div.style.height = this.size.h + "px"
        }
        if (this.contentDiv != null) {
            this.contentDiv.style.width = contentSize.w + "px";
            this.contentDiv.style.height = contentSize.h + "px"
        }
    },
    updateSize: function () {
        var preparedHTML = "<div class='" + this.contentDivClass + "'>" + this.contentDiv.innerHTML + "<div>";
        var realSize = NUtility.getRenderedDimensions(preparedHTML, null, {
            cssClassName: this.cssClassName
        });
        var safeSize = this.getSafeContentSize(realSize);
        var newSize = null;
        if (safeSize.equals(realSize)) {
            newSize = realSize
        } else {
            var fixedSize = new NSize();
            fixedSize.w = (safeSize.w < realSize.w) ? safeSize.w : null;
            fixedSize.h = (safeSize.h < realSize.h) ? safeSize.h : null;
            if (fixedSize.w && fixedSize.h) {
                newSize = safeSize
            } else {
                var clippedSize = NUtility.getRenderedDimensions(preparedHTML, fixedSize, {
                    cssClassName: this.contentDivClass
                });
                var currentOverflow = NElement.getStyle(this.contentDiv, "overflow");
                if ((currentOverflow != "hidden") && (clippedSize.equals(safeSize))) {
                    var scrollBar = NUtility.getScrollbarWidth();
                    if (fixedSize.w) {
                        clippedSize.h += scrollBar
                    } else {
                        clippedSize.w += scrollBar
                    }
                }
                newSize = this.getSafeContentSize(clippedSize)
            }
        }
        this.setSize(newSize)
    },
    setBackgroundColor: function (color) {
        if (color != undefined) {
            this.backgroundColor = color
        }
        if (this.div != null) {
            this.div.style.backgroundColor = this.backgroundColor
        }
    },
    setOpacity: function (opacity) {
        if (opacity != undefined) {
            this.opacity = opacity
        }
        if (this.div != null) {
            this.div.style.opacity = this.opacity
        }
    },
    setBorder: function (border) {
        if (border != undefined) {
            this.border = border
        }
        if (this.div != null) {
            this.div.style.border = this.border
        }
    },
    setContentHTML: function (contentHTML) {
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
    registerImageListeners: function () {
        var onImgLoad = function () {
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
    getSafeContentSize: function (size) {
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
    getContentDivPadding: function () {
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
    addCloseBox: function (callback) {
        this.closeDiv = NUtility.createDiv(this.id + "_close", null, new NSize(17, 17));
        this.closeDiv.className = "nmDialogCloseBox";
        var contentDivPadding = this.getContentDivPadding();
        this.closeDiv.style.right = contentDivPadding.right + "px";
        this.closeDiv.style.top = contentDivPadding.top + "px";
        this.groupDiv.appendChild(this.closeDiv);
        var closePopup = callback ||
        function (e) {
            this.hide();
            NEvent.stop(e)
        };
        NEvent.observe(this.closeDiv, "click", NFunction.bindAsEventListener(closePopup, this))
    },
    panIntoView: function () {
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
    registerEvents: function () {
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
    onmousedown: function (evt) {
        this.mousedown = true;
        NEvent.stop(evt, true)
    },
    onmousemove: function (evt) {
        if (this.mousedown) {
            NEvent.stop(evt, true)
        }
    },
    onmouseup: function (evt) {
        if (this.mousedown) {
            this.mousedown = false;
            NEvent.stop(evt, true)
        }
    },
    onclick: function (evt) {
        NEvent.stop(evt, true)
    },
    onmouseout: function (evt) {
        this.mousedown = false
    },
    ondblclick: function (evt) {
        NEvent.stop(evt, true)
    },
    _CLASS_NAME: "NDialog"
});
NDialog.WIDTH = 200;
NDialog.HEIGHT = 200;
NDialog.COLOR = "white";
NDialog.OPACITY = 1;
NDialog.BORDER = "0px";
NTile = NObject({
    _EVENT_TYPES: ["loadstart", "loadend", "reload", "unload"],
    events: null,
    id: null,
    layer: null,
    url: null,
    bounds: null,
    size: null,
    position: null,
    isLoading: false,
    construct: function (layer, position, bounds, url, size) {
        this.layer = layer;
        this.position = position.clone();
        this.bounds = bounds.clone();
        this.url = url;
        this.size = size.clone();
        this.id = NUtility.createUniqueID("Tile_");
        this.events = new NEvents(this, null, this._EVENT_TYPES)
    },
    unload: function () {
        if (this.isLoading) {
            this.isLoading = false;
            this.events.triggerEvent("unload")
        }
    },
    dispose: function () {
        this.layer = null;
        this.bounds = null;
        this.size = null;
        this.position = null;
        this.events.dispose();
        this.events = null
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new NTile(this.layer, this.position, this.bounds, this.url, this.size)
        }
        NUtility.applyDefaults(obj, this);
        return obj
    },
    draw: function () {
        var maxExtent = this.layer.maxExtent;
        var withinMaxExtent = (maxExtent && this.bounds.intersectsBounds(maxExtent, false));
        this.shouldDraw = (withinMaxExtent || this.layer.displayOutsideMaxExtent);
        this.clear();
        return this.shouldDraw
    },
    moveTo: function (bounds, position, redraw) {
        if (redraw == null) {
            redraw = true
        }
        this.bounds = bounds.clone();
        this.position = position.clone();
        if (redraw) {
            this.draw()
        }
    },
    clear: function () {},
    getBoundsFromBasicLayer: function (position) {
        var msg = NMGISLG('reprojectDeprecated', {
            'layerName': this.layer.name
        });
        NLog.warn(msg);
        var topLeft = this.layer.map.layerPxToWorld(position);
        var bottomRightPx = position.clone();
        bottomRightPx.x += this.size.w;
        bottomRightPx.y += this.size.h;
        var bottomRight = this.layer.map.layerPxToWorld(bottomRightPx);
        if (topLeft.lon > bottomRight.lon) {
            if (topLeft.lon < 0) {
                topLeft.lon = -180 - (topLeft.lon + 180)
            } else {
                bottomRight.lon = 180 + bottomRight.lon + 180
            }
        }
        var bounds = new NBounds(topLeft.lon, bottomRight.lat, bottomRight.lon, topLeft.lat);
        return bounds
    },
    showTile: function () {
        if (this.shouldDraw) {
            this.show()
        }
    },
    show: function () {},
    hide: function () {},
    _CLASS_NAME: "NTile"
});
NTile.Image = NObject(NTile, {
    url: null,
    imgDiv: null,
    frame: null,
    layerAlphaHack: null,
    isBackBuffer: false,
    lastRatio: 1,
    firstDraw: true,
    backBufferTile: null,
    construct: function (layer, position, bounds, url, size) {
        NTile.prototype.construct.apply(this, arguments);
        this.url = url;
        this.frame = document.createElement('div');
        this.frame.style.overflow = 'hidden';
        this.frame.style.position = 'absolute';
        this.layerAlphaHack = this.layer.alpha && NUtility.alphaHack()
    },
    dispose: function () {
        if (this.imgDiv != null) {
            if (this.layerAlphaHack) {
                NEvent.stopObservingElement(this.imgDiv.childNodes[0].id)
            } else {
                NEvent.stopObservingElement(this.imgDiv.id)
            }
            if (this.imgDiv.parentNode == this.frame) {
                this.frame.removeChild(this.imgDiv);
                this.imgDiv.map = null
            }
            this.imgDiv.urls = null
        }
        this.imgDiv = null;
        if ((this.frame != null) && (this.frame.parentNode == this.layer.div)) {
            this.layer.div.removeChild(this.frame)
        }
        this.frame = null;
        if (this.backBufferTile) {
            this.backBufferTile.dispose();
            this.backBufferTile = null
        }
        this.layer.events._unregister("loadend", this, this.resetBackBuffer);
        NTile.prototype.dispose.apply(this, arguments)
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new NTile.Image(this.layer, this.position, this.bounds, this.url, this.size)
        }
        obj = NTile.prototype.clone.apply(this, [obj]);
        obj.imgDiv = null;
        return obj
    },
    draw: function () {
        if (this.layer != this.layer.map.basicLayer && this.layer.reproject) {
            this.bounds = this.getBoundsFromBasicLayer(this.position)
        }
        var drawTile = NTile.prototype.draw.apply(this, arguments);
        if (NUtility.indexOf(this.layer._SUPPORTED_TRANSITIONS, this.layer.transitionEffect) != -1) {
            if (drawTile) {
                if (!this.backBufferTile) {
                    this.backBufferTile = this.clone();
                    this.backBufferTile.hide();
                    this.backBufferTile.isBackBuffer = true;
                    this.events._register('loadend', this, this.resetBackBuffer);
                    this.layer.events._register("loadend", this, this.resetBackBuffer)
                }
                this.startTransition()
            } else {
                if (this.backBufferTile) {
                    this.backBufferTile.clear()
                }
            }
        } else {
            if (drawTile && this.firstDraw) {
                this.events._register('loadend', this, this.showTile);
                this.firstDraw = false
            }
        }
        if (!drawTile) {
            return false
        }
        if (this.isLoading) {
            this.events.triggerEvent("reload")
        } else {
            this.isLoading = true;
            this.events.triggerEvent("loadstart")
        }
        return this.renderTile()
    },
    resetBackBuffer: function () {
        this.showTile();
        if (this.backBufferTile && (this.firstDraw || !this.layer.numLoadingTiles)) {
            this.firstDraw = false;
            var maxExtent = this.layer.maxExtent;
            var withinMaxExtent = (maxExtent && this.bounds.intersectsBounds(maxExtent, false));
            if (withinMaxExtent) {
                this.backBufferTile.position = this.position;
                this.backBufferTile.bounds = this.bounds;
                this.backBufferTile.size = this.size;
                this.backBufferTile.imageSize = this.layer.imageSize || this.size;
                this.backBufferTile.imageOffset = this.layer.imageOffset;
                this.backBufferTile.resolution = this.layer.getResolution();
                this.backBufferTile.renderTile()
            }
        }
    },
    renderTile: function () {
        if (this.imgDiv == null) {
            this.initDiv()
        }
        this.imgDiv._viewChangedID = this.layer.map._viewChangedID;
        if (this.layer.url instanceof Array) {
            this.imgDiv.urls = this.layer.url.slice()
        }
        this.url = this.layer.getURL(this.bounds);
        NUtility.modifyDOMElement(this.frame, null, this.position, this.size);
        var imageSize = this.layer.getImageSize();
        if (this.layerAlphaHack) {
            NUtility.modifyAlphaImageDiv(this.imgDiv, null, null, imageSize, this.url)
        } else {
            NUtility.modifyDOMElement(this.imgDiv, null, null, imageSize);
            this.imgDiv.src = this.url
        }
        return true
    },
    clear: function () {
        if (this.imgDiv) {
            this.hide();
            if (NTile.Image.useBlankTile) {
                this.imgDiv.src = NUtility.getImagesLocation() + "blank.gif"
            }
        }
    },
    initDiv: function () {
        var offset = this.layer.imageOffset;
        var size = this.layer.getImageSize();
        if (this.layerAlphaHack) {
            this.imgDiv = NUtility.createAlphaImageDiv(null, offset, size, null, "relative", null, null, null, true)
        } else {
            this.imgDiv = NUtility.createImage(null, offset, size, null, "relative", null, null, true)
        }
        this.imgDiv.className = 'olTileImage';
        this.frame.style.zIndex = this.isBackBuffer ? 0 : 1;
        this.frame.appendChild(this.imgDiv);
        this.layer.div.appendChild(this.frame);
        if (this.layer.opacity != null) {
            NUtility.modifyDOMElement(this.imgDiv, null, null, null, null, null, null, this.layer.opacity)
        }
        this.imgDiv.map = this.layer.map;
        var onload = function () {
                if (this.isLoading) {
                    this.isLoading = false;
                    this.events.triggerEvent("loadend")
                }
            };
        if (this.layerAlphaHack) {
            NEvent.observe(this.imgDiv.childNodes[0], 'load', NFunction.bind(onload, this))
        } else {
            NEvent.observe(this.imgDiv, 'load', NFunction.bind(onload, this))
        }
        var onerror = function () {
                if (this.imgDiv._attempts > NIMAGE_RELOAD_ATTEMPTS) {
                    onload.call(this)
                }
            };
        NEvent.observe(this.imgDiv, "error", NFunction.bind(onerror, this))
    },
    checkURL: function () {
        if (this.layer) {
            var loaded = this.layerAlphaHack ? this.imgDiv.firstChild.src : this.imgDiv.src;
            if (!NUtility.isEquivalentUrl(loaded, this.url)) {
                this.hide()
            }
        }
    },
    startTransition: function () {
        if (!this.backBufferTile || !this.backBufferTile.imgDiv) {
            return
        }
        var ratio = 1;
        if (this.backBufferTile.resolution) {
            ratio = this.backBufferTile.resolution / this.layer.getResolution()
        }
        if (ratio != this.lastRatio) {
            if (this.layer.transitionEffect == 'resize') {
                var upperLeft = new NLatLng(this.backBufferTile.bounds.left, this.backBufferTile.bounds.top);
                var size = new NSize(this.backBufferTile.size.w * ratio, this.backBufferTile.size.h * ratio);
                var px = this.layer.map.worldToLayerPx(upperLeft);
                NUtility.modifyDOMElement(this.backBufferTile.frame, null, px, size);
                var imageSize = this.backBufferTile.imageSize;
                imageSize = new NSize(imageSize.w * ratio, imageSize.h * ratio);
                var imageOffset = this.backBufferTile.imageOffset;
                if (imageOffset) {
                    imageOffset = new NPixel(imageOffset.x * ratio, imageOffset.y * ratio)
                }
                NUtility.modifyDOMElement(this.backBufferTile.imgDiv, null, imageOffset, imageSize);
                this.backBufferTile.show()
            }
        } else {
            if (this.layer.singleTile) {
                this.backBufferTile.show()
            } else {
                this.backBufferTile.hide()
            }
        }
        this.lastRatio = ratio
    },
    show: function () {
        this.frame.style.display = '';
        if (NUtility.indexOf(this.layer._SUPPORTED_TRANSITIONS, this.layer.transitionEffect) != -1) {
            if (navigator.userAgent.toLowerCase().indexOf("gecko") != -1) {
                this.frame.scrollLeft = this.frame.scrollLeft
            }
        }
    },
    hide: function () {
        this.frame.style.display = 'none'
    },
    _CLASS_NAME: "NTile.Image"
});
NTile.Image.useBlankTile = (NUtility.getBrowserName() == "safari" || NUtility.getBrowserName() == "opera");
NTile.WFS = NObject(NTile, {
    features: null,
    url: null,
    request: null,
    construct: function (layer, position, bounds, url, size) {
        NTile.prototype.construct.apply(this, arguments);
        this.url = url;
        this.features = []
    },
    dispose: function () {
        NTile.prototype.dispose.apply(this, arguments);
        this.disposeFeatures();
        this.features = null;
        this.url = null;
        if (this.request) {
            this.request.abort();
            this.request = null
        }
    },
    clear: function () {
        this.disposeFeatures()
    },
    draw: function () {
        if (NTile.prototype.draw.apply(this, arguments)) {
            if (this.isLoading) {
                this.events.triggerEvent("reload")
            } else {
                this.isLoading = true;
                this.events.triggerEvent("loadstart")
            }
            this.loadFeatures(this._requestSuccess)
        }
    },
    loadFeatures: function (success, failure) {
        if (this.request) {
            this.request.abort()
        }
        this.request = NRequest.GET({
            url: this.url,
            success: success,
            failure: failure,
            scope: this
        })
    },
    _requestSuccess: function (request) {
        if (this.features) {
            var doc = request.responseXML;
            if (!doc || !doc.documentElement) {
                doc = request.responseText
            }
            if (this.layer.vectorMode) {
                this.layer.addFeatures(this.layer.formatObject.read(doc))
            } else {
                var xml = new NParser.XML();
                if (typeof doc == "string") {
                    doc = xml.read(doc)
                }
                var resultFeatures = xml.getElementsByTagNameNS(doc, "http://www.opengis.net/gml", "featureMember");
                this.addResults2Features(resultFeatures)
            }
        }
        if (this.events) {
            this.events.triggerEvent("loadend")
        }
        this.request = null
    },
    addResults2Features: function (results) {
        for (var i = 0; i < results.length; i++) {
            var feature = new this.layer.featureClass(this.layer, results[i]);
            this.features.push(feature)
        }
    },
    disposeFeatures: function () {
        while (this.features.length > 0) {
            var feature = this.features.shift();
            feature.dispose()
        }
    },
    _CLASS_NAME: "NTile.WFS"
});
NImageLayer = NObject(NLayer, {
    type: 'NImageLayer',
    isBasicLayer: true,
    url: null,
    extent: null,
    size: null,
    tile: null,
    aspectRatio: null,
    construct: function (name, url, extent, size, options) {
        this.url = url;
        this.extent = extent;
        this.size = size;
        NLayer.prototype.construct.apply(this, [name, options]);
        this.aspectRatio = (this.extent.getHeight() / this.size.h) / (this.extent.getWidth() / this.size.w)
    },
    dispose: function () {
        if (this.tile) {
            this.tile.dispose();
            this.tile = null
        }
        NLayer.prototype.dispose.apply(this, arguments)
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new NImageLayer(this.name, this.url, this.extent, this.size, this.options)
        }
        obj = NLayer.prototype.clone.apply(this, [obj]);
        return obj
    },
    setMap: function (map) {
        if (this.options.maxResolution == null) {
            this.options.maxResolution = this.aspectRatio * this.extent.getWidth() / this.size.w
        }
        NLayer.prototype.setMap.apply(this, arguments)
    },
    moveTo: function (bounds, zoomChanged, dragging) {
        NLayer.prototype.moveTo.apply(this, arguments);
        var firstRendering = (this.tile == null);
        if (zoomChanged || firstRendering) {
            this.setTileSize();
            var ul = new NLatLng(this.extent.left, this.extent.top);
            var ulPx = this.map.worldToLayerPx(ul);
            if (firstRendering) {
                this.tile = new NTile.Image(this, ulPx, this.extent, null, this.tileSize)
            } else {
                this.tile.size = this.tileSize.clone();
                this.tile.position = ulPx.clone()
            }
            this.tile.draw()
        }
    },
    setTileSize: function () {
        var tileWidth = this.extent.getWidth() / this.map.getResolution();
        var tileHeight = this.extent.getHeight() / this.map.getResolution();
        this.tileSize = new NSize(tileWidth, tileHeight)
    },
    setURL: function (newUrl) {
        this.url = newUrl;
        this.tile.draw()
    },
    getURL: function (bounds) {
        return this.url
    },
    _CLASS_NAME: "NImageLayer"
});
NSphericalMercatorLayer = {
    getExtent: function () {
        var extent = null;
        if (this.sphericalMercator) {
            extent = this.map.getBounds()
        } else {
            extent = NFixedZoomLevelsLayer.prototype.getExtent.apply(this)
        }
        return extent
    },
    initMercatorParameters: function () {
        this.RESOLUTIONS = [];
        var maxResolution = 156543.0339;
        for (var zoomLevel = 0; zoomLevel <= this.MAX_ZOOM_LEVEL; ++zoomLevel) {
            this.RESOLUTIONS[zoomLevel] = maxResolution / Math.pow(2, zoomLevel)
        }
        this.units = "m";
        this.projection = "EPSG:900913"
    },
    forwardMercator: function (lon, lat) {
        var x = lon * 20037508.34 / 180;
        var y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
        y = y * 20037508.34 / 180;
        return new NLatLng(x, y)
    },
    inverseMercator: function (x, y) {
        var lon = (x / 20037508.34) * 180;
        var lat = (y / 20037508.34) * 180;
        lat = 180 / Math.PI * (2 * Math.atan(Math.exp(lat * Math.PI / 180)) - Math.PI / 2);
        return new NLatLng(lon, lat)
    },
    projectForward: function (point) {
        var latlng = NSphericalMercatorLayer.forwardMercator(point.x, point.y);
        point.x = latlng.lon;
        point.y = latlng.lat;
        return point
    },
    projectInverse: function (point) {
        var latlng = NSphericalMercatorLayer.inverseMercator(point.x, point.y);
        point.x = latlng.lon;
        point.y = latlng.lat;
        return point
    }
};
NProjection.addTransform("EPSG:4326", "EPSG:900913", NSphericalMercatorLayer.projectForward);
NProjection.addTransform("EPSG:900913", "EPSG:4326", NSphericalMercatorLayer.projectInverse);
NEventPaneLayer = NObject(NLayer, {
    type: 'NEventPaneLayer',
    smoothDragPan: true,
    isBasicLayer: true,
    isFixed: true,
    pane: null,
    mapObject: null,
    construct: function (name, options) {
        NLayer.prototype.construct.apply(this, arguments);
        if (this.pane == null) {
            this.pane = NUtility.createDiv(this.div.id + "_EventPane")
        }
    },
    dispose: function () {
        this.mapObject = null;
        NLayer.prototype.dispose.apply(this, arguments)
    },
    setMap: function (map) {
        NLayer.prototype.setMap.apply(this, arguments);
        this.pane.style.zIndex = parseInt(this.div.style.zIndex) + 1;
        this.pane.style.display = this.div.style.display;
        this.pane.style.width = "100%";
        this.pane.style.height = "100%";
        if (NUtility.getBrowserName() == "msie") {
            this.pane.style.background = "url(" + NUtility.getImagesLocation() + "blank.gif)"
        }
        if (this.isFixed) {
            this.map.mapViewPortDiv.appendChild(this.pane)
        } else {
            this.map._layerContainerDiv.appendChild(this.pane)
        }
        this.loadMapObject();
        if (this.mapObject == null) {
            this.loadWarningMessage()
        }
    },
    removeMap: function (map) {
        if (this.pane && this.pane.parentNode) {
            this.pane.parentNode.removeChild(this.pane);
            this.pane = null
        }
        NLayer.prototype.removeMap.apply(this, arguments)
    },
    loadWarningMessage: function () {
        this.div.style.backgroundColor = "darkblue";
        var viewSize = this.map.getSize();
        var msgW = Math.min(viewSize.w, 300);
        var msgH = Math.min(viewSize.h, 200);
        var size = new NSize(msgW, msgH);
        var centerPx = new NPixel(viewSize.w / 2, viewSize.h / 2);
        var topLeft = centerPx.offsetByXY(-size.w / 2, -size.h / 2);
        var div = NUtility.createDiv(this.name + "_warning", topLeft, size, null, null, null, "auto");
        div.style.padding = "7px";
        div.style.backgroundColor = "yellow";
        div.innerHTML = this.getWarningHTML();
        this.div.appendChild(div)
    },
    getWarningHTML: function () {
        return ""
    },
    display: function (display) {
        NLayer.prototype.display.apply(this, arguments);
        this.pane.style.display = this.div.style.display
    },
    setZIndex: function (zIndex) {
        NLayer.prototype.setZIndex.apply(this, arguments);
        this.pane.style.zIndex = parseInt(this.div.style.zIndex) + 1
    },
    moveTo: function (bounds, zoomChanged, dragging) {
        NLayer.prototype.moveTo.apply(this, arguments);
        if (this.mapObject != null) {
            var newCenter = this.map.getCenter();
            var newZoom = this.map.getZoomLevel();
            if (newCenter != null) {
                var moOldCenter = this.getMapObjectCenter();
                var oldCenter = this.getOLLonLatFromMapObjectLonLat(moOldCenter);
                var moOldZoom = this.getMapObjectZoom();
                var oldZoom = this.getOLZoomFromMapObjectZoom(moOldZoom);
                if (!(newCenter.equals(oldCenter)) || !(newZoom == oldZoom)) {
                    if (dragging && this.dragPanMapObject && this.smoothDragPan) {
                        var oldPx = this.map._worldToMapViewPortPx(oldCenter);
                        var newPx = this.map._worldToMapViewPortPx(newCenter);
                        this.dragPanMapObject(newPx.x - oldPx.x, oldPx.y - newPx.y)
                    } else {
                        var center = this.getMapObjectLonLatFromOLLonLat(newCenter);
                        var zoomLevel = this.getMapObjectZoomFromOLZoom(newZoom);
                        this.setMapObjectCenter(center, zoomLevel, dragging)
                    }
                }
            }
        }
    },
    _mapViewPortPxToWorld: function (viewPortPx) {
        var latlng = null;
        if ((this.mapObject != null) && (this.getMapObjectCenter() != null)) {
            var moPixel = this.getMapObjectPixelFromOLPixel(viewPortPx);
            var moLonLat = this.getMapObjectLonLatFromMapObjectPixel(moPixel);
            latlng = this.getOLLonLatFromMapObjectLonLat(moLonLat)
        }
        return latlng
    },
    _worldToMapViewPortPx: function (latlng) {
        var viewPortPx = null;
        if ((this.mapObject != null) && (this.getMapObjectCenter() != null)) {
            var moLonLat = this.getMapObjectLonLatFromOLLonLat(latlng);
            var moPixel = this.getMapObjectPixelFromMapObjectLonLat(moLonLat);
            viewPortPx = this.getOLPixelFromMapObjectPixel(moPixel)
        }
        return viewPortPx
    },
    getOLLonLatFromMapObjectLonLat: function (moLonLat) {
        var olLonLat = null;
        if (moLonLat != null) {
            var lon = this.getLongitudeFromMapObjectLonLat(moLonLat);
            var lat = this.getLatitudeFromMapObjectLonLat(moLonLat);
            olLonLat = new NLatLng(lon, lat)
        }
        return olLonLat
    },
    getMapObjectLonLatFromOLLonLat: function (olLonLat) {
        var moLatLng = null;
        if (olLonLat != null) {
            moLatLng = this.getMapObjectLonLatFromLonLat(olLonLat.lon, olLonLat.lat)
        }
        return moLatLng
    },
    getOLPixelFromMapObjectPixel: function (moPixel) {
        var olPixel = null;
        if (moPixel != null) {
            var x = this.getXFromMapObjectPixel(moPixel);
            var y = this.getYFromMapObjectPixel(moPixel);
            olPixel = new NPixel(x, y)
        }
        return olPixel
    },
    getMapObjectPixelFromOLPixel: function (olPixel) {
        var moPixel = null;
        if (olPixel != null) {
            moPixel = this.getMapObjectPixelFromXY(olPixel.x, olPixel.y)
        }
        return moPixel
    },
    _CLASS_NAME: "NEventPaneLayer"
});
NFixedZoomLevelsLayer = NObject({
    construct: function () {},
    initResolutions: function () {
        var props = new Array('minZoomLevel', 'maxZoomLevel', 'zoomLevelsCount');
        for (var i = 0, len = props.length; i < len; i++) {
            var property = props[i];
            this[property] = (this.options[property] != null) ? this.options[property] : this.map[property]
        }
        if ((this.minZoomLevel == null) || (this.minZoomLevel < this.MIN_ZOOM_LEVEL)) {
            this.minZoomLevel = this.MIN_ZOOM_LEVEL
        }
        var desiredZoomLevels;
        var limitZoomLevels = this.MAX_ZOOM_LEVEL - this.minZoomLevel + 1;
        if (((this.options.zoomLevelsCount == null) && (this.options.maxZoomLevel != null)) || ((this.zoomLevelsCount == null) && (this.maxZoomLevel != null))) {
            desiredZoomLevels = this.maxZoomLevel - this.minZoomLevel + 1
        } else {
            desiredZoomLevels = this.zoomLevelsCount
        }
        if (desiredZoomLevels != null) {
            this.zoomLevelsCount = Math.min(desiredZoomLevels, limitZoomLevels)
        } else {
            this.zoomLevelsCount = limitZoomLevels
        }
        this.maxZoomLevel = this.minZoomLevel + this.zoomLevelsCount - 1;
        if (this.RESOLUTIONS != null) {
            var resolutionsIndex = 0;
            this.resolutions = [];
            for (var i = this.minZoomLevel; i <= this.maxZoomLevel; i++) {
                this.resolutions[resolutionsIndex++] = this.RESOLUTIONS[i]
            }
            this.maxResolution = this.resolutions[0];
            this.minResolution = this.resolutions[this.resolutions.length - 1]
        }
    },
    getResolution: function () {
        if (this.resolutions != null) {
            return NLayer.prototype.getResolution.apply(this, arguments)
        } else {
            var resolution = null;
            var viewSize = this.map.getSize();
            var extent = this.getExtent();
            if ((viewSize != null) && (extent != null)) {
                resolution = Math.max(extent.getWidth() / viewSize.w, extent.getHeight() / viewSize.h)
            }
            return resolution
        }
    },
    getExtent: function () {
        var extent = null;
        var size = this.map.getSize();
        var tlPx = new NPixel(0, 0);
        var tlLL = this._mapViewPortPxToWorld(tlPx);
        var brPx = new NPixel(size.w, size.h);
        var brLL = this._mapViewPortPxToWorld(brPx);
        if ((tlLL != null) && (brLL != null)) {
            extent = new NBounds(tlLL.lon, brLL.lat, brLL.lon, tlLL.lat)
        }
        return extent
    },
    getZoomLevelByResolution: function (resolution) {
        if (this.resolutions != null) {
            return NLayer.prototype.getZoomLevelByResolution.apply(this, arguments)
        } else {
            var extent = NLayer.prototype.getExtent.apply(this, []);
            return this.getZoomLevelByExtent(extent)
        }
    },
    getOLZoomFromMapObjectZoom: function (moZoom) {
        var zoomLevel = null;
        if (moZoom != null) {
            zoomLevel = moZoom - this.minZoomLevel
        }
        return zoomLevel
    },
    getMapObjectZoomFromOLZoom: function (olZoom) {
        var zoomLevel = null;
        if (olZoom != null) {
            zoomLevel = olZoom + this.minZoomLevel
        }
        return zoomLevel
    },
    _CLASS_NAME: "FixedZoomLevels.js"
});
NHTTPRequestLayer = NObject(NLayer, {
    type: 'NHTTPRequestLayer',
    _URL_HASH_FACTOR: (Math.sqrt(5) - 1) / 2,
    url: null,
    params: null,
    reproject: false,
    construct: function (name, url, params, options) {
        var newArguments = arguments;
        newArguments = [name, options];
        NLayer.prototype.construct.apply(this, newArguments);
        this.url = url;
        this.params = NUtility.extend({}, params)
    },
    dispose: function () {
        this.url = null;
        this.params = null;
        NLayer.prototype.dispose.apply(this, arguments)
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new NHTTPRequestLayer(this.name, this.url, this.params, this.options)
        }
        obj = NLayer.prototype.clone.apply(this, [obj]);
        return obj
    },
    setURL: function (newUrl) {
        this.url = newUrl
    },
    changeParams: function (newParams) {
        this.params = NUtility.extend(this.params, newParams);
        return this.redraw()
    },
    redraw: function (force) {
        if (force) {
            return this.changeParams({
                "_olSalt": Math.random()
            })
        } else {
            return NLayer.prototype.redraw.apply(this, [])
        }
    },
    selectURL: function (paramString, urls) {
        var product = 1;
        for (var i = 0, len = paramString.length; i < len; i++) {
            product *= paramString.charCodeAt(i) * this._URL_HASH_FACTOR;
            product -= Math.floor(product)
        }
        return urls[Math.floor(product * urls.length)]
    },
    getFullRequestString: function (newParams, altUrl) {
        var url = altUrl || this.url;
        var allParams = NUtility.extend({}, this.params);
        allParams = NUtility.extend(allParams, newParams);
        var paramsString = NUtility.getParameterString(allParams);
        if (url instanceof Array) {
            url = this.selectURL(paramsString, url)
        }
        var urlParams = NUtility.upperCaseObject(NUtility.getParameters(url));
        for (var key in allParams) {
            if (key.toUpperCase() in urlParams) {
                delete allParams[key]
            }
        }
        paramsString = NUtility.getParameterString(allParams);
        var requestString = url;
        if (paramsString != "") {
            var lastServerChar = url.charAt(url.length - 1);
            if ((lastServerChar == "&") || (lastServerChar == "?")) {
                requestString += paramsString
            } else {
                if (url.indexOf('?') == -1) {
                    requestString += '?' + paramsString
                } else {
                    requestString += '&' + paramsString
                }
            }
        }
        return requestString
    },
    _CLASS_NAME: "NHTTPRequestLayer"
});
NGridLayer = NObject(NHTTPRequestLayer, {
    type: 'NGridLayer',
    tileSize: null,
    grid: null,
    singleTile: false,
    ratio: 1.5,
    buffer: 2,
    numLoadingTiles: 0,
    construct: function (name, url, params, options) {
        NHTTPRequestLayer.prototype.construct.apply(this, arguments);
        this.events.addEventType("tileloaded");
        this.grid = []
    },
    dispose: function () {
        this.clearGrid();
        this.grid = null;
        this.tileSize = null;
        NHTTPRequestLayer.prototype.dispose.apply(this, arguments)
    },
    clearGrid: function () {
        if (this.grid) {
            for (var iRow = 0, len = this.grid.length; iRow < len; iRow++) {
                var row = this.grid[iRow];
                for (var iCol = 0, clen = row.length; iCol < clen; iCol++) {
                    var tile = row[iCol];
                    this.removeTileMonitoringHooks(tile);
                    tile.dispose()
                }
            }
            this.grid = []
        }
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new NGridLayer(this.name, this.url, this.params, this.options)
        }
        obj = NHTTPRequestLayer.prototype.clone.apply(this, [obj]);
        if (this.tileSize != null) {
            obj.tileSize = this.tileSize.clone()
        }
        obj.grid = [];
        return obj
    },
    moveTo: function (bounds, zoomChanged, dragging) {
        NHTTPRequestLayer.prototype.moveTo.apply(this, arguments);
        bounds = bounds || this.map.getExtent();
        if (bounds != null) {
            var forceReTile = !this.grid.length || zoomChanged;
            var tilesBounds = this.getTilesBounds();
            if (this.singleTile) {
                if (forceReTile || (!dragging && !tilesBounds.containsBounds(bounds))) {
                    this.initSingleTile(bounds)
                }
            } else {
                if (forceReTile || !tilesBounds.containsBounds(bounds, true)) {
                    this.initGriddedTiles(bounds)
                } else {
                    this.moveGriddedTiles(bounds)
                }
            }
        }
    },
    setTileSize: function (size) {
        if (this.singleTile) {
            size = this.map.getSize().clone();
            size.h = parseInt(size.h * this.ratio);
            size.w = parseInt(size.w * this.ratio)
        }
        NHTTPRequestLayer.prototype.setTileSize.apply(this, [size])
    },
    getGridBounds: function () {
        var msg = "The getGridBounds() function is deprecated. It will be " + "removed in 3.0. Please use getTilesBounds() instead.";
        NLog.warn(msg);
        return this.getTilesBounds()
    },
    getTilesBounds: function () {
        var bounds = null;
        if (this.grid.length) {
            var bottom = this.grid.length - 1;
            var bottomLeftTile = this.grid[bottom][0];
            var right = this.grid[0].length - 1;
            var topRightTile = this.grid[0][right];
            bounds = new NBounds(bottomLeftTile.bounds.left, bottomLeftTile.bounds.bottom, topRightTile.bounds.right, topRightTile.bounds.top)
        }
        return bounds
    },
    initSingleTile: function (bounds) {
        var center = bounds.getCenterInLatLng();
        var tileWidth = bounds.getWidth() * this.ratio;
        var tileHeight = bounds.getHeight() * this.ratio;
        var tileBounds = new NBounds(center.lon - (tileWidth / 2), center.lat - (tileHeight / 2), center.lon + (tileWidth / 2), center.lat + (tileHeight / 2));
        var ul = new NLatLng(tileBounds.left, tileBounds.top);
        var px = this.map.worldToLayerPx(ul);
        if (!this.grid.length) {
            this.grid[0] = []
        }
        var tile = this.grid[0][0];
        if (!tile) {
            tile = this.addTile(tileBounds, px);
            this.addTileMonitoringHooks(tile);
            tile.draw();
            this.grid[0][0] = tile
        } else {
            tile.moveTo(tileBounds, px)
        }
        this.removeExcessTiles(1, 1)
    },
    calculateGridLayout: function (bounds, extent, resolution) {
        var tilelon = resolution * this.tileSize.w;
        var tilelat = resolution * this.tileSize.h;
        var offsetlon = bounds.left - extent.left;
        var tilecol = Math.floor(offsetlon / tilelon) - this.buffer;
        var tilecolremain = offsetlon / tilelon - tilecol;
        var tileoffsetx = -tilecolremain * this.tileSize.w;
        var tileoffsetlon = extent.left + tilecol * tilelon;
        var offsetlat = bounds.top - (extent.bottom + tilelat);
        var tilerow = Math.ceil(offsetlat / tilelat) + this.buffer;
        var tilerowremain = tilerow - offsetlat / tilelat;
        var tileoffsety = -tilerowremain * this.tileSize.h;
        var tileoffsetlat = extent.bottom + tilerow * tilelat;
        return {
            tilelon: tilelon,
            tilelat: tilelat,
            tileoffsetlon: tileoffsetlon,
            tileoffsetlat: tileoffsetlat,
            tileoffsetx: tileoffsetx,
            tileoffsety: tileoffsety
        }
    },
    initGriddedTiles: function (bounds) {
        var viewSize = this.map.getSize();
        var minRows = Math.ceil(viewSize.h / this.tileSize.h) + Math.max(1, 2 * this.buffer);
        var minCols = Math.ceil(viewSize.w / this.tileSize.w) + Math.max(1, 2 * this.buffer);
        var extent = this.maxExtent;
        var resolution = this.map.getResolution();
        var tileLayout = this.calculateGridLayout(bounds, extent, resolution);
        var tileoffsetx = Math.round(tileLayout.tileoffsetx);
        var tileoffsety = Math.round(tileLayout.tileoffsety);
        var tileoffsetlon = tileLayout.tileoffsetlon;
        var tileoffsetlat = tileLayout.tileoffsetlat;
        var tilelon = tileLayout.tilelon;
        var tilelat = tileLayout.tilelat;
        this.origin = new NPixel(tileoffsetx, tileoffsety);
        var startX = tileoffsetx;
        var startLon = tileoffsetlon;
        var rowidx = 0;
        var layerContainerDivLeft = parseInt(this.map._layerContainerDiv.style.left);
        var layerContainerDivTop = parseInt(this.map._layerContainerDiv.style.top);
        do {
            var row = this.grid[rowidx++];
            if (!row) {
                row = [];
                this.grid.push(row)
            }
            tileoffsetlon = startLon;
            tileoffsetx = startX;
            var colidx = 0;
            do {
                var tileBounds = new NBounds(tileoffsetlon, tileoffsetlat, tileoffsetlon + tilelon, tileoffsetlat + tilelat);
                var x = tileoffsetx;
                x -= layerContainerDivLeft;
                var y = tileoffsety;
                y -= layerContainerDivTop;
                var px = new NPixel(x, y);
                var tile = row[colidx++];
                if (!tile) {
                    tile = this.addTile(tileBounds, px);
                    this.addTileMonitoringHooks(tile);
                    row.push(tile)
                } else {
                    tile.moveTo(tileBounds, px, false)
                }
                tileoffsetlon += tilelon;
                tileoffsetx += this.tileSize.w
            } while ((tileoffsetlon <= bounds.right + tilelon * this.buffer) || colidx < minCols) tileoffsetlat -= tilelat;
            tileoffsety += this.tileSize.h
        } while ((tileoffsetlat >= bounds.bottom - tilelat * this.buffer) || rowidx < minRows) this.removeExcessTiles(rowidx, colidx);
        this.spiralTileLoad()
    },
    spiralTileLoad: function () {
        var tileQueue = [];
        var directions = ["right", "down", "left", "up"];
        var iRow = 0;
        var iCell = -1;
        var direction = NUtility.indexOf(directions, "right");
        var directionsTried = 0;
        while (directionsTried < directions.length) {
            var testRow = iRow;
            var testCell = iCell;
            switch (directions[direction]) {
            case "right":
                testCell++;
                break;
            case "down":
                testRow++;
                break;
            case "left":
                testCell--;
                break;
            case "up":
                testRow--;
                break
            }
            var tile = null;
            if ((testRow < this.grid.length) && (testRow >= 0) && (testCell < this.grid[0].length) && (testCell >= 0)) {
                tile = this.grid[testRow][testCell]
            }
            if ((tile != null) && (!tile.queued)) {
                tileQueue.unshift(tile);
                tile.queued = true;
                directionsTried = 0;
                iRow = testRow;
                iCell = testCell
            } else {
                direction = (direction + 1) % 4;
                directionsTried++
            }
        }
        for (var i = 0, len = tileQueue.length; i < len; i++) {
            var tile = tileQueue[i];
            tile.draw();
            tile.queued = false
        }
    },
    addTile: function (bounds, position) {},
    addTileMonitoringHooks: function (tile) {
        tile.onLoadStart = function () {
            if (this.numLoadingTiles == 0) {
                this.events.triggerEvent("loadstart")
            }
            this.numLoadingTiles++
        };
        tile.events._register("loadstart", this, tile.onLoadStart);
        tile.onLoadEnd = function () {
            this.numLoadingTiles--;
            this.events.triggerEvent("tileloaded");
            if (this.numLoadingTiles == 0) {
                this.events.triggerEvent("loadend")
            }
        };
        tile.events._register("loadend", this, tile.onLoadEnd);
        tile.events._register("unload", this, tile.onLoadEnd)
    },
    removeTileMonitoringHooks: function (tile) {
        tile.unload();
        tile.events.removeListener({
            "loadstart": tile.onLoadStart,
            "loadend": tile.onLoadEnd,
            "unload": tile.onLoadEnd,
            scope: this
        })
    },
    moveGriddedTiles: function (bounds) {
        var buffer = this.buffer || 1;
        while (true) {
            var tlLayer = this.grid[0][0].position;
            var tlViewPort = this.map.layerPxToMapViewPortPx(tlLayer);
            if (tlViewPort.x > -this.tileSize.w * (buffer - 1)) {
                this.shiftColumn(true)
            } else if (tlViewPort.x < -this.tileSize.w * buffer) {
                this.shiftColumn(false)
            } else if (tlViewPort.y > -this.tileSize.h * (buffer - 1)) {
                this.shiftRow(true)
            } else if (tlViewPort.y < -this.tileSize.h * buffer) {
                this.shiftRow(false)
            } else {
                break
            }
        }
    },
    shiftRow: function (prepend) {
        var modelRowIndex = (prepend) ? 0 : (this.grid.length - 1);
        var grid = this.grid;
        var modelRow = grid[modelRowIndex];
        var resolution = this.map.getResolution();
        var deltaY = (prepend) ? -this.tileSize.h : this.tileSize.h;
        var deltaLat = resolution * -deltaY;
        var row = (prepend) ? grid.pop() : grid.shift();
        for (var i = 0, len = modelRow.length; i < len; i++) {
            var modelTile = modelRow[i];
            var bounds = modelTile.bounds.clone();
            var position = modelTile.position.clone();
            bounds.bottom = bounds.bottom + deltaLat;
            bounds.top = bounds.top + deltaLat;
            position.y = position.y + deltaY;
            if (isNaN(row[i]) && row[i] != null) row[i].moveTo(bounds, position)
        }
        if (prepend) {
            grid.unshift(row)
        } else {
            grid.push(row)
        }
    },
    shiftColumn: function (prepend) {
        var deltaX = (prepend) ? -this.tileSize.w : this.tileSize.w;
        var resolution = this.map.getResolution();
        var deltaLon = resolution * deltaX;
        for (var i = 0, len = this.grid.length; i < len; i++) {
            var row = this.grid[i];
            var modelTileIndex = (prepend) ? 0 : (row.length - 1);
            var modelTile = row[modelTileIndex];
            var bounds = modelTile.bounds.clone();
            var position = modelTile.position.clone();
            bounds.left = bounds.left + deltaLon;
            bounds.right = bounds.right + deltaLon;
            position.x = position.x + deltaX;
            var tile = prepend ? this.grid[i].pop() : this.grid[i].shift();
            tile.moveTo(bounds, position);
            if (prepend) {
                row.unshift(tile)
            } else {
                row.push(tile)
            }
        }
    },
    removeExcessTiles: function (rows, columns) {
        while (this.grid.length > rows) {
            var row = this.grid.pop();
            for (var i = 0, l = row.length; i < l; i++) {
                var tile = row[i];
                this.removeTileMonitoringHooks(tile);
                tile.dispose()
            }
        }
        while (this.grid[0].length > columns) {
            for (var i = 0, l = this.grid.length; i < l; i++) {
                var row = this.grid[i];
                var tile = row.pop();
                this.removeTileMonitoringHooks(tile);
                tile.dispose()
            }
        }
    },
    onMapResize: function () {
        if (this.singleTile) {
            this.clearGrid();
            this.setTileSize()
        }
    },
    getTileBounds: function (viewPortPx) {
        var maxExtent = this.maxExtent;
        var resolution = this.getResolution();
        var tileMapWidth = resolution * this.tileSize.w;
        var tileMapHeight = resolution * this.tileSize.h;
        var mapPoint = this._mapViewPortPxToWorld(viewPortPx);
        var tileLeft = maxExtent.left + (tileMapWidth * Math.floor((mapPoint.lon - maxExtent.left) / tileMapWidth));
        var tileBottom = maxExtent.bottom + (tileMapHeight * Math.floor((mapPoint.lat - maxExtent.bottom) / tileMapHeight));
        return new NBounds(tileLeft, tileBottom, tileLeft + tileMapWidth, tileBottom + tileMapHeight)
    },
    _CLASS_NAME: "NGridLayer"
});
NWMSTileLayer = NObject(NGridLayer, {
    isBasicLayer: true,
    type: "NWMSTileLayer",
    isQueryable: false,
    units: null,
    subLayers: new Array(),
    resolution: NDOTS_PER_INCH,
    _DEFAULT_PARAMS: {
        format: 'png',
        request: "GetTile",
        map: ''
    },
    construct: function (name, url, params, options) {
        var newArguments = [];
        newArguments.push(name, url, params, options);
        NGridLayer.prototype.construct.apply(this, newArguments);
        this.params = NUtility.applyDefaults(this.params, this._DEFAULT_PARAMS)
    },
    getURL: function (bounds) {
        bounds = this.adjustBounds(bounds);
        var mapRes = this.map.getResolution();
        var scale = Math.round((this.map.getScale() * 10000)) / 10000;
        var pX = Math.round(bounds.left / mapRes);
        var pY = -Math.round(bounds.top / mapRes);
        return this.getFullRequestString({
            t: pY,
            l: pX,
            s: scale
        })
    },
    addTile: function (bounds, position) {
        var url = this.getURL(bounds);
        return new NTile.Image(this, position, bounds, url, this.tileSize)
    },
    calculateGridLayout: function (bounds, extent, resolution) {
        var tilelon = resolution * this.tileSize.w;
        var tilelat = resolution * this.tileSize.h;
        var offsetlon = bounds.left;
        var tilecol = Math.floor(offsetlon / tilelon) - this.buffer;
        var tilecolremain = offsetlon / tilelon - tilecol;
        var tileoffsetx = -tilecolremain * this.tileSize.w;
        var tileoffsetlon = tilecol * tilelon;
        var offsetlat = bounds.top;
        var tilerow = Math.ceil(offsetlat / tilelat) + this.buffer;
        var tilerowremain = tilerow - offsetlat / tilelat;
        var tileoffsety = -(tilerowremain + 1) * this.tileSize.h;
        var tileoffsetlat = tilerow * tilelat;
        return {
            tilelon: tilelon,
            tilelat: tilelat,
            tileoffsetlon: tileoffsetlon,
            tileoffsetlat: tileoffsetlat,
            tileoffsetx: tileoffsetx,
            tileoffsety: tileoffsety
        }
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new NWMSTileLayer(this.name, this.url, this.params, this.options)
        }
        obj = NGridLayer.prototype.clone.apply(this, [obj]);
        obj.mapUrl = this.mapUrl;
        if (this.tileSize != null) {
            obj.tileSize = this.tileSize.clone()
        }
        obj.grid = [];
        return obj
    },
    getTileBounds: function (viewPortPx) {
        var resolution = this.getResolution();
        var tileMapWidth = resolution * this.tileSize.w;
        var tileMapHeight = resolution * this.tileSize.h;
        var mapPoint = this._mapViewPortPxToWorld(viewPortPx);
        var tileLeft = tileMapWidth * Math.floor(mapPoint.lon / tileMapWidth);
        var tileBottom = tileMapHeight * Math.floor(mapPoint.lat / tileMapHeight);
        return new NBounds(tileLeft, tileBottom, tileLeft + tileMapWidth, tileBottom + tileMapHeight)
    },
    _CLASS_NAME: "NWMSTileLayer"
});
NCacheLayer = NObject(NWMSTileLayer, {
    type: 'NCacheLayer',
    urlTag: "normal",
    defaultUrl: "",
    extentsArray: null,
    extentsLevelsArray: null,
    _IMAGE_EXTENSIONS: {
        'jpeg': 'jpg',
        'gif': 'gif',
        'png': 'png',
        'png8': 'png',
        'png24': 'png',
        'dithered': 'png'
    },
    _DEFAULT_FORMAT: 'png',
    construct: function (name, url, params, options) {
        NWMSTileLayer.prototype.construct.apply(this, arguments);
        this.extension = this._IMAGE_EXTENSIONS[this.params.format.toLowerCase() || _DEFAULT_FORMAT]
    },
    getURL: function (bounds) {
        bounds = this.adjustBounds(bounds);
        var mapRes = this.map.getResolution();
        var scale = Math.round((this.map.getScale() * 10000)) / 10000;
        var pX = Math.round(bounds.left / mapRes);
        var pY = -Math.round(bounds.top / mapRes);
        var metaTileSize = 6;
        var metaX = Math.floor(pX / this.tileSize.w / metaTileSize) * this.tileSize.w * metaTileSize;
        var metaY = Math.floor(pY / this.tileSize.h / metaTileSize) * this.tileSize.h * metaTileSize;
        var url = this.url;
        if (url instanceof Array) {
            if (this.urlTag == "scale") {
                if (url[scale] != null && url[scale] != '' && url[scale] != undefined) url = url[scale];
                else url = this.defaultUrl
            } else if (this.urlTag == "extent") {
                url = this.getUrlByExtent(bounds, scale)
            }
        }
        scale = Math.round(scale);
        if (url.toLowerCase().indexOf(".php") > -1) url = url + "&s=" + scale + "&g=" + this.params.layers.replace(/\s/g, '_') + "&t=" + metaY + "&l=" + metaX + "&c=t" + pY + "l" + pX + "&format=" + this.extension;
        else {
            var components = [url, "/", scale, "/", this.params.layers.replace(/\s/g, '_'), "/def/t", metaY, "/l", metaX, "/t", pY, "l", pX, ".", this.extension];
            url = components.join("")
        }
        return url
    },
    getUrlByExtent: function (bounds, z) {
        var url = this.url;
        if (url instanceof Array) {
            if (this.extentsLevelsArray != null && this.extentsLevelsArray.length > 0) {
                var tempuseExtent = false;
                for (var i = 0; i < this.extentsLevelsArray.length; i++) {
                    if (this.extentsLevelsArray[i] == z) {
                        tempuseExtent = true
                    }
                }
                if (tempuseExtent && this.extentsArray != null && this.extentsArray.length > 0) {
                    var tempIndex = -1;
                    for (var z = 0; z < this.extentsArray.length; z++) {
                        var tempextent = this.extentsArray[z];
                        if (tempextent.intersectsBounds(bounds, false)) {
                            tempIndex = z;
                            break
                        }
                    }
                    if (tempIndex >= 0 && url[tempIndex] != null && url[tempIndex] != '' && url[tempIndex] != undefined) {
                        return url[tempIndex]
                    } else return this.defaultUrl
                } else return this.defaultUrl
            } else {
                return this.defaultUrl
            }
        } else {
            return url
        }
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new NCacheLayer(this.name, this.url, this.params, this.options)
        }
        obj = NGridLayer.prototype.clone.apply(this, [obj]);
        if (this.tileSize != null) {
            obj.tileSize = this.tileSize.clone()
        }
        obj.grid = [];
        return obj
    },
    _CLASS_NAME: "NCacheLayer"
});
NCacheLayer2 = NObject(NWMSTileLayer, {
    type: 'NCacheLayer2',
    urlTag: "normal",
    defaultUrl: "",
    extentsArray: null,
    extentsLevelsArray: null,
    _IMAGE_EXTENSIONS: {
        'jpeg': 'jpg',
        'gif': 'gif',
        'png': 'png',
        'png8': 'png',
        'png24': 'png',
        'dithered': 'png'
    },
    _DEFAULT_FORMAT: 'png',
    construct: function (name, url, params, options) {
        NINCHES_PER_UNIT["dd"] = 4374754;
        NDOTS_PER_INCH = 72;
        NWMSTileLayer.prototype.construct.apply(this, arguments);
        this.extension = this._IMAGE_EXTENSIONS[this.params.format.toLowerCase() || _DEFAULT_FORMAT]
    },
    getURL: function (bounds) {
        bounds = this.adjustBounds(bounds);
        var mapRes = this.map.getResolution();
        var scale = Math.round((this.map.getScale() * 10000)) / 10000;
        var pX = Math.round(bounds.left / mapRes);
        var pY = -Math.round(bounds.top / mapRes);
        var metaTileSize = 6;
        var metaX = Math.floor(pX / this.tileSize.w / metaTileSize) * this.tileSize.w * metaTileSize;
        var metaY = Math.floor(pY / this.tileSize.h / metaTileSize) * this.tileSize.h * metaTileSize;
        var url = this.url;
        if (url instanceof Array) {
            if (this.urlTag == "scale") {
                if (url[scale] != null && url[scale] != '' && url[scale] != undefined) url = url[scale];
                else url = this.defaultUrl
            } else if (this.urlTag == "extent") {
                url = this.getUrlByExtent(bounds, scale)
            }
        }
        var components = [url, "/", scale, "/", this.params.layers.replace(/\s/g, '_'), "/def/t", metaY, "/l", metaX, "/t", pY, "l", pX, ".", this.extension];
        return components.join("")
    },
    getUrlByExtent: function (bounds, z) {
        var url = this.url;
        if (url instanceof Array) {
            if (this.extentsLevelsArray != null && this.extentsLevelsArray.length > 0) {
                var tempuseExtent = false;
                for (var i = 0; i < this.extentsLevelsArray.length; i++) {
                    if (this.extentsLevelsArray[i] == z) {
                        tempuseExtent = true
                    }
                }
                if (tempuseExtent && this.extentsArray != null && this.extentsArray.length > 0) {
                    var tempIndex = -1;
                    for (var z = 0; z < this.extentsArray.length; z++) {
                        var tempextent = this.extentsArray[z];
                        if (tempextent.intersectsBounds(bounds, false)) {
                            tempIndex = z;
                            break
                        }
                    }
                    if (tempIndex >= 0 && url[tempIndex] != null && url[tempIndex] != '' && url[tempIndex] != undefined) {
                        return url[tempIndex]
                    } else return this.defaultUrl
                } else return this.defaultUrl
            } else {
                return this.defaultUrl
            }
        } else {
            return url
        }
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new NCacheLayer2(this.name, this.url, this.params, this.options)
        }
        obj = NGridLayer.prototype.clone.apply(this, [obj]);
        if (this.tileSize != null) {
            obj.tileSize = this.tileSize.clone()
        }
        obj.grid = [];
        return obj
    },
    _CLASS_NAME: "NCacheLayer2"
});
NATCacheLayer = NObject(NGridLayer, {
    isBasicLayer: true,
    type: "NATCacheLayer",
    isQueryable: false,
    units: null,
    subLayers: new Array(),
    resolution: NDOTS_PER_INCH,
    _DEFAULT_PARAMS: {
        format: 'png',
        request: "GetTile",
        map: ''
    },
    construct: function (name, url, params, options) {
        var newArguments = [];
        newArguments.push(name, url, params, options);
        NGridLayer.prototype.construct.apply(this, newArguments);
        this.params = NUtility.applyDefaults(this.params, this._DEFAULT_PARAMS)
    },
    getURL: function (bounds) {
        bounds = this.adjustBounds(bounds);
        var mapRes = this.map.getResolution();
        var scale = Math.round((this.map.getScale() * 10000)) / 10000;
        var pX = Math.round(bounds.left / mapRes);
        var pY = -Math.round(bounds.top / mapRes);
        return this.getFullRequestString({
            t: pY,
            l: pX,
            s: scale
        })
    },
    addTile: function (bounds, position) {
        var url = this.getURL(bounds);
        return new NTile.Image(this, position, bounds, url, this.tileSize)
    },
    calculateGridLayout: function (bounds, extent, resolution) {
        var tilelon = resolution * this.tileSize.w;
        var tilelat = resolution * this.tileSize.h;
        var offsetlon = bounds.left;
        var tilecol = Math.floor(offsetlon / tilelon) - this.buffer;
        var tilecolremain = offsetlon / tilelon - tilecol;
        var tileoffsetx = -tilecolremain * this.tileSize.w;
        var tileoffsetlon = tilecol * tilelon;
        var offsetlat = bounds.top;
        var tilerow = Math.ceil(offsetlat / tilelat) + this.buffer;
        var tilerowremain = tilerow - offsetlat / tilelat;
        var tileoffsety = -(tilerowremain + 1) * this.tileSize.h;
        var tileoffsetlat = tilerow * tilelat;
        return {
            tilelon: tilelon,
            tilelat: tilelat,
            tileoffsetlon: tileoffsetlon,
            tileoffsetlat: tileoffsetlat,
            tileoffsetx: tileoffsetx,
            tileoffsety: tileoffsety
        }
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new NATCacheLayer(this.name, this.url, this.params, this.options)
        }
        obj = NGridLayer.prototype.clone.apply(this, [obj]);
        obj.mapUrl = this.mapUrl;
        if (this.tileSize != null) {
            obj.tileSize = this.tileSize.clone()
        }
        obj.grid = [];
        return obj
    },
    getTileBounds: function (viewPortPx) {
        var resolution = this.getResolution();
        var tileMapWidth = resolution * this.tileSize.w;
        var tileMapHeight = resolution * this.tileSize.h;
        var mapPoint = this._mapViewPortPxToWorld(viewPortPx);
        var tileLeft = tileMapWidth * Math.floor(mapPoint.lon / tileMapWidth);
        var tileBottom = tileMapHeight * Math.floor(mapPoint.lat / tileMapHeight);
        return new NBounds(tileLeft, tileBottom, tileLeft + tileMapWidth, tileBottom + tileMapHeight)
    },
    _CLASS_NAME: "NATCacheLayer"
});
NMarkersLayer = NObject(NLayer, {
    isBasicLayer: false,
    _markerList: null,
    type: 'NMarkersLayer',
    _drawn: false,
    construct: function (name, options) {
        NLayer.prototype.construct.apply(this, arguments);
        this._markerList = []
    },
    dispose: function () {
        this.clearMarkers();
        this._markerList = null;
        NLayer.prototype.dispose.apply(this, arguments)
    },
    setOpacity: function (opacity) {
        if (opacity != this.opacity) {
            this.opacity = opacity;
            for (var i = 0, len = this._markerList.length; i < len; i++) {
                this._markerList[i].setOpacity(this.opacity)
            }
        }
    },
    moveTo: function (bounds, zoomChanged, dragging) {
        NLayer.prototype.moveTo.apply(this, arguments);
        if (zoomChanged || !this._drawn) {
            for (var i = 0, len = this._markerList.length; i < len; i++) {
                this.drawMarker(this._markerList[i])
            }
            this._drawn = true
        }
    },
    addMarker: function (marker) {
        this._markerList.push(marker);
        if (this.opacity != null) {
            marker.setOpacity(this.opacity)
        }
        if (this.map && this.map.getExtent()) {
            marker.map = this.map;
            this.drawMarker(marker)
        }
    },
    removeMarker: function (marker) {
        if (this._markerList && this._markerList.length) {
            NUtility.removeItem(this._markerList, marker);
            if ((marker.icon != null) && (marker.icon.imageDiv != null) && (marker.icon.imageDiv.parentNode == this.div)) {
                this.div.removeChild(marker.icon.imageDiv);
                marker._drawn = false
            }
        }
    },
    clearMarkers: function () {
        if (this._markerList != null) {
            while (this._markerList.length > 0) {
                this.removeMarker(this._markerList[0])
            }
        }
    },
    drawMarker: function (marker) {
        var px = this.map.worldToLayerPx(marker.latlng);
        if (px == null) {
            marker.display(false)
        } else {
            var markerImg = marker.draw(px);
            if (!marker._drawn) {
                this.div.appendChild(markerImg);
                marker._drawn = true
            }
        }
    },
    getLayerExtent: function () {
        var maxExtent = null;
        if (this._markerList && (this._markerList.length > 0)) {
            var maxExtent = new NBounds();
            for (var i = 0, len = this._markerList.length; i < len; i++) {
                var marker = this._markerList[i];
                maxExtent.extend(marker.latlng)
            }
        }
        return maxExtent
    },
    _CLASS_NAME: "NMarkersLayer"
});
NTextLayer = NObject(NMarkersLayer, {
    type: 'NTextLayer',
    location: null,
    features: null,
    formatOptions: null,
    selectedFeature: null,
    construct: function (name, options) {
        NMarkersLayer.prototype.construct.apply(this, arguments);
        this.features = new Array()
    },
    dispose: function () {
        NMarkersLayer.prototype.dispose.apply(this, arguments);
        this.clearFeatures();
        this.features = null
    },
    load: function () {
        if (!this.loaded) {
            if (this.location != null) {
                var onFail = function (e) {
                        this.events.triggerEvent("loadend")
                    };
                this.events.triggerEvent("loadstart");
                NRequest.GET({
                    url: this.location,
                    success: this.parseData,
                    failure: onFail,
                    scope: this
                });
                this.loaded = true
            }
        }
    },
    moveTo: function (bounds, zoomChanged, minor) {
        NMarkersLayer.prototype.moveTo.apply(this, arguments);
        if (this.visible && !this.loaded) {
            this.load()
        }
    },
    parseData: function (ajaxRequest) {
        var text = ajaxRequest.responseText;
        var options = {};
        NUtility.extend(options, this.formatOptions);
        if (this.map && !this.projection.equals(this.map.getProjection())) {
            options.outerProjection = this.projection;
            options.innerProjection = this.map.getProjection()
        }
        var parser = new NParser.Text(options);
        features = parser.read(text);
        for (var i = 0, len = features.length; i < len; i++) {
            var data = {};
            var feature = features[i];
            var location;
            var iconSize, iconOffset;
            location = new NLatLng(feature.geometry.x, feature.geometry.y);
            if (feature.style.graphicWidth && feature.style.graphicHeight) {
                iconSize = new NSize(feature.style.graphicWidth, feature.style.graphicHeight)
            }
            if (feature.style.graphicXOffset !== undefined && feature.style.graphicYOffset !== undefined) {
                iconOffset = new NPixel(feature.style.graphicXOffset, feature.style.graphicYOffset)
            }
            if (feature.style.externalGraphic != null) {
                data.icon = new NIcon(feature.style.externalGraphic, iconSize, iconOffset)
            } else {
                data.icon = NMarker.defaultIcon();
                if (iconSize != null) {
                    data.icon.setSize(iconSize)
                }
            }
            if ((feature.attributes.title != null) && (feature.attributes.description != null)) {
                data['dialogContentHTML'] = '<h2>' + feature.attributes.title + '</h2>' + '<p>' + feature.attributes.description + '</p>'
            }
            data['overflow'] = feature.attributes.overflow || "auto";
            var markerFeature = new NFeature(this, location, data);
            this.features.push(markerFeature);
            var marker = markerFeature.createMarker();
            if ((feature.attributes.title != null) && (feature.attributes.description != null)) {
                marker.events._register('click', markerFeature, this.markerClick)
            }
            this.addMarker(marker)
        }
        this.events.triggerEvent("loadend")
    },
    markerClick: function (evt) {
        var sameMarkerClicked = (this == this.layer.selectedFeature);
        this.layer.selectedFeature = (!sameMarkerClicked) ? this : null;
        for (var i = 0, len = this.layer.map.dialogs.length; i < len; i++) {
            this.layer.map.removeDialog(this.layer.map.dialogs[i])
        }
        if (!sameMarkerClicked) {
            this.layer.map.addDialog(this.createDialog())
        }
        NEvent.stop(evt)
    },
    clearFeatures: function () {
        if (this.features != null) {
            while (this.features.length > 0) {
                var feature = this.features[0];
                NUtility.removeItem(this.features, feature);
                feature.dispose()
            }
        }
    },
    _CLASS_NAME: "NTextLayer"
});
NWMSLayer = NObject(NGridLayer, {
    type: "NWMSLayer",
    _DEFAULT_PARAMS: {
        service: "WMS",
        version: "1.1.1",
        request: "GetMap",
        styles: "",
        exceptions: "application/vnd.ogc.se_inimage",
        format: "image/jpeg"
    },
    reproject: false,
    isBasicLayer: true,
    encodeBBOX: false,
    construct: function (name, url, params, options) {
        var newArguments = [];
        params = NUtility.upperCaseObject(params);
        newArguments.push(name, url, params, options);
        NGridLayer.prototype.construct.apply(this, newArguments);
        NUtility.applyDefaults(this.params, NUtility.upperCaseObject(this._DEFAULT_PARAMS));
        if (this.params.TRANSPARENT && this.params.TRANSPARENT.toString().toLowerCase() == "true") {
            if ((options == null) || (!options.isBasicLayer)) {
                this.isBasicLayer = false
            }
            if (this.params.FORMAT == "image/jpeg") {
                this.params.FORMAT = NUtility.alphaHack() ? "image/gif" : "image/png"
            }
        }
    },
    dispose: function () {
        NGridLayer.prototype.dispose.apply(this, arguments)
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new NWMSLayer(this.name, this.url, this.params, this.options)
        }
        obj = NGridLayer.prototype.clone.apply(this, [obj]);
        return obj
    },
    getURL: function (bounds) {
        bounds = this.adjustBounds(bounds);
        var imageSize = this.getImageSize();
        var newParams = {
            'BBOX': this.encodeBBOX ? bounds.toBBOX() : bounds.toArray(),
            'WIDTH': imageSize.w,
            'HEIGHT': imageSize.h
        };
        var requestString = this.getFullRequestString(newParams);
        return requestString
    },
    addTile: function (bounds, position) {
        return new NTile.Image(this, position, bounds, null, this.tileSize)
    },
    changeParams: function (newParams) {
        var upperParams = NUtility.upperCaseObject(newParams);
        var newArguments = [upperParams];
        return NGridLayer.prototype.changeParams.apply(this, newArguments)
    },
    getFullRequestString: function (newParams, altUrl) {
        var projectionCode = this.map.getProjectionCode();
        this.params.SRS = (projectionCode == "none") ? null : projectionCode;
        return NGridLayer.prototype.getFullRequestString.apply(this, arguments)
    },
    _CLASS_NAME: "NWMSLayer"
});
NWMSLayer.Untiled = NObject(NWMSLayer, {
    singleTile: true,
    construct: function (name, url, params, options) {
        NWMSLayer.prototype.construct.apply(this, arguments);
        var msg = "The NWMSLayer.Untiled class is deprecated and " + "will be removed in 3.0. Instead, you should use the " + "normal NWMSLayer class, passing it the option " + "'singleTile' as true.";
        NLog.warn(msg)
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new NWMSLayer.Untiled(this.name, this.url, this.params, this.options)
        }
        obj = NWMSLayer.prototype.clone.apply(this, [obj]);
        return obj
    },
    _CLASS_NAME: "NWMSLayer.Untiled"
});
NGeoRSSLayer = NObject(NMarkersLayer, {
    type: 'NGeoRSSLayer',
    location: null,
    features: null,
    formatOptions: null,
    selectedFeature: null,
    icon: null,
    dialogSize: null,
    useFeedTitle: true,
    construct: function (name, location, options) {
        NMarkersLayer.prototype.construct.apply(this, [name, options]);
        this.location = location;
        this.features = []
    },
    dispose: function () {
        NMarkersLayer.prototype.dispose.apply(this, arguments);
        this.clearFeatures();
        this.features = null
    },
    load: function () {
        if (!this.loaded) {
            this.events.triggerEvent("loadstart");
            NRequest.GET({
                url: this.location,
                success: this.parseData,
                scope: this
            });
            this.loaded = true
        }
    },
    moveTo: function (bounds, zoomChanged, minor) {
        NMarkersLayer.prototype.moveTo.apply(this, arguments);
        if (this.visible && !this.loaded) {
            this.load()
        }
    },
    parseData: function (ajaxRequest) {
        var doc = ajaxRequest.responseXML;
        if (!doc || !doc.documentElement) {
            doc = NParser.XML.prototype.read(ajaxRequest.responseText)
        }
        if (this.useFeedTitle) {
            var name = null;
            try {
                name = doc.getElementsByTagNameNS('*', 'title')[0].firstChild.nodeValue
            } catch (e) {
                name = doc.getElementsByTagName('title')[0].firstChild.nodeValue
            }
            if (name) {
                this.setName(name)
            }
        }
        var options = {};
        NUtility.extend(options, this.formatOptions);
        if (this.map && !this.projection.equals(this.map.getProjection())) {
            options.outerProjection = this.projection;
            options.innerProjection = this.map.getProjection()
        }
        var format = new NParser.GeoRSS(options);
        var features = format.read(doc);
        for (var i = 0, len = features.length; i < len; i++) {
            var data = {};
            var feature = features[i];
            if (!feature.geometry) {
                continue
            }
            var title = feature.attributes.title ? feature.attributes.title : "Untitled";
            var description = feature.attributes.description ? feature.attributes.description : "No description.";
            var link = feature.attributes.link ? feature.attributes.link : "";
            var location = feature.geometry.getBounds().getCenterInLatLng();
            data.icon = this.icon == null ? NMarker.defaultIcon() : this.icon.clone();
            data.dialogSize = this.dialogSize ? this.dialogSize.clone() : new NSize(250, 120);
            if (title || description) {
                data.title = title;
                data.description = description;
                var contentHTML = '<div class="olLayerGeoRSSClose">[x]</div>';
                contentHTML += '<div class="olLayerGeoRSSTitle">';
                if (link) {
                    contentHTML += '<a class="link" href="' + link + '" target="_blank">'
                }
                contentHTML += title;
                if (link) {
                    contentHTML += '</a>'
                }
                contentHTML += '</div>';
                contentHTML += '<div style="" class="olLayerGeoRSSDescription">';
                contentHTML += description;
                contentHTML += '</div>';
                data['dialogContentHTML'] = contentHTML
            }
            var feature = new NFeature(this, location, data);
            this.features.push(feature);
            var marker = feature.createMarker();
            marker.events._register('click', feature, this.markerClick);
            this.addMarker(marker)
        }
        this.events.triggerEvent("loadend")
    },
    markerClick: function (evt) {
        var sameMarkerClicked = (this == this.layer.selectedFeature);
        this.layer.selectedFeature = (!sameMarkerClicked) ? this : null;
        for (var i = 0, len = this.layer.map.dialogs.length; i < len; i++) {
            this.layer.map.removeDialog(this.layer.map.dialogs[i])
        }
        if (!sameMarkerClicked) {
            var dialog = this.createDialog();
            NEvent.observe(dialog.div, "click", NFunction.bind(function () {
                for (var i = 0, len = this.layer.map.dialogs.length; i < len; i++) {
                    this.layer.map.removeDialog(this.layer.map.dialogs[i])
                }
            }, this));
            this.layer.map.addDialog(dialog)
        }
        NEvent.stop(evt)
    },
    clearFeatures: function () {
        if (this.features != null) {
            while (this.features.length > 0) {
                var feature = this.features[0];
                NUtility.removeItem(this.features, feature);
                feature.dispose()
            }
        }
    },
    _CLASS_NAME: "NGeoRSSLayer"
});
NBoxesLayer = NObject(NMarkersLayer, {
    type: 'NBoxesLayer',
    construct: function (name, options) {
        NMarkersLayer.prototype.construct.apply(this, arguments)
    },
    drawMarker: function (marker) {
        var bounds = marker.bounds;
        var topleft = this.map.worldToLayerPx(new NLatLng(bounds.left, bounds.top));
        var botright = this.map.worldToLayerPx(new NLatLng(bounds.right, bounds.bottom));
        if (botright == null || topleft == null) {
            marker.display(false)
        } else {
            var sz = new NSize(Math.max(1, botright.x - topleft.x), Math.max(1, botright.y - topleft.y));
            var markerDiv = marker.draw(topleft, sz);
            if (!marker.drawn) {
                this.div.appendChild(markerDiv);
                marker.drawn = true
            }
        }
    },
    removeMarker: function (marker) {
        NUtility.removeItem(this.markersLayer, marker);
        if ((marker.div != null) && (marker.div.parentNode == this.div)) {
            this.div.removeChild(marker.div)
        }
    },
    _CLASS_NAME: "NBoxesLayer"
});
NQueryLayer = NObject({
    url: '',
    name: '',
    srs: '',
    type: 'NQueryLayer',
    page: 1,
    geoType: 'point',
    coords: '',
    qtype: 'JSON',
    maxfeatures: 10,
    callback: null,
    buffer: 0,
    searchstring: '',
    queryfields: '',
    spatialQueryFilter: '',
    statfields: '',
    statmethod: 'frequency',
    version: 1,
    construct: function (name, url, params) {
        this.name = name;
        this.url = url;
        NUtility.extend(this, params)
    },
    spatialQuery: function (geoType, options) {
        if (options != null && options != undefined) {
            NUtility.extend(this, options)
        }
        if (geoType != null) this.geoType = geoType.toLowerCase();
        var param = "&page=" + this.page + "&maxfeatures=" + this.maxfeatures + "&version=" + this.version + "&q=" + this.qtype+ "&srs=" + this.srs;
        if (this.geoType == 'point') {
            param += "&" + this.geoType + "=" + this.coords + "," + this.buffer+"&request=spatialquery";
        } else {
            param += "&" + this.geoType + "=" + this.coords+"&request=spatialquery";
        }
        if (this.spatialQueryFilter != null && this.spatialQueryFilter != '') {
            param += "&where=" + encodeURI(this.spatialQueryFilter)
        }
        var strRequest = this.url + param;
        NCrossDomainRequest(strRequest,this.callback);
        return true
    },
    spatialStat: function (geoType, options) {
        if (options != null && options != undefined) {
            NUtility.extend(this, options)
        }
        if (geoType != null) this.geoType = geoType.toLowerCase();
        var param = "&page=" + this.page + "&method=" + this.statmethod + "&fields=" + encodeURI(this.statfield) + "&q=" + this.qtype + "&callback=" + this.callback + "&srs=" + this.srs;
        if (this.geoType == 'point') {
            param += "&" + this.geoType + "=" + this.coords + "," + this.buffer
        } else {
            param += "&" + this.geoType + "=" + this.coords
        }
        var strRequest = this.url + param;
        strRequest += "&request=stat";
        NDomainRequest(strRequest,this.callback);
        return true
    },
    query: function (options) {
        if (options != null && options != undefined) {
            NUtility.extend(this, options)
        }
        var strRequest = this.url + "&page=" + this.page + "&version=" + this.version + "&where=" + encodeURI(this.searchstring) + "&maxfeatures=" + this.maxfeatures;
        strRequest += "&request=query";
        NCrossDomainRequest(strRequest,this.callback);
        return true
    },
    _CLASS_NAME: "NQueryLayer"
});
NTMSLayer = NObject(NGridLayer, {
    type: 'NTMSLayer',
    serviceVersion: "1.0.0",
    isBaseLayer: true,
    tileOrigin: null,
    rightHandCoordinate: false,
    construct: function (name, url, options) {
        var newArguments = [];
        newArguments.push(name, url, {}, options);
        NGridLayer.prototype.construct.apply(this, newArguments)
    },
    destroy: function () {
        NGridLayer.prototype.destroy.apply(this, arguments)
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new NTMSLayer(this.name, this.url, this.options)
        }
        obj = NGridLayer.prototype.clone.apply(this, [obj]);
        return obj
    },
    getURL: function (bounds) {
        bounds = this.adjustBounds(bounds);
        var res = this.map.getResolution();
        var x = parseInt((bounds.left - this.tileOrigin.lon) / (res * this.tileSize.w));
        var y = parseInt((bounds.bottom - this.tileOrigin.lat) / (res * this.tileSize.h));
        if (!this.rightHandCoordinate) {
            y = parseInt((this.tileOrigin.lat - bounds.top) / (res * this.tileSize.h))
        }
        var z = this.map.getZoomLevel();
        this.extension = this.format.split('/')[1].toLowerCase();
        this.extension = (this.extension == 'jpeg') ? 'jpg' : this.extension;
        var path = "/" + this.layername + "/" + z + "/" + x + "/" + y + "." + this.extension;
        var url = this.url;
        if (url instanceof Array) {
            url = this.selectUrl(path, url)
        }
        return url + path
    },
    addTile: function (bounds, position) {
        return new NTile.Image(this, position, bounds, null, this.tileSize)
    },
    setMap: function (map) {
        NGridLayer.prototype.setMap.apply(this, arguments);
        if (!this.tileOrigin) {
            this.tileOrigin = new NLatLng(this.map.maxExtent.left, this.map.maxExtent.top)
        }
    },
    _CLASS_NAME: "NTMSLayer"
});
NTileCacheLayer = NObject(NGridLayer, {
    type: 'NTileCacheLayer',
    isBaseLayer: true,
    urlTag: "normal",
    defaultUrl: "",
    extentsArray: null,
    extentsLevelsArray: null,
    tileOrigin: null,
    rightHandCoordinate: false,
    format: 'image/png',
    deltaZoomLevels: -1,
    construct: function (name, url, layername, options) {
        this.layername = layername;
        NGridLayer.prototype.construct.apply(this, [name, url,
        {},
        options]);
        this.extension = this.format.split('/')[1].toLowerCase();
        this.extension = (this.extension == 'jpeg') ? 'jpg' : this.extension
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new NTileCacheLayer(this.name, this.url, this.layername, this.options)
        }
        obj = NGridLayer.prototype.clone.apply(this, [obj]);
        return obj
    },
    getURL: function (bounds) {
        var res = this.map.getResolution();
        var bbox = this.maxExtent;
        var size = this.tileSize;
        var tileX = parseInt((bounds.left - this.tileOrigin.lon) / (res * size.w));
        var tileY = parseInt((bounds.bottom - this.tileOrigin.lat) / (res * size.h));
        if (!this.rightHandCoordinate) {
            tileY = parseInt((this.tileOrigin.lat - bounds.top) / (res * size.h))
        }
        var tileZ = 0;
        if (this.deltaZoomLevels >= 0) {
            if (this.map.basicLayer != null && this.map.basicLayer._CLASS_NAME == "NTileCacheLayer") tileZ = parseInt(this.map.zoomLevel) + parseInt(this.map.basicLayer.deltaZoomLevels);
            else tileZ = parseInt(this.map.zoomLevel) + parseInt(this.deltaZoomLevels)
        } else {
            var resTagArray = new Array('0.703125', '0.3515625', '0.17578125', '0.087890625', '0.0439453125', '0.02197265625', '0.010986328125', '0.0054931640625', '0.00274658203125', '0.001373291015625', '0.0006866455078125', '0.00034332275390625', '0.000171661376953125', '0.0000858306884765625', '0.00004291534423828125', '0.00002145767211914062', '0.00001072883605957031', '0.000005364418029785155', '0.0000026822090148925775', '0.00000134110450744628875', '0.000000670552253723144375');
            for (var i = 0; i < resTagArray.length; i++) {
                if (parseFloat(resTagArray[i]) == this.map.getResolution()) {
                    tileZ = i;
                    break
                }
            }
        }
        var url = this.url;

        function zeroPad(number, length) {
            number = String(number);
            var zeros = [];
            for (var i = 0; i < length; ++i) {
                zeros.push('0')
            }
            return zeros.join('').substring(0, length - number.length) + number
        }
        if (url.toLowerCase().indexOf(".php") > -1) url = this.url + "&g=" + this.layername + "&l=" + tileZ + "&x=" + tileX + "&y=" + tileY + "&format=" + this.extension;
        else {
            var components = [this.layername, zeroPad(tileZ, 2), zeroPad(parseInt(tileX / 1000000), 3), zeroPad((parseInt(tileX / 1000) % 1000), 3), zeroPad((parseInt(tileX) % 1000), 3), zeroPad(parseInt(tileY / 1000000), 3), zeroPad((parseInt(tileY / 1000) % 1000), 3), zeroPad((parseInt(tileY) % 1000), 3) + '.' + this.extension];
            var path = components.join('/');
            if (url instanceof Array) {
                if (this.urlTag == "scale") url = this.getUrlByTileZ(tileZ);
                else if (this.urlTag == "extent") {
                    url = this.getUrlByExtent(bounds, tileZ)
                }
            }
            url = (url.charAt(url.length - 1) == '/') ? url : url + '/';
            url = url + path
        }
        return url
    },
    getUrlByExtent: function (bounds, z) {
        var url = this.url;
        if (url instanceof Array) {
            if (this.extentsLevelsArray != null && this.extentsLevelsArray.length > 0) {
                var tempuseExtent = false;
                for (var i = 0; i < this.extentsLevelsArray.length; i++) {
                    if (this.extentsLevelsArray[i] == z) {
                        tempuseExtent = true
                    }
                }
                if (tempuseExtent && this.extentsArray != null && this.extentsArray.length > 0) {
                    var tempIndex = -1;
                    for (var z = 0; z < this.extentsArray.length; z++) {
                        var tempextent = this.extentsArray[z];
                        if (tempextent.intersectsBounds(bounds, false)) {
                            tempIndex = z;
                            break
                        }
                    }
                    if (tempIndex >= 0 && url[tempIndex] != null && url[tempIndex] != '' && url[tempIndex] != undefined) return url[tempIndex];
                    else return this.defaultUrl
                } else return this.defaultUrl
            } else {
                return this.defaultUrl
            }
        } else {
            return url
        }
    },
    getUrlByTileZ: function (z) {
        var url = this.url;
        if (url instanceof Array) {
            if (url[z] != null && url[z] != '' && url[z] != undefined) return url[z];
            else return this.defaultUrl
        } else {
            return url
        }
    },
    addTile: function (bounds, position) {
        var url = this.getURL(bounds);
        return new NTile.Image(this, position, bounds, url, this.tileSize)
    },
    setMap: function (map) {
        NGridLayer.prototype.setMap.apply(this, arguments);
        if (!this.tileOrigin) {
            this.tileOrigin = new NLatLng(this.map.maxExtent.left, this.map.maxExtent.top)
        }
    },
    _CLASS_NAME: "NTileCacheLayer"
});
NWMTSLayer = NObject(NGridLayer, {
    type: "NWMTSLayer",
    isBasicLayer: true,
    version: "1.0.0",
    requestStyle: "KVP",
    url: null,
    layer: null,
    matrixSet: null,
    style: null,
    format: "image/jpeg",
    tileOrigin: null,
    tileFullExtent: null,
    extension: null,
    matrixIds: null,
    dimensions: null,
    params: null,
    zoomOffset: 0,
    formatSuffixMap: {
        "image/png": "png",
        "image/png8": "png",
        "image/png24": "png",
        "image/png32": "png",
        "png": "png",
        "image/jpeg": "jpg",
        "image/jpg": "jpg",
        "jpeg": "jpg",
        "jpg": "jpg"
    },
    nationalTilesTag: true,
    matrix: null,
    construct: function (name, url, params) {
        this.name = name;
        this.url = url;
        params.params = NUtility.upperCaseObject(params.params);
        var args = [name, url, params.params, params];
        NGridLayer.prototype.construct.apply(this, args);
        if (!this.extension) {
            this.extension = this.formatSuffixMap[this.format] || this.format.split("/").pop()
        }
        if (this.matrixIds) {
            var len = this.matrixIds.length;
            if (len && typeof this.matrixIds[0] === "string") {
                var ids = this.matrixIds;
                this.matrixIds = new Array(len);
                for (var i = 0; i < len; ++i) {
                    this.matrixIds[i] = {
                        identifier: ids[i]
                    }
                }
            }
        }
    },
    setMap: function () {
        NGridLayer.prototype.setMap.apply(this, arguments);
        this.updateMatrixProperties()
    },
    updateMatrixProperties: function () {
        this.matrix = this.getMatrix();
        if (this.matrix) {
            if (this.matrix.topLeftCorner) {
                this.tileOrigin = this.matrix.topLeftCorner
            }
            if (this.matrix.tileWidth && this.matrix.tileHeight) {
                this.tileSize = new NSize(this.matrix.tileWidth, this.matrix.tileHeight)
            }
            if (!this.tileOrigin) {
                this.tileOrigin = new NLatLng(this.maxExtent.left, this.maxExtent.top)
            }
            if (!this.tileFullExtent) {
                this.tileFullExtent = this.maxExtent
            }
        }
    },
    moveTo: function (bounds, zoomChanged, dragging) {
        if (zoomChanged || !this.matrix) {
            this.updateMatrixProperties()
        }
        return NGridLayer.prototype.moveTo.apply(this, arguments)
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new NWMTSLayer(this.name, this.url, this.options)
        }
        obj = NGridLayer.prototype.clone.apply(this, [obj]);
        return obj
    },
    getMatrix: function () {
        var matrix;
        if (!this.matrixIds || this.matrixIds.length === 0) {
            matrix = {
                identifier: this.map.getZoomLevel() + this.zoomOffset
            }
        } else {
            if ("scaleDenominator" in this.matrixIds[0]) {
                var denom = NMETERS_PER_INCH * NINCHES_PER_UNIT[this.units] * this.map.getResolution() / 0.28E-3;
                var diff = Number.POSITIVE_INFINITY;
                var delta;
                for (var i = 0, ii = this.matrixIds.length; i < ii; ++i) {
                    delta = Math.abs(1 - (this.matrixIds[i].scaleDenominator / denom));
                    if (delta < diff) {
                        diff = delta;
                        matrix = this.matrixIds[i]
                    }
                }
            } else {
                matrix = this.matrixIds[this.map.getZoomLevel() + this.zoomOffset]
            }
        }
        return matrix
    },
    getTileInfo: function (loc) {
        var res = this.map.getResolution();
        var fx = (loc.lon - this.tileOrigin.lon) / (res * this.tileSize.w);
        var fy = (this.tileOrigin.lat - loc.lat) / (res * this.tileSize.h);
        var col = Math.floor(fx);
        var row = Math.floor(fy);
        return {
            col: col,
            row: row,
            i: Math.floor((fx - col) * this.tileSize.w),
            j: Math.floor((fy - row) * this.tileSize.h)
        }
    },
    getURLByNationalTag: function (bounds) {
        var res = this.map.getResolution();
        var size = this.tileSize;
        var tileX = parseInt((bounds.left - this.tileOrigin.lon) / (res * size.w));
        var tileY = parseInt((bounds.bottom - this.tileOrigin.lat) / (res * size.h));
        if (!this.rightHandCoordinate) {
            tileY = parseInt((this.tileOrigin.lat - bounds.top) / (res * size.h))
        }
        var tileZ = this.getZByRes(res);
        var url = this.url;
        if (url.toLowerCase().indexOf(".php") > -1) {
            url = this.url + "&request=gettile" + "&TILEMATRIX=" + tileZ + "&TILECOL=" + tileX + "&TILEROW=" + tileY + "&format=" + this.extension
        } else {
            var path = tileZ + "/" + tileY + "/" + tileX + "." + this.extension;
            url = this.url;
            url = (url.charAt(url.length - 1) == '/') ? url : url + '/';
            url = url + path
        }
        return url
    },
    getZByRes: function (res) {
        var checkResArray = new Array('0.703125', '0.3515625', '0.17578125', '0.087890625', '0.0439453125', '0.02197265625', '0.010986328125', '0.0054931640625', '0.00274658203125', '0.001373291015625', '0.0006866455078125', '0.00034332275390625', '0.000171661376953125', '0.0000858306884765625', '0.00004291534423828125', '0.00002145767211914062', '0.00001072883605957031', '0.000005364418029785155', '0.0000026822090148925775', '0.00000134110450744628875', '0.000000670552253723144375');
        var tempResult = -2;
        for (var i = 0; i < checkResArray.length; i++) {
            tempResult = i;
            if (res > parseFloat(checkResArray[i])) {
                break
            }
        }
        return tempResult
    },
    getURL: function (bounds) {
        if (this.nationalTilesTag) {
            return this.getURLByNationalTag(bounds)
        }
        bounds = this.adjustBounds(bounds);
        var url = "";
        if (!this.tileFullExtent || this.tileFullExtent.intersectsBounds(bounds)) {
            var center = bounds.getCenterInLatLng();
            var info = this.getTileInfo(center);
            var matrixId = this.matrix.identifier;
            if (this.requestStyle.toUpperCase() === "REST") {
                var path = this.version + "/" + this.layer + "/" + this.style + "/";
                if (this.dimensions) {
                    for (var i = 0; i < this.dimensions.length; i++) {
                        if (this.params[this.dimensions[i]]) {
                            path = path + this.params[this.dimensions[i]] + "/"
                        }
                    }
                }
                path = path + this.matrixSet + "/" + this.matrix.identifier + "/" + info.row + "/" + info.col + "." + this.extension;
                if (this.url instanceof Array) {
                    url = this.selectUrl(path, this.url)
                } else {
                    url = this.url
                }
                if (!url.match(/\/$/)) {
                    url = url + "/"
                }
                url = url + path
            } else if (this.requestStyle.toUpperCase() === "KVP") {
                var params = {
                    SERVICE: "WMTS",
                    REQUEST: "GetTile",
                    VERSION: this.version,
                    LAYER: this.layer,
                    STYLE: this.style,
                    TILEMATRIXSET: this.matrixSet,
                    TILEMATRIX: this.matrix.identifier,
                    TILEROW: info.row,
                    TILECOL: info.col,
                    FORMAT: this.format
                };
                url = NGridLayer.prototype.getFullRequestString.apply(this, [params])
            }
        }
        return url
    },
    mergeNewParams: function (newParams) {
        if (this.requestStyle.toUpperCase() === "KVP") {
            return NGridLayer.prototype.mergeNewParams.apply(this, [NUtility.upperCaseObject(newParams)])
        }
    },
    addTile: function (bounds, position) {
        return new NTile.Image(this, position, bounds, null, this.tileSize)
    },
    _CLASS_NAME: "NWMTSLayer"
});
NGoogleLayer = NObject(NEventPaneLayer, NFixedZoomLevelsLayer, {
    type: 'NGoogleLayer',
    MIN_ZOOM_LEVEL: 0,
    MAX_ZOOM_LEVEL: 21,
    RESOLUTIONS: [1.40625, 0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625, 0.0006866455078125, 0.00034332275390625, 0.000171661376953125, 0.0000858306884765625, 0.00004291534423828125, 0.00002145767211914062, 0.00001072883605957031, 0.00000536441802978515, 0.00000268220901489257, 0.0000013411045074462891, 0.00000067055225372314453],
    type: null,
    wrapDateLine: true,
    sphericalMercator: false,
    version: null,
    construct: function (name, options) {
        options = options || {};
        if (!options.version) {
            options.version = typeof GMap2 === "function" ? "2" : "3"
        }
        var mixin = NGoogleLayer["v" + options.version.replace(/\./g, "_")];
        if (mixin) {
            NUtility.applyDefaults(options, mixin)
        } else {
            throw "Unsupported Google Maps API version: " + options.version
        }
        NUtility.applyDefaults(options, mixin.DEFAULTS);
        if (options.maxExtent) {
            options.maxExtent = options.maxExtent.clone()
        }
        NEventPaneLayer.prototype.construct.apply(this, [name, options]);
        NFixedZoomLevelsLayer.prototype.construct.apply(this, [name, options]);
        if (this.sphericalMercator) {
            NUtility.extend(this, NSphericalMercatorLayer);
            this.initMercatorParameters()
        }
    },
    clone: function () {
        return new NGoogleLayer(this.name, this.getOptions())
    },
    setVisibility: function (visible) {
        var opacity = this.opacity == null ? 1 : this.opacity;
        NEventPaneLayer.prototype.setVisibility.apply(this, arguments);
        this.setOpacity(opacity)
    },
    display: function (visible) {
        if (!this._dragging) {
            this.setGMapVisibility(visible)
        }
        NEventPaneLayer.prototype.display.apply(this, arguments)
    },
    moveTo: function (bounds, zoomChanged, dragging) {
        this._dragging = dragging;
        NEventPaneLayer.prototype.moveTo.apply(this, arguments);
        delete this._dragging
    },
    setOpacity: function (opacity) {
        if (opacity !== this.opacity) {
            if (this.map != null) {
                this.map.events.triggerEvent("changelayer", {
                    layer: this,
                    property: "opacity"
                })
            }
            this.opacity = opacity
        }
        if (this.getVisibility()) {
            var container = this.getMapContainer();
            NUtility.modifyDOMElement(container, null, null, null, null, null, null, opacity)
        }
    },
    destroy: function () {
        if (this.map) {
            this.setGMapVisibility(false);
            var cache = NGoogleLayer.cache[this.map.id];
            if (cache && cache.count <= 1) {
                this.removeGMapElements()
            }
        }
        NEventPaneLayer.prototype.destroy.apply(this, arguments)
    },
    removeGMapElements: function () {
        var cache = NGoogleLayer.cache[this.map.id];
        if (cache) {
            var container = this.mapObject && this.getMapContainer();
            if (container && container.parentNode) {
                container.parentNode.removeChild(container)
            }
            var termsOfUse = cache.termsOfUse;
            if (termsOfUse && termsOfUse.parentNode) {
                termsOfUse.parentNode.removeChild(termsOfUse)
            }
            var poweredBy = cache.poweredBy;
            if (poweredBy && poweredBy.parentNode) {
                poweredBy.parentNode.removeChild(poweredBy)
            }
        }
    },
    removeMap: function (map) {
        if (this.visibility && this.mapObject) {
            this.setGMapVisibility(false)
        }
        var cache = NGoogleLayer.cache[map.id];
        if (cache) {
            if (cache.count <= 1) {
                this.removeGMapElements();
                delete NGoogleLayer.cache[map.id]
            } else {
                --cache.count
            }
        }
        delete this.termsOfUse;
        delete this.poweredBy;
        delete this.mapObject;
        delete this.dragObject;
        NEventPaneLayer.prototype.removeMap.apply(this, arguments)
    },
    getOLBoundsFromMapObjectBounds: function (moBounds) {
        var olBounds = null;
        if (moBounds != null) {
            var sw = moBounds.getSouthWest();
            var ne = moBounds.getNorthEast();
            if (this.sphericalMercator) {
                sw = this.forwardMercator(sw.lng(), sw.lat());
                ne = this.forwardMercator(ne.lng(), ne.lat())
            } else {
                sw = new NLatLng(sw.lng(), sw.lat());
                ne = new NLatLng(ne.lng(), ne.lat())
            }
            olBounds = new NBounds(sw.lon, sw.lat, ne.lon, ne.lat)
        }
        return olBounds
    },
    getWarningHTML: function () {
        return "googleWarning"
    },
    getMapObjectCenter: function () {
        return this.mapObject.getCenter()
    },
    getMapObjectZoom: function () {
        return this.mapObject.getZoom()
    },
    getLongitudeFromMapObjectLonLat: function (moLonLat) {
        return this.sphericalMercator ? this.forwardMercator(moLonLat.lng(), moLonLat.lat()).lon : moLonLat.lng()
    },
    getLatitudeFromMapObjectLonLat: function (moLonLat) {
        var lat = this.sphericalMercator ? this.forwardMercator(moLonLat.lng(), moLonLat.lat()).lat : moLonLat.lat();
        return lat
    },
    getXFromMapObjectPixel: function (moPixel) {
        return moPixel.x
    },
    getYFromMapObjectPixel: function (moPixel) {
        return moPixel.y
    },
    _CLASS_NAME: "NGoogleLayer"
});
NGoogleLayer.cache = {};
NGoogleLayer.v2 = {
    termsOfUse: null,
    poweredBy: null,
    dragObject: null,
    loadMapObject: function () {
        if (!this.type) {
            this.type = G_NORMAL_MAP
        }
        var mapObject, termsOfUse, poweredBy;
        var cache = NGoogleLayer.cache[this.map.id];
        if (cache) {
            mapObject = cache.mapObject;
            termsOfUse = cache.termsOfUse;
            poweredBy = cache.poweredBy;
            ++cache.count
        } else {
            var container = this.map.mapViewPortDiv;
            var div = document.createElement("div");
            div.id = this.map.id + "_GMap2Container";
            div.style.position = "absolute";
            div.style.width = "100%";
            div.style.height = "100%";
            container.appendChild(div);
            try {
                mapObject = new GMap2(div);
                termsOfUse = div.lastChild;
                container.appendChild(termsOfUse);
                termsOfUse.style.zIndex = "1100";
                termsOfUse.style.right = "";
                termsOfUse.style.bottom = "";
                termsOfUse.className = "nmLayerGoogleCopyright";
                poweredBy = div.lastChild;
                container.appendChild(poweredBy);
                poweredBy.style.zIndex = "1100";
                poweredBy.style.right = "";
                poweredBy.style.bottom = "";
                poweredBy.className = "nmLayerGooglePoweredBy gmnoprint"
            } catch (e) {
                throw (e)
            }
            NGoogleLayer.cache[this.map.id] = {
                mapObject: mapObject,
                termsOfUse: termsOfUse,
                poweredBy: poweredBy,
                count: 1
            }
        }
        this.mapObject = mapObject;
        this.termsOfUse = termsOfUse;
        this.poweredBy = poweredBy;
        if (NUtility.indexOf(this.mapObject.getMapTypes(), this.type) === -1) {
            this.mapObject.addMapType(this.type)
        }
        if (typeof mapObject.getDragObject == "function") {
            this.dragObject = mapObject.getDragObject()
        } else {
            this.dragPanMapObject = null
        }
        if (this.isBaseLayer === false) {
            this.setGMapVisibility(this.div.style.display !== "none")
        }
    },
    onMapResize: function () {
        if (this.visibility && this.mapObject.isLoaded()) {
            this.mapObject.checkResize()
        } else {
            if (!this._resized) {
                var layer = this;
                var handle = GEvent.addListener(this.mapObject, "load", function () {
                    GEvent.removeListener(handle);
                    delete layer._resized;
                    layer.mapObject.checkResize();
                    layer.moveTo(layer.map.getCenter(), layer.map.getZoom())
                })
            }
            this._resized = true
        }
    },
    setGMapVisibility: function (visible) {
        var cache = NGoogleLayer.cache[this.map.id];
        if (cache) {
            var container = this.mapObject.getContainer();
            if (visible === true) {
                this.mapObject.setMapType(this.type);
                container.style.display = "";
                this.termsOfUse.style.left = "";
                this.termsOfUse.style.display = "";
                this.poweredBy.style.display = "";
                cache.displayed = this.id
            } else {
                if (cache.displayed === this.id) {
                    delete cache.displayed
                }
                if (!cache.displayed) {
                    container.style.display = "none";
                    this.termsOfUse.style.display = "none";
                    this.termsOfUse.style.left = "-9999px";
                    this.poweredBy.style.display = "none"
                }
            }
        }
    },
    getMapContainer: function () {
        return this.mapObject.getContainer()
    },
    getMapObjectBoundsFromOLBounds: function (olBounds) {
        var moBounds = null;
        if (olBounds != null) {
            var sw = this.sphericalMercator ? this.inverseMercator(olBounds.bottom, olBounds.left) : new NLatLng(olBounds.bottom, olBounds.left);
            var ne = this.sphericalMercator ? this.inverseMercator(olBounds.top, olBounds.right) : new OpenLayers.LonLat(olBounds.top, olBounds.right);
            moBounds = new GLatLngBounds(new GLatLng(sw.lat, sw.lon), new GLatLng(ne.lat, ne.lon))
        }
        return moBounds
    },
    setMapObjectCenter: function (center, zoom) {
        this.mapObject.setCenter(center, zoom)
    },
    dragPanMapObject: function (dX, dY) {
        this.dragObject.moveBy(new GSize(-dX, dY))
    },
    getMapObjectLonLatFromMapObjectPixel: function (moPixel) {
        return this.mapObject.fromContainerPixelToLatLng(moPixel)
    },
    getMapObjectPixelFromMapObjectLonLat: function (moLonLat) {
        return this.mapObject.fromLatLngToContainerPixel(moLonLat)
    },
    getMapObjectZoomFromMapObjectBounds: function (moBounds) {
        return this.mapObject.getBoundsZoomLevel(moBounds)
    },
    getMapObjectLonLatFromLonLat: function (lon, lat) {
        var gLatLng;
        if (this.sphericalMercator) {
            var lonlat = this.inverseMercator(lon, lat);
            gLatLng = new GLatLng(lonlat.lat, lonlat.lon)
        } else {
            gLatLng = new GLatLng(lat, lon)
        }
        return gLatLng
    },
    getMapObjectPixelFromXY: function (x, y) {
        return new GPoint(x, y)
    }
};
NYahooLayer = NObject(NEventPaneLayer, NFixedZoomLevelsLayer, {
    MIN_ZOOM_LEVEL: 0,
    MAX_ZOOM_LEVEL: 17,
    RESOLUTIONS: [1.40625, 0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625, 0.0006866455078125, 0.00034332275390625, 0.000171661376953125, 0.0000858306884765625, 0.00004291534423828125, 0.00002145767211914062, 0.00001072883605957031],
    type: null,
    wrapDateLine: true,
    sphericalMercator: false,
    construct: function (name, options) {
        NEventPaneLayer.prototype.construct.apply(this, arguments);
        NFixedZoomLevelsLayer.prototype.construct.apply(this, arguments);
        if (this.sphericalMercator) {
            NUtility.extend(this, NSphericalMercatorLayer);
            this.initMercatorParameters()
        }
    },
    loadMapObject: function () {
        try {
            var size = this.getMapObjectSizeFromnmSize(this.map.getSize());
            this.mapObject = new YMap(this.div, this.type, size);
            this.mapObject.disableKeyControls();
            this.mapObject.disableDragMap();
            if (!this.mapObject.moveByXY || (typeof this.mapObject.moveByXY != "function")) {
                this.dragPanMapObject = null
            }
        } catch (e) {}
    },
    onMapResize: function () {
        try {
            var size = this.getMapObjectSizeFromnmSize(this.map.getSize());
            this.mapObject.resizeTo(size)
        } catch (e) {}
    },
    setMap: function (map) {
        NEventPaneLayer.prototype.setMap.apply(this, arguments);
        this.map.events.addListener("moveend", this, this.fixYahooEventPane)
    },
    fixYahooEventPane: function () {
        var yahooEventPane = NUtility.getElement("ygddfdiv");
        if (yahooEventPane != null) {
            if (yahooEventPane.parentNode != null) {
                yahooEventPane.parentNode.removeChild(yahooEventPane)
            }
            this.map.events.unregister("moveend", this, this.fixYahooEventPane)
        }
    },
    getWarningHTML: function () {
        return "getYahooLayerWarning"
    },
    getOLZoomFromMapObjectZoom: function (moZoom) {
        var zoom = null;
        if (moZoom != null) {
            zoom = NFixedZoomLevelsLayer.prototype.getOLZoomFromMapObjectZoom.apply(this, [moZoom]);
            zoom = 18 - zoom
        }
        return zoom
    },
    getMapObjectZoomFromOLZoom: function (olZoom) {
        var zoom = null;
        if (olZoom != null) {
            zoom = NFixedZoomLevelsLayer.prototype.getMapObjectZoomFromOLZoom.apply(this, [olZoom]);
            zoom = 18 - zoom
        }
        return zoom
    },
    setMapObjectCenter: function (center, zoom) {
        this.mapObject.drawZoomAndCenter(center, zoom)
    },
    getMapObjectCenter: function () {
        return this.mapObject.getCenterLatLon()
    },
    dragPanMapObject: function (dX, dY) {
        this.mapObject.moveByXY({
            'x': -dX,
            'y': dY
        })
    },
    getMapObjectZoom: function () {
        return this.mapObject.getZoomLevel()
    },
    getMapObjectLonLatFromMapObjectPixel: function (moPixel) {
        return this.mapObject.convertXYLatLon(moPixel)
    },
    getMapObjectPixelFromMapObjectLonLat: function (moLonLat) {
        return this.mapObject.convertLatLonXY(moLonLat)
    },
    getLongitudeFromMapObjectLonLat: function (moLonLat) {
        return this.sphericalMercator ? this.forwardMercator(moLonLat.Lon, moLonLat.Lat).lon : moLonLat.Lon
    },
    getLatitudeFromMapObjectLonLat: function (moLonLat) {
        return this.sphericalMercator ? this.forwardMercator(moLonLat.Lon, moLonLat.Lat).lat : moLonLat.Lat
    },
    getMapObjectLonLatFromLonLat: function (lon, lat) {
        var yLatLong;
        if (this.sphericalMercator) {
            var lonlat = this.inverseMercator(lon, lat);
            yLatLong = new YGeoPoint(lonlat.lat, lonlat.lon)
        } else {
            yLatLong = new YGeoPoint(lat, lon)
        }
        return yLatLong
    },
    getXFromMapObjectPixel: function (moPixel) {
        return moPixel.x
    },
    getYFromMapObjectPixel: function (moPixel) {
        return moPixel.y
    },
    getMapObjectPixelFromXY: function (x, y) {
        return new YCoordPoint(x, y)
    },
    getMapObjectSizeFromnmSize: function (olSize) {
        return new YSize(olSize.w, olSize.h)
    },
    _CLASS_NAME: "NYahooLayer"
});
NArcGIS93RestLayer = NObject(NGridLayer, {
    DEFAULT_PARAMS: {
        format: "png"
    },
    isBaseLayer: true,
    construct: function (name, url, params, options) {
        var newArguments = [];
        params = NUtility.upperCaseObject(params);
        newArguments.push(name, url, params, options);
        NGridLayer.prototype.construct.apply(this, newArguments);
        NUtility.applyDefaults(this.params, NUtility.upperCaseObject(this.DEFAULT_PARAMS));
        if (this.params.TRANSPARENT && this.params.TRANSPARENT.toString().toLowerCase() == "true") {
            if ((options == null) || (!options.isBaseLayer)) {
                this.isBaseLayer = false
            }
            if (this.params.FORMAT == "jpg") {
                this.params.FORMAT = NUtility.alphaHack() ? "gif" : "png"
            }
        }
    },
    dispose: function () {
        NGridLayer.prototype.dispose.apply(this, arguments)
    },
    clone: function (obj) {
        if (obj == null) {
            obj = NArcGIS93RestLayer(this.name, this.url, this.params, this.getOptions())
        }
        obj = NGridLayer.prototype.clone.apply(this, [obj]);
        return obj
    },
    getURL: function (bounds) {
        bounds = this.adjustBounds(bounds);
        var projWords = this.projection.getCode().split(":");
        var srid = projWords[projWords.length - 1];
        var imageSize = this.getImageSize();
        var newParams = {
            'BBOX': bounds.toBBOX(),
            'SIZE': imageSize.w + "," + imageSize.h,
            'F': "image",
            'BBOXSR': srid,
            'IMAGESR': srid
        };
        if (this.layerDefs) {
            var layerDefStrList = [];
            var layerID;
            for (layerID in this.layerDefs) {
                if (this.layerDefs.hasOwnProperty(layerID)) {
                    if (this.layerDefs[layerID]) {
                        layerDefStrList.push(layerID);
                        layerDefStrList.push(":");
                        layerDefStrList.push(this.layerDefs[layerID]);
                        layerDefStrList.push(";")
                    }
                }
            }
            if (layerDefStrList.length > 0) {
                newParams['LAYERDEFS'] = layerDefStrList.join("")
            }
        }
        var requestString = this.getFullRequestString(newParams);
        return requestString
    },
    setLayerFilter: function (id, queryDef) {
        if (!this.layerDefs) {
            this.layerDefs = {}
        }
        if (queryDef) {
            this.layerDefs[id] = queryDef
        } else {
            delete this.layerDefs[id]
        }
    },
    clearLayerFilter: function (id) {
        if (id) {
            delete this.layerDefs[id]
        } else {
            delete this.layerDefs
        }
    },
    mergeNewParams: function (newParams) {
        var upperParams = NUtility.upperCaseObject(newParams);
        var newArguments = [upperParams];
        return NGridLayer.prototype.mergeNewParams.apply(this, newArguments)
    },
    addTile: function (bounds, position) {
        return new NTile.Image(this, position, bounds, null, this.tileSize)
    },
    _CLASS_NAME: "NArcGIS93RestLayer"
});
NOSMBaseLayer = NObject(NGridLayer, {
    isBaseLayer: true,
    sphericalMercator: false,
    zoomOffset: 0,
    construct: function (name, url, options) {
        if (options && options.sphericalMercator || this.sphericalMercator) {
            options = NUtility.extend({
                maxExtent: new NBounds(-128 * 156543.0339, -128 * 156543.0339, 128 * 156543.0339, 128 * 156543.0339),
                maxResolution: 156543.0339,
                numZoomLevels: 19,
                units: "m",
                projection: "EPSG:900913"
            }, options)
        }
        url = url || this.url;
        name = name || this.name;
        var newArguments = [name, url,
        {},
        options];
        NGridLayer.prototype.construct.apply(this, newArguments)
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new NOSMBaseLayer(this.name, this.url, this.getOptions())
        }
        obj = NGridLayer.prototype.clone.apply(this, [obj]);
        return obj
    },
    getURL: function (bounds) {
        var res = this.map.getResolution();
        var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
        var y = Math.round((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
        var z = this.map.getZoomLevel() + this.zoomOffset;
        var url = this.url;
        var s = '' + x + y + z;
        if (url instanceof Array) {
            url = this.selectUrl(s, url)
        }
        var path = NString.format(url, {
            'x': x,
            'y': y,
            'z': z
        });
        return path
    },
    addTile: function (bounds, position) {
        return new NTile.Image(this, position, bounds, null, this.tileSize)
    },
    setMap: function (map) {
        NGridLayer.prototype.setMap.apply(this, arguments);
        if (!this.tileOrigin) {
            this.tileOrigin = new NLatLng(this.maxExtent.left, this.maxExtent.bottom)
        }
    },
    CLASS_NAME: "NOSMBaseLayer"
});
NOSMLayer = NObject(NOSMBaseLayer, {
    name: "OpenStreetMap",
    attribution: "Data CC-By-SA by <a href='http://openstreetmap.org/'>OpenStreetMap</a>",
    sphericalMercator: true,
    url: 'http://tile.openstreetmap.org/${z}/${x}/${y}.png',
    clone: function (obj) {
        if (obj == null) {
            obj = new NOSMLayer(this.name, this.url, this.getOptions())
        }
        obj = NOSMBaseLayer.prototype.clone.apply(this, [obj]);
        return obj
    },
    type: "NOSMLayer",
    _CLASS_NAME: "NOSMLayer"
});
NGoogleLayer.v3 = {
    DEFAULTS: {
        maxExtent: new NBounds(-128 * 156543.0339, -128 * 156543.0339, 128 * 156543.0339, 128 * 156543.0339),
        sphericalMercator: true,
        maxResolution: 156543.0339,
        units: "m",
        projection: "EPSG:900913"
    },
    loadMapObject: function () {
        if (!this.type) {
            this.type = google.maps.MapTypeId.ROADMAP
        }
        var mapObject;
        var cache = NGoogleLayer.cache[this.map.id];
        if (cache) {
            mapObject = cache.mapObject;
            ++cache.count
        } else {
            var container = this.map.viewPortDiv;
            var div = document.createElement("div");
            div.id = this.map.id + "_GMapContainer";
            div.style.position = "absolute";
            div.style.width = "100%";
            div.style.height = "100%";
            container.appendChild(div);
            var center = this.map.getCenter();
            mapObject = new google.maps.Map(div, {
                center: center ? new google.maps.LatLng(center.lat, center.lon) : new google.maps.LatLng(0, 0),
                zoom: this.map.getZoom() || 0,
                mapTypeId: this.type,
                disableDefaultUI: true,
                keyboardShortcuts: false,
                draggable: false,
                disableDoubleClickZoom: true,
                scrollwheel: false
            });
            cache = {
                mapObject: mapObject,
                count: 1
            };
            NGoogleLayer.cache[this.map.id] = cache;
            this.repositionListener = google.maps.event.addListenerOnce(mapObject, "center_changed", NFunction.bind(this.repositionMapElements, this))
        }
        this.mapObject = mapObject;
        this.setGMapVisibility(this.visibility)
    },
    repositionMapElements: function () {
        google.maps.event.trigger(this.mapObject, "resize");
        var div = this.mapObject.getDiv().firstChild;
        if (!div || div.childNodes.length < 3) {
            this.repositionTimer = window.setTimeout(NFunction.bind(this.repositionMapElements, this), 250);
            return false
        }
        var cache = NGoogleLayer.cache[this.map.id];
        var container = this.map.viewPortDiv;
        var termsOfUse = div.lastChild;
        container.appendChild(termsOfUse);
        termsOfUse.style.zIndex = "1100";
        termsOfUse.style.bottom = "";
        termsOfUse.className = "nmLayerGoogleCopyright nmLayerGoogleV3";
        termsOfUse.style.display = "";
        cache.termsOfUse = termsOfUse;
        var poweredBy = div.lastChild;
        container.appendChild(poweredBy);
        poweredBy.style.zIndex = "1100";
        poweredBy.style.bottom = "";
        poweredBy.className = "nmLayerGooglePoweredBy nmLayerGoogleV3 gmnoprint";
        poweredBy.style.display = "";
        cache.poweredBy = poweredBy;
        this.setGMapVisibility(this.visibility)
    },
    onMapResize: function () {
        if (this.visibility) {
            google.maps.event.trigger(this.mapObject, "resize")
        } else {
            if (!this._resized) {
                var layer = this;
                google.maps.event.addListenerOnce(this.mapObject, "tilesloaded", function () {
                    delete layer._resized;
                    google.maps.event.trigger(layer.mapObject, "resize");
                    layer.moveTo(layer.map.getCenter(), layer.map.getZoom())
                })
            }
            this._resized = true
        }
    },
    setGMapVisibility: function (visible) {
        var cache = NGoogleLayer.cache[this.map.id];
        if (cache) {
            var type = this.type;
            var layers = this.map.layers;
            var layer;
            for (var i = layers.length - 1; i >= 0; --i) {
                layer = layers[i];
                if (layer instanceof NGoogleLayer && layer.visibility === true && layer.inRange === true) {
                    type = layer.type;
                    visible = true;
                    break
                }
            }
            var container = this.mapObject.getDiv();
            if (visible === true) {
                this.mapObject.setMapTypeId(type);
                container.style.left = "";
                if (cache.termsOfUse && cache.termsOfUse.style) {
                    cache.termsOfUse.style.left = "";
                    cache.termsOfUse.style.display = "";
                    cache.poweredBy.style.display = ""
                }
                cache.displayed = this.id
            } else {
                delete cache.displayed;
                container.style.left = "-9999px";
                if (cache.termsOfUse && cache.termsOfUse.style) {
                    cache.termsOfUse.style.display = "none";
                    cache.termsOfUse.style.left = "-9999px";
                    cache.poweredBy.style.display = "none"
                }
            }
        }
    },
    getMapContainer: function () {
        return this.mapObject.getDiv()
    },
    getMapObjectBoundsFromOLBounds: function (olBounds) {
        var moBounds = null;
        if (olBounds != null) {
            var sw = this.sphericalMercator ? this.inverseMercator(olBounds.bottom, olBounds.left) : new NLatLng(olBounds.bottom, olBounds.left);
            var ne = this.sphericalMercator ? this.inverseMercator(olBounds.top, olBounds.right) : new NLatLng(olBounds.top, olBounds.right);
            moBounds = new google.maps.LatLngBounds(new google.maps.LatLng(sw.lat, sw.lon), new google.maps.LatLng(ne.lat, ne.lon))
        }
        return moBounds
    },
    getMapObjectLonLatFromMapObjectPixel: function (moPixel) {
        var size = this.map.getSize();
        var lon = this.getLongitudeFromMapObjectLonLat(this.mapObject.center);
        var lat = this.getLatitudeFromMapObjectLonLat(this.mapObject.center);
        var res = this.map.getResolution();
        var delta_x = moPixel.x - (size.w / 2);
        var delta_y = moPixel.y - (size.h / 2);
        var lonlat = new NLatLng(lon + delta_x * res, lat - delta_y * res);
        if (this.wrapDateLine) {
            lonlat = lonlat.wrapDateLine(this.maxExtent)
        }
        return this.getMapObjectLonLatFromLonLat(lonlat.lon, lonlat.lat)
    },
    getMapObjectPixelFromMapObjectLonLat: function (moLonLat) {
        var lon = this.getLongitudeFromMapObjectLonLat(moLonLat);
        var lat = this.getLatitudeFromMapObjectLonLat(moLonLat);
        var res = this.map.getResolution();
        var extent = this.map.getExtent();
        var px = new NPixel((1 / res * (lon - extent.left)), (1 / res * (extent.top - lat)));
        return this.getMapObjectPixelFromXY(px.x, px.y)
    },
    setMapObjectCenter: function (center, zoom) {
        this.mapObject.setOptions({
            center: center,
            zoom: zoom
        })
    },
    getMapObjectZoomFromMapObjectBounds: function (moBounds) {
        return this.mapObject.getBoundsZoomLevel(moBounds)
    },
    getMapObjectLonLatFromLonLat: function (lon, lat) {
        var gLatLng;
        if (this.sphericalMercator) {
            var lonlat = this.inverseMercator(lon, lat);
            gLatLng = new google.maps.LatLng(lonlat.lat, lonlat.lon)
        } else {
            gLatLng = new google.maps.LatLng(lat, lon)
        }
        return gLatLng
    },
    getMapObjectPixelFromXY: function (x, y) {
        return new google.maps.Point(x, y)
    },
    destroy: function () {
        if (this.repositionListener) {
            google.maps.event.removeListener(this.repositionListener)
        }
        if (this.repositionTimer) {
            window.clearTimeout(this.repositionTimer)
        }
        NGoogleLayer.prototype.destroy.apply(this, arguments)
    }
};
NSpaceEyeLayer = NObject(NGridLayer, {
    type: 'NSpaceEyeLayer',
    uuid: "",
    isBaseLayer: true,
    format: 'image/png',
    construct: function (name, url, options) {
        var newArguments = [];
        newArguments.push(name, url, {}, options);
        NGridLayer.prototype.construct.apply(this, newArguments)
    },
    destroy: function () {
        NGridLayer.prototype.destroy.apply(this, arguments)
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new NSpaceEyeLayer(this.name, this.url, this.options)
        }
        obj = NGridLayer.prototype.clone.apply(this, [obj]);
        return obj
    },
    getURL: function (bounds) {
        bounds = this.adjustBounds(bounds);
        var res = this.map.getResolution();
        var lng = Math.round((bounds.left + bounds.left) / 2);
        var lat = Math.round((bounds.bottom + bounds.top) / 2);
        var zoom = this.map.getZoomLevel();
        var EarthRadius = 6378137;
        var MinLatitude = -85.05112878;
        var MaxLatitude = 85.05112878;
        var MinLongitude = -180;
        var MaxLongitude = 180;
        var latitude = Math.min(Math.max(lat, MinLatitude), MaxLatitude);
        var longitude = Math.min(Math.max(lng, MinLongitude), MaxLongitude);
        var x = (longitude + 180) / 360;
        var sinLatitude = Math.sin(latitude * Math.PI / 180);
        var y = 0.5 - Math.log((1 + sinLatitude) / (1 - sinLatitude)) / (4 * Math.PI);
        var mapSize = this.tileSize;
        var x = Math.min(Math.max(x * mapSize * Math.pow(2, zoom) + 0.5, 0), mapSize * Math.pow(2, zoom) - 1);
        var y = Math.min(Math.max(y * mapSize * Math.pow(2, zoom) + 0.5, 0), mapSize * Math.pow(2, zoom) - 1);
        x = Math.floor(x / 256);
        y = Math.floor(y / 256);
        var path = "uuid=" + this.uuid + "&type=" + this.layername + "&lev=" + zoom + "&x=" + x + "&y=" + y;
        var url = this.url;
        if (url instanceof Array) {
            url = this.selectUrl(path, url)
        }
        return url + path
    },
    addTile: function (bounds, position) {
        return new NTile.Image(this, position, bounds, null, this.tileSize)
    },
    setMap: function (map) {
        NGridLayer.prototype.setMap.apply(this, arguments)
    },
    _CLASS_NAME: "NSpaceEyeLayer"
});
NSpaceEye2Layer = NObject(NGridLayer, {
    type: 'NSpaceEye2Layer',
    isBaseLayer: true,
    tileOrigin: null,
    rightHandCoordinate: false,
    diskCache: true,
    deltaZoomLevels: 1,
    format: 'image/png',
    uuid: '',
    size: 256,
    construct: function (name, url, layername, options) {
        this.layername = layername;
        NGridLayer.prototype.construct.apply(this, [name, url,
        {},
        options]);
        this.extension = this.format.split('/')[1].toLowerCase();
        this.extension = (this.extension == 'jpeg') ? 'jpg' : this.extension
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new NSpaceEye2Layer(this.name, this.url, this.layername, this.options)
        }
        obj = NGridLayer.prototype.clone.apply(this, [obj]);
        return obj
    },
    getURL: function (bounds) {
        var res = this.map.getResolution();
        var size = this.size;
        var lng = bounds.left;
        var lat = bounds.top;
        var zoom = parseInt(this.map.zoomLevel) + parseInt(this.deltaZoomLevels);
        var span = size * res;
        var bx = parseInt((lng - this.tileOrigin.lon) / span);
        var by = parseInt((lat - this.tileOrigin.lat) / span);
        if (!this.rightHandCoordinate) {
            by = parseInt((this.tileOrigin.lat - lat) / span)
        }
        if (this.diskCache) {
            var nGrade = Math.ceil((zoom - 3) / 4);
            var nPreRow = 0,
                nPreCol = 0,
                nPreSize = 0;
            var path = "";
            for (var i = 0; i < nGrade; i++) {
                var nSize = 1 << (4 * (nGrade - i));
                var nRow = parseInt((bx - nPreRow * nPreSize) / nSize);
                var nCol = parseInt((by - nPreCol * nPreSize) / nSize);
                path += ((nRow > 9) ? nRow : "0" + nRow) + "" + ((nCol > 9) ? nCol : "0" + nCol) + "/";
                nPreRow = nRow;
                nPreCol = nCol;
                nPreSize = nSize
            }
            var id = (((bx) & ((1 << 20) - 1)) + (((by) & ((1 << 20) - 1)) * Math.pow(2, 20)) + (((zoom) & ((1 << 8) - 1)) * Math.pow(2, 40)));
            path = zoom + "/" + path + id + ".png";
            var url = this.url;
            if (url instanceof Array) {
                url = this.selectUrl(path, url)
            }
            url = (url.charAt(url.length - 1) == '/') ? url : url + '/';
            return url + this.layername + '/' + path
        } else {
            var path = "type=" + this.layername + "&lev=" + zoom + "&x=" + bx + "&y=" + by;
            if (this.url.indexOf("type=") > 0) {
                path = "&lev=" + zoom + "&x=" + bx + "&y=" + by
            }
            var url = this.url;
            if (url instanceof Array) {
                url = this.selectUrl(path, url)
            }
            return url + path
        }
    },
    addTile: function (bounds, position) {
        var url = this.getURL(bounds);
        return new NTile.Image(this, position, bounds, url, this.tileSize)
    },
    setMap: function (map) {
        NGridLayer.prototype.setMap.apply(this, arguments);
        if (!this.tileOrigin) {
            this.tileOrigin = new NLatLng(this.map.maxExtent.left, this.map.maxExtent.top)
        }
    },
    _CLASS_NAME: "NSpaceEye2Layer"
});
NAnchoredDialog = NObject(NDialog, {
    relativePosition: null,
    anchor: null,
    construct: function (id, latlng, contentSize, contentHTML, anchor, closeBox, closeBoxCallback) {
        var newArguments = [id, latlng, contentSize, contentHTML, closeBox, closeBoxCallback];
        NDialog.prototype.construct.apply(this, newArguments);
        this.anchor = (anchor != null) ? anchor : {
            size: new NSize(0, 0),
            offset: new NPixel(0, 0)
        }
    },
    dispose: function () {
        this.anchor = null;
        this.relativePosition = null;
        NDialog.prototype.dispose.apply(this, arguments)
    },
    show: function () {
        this.updatePosition();
        NDialog.prototype.show.apply(this, arguments)
    },
    moveTo: function (px) {
        var oldRelativePosition = this.relativePosition;
        this.relativePosition = this.getRelativePosition(px);
        var newPx = this.getNewPosInPixel(px);
        var newArguments = new Array(newPx);
        NDialog.prototype.moveTo.apply(this, newArguments);
        if (this.relativePosition != oldRelativePosition) {
            this.update()
        }
    },
    setSize: function (contentSize) {
        NDialog.prototype.setSize.apply(this, arguments);
        if ((this.latlng) && (this.map)) {
            var px = this.map.worldToLayerPx(this.latlng);
            this.moveTo(px)
        }
    },
    getRelativePosition: function (px) {
        var latlng = this.map.layerPxToWorld(px);
        var extent = this.map.getExtent();
        var quadrant = extent.getQuadrant(latlng);
        return NBounds.oppositeQuadrant(quadrant)
    },
    update: function () {},
    getNewPosInPixel: function (px) {
        var newPx = px.offset(this.anchor.offset);
        var size = this.size || this.contentSize;
        var top = (this.relativePosition.charAt(0) == 't');
        newPx.y += (top) ? -size.h : this.anchor.size.h;
        var left = (this.relativePosition.charAt(1) == 'l');
        newPx.x += (left) ? -size.w : this.anchor.size.w;
        return newPx
    },
    _CLASS_NAME: "NAnchoredDialog"
});
NBubbleDialog = NObject(NAnchoredDialog, {
    rounded: false,
    construct: function (id, latlng, contentSize, contentHTML, anchor, closeBox, closeBoxCallback) {
        this.padding = new NBounds(0, NBubbleDialog.CORNER_SIZE, 0, NBubbleDialog.CORNER_SIZE);
        NAnchoredDialog.prototype.construct.apply(this, arguments)
    },
    draw: function (px) {
        NAnchoredDialog.prototype.draw.apply(this, arguments);
        this.setContentHTML();
        this.setBackgroundColor();
        this.setOpacity();
        return this.div
    },
    update: function () {
        this._setRicoCorners()
    },
    setSize: function (contentSize) {
        NAnchoredDialog.prototype.setSize.apply(this, arguments);
        this._setRicoCorners()
    },
    setBackgroundColor: function (color) {
        if (color != undefined) {
            this.backgroundColor = color
        }
        if (this.div != null) {
            if (this.contentDiv != null) {
                this.div.style.background = "transparent";
                NRico.Corner.changeColor(this.groupDiv, this.backgroundColor)
            }
        }
    },
    setOpacity: function (opacity) {
        NAnchoredDialog.prototype.setOpacity.call(this, opacity);
        if (this.div != null) {
            if (this.groupDiv != null) {
                NRico.Corner.changeOpacity(this.groupDiv, this.opacity)
            }
        }
    },
    setBorder: function (border) {
        this.border = 0
    },
    _setRicoCorners: function () {
        var corners = this._getCornersToRound(this.relativePosition);
        var options = {
            corners: corners,
            color: this.backgroundColor,
            bgColor: "transparent",
            blend: false
        };
        if (!this.rounded) {
            NRico.Corner.round(this.div, options);
            this.rounded = true
        } else {
            NRico.Corner.reRound(this.groupDiv, options);
            this.setBackgroundColor();
            this.setOpacity()
        }
    },
    _getCornersToRound: function () {
        var corners = ['tl', 'tr', 'bl', 'br'];
        var corner = NBounds.oppositeQuadrant(this.relativePosition);
        NUtility.removeItem(corners, corner);
        return corners.join(" ")
    },
    _CLASS_NAME: "NBubbleDialog"
});
NBubbleDialog.CORNER_SIZE = 5;
NFramedDialog = NObject(NAnchoredDialog, {
    imageSrc: null,
    imageSize: null,
    AlphaImage: false,
    positionBlocks: null,
    blocks: null,
    relativeFixed: false,
    construct: function (id, latlng, contentSize, contentHTML, anchor, closeBox, closeBoxCallback) {
        NAnchoredDialog.prototype.construct.apply(this, arguments);
        if (this.relativeFixed) {
            this.update();
            this.getRelativePosition = function (px) {
                return this.relativePosition
            }
        }
        this.contentDiv.style.position = "absolute";
        this.contentDiv.style.zIndex = 1;
        if (closeBox) {
            this.closeDiv.style.zIndex = 1
        }
        this.groupDiv.style.position = "absolute";
        this.groupDiv.style.top = "0px";
        this.groupDiv.style.left = "0px";
        this.groupDiv.style.height = "100%";
        this.groupDiv.style.width = "100%"
    },
    dispose: function () {
        this.imageSrc = null;
        this.imageSize = null;
        this.AlphaImage = null;
        this.relativeFixed = false;
        this.positionBlocks = null;
        for (var i = 0; i < this.blocks.length; i++) {
            var block = this.blocks[i];
            if (block.image) {
                block.div.removeChild(block.image)
            }
            block.image = null;
            if (block.div) {
                this.groupDiv.removeChild(block.div)
            }
            block.div = null
        }
        this.blocks = null;
        NAnchoredDialog.prototype.dispose.apply(this, arguments)
    },
    setBackgroundColor: function (color) {},
    setBorder: function () {},
    setOpacity: function (opacity) {},
    setSize: function (contentSize) {
        NAnchoredDialog.prototype.setSize.apply(this, arguments);
        this.updateBlocks()
    },
    update: function () {
        this.padding = this.positionBlocks[this.relativePosition].padding;
        if (this.closeDiv) {
            var contentDivPadding = this.getContentDivPadding();
            this.closeDiv.style.right = contentDivPadding.right + this.padding.right + "px";
            this.closeDiv.style.top = contentDivPadding.top + this.padding.top + "px"
        }
        this.updateBlocks()
    },
    getNewPosInPixel: function (px) {
        var newPx = NAnchoredDialog.prototype.getNewPosInPixel.apply(this, arguments);
        newPx = newPx.offset(this.positionBlocks[this.relativePosition].offset);
        return newPx
    },
    createBlocks: function () {
        this.blocks = [];
        var firstPosition = null;
        for (var key in this.positionBlocks) {
            firstPosition = key;
            break
        }
        var position = this.positionBlocks[firstPosition];
        for (var i = 0; i < position.blocks.length; i++) {
            var block = {};
            this.blocks.push(block);
            var divId = this.id + '_FrameDecorationDiv_' + i;
            block.div = NUtility.createDiv(divId, null, null, null, "absolute", null, "hidden", null);
            var imgId = this.id + '_FrameDecorationImg_' + i;
            var imageCreator = (this.AlphaImage) ? NUtility.createAlphaImageDiv : NUtility.createImage;
            block.image = imageCreator(imgId, null, this.imageSize, this.imageSrc, "absolute", null, null, null);
            block.div.appendChild(block.image);
            this.groupDiv.appendChild(block.div)
        }
    },
    updateBlocks: function () {
        if (!this.blocks) {
            this.createBlocks()
        }
        if (this.size && this.relativePosition) {
            var position = this.positionBlocks[this.relativePosition];
            for (var i = 0; i < position.blocks.length; i++) {
                var positionBlock = position.blocks[i];
                var block = this.blocks[i];
                var l = positionBlock.anchor.left;
                var b = positionBlock.anchor.bottom;
                var r = positionBlock.anchor.right;
                var t = positionBlock.anchor.top;
                var w = (isNaN(positionBlock.size.w)) ? this.size.w - (r + l) : positionBlock.size.w;
                var h = (isNaN(positionBlock.size.h)) ? this.size.h - (b + t) : positionBlock.size.h;
                block.div.style.width = w + 'px';
                block.div.style.height = h + 'px';
                block.div.style.left = (l != null) ? l + 'px' : '';
                block.div.style.bottom = (b != null) ? b + 'px' : '';
                block.div.style.right = (r != null) ? r + 'px' : '';
                block.div.style.top = (t != null) ? t + 'px' : '';
                block.image.style.left = positionBlock.position.x + 'px';
                block.image.style.top = positionBlock.position.y + 'px'
            }
            this.contentDiv.style.left = this.padding.left + "px";
            this.contentDiv.style.top = this.padding.top + "px"
        }
    },
    _CLASS_NAME: "NFramedDialog"
});
NCloudDialog = NObject(NFramedDialog, {
    contentDivClass: "nmCloudDialogContent",
    autoSize: true,
    alwaysInView: true,
    imageSize: new NSize(676, 736),
    AlphaImage: false,
    relativeFixed: false,
    positionBlocks: {
        "tl": {
            'offset': new NPixel(44, 0),
            'padding': new NBounds(8, 40, 8, 9),
            'blocks': [{
                size: new NSize('auto', 'auto'),
                anchor: new NBounds(0, 51, 22, 0),
                position: new NPixel(0, 0)
            }, {
                size: new NSize(22, 'auto'),
                anchor: new NBounds(null, 50, 0, 0),
                position: new NPixel(-638, 0)
            }, {
                size: new NSize('auto', 21),
                anchor: new NBounds(0, 32, 80, null),
                position: new NPixel(0, -629)
            }, {
                size: new NSize(22, 21),
                anchor: new NBounds(null, 32, 0, null),
                position: new NPixel(-638, -629)
            }, {
                size: new NSize(81, 54),
                anchor: new NBounds(null, 0, 0, null),
                position: new NPixel(0, -668)
            }]
        },
        "tr": {
            'offset': new NPixel(-45, 0),
            'padding': new NBounds(8, 40, 8, 9),
            'blocks': [{
                size: new NSize('auto', 'auto'),
                anchor: new NBounds(0, 51, 22, 0),
                position: new NPixel(0, 0)
            }, {
                size: new NSize(22, 'auto'),
                anchor: new NBounds(null, 50, 0, 0),
                position: new NPixel(-638, 0)
            }, {
                size: new NSize('auto', 21),
                anchor: new NBounds(0, 32, 22, null),
                position: new NPixel(0, -629)
            }, {
                size: new NSize(22, 21),
                anchor: new NBounds(null, 32, 0, null),
                position: new NPixel(-638, -629)
            }, {
                size: new NSize(81, 54),
                anchor: new NBounds(0, 0, null, null),
                position: new NPixel(-215, -668)
            }]
        },
        "bl": {
            'offset': new NPixel(45, 0),
            'padding': new NBounds(8, 9, 8, 40),
            'blocks': [{
                size: new NSize('auto', 'auto'),
                anchor: new NBounds(0, 21, 22, 32),
                position: new NPixel(0, 0)
            }, {
                size: new NSize(22, 'auto'),
                anchor: new NBounds(null, 21, 0, 32),
                position: new NPixel(-638, 0)
            }, {
                size: new NSize('auto', 21),
                anchor: new NBounds(0, 0, 22, null),
                position: new NPixel(0, -629)
            }, {
                size: new NSize(22, 21),
                anchor: new NBounds(null, 0, 0, null),
                position: new NPixel(-638, -629)
            }, {
                size: new NSize(81, 54),
                anchor: new NBounds(null, null, 0, 0),
                position: new NPixel(-101, -674)
            }]
        },
        "br": {
            'offset': new NPixel(-44, 0),
            'padding': new NBounds(8, 9, 8, 40),
            'blocks': [{
                size: new NSize('auto', 'auto'),
                anchor: new NBounds(0, 21, 22, 32),
                position: new NPixel(0, 0)
            }, {
                size: new NSize(22, 'auto'),
                anchor: new NBounds(null, 21, 0, 32),
                position: new NPixel(-638, 0)
            }, {
                size: new NSize('auto', 21),
                anchor: new NBounds(0, 0, 22, null),
                position: new NPixel(0, -629)
            }, {
                size: new NSize(22, 21),
                anchor: new NBounds(null, 0, 0, null),
                position: new NPixel(-638, -629)
            }, {
                size: new NSize(81, 54),
                anchor: new NBounds(0, null, null, 0),
                position: new NPixel(-311, -674)
            }]
        }
    },
    minSize: new NSize(105, 10),
    maxSize: new NSize(600, 660),
    construct: function (id, latlng, contentSize, contentHTML, anchor, closeBox, closeBoxCallback) {
        this.imageSrc = NUtility.getImagesLocation() + 'cloud-dialog-relative.png';
        NFramedDialog.prototype.construct.apply(this, arguments);
        this.contentDiv.className = this.contentDivClass
    },
    dispose: function () {
        NFramedDialog.prototype.dispose.apply(this, arguments)
    },
    _CLASS_NAME: "NCloudDialog"
});
NFeature = NObject({
    layer: null,
    id: null,
    latlng: null,
    data: null,
    marker: null,
    dialogClass: NBubbleDialog,
    dialog: null,
    construct: function (layer, latlng, data) {
        this.layer = layer;
        this.latlng = latlng;
        this.data = (data != null) ? data : {};
        this.id = NUtility.createUniqueID(this._CLASS_NAME + "_")
    },
    dispose: function () {
        if ((this.layer != null) && (this.layer.map != null)) {
            if (this.dialog != null) {
                this.layer.map.removeDialog(this.dialog)
            }
        }
        this.layer = null;
        this.id = null;
        this.latlng = null;
        this.data = null;
        if (this.marker != null) {
            this.disposeMarker(this.marker);
            this.marker = null
        }
        if (this.dialog != null) {
            this.disposeDialog(this.dialog);
            this.dialog = null
        }
    },
    InMapViewPort: function () {
        var InMapViewPort = false;
        if ((this.layer != null) && (this.layer.map != null)) {
            var screenBounds = this.layer.map.getExtent();
            InMapViewPort = screenBounds.containsLonLat(this.latlng)
        }
        return InMapViewPort
    },
    createMarker: function () {
        if (this.latlng != null) {
            this.marker = new NMarker(this.latlng, this.data.icon)
        }
        return this.marker
    },
    disposeMarker: function () {
        this.marker.dispose()
    },
    createDialog: function (closeBox) {
        if (this.latlng != null) {
            var id = this.id + "_dialog";
            var anchor = (this.marker) ? this.marker.icon : null;
            if (!this.dialog) {
                this.dialog = new this.dialogClass(id, this.latlng, this.data.dialogSize, this.data.dialogContentHTML, anchor, closeBox)
            }
            if (this.data.overflow != null) {
                this.dialog.contentDiv.style.overflow = this.data.overflow
            }
            this.dialog.feature = this
        }
        return this.dialog
    },
    disposeDialog: function () {
        if (this.dialog) {
            this.dialog.feature = null;
            this.dialog.dispose();
            this.dialog = null
        }
    },
    _CLASS_NAME: "NFeature"
});
NEditState = {
    UNKNOWN: 'Unknown',
    INSERT: 'Insert',
    UPDATE: 'Update',
    DELETE: 'Delete'
};
NVectorFeature = NObject(NFeature, {
    fid: null,
    geometry: null,
    attributes: null,
    state: null,
    symbol: null,
    renderSymbol: "default",
    construct: function (geometry, attributes, symbol) {
        NFeature.prototype.construct.apply(this, [null, null, attributes]);
        this.latlng = null;
        this.geometry = geometry ? geometry : null;
        this.state = null;
        this.attributes = {};
        if (attributes) {
            this.attributes = NUtility.extend(this.attributes, attributes)
        }
        this.symbol = symbol ? symbol : null
    },
    dispose: function () {
        if (this.layer) {
            this.layer.removeFeatures(this);
            this.layer = null
        }
        this.geometry = null;
        NFeature.prototype.dispose.apply(this, arguments)
    },
    clone: function () {
        return new NVectorFeature(this.geometry ? this.geometry.clone() : null, this.attributes, this.symbol)
    },
    InMapViewPort: function (boundsOnly) {
        var InMapViewPort = false;
        if (this.layer && this.layer.map) {
            var screenBounds = this.layer.map.getExtent();
            if (boundsOnly) {
                var featureBounds = this.geometry.getBounds();
                InMapViewPort = screenBounds.intersectsBounds(featureBounds)
            } else {
                var screenPoly = screenBounds.toGeometry();
                InMapViewPort = screenPoly.intersects(this.geometry)
            }
        }
        return InMapViewPort
    },
    createMarker: function () {
        return null
    },
    disposeMarker: function () {},
    createDialog: function () {
        return null
    },
    containsPoint: function (latlng, toleranceLon, toleranceLat) {
        var containsPoint = false;
        if (this.geometry) {
            containsPoint = this.geometry.containsPoint(latlng, toleranceLon, toleranceLat)
        }
        return containsPoint
    },
    disposeDialog: function () {},
    move: function (location) {
        if (!this.layer || !this.geometry.move) {
            return
        }
        var pixel;
        if (location._CLASS_NAME == "NLatLng") {
            pixel = this.layer._worldToMapViewPortPx(location)
        } else {
            pixel = location
        }
        var lastPixel = this.layer._worldToMapViewPortPx(this.geometry.getBounds().getCenterInLatLng());
        var res = this.layer.map.getResolution();
        this.geometry.move(res * (pixel.x - lastPixel.x), res * (lastPixel.y - pixel.y));
        this.layer.drawFeature(this);
        return lastPixel
    },
    setState: function (state) {
        if (state == NEditState.UPDATE) {
            switch (this.state) {
            case NEditState.UNKNOWN:
            case NEditState.DELETE:
                this.state = state;
                break;
            case NEditState.UPDATE:
            case NEditState.INSERT:
                break
            }
        } else if (state == NEditState.INSERT) {
            switch (this.state) {
            case NEditState.UNKNOWN:
                break;
            default:
                this.state = state;
                break
            }
        } else if (state == NEditState.DELETE) {
            switch (this.state) {
            case NEditState.INSERT:
                break;
            case NEditState.DELETE:
                break;
            case NEditState.UNKNOWN:
            case NEditState.UPDATE:
                this.state = state;
                break
            }
        } else if (state == NEditState.UNKNOWN) {
            this.state = state
        }
    },
    _CLASS_NAME: "NVectorFeature"
});
NVectorFeature.symbol = {
    'default': {
        fillColor: "gray",
        fillOpacity: 0.4,
        hoverFillColor: "white",
        hoverFillOpacity: 0.8,
        strokeColor: "red",
        strokeOpacity: 1,
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeDashstyle: "solid",
        hoverStrokeColor: "red",
        hoverStrokeOpacity: 1,
        hoverStrokeWidth: 0.2,
        pointRadius: 6,
        hoverPointRadius: 1,
        hoverPointUnit: "%",
        pointerEvents: "visiblePainted",
        cursor: "inherit"
    },
    'select': {
        fillColor: "#00FFFF",
        fillOpacity: 0.4,
        hoverFillColor: "white",
        hoverFillOpacity: 0.8,
        strokeColor: "#00FFFF",
        strokeOpacity: 1,
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeDashstyle: "solid",
        hoverStrokeColor: "red",
        hoverStrokeOpacity: 1,
        hoverStrokeWidth: 0.2,
        pointRadius: 6,
        hoverPointRadius: 1,
        hoverPointUnit: "%",
        pointerEvents: "visiblePainted",
        cursor: "pointer"
    },
    'temporary': {
        fillColor: "yellow",
        fillOpacity: 0.2,
        hoverFillColor: "white",
        hoverFillOpacity: 0.8,
        strokeColor: "yellow",
        strokeOpacity: 1,
        strokeLinecap: "round",
        strokeWidth: 4,
        strokeDashstyle: "solid",
        hoverStrokeColor: "red",
        hoverStrokeOpacity: 1,
        hoverStrokeWidth: 0.2,
        pointRadius: 6,
        hoverPointRadius: 1,
        hoverPointUnit: "%",
        pointerEvents: "visiblePainted",
        cursor: "inherit"
    }
};
NWFSFeature = NObject(NFeature, {
    construct: function (layer, xmlNode) {
        var newArguments = arguments;
        var data = this.processXMLNode(xmlNode);
        newArguments = new Array(layer, data.latlng, data);
        NFeature.prototype.construct.apply(this, newArguments);
        this.createMarker();
        this.layer.addMarker(this.marker)
    },
    dispose: function () {
        if (this.marker != null) {
            this.layer.removeMarker(this.marker)
        }
        NFeature.prototype.dispose.apply(this, arguments)
    },
    processXMLNode: function (xmlNode) {
        var point = NAjax.getElementsByTagNameNS(xmlNode, "http://www.opengis.net/gml", "gml", "Point");
        var text = NUtility.getXmlNodeValue(NAjax.getElementsByTagNameNS(point[0], "http://www.opengis.net/gml", "gml", "coordinates")[0]);
        var floats = text.split(",");
        return {
            latlng: new NLatLng(parseFloat(floats[0]), parseFloat(floats[1])),
            id: null
        }
    },
    _CLASS_NAME: "NWFSFeature"
});
NProcessor = NObject({
    id: null,
    control: null,
    map: null,
    keyMask: null,
    _enable: false,
    evt: null,
    construct: function (control, callbacks, options) {
        NUtility.extend(this, options);
        this.control = control;
        this.callbacks = callbacks;
        if (control.map) {
            this.setMap(control.map)
        }
        NUtility.extend(this, options);
        this.id = NUtility.createUniqueID(this._CLASS_NAME + "_")
    },
    setMap: function (map) {
        this.map = map
    },
    checkModifiers: function (evt) {
        if (this.keyMask == null) {
            return true
        }
        var keyModifiers = (evt.shiftKey ? NProcessor.MOD_SHIFT : 0) | (evt.ctrlKey ? NProcessor.MOD_CTRL : 0) | (evt.altKey ? NProcessor.MOD_ALT : 0);
        return (keyModifiers == this.keyMask)
    },
    enable: function () {
        if (this._enable) {
            return false
        }
        var events = NEvents.prototype._BROWSER_EVENTS;
        for (var i = 0, len = events.length; i < len; i++) {
            if (this[events[i]]) {
                this.bind(events[i], this[events[i]])
            }
        }
        this._enable = true;
        return true
    },
    disable: function () {
        if (!this._enable) {
            return false
        }
        var events = NEvents.prototype._BROWSER_EVENTS;
        for (var i = 0, len = events.length; i < len; i++) {
            if (this[events[i]]) {
                this.unbind(events[i], this[events[i]])
            }
        }
        this._enable = false;
        return true
    },
    callback: function (name, args) {
        if (name && this.callbacks[name]) {
            this.callbacks[name].apply(this.control, args)
        }
    },
    bind: function (name, method) {
        this.map.events._registerPriority(name, this, method);
        this.map.events._registerPriority(name, this, this.setEvent)
    },
    unbind: function (name, method) {
        this.map.events.unbind(name, this, method);
        this.map.events.unbind(name, this, this.setEvent)
    },
    setEvent: function (evt) {
        this.evt = evt;
        return true
    },
    dispose: function () {
        this.disable();
        this.control = this.map = null
    },
    _CLASS_NAME: "NProcessor"
});
NProcessor.MOD_NONE = 0;
NProcessor.MOD_SHIFT = 1;
NProcessor.MOD_CTRL = 2;
NProcessor.MOD_ALT = 4;
NClickProcessor = NObject(NProcessor, {
    delay: 300,
    single: true,
    'double': false,
    pixelTolerance: 0,
    stopSingle: false,
    stopDouble: false,
    timerId: null,
    down: null,
    rightclickTimerId: null,
    construct: function (control, callbacks, options) {
        NProcessor.prototype.construct.apply(this, arguments);
        if (this.pixelTolerance != null) {
            this.mousedown = function (evt) {
                this.down = evt.xy;
                return true
            }
        }
    },
    mousedown: null,
    mouseup: function (evt) {
        var propagate = true;
        if (this.checkModifiers(evt) && this.control.handleRightClicks && NEvent.isRightClick(evt)) {
            propogate = this.rightclick(evt)
        }
        return propagate
    },
    rightclick: function (evt) {
        if (this.passesTolerance(evt)) {
            if (this.rightclickTimerId != null) {
                this.clearTimer();
                this.callback('dblrightclick', [evt]);
                return !this.stopDouble
            } else {
                var clickEvent = this['double'] ? NUtility.extend({}, evt) : this.callback('rightclick', [evt]);
                var delayedRightCall = NFunction.bind(this.delayedRightCall, this, clickEvent);
                this.rightclickTimerId = window.setTimeout(delayedRightCall, this.delay)
            }
        }
        return !this.stopSingle
    },
    delayedRightCall: function (evt) {
        this.rightclickTimerId = null;
        if (evt) {
            this.callback('rightclick', [evt])
        }
        return !this.stopSingle
    },
    dblclick: function (evt) {
        if (this.passesTolerance(evt)) {
            if (this["double"]) {
                this.callback('dblclick', [evt])
            }
            this.clearTimer()
        }
        return !this.stopDouble
    },
    click: function (evt) {
        if (this.passesTolerance(evt)) {
            if (this.timerId != null) {
                this.clearTimer()
            } else {
                var clickEvent = this.single ? NUtility.extend({}, evt) : null;
                this.timerId = window.setTimeout(NFunction.bind(this.delayedCall, this, clickEvent), this.delay)
            }
        }
        return !this.stopSingle
    },
    passesTolerance: function (evt) {
        var passes = true;
        if (this.pixelTolerance != null && this.down) {
            var dpx = Math.sqrt(Math.pow(this.down.x - evt.xy.x, 2) + Math.pow(this.down.y - evt.xy.y, 2));
            if (dpx > this.pixelTolerance) {
                passes = false
            }
        }
        return passes
    },
    clearTimer: function () {
        if (this.timerId != null) {
            window.clearTimeout(this.timerId);
            this.timerId = null
        }
    },
    delayedCall: function (evt) {
        this.timerId = null;
        if (evt) {
            this.callback('click', [evt])
        }
    },
    disable: function () {
        var disabled = false;
        if (NProcessor.prototype.disable.apply(this, arguments)) {
            this.clearTimer();
            this.down = null;
            disabled = true
        }
        return disabled
    },
    _CLASS_NAME: "NClickProcessor"
});
NHoverProcessor = NObject(NProcessor, {
    delay: 500,
    pixelTolerance: null,
    suspendMove: false,
    posInPixel: null,
    timerId: null,
    construct: function (control, callbacks, options) {
        NProcessor.prototype.construct.apply(this, arguments)
    },
    mousemove: function (evt) {
        if (this.passesTolerance(evt.xy)) {
            this.clearTimer();
            this.callback('move', [evt]);
            this.posInPixel = evt.xy;
            evt = NUtility.extend({}, evt);
            this.timerId = window.setTimeout(NFunction.bind(this.delayedCall, this, evt), this.delay)
        }
        return !this.suspendMove
    },
    mouseout: function (evt) {
        if (NUtility.mouseLeft(evt, this.map.div)) {
            this.clearTimer();
            this.callback('move', [evt])
        }
        return true
    },
    passesTolerance: function (px) {
        var passes = true;
        if (this.pixelTolerance && this.posInPixel) {
            var dpx = Math.sqrt(Math.pow(this.posInPixel.x - px.x, 2) + Math.pow(this.posInPixel.y - px.y, 2));
            if (dpx < this.pixelTolerance) {
                passes = false
            }
        }
        return passes
    },
    clearTimer: function () {
        if (this.timerId != null) {
            window.clearTimeout(this.timerId);
            this.timerId = null
        }
    },
    delayedCall: function (evt) {
        this.callback('pause', [evt])
    },
    disable: function () {
        var disabled = false;
        if (NProcessor.prototype.disable.apply(this, arguments)) {
            this.clearTimer();
            disabled = true
        }
        return disabled
    },
    _CLASS_NAME: "NHoverProcessor"
});
NDrawPointProcessor = NObject(NProcessor, {
    point: null,
    layer: null,
    multi: false,
    drawing: false,
    mouseDown: false,
    lastDown: null,
    lastUp: null,
    persist: false,
    layerOptions: null,
    construct: function (control, callbacks, options) {
        this.style = NUtility.extend(NVectorFeature.symbol['default'], {});
        NProcessor.prototype.construct.apply(this, arguments)
    },
    enable: function () {
        if (!NProcessor.prototype.enable.apply(this, arguments)) {
            return false
        }
        var options = NUtility.extend({
            showInLayerList: false,
            calculateInRange: function () {
                return true
            }
        }, this.layerOptions);
        this.layer = new NVectorLayer(this._CLASS_NAME, options);
        this.map.addLayer(this.layer);
        return true
    },
    createFeature: function () {
        this.point = new NVectorFeature(new NGeometry.Point());
        this.layer.addFeatures([this.point], {
            silent: true
        })
    },
    disable: function () {
        if (!NProcessor.prototype.disable.apply(this, arguments)) {
            return false
        }
        if (this.drawing) {
            this.cancel()
        }
        this.disposeFeature();
        if (this.layer.map != null) {
            this.layer.dispose(false)
        }
        this.layer = null;
        return true
    },
    disposeFeature: function () {
        if (this.layer) {
            this.layer.disposeFeatures()
        }
        this.point = null
    },
    finalize: function (cancel) {
        var key = cancel ? "cancel" : "done";
        this.drawing = false;
        this.mouseDown = false;
        this.lastDown = null;
        this.lastUp = null;
        this.callback(key, [this.geometryClone()]);
        if (cancel || !this.persist) {
            this.disposeFeature()
        }
    },
    cancel: function () {
        this.finalize(true)
    },
    click: function (evt) {
        NEvent.stop(evt);
        return false
    },
    dblclick: function (evt) {
        NEvent.stop(evt);
        return false
    },
    rightclick: function (evt) {
        NEvent.stop(evt);
        return false
    },
    drawFeature: function () {
        this.layer.drawFeature(this.point, this.symbol)
    },
    getGeometry: function () {
        var geometry = this.point.geometry;
        if (this.multi) {
            geometry = new NGeometry.MultiPoint([geometry])
        }
        return geometry
    },
    geometryClone: function () {
        return this.getGeometry().clone()
    },
    mousedown: function (evt) {
        if (!this.checkModifiers(evt)) {
            return true
        }
        if (this.lastDown && this.lastDown.equals(evt.xy)) {
            return true
        }
        if (this.lastDown == null) {
            if (this.persist) {
                this.disposeFeature()
            }
            this.createFeature()
        }
        this.lastDown = evt.xy;
        this.drawing = true;
        var latlng = this.map.pixelToWorld(evt.xy);
        this.point.geometry.x = latlng.lon;
        this.point.geometry.y = latlng.lat;
        this.point.geometry.clearBounds();
        this.drawFeature();
        return false
    },
    mousemove: function (evt) {
        if (this.drawing) {
            var latlng = this.map.pixelToWorld(evt.xy);
            this.point.geometry.x = latlng.lon;
            this.point.geometry.y = latlng.lat;
            this.point.geometry.clearBounds();
            this.drawFeature()
        }
        return true
    },
    mouseup: function (evt) {
        if (this.drawing) {
            this.finalize();
            return false
        } else {
            return true
        }
    },
    _CLASS_NAME: "NDrawPointProcessor"
});
NDrawPathProcessor = NObject(NDrawPointProcessor, {
    line: null,
    handDrawing: false,
    freehandToggle: 'shiftKey',
    construct: function (control, callbacks, options) {
        NDrawPointProcessor.prototype.construct.apply(this, arguments)
    },
    createFeature: function () {
        this.line = new NVectorFeature(new NGeometry.LineString());
        this.point = new NVectorFeature(new NGeometry.Point());
        this.layer.addFeatures([this.line, this.point], {
            silent: true
        })
    },
    disposeFeature: function () {
        NDrawPointProcessor.prototype.disposeFeature.apply(this);
        this.line = null
    },
    disposePoint: function () {
        if (this.point) {
            this.layer.disposeFeatures([this.point])
        }
    },
    addPoint: function () {
        this.line.geometry.addComponent(this.point.geometry.clone(), this.line.geometry.components.length);
        this.callback("point", [this.point.geometry, this.getGeometry()])
    },
    freehandMode: function (evt) {
        return (this.freehandToggle && evt[this.freehandToggle]) ? !this.handDrawing : this.handDrawing
    },
    modifyFeature: function () {
        var index = this.line.geometry.components.length - 1;
		if(index==0){
			this.line.geometry.addComponent(this.point.geometry.clone(), this.line.geometry.components.length);
			index=1;
		}
        this.line.geometry.components[index].x = this.point.geometry.x;
        this.line.geometry.components[index].y = this.point.geometry.y;
        this.line.geometry.components[index].clearBounds()
    },
    drawFeature: function () {
        this.layer.drawFeature(this.line, this.symbol);
        this.layer.drawFeature(this.point, this.symbol)
    },
    getGeometry: function () {
        var geometry = this.line.geometry;
        if (this.multi) {
            geometry = new NGeometry.MultiLineString([geometry])
        }
        return geometry
    },
    mousedown: function (evt) {
        if (!NEvent.isRightClick(evt)) {
            if (this.lastDown && this.lastDown.equals(evt.xy)) {
                return false
            }
            if (this.lastDown == null) {
                if (this.persist) {
                    this.disposeFeature()
                }
                this.createFeature()
            }
            this.mouseDown = true;
            this.lastDown = evt.xy;
            var latlng = this.control.map.pixelToWorld(evt.xy);
            this.point.geometry.x = latlng.lon;
            this.point.geometry.y = latlng.lat;
            this.point.geometry.clearBounds();
            if ((this.lastUp == null) || !this.lastUp.equals(evt.xy)) {
                this.addPoint()
            }
            this.drawFeature();
            this.drawing = true;
            return false
        } else {
            if (this.persist) {
                this.disposePoint()
            }
            this.finalize();
            return false
        }
    },
    mousemove: function (evt) {
        if (this.drawing) {
            var latlng = this.map.pixelToWorld(evt.xy);
            this.point.geometry.x = latlng.lon;
            this.point.geometry.y = latlng.lat;
            this.point.geometry.clearBounds();
            if (this.mouseDown && this.freehandMode(evt)) {
                this.addPoint()
            } else {
                this.modifyFeature()
            }
            this.drawFeature()
        }
        return true
    },
    mouseup: function (evt) {
        this.mouseDown = false;
        if (this.drawing) {
            if (this.freehandMode(evt)) {
                if (this.persist) {
                    this.disposePoint()
                }
                this.finalize()
            } else {

                this.lastUp = evt.xy
            }
            return false
        }
        return true
    },
    dblclick: function (evt) {
        if (!this.freehandMode(evt)) {
            var index = this.line.geometry.components.length - 1;
            this.line.geometry.removeComponent(this.line.geometry.components[index]);
            if (this.persist) {
                this.disposePoint()
            }
            this.finalize()
        }
        return false
    },
    _CLASS_NAME: "NDrawPathProcessor"
});
NDrawPolygonProcessor = NObject(NDrawPathProcessor, {
    polygon: null,
    construct: function (control, callbacks, options) {
        NDrawPathProcessor.prototype.construct.apply(this, arguments)
    },
    createFeature: function () {
        this.polygon = new NVectorFeature(new NGeometry.Polygon());
        this.line = new NVectorFeature(new NGeometry.LinearRing());
        this.polygon.geometry.addComponent(this.line.geometry);
        this.point = new NVectorFeature(new NGeometry.Point());
        this.layer.addFeatures([this.polygon, this.point], {
            silent: true
        })
    },
    disposeFeature: function () {
        NDrawPathProcessor.prototype.disposeFeature.apply(this);
        this.polygon = null
    },
    modifyFeature: function () {
        var index = this.line.geometry.components.length - 2;
		if(index==0){
			this.line.geometry.addComponent(this.point.geometry.clone(), this.line.geometry.components.length);
			index=1;
		}
        this.line.geometry.components[index].x = this.point.geometry.x;
        this.line.geometry.components[index].y = this.point.geometry.y;
        this.line.geometry.components[index].clearBounds()
    },
    mousedown: function (evt) {
        if (!NEvent.isRightClick(evt)) {
            if (this.lastDown && this.lastDown.equals(evt.xy)) {
                return false
            }
            if (this.lastDown == null) {
                if (this.persist) {
                    this.disposeFeature()
                }
                this.createFeature()
            }
            this.mouseDown = true;
            this.lastDown = evt.xy;
            var latlng = this.control.map.pixelToWorld(evt.xy);
            this.point.geometry.x = latlng.lon;
            this.point.geometry.y = latlng.lat;
            this.point.geometry.clearBounds();
            if ((this.lastUp == null) || !this.lastUp.equals(evt.xy)) {
                this.addPoint()
            }
            this.drawFeature();
            this.drawing = true;
            return false
        } else {
            if (this.line.geometry.components.length > 3) {
                if (this.persist) {
                    this.disposePoint()
                }
                this.finalize()
            }
            return false
        }
    },
    drawFeature: function () {
        this.layer.drawFeature(this.polygon, this.symbol);
        this.layer.drawFeature(this.point, this.symbol)
    },
    getGeometry: function () {
        var geometry = this.polygon.geometry;
        if (this.multi) {
            geometry = new NGeometry.MultiPolygon([geometry])
        }
        return geometry
    },
    dblclick: function (evt) {
        if (!this.freehandMode(evt)) {
            var index = this.line.geometry.components.length - 2;
            this.line.geometry.removeComponent(this.line.geometry.components[index]);
            if (this.persist) {
                this.disposePoint()
            }
            this.finalize()
        }
        return false
    },
    _CLASS_NAME: "NDrawPolygonProcessor"
});
NDrawFeatureProcessor = NObject(NProcessor, {
    _EVENT_MAP: {
        'click': {
            'in': 'click',
            'out': 'clickout'
        },
        'mousemove': {
            'in': 'over',
            'out': 'out'
        },
        'dblclick': {
            'in': 'dblclick',
            'out': null
        },
        'mousedown': {
            'in': null,
            'out': null
        },
        'mouseup': {
            'in': null,
            'out': null
        }
    },
    feature: null,
    lastFeature: null,
    down: null,
    up: null,
    clickoutTolerance: 4,
    geometryTypes: null,
    stopClick: true,
    stopDown: true,
    stopUp: false,
    construct: function (control, layer, callbacks, options) {
        NProcessor.prototype.construct.apply(this, [control, callbacks, options]);
        this.layer = layer
    },
    mousedown: function (evt) {
        this.down = evt.xy;
        return this.process(evt) ? !this.stopDown : true
    },
    mouseup: function (evt) {
        this.up = evt.xy;
        return this.process(evt) ? !this.stopUp : true
    },
    click: function (evt) {
        return this.process(evt) ? !this.stopClick : true
    },
    mousemove: function (evt) {
        if (!this.callbacks['over'] && !this.callbacks['out']) {
            return true
        }
        this.process(evt);
        return true
    },
    dblclick: function (evt) {
        return !this.process(evt)
    },
    geometryTypeMatches: function (feature) {
        return this.geometryTypes == null || NUtility.indexOf(this.geometryTypes, feature.geometry._CLASS_NAME) > -1
    },
    process: function (evt) {
        var type = evt.type;
        var handled = false;
        var previouslyIn = !! (this.feature);
        var click = (type == "click" || type == "dblclick");
        this.feature = this.layer._getFeatureFromEvent(evt);
        if (this.feature) {
            var inNew = (this.feature != this.lastFeature);
            if (this.geometryTypeMatches(this.feature)) {
                if (previouslyIn && inNew) {
                    this.triggerCallback(type, 'out', [this.lastFeature]);
                    this.triggerCallback(type, 'in', [this.feature])
                } else if (!previouslyIn || click) {
                    this.triggerCallback(type, 'in', [this.feature])
                }
                this.lastFeature = this.feature;
                handled = true
            } else {
                if (previouslyIn && inNew || (click && this.lastFeature)) {
                    this.triggerCallback(type, 'out', [this.lastFeature])
                }
                this.feature = null
            }
        } else {
            if (previouslyIn || (click && this.lastFeature)) {
                this.triggerCallback(type, 'out', [this.lastFeature])
            }
        }
        return handled
    },
    triggerCallback: function (type, mode, args) {
        var key = this._EVENT_MAP[type][mode];
        if (key) {
            if (type == 'click' && mode == 'out' && this.up && this.down) {
                var dpx = Math.sqrt(Math.pow(this.up.x - this.down.x, 2) + Math.pow(this.up.y - this.down.y, 2));
                if (dpx <= this.clickoutTolerance) {
                    this.callback(key, args)
                }
            } else {
                this.callback(key, args)
            }
        }
    },
    enable: function () {
        var enabled = false;
        if (NProcessor.prototype.enable.apply(this, arguments)) {
            this.moveLayerToTop();
            this.map.events.addListener({
                "removelayer": this.processMapEvents,
                "changelayer": this.processMapEvents,
                scope: this
            });
            enabled = true
        }
        return enabled
    },
    disable: function () {
        var disabled = false;
        if (NProcessor.prototype.disable.apply(this, arguments)) {
            this.moveLayerBack();
            this.feature = null;
            this.lastFeature = null;
            this.down = null;
            this.up = null;
            this.map.events.removeListener({
                "removelayer": this.processMapEvents,
                "changelayer": this.processMapEvents,
                scope: this
            });
            disabled = true
        }
        return disabled
    },
    processMapEvents: function (evt) {
        if (!evt.property || evt.property == "order") {
            this.moveLayerToTop()
        }
    },
    moveLayerToTop: function () {
        var index = Math.max(this.map.NMAP_Z_INDEX['Feature'] - 1, this.layer.getZIndex()) + 1;
        this.layer.setZIndex(index)
    },
    moveLayerBack: function () {
        var index = this.layer.getZIndex() - 1;
        if (index >= this.map.NMAP_Z_INDEX['Feature']) {
            this.layer.setZIndex(index)
        } else {
            this.map.setLayerZIndex(this.layer, this.map.getLayerIndex(this.layer))
        }
    },
    _CLASS_NAME: "NDrawFeatureProcessor"
});
NDragProcessor = NObject(NProcessor, {
    grabCursor: "default",
    grabbingCursor: "default",
    started: false,
    stopDown: true,
    dragging: false,
    last: null,
    start: null,
    oldOnselectstart: null,
    interval: 0,
    timeoutId: null,
    construct: function (control, callbacks, options) {
        NProcessor.prototype.construct.apply(this, arguments)
    },
    down: function (evt) {},
    move: function (evt) {},
    up: function (evt) {},
    out: function (evt) {},
    mousedown: function (evt) {
        var propagate = true;
        this.dragging = false;
        if (this.checkModifiers(evt) && NEvent.isLeftClick(evt)) {
            this.started = true;
            this.start = evt.xy;
            this.last = evt.xy;
            this.down(evt);
            this.callback("down", [evt.xy]);
            NEvent.stop(evt);
            if (!this.oldOnselectstart) {
                this.oldOnselectstart = (document.onselectstart) ? document.onselectstart : function () {
                    return true
                };
                document.onselectstart = function () {
                    return false
                }
            }
            propagate = !this.stopDown
        } else {
            this.started = false;
            this.start = null;
            this.last = null
        }
        return propagate
    },
    mousemove: function (evt) {
        if (this.started && !this.timeoutId && (evt.xy.x != this.last.x || evt.xy.y != this.last.y)) {
            if (this.interval > 0) {
                this.timeoutId = setTimeout(NFunction.bind(this.removeTimeout, this), this.interval)
            }
            this.dragging = true;
            this.move(evt);
            this.callback("move", [evt.xy]);
            if (!this.oldOnselectstart) {
                this.oldOnselectstart = document.onselectstart;
                document.onselectstart = function () {
                    return false
                }
            }
            this.last = this.evt.xy
        }
        return true
    },
    removeTimeout: function () {
        this.timeoutId = null
    },
    mouseup: function (evt) {
        if (this.started) {
            var dragged = (this.start != this.last);
            this.started = false;
            this.dragging = false;
            this.up(evt);
            this.callback("up", [evt.xy]);
            if (dragged) {
                this.callback("done", [evt.xy])
            }
            document.onselectstart = this.oldOnselectstart
        }
        return true
    },
    mouseout: function (evt) {
        if (this.started && NUtility.mouseLeft(evt, this.map.div)) {
            var dragged = (this.start != this.last);
            this.started = false;
            this.dragging = false;
            this.out(evt);
            this.callback("out", []);
            if (dragged) {
                this.callback("done", [evt.xy])
            }
            if (document.onselectstart) {
                document.onselectstart = this.oldOnselectstart
            }
        }
        return true
    },
    click: function (evt) {
        return (this.start == this.last)
    },
    enable: function () {
        var enabled = false;
        if (NProcessor.prototype.enable.apply(this, arguments)) {
            this.dragging = false;
            enabled = true
        }
        return enabled
    },
    disable: function () {
        var disabled = false;
        if (NProcessor.prototype.disable.apply(this, arguments)) {
            this.started = false;
            this.dragging = false;
            this.start = null;
            this.last = null;
            disabled = true
        }
        return disabled
    },
    _CLASS_NAME: "NDragProcessor"
});
NDrawRectProcessor = NObject(NProcessor, {
    _cursorZoomin: ["url('images/zoomin.cur'),move", '-moz-grab', 'zoomin', 'move'],
    dragProcessor: null,
    boxDivClassName: 'nmProcessorDrawRect',
    boxCharacteristics: null,
    construct: function (control, callbacks, options) {
        NProcessor.prototype.construct.apply(this, arguments);
        var callbacks = {
            "down": this.startBox,
            "move": this.moveBox,
            "out": this.removeBox,
            "up": this.endBox
        };
        this.dragProcessor = new NDragProcessor(this, callbacks, {
            keyMask: this.keyMask
        })
    },
    setMap: function (map) {
        NProcessor.prototype.setMap.apply(this, arguments);
        if (this.dragProcessor) {
            this.dragProcessor.setMap(map)
        }
    },
    startBox: function (xy) {
        this.zoomBox = NUtility.createDiv('zoomBox', this.dragProcessor.start);
        this.zoomBox.className = this.boxDivClassName;
        this.zoomBox.style.zIndex = this.map.NMAP_Z_INDEX["Dialog"] - 1;
        this.map.mapViewPortDiv.appendChild(this.zoomBox)
    },
    moveBox: function (xy) {
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
    endBox: function (end) {
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
    removeBox: function () {
        this.map.mapViewPortDiv.removeChild(this.zoomBox);
        this.zoomBox = null;
        this.boxCharacteristics = null
    },
    enable: function () {
        if (NProcessor.prototype.enable.apply(this, arguments)) {
            this.dragProcessor.enable();
            return true
        } else {
            return false
        }
    },
    disable: function () {
        if (NProcessor.prototype.disable.apply(this, arguments)) {
            this.dragProcessor.disable();
            return true
        } else {
            return false
        }
    },
    _getBoxCharacteristics: function (dx, dy) {
        if (!this.boxCharacteristics) {
            var xOffset = parseInt(NElement.getStyle(this.zoomBox, "border-left-width")) + parseInt(NElement.getStyle(this.zoomBox, "border-right-width")) + 1;
            var yOffset = parseInt(NElement.getStyle(this.zoomBox, "border-top-width")) + parseInt(NElement.getStyle(this.zoomBox, "border-bottom-width")) + 1;
            var newBoxModel = NUtility.getBrowserName() == "msie" ? document.compatMode != "BackCompat" : true;
            this.boxCharacteristics = {
                xOffset: xOffset,
                yOffset: yOffset,
                newBoxModel: newBoxModel
            }
        }
        return this.boxCharacteristics
    },
    _CLASS_NAME: "NDrawRectProcessor"
});
NMouseWheelProcessor = NObject(NProcessor, {
    _wheelListener: null,
    mousePosition: null,
    construct: function (control, callbacks, options) {
        NProcessor.prototype.construct.apply(this, arguments);
        this._wheelListener = NFunction.bindAsEventListener(this.onWheelEvent, this)
    },
    dispose: function () {
        NProcessor.prototype.dispose.apply(this, arguments);
        this._wheelListener = null
    },
    onWheelEvent: function (e) {
        if (!this.map || !this.checkModifiers(e)) {
            return
        }
        var overScrollableDiv = false;
        var overLayerDiv = false;
        var overMapDiv = false;
        var elem = NEvent.element(e);
        while ((elem != null) && !overMapDiv && !overScrollableDiv) {
            if (!overScrollableDiv) {
                try {
                    if (elem.currentStyle) {
                        overflow = elem.currentStyle["overflow"]
                    } else {
                        var style = document.defaultView.getComputedStyle(elem, null);
                        var overflow = style.getPropertyValue("overflow")
                    }
                    overScrollableDiv = (overflow && (overflow == "auto") || (overflow == "scroll"))
                } catch (err) {}
            }
            if (!overLayerDiv) {
                for (var i = 0, len = this.map.layers.length; i < len; i++) {
                    if (elem == this.map.layers[i].div || elem == this.map.layers[i].pane) {
                        overLayerDiv = true;
                        break
                    }
                }
            }
            overMapDiv = (elem == this.map.div);
            elem = elem.parentNode
        }
        if (!overScrollableDiv && overMapDiv) {
            if (overLayerDiv) {
                this.wheelZoom(e)
            }
            NEvent.stop(e)
        }
    },
    wheelZoom: function (e) {
        var delta = 0;
        if (!e) {
            e = window.event
        }
        if (e.wheelDelta) {
            delta = e.wheelDelta / 120;
            if (window.opera && window.opera.version() < 9.2) {
                delta = -delta
            }
        } else if (e.detail) {
            delta = -e.detail / 3
        }
        if (delta) {
            if (this.mousePosition) {
                e.xy = this.mousePosition
            }
            if (!e.xy) {
                e.xy = this.map.worldToPixel(this.map.getCenter())
            }
            if (delta < 0) {
                this.callback("down", [e, delta])
            } else {
                this.callback("up", [e, delta])
            }
        }
    },
    mousemove: function (evt) {
        this.mousePosition = evt.xy
    },
    enable: function (evt) {
        if (NProcessor.prototype.enable.apply(this, arguments)) {
            var _wheelListener = this._wheelListener;
            NEvent.observe(window, "DOMMouseScroll", _wheelListener);
            NEvent.observe(window, "mousewheel", _wheelListener);
            NEvent.observe(document, "mousewheel", _wheelListener);
            return true
        } else {
            return false
        }
    },
    disable: function (evt) {
        if (NProcessor.prototype.disable.apply(this, arguments)) {
            var _wheelListener = this._wheelListener;
            NEvent.stopObserving(window, "DOMMouseScroll", _wheelListener);
            NEvent.stopObserving(window, "mousewheel", _wheelListener);
            NEvent.stopObserving(document, "mousewheel", _wheelListener);
            return true
        } else {
            return false
        }
    },
    _CLASS_NAME: "NMouseWheelProcessor"
});
NKeyboardProcessor = NObject(NProcessor, {
    _KEY_EVENTS: ["keydown", "keyup"],
    eventListener: null,
    construct: function (control, callbacks, options) {
        NProcessor.prototype.construct.apply(this, arguments);
        this.eventListener = NFunction.bindAsEventListener(this.processKeyEvent, this)
    },
    dispose: function () {
        this.disable();
        this.eventListener = null;
        NProcessor.prototype.dispose.apply(this, arguments)
    },
    enable: function () {
        if (NProcessor.prototype.enable.apply(this, arguments)) {
            for (var i = 0, len = this._KEY_EVENTS.length; i < len; i++) {
                NEvent.observe(document, this._KEY_EVENTS[i], this.eventListener)
            }
            return true
        } else {
            return false
        }
    },
    disable: function () {
        var disabled = false;
        if (NProcessor.prototype.disable.apply(this, arguments)) {
            for (var i = 0, len = this._KEY_EVENTS.length; i < len; i++) {
                NEvent.stopObserving(document, this._KEY_EVENTS[i], this.eventListener)
            }
            disabled = true
        }
        return disabled
    },
    processKeyEvent: function (evt) {
        if (this.checkModifiers(evt)) {
            this.callback(evt.type, [evt])
        }
    },
    _CLASS_NAME: "NKeyboardProcessor"
});
NDrawRegularPolygonProcessor = NObject(NDragProcessor, {
    sides: 4,
    radius: null,
    snapAngle: null,
    snapToggle: 'shiftKey',
    persist: false,
    irregular: false,
    angle: null,
    fixedRadius: false,
    feature: null,
    layer: null,
    origin: null,
    circleCenter: null,
    construct: function (control, callbacks, options) {
        this.style = NUtility.extend(NVectorFeature.symbol['default'], {});
        NProcessor.prototype.construct.apply(this, [control, callbacks, options]);
        this.options = (options) ? options : new Object()
    },
    setParameters: function (newOptions) {
        NUtility.extend(this.options, newOptions);
        NUtility.extend(this, newOptions)
    },
    enable: function () {
        var enabled = false;
        if (NProcessor.prototype.enable.apply(this, arguments)) {
            var options = {
                showInLayerList: false,
                calculateInRange: function () {
                    return true
                }
            };
            this.layer = new NVectorLayer(this._CLASS_NAME, options);
            this.map.addLayer(this.layer);
            enabled = true
        }
        return enabled
    },
    disable: function () {
        var disabled = false;
        if (NDragProcessor.prototype.disable.apply(this, arguments)) {
            if (this.dragging) {
                this.cancel()
            }
            if (this.layer.map != null) {
                this.layer.dispose(false);
                if (this.feature) {
                    this.feature.dispose()
                }
            }
            this.layer = null;
            this.feature = null;
            disabled = true
        }
        return disabled
    },
    down: function (evt) {
        this.fixedRadius = !! (this.radius);
        var maploc = this.map.pixelToWorld(evt.xy);
        this.origin = new NGeometry.Point(maploc.lon, maploc.lat);
        this.circleCenter = new NGeometry.Point(maploc.lon, maploc.lat);
        if (!this.fixedRadius || this.irregular) {
            this.radius = this.map.getResolution()
        }
        if (this.persist) {
            this.clear()
        }
        this.feature = new NVectorFeature();
        this.createGeometry();
        this.layer.addFeatures([this.feature], {
            silent: true
        });
        this.layer.drawFeature(this.feature, this.symbol)
    },
    move: function (evt) {
        var maploc = this.map.pixelToWorld(evt.xy);
        var point = new NGeometry.Point(maploc.lon, maploc.lat);
        if (this.irregular) {
            var ry = Math.sqrt(2) * Math.abs(point.y - this.origin.y) / 2;
            this.radius = Math.max(this.map.getResolution() / 2, ry)
        } else if (this.fixedRadius) {
            this.origin = point
        } else {
            this.calculateAngle(point, evt);
            this.radius = Math.max(this.map.getResolution() / 2, point.distanceTo(this.origin))
        }
        this.modifyGeometry();
        if (this.irregular) {
            var dx = point.x - this.origin.x;
            var dy = point.y - this.origin.y;
            var ratio;
            if (dy == 0) {
                ratio = dx / (this.radius * Math.sqrt(2))
            } else {
                ratio = dx / dy
            }
            this.feature.geometry.resize(1, this.origin, ratio);
            this.feature.geometry.move(dx / 2, dy / 2)
        }
        this.layer.drawFeature(this.feature, this.symbol)
    },
    up: function (evt) {
        this.finalize()
    },
    out: function (evt) {
        this.finalize()
    },
    createGeometry: function () {
        this.angle = Math.PI * ((1 / this.sides) - (1 / 2));
        if (this.snapAngle) {
            this.angle += this.snapAngle * (Math.PI / 180)
        }
        this.feature.geometry = NGeometry.Polygon.createRegularPolygon(this.origin, this.radius, this.sides, this.snapAngle)
    },
    modifyGeometry: function () {
        var angle, dx, dy, point;
        var ring = this.feature.geometry.components[0];
        if (ring.components.length != (this.sides + 1)) {
            this.createGeometry();
            ring = this.feature.geometry.components[0]
        }
        for (var i = 0; i < this.sides; ++i) {
            point = ring.components[i];
            angle = this.angle + (i * 2 * Math.PI / this.sides);
            point.x = this.origin.x + (this.radius * Math.cos(angle));
            point.y = this.origin.y + (this.radius * Math.sin(angle));
            point.clearBounds()
        }
    },
    calculateAngle: function (point, evt) {
        var alpha = Math.atan2(point.y - this.origin.y, point.x - this.origin.x);
        if (this.snapAngle && (this.snapToggle && !evt[this.snapToggle])) {
            var snapAngleRad = (Math.PI / 180) * this.snapAngle;
            this.angle = Math.round(alpha / snapAngleRad) * snapAngleRad
        } else {
            this.angle = alpha
        }
    },
    cancel: function () {
        this.callback("cancel", null);
        this.finalize()
    },
    finalize: function () {
        this.origin = null;
        this.radius = this.options.radius
    },
    clear: function () {
        this.layer.renderer.clear();
        this.layer.disposeFeatures()
    },
    callback: function (name, args) {
        if (this.callbacks[name]) {
            this.callbacks[name].apply(this.control, [this.feature.geometry.clone()])
        }
        if (!this.persist && (name == "done" || name == "cancel")) {
            this.clear()
        }
    },
    _CLASS_NAME: "NDrawRegularPolygonProcessor"
});
NControl = NObject({
    id: null,
    map: null,
    div: null,
    type: null,
    controlType: "NControl",
    canSelection: false,
    cssClassName: "",
    title: "",
    _enable: null,
    processor: null,
    eventListeners: null,
    events: null,
    _EVENT_TYPES: ["enable", "disable"],
    construct: function (options) {
        this.cssClassName = this._CLASS_NAME.replace("N", "nm").replace(/\./g, "");
        NUtility.extend(this, options);
        this.events = new NEvents(this, null, this._EVENT_TYPES);
        if (this.eventListeners instanceof Object) {
            this.events.addListener(this.eventListeners)
        }
        if (this.id == null) {
            this.id = NUtility.createUniqueID(this._CLASS_NAME + "_")
        }
    },
    dispose: function () {
        if (this.events) {
            if (this.eventListeners) {
                this.events.removeListener(this.eventListeners)
            }
            this.events.dispose();
            this.events = null
        }
        this.eventListeners = null;
        if (this.processor) {
            this.processor.dispose();
            this.processor = null
        }
        if (this.processors) {
            for (var key in this.processors) {
                if (this.processors.hasOwnProperty(key) && typeof this.processors[key].dispose == "function") {
                    this.processors[key].dispose()
                }
            }
            this.processors = null
        }
        if (this.map) {
            this.map.removeControl(this);
            this.map = null
        }
    },
    setMap: function (map) {
        this.map = map;
        if (this.processor) {
            this.processor.setMap(map)
        }
    },
    draw: function (px) {
        if (this.div == null) {
            this.div = NUtility.createDiv(this.id);
            this.div.className = this.cssClassName;
            if (!this.canSelection) {
                this.div.className += " nmControlNoSelect";
                this.div.setAttribute("unselectable", "on", 0);
                this.div.onselectstart = function () {
                    return (false)
                }
            }
            if (this.title != "") {
                this.div.title = this.title
            }
        }
        if (px != null) {
            this.position = px.clone()
        }
        this.moveTo(this.position);
        return this.div
    },
    moveTo: function (px) {
        if ((px != null) && (this.div != null)) {
            this.div.style.left = px.x + "px";
            this.div.style.top = px.y + "px"
        }
    },
    enable: function () {
        if (this._enable) {
            return false
        }
        if (this.processor) {
            this.processor.enable()
        }
        this._enable = true;
        this.events.triggerEvent("enable");
        return true
    },
    disable: function () {
        if (this._enable) {
            if (this.processor) {
                this.processor.disable()
            }
            this._enable = false;
            this.events.triggerEvent("disable");
            return true
        }
        return false
    },
    _CLASS_NAME: "NControl"
});
NControl.TYPE_BUTTON = 1;
NControl.TYPE_TOGGLE = 2;
NControl.TYPE_TOOL = 3;
NCursorPositionControl = NObject(NControl, {
    type: "NCursorPositionControl",
    element: null,
    prefixStr: '',
    separator: ', ',
    postfixStr: '',
    digitsNum: 5,
    granularity: 10,
    lastPos: null,
    projection4Display: null,
    construct: function (options) {
        NControl.prototype.construct.apply(this, arguments)
    },
    dispose: function () {
        if (this.map) {
            this.map.events._unregister('mousemove', this, this.redraw)
        }
        NControl.prototype.dispose.apply(this, arguments)
    },
    draw: function () {
        NControl.prototype.draw.apply(this, arguments);
        if (!this.element) {
            this.div.left = "";
            this.div.top = "";
            this.element = this.div
        }
        this.redraw();
        return this.div
    },
    redraw: function (evt) {
        var lonLat;
        if (evt == null) {
            lonLat = new NLatLng(0, 0)
        } else {
            if (this.lastPos == null || Math.abs(evt.xy.x - this.lastPos.x) > this.granularity || Math.abs(evt.xy.y - this.lastPos.y) > this.granularity) {
                this.lastPos = evt.xy;
                return
            }
            lonLat = this.map.pixelToWorld(evt.xy);
            if (!lonLat) {
                return
            }
            if (this.projection4Display) {
                lonLat.transform(this.map.getProjection(), this.projection4Display)
            }
            this.lastPos = evt.xy
        }
        var newHtml = this.formatOutput(lonLat);
        if (newHtml != this.element.innerHTML) {
            this.element.innerHTML = newHtml
        }
    },
    formatOutput: function (lonLat) {
        var digits = parseInt(this.digitsNum);
        var newHtml = this.prefixStr + lonLat.lon.toFixed(digits) + this.separator + lonLat.lat.toFixed(digits) + " " + this.postfixStr;
        return newHtml
    },
    setMap: function () {
        NControl.prototype.setMap.apply(this, arguments);
        this.suffix = this.map.units;
        this.map.events._register('mousemove', this, this.redraw)
    },
    _CLASS_NAME: "NCursorPositionControl"
});
NOverviewMapControl = NObject(NControl, {
    controlType: "NOverviewMapControl",
    backgroundColor: "white",
    element: null,
    ovmap: null,
    size: new NSize(180, 90),
    layers: null,
    minRectSize: 15,
    minRectDisplayClass: "RectReplacement",
    minRatio: 8,
    maxRatio: 32,
    mapOptions: null,
    processors: null,
    resolutionFactor: 3,
    construct: function (options) {
        this.layers = [];
        this.processors = {};
        NControl.prototype.construct.apply(this, [options])
    },
    setOverviewMapLayer: function (layer) {
        if (layer != null && layer.isBasicLayer) {
            this.layers = [layer]
        }
    },
    dispose: function () {
        if (!this.mapDiv) {
            return
        }
        this.processors.click.dispose();
        this.mapDiv.removeChild(this.extentRectangle);
        this.extentRectangle = null;
        this.rectEvents.dispose();
        this.rectEvents = null;
        this.ovmap.dispose();
        this.ovmap = null;
        this.element.removeChild(this.mapDiv);
        this.mapDiv = null;
        this.div.removeChild(this.element);
        this.element = null;
        if (this.maximizeDiv) {
            NEvent.stopObservingElement(this.maximizeDiv);
            this.div.removeChild(this.maximizeDiv);
            this.maximizeDiv = null
        }
        if (this.minimizeDiv) {
            NEvent.stopObservingElement(this.minimizeDiv);
            this.div.removeChild(this.minimizeDiv);
            this.minimizeDiv = null
        }
        this.map.events.removeListener({
            "moveend": this.update,
            "changebasiclayer": this.basicLayerDraw,
            scope: this
        });
        NControl.prototype.dispose.apply(this, arguments)
    },
    draw: function () {
        NControl.prototype.draw.apply(this, arguments);
        if (!(this.layers.length > 0)) {
            if (this.map.basicLayer) {
                var layer = this.map.basicLayer.clone();
                this.layers = [layer]
            } else {
                this.map.events._register("changebasiclayer", this, this.basicLayerDraw);
                return this.div
            }
        }
        this.element = document.createElement('div');
        this.element.className = this.cssClassName + 'Element';
        this.element.style.display = 'none';
        this.element.style.backgroundColor = this.backgroundColor;
        this.mapDiv = document.createElement('div');
        this.mapDiv.style.width = this.size.w + 'px';
        this.mapDiv.style.height = this.size.h + 'px';
        this.mapDiv.style.position = 'relative';
        this.mapDiv.style.overflow = 'hidden';
        this.mapDiv.id = NUtility.createUniqueID('overviewMap');
        this.extentRectangle = document.createElement('div');
        this.extentRectangle.style.position = 'absolute';
        this.extentRectangle.style.zIndex = 1000;
        this.extentRectangle.className = this.cssClassName + 'ExtentRectangle';
        this.mapDiv.appendChild(this.extentRectangle);
        this.element.appendChild(this.mapDiv);
        this.div.appendChild(this.element);
        if (!this.outsideViewport) {
            this.div.className += " " + this.cssClassName + 'Container';
            var imgLocation = NUtility.getImagesLocation();
            var img = imgLocation + 'layerListOn.gif';
            this.maximizeDiv = NUtility.createAlphaImageDiv(this.cssClassName + 'MaximizeButton', null, new NSize(18, 18), img, 'absolute');
            this.maximizeDiv.style.display = 'none';
            this.maximizeDiv.style.cursor = 'pointer';
            this.maximizeDiv.className = this.cssClassName + 'MaximizeButton';
            NEvent.observe(this.maximizeDiv, 'click', NFunction.bindAsEventListener(this.maximizeControl, this));
            this.div.appendChild(this.maximizeDiv);
            var img = imgLocation + 'layerListOff.gif';
            this.minimizeDiv = NUtility.createAlphaImageDiv('NewMap_Control_minimizeDiv', null, new NSize(18, 18), img, 'absolute');
            this.minimizeDiv.style.display = 'none';
            this.minimizeDiv.style.cursor = 'pointer';
            this.minimizeDiv.className = this.cssClassName + 'MinimizeButton';
            NEvent.observe(this.minimizeDiv, 'click', NFunction.bindAsEventListener(this.minimizeControl, this));
            this.div.appendChild(this.minimizeDiv);
            var eventsToStop = ['dblclick', 'mousedown'];
            for (var i = 0, len = eventsToStop.length; i < len; i++) {
                NEvent.observe(this.maximizeDiv, eventsToStop[i], NEvent.stop);
                NEvent.observe(this.minimizeDiv, eventsToStop[i], NEvent.stop)
            }
            this.minimizeControl()
        } else {
            this.element.style.display = ''
        }
        if (this.map.getExtent()) {
            this.update()
        }
        this.map.events._register('moveend', this, this.update);
        return this.div
    },
    basicLayerDraw: function () {
        this.draw();
        this.map.events._unregister("changebasiclayer", this, this.basicLayerDraw)
    },
    rectDrag: function (px) {
        var deltaX = this.processors.drag.last.x - px.x;
        var deltaY = this.processors.drag.last.y - px.y;
        if (deltaX != 0 || deltaY != 0) {
            var rectTop = this.rectPxBounds.top;
            var rectLeft = this.rectPxBounds.left;
            var rectHeight = Math.abs(this.rectPxBounds.getHeight());
            var rectWidth = this.rectPxBounds.getWidth();
            var newTop = Math.max(0, (rectTop - deltaY));
            newTop = Math.min(newTop, this.ovmap.size.h - this.hComp - rectHeight);
            var newLeft = Math.max(0, (rectLeft - deltaX));
            newLeft = Math.min(newLeft, this.ovmap.size.w - this.wComp - rectWidth);
            this.setRectPxBounds(new NBounds(newLeft, newTop + rectHeight, newLeft + rectWidth, newTop))
        }
    },
    mapDivClick: function (evt) {
        var pxCenter = this.rectPxBounds.getCenterInPixel();
        var deltaX = evt.xy.x - pxCenter.x;
        var deltaY = evt.xy.y - pxCenter.y;
        var top = this.rectPxBounds.top;
        var left = this.rectPxBounds.left;
        var height = Math.abs(this.rectPxBounds.getHeight());
        var width = this.rectPxBounds.getWidth();
        var newTop = Math.max(0, (top + deltaY));
        newTop = Math.min(newTop, this.ovmap.size.h - height);
        var newLeft = Math.max(0, (left + deltaX));
        newLeft = Math.min(newLeft, this.ovmap.size.w - width);
        this.setRectPxBounds(new NBounds(newLeft, newTop + height, newLeft + width, newTop));
        this.updateMapToRect()
    },
    maximizeControl: function (e) {
        this.element.style.display = '';
        this.showToggle(false);
        if (e != null) {
            NEvent.stop(e)
        }
    },
    minimizeControl: function (e) {
        this.element.style.display = 'none';
        this.showToggle(true);
        if (e != null) {
            NEvent.stop(e)
        }
    },
    showToggle: function (minimize) {
        this.maximizeDiv.style.display = minimize ? '' : 'none';
        this.minimizeDiv.style.display = minimize ? 'none' : ''
    },
    update: function () {
        if (this.ovmap == null) {
            this.createMap()
        }
        if (!this.isSuitableOverview()) {
            this.updateOverview()
        }
        this.updateRectToMap()
    },
    isSuitableOverview: function () {
        var mapExtent = this.map.getExtent();
        var maxExtent = this.map.maxExtent;
        var testExtent = new NBounds(Math.max(mapExtent.left, maxExtent.left), Math.max(mapExtent.bottom, maxExtent.bottom), Math.min(mapExtent.right, maxExtent.right), Math.min(mapExtent.top, maxExtent.top));
        if (this.ovmap.getProjectionCode() != this.map.getProjectionCode()) {
            testExtent = testExtent.transform(this.map.getProjection(), this.ovmap.getProjection())
        }
        var resRatio = this.ovmap.getResolution() / this.map.getResolution();
        return ((resRatio > this.minRatio) && (resRatio <= this.maxRatio) && (this.ovmap.getExtent().containsBounds(testExtent)))
    },
    updateOverview: function () {
        var mapRes = this.map.getResolution();
        var targetRes = this.ovmap.getResolution();
        var resRatio = targetRes / mapRes;
        if (resRatio > this.maxRatio) {
            targetRes = this.minRatio * mapRes
        } else if (resRatio <= this.minRatio) {
            targetRes = this.maxRatio * mapRes
        }
        var center;
        if (this.ovmap.getProjectionCode() != this.map.getProjectionCode()) {
            center = this.map.center.clone();
            center.transform(this.map.getProjection(), this.ovmap.getProjection())
        } else {
            center = this.map.center
        }
        this.ovmap.setCenter(center, this.ovmap.getZoomLevelByResolution(targetRes * this.resolutionFactor));
        this.updateRectToMap()
    },
    createMap: function () {
        var options = NUtility.extend({
            controls: [],
            maxResolution: 'auto',
            persistEvent: false
        }, this.mapOptions);
        this.ovmap = new NMap(this.mapDiv, options);
        NEvent.stopObserving(window, 'unload', this.ovmap._unloadDestroy);
        this.ovmap.addLayers(this.layers);
        this.ovmap.zoomToMaxExtent();
        this.wComp = parseInt(NElement.getStyle(this.extentRectangle, 'border-left-width')) + parseInt(NElement.getStyle(this.extentRectangle, 'border-right-width'));
        this.wComp = (this.wComp) ? this.wComp : 2;
        this.hComp = parseInt(NElement.getStyle(this.extentRectangle, 'border-top-width')) + parseInt(NElement.getStyle(this.extentRectangle, 'border-bottom-width'));
        this.hComp = (this.hComp) ? this.hComp : 2;
        this.processors.drag = new NDragProcessor(this, {
            move: this.rectDrag,
            done: this.updateMapToRect
        }, {
            map: this.ovmap
        });
        this.processors.click = new NClickProcessor(this, {
            "click": this.mapDivClick
        }, {
            "single": true,
            "double": false,
            "stopSingle": true,
            "stopDouble": true,
            "pixelTolerance": 1,
            map: this.ovmap
        });
        this.processors.click.enable();
        this.rectEvents = new NEvents(this, this.extentRectangle, null, true);
        this.rectEvents.bind("mouseover", this, function (e) {
            if (!this.processors.drag.enable && !this.map.dragging) {
                this.processors.drag.enable()
            }
        });
        this.rectEvents.bind("mouseout", this, function (e) {
            if (!this.processors.drag.dragging) {
                this.processors.drag.disable()
            }
        });
        if (this.ovmap.getProjectionCode() != this.map.getProjectionCode()) {
            var sourceUnits = this.map.getProjection().getUnits() || this.map.units || this.map.basicLayer.units;
            var targetUnits = this.ovmap.getProjection().getUnits() || this.ovmap.units || this.ovmap.basicLayer.units;
            this.resolutionFactor = sourceUnits && targetUnits ? NINCHES_PER_UNIT[sourceUnits] / NINCHES_PER_UNIT[targetUnits] : 1
        }
    },
    updateRectToMap: function () {
        var bounds;
        if (this.ovmap.getProjectionCode() != this.map.getProjectionCode()) {
            bounds = this.map.getExtent().transform(this.map.getProjection(), this.ovmap.getProjection())
        } else {
            bounds = this.map.getExtent()
        }
        var pxBounds = this.getRectBoundsFromMapBounds(bounds);
        if (pxBounds) {
            this.setRectPxBounds(pxBounds)
        }
    },
    updateMapToRect: function () {
        var lonLatBounds = this.getMapBoundsFromRectBounds(this.rectPxBounds);
        if (this.ovmap.getProjectionCode() != this.map.getProjectionCode()) {
            lonLatBounds = lonLatBounds.transform(this.ovmap.getProjection(), this.map.getProjection())
        }
        this.map.panTo(lonLatBounds.getCenterInLatLng())
    },
    setRectPxBounds: function (pxBounds) {
        var top = Math.max(pxBounds.top, 0);
        var left = Math.max(pxBounds.left, 0);
        var bottom = Math.min(pxBounds.top + Math.abs(pxBounds.getHeight()), this.ovmap.size.h - this.hComp);
        var right = Math.min(pxBounds.left + pxBounds.getWidth(), this.ovmap.size.w - this.wComp);
        var width = Math.max(right - left, 0);
        var height = Math.max(bottom - top, 0);
        if (width < this.minRectSize || height < this.minRectSize) {
            this.extentRectangle.className = this.cssClassName + this.minRectDisplayClass;
            var rLeft = left + (width / 2) - (this.minRectSize / 2);
            var rTop = top + (height / 2) - (this.minRectSize / 2);
            this.extentRectangle.style.top = Math.round(rTop) + 'px';
            this.extentRectangle.style.left = Math.round(rLeft) + 'px';
            this.extentRectangle.style.height = this.minRectSize + 'px';
            this.extentRectangle.style.width = this.minRectSize + 'px'
        } else {
            this.extentRectangle.className = this.cssClassName + 'ExtentRectangle';
            this.extentRectangle.style.top = Math.round(top) + 'px';
            this.extentRectangle.style.left = Math.round(left) + 'px';
            this.extentRectangle.style.height = Math.round(height) + 'px';
            this.extentRectangle.style.width = Math.round(width) + 'px'
        }
        this.rectPxBounds = new NBounds(Math.round(left), Math.round(bottom), Math.round(right), Math.round(top))
    },
    getRectBoundsFromMapBounds: function (lonLatBounds) {
        var leftBottomLonLat = new NLatLng(lonLatBounds.left, lonLatBounds.bottom);
        var rightTopLonLat = new NLatLng(lonLatBounds.right, lonLatBounds.top);
        var leftBottomPx = this.getOverviewPxFromLonLat(leftBottomLonLat);
        var rightTopPx = this.getOverviewPxFromLonLat(rightTopLonLat);
        var bounds = null;
        if (leftBottomPx && rightTopPx) {
            bounds = new NBounds(leftBottomPx.x, leftBottomPx.y, rightTopPx.x, rightTopPx.y)
        }
        return bounds
    },
    getMapBoundsFromRectBounds: function (pxBounds) {
        var leftBottomPx = new NPixel(pxBounds.left, pxBounds.bottom);
        var rightTopPx = new NPixel(pxBounds.right, pxBounds.top);
        var leftBottomLonLat = this.getLonLatFromOverviewPx(leftBottomPx);
        var rightTopLonLat = this.getLonLatFromOverviewPx(rightTopPx);
        return new NBounds(leftBottomLonLat.lon, leftBottomLonLat.lat, rightTopLonLat.lon, rightTopLonLat.lat)
    },
    getLonLatFromOverviewPx: function (overviewMapPx) {
        var size = this.ovmap.size;
        var res = this.ovmap.getResolution();
        var center = this.ovmap.getExtent().getCenterInLatLng();
        var delta_x = overviewMapPx.x - (size.w / 2);
        var delta_y = overviewMapPx.y - (size.h / 2);
        return new NLatLng(center.lon + delta_x * res, center.lat - delta_y * res)
    },
    getOverviewPxFromLonLat: function (latlng) {
        var res = this.ovmap.getResolution();
        var extent = this.ovmap.getExtent();
        var px = null;
        if (extent) {
            px = new NPixel(Math.round(1 / res * (latlng.lon - extent.left)), Math.round(1 / res * (extent.top - latlng.lat)))
        }
        return px
    },
    _CLASS_NAME: 'NOverviewMapControl'
});
NPanZoomControl = NObject(NControl, {
    controlType: 'NPanZoomControl',
    slideStep: 50,
    buttons: null,
    position: null,
    construct: function (options) {
        this.position = new NPixel(NPanZoomControl.X, NPanZoomControl.Y);
        NControl.prototype.construct.apply(this, arguments)
    },
    dispose: function () {
        NControl.prototype.dispose.apply(this, arguments);
        while (this.buttons.length) {
            var btn = this.buttons.shift();
            btn.map = null;
            NEvent.stopObservingElement(btn)
        }
        this.buttons = null;
        this.position = null
    },
    draw: function (px) {
        NControl.prototype.draw.apply(this, arguments);
        px = this.position;
        this.buttons = [];
        var sz = new NSize(18, 18);
        var centered = new NPixel(px.x + sz.w / 2, px.y);
        this._addButton("panup", "north-mini.png", centered, sz);
        px.y = centered.y + sz.h;
        this._addButton("panleft", "west-mini.png", px, sz);
        this._addButton("panright", "east-mini.png", px.offsetByXY(sz.w, 0), sz);
        this._addButton("pandown", "south-mini.png", centered.offsetByXY(0, sz.h * 2), sz);
        this._addButton("zoomin", "zoomLevel-plus-mini.png", centered.offsetByXY(0, sz.h * 3 + 5), sz);
        this._addButton("zoomworld", "zoomLevel-world-mini.png", centered.offsetByXY(0, sz.h * 4 + 5), sz);
        this._addButton("zoomout", "zoomLevel-minus-mini.png", centered.offsetByXY(0, sz.h * 5 + 5), sz);
        return this.div
    },
    _addButton: function (id, img, xy, sz) {
        var imgLocation = NUtility.getImagesLocation() + img;
        var btn = NUtility.createAlphaImageDiv(this.id + "_" + id, xy, sz, imgLocation, "absolute");
        this.div.appendChild(btn);
        btn.style.cursor = 'pointer';
        NEvent.observe(btn, "mousedown", NFunction.bindAsEventListener(this.buttonDown, btn));
        NEvent.observe(btn, "dblclick", NFunction.bindAsEventListener(this.doubleClick, btn));
        NEvent.observe(btn, "click", NFunction.bindAsEventListener(this.doubleClick, btn));
        btn.action = id;
        btn.map = this.map;
        btn.slideStep = this.slideStep;
        this.buttons.push(btn);
        return btn
    },
    doubleClick: function (evt) {
        NEvent.stop(evt);
        return false
    },
    buttonDown: function (evt) {
        if (!NEvent.isLeftClick(evt)) {
            return
        }
        switch (this.action) {
        case "panup":
            this.map.pan(0, -this.slideStep);
            break;
        case "pandown":
            this.map.pan(0, this.slideStep);
            break;
        case "panleft":
            this.map.pan(-this.slideStep, 0);
            break;
        case "panright":
            this.map.pan(this.slideStep, 0);
            break;
        case "zoomin":
            this.map.zoomIn();
            break;
        case "zoomout":
            this.map.zoomOut();
            break;
        case "zoomworld":
            this.map.zoomToMaxExtent();
            break
        }
        NEvent.stop(evt)
    },
    _CLASS_NAME: "NPanZoomControl"
});
NPanZoomControl.X = 4;
NPanZoomControl.Y = 4;
NPanelControl = NObject(NControl, {
    tools: null,
    controlType: 'NPanelControl',
    defaultTool: null,
    construct: function (options) {
        NControl.prototype.construct.apply(this, [options]);
        this.tools = []
    },
    dispose: function () {
        NControl.prototype.dispose.apply(this, arguments);
        for (var i = this.tools.length - 1; i >= 0; i--) {
            if (this.tools[i].events) {
                this.tools[i].events.removeListener({
                    "enable": this.redraw,
                    "disable": this.redraw,
                    scope: this
                })
            }
            NEvent.stopObservingElement(this.tools[i].panel_div);
            this.tools[i].panel_div = null
        }
    },
    enable: function () {
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
    disable: function () {
        if (NControl.prototype.disable.apply(this, arguments)) {
            for (var i = 0, len = this.tools.length; i < len; i++) {
                this.tools[i].disable()
            }
            return true
        } else {
            return false
        }
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
        return this.div
    },
    redraw: function () {
        this.div.innerHTML = "";
        if (this._enable) {
            for (var i = 0, len = this.tools.length; i < len; i++) {
                var element = this.tools[i].panel_div;
                if (this.tools[i]._enable) {
                    element.className = this.tools[i].cssClassName + "ItemActive"
                } else {
                    element.className = this.tools[i].cssClassName + "ItemInactive"
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
            this.redraw();
            return
        }
        if (tool.type == NTool.TYPE_TOGGLE) {
            if (tool._enable) {
                tool.disable()
            } else {
                tool.enable()
            }
            this.redraw();
            return
        }
        for (var i = 0, len = this.tools.length; i < len; i++) {
            if (this.tools[i] != tool) {
                if (this.tools[i].type != NTool.TYPE_TOGGLE) {
                    this.tools[i].disable()
                }
            }
        }
        tool.enable()
    },
    addTools: function (tools) {
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
    onClick: function (ctrl, evt) {
        NEvent.stop(evt ? evt : window.event);
        this.enableTool(ctrl)
    },
    _getToolsBy: function (property, match) {
        var test = (typeof match.test == "function");
        var found = NArray.filter(this.tools, function (item) {
            return item[property] == match || (test && match.test(item[property]))
        });
        return found
    },
    getToolsByName: function (match) {
        return this._getToolsBy("name", match)
    },
    getToolsByClass: function (match) {
        return this._getToolsBy("_CLASS_NAME", match)
    },
    _CLASS_NAME: "NPanelControl"
});
NPanZoomBarControl = NObject(NPanZoomControl, {
    control: 'NPanZoomBarControl',
    zoomStopWidth: 18,
    zoomStopHeight: 11,
    slider: null,
    sliderEvents: null,
    zoomBarDiv: null,
    divEvents: null,
    zoomWorldIcon: false,
    pictureshape: 1,
    construct: function (options) {
        NPanZoomControl.prototype.construct.apply(this, arguments)
    },
    dispose: function () {
        this.div.removeChild(this.slider);
        this.slider = null;
        this.sliderEvents.dispose();
        this.sliderEvents = null;
        this.div.removeChild(this.zoombarDiv);
        this.zoomBarDiv = null;
        this.divEvents.dispose();
        this.divEvents = null;
        this.map.events.removeListener({
            "zoomend": this.moveZoomBar,
            "changebasiclayer": this.redraw,
            scope: this
        });
        NPanZoomControl.prototype.dispose.apply(this, arguments)
    },
    setMap: function (map) {
        NPanZoomControl.prototype.setMap.apply(this, arguments);
        this.map.events._register("changebasiclayer", this, this.redraw)
    },
    redraw: function () {
        if (this.div != null) {
            this.div.innerHTML = ""
        }
        this.draw()
    },
    draw: function (px) {
        NControl.prototype.draw.apply(this, arguments);
        px = this.position.clone();
        this.buttons = [];
        var sz = new NSize(18, 18);
        var centered = new NPixel(px.x + sz.w / 2, px.y);
        var wposition = sz.w;
        if (this.zoomWorldIcon) {
            centered = new NPixel(px.x + sz.w, px.y)
        }
        this._addButton("panup", "north-mini_" + this.pictureshape + ".png", centered, sz);
        px.y = centered.y + sz.h;
        this._addButton("panleft", "west-mini_" + this.pictureshape + ".png", px, sz);
        if (this.zoomWorldIcon) {
            this._addButton("zoomworld", "zoomLevel-world-mini.png", px.offsetByXY(sz.w, 0), sz);
            wposition *= 2
        }
        this._addButton("panright", "east-mini_" + this.pictureshape + ".png", px.offsetByXY(wposition, 0), sz);
        this._addButton("pandown", "south-mini_" + this.pictureshape + ".png", centered.offsetByXY(0, sz.h * 2), sz);
        this._addButton("zoomin", "zoomLevel-plus-mini_" + this.pictureshape + ".png", centered.offsetByXY(0, sz.h * 3 + 5), sz);
        centered = this._addZoomBar(centered.offsetByXY(0, sz.h * 4 + 5));
        this._addButton("zoomout", "zoomLevel-minus-mini_" + this.pictureshape + ".png", centered, sz);
        this.div.style.cursor = 'pointer';
        return this.div
    },
    _addZoomBar: function (centered) {
        var imgLocation = NUtility.getImagesLocation();
        var id = this.id + "_" + this.map.id;
        var zoomsToEnd = this.map.getZoomLevelsCount() - 1 - this.map.getZoomLevel();
        var slider = NUtility.createAlphaImageDiv(id, centered.offsetByXY(-1, zoomsToEnd * this.zoomStopHeight), new NSize(20, 9), imgLocation + "slider_" + this.pictureshape + ".png", "absolute");
        this.slider = slider;
        this.slider.style.cursor = 'pointer';
        this.sliderEvents = new NEvents(this, slider, null, true, {
            autoAddXYProp: true
        });
        this.sliderEvents.addListener({
            "mousedown": this.zoomBarDown,
            "mousemove": this.zoomBarDrag,
            "mouseup": this.zoomBarUp,
            "dblclick": this.doubleClick,
            "click": this.doubleClick
        });
        var sz = new NSize();
        sz.h = this.zoomStopHeight * this.map.getZoomLevelsCount();
        sz.w = this.zoomStopWidth;
        var div = null;
        if (NUtility.alphaHack()) {
            var id = this.id + "_" + this.map.id;
            div = NUtility.createAlphaImageDiv(id, centered, new NSize(sz.w, this.zoomStopHeight), imgLocation + "zoombar_" + this.pictureshape + ".png", "absolute", null, "crop");
            div.style.height = sz.h + "px"
        } else {
            div = NUtility.createDiv('NewMap_Control_PanZoomBar_Zoombar' + this.map.id, centered, sz, imgLocation + "zoombar_" + this.pictureshape + ".png")
        }
        this.zoombarDiv = div;
        this.zoombarDiv.style.cursor = 'pointer';
        this.divEvents = new NEvents(this, div, null, true, {
            autoAddXYProp: true
        });
        this.divEvents.addListener({
            "mousedown": this.divClick,
            "mousemove": this.passEventToSlider,
            "dblclick": this.doubleClick,
            "click": this.doubleClick
        });
        this.div.appendChild(div);
        this.startTop = parseInt(div.style.top);
        this.div.appendChild(slider);
        this.map.events._register("zoomend", this, this.moveZoomBar);
        centered = centered.offsetByXY(0, this.zoomStopHeight * this.map.getZoomLevelsCount());
        return centered
    },
    passEventToSlider: function (evt) {
        this.sliderEvents.triggerBrowserEvent(evt)
    },
    divClick: function (evt) {
        if (!NEvent.isLeftClick(evt)) {
            return
        }
        var y = evt.xy.y;
        var top = NUtility.pagePosition(evt.object)[1];
        var levels = (y - top) / this.zoomStopHeight;
        if (!this.map.arbitraryScale) {
            levels = Math.floor(levels)
        }
        var zoomLevel = (this.map.getZoomLevelsCount() - 1) - levels;
        zoomLevel = Math.min(Math.max(zoomLevel, 0), this.map.getZoomLevelsCount() - 1);
        this.map.zoomTo(zoomLevel);
        NEvent.stop(evt)
    },
    zoomBarDown: function (evt) {
        if (!NEvent.isLeftClick(evt)) {
            return
        }
        this.map.events.addListener({
            "mousemove": this.passEventToSlider,
            "mouseup": this.passEventToSlider,
            scope: this
        });
        this.mouseDragStart = evt.xy.clone();
        this.zoomStart = evt.xy.clone();
        this.div.style.cursor = "move";
        this.zoombarDiv.offsets = null;
        NEvent.stop(evt)
    },
    zoomBarDrag: function (evt) {
        if (this.mouseDragStart != null) {
            var deltaY = this.mouseDragStart.y - evt.xy.y;
            var offsets = NUtility.pagePosition(this.zoombarDiv);
            if ((evt.clientY - offsets[1]) > 0 && (evt.clientY - offsets[1]) < parseInt(this.zoombarDiv.style.height) - 2) {
                var newTop = parseInt(this.slider.style.top) - deltaY;
                this.slider.style.top = newTop + "px"
            }
            this.mouseDragStart = evt.xy.clone();
            NEvent.stop(evt)
        }
    },
    zoomBarUp: function (evt) {
        if (!NEvent.isLeftClick(evt)) {
            return
        }
        if (this.zoomStart) {
            this.div.style.cursor = "";
            this.map.events.removeListener({
                "mouseup": this.passEventToSlider,
                "mousemove": this.passEventToSlider,
                scope: this
            });
            var deltaY = this.zoomStart.y - evt.xy.y;
            var zoomLevel = this.map.zoomLevel;
            if (this.map.arbitraryScale) {
                zoomLevel += deltaY / this.zoomStopHeight;
                zoomLevel = Math.min(Math.max(zoomLevel, 0), this.map.getZoomLevelsCount() - 1)
            } else {
                zoomLevel += Math.round(deltaY / this.zoomStopHeight)
            }
            this.map.zoomTo(zoomLevel);
            this.moveZoomBar();
            this.mouseDragStart = null;
            NEvent.stop(evt)
        }
    },
    moveZoomBar: function () {
        var newTop = ((this.map.getZoomLevelsCount() - 1) - this.map.getZoomLevel()) * this.zoomStopHeight + this.startTop-6;
        this.slider.style.top = newTop + "px"
    },
    _CLASS_NAME: "NPanZoomBarControl"
});
NScaleBarControl = NObject(NControl, {
    controlType: 'NScaleBarControl',
    maxWidth: 200,
    topOutUnits: "km",
    topInUnits: "m",
    bottomOutUnits: "mi",
    bottomInUnits: "ft",
    eTop: null,
    eBottom: null,
    eScaleText: null,
    construct: function (options) {
        NControl.prototype.construct.apply(this, [options])
    },
    draw: function () {
        NControl.prototype.draw.apply(this, arguments);
        if (!this.eTop) {
            this.div.style.display = "block";
            this.div.style.position = "absolute";
            this.eTop = document.createElement("div");
            this.eTop.className = this.cssClassName + "Top";
            var theLen = this.topInUnits.length;
            this.div.appendChild(this.eTop);
            if ((this.topOutUnits == "") || (this.topInUnits == "")) {
                this.eTop.style.visible = "hidden"
            } else {
                this.eTop.style.visible = "visible"
            }
            this.eScaleText = document.createElement("div");
            this.eScaleText.className = this.cssClassName + "Text";
            this.div.appendChild(this.eScaleText)
        }
        this.map.events._register('moveend', this, this.update);
        this.update();
        return this.div
    },
    getFitWidth: function (maxLen) {
        var digits = parseInt(Math.log(maxLen) / Math.log(10));
        var pow10 = Math.pow(10, digits);
        var firstChar = parseInt(maxLen / pow10);
        var barLen;
        if (firstChar > 5) {
            barLen = 5
        } else if (firstChar > 2) {
            barLen = 2
        } else {
            barLen = 1
        }
        return barLen * pow10
    },
    update: function () {
        var res = this.map.getResolution();
        if (!res) {
            return
        }
        var curMapUnits = this.map.getUnits();
        var inches = NINCHES_PER_UNIT;
        var maxSizeData = this.maxWidth * res * inches[curMapUnits];
        var topUnits;
        if (maxSizeData > 100000) {
            topUnits = this.topOutUnits
        } else {
            topUnits = this.topInUnits
        }
        var topMax = maxSizeData / inches[topUnits];
        var topRounded = this.getFitWidth(topMax);
        topMax = topRounded / inches[curMapUnits] * inches[topUnits];
        var topPx = topMax / res;
        this.eTop.style.width = Math.round(topPx) + "px";
        this.eTop.innerHTML = topRounded + " " + topUnits;
        this.updateScale()
    },
    updateScale: function () {
        var scale = this.map.getScale();
        if (!scale) {
            return
        }
        if (scale >= 9500 && scale <= 9500000) {
            scale = Math.round(scale / 10000) + NMGISLG("10000")
        } else if (scale >= 9500000) {
            scale = Math.round(scale / 10000000) + NMGISLG("10000000")
        } else {
            scale = Math.round(scale)
        }
        this.eScaleText.innerHTML = NMGISLG("scale", {
            'scaleDenom': scale
        })
    },
    _CLASS_NAME: "NScaleBarControl"
});
NLayerListControl = NObject(NControl, {
    controlType: "NLayerListControl",
    backgroundColor: "#ffffff",
    playInSolidDiv: false,
    titleBackgroundIMG: "",
    titleBackgroundHeight: "10px",
    layerStates: null,
    layersDiv: null,
    baseLayersDiv: null,
    baseLayers: null,
    baseLbl: null,
    dataLbl: null,
    dataLayersDiv: null,
    dataLayers: null,
    minimizeDiv: null,
    maximizeDiv: null,
    ascending: true,
    showMinandMaxDiv: false,
    userDiv: false,
    showOrderControl: true,
    showQueryControl: false,
    basicLayerGName: "框架数据",
    overlaysGName: "叠加数据",
    gFontSize: "4px",
    gFontColor: "blue",
    gFont: "微软雅黑",
    layerNameFontSize: "2px",
    layerNameFont: "微软雅黑",
    layerNameFontColor: "black",
    construct: function (options) {
        NControl.prototype.construct.apply(this, arguments);
        this.layerStates = []
    },
    dispose: function () {
        NEvent.stopObservingElement(this.div);
        if (this.minimizeDiv != null) NEvent.stopObservingElement(this.minimizeDiv);
        if (this.maximizeDiv != null) NEvent.stopObservingElement(this.maximizeDiv);
        this.clearLayersArray("base");
        this.clearLayersArray("data");
        this.map.events.removeListener({
            "addlayer": this.redraw,
            "changelayer": this.redraw,
            "removelayer": this.redraw,
            "changebasiclayer": this.redraw,
            scope: this
        });
        NControl.prototype.dispose.apply(this, arguments)
    },
    setMap: function (map) {
        NControl.prototype.setMap.apply(this, arguments);
        this.map.events.addListener({
            "addlayer": this.redraw,
            "changelayer": this.redraw,
            "removelayer": this.redraw,
            "changebasiclayer": this.redraw,
            scope: this
        })
    },
    draw: function () {
        NControl.prototype.draw.apply(this);
        this.loadContents();
        if (!this.userDiv || this.showMinandMaxDiv) {
            if (!this.outsideViewport) {
                this.minimizeControl()
            }
        }
        this.redraw();
        return this.div
    },
    clearLayersArray: function (layersType) {
        var layers = this[layersType + "Layers"];
        if (layers) {
            for (var i = 0, len = layers.length; i < len; i++) {
                var layer = layers[i];
                NEvent.stopObservingElement(layer.inputElem);
                NEvent.stopObservingElement(layer.labelSpan)
            }
        }
        this[layersType + "LayersDiv"].innerHTML = "";
        this[layersType + "Layers"] = []
    },
    checkRedraw: function () {
        var redraw = false;
        if (!this.layerStates.length || (this.map.layers.length != this.layerStates.length)) {
            redraw = true
        } else {
            for (var i = 0, len = this.layerStates.length; i < len; i++) {
                var layerState = this.layerStates[i];
                var layer = this.map.layers[i];
                if ((layerState.name != layer.name) || (layerState.inRange != layer.inRange) || (layerState.id != layer.id) || (layerState.visible != layer.visible)) {
                    redraw = true;
                    break
                }
            }
        }
        return redraw
    },
    moveLayerUp: function () {
        var sortIndex = this.layerSortIndex;
        this.nmLegend.map.setLayerIndex(this.layer, sortIndex - 1)
    },
    moveLayerDown: function () {
        var sortIndex = this.layerSortIndex;
        this.nmLegend.map.setLayerIndex(this.layer, sortIndex + 1)
    },
    queryOnClick: function () {
        if (this.layer.isQueryable) {
            this.src = NUtility.getImagesLocation() + 'button_info_2.gif'
        } else {
            this.src = NUtility.getImagesLocation() + 'button_info_1.gif'
        }
        this.layer.isQueryable = !this.layer.isQueryable
    },
    redraw: function () {
        if (!this.checkRedraw()) {
            return this.div
        }
        this.clearLayersArray("base");
        this.clearLayersArray("data");
        var containsOverlays = false;
        var containsBaseLayers = false;
        var len = this.map.layers.length;
        this.layerStates = new Array(len);
        for (var i = 0; i < len; i++) {
            var layer = this.map.layers[i];
            this.layerStates[i] = {
                'name': layer.name,
                'visible': layer.visible,
                'inRange': layer.inRange,
                'id': layer.id
            }
        }
        var layers = this.map.layers.slice();
        len = layers.length;
        if (!this.ascending) {
            layers.reverse()
        }
        for (var i = 0; i < len; i++) {
            var layer = layers[i];
            var basicLayer = layer.isBasicLayer;
            if (layer.showInLayerList) {
                if (basicLayer) {
                    containsBaseLayers = true
                } else {
                    containsOverlays = true
                }
                var checked = (basicLayer) ? (layer == this.map.basicLayer) : layer.getVisible();
                var groupDiv = (basicLayer) ? this.baseLayersDiv : this.dataLayersDiv;
                var inputElem = document.createElement("input");
                inputElem.id = this.id + "_input_" + layer.name;
                inputElem.name = (basicLayer) ? "baseLayers" : layer.name;
                inputElem.type = (basicLayer) ? "radio" : "checkbox";
                inputElem.value = layer.name;
                inputElem.checked = checked;
                inputElem.defaultChecked = checked;
                var tr, td;
                tr = document.createElement('tr');
                td = document.createElement('td');
                td.width = '16';
                td.style.padding = '1px';
                td.appendChild(inputElem);
                tr.appendChild(td);
                if (this.showOrderControl) {
                    td = document.createElement('td');
                    td.width = '10';
                    td.style.padding = '1px';
                    img = document.createElement('img');
                    img.src = NUtility.getImagesLocation() + 'button_up.gif';
                    img.width = '10';
                    img.height = '8';
                    img.style.marginBottom = '2px';
                    img.alt = "图层上移";
                    img.title = "图层上移";
                    img.nmLegend = this;
                    img.layerSortIndex = i;
                    img.layer = layer;
                    img.myDiv = groupDiv;
                    img.onclick = this.moveLayerUp;
                    td.appendChild(img);
                    img = document.createElement('img');
                    img.src = NUtility.getImagesLocation() + 'button_down.gif';
                    img.width = '10';
                    img.height = '8';
                    img.alt = "图层下移";
                    img.title = "图层下移";
                    img.nmLegend = this;
                    img.layerSortIndex = i;
                    img.layer = layer;
                    img.myDiv = groupDiv;
                    img.onclick = this.moveLayerDown;
                    td.appendChild(img);
                    tr.appendChild(td)
                }
                if (this.showQueryControl) {
                    img = document.createElement('img');
                    img.width = '14';
                    img.height = '14';
                    img.src = NUtility.getImagesLocation() + 'button_info_2.gif';
                    img.layer = layer;
                    img.myDiv = groupDiv;
                    img.onclick = this.queryOnClick;
                    td = document.createElement('td');
                    td.appendChild(img);
                    td.width = '16';
                    tr.appendChild(td)
                }
                if (!basicLayer && !layer.inRange) {
                    inputElem.disabled = true
                }
                var context = {
                    'inputElem': inputElem,
                    'layer': layer,
                    'layerSwitcher': this
                };
                NEvent.observe(inputElem, "mouseup", NFunction.bindAsEventListener(this.onInputClick, context));
                var labelSpan = document.createElement("span");
                if (!basicLayer && !layer.inRange) {
                    labelSpan.style.color = "black"
                }
                labelSpan.innerHTML = "<font color='" + this.layerNameFontColor + "' size=" + this.layerNameFontSize + ">" + layer.name + "</font>";
                labelSpan.style.verticalAlign = (basicLayer) ? "bottom" : "baseline";
                NEvent.observe(labelSpan, "click", NFunction.bindAsEventListener(this.onInputClick, context));
                var groupArray = (basicLayer) ? this.baseLayers : this.dataLayers;
                groupArray.push({
                    'layer': layer,
                    'inputElem': inputElem,
                    'labelSpan': labelSpan
                });
                td = document.createElement('td');
                td.style.padding = '1px';
                td.appendChild(labelSpan);
                tr.appendChild(td);
                var tb = document.createElement('tbody');
                tb.appendChild(tr);
                var t = document.createElement('table');
                t.setAttribute('cellPadding', "0");
                t.setAttribute('cellSpacing', "0");
                t.setAttribute('border', "0");
                t.appendChild(tb);
                groupDiv.appendChild(t)
            }
        }
    },
    onInputClick: function (e) {
        if (!this.inputElem.disabled) {
            if (this.inputElem.type == "radio") {
                this.inputElem.checked = true;
                this.layer.map.setBasicLayer(this.layer)
            } else {
                this.inputElem.checked = !this.inputElem.checked;
                this.layerSwitcher.updateMap()
            }
        }
        NEvent.stop(e)
    },
    onLayerClick: function (e) {
        this.updateMap()
    },
    updateMap: function () {
        for (var i = 0, len = this.baseLayers.length; i < len; i++) {
            var layerEntry = this.baseLayers[i];
            if (layerEntry.inputElem.checked) {
                this.map.setBasicLayer(layerEntry.layer, false)
            }
        }
        for (var i = 0, len = this.dataLayers.length; i < len; i++) {
            var layerEntry = this.dataLayers[i];
            layerEntry.layer.setVisible(layerEntry.inputElem.checked)
        }
    },
    maximizeControl: function (e) {
        this.div.style.width = "20em";
        this.showControls(false);
        if (e != null) {
            NEvent.stop(e)
        }
    },
    minimizeControl: function (e) {
        this.div.style.width = "0px";
        this.showControls(true);
        if (e != null) {
            NEvent.stop(e)
        }
    },
    showControls: function (minimize) {
        if (this.maximizeDiv != null) this.maximizeDiv.style.display = minimize ? "" : "none";
        if (this.minimizeDiv != null) this.minimizeDiv.style.display = minimize ? "none" : "";
        this.layersDiv.style.display = minimize ? "none" : ""
    },
    loadContents: function () {
        if (this.div.id != null && this.div.id != "undefined" && this.div.id.indexOf(this._CLASS_NAME + "_") == -1) {
            this.userDiv = true
        }
        if (this.userDiv) {
            this.div.style.fontFamily = "微软雅黑";
            this.div.style.fontWeight = "bold";
            this.div.style.fontSize = this.layerNameFontSize;
            this.div.style.color = "black";
            this.div.style.backgroundColor = "transparent"
        } else {
            this.div.style.position = "absolute";
            this.div.style.top = "25px";
            this.div.style.right = "0px";
            this.div.style.left = "";
            this.div.style.fontFamily = "sans-serif";
            this.div.style.fontWeight = "bold";
            this.div.style.marginTop = "3px";
            this.div.style.marginLeft = "3px";
            this.div.style.marginBottom = "3px";
            this.div.style.fontSize = "smaller";
            this.div.style.color = "darkblue";
            this.div.style.backgroundColor = "transparent"
        }
        NEvent.observe(this.div, "mouseup", NFunction.bindAsEventListener(this.mouseUp, this));
        NEvent.observe(this.div, "click", this.ignoreEvent);
        NEvent.observe(this.div, "mousedown", NFunction.bindAsEventListener(this.mouseDown, this));
        NEvent.observe(this.div, "dblclick", this.ignoreEvent);
        this.layersDiv = document.createElement("div");
        this.layersDiv.id = this.id + "_layersDiv";
        if (this.userDiv) {} else {
            this.layersDiv.style.paddingTop = "5px";
            this.layersDiv.style.paddingLeft = "10px";
            this.layersDiv.style.paddingBottom = "5px";
            this.layersDiv.style.paddingRight = "25px"
        }
        this.layersDiv.style.backgroundColor = this.backgroundColor;
        this.layersDiv.style.width = "100%";
        this.layersDiv.style.height = "100%";
        this.layersDiv.style.overflow = "auto";
        this.baseLbl = document.createElement("div");
        if (this.playInSolidDiv) {
            this.baseLbl.style.height = this.titleBackgroundHeight;
            this.baseLbl.style.align = 'center';
            this.baseLbl.style.fontFamily = "微软雅黑";
            this.baseLbl.style.fontSize = "larger"
        }
        this.baseLbl.innerHTML = "<font color='" + this.gFontColor + "' size=" + this.gFontSize + ">" + NMGISLG(this.basicLayerGName) + "</font>";
        this.baseLbl.style.marginTop = "3px";
        this.baseLbl.style.marginLeft = "3px";
        this.baseLbl.style.marginBottom = "3px";
        this.baseLayersDiv = document.createElement("div");
        this.baseLayersDiv.style.paddingLeft = "10px";
        this.baseLayersDiv.className = "Legend_BaseLayers";
        this.dataLbl = document.createElement("div");
        this.dataLbl.innerHTML = "<font color='" + this.gFontColor + "' size=" + this.gFontSize + ">" + NMGISLG(this.overlaysGName) + "</font>";
        if (this.playInSolidDiv) {
            this.dataLbl.style.height = this.titleBackgroundHeight;
            this.dataLbl.style.align = 'center';
            this.dataLbl.style.fontFamily = "微软雅黑";
            this.dataLbl.style.fontSize = "larger"
        }
        this.dataLbl.style.marginTop = "3px";
        this.dataLbl.style.marginLeft = "3px";
        this.dataLbl.style.marginBottom = "3px";
        this.dataLayersDiv = document.createElement("div");
        this.dataLayersDiv.style.paddingLeft = "10px";
        this.dataLayersDiv.className = "Legend_DataLayers";
        if (this.playInSolidDiv) {
            this.dataLayersDiv.style.background = this.titleBackgroundIMG;
            this.baseLayersDiv.style.background = this.titleBackgroundIMG
        }
        if (this.ascending) {
            this.layersDiv.appendChild(this.baseLbl);
            this.layersDiv.appendChild(this.baseLayersDiv);
            this.layersDiv.appendChild(this.dataLbl);
            this.layersDiv.appendChild(this.dataLayersDiv)
        } else {
            this.layersDiv.appendChild(this.dataLbl);
            this.layersDiv.appendChild(this.dataLayersDiv);
            this.layersDiv.appendChild(this.baseLbl);
            this.layersDiv.appendChild(this.baseLayersDiv)
        }
        this.div.appendChild(this.layersDiv);
        if (!this.userDiv) {
            NRico.Corner.round(this.div, {
                corners: "tl bl",
                bgColor: "transparent",
                color: this.backgroundColor,
                blend: false
            });
            NRico.Corner.changeOpacity(this.layersDiv, 0.75)
        }
        if (!this.userDiv || this.showMinandMaxDiv) {
            var imgLocation = NUtility.getImagesLocation();
            var sz = new NSize(18, 18);
            var img = imgLocation + 'layerListOn.gif';
            this.maximizeDiv = NUtility.createAlphaImageDiv("NewMap_Control_MaximizeDiv", null, sz, img, "absolute");
            if (this.userDiv) {
                this.maximizeDiv.style.top = "0px";
                this.maximizeDiv.style.right = "";
                this.maximizeDiv.style.left = "0px"
            } else {
                this.maximizeDiv.style.top = "5px";
                this.maximizeDiv.style.right = "0px";
                this.maximizeDiv.style.left = ""
            }
            this.maximizeDiv.style.display = "none";
            NEvent.observe(this.maximizeDiv, "click", NFunction.bindAsEventListener(this.maximizeControl, this));
            this.div.appendChild(this.maximizeDiv);
            var img = imgLocation + 'layerListOff.gif';
            var sz = new NSize(18, 18);
            this.minimizeDiv = NUtility.createAlphaImageDiv("NewMap_Control_MinimizeDiv", null, sz, img, "absolute");
            this.minimizeDiv.style.top = "5px";
            this.minimizeDiv.style.right = "20px";
            this.minimizeDiv.style.left = "";
            this.minimizeDiv.style.display = "none";
            NEvent.observe(this.minimizeDiv, "click", NFunction.bindAsEventListener(this.minimizeControl, this));
            this.div.appendChild(this.minimizeDiv);
            this.showControls(false)
        }
    },
    ignoreEvent: function (evt) {
        NEvent.stop(evt)
    },
    mouseDown: function (evt) {
        this.isMouseDown = true;
        this.ignoreEvent(evt)
    },
    mouseUp: function (evt) {
        if (this.isMouseDown) {
            this.isMouseDown = false;
            this.ignoreEvent(evt)
        }
    },
    _CLASS_NAME: "NLayerListControl"
});
NTool = NObject({
    id: null,
    toolType: 'NTool',
    map: null,
    div: null,
    type: null,
    cssClassName: "",
    title: "",
    _enable: null,
    processor: null,
    eventListeners: null,
    events: null,
    EVENT_TYPES: ["enable", "disable"],
    construct: function (options) {
        this.cssClassName = this._CLASS_NAME.replace("N", "nm").replace(/\./g, "");
        NUtility.extend(this, options);
        this.events = new NEvents(this, null, this.EVENT_TYPES);
        if (this.eventListeners instanceof Object) {
            this.events.addListener(this.eventListeners)
        }
        if (this.id == null) {
            this.id = NUtility.createUniqueID(this._CLASS_NAME + "_")
        }
    },
    dispose: function () {
        if (this.events) {
            if (this.eventListeners) {
                this.events.removeListener(this.eventListeners)
            }
            this.events.dispose();
            this.events = null
        }
        this.eventListeners = null;
        if (this.processor) {
            this.processor.dispose();
            this.processor = null
        }
        if (this.processors) {
            for (var key in this.processors) {
                if (this.processors.hasOwnProperty(key) && typeof this.processors[key].dispose == "function") {
                    this.processors[key].dispose()
                }
            }
            this.processors = null
        }
        if (this.map) {
            this.map.removeTool(this);
            this.map = null
        }
    },
    setMap: function (map) {
        this.map = map;
        if (this.processor) {
            this.processor.setMap(map)
        }
    },
    draw: function (px) {
        if (this.div == null) {
            this.div = NUtility.createDiv(this.id);
            this.div.className = this.cssClassName;
            if (1) {
                this.div.className += " olToolNoSelect";
                this.div.setAttribute("unselectable", "on", 0);
                this.div.onselectstart = function () {
                    return (false)
                }
            }
            if (this.title != "") {
                this.div.title = this.title
            }
        }
        if (px != null) {
            this.position = px.clone()
        }
        this.moveTo(this.position);
        return this.div
    },
    moveTo: function (px) {
        if ((px != null) && (this.div != null)) {
            this.div.style.left = px.x + "px";
            this.div.style.top = px.y + "px"
        }
    },
    enable: function () {
        if (this._enable) {
            return false
        }
        if (this.processor) {
            this.processor.enable()
        }
        this._enable = true;
        this.events.triggerEvent("enable");
        return true
    },
    disable: function () {
        if (this._enable) {
            if (this.processor) {
                this.processor.disable()
            }
            this._enable = false;
            this.events.triggerEvent("disable");
            return true
        }
        return false
    },
    _CLASS_NAME: "NTool"
});
NTool.statshape = "bar";
NTool.all_width = "70";
NTool.height = "160";
NTool.mar_width = "70";
NTool.statResult = function (result) {
    var imgLocation = NUtility.getImagesLocation();
    var keys = '';
    var strXML = '';
    if (!result.statresult) {
        alert("所选区域内不存在统计要素");
        return
    }
    var statres = result.statresult;
    if (!statres[0].field || !statres[0].values) {
        alert("所选区域内不存在统计要素");
        return
    }
    var sfield = statres[0].field;
    var svaluearry = statres[0].values;
    var valuecount = '';
    strXML = "<graph animation='0'  showNames='1'>";
    for (var key in svaluearry) {
        if (key == '') {
            continue
        }
        keys += key + ',';
        valuecount += svaluearry[key] + ','
    }
    if (keys != '' && valuecount != undefined) {
        keys = keys.substr(0, keys.length - 1);
        valuecount = valuecount.substr(0, valuecount.length - 1);
        keys = keys.split(',');
        valuecount = valuecount.split(',');
        for (var i = 0; i < keys.length; i++) {
            strXML += "<set name='" + keys[i] + "' value='" + valuecount[i] + "' color='" + NTool.getrandomColor() + "'/>"
        }
    }
    strXML += "</graph>";
    if (keys.length > 0) {
        var chart1 = '';
        if (keys.length <= 3) {
            NTool.all_width = parseInt(NTool.mar_width * 3);
            if (NTool.statshape == "bar") {
                chart1 = new FusionCharts(imgLocation + "/Flash_Column3D.swf", "chart1Id", NTool.all_width, NTool.height, "0", "0")
            } else if (NTool.statshape == "line") {
                chart1 = new FusionCharts(imgLocation + "/Flash_Line.swf", "chart1Id", NTool.all_width, NTool.height, "0", "0")
            } else if (NTool.statshape == "pie") {
                chart1 = new FusionCharts(imgLocation + "/Flash_Pie3D.swf", "chart1Id", NTool.all_width, NTool.height, "0", "0")
            }
        } else {
            NTool.all_width = parseInt(NTool.mar_width * keys.length);
            if (NTool.statshape == "bar") {
                chart1 = new FusionCharts(imgLocation + "/Flash_Column3D.swf", "chart1Id", NTool.all_width, NTool.height, "0", "0")
            } else if (NTool.statshape == "line") {
                chart1 = new FusionCharts(imgLocation + "/Flash_Line.swf", "chart1Id", NTool.all_width, NTool.height, "0", "0")
            } else if (NTool.statshape == "pie") {
                chart1 = new FusionCharts(imgLocation + "/Flash_Pie3D.swf", "chart1Id", NTool.all_width, NTool.height, "0", "0")
            }
        }
        chart1.setDataXML(strXML);
        chart1.render(NTool.FlashStatDiv)
    } else {
        alert('所选区域内不存在统计要素！');
        return
    }
};
NTool.getrandomColor = function () {
    var arrHex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    var strHex = "#";
    var index;
    for (var i = 0; i < 6; i++) {
        index = Math.round(Math.random() * 15);
        strHex += arrHex[index]
    }
    return strHex
};
NTool.FlashStatDiv = '';
NTool.TYPE_BUTTON = 1;
NTool.TYPE_TOGGLE = 2;
NTool.TYPE_TOOL = 3;
NButtonTool = NObject(NTool, {
    toolType: "NButtonTool",
    type: NTool.TYPE_BUTTON,
    excute: function () {},
    _CLASS_NAME: "NButtonTool"
});
NZoomBoxTool = NObject(NTool, {
    toolType: "NZoomBoxTool",
    inCursor: ["url('" + NUtility.getImagesLocation() + "zoomin.cur'),move", '-moz-grab', 'zoomin', 'move'],
    outCursor: ["url('" + NUtility.getImagesLocation() + "zoomout.cur'),move", '-moz-grab', 'zoomout', 'move'],
    type: NTool.TYPE_TOOL,
    setCursor: true,
    out: false,
    draw: function () {
        this.processor = new NDrawRectProcessor(this, {
            done: this.zoomBox
        }, {
            keyMask: this.keyMask
        })
    },
    zoomBox: function (position) {
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
    enable: function () {
        NTool.prototype.enable.apply(this, arguments);
        if (!this.setCursor) {
            return true
        }
        if (this.out) {
            this.map.div.style.cursor = this.outCursor
        } else {
            this.map.div.style.cursor = this.inCursor
        }
        return true
    },
    _CLASS_NAME: "NZoomBoxTool"
});
NZoomBoxInTool = NObject(NZoomBoxTool, {
    out: false,
    toolType: "NZoomBoxInTool",
    _CLASS_NAME: "NZoomBoxInTool"
});
NZoomBoxOutTool = NObject(NZoomBoxTool, {
    out: true,
    toolType: "NZoomBoxOutTool",
    _CLASS_NAME: "NZoomBoxOutTool"
});
NZoomToMaxExtentTool = NObject(NTool, {
    toolType: "NZoomToMaxExtentTool",
    type: NTool.TYPE_BUTTON,
    excute: function () {
        if (this.map) {
            this.map.zoomToMaxExtent()
        }
    },
    _CLASS_NAME: "NZoomToMaxExtentTool"
});
NDragPanTool = NObject(NTool, {
    toolType: "NDragPanTool",
    grabCursor: ["url('" + NUtility.getImagesLocation() + "grab.cur'),move", '-moz-grab', 'grab', 'move'],
    grabbingCursor: ["url('" + NUtility.getImagesLocation() + "grabbing.cur'),move", '-moz-grab', 'grabbing', 'move'],
    type: NTool.TYPE_TOOL,
    panned: false,
    interval: 100,
    draw: function () {
        this.processor = new NDragProcessor(this, {
            "move": this.panMap,
            "done": this.panMapDone
        }, {
            interval: this.interval,
            grabCursor: this.grabCursor,
            grabbingCursor: this.grabbingCursor
        })
    },
    panMap: function (xy) {
        this.panned = true;
        this.map.pan(this.processor.last.x - xy.x, this.processor.last.y - xy.y, {
            dragging: this.processor.dragging,
            animate: true
        });
        this.map.div.style.cursor = this.grabbingCursor
    },
    panMapDone: function (xy) {
        if (this.panned) {
            this.panMap(xy);
            this.panned = false
        }
        this.map.div.style.cursor = this.grabCursor
    },
    enable: function () {
        NTool.prototype.enable.apply(this, arguments);
        this.map.div.style.cursor = this.grabCursor;
        return true
    },
    _CLASS_NAME: "NDragPanTool"
});
NNavigationTool = NObject(NTool, {
    toolType: "NNavigationTool",
    dragPan: null,
    dragPanOptions: null,
    zoomBox: null,
    zoomWheelEnabled: true,
    handleRightClicks: false,
    construct: function (options) {
        this.processors = {};
        NTool.prototype.construct.apply(this, arguments)
    },
    dispose: function () {
        this.disable();
        if (this.dragPan) {
            this.dragPan.dispose()
        }
        this.dragPan = null;
        if (this.zoomBox) {
            this.zoomBox.dispose()
        }
        this.zoomBox = null;
        NTool.prototype.dispose.apply(this, arguments)
    },
    enable: function () {
        this.dragPan.enable();
        if (this.zoomWheelEnabled) {
            this.processors.wheel.enable()
        }
        this.processors.click.enable();
        this.zoomBox.enable();
        return NTool.prototype.enable.apply(this, arguments)
    },
    disable: function () {
        this.zoomBox.disable();
        this.dragPan.disable();
        this.processors.click.disable();
        this.processors.wheel.disable();
        return NTool.prototype.disable.apply(this, arguments)
    },
    draw: function () {
        if (this.handleRightClicks) {
            this.map.div.oncontextmenu = function () {
                return false
            }
        }
        var clickCallbacks = {
            'dblclick': this.defaultDblClick,
            'dblrightclick': this.defaultDblRightClick
        };
        var clickOptions = {
            'double': true,
            'stopDouble': true
        };
        this.processors.click = new NClickProcessor(this, clickCallbacks, clickOptions);
        this.dragPan = new NDragPanTool(NUtility.extend({
            map: this.map
        }, this.dragPanOptions));
        this.zoomBox = new NZoomBoxTool({
            map: this.map,
            keyMask: NProcessor.MOD_SHIFT,
            setCursor: false
        });
        this.dragPan.draw();
        this.zoomBox.draw();
        this.processors.wheel = new NMouseWheelProcessor(this, {
            "up": this.wheelUp,
            "down": this.wheelDown
        });
        this.enable()
    },
    defaultDblClick: function (evt) {
        var newCenter = this.map._mapViewPortPxToWorld(evt.xy);
        this.map.setCenter(newCenter, this.map.zoomLevel + 1)
    },
    defaultDblRightClick: function (evt) {
        var newCenter = this.map._mapViewPortPxToWorld(evt.xy);
        this.map.setCenter(newCenter, this.map.zoomLevel - 1)
    },
    wheelChange: function (evt, deltaZ) {
        var newZoom = this.map.getZoomLevel() + deltaZ;
        if (!this.map.isValidZoomLevel(newZoom)) {
            return
        }
        var size = this.map.getSize();
        var deltaX = size.w / 2 - evt.xy.x;
        var deltaY = evt.xy.y - size.h / 2;
        var newRes = this.map.basicLayer.getResolutionByZoomLevel(newZoom);
        var zoomPoint = this.map.pixelToWorld(evt.xy);
        var newCenter = new NLatLng(zoomPoint.lon + deltaX * newRes, zoomPoint.lat + deltaY * newRes);
        this.map.setCenter(newCenter, newZoom)
    },
    wheelUp: function (evt) {
        this.wheelChange(evt, 1)
    },
    wheelDown: function (evt) {
        this.wheelChange(evt, -1)
    },
    disableZoomWheel: function () {
        this.zoomWheelEnabled = false;
        this.processors.wheel.disable()
    },
    enableZoomWheel: function () {
        this.zoomWheelEnabled = true;
        if (this._enable) {
            this.processors.wheel.enable()
        }
    },
    _CLASS_NAME: "NNavigationTool"
});
NKeyboardTool = NObject(NTool, {
    toolType: "NKeyboardTool",
    slideStep: 75,
    construct: function () {
        NTool.prototype.construct.apply(this, arguments)
    },
    dispose: function () {
        if (this.processor) {
            this.processor.dispose()
        }
        this.processor = null;
        NTool.prototype.dispose.apply(this, arguments)
    },
    draw: function () {
        this.processor = new NKeyboardProcessor(this, {
            "keydown": this.defaultKeyPress
        });
        this.enable()
    },
    defaultKeyPress: function (evt) {
        switch (evt.keyCode) {
        case NEvent.KEY_LEFT:
            this.map.pan(-this.slideStep, 0);
            break;
        case NEvent.KEY_RIGHT:
            this.map.pan(this.slideStep, 0);
            break;
        case NEvent.KEY_UP:
            this.map.pan(0, -this.slideStep);
            break;
        case NEvent.KEY_DOWN:
            this.map.pan(0, this.slideStep);
            break;
        case 33:
            var size = this.map.getSize();
            this.map.pan(0, -0.75 * size.h);
            break;
        case 34:
            var size = this.map.getSize();
            this.map.pan(0, 0.75 * size.h);
            break;
        case 35:
            var size = this.map.getSize();
            this.map.pan(0.75 * size.w, 0);
            break;
        case 36:
            var size = this.map.getSize();
            this.map.pan(-0.75 * size.w, 0);
            break;
        case 43:
        case 61:
        case 187:
        case 107:
            this.map.zoomIn();
            break;
        case 45:
        case 109:
        case 189:
        case 95:
            this.map.zoomOut();
            break
        }
    },
    _CLASS_NAME: "NKeyboardTool"
});
NDrawFeatureTool = NObject(NTool, {
    toolType: "NDrawFeatureTool",
    layer: null,
    callbacks: null,
    _EVENT_TYPES: ["featureadded"],
    featureAdded: function () {},
    processorOptions: null,
    construct: function (layer, processor, options) {
        this._EVENT_TYPES = NDrawFeatureTool.prototype._EVENT_TYPES.concat(NTool.prototype._EVENT_TYPES);
        NTool.prototype.construct.apply(this, [options]);
        this.callbacks = NUtility.extend({
            done: this.drawFeature
        }, this.callbacks);
        this.layer = layer;
        this.processor = new processor(this, this.callbacks, this.processorOptions)
    },
    drawFeature: function (geometry) {
        var feature = new NVectorFeature(geometry);
        this.layer.addFeatures([feature]);
        this.featureAdded(feature);
        this.events.triggerEvent("featureadded", {
            feature: feature
        })
    },
    _CLASS_NAME: "NDrawFeatureTool"
});
NDragFeatureTool = NObject(NTool, {
    toolType: "NDragFeatureTool",
    geometryTypes: null,
    onStart: function (feature, pixel) {},
    onDrag: function (feature, pixel) {},
    onComplete: function (feature, pixel) {},
    layer: null,
    feature: null,
    dragCallbacks: {},
    featureCallbacks: {},
    lastPixel: null,
    construct: function (layer, options) {
        NTool.prototype.construct.apply(this, [options]);
        this.layer = layer;
        this.processors = {
            drag: new NDragProcessor(this, NUtility.extend({
                down: this.downFeature,
                move: this.moveFeature,
                up: this.upFeature,
                out: this.cancel,
                done: this.doneDragging
            }, this.dragCallbacks)),
            feature: new NDrawFeatureProcessor(this, this.layer, NUtility.extend({
                over: this.overFeature,
                out: this.outFeature
            }, this.featureCallbacks), {
                geometryTypes: this.geometryTypes
            })
        }
    },
    dispose: function () {
        this.layer = null;
        NTool.prototype.dispose.apply(this, [])
    },
    enable: function () {
        return (this.processors.feature.enable() && NTool.prototype.enable.apply(this, arguments))
    },
    disable: function () {
        this.processors.drag.disable();
        this.processors.feature.disable();
        this.feature = null;
        this.dragging = false;
        this.lastPixel = null;
        return NTool.prototype.disable.apply(this, arguments)
    },
    overFeature: function (feature) {
        if (!this.processors.drag.dragging) {
            this.feature = feature;
            this.processors.drag.enable();
            this.over = true
        } else {
            if (this.feature.id == feature.id) {
                this.over = true
            } else {
                this.over = false
            }
        }
    },
    downFeature: function (pixel) {
        this.lastPixel = pixel;
        this.onStart(this.feature, pixel)
    },
    moveFeature: function (pixel) {
        var res = this.map.getResolution();
        this.feature.geometry.move(res * (pixel.x - this.lastPixel.x), res * (this.lastPixel.y - pixel.y));
        this.layer.drawFeature(this.feature);
        this.lastPixel = pixel;
        this.onDrag(this.feature, pixel)
    },
    upFeature: function (pixel) {
        if (!this.over) {
            this.processors.drag.disable();
            this.feature = null
        } else {}
    },
    doneDragging: function (pixel) {
        this.onComplete(this.feature, pixel)
    },
    outFeature: function (feature) {
        if (!this.processors.drag.dragging) {
            this.over = false;
            this.processors.drag.disable();
            this.feature = null
        } else {
            if (this.feature.id == feature.id) {
                this.over = false
            }
        }
    },
    cancel: function () {
        this.processors.drag.disable();
        this.over = false
    },
    setMap: function (map) {
        this.processors.drag.setMap(map);
        this.processors.feature.setMap(map);
        NTool.prototype.setMap.apply(this, arguments)
    },
    _CLASS_NAME: "NDragFeatureTool"
});
NEditFeatureTool = NObject(NTool, {
    toolType: "NEditFeatureTool",
    geometryTypes: null,
    clickout: true,
    toggle: true,
    layer: null,
    feature: null,
    vertices: null,
    virtualVertices: null,
    selectTool: null,
    dragTool: null,
    processors: null,
    deleteCodes: null,
    virtualStyle: null,
    mode: null,
    radiusHandle: null,
    dragHandle: null,
    onModificationStart: function () {},
    onModification: function () {},
    onModificationEnd: function () {},
    construct: function (layer, options) {
        this.layer = layer;
        this.vertices = [];
        this.virtualVertices = [];
        this.virtualStyle = NUtility.extend({}, this.layer.style || this.layer.symbols.createSymbolizer());
        this.virtualStyle.fillOpacity = 0.3;
        this.virtualStyle.strokeOpacity = 0.3;
        this.deleteCodes = [46, 68];
        this.mode = NEditFeatureTool.RESHAPE;
        NTool.prototype.construct.apply(this, [options]);
        if (!(this.deleteCodes instanceof Array)) {
            this.deleteCodes = [this.deleteCodes]
        }
        var control = this;
        var selectOptions = {
            geometryTypes: this.geometryTypes,
            clickout: this.clickout,
            toggle: this.toggle
        };
        this.selectTool = new NSelectFeatureTool(layer, selectOptions);
        this.layer.events.addListener({
            "prefeatureselected": this.beforeSelectFeature,
            "featureselected": this.selectFeature,
            "featureunselected": this.unselectFeature,
            scope: this
        });
        var dragOptions = {
            geometryTypes: ["NGeometry.Point"],
            snappingOptions: this.snappingOptions,
            onStart: function (feature, pixel) {
                control.dragStart.apply(control, [feature, pixel])
            },
            onDrag: function (feature) {
                control.dragVertex.apply(control, [feature])
            },
            onComplete: function (feature) {
                control.dragComplete.apply(control, [feature])
            }
        };
        this.dragTool = new NDragFeatureTool(layer, dragOptions);
        var keyboardOptions = {
            keydown: this.handleKeypress
        };
        this.processors = {
            keyboard: new NKeyboardProcessor(this, keyboardOptions)
        }
    },
    dispose: function () {
        this.layer.events.removeListener({
            "prefeatureselected": this.beforeSelectFeature,
            "featureselected": this.selectFeature,
            "featureunselected": this.unselectFeature,
            scope: this
        });
        this.layer = null;
        this.selectTool.dispose();
        this.dragTool.dispose();
        NTool.prototype.dispose.apply(this, [])
    },
    enable: function () {
        return (this.selectTool.enable() && this.processors.keyboard.enable() && NTool.prototype.enable.apply(this, arguments))
    },
    disable: function () {
        var disabled = false;
        if (NTool.prototype.disable.apply(this, arguments)) {
            this.layer.removeFeatures(this.vertices, {
                silent: true
            });
            this.layer.removeFeatures(this.virtualVertices, {
                silent: true
            });
            this.vertices = [];
            this.dragTool.disable();
            if (this.feature && this.feature.geometry) {
                this.selectTool.unselect.apply(this.selectTool, [this.feature])
            }
            this.selectTool.disable();
            this.processors.keyboard.disable();
            disabled = true
        }
        return disabled
    },
    beforeSelectFeature: function (object) {
        return this.layer.events.triggerEvent("prefeatureedited", {
            feature: object.feature
        })
    },
    selectFeature: function (object) {
        this.feature = object.feature;
        this.resetVertices();
        this.dragTool.enable();
        this.onModificationStart(this.feature)
    },
    unselectFeature: function (object) {
        this.layer.removeFeatures(this.vertices, {
            silent: true
        });
        this.vertices = [];
        this.layer.disposeFeatures(this.virtualVertices, {
            silent: true
        });
        this.virtualVertices = [];
        if (this.dragHandle) {
            this.layer.disposeFeatures([this.dragHandle], {
                silent: true
            });
            delete this.dragHandle
        }
        if (this.radiusHandle) {
            this.layer.disposeFeatures([this.radiusHandle], {
                silent: true
            });
            delete this.radiusHandle
        }
        this.feature = null;
        this.dragTool.disable();
        this.onModificationEnd(object.feature);
        this.layer.events.triggerEvent("afterfeatureedited", {
            feature: object.feature
        })
    },
    dragStart: function (feature, pixel) {
        if (feature != this.feature && !feature.geometry.parent && feature != this.dragHandle && feature != this.radiusHandle) {
            if (this.feature) {
                this.selectTool.clickFeature.apply(this.selectTool, [this.feature])
            }
            if (this.geometryTypes == null || NUtility.indexOf(this.geometryTypes, feature.geometry._CLASS_NAME) != -1) {
                this.selectTool.clickFeature.apply(this.selectTool, [feature]);
                this.dragTool.overFeature.apply(this.dragTool, [feature]);
                this.dragTool.lastPixel = pixel;
                this.dragTool.processors.drag.started = true;
                this.dragTool.processors.drag.start = pixel;
                this.dragTool.processors.drag.last = pixel
            }
        }
    },
    dragVertex: function (vertex) {
        if (this.feature.geometry._CLASS_NAME == "NGeometry.Point") {
            if (this.feature != vertex) {
                this.feature = vertex
            }
        } else {
            if (vertex._index) {
                vertex.geometry.parent.addComponent(vertex.geometry, vertex._index);
                delete vertex._index;
                NUtility.removeItem(this.virtualVertices, vertex);
                this.vertices.push(vertex)
            } else if (vertex == this.dragHandle) {
                this.layer.removeFeatures(this.vertices, {
                    silent: true
                });
                this.vertices = [];
                if (this.radiusHandle) {
                    this.layer.disposeFeatures([this.radiusHandle], {
                        silent: true
                    });
                    this.radiusHandle = null
                }
            }
            if (this.virtualVertices.length > 0) {
                this.layer.disposeFeatures(this.virtualVertices, {
                    silent: true
                });
                this.virtualVertices = []
            }
            this.layer.drawFeature(this.feature, this.selectTool.renderSymbol)
        }
        this.layer.drawFeature(vertex)
    },
    dragComplete: function (vertex) {
        this.resetVertices();
        this.onModification(this.feature);
        this.layer.events.triggerEvent("featureedited", {
            feature: this.feature
        })
    },
    resetVertices: function () {
        if (this.dragTool.feature) {
            this.dragTool.outFeature(this.dragTool.feature)
        }
        if (this.vertices.length > 0) {
            this.layer.removeFeatures(this.vertices, {
                silent: true
            });
            this.vertices = []
        }
        if (this.virtualVertices.length > 0) {
            this.layer.removeFeatures(this.virtualVertices, {
                silent: true
            });
            this.virtualVertices = []
        }
        if (this.dragHandle) {
            this.layer.disposeFeatures([this.dragHandle], {
                silent: true
            });
            this.dragHandle = null
        }
        if (this.radiusHandle) {
            this.layer.disposeFeatures([this.radiusHandle], {
                silent: true
            });
            this.radiusHandle = null
        }
        if (this.feature && this.feature.geometry._CLASS_NAME != "NGeometry.Point") {
            if ((this.mode & NEditFeatureTool.DRAG)) {
                this.collectDragHandle()
            }
            if ((this.mode & (NEditFeatureTool.ROTATE | NEditFeatureTool.RESIZE))) {
                this.collectRadiusHandle()
            }
            if ((this.mode & NEditFeatureTool.RESHAPE)) {
                this.collectVertices()
            }
        }
    },
    handleKeypress: function (evt) {
        var code = evt.keyCode;
        if (this.feature && NUtility.indexOf(this.deleteCodes, code) != -1) {
            var vertex = this.dragTool.feature;
            if (vertex && NUtility.indexOf(this.vertices, vertex) != -1 && !this.dragTool.processors.drag.dragging && vertex.geometry.parent) {
                vertex.geometry.parent.removeComponent(vertex.geometry);
                this.layer.drawFeature(this.feature, this.selectTool.renderSymbol);
                this.resetVertices();
                this.onModification(this.feature);
                this.layer.events.triggerEvent("featureedited", {
                    feature: this.feature
                })
            }
        }
    },
    collectVertices: function () {
        this.vertices = [];
        this.virtualVertices = [];
        var control = this;

        function collectComponentVertices(geometry) {
            var i, vertex, component, len;
            if (geometry._CLASS_NAME == "NGeometry.Point") {
                vertex = new NVectorFeature(geometry);
                control.vertices.push(vertex)
            } else {
                var numVert = geometry.components.length;
                if (geometry._CLASS_NAME == "NGeometry.LinearRing") {
                    numVert -= 1
                }
                for (i = 0; i < numVert; ++i) {
                    component = geometry.components[i];
                    if (component._CLASS_NAME == "NGeometry.Point") {
                        vertex = new NVectorFeature(component);
                        control.vertices.push(vertex)
                    } else {
                        collectComponentVertices(component)
                    }
                }
                if (geometry._CLASS_NAME != "NGeometry.MultiPoint") {
                    for (i = 0, len = geometry.components.length; i < len - 1; ++i) {
                        var prevVertex = geometry.components[i];
                        var nextVertex = geometry.components[i + 1];
                        if (prevVertex._CLASS_NAME == "NGeometry.Point" && nextVertex._CLASS_NAME == "NGeometry.Point") {
                            var x = (prevVertex.x + nextVertex.x) / 2;
                            var y = (prevVertex.y + nextVertex.y) / 2;
                            var point = new NVectorFeature(new NGeometry.Point(x, y), null, control.virtualStyle);
                            point.geometry.parent = geometry;
                            point._index = i + 1;
                            control.virtualVertices.push(point)
                        }
                    }
                }
            }
        }
        collectComponentVertices.call(this, this.feature.geometry);
        this.layer.addFeatures(this.virtualVertices, {
            silent: true
        });
        this.layer.addFeatures(this.vertices, {
            silent: true
        })
    },
    collectDragHandle: function () {
        var geometry = this.feature.geometry;
        var center = geometry.getBounds().getCenterInLatLng();
        var originGeometry = new NGeometry.Point(center.lon, center.lat);
        var origin = new NVectorFeature(originGeometry);
        originGeometry.move = function (x, y) {
            NGeometry.Point.prototype.move.call(this, x, y);
            geometry.move(x, y)
        };
        this.dragHandle = origin;
        this.layer.addFeatures([this.dragHandle], {
            silent: true
        })
    },
    collectRadiusHandle: function () {
        var geometry = this.feature.geometry;
        var bounds = geometry.getBounds();
        var center = bounds.getCenterInLatLng();
        var originGeometry = new NGeometry.Point(center.lon, center.lat);
        var radiusGeometry = new NGeometry.Point(bounds.right, bounds.bottom);
        var radius = new NVectorFeature(radiusGeometry);
        var resize = (this.mode & NEditFeatureTool.RESIZE);
        var rotate = (this.mode & NEditFeatureTool.ROTATE);
        radiusGeometry.move = function (x, y) {
            NGeometry.Point.prototype.move.call(this, x, y);
            var dx1 = this.x - originGeometry.x;
            var dy1 = this.y - originGeometry.y;
            var dx0 = dx1 - x;
            var dy0 = dy1 - y;
            if (rotate) {
                var a0 = Math.atan2(dy0, dx0);
                var a1 = Math.atan2(dy1, dx1);
                var angle = a1 - a0;
                angle *= 180 / Math.PI;
                geometry.rotate(angle, originGeometry)
            }
            if (resize) {
                var l0 = Math.sqrt((dx0 * dx0) + (dy0 * dy0));
                var l1 = Math.sqrt((dx1 * dx1) + (dy1 * dy1));
                geometry.resize(l1 / l0, originGeometry)
            }
        };
        this.radiusHandle = radius;
        this.layer.addFeatures([this.radiusHandle], {
            silent: true
        })
    },
    setMap: function (map) {
        this.selectTool.setMap(map);
        this.dragTool.setMap(map);
        NTool.prototype.setMap.apply(this, arguments)
    },
    _CLASS_NAME: "NEditFeatureTool"
});
NEditFeatureTool.RESHAPE = 1;
NEditFeatureTool.RESIZE = 2;
NEditFeatureTool.ROTATE = 4;
NEditFeatureTool.DRAG = 8;
NSelectFeatureTool = NObject(NTool, {
    toolType: "NSelectFeatureTool",
    multipleKey: null,
    toggleKey: null,
    multiple: false,
    clickout: true,
    toggle: false,
    hover: false,
    box: false,
    onSelect: function () {},
    onUnselect: function () {},
    geometryTypes: null,
    layer: null,
    callbacks: null,
    selectStyle: null,
    renderSymbol: "select",
    processors: null,
    construct: function (layer, options) {
        NTool.prototype.construct.apply(this, [options]);
        this.layer = layer;
        var callbacks = {
            click: this.clickFeature,
            clickout: this.clickoutFeature
        };
        if (this.hover) {
            callbacks.over = this.overFeature;
            callbacks.out = this.outFeature
        }
        this.callbacks = NUtility.extend(callbacks, this.callbacks);
        this.processors = {
            feature: new NDrawFeatureProcessor(this, layer, this.callbacks, {
                geometryTypes: this.geometryTypes
            })
        };
        if (this.box) {
            this.processors.box = new NDrawRectProcessor(this, {
                done: this.selectBox
            }, {
                boxDivClassName: "nmProcessorBoxSelectFeature"
            })
        }
    },
    enable: function () {
        if (!this._enable) {
            this.processors.feature.enable();
            if (this.box && this.processors.box) {
                this.processors.box.enable()
            }
        }
        return NTool.prototype.enable.apply(this, arguments)
    },
    disable: function () {
        if (this._enable) {
            this.processors.feature.disable();
            if (this.processors.box) {
                this.processors.box.disable()
            }
        }
        return NTool.prototype.disable.apply(this, arguments)
    },
    unselectAll: function (options) {
        var feature;
        for (var i = this.layer.selectedFeatures.length - 1; i >= 0; --i) {
            feature = this.layer.selectedFeatures[i];
            if (!options || options.except != feature) {
                this.unselect(feature)
            }
        }
    },
    clickFeature: function (feature) {
        if (!this.hover) {
            var selected = (NUtility.indexOf(this.layer.selectedFeatures, feature) > -1);
            if (selected) {
                if (this.toggleSelect()) {
                    this.unselect(feature)
                } else if (!this.multipleSelect()) {
                    this.unselectAll({
                        except: feature
                    })
                }
            } else {
                if (!this.multipleSelect()) {
                    this.unselectAll({
                        except: feature
                    })
                }
                this.select(feature)
            }
        }
    },
    multipleSelect: function () {
        if (this.processors.feature != null && this.processors.feature.evt != null) return this.multiple || this.processors.feature.evt[this.multipleKey];
        else return this.multiple
    },
    toggleSelect: function () {
        if (this.processors.feature != null && this.processors.feature.evt != null) return this.toggle || this.processors.feature.evt[this.toggleKey];
        else return this.toggle
    },
    clickoutFeature: function (feature) {
        if (!this.hover && this.clickout) {
            this.unselectAll()
        }
    },
    overFeature: function (feature) {
        if (this.hover && (NUtility.indexOf(this.layer.selectedFeatures, feature) == -1)) {
            this.select(feature)
        }
    },
    outFeature: function (feature) {
        if (this.hover) {
            this.unselect(feature)
        }
    },
    select: function (feature) {
        var cont = this.layer.events.triggerEvent("prefeatureselected", {
            feature: feature
        });
        if (cont !== false) {
            this.layer.selectedFeatures.push(feature);
            var selectStyle = this.selectStyle || this.renderSymbol;
            this.layer.drawFeature(feature, selectStyle);
            this.layer.events.triggerEvent("featureselected", {
                feature: feature
            });
            this.onSelect(feature)
        }
    },
    unselect: function (feature) {
        this.layer.drawFeature(feature, "default");
        NUtility.removeItem(this.layer.selectedFeatures, feature);
        this.layer.events.triggerEvent("featureunselected", {
            feature: feature
        });
        this.onUnselect(feature)
    },
    selectBox: function (position) {
        if (position instanceof NBounds) {
            var minXY = this.map.pixelToWorld(new NPixel(position.left, position.bottom));
            var maxXY = this.map.pixelToWorld(new NPixel(position.right, position.top));
            var bounds = new NBounds(minXY.lon, minXY.lat, maxXY.lon, maxXY.lat);
            if (!this.multipleSelect()) {
                this.unselectAll()
            }
            var prevMultiple = this.multiple;
            this.multiple = true;
            for (var i = 0, len = this.layer.features.length; i < len; ++i) {
                var feature = this.layer.features[i];
                if (this.geometryTypes == null || NUtility.indexOf(this.geometryTypes, feature.geometry._CLASS_NAME) > -1) {
                    if (bounds.toGeometry().intersects(feature.geometry)) {
                        if (NUtility.indexOf(this.layer.selectedFeatures, feature) == -1) {
                            this.select(feature)
                        }
                    }
                }
            }
            this.multiple = prevMultiple
        }
    },
    setMap: function (map) {
        this.processors.feature.setMap(map);
        if (this.box) {
            this.processors.box.setMap(map)
        }
        NTool.prototype.setMap.apply(this, arguments)
    },
    _CLASS_NAME: "NSelectFeatureTool"
});
NViewHistoryTool = NObject(NTool, {
    toolType: "NViewHistoryTool",
    type: NTool.TYPE_TOGGLE,
    previous: null,
    previousOptions: null,
    next: null,
    nextOptions: null,
    limit: 50,
    enableOnDraw: true,
    clearOnDisable: false,
    registry: null,
    nextStack: null,
    previousStack: null,
    _listeners: null,
    restoring: false,
    construct: function (options) {
        NTool.prototype.construct.apply(this, [options]);
        this.registry = NUtility.extend({
            "moveend": function () {
                return {
                    center: this.map.getCenter(),
                    resolution: this.map.getResolution()
                }
            }
        }, this.registry);
        this.clear();
        var previousOptions = {
            excute: NFunction.bind(this.previousTrigger, this),
            cssClassName: this.cssClassName + " " + this.cssClassName + "Previous"
        };
        NUtility.extend(previousOptions, this.previousOptions);
        this.previous = new NButtonTool(previousOptions);
        var nextOptions = {
            excute: NFunction.bind(this.nextTrigger, this),
            cssClassName: this.cssClassName + " " + this.cssClassName + "Next"
        };
        NUtility.extend(nextOptions, this.nextOptions);
        this.next = new NButtonTool(nextOptions)
    },
    onPreviousChange: function (state, length) {
        if (state && !this.previous._enable) {
            this.previous.enable()
        } else if (!state && this.previous._enable) {
            this.previous.disable()
        }
    },
    onNextChange: function (state, length) {
        if (state && !this.next._enable) {
            this.next.enable()
        } else if (!state && this.next._enable) {
            this.next.disable()
        }
    },
    dispose: function () {
        NTool.prototype.dispose.apply(this);
        this.previous.dispose();
        this.next.dispose();
        this.disable();
        for (var prop in this) {
            this[prop] = null
        }
    },
    setMap: function (map) {
        this.map = map;
        this.next.setMap(map);
        this.previous.setMap(map)
    },
    draw: function () {
        NTool.prototype.draw.apply(this, arguments);
        this.next.draw();
        this.previous.draw();
        if (this.enableOnDraw) {
            this.enable()
        }
    },
    previousTrigger: function () {
        var current = this.previousStack.shift();
        var state = this.previousStack.shift();
        if (state != undefined) {
            this.nextStack.unshift(current);
            this.previousStack.unshift(state);
            this.restoring = true;
            this.restore(state);
            this.restoring = false;
            this.onNextChange(this.nextStack[0], this.nextStack.length);
            this.onPreviousChange(this.previousStack[1], this.previousStack.length - 1)
        } else {
            this.previousStack.unshift(current)
        }
        return state
    },
    nextTrigger: function () {
        var state = this.nextStack.shift();
        if (state != undefined) {
            this.previousStack.unshift(state);
            this.restoring = true;
            this.restore(state);
            this.restoring = false;
            this.onNextChange(this.nextStack[0], this.nextStack.length);
            this.onPreviousChange(this.previousStack[1], this.previousStack.length - 1)
        }
        return state
    },
    clear: function () {
        this.previousStack = [];
        this.nextStack = []
    },
    restore: function (state) {
        var zoomLevel = this.map.getZoomLevelByResolution(state.resolution);
        this.map.setCenter(state.center, zoomLevel)
    },
    setListeners: function () {
        this._listeners = {};
        for (var type in this.registry) {
            this._listeners[type] = NFunction.bind(function () {
                if (!this.restoring) {
                    var state = this.registry[type].apply(this, arguments);
                    this.previousStack.unshift(state);
                    if (this.previousStack.length > 1) {
                        this.onPreviousChange(this.previousStack[1], this.previousStack.length - 1)
                    }
                    if (this.previousStack.length > (this.limit + 1)) {
                        this.previousStack.pop()
                    }
                    if (this.nextStack.length > 0) {
                        this.nextStack = [];
                        this.onNextChange(null, 0)
                    }
                }
                return true
            }, this)
        }
    },
    enable: function () {
        var enabled = false;
        if (this.map) {
            if (NTool.prototype.enable.apply(this)) {
                if (this._listeners == null) {
                    this.setListeners()
                }
                for (var type in this._listeners) {
                    this.map.events._register(type, this, this._listeners[type])
                }
                enabled = true;
                if (this.previousStack.length == 0) {
                    this.initStack()
                }
            }
        }
        return enabled
    },
    initStack: function () {
        if (this.map.getCenter()) {
            this._listeners.moveend()
        }
    },
    disable: function () {
        var disabled = false;
        if (this.map) {
            if (NTool.prototype.disable.apply(this)) {
                for (var type in this._listeners) {
                    this.map._events.unregister(type, this, this._listeners[type])
                }
                if (this.clearOnDisable) {
                    this.clear()
                }
                disabled = true
            }
        }
        return disabled
    },
    _CLASS_NAME: "NViewHistoryTool"
});
NMeasureTool = NObject(NTool, {
    toolType: "NMeasureTool",
    mode: 'length',
    resultDiv: null,
    _EVENT_TYPES: ['measure', 'measurepartial'],
    processorOptions: null,
    callbacks: null,
    displaySystem: 'metric',
    displaySystemUnits: {
        geographic: ['dd'],
        english: ['mi', 'ft', 'in'],
        metric: ['km', 'm']
    },
    construct: function (options) {
        this._EVENT_TYPES = NMeasureTool.prototype._EVENT_TYPES.concat(NTool.prototype._EVENT_TYPES);
        var myoptions = {
            processorOptions: {
                style: "default",
                persist: true
            }
        };
        NUtility.extend(options, myoptions);
        NTool.prototype.construct.apply(this, [options]);
        this.callbacks = NUtility.extend({
            done: this.measureComplete,
            point: this.measurePartial
        }, this.callbacks);
        if (this.mode == 'length') {
            this.processor = new NDrawPathProcessor(this, this.callbacks, this.processorOptions)
        } else if (this.mode == 'area') {
            this.processor = new NDrawPolygonProcessor(this, this.callbacks, this.processorOptions)
        }
        if (this.resultDiv == null) {
            var resId = NUtility.createUniqueID("resultOutput" + "_");
            this.resultDiv = NUtility.createDiv(resId);
            this.resultDiv.className = "nmResultOutput";
            document.body.appendChild(this.resultDiv)
        }
    },
    enable: function () {
        NTool.prototype.enable.apply(this, arguments);
        this.map.div.style.cursor = 'crosshair';
        return true
    },
    disable: function () {
        NTool.prototype.disable.apply(this, arguments);
        if (this.resultDiv != null) {
            this.resultDiv.innerHTML = ''
        }
        return true
    },
    updateProcessor: function (processor, options) {
        var enable = this._enable;
        if (enable) {
            this.disable()
        }
        this.processor = new processor(this, this.callbacks, options);
        if (enable) {
            this.enable()
        }
    },
    measureComplete: function (geometry) {
        if (this.resultDiv) {
            this.showMeasureResult(geometry)
        } else {
            this.measure(geometry, "measure")
        }
    },
    measurePartial: function (point, geometry) {
        if (this.resultDiv) {
            this.resultDiv.left = point.x;
            this.resultDiv.top = point.y;
            this.showMeasureResult(geometry)
        } else {
            this.measure(geometry, "measurepartial")
        }
    },
    measure: function (geometry, eventType) {
        var stat, order;
        if (geometry._CLASS_NAME.indexOf('LineString') > -1) {
            stat = this.getFitLength(geometry);
            order = 1
        } else {
            stat = this.getFitArea(geometry);
            order = 2
        }
        this.events.triggerEvent(eventType, {
            measure: stat[0],
            units: stat[1],
            order: order,
            geometry: geometry
        })
    },
    showMeasureResult: function (geometry) {
        var stat, out;
        if (geometry._CLASS_NAME.indexOf('LineString') > -1) {
            stat = this.getFitLength(geometry);
            out = NMGISLG("distance") + stat[0].toFixed(3) + " " + stat[1]
        } else {
            stat = this.getFitArea(geometry);
            out = NMGISLG("area") + stat[0].toFixed(3) + " " + stat[1] + "<sup>2</" + "sup>"
        }
        this.resultDiv.innerHTML = out
    },
    getFitArea: function (geometry) {
        var units = this.displaySystemUnits[this.displaySystem];
        var unit, area;
        for (var i = 0, len = units.length; i < len; ++i) {
            unit = units[i];
            area = this.getArea(geometry, unit);
            if (area > 1) {
                break
            }
        }
        return [area, unit]
    },
    getArea: function (geometry, units) {
        var area = geometry.getArea();
        var inPerDisplayUnit = NINCHES_PER_UNIT[units];
        if (inPerDisplayUnit) {
            var inPerMapUnit = NINCHES_PER_UNIT[this.map.getUnits()];
            area *= Math.pow((inPerMapUnit / inPerDisplayUnit), 2)
        }
        return area
    },
    getFitLength: function (geometry) {
        var units = this.displaySystemUnits[this.displaySystem];
        var unit, length;
        for (var i = 0, len = units.length; i < len; ++i) {
            unit = units[i];
            length = this.getLength(geometry, unit);
            if (length > 1) {
                break
            }
        }
        return [length, unit]
    },
    getLength: function (geometry, units) {
        var length = geometry.getLength();
        var inPerDisplayUnit = NINCHES_PER_UNIT[units];
        if (inPerDisplayUnit) {
            var inPerMapUnit = NINCHES_PER_UNIT[this.map.getUnits()];
            length *= (inPerMapUnit / inPerDisplayUnit)
        }
        return length
    },
    _CLASS_NAME: "NMeasureTool"
});
NMeasureAreaTool = NObject(NMeasureTool, {
    toolType: "NMeasureAreaTool",
    mode: 'area',
    _CLASS_NAME: "NMeasureAreaTool"
});
NLMeasureTool = NObject(NTool, {
    toolType: "NLMeasureTool",
    mode: 'length',
    url: 'http://127.0.0.1:8719/NewMapServer/WebServices/ProcessingServer.php?',
    resultDiv: null,
    _EVENT_TYPES: ['measure', 'measurepartial'],
    processorOptions: null,
    callbacks: null,
    displaySystem: 'metric',
    displaySystemUnits: {
        geographic: ['dd'],
        english: ['mi', 'ft', 'in'],
        metric: ['km', 'm']
    },
    construct: function (options, url) {
        this._EVENT_TYPES = NLMeasureTool.prototype._EVENT_TYPES.concat(NTool.prototype._EVENT_TYPES);
        if (url) this.url = url;
        var myoptions = {
            processorOptions: {
                style: "default",
                persist: true
            }
        };
        NUtility.extend(options, myoptions);
        NTool.prototype.construct.apply(this, [options]);
        this.callbacks = NUtility.extend({
            done: this.measureComplete
        }, this.callbacks);
        if (this.mode == 'length') {
            this.processor = new NDrawPathProcessor(this, this.callbacks, this.processorOptions)
        } else if (this.mode == 'area') {
            this.processor = new NDrawPolygonProcessor(this, this.callbacks, this.processorOptions)
        }
        if (this.resultDiv == null) {
            var resId = NUtility.createUniqueID("resultOutput" + "_");
            this.resultDiv = NUtility.createDiv(resId);
            this.resultDiv.className = "nmResultOutput";
            document.body.appendChild(this.resultDiv)
        }
        NMeasureResultDiv = this.resultDiv
    },
    enable: function () {
        NTool.prototype.enable.apply(this, arguments);
        this.map.div.style.cursor = 'crosshair';
        NNLMode = this.mode == "length" ? "length2" : "area2";
        return true
    },
    disable: function () {
        NTool.prototype.disable.apply(this, arguments);
        if (this.resultDiv != null) {
            this.resultDiv.innerHTML = ''
        }
        return true
    },
    updateProcessor: function (processor, options) {
        var enable = this._enable;
        if (enable) {
            this.disable()
        }
        this.processor = new processor(this, this.callbacks, options);
        if (enable) {
            this.enable()
        }
    },
    measureComplete: function (geometry) {
        var tempFeature = new NVectorFeature(geometry);
        var g = new NParser.GeoJSON();
        var data = g.write([tempFeature]);
        var modeTag = this.mode == "length" ? "length2" : "area2";
        NProxyHost = "proxy.php?url=";
        new NAjax.Request(this.url + "request=" + modeTag, {
            method: 'post',
            postBody: data,
            onComplete: this.showMeasureResult
        });
        NProxyHost = ''
    },
    showMeasureResult: function (res) {
        try {
            var psjson = new NParser.JSON();
            var tet = psjson.read(res.responseText);
            var resultNode = tet.Result;
            var featureNode = resultNode.feature;
            var resultValue = featureNode.value;
            var out = '';
            var unit = "m";
            if (NNLMode == "length2") {
                out = NMGISLG("distance") + resultValue.toFixed(3) + " " + unit
            } else {
                out = NMGISLG("area") + resultValue.toFixed(3) + " " + unit + "<sup>2</" + "sup>"
            }
            if (NMeasureResultDiv) {
                NMeasureResultDiv.innerHTML = out
            }
        } catch (e) {}
    },
    _CLASS_NAME: "NLMeasureTool"
});
NMeasureResultDiv = '';
NNLMode = "";
if (typeof infosoftglobal == "undefined") var infosoftglobal = new Object();
if (typeof infosoftglobal.FusionChartsUtil == "undefined") infosoftglobal.FusionChartsUtil = new Object();
infosoftglobal.FusionCharts = function (swf, id, w, h, debugMode, registerWithJS, c, scaleMode, lang, detectFlashVersion, autoInstallRedirect) {
    if (!document.getElementById) {
        return
    }
    this.initialDataSet = false;
    this.params = new Object();
    this.variables = new Object();
    this.attributes = new Array();
    if (swf) {
        this.setAttribute('swf', swf)
    }
    if (id) {
        this.setAttribute('id', id)
    }
    w = w.toString().replace(/\%$/, "%25");
    if (w) {
        this.setAttribute('width', w)
    }
    h = h.toString().replace(/\%$/, "%25");
    if (h) {
        this.setAttribute('height', h)
    }
    if (c) {
        this.addParam('bgcolor', c)
    }
    this.addParam('quality', 'high');
    this.addParam('allowScriptAccess', 'always');
    this.addVariable('chartWidth', w);
    this.addVariable('chartHeight', h);
    debugMode = debugMode ? debugMode : 0;
    this.addVariable('debugMode', debugMode);
    this.addVariable('DOMId', id);
    registerWithJS = registerWithJS ? registerWithJS : 0;
    this.addVariable('registerWithJS', registerWithJS);
    scaleMode = scaleMode ? scaleMode : 'noScale';
    this.addVariable('scaleMode', scaleMode);
    lang = lang ? lang : 'EN';
    this.addVariable('lang', lang);
    this.detectFlashVersion = detectFlashVersion ? detectFlashVersion : 1;
    this.autoInstallRedirect = autoInstallRedirect ? autoInstallRedirect : 1;
    this.installedVer = infosoftglobal.FusionChartsUtil.getPlayerVersion();
    if (!window.opera && document.all && this.installedVer.major > 7) {
        infosoftglobal.FusionCharts.doPrepUnload = true
    }
};
infosoftglobal.FusionCharts.prototype = {
    setAttribute: function (name, value) {
        this.attributes[name] = value
    },
    getAttribute: function (name) {
        return this.attributes[name]
    },
    addParam: function (name, value) {
        this.params[name] = value
    },
    getParams: function () {
        return this.params
    },
    addVariable: function (name, value) {
        this.variables[name] = value
    },
    getVariable: function (name) {
        return this.variables[name]
    },
    getVariables: function () {
        return this.variables
    },
    getVariablePairs: function () {
        var variablePairs = new Array();
        var key;
        var variables = this.getVariables();
        for (key in variables) {
            variablePairs.push(key + "=" + variables[key])
        }
        return variablePairs
    },
    getSWFHTML: function () {
        var swfNode = "";
        if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) {
            swfNode = '<embed type="application/x-shockwave-flash" src="' + this.getAttribute('swf') + '" width="' + this.getAttribute('width') + '" height="' + this.getAttribute('height') + '"  ';
            swfNode += ' id="' + this.getAttribute('id') + '" name="' + this.getAttribute('id') + '" ';
            var params = this.getParams();
            for (var key in params) {
                swfNode += [key] + '="' + params[key] + '" '
            }
            var pairs = this.getVariablePairs().join("&");
            if (pairs.length > 0) {
                swfNode += 'flashvars="' + pairs + '"'
            }
            swfNode += '/>'
        } else {
            swfNode = '<object id="' + this.getAttribute('id') + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + this.getAttribute('width') + '" height="' + this.getAttribute('height') + '">';
            swfNode += '<param name="movie" value="' + this.getAttribute('swf') + '" />';
            var params = this.getParams();
            for (var key in params) {
                swfNode += '<param name="' + key + '" value="' + params[key] + '" />'
            }
            var pairs = this.getVariablePairs().join("&");
            if (pairs.length > 0) {
                swfNode += '<param name="flashvars" value="' + pairs + '" />'
            }
            swfNode += "</object>"
        }
        return swfNode
    },
    setDataURL: function (strDataURL) {
        if (this.initialDataSet == false) {
            this.addVariable('dataURL', strDataURL);
            this.initialDataSet = true
        } else {
            var chartObj = infosoftglobal.FusionChartsUtil.getChartObject(this.getAttribute('id'));
            if (!chartObj.setDataURL) {
                __flash__addCallback(chartObj, "setDataURL")
            }
            chartObj.setDataURL(strDataURL)
        }
    },
    encodeDataXML: function (strDataXML) {
        var regExpReservedCharacters = ["\\$", "\\+"];
        var arrDQAtt = strDataXML.match(/=\s*\".*?\"/g);
        if (arrDQAtt) {
            for (var i = 0; i < arrDQAtt.length; i++) {
                var repStr = arrDQAtt[i].replace(/^=\s*\"|\"$/g, "");
                repStr = repStr.replace(/\'/g, "%26apos;");
                var strTo = strDataXML.indexOf(arrDQAtt[i]);
                var repStrr = "='" + repStr + "'";
                var strStart = strDataXML.substring(0, strTo);
                var strEnd = strDataXML.substring(strTo + arrDQAtt[i].length);
                var strDataXML = strStart + repStrr + strEnd
            }
        }
        strDataXML = strDataXML.replace(/\"/g, "%26quot;");
        strDataXML = strDataXML.replace(/%(?![\da-f]{2}|[\da-f]{4})/ig, "%25");
        strDataXML = strDataXML.replace(/\&/g, "%26");
        return strDataXML
    },
    setDataXML: function (strDataXML) {
        if (this.initialDataSet == false) {
            this.addVariable('dataXML', this.encodeDataXML(strDataXML));
            this.initialDataSet = true
        } else {
            var chartObj = infosoftglobal.FusionChartsUtil.getChartObject(this.getAttribute('id'));
            chartObj.setDataXML(strDataXML)
        }
    },
    setTransparent: function (isTransparent) {
        if (typeof isTransparent == "undefined") {
            isTransparent = true
        }
        if (isTransparent) this.addParam('WMode', 'transparent');
        else this.addParam('WMode', 'Opaque')
    },
    render: function (elementId) {
        if ((this.detectFlashVersion == 1) && (this.installedVer.major < 6)) {
            if (this.autoInstallRedirect == 1) {
                var installationConfirm = window.confirm("您需要下载并安装Flash Player6.0(或以上版本)才能查看统计图表,确定马上下载吗？");
                if (installationConfirm) {
                    window.location = "http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash"
                } else {
                    return false
                }
            } else {
                return false
            }
        } else {
            var n = (typeof elementId == 'string') ? document.getElementById(elementId) : elementId;
            if (n != null) {
                n.style.display = ''
            }
            n.innerHTML = this.getSWFHTML();
            if (!document.embeds[this.getAttribute('id')] && !window[this.getAttribute('id')]) window[this.getAttribute('id')] = document.getElementById(this.getAttribute('id'));
            return true
        }
    }
};
infosoftglobal.FusionChartsUtil.getPlayerVersion = function () {
    var PlayerVersion = new infosoftglobal.PlayerVersion([0, 0, 0]);
    if (navigator.plugins && navigator.mimeTypes.length) {
        var x = navigator.plugins["Shockwave Flash"];
        if (x && x.description) {
            PlayerVersion = new infosoftglobal.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, ".").split("."))
        }
    } else if (navigator.userAgent && navigator.userAgent.indexOf("Windows CE") >= 0) {
        var axo = 1;
        var counter = 3;
        while (axo) {
            try {
                counter++;
                axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + counter);
                PlayerVersion = new infosoftglobal.PlayerVersion([counter, 0, 0])
            } catch (e) {
                axo = null
            }
        }
    } else {
        try {
            var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")
        } catch (e) {
            try {
                var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
                PlayerVersion = new infosoftglobal.PlayerVersion([6, 0, 21]);
                axo.AllowScriptAccess = "always"
            } catch (e) {
                if (PlayerVersion.major == 6) {
                    return PlayerVersion
                }
            }
            try {
                axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")
            } catch (e) {}
        }
        if (axo != null) {
            PlayerVersion = new infosoftglobal.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","))
        }
    }
    return PlayerVersion
};
infosoftglobal.PlayerVersion = function (arrVersion) {
    this.major = arrVersion[0] != null ? parseInt(arrVersion[0]) : 0;
    this.minor = arrVersion[1] != null ? parseInt(arrVersion[1]) : 0;
    this.rev = arrVersion[2] != null ? parseInt(arrVersion[2]) : 0
};
infosoftglobal.FusionChartsUtil.cleanupSWFs = function () {
    var objects = document.getElementsByTagName("OBJECT");
    for (var i = objects.length - 1; i >= 0; i--) {
        objects[i].style.display = 'none';
        for (var x in objects[i]) {
            if (typeof objects[i][x] == 'function') {
                objects[i][x] = function () {}
            }
        }
    }
};
if (infosoftglobal.FusionCharts.doPrepUnload) {
    if (!infosoftglobal.unloadSet) {
        infosoftglobal.FusionChartsUtil.prepUnload = function () {
            __flash_unloadHandler = function () {};
            __flash_savedUnloadHandler = function () {};
            window.attachEvent("onunload", infosoftglobal.FusionChartsUtil.cleanupSWFs)
        };
        window.attachEvent("onbeforeunload", infosoftglobal.FusionChartsUtil.prepUnload);
        infosoftglobal.unloadSet = true
    }
}
if (!document.getElementById && document.all) {
    document.getElementById = function (id) {
        return document.all[id]
    }
}
if (Array.prototype.push == null) {
    Array.prototype.push = function (item) {
        this[this.length] = item;
        return this.length
    }
}
infosoftglobal.FusionChartsUtil.getChartObject = function (id) {
    var chartRef = null;
    if (navigator.appName.indexOf("Microsoft Internet") == -1) {
        if (document.embeds && document.embeds[id]) chartRef = document.embeds[id];
        else chartRef = window.document[id]
    } else {
        chartRef = window[id]
    }
    if (!chartRef) chartRef = document.getElementById(id);
    return chartRef
};
infosoftglobal.FusionChartsUtil.updateChartXML = function (chartId, strXML) {
    var chartObj = infosoftglobal.FusionChartsUtil.getChartObject(chartId);
    chartObj.SetVariable("_root.dataURL", "");
    chartObj.SetVariable("_root.isNewData", "1");
    chartObj.SetVariable("_root.newData", strXML);
    chartObj.TGotoLabel("/", "JavaScriptHandler")
};
var getChartFromId = infosoftglobal.FusionChartsUtil.getChartObject;
var updateChartXML = infosoftglobal.FusionChartsUtil.updateChartXML;
var FusionCharts = infosoftglobal.FusionCharts;
NGeometry = NObject({
    id: null,
    parent: null,
    bounds: null,
    construct: function () {
        this.id = NUtility.createUniqueID(this._CLASS_NAME + "_")
    },
    dispose: function () {
        this.id = null;
        this.bounds = null
    },
    clone: function () {
        return new NGeometry()
    },
    setBounds: function (bounds) {
        if (bounds) {
            this.bounds = bounds.clone()
        }
    },
    clearBounds: function () {
        this.bounds = null;
        if (this.parent) {
            this.parent.clearBounds()
        }
    },
    extendBounds: function (newBounds) {
        var bounds = this.getBounds();
        if (!bounds) {
            this.setBounds(newBounds)
        } else {
            this.bounds.extend(newBounds)
        }
    },
    getBounds: function () {
        if (this.bounds == null) {
            this.calculateBounds()
        }
        return this.bounds
    },
    calculateBounds: function () {},
    containsPoint: function (latlng, toleranceLon, toleranceLat) {
        var containsPoint = false;
        var bounds = this.getBounds();
        if ((bounds != null) && (latlng != null)) {
            var dX = (toleranceLon != null) ? toleranceLon : 0;
            var dY = (toleranceLat != null) ? toleranceLat : 0;
            var toleranceBounds = new NBounds(this.bounds.left - dX, this.bounds.bottom - dY, this.bounds.right + dX, this.bounds.top + dY);
            containsPoint = toleranceBounds.containsLonLat(latlng)
        }
        return containsPoint
    },
    getLength: function () {
        return 0.0
    },
    getArea: function () {
        return 0.0
    },
    toString: function () {
        return NParser.WKT.prototype.write(new NVectorFeature(this))
    },
    _CLASS_NAME: "NGeometry"
});
NGeometry.segmentsIntersect = function (seg1, seg2, point) {
    var intersection = false;
    var x11_21 = seg1.x1 - seg2.x1;
    var y11_21 = seg1.y1 - seg2.y1;
    var x12_11 = seg1.x2 - seg1.x1;
    var y12_11 = seg1.y2 - seg1.y1;
    var y22_21 = seg2.y2 - seg2.y1;
    var x22_21 = seg2.x2 - seg2.x1;
    var d = (y22_21 * x12_11) - (x22_21 * y12_11);
    var n1 = (x22_21 * y11_21) - (y22_21 * x11_21);
    var n2 = (x12_11 * y11_21) - (y12_11 * x11_21);
    if (d == 0) {
        if (n1 == 0 && n2 == 0) {
            intersection = true
        }
    } else {
        var along1 = n1 / d;
        var along2 = n2 / d;
        if (along1 >= 0 && along1 <= 1 && along2 >= 0 && along2 <= 1) {
            if (!point) {
                intersection = true
            } else {
                var x = seg1.x1 + (along1 * x12_11);
                var y = seg1.y1 + (along1 * y12_11);
                intersection = new NGeometry.Point(x, y)
            }
        }
    }
    return intersection
};
NGeometry.Rectangle = NObject(NGeometry, {
    x: null,
    y: null,
    width: null,
    height: null,
    construct: function (x, y, width, height) {
        NGeometry.prototype.construct.apply(this, arguments);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height
    },
    calculateBounds: function () {
        this.bounds = new NBounds(this.x, this.y, this.x + this.width, this.y + this.height)
    },
    getLength: function () {
        var length = (2 * this.width) + (2 * this.height);
        return length
    },
    getArea: function () {
        var area = this.width * this.height;
        return area
    },
    _CLASS_NAME: "NGeometry.Rectangle"
});
NGeometry.Collection = NObject(NGeometry, {
    components: null,
    componentTypes: null,
    construct: function (components) {
        NGeometry.prototype.construct.apply(this, arguments);
        this.components = [];
        if (components != null) {
            this.addComponents(components)
        }
    },
    dispose: function () {
        this.components.length = 0;
        this.components = null
    },
    clone: function () {
        var geometry = eval("new " + this._CLASS_NAME + "()");
        for (var i = 0, len = this.components.length; i < len; i++) {
            geometry.addComponent(this.components[i].clone())
        }
        NUtility.applyDefaults(geometry, this);
        return geometry
    },
    getComponentsString: function () {
        var strings = [];
        for (var i = 0, len = this.components.length; i < len; i++) {
            strings.push(this.components[i].toSimpleString())
        }
        return strings.join(",")
    },
    calculateBounds: function () {
        this.bounds = null;
        if (this.components && this.components.length > 0) {
            this.setBounds(this.components[0].getBounds());
            for (var i = 1, len = this.components.length; i < len; i++) {
                this.extendBounds(this.components[i].getBounds())
            }
        }
    },
    addComponents: function (components) {
        if (!(components instanceof Array)) {
            components = [components]
        }
        for (var i = 0, len = components.length; i < len; i++) {
            this.addComponent(components[i])
        }
    },
    addComponent: function (component, index) {
        var added = false;
        if (component) {
            if (this.componentTypes == null || (NUtility.indexOf(this.componentTypes, component._CLASS_NAME) > -1)) {
                if (index != null && (index < this.components.length)) {
                    var components1 = this.components.slice(0, index);
                    var components2 = this.components.slice(index, this.components.length);
                    components1.push(component);
                    this.components = components1.concat(components2)
                } else {
                    this.components.push(component)
                }
                component.parent = this;
                this.clearBounds();
                added = true
            }
        }
        return added
    },
    removeComponents: function (components) {
        if (!(components instanceof Array)) {
            components = [components]
        }
        for (var i = components.length - 1; i >= 0; --i) {
            this.removeComponent(components[i])
        }
    },
    removeComponent: function (component) {
        NUtility.removeItem(this.components, component);
        this.clearBounds()
    },
    getLength: function () {
        var length = 0.0;
        for (var i = 0, len = this.components.length; i < len; i++) {
            length += this.components[i].getLength()
        }
        return length
    },
    getArea: function () {
        var area = 0.0;
        for (var i = 0, len = this.components.length; i < len; i++) {
            area += this.components[i].getArea()
        }
        return area
    },
    move: function (x, y) {
        for (var i = 0, len = this.components.length; i < len; i++) {
            this.components[i].move(x, y)
        }
    },
    rotate: function (angle, origin) {
        for (var i = 0, len = this.components.length; i < len; ++i) {
            this.components[i].rotate(angle, origin)
        }
    },
    resize: function (scale, origin, ratio) {
        for (var i = 0; i < this.components.length; ++i) {
            this.components[i].resize(scale, origin, ratio)
        }
    },
    equals: function (geometry) {
        var equivalent = true;
        if (!geometry || !geometry._CLASS_NAME || (this._CLASS_NAME != geometry._CLASS_NAME)) {
            equivalent = false
        } else if (!(geometry.components instanceof Array) || (geometry.components.length != this.components.length)) {
            equivalent = false
        } else {
            for (var i = 0, len = this.components.length; i < len; ++i) {
                if (!this.components[i].equals(geometry.components[i])) {
                    equivalent = false;
                    break
                }
            }
        }
        return equivalent
    },
    transform: function (source, dest) {
        if (source && dest) {
            for (var i = 0, len = this.components.length; i < len; i++) {
                var component = this.components[i];
                component.transform(source, dest)
            }
            this.bounds = null
        }
        return this
    },
    intersects: function (geometry) {
        var intersect = false;
        for (var i = 0, len = this.components.length; i < len; ++i) {
            intersect = geometry.intersects(this.components[i]);
            if (intersect) {
                break
            }
        }
        return intersect
    },
    _CLASS_NAME: "NGeometry.Collection"
});
NGeometry.Point = NObject(NGeometry, {
    x: null,
    y: null,
    construct: function (x, y) {
        NGeometry.prototype.construct.apply(this, arguments);
        this.x = parseFloat(x);
        this.y = parseFloat(y)
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new NGeometry.Point(this.x, this.y)
        }
        NUtility.applyDefaults(obj, this);
        return obj
    },
    calculateBounds: function () {
        this.bounds = new NBounds(this.x, this.y, this.x, this.y)
    },
    distanceTo: function (point) {
        var distance = 0.0;
        if ((this.x != null) && (this.y != null) && (point != null) && (point.x != null) && (point.y != null)) {
            var dx2 = Math.pow(this.x - point.x, 2);
            var dy2 = Math.pow(this.y - point.y, 2);
            distance = Math.sqrt(dx2 + dy2)
        }
        return distance
    },
    equals: function (geom) {
        var equals = false;
        if (geom != null) {
            equals = ((this.x == geom.x && this.y == geom.y) || (isNaN(this.x) && isNaN(this.y) && isNaN(geom.x) && isNaN(geom.y)))
        }
        return equals
    },
    toSimpleString: function () {
        return (this.x + " " + this.y)
    },
	fromSimpleString:function(str){
		str=str.trim();
		var t=str.split(" ");
		var x=parseFloat(t[0]);
		var y=parseFloat(t[1]);
		return new NGeometry.Point(x,y);
	},
    move: function (x, y) {
        this.x = this.x + x;
        this.y = this.y + y;
        this.clearBounds()
    },
    rotate: function (angle, origin) {
        angle *= Math.PI / 180;
        var radius = this.distanceTo(origin);
        var theta = angle + Math.atan2(this.y - origin.y, this.x - origin.x);
        this.x = origin.x + (radius * Math.cos(theta));
        this.y = origin.y + (radius * Math.sin(theta));
        this.clearBounds()
    },
    resize: function (scale, origin, ratio) {
        ratio = (ratio == undefined) ? 1 : ratio;
        this.x = origin.x + (scale * ratio * (this.x - origin.x));
        this.y = origin.y + (scale * (this.y - origin.y));
        this.clearBounds()
    },
    intersects: function (geometry) {
        var intersect = false;
        if (geometry._CLASS_NAME == "NGeometry.Point") {
            intersect = this.equals(geometry)
        } else {
            intersect = geometry.intersects(this)
        }
        return intersect
    },
    transform: function (source, dest) {
        if ((source && dest)) {
            NProjection.transform(this, source, dest);
            this.bounds = null
        }
        return this
    },
    _CLASS_NAME: "NGeometry.Point"
});
NGeometry.MultiPoint = NObject(NGeometry.Collection, {
    componentTypes: ["NGeometry.Point"],
    construct: function (components) {
        NGeometry.Collection.prototype.construct.apply(this, arguments)
    },
    addPoint: function (point, index) {
        this.addComponent(point, index)
    },
    removePoint: function (point) {
        this.removeComponent(point)
    },
    _CLASS_NAME: "NGeometry.MultiPoint"
});
NGeometry.Curve = NObject(NGeometry.MultiPoint, {
    componentTypes: ["NGeometry.Point"],
    construct: function (points) {
        NGeometry.MultiPoint.prototype.construct.apply(this, arguments)
    },
    getLength: function () {
        var length = 0.0;
        if (this.components && (this.components.length > 1)) {
            for (var i = 1, len = this.components.length; i < len; i++) {
                length += this.components[i - 1].distanceTo(this.components[i])
            }
        }
        return length
    },
    _CLASS_NAME: "NGeometry.Curve"
});
NGeometry.LineString = NObject(NGeometry.Curve, {
    construct: function (points) {
        NGeometry.Curve.prototype.construct.apply(this, arguments)
    },
    removeComponent: function (point) {
        if (this.components && (this.components.length > 2)) {
            NGeometry.Collection.prototype.removeComponent.apply(this, arguments)
        }
    },
    toSimpleString:function(){
        if (this.components && (this.components.length >= 2)) {
            var str="";
			for(var i=0;i<this.components.length;i++){
				if(i!=0){
					str+=",";
				}
				str+=this.components[i].toSimpleString();
			}
			return str;
        }
    },
    intersects: function (geometry) {
        var intersect = false;
        var type = geometry._CLASS_NAME;
        if (type == "NGeometry.LineString" || type == "NGeometry.LinearRing" || type == "NGeometry.Point") {
            var segs1 = this.getSortedSegments();
            var segs2;
            if (type == "NGeometry.Point") {
                segs2 = [{
                    x1: geometry.x,
                    y1: geometry.y,
                    x2: geometry.x,
                    y2: geometry.y
                }]
            } else {
                segs2 = geometry.getSortedSegments()
            }
            var seg1, seg1x1, seg1x2, seg1y1, seg1y2, seg2, seg2y1, seg2y2;
            outer: for (var i = 0, len = segs1.length; i < len; ++i) {
                seg1 = segs1[i];
                seg1x1 = seg1.x1;
                seg1x2 = seg1.x2;
                seg1y1 = seg1.y1;
                seg1y2 = seg1.y2;
                inner: for (var j = 0, jlen = segs2.length; j < jlen; ++j) {
                    seg2 = segs2[j];
                    if (seg2.x1 > seg1x2) {
                        break
                    }
                    if (seg2.x2 < seg1x1) {
                        continue
                    }
                    seg2y1 = seg2.y1;
                    seg2y2 = seg2.y2;
                    if (Math.min(seg2y1, seg2y2) > Math.max(seg1y1, seg1y2)) {
                        continue
                    }
                    if (Math.max(seg2y1, seg2y2) < Math.min(seg1y1, seg1y2)) {
                        continue
                    }
                    if (NGeometry.segmentsIntersect(seg1, seg2)) {
                        intersect = true;
                        break outer
                    }
                }
            }
        } else {
            intersect = geometry.intersects(this)
        }
        return intersect
    },
    getSortedSegments: function () {
        var numSeg = this.components.length - 1;
        var segments = new Array(numSeg);
        for (var i = 0; i < numSeg; ++i) {
            point1 = this.components[i];
            point2 = this.components[i + 1];
            if (point1.x < point2.x) {
                segments[i] = {
                    x1: point1.x,
                    y1: point1.y,
                    x2: point2.x,
                    y2: point2.y
                }
            } else {
                segments[i] = {
                    x1: point2.x,
                    y1: point2.y,
                    x2: point1.x,
                    y2: point1.y
                }
            }
        }
        function byX1(seg1, seg2) {
            return seg1.x1 - seg2.x1
        }
        return segments.sort(byX1)
    },
    _CLASS_NAME: "NGeometry.LineString"
});
NGeometry.LinearRing = NObject(NGeometry.LineString, {
    componentTypes: ["NGeometry.Point"],
    construct: function (points) {
        NGeometry.LineString.prototype.construct.apply(this, arguments)
    },
    addComponent: function (point, index) {
        var added = false;
        var lastPoint = this.components.pop();
        if (index != null || !point.equals(lastPoint)) {
            added = NGeometry.Collection.prototype.addComponent.apply(this, arguments)
        }
        var firstPoint = this.components[0];
        NGeometry.Collection.prototype.addComponent.apply(this, [firstPoint]);
        return added
    },
    removeComponent: function (point) {
        if (this.components.length > 4) {
            this.components.pop();
            NGeometry.Collection.prototype.removeComponent.apply(this, arguments);
            var firstPoint = this.components[0];
            NGeometry.Collection.prototype.addComponent.apply(this, [firstPoint])
        }
    },
    move: function (x, y) {
        for (var i = 0, len = this.components.length; i < len - 1; i++) {
            this.components[i].move(x, y)
        }
    },
    rotate: function (angle, origin) {
        for (var i = 0, len = this.components.length; i < len - 1; ++i) {
            this.components[i].rotate(angle, origin)
        }
    },
    resize: function (scale, origin, ratio) {
        for (var i = 0, len = this.components.length; i < len - 1; ++i) {
            this.components[i].resize(scale, origin, ratio)
        }
    },
    transform: function (source, dest) {
        if (source && dest) {
            for (var i = 0, len = this.components.length; i < len - 1; i++) {
                var component = this.components[i];
                component.transform(source, dest)
            }
            this.bounds = null
        }
        return this
    },
    getArea: function () {
        var area = 0.0;
        if (this.components && (this.components.length > 2)) {
            var sum = 0.0;
            for (var i = 0, len = this.components.length; i < len - 1; i++) {
                var b = this.components[i];
                var c = this.components[i + 1];
                sum += (b.x + c.x) * (c.y - b.y)
            }
            area = -sum / 2.0
        }
        return area
    },
    containsPoint: function (point) {
        var approx = NNumber.setPrecision;
        var digs = 14;
        var px = approx(point.x, digs);
        var py = approx(point.y, digs);

        function getX(y, x1, y1, x2, y2) {
            return (((x1 - x2) * y) + ((x2 * y1) - (x1 * y2))) / (y1 - y2)
        }
        var numSeg = this.components.length - 1;
        var start, end, x1, y1, x2, y2, cx, cy;
        var crosses = 0;
        for (var i = 0; i < numSeg; ++i) {
            start = this.components[i];
            x1 = approx(start.x, digs);
            y1 = approx(start.y, digs);
            end = this.components[i + 1];
            x2 = approx(end.x, digs);
            y2 = approx(end.y, digs);
            if (y1 == y2) {
                if (py == y1) {
                    if (x1 <= x2 && (px >= x1 && px <= x2) || x1 >= x2 && (px <= x1 && px >= x2)) {
                        crosses = -1;
                        break
                    }
                }
                continue
            }
            cx = approx(getX(py, x1, y1, x2, y2), digs);
            if (cx == px) {
                if (y1 < y2 && (py >= y1 && py <= y2) || y1 > y2 && (py <= y1 && py >= y2)) {
                    crosses = -1;
                    break
                }
            }
            if (cx <= px) {
                continue
            }
            if (x1 != x2 && (cx < Math.min(x1, x2) || cx > Math.max(x1, x2))) {
                continue
            }
            if (y1 < y2 && (py >= y1 && py < y2) || y1 > y2 && (py < y1 && py >= y2)) {
                ++crosses
            }
        }
        var contained = (crosses == -1) ? 1 : !! (crosses & 1);
        return contained
    },
    intersects: function (geometry) {
        var intersect = false;
        if (geometry._CLASS_NAME == "NGeometry.Point") {
            intersect = this.containsPoint(geometry)
        } else if (geometry._CLASS_NAME == "NGeometry.LineString") {
            intersect = geometry.intersects(this)
        } else if (geometry._CLASS_NAME == "NGeometry.LinearRing") {
            intersect = NGeometry.LineString.prototype.intersects.apply(this, [geometry])
        } else {
            for (var i = 0, len = geometry.components.length; i < len; ++i) {
                intersect = geometry.components[i].intersects(this);
                if (intersect) {
                    break
                }
            }
        }
        return intersect
    },
    _CLASS_NAME: "NGeometry.LinearRing"
});
NGeometry.Polygon = NObject(NGeometry.Collection, {
    componentTypes: ["NGeometry.LinearRing"],
    construct: function (components) {
        NGeometry.Collection.prototype.construct.apply(this, arguments)
    },
    getArea: function () {
        var area = 0.0;
        if (this.components && (this.components.length > 0)) {
            area += Math.abs(this.components[0].getArea());
            for (var i = 1, len = this.components.length; i < len; i++) {
                area -= Math.abs(this.components[i].getArea())
            }
        }
        return area
    },
    toSimpleString:function(){
        if (this.components ) {
            var str="";
			for(var i=0;i<this.components.length;i++){
				if(i!=0){
					str+="|";
				}
				str+=this.components[i].toSimpleString();
			}
			return str;
        }
    },
    containsPoint: function (point) {
        var numRings = this.components.length;
        var contained = false;
        if (numRings > 0) {
            contained = this.components[0].containsPoint(point);
            if (contained !== 1) {
                if (contained && numRings > 1) {
                    var hole;
                    for (var i = 1; i < numRings; ++i) {
                        hole = this.components[i].containsPoint(point);
                        if (hole) {
                            if (hole === 1) {
                                contained = 1
                            } else {
                                contained = false
                            }
                            break
                        }
                    }
                }
            }
        }
        return contained
    },
    intersects: function (geometry) {
        var intersect = false;
        var i, len;
        if (geometry._CLASS_NAME == "NGeometry.Point") {
            intersect = this.containsPoint(geometry)
        } else if (geometry._CLASS_NAME == "NGeometry.LineString" || geometry._CLASS_NAME == "NGeometry.LinearRing") {
            for (i = 0, len = this.components.length; i < len; ++i) {
                intersect = geometry.intersects(this.components[i]);
                if (intersect) {
                    break
                }
            }
            if (!intersect) {
                for (i = 0, len = geometry.components.length; i < len; ++i) {
                    intersect = this.containsPoint(geometry.components[i]);
                    if (intersect) {
                        break
                    }
                }
            }
        } else {
            for (i = 0, len = geometry.components.length; i < len; ++i) {
                intersect = this.intersects(geometry.components[i]);
                if (intersect) {
                    break
                }
            }
        }
        if (!intersect && geometry._CLASS_NAME == "NGeometry.Polygon") {
            var ring = this.components[0];
            for (i = 0, len = ring.components.length; i < len; ++i) {
                intersect = geometry.containsPoint(ring.components[i]);
                if (intersect) {
                    break
                }
            }
        }
        return intersect
    },
    _CLASS_NAME: "NGeometry.Polygon"
});
NGeometry.Polygon.createRegularPolygon = function (origin, radius, sides, rotation) {
    var angle = Math.PI * ((1 / sides) - (1 / 2));
    if (rotation) {
        angle += (rotation / 180) * Math.PI
    }
    var rotatedAngle, x, y;
    var points = [];
    for (var i = 0; i < sides; ++i) {
        rotatedAngle = angle + (i * 2 * Math.PI / sides);
        x = origin.x + (radius * Math.cos(rotatedAngle));
        y = origin.y + (radius * Math.sin(rotatedAngle));
        points.push(new NGeometry.Point(x, y))
    }
    var ring = new NGeometry.LinearRing(points);
    return new NGeometry.Polygon([ring])
};
NGeometry.MultiLineString = NObject(NGeometry.Collection, {
    componentTypes: ["NGeometry.LineString"],
    construct: function (components) {
        NGeometry.Collection.prototype.construct.apply(this, arguments)
    },
    _CLASS_NAME: "NGeometry.MultiLineString"
});
NGeometry.MultiPolygon = NObject(NGeometry.Collection, {
    componentTypes: ["NGeometry.Polygon"],
    construct: function (components) {
        NGeometry.Collection.prototype.construct.apply(this, arguments)
    },
    _CLASS_NAME: "NGeometry.MultiPolygon"
});
NGeometry.Surface = NObject(NGeometry, {
    construct: function () {
        NGeometry.prototype.construct.apply(this, arguments)
    },
    _CLASS_NAME: "NGeometry.Surface"
});
NRender = NObject({
    container: null,
    extent: null,
    locked: false,
    size: null,
    resolution: null,
    map: null,
    construct: function (containerID, options) {
        this.container = NUtility.getElement(containerID)
    },
    dispose: function () {
        this.container = null;
        this.extent = null;
        this.size = null;
        this.resolution = null;
        this.map = null
    },
    supported: function () {
        return false
    },
    setExtent: function (extent, resolutionChanged) {
        this.extent = extent.clone();
        if (resolutionChanged) {
            this.resolution = null
        }
    },
    setSize: function (size) {
        this.size = size.clone();
        this.resolution = null
    },
    getResolution: function () {
        this.resolution = this.resolution || this.map.getResolution();
        return this.resolution
    },
    drawFeature: function (feature, style) {
        if (style == null) {
            style = feature.style
        }
        if (feature.geometry) {
            var bounds = feature.geometry.getBounds();
            if (bounds) {
                if (!bounds.intersectsBounds(this.extent)) {
                    style = {
                        display: "none"
                    }
                }
                return this.drawGeometry(feature.geometry, style, feature.id)
            }
        }
    },
    drawGeometry: function (geometry, style, featureId) {},
    clear: function () {},
    getFeatureIdByEvent: function (evt) {},
    deleteFeatures: function (features) {
        if (!(features instanceof Array)) {
            features = [features]
        }
        for (var i = 0, len = features.length; i < len; ++i) {
            this.deleteGeometry(features[i].geometry)
        }
    },
    deleteGeometry: function (geometry) {},
    _CLASS_NAME: "NRender"
});
NElementsIndexer = NObject({
    maxZIndex: null,
    order: null,
    indices: null,
    compare: null,
    construct: function (yOrdering) {
        this.compare = yOrdering ? NElementsIndexer.IndexerMethods.Z_ORDER_Y_ORDER : NElementsIndexer.IndexerMethods.Z_ORDER_DRAWING_ORDER;
        this.order = [];
        this.indices = {};
        this.maxZIndex = 0
    },
    insert: function (newNode) {
        if (this.exists(newNode)) {
            this.remove(newNode)
        }
        var nodeId = newNode.id;
        this.determineZIndex(newNode);
        var leftIndex = -1;
        var rightIndex = this.order.length;
        var middle;
        while (rightIndex - leftIndex > 1) {
            middle = parseInt((leftIndex + rightIndex) / 2);
            var placement = this.compare(this, newNode, NUtility.getElement(this.order[middle]));
            if (placement > 0) {
                leftIndex = middle
            } else {
                rightIndex = middle
            }
        }
        this.order.splice(rightIndex, 0, nodeId);
        this.indices[nodeId] = this.getZIndex(newNode);
        var nextIndex = rightIndex + 1;
        return nextIndex < this.order.length ? NUtility.getElement(this.order[nextIndex]) : null
    },
    remove: function (node) {
        var nodeId = node.id;
        var arrayIndex = NUtility.indexOf(this.order, nodeId);
        if (arrayIndex >= 0) {
            this.order.splice(arrayIndex, 1);
            delete this.indices[nodeId];
            if (this.order.length > 0) {
                var lastId = this.order[this.order.length - 1];
                this.maxZIndex = this.indices[lastId]
            } else {
                this.maxZIndex = 0
            }
        }
    },
    clear: function () {
        this.order = [];
        this.indices = {};
        this.maxZIndex = 0
    },
    exists: function (node) {
        return (this.indices[node.id] != null)
    },
    getZIndex: function (node) {
        return node._style.graphicZIndex
    },
    determineZIndex: function (node) {
        var zIndex = node._style.graphicZIndex;
        if (zIndex == null) {
            zIndex = this.maxZIndex;
            node._style.graphicZIndex = zIndex
        } else if (zIndex > this.maxZIndex) {
            this.maxZIndex = zIndex
        }
    },
    _CLASS_NAME: "NElementsIndexer"
});
NElementsIndexer.IndexerMethods = {
    Z_ORDER: function (indexer, newNode, nextNode) {
        var newZIndex = indexer.getZIndex(newNode);
        var returnVal = 0;
        if (nextNode) {
            var nextZIndex = indexer.getZIndex(nextNode);
            returnVal = newZIndex - nextZIndex
        }
        return returnVal
    },
    Z_ORDER_DRAWING_ORDER: function (indexer, newNode, nextNode) {
        var returnVal = NElementsIndexer.IndexerMethods.Z_ORDER(indexer, newNode, nextNode);
        if (nextNode && returnVal == 0) {
            returnVal = 1
        }
        return returnVal
    },
    Z_ORDER_Y_ORDER: function (indexer, newNode, nextNode) {
        var returnVal = NElementsIndexer.IndexerMethods.Z_ORDER(indexer, newNode, nextNode);
        if (nextNode && returnVal == 0) {
            var newLat = newNode._geometry.getBounds().bottom;
            var nextLat = nextNode._geometry.getBounds().bottom;
            var result = nextLat - newLat;
            returnVal = (result == 0) ? 1 : result
        }
        return returnVal
    }
};
NElementsRender = NObject(NRender, {
    rendererRoot: null,
    root: null,
    xmlns: null,
    indexer: null,
    BACKGROUND_ID_SUFFIX: "_background",
    minSymbolizer: {
        strokeLinecap: "round",
        strokeOpacity: 1,
        strokeDashstyle: "solid",
        fillOpacity: 1,
        pointRadius: 0
    },
    construct: function (containerID, options) {
        NRender.prototype.construct.apply(this, arguments);
        this.rendererRoot = this.createRenderRoot();
        this.root = this.createRoot();
        this.rendererRoot.appendChild(this.root);
        this.container.appendChild(this.rendererRoot);
        if (options && (options.zIndexing || options.yOrdering)) {
            this.indexer = new NElementsIndexer(options.yOrdering)
        }
    },
    dispose: function () {
        this.clear();
        this.rendererRoot = null;
        this.root = null;
        this.xmlns = null;
        NRender.prototype.dispose.apply(this, arguments)
    },
    clear: function () {
        if (this.root) {
            while (this.root.childNodes.length > 0) {
                this.root.removeChild(this.root.firstChild)
            }
        }
        if (this.indexer) {
            this.indexer.clear()
        }
    },
    getNodeType: function (geometry, style) {},
    drawGeometry: function (geometry, symbol, featureId) {
        var className = geometry._CLASS_NAME;
        var rendered = true;
        if ((className == "NGeometry.Collection") || (className == "NGeometry.MultiPoint") || (className == "NGeometry.MultiLineString") || (className == "NGeometry.MultiPolygon")) {
            for (var i = 0, len = geometry.components.length; i < len; i++) {
                rendered = rendered && this.drawGeometry(geometry.components[i], symbol, featureId)
            }
            return rendered
        };
        rendered = false;
        if (symbol.display != "none") {
            if (symbol.backgroundGraphic) {
                this.redrawBackgroundNode(geometry.id, geometry, symbol, featureId)
            }
            rendered = this.redrawNode(geometry.id, geometry, symbol, featureId)
        }
        if (rendered == false) {
            var node = document.getElementById(geometry.id);
            if (node) {
                if (node._style.backgroundGraphic) {
                    node.parentNode.removeChild(document.getElementById(geometry.id + this.BACKGROUND_ID_SUFFIX))
                }
                node.parentNode.removeChild(node)
            }
        }
        return rendered
    },
    redrawNode: function (id, geometry, symbol, featureId) {
        var node = this.nodeCollection(id, this.getNodeType(geometry, symbol));
        node._featureId = featureId;
        node._geometry = geometry;
        node._geometryClass = geometry._CLASS_NAME;
        node._style = symbol;
        var drawResult = this.drawGeometryNode(node, geometry, symbol);
        if (drawResult === false) {
            return false
        }
        node = drawResult.node;
        var insert = this.indexer ? this.indexer.insert(node) : null;
        if (insert) {
            this.root.insertBefore(node, insert)
        } else {
            this.root.appendChild(node)
        }
        this._postRender(node);
        return drawResult.complete
    },
    redrawBackgroundNode: function (id, geometry, style, featureId) {
        var backgroundStyle = NUtility.extend({}, style);
        backgroundStyle.externalGraphic = backgroundStyle.backgroundGraphic;
        backgroundStyle.graphicXOffset = backgroundStyle.backgroundXOffset;
        backgroundStyle.graphicYOffset = backgroundStyle.backgroundYOffset;
        backgroundStyle.graphicZIndex = backgroundStyle.backgroundGraphicZIndex;
        backgroundStyle.backgroundGraphic = null;
        backgroundStyle.backgroundXOffset = null;
        backgroundStyle.backgroundYOffset = null;
        backgroundStyle.backgroundGraphicZIndex = null;
        return this.redrawNode(id + this.BACKGROUND_ID_SUFFIX, geometry, backgroundStyle, null)
    },
    drawGeometryNode: function (node, geometry, symbol) {
        symbol = symbol || node._style;
        NUtility.applyDefaults(symbol, this.minSymbolizer);
        var options = {
            'isFilled': true,
            'isStroked': !! symbol.strokeWidth
        };
        var drawn;
        switch (geometry._CLASS_NAME) {
        case "NGeometry.Point":
            drawn = this.drawPoint(node, geometry);
            break;
        case "NGeometry.LineString":
            options.isFilled = false;
            drawn = this.drawLineString(node, geometry);
            break;
        case "NGeometry.LinearRing":
            drawn = this.drawLinearRing(node, geometry);
            break;
        case "NGeometry.Polygon":
            drawn = this.drawPolygon(node, geometry);
            break;
        case "NGeometry.Surface":
            drawn = this.drawSurface(node, geometry);
            break;
        case "NGeometry.Rectangle":
            drawn = this.drawRectangle(node, geometry);
            break;
        default:
            break
        }
        node._style = symbol;
        node._options = options;
        if (drawn != false) {
            return {
                node: this.setStyle(node, symbol, options, geometry),
                complete: drawn
            }
        } else {
            return false
        }
    },
    _postRender: function (node) {},
    drawPoint: function (node, geometry) {},
    drawLineString: function (node, geometry) {},
    drawLinearRing: function (node, geometry) {},
    drawPolygon: function (node, geometry) {},
    drawRectangle: function (node, geometry) {},
    drawCircle: function (node, geometry) {},
    drawSurface: function (node, geometry) {},
    getFeatureIdByEvent: function (evt) {
        var target = evt.target;
        var useElement = target && target.correspondingUseElement;
        var node = useElement ? useElement : (target || evt.srcElement);
        var featureId = node._featureId;
        return featureId
    },
    deleteGeometry: function (geometry) {
        if ((geometry._CLASS_NAME == "NGeometry.MultiPoint") || (geometry._CLASS_NAME == "NGeometry.MultiLineString") || (geometry._CLASS_NAME == "NGeometry.MultiPolygon") || (geometry._CLASS_NAME == "NGeometry.Collection")) {
            for (var i = 0, len = geometry.components.length; i < len; i++) {
                this.deleteGeometry(geometry.components[i])
            }
        } else {
            var element = NUtility.getElement(geometry.id);
            if (element && element.parentNode) {
                if (element.geometry) {
                    element.geometry.dispose();
                    element.geometry = null
                }
                element.parentNode.removeChild(element);
                if (this.indexer) {
                    this.indexer.remove(element)
                }
                if (element._style.backgroundGraphic) {
                    var backgroundId = geometry.id + this.BACKGROUND_ID_SUFFIX;
                    var bElem = NUtility.getElement(backgroundId);
                    if (bElem && bElem.parentNode) {
                        bElem.parentNode.removeChild(bElem)
                    }
                }
            }
        }
    },
    nodeCollection: function (id, type) {
        var node = NUtility.getElement(id);
        if (node) {
            if (!this.compareNodeType(node, type)) {
                node.parentNode.removeChild(node);
                node = this.nodeCollection(id, type)
            }
        } else {
            node = this.createNode(type, id)
        }
        return node
    },
    compareNodeType: function (node, type) {},
    createNode: function (type, id) {},
    isComplexSymbol: function (graphicName) {
        return (graphicName != "circle") && !! graphicName
    },
    _CLASS_NAME: "NElementsRender"
});
NSymbolRender = {
    "star": [350, 75, 379, 161, 469, 161, 397, 215, 423, 301, 350, 250, 277, 301, 303, 215, 231, 161, 321, 161, 350, 75],
    "cross": [4, 0, 6, 0, 6, 4, 10, 4, 10, 6, 6, 6, 6, 10, 4, 10, 4, 6, 0, 6, 0, 4, 4, 4, 4, 0],
    "x": [0, 0, 25, 0, 50, 35, 75, 0, 100, 0, 65, 50, 100, 100, 75, 100, 50, 65, 25, 100, 0, 100, 35, 50, 0, 0],
    "square": [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
    "triangle": [0, 10, 10, 10, 5, 0, 0, 10]
};
NSVGRender = NObject(NElementsRender, {
    xmlns: "http://www.w3.org/2000/svg",
    xlinkns: "http://www.w3.org/1999/xlink",
    MAX_PIXEL: 15000,
    translationParams: null,
    symbolSize: {},
    construct: function (containerID) {
        if (!this.supported()) {
            return
        }
        NElementsRender.prototype.construct.apply(this, arguments);
        this.translationParams = {
            x: 0,
            y: 0
        }
    },
    dispose: function () {
        NElementsRender.prototype.dispose.apply(this, arguments)
    },
    supported: function () {
        var svgFeature = "http://www.w3.org/TR/SVG11/feature#";
        return (document.implementation && (document.implementation.hasFeature("org.w3c.svg", "1.0") || document.implementation.hasFeature(svgFeature + "SVG", "1.1") || document.implementation.hasFeature(svgFeature + "BasicStructure", "1.1")))
    },
    inValidRange: function (x, y, xyOnly) {
        var left = x + (xyOnly ? 0 : this.translationParams.x);
        var top = y + (xyOnly ? 0 : this.translationParams.y);
        return (left >= -this.MAX_PIXEL && left <= this.MAX_PIXEL && top >= -this.MAX_PIXEL && top <= this.MAX_PIXEL)
    },
    setExtent: function (extent, resolutionChanged) {
        NElementsRender.prototype.setExtent.apply(this, arguments);
        var resolution = this.getResolution();
        var left = -extent.left / resolution;
        var top = extent.top / resolution;
        if (resolutionChanged) {
            this.left = left;
            this.top = top;
            var extentString = "0 0 " + this.size.w + " " + this.size.h;
            this.rendererRoot.setAttributeNS(null, "viewBox", extentString);
            this.translate(0, 0);
            return true
        } else {
            var inRange = this.translate(left - this.left, top - this.top);
            if (!inRange) {
                this.setExtent(extent, true)
            }
            return inRange
        }
    },
    translate: function (x, y) {
        if (!this.inValidRange(x, y, true)) {
            return false
        } else {
            var transformString = "";
            if (x || y) {
                transformString = "translate(" + x + "," + y + ")"
            }
            this.root.setAttributeNS(null, "transform", transformString);
            this.translationParams = {
                x: x,
                y: y
            };
            return true
        }
    },
    setSize: function (size) {
        NRender.prototype.setSize.apply(this, arguments);
        this.rendererRoot.setAttributeNS(null, "width", this.size.w);
        this.rendererRoot.setAttributeNS(null, "height", this.size.h)
    },
    getNodeType: function (geometry, style) {
        var nodeType = null;
        switch (geometry._CLASS_NAME) {
        case "NGeometry.Point":
            if (style.externalGraphic) {
                nodeType = "image"
            } else if (this.isComplexSymbol(style.graphicName)) {
                nodeType = "use"
            } else {
                nodeType = "circle"
            }
            break;
        case "NGeometry.Rectangle":
            nodeType = "rect";
            break;
        case "NGeometry.LineString":
            nodeType = "polyline";
            break;
        case "NGeometry.LinearRing":
            nodeType = "polygon";
            break;
        case "NGeometry.Polygon":
        case "NGeometry.Curve":
        case "NGeometry.Surface":
            nodeType = "path";
            break;
        default:
            break
        }
        return nodeType
    },
    setStyle: function (node, style, options) {
        style = style || node._style;
        options = options || node._options;
        var r = parseFloat(node.getAttributeNS(null, "r"));
        var widthFactor = 1;
        var pos;
        if (node._geometryClass == "NGeometry.Point" && r) {
            if (style.externalGraphic) {
                pos = this.getPosition(node);
                if (style.graphicWidth && style.graphicHeight) {
                    node.setAttributeNS(null, "preserveAspectRatio", "none")
                }
                var width = style.graphicWidth || style.graphicHeight;
                var height = style.graphicHeight || style.graphicWidth;
                width = (width > 0) ? width : style.pointRadius * 2;
                height = (height > 0) ? height : style.pointRadius * 2;
                var xOffset = (style.graphicXOffset != undefined) ? style.graphicXOffset : -(0.5 * width);
                var yOffset = (style.graphicYOffset != undefined) ? style.graphicYOffset : -(0.5 * height);
                var opacity = style.graphicOpacity || style.fillOpacity;
                node.setAttributeNS(null, "x", (pos.x + xOffset).toFixed());
                node.setAttributeNS(null, "y", (pos.y + yOffset).toFixed());
                node.setAttributeNS(null, "width", width);
                node.setAttributeNS(null, "height", height);
                node.setAttributeNS(this.xlinkns, "href", style.externalGraphic);
                node.setAttributeNS(null, "style", "opacity: " + opacity)
            } else if (this.isComplexSymbol(style.graphicName)) {
                var offset = style.pointRadius * 3;
                var size = offset * 2;
                var id = this.importSymbol(style.graphicName);
                var href = "#" + id;
                pos = this.getPosition(node);
                var widthFactor = (this.symbolSize[id]) / size;
                if (node.getAttributeNS(this.xlinkns, "href") != href) {
                    node.setAttributeNS(this.xlinkns, "href", href)
                } else if (size != parseFloat(node.getAttributeNS(null, "width"))) {
                    node.style.visible = "hidden";
                    this.container.scrollLeft = this.container.scrollLeft
                }
                node.setAttributeNS(null, "width", size);
                node.setAttributeNS(null, "height", size);
                node.setAttributeNS(null, "x", pos.x - offset);
                node.setAttributeNS(null, "y", pos.y - offset);
                node.style.visible = ""
            } else {
                node.setAttributeNS(null, "r", style.pointRadius)
            }
            if (typeof style.rotation != "undefined" && pos) {
                var rotation = NString.format("rotate(${0} ${1} ${2})", [style.rotation, pos.x, pos.y]);
                node.setAttributeNS(null, "transform", rotation)
            }
        }
        if (options.isFilled) {
            node.setAttributeNS(null, "fill", style.fillColor);
            node.setAttributeNS(null, "fill-opacity", style.fillOpacity)
        } else {
            node.setAttributeNS(null, "fill", "none")
        }
        if (options.isStroked) {
            node.setAttributeNS(null, "stroke", style.strokeColor);
            node.setAttributeNS(null, "stroke-opacity", style.strokeOpacity);
            node.setAttributeNS(null, "stroke-width", style.strokeWidth * widthFactor);
            node.setAttributeNS(null, "stroke-linecap", style.strokeLinecap);
            node.setAttributeNS(null, "stroke-linejoin", "round");
            node.setAttributeNS(null, "stroke-dasharray", this.dashStyle(style, widthFactor))
        } else {
            node.setAttributeNS(null, "stroke", "none")
        }
        if (style.pointerEvents) {
            node.setAttributeNS(null, "pointer-events", style.pointerEvents)
        }
        if (style.cursor != null) {
            node.setAttributeNS(null, "cursor", style.cursor)
        }
        return node
    },
    dashStyle: function (style, widthFactor) {
        var w = style.strokeWidth * widthFactor;
        switch (style.strokeDashstyle) {
        case 'solid':
            return 'none';
        case 'dot':
            return [1, 4 * w].join();
        case 'dash':
            return [4 * w, 4 * w].join();
        case 'dashdot':
            return [4 * w, 4 * w, 1, 4 * w].join();
        case 'longdash':
            return [8 * w, 4 * w].join();
        case 'longdashdot':
            return [8 * w, 4 * w, 1, 4 * w].join();
        default:
            return style.strokeDashstyle.replace(/ /g, ",")
        }
    },
    createNode: function (type, id) {
        var node = document.createElementNS(this.xmlns, type);
        if (id) {
            node.setAttributeNS(null, "id", id)
        }
        return node
    },
    compareNodeType: function (node, type) {
        return (type == node.nodeName)
    },
    createRenderRoot: function () {
        return this.nodeCollection(this.container.id + "_svgRoot", "svg")
    },
    createRoot: function () {
        return this.nodeCollection(this.container.id + "_root", "g")
    },
    createDefs: function () {
        var defs = this.nodeCollection("nm-renderer-defs", "defs");
        this.rendererRoot.appendChild(defs);
        return defs
    },
    drawPoint: function (node, geometry) {
        return this.drawCircle(node, geometry, 1)
    },
    drawCircle: function (node, geometry, radius) {
        var resolution = this.getResolution();
        var x = (geometry.x / resolution + this.left);
        var y = (this.top - geometry.y / resolution);
        if (this.inValidRange(x, y)) {
            node.setAttributeNS(null, "cx", x);
            node.setAttributeNS(null, "cy", y);
            node.setAttributeNS(null, "r", radius);
            return node
        } else {
            return false
        }
    },
    drawLineString: function (node, geometry) {
        var componentsResult = this.getComponentsString(geometry.components);
        if (componentsResult.path) {
            node.setAttributeNS(null, "points", componentsResult.path);
            return (componentsResult.complete ? node : null)
        } else {
            return false
        }
    },
    drawLinearRing: function (node, geometry) {
        var componentsResult = this.getComponentsString(geometry.components);
        if (componentsResult.path) {
            node.setAttributeNS(null, "points", componentsResult.path);
            return (componentsResult.complete ? node : null)
        } else {
            return false
        }
    },
    drawPolygon: function (node, geometry) {
        var d = "";
        var draw = true;
        var complete = true;
        var linearRingResult, path;
        for (var j = 0, len = geometry.components.length; j < len; j++) {
            d += " M";
            linearRingResult = this.getComponentsString(geometry.components[j].components, " ");
            path = linearRingResult.path;
            if (path) {
                d += " " + path;
                complete = linearRingResult.complete && complete
            } else {
                draw = false
            }
        }
        d += " z";
        if (draw) {
            node.setAttributeNS(null, "d", d);
            node.setAttributeNS(null, "fill-rule", "evenodd");
            return complete ? node : null
        } else {
            return false
        }
    },
    drawRectangle: function (node, geometry) {
        var resolution = this.getResolution();
        var x = (geometry.x / resolution + this.left);
        var y = (this.top - geometry.y / resolution);
        if (this.inValidRange(x, y)) {
            node.setAttributeNS(null, "x", x);
            node.setAttributeNS(null, "y", y);
            node.setAttributeNS(null, "width", geometry.width / resolution);
            node.setAttributeNS(null, "height", geometry.height / resolution);
            return node
        } else {
            return false
        }
    },
    drawSurface: function (node, geometry) {
        var d = null;
        var draw = true;
        for (var i = 0, len = geometry.components.length; i < len; i++) {
            if ((i % 3) == 0 && (i / 3) == 0) {
                var component = this.getShortString(geometry.components[i]);
                if (!component) {
                    draw = false
                }
                d = "M " + component
            } else if ((i % 3) == 1) {
                var component = this.getShortString(geometry.components[i]);
                if (!component) {
                    draw = false
                }
                d += " C " + component
            } else {
                var component = this.getShortString(geometry.components[i]);
                if (!component) {
                    draw = false
                }
                d += " " + component
            }
        }
        d += " Z";
        if (draw) {
            node.setAttributeNS(null, "d", d);
            return node
        } else {
            return false
        }
    },
    getComponentsString: function (components, separator) {
        var renderCmp = [];
        var complete = true;
        var len = components.length;
        var strings = [];
        var str, component, j;
        for (var i = 0; i < len; i++) {
            component = components[i];
            renderCmp.push(component);
            str = this.getShortString(component);
            if (str) {
                strings.push(str)
            } else {
                if (i > 0) {
                    if (this.getShortString(components[i - 1])) {
                        strings.push(this.clipLine(components[i], components[i - 1]))
                    }
                }
                if (i < len - 1) {
                    if (this.getShortString(components[i + 1])) {
                        strings.push(this.clipLine(components[i], components[i + 1]))
                    }
                }
                complete = false
            }
        }
        return {
            path: strings.join(separator || ","),
            complete: complete
        }
    },
    clipLine: function (badComponent, goodComponent) {
        if (goodComponent.equals(badComponent)) {
            return ""
        }
        var resolution = this.getResolution();
        var maxX = this.MAX_PIXEL - this.translationParams.x;
        var maxY = this.MAX_PIXEL - this.translationParams.y;
        var x1 = goodComponent.x / resolution + this.left;
        var y1 = this.top - goodComponent.y / resolution;
        var x2 = badComponent.x / resolution + this.left;
        var y2 = this.top - badComponent.y / resolution;
        var k;
        if (x2 < -maxX || x2 > maxX) {
            k = (y2 - y1) / (x2 - x1);
            x2 = x2 < 0 ? -maxX : maxX;
            y2 = y1 + (x2 - x1) * k
        }
        if (y2 < -maxY || y2 > maxY) {
            k = (x2 - x1) / (y2 - y1);
            y2 = y2 < 0 ? -maxY : maxY;
            x2 = x1 + (y2 - y1) * k
        }
        return x2 + "," + y2
    },
    getShortString: function (point) {
        var resolution = this.getResolution();
        var x = (point.x / resolution + this.left);
        var y = (this.top - point.y / resolution);
        if (this.inValidRange(x, y)) {
            return x + "," + y
        } else {
            return false
        }
    },
    getPosition: function (node) {
        return ({
            x: parseFloat(node.getAttributeNS(null, "cx")),
            y: parseFloat(node.getAttributeNS(null, "cy"))
        })
    },
    importSymbol: function (graphicName) {
        if (!this.defs) {
            this.defs = this.createDefs()
        }
        var id = this.container.id + "-" + graphicName;
        if (document.getElementById(id) != null) {
            return id
        }
        var symbol = NSymbolRender[graphicName];
        if (!symbol) {
            throw new Error(graphicName + ' is not a valid symbol name');
            return
        }
        var symbolNode = this.nodeCollection(id, "symbol");
        var node = this.nodeCollection(null, "polygon");
        symbolNode.appendChild(node);
        var symbolExtent = new NBounds(Number.MAX_VALUE, Number.MAX_VALUE, 0, 0);
        var points = "";
        var x, y;
        for (var i = 0; i < symbol.length; i = i + 2) {
            x = symbol[i];
            y = symbol[i + 1];
            symbolExtent.left = Math.min(symbolExtent.left, x);
            symbolExtent.bottom = Math.min(symbolExtent.bottom, y);
            symbolExtent.right = Math.max(symbolExtent.right, x);
            symbolExtent.top = Math.max(symbolExtent.top, y);
            points += " " + x + "," + y
        }
        node.setAttributeNS(null, "points", points);
        var width = symbolExtent.getWidth();
        var height = symbolExtent.getHeight();
        var viewBox = [symbolExtent.left - width, symbolExtent.bottom - height, width * 3, height * 3];
        symbolNode.setAttributeNS(null, "viewBox", viewBox.join(" "));
        this.symbolSize[id] = Math.max(width, height) * 3;
        this.defs.appendChild(symbolNode);
        return symbolNode.id
    },
    _CLASS_NAME: "NSVGRender"
});
NCanvasRender = NObject(NRender, {
    root: null,
    canvas: null,
    features: null,
    geometryMap: null,
    construct: function (containerID) {
        NRender.prototype.construct.apply(this, arguments);
        this.root = document.createElement("canvas");
        this.container.appendChild(this.root);
        this.canvas = this.root.getContext("2d");
        this.features = {};
        this.geometryMap = {}
    },
    deleteGeometry: function (geometry) {
        this.deleteFeatures(this.features[this.geometryMap[geometry.id]][0])
    },
    supported: function () {
        var canvas = document.createElement("canvas");
        return !!canvas.getContext
    },
    setExtent: function (extent) {
        this.extent = extent.clone();
        this.resolution = null;
        this.redraw()
    },
    setSize: function (size) {
        this.size = size.clone();
        this.root.style.width = size.w + "px";
        this.root.style.height = size.h + "px";
        this.root.width = size.w;
        this.root.height = size.h;
        this.resolution = null
    },
    drawFeature: function (feature, symbol) {
        if (symbol == null) {
            symbol = feature.style
        }
        symbol = NUtility.extend({
            'fillColor': '#000000',
            'strokeColor': '#000000',
            'strokeWidth': 2,
            'fillOpacity': 1,
            'strokeOpacity': 1
        }, symbol);
        this.features[feature.id] = [feature, symbol];
        this.geometryMap[feature.geometry.id] = feature.id;
        this.redraw()
    },
    drawGeometry: function (geometry, symbol) {
        var className = geometry._CLASS_NAME;
        if ((className == "NGeometry.Collection") || (className == "NGeometry.MultiPoint") || (className == "NGeometry.MultiLineString") || (className == "NGeometry.MultiPolygon")) {
            for (var i = 0; i < geometry.components.length; i++) {
                this.drawGeometry(geometry.components[i], symbol)
            }
            return
        };
        switch (geometry._CLASS_NAME) {
        case "NGeometry.Point":
            this.drawPoint(geometry, symbol);
            break;
        case "NGeometry.LineString":
            this.drawLineString(geometry, symbol);
            break;
        case "NGeometry.LinearRing":
            this.drawLinearRing(geometry, symbol);
            break;
        case "NGeometry.Polygon":
            this.drawPolygon(geometry, symbol);
            break;
        default:
            break
        }
    },
    drawExternalGraphic: function (pt, style) {
        var img = new Image();
        img.src = style.externalGraphic;
        var width = style.graphicWidth || style.graphicHeight;
        var height = style.graphicHeight || style.graphicWidth;
        width = width ? width : style.pointRadius * 2;
        height = height ? height : style.pointRadius * 2;
        var xOffset = (style.graphicXOffset != undefined) ? style.graphicXOffset : -(0.5 * width);
        var yOffset = (style.graphicYOffset != undefined) ? style.graphicYOffset : -(0.5 * height);
        var opacity = style.graphicOpacity || style.fillOpacity;
        var context = {
            img: img,
            x: (pt[0] + xOffset),
            y: (pt[1] + yOffset),
            width: width,
            height: height,
            canvas: this.canvas
        };
        img.onload = NFunction.bind(function () {
            this.canvas.drawImage(this.img, this.x, this.y, this.width, this.height)
        }, context)
    },
    setCanvasStyle: function (type, style) {
        if (type == "fill") {
            this.canvas.globalAlpha = style['fillOpacity'];
            this.canvas.fillStyle = style['fillColor']
        } else if (type == "stroke") {
            this.canvas.globalAlpha = style['strokeOpacity'];
            this.canvas.strokeStyle = style['strokeColor'];
            this.canvas.lineWidth = style['strokeWidth']
        } else {
            this.canvas.globalAlpha = 0;
            this.canvas.lineWidth = 1
        }
    },
    drawPoint: function (geometry, style) {
        var pt = this.getLocalXY(geometry);
        if (style.externalGraphic) {
            this.drawExternalGraphic(pt, style)
        } else {
            this.setCanvasStyle("fill", style);
            this.canvas.beginPath();
            this.canvas.arc(pt[0], pt[1], 6, 0, Math.PI * 2, true);
            this.canvas.fill();
            this.setCanvasStyle("stroke", style);
            this.canvas.beginPath();
            this.canvas.arc(pt[0], pt[1], 6, 0, Math.PI * 2, true);
            this.canvas.stroke();
            this.setCanvasStyle("reset")
        }
    },
    drawLineString: function (geometry, style) {
        this.setCanvasStyle("stroke", style);
        this.canvas.beginPath();
        var start = this.getLocalXY(geometry.components[0]);
        this.canvas.moveTo(start[0], start[1]);
        for (var i = 1; i < geometry.components.length; i++) {
            var pt = this.getLocalXY(geometry.components[i]);
            this.canvas.lineTo(pt[0], pt[1])
        }
        this.canvas.stroke();
        this.setCanvasStyle("reset")
    },
    drawLinearRing: function (geometry, symbol) {
        this.setCanvasStyle("fill", symbol);
        this.canvas.beginPath();
        var start = this.getLocalXY(geometry.components[0]);
        this.canvas.moveTo(start[0], start[1]);
        for (var i = 1; i < geometry.components.length - 1; i++) {
            var pt = this.getLocalXY(geometry.components[i]);
            this.canvas.lineTo(pt[0], pt[1])
        }
        this.canvas.fill();
        var oldWidth = this.canvas.lineWidth;
        this.setCanvasStyle("stroke", symbol);
        this.canvas.beginPath();
        var start = this.getLocalXY(geometry.components[0]);
        this.canvas.moveTo(start[0], start[1]);
        for (var i = 1; i < geometry.components.length; i++) {
            var pt = this.getLocalXY(geometry.components[i]);
            this.canvas.lineTo(pt[0], pt[1])
        }
        this.canvas.stroke();
        this.setCanvasStyle("reset")
    },
    drawPolygon: function (geometry, symbol) {
        this.drawLinearRing(geometry.components[0], symbol);
        for (var i = 1; i < geometry.components.length; i++) {
            this.drawLinearRing(geometry.components[i], {
                fillOpacity: 0,
                strokeWidth: 0,
                strokeOpacity: 0,
                strokeColor: '#000000',
                fillColor: '#000000'
            })
        }
    },
    getLocalXY: function (point) {
        var resolution = this.getResolution();
        var extent = this.extent;
        var x = (point.x / resolution + (-extent.left / resolution));
        var y = ((extent.top / resolution) - point.y / resolution);
        return [x, y]
    },
    clear: function () {
        this.canvas.clearRect(0, 0, this.root.width, this.root.height)
    },
    getFeatureIdByEvent: function (evt) {
        var loc = this.map.pixelToWorld(evt.xy);
        var resolution = this.getResolution();
        var bounds = new NBounds(loc.lon - resolution * 5, loc.lat - resolution * 5, loc.lon + resolution * 5, loc.lat + resolution * 5);
        var geom = bounds.toGeometry();
        for (var feat in this.features) {
            if (!this.features.hasOwnProperty(feat)) {
                continue
            }
            if (this.features[feat][0].geometry.intersects(geom)) {
                return feat
            }
        }
        return null
    },
    deleteFeatures: function (features) {
        if (!(features instanceof Array)) {
            features = [features]
        }
        for (var i = 0; i < features.length; ++i) {
            delete this.features[features[i].id]
        }
        this.redraw()
    },
    redraw: function () {
        if (!this.locked) {
            this.clear();
            for (var id in this.features) {
                if (!this.features.hasOwnProperty(id)) {
                    continue
                }
                if (!this.features[id][0].geometry) {
                    continue
                }
                this.drawGeometry(this.features[id][0].geometry, this.features[id][1])
            }
        }
    },
    _CLASS_NAME: "NCanvasRender"
});


NVMLRender = NObject(NElementsRender, {
    xmlns: "urn:schemas-microsoft-com:vml",
    symbolCache: {},
    offset: null,
    construct: function (containerID) {
        if (!this.supported()) {
            return
        }
        if (!document.namespaces.nmv) {
            document.namespaces.add("nmv", this.xmlns);
            var style = document.createStyleSheet();
            var shapes = ['shape', 'rect', 'oval', 'fill', 'stroke', 'imagedata', 'group', 'textbox'];
            for (var i = 0, len = shapes.length; i < len; i++) {
                style.addRule('nmv\\:' + shapes[i], "behavior: url(#default#VML); " + "position: absolute; display: inline-block;")
            }
        }
        NElementsRender.prototype.construct.apply(this, arguments);
        this.offset = {
            x: 0,
            y: 0
        }
    },
    dispose: function () {
        NElementsRender.prototype.dispose.apply(this, arguments)
    },
    supported: function () {
        return !!(document.namespaces)
    },
    setExtent: function (extent, resolutionChanged) {
        NElementsRender.prototype.setExtent.apply(this, arguments);
        var resolution = this.getResolution();
        var left = extent.left / resolution;
        var top = extent.top / resolution - this.size.h;
        if (resolutionChanged) {
            this.offset = {
                x: left,
                y: top
            };
            left = 0;
            top = 0
        } else {
            left = left - this.offset.x;
            top = top - this.offset.y
        }
        var org = left + " " + top;
        this.root.coordorigin = org;
        var size = this.size.w + " " + this.size.h;
        this.root.coordsize = size;
        this.root.style.flip = "y";
        return true
    },
    setSize: function (size) {
        NRender.prototype.setSize.apply(this, arguments);
        this.rendererRoot.style.width = this.size.w + "px";
        this.rendererRoot.style.height = this.size.h + "px";
        this.root.style.width = this.size.w + "px";
        this.root.style.height = this.size.h + "px"
    },
    getNodeType: function (geometry, style) {
        var nodeType = null;
        switch (geometry._CLASS_NAME) {
        case "NGeometry.Point":
            if (style.externalGraphic) {
                nodeType = "nmv:rect"
            } else if (this.isComplexSymbol(style.graphicName)) {
                nodeType = "nmv:shape"
            } else {
                nodeType = "nmv:oval"
            }
            break;
        case "NGeometry.Rectangle":
            nodeType = "nmv:rect";
            break;
        case "NGeometry.LineString":
        case "NGeometry.LinearRing":
        case "NGeometry.Polygon":
        case "NGeometry.Curve":
        case "NGeometry.Surface":
            nodeType = "nmv:shape";
            break;
        default:
            break
        }
        return nodeType
    },
    setStyle: function (node, style, options, geometry) {
        style = style || node._style;
        options = options || node._options;
        var widthFactor = 1;
        if (node._geometryClass == "NGeometry.Point") {
            if (style.externalGraphic) {
                var width = style.graphicWidth || style.graphicHeight;
                var height = style.graphicHeight || style.graphicWidth;
                width = width ? width : style.pointRadius * 2;
                height = height ? height : style.pointRadius * 2;
                var resolution = this.getResolution();
                var xOffset = (style.graphicXOffset != undefined) ? style.graphicXOffset : -(0.5 * width);
                var yOffset = (style.graphicYOffset != undefined) ? style.graphicYOffset : -(0.5 * height);
                node.style.left = ((geometry.x / resolution - this.offset.x) + xOffset).toFixed();
                node.style.top = ((geometry.y / resolution - this.offset.y) - (yOffset + height)).toFixed();
                node.style.width = width + "px";
                node.style.height = height + "px";
                node.style.flip = "y";
                style.fillColor = "none";
                options.isStroked = false
            } else if (this.isComplexSymbol(style.graphicName)) {
                var cache = this.importSymbol(style.graphicName);
                var symbolExtent = cache.extent;
                var width = symbolExtent.getWidth();
                var height = symbolExtent.getHeight();
                node.path = cache.path;
                node.coordorigin = symbolExtent.left + "," + symbolExtent.bottom;
                node.coordsize = width + "," + height;
                node.style.left = symbolExtent.left + "px";
                node.style.top = symbolExtent.bottom + "px";
                node.style.width = width + "px";
                node.style.height = height + "px";
                this.drawCircle(node, geometry, style.pointRadius);
                node.style.flip = "y"
            } else {
                this.drawCircle(node, geometry, style.pointRadius)
            }
        }
        if (options.isFilled) {
            node.fillcolor = style.fillColor
        } else {
            node.filled = "false"
        }
        var fills = node.getElementsByTagName("fill");
        var fill = (fills.length == 0) ? null : fills[0];
        if (!options.isFilled) {
            if (fill) {
                node.removeChild(fill)
            }
        } else {
            if (!fill) {
                fill = this.createNode('nmv:fill', node.id + "_fill")
            }
            fill.opacity = style.fillOpacity;
            if (node._geometryClass == "NGeometry.Point" && style.externalGraphic) {
                if (style.graphicOpacity) {
                    fill.opacity = style.graphicOpacity
                }
                fill.src = style.externalGraphic;
                fill.type = "frame";
                if (!(style.graphicWidth && style.graphicHeight)) {
                    fill.aspect = "atmost"
                }
            }
            if (fill.parentNode != node) {
                node.appendChild(fill)
            }
        }
        if (typeof style.rotation != "undefined") {
            if (style.externalGraphic) {
                this.graphicRotate(node, xOffset, yOffset);
                fill.opacity = 0
            } else {
                node.style.rotation = style.rotation
            }
        }
        if (options.isStroked) {
            node.strokecolor = style.strokeColor;
            node.strokeweight = style.strokeWidth + "px"
        } else {
            node.stroked = "false"
        }
        var strokes = node.getElementsByTagName("stroke");
        var stroke = (strokes.length == 0) ? null : strokes[0];
        if (!options.isStroked) {
            if (stroke) {
                node.removeChild(stroke)
            }
        } else {
            if (!stroke) {
                stroke = this.createNode('nmv:stroke', node.id + "_stroke");
                node.appendChild(stroke)
            }
            stroke.opacity = style.strokeOpacity;
            stroke.endcap = !style.strokeLinecap || style.strokeLinecap == 'butt' ? 'flat' : style.strokeLinecap;
            stroke.dashstyle = this.dashStyle(style)
        }
        if (style.cursor != "inherit" && style.cursor != null) {
            node.style.cursor = style.cursor
        }
        return node
    },
    graphicRotate: function (node, xOffset, yOffset) {
        var style = style || node._style;
        var options = node._options;
        var aspectRatio, size;
        if (!(style.graphicWidth && style.graphicHeight)) {
            var img = new Image();
            img.onreadystatechange = NFunction.bind(function () {
                if (img.readyState == "complete" || img.readyState == "interactive") {
                    aspectRatio = img.width / img.height;
                    size = Math.max(style.pointRadius * 2, style.graphicWidth || 0, style.graphicHeight || 0);
                    xOffset = xOffset * aspectRatio;
                    style.graphicWidth = size * aspectRatio;
                    style.graphicHeight = size;
                    this.graphicRotate(node, xOffset, yOffset)
                }
            }, this);
            img.src = style.externalGraphic;
            return
        } else {
            size = Math.max(style.graphicWidth, style.graphicHeight);
            aspectRatio = style.graphicWidth / style.graphicHeight
        }
        var width = Math.round(style.graphicWidth || size * aspectRatio);
        var height = Math.round(style.graphicHeight || size);
        node.style.width = width + "px";
        node.style.height = height + "px";
        var image = document.getElementById(node.id + "_image");
        if (!image) {
            image = this.createNode("nmv:imagedata", node.id + "_image");
            node.appendChild(image)
        }
        image.style.width = width + "px";
        image.style.height = height + "px";
        image.src = style.externalGraphic;
        image.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(" + "src='', sizingMethod='scale')";
        var rotation = style.rotation * Math.PI / 180;
        var sintheta = Math.sin(rotation);
        var costheta = Math.cos(rotation);
        var filter = "progid:DXImageTransform.Microsoft.Matrix(M11=" + costheta + ",M12=" + (-sintheta) + ",M21=" + sintheta + ",M22=" + costheta + ",SizingMethod='auto expand')\n";
        var opacity = style.graphicOpacity || style.fillOpacity;
        if (opacity && opacity != 1) {
            filter += "progid:DXImageTransform.Microsoft.BasicImage(opacity=" + opacity + ")\n"
        }
        node.style.filter = filter;
        var centerPoint = new NGeometry.Point(-xOffset, -yOffset);
        var imgBox = new NBounds(0, 0, width, height).toGeometry();
        imgBox.rotate(style.rotation, centerPoint);
        var imgBounds = imgBox.getBounds();
        node.style.left = Math.round(parseInt(node.style.left) + imgBounds.left) + "px";
        node.style.top = Math.round(parseInt(node.style.top) - imgBounds.bottom) + "px"
    },
    _postRender: function (node) {
        var fillColor = node._style.fillColor;
        var strokeColor = node._style.strokeColor;
        if (fillColor == "none" && node.fillcolor != fillColor) {
            node.fillcolor = fillColor
        }
        if (strokeColor == "none" && node.strokecolor != strokeColor) {
            node.strokecolor = strokeColor
        }
    },
    setNodeDimension: function (node, geometry) {
        var bbox = geometry.getBounds();
        if (bbox) {
            var resolution = this.getResolution();
            var scaledBox = new NBounds((bbox.left / resolution - this.offset.x).toFixed(), (bbox.bottom / resolution - this.offset.y).toFixed(), (bbox.right / resolution - this.offset.x).toFixed(), (bbox.top / resolution - this.offset.y).toFixed());
            node.style.left = scaledBox.left + "px";
            node.style.top = scaledBox.top + "px";
            node.style.width = scaledBox.getWidth() + "px";
            node.style.height = scaledBox.getHeight() + "px";
            node.coordorigin = scaledBox.left + " " + scaledBox.top;
            node.coordsize = scaledBox.getWidth() + " " + scaledBox.getHeight()
        }
    },
    dashStyle: function (style) {
        var dash = style.strokeDashstyle;
        switch (dash) {
        case 'solid':
        case 'dot':
        case 'dash':
        case 'dashdot':
        case 'longdash':
        case 'longdashdot':
            return dash;
        default:
            var parts = dash.split(/[ ,]/);
            if (parts.length == 2) {
                if (1 * parts[0] >= 2 * parts[1]) {
                    return "longdash"
                }
                return (parts[0] == 1 || parts[1] == 1) ? "dot" : "dash"
            } else if (parts.length == 4) {
                return (1 * parts[0] >= 2 * parts[1]) ? "longdashdot" : "dashdot"
            }
            return "solid"
        }
    },
    createNode: function (type, id) {
        var node = document.createElement(type);
        if (id) {
            node.id = id
        }
        node.unselectable = 0;
        node.onselectstart = function () {
            return (false)
        };
        return node
    },
    compareNodeType: function (node, type) {
        var subType = type;
        var splitIndex = subType.indexOf(":");
        if (splitIndex != -1) {
            subType = subType.substr(splitIndex + 1)
        }
        var nodeName = node.nodeName;
        splitIndex = nodeName.indexOf(":");
        if (splitIndex != -1) {
            nodeName = nodeName.substr(splitIndex + 1)
        }
        return (subType == nodeName)
    },
    createRenderRoot: function () {
        return this.nodeCollection(this.container.id + "_vmlRoot", "div")
    },
    createRoot: function () {
        return this.nodeCollection(this.container.id + "_root", "nmv:group")
    },
    drawPoint: function (node, geometry) {
        return this.drawCircle(node, geometry, 1)
    },
    drawCircle: function (node, geometry, radius) {
        if (!isNaN(geometry.x) && !isNaN(geometry.y)) {
            var resolution = this.getResolution();
            node.style.left = ((geometry.x / resolution - this.offset.x).toFixed() - radius) + "px";
            node.style.top = ((geometry.y / resolution - this.offset.y).toFixed() - radius) + "px";
            var diameter = radius * 2;
            node.style.width = diameter + "px";
            node.style.height = diameter + "px";
            return node
        }
        return false
    },
    drawLineString: function (node, geometry) {
        return this.drawLine(node, geometry, false)
    },
    drawLinearRing: function (node, geometry) {
        return this.drawLine(node, geometry, true)
    },
    drawLine: function (node, geometry, closeLine) {
        this.setNodeDimension(node, geometry);
        var resolution = this.getResolution();
        var numComponents = geometry.components.length;
        var parts = new Array(numComponents);
        var comp, x, y;
        for (var i = 0; i < numComponents; i++) {
            comp = geometry.components[i];
            x = (comp.x / resolution - this.offset.x);
            y = (comp.y / resolution - this.offset.y);
            parts[i] = " " + x.toFixed() + "," + y.toFixed() + " l "
        }
        var end = (closeLine) ? " x e" : " e";
        node.path = "m" + parts.join("") + end;
        return node
    },
    drawPolygon: function (node, geometry) {
        this.setNodeDimension(node, geometry);
        var resolution = this.getResolution();
        var path = [];
        var linearRing, i, j, len, ilen, comp, x, y;
        for (j = 0, len = geometry.components.length; j < len; j++) {
            linearRing = geometry.components[j];
            path.push("m");
            for (i = 0, ilen = linearRing.components.length; i < ilen; i++) {
                comp = linearRing.components[i];
                x = comp.x / resolution - this.offset.x;
                y = comp.y / resolution - this.offset.y;
                path.push(" " + x.toFixed() + "," + y.toFixed());
                if (i == 0) {
                    path.push(" l")
                }
            }
            path.push(" x ")
        }
        path.push("e");
        node.path = path.join("");
        return node
    },
    drawRectangle: function (node, geometry) {
        var resolution = this.getResolution();
        node.style.left = (geometry.x / resolution - this.offset.x) + "px";
        node.style.top = (geometry.y / resolution - this.offset.y) + "px";
        node.style.width = geometry.width / resolution + "px";
        node.style.height = geometry.height / resolution + "px";
        return node
    },
    drawSurface: function (node, geometry) {
        this.setNodeDimension(node, geometry);
        var resolution = this.getResolution();
        var path = [];
        var comp, x, y;
        for (var i = 0, len = geometry.components.length; i < len; i++) {
            comp = geometry.components[i];
            x = comp.x / resolution - this.offset.x;
            y = comp.y / resolution - this.offset.y;
            if ((i % 3) == 0 && (i / 3) == 0) {
                path.push("m")
            } else if ((i % 3) == 1) {
                path.push(" c")
            }
            path.push(" " + x + "," + y)
        }
        path.push(" x e");
        node.path = path.join("");
        return node
    },
    importSymbol: function (graphicName) {
        var id = this.container.id + "-" + graphicName;
        var cache = this.symbolCache[id];
        if (cache) {
            return cache
        }
        var symbol = NSymbolRender[graphicName];
        if (!symbol) {
            throw new Error(graphicName + ' is not a valid symbol name');
            return
        }
        var symbolExtent = new NBounds(Number.MAX_VALUE, Number.MAX_VALUE, 0, 0);
        var pathitems = ["m"];
        for (var i = 0; i < symbol.length; i = i + 2) {
            x = symbol[i];
            y = symbol[i + 1];
            symbolExtent.left = Math.min(symbolExtent.left, x);
            symbolExtent.bottom = Math.min(symbolExtent.bottom, y);
            symbolExtent.right = Math.max(symbolExtent.right, x);
            symbolExtent.top = Math.max(symbolExtent.top, y);
            pathitems.push(x);
            pathitems.push(y);
            if (i == 0) {
                pathitems.push("l")
            }
        }
        pathitems.push("x e");
        var path = pathitems.join(" ");
        cache = {
            path: path,
            extent: symbolExtent
        };
        this.symbolCache[id] = cache;
        return cache
    },
    _CLASS_NAME: "NVMLRender"
});
NVectorLayer = NObject(NLayer, {
    _EVENT_TYPES: ["prefeatureadded", "prefeaturesadded", "featureadded", "featuresadded", "prefeatureremoved", "featureremoved", "featuresremoved", "prefeatureselected", "featureselected", "featureunselected", "prefeatureedited", "featureedited", "afterfeatureedited", "refresh"],
    isBasicLayer: false,
    isFixed: false,
    isVector: true,
    features: null,
    selectedFeatures: null,
    unrenderedFeatures: null,
    reportError: true,
    style: null,
    symbols: null,
    strategies: null,
    protocol: null,
    renderers: ['NSVGRender', 'NVMLRender', 'NCanvasRender'],
    renderer: null,
    rendererOptions: null,
    geometryType: null,
    drawn: false,
    construct: function (name, options) {
        this._EVENT_TYPES = NVectorLayer.prototype._EVENT_TYPES.concat(NLayer.prototype._EVENT_TYPES);
        NLayer.prototype.construct.apply(this, arguments);
        this.type = "NVectorLayer";
        if (!this.renderer || !this.renderer.supported()) {
            this.assignRenderer()
        }
        if (!this.renderer || !this.renderer.supported()) {
            this.renderer = null;
            this.displayError()
        }
        if (!this.symbols) {
            this.symbols = new NSymbols()
        }
        this.features = [];
        this.selectedFeatures = [];
        this.unrenderedFeatures = {};
        if (this.strategies) {
            for (var i = 0, len = this.strategies.length; i < len; i++) {
                this.strategies[i].setLayer(this)
            }
        }
    },
    dispose: function () {
        if (this.strategies) {
            var strategy, i, len;
            for (i = 0, len = this.strategies.length; i < len; i++) {
                strategy = this.strategies[i];
                if (strategy.autoDestroy) {
                    strategy.dispose()
                }
            }
            this.strategies = null
        }
        if (this.protocol) {
            if (this.protocol.autoDestroy) {
                this.protocol.dispose()
            }
            this.protocol = null
        }
        this.disposeFeatures();
        this.features = null;
        this.selectedFeatures = null;
        this.unrenderedFeatures = null;
        if (this.renderer) {
            this.renderer.dispose()
        }
        this.renderer = null;
        this.geometryType = null;
        this.drawn = null;
        NLayer.prototype.dispose.apply(this, arguments)
    },
    refresh: function (obj) {
        if (this.inRange && this.visible) {
            this.events.triggerEvent("refresh", obj)
        }
    },
    assignRenderer: function () {
        for (var i = 0, len = this.renderers.length; i < this.renderers.length; i++) {
            var rendererClass = NVMLRender;
            if (this.renderers[i] == 'NSVGRender') rendererClass = NSVGRender;
            else if (this.renderers[i] == 'NVMLRender') rendererClass = NVMLRender;
            else if (this.renderers[i] == 'NCanvasRender') rendererClass = NCanvasRender;
            if (rendererClass && rendererClass.prototype.supported()) {
                this.renderer = new rendererClass(this.div, this.rendererOptions);
                break
            }
        }
    },
    displayError: function () {
        if (this.reportError) {
            NLog.userError(NMGISLG("browserNotSupported", {
                'renderers': this.renderers.join("\n")
            }))
        }
    },
    setMap: function (map) {
        NLayer.prototype.setMap.apply(this, arguments);
        if (!this.renderer) {
            this.map.removeLayer(this)
        } else {
            this.renderer.map = this.map;
            this.renderer.setSize(this.map.getSize())
        }
        if (this.strategies) {
            var strategy, i, len;
            for (i = 0, len = this.strategies.length; i < len; i++) {
                strategy = this.strategies[i];
                if (strategy.autoActivate) {
                    strategy.enable()
                }
            }
        }
    },
    removeMap: function (map) {
        if (this.strategies) {
            var strategy, i, len;
            for (i = 0, len = this.strategies.length; i < len; i++) {
                strategy = this.strategies[i];
                if (strategy.autoActivate) {
                    strategy.disable()
                }
            }
        }
    },
    onMapResize: function () {
        NLayer.prototype.onMapResize.apply(this, arguments);
        this.renderer.setSize(this.map.getSize())
    },
    moveTo: function (bounds, zoomChanged, dragging) {
        NLayer.prototype.moveTo.apply(this, arguments);
        var coordSysUnchanged = true;
        if (!dragging) {
            this.renderer.root.style.visible = "hidden";
            this.div.style.left = -parseInt(this.map._layerContainerDiv.style.left) + "px";
            this.div.style.top = -parseInt(this.map._layerContainerDiv.style.top) + "px";
            var extent = this.map.getExtent();
            coordSysUnchanged = this.renderer.setExtent(extent, zoomChanged);
            this.renderer.root.style.visible = "visible";
            if (navigator.userAgent.toLowerCase().indexOf("gecko") != -1) {
                this.div.scrollLeft = this.div.scrollLeft
            }
            if (!zoomChanged && coordSysUnchanged) {
                for (var i in this.unrenderedFeatures) {
                    var feature = this.unrenderedFeatures[i];
                    this.drawFeature(feature)
                }
            }
        }
        if (!this.drawn || zoomChanged || !coordSysUnchanged) {
            this.drawn = true;
            var feature;
            for (var i = 0, len = this.features.length; i < len; i++) {
                if (i != (this.features.length - 1)) {
                    this.renderer.locked = true
                } else {
                    this.renderer.locked = false
                }
                feature = this.features[i];
                this.drawFeature(feature)
            }
        }
    },
    addFeatures: function (features, options) {
        if (!(features instanceof Array)) {
            features = [features]
        }
        var notify = !options || !options.silent;
        if (notify) {
            var event = {
                features: features
            };
            var ret = this.events.triggerEvent("prefeaturesadded", event);
            if (ret === false) {
                return
            }
            features = event.features
        }
        for (var i = 0, len = features.length; i < len; i++) {
            if (i != (features.length - 1)) {
                this.renderer.locked = true
            } else {
                this.renderer.locked = false
            }
            var feature = features[i];
            if (this.geometryType && !(feature.geometry instanceof this.geometryType)) {
                var throwStr = NMGISLG('componentShouldBe', {
                    'geomType': this.geometryType.prototype._CLASS_NAME
                });
                throw throwStr
            }
            this.features.push(feature);
            feature.layer = this;
            if (!feature.symbol && this.style) {
                feature.symbol = NUtility.extend({}, this.style)
            }
            if (notify) {
                if (this.events.triggerEvent("prefeatureadded", {
                    feature: feature
                }) === false) {
                    continue
                };
                this.preFeatureInsert(feature)
            }
            if (this.drawn) {
                this.drawFeature(feature)
            }
            if (notify) {
                this.events.triggerEvent("featureadded", {
                    feature: feature
                });
                this.onFeatureInsert(feature)
            }
        }
        if (notify) {
            this.events.triggerEvent("featuresadded", {
                features: features
            })
        }
    },
    removeFeatures: function (features, options) {
        if (!features || features.length === 0) {
            return
        }
        if (!(features instanceof Array)) {
            features = [features]
        }
        var notify = !options || !options.silent;
        for (var i = features.length - 1; i >= 0; i--) {
            if (i != 0 && features[i - 1].geometry) {
                this.renderer.locked = true
            } else {
                this.renderer.locked = false
            }
            var feature = features[i];
            delete this.unrenderedFeatures[feature.id];
            if (notify) {
                this.events.triggerEvent("prefeatureremoved", {
                    feature: feature
                })
            }
            this.features = NUtility.removeItem(this.features, feature);
            feature.layer = null;
            if (feature.geometry) {
                this.renderer.deleteGeometry(feature.geometry)
            }
            if (NUtility.indexOf(this.selectedFeatures, feature) != -1) {
                NUtility.removeItem(this.selectedFeatures, feature)
            }
            if (notify) {
                this.events.triggerEvent("featureremoved", {
                    feature: feature
                })
            }
        }
        if (notify) {
            this.events.triggerEvent("featuresremoved", {
                features: features
            })
        }
    },
    disposeFeatures: function (features, options) {
        var all = (features == undefined);
        if (all) {
            features = this.features
        }
        if (features) {
            this.removeFeatures(features, options);
            for (var i = features.length - 1; i >= 0; i--) {
                features[i].dispose()
            }
        }
    },
    drawFeature: function (feature, symbol) {
        if (typeof symbol != "object") {
            var renderSymbol = typeof symbol == "string" ? symbol : feature.renderSymbol;
            symbol = feature.symbol || this.symbol;
            if (!symbol || renderSymbol == "select") {
                symbol = this.symbols.createSymbolizer(feature, renderSymbol)
            }
        }
        if (!this.renderer.drawFeature(feature, symbol)) {
            this.unrenderedFeatures[feature.id] = feature
        } else {
            delete this.unrenderedFeatures[feature.id]
        }
    },
    deleteFeatures: function (features) {
        this.renderer.deleteFeatures(features)
    },
    _getFeatureFromEvent: function (evt) {
        if (!this.renderer) {
            NLog.error(NMGISLG("getFeatureError"));
            return null
        }
        var featureId = this.renderer.getFeatureIdByEvent(evt);
        return this.getFeatureById(featureId)
    },
    getFeatureById: function (featureId) {
        var feature = null;
        for (var i = 0, len = this.features.length; i < len; ++i) {
            if (this.features[i].id == featureId) {
                feature = this.features[i];
                break
            }
        }
        return feature
    },
    onFeatureInsert: function (feature) {},
    preFeatureInsert: function (feature) {},
    getLayerExtent: function () {
        var maxExtent = null;
        if (this.features && (this.features.length > 0)) {
            var maxExtent = this.features[0].geometry.getBounds();
            for (var i = 0, len = this.features.length; i < len; i++) {
                maxExtent.extend(this.features[i].geometry.getBounds())
            }
        }
        return maxExtent
    },
    _CLASS_NAME: "NVectorLayer"
});
NStrategy = NObject({
    layer: null,
    options: null,
    _enable: null,
    autoActivate: true,
    autoDestroy: true,
    construct: function (options) {
        NUtility.extend(this, options);
        this.options = options;
        this._enable = false
    },
    dispose: function () {
        this.disable();
        this.layer = null;
        this.options = null
    },
    setLayer: function (layer) {
        this.layer = layer
    },
    enable: function () {
        if (!this._enable) {
            this._enable = true;
            return true
        }
        return false
    },
    disable: function () {
        if (this._enable) {
            this._enable = false;
            return true
        }
        return false
    },
    _CLASS_NAME: "NStrategy"
});
NStrategy.Fixed = NObject(NStrategy, {
    construct: function (options) {
        NStrategy.prototype.construct.apply(this, [options])
    },
    dispose: function () {
        NStrategy.prototype.dispose.apply(this, arguments)
    },
    enable: function () {
        if (NStrategy.prototype.enable.apply(this, arguments)) {
            this.layer.protocol.read({
                callback: this.merge,
                scope: this
            });
            return true
        }
        return false
    },
    merge: function (resp) {
        var features = resp.features;
        if (features && features.length > 0) {
            this.layer.addFeatures(features)
        }
    },
    _CLASS_NAME: "NStrategy.Fixed"
});
NStrategy.Cluster = NObject(NStrategy, {
    layer: null,
    distance: 20,
    features: null,
    clusters: null,
    clustering: false,
    resolution: null,
    construct: function (options) {
        NStrategy.prototype.construct.apply(this, [options])
    },
    enable: function () {
        var enabled = NStrategy.prototype.enable.call(this);
        if (enabled) {
            this.layer.events.addListener({
                "prefeaturesadded": this.cacheFeatures,
                scope: this
            });
            this.layer.map.events.addListener({
                "zoomend": this.cluster,
                scope: this
            })
        }
        return enabled
    },
    disable: function () {
        var disabled = NStrategy.prototype.disable.call(this);
        if (disabled) {
            this.clearCache();
            this.layer.events.removeListener({
                "prefeaturesadded": this.cacheFeatures,
                scope: this
            });
            this.layer.map.events.removeListener({
                "zoomend": this.cluster,
                scope: this
            })
        }
        return disabled
    },
    cacheFeatures: function (event) {
        var propagate = true;
        if (!this.clustering) {
            this.clearCache();
            this.features = event.features;
            this.cluster();
            propagate = false
        }
        return propagate
    },
    clearCache: function () {
        if (this.features) {
            for (var i = 0; i < this.features.length; ++i) {
                this.features[i].dispose()
            }
        }
        this.features = null
    },
    cluster: function () {
        if (this.features) {
            var resolution = this.layer.getResolution();
            if (resolution != this.resolution || !this.clustersExist()) {
                this.resolution = resolution;
                var clusters = [];
                var feature, clustered, cluster;
                for (var i = 0; i < this.features.length; ++i) {
                    feature = this.features[i];
                    clustered = false;
                    for (var j = 0; j < clusters.length; ++j) {
                        cluster = clusters[j];
                        if (this.shouldCluster(cluster, feature)) {
                            this.addToCluster(cluster, feature);
                            clustered = true;
                            break
                        }
                    }
                    if (!clustered) {
                        clusters.push(this.createCluster(this.features[i]))
                    }
                }
                this.layer.disposeFeatures();
                if (clusters.length > 0) {
                    this.clustering = true;
                    this.layer.addFeatures(clusters);
                    this.clustering = false
                }
                this.clusters = clusters
            }
        }
    },
    clustersExist: function () {
        var exist = false;
        if (this.clusters && this.clusters.length > 0 && this.clusters.length == this.layer.features.length) {
            exist = true;
            for (var i = 0; i < this.clusters.length; ++i) {
                if (this.clusters[i] != this.layer.features[i]) {
                    exist = false;
                    break
                }
            }
        }
        return exist
    },
    shouldCluster: function (cluster, feature) {
        var cc = cluster.geometry.getBounds().getCenterInLatLng();
        var fc = feature.geometry.getBounds().getCenterInLatLng();
        var distance = (Math.sqrt(Math.pow((cc.lon - fc.lon), 2) + Math.pow((cc.lat - fc.lat), 2)) / this.resolution);
        return (distance <= this.distance)
    },
    addToCluster: function (cluster, feature) {
        cluster.cluster.push(feature);
        cluster.attributes.count += 1
    },
    createCluster: function (feature) {
        var center = feature.geometry.getBounds().getCenterInLatLng();
        var cluster = new NVectorFeature(new NGeometry.Point(center.lon, center.lat), {
            count: 1
        });
        cluster.cluster = [feature];
        return cluster
    },
    _CLASS_NAME: "NStrategy.Cluster"
});
NStrategy.Paging = NObject(NStrategy, {
    layer: null,
    features: null,
    length: 10,
    num: null,
    paging: false,
    construct: function (options) {
        NStrategy.prototype.construct.apply(this, [options])
    },
    enable: function () {
        var enabled = NStrategy.prototype.enable.call(this);
        if (enabled) {
            this.layer.events.addListener({
                "prefeaturesadded": this.cacheFeatures,
                scope: this
            })
        }
        return enabled
    },
    disable: function () {
        var disabled = NStrategy.prototype.disable.call(this);
        if (disabled) {
            this.clearCache();
            this.layer.events.removeListener({
                "prefeaturesadded": this.cacheFeatures,
                scope: this
            })
        }
        return disabled
    },
    cacheFeatures: function (event) {
        if (!this.paging) {
            this.clearCache();
            this.features = event.features;
            this.nextPage(event)
        }
    },
    clearCache: function () {
        if (this.features) {
            for (var i = 0; i < this.features.length; ++i) {
                this.features[i].dispose()
            }
        }
        this.features = null;
        this.num = null
    },
    pageCount: function () {
        var numFeatures = this.features ? this.features.length : 0;
        return Math.ceil(numFeatures / this.length)
    },
    zeroBasedPageCount: function () {
        return this.num
    },
    pageLength: function (newLength) {
        if (newLength && newLength > 0) {
            this.length = newLength
        }
        return this.length
    },
    nextPage: function (event) {
        var changed = false;
        if (this.features) {
            if (this.num === null) {
                this.num = -1
            }
            var start = (this.num + 1) * this.length;
            changed = this.page(start, event)
        }
        return changed
    },
    prePage: function () {
        var changed = false;
        if (this.features) {
            if (this.num === null) {
                this.num = this.pageCount()
            }
            var start = (this.num - 1) * this.length;
            changed = this.page(start)
        }
        return changed
    },
    page: function (start, event) {
        var changed = false;
        if (this.features) {
            if (start >= 0 && start < this.features.length) {
                var num = Math.floor(start / this.length);
                if (num != this.num) {
                    this.paging = true;
                    var features = this.features.slice(start, start + this.length);
                    this.layer.removeFeatures(this.layer.features);
                    this.num = num;
                    if (event && event.features) {
                        event.features = features
                    } else {
                        this.layer.addFeatures(features)
                    }
                    this.paging = false;
                    changed = true
                }
            }
        }
        return changed
    },
    _CLASS_NAME: "NStrategy.Paging"
});
NStrategy.BBOX = NObject(NStrategy, {
    bounds: null,
    ratio: 2,
    response: null,
    construct: function (options) {
        NStrategy.prototype.construct.apply(this, [options])
    },
    enable: function () {
        var enabled = NStrategy.prototype.enable.call(this);
        if (enabled) {
            this.layer.events.addListener({
                "moveend": this.update,
                scope: this
            });
            this.layer.events.addListener({
                "refresh": this.update,
                scope: this
            })
        }
        return enabled
    },
    disable: function () {
        var disabled = NStrategy.prototype.disable.call(this);
        if (disabled) {
            this.layer.events.removeListener({
                "moveend": this.update,
                scope: this
            });
            this.layer.events.removeListener({
                "refresh": this.update,
                scope: this
            })
        }
        return disabled
    },
    update: function (options) {
        var mapBounds = this.layer.map.getExtent();
        if ((options && options.force) || this.invalidBounds(mapBounds)) {
            this.getBounds(mapBounds);
            this.triggerRead()
        }
    },
    invalidBounds: function (mapBounds) {
        if (!mapBounds) {
            mapBounds = this.layer.map.getExtent()
        }
        return !this.bounds || !this.bounds.containsBounds(mapBounds)
    },
    getBounds: function (mapBounds) {
        if (!mapBounds) {
            mapBounds = this.layer.map.getExtent()
        }
        var center = mapBounds.getCenterInLatLng();
        var dataWidth = mapBounds.getWidth() * this.ratio;
        var dataHeight = mapBounds.getHeight() * this.ratio;
        this.bounds = new NBounds(center.lon - (dataWidth / 2), center.lat - (dataHeight / 2), center.lon + (dataWidth / 2), center.lat + (dataHeight / 2))
    },
    triggerRead: function () {
        var filter = this.createFilter();
        if (this.response && this.response.priv && typeof this.response.priv.abort == "function") {
            this.response.priv.abort()
        }
        this.response = this.layer.protocol.read({
            filter: filter,
            callback: this.merge,
            scope: this
        })
    },
    createFilter: function () {
        var filter = new NFilter.Spatial({
            type: NFilter.Spatial.BBOX,
            value: this.bounds,
            projection: this.layer.projection
        });
        if (this.layer.filter) {
            filter = new NFilter.Logical({
                type: NFilter.Logical.AND,
                filters: [this.layer.filter, filter]
            })
        }
        return filter
    },
    merge: function (resp) {
        this.layer.disposeFeatures();
        var features = resp.features;
        if (features && features.length > 0) {
            this.layer.addFeatures(features)
        }
    },
    _CLASS_NAME: "NStrategy.BBOX"
});
NProtocol = NObject({
    format: null,
    options: null,
    autoDestroy: true,
    construct: function (options) {
        options = options || {};
        NUtility.extend(this, options);
        this.options = options
    },
    dispose: function () {
        this.options = null;
        this.format = null
    },
    read: function () {},
    create: function () {},
    update: function () {},
    "delete": function () {},
    commit: function () {},
    _CLASS_NAME: "NProtocol"
});
NProtocol.Response = NObject({
    code: null,
    requestType: null,
    last: true,
    features: null,
    reqFeatures: null,
    priv: null,
    construct: function (options) {
        NUtility.extend(this, options)
    },
    success: function () {
        return this.code > 0
    },
    _CLASS_NAME: "NProtocol.Response"
});
NProtocol.Response.SUCCESS = 1;
NProtocol.Response.FAILURE = 0;
NProtocol.HTTP = NObject(NProtocol, {
    url: null,
    headers: null,
    params: null,
    callback: null,
    scope: null,
    construct: function (options) {
        this.params = {};
        this.headers = {};
        NProtocol.prototype.construct.apply(this, arguments)
    },
    dispose: function () {
        this.params = null;
        this.headers = null;
        NProtocol.prototype.dispose.apply(this)
    },
    createCallback: function (method, response, options) {
        return NFunction.bind(function () {
            method.apply(this, [response, options])
        }, this)
    },
    read: function (options) {
        options = NUtility.applyDefaults(options, this.options);
        var resp = new NProtocol.Response({
            requestType: "read"
        });
        if (options.filter && options.filter instanceof NFilter.Spatial) {
            if (options.filter.type == NFilter.Spatial.BBOX) {
                options.params = NUtility.extend(options.params, {
                    bbox: options.filter.value.toArray()
                })
            }
        }
        resp.priv = NRequest.GET({
            url: options.url,
            callback: this.createCallback(this.handleRead, resp, options),
            params: options.params,
            headers: options.headers
        });
        return resp
    },
    handleRead: function (resp, options) {
        this.handleResponse(resp, options)
    },
    create: function (features, options) {
        options = NUtility.applyDefaults(options, this.options);
        var resp = new NProtocol.Response({
            reqFeatures: features,
            requestType: "create"
        });
        resp.priv = NRequest.POST({
            url: options.url,
            callback: this.createCallback(this.handleCreate, resp, options),
            headers: options.headers,
            data: this.format.write(features)
        });
        return resp
    },
    handleCreate: function (resp, options) {
        this.handleResponse(resp, options)
    },
    update: function (feature, options) {
        var url = options.url || feature.url || this.options.url;
        options = NUtility.applyDefaults(options, this.options);
        var resp = new NProtocol.Response({
            reqFeatures: feature,
            requestType: "update"
        });
        resp.priv = NRequest.PUT({
            url: url,
            callback: this.createCallback(this.handleUpdate, resp, options),
            headers: options.headers,
            data: this.format.write(feature)
        });
        return resp
    },
    handleUpdate: function (resp, options) {
        this.handleResponse(resp, options)
    },
    "delete": function (feature, options) {
        var url = options.url || feature.url || this.options.url;
        options = NUtility.applyDefaults(options, this.options);
        var resp = new NProtocol.Response({
            reqFeatures: feature,
            requestType: "delete"
        });
        resp.priv = NRequest.DELETE({
            url: url,
            callback: this.createCallback(this.handleDelete, resp, options),
            headers: options.headers
        });
        return resp
    },
    handleDelete: function (resp, options) {
        this.handleResponse(resp, options)
    },
    handleResponse: function (resp, options) {
        var request = resp.priv;
        if (options.callback) {
            if (request.status >= 200 && request.status < 300) {
                if (resp.requestType != "delete") {
                    resp.features = this.parseFeatures(request)
                }
                resp.code = NProtocol.Response.SUCCESS
            } else {
                resp.code = NProtocol.Response.FAILURE
            }
            options.callback.call(options.scope, resp)
        }
    },
    parseFeatures: function (request) {
        var doc = request.responseXML;
        if (!doc || !doc.documentElement) {
            doc = request.responseText
        }
        if (!doc || doc.length <= 0) {
            return null
        }
        return this.format.read(doc)
    },
    commit: function (features, options) {
        options = NUtility.applyDefaults(options, this.options);
        var resp = [],
            nResponses = 0;
        var types = {};
        types[NEditState.INSERT] = [];
        types[NEditState.UPDATE] = [];
        types[NEditState.DELETE] = [];
        var feature, list;
        for (var i = 0, len = features.length; i < len; ++i) {
            feature = features[i];
            list = types[feature.state];
            if (list) {
                list.push(feature)
            }
        }
        var nRequests = (types[NEditState.INSERT].length > 0 ? 1 : 0) + types[NEditState.UPDATE].length + types[NEditState.DELETE].length;

        function callback(response) {
            nResponses++;
            response.last = (nResponses >= nRequests);
            this.callUserCallback(response, options)
        }
        var queue = types[NEditState.INSERT];
        if (queue.length > 0) {
            resp.push(this.create(queue, NUtility.applyDefaults({
                callback: callback,
                scope: this
            }, options.create || {})))
        }
        queue = types[NEditState.UPDATE];
        for (var i = queue.length - 1; i >= 0; --i) {
            resp.push(this.update(queue[i], NUtility.applyDefaults({
                callback: callback,
                scope: this
            }, options.update || {})))
        }
        queue = types[NEditState.DELETE];
        for (var i = queue.length - 1; i >= 0; --i) {
            resp.push(this["delete"](queue[i], NUtility.applyDefaults({
                callback: callback,
                scope: this
            }, options["delete"] || {})))
        }
        return resp
    },
    callUserCallback: function (resp, options) {
        var opt = options[resp.requestType];
        if (opt && opt.callback) {
            opt.callback.call(opt.scope, resp)
        }
        if (resp.last && options.callback) {
            options.callback.call(options.scope)
        }
    },
    _CLASS_NAME: "NProtocol.HTTP"
});
NProtocol.SQL = NObject(NProtocol, {
    databaseName: 'nm',
    tableName: "ol_vector_features",
    filterReadedDBFeature: true,
    construct: function (options) {
        NProtocol.prototype.construct.apply(this, [options])
    },
    dispose: function () {
        NProtocol.prototype.dispose.apply(this)
    },
    supported: function () {
        return false
    },
    evaluateFilter: function (feature, filter) {
        return filter && this.filterReadedDBFeature ? filter.evaluate(feature) : true
    },
    _CLASS_NAME: "NProtocol.SQL"
});
NProtocol.SQL.Gears = NObject(NProtocol.SQL, {
    FID_PREFIX: '__gears_fid__',
    NULL_GEOMETRY: '__gears_null_geometry__',
    NULL_FEATURE_STATE: '__gears_null_feature_state__',
    jsonParser: null,
    wktParser: null,
    fidRegExp: null,
    saveFeatureState: true,
    typeOfFid: "string",
    db: null,
    construct: function (options) {
        if (!this.supported()) {
            return
        }
        NProtocol.SQL.prototype.construct.apply(this, [options]);
        this.jsonParser = new NParser.JSON();
        this.wktParser = new NParser.WKT();
        this.fidRegExp = new RegExp('^' + this.FID_PREFIX);
        this.constructDatabase()
    },
    constructDatabase: function () {
        this.db = google.gears.factory.create('beta.database');
        this.db.open(this.databaseName);
        this.db.execute("CREATE TABLE IF NOT EXISTS " + this.tableName + " (fid TEXT UNIQUE, geometry TEXT, properties TEXT," + "  state TEXT)")
    },
    dispose: function () {
        this.db.close();
        this.db = null;
        this.jsonParser = null;
        this.wktParser = null;
        NProtocol.SQL.prototype.dispose.apply(this)
    },
    supported: function () {
        return !!(window.google && google.gears)
    },
    read: function (options) {
        options = NUtility.applyDefaults(options, this.options);
        var feature, features = [];
        var rs = this.db.execute("SELECT * FROM " + this.tableName);
        while (rs.isValidRow()) {
            feature = this.unfreezeFeature(rs);
            if (this.evaluateFilter(feature, options.filter)) {
                if (!options.noFeatureStateReset) {
                    feature.state = null
                }
                features.push(feature)
            }
            rs.next()
        }
        rs.close();
        var resp = new NProtocol.Response({
            code: NProtocol.Response.SUCCESS,
            requestType: "read",
            features: features
        });
        if (options && options.callback) {
            options.callback.call(options.scope, resp)
        }
        return resp
    },
    unfreezeFeature: function (row) {
        var feature;
        var wkt = row.fieldByName('geometry');
        if (wkt == this.NULL_GEOMETRY) {
            feature = new NVectorFeature()
        } else {
            feature = this.wktParser.read(wkt)
        }
        feature.attributes = this.jsonParser.read(row.fieldByName('properties'));
        feature.fid = this.extractFidFromField(row.fieldByName('fid'));
        var state = row.fieldByName('state');
        if (state == this.NULL_FEATURE_STATE) {
            state = null
        }
        feature.state = state;
        return feature
    },
    extractFidFromField: function (field) {
        if (!field.match(this.fidRegExp) && this.typeOfFid == "number") {
            field = parseFloat(field)
        }
        return field
    },
    create: function (features, options) {
        options = NUtility.applyDefaults(options, this.options);
        var resp = this.createOrUpdate(features);
        resp.requestType = "create";
        if (options && options.callback) {
            options.callback.call(options.scope, resp)
        }
        return resp
    },
    update: function (features, options) {
        options = NUtility.applyDefaults(options, this.options);
        var resp = this.createOrUpdate(features);
        resp.requestType = "update";
        if (options && options.callback) {
            options.callback.call(options.scope, resp)
        }
        return resp
    },
    createOrUpdate: function (features) {
        if (!(features instanceof Array)) {
            features = [features]
        }
        var i, len = features.length,
            feature;
        var insertedFeatures = new Array(len);
        for (i = 0; i < len; i++) {
            feature = features[i];
            var params = this.freezeFeature(feature);
            this.db.execute("REPLACE INTO " + this.tableName + " (fid, geometry, properties, state)" + " VALUES (?, ?, ?, ?)", params);
            var clone = feature.clone();
            clone.fid = this.extractFidFromField(params[0]);
            insertedFeatures[i] = clone
        }
        return new NProtocol.Response({
            code: NProtocol.Response.SUCCESS,
            features: insertedFeatures,
            reqFeatures: features
        })
    },
    freezeFeature: function (feature) {
        feature.fid = feature.fid != null ? "" + feature.fid : NUtility.createUniqueID(this.FID_PREFIX);
        var geometry = feature.geometry != null ? feature.geometry.toString() : this.NULL_GEOMETRY;
        var properties = this.jsonParser.write(feature.attributes);
        var state = this.getFeatureStateForFreeze(feature);
        return [feature.fid, geometry, properties, state]
    },
    getFeatureStateForFreeze: function (feature) {
        var state;
        if (!this.saveFeatureState) {
            state = this.NULL_FEATURE_STATE
        } else if (this.createdOffline(feature)) {
            state = NEditState.INSERT
        } else {
            state = feature.state
        }
        return state
    },
    "delete": function (features, options) {
        if (!(features instanceof Array)) {
            features = [features]
        }
        options = NUtility.applyDefaults(options, this.options);
        var i, len, feature;
        for (i = 0, len = features.length; i < len; i++) {
            feature = features[i];
            if (this.saveFeatureState && !this.createdOffline(feature)) {
                var toDelete = feature.clone();
                toDelete.fid = feature.fid;
                if (toDelete.geometry) {
                    toDelete.geometry.dispose();
                    toDelete.geometry = null
                }
                toDelete.state = feature.state;
                this.createOrUpdate(toDelete)
            } else {
                this.db.execute("DELETE FROM " + this.tableName + " WHERE fid = ?", [feature.fid])
            }
        }
        var resp = new NProtocol.Response({
            code: NProtocol.Response.SUCCESS,
            requestType: "delete",
            reqFeatures: features
        });
        if (options && options.callback) {
            options.callback.call(options.scope, resp)
        }
        return resp
    },
    createdOffline: function (feature) {
        return (typeof feature.fid == "string" && !! (feature.fid.match(this.fidRegExp)))
    },
    commit: function (features, options) {
        var opt, resp = [],
            nRequests = 0,
            nResponses = 0;

        function callback(resp) {
            if (++nResponses < nRequests) {
                resp.last = false
            }
            this.callUserCallback(options, resp)
        }
        var feature, toCreate = [],
            toUpdate = [],
            toDelete = [];
        for (var i = features.length - 1; i >= 0; i--) {
            feature = features[i];
            switch (feature.state) {
            case NEditState.INSERT:
                toCreate.push(feature);
                break;
            case NEditState.UPDATE:
                toUpdate.push(feature);
                break;
            case NEditState.DELETE:
                toDelete.push(feature);
                break
            }
        }
        if (toCreate.length > 0) {
            nRequests++;
            opt = NUtility.applyDefaults({
                "callback": callback,
                "scope": this
            }, options.create);
            resp.push(this.create(toCreate, opt))
        }
        if (toUpdate.length > 0) {
            nRequests++;
            opt = NUtility.applyDefaults({
                "callback": callback,
                "scope": this
            }, options.update);
            resp.push(this.update(toUpdate, opt))
        }
        if (toDelete.length > 0) {
            nRequests++;
            opt = NUtility.applyDefaults({
                "callback": callback,
                "scope": this
            }, options["delete"]);
            resp.push(this["delete"](toDelete, opt))
        }
        return resp
    },
    clear: function () {
        this.db.execute("DELETE FROM " + this.tableName)
    },
    callUserCallback: function (options, resp) {
        var opt = options[resp.requestType];
        if (opt && opt.callback) {
            opt.callback.call(opt.scope, resp)
        }
        if (resp.last && options.callback) {
            options.callback.call(options.scope)
        }
    },
    _CLASS_NAME: "NProtocol.SQL.Gears"
});
NPointTrackLayer = NObject(NVectorLayer, {
    type: 'NPointTrackLayer',
    dataFrom: null,
    construct: function (name, options) {
        NVectorLayer.prototype.construct.apply(this, arguments)
    },
    addNodes: function (pointFeatures) {
        if (pointFeatures.length < 2) {
            NLog.error("At least two point features have to be added to create" + "a line from");
            return
        }
        var lines = new Array(pointFeatures.length - 1);
        var pointFeature, startPoint, endPoint;
        for (var i = 0, len = pointFeatures.length; i < len; i++) {
            pointFeature = pointFeatures[i];
            endPoint = pointFeature.geometry;
            if (!endPoint) {
                var latlng = pointFeature.latlng;
                endPoint = new NGeometry.Point(latlng.lon, latlng.lat)
            } else if (endPoint._CLASS_NAME != "NGeometry.Point") {
                NLog.error("Only features with point geometries are supported.");
                return
            }
            if (i > 0) {
                var attributes = (this.dataFrom != null) ? (pointFeatures[i + this.dataFrom].data || pointFeatures[i + this.dataFrom].attributes) : null;
                var line = new NGeometry.LineString([startPoint, endPoint]);
                lines[i - 1] = new NVectorFeature(line, attributes)
            }
            startPoint = endPoint
        }
        this.addFeatures(lines)
    },
    _CLASS_NAME: "NPointTrackLayer"
});
NPointTrackLayer.dataFrom = {
    'SOURCE_NODE': -1,
    'TARGET_NODE': 0
};
NGMLLayer = NObject(NVectorLayer, {
    type: 'NGMLLayer',
    loaded: false,
    format: null,
    formatOptions: null,
    construct: function (name, url, options) {
        var newArguments = [];
        newArguments.push(name, options);
        NVectorLayer.prototype.construct.apply(this, newArguments);
        this.url = url
    },
    setVisible: function (visible, noEvent) {
        NVectorLayer.prototype.setVisible.apply(this, arguments);
        if (this.visible && !this.loaded) {
            this.load()
        }
    },
    moveTo: function (bounds, zoomChanged, minor) {
        NVectorLayer.prototype.moveTo.apply(this, arguments);
        if (this.visible && !this.loaded) {
            this.events.triggerEvent("loadstart");
            this.load()
        }
    },
    load: function () {
        if (!this.loaded) {
            NRequest.GET({
                url: this.url,
                success: this._requestSuccess,
                failure: this.requestFailure,
                scope: this
            });
            this.loaded = true
        }
    },
    setURL: function (url) {
        this.url = url;
        this.disposeFeatures();
        this.loaded = false;
        this.events.triggerEvent("loadstart");
        this.load()
    },
    _requestSuccess: function (request) {
        var doc = request.responseXML;
        if (!doc || !doc.documentElement) {
            doc = request.responseText
        }
        var options = {};
        NUtility.extend(options, this.formatOptions);
        if (this.map && !this.projection.equals(this.map.getProjection())) {
            options.outerProjection = this.projection;
            options.innerProjection = this.map.getProjection()
        }
        var gml = this.format ? new this.format(options) : new NParser.GML(options);
        this.addFeatures(gml.read(doc));
        this.events.triggerEvent("loadend")
    },
    requestFailure: function (request) {
        NLog.userError(NMGISLG("errorLoadingGML", {
            'url': this.url
        }));
        this.events.triggerEvent("loadend")
    },
    _CLASS_NAME: "NGMLLayer"
});
NSymbol = NObject({
    name: null,
    title: null,
    description: null,
    layerName: null,
    isDefault: false,
    rules: null,
    context: null,
    defaultSymbol: null,
    propertySymbols: null,
    construct: function (symbol, options) {
        this.rules = [];
        this.setDefaultSymbol(symbol || NVectorFeature.symbol["default"]);
        NUtility.extend(this, options)
    },
    dispose: function () {
        for (var i = 0, len = this.rules.length; i < len; i++) {
            this.rules[i].dispose();
            this.rules[i] = null
        }
        this.rules = null;
        this.defaultSymbol = null
    },
    createSymbolizer: function (feature) {
        var symbol = this.createLiterals(NUtility.extend({}, this.defaultSymbol), feature);
        var rules = this.rules;
        var rule, context;
        var elseRules = [];
        var appliedRules = false;
        for (var i = 0, len = rules.length; i < len; i++) {
            rule = rules[i];
            var applies = rule.evaluate(feature);
            if (applies) {
                if (rule instanceof NRule && rule.lowPriorityFilter) {
                    elseRules.push(rule)
                } else {
                    appliedRules = true;
                    this.applySymbolizer(rule, symbol, feature)
                }
            }
        }
        if (appliedRules == false && elseRules.length > 0) {
            appliedRules = true;
            for (var i = 0, len = elseRules.length; i < len; i++) {
                this.applySymbolizer(elseRules[i], symbol, feature)
            }
        }
        if (rules.length > 0 && appliedRules == false) {
            symbol.display = "none"
        } else {
            symbol.display = ""
        }
        return symbol
    },
    applySymbolizer: function (rule, symbol, feature) {
        var symbolizerPrefix = feature.geometry ? this.getSymbolizerPrefix(feature.geometry) : NSymbol.SYMBOLIZER_PREFIXES[0];
        var symbolizer = rule.symbolizer[symbolizerPrefix] || rule.symbolizer;
        return this.createLiterals(NUtility.extend(symbol, symbolizer), feature)
    },
    createLiterals: function (symbol, feature) {
        var context = this.context || feature.attributes || feature.data;
        for (var i in this.propertySymbols) {
            symbol[i] = NSymbol.createLiteral(symbol[i], context, feature)
        }
        return symbol
    },
    findPropertyStyles: function () {
        var propertySymbols = {};
        var symbol = this.defaultSymbol;
        this.addPropertyStyles(propertySymbols, symbol);
        var rules = this.rules;
        var symbolizer, value;
        for (var i = 0, len = rules.length; i < len; i++) {
            var symbolizer = rules[i].symbolizer;
            for (var key in symbolizer) {
                value = symbolizer[key];
                if (typeof value == "object") {
                    this.addPropertyStyles(propertySymbols, value)
                } else {
                    this.addPropertyStyles(propertySymbols, symbolizer);
                    break
                }
            }
        }
        return propertySymbols
    },
    addPropertyStyles: function (propertySymbols, symbolizer) {
        var property;
        for (var key in symbolizer) {
            property = symbolizer[key];
            if (typeof property == "string" && property.match(/\$\{\w+\}/)) {
                propertySymbols[key] = true
            }
        }
        return propertySymbols
    },
    addRules: function (rules) {
        this.rules = this.rules.concat(rules);
        this.propertySymbols = this.findPropertyStyles()
    },
    setDefaultSymbol: function (symbol) {
        this.defaultSymbol = symbol;
        this.propertySymbols = this.findPropertyStyles()
    },
    getSymbolizerPrefix: function (geometry) {
        var prefixes = NSymbol.SYMBOLIZER_PREFIXES;
        for (var i = 0, len = prefixes.length; i < len; i++) {
            if (geometry._CLASS_NAME.indexOf(prefixes[i]) != -1) {
                return prefixes[i]
            }
        }
    },
    _CLASS_NAME: "NSymbol"
});
NSymbol.createLiteral = function (value, context, feature) {
    if (typeof value == "string" && value.indexOf("${") != -1) {
        value = NString.format(value, context, [feature]);
        value = (isNaN(value) || !value) ? value : parseFloat(value)
    }
    return value
};
NSymbol.SYMBOLIZER_PREFIXES = ['Point', 'Line', 'Polygon', 'Text'];
NSymbols = NObject({
    symbols: null,
    extendDefault: true,
    construct: function (symbol, options) {
        this.symbols = {
            "default": new NSymbol(NVectorFeature.symbol["default"]),
            "select": new NSymbol(NVectorFeature.symbol["select"]),
            "temporary": new NSymbol(NVectorFeature.symbol["temporary"])
        };
        if (symbol instanceof NSymbol) {
            this.symbols["default"] = symbol;
            this.symbols["select"] = symbol;
            this.symbols["temporary"] = symbol
        } else if (typeof symbol == "object") {
            for (var key in symbol) {
                if (symbol[key] instanceof NSymbol) {
                    this.symbols[key] = symbol[key]
                } else if (typeof symbol[key] == "object") {
                    this.symbols[key] = new NSymbol(symbol[key])
                } else {
                    this.symbols["default"] = new NSymbol(symbol);
                    this.symbols["select"] = new NSymbol(symbol);
                    this.symbols["temporary"] = new NSymbol(symbol);
                    break
                }
            }
        }
        NUtility.extend(this, options)
    },
    dispose: function () {
        for (var key in this.symbols) {
            this.symbols[key].dispose()
        }
        this.symbols = null
    },
    createSymbolizer: function (feature, intent) {
        if (!feature) {
            feature = new NVectorFeature()
        }
        if (!this.symbols[intent]) {
            intent = "default"
        }
        feature.renderSymbol = intent;
        var defaultSymbolizer = {};
        if (this.extendDefault && intent != "default") {
            defaultSymbolizer = this.symbols["default"].createSymbolizer(feature)
        }
        return NUtility.extend(defaultSymbolizer, this.symbols[intent].createSymbolizer(feature))
    },
    addUniqueValueRules: function (renderSymbol, property, symbolizers, context) {
        var rules = [];
        for (var value in symbolizers) {
            rules.push(new NRule({
                symbolizer: symbolizers[value],
                context: context,
                filter: new NFilter.Comparison({
                    type: NFilter.Comparison.EQUAL_TO,
                    property: property,
                    value: value
                })
            }))
        }
        this.symbols[renderSymbol].addRules(rules)
    },
    _CLASS_NAME: "NSymbols"
});
NRule = NObject({
    id: null,
    name: 'default',
    title: null,
    description: null,
    context: null,
    filter: null,
    lowPriorityFilter: false,
    symbolizer: null,
    minScale: null,
    maxScale: null,
    construct: function (options) {
        this.id = NUtility.createUniqueID(this._CLASS_NAME + "_");
        this.symbolizer = {};
        NUtility.extend(this, options)
    },
    dispose: function () {
        for (var i in this.symbolizer) {
            this.symbolizer[i] = null
        }
        this.symbolizer = null
    },
    evaluate: function (feature) {
        var context = this.getContext(feature);
        var applies = true;
        if (this.minScale || this.maxScale) {
            var scale = feature.layer.map.getScale()
        }
        if (this.minScale) {
            applies = scale >= NSymbol.createLiteral(this.minScale, context)
        }
        if (applies && this.maxScale) {
            applies = scale < NSymbol.createLiteral(this.maxScale, context)
        }
        if (applies && this.filter) {
            if (this.filter._CLASS_NAME == "NFilter.FeatureId") {
                applies = this.filter.evaluate(feature)
            } else {
                applies = this.filter.evaluate(context)
            }
        }
        return applies
    },
    getContext: function (feature) {
        var context = this.context;
        if (!context) {
            context = feature.attributes || feature.data
        }
        if (typeof this.context == "function") {
            context = this.context(feature)
        }
        return context
    },
    _CLASS_NAME: "NRule"
});
NFilter = NObject({
    construct: function (options) {
        NUtility.extend(this, options)
    },
    dispose: function () {},
    evaluate: function (context) {
        return true
    },
    _CLASS_NAME: "NFilter"
});
NFilter.FeatureId = NObject(NFilter, {
    fids: null,
    construct: function (options) {
        this.fids = [];
        NFilter.prototype.construct.apply(this, [options])
    },
    evaluate: function (feature) {
        for (var i = 0, len = this.fids.length; i < len; i++) {
            var fid = feature.fid || feature.id;
            if (fid == this.fids[i]) {
                return true
            }
        }
        return false
    },
    _CLASS_NAME: "NFilter.FeatureId"
});
NFilter.Logical = NObject(NFilter, {
    filters: null,
    type: null,
    construct: function (options) {
        this.filters = [];
        NFilter.prototype.construct.apply(this, [options])
    },
    dispose: function () {
        this.filters = null;
        NFilter.prototype.dispose.apply(this)
    },
    evaluate: function (context) {
        switch (this.type) {
        case NFilter.Logical.AND:
            for (var i = 0, len = this.filters.length; i < len; i++) {
                if (this.filters[i].evaluate(context) == false) {
                    return false
                }
            }
            return true;
        case NFilter.Logical.OR:
            for (var i = 0, len = this.filters.length; i < len; i++) {
                if (this.filters[i].evaluate(context) == true) {
                    return true
                }
            }
            return false;
        case NFilter.Logical.NOT:
            return (!this.filters[0].evaluate(context))
        }
    },
    _CLASS_NAME: "NFilter.Logical"
});
NFilter.Logical.AND = "&&";
NFilter.Logical.OR = "||";
NFilter.Logical.NOT = "!";
NFilter.Comparison = NObject(NFilter, {
    type: null,
    property: null,
    value: null,
    floorValue: null,
    ceilValue: null,
    construct: function (options) {
        NFilter.prototype.construct.apply(this, [options])
    },
    evaluate: function (context) {
        switch (this.type) {
        case NFilter.Comparison.EQUAL_TO:
        case NFilter.Comparison.LESS_THAN:
        case NFilter.Comparison.GREATER_THAN:
        case NFilter.Comparison.LESS_THAN_OR_EQUAL_TO:
        case NFilter.Comparison.GREATER_THAN_OR_EQUAL_TO:
            return this.compare(context, this.property, this.value);
        case NFilter.Comparison.BETWEEN:
            var result = context[this.property] >= this.floorValue;
            result = result && context[this.property] <= this.ceilValue;
            return result;
        case NFilter.Comparison.LIKE:
            var regexp = new RegExp(this.value, "gi");
            return regexp.test(context[this.property])
        }
    },
    value2regex: function (wildCard, singleChar, escapeChar) {
        if (wildCard == ".") {
            var msg = "'.' is an unsupported wildCard character for " + "NFilter.Comparison";
            NLog.error(msg);
            return null
        }
        wildCard = wildCard ? wildCard : "*";
        singleChar = singleChar ? singleChar : ".";
        escapeChar = escapeChar ? escapeChar : "!";
        this.value = this.value.replace(new RegExp("\\" + escapeChar + "(.|$)", "g"), "\\$1");
        this.value = this.value.replace(new RegExp("\\" + singleChar, "g"), ".");
        this.value = this.value.replace(new RegExp("\\" + wildCard, "g"), ".*");
        this.value = this.value.replace(new RegExp("\\\\.\\*", "g"), "\\" + wildCard);
        this.value = this.value.replace(new RegExp("\\\\\\.", "g"), "\\" + singleChar);
        return this.value
    },
    regex2value: function () {
        var value = this.value;
        value = value.replace(/!/g, "!!");
        value = value.replace(/(\\)?\\\./g, function ($0, $1) {
            return $1 ? $0 : "!."
        });
        value = value.replace(/(\\)?\\\*/g, function ($0, $1) {
            return $1 ? $0 : "!*"
        });
        value = value.replace(/\\\\/g, "\\");
        value = value.replace(/\.\*/g, "*");
        return value
    },
    compare: function (context, property, value) {
        switch (this.type) {
        case NFilter.Comparison.EQUAL_TO:
            return context[property] == value;
        case NFilter.Comparison.NOT_EQUAL_TO:
            return context[property] != value;
        case NFilter.Comparison.LESS_THAN:
            return context[property] < value;
        case NFilter.Comparison.GREATER_THAN:
            return context[property] > value;
        case NFilter.Comparison.LESS_THAN_OR_EQUAL_TO:
            return context[property] <= value;
        case NFilter.Comparison.GREATER_THAN_OR_EQUAL_TO:
            return context[property] >= value
        }
    },
    _CLASS_NAME: "NFilter.Comparison"
});
NFilter.Comparison.EQUAL_TO = "==";
NFilter.Comparison.NOT_EQUAL_TO = "!=";
NFilter.Comparison.LESS_THAN = "<";
NFilter.Comparison.GREATER_THAN = ">";
NFilter.Comparison.LESS_THAN_OR_EQUAL_TO = "<=";
NFilter.Comparison.GREATER_THAN_OR_EQUAL_TO = ">=";
NFilter.Comparison.BETWEEN = "..";
NFilter.Comparison.LIKE = "~";
NFilter.Spatial = NObject(NFilter, {
    type: null,
    property: null,
    value: null,
    distance: null,
    distanceUnits: null,
    construct: function (options) {
        NFilter.prototype.construct.apply(this, [options])
    },
    evaluate: function (feature) {
        var intersect = false;
        switch (this.type) {
        case NFilter.Spatial.BBOX:
        case NFilter.Spatial.INTERSECTS:
            if (feature.geometry) {
                var geom = this.value;
                if (this.value._CLASS_NAME == "NBounds") {
                    geom = this.value.toGeometry()
                }
                if (feature.geometry.intersects(geom)) {
                    intersect = true
                }
            }
            break;
        default:
            NLog.error(NMGISLG("filterEvaluateNotImplemented"));
            break
        }
        return intersect
    },
    _CLASS_NAME: "NFilter.Spatial"
});
NFilter.Spatial.BBOX = "BBOX";
NFilter.Spatial.INTERSECTS = "INTERSECTS";
NFilter.Spatial.DWITHIN = "DWITHIN";
NParser = NObject({
    options: null,
    outerProjection: null,
    innerProjection: null,
    construct: function (options) {
        NUtility.extend(this, options);
        this.options = options
    },
    dispose: function () {},
    read: function (data) {
        NLog.userError(NMGISLG("readNotImplemented"))
    },
    write: function (object) {
        NLog.userError(NMGISLG("writeNotImplemented"))
    },
    _CLASS_NAME: "NParser"
});
NParser.XML = NObject(NParser, {
    namespaces: null,
    namespaceAlias: null,
    defaultPrefix: null,
    readers: {},
    writers: {},
    xmldom: null,
    construct: function (options) {
        if (window.ActiveXObject) {
            this.xmldom = new ActiveXObject("Microsoft.XMLDOM")
        }
        NParser.prototype.construct.apply(this, [options]);
        this.namespaces = NUtility.extend({}, this.namespaces);
        this.namespaceAlias = {};
        for (var alias in this.namespaces) {
            this.namespaceAlias[this.namespaces[alias]] = alias
        }
    },
    dispose: function () {
        this.xmldom = null;
        NParser.prototype.dispose.apply(this, arguments)
    },
    setNamespace: function (alias, uri) {
        this.namespaces[alias] = uri;
        this.namespaceAlias[uri] = alias
    },
    read: function (text) {
        var index = text.indexOf('<');
        if (index > 0) {
            text = text.substring(index)
        }
        var node = NUtility.Try(NFunction.bind((function () {
            var xmldom;
            if (window.ActiveXObject && !this.xmldom) {
                xmldom = new ActiveXObject("Microsoft.XMLDOM")
            } else {
                xmldom = this.xmldom
            }
            xmldom.loadXML(text);
            return xmldom
        }), this), function () {
            return new DOMParser().parseFromString(text, 'text/xml')
        }, function () {
            var req = new XMLHttpRequest();
            req.open("GET", "data:" + "text/xml" + ";charset=utf-8," + encodeURIComponent(text), false);
            if (req.overrideMimeType) {
                req.overrideMimeType("text/xml")
            }
            req.send(null);
            return req.responseXML
        });
        return node
    },
    write: function (node) {
        var data;
        if (this.xmldom) {
            data = node.xml
        } else {
            var serializer = new XMLSerializer();
            if (node.nodeType == 1) {
                var doc = document.implementation.createDocument("", "", null);
                if (doc.importNode) {
                    node = doc.importNode(node, true)
                }
                doc.appendChild(node);
                data = serializer.serializeToString(doc)
            } else {
                data = serializer.serializeToString(node)
            }
        }
        return data
    },
    createElementNS: function (uri, name) {
        var element;
        if (this.xmldom) {
            if (typeof uri == "string") {
                element = this.xmldom.createNode(1, name, uri)
            } else {
                element = this.xmldom.createNode(1, name, "")
            }
        } else {
            element = document.createElementNS(uri, name)
        }
        return element
    },
    createTextNode: function (text) {
        var node;
        if (this.xmldom) {
            node = this.xmldom.createTextNode(text)
        } else {
            node = document.createTextNode(text)
        }
        return node
    },
    getElementsByTagNameNS: function (node, uri, name) {
        var elements = [];
        if (node.getElementsByTagNameNS) {
            elements = node.getElementsByTagNameNS(uri, name)
        } else {
            var allNodes = node.getElementsByTagName("*");
            var potentialNode, fullName;
            for (var i = 0, len = allNodes.length; i < len; ++i) {
                potentialNode = allNodes[i];
                fullName = (potentialNode.prefix) ? (potentialNode.prefix + ":" + name) : name;
                if ((name == "*") || (fullName == potentialNode.nodeName)) {
                    if ((uri == "*") || (uri == potentialNode.namespaceURI)) {
                        elements.push(potentialNode)
                    }
                }
            }
        }
        return elements
    },
    getAttributeNodeNS: function (node, uri, name) {
        var attributeNode = null;
        if (node.getAttributeNodeNS) {
            attributeNode = node.getAttributeNodeNS(uri, name)
        } else {
            var attributes = node.attributes;
            var potentialNode, fullName;
            for (var i = 0, len = attributes.length; i < len; ++i) {
                potentialNode = attributes[i];
                if (potentialNode.namespaceURI == uri) {
                    fullName = (potentialNode.prefix) ? (potentialNode.prefix + ":" + name) : name;
                    if (fullName == potentialNode.nodeName) {
                        attributeNode = potentialNode;
                        break
                    }
                }
            }
        }
        return attributeNode
    },
    getAttributeNS: function (node, uri, name) {
        var attributeValue = "";
        if (node.getAttributeNS) {
            attributeValue = node.getAttributeNS(uri, name) || ""
        } else {
            var attributeNode = this.getAttributeNodeNS(node, uri, name);
            if (attributeNode) {
                attributeValue = attributeNode.nodeValue
            }
        }
        return attributeValue
    },
    getChildNodeValue: function (node, def) {
        var value = def || "";
        if (node) {
            var child = node.firstChild;
            if (child) {
                value = child.nodeValue || value
            }
        }
        return value
    },
    concatChildValues: function (node, def) {
        var value = "";
        var child = node.firstChild;
        var childValue;
        while (child) {
            childValue = child.nodeValue;
            if (childValue) {
                value += childValue
            }
            child = child.nextSibling
        }
        if (value == "" && def != undefined) {
            value = def
        }
        return value
    },
    hasAttributeNS: function (node, uri, name) {
        var found = false;
        if (node.hasAttributeNS) {
            found = node.hasAttributeNS(uri, name)
        } else {
            found = !! this.getAttributeNodeNS(node, uri, name)
        }
        return found
    },
    setAttributeNS: function (node, uri, name, value) {
        if (node.setAttributeNS) {
            node.setAttributeNS(uri, name, value)
        } else {
            if (this.xmldom) {
                if (uri) {
                    var attribute = node.ownerDocument.createNode(2, name, uri);
                    attribute.nodeValue = value;
                    node.setAttributeNode(attribute)
                } else {
                    node.setAttribute(name, value)
                }
            } else {
                throw "setAttributeNS not implemented"
            }
        }
    },
    _createElementNSPlus: function (name, options) {
        options = options || {};
        var loc = name.indexOf(":");
        var uri = options.uri || this.namespaces[options.prefix];
        if (!uri) {
            loc = name.indexOf(":");
            uri = this.namespaces[name.substring(0, loc)]
        }
        if (!uri) {
            uri = this.namespaces[this.defaultPrefix]
        }
        var node = this.createElementNS(uri, name);
        if (options.attributes) {
            this.setAttributes(node, options.attributes)
        }
        if (options.value) {
            node.appendChild(this.createTextNode(options.value))
        }
        return node
    },
    setAttributes: function (node, obj) {
        var value, loc, alias, uri;
        for (var name in obj) {
            if (obj[name] != null && obj[name].toString) {
                value = obj[name].toString();
                uri = this.namespaces[name.substring(0, name.indexOf(":"))] || null;
                this.setAttributeNS(node, uri, name, value)
            }
        }
    },
    readNode: function (node, obj) {
        if (!obj) {
            obj = {}
        }
        var group = this.readers[this.namespaceAlias[node.namespaceURI]];
        if (group) {
            var local = node.localName || node.nodeName.split(":").pop();
            var reader = group[local] || group["*"];
            if (reader) {
                reader.apply(this, [node, obj])
            }
        }
        return obj
    },
    readChildNodes: function (node, obj) {
        if (!obj) {
            obj = {}
        }
        var children = node.childNodes;
        var child;
        for (var i = 0, len = children.length; i < len; ++i) {
            child = children[i];
            if (child.nodeType == 1) {
                this.readNode(child, obj)
            }
        }
        return obj
    },
    writeNode: function (name, obj, parent) {
        var prefix, local;
        var split = name.indexOf(":");
        if (split > 0) {
            prefix = name.substring(0, split);
            local = name.substring(split + 1)
        } else {
            if (parent) {
                prefix = this.namespaceAlias[parent.namespaceURI]
            } else {
                prefix = this.defaultPrefix
            }
            local = name
        }
        var child = this.writers[prefix][local].apply(this, [obj]);
        if (parent) {
            parent.appendChild(child)
        }
        return child
    },
    _CLASS_NAME: "NParser.XML"
});
NParser.GML = NObject(NParser.XML, {
    _featurens: "http://mapserver.gis.umn.edu/mapserver",
    featurePrefix: "feature",
    featureName: "featureMember",
    layerName: "features",
    geometryName: "geometry",
    collectionName: "FeatureCollection",
    gmlns: "http://www.opengis.net/gml",
    getAttributes: true,
    xy: true,
    construct: function (options) {
        this.regExes = {
            trimSpace: (/^\s*|\s*$/g),
            removeSpace: (/\s*/g),
            splitSpace: (/\s+/),
            trimComma: (/\s*,\s*/g)
        };
        NParser.XML.prototype.construct.apply(this, [options])
    },
    read: function (data) {
        if (typeof data == "string") {
            data = NParser.XML.prototype.read.apply(this, [data])
        }
        var featureNodes = this.getElementsByTagNameNS(data.documentElement, this.gmlns, this.featureName);
        var features = [];
        for (var i = 0; i < featureNodes.length; i++) {
            var feature = this.parseFeature(featureNodes[i]);
            if (feature) {
                features.push(feature)
            }
        }
        return features
    },
    parseFeature: function (node) {
        var order = ["MultiPolygon", "Polygon", "MultiLineString", "LineString", "MultiPoint", "Point", "Envelope", "Box"];
        var type, nodeList, geometry, parser;
        for (var i = 0; i < order.length; ++i) {
            type = order[i];
            nodeList = this.getElementsByTagNameNS(node, this.gmlns, type);
            if (nodeList.length > 0) {
                var parser = this.parseGeometry[type.toLowerCase()];
                if (parser) {
                    geometry = parser.apply(this, [nodeList[0]]);
                    if (this.innerProjection && this.outerProjection) {
                        geometry.transform(this.outerProjection, this.innerProjection)
                    }
                } else {
                    NLog.error(NMGISLG("unsupportedGeometryType", {
                        'geomType': type
                    }))
                }
                break
            }
        }
        var attributes;
        if (this.getAttributes) {
            attributes = this.parseAttributes(node)
        }
        var feature = new NVectorFeature(geometry, attributes);
        feature.gml = {
            featureType: node.firstChild.nodeName.split(":")[1],
            _featurens: node.firstChild.namespaceURI,
            featureNSPrefix: node.firstChild.prefix
        };
        var childNode = node.firstChild;
        var fid;
        while (childNode) {
            if (childNode.nodeType == 1) {
                fid = childNode.getAttribute("fid") || childNode.getAttribute("id");
                if (fid) {
                    break
                }
            }
            childNode = childNode.nextSibling
        }
        feature.fid = fid;
        return feature
    },
    parseGeometry: {
        point: function (node) {
            var nodeList, coordString;
            var coords = [];
            var nodeList = this.getElementsByTagNameNS(node, this.gmlns, "pos");
            if (nodeList.length > 0) {
                coordString = nodeList[0].firstChild.nodeValue;
                coordString = coordString.replace(this.regExes.trimSpace, "");
                coords = coordString.split(this.regExes.splitSpace)
            }
            if (coords.length == 0) {
                nodeList = this.getElementsByTagNameNS(node, this.gmlns, "coordinates");
                if (nodeList.length > 0) {
                    coordString = nodeList[0].firstChild.nodeValue;
                    coordString = coordString.replace(this.regExes.removeSpace, "");
                    coords = coordString.split(",")
                }
            }
            if (coords.length == 0) {
                nodeList = this.getElementsByTagNameNS(node, this.gmlns, "coord");
                if (nodeList.length > 0) {
                    var xList = this.getElementsByTagNameNS(nodeList[0], this.gmlns, "X");
                    var yList = this.getElementsByTagNameNS(nodeList[0], this.gmlns, "Y");
                    if (xList.length > 0 && yList.length > 0) {
                        coords = [xList[0].firstChild.nodeValue, yList[0].firstChild.nodeValue]
                    }
                }
            }
            if (coords.length == 2) {
                coords[2] = null
            }
            if (this.xy) {
                return new NGeometry.Point(coords[0], coords[1], coords[2])
            } else {
                return new NGeometry.Point(coords[1], coords[0], coords[2])
            }
        },
        multipoint: function (node) {
            var nodeList = this.getElementsByTagNameNS(node, this.gmlns, "Point");
            var components = [];
            if (nodeList.length > 0) {
                var point;
                for (var i = 0; i < nodeList.length; ++i) {
                    point = this.parseGeometry.point.apply(this, [nodeList[i]]);
                    if (point) {
                        components.push(point)
                    }
                }
            }
            return new NGeometry.MultiPoint(components)
        },
        linestring: function (node, ring) {
            var nodeList, coordString;
            var coords = [];
            var points = [];
            nodeList = this.getElementsByTagNameNS(node, this.gmlns, "posList");
            if (nodeList.length > 0) {
                coordString = this.concatChildValues(nodeList[0]);
                coordString = coordString.replace(this.regExes.trimSpace, "");
                coords = coordString.split(this.regExes.splitSpace);
                var tempTag = nodeList[0].getAttribute("dimension");
                if (tempTag == null || tempTag == undefined) {
                    tempTag = nodeList[0].getAttribute("srsDimension")
                }
                var dim = parseInt(tempTag);
                var j, x, y, z;
                for (var i = 0; i < coords.length / dim; ++i) {
                    j = i * dim;
                    x = coords[j];
                    y = coords[j + 1];
                    z = (dim == 2) ? null : coords[j + 2];
                    if (this.xy) {
                        points.push(new NGeometry.Point(x, y, z))
                    } else {
                        points.push(new NGeometry.Point(y, x, z))
                    }
                }
            }
            if (coords.length == 0) {
                nodeList = this.getElementsByTagNameNS(node, this.gmlns, "coordinates");
                if (nodeList.length > 0) {
                    coordString = this.concatChildValues(nodeList[0]);
                    coordString = coordString.replace(this.regExes.trimSpace, "");
                    coordString = coordString.replace(this.regExes.trimComma, ",");
                    var pointList = coordString.split(this.regExes.splitSpace);
                    for (var i = 0; i < pointList.length; ++i) {
                        coords = pointList[i].split(",");
                        if (coords.length == 2) {
                            coords[2] = null
                        }
                        if (this.xy) {
                            points.push(new NGeometry.Point(coords[0], coords[1], coords[2]))
                        } else {
                            points.push(new NGeometry.Point(coords[1], coords[0], coords[2]))
                        }
                    }
                }
            }
            var line = null;
            if (points.length != 0) {
                if (ring) {
                    line = new NGeometry.LinearRing(points)
                } else {
                    line = new NGeometry.LineString(points)
                }
            }
            return line
        },
        multilinestring: function (node) {
            var nodeList = this.getElementsByTagNameNS(node, this.gmlns, "LineString");
            var components = [];
            if (nodeList.length > 0) {
                var line;
                for (var i = 0; i < nodeList.length; ++i) {
                    line = this.parseGeometry.linestring.apply(this, [nodeList[i]]);
                    if (line) {
                        components.push(line)
                    }
                }
            }
            return new NGeometry.MultiLineString(components)
        },
        polygon: function (node) {
            var nodeList = this.getElementsByTagNameNS(node, this.gmlns, "LinearRing");
            var components = [];
            if (nodeList.length > 0) {
                var ring;
                for (var i = 0; i < nodeList.length; ++i) {
                    ring = this.parseGeometry.linestring.apply(this, [nodeList[i], true]);
                    if (ring) {
                        components.push(ring)
                    }
                }
            }
            return new NGeometry.Polygon(components)
        },
        multipolygon: function (node) {
            var nodeList = this.getElementsByTagNameNS(node, this.gmlns, "Polygon");
            var components = [];
            if (nodeList.length > 0) {
                var polygon;
                for (var i = 0; i < nodeList.length; ++i) {
                    polygon = this.parseGeometry.polygon.apply(this, [nodeList[i]]);
                    if (polygon) {
                        components.push(polygon)
                    }
                }
            }
            return new NGeometry.MultiPolygon(components)
        },
        envelope: function (node) {
            var components = [];
            var coordString;
            var envelope;
            var lpoint = this.getElementsByTagNameNS(node, this.gmlns, "lowerCorner");
            if (lpoint.length > 0) {
                var coords = [];
                if (lpoint.length > 0) {
                    coordString = lpoint[0].firstChild.nodeValue;
                    coordString = coordString.replace(this.regExes.trimSpace, "");
                    coords = coordString.split(this.regExes.splitSpace)
                }
                if (coords.length == 2) {
                    coords[2] = null
                }
                if (this.xy) {
                    var lowerPoint = new NGeometry.Point(coords[0], coords[1], coords[2])
                } else {
                    var lowerPoint = new NGeometry.Point(coords[1], coords[0], coords[2])
                }
            }
            var upoint = this.getElementsByTagNameNS(node, this.gmlns, "upperCorner");
            if (upoint.length > 0) {
                var coords = [];
                if (upoint.length > 0) {
                    coordString = upoint[0].firstChild.nodeValue;
                    coordString = coordString.replace(this.regExes.trimSpace, "");
                    coords = coordString.split(this.regExes.splitSpace)
                }
                if (coords.length == 2) {
                    coords[2] = null
                }
                if (this.xy) {
                    var upperPoint = new NGeometry.Point(coords[0], coords[1], coords[2])
                } else {
                    var upperPoint = new NGeometry.Point(coords[1], coords[0], coords[2])
                }
            }
            if (lowerPoint && upperPoint) {
                components.push(new NGeometry.Point(lowerPoint.x, lowerPoint.y));
                components.push(new NGeometry.Point(upperPoint.x, lowerPoint.y));
                components.push(new NGeometry.Point(upperPoint.x, upperPoint.y));
                components.push(new NGeometry.Point(lowerPoint.x, upperPoint.y));
                components.push(new NGeometry.Point(lowerPoint.x, lowerPoint.y));
                var ring = new NGeometry.LinearRing(components);
                envelope = new NGeometry.Polygon([ring])
            }
            return envelope
        }
    },
    parseAttributes: function (node) {
        var attributes = {};
        var childNode = node.firstChild;
        var children, i, child, grandchildren, grandchild, name, value;
        while (childNode) {
            if (childNode.nodeType == 1) {
                children = childNode.childNodes;
                for (i = 0; i < children.length; ++i) {
                    child = children[i];
                    if (child.nodeType == 1) {
                        grandchildren = child.childNodes;
                        if (grandchildren.length == 1) {
                            grandchild = grandchildren[0];
                            if (grandchild.nodeType == 3 || grandchild.nodeType == 4) {
                                name = (child.prefix) ? child.nodeName.split(":")[1] : child.nodeName;
                                value = grandchild.nodeValue.replace(this.regExes.trimSpace, "");
                                attributes[name] = value
                            }
                        }
                    }
                }
                break
            }
            childNode = childNode.nextSibling
        }
        return attributes
    },
    write: function (features) {
        if (!(features instanceof Array)) {
            features = [features]
        }
        var gml = this.createElementNS("http://www.opengis.net/wfs", "wfs:" + this.collectionName);
        for (var i = 0; i < features.length; i++) {
            gml.appendChild(this.createFeatureXML(features[i]))
        }
        return NParser.XML.prototype.write.apply(this, [gml])
    },
    createFeatureXML: function (feature) {
        var geometry = feature.geometry;
        var geometryNode = this.createGeometryNode(geometry);
        var geomContainer = this.createElementNS(this._featurens, this.featurePrefix + ":" + this.geometryName);
        geomContainer.appendChild(geometryNode);
        var featureNode = this.createElementNS(this.gmlns, "gml:" + this.featureName);
        var featureContainer = this.createElementNS(this._featurens, this.featurePrefix + ":" + this.layerName);
        var fid = feature.fid || feature.id;
        featureContainer.setAttribute("fid", fid);
        featureContainer.appendChild(geomContainer);
        for (var attr in feature.attributes) {
            var attrText = this.createTextNode(feature.attributes[attr]);
            var nodename = attr.substring(attr.lastIndexOf(":") + 1);
            var attrContainer = this.createElementNS(this._featurens, this.featurePrefix + ":" + nodename);
            attrContainer.appendChild(attrText);
            featureContainer.appendChild(attrContainer)
        }
        featureNode.appendChild(featureContainer);
        return featureNode
    },
    createGeometryNode: function (geometry) {
        if (this.outerProjection && this.innerProjection) {
            geometry = geometry.clone();
            geometry.transform(this.innerProjection, this.outerProjection)
        }
        var className = geometry._CLASS_NAME;
        var type = className.substring(className.lastIndexOf(".") + 1);
        var builder = this.buildGeometry[type.toLowerCase()];
        return builder.apply(this, [geometry])
    },
    buildGeometry: {
        point: function (geometry) {
            var gml = this.createElementNS(this.gmlns, "gml:Point");
            gml.appendChild(this.createCoordinatesNode(geometry));
            return gml
        },
        multipoint: function (geometry) {
            var gml = this.createElementNS(this.gmlns, "gml:MultiPoint");
            var points = geometry.components;
            var pointMember, pointGeom;
            for (var i = 0; i < points.length; i++) {
                pointMember = this.createElementNS(this.gmlns, "gml:pointMember");
                pointGeom = this.buildGeometry.point.apply(this, [points[i]]);
                pointMember.appendChild(pointGeom);
                gml.appendChild(pointMember)
            }
            return gml
        },
        linestring: function (geometry) {
            var gml = this.createElementNS(this.gmlns, "gml:LineString");
            gml.appendChild(this.createCoordinatesNode(geometry));
            return gml
        },
        multilinestring: function (geometry) {
            var gml = this.createElementNS(this.gmlns, "gml:MultiLineString");
            var lines = geometry.components;
            var lineMember, lineGeom;
            for (var i = 0; i < lines.length; ++i) {
                lineMember = this.createElementNS(this.gmlns, "gml:lineStringMember");
                lineGeom = this.buildGeometry.linestring.apply(this, [lines[i]]);
                lineMember.appendChild(lineGeom);
                gml.appendChild(lineMember)
            }
            return gml
        },
        linearring: function (geometry) {
            var gml = this.createElementNS(this.gmlns, "gml:LinearRing");
            gml.appendChild(this.createCoordinatesNode(geometry));
            return gml
        },
        polygon: function (geometry) {
            var gml = this.createElementNS(this.gmlns, "gml:Polygon");
            var rings = geometry.components;
            var ringMember, ringGeom, type;
            for (var i = 0; i < rings.length; ++i) {
                type = (i == 0) ? "outerBoundaryIs" : "innerBoundaryIs";
                ringMember = this.createElementNS(this.gmlns, "gml:" + type);
                ringGeom = this.buildGeometry.linearring.apply(this, [rings[i]]);
                ringMember.appendChild(ringGeom);
                gml.appendChild(ringMember)
            }
            return gml
        },
        multipolygon: function (geometry) {
            var gml = this.createElementNS(this.gmlns, "gml:MultiPolygon");
            var polys = geometry.components;
            var polyMember, polyGeom;
            for (var i = 0; i < polys.length; ++i) {
                polyMember = this.createElementNS(this.gmlns, "gml:polygonMember");
                polyGeom = this.buildGeometry.polygon.apply(this, [polys[i]]);
                polyMember.appendChild(polyGeom);
                gml.appendChild(polyMember)
            }
            return gml
        },
        bounds: function (bounds) {
            var gml = this.createElementNS(this.gmlns, "gml:Box");
            gml.appendChild(this.createCoordinatesNode(bounds));
            return gml
        }
    },
    createCoordinatesNode: function (geometry) {
        var coordinatesNode = this.createElementNS(this.gmlns, "gml:coordinates");
        coordinatesNode.setAttribute("decimal", ".");
        coordinatesNode.setAttribute("cs", ",");
        coordinatesNode.setAttribute("ts", " ");
        var parts = [];
        if (geometry instanceof NBounds) {
            parts.push(geometry.left + "," + geometry.bottom);
            parts.push(geometry.right + "," + geometry.top)
        } else {
            var points = (geometry.components) ? geometry.components : [geometry];
            for (var i = 0; i < points.length; i++) {
                parts.push(points[i].x + "," + points[i].y)
            }
        }
        var txtNode = this.createTextNode(parts.join(" "));
        coordinatesNode.appendChild(txtNode);
        return coordinatesNode
    },
    _CLASS_NAME: "NParser.GML"
});
NParser.GML.Base = NObject(NParser.XML, {
    namespaces: {
        gml: "http://www.opengis.net/gml",
        xlink: "http://www.w3.org/1999/xlink",
        xsi: "http://www.w3.org/2001/XMLSchema-instance",
        wfs: "http://www.opengis.net/wfs"
    },
    defaultPrefix: "gml",
    schemaLocation: null,
    featureType: null,
    _featurens: null,
    geometryName: "geometry",
    getAttributes: true,
    srsName: null,
    xy: true,
    regExes: {
        trimSpace: (/^\s*|\s*$/g),
        removeSpace: (/\s*/g),
        splitSpace: (/\s+/),
        trimComma: (/\s*,\s*/g)
    },
    construct: function (options) {
        NParser.XML.prototype.construct.apply(this, [options]);
        this.setNamespace("feature", options._featurens)
    },
    read: function (data) {
        if (typeof data == "string") {
            data = NParser.XML.prototype.read.apply(this, [data])
        }
        if (data && data.nodeType == 9) {
            data = data.documentElement
        }
        var features = [];
        this.readNode(data, {
            features: features
        });
        if (features.length == 0) {
            var elements = this.getElementsByTagNameNS(data, this.namespaces.gml, "featureMember");
            if (elements.length) {
                for (var i = 0, len = elements.length; i < len; ++i) {
                    this.readNode(elements[i], {
                        features: features
                    })
                }
            } else {
                var elements = this.getElementsByTagNameNS(data, this.namespaces.gml, "featureMembers");
                if (elements.length) {
                    this.readNode(elements[0], {
                        features: features
                    })
                }
            }
        }
        return features
    },
    readers: {
        "gml": {
            "featureMember": function (node, obj) {
                this.readChildNodes(node, obj)
            },
            "featureMembers": function (node, obj) {
                this.readChildNodes(node, obj)
            },
            "Point": function (node, container) {
                var obj = {
                    points: []
                };
                this.readChildNodes(node, obj);
                if (!container.components) {
                    container.components = []
                }
                container.components.push(obj.points[0])
            },
            "coordinates": function (node, obj) {
                var str = this.concatChildValues(node).replace(this.regExes.trimSpace, "");
                str = str.replace(this.regExes.trimComma, ",");
                var pointList = str.split(this.regExes.splitSpace);
                var coords;
                var numPoints = pointList.length;
                var points = new Array(numPoints);
                for (var i = 0; i < numPoints; ++i) {
                    coords = pointList[i].split(",");
                    if (this.xy) {
                        points[i] = new NGeometry.Point(coords[0], coords[1], coords[2])
                    } else {
                        points[i] = new NGeometry.Point(coords[1], coords[0], coords[2])
                    }
                }
                obj.points = points
            },
            "coord": function (node, obj) {
                var coord = {};
                this.readChildNodes(node, coord);
                if (!obj.points) {
                    obj.points = []
                }
                obj.points.push(new NGeometry.Point(coord.x, coord.y, coord.z))
            },
            "X": function (node, coord) {
                coord.x = this.getChildNodeValue(node)
            },
            "Y": function (node, coord) {
                coord.y = this.getChildNodeValue(node)
            },
            "Z": function (node, coord) {
                coord.z = this.getChildNodeValue(node)
            },
            "MultiPoint": function (node, container) {
                var obj = {
                    components: []
                };
                this.readChildNodes(node, obj);
                container.components = [new NGeometry.MultiPoint(obj.components)]
            },
            "pointMember": function (node, obj) {
                this.readChildNodes(node, obj)
            },
            "LineString": function (node, container) {
                var obj = {};
                this.readChildNodes(node, obj);
                if (!container.components) {
                    container.components = []
                }
                container.components.push(new NGeometry.LineString(obj.points))
            },
            "MultiLineString": function (node, container) {
                var obj = {
                    components: []
                };
                this.readChildNodes(node, obj);
                container.components = [new NGeometry.MultiLineString(obj.components)]
            },
            "lineStringMember": function (node, obj) {
                this.readChildNodes(node, obj)
            },
            "Polygon": function (node, container) {
                var obj = {
                    outer: null,
                    inner: []
                };
                this.readChildNodes(node, obj);
                obj.inner.unshift(obj.outer);
                if (!container.components) {
                    container.components = []
                }
                container.components.push(new NGeometry.Polygon(obj.inner))
            },
            "LinearRing": function (node, obj) {
                var container = {};
                this.readChildNodes(node, container);
                obj.components = [new NGeometry.LinearRing(container.points)]
            },
            "MultiPolygon": function (node, container) {
                var obj = {
                    components: []
                };
                this.readChildNodes(node, obj);
                container.components = [new NGeometry.MultiPolygon(obj.components)]
            },
            "polygonMember": function (node, obj) {
                this.readChildNodes(node, obj)
            },
            "GeometryCollection": function (node, container) {
                var obj = {
                    components: []
                };
                this.readChildNodes(node, obj);
                container.components = [new NGeometry.Collection(obj.components)]
            },
            "geometryMember": function (node, obj) {
                this.readChildNodes(node, obj)
            }
        },
        "feature": {
            "*": function (node, obj) {
                var name;
                var local = node.localName || node.nodeName.split(":").pop();
                if (local == this.featureType) {
                    name = "_typeName"
                } else {
                    if (node.childNodes.length == 1 && node.firstChild.nodeType == 3) {
                        if (this.getAttributes) {
                            name = "_attribute"
                        }
                    } else {
                        name = "_geometry"
                    }
                }
                if (name) {
                    this.readers.feature[name].apply(this, [node, obj])
                }
            },
            "_typeName": function (node, obj) {
                var container = {
                    components: [],
                    attributes: {}
                };
                this.readChildNodes(node, container);
                var feature = new NVectorFeature(container.components[0], container.attributes);
                var fid = node.getAttribute("fid") || this.getAttributeNS(node, this.namespaces["gml"], "id");
                if (fid) {
                    feature.fid = fid
                }
                if (this.innerProjection && this.outerProjection && feature.geometry) {
                    feature.geometry.transform(this.outerProjection, this.innerProjection)
                }
                obj.features.push(feature)
            },
            "_geometry": function (node, obj) {
                this.readChildNodes(node, obj)
            },
            "_attribute": function (node, obj) {
                var local = node.localName || node.nodeName.split(":").pop();
                var value = this.getChildNodeValue(node);
                obj.attributes[local] = value
            }
        },
        "wfs": {
            "FeatureCollection": function (node, obj) {
                this.readChildNodes(node, obj)
            }
        }
    },
    write: function (features) {
        var name;
        if (features instanceof Array) {
            name = "featureMembers"
        } else {
            name = "featureMember"
        }
        var root = this.writeNode("gml:" + name, features);
        this.setAttributeNS(root, this.namespaces["xsi"], "xsi:schemaLocation", this.schemaLocation);
        return NParser.XML.prototype.write.apply(this, [root])
    },
    writers: {
        "gml": {
            "featureMember": function (feature) {
                var node = this._createElementNSPlus("gml:featureMember");
                this.writeNode("feature:_typeName", feature, node);
                return node
            },
            "MultiPoint": function (geometry) {
                var node = this._createElementNSPlus("gml:MultiPoint");
                for (var i = 0; i < geometry.components.length; ++i) {
                    this.writeNode("pointMember", geometry.components[i], node)
                }
                return node
            },
            "pointMember": function (geometry) {
                var node = this._createElementNSPlus("gml:pointMember");
                this.writeNode("Point", geometry, node);
                return node
            },
            "MultiLineString": function (geometry) {
                var node = this._createElementNSPlus("gml:MultiLineString");
                for (var i = 0; i < geometry.components.length; ++i) {
                    this.writeNode("lineStringMember", geometry.components[i], node)
                }
                return node
            },
            "lineStringMember": function (geometry) {
                var node = this._createElementNSPlus("gml:lineStringMember");
                this.writeNode("LineString", geometry, node);
                return node
            },
            "MultiPolygon": function (geometry) {
                var node = this._createElementNSPlus("gml:MultiPolygon");
                for (var i = 0; i < geometry.components.length; ++i) {
                    this.writeNode("polygonMember", geometry.components[i], node)
                }
                return node
            },
            "polygonMember": function (geometry) {
                var node = this._createElementNSPlus("gml:polygonMember");
                this.writeNode("Polygon", geometry, node);
                return node
            },
            "GeometryCollection": function (geometry) {
                var node = this._createElementNSPlus("gml:GeometryCollection");
                for (var i = 0, len = geometry.components.length; i < len; ++i) {
                    this.writeNode("geometryMember", geometry.components[i], node)
                }
                return node
            },
            "geometryMember": function (geometry) {
                var node = this._createElementNSPlus("gml:geometryMember");
                var child = this.writeNode("feature:_geometry", geometry);
                node.appendChild(child.firstChild);
                return node
            }
        },
        "feature": {
            "_typeName": function (feature) {
                var node = this._createElementNSPlus("feature:" + this.featureType, {
                    attributes: {
                        fid: feature.fid
                    }
                });
                if (feature.geometry) {
                    this.writeNode("feature:_geometry", feature.geometry, node)
                }
                for (var name in feature.attributes) {
                    var value = feature.attributes[name];
                    if (value != null) {
                        this.writeNode("feature:_attribute", {
                            name: name,
                            value: value
                        }, node)
                    }
                }
                return node
            },
            "_geometry": function (geometry) {
                if (this.outerProjection && this.innerProjection) {
                    geometry = geometry.clone().transform(this.innerProjection, this.outerProjection)
                }
                var node = this._createElementNSPlus("feature:" + this.geometryName);
                var type = this.geometryTypes[geometry._CLASS_NAME];
                var child = this.writeNode("gml:" + type, geometry, node);
                if (this.srsName) {
                    child.setAttribute("srsName", this.srsName)
                }
                return node
            },
            "_attribute": function (obj) {
                return this._createElementNSPlus("feature:" + obj.name, {
                    value: obj.value
                })
            }
        },
        "wfs": {
            "FeatureCollection": function (features) {
                var node = this._createElementNSPlus("wfs:FeatureCollection");
                for (var i = 0, len = features.length; i < len; ++i) {
                    this.writeNode("gml:featureMember", features[i], node)
                }
                return node
            }
        }
    },
    geometryTypes: {
        "NGeometry.Point": "Point",
        "NGeometry.MultiPoint": "MultiPoint",
        "NGeometry.LineString": "LineString",
        "NGeometry.MultiLineString": "MultiLineString",
        "NGeometry.Polygon": "Polygon",
        "NGeometry.MultiPolygon": "MultiPolygon",
        "NGeometry.Collection": "GeometryCollection"
    },
    _CLASS_NAME: "NParser.GML.Base"
});
NParser.GML.v2 = NObject(NParser.GML.Base, {
    schemaLocation: "http://www.opengis.net/gml http://schemas.opengis.net/gml/2.1.2/feature.xsd",
    construct: function (options) {
        NParser.GML.Base.prototype.construct.apply(this, [options])
    },
    readers: {
        "gml": NUtility.applyDefaults({
            "outerBoundaryIs": function (node, container) {
                var obj = {};
                this.readChildNodes(node, obj);
                container.outer = obj.components[0]
            },
            "innerBoundaryIs": function (node, container) {
                var obj = {};
                this.readChildNodes(node, obj);
                container.inner.push(obj.components[0])
            },
            "Box": function (node, container) {
                var obj = {};
                this.readChildNodes(node, obj);
                if (!container.components) {
                    container.components = []
                }
                var min = obj.points[0];
                var max = obj.points[1];
                container.components.push(new NBounds(min.x, min.y, max.x, max.y))
            }
        }, NParser.GML.Base.prototype.readers["gml"]),
        "feature": NParser.GML.Base.prototype.readers["feature"],
        "wfs": NParser.GML.Base.prototype.readers["wfs"]
    },
    write: function (features) {
        var name;
        if (features instanceof Array) {
            name = "wfs:FeatureCollection"
        } else {
            name = "gml:featureMember"
        }
        var root = this.writeNode(name, features);
        this.setAttributeNS(root, this.namespaces["xsi"], "xsi:schemaLocation", this.schemaLocation);
        return NParser.XML.prototype.write.apply(this, [root])
    },
    writers: {
        "gml": NUtility.applyDefaults({
            "Point": function (geometry) {
                var node = this._createElementNSPlus("gml:Point");
                this.writeNode("coordinates", [geometry], node);
                return node
            },
            "coordinates": function (points) {
                var numPoints = points.length;
                var parts = new Array(numPoints);
                var point;
                for (var i = 0; i < numPoints; ++i) {
                    point = points[i];
                    if (this.xy) {
                        parts[i] = point.x + "," + point.y
                    } else {
                        parts[i] = point.y + "," + point.x
                    }
                    if (point.z != undefined) {
                        parts[i] += "," + point.z
                    }
                }
                return this._createElementNSPlus("gml:coordinates", {
                    attributes: {
                        decimal: ".",
                        cs: ",",
                        ts: " "
                    },
                    value: (numPoints == 1) ? parts[0] : parts.join(" ")
                })
            },
            "LineString": function (geometry) {
                var node = this._createElementNSPlus("gml:LineString");
                this.writeNode("coordinates", geometry.components, node);
                return node
            },
            "Polygon": function (geometry) {
                var node = this._createElementNSPlus("gml:Polygon");
                this.writeNode("outerBoundaryIs", geometry.components[0], node);
                for (var i = 1; i < geometry.components.length; ++i) {
                    this.writeNode("innerBoundaryIs", geometry.components[i], node)
                }
                return node
            },
            "outerBoundaryIs": function (ring) {
                var node = this._createElementNSPlus("gml:outerBoundaryIs");
                this.writeNode("LinearRing", ring, node);
                return node
            },
            "innerBoundaryIs": function (ring) {
                var node = this._createElementNSPlus("gml:innerBoundaryIs");
                this.writeNode("LinearRing", ring, node);
                return node
            },
            "LinearRing": function (ring) {
                var node = this._createElementNSPlus("gml:LinearRing");
                this.writeNode("coordinates", ring.components, node);
                return node
            },
            "Box": function (bounds) {
                var node = this._createElementNSPlus("gml:Box");
                this.writeNode("coordinates", [{
                    x: bounds.left,
                    y: bounds.bottom
                }, {
                    x: bounds.right,
                    y: bounds.top
                }], node);
                if (this.srsName) {
                    node.setAttribute("srsName", this.srsName)
                }
                return node
            }
        }, NParser.GML.Base.prototype.writers["gml"]),
        "feature": NParser.GML.Base.prototype.writers["feature"],
        "wfs": NParser.GML.Base.prototype.writers["wfs"]
    },
    _CLASS_NAME: "NParser.GML.v2"
});
NParser.GML.v3 = NObject(NParser.GML.Base, {
    schemaLocation: "http://www.opengis.net/gml http://schemas.opengis.net/gml/3.1.1/profiles/gmlsfProfile/1.0.0/gmlsf.xsd",
    construct: function (options) {
        NParser.GML.Base.prototype.construct.apply(this, [options])
    },
    readers: {
        "gml": NUtility.applyDefaults({
            "featureMembers": function (node, obj) {
                this.readChildNodes(node, obj)
            },
            "pos": function (node, obj) {
                var str = this.getChildNodeValue(node).replace(this.regExes.trimSpace, "");
                var coords = str.split(this.regExes.splitSpace);
                var point;
                if (this.xy) {
                    point = new NGeometry.Point(coords[0], coords[1], coords[2])
                } else {
                    point = new NGeometry.Point(coords[1], coords[0], coords[2])
                }
                obj.points = [point]
            },
            "posList": function (node, obj) {
                var str = this.concatChildValues(node).replace(this.regExes.trimSpace, "");
                var coords = str.split(this.regExes.splitSpace);
                var dim = parseInt(node.getAttribute("dimension")) || 2;
                var j, x, y, z;
                var numPoints = coords.length / dim;
                var points = new Array(numPoints);
                for (var i = 0, len = coords.length; i < len; i += dim) {
                    x = coords[i];
                    y = coords[i + 1];
                    z = (dim == 2) ? undefined : coords[i + 2];
                    if (this.xy) {
                        points[i / dim] = new NGeometry.Point(x, y, z)
                    } else {
                        points[i / dim] = new NGeometry.Point(y, x, z)
                    }
                }
                obj.points = points
            },
            "exterior": function (node, container) {
                var obj = {};
                this.readChildNodes(node, obj);
                container.outer = obj.components[0]
            },
            "interior": function (node, container) {
                var obj = {};
                this.readChildNodes(node, obj);
                container.inner.push(obj.components[0])
            },
            "MultiSurface": function (node, container) {
                var obj = {
                    components: []
                };
                this.readChildNodes(node, obj);
                if (obj.components.length > 0) {
                    container.components = [new NGeometry.MultiPolygon(obj.components)]
                }
            },
            "surfaceMember": function (node, obj) {
                this.readChildNodes(node, obj)
            },
            "surfaceMembers": function (node, obj) {
                this.readChildNodes(node, obj)
            },
            "pointMembers": function (node, obj) {
                this.readChildNodes(node, obj)
            },
            "lineStringMembers": function (node, obj) {
                this.readChildNodes(node, obj)
            },
            "polygonMembers": function (node, obj) {
                this.readChildNodes(node, obj)
            },
            "geometryMembers": function (node, obj) {
                this.readChildNodes(node, obj)
            },
            "Envelope": function (node, container) {
                var obj = {
                    points: new Array(2)
                };
                this.readChildNodes(node, obj);
                if (!container.components) {
                    container.components = []
                }
                var min = obj.points[0];
                var max = obj.points[1];
                container.components.push(new NBounds(min.x, min.y, max.x, max.y))
            },
            "lowerCorner": function (node, container) {
                var obj = {};
                this.readChildNodes(node, obj)(container.points[0]) = obj.points[0]
            },
            "upperCorner": function (node, container) {
                var obj = {};
                this.readChildNodes(node, obj)(container.points[1]) = obj.points[0]
            }
        }, NParser.GML.Base.prototype.readers["gml"]),
        "feature": NParser.GML.Base.prototype.readers["feature"],
        "wfs": NParser.GML.Base.prototype.readers["wfs"]
    },
    write: function (features) {
        var name;
        if (features instanceof Array) {
            name = "featureMembers"
        } else {
            name = "featureMember"
        }
        var root = this.writeNode("gml:" + name, features);
        this.setAttributeNS(root, this.namespaces["xsi"], "xsi:schemaLocation", this.schemaLocation);
        return NParser.XML.prototype.write.apply(this, [root])
    },
    writers: {
        "gml": NUtility.applyDefaults({
            "featureMembers": function (features) {
                var node = this._createElementNSPlus("gml:featureMembers");
                for (var i = 0, len = features.length; i < len; ++i) {
                    this.writeNode("feature:_typeName", features[i], node)
                }
                return node
            },
            "Point": function (geometry) {
                var node = this._createElementNSPlus("gml:Point");
                this.writeNode("pos", geometry, node);
                return node
            },
            "pos": function (point) {
                var pos = (this.xy) ? (point.x + " " + point.y) : (point.y + " " + point.x);
                return this._createElementNSPlus("gml:pos", {
                    value: pos
                })
            },
            "LineString": function (geometry) {
                var node = this._createElementNSPlus("gml:LineString");
                this.writeNode("posList", geometry.components, node);
                return node
            },
            "posList": function (points) {
                var len = points.length;
                var parts = new Array(len);
                var point;
                for (var i = 0; i < len; ++i) {
                    point = points[i];
                    if (this.xy) {
                        parts[i] = point.x + " " + point.y
                    } else {
                        parts[i] = point.y + " " + point.x
                    }
                }
                return this._createElementNSPlus("gml:posList", {
                    value: parts.join(" ")
                })
            },
            "Polygon": function (geometry) {
                var node = this._createElementNSPlus("gml:Polygon");
                this.writeNode("exterior", geometry.components[0], node);
                for (var i = 1, len = geometry.components.length; i < len; ++i) {
                    this.writeNode("interior", geometry.components[i], node)
                }
                return node
            },
            "exterior": function (ring) {
                var node = this._createElementNSPlus("gml:exterior");
                this.writeNode("LinearRing", ring, node);
                return node
            },
            "interior": function (ring) {
                var node = this._createElementNSPlus("gml:interior");
                this.writeNode("LinearRing", ring, node);
                return node
            },
            "LinearRing": function (ring) {
                var node = this._createElementNSPlus("gml:LinearRing");
                this.writeNode("posList", ring.components, node);
                return node
            },
            "Envelope": function (bounds) {
                var node = this._createElementNSPlus("gml:Envelope");
                this.writeNode("lowerCorner", bounds, node);
                this.writeNode("upperCorner", bounds, node);
                if (this.srsName) {
                    node.setAttribute("srsName", this.srsName)
                }
                return node
            },
            "lowerCorner": function (bounds) {
                var node = this._createElementNSPlus("gml:lowerCorner");
                this.writeNode("pos", {
                    x: bounds.left,
                    y: bounds.bottom
                }, node);
                return node
            },
            "upperCorner": function (bounds) {
                var node = this._createElementNSPlus("gml:upperCorner");
                this.writeNode("pos", {
                    x: bounds.right,
                    y: bounds.top
                }, node);
                return node
            }
        }, NParser.GML.Base.prototype.writers["gml"]),
        "feature": NParser.GML.Base.prototype.writers["feature"],
        "wfs": NParser.GML.Base.prototype.writers["wfs"]
    },
    _CLASS_NAME: "NParser.GML.v3"
});
NParser.KML = NObject(NParser.XML, {
    _kmlns: "http://earth.google.com/kml/2.0",
    placemarksDesc: "No description available",
    foldersName: "NewMap export",
    foldersDesc: "Exported on " + new Date(),
    getAttributes: true,
    extractStyles: false,
    internalns: null,
    features: null,
    styles: null,
    styleBaseUrl: "",
    fetched: null,
    maxDepth: 0,
    construct: function (options) {
        this.regExes = {
            trimSpace: (/^\s*|\s*$/g),
            removeSpace: (/\s*/g),
            splitSpace: (/\s+/),
            trimComma: (/\s*,\s*/g),
            kmlColor: (/(\w{2})(\w{2})(\w{2})(\w{2})/),
            kmlIconPalette: (/root:\/\/icons\/palette-(\d+)(\.\w+)/),
            straightBracket: (/\$\[(.*?)\]/g)
        };
        NParser.XML.prototype.construct.apply(this, [options])
    },
    read: function (data) {
        this.features = [];
        this.styles = {};
        this.fetched = {};
        var options = {
            depth: this.maxDepth,
            styleBaseUrl: this.styleBaseUrl
        };
        return this.parseData(data, options)
    },
    parseData: function (data, options) {
        if (typeof data == "string") {
            data = NParser.XML.prototype.read.apply(this, [data])
        }
        var types = ["Link", "NetworkLink", "Style", "StyleMap", "Placemark"];
        for (var i = 0, len = types.length; i < len; ++i) {
            var type = types[i];
            var nodes = this.getElementsByTagNameNS(data, "*", type);
            if (nodes.length == 0) {
                continue
            }
            switch (type.toLowerCase()) {
            case "link":
            case "networklink":
                this.parseLinks(nodes, options);
                break;
            case "style":
                if (this.extractStyles) {
                    this.parseStyles(nodes, options)
                }
                break;
            case "stylemap":
                if (this.extractStyles) {
                    this.parseStyleMaps(nodes, options)
                }
                break;
            case "placemark":
                this.parseFeatures(nodes, options);
                break
            }
        }
        return this.features
    },
    parseLinks: function (nodes, options) {
        if (options.depth >= this.maxDepth) {
            return false
        }
        var newOptions = NUtility.extend({}, options);
        newOptions.depth++;
        for (var i = 0, len = nodes.length; i < len; i++) {
            var href = this.parseProperty(nodes[i], "*", "href");
            if (href && !this.fetched[href]) {
                this.fetched[href] = true;
                var data = this.fetchLink(href);
                if (data) {
                    this.parseData(data, newOptions)
                }
            }
        }
    },
    fetchLink: function (href) {
        var request = NRequest.GET({
            url: href,
            async: false
        });
        if (request) {
            return request.responseText
        }
    },
    parseStyles: function (nodes, options) {
        for (var i = 0, len = nodes.length; i < len; i++) {
            var style = this.parseStyle(nodes[i]);
            if (style) {
                styleName = (options.styleBaseUrl || "") + "#" + style.id;
                this.styles[styleName] = style
            }
        }
    },
    parseStyle: function (node) {
        var style = {};
        var types = ["LineStyle", "PolyStyle", "IconStyle", "BalloonStyle"];
        var type, nodeList, geometry, parser;
        for (var i = 0, len = types.length; i < len; ++i) {
            type = types[i];
            styleTypeNode = this.getElementsByTagNameNS(node, "*", type)[0];
            if (!styleTypeNode) {
                continue
            }
            switch (type.toLowerCase()) {
            case "linestyle":
                var color = this.parseProperty(styleTypeNode, "*", "color");
                if (color) {
                    var matches = (color.toString()).match(this.regExes.kmlColor);
                    var alpha = matches[1];
                    style["strokeOpacity"] = parseInt(alpha, 16) / 255;
                    var b = matches[2];
                    var g = matches[3];
                    var r = matches[4];
                    style["strokeColor"] = "#" + r + g + b
                }
                var width = this.parseProperty(styleTypeNode, "*", "width");
                if (width) {
                    style["strokeWidth"] = width
                }
            case "polystyle":
                var color = this.parseProperty(styleTypeNode, "*", "color");
                if (color) {
                    var matches = (color.toString()).match(this.regExes.kmlColor);
                    var alpha = matches[1];
                    style["fillOpacity"] = parseInt(alpha, 16) / 255;
                    var b = matches[2];
                    var g = matches[3];
                    var r = matches[4];
                    style["fillColor"] = "#" + r + g + b
                }
                break;
            case "iconstyle":
                var scale = parseFloat(this.parseProperty(styleTypeNode, "*", "scale") || 1);
                var width = 32 * scale;
                var height = 32 * scale;
                var iconNode = this.getElementsByTagNameNS(styleTypeNode, "*", "Icon")[0];
                if (iconNode) {
                    var href = this.parseProperty(iconNode, "*", "href");
                    if (href) {
                        var w = this.parseProperty(iconNode, "*", "w");
                        var h = this.parseProperty(iconNode, "*", "h");
                        var google = "http://maps.google.com/mapfiles/kml";
                        if (NString.startsWith(href, google) && !w && !h) {
                            w = 64;
                            h = 64;
                            scale = scale / 2
                        }
                        w = w || h;
                        h = h || w;
                        if (w) {
                            width = parseInt(w) * scale
                        }
                        if (h) {
                            height = parseInt(h) * scale
                        }
                        var matches = href.match(this.regExes.kmlIconPalette);
                        if (matches) {
                            var palette = matches[1];
                            var file_extension = matches[2];
                            var x = this.parseProperty(iconNode, "*", "x");
                            var y = this.parseProperty(iconNode, "*", "y");
                            var posX = x ? x / 32 : 0;
                            var posY = y ? (7 - y / 32) : 7;
                            var pos = posY * 8 + posX;
                            href = "http://maps.google.com/mapfiles/kml/pal" + palette + "/icon" + pos + file_extension
                        }
                        style["graphicOpacity"] = 1;
                        style["externalGraphic"] = href
                    }
                }
                var hotSpotNode = this.getElementsByTagNameNS(styleTypeNode, "*", "hotSpot")[0];
                if (hotSpotNode) {
                    var x = parseFloat(hotSpotNode.getAttribute("x"));
                    var y = parseFloat(hotSpotNode.getAttribute("y"));
                    var xUnits = hotSpotNode.getAttribute("xunits");
                    if (xUnits == "pixels") {
                        style["graphicXOffset"] = -x * scale
                    } else if (xUnits == "insetPixels") {
                        style["graphicXOffset"] = -width + (x * scale)
                    } else if (xUnits == "fraction") {
                        style["graphicXOffset"] = -width * x
                    }
                    var yUnits = hotSpotNode.getAttribute("yunits");
                    if (yUnits == "pixels") {
                        style["graphicYOffset"] = -height + (y * scale) + 1
                    } else if (yUnits == "insetPixels") {
                        style["graphicYOffset"] = -(y * scale) + 1
                    } else if (yUnits == "fraction") {
                        style["graphicYOffset"] = -height * (1 - y) + 1
                    }
                }
                style["graphicWidth"] = width;
                style["graphicHeight"] = height;
                break;
            case "balloonstyle":
                var balloonStyle = NUtility.getXmlNodeValue(styleTypeNode);
                if (balloonStyle) {
                    style["balloonStyle"] = balloonStyle.replace(this.regExes.straightBracket, "${$1}")
                }
                break;
            default:
            }
        }
        if (!style["strokeColor"] && style["fillColor"]) {
            style["strokeColor"] = style["fillColor"]
        }
        var id = node.getAttribute("id");
        if (id && style) {
            style.id = id
        }
        return style
    },
    parseStyleMaps: function (nodes, options) {
        for (var i = 0, len = nodes.length; i < len; i++) {
            var node = nodes[i];
            var pairs = this.getElementsByTagNameNS(node, "*", "Pair");
            var id = node.getAttribute("id");
            for (var j = 0, jlen = pairs.length; j < jlen; j++) {
                var pair = pairs[j];
                var key = this.parseProperty(pair, "*", "key");
                var styleUrl = this.parseProperty(pair, "*", "styleUrl");
                if (styleUrl && key == "normal") {
                    this.styles[(options.styleBaseUrl || "") + "#" + id] = this.styles[(options.styleBaseUrl || "") + styleUrl]
                }
                if (styleUrl && key == "highlight") {}
            }
        }
    },
    parseFeatures: function (nodes, options) {
        var features = new Array(nodes.length);
        for (var i = 0, len = nodes.length; i < len; i++) {
            var featureNode = nodes[i];
            var feature = this.parseFeature.apply(this, [featureNode]);
            if (feature) {
                if (this.extractStyles && feature.attributes && feature.attributes.styleUrl) {
                    feature.style = this.getStyle(feature.attributes.styleUrl)
                }
                if (this.extractStyles) {
                    var inlineStyleNode = this.getElementsByTagNameNS(featureNode, "*", "Style")[0];
                    if (inlineStyleNode) {
                        var inlineStyle = this.parseStyle(inlineStyleNode);
                        if (inlineStyle) {
                            feature.style = NUtility.extend(feature.style, inlineStyle)
                        }
                    }
                }
                features[i] = feature
            } else {
                throw "Bad Placemark: " + i
            }
        }
        this.features = this.features.concat(features)
    },
    parseFeature: function (node) {
        var order = ["MultiGeometry", "Polygon", "LineString", "Point"];
        var type, nodeList, geometry, parser;
        for (var i = 0, len = order.length; i < len; ++i) {
            type = order[i];
            this.internalns = node.namespaceURI ? node.namespaceURI : this._kmlns;
            nodeList = this.getElementsByTagNameNS(node, this.internalns, type);
            if (nodeList.length > 0) {
                var parser = this.parseGeometry[type.toLowerCase()];
                if (parser) {
                    geometry = parser.apply(this, [nodeList[0]]);
                    if (this.innerProjection && this.outerProjection) {
                        geometry.transform(this.outerProjection, this.innerProjection)
                    }
                } else {
                    NLog.error(NMGISLG("unsupportedGeometryType", {
                        'geomType': type
                    }))
                }
                break
            }
        }
        var attributes;
        if (this.getAttributes) {
            attributes = this.parseAttributes(node)
        }
        var feature = new NVectorFeature(geometry, attributes);
        var fid = node.getAttribute("id") || node.getAttribute("name");
        if (fid != null) {
            feature.fid = fid
        }
        return feature
    },
    getStyle: function (styleUrl, options) {
        var styleBaseUrl = NUtility.removeTail(styleUrl);
        var newOptions = NUtility.extend({}, options);
        newOptions.depth++;
        newOptions.styleBaseUrl = styleBaseUrl;
        if (!this.styles[styleUrl] && !NString.startsWith(styleUrl, "#") && newOptions.depth <= this.maxDepth && !this.fetched[styleBaseUrl]) {
            var data = this.fetchLink(styleBaseUrl);
            if (data) {
                this.parseData(data, newOptions)
            }
        }
        var style = this.styles[styleUrl];
        return style
    },
    parseGeometry: {
        point: function (node) {
            var nodeList = this.getElementsByTagNameNS(node, this.internalns, "coordinates");
            var coords = [];
            if (nodeList.length > 0) {
                var coordString = nodeList[0].firstChild.nodeValue;
                coordString = coordString.replace(this.regExes.removeSpace, "");
                coords = coordString.split(",")
            }
            var point = null;
            if (coords.length > 1) {
                if (coords.length == 2) {
                    coords[2] = null
                }
                point = new NGeometry.Point(coords[0], coords[1], coords[2])
            } else {
                throw "Bad coordinate string: " + coordString
            }
            return point
        },
        linestring: function (node, ring) {
            var nodeList = this.getElementsByTagNameNS(node, this.internalns, "coordinates");
            var line = null;
            if (nodeList.length > 0) {
                var coordString = this.concatChildValues(nodeList[0]);
                coordString = coordString.replace(this.regExes.trimSpace, "");
                coordString = coordString.replace(this.regExes.trimComma, ",");
                var pointList = coordString.split(this.regExes.splitSpace);
                var numPoints = pointList.length;
                var points = new Array(numPoints);
                var coords, numCoords;
                for (var i = 0; i < numPoints; ++i) {
                    coords = pointList[i].split(",");
                    numCoords = coords.length;
                    if (numCoords > 1) {
                        if (coords.length == 2) {
                            coords[2] = null
                        }
                        points[i] = new NGeometry.Point(coords[0], coords[1], coords[2])
                    } else {
                        throw "Bad LineString point coordinates: " + pointList[i]
                    }
                }
                if (numPoints) {
                    if (ring) {
                        line = new NGeometry.LinearRing(points)
                    } else {
                        line = new NGeometry.LineString(points)
                    }
                } else {
                    throw "Bad LineString coordinates: " + coordString
                }
            }
            return line
        },
        polygon: function (node) {
            var nodeList = this.getElementsByTagNameNS(node, this.internalns, "LinearRing");
            var numRings = nodeList.length;
            var components = new Array(numRings);
            if (numRings > 0) {
                var ring;
                for (var i = 0, len = nodeList.length; i < len; ++i) {
                    ring = this.parseGeometry.linestring.apply(this, [nodeList[i], true]);
                    if (ring) {
                        components[i] = ring
                    } else {
                        throw "Bad LinearRing geometry: " + i
                    }
                }
            }
            return new NGeometry.Polygon(components)
        },
        multigeometry: function (node) {
            var child, parser;
            var parts = [];
            var children = node.childNodes;
            for (var i = 0, len = children.length; i < len; ++i) {
                child = children[i];
                if (child.nodeType == 1) {
                    var type = (child.prefix) ? child.nodeName.split(":")[1] : child.nodeName;
                    var parser = this.parseGeometry[type.toLowerCase()];
                    if (parser) {
                        parts.push(parser.apply(this, [child]))
                    }
                }
            }
            return new NGeometry.Collection(parts)
        }
    },
    parseAttributes: function (node) {
        var attributes = {};
        var child, grandchildren, grandchild;
        var children = node.childNodes;
        for (var i = 0, len = children.length; i < len; ++i) {
            child = children[i];
            if (child.nodeType == 1) {
                grandchildren = child.childNodes;
                if (grandchildren.length == 1 || grandchildren.length == 3) {
                    var grandchild;
                    switch (grandchildren.length) {
                    case 1:
                        grandchild = grandchildren[0];
                        break;
                    case 3:
                    default:
                        grandchild = grandchildren[1];
                        break
                    }
                    if (grandchild.nodeType == 3 || grandchild.nodeType == 4) {
                        var name = (child.prefix) ? child.nodeName.split(":")[1] : child.nodeName;
                        var value = NUtility.getXmlNodeValue(grandchild);
                        if (value) {
                            value = value.replace(this.regExes.trimSpace, "");
                            attributes[name] = value
                        }
                    }
                }
            }
        }
        return attributes
    },
    parseProperty: function (xmlNode, namespace, tagName) {
        var value;
        var nodeList = this.getElementsByTagNameNS(xmlNode, namespace, tagName);
        try {
            value = NUtility.getXmlNodeValue(nodeList[0])
        } catch (e) {
            value = null
        }
        return value
    },
    write: function (features) {
        if (!(features instanceof Array)) {
            features = [features]
        }
        var kml = this.createElementNS(this._kmlns, "kml");
        var folder = this.createFolderXML();
        for (var i = 0, len = features.length; i < len; ++i) {
            folder.appendChild(this.createPlacemarkXML(features[i]))
        }
        kml.appendChild(folder);
        return NParser.XML.prototype.write.apply(this, [kml])
    },
    createFolderXML: function () {
        var folderName = this.createElementNS(this._kmlns, "name");
        var folderNameText = this.createTextNode(this.foldersName);
        folderName.appendChild(folderNameText);
        var folderDesc = this.createElementNS(this._kmlns, "description");
        var folderDescText = this.createTextNode(this.foldersDesc);
        folderDesc.appendChild(folderDescText);
        var folder = this.createElementNS(this._kmlns, "Folder");
        folder.appendChild(folderName);
        folder.appendChild(folderDesc);
        return folder
    },
    createPlacemarkXML: function (feature) {
        var placemarkName = this.createElementNS(this._kmlns, "name");
        var name = (feature.attributes.name) ? feature.attributes.name : feature.id;
        placemarkName.appendChild(this.createTextNode(name));
        var placemarkDesc = this.createElementNS(this._kmlns, "description");
        var desc = (feature.attributes.description) ? feature.attributes.description : this.placemarksDesc;
        placemarkDesc.appendChild(this.createTextNode(desc));
        var placemarkNode = this.createElementNS(this._kmlns, "Placemark");
        if (feature.fid != null) {
            placemarkNode.setAttribute("id", feature.fid)
        }
        placemarkNode.appendChild(placemarkName);
        placemarkNode.appendChild(placemarkDesc);
        var geometryNode = this.createGeometryNode(feature.geometry);
        placemarkNode.appendChild(geometryNode);
        return placemarkNode
    },
    createGeometryNode: function (geometry) {
        if (this.innerProjection && this.outerProjection) {
            geometry = geometry.clone();
            geometry.transform(this.innerProjection, this.outerProjection)
        }
        var className = geometry._CLASS_NAME;
        var type = className.substring(className.lastIndexOf(".") + 1);
        var builder = this.buildGeometry[type.toLowerCase()];
        var node = null;
        if (builder) {
            node = builder.apply(this, [geometry])
        }
        return node
    },
    buildGeometry: {
        point: function (geometry) {
            var kml = this.createElementNS(this._kmlns, "Point");
            kml.appendChild(this.createCoordinatesNode(geometry));
            return kml
        },
        multipoint: function (geometry) {
            return this.buildGeometry.collection.apply(this, [geometry])
        },
        linestring: function (geometry) {
            var kml = this.createElementNS(this._kmlns, "LineString");
            kml.appendChild(this.createCoordinatesNode(geometry));
            return kml
        },
        multilinestring: function (geometry) {
            return this.buildGeometry.collection.apply(this, [geometry])
        },
        linearring: function (geometry) {
            var kml = this.createElementNS(this._kmlns, "LinearRing");
            kml.appendChild(this.createCoordinatesNode(geometry));
            return kml
        },
        polygon: function (geometry) {
            var kml = this.createElementNS(this._kmlns, "Polygon");
            var rings = geometry.components;
            var ringMember, ringGeom, type;
            for (var i = 0, len = rings.length; i < len; ++i) {
                type = (i == 0) ? "outerBoundaryIs" : "innerBoundaryIs";
                ringMember = this.createElementNS(this._kmlns, type);
                ringGeom = this.buildGeometry.linearring.apply(this, [rings[i]]);
                ringMember.appendChild(ringGeom);
                kml.appendChild(ringMember)
            }
            return kml
        },
        multipolygon: function (geometry) {
            return this.buildGeometry.collection.apply(this, [geometry])
        },
        collection: function (geometry) {
            var kml = this.createElementNS(this._kmlns, "MultiGeometry");
            var child;
            for (var i = 0, len = geometry.components.length; i < len; ++i) {
                child = this.createGeometryNode.apply(this, [geometry.components[i]]);
                if (child) {
                    kml.appendChild(child)
                }
            }
            return kml
        }
    },
    createCoordinatesNode: function (geometry) {
        var coordinatesNode = this.createElementNS(this._kmlns, "coordinates");
        var path;
        var points = geometry.components;
        if (points) {
            var point;
            var numPoints = points.length;
            var parts = new Array(numPoints);
            for (var i = 0; i < numPoints; ++i) {
                point = points[i];
                parts[i] = point.x + "," + point.y
            }
            path = parts.join(" ")
        } else {
            path = geometry.x + "," + geometry.y
        }
        var txtNode = this.createTextNode(path);
        coordinatesNode.appendChild(txtNode);
        return coordinatesNode
    },
    _CLASS_NAME: "NParser.KML"
});
NParser.GeoRSS = NObject(NParser.XML, {
    _rssns: "http://backend.userland.com/rss2",
    _featurens: "http://mapserver.gis.umn.edu/mapserver",
    _georssns: "http://www.georss.org/georss",
    _geons: "http://www.w3.org/2003/01/geo/wgs84_pos#",
    defaultTitle: "Untitled",
    featureDescription: "No Description",
    gmlParser: null,
    xy: false,
    construct: function (options) {
        NParser.XML.prototype.construct.apply(this, [options])
    },
    getGeometryFromItem: function (item) {
        var point = this.getElementsByTagNameNS(item, this._georssns, "point");
        var lat = this.getElementsByTagNameNS(item, this._geons, 'lat');
        var lon = this.getElementsByTagNameNS(item, this._geons, 'long');
        var line = this.getElementsByTagNameNS(item, this._georssns, "line");
        var polygon = this.getElementsByTagNameNS(item, this._georssns, "polygon");
        var where = this.getElementsByTagNameNS(item, this._georssns, "where");
        if (point.length > 0 || (lat.length > 0 && lon.length > 0)) {
            var location;
            if (point.length > 0) {
                location = NString.trim(point[0].firstChild.nodeValue).split(/\s+/);
                if (location.length != 2) {
                    location = NString.trim(point[0].firstChild.nodeValue).split(/\s*,\s*/)
                }
            } else {
                location = [parseFloat(lat[0].firstChild.nodeValue), parseFloat(lon[0].firstChild.nodeValue)]
            }
            var geometry = new NGeometry.Point(parseFloat(location[1]), parseFloat(location[0]))
        } else if (line.length > 0) {
            var coords = NString.trim(this.concatChildValues(line[0])).split(/\s+/);
            var components = [];
            var point;
            for (var i = 0, len = coords.length; i < len; i += 2) {
                point = new NGeometry.Point(parseFloat(coords[i + 1]), parseFloat(coords[i]));
                components.push(point)
            }
            geometry = new NGeometry.LineString(components)
        } else if (polygon.length > 0) {
            var coords = NString.trim(this.concatChildValues(polygon[0])).split(/\s+/);
            var components = [];
            var point;
            for (var i = 0, len = coords.length; i < len; i += 2) {
                point = new NGeometry.Point(parseFloat(coords[i + 1]), parseFloat(coords[i]));
                components.push(point)
            }
            geometry = new NGeometry.Polygon([new NGeometry.LinearRing(components)])
        } else if (where.length > 0) {
            if (!this.gmlParser) {
                this.gmlParser = new NParser.GML({
                    'xy': this.xy
                })
            }
            var feature = this.gmlParser.parseFeature(where[0]);
            geometry = feature.geometry
        }
        if (geometry && this.innerProjection && this.outerProjection) {
            geometry.transform(this.outerProjection, this.innerProjection)
        }
        return geometry
    },
    getFeatureFromItem: function (item) {
        var geometry = this.getGeometryFromItem(item);
        var title = this.getChildNodeValue(item, "*", "title", this.defaultTitle);
        var description = this.getChildNodeValue(item, "*", "description", this.getChildNodeValue(item, "*", "content", this.featureDescription));
        var link = this.getChildNodeValue(item, "*", "link");
        if (!link) {
            try {
                link = this.getElementsByTagNameNS(item, "*", "link")[0].getAttribute("href")
            } catch (e) {
                link = null
            }
        }
        var id = this.getChildNodeValue(item, "*", "id", null);
        var data = {
            "title": title,
            "description": description,
            "link": link
        };
        var feature = new NVectorFeature(geometry, data);
        feature.fid = id;
        return feature
    },
    getChildNodeValue: function (node, nsuri, name, def) {
        var value;
        var eles = this.getElementsByTagNameNS(node, nsuri, name);
        if (eles && eles[0] && eles[0].firstChild && eles[0].firstChild.nodeValue) {
            value = eles[0].firstChild.nodeValue
        } else {
            value = (def == undefined) ? "" : def
        }
        return value
    },
    read: function (doc) {
        if (typeof doc == "string") {
            doc = NParser.XML.prototype.read.apply(this, [doc])
        }
        var itemlist = null;
        itemlist = this.getElementsByTagNameNS(doc, '*', 'item');
        if (itemlist.length == 0) {
            itemlist = this.getElementsByTagNameNS(doc, '*', 'entry')
        }
        var numItems = itemlist.length;
        var features = new Array(numItems);
        for (var i = 0; i < numItems; i++) {
            features[i] = this.getFeatureFromItem(itemlist[i])
        }
        return features
    },
    write: function (features) {
        var georss;
        if (features instanceof Array) {
            georss = this.createElementNS(this._rssns, "rss");
            for (var i = 0, len = features.length; i < len; i++) {
                georss.appendChild(this.createFeatureXML(features[i]))
            }
        } else {
            georss = this.createFeatureXML(features)
        }
        return NParser.XML.prototype.write.apply(this, [georss])
    },
    createFeatureXML: function (feature) {
        var geometryNode = this.createGeometryNode(feature.geometry);
        var featureNode = this.createElementNS(this._rssns, "item");
        var titleNode = this.createElementNS(this._rssns, "title");
        titleNode.appendChild(this.createTextNode(feature.attributes.title ? feature.attributes.title : ""));
        var descNode = this.createElementNS(this._rssns, "description");
        descNode.appendChild(this.createTextNode(feature.attributes.description ? feature.attributes.description : ""));
        featureNode.appendChild(titleNode);
        featureNode.appendChild(descNode);
        if (feature.attributes.link) {
            var linkNode = this.createElementNS(this._rssns, "link");
            linkNode.appendChild(this.createTextNode(feature.attributes.link));
            featureNode.appendChild(linkNode)
        }
        for (var attr in feature.attributes) {
            if (attr == "link" || attr == "title" || attr == "description") {
                continue
            }
            var attrText = this.createTextNode(feature.attributes[attr]);
            var nodename = attr;
            if (attr.search(":") != -1) {
                nodename = attr.split(":")[1]
            }
            var attrContainer = this.createElementNS(this._featurens, "feature:" + nodename);
            attrContainer.appendChild(attrText);
            featureNode.appendChild(attrContainer)
        }
        featureNode.appendChild(geometryNode);
        return featureNode
    },
    createGeometryNode: function (geometry) {
        if (this.innerProjection && this.outerProjection) {
            geometry = geometry.clone();
            geometry.transform(this.innerProjection, this.outerProjection)
        }
        var node;
        if (geometry._CLASS_NAME == "NGeometry.Polygon") {
            node = this.createElementNS(this._georssns, 'georss:polygon');
            node.appendChild(this.createCoordinatesNode(geometry.components[0]))
        } else if (geometry._CLASS_NAME == "NGeometry.LineString") {
            node = this.createElementNS(this._georssns, 'georss:line');
            node.appendChild(this.createCoordinatesNode(geometry))
        } else if (geometry._CLASS_NAME == "NGeometry.Point") {
            node = this.createElementNS(this._georssns, 'georss:point');
            node.appendChild(this.createCoordinatesNode(geometry))
        } else {
            throw "Couldn't parse " + geometry._CLASS_NAME
        }
        return node
    },
    createCoordinatesNode: function (geometry) {
        var points = null;
        if (geometry.components) {
            points = geometry.components
        }
        var path;
        if (points) {
            var numPoints = points.length;
            var parts = new Array(numPoints);
            for (var i = 0; i < numPoints; i++) {
                parts[i] = points[i].y + " " + points[i].x
            }
            path = parts.join(" ")
        } else {
            path = geometry.y + " " + geometry.x
        }
        return this.createTextNode(path)
    },
    _CLASS_NAME: "NParser.GeoRSS"
});
NParser.WFS = NObject(NParser.GML, {
    layer: null,
    _wfsns: "http://www.opengis.net/wfs",
    _ogcns: "http://www.opengis.net/ogc",
    construct: function (options, layer) {
        NParser.GML.prototype.construct.apply(this, [options]);
        this.layer = layer;
        if (this.layer._featurens) {
            this._featurens = this.layer._featurens
        }
        if (this.layer.options.geometry_column) {
            this.geometryName = this.layer.options.geometry_column
        }
        if (this.layer.options.typename) {
            this.featureName = this.layer.options.typename
        }
    },
    write: function (features) {
        var transaction = this.createElementNS(this._wfsns, 'wfs:Transaction');
        transaction.setAttribute("version", "1.0.0");
        transaction.setAttribute("service", "WFS");
        for (var i = 0; i < features.length; i++) {
            switch (features[i].state) {
            case NEditState.INSERT:
                transaction.appendChild(this.insert(features[i]));
                break;
            case NEditState.UPDATE:
                transaction.appendChild(this.update(features[i]));
                break;
            case NEditState.DELETE:
                transaction.appendChild(this.remove(features[i]));
                break
            }
        }
        return NParser.XML.prototype.write.apply(this, [transaction])
    },
    createFeatureXML: function (feature) {
        var geometryNode = this.createGeometryNode(feature.geometry);
        var geomContainer = this.createElementNS(this._featurens, "feature:" + this.geometryName);
        geomContainer.appendChild(geometryNode);
        var featureContainer = this.createElementNS(this._featurens, "feature:" + this.featureName);
        featureContainer.appendChild(geomContainer);
        for (var attr in feature.attributes) {
            var attrText = this.createTextNode(feature.attributes[attr]);
            var nodename = attr;
            if (attr.search(":") != -1) {
                nodename = attr.split(":")[1]
            }
            var attrContainer = this.createElementNS(this._featurens, "feature:" + nodename);
            attrContainer.appendChild(attrText);
            featureContainer.appendChild(attrContainer)
        }
        return featureContainer
    },
    insert: function (feature) {
        var insertNode = this.createElementNS(this._wfsns, 'wfs:Insert');
        insertNode.appendChild(this.createFeatureXML(feature));
        return insertNode
    },
    update: function (feature) {
        if (!feature.fid) {
            NLog.userError(NMGISLG("noFID"))
        }
        var updateNode = this.createElementNS(this._wfsns, 'wfs:Update');
        updateNode.setAttribute("typeName", this.layerName);
        var propertyNode = this.createElementNS(this._wfsns, 'wfs:Property');
        var nameNode = this.createElementNS(this._wfsns, 'wfs:Name');
        var txtNode = this.createTextNode(this.geometryName);
        nameNode.appendChild(txtNode);
        propertyNode.appendChild(nameNode);
        var valueNode = this.createElementNS(this._wfsns, 'wfs:Value');
        var geometryNode = this.createGeometryNode(feature.geometry);
        if (feature.layer) {
            geometryNode.setAttribute("srsName", feature.layer.projection.getCode())
        }
        valueNode.appendChild(geometryNode);
        propertyNode.appendChild(valueNode);
        updateNode.appendChild(propertyNode);
        for (var propName in feature.attributes) {
            propertyNode = this.createElementNS(this._wfsns, 'wfs:Property');
            nameNode = this.createElementNS(this._wfsns, 'wfs:Name');
            nameNode.appendChild(this.createTextNode(propName));
            propertyNode.appendChild(nameNode);
            valueNode = this.createElementNS(this._wfsns, 'wfs:Value');
            valueNode.appendChild(this.createTextNode(feature.attributes[propName]));
            propertyNode.appendChild(valueNode);
            updateNode.appendChild(propertyNode)
        }
        var filterNode = this.createElementNS(this._ogcns, 'ogc:Filter');
        var filterIdNode = this.createElementNS(this._ogcns, 'ogc:FeatureId');
        filterIdNode.setAttribute("fid", feature.fid);
        filterNode.appendChild(filterIdNode);
        updateNode.appendChild(filterNode);
        return updateNode
    },
    remove: function (feature) {
        if (!feature.fid) {
            NLog.userError(NMGISLG("noFID"));
            return false
        }
        var deleteNode = this.createElementNS(this._wfsns, 'wfs:Delete');
        deleteNode.setAttribute("typeName", this.layerName);
        var filterNode = this.createElementNS(this._ogcns, 'ogc:Filter');
        var filterIdNode = this.createElementNS(this._ogcns, 'ogc:FeatureId');
        filterIdNode.setAttribute("fid", feature.fid);
        filterNode.appendChild(filterIdNode);
        deleteNode.appendChild(filterNode);
        return deleteNode
    },
    dispose: function () {
        this.layer = null
    },
    _CLASS_NAME: "NParser.WFS"
});
NParser.WKT = NObject(NParser, {
    construct: function (options) {
        this.regExes = {
            'typeStr': /^\s*(\w+)\s*\(\s*(.*)\s*\)\s*$/,
            'spaces': /\s+/,
            'parenComma': /\)\s*,\s*\(/,
            'doubleParenComma': /\)\s*\)\s*,\s*\(\s*\(/,
            'trimParens': /^\s*\(?(.*?)\)?\s*$/
        };
        NParser.prototype.construct.apply(this, [options])
    },
    read: function (wkt) {
        var features, type, str;
        var matches = this.regExes.typeStr.exec(wkt);
        if (matches) {
            type = matches[1].toLowerCase();
            str = matches[2];
            if (this.parse[type]) {
                features = this.parse[type].apply(this, [str])
            }
            if (this.innerProjection && this.outerProjection) {
                if (features && features._CLASS_NAME == "NVectorFeature") {
                    features.geometry.transform(this.outerProjection, this.innerProjection)
                } else if (features && type != "geometrycollection" && typeof features == "object") {
                    for (var i = 0, len = features.length; i < len; i++) {
                        var component = features[i];
                        component.geometry.transform(this.outerProjection, this.innerProjection)
                    }
                }
            }
        }
        return features
    },
    write: function (features) {
        var collection, geometry, type, data, isCollection;
        if (features.constructor == Array) {
            collection = features;
            isCollection = true
        } else {
            collection = [features];
            isCollection = false
        }
        var pieces = [];
        if (isCollection) {
            pieces.push('GEOMETRYCOLLECTION(')
        }
        for (var i = 0, len = collection.length; i < len; ++i) {
            if (isCollection && i > 0) {
                pieces.push(',')
            }
            geometry = collection[i].geometry;
            type = geometry._CLASS_NAME.split('.')[1].toLowerCase();
            if (!this.extract[type]) {
                return null
            }
            if (this.innerProjection && this.outerProjection) {
                geometry = geometry.clone();
                geometry.transform(this.innerProjection, this.outerProjection)
            }
            data = this.extract[type].apply(this, [geometry]);
            pieces.push(type.toUpperCase() + '(' + data + ')')
        }
        if (isCollection) {
            pieces.push(')')
        }
        return pieces.join('')
    },
    extract: {
        'point': function (point) {
            return point.x + ' ' + point.y
        },
        'multipoint': function (multipoint) {
            var array = [];
            for (var i = 0, len = multipoint.components.length; i < len; ++i) {
                array.push(this.extract.point.apply(this, [multipoint.components[i]]))
            }
            return array.join(',')
        },
        'linestring': function (linestring) {
            var array = [];
            for (var i = 0, len = linestring.components.length; i < len; ++i) {
                array.push(this.extract.point.apply(this, [linestring.components[i]]))
            }
            return array.join(',')
        },
        'multilinestring': function (multilinestring) {
            var array = [];
            for (var i = 0, len = multilinestring.components.length; i < len; ++i) {
                array.push('(' + this.extract.linestring.apply(this, [multilinestring.components[i]]) + ')')
            }
            return array.join(',')
        },
        'polygon': function (polygon) {
            var array = [];
            for (var i = 0, len = polygon.components.length; i < len; ++i) {
                array.push('(' + this.extract.linestring.apply(this, [polygon.components[i]]) + ')')
            }
            return array.join(',')
        },
        'multipolygon': function (multipolygon) {
            var array = [];
            for (var i = 0, len = multipolygon.components.length; i < len; ++i) {
                array.push('(' + this.extract.polygon.apply(this, [multipolygon.components[i]]) + ')')
            }
            return array.join(',')
        }
    },
    parse: {
        'point': function (str) {
            var coords = NString.trim(str).split(this.regExes.spaces);
            return new NVectorFeature(new NGeometry.Point(coords[0], coords[1]))
        },
        'multipoint': function (str) {
            var points = NString.trim(str).split(',');
            var components = [];
            for (var i = 0, len = points.length; i < len; ++i) {
                components.push(this.parse.point.apply(this, [points[i]]).geometry)
            }
            return new NVectorFeature(new NGeometry.MultiPoint(components))
        },
        'linestring': function (str) {
            var points = NString.trim(str).split(',');
            var components = [];
            for (var i = 0, len = points.length; i < len; ++i) {
                components.push(this.parse.point.apply(this, [points[i]]).geometry)
            }
            return new NVectorFeature(new NGeometry.LineString(components))
        },
        'multilinestring': function (str) {
            var line;
            var lines = NString.trim(str).split(this.regExes.parenComma);
            var components = [];
            for (var i = 0, len = lines.length; i < len; ++i) {
                line = lines[i].replace(this.regExes.trimParens, '$1');
                components.push(this.parse.linestring.apply(this, [line]).geometry)
            }
            return new NVectorFeature(new NGeometry.MultiLineString(components))
        },
        'polygon': function (str) {
            var ring, linestring, linearring;
            var rings = NString.trim(str).split(this.regExes.parenComma);
            var components = [];
            for (var i = 0, len = rings.length; i < len; ++i) {
                ring = rings[i].replace(this.regExes.trimParens, '$1');
                linestring = this.parse.linestring.apply(this, [ring]).geometry;
                linearring = new NGeometry.LinearRing(linestring.components);
                components.push(linearring)
            }
            return new NVectorFeature(new NGeometry.Polygon(components))
        },
        'multipolygon': function (str) {
            var polygon;
            var polygons = NString.trim(str).split(this.regExes.doubleParenComma);
            var components = [];
            for (var i = 0, len = polygons.length; i < len; ++i) {
                polygon = polygons[i].replace(this.regExes.trimParens, '$1');
                components.push(this.parse.polygon.apply(this, [polygon]).geometry)
            }
            return new NVectorFeature(new NGeometry.MultiPolygon(components))
        },
        'geometrycollection': function (str) {
            str = str.replace(/,\s*([A-Za-z])/g, '|$1');
            var wktArray = NString.trim(str).split('|');
            var components = [];
            for (var i = 0, len = wktArray.length; i < len; ++i) {
                components.push(NParser.WKT.prototype.read.apply(this, [wktArray[i]]))
            }
            return components
        }
    },
    _CLASS_NAME: "NParser.WKT"
});
NParser.GPX = NObject(NParser.XML, {
    getWaypoints: true,
    getTracks: true,
    getRoutes: true,
    getAttributes: true,
    construct: function (options) {
        NParser.XML.prototype.construct.apply(this, [options])
    },
    read: function (doc) {
        if (typeof doc == "string") {
            doc = NParser.XML.prototype.read.apply(this, [doc])
        }
        var features = [];
        if (this.getWaypoints) {
            var waypoints = doc.getElementsByTagName("wpt");
            for (var l = 0, len = waypoints.length; l < len; l++) {
                var attrs = {};
                if (this.getAttributes) {
                    attrs = this.parseAttributes(waypoints[l])
                }
                var wpt = new NGeometry.Point(waypoints[l].getAttribute("lon"), waypoints[l].getAttribute("lat"));
                features.push(new NVectorFeature(wpt, attrs))
            }
        }
        if (this.getTracks) {
            var tracks = doc.getElementsByTagName("trk");
            for (var i = 0, len = tracks.length; i < len; i++) {
                var attrs = {};
                if (this.getAttributes) {
                    attrs = this.parseAttributes(tracks[i])
                }
                var segs = this.getElementsByTagNameNS(tracks[i], tracks[i].namespaceURI, "trkseg");
                for (var j = 0, seglen = segs.length; j < seglen; j++) {
                    var track = this.getSegment(segs[j], "trkpt");
                    features.push(new NVectorFeature(track, attrs))
                }
            }
        }
        if (this.getRoutes) {
            var routes = doc.getElementsByTagName("rte");
            for (var k = 0, klen = routes.length; k < klen; k++) {
                var attrs = {};
                if (this.getAttributes) {
                    attrs = this.parseAttributes(routes[k])
                }
                var route = this.getSegment(routes[k], "rtept");
                features.push(new NVectorFeature(route, attrs))
            }
        }
        if (this.innerProjection && this.outerProjection) {
            for (var g = 0, featLength = features.length; g < featLength; g++) {
                features[g].geometry.transform(this.outerProjection, this.innerProjection)
            }
        }
        return features
    },
    getSegment: function (segment, segmentType) {
        var points = this.getElementsByTagNameNS(segment, segment.namespaceURI, segmentType);
        var point_features = [];
        for (var i = 0, len = points.length; i < len; i++) {
            point_features.push(new NGeometry.Point(points[i].getAttribute("lon"), points[i].getAttribute("lat")))
        }
        return new NGeometry.LineString(point_features)
    },
    parseAttributes: function (node) {
        var attributes = {};
        var attrNode = node.firstChild;
        while (attrNode) {
            if (attrNode.nodeType == 1) {
                var value = attrNode.firstChild;
                if (value.nodeType == 3 || value.nodeType == 4) {
                    name = (attrNode.prefix) ? attrNode.nodeName.split(":")[1] : attrNode.nodeName;
                    attributes[name] = value.nodeValue
                }
            }
            attrNode = attrNode.nextSibling
        }
        return attributes
    },
    _CLASS_NAME: "NParser.GPX"
});
NParser.SLD = NObject(NParser.XML, {
    defaultVersion: "1.0.0",
    version: null,
    parser: null,
    construct: function (options) {
        NParser.XML.prototype.construct.apply(this, [options])
    },
    write: function (sld, options) {
        var version = (options && options.version) || this.version || this.defaultVersion;
        if (!this.parser || this.parser.VERSION != version) {
            var format = NParser.SLD["v" + version.replace(/\./g, "_")];
            if (!format) {
                throw "Can't find a SLD parser for version " + version
            }
            this.parser = new format(this.options)
        }
        var root = this.parser.write(sld);
        return NParser.XML.prototype.write.apply(this, [root])
    },
    read: function (data) {
        if (typeof data == "string") {
            data = NParser.XML.prototype.read.apply(this, [data])
        }
        var root = data.documentElement;
        var version = this.version;
        if (!version) {
            version = root.getAttribute("version");
            if (!version) {
                version = this.defaultVersion
            }
        }
        if (!this.parser || this.parser.VERSION != version) {
            var format = NParser.SLD["v" + version.replace(/\./g, "_")];
            if (!format) {
                throw "Can't find a SLD parser for version " + version
            }
            this.parser = new format(this.options)
        }
        var sld = this.parser.read(data);
        return sld
    },
    _CLASS_NAME: "NParser.SLD"
});
NParser.SLD.v1 = NObject(NParser.XML, {
    namespaces: {
        sld: "http://www.opengis.net/sld",
        ogc: "http://www.opengis.net/ogc",
        xlink: "http://www.w3.org/1999/xlink",
        xsi: "http://www.w3.org/2001/XMLSchema-instance"
    },
    defaultPrefix: "sld",
    schemaLocation: null,
    defaultSymbolizer: {
        fillColor: "#808080",
        fillOpacity: 1,
        strokeColor: "#000000",
        strokeOpacity: 1,
        strokeWidth: 1,
        strokeDashstyle: "solid",
        pointRadius: 3,
        graphicName: "square"
    },
    construct: function (options) {
        this.readers["ogc"] = NParser.Filter.v1.prototype.readers["ogc"];
        this.writers["ogc"] = NParser.Filter.v1.prototype.writers["ogc"];
        this.readOgcExpression = NParser.Filter.v1.prototype.readOgcExpression;
        this.getFilterType = NParser.Filter.v1.prototype.getFilterType;
        this.filterMap = NParser.Filter.v1.prototype.filterMap;
        NParser.XML.prototype.construct.apply(this, [options])
    },
    read: function (data) {
        var sld = {
            namedLayers: {}
        };
        this.readChildNodes(data, sld);
        return sld
    },
    readers: {
        "sld": {
            "StyledLayerDescriptor": function (node, sld) {
                sld.version = node.getAttribute("version");
                this.readChildNodes(node, sld)
            },
            "Name": function (node, obj) {
                obj.name = this.getChildNodeValue(node)
            },
            "Title": function (node, obj) {
                obj.title = this.getChildNodeValue(node)
            },
            "Abstract": function (node, obj) {
                obj.description = this.getChildNodeValue(node)
            },
            "NamedLayer": function (node, sld) {
                var layer = {
                    userStyles: [],
                    namedStyles: []
                };
                this.readChildNodes(node, layer);
                for (var i = 0, len = layer.userStyles.length; i < len; ++i) {
                    layer.userStyles[i].layerName = layer.name
                }
                sld.namedLayers[layer.name] = layer
            },
            "NamedStyle": function (node, layer) {
                layer.namedStyles.push(this.getChildName(node.firstChild))
            },
            "UserStyle": function (node, layer) {
                var style = new NSymbol(this.defaultSymbolizer);
                this.readChildNodes(node, style);
                layer.userStyles.push(style)
            },
            "IsDefault": function (node, style) {
                if (this.getChildNodeValue(node) == "1") {
                    style.isDefault = true
                }
            },
            "FeatureTypeStyle": function (node, style) {
                var obj = {
                    rules: []
                };
                this.readChildNodes(node, obj);
                style.rules = obj.rules
            },
            "Rule": function (node, obj) {
                var rule = new NRule();
                this.readChildNodes(node, rule);
                obj.rules.push(rule)
            },
            "ElseFilter": function (node, rule) {
                rule.lowPriorityFilter = true
            },
            "MinScaleDenominator": function (node, rule) {
                rule.minScale = this.getChildNodeValue(node)
            },
            "MaxScaleDenominator": function (node, rule) {
                rule.maxScale = this.getChildNodeValue(node)
            },
            "LineSymbolizer": function (node, rule) {
                var symbolizer = rule.symbolizer["Line"] || {};
                this.readChildNodes(node, symbolizer);
                rule.symbolizer["Line"] = symbolizer
            },
            "PolygonSymbolizer": function (node, rule) {
                var symbolizer = rule.symbolizer["Polygon"] || {};
                this.readChildNodes(node, symbolizer);
                rule.symbolizer["Polygon"] = symbolizer
            },
            "PointSymbolizer": function (node, rule) {
                var symbolizer = rule.symbolizer["Point"] || {};
                this.readChildNodes(node, symbolizer);
                rule.symbolizer["Point"] = symbolizer
            },
            "Stroke": function (node, symbolizer) {
                this.readChildNodes(node, symbolizer)
            },
            "Fill": function (node, symbolizer) {
                this.readChildNodes(node, symbolizer)
            },
            "CssParameter": function (node, symbolizer) {
                var cssProperty = node.getAttribute("name");
                var symProperty = this.cssMap[cssProperty];
                if (symProperty) {
                    var value = this.readOgcExpression(node);
                    if (value) {
                        symbolizer[symProperty] = value
                    }
                }
            },
            "Graphic": function (node, symbolizer) {
                var graphic = {};
                this.readChildNodes(node, graphic);
                var properties = ["strokeColor", "strokeWidth", "strokeOpacity", "strokeLinecap", "fillColor", "fillOpacity", "graphicName", "rotation", "graphicFormat"];
                var prop, value;
                for (var i = 0, len = properties.length; i < len; ++i) {
                    prop = properties[i];
                    value = graphic[prop];
                    if (value != undefined) {
                        symbolizer[prop] = value
                    }
                }
                if (graphic.opacity != undefined) {
                    symbolizer.graphicOpacity = graphic.opacity
                }
                if (graphic.size != undefined) {
                    symbolizer.pointRadius = graphic.size / 2
                }
                if (graphic.href != undefined) {
                    symbolizer.externalGraphic = graphic.href
                }
                if (graphic.rotation != undefined) {
                    symbolizer.rotation = graphic.rotation
                }
            },
            "ExternalGraphic": function (node, graphic) {
                this.readChildNodes(node, graphic)
            },
            "Mark": function (node, graphic) {
                this.readChildNodes(node, graphic)
            },
            "WellKnownName": function (node, graphic) {
                graphic.graphicName = this.getChildNodeValue(node)
            },
            "Opacity": function (node, obj) {
                var opacity = this.getChildNodeValue(node);
                if (opacity) {
                    obj.opacity = opacity
                }
            },
            "Size": function (node, obj) {
                var size = this.getChildNodeValue(node);
                if (size) {
                    obj.size = size
                }
            },
            "Rotation": function (node, obj) {
                var rotation = this.getChildNodeValue(node);
                if (rotation) {
                    obj.rotation = rotation
                }
            },
            "OnlineResource": function (node, obj) {
                obj.href = this.getAttributeNS(node, this.namespaces.xlink, "href")
            },
            "Format": function (node, graphic) {
                graphic.graphicFormat = this.getChildNodeValue(node)
            }
        }
    },
    cssMap: {
        "stroke": "strokeColor",
        "stroke-opacity": "strokeOpacity",
        "stroke-width": "strokeWidth",
        "stroke-linecap": "strokeLinecap",
        "stroke-dasharray": "strokeDashstyle",
        "fill": "fillColor",
        "fill-opacity": "fillOpacity",
        "font-family": "fontFamily",
        "font-size": "fontSize"
    },
    getCssProperty: function (sym) {
        var css = null;
        for (var prop in this.cssMap) {
            if (this.cssMap[prop] == sym) {
                css = prop;
                break
            }
        }
        return css
    },
    getGraphicFormat: function (href) {
        var format, regex;
        for (var key in this.graphicFormats) {
            if (this.graphicFormats[key].test(href)) {
                format = key;
                break
            }
        }
        return format || this.defautlGraphicFormat
    },
    defaultGraphicFormat: "image/png",
    graphicFormats: {
        "image/jpeg": /\.jpe?g$/i,
        "image/gif": /\.gif$/i,
        "image/png": /\.png$/i
    },
    write: function (sld) {
        return this.writers.sld.StyledLayerDescriptor.apply(this, [sld])
    },
    writers: {
        "sld": {
            "StyledLayerDescriptor": function (sld) {
                var root = this._createElementNSPlus("StyledLayerDescriptor", {
                    attributes: {
                        "version": this.VERSION,
                        "xsi:schemaLocation": this.schemaLocation
                    }
                });
                if (sld.name) {
                    this.writeNode(root, "Name", sld.name)
                }
                if (sld.title) {
                    this.writeNode(root, "Title", sld.title)
                }
                if (sld.description) {
                    this.writeNode(root, "Abstract", sld.description)
                }
                for (var name in sld.namedLayers) {
                    this.writeNode(root, "NamedLayer", sld.namedLayers[name])
                }
                return root
            },
            "Name": function (name) {
                return this._createElementNSPlus("Name", {
                    value: name
                })
            },
            "Title": function (title) {
                return this._createElementNSPlus("Title", {
                    value: title
                })
            },
            "Abstract": function (description) {
                return this._createElementNSPlus("Abstract", {
                    value: description
                })
            },
            "NamedLayer": function (layer) {
                var node = this._createElementNSPlus("NamedLayer");
                this.writeNode(node, "Name", layer.name);
                if (layer.namedStyles) {
                    for (var i = 0, len = layer.namedStyles.length; i < len; ++i) {
                        this.writeNode(node, "NamedStyle", layer.namedStyles[i])
                    }
                }
                if (layer.userStyles) {
                    for (var i = 0, len = layer.userStyles.length; i < len; ++i) {
                        this.writeNode(node, "UserStyle", layer.userStyles[i])
                    }
                }
                return node
            },
            "NamedStyle": function (name) {
                var node = this._createElementNSPlus("NamedStyle");
                this.writeNode(node, "Name", name);
                return node
            },
            "UserStyle": function (style) {
                var node = this._createElementNSPlus("UserStyle");
                if (style.name) {
                    this.writeNode(node, "Name", style.name)
                }
                if (style.title) {
                    this.writeNode(node, "Title", style.title)
                }
                if (style.description) {
                    this.writeNode(node, "Abstract", style.description)
                }
                if (style.isDefault) {
                    this.writeNode(node, "IsDefault", style.isDefault)
                }
                this.writeNode(node, "FeatureTypeStyle", style);
                return node
            },
            "IsDefault": function (bool) {
                return this._createElementNSPlus("IsDefault", {
                    value: (bool) ? "1" : "0"
                })
            },
            "FeatureTypeStyle": function (style) {
                var node = this._createElementNSPlus("FeatureTypeStyle");
                for (var i = 0, len = style.rules.length; i < len; ++i) {
                    this.writeNode(node, "Rule", style.rules[i])
                }
                return node
            },
            "Rule": function (rule) {
                var node = this._createElementNSPlus("Rule");
                if (rule.name) {
                    this.writeNode(node, "Name", rule.name)
                }
                if (rule.title) {
                    this.writeNode(node, "Title", rule.title)
                }
                if (rule.description) {
                    this.writeNode(node, "Abstract", rule.description)
                }
                if (rule.lowPriorityFilter) {
                    this.writeNode(node, "ElseFilter")
                } else if (rule.filter) {
                    this.writeNode(node, "ogc:Filter", rule.filter)
                }
                if (rule.minScale != undefined) {
                    this.writeNode(node, "MinScaleDenominator", rule.minScale)
                }
                if (rule.maxScale != undefined) {
                    this.writeNode(node, "MaxScaleDenominator", rule.maxScale)
                }
                var types = NSymbol.SYMBOLIZER_PREFIXES;
                var type, symbolizer;
                for (var i = 0, len = types.length; i < len; ++i) {
                    type = types[i];
                    symbolizer = rule.symbolizer[type];
                    if (symbolizer) {
                        this.writeNode(node, type + "Symbolizer", symbolizer)
                    }
                }
                return node
            },
            "ElseFilter": function () {
                return this._createElementNSPlus("ElseFilter")
            },
            "MinScaleDenominator": function (scale) {
                return this._createElementNSPlus("MinScaleDenominator", {
                    value: scale
                })
            },
            "MaxScaleDenominator": function (scale) {
                return this._createElementNSPlus("MaxScaleDenominator", {
                    value: scale
                })
            },
            "LineSymbolizer": function (symbolizer) {
                var node = this._createElementNSPlus("LineSymbolizer");
                this.writeNode(node, "Stroke", symbolizer);
                return node
            },
            "Stroke": function (symbolizer) {
                var node = this._createElementNSPlus("Stroke");
                if (symbolizer.strokeColor != undefined) {
                    this.writeNode(node, "CssParameter", {
                        symbolizer: symbolizer,
                        key: "strokeColor"
                    })
                }
                if (symbolizer.strokeOpacity != undefined) {
                    this.writeNode(node, "CssParameter", {
                        symbolizer: symbolizer,
                        key: "strokeOpacity"
                    })
                }
                if (symbolizer.strokeWidth != undefined) {
                    this.writeNode(node, "CssParameter", {
                        symbolizer: symbolizer,
                        key: "strokeWidth"
                    })
                }
                return node
            },
            "CssParameter": function (obj) {
                return this._createElementNSPlus("CssParameter", {
                    attributes: {
                        name: this.getCssProperty(obj.key)
                    },
                    value: obj.symbolizer[obj.key]
                })
            },
            "TextSymbolizer": function (symbolizer) {
                var node = this._createElementNSPlus("TextSymbolizer");
                if (symbolizer.label != null) {
                    this.writeNode(node, "Label", symbolizer.label)
                }
                if (symbolizer.fontFamily != null || symbolizer.fontSize != null) {
                    this.writeNode(node, "Font", symbolizer)
                }
                if (symbolizer.fillColor != null || symbolizer.fillOpacity != null) {
                    this.writeNode(node, "Fill", symbolizer)
                }
                return node
            },
            "Font": function (symbolizer) {
                var node = this._createElementNSPlus("Font");
                if (symbolizer.fontFamily) {
                    this.writeNode(node, "CssParameter", {
                        symbolizer: symbolizer,
                        key: "fontFamily"
                    })
                }
                if (symbolizer.fontSize) {
                    this.writeNode(node, "CssParameter", {
                        symbolizer: symbolizer,
                        key: "fontSize"
                    })
                }
                return node
            },
            "Label": function (label) {
                var node = this._createElementNSPlus("Label");
                var tokens = label.split("${");
                node.appendChild(this.createTextNode(tokens[0]));
                var item, last;
                for (var i = 1, len = tokens.length; i < len; i++) {
                    item = tokens[i];
                    last = item.indexOf("}");
                    if (last > 0) {
                        this.writeNode(node, "ogc:PropertyName", {
                            property: item.substring(0, last)
                        });
                        node.appendChild(this.createTextNode(item.substring(++last)))
                    } else {
                        node.appendChild(this.createTextNode("${" + item))
                    }
                }
                return node
            },
            "PolygonSymbolizer": function (symbolizer) {
                var node = this._createElementNSPlus("PolygonSymbolizer");
                this.writeNode(node, "Fill", symbolizer);
                this.writeNode(node, "Stroke", symbolizer);
                return node
            },
            "Fill": function (symbolizer) {
                var node = this._createElementNSPlus("Fill");
                if (symbolizer.fillColor) {
                    this.writeNode(node, "CssParameter", {
                        symbolizer: symbolizer,
                        key: "fillColor"
                    })
                }
                if (symbolizer.fillOpacity) {
                    this.writeNode(node, "CssParameter", {
                        symbolizer: symbolizer,
                        key: "fillOpacity"
                    })
                }
                return node
            },
            "PointSymbolizer": function (symbolizer) {
                var node = this._createElementNSPlus("PointSymbolizer");
                this.writeNode(node, "Graphic", symbolizer);
                return node
            },
            "Graphic": function (symbolizer) {
                var node = this._createElementNSPlus("Graphic");
                if (symbolizer.externalGraphic != undefined) {
                    this.writeNode(node, "ExternalGraphic", symbolizer)
                } else if (symbolizer.graphicName) {
                    this.writeNode(node, "Mark", symbolizer)
                }
                if (symbolizer.graphicOpacity != undefined) {
                    this.writeNode(node, "Opacity", symbolizer.graphicOpacity)
                }
                if (symbolizer.pointRadius != undefined) {
                    this.writeNode(node, "Size", symbolizer.pointRadius * 2)
                }
                if (symbolizer.rotation != undefined) {
                    this.writeNode(node, "Rotation", symbolizer.rotation)
                }
                return node
            },
            "ExternalGraphic": function (symbolizer) {
                var node = this._createElementNSPlus("ExternalGraphic");
                this.writeNode(node, "OnlineResource", symbolizer.externalGraphic);
                var format = symbolizer.graphicFormat || this.getGraphicFormat(symbolizer.externalGraphic);
                this.writeNode(node, "Format", format);
                return node
            },
            "Mark": function (symbolizer) {
                var node = this._createElementNSPlus("Mark");
                this.writeNode(node, "WellKnownName", symbolizer.graphicName);
                this.writeNode(node, "Fill", symbolizer);
                this.writeNode(node, "Stroke", symbolizer);
                return node
            },
            "WellKnownName": function (name) {
                return this._createElementNSPlus("WellKnownName", {
                    value: name
                })
            },
            "Opacity": function (value) {
                return this._createElementNSPlus("Opacity", {
                    value: value
                })
            },
            "Size": function (value) {
                return this._createElementNSPlus("Size", {
                    value: value
                })
            },
            "Rotation": function (value) {
                return this._createElementNSPlus("Rotation", {
                    value: value
                })
            },
            "OnlineResource": function (href) {
                return this._createElementNSPlus("OnlineResource", {
                    attributes: {
                        "xlink:type": "simple",
                        "xlink:href": href
                    }
                })
            },
            "Format": function (format) {
                return this._createElementNSPlus("Format", {
                    value: format
                })
            }
        }
    },
    getNamespacePrefix: function (uri) {
        var prefix = null;
        if (uri == null) {
            prefix = this.namespaces[this.defaultPrefix]
        } else {
            var gotPrefix = false;
            for (prefix in this.namespaces) {
                if (this.namespaces[prefix] == uri) {
                    gotPrefix = true;
                    break
                }
            }
            if (!gotPrefix) {
                prefix = null
            }
        }
        return prefix
    },
    readChildNodes: function (node, obj) {
        var children = node.childNodes;
        var child, group, reader, prefix, local;
        for (var i = 0, len = children.length; i < len; ++i) {
            child = children[i];
            if (child.nodeType == 1) {
                prefix = this.getNamespacePrefix(child.namespaceURI);
                local = child.nodeName.split(":").pop();
                group = this.readers[prefix];
                if (group) {
                    reader = group[local];
                    if (reader) {
                        reader.apply(this, [child, obj])
                    }
                }
            }
        }
    },
    writeNode: function (parent, name, obj) {
        var prefix, local;
        var split = name.indexOf(":");
        if (split > 0) {
            prefix = name.substring(0, split);
            local = name.substring(split + 1)
        } else {
            prefix = this.getNamespacePrefix(parent.namespaceURI);
            local = name
        }
        var child = this.writers[prefix][local].apply(this, [obj]);
        parent.appendChild(child);
        return child
    },
    _createElementNSPlus: function (name, options) {
        options = options || {};
        var loc = name.indexOf(":");
        var uri = options.uri || this.namespaces[options.prefix];
        if (!uri) {
            loc = name.indexOf(":");
            uri = this.namespaces[name.substring(0, loc)]
        }
        if (!uri) {
            uri = this.namespaces[this.defaultPrefix]
        }
        var node = this.createElementNS(uri, name);
        if (options.attributes) {
            this.setAttributes(node, options.attributes)
        }
        if (options.value) {
            node.appendChild(this.createTextNode(options.value))
        }
        return node
    },
    setAttributes: function (node, obj) {
        var value, loc, alias, uri;
        for (var name in obj) {
            value = obj[name].toString();
            uri = this.namespaces[name.substring(0, name.indexOf(":"))] || null;
            this.setAttributeNS(node, uri, name, value)
        }
    },
    _CLASS_NAME: "NParser.SLD.v1"
});
NParser.SLD.v1_0_0 = NObject(NParser.SLD.v1, {
    VERSION: "1.0.0",
    schemaLocation: "http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd",
    construct: function (options) {
        NParser.SLD.v1.prototype.construct.apply(this, [options])
    },
    _CLASS_NAME: "NParser.SLD.v1_0_0"
});
NParser.SLD.v1 = NObject(NParser.XML, {
    namespaces: {
        sld: "http://www.opengis.net/sld",
        ogc: "http://www.opengis.net/ogc",
        xlink: "http://www.w3.org/1999/xlink",
        xsi: "http://www.w3.org/2001/XMLSchema-instance"
    },
    defaultPrefix: "sld",
    schemaLocation: null,
    defaultSymbolizer: {
        fillColor: "#808080",
        fillOpacity: 1,
        strokeColor: "#000000",
        strokeOpacity: 1,
        strokeWidth: 1,
        strokeDashstyle: "solid",
        pointRadius: 3,
        graphicName: "square"
    },
    construct: function (options) {
        this.readers["ogc"] = NParser.Filter.v1.prototype.readers["ogc"];
        this.writers["ogc"] = NParser.Filter.v1.prototype.writers["ogc"];
        this.readOgcExpression = NParser.Filter.v1.prototype.readOgcExpression;
        this.getFilterType = NParser.Filter.v1.prototype.getFilterType;
        this.filterMap = NParser.Filter.v1.prototype.filterMap;
        NParser.XML.prototype.construct.apply(this, [options])
    },
    read: function (data) {
        var sld = {
            namedLayers: {}
        };
        this.readChildNodes(data, sld);
        return sld
    },
    readers: {
        "sld": {
            "StyledLayerDescriptor": function (node, sld) {
                sld.version = node.getAttribute("version");
                this.readChildNodes(node, sld)
            },
            "Name": function (node, obj) {
                obj.name = this.getChildNodeValue(node)
            },
            "Title": function (node, obj) {
                obj.title = this.getChildNodeValue(node)
            },
            "Abstract": function (node, obj) {
                obj.description = this.getChildNodeValue(node)
            },
            "NamedLayer": function (node, sld) {
                var layer = {
                    userStyles: [],
                    namedStyles: []
                };
                this.readChildNodes(node, layer);
                for (var i = 0, len = layer.userStyles.length; i < len; ++i) {
                    layer.userStyles[i].layerName = layer.name
                }
                sld.namedLayers[layer.name] = layer
            },
            "NamedStyle": function (node, layer) {
                layer.namedStyles.push(this.getChildName(node.firstChild))
            },
            "UserStyle": function (node, layer) {
                var style = new NSymbol(this.defaultSymbolizer);
                this.readChildNodes(node, style);
                layer.userStyles.push(style)
            },
            "IsDefault": function (node, style) {
                if (this.getChildNodeValue(node) == "1") {
                    style.isDefault = true
                }
            },
            "FeatureTypeStyle": function (node, style) {
                var obj = {
                    rules: []
                };
                this.readChildNodes(node, obj);
                style.rules = obj.rules
            },
            "Rule": function (node, obj) {
                var rule = new NRule();
                this.readChildNodes(node, rule);
                obj.rules.push(rule)
            },
            "ElseFilter": function (node, rule) {
                rule.lowPriorityFilter = true
            },
            "MinScaleDenominator": function (node, rule) {
                rule.minScale = this.getChildNodeValue(node)
            },
            "MaxScaleDenominator": function (node, rule) {
                rule.maxScale = this.getChildNodeValue(node)
            },
            "LineSymbolizer": function (node, rule) {
                var symbolizer = rule.symbolizer["Line"] || {};
                this.readChildNodes(node, symbolizer);
                rule.symbolizer["Line"] = symbolizer
            },
            "PolygonSymbolizer": function (node, rule) {
                var symbolizer = rule.symbolizer["Polygon"] || {};
                this.readChildNodes(node, symbolizer);
                rule.symbolizer["Polygon"] = symbolizer
            },
            "PointSymbolizer": function (node, rule) {
                var symbolizer = rule.symbolizer["Point"] || {};
                this.readChildNodes(node, symbolizer);
                rule.symbolizer["Point"] = symbolizer
            },
            "Stroke": function (node, symbolizer) {
                this.readChildNodes(node, symbolizer)
            },
            "Fill": function (node, symbolizer) {
                this.readChildNodes(node, symbolizer)
            },
            "CssParameter": function (node, symbolizer) {
                var cssProperty = node.getAttribute("name");
                var symProperty = this.cssMap[cssProperty];
                if (symProperty) {
                    var value = this.readOgcExpression(node);
                    if (value) {
                        symbolizer[symProperty] = value
                    }
                }
            },
            "Graphic": function (node, symbolizer) {
                var graphic = {};
                this.readChildNodes(node, graphic);
                var properties = ["strokeColor", "strokeWidth", "strokeOpacity", "strokeLinecap", "fillColor", "fillOpacity", "graphicName", "rotation", "graphicFormat"];
                var prop, value;
                for (var i = 0, len = properties.length; i < len; ++i) {
                    prop = properties[i];
                    value = graphic[prop];
                    if (value != undefined) {
                        symbolizer[prop] = value
                    }
                }
                if (graphic.opacity != undefined) {
                    symbolizer.graphicOpacity = graphic.opacity
                }
                if (graphic.size != undefined) {
                    symbolizer.pointRadius = graphic.size / 2
                }
                if (graphic.href != undefined) {
                    symbolizer.externalGraphic = graphic.href
                }
                if (graphic.rotation != undefined) {
                    symbolizer.rotation = graphic.rotation
                }
            },
            "ExternalGraphic": function (node, graphic) {
                this.readChildNodes(node, graphic)
            },
            "Mark": function (node, graphic) {
                this.readChildNodes(node, graphic)
            },
            "WellKnownName": function (node, graphic) {
                graphic.graphicName = this.getChildNodeValue(node)
            },
            "Opacity": function (node, obj) {
                var opacity = this.getChildNodeValue(node);
                if (opacity) {
                    obj.opacity = opacity
                }
            },
            "Size": function (node, obj) {
                var size = this.getChildNodeValue(node);
                if (size) {
                    obj.size = size
                }
            },
            "Rotation": function (node, obj) {
                var rotation = this.getChildNodeValue(node);
                if (rotation) {
                    obj.rotation = rotation
                }
            },
            "OnlineResource": function (node, obj) {
                obj.href = this.getAttributeNS(node, this.namespaces.xlink, "href")
            },
            "Format": function (node, graphic) {
                graphic.graphicFormat = this.getChildNodeValue(node)
            }
        }
    },
    cssMap: {
        "stroke": "strokeColor",
        "stroke-opacity": "strokeOpacity",
        "stroke-width": "strokeWidth",
        "stroke-linecap": "strokeLinecap",
        "stroke-dasharray": "strokeDashstyle",
        "fill": "fillColor",
        "fill-opacity": "fillOpacity",
        "font-family": "fontFamily",
        "font-size": "fontSize"
    },
    getCssProperty: function (sym) {
        var css = null;
        for (var prop in this.cssMap) {
            if (this.cssMap[prop] == sym) {
                css = prop;
                break
            }
        }
        return css
    },
    getGraphicFormat: function (href) {
        var format, regex;
        for (var key in this.graphicFormats) {
            if (this.graphicFormats[key].test(href)) {
                format = key;
                break
            }
        }
        return format || this.defautlGraphicFormat
    },
    defaultGraphicFormat: "image/png",
    graphicFormats: {
        "image/jpeg": /\.jpe?g$/i,
        "image/gif": /\.gif$/i,
        "image/png": /\.png$/i
    },
    write: function (sld) {
        return this.writers.sld.StyledLayerDescriptor.apply(this, [sld])
    },
    writers: {
        "sld": {
            "StyledLayerDescriptor": function (sld) {
                var root = this._createElementNSPlus("StyledLayerDescriptor", {
                    attributes: {
                        "version": this.VERSION,
                        "xsi:schemaLocation": this.schemaLocation
                    }
                });
                if (sld.name) {
                    this.writeNode(root, "Name", sld.name)
                }
                if (sld.title) {
                    this.writeNode(root, "Title", sld.title)
                }
                if (sld.description) {
                    this.writeNode(root, "Abstract", sld.description)
                }
                for (var name in sld.namedLayers) {
                    this.writeNode(root, "NamedLayer", sld.namedLayers[name])
                }
                return root
            },
            "Name": function (name) {
                return this._createElementNSPlus("Name", {
                    value: name
                })
            },
            "Title": function (title) {
                return this._createElementNSPlus("Title", {
                    value: title
                })
            },
            "Abstract": function (description) {
                return this._createElementNSPlus("Abstract", {
                    value: description
                })
            },
            "NamedLayer": function (layer) {
                var node = this._createElementNSPlus("NamedLayer");
                this.writeNode(node, "Name", layer.name);
                if (layer.namedStyles) {
                    for (var i = 0, len = layer.namedStyles.length; i < len; ++i) {
                        this.writeNode(node, "NamedStyle", layer.namedStyles[i])
                    }
                }
                if (layer.userStyles) {
                    for (var i = 0, len = layer.userStyles.length; i < len; ++i) {
                        this.writeNode(node, "UserStyle", layer.userStyles[i])
                    }
                }
                return node
            },
            "NamedStyle": function (name) {
                var node = this._createElementNSPlus("NamedStyle");
                this.writeNode(node, "Name", name);
                return node
            },
            "UserStyle": function (style) {
                var node = this._createElementNSPlus("UserStyle");
                if (style.name) {
                    this.writeNode(node, "Name", style.name)
                }
                if (style.title) {
                    this.writeNode(node, "Title", style.title)
                }
                if (style.description) {
                    this.writeNode(node, "Abstract", style.description)
                }
                if (style.isDefault) {
                    this.writeNode(node, "IsDefault", style.isDefault)
                }
                this.writeNode(node, "FeatureTypeStyle", style);
                return node
            },
            "IsDefault": function (bool) {
                return this._createElementNSPlus("IsDefault", {
                    value: (bool) ? "1" : "0"
                })
            },
            "FeatureTypeStyle": function (style) {
                var node = this._createElementNSPlus("FeatureTypeStyle");
                for (var i = 0, len = style.rules.length; i < len; ++i) {
                    this.writeNode(node, "Rule", style.rules[i])
                }
                return node
            },
            "Rule": function (rule) {
                var node = this._createElementNSPlus("Rule");
                if (rule.name) {
                    this.writeNode(node, "Name", rule.name)
                }
                if (rule.title) {
                    this.writeNode(node, "Title", rule.title)
                }
                if (rule.description) {
                    this.writeNode(node, "Abstract", rule.description)
                }
                if (rule.lowPriorityFilter) {
                    this.writeNode(node, "ElseFilter")
                } else if (rule.filter) {
                    this.writeNode(node, "ogc:Filter", rule.filter)
                }
                if (rule.minScale != undefined) {
                    this.writeNode(node, "MinScaleDenominator", rule.minScale)
                }
                if (rule.maxScale != undefined) {
                    this.writeNode(node, "MaxScaleDenominator", rule.maxScale)
                }
                var types = NSymbol.SYMBOLIZER_PREFIXES;
                var type, symbolizer;
                for (var i = 0, len = types.length; i < len; ++i) {
                    type = types[i];
                    symbolizer = rule.symbolizer[type];
                    if (symbolizer) {
                        this.writeNode(node, type + "Symbolizer", symbolizer)
                    }
                }
                return node
            },
            "ElseFilter": function () {
                return this._createElementNSPlus("ElseFilter")
            },
            "MinScaleDenominator": function (scale) {
                return this._createElementNSPlus("MinScaleDenominator", {
                    value: scale
                })
            },
            "MaxScaleDenominator": function (scale) {
                return this._createElementNSPlus("MaxScaleDenominator", {
                    value: scale
                })
            },
            "LineSymbolizer": function (symbolizer) {
                var node = this._createElementNSPlus("LineSymbolizer");
                this.writeNode(node, "Stroke", symbolizer);
                return node
            },
            "Stroke": function (symbolizer) {
                var node = this._createElementNSPlus("Stroke");
                if (symbolizer.strokeColor != undefined) {
                    this.writeNode(node, "CssParameter", {
                        symbolizer: symbolizer,
                        key: "strokeColor"
                    })
                }
                if (symbolizer.strokeOpacity != undefined) {
                    this.writeNode(node, "CssParameter", {
                        symbolizer: symbolizer,
                        key: "strokeOpacity"
                    })
                }
                if (symbolizer.strokeWidth != undefined) {
                    this.writeNode(node, "CssParameter", {
                        symbolizer: symbolizer,
                        key: "strokeWidth"
                    })
                }
                return node
            },
            "CssParameter": function (obj) {
                return this._createElementNSPlus("CssParameter", {
                    attributes: {
                        name: this.getCssProperty(obj.key)
                    },
                    value: obj.symbolizer[obj.key]
                })
            },
            "TextSymbolizer": function (symbolizer) {
                var node = this._createElementNSPlus("TextSymbolizer");
                if (symbolizer.label != null) {
                    this.writeNode(node, "Label", symbolizer.label)
                }
                if (symbolizer.fontFamily != null || symbolizer.fontSize != null) {
                    this.writeNode(node, "Font", symbolizer)
                }
                if (symbolizer.fillColor != null || symbolizer.fillOpacity != null) {
                    this.writeNode(node, "Fill", symbolizer)
                }
                return node
            },
            "Font": function (symbolizer) {
                var node = this._createElementNSPlus("Font");
                if (symbolizer.fontFamily) {
                    this.writeNode(node, "CssParameter", {
                        symbolizer: symbolizer,
                        key: "fontFamily"
                    })
                }
                if (symbolizer.fontSize) {
                    this.writeNode(node, "CssParameter", {
                        symbolizer: symbolizer,
                        key: "fontSize"
                    })
                }
                return node
            },
            "Label": function (label) {
                var node = this._createElementNSPlus("Label");
                var tokens = label.split("${");
                node.appendChild(this.createTextNode(tokens[0]));
                var item, last;
                for (var i = 1, len = tokens.length; i < len; i++) {
                    item = tokens[i];
                    last = item.indexOf("}");
                    if (last > 0) {
                        this.writeNode(node, "ogc:PropertyName", {
                            property: item.substring(0, last)
                        });
                        node.appendChild(this.createTextNode(item.substring(++last)))
                    } else {
                        node.appendChild(this.createTextNode("${" + item))
                    }
                }
                return node
            },
            "PolygonSymbolizer": function (symbolizer) {
                var node = this._createElementNSPlus("PolygonSymbolizer");
                this.writeNode(node, "Fill", symbolizer);
                this.writeNode(node, "Stroke", symbolizer);
                return node
            },
            "Fill": function (symbolizer) {
                var node = this._createElementNSPlus("Fill");
                if (symbolizer.fillColor) {
                    this.writeNode(node, "CssParameter", {
                        symbolizer: symbolizer,
                        key: "fillColor"
                    })
                }
                if (symbolizer.fillOpacity) {
                    this.writeNode(node, "CssParameter", {
                        symbolizer: symbolizer,
                        key: "fillOpacity"
                    })
                }
                return node
            },
            "PointSymbolizer": function (symbolizer) {
                var node = this._createElementNSPlus("PointSymbolizer");
                this.writeNode(node, "Graphic", symbolizer);
                return node
            },
            "Graphic": function (symbolizer) {
                var node = this._createElementNSPlus("Graphic");
                if (symbolizer.externalGraphic != undefined) {
                    this.writeNode(node, "ExternalGraphic", symbolizer)
                } else if (symbolizer.graphicName) {
                    this.writeNode(node, "Mark", symbolizer)
                }
                if (symbolizer.graphicOpacity != undefined) {
                    this.writeNode(node, "Opacity", symbolizer.graphicOpacity)
                }
                if (symbolizer.pointRadius != undefined) {
                    this.writeNode(node, "Size", symbolizer.pointRadius * 2)
                }
                if (symbolizer.rotation != undefined) {
                    this.writeNode(node, "Rotation", symbolizer.rotation)
                }
                return node
            },
            "ExternalGraphic": function (symbolizer) {
                var node = this._createElementNSPlus("ExternalGraphic");
                this.writeNode(node, "OnlineResource", symbolizer.externalGraphic);
                var format = symbolizer.graphicFormat || this.getGraphicFormat(symbolizer.externalGraphic);
                this.writeNode(node, "Format", format);
                return node
            },
            "Mark": function (symbolizer) {
                var node = this._createElementNSPlus("Mark");
                this.writeNode(node, "WellKnownName", symbolizer.graphicName);
                this.writeNode(node, "Fill", symbolizer);
                this.writeNode(node, "Stroke", symbolizer);
                return node
            },
            "WellKnownName": function (name) {
                return this._createElementNSPlus("WellKnownName", {
                    value: name
                })
            },
            "Opacity": function (value) {
                return this._createElementNSPlus("Opacity", {
                    value: value
                })
            },
            "Size": function (value) {
                return this._createElementNSPlus("Size", {
                    value: value
                })
            },
            "Rotation": function (value) {
                return this._createElementNSPlus("Rotation", {
                    value: value
                })
            },
            "OnlineResource": function (href) {
                return this._createElementNSPlus("OnlineResource", {
                    attributes: {
                        "xlink:type": "simple",
                        "xlink:href": href
                    }
                })
            },
            "Format": function (format) {
                return this._createElementNSPlus("Format", {
                    value: format
                })
            }
        }
    },
    getNamespacePrefix: function (uri) {
        var prefix = null;
        if (uri == null) {
            prefix = this.namespaces[this.defaultPrefix]
        } else {
            var gotPrefix = false;
            for (prefix in this.namespaces) {
                if (this.namespaces[prefix] == uri) {
                    gotPrefix = true;
                    break
                }
            }
            if (!gotPrefix) {
                prefix = null
            }
        }
        return prefix
    },
    readChildNodes: function (node, obj) {
        var children = node.childNodes;
        var child, group, reader, prefix, local;
        for (var i = 0, len = children.length; i < len; ++i) {
            child = children[i];
            if (child.nodeType == 1) {
                prefix = this.getNamespacePrefix(child.namespaceURI);
                local = child.nodeName.split(":").pop();
                group = this.readers[prefix];
                if (group) {
                    reader = group[local];
                    if (reader) {
                        reader.apply(this, [child, obj])
                    }
                }
            }
        }
    },
    writeNode: function (parent, name, obj) {
        var prefix, local;
        var split = name.indexOf(":");
        if (split > 0) {
            prefix = name.substring(0, split);
            local = name.substring(split + 1)
        } else {
            prefix = this.getNamespacePrefix(parent.namespaceURI);
            local = name
        }
        var child = this.writers[prefix][local].apply(this, [obj]);
        parent.appendChild(child);
        return child
    },
    _createElementNSPlus: function (name, options) {
        options = options || {};
        var loc = name.indexOf(":");
        var uri = options.uri || this.namespaces[options.prefix];
        if (!uri) {
            loc = name.indexOf(":");
            uri = this.namespaces[name.substring(0, loc)]
        }
        if (!uri) {
            uri = this.namespaces[this.defaultPrefix]
        }
        var node = this.createElementNS(uri, name);
        if (options.attributes) {
            this.setAttributes(node, options.attributes)
        }
        if (options.value) {
            node.appendChild(this.createTextNode(options.value))
        }
        return node
    },
    setAttributes: function (node, obj) {
        var value, loc, alias, uri;
        for (var name in obj) {
            value = obj[name].toString();
            uri = this.namespaces[name.substring(0, name.indexOf(":"))] || null;
            this.setAttributeNS(node, uri, name, value)
        }
    },
    _CLASS_NAME: "NParser.SLD.v1"
});
NParser.Filter = NObject(NParser.XML, {
    defaultVersion: "1.0.0",
    version: null,
    parser: null,
    construct: function (options) {
        NParser.XML.prototype.construct.apply(this, [options])
    },
    write: function (filter, options) {
        var version = (options && options.version) || this.version || this.defaultVersion;
        if (!this.parser || this.parser.VERSION != version) {
            var format = NParser.Filter["v" + version.replace(/\./g, "_")];
            if (!format) {
                throw "Can't find a Filter parser for version " + version
            }
            this.parser = new format(this.options)
        }
        return this.parser.write(filter)
    },
    read: function (data) {
        if (typeof data == "string") {
            data = NParser.XML.prototype.read.apply(this, [data])
        }
        var root = data.nodeType == 9 ? data.documentElement : data;
        var version = this.version;
        if (!version) {
            version = this.defaultVersion
        }
        if (!this.parser || this.parser.VERSION != version) {
            var format = NParser.Filter["v" + version.replace(/\./g, "_")];
            if (!format) {
                throw "Can't find a Filter parser for version " + version
            }
            this.parser = new format(this.options)
        }
        var filter = this.parser.read(data);
        return filter
    },
    _CLASS_NAME: "NParser.Filter"
});
NParser.Filter.v1 = NObject(NParser.XML, {
    namespaces: {
        ogc: "http://www.opengis.net/ogc",
        xlink: "http://www.w3.org/1999/xlink",
        xsi: "http://www.w3.org/2001/XMLSchema-instance"
    },
    defaultPrefix: "ogc",
    schemaLocation: null,
    construct: function (options) {
        NParser.XML.prototype.construct.apply(this, [options])
    },
    read: function (data) {
        var obj = {};
        var filter = this.readers.ogc["Filter"].apply(this, [data, obj]);
        return obj.filter
    },
    readers: {
        "ogc": {
            "Filter": function (node, parent) {
                var obj = {
                    fids: [],
                    filters: []
                };
                this.readChildNodes(node, obj);
                if (obj.fids.length > 0) {
                    parent.filter = new NFilter.FeatureId({
                        fids: obj.fids
                    })
                } else if (obj.filters.length > 0) {
                    parent.filter = obj.filters[0]
                }
            },
            "FeatureId": function (node, obj) {
                var fid = node.getAttribute("fid");
                if (fid) {
                    obj.fids.push(fid)
                }
            },
            "And": function (node, obj) {
                var filter = new NFilter.Logical({
                    type: NFilter.Logical.AND
                });
                this.readChildNodes(node, filter);
                obj.filters.push(filter)
            },
            "Or": function (node, obj) {
                var filter = new NFilter.Logical({
                    type: NFilter.Logical.OR
                });
                this.readChildNodes(node, filter);
                obj.filters.push(filter)
            },
            "Not": function (node, obj) {
                var filter = new NFilter.Logical({
                    type: NFilter.Logical.NOT
                });
                this.readChildNodes(node, filter);
                obj.filters.push(filter)
            },
            "PropertyIsEqualTo": function (node, obj) {
                var filter = new NFilter.Comparison({
                    type: NFilter.Comparison.EQUAL_TO
                });
                this.readChildNodes(node, filter);
                obj.filters.push(filter)
            },
            "PropertyIsNotEqualTo": function (node, obj) {
                var filter = new NFilter.Comparison({
                    type: NFilter.Comparison.NOT_EQUAL_TO
                });
                this.readChildNodes(node, filter);
                obj.filters.push(filter)
            },
            "PropertyIsLessThan": function (node, obj) {
                var filter = new NFilter.Comparison({
                    type: NFilter.Comparison.LESS_THAN
                });
                this.readChildNodes(node, filter);
                obj.filters.push(filter)
            },
            "PropertyIsGreaterThan": function (node, obj) {
                var filter = new NFilter.Comparison({
                    type: NFilter.Comparison.GREATER_THAN
                });
                this.readChildNodes(node, filter);
                obj.filters.push(filter)
            },
            "PropertyIsLessThanOrEqualTo": function (node, obj) {
                var filter = new NFilter.Comparison({
                    type: NFilter.Comparison.LESS_THAN_OR_EQUAL_TO
                });
                this.readChildNodes(node, filter);
                obj.filters.push(filter)
            },
            "PropertyIsGreaterThanOrEqualTo": function (node, obj) {
                var filter = new NFilter.Comparison({
                    type: NFilter.Comparison.GREATER_THAN_OR_EQUAL_TO
                });
                this.readChildNodes(node, filter);
                obj.filters.push(filter)
            },
            "PropertyIsBetween": function (node, obj) {
                var filter = new NFilter.Comparison({
                    type: NFilter.Comparison.BETWEEN
                });
                this.readChildNodes(node, filter);
                obj.filters.push(filter)
            },
            "PropertyIsLike": function (node, obj) {
                var filter = new NFilter.Comparison({
                    type: NFilter.Comparison.LIKE
                });
                this.readChildNodes(node, filter);
                var wildCard = node.getAttribute("wildCard");
                var singleChar = node.getAttribute("singleChar");
                var esc = node.getAttribute("escape");
                filter.value2regex(wildCard, singleChar, esc);
                obj.filters.push(filter)
            },
            "Literal": function (node, obj) {
                obj.value = this.getChildNodeValue(node)
            },
            "PropertyName": function (node, filter) {
                filter.property = this.getChildNodeValue(node)
            },
            "LowerBoundary": function (node, filter) {
                filter.floorValue = this.readOgcExpression(node)
            },
            "UpperBoundary": function (node, filter) {
                filter.ceilValue = this.readOgcExpression(node)
            }
        }
    },
    readOgcExpression: function (node) {
        var obj = {};
        this.readChildNodes(node, obj);
        var value = obj.value;
        if (!value) {
            value = this.getChildNodeValue(node)
        }
        return value
    },
    write: function (filter) {
        return this.writers.ogc["Filter"].apply(this, [filter])
    },
    writers: {
        "ogc": {
            "Filter": function (filter) {
                var node = this._createElementNSPlus("ogc:Filter");
                var sub = filter._CLASS_NAME.split(".").pop();
                if (sub == "FeatureId") {
                    for (var i = 0; i < filter.fids.length; ++i) {
                        this.writeNode(node, "FeatureId", filter.fids[i])
                    }
                } else {
                    this.writeNode(node, this.getFilterType(filter), filter)
                }
                return node
            },
            "FeatureId": function (fid) {
                return this._createElementNSPlus("ogc:FeatureId", {
                    attributes: {
                        fid: fid
                    }
                })
            },
            "And": function (filter) {
                var node = this._createElementNSPlus("ogc:And");
                var childFilter;
                for (var i = 0; i < filter.filters.length; ++i) {
                    childFilter = filter.filters[i];
                    this.writeNode(node, this.getFilterType(childFilter), childFilter)
                }
                return node
            },
            "Or": function (filter) {
                var node = this._createElementNSPlus("ogc:Or");
                var childFilter;
                for (var i = 0; i < filter.filters.length; ++i) {
                    childFilter = filter.filters[i];
                    this.writeNode(node, this.getFilterType(childFilter), childFilter)
                }
                return node
            },
            "Not": function (filter) {
                var node = this._createElementNSPlus("ogc:Not");
                var childFilter = filter.filters[0];
                this.writeNode(node, this.getFilterType(childFilter), childFilter);
                return node
            },
            "PropertyIsEqualTo": function (filter) {
                var node = this._createElementNSPlus("ogc:PropertyIsEqualTo");
                this.writeNode(node, "PropertyName", filter);
                this.writeNode(node, "Literal", filter.value);
                return node
            },
            "PropertyIsNotEqualTo": function (filter) {
                var node = this._createElementNSPlus("ogc:PropertyIsNotEqualTo");
                this.writeNode(node, "PropertyName", filter);
                this.writeNode(node, "Literal", filter.value);
                return node
            },
            "PropertyIsLessThan": function (filter) {
                var node = this._createElementNSPlus("ogc:PropertyIsLessThan");
                this.writeNode(node, "PropertyName", filter);
                this.writeNode(node, "Literal", filter.value);
                return node
            },
            "PropertyIsGreaterThan": function (filter) {
                var node = this._createElementNSPlus("ogc:PropertyIsGreaterThan");
                this.writeNode(node, "PropertyName", filter);
                this.writeNode(node, "Literal", filter.value);
                return node
            },
            "PropertyIsLessThanOrEqualTo": function (filter) {
                var node = this._createElementNSPlus("ogc:PropertyIsLessThanOrEqualTo");
                this.writeNode(node, "PropertyName", filter);
                this.writeNode(node, "Literal", filter.value);
                return node
            },
            "PropertyIsGreaterThanOrEqualTo": function (filter) {
                var node = this._createElementNSPlus("ogc:PropertyIsGreaterThanOrEqualTo");
                this.writeNode(node, "PropertyName", filter);
                this.writeNode(node, "Literal", filter.value);
                return node
            },
            "PropertyIsBetween": function (filter) {
                var node = this._createElementNSPlus("ogc:PropertyIsBetween");
                this.writeNode(node, "PropertyName", filter);
                this.writeNode(node, "LowerBoundary", filter);
                this.writeNode(node, "UpperBoundary", filter);
                return node
            },
            "PropertyIsLike": function (filter) {
                var node = this._createElementNSPlus("ogc:PropertyIsLike", {
                    attributes: {
                        wildCard: "*",
                        singleChar: ".",
                        escape: "!"
                    }
                });
                this.writeNode(node, "PropertyName", filter);
                this.writeNode(node, "Literal", filter.regex2value());
                return node
            },
            "PropertyName": function (filter) {
                return this._createElementNSPlus("ogc:PropertyName", {
                    value: filter.property
                })
            },
            "Literal": function (value) {
                return this._createElementNSPlus("ogc:Literal", {
                    value: value
                })
            },
            "LowerBoundary": function (filter) {
                var node = this._createElementNSPlus("ogc:LowerBoundary");
                this.writeNode(node, "Literal", filter.floorValue);
                return node
            },
            "UpperBoundary": function (filter) {
                var node = this._createElementNSPlus("ogc:UpperBoundary");
                this.writeNode(node, "Literal", filter.ceilValue);
                return node
            },
            "BBOX": function (filter) {
                var node = this._createElementNSPlus("ogc:BBOX");
                this.writeNode(node, "PropertyName", filter);
                var gml = new NParser.GML();
                node.appendChild(gml.createGeometryNode(filter.value));
                return node
            },
            "DWITHIN": function (filter) {
                var node = this._createElementNSPlus("ogc:DWithin");
                this.writeNode(node, "PropertyName", filter);
                var gml = new NParser.GML();
                node.appendChild(gml.createGeometryNode(filter.value));
                this.writeNode(node, "Distance", filter);
                return node
            },
            "INTERSECTS": function (filter) {
                var node = this._createElementNSPlus("ogc:Intersects");
                this.writeNode(node, "PropertyName", filter);
                var gml = new NParser.GML();
                node.appendChild(gml.createGeometryNode(filter.value));
                return node
            },
            "Distance": function (filter) {
                return this._createElementNSPlus("ogc:Distance", {
                    attributes: {
                        units: filter.distanceUnits
                    },
                    value: filter.distance
                })
            }
        }
    },
    getFilterType: function (filter) {
        var filterType = this.filterMap[filter.type];
        if (!filterType) {
            throw "Filter writing not supported for rule type: " + filter.type
        }
        return filterType
    },
    filterMap: {
        "&&": "And",
        "||": "Or",
        "!": "Not",
        "==": "PropertyIsEqualTo",
        "!=": "PropertyIsNotEqualTo",
        "<": "PropertyIsLessThan",
        ">": "PropertyIsGreaterThan",
        "<=": "PropertyIsLessThanOrEqualTo",
        ">=": "PropertyIsGreaterThanOrEqualTo",
        "..": "PropertyIsBetween",
        "~": "PropertyIsLike",
        "BBOX": "BBOX",
        "DWITHIN": "DWITHIN",
        "INTERSECTS": "INTERSECTS"
    },
    getNamespacePrefix: function (uri) {
        var prefix = null;
        if (uri == null) {
            prefix = this.namespaces[this.defaultPrefix]
        } else {
            var gotPrefix = false;
            for (prefix in this.namespaces) {
                if (this.namespaces[prefix] == uri) {
                    gotPrefix = true;
                    break
                }
            }
            if (!gotPrefix) {
                prefix = null
            }
        }
        return prefix
    },
    readChildNodes: function (node, obj) {
        var children = node.childNodes;
        var child, group, reader, prefix, local;
        for (var i = 0; i < children.length; ++i) {
            child = children[i];
            if (child.nodeType == 1) {
                prefix = this.getNamespacePrefix(child.namespaceURI);
                local = child.nodeName.split(":").pop();
                group = this.readers[prefix];
                if (group) {
                    reader = group[local];
                    if (reader) {
                        reader.apply(this, [child, obj])
                    }
                }
            }
        }
    },
    writeNode: function (parent, name, obj) {
        var prefix, local;
        var split = name.indexOf(":");
        if (split > 0) {
            prefix = name.substring(0, split);
            local = name.substring(split + 1)
        } else {
            prefix = this.getNamespacePrefix(parent.namespaceURI);
            local = name
        }
        var child = this.writers[prefix][local].apply(this, [obj]);
        parent.appendChild(child);
        return child
    },
    _createElementNSPlus: function (name, options) {
        options = options || {};
        var loc = name.indexOf(":");
        var uri = options.uri || this.namespaces[options.prefix];
        if (!uri) {
            loc = name.indexOf(":");
            uri = this.namespaces[name.substring(0, loc)]
        }
        if (!uri) {
            uri = this.namespaces[this.defaultPrefix]
        }
        var node = this.createElementNS(uri, name);
        if (options.attributes) {
            this.setAttributes(node, options.attributes)
        }
        if (options.value) {
            node.appendChild(this.createTextNode(options.value))
        }
        return node
    },
    setAttributes: function (node, obj) {
        var value, loc, alias, uri;
        for (var name in obj) {
            value = obj[name].toString();
            uri = this.namespaces[name.substring(0, name.indexOf(":"))] || null;
            this.setAttributeNS(node, uri, name, value)
        }
    },
    _CLASS_NAME: "NParser.Filter.v1"
});
NParser.Filter.v1_0_0 = NObject(NParser.Filter.v1, {
    VERSION: "1.0.0",
    schemaLocation: "http://www.opengis.net/ogc/filter/1.0.0/filter.xsd",
    construct: function (options) {
        NParser.Filter.v1.prototype.construct.apply(this, [options])
    },
    _CLASS_NAME: "NParser.Filter.v1_0_0"
});
NParser.Text = NObject(NParser, {
    construct: function (options) {
        NParser.prototype.construct.apply(this, [options])
    },
    read: function (text) {
        var lines = text.split('\n');
        var columns;
        var features = [];
        for (var lcv = 0; lcv < (lines.length - 1); lcv++) {
            var currLine = lines[lcv].replace(/^\s*/, '').replace(/\s*$/, '');
            if (currLine.charAt(0) != '#') {
                if (!columns) {
                    columns = currLine.split('\t')
                } else {
                    var vals = currLine.split('\t');
                    var geometry = new NGeometry.Point(0, 0);
                    var attributes = {};
                    var style = {};
                    var icon, iconSize, iconOffset, overflow;
                    var set = false;
                    for (var valIndex = 0; valIndex < vals.length; valIndex++) {
                        if (vals[valIndex]) {
                            if (columns[valIndex] == 'point') {
                                var coords = vals[valIndex].split(',');
                                geometry.y = parseFloat(coords[0]);
                                geometry.x = parseFloat(coords[1]);
                                set = true
                            } else if (columns[valIndex] == 'lat') {
                                geometry.y = parseFloat(vals[valIndex]);
                                set = true
                            } else if (columns[valIndex] == 'lon') {
                                geometry.x = parseFloat(vals[valIndex]);
                                set = true
                            } else if (columns[valIndex] == 'title') attributes['title'] = vals[valIndex];
                            else if (columns[valIndex] == 'image' || columns[valIndex] == 'icon') style['externalGraphic'] = vals[valIndex];
                            else if (columns[valIndex] == 'iconSize') {
                                var size = vals[valIndex].split(',');
                                style['graphicWidth'] = parseFloat(size[0]);
                                style['graphicHeight'] = parseFloat(size[1])
                            } else if (columns[valIndex] == 'iconOffset') {
                                var offset = vals[valIndex].split(',');
                                style['graphicXOffset'] = parseFloat(offset[0]);
                                style['graphicYOffset'] = parseFloat(offset[1])
                            } else if (columns[valIndex] == 'description') {
                                attributes['description'] = vals[valIndex]
                            } else if (columns[valIndex] == 'overflow') {
                                attributes['overflow'] = vals[valIndex]
                            }
                        }
                    }
                    if (set) {
                        if (this.innerProjection && this.outerProjection) {
                            geometry.transform(this.outerProjection, this.innerProjection)
                        }
                        var feature = new NVectorFeature(geometry, attributes, style);
                        features.push(feature)
                    }
                }
            }
        }
        return features
    },
    _CLASS_NAME: "NParser.Text"
});
NParser.JSON = NObject(NParser, {
    indent: "    ",
    space: " ",
    newline: "\n",
    level: 0,
    _pretty: false,
    construct: function (options) {
        NParser.prototype.construct.apply(this, [options])
    },
    read: function (json, filter) {
        try {
            if (/^[\],:{}\s]*$/.test(json.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                var object = eval('(' + json + ')');
                if (typeof filter === 'function') {
                    function walk(k, v) {
                        if (v && typeof v === 'object') {
                            for (var i in v) {
                                if (v.hasOwnProperty(i)) {
                                    v[i] = walk(i, v[i])
                                }
                            }
                        }
                        return filter(k, v)
                    }
                    object = walk('', object)
                }
                return object
            }
        } catch (e) {}
        return null
    },
    write: function (value, _pretty) {
        this._pretty = !! _pretty;
        var json = null;
        var type = typeof value;
        if (this.serialize[type]) {
            json = this.serialize[type].apply(this, [value])
        }
        return json
    },
    writeIndent: function () {
        var pieces = [];
        if (this._pretty) {
            for (var i = 0; i < this.level; ++i) {
                pieces.push(this.indent)
            }
        }
        return pieces.join('')
    },
    writeNewline: function () {
        return (this._pretty) ? this.newline : ''
    },
    writeSpace: function () {
        return (this._pretty) ? this.space : ''
    },
    serialize: {
        'object': function (object) {
            if (object == null) {
                return "null"
            }
            if (object.constructor == Date) {
                return this.serialize.date.apply(this, [object])
            }
            if (object.constructor == Array) {
                return this.serialize.array.apply(this, [object])
            }
            var pieces = ['{'];
            this.level += 1;
            var key, keyJSON, valueJSON;
            var addComma = false;
            for (key in object) {
                if (object.hasOwnProperty(key)) {
                    keyJSON = NParser.JSON.prototype.write.apply(this, [key, this._pretty]);
                    valueJSON = NParser.JSON.prototype.write.apply(this, [object[key], this._pretty]);
                    if (keyJSON != null && valueJSON != null) {
                        if (addComma) {
                            pieces.push(',')
                        }
                        pieces.push(this.writeNewline(), this.writeIndent(), keyJSON, ':', this.writeSpace(), valueJSON);
                        addComma = true
                    }
                }
            }
            this.level -= 1;
            pieces.push(this.writeNewline(), this.writeIndent(), '}');
            return pieces.join('')
        },
        'array': function (array) {
            var json;
            var pieces = ['['];
            this.level += 1;
            for (var i = 0, len = array.length; i < len; ++i) {
                json = NParser.JSON.prototype.write.apply(this, [array[i], this._pretty]);
                if (json != null) {
                    if (i > 0) {
                        pieces.push(',')
                    }
                    pieces.push(this.writeNewline(), this.writeIndent(), json)
                }
            }
            this.level -= 1;
            pieces.push(this.writeNewline(), this.writeIndent(), ']');
            return pieces.join('')
        },
        'string': function (string) {
            var m = {
                '\b': '\\b',
                '\t': '\\t',
                '\n': '\\n',
                '\f': '\\f',
                '\r': '\\r',
                '"': '\\"',
                '\\': '\\\\'
            };
            if (/["\\\x00-\x1f]/.test(string)) {
                return '"' + string.replace(/([\x00-\x1f\\"])/g, function (a, b) {
                    var c = m[b];
                    if (c) {
                        return c
                    }
                    c = b.charCodeAt();
                    return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16)
                }) + '"'
            }
            return '"' + string + '"'
        },
        'number': function (number) {
            return isFinite(number) ? String(number) : "null"
        },
        'boolean': function (bool) {
            return String(bool)
        },
        'date': function (date) {
            function format(number) {
                return (number < 10) ? '0' + number : number
            }
            return '"' + date.getFullYear() + '-' + format(date.getMonth() + 1) + '-' + format(date.getDate()) + 'T' + format(date.getHours()) + ':' + format(date.getMinutes()) + ':' + format(date.getSeconds()) + '"'
        }
    },
    _CLASS_NAME: "NParser.JSON"
});
NParser.GeoJSON = NObject(NParser.JSON, {
    construct: function (options) {
        NParser.JSON.prototype.construct.apply(this, [options])
    },
    read: function (json, type, filter) {
        type = (type) ? type : "FeatureCollection";
        var results = null;
        var obj = null;
        if (typeof json == "string") {
            obj = NParser.JSON.prototype.read.apply(this, [json, filter])
        } else {
            obj = json
        }
        if (!obj) {
            NLog.error("Bad JSON: " + json)
        } else if (typeof (obj.type) != "string") {
            NLog.error("Bad GeoJSON - no type: " + json)
        } else if (this.isValidType(obj, type)) {
            switch (type) {
            case "Geometry":
                try {
                    results = this.parseGeometry(obj)
                } catch (err) {
                    NLog.error(err)
                }
                break;
            case "Feature":
                try {
                    results = this.parseFeature(obj);
                    results.type = "Feature"
                } catch (err) {
                    NLog.error(err)
                }
                break;
            case "FeatureCollection":
                results = [];
                switch (obj.type) {
                case "Feature":
                    try {
                        results.push(this.parseFeature(obj))
                    } catch (err) {
                        results = null;
                        NLog.error(err)
                    }
                    break;
                case "FeatureCollection":
                    for (var i = 0, len = obj.features.length; i < len; ++i) {
                        try {
                            results.push(this.parseFeature(obj.features[i]))
                        } catch (err) {
                            results = null;
                            NLog.error(err)
                        }
                    }
                    break;
                default:
                    try {
                        var geom = this.parseGeometry(obj);
                        results.push(new NVectorFeature(geom))
                    } catch (err) {
                        results = null;
                        NLog.error(err)
                    }
                }
                break
            }
        }
        return results
    },
    isValidType: function (obj, type) {
        var valid = false;
        switch (type) {
        case "Geometry":
            if (NUtility.indexOf(["Point", "MultiPoint", "LineString", "MultiLineString", "Polygon", "MultiPolygon", "Box", "GeometryCollection"], obj.type) == -1) {
                NLog.error("Unsupported geometry type: " + obj.type)
            } else {
                valid = true
            }
            break;
        case "FeatureCollection":
            valid = true;
            break;
        default:
            if (obj.type == type) {
                valid = true
            } else {
                NLog.error("Cannot convert types from " + obj.type + " to " + type)
            }
        }
        return valid
    },
    parseFeature: function (obj) {
        var feature, geometry, attributes;
        attributes = (obj.properties) ? obj.properties : {};
        try {
            geometry = this.parseGeometry(obj.geometry)
        } catch (err) {
            throw err
        }
        feature = new NVectorFeature(geometry, attributes);
        if (obj.id) {
            feature.fid = obj.id
        }
        return feature
    },
    parseGeometry: function (obj) {
        if (obj == null) {
            return null
        }
        var geometry;
        if (obj.type == "GeometryCollection") {
            if (!(obj.geometries instanceof Array)) {
                throw "GeometryCollection must have geometries array: " + obj
            }
            var numGeom = obj.geometries.length;
            var components = new Array(numGeom);
            for (var i = 0; i < numGeom; ++i) {
                components[i] = this.parseGeometry.apply(this, [obj.geometries[i]])
            }
            geometry = new NGeometry.Collection(components)
        } else {
            if (!(obj.coordinates instanceof Array)) {
                throw "Geometry must have coordinates array: " + obj
            }
            if (!this.parseCoords[obj.type.toLowerCase()]) {
                throw "Unsupported geometry type: " + obj.type
            }
            try {
                geometry = this.parseCoords[obj.type.toLowerCase()].apply(this, [obj.coordinates])
            } catch (err) {
                throw err
            }
        }
        if (this.innerProjection && this.outerProjection) {
            geometry.transform(this.outerProjection, this.innerProjection)
        }
        return geometry
    },
    parseCoords: {
        "point": function (array) {
            if (array.length != 2) {
                throw "Only 2D points are supported: " + array
            }
            return new NGeometry.Point(array[0], array[1])
        },
        "multipoint": function (array) {
            var points = [];
            var p = null;
            for (var i = 0, len = array.length; i < len; ++i) {
                try {
                    p = this.parseCoords["point"].apply(this, [array[i]])
                } catch (err) {
                    throw err
                }
                points.push(p)
            }
            return new NGeometry.MultiPoint(points)
        },
        "linestring": function (array) {
            var points = [];
            var p = null;
            for (var i = 0, len = array.length; i < len; ++i) {
                try {
                    p = this.parseCoords["point"].apply(this, [array[i]])
                } catch (err) {
                    throw err
                }
                points.push(p)
            }
            return new NGeometry.LineString(points)
        },
        "multilinestring": function (array) {
            var lines = [];
            var l = null;
            for (var i = 0, len = array.length; i < len; ++i) {
                try {
                    l = this.parseCoords["linestring"].apply(this, [array[i]])
                } catch (err) {
                    throw err
                }
                lines.push(l)
            }
            return new NGeometry.MultiLineString(lines)
        },
        "polygon": function (array) {
            var rings = [];
            var r, l;
            for (var i = 0, len = array.length; i < len; ++i) {
                try {
                    l = this.parseCoords["linestring"].apply(this, [array[i]])
                } catch (err) {
                    throw err
                }
                r = new NGeometry.LinearRing(l.components);
                rings.push(r)
            }
            return new NGeometry.Polygon(rings)
        },
        "multipolygon": function (array) {
            var polys = [];
            var p = null;
            for (var i = 0, len = array.length; i < len; ++i) {
                try {
                    p = this.parseCoords["polygon"].apply(this, [array[i]])
                } catch (err) {
                    throw err
                }
                polys.push(p)
            }
            return new NGeometry.MultiPolygon(polys)
        },
        "box": function (array) {
            if (array.length != 2) {
                throw "GeoJSON box coordinates must have 2 elements"
            }
            return new NGeometry.Polygon([new NGeometry.LinearRing([new NGeometry.Point(array[0][0], array[0][1]), new NGeometry.Point(array[1][0], array[0][1]), new NGeometry.Point(array[1][0], array[1][1]), new NGeometry.Point(array[0][0], array[1][1]), new NGeometry.Point(array[0][0], array[0][1])])])
        }
    },
    write: function (obj, pretty) {
        var geojson = {
            "type": null
        };
        if (obj instanceof Array) {
            geojson.type = "FeatureCollection";
            var numFeatures = obj.length;
            geojson.features = new Array(numFeatures);
            for (var i = 0; i < numFeatures; ++i) {
                var element = obj[i];
                if (!element instanceof NVectorFeature) {
                    var msg = "FeatureCollection only supports collections " + "of features: " + element;
                    throw msg
                }
                geojson.features[i] = this.extract.feature.apply(this, [element])
            }
        } else if (obj._CLASS_NAME.indexOf("NGeometry") == 0) {
            geojson = this.extract.geometry.apply(this, [obj])
        } else if (obj instanceof NVectorFeature) {
            geojson = this.extract.feature.apply(this, [obj]);
            if (obj.layer && obj.layer.projection) {
                geojson.crs = this.createCRSObject(obj)
            }
        }
        return NParser.JSON.prototype.write.apply(this, [geojson, pretty])
    },
    createCRSObject: function (object) {
        var proj = object.layer.projection.toString();
        var crs = {};
        if (proj.match(/epsg:/i)) {
            var code = parseInt(proj.substring(proj.indexOf(":") + 1));
            if (code == 4326) {
                crs = {
                    "type": "OGC",
                    "properties": {
                        "urn": "urn:ogc:def:crs:OGC:1.3:CRS84"
                    }
                }
            } else {
                crs = {
                    "type": "EPSG",
                    "properties": {
                        "code": code
                    }
                }
            }
        }
        return crs
    },
    extract: {
        'feature': function (feature) {
            var geom = this.extract.geometry.apply(this, [feature.geometry]);
            return {
                "type": "Feature",
                "id": feature.fid == null ? feature.id : feature.fid,
                "properties": feature.attributes,
                "geometry": geom
            }
        },
        'geometry': function (geometry) {
            if (geometry == null) {
                return null
            }
            if (this.innerProjection && this.outerProjection) {
                geometry = geometry.clone();
                geometry.transform(this.innerProjection, this.outerProjection)
            }
            var geometryType = geometry._CLASS_NAME.split('.')[1];
            var data = this.extract[geometryType.toLowerCase()].apply(this, [geometry]);
            var json;
            if (geometryType == "Collection") {
                json = {
                    "type": "GeometryCollection",
                    "geometries": data
                }
            } else {
                json = {
                    "type": geometryType,
                    "coordinates": data
                }
            }
            return json
        },
        'point': function (point) {
            return [point.x, point.y]
        },
        'multipoint': function (multipoint) {
            var array = [];
            for (var i = 0, len = multipoint.components.length; i < len; ++i) {
                array.push(this.extract.point.apply(this, [multipoint.components[i]]))
            }
            return array
        },
        'linestring': function (linestring) {
            var array = [];
            for (var i = 0, len = linestring.components.length; i < len; ++i) {
                array.push(this.extract.point.apply(this, [linestring.components[i]]))
            }
            return array
        },
        'multilinestring': function (multilinestring) {
            var array = [];
            for (var i = 0, len = multilinestring.components.length; i < len; ++i) {
                array.push(this.extract.linestring.apply(this, [multilinestring.components[i]]))
            }
            return array
        },
        'polygon': function (polygon) {
            var array = [];
            for (var i = 0, len = polygon.components.length; i < len; ++i) {
                array.push(this.extract.linestring.apply(this, [polygon.components[i]]))
            }
            return array
        },
        'multipolygon': function (multipolygon) {
            var array = [];
            for (var i = 0, len = multipolygon.components.length; i < len; ++i) {
                array.push(this.extract.polygon.apply(this, [multipolygon.components[i]]))
            }
            return array
        },
        'collection': function (collection) {
            var len = collection.components.length;
            var array = new Array(len);
            for (var i = 0; i < len; ++i) {
                array[i] = this.extract.geometry.apply(this, [collection.components[i]])
            }
            return array
        }
    },
    _CLASS_NAME: "NParser.GeoJSON"
});
NParser.ArcXML = NObject(NParser.XML, {
    fontStyleKeys: ['antialiasing', 'blockout', 'font', 'fontcolor', 'fontsize', 'fontstyle', 'glowing', 'interval', 'outline', 'printmode', 'shadow', 'transparency'],
    request: null,
    response: null,
    construct: function (options) {
        this.request = new NParser.ArcXML.Request();
        this.response = new NParser.ArcXML.Response();
        if (options) {
            if (options.requesttype == "feature") {
                this.request.get_image = null;
                var qry = this.request.get_feature.query;
                this.addCoordSys(qry.featurecoordsys, options.featureCoordSys);
                this.addCoordSys(qry.filtercoordsys, options.filterCoordSys);
                if (options.polygon) {
                    qry.isspatial = true;
                    qry.spatialfilter.polygon = options.polygon
                } else if (options.envelope) {
                    qry.isspatial = true;
                    qry.spatialfilter.envelope = {
                        minx: 0,
                        miny: 0,
                        maxx: 0,
                        maxy: 0
                    };
                    this.parseEnvelope(qry.spatialfilter.envelope, options.envelope)
                }
            } else if (options.requesttype == "image") {
                this.request.get_feature = null;
                var props = this.request.get_image.properties;
                this.parseEnvelope(props.envelope, options.envelope);
                this.addLayers(props.layerlist, options.layers);
                this.addImageSize(props.imagesize, options.tileSize);
                this.addCoordSys(props.featurecoordsys, options.featureCoordSys);
                this.addCoordSys(props.filtercoordsys, options.filterCoordSys)
            } else {
                this.request = null
            }
        }
        NParser.XML.prototype.construct.apply(this, [options])
    },
    parseEnvelope: function (env, arr) {
        if (arr && arr.length == 4) {
            env.minx = arr[0];
            env.miny = arr[1];
            env.maxx = arr[2];
            env.maxy = arr[3]
        }
    },
    addLayers: function (ll, lyrs) {
        for (var lind = 0, len = lyrs.length; lind < len; lind++) {
            ll.push(lyrs[lind])
        }
    },
    addImageSize: function (imsize, olsize) {
        if (olsize !== null) {
            imsize.width = olsize.w;
            imsize.height = olsize.h;
            imsize.printwidth = olsize.w;
            imsize.printheight = olsize.h
        }
    },
    addCoordSys: function (featOrFilt, fsys) {
        if (typeof fsys == "string") {
            featOrFilt.id = parseInt(fsys);
            featOrFilt.string = fsys
        } else if (typeof fsys == "object" && fsys.proj !== null) {
            featOrFilt.id = fsys.proj.srsProjNumber;
            featOrFilt.string = fsys.proj.srsCode
        } else {
            featOrFilt = fsys
        }
    },
    iserror: function (data) {
        var ret = null;
        if (!data) {
            ret = (this.response.error !== '')
        } else {
            data = NParser.XML.prototype.read.apply(this, [data]);
            var errorNodes = data.documentElement.getElementsByTagName("ERROR");
            ret = (errorNodes !== null && errorNodes.length > 0)
        }
        return ret
    },
    read: function (data) {
        if (typeof data == "string") {
            data = NParser.XML.prototype.read.apply(this, [data])
        }
        var arcNode = null;
        if (data && data.documentElement) {
            if (data.documentElement.nodeName == "ARCXML") {
                arcNode = data.documentElement
            } else {
                arcNode = data.documentElement.getElementsByTagName("ARCXML")[0]
            }
        }
        if (!arcNode || arcNode.firstChild.nodeName === 'parsererror') {
            var error, source;
            try {
                error = data.firstChild.nodeValue;
                source = data.firstChild.childNodes[1].firstChild.nodeValue
            } catch (err) {}
            throw {
                message: "Error parsing the ArcXML request",
                error: error,
                source: source
            }
        }
        var response = this.parseResponse(arcNode);
        return response
    },
    write: function (request) {
        if (!request) {
            request = this.request
        }
        var root = this.createElementNS("", "ARCXML");
        root.setAttribute("version", "1.1");
        var reqElem = this.createElementNS("", "REQUEST");
        if (request.get_image != null) {
            var getElem = this.createElementNS("", "GET_IMAGE");
            reqElem.appendChild(getElem);
            var propElem = this.createElementNS("", "PROPERTIES");
            getElem.appendChild(propElem);
            var props = request.get_image.properties;
            if (props.featurecoordsys != null) {
                var feat = this.createElementNS("", "FEATURECOORDSYS");
                propElem.appendChild(feat);
                if (props.featurecoordsys.id === 0) {
                    feat.setAttribute("string", props.featurecoordsys['string'])
                } else {
                    feat.setAttribute("id", props.featurecoordsys.id)
                }
            }
            if (props.filtercoordsys != null) {
                var filt = this.createElementNS("", "FILTERCOORDSYS");
                propElem.appendChild(filt);
                if (props.filtercoordsys.id === 0) {
                    filt.setAttribute("string", props.filtercoordsys.string)
                } else {
                    filt.setAttribute("id", props.filtercoordsys.id)
                }
            }
            if (props.envelope != null) {
                var env = this.createElementNS("", "ENVELOPE");
                propElem.appendChild(env);
                env.setAttribute("minx", props.envelope.minx);
                env.setAttribute("miny", props.envelope.miny);
                env.setAttribute("maxx", props.envelope.maxx);
                env.setAttribute("maxy", props.envelope.maxy)
            }
            var imagesz = this.createElementNS("", "IMAGESIZE");
            propElem.appendChild(imagesz);
            imagesz.setAttribute("height", props.imagesize.height);
            imagesz.setAttribute("width", props.imagesize.width);
            if (props.imagesize.height != props.imagesize.printheight || props.imagesize.width != props.imagesize.printwidth) {
                imagesz.setAttribute("printheight", props.imagesize.printheight);
                imagesz.setArrtibute("printwidth", props.imagesize.printwidth)
            }
            if (props.background != null) {
                var backgrnd = this.createElementNS("", "BACKGROUND");
                propElem.appendChild(backgrnd);
                backgrnd.setAttribute("color", props.background.color.r + "," + props.background.color.g + "," + props.background.color.b);
                if (props.background.transcolor !== null) {
                    backgrnd.setAttribute("transcolor", props.background.transcolor.r + "," + props.background.transcolor.g + "," + props.background.transcolor.b)
                }
            }
            if (props.layerlist != null && props.layerlist.length > 0) {
                var layerlst = this.createElementNS("", "LAYERLIST");
                propElem.appendChild(layerlst);
                for (var ld = 0; ld < props.layerlist.length; ld++) {
                    var ldef = this.createElementNS("", "LAYERDEF");
                    layerlst.appendChild(ldef);
                    ldef.setAttribute("id", props.layerlist[ld].id);
                    ldef.setAttribute("visible", props.layerlist[ld].visible);
                    if (typeof props.layerlist[ld].query == "object") {
                        var query = props.layerlist[ld].query;
                        if (query.where.length < 0) {
                            continue
                        }
                        var queryElem = null;
                        if (typeof query.spatialfilter == "boolean" && query.spatialfilter) {
                            queryElem = this.createElementNS("", "SPATIALQUERY")
                        } else {
                            queryElem = this.createElementNS("", "QUERY")
                        }
                        queryElem.setAttribute("where", query.where);
                        if (typeof query.accuracy == "number" && query.accuracy > 0) {
                            queryElem.setAttribute("accuracy", query.accuracy)
                        }
                        if (typeof query.featurelimit == "number" && query.featurelimit < 2000) {
                            queryElem.setAttribute("featurelimit", query.featurelimit)
                        }
                        if (typeof query.subfields == "string" && query.subfields != "#ALL#") {
                            queryElem.setAttribute("subfields", query.subfields)
                        }
                        if (typeof query.joinexpression == "string" && query.joinexpression.length > 0) {
                            queryElem.setAttribute("joinexpression", query.joinexpression)
                        }
                        if (typeof query.jointables == "string" && query.jointables.length > 0) {
                            queryElem.setAttribute("jointables", query.jointables)
                        }
                        ldef.appendChild(queryElem)
                    }
                    if (typeof props.layerlist[ld].renderer == "object") {
                        this.addRenderer(ldef, props.layerlist[ld].renderer)
                    }
                }
            }
        } else if (request.get_feature != null) {
            var getElem = this.createElementNS("", "GET_FEATURES");
            getElem.setAttribute("outputmode", "newxml");
            getElem.setAttribute("checkesc", "true");
            if (request.get_feature.geometry) {
                getElem.setAttribute("geometry", request.get_feature.geometry)
            } else {
                getElem.setAttribute("geometry", "false")
            }
            if (request.get_feature.compact) {
                getElem.setAttribute("compact", request.get_feature.compact)
            }
            if (request.get_feature.featurelimit == "number") {
                getElem.setAttribute("featurelimit", request.get_feature.featurelimit)
            }
            getElem.setAttribute("globalenvelope", "true");
            reqElem.appendChild(getElem);
            if (request.get_feature.layer != null && request.get_feature.layer.length > 0) {
                var lyrElem = this.createElementNS("", "LAYER");
                lyrElem.setAttribute("id", request.get_feature.layer);
                getElem.appendChild(lyrElem)
            }
            var fquery = request.get_feature.query;
            if (fquery != null) {
                var qElem = null;
                if (fquery.isspatial) {
                    qElem = this.createElementNS("", "SPATIALQUERY")
                } else {
                    qElem = this.createElementNS("", "QUERY")
                }
                getElem.appendChild(qElem);
                if (typeof fquery.accuracy == "number") {
                    qElem.setAttribute("accuracy", fquery.accuracy)
                }
                if (fquery.featurecoordsys != null) {
                    var fcsElem1 = this.createElementNS("", "FEATURECOORDSYS");
                    if (fquery.featurecoordsys.id == 0) {
                        fcsElem1.setAttribute("string", fquery.featurecoordsys.string)
                    } else {
                        fcsElem1.setAttribute("id", fquery.featurecoordsys.id)
                    }
                    qElem.appendChild(fcsElem1)
                }
                if (fquery.filtercoordsys != null) {
                    var fcsElem2 = this.createElementNS("", "FILTERCOORDSYS");
                    if (fquery.filtercoordsys.id === 0) {
                        fcsElem2.setAttribute("string", fquery.filtercoordsys.string)
                    } else {
                        fcsElem2.setAttribute("id", fquery.filtercoordsys.id)
                    }
                    qElem.appendChild(fcsElem2)
                }
                if (fquery.buffer > 0) {
                    var bufElem = this.createElementNS("", "BUFFER");
                    bufElem.setAttribute("distance", fquery.buffer);
                    qElem.appendChild(bufElem)
                }
                if (fquery.isspatial) {
                    var spfElem = this.createElementNS("", "SPATIALFILTER");
                    spfElem.setAttribute("relation", fquery.spatialfilter.relation);
                    qElem.appendChild(spfElem);
                    if (fquery.spatialfilter.envelope) {
                        var envElem = this.createElementNS("", "ENVELOPE");
                        envElem.setAttribute("minx", fquery.spatialfilter.envelope.minx);
                        envElem.setAttribute("miny", fquery.spatialfilter.envelope.miny);
                        envElem.setAttribute("maxx", fquery.spatialfilter.envelope.maxx);
                        envElem.setAttribute("maxy", fquery.spatialfilter.envelope.maxy);
                        spfElem.appendChild(envElem)
                    } else if (typeof fquery.spatialfilter.polygon == "object") {
                        spfElem.appendChild(this.writePolygonGeometry(fquery.spatialfilter.polygon))
                    }
                }
                if (fquery.where != null && fquery.where.length > 0) {
                    qElem.setAttribute("where", fquery.where)
                }
            }
        }
        root.appendChild(reqElem);
        return NParser.XML.prototype.write.apply(this, [root])
    },
    addGroupRenderer: function (ldef, toprenderer) {
        var topRelem = this.createElementNS("", "GROUPRENDERER");
        ldef.appendChild(topRelem);
        for (var rind = 0; rind < toprenderer.length; rind++) {
            var renderer = toprenderer[rind];
            this.addRenderer(topRelem, renderer)
        }
    },
    addRenderer: function (topRelem, renderer) {
        if (renderer instanceof Array) {
            this.addGroupRenderer(topRelem, renderer)
        } else {
            var renderElem = this.createElementNS("", renderer.type.toUpperCase() + "RENDERER");
            topRelem.appendChild(renderElem);
            if (renderElem.tagName == "VALUEMAPRENDERER") {
                this.addValueMapRenderer(renderElem, renderer)
            } else if (renderElem.tagName == "VALUEMAPLABELRENDERER") {
                this.addValueMapLabelRenderer(renderElem, renderer)
            } else if (renderElem.tagName == "SIMPLELABELRENDERER") {
                this.addSimpleLabelRenderer(renderElem, renderer)
            } else if (renderElem.tagName == "SCALEDEPENDENTRENDERER") {
                this.addScaleDependentRenderer(renderElem, renderer)
            }
        }
    },
    addScaleDependentRenderer: function (renderElem, renderer) {
        if (typeof renderer.lower == "string" || typeof renderer.lower == "number") {
            renderElem.setAttribute("lower", renderer.lower)
        }
        if (typeof renderer.upper == "string" || typeof renderer.upper == "number") {
            renderElem.setAttribute("upper", renderer.upper)
        }
        this.addRenderer(renderElem, renderer.renderer)
    },
    addValueMapLabelRenderer: function (renderElem, renderer) {
        renderElem.setAttribute("lookupfield", renderer.lookupfield);
        renderElem.setAttribute("labelfield", renderer.labelfield);
        if (typeof renderer.exacts == "object") {
            for (var ext = 0, extlen = renderer.exacts.length; ext < extlen; ext++) {
                var exact = renderer.exacts[ext];
                var eelem = this.createElementNS("", "EXACT");
                if (typeof exact.value == "string") {
                    eelem.setAttribute("value", exact.value)
                }
                if (typeof exact.label == "string") {
                    eelem.setAttribute("label", exact.label)
                }
                if (typeof exact.method == "string") {
                    eelem.setAttribute("method", exact.method)
                }
                renderElem.appendChild(eelem);
                if (typeof exact.symbol == "object") {
                    var selem = null;
                    if (exact.symbol.type == "text") {
                        selem = this.createElementNS("", "TEXTSYMBOL")
                    }
                    if (selem != null) {
                        var keys = this.fontStyleKeys;
                        for (var i = 0, len = keys.length; i < len; i++) {
                            var key = keys[i];
                            if (exact.symbol[key]) {
                                selem.setAttribute(key, exact.symbol[key])
                            }
                        }
                        eelem.appendChild(selem)
                    }
                }
            }
        }
    },
    addValueMapRenderer: function (renderElem, renderer) {
        renderElem.setAttribute("lookupfield", renderer.lookupfield);
        if (typeof renderer.ranges == "object") {
            for (var rng = 0, rnglen = renderer.ranges.length; rng < rnglen; rng++) {
                var range = renderer.ranges[rng];
                var relem = this.createElementNS("", "RANGE");
                relem.setAttribute("lower", range.lower);
                relem.setAttribute("upper", range.upper);
                renderElem.appendChild(relem);
                if (typeof range.symbol == "object") {
                    var selem = null;
                    if (range.symbol.type == "simplepolygon") {
                        selem = this.createElementNS("", "SIMPLEPOLYGONSYMBOL")
                    }
                    if (selem != null) {
                        if (typeof range.symbol.boundarycolor == "string") {
                            selem.setAttribute("boundarycolor", range.symbol.boundarycolor)
                        }
                        if (typeof range.symbol.fillcolor == "string") {
                            selem.setAttribute("fillcolor", range.symbol.fillcolor)
                        }
                        if (typeof range.symbol.filltransparency == "number") {
                            selem.setAttribute("filltransparency", range.symbol.filltransparency)
                        }
                        relem.appendChild(selem)
                    }
                }
            }
        } else if (typeof renderer.exacts == "object") {
            for (var ext = 0, extlen = renderer.exacts.length; ext < extlen; ext++) {
                var exact = renderer.exacts[ext];
                var eelem = this.createElementNS("", "EXACT");
                if (typeof exact.value == "string") {
                    eelem.setAttribute("value", exact.value)
                }
                if (typeof exact.label == "string") {
                    eelem.setAttribute("label", exact.label)
                }
                if (typeof exact.method == "string") {
                    eelem.setAttribute("method", exact.method)
                }
                renderElem.appendChild(eelem);
                if (typeof exact.symbol == "object") {
                    var selem = null;
                    if (exact.symbol.type == "simplemarker") {
                        selem = this.createElementNS("", "SIMPLEMARKERSYMBOL")
                    }
                    if (selem != null) {
                        if (typeof exact.symbol.antialiasing == "string") {
                            selem.setAttribute("antialiasing", exact.symbol.antialiasing)
                        }
                        if (typeof exact.symbol.color == "string") {
                            selem.setAttribute("color", exact.symbol.color)
                        }
                        if (typeof exact.symbol.outline == "string") {
                            selem.setAttribute("outline", exact.symbol.outline)
                        }
                        if (typeof exact.symbol.overlap == "string") {
                            selem.setAttribute("overlap", exact.symbol.overlap)
                        }
                        if (typeof exact.symbol.shadow == "string") {
                            selem.setAttribute("shadow", exact.symbol.shadow)
                        }
                        if (typeof exact.symbol.transparency == "number") {
                            selem.setAttribute("transparency", exact.symbol.transparency)
                        }
                        if (typeof exact.symbol.usecentroid == "string") {
                            selem.setAttribute("usecentroid", exact.symbol.usecentroid)
                        }
                        if (typeof exact.symbol.width == "number") {
                            selem.setAttribute("width", exact.symbol.width)
                        }
                        eelem.appendChild(selem)
                    }
                }
            }
        }
    },
    addSimpleLabelRenderer: function (renderElem, renderer) {
        renderElem.setAttribute("field", renderer.field);
        var keys = ['featureweight', 'howmanylabels', 'labelbufferratio', 'labelpriorities', 'labelweight', 'linelabelposition', 'rotationalangles'];
        for (var i = 0, len = keys.length; i < len; i++) {
            var key = keys[i];
            if (renderer[key]) {
                renderElem.setAttribute(key, renderer[key])
            }
        }
        if (renderer.symbol.type == "text") {
            var symbol = renderer.symbol;
            var selem = this.createElementNS("", "TEXTSYMBOL");
            renderElem.appendChild(selem);
            var keys = this.fontStyleKeys;
            for (var i = 0, len = keys.length; i < len; i++) {
                var key = keys[i];
                if (symbol[key]) {
                    selem.setAttribute(key, renderer[key])
                }
            }
        }
    },
    writePolygonGeometry: function (polygon) {
        if (!(polygon instanceof NGeometry.Polygon)) {
            throw {
                message: 'Cannot write polygon geometry to ArcXML with an ' + polygon.CLASS_NAME + ' object.',
                geometry: polygon
            }
        }
        var polyElem = this.createElementNS("", "POLYGON");
        for (var ln = 0, lnlen = polygon.components.length; ln < lnlen; ln++) {
            var ring = polygon.components[ln];
            var ringElem = this.createElementNS("", "RING");
            for (var rn = 0, rnlen = ring.components.length; rn < rnlen; rn++) {
                var point = ring.components[rn];
                var pointElem = this.createElementNS("", "POINT");
                pointElem.setAttribute("x", point.x);
                pointElem.setAttribute("y", point.y);
                ringElem.appendChild(pointElem)
            }
            polyElem.appendChild(ringElem)
        }
        return polyElem
    },
    parseResponse: function (data) {
        if (typeof data == "string") {
            var newData = new NParser.XML();
            data = newData.read(data)
        }
        var response = new NParser.ArcXML.Response();
        var errorNode = data.getElementsByTagName("ERROR");
        if (errorNode != null && errorNode.length > 0) {
            response.error = this.getChildValue(errorNode, "Unknown error.")
        } else {
            var responseNode = data.getElementsByTagName("RESPONSE");
            if (responseNode == null || responseNode.length == 0) {
                response.error = "No RESPONSE tag found in ArcXML response.";
                return response
            }
            var rtype = responseNode[0].firstChild.nodeName;
            if (rtype == "#text") {
                rtype = responseNode[0].firstChild.nextSibling.nodeName
            }
            if (rtype == "IMAGE") {
                var envelopeNode = data.getElementsByTagName("ENVELOPE");
                var outputNode = data.getElementsByTagName("OUTPUT");
                if (envelopeNode == null || envelopeNode.length == 0) {
                    response.error = "No ENVELOPE tag found in ArcXML response."
                } else if (outputNode == null || outputNode.length == 0) {
                    response.error = "No OUTPUT tag found in ArcXML response."
                } else {
                    var envAttr = this.parseAttributes(envelopeNode[0]);
                    var outputAttr = this.parseAttributes(outputNode[0]);
                    if (typeof outputAttr.type == "string") {
                        response.image = {
                            envelope: envAttr,
                            output: {
                                type: outputAttr.type,
                                data: this.getChildValue(outputNode[0])
                            }
                        }
                    } else {
                        response.image = {
                            envelope: envAttr,
                            output: outputAttr
                        }
                    }
                }
            } else if (rtype == "FEATURES") {
                var features = responseNode[0].getElementsByTagName("FEATURES");
                var featureCount = features[0].getElementsByTagName("FEATURECOUNT");
                response.features.featurecount = featureCount[0].getAttribute("count");
                if (response.features.featurecount > 0) {
                    var envelope = features[0].getElementsByTagName("ENVELOPE");
                    response.features.envelope = this.parseAttributes(envelope[0], typeof (0));
                    var featureList = features[0].getElementsByTagName("FEATURE");
                    for (var fn = 0; fn < featureList.length; fn++) {
                        var feature = new NVectorFeature();
                        var fields = featureList[fn].getElementsByTagName("FIELD");
                        for (var fdn = 0; fdn < fields.length; fdn++) {
                            var fieldName = fields[fdn].getAttribute("name");
                            var fieldValue = fields[fdn].getAttribute("value");
                            feature.attributes[fieldName] = fieldValue
                        }
                        var geom = featureList[fn].getElementsByTagName("POLYGON");
                        if (geom.length > 0) {
                            var ring = geom[0].getElementsByTagName("RING");
                            var polys = [];
                            for (var rn = 0; rn < ring.length; rn++) {
                                var linearRings = [];
                                linearRings.push(this.parsePointGeometry(ring[rn]));
                                var holes = ring[rn].getElementsByTagName("HOLE");
                                for (var hn = 0; hn < holes.length; hn++) {
                                    linearRings.push(this.parsePointGeometry(holes[hn]))
                                }
                                holes = null;
                                polys.push(new NGeometry.Polygon(linearRings));
                                linearRings = null
                            }
                            ring = null;
                            if (polys.length == 1) {
                                feature.geometry = polys[0]
                            } else {
                                feature.geometry = new NGeometry.MultiPolygon(polys)
                            }
                        }
                        response.features.feature.push(feature)
                    }
                }
            } else {
                response.error = "Unidentified response type."
            }
        }
        return response
    },
    parseAttributes: function (node, type) {
        var attributes = {};
        for (var attr = 0; attr < node.attributes.length; attr++) {
            if (type == "number") {
                attributes[node.attributes[attr].nodeName] = parseFloat(node.attributes[attr].nodeValue)
            } else {
                attributes[node.attributes[attr].nodeName] = node.attributes[attr].nodeValue
            }
        }
        return attributes
    },
    parsePointGeometry: function (node) {
        var ringPoints = [];
        var coords = node.getElementsByTagName("COORDS");
        if (coords.length > 0) {
            var coordArr = this.getChildValue(coords[0]);
            coordArr = coordArr.split(/;/);
            for (var cn = 0; cn < coordArr.length; cn++) {
                var coordItems = coordArr[cn].split(/ /);
                ringPoints.push(new NGeometry.Point(parseFloat(coordItems[0]), parseFloat(coordItems[1])))
            }
            coords = null
        } else {
            var point = node.getElementsByTagName("POINT");
            if (point.length > 0) {
                for (var pn = 0; pn < point.length; pn++) {
                    ringPoints.push(new NGeometry.Point(parseFloat(point[pn].getAttribute("x")), parseFloat(point[pn].getAttribute("y"))))
                }
            }
            point = null
        }
        return new NGeometry.LinearRing(ringPoints)
    },
    _CLASS_NAME: "NParser.ArcXML"
});
NParser.ArcXML.Request = NObject({
    construct: function (params) {
        var defaults = {
            get_image: {
                properties: {
                    background: null,
                    draw: true,
                    envelope: {
                        minx: 0,
                        miny: 0,
                        maxx: 0,
                        maxy: 0
                    },
                    featurecoordsys: {
                        id: 0,
                        string: "",
                        datumtransformid: 0,
                        datumtransformstring: ""
                    },
                    filtercoordsys: {
                        id: 0,
                        string: "",
                        datumtransformid: 0,
                        datumtransformstring: ""
                    },
                    imagesize: {
                        height: 0,
                        width: 0,
                        dpi: 96,
                        printheight: 0,
                        printwidth: 0,
                        scalesymbols: false
                    },
                    layerlist: [],
                    output: {
                        baseurl: "",
                        legendbaseurl: "",
                        legendname: "",
                        legendpath: "",
                        legendurl: "",
                        name: "",
                        path: "",
                        type: "jpg",
                        url: ""
                    }
                }
            },
            get_feature: {
                layer: "",
                query: {
                    isspatial: false,
                    featurecoordsys: {
                        id: 0,
                        string: "",
                        datumtransformid: 0,
                        datumtransformstring: ""
                    },
                    filtercoordsys: {
                        id: 0,
                        string: "",
                        datumtransformid: 0,
                        datumtransformstring: ""
                    },
                    buffer: 0,
                    where: "",
                    spatialfilter: {
                        relation: "envelope_intersection",
                        envelope: null
                    }
                }
            },
            environment: {
                separators: {
                    cs: " ",
                    ts: ";"
                }
            },
            layer: [],
            workspaces: []
        };
        return NUtility.extend(this, defaults)
    },
    _CLASS_NAME: "NParser.ArcXML.Request"
});
NParser.ArcXML.Response = NObject({
    construct: function (params) {
        var defaults = {
            image: {
                envelope: null,
                output: ''
            },
            features: {
                featurecount: 0,
                envelope: null,
                feature: []
            },
            error: ''
        };
        return OpenLayers.Util.extend(this, defaults)
    },
    _CLASS_NAME: "NParser.ArcXML.Response"
});
NParser.ArcXML.Features = NObject(NParser.XML, {
    construct: function (options) {
        NParser.XML.prototype.construct.apply(this, [options])
    },
    read: function (data) {
        var axl = new NParser.ArcXML();
        var parsed = axl.read(data);
        return parsed.features.feature
    }
});
NParser.WMC = NObject({
    defaultVersion: "1.1.0",
    version: null,
    layerOptions: null,
    parser: null,
    construct: function (options) {
        NUtility.extend(this, options);
        this.options = options
    },
    read: function (data, options) {
        if (typeof data == "string") {
            data = NParser.XML.prototype.read.apply(this, [data])
        }
        var root = data.documentElement;
        var version = this.version;
        if (!version) {
            version = root.getAttribute("version");
            if (!version) {
                version = this.defaultVersion
            }
        }
        if (!this.parser || this.parser.VERSION != version) {
            var format = NParser.WMC["v" + version.replace(/\./g, "_")];
            if (!format) {
                throw "Can't find a WMC parser for version " + version
            }
            this.parser = new format(this.options)
        }
        var context = this.parser.read(data, options);
        var map;
        if (options.map) {
            this.context = context;
            if (options.map instanceof NMap) {
                map = this.addContextToMap(context, options.map)
            } else {
                map = this.getMapFromContext(context, options.map)
            }
        } else {
            map = context
        }
        return map
    },
    getMapFromContext: function (context, id) {
        var map = new NMap(id, {
            maxExtent: context.maxExtent,
            projection: context.projection
        });
        map.addLayers(context.layers);
        map.setCenter(context.bounds.getCenterInLatLng(), map.getZoomLevelByExtent(context.bounds, true));
        return map
    },
    addContextToMap: function (context, map) {
        map.addLayers(context.layers);
        return map
    },
    write: function (obj, options) {
        if (obj._CLASS_NAME == "NMap") {
            obj = this.getContextFromMap(obj)
        }
        var version = (options && options.version) || this.version || this.defaultVersion;
        if (!this.parser || this.parser.VERSION != version) {
            var format = NParser.WMC["v" + version.replace(/\./g, "_")];
            if (!format) {
                throw "Can't find a WMS capabilities parser for version " + version
            }
            this.parser = new format(this.options)
        }
        var wmc = this.parser.write(obj, options);
        return wmc
    },
    getContextFromMap: function (map) {
        var context = {
            bounds: map.getExtent(),
            maxExtent: map.maxExtent,
            projection: map.projection,
            layers: map.layers,
            size: map.getSize()
        };
        return context
    },
    _CLASS_NAME: "NParser.WMC"
});
NParser.WMC.v1 = NObject(NParser.XML, {
    namespaces: {
        nm: "http://openlayers.org/context",
        wmc: "http://www.opengis.net/context",
        sld: "http://www.opengis.net/sld",
        xlink: "http://www.w3.org/1999/xlink",
        xsi: "http://www.w3.org/2001/XMLSchema-instance"
    },
    schemaLocation: "",
    getNamespacePrefix: function (uri) {
        var prefix = null;
        if (uri == null) {
            prefix = this.namespaces[this.defaultPrefix]
        } else {
            for (prefix in this.namespaces) {
                if (this.namespaces[prefix] == uri) {
                    break
                }
            }
        }
        return prefix
    },
    defaultPrefix: "wmc",
    rootPrefix: null,
    defaultStyleName: "",
    defaultStyleTitle: "Default",
    construct: function (options) {
        NParser.XML.prototype.construct.apply(this, [options])
    },
    read: function (data) {
        if (typeof data == "string") {
            data = NParser.XML.prototype.read.apply(this, [data])
        }
        var root = data.documentElement;
        this.rootPrefix = root.prefix;
        var context = {
            version: root.getAttribute("version")
        };
        this.runChildNodes(context, root);
        return context
    },
    runChildNodes: function (obj, node) {
        var children = node.childNodes;
        var childNode, processor, prefix, local;
        for (var i = 0, len = children.length; i < len; ++i) {
            childNode = children[i];
            if (childNode.nodeType == 1) {
                prefix = this.getNamespacePrefix(childNode.namespaceURI);
                local = childNode.nodeName.split(":").pop();
                processor = this["read_" + prefix + "_" + local];
                if (processor) {
                    processor.apply(this, [obj, childNode])
                }
            }
        }
    },
    read_wmc_General: function (context, node) {
        this.runChildNodes(context, node)
    },
    read_wmc_BoundingBox: function (context, node) {
        context.projection = node.getAttribute("SRS");
        context.bounds = new NBounds(parseFloat(node.getAttribute("minx")), parseFloat(node.getAttribute("miny")), parseFloat(node.getAttribute("maxx")), parseFloat(node.getAttribute("maxy")))
    },
    read_wmc_LayerList: function (context, node) {
        context.layers = [];
        this.runChildNodes(context, node)
    },
    read_wmc_Layer: function (context, node) {
        var layerInfo = {
            params: {},
            options: {
                visible: (node.getAttribute("hidden") != "1"),
                queryable: (node.getAttribute("queryable") == "1")
            },
            formats: [],
            styles: []
        };
        this.runChildNodes(layerInfo, node);
        layerInfo.params.layers = layerInfo.name;
        layerInfo.options.maxExtent = layerInfo.maxExtent;
        var layer = this.getLayerFromInfo(layerInfo);
        context.layers.push(layer)
    },
    getLayerFromInfo: function (layerInfo) {
        var options = layerInfo.options;
        if (this.layerOptions) {
            NUtility.applyDefaults(options, this.layerOptions)
        }
        var layer = new NWMSLayer(layerInfo.title, layerInfo.href, layerInfo.params, options);
        return layer
    },
    read_wmc_Extension: function (obj, node) {
        this.runChildNodes(obj, node)
    },
    read_ol_units: function (layerInfo, node) {
        layerInfo.options.units = this.getChildNodeValue(node)
    },
    read_ol_maxExtent: function (obj, node) {
        var bounds = new NBounds(node.getAttribute("minx"), node.getAttribute("miny"), node.getAttribute("maxx"), node.getAttribute("maxy"));
        obj.maxExtent = bounds
    },
    read_ol_transparent: function (layerInfo, node) {
        layerInfo.params.transparent = this.getChildNodeValue(node)
    },
    read_ol_numZoomLevels: function (layerInfo, node) {
        layerInfo.options.zoomLevelsCount = parseInt(this.getChildNodeValue(node))
    },
    read_ol_opacity: function (layerInfo, node) {
        layerInfo.options.opacity = parseFloat(this.getChildNodeValue(node))
    },
    read_ol_singleTile: function (layerInfo, node) {
        layerInfo.options.singleTile = (this.getChildNodeValue(node) == "true")
    },
    read_ol_isBasicLayer: function (layerInfo, node) {
        layerInfo.options.isBasicLayer = (this.getChildNodeValue(node) == "true")
    },
    read_ol_showInLayerList: function (layerInfo, node) {
        layerInfo.options.showInLayerList = (this.getChildNodeValue(node) == "true")
    },
    read_wmc_Server: function (layerInfo, node) {
        layerInfo.params.version = node.getAttribute("version");
        this.runChildNodes(layerInfo, node)
    },
    read_wmc_FormatList: function (layerInfo, node) {
        this.runChildNodes(layerInfo, node)
    },
    read_wmc_Format: function (layerInfo, node) {
        var format = this.getChildNodeValue(node);
        layerInfo.formats.push(format);
        if (node.getAttribute("current") == "1") {
            layerInfo.params.format = format
        }
    },
    read_wmc_StyleList: function (layerInfo, node) {
        this.runChildNodes(layerInfo, node)
    },
    read_wmc_Style: function (layerInfo, node) {
        var style = {};
        this.runChildNodes(style, node);
        if (node.getAttribute("current") == "1") {
            if (style.href) {
                layerInfo.params.sld = style.href
            } else if (style.body) {
                layerInfo.params.sld_body = style.body
            } else {
                layerInfo.params.styles = style.name
            }
        }
        layerInfo.styles.push(style)
    },
    read_wmc_SLD: function (style, node) {
        this.runChildNodes(style, node)
    },
    read_sld_StyledLayerDescriptor: function (sld, node) {
        var xml = NParser.XML.prototype.write.apply(this, [node]);
        sld.body = xml
    },
    read_wmc_OnlineResource: function (obj, node) {
        obj.href = this.getAttributeNS(node, this.namespaces.xlink, "href")
    },
    read_wmc_Name: function (obj, node) {
        var name = this.getChildNodeValue(node);
        if (name) {
            obj.name = name
        }
    },
    read_wmc_Title: function (obj, node) {
        var title = this.getChildNodeValue(node);
        if (title) {
            obj.title = title
        }
    },
    read_wmc_MetadataURL: function (layerInfo, node) {
        var metadataURL = {};
        var links = node.getElementsByTagName("OnlineResource");
        if (links.length > 0) {
            this.read_wmc_OnlineResource(metadataURL, links[0])
        }
        layerInfo.options.metadataURL = metadataURL.href
    },
    read_wmc_Abstract: function (obj, node) {
        var abst = this.getChildNodeValue(node);
        if (abst) {
            obj["abstract"] = abst
        }
    },
    read_wmc_LatLonBoundingBox: function (layer, node) {
        layer.llbbox = [parseFloat(node.getAttribute("minx")), parseFloat(node.getAttribute("miny")), parseFloat(node.getAttribute("maxx")), parseFloat(node.getAttribute("maxy"))]
    },
    read_wmc_LegendURL: function (style, node) {
        var legend = {
            width: node.getAttribute('width'),
            height: node.getAttribute('height')
        };
        var links = node.getElementsByTagName("OnlineResource");
        if (links.length > 0) {
            this.read_wmc_OnlineResource(legend, links[0])
        }
        style.legend = legend
    },
    write: function (context, options) {
        var root = this.createElementDefaultNS("ViewContext");
        this.setAttributes(root, {
            version: this.VERSION,
            id: (options && typeof options.id == "string") ? options.id : NUtility.createUniqueID("NewMap_Context_")
        });
        this.setAttributeNS(root, this.namespaces.xsi, "xsi:schemaLocation", this.schemaLocation);
        root.appendChild(this.write_wmc_General(context));
        root.appendChild(this.write_wmc_LayerList(context));
        return NParser.XML.prototype.write.apply(this, [root])
    },
    createElementDefaultNS: function (name, childValue, attributes) {
        var node = this.createElementNS(this.namespaces[this.defaultPrefix], name);
        if (childValue) {
            node.appendChild(this.createTextNode(childValue))
        }
        if (attributes) {
            this.setAttributes(node, attributes)
        }
        return node
    },
    setAttributes: function (node, obj) {
        var value;
        for (var name in obj) {
            value = obj[name].toString();
            if (value.match(/[A-Z]/)) {
                this.setAttributeNS(node, null, name, value)
            } else {
                node.setAttribute(name, value)
            }
        }
    },
    write_wmc_General: function (context) {
        var node = this.createElementDefaultNS("General");
        if (context.size) {
            node.appendChild(this.createElementDefaultNS("Window", null, {
                width: context.size.w,
                height: context.size.h
            }))
        }
        var bounds = context.bounds;
        node.appendChild(this.createElementDefaultNS("BoundingBox", null, {
            minx: bounds.left.toPrecision(10),
            miny: bounds.bottom.toPrecision(10),
            maxx: bounds.right.toPrecision(10),
            maxy: bounds.top.toPrecision(10),
            SRS: context.projection
        }));
        node.appendChild(this.createElementDefaultNS("Title", context.title));
        node.appendChild(this.write_ol_MapExtension(context));
        return node
    },
    write_ol_MapExtension: function (context) {
        var node = this.createElementDefaultNS("Extension");
        var bounds = context.maxExtent;
        if (bounds) {
            var maxExtent = this.createElementNS(this.namespaces.nm, "nm:maxExtent");
            this.setAttributes(maxExtent, {
                minx: bounds.left.toPrecision(10),
                miny: bounds.bottom.toPrecision(10),
                maxx: bounds.right.toPrecision(10),
                maxy: bounds.top.toPrecision(10)
            });
            node.appendChild(maxExtent)
        }
        return node
    },
    write_wmc_LayerList: function (context) {
        var list = this.createElementDefaultNS("LayerList");
        var layer;
        for (var i = 0, len = context.layers.length; i < len; ++i) {
            layer = context.layers[i];
            if (layer instanceof NWMSLayer) {
                list.appendChild(this.write_wmc_Layer(layer))
            }
        }
        return list
    },
    write_wmc_Layer: function (layer) {
        var node = this.createElementDefaultNS("Layer", null, {
            queryable: layer.queryable ? "1" : "0",
            hidden: layer.visible ? "0" : "1"
        });
        node.appendChild(this.write_wmc_Server(layer));
        node.appendChild(this.createElementDefaultNS("Name", layer.params["LAYERS"]));
        node.appendChild(this.createElementDefaultNS("Title", layer.name));
        if (layer.metadataURL) {
            node.appendChild(this.write_wmc_MetadataURL(layer))
        }
        node.appendChild(this.write_wmc_FormatList(layer));
        node.appendChild(this.write_wmc_StyleList(layer));
        node.appendChild(this.write_wmc_LayerExtension(layer));
        return node
    },
    write_wmc_LayerExtension: function (layer) {
        var node = this.createElementDefaultNS("Extension");
        var bounds = layer.maxExtent;
        var maxExtent = this.createElementNS(this.namespaces.nm, "nm:maxExtent");
        this.setAttributes(maxExtent, {
            minx: bounds.left.toPrecision(10),
            miny: bounds.bottom.toPrecision(10),
            maxx: bounds.right.toPrecision(10),
            maxy: bounds.top.toPrecision(10)
        });
        node.appendChild(maxExtent);
        var param = layer.params["TRANSPARENT"];
        if (param) {
            var trans = this.createElementNS(this.namespaces.nm, "nm:transparent");
            trans.appendChild(this.createTextNode(param));
            node.appendChild(trans)
        }
        var properties = ["zoomLevelsCount", "units", "isBasicLayer", "opacity", "showInLayerList", "singleTile"];
        var child;
        for (var i = 0, len = properties.length; i < len; ++i) {
            child = this.createOLPropertyNode(layer, properties[i]);
            if (child) {
                node.appendChild(child)
            }
        }
        return node
    },
    createOLPropertyNode: function (obj, prop) {
        var node = null;
        if (obj[prop] != null) {
            node = this.createElementNS(this.namespaces.nm, "nm:" + prop);
            node.appendChild(this.createTextNode(obj[prop].toString()))
        }
        return node
    },
    write_wmc_Server: function (layer) {
        var node = this.createElementDefaultNS("Server");
        this.setAttributes(node, {
            service: "OGC:WMS",
            version: layer.params["VERSION"]
        });
        node.appendChild(this.write_wmc_OnlineResource(layer.url));
        return node
    },
    write_wmc_MetadataURL: function (layer) {
        var node = this.createElementDefaultNS("MetadataURL");
        node.appendChild(this.write_wmc_OnlineResource(layer.metadataURL));
        return node
    },
    write_wmc_FormatList: function (layer) {
        var node = this.createElementDefaultNS("FormatList");
        node.appendChild(this.createElementDefaultNS("Format", layer.params["FORMAT"], {
            current: "1"
        }));
        return node
    },
    write_wmc_StyleList: function (layer) {
        var node = this.createElementDefaultNS("StyleList");
        var style = this.createElementDefaultNS("Style", null, {
            current: "1"
        });
        if (layer.params["SLD"]) {
            var sld = this.createElementDefaultNS("SLD");
            var link = this.write_wmc_OnlineResource(layer.params["SLD"]);
            sld.appendChild(link);
            style.appendChild(sld)
        } else if (layer.params["SLD_BODY"]) {
            var sld = this.createElementDefaultNS("SLD");
            var body = layer.params["SLD_BODY"];
            var doc = NParser.XML.prototype.read.apply(this, [body]);
            var imported = doc.documentElement;
            if (sld.ownerDocument && sld.ownerDocument.importNode) {
                imported = sld.ownerDocument.importNode(imported, true)
            }
            sld.appendChild(imported);
            style.appendChild(sld)
        } else {
            var name = layer.params["STYLES"] ? layer.params["STYLES"] : this.defaultStyleName;
            style.appendChild(this.createElementDefaultNS("Name", name));
            style.appendChild(this.createElementDefaultNS("Title", this.defaultStyleTitle))
        }
        node.appendChild(style);
        return node
    },
    write_wmc_OnlineResource: function (href) {
        var node = this.createElementDefaultNS("OnlineResource");
        this.setAttributeNS(node, this.namespaces.xlink, "xlink:type", "simple");
        this.setAttributeNS(node, this.namespaces.xlink, "xlink:href", href);
        return node
    },
    _CLASS_NAME: "NParser.WMC.v1"
});
NParser.WMC.v1_0_0 = NObject(NParser.WMC.v1, {
    VERSION: "1.0.0",
    schemaLocation: "http://www.opengis.net/context http://schemas.opengis.net/context/1.0.0/context.xsd",
    construct: function (options) {
        NParser.WMC.v1.prototype.construct.apply(this, [options])
    },
    _CLASS_NAME: "NParser.WMC.v1_0_0"
});
NParser.WMC.v1_1_0 = NObject(NParser.WMC.v1, {
    VERSION: "1.1.0",
    schemaLocation: "http://www.opengis.net/context http://schemas.opengis.net/context/1.1.0/context.xsd",
    construct: function (options) {
        NParser.WMC.v1.prototype.construct.apply(this, [options])
    },
    read_sld_MinScaleDenominator: function (layerInfo, node) {
        layerInfo.options.maxScale = this.getChildNodeValue(node)
    },
    read_sld_MaxScaleDenominator: function (layerInfo, node) {
        layerInfo.options.minScale = this.getChildNodeValue(node)
    },
    write_wmc_Layer: function (layer) {
        var node = NParser.WMC.v1.prototype.write_wmc_Layer.apply(this, [layer]);
        if (layer.options.resolutions || layer.options.scales || layer.options.minResolution || layer.options.maxScale) {
            var minSD = this.createElementNS(this.namespaces.sld, "sld:MinScaleDenominator");
            minSD.appendChild(this.createTextNode(layer.maxScale.toPrecision(10)));
            node.insertBefore(minSD, node.childNodes[3])
        }
        if (layer.options.resolutions || layer.options.scales || layer.options.maxResolution || layer.options.minScale) {
            var maxSD = this.createElementNS(this.namespaces.sld, "sld:MaxScaleDenominator");
            maxSD.appendChild(this.createTextNode(layer.minScale.toPrecision(10)));
            node.insertBefore(maxSD, node.childNodes[4])
        }
        return node
    },
    _CLASS_NAME: "NParser.WMC.v1_1_0"
});
NWFSLayer = NObject(NVectorLayer, NMarkersLayer, {
    isBasicLayer: false,
    type: "NWFSLayer",
    tile: null,
    ratio: 2,
    _DEFAULT_PARAMS: {
        service: "WFS",
        version: "1.0.0",
        request: "GetFeature"
    },
    featureClass: null,
    format: null,
    formatObject: null,
    formatOptions: null,
    vectorMode: true,
    encodeBBOX: false,
    getAttributes: false,
    construct: function (name, url, params, options) {
        if (options == undefined) {
            options = {}
        }
        if (options.featureClass || !NVectorLayer || !NVectorFeature) {
            this.vectorMode = false
        }
        NUtility.extend(options, {
            'reportError': false
        });
        var newArguments = [];
        newArguments.push(name, options);
        NVectorLayer.prototype.construct.apply(this, newArguments);
        if (!this.renderer || !this.vectorMode) {
            this.vectorMode = false;
            if (!options.featureClass) {
                options.featureClass = NWFSFeature
            }
            NMarkersLayer.prototype.construct.apply(this, newArguments)
        }
        if (this.params && this.params.typename && !this.options.typename) {
            this.options.typename = this.params.typename
        }
        if (!this.options.geometry_column) {
            this.options.geometry_column = "the_geom"
        }
        this.params = NUtility.applyDefaults(params, NUtility.upperCaseObject(this._DEFAULT_PARAMS));
        this.url = url
    },
    dispose: function () {
        if (this.vectorMode) {
            NVectorLayer.prototype.dispose.apply(this, arguments)
        } else {
            NMarkersLayer.prototype.dispose.apply(this, arguments)
        }
        if (this.tile) {
            this.tile.dispose()
        }
        this.tile = null;
        this.ratio = null;
        this.featureClass = null;
        this.format = null;
        if (this.formatObject && this.formatObject.dispose) {
            this.formatObject.dispose()
        }
        this.formatObject = null;
        this.formatOptions = null;
        this.vectorMode = null;
        this.encodeBBOX = null;
        this.getAttributes = null
    },
    setMap: function (map) {
        if (this.vectorMode) {
            NVectorLayer.prototype.setMap.apply(this, arguments);
            var options = {
                'getAttributes': this.getAttributes
            };
            NUtility.extend(options, this.formatOptions);
            if (this.map && !this.projection.equals(this.map.getProjection())) {
                options.outerProjection = this.projection;
                options.innerProjection = this.map.getProjection()
            }
            this.formatObject = this.format ? new this.format(options) : new NParser.GML(options)
        } else {
            NMarkersLayer.prototype.setMap.apply(this, arguments)
        }
    },
    moveTo: function (bounds, zoomChanged, dragging) {
        if (this.vectorMode) {
            NVectorLayer.prototype.moveTo.apply(this, arguments)
        } else {
            NMarkersLayer.prototype.moveTo.apply(this, arguments)
        }
        if (dragging) {
            return false
        }
        if (zoomChanged) {
            if (this.vectorMode) {
                this.renderer.clear()
            }
        }
        if (this.options.minZoomLevel) {
            NLog.warn(NMGISLG('minZoomLevelError'));
            if (this.map.getZoomLevel() < this.options.minZoomLevel) {
                return null
            }
        }
        if (bounds == null) {
            bounds = this.map.getExtent()
        }
        var firstRendering = (this.tile == null);
        var outOfBounds = (!firstRendering && !this.tile.bounds.containsBounds(bounds));
        if (zoomChanged || firstRendering || (!dragging && outOfBounds)) {
            var center = bounds.getCenterInLatLng();
            var tileWidth = bounds.getWidth() * this.ratio;
            var tileHeight = bounds.getHeight() * this.ratio;
            var tileBounds = new NBounds(center.lon - (tileWidth / 2), center.lat - (tileHeight / 2), center.lon + (tileWidth / 2), center.lat + (tileHeight / 2));
            var tileSize = this.map.getSize();
            tileSize.w = tileSize.w * this.ratio;
            tileSize.h = tileSize.h * this.ratio;
            var ul = new NLatLng(tileBounds.left, tileBounds.top);
            var pos = this.map.worldToLayerPx(ul);
            var url = this.getFullRequestString();
            var params = {
                BBOX: this.encodeBBOX ? tileBounds.toBBOX() : tileBounds.toArray()
            };
            if (this.map && !this.projection.equals(this.map.getProjection())) {
                var projectedBounds = tileBounds.clone();
                projectedBounds.transform(this.map.getProjection(), this.projection);
                params.BBOX = this.encodeBBOX ? projectedBounds.toBBOX() : projectedBounds.toArray()
            }
            url += "&" + NUtility.getParameterString(params);
            if (!this.tile) {
                this.tile = new NTile.WFS(this, pos, tileBounds, url, tileSize);
                this.addTileMonitoringHooks(this.tile);
                this.tile.draw()
            } else {
                if (this.vectorMode) {
                    this.disposeFeatures();
                    this.renderer.clear()
                } else {
                    this.clearMarkers()
                }
                this.removeTileMonitoringHooks(this.tile);
                this.tile.dispose();
                this.tile = null;
                this.tile = new NTile.WFS(this, pos, tileBounds, url, tileSize);
                this.addTileMonitoringHooks(this.tile);
                this.tile.draw()
            }
        }
    },
    addTileMonitoringHooks: function (tile) {
        tile.onLoadStart = function () {
            if (this == this.layer.tile) {
                this.layer.events.triggerEvent("loadstart")
            }
        };
        tile.events._register("loadstart", tile, tile.onLoadStart);
        tile.onLoadEnd = function () {
            if (this == this.layer.tile) {
                this.layer.events.triggerEvent("tileloaded");
                this.layer.events.triggerEvent("loadend")
            }
        };
        tile.events._register("loadend", tile, tile.onLoadEnd);
        tile.events._register("unload", tile, tile.onLoadEnd)
    },
    removeTileMonitoringHooks: function (tile) {
        tile.unload();
        tile.events.removeListener({
            "loadstart": tile.onLoadStart,
            "loadend": tile.onLoadEnd,
            "unload": tile.onLoadEnd,
            scope: tile
        })
    },
    onMapResize: function () {
        if (this.vectorMode) {
            NVectorLayer.prototype.onMapResize.apply(this, arguments)
        } else {
            NMarkersLayer.prototype.onMapResize.apply(this, arguments)
        }
    },
    changeParams: function (newParams) {
        var upperParams = NUtility.upperCaseObject(newParams);
        var newArguments = [upperParams];
        return NHTTPRequestLayer.prototype.changeParams.apply(this, newArguments)
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new NWFSLayer(this.name, this.url, this.params, this.options)
        }
        if (this.vectorMode) {
            obj = NVectorLayer.prototype.clone.apply(this, [obj])
        } else {
            obj = NMarkersLayer.prototype.clone.apply(this, [obj])
        }
        return obj
    },
    getFullRequestString: function (newParams, altUrl) {
        var projectionCode = this.projection.getCode() || this.map.getProjectionCode();
        this.params.SRS = (projectionCode == "none") ? null : projectionCode;
        return NGridLayer.prototype.getFullRequestString.apply(this, arguments)
    },
    commit: function () {
        if (!this.writer) {
            var options = {};
            if (this.map && !this.projection.equals(this.map.getProjection())) {
                options.outerProjection = this.projection;
                options.innerProjection = this.map.getProjection()
            }
            this.writer = new NParser.WFS(options, this)
        }
        var data = this.writer.write(this.features);
        NRequest.POST({
            url: this.url,
            data: data,
            success: this.commitSuccess,
            failure: this.commitFailure,
            scope: this
        })
    },
    commitSuccess: function (request) {
        var response = request.responseText;
        if (response.indexOf('SUCCESS') != -1) {
            this.commitReport(NMGISLG("commitSuccess", {
                'response': response
            }));
            for (var i = 0; i < this.features.length; i++) {
                this.features[i].state = null
            }
        } else if (response.indexOf('FAILED') != -1 || response.indexOf('Exception') != -1) {
            this.commitReport(NMGISLG("commitFailed", {
                'response': response
            }))
        }
    },
    commitFailure: function (request) {},
    commitReport: function (string, response) {
        NLog.userError(string)
    },
    refresh: function () {
        if (this.tile) {
            if (this.vectorMode) {
                this.renderer.clear();
                this.features.length = 0
            } else {
                this.clearMarkers();
                this.markersLayer.length = 0
            }
            this.tile.draw()
        }
    },
    _CLASS_NAME: "NWFSLayer"
});
NNewMapToolbarControl = NObject(NPanelControl, {
    construct: function (options) {
        NPanelControl.prototype.construct.apply(this, [options]);
        this.addTools([new NZoomToMaxExtentTool(), new NZoomBoxInTool(), new NZoomBoxOutTool(), new NDragPanTool(), new NMeasureTool(), new NMeasureAreaTool(), new NPointLabelTool(), new NClearFeatureTool(), new NPrintTool()])
    },
    draw: function () {
        var div = NPanelControl.prototype.draw.apply(this, arguments);
        this.enableTool(this.tools[3]);
        return div
    },
    _CLASS_NAME: "NNewMapToolbarControl"
});
NMapToolbarControl = NObject(NPanelControl, {
    controlType: 'NMapToolbarControl',
    construct: function (options) {
        NPanelControl.prototype.construct.apply(this, [options]);
        this.addTools([new NZoomToMaxExtentTool(), new NZoomBoxInTool(), new NZoomBoxOutTool(), new NDragPanTool()])
    },
    draw: function () {
        var div = NPanelControl.prototype.draw.apply(this, arguments);
        this.enableTool(this.tools[3]);
        return div
    },
    _CLASS_NAME: "NMapToolbarControl"
});
NMeasureToolbarControl = NObject(NPanelControl, {
    controlType: 'NMeasureToolbarControl',
    construct: function (options) {
        NPanelControl.prototype.construct.apply(this, [options]);
        this.addTools([new NMeasureTool(), new NMeasureAreaTool()])
    },
    draw: function () {
        var div = NPanelControl.prototype.draw.apply(this, arguments);
        return div
    },
    _CLASS_NAME: "NMeasureToolbarControl"
});
NEditingToolbarControl = NObject(NPanelControl, {
    controlType: "NEditingToolbarControl",
    construct: function (layer, options) {
        NPanelControl.prototype.construct.apply(this, [options]);
        this.addTools([new NNavigationTool({
            title: "地图漫游"
        })]);
        var tools = [new NDrawFeatureTool(layer, NDrawPointProcessor, {
            'cssClassName': ' nmControlDrawFeaturePoint',
            title: "绘制点要素"
        }), new NDrawFeatureTool(layer, NDrawPathProcessor, {
            'cssClassName': ' nmControlDrawFeaturePath',
            title: "绘制线要素"
        }), new NDrawFeatureTool(layer, NDrawPolygonProcessor, {
            'cssClassName': ' nmControlDrawFeaturePolygon',
            title: "绘制面要素"
        })];
        for (var i = 0, len = tools.length; i < len; i++) {
            tools[i].featureAdded = function (feature) {
                feature.state = NEditState.INSERT
            }
        }
        this.addTools(tools)
    },
    draw: function () {
        var div = NPanelControl.prototype.draw.apply(this, arguments);
        this.enableTool(this.tools[0]);
        return div
    },
    _CLASS_NAME: "NEditingToolbarControl"
});
NLanguage = {
    code: null,
    defaultCode: "en",
    getCode: function () {
        if (!NLanguage.code) {
            NLanguage.setCode()
        }
        return NLanguage.code
    },
    setCode: function (code) {
        var lang;
        if (!code) {
            code = (NUtility.getBrowserName() == "msie") ? navigator.userLanguage : navigator.language
        }
        var parts = code.split('-');
        parts[0] = parts[0].toLowerCase();
        if (typeof NLanguage[parts[0]] == "object") {
            lang = parts[0]
        }
        if (parts[1]) {
            var testLang = parts[0] + '-' + parts[1].toUpperCase();
            if (typeof NLanguage[testLang] == "object") {
                lang = testLang
            }
        }
        if (!lang) {
            NLog.warn('Failed to find NLanguage.' + parts.join("-") + ' dictionary, falling back to default language');
            lang = NLanguage.defaultCode
        }
        NLanguage.code = lang
    },
    translate: function (key, context) {
        var dictionary = NChineseLanguage;
        var message = dictionary[key];
        if (!message) {
            message = key
        }
        if (context) {
            message = NString.format(message, context)
        }
        return message
    }
};
NMGISLG = NLanguage.translate;
NEnglishLanguage = {
    'unhandledRequest': "Unhandled request return ${statusText}",
    'permalink': "Permalink",
    'overlays': "Overlays",
    'basicLayer': "Basic Layer",
    'sameProjection': "The overview map only works when it is in the same projection as the main map",
    'readNotImplemented': "Read not implemented.",
    'writeNotImplemented': "Write not implemented.",
    'noFID': "Can't update a feature for which there is no FID.",
    'errorLoadingGML': "Error in loading GML file ${url}",
    'browserNotSupported': "Your browser does not support vector rendering. Currently supported renderers are:\n${renderers}",
    'componentShouldBe': "addFeatures : component should be an ${geomType}",
    'getFeatureError': "_getFeatureFromEvent called on layer with no renderer. This usually means you " + "disposeed a layer, but not some processor which is associated with it.",
    'minZoomLevelError': "The minZoomLevel property is only intended for use " + "with the FixedZoomLevels-descendent layers.",
    'commitSuccess': "WFS Transaction: SUCCESS ${response}",
    'commitFailed': "WFS Transaction: FAILED ${response}",
    'googleWarning': "The Google Layer was unable to load correctly.<br><br>" + "To get rid of this message, select a new BasicLayer " + "in the layer switcher in the upper-right corner.<br><br>" + "Most likely, this is because the Google Maps library " + "script was either not included, or does not contain the " + "correct API key for your site.<br><br>",
    'getLayerWarning': "The ${layerType} Layer was unable to load correctly.<br><br>" + "To get rid of this message, select a new BasicLayer " + "in the layer switcher in the upper-right corner.<br><br>" + "Most likely, this is because the ${layerLib} library " + "script was not correctly included.<br><br>",
    'scale': "Scale = 1 : ${scaleDenom}",
    'layerAlreadyAdded': "You tried to add the layer: ${layerName} to the map, but it has already been added",
    'reprojectDeprecated': "You are using the 'reproject' option " + "on the ${layerName} layer. This option is deprecated: " + "its use was designed to support displaying data over commercial " + "basemaps, but that functionality should now be achieved by using " + "Spherical Mercator support. More information is available from " + "http://trac.openlayers.org/wiki/SphericalMercator.",
    'methodDeprecated': "This method has been deprecated and will be removed in 3.0. " + "Please use ${newMethod} instead.",
    'boundsoffsetByXYError': "You must pass both x and y values to the boundsoffsetByXY function.",
    'XYZoffsetByXYZError': "You must pass both x ,y and z values to the XYZoffsetByXYZ function.",
    'latlngoffsetByXYError': "You must pass both lon and lat values to the latlngoffsetByXY function.",
    'pixeloffsetByXYError': "You must pass both x and y values to the pixeloffsetByXY function.",
    'unsupportedGeometryType': "Unsupported geometry type: ${geomType}",
    'pagePositionFailed': "NUtility.pagePosition failed: element with id ${elemId} may be misplaced.",
    'end': '',
    'filterEvaluateNotImplemented': "evaluate is not implemented for this filter type."
};
NChineseLanguage = {
    'unhandledRequest': "未处理的请求，返回值为 ${statusText}",
    'permalink': "永久链接",
    'distance': "距离：",
    'area': "面积：",
    '10000': " 万",
    '10000000': " 千万",
    'overlays': "叠加图层",
    'basicLayer': "底图图层",
    'sameProjection': "只有在和主地图使用相同的投影的时候鹰眼地图才能正常共工作",
    'readNotImplemented': "读取功能未实现。",
    'writeNotImplemented': "写入功能未实现。",
    'noFID': "无法更新feature，原因：缺少FID。",
    'errorLoadingGML': "加载GML文件 ${url} 出现错误。",
    'browserNotSupported': "你所使用的浏览器不支持矢量渲染。当前支持的渲染方式包括：\n${renderers}",
    'componentShouldBe': "addFeatures : 组件类型应该是 ${geomType}",
    'getFeatureError': "_getFeatureFromEvent方法在一个没有渲染器的图层上被调用。 这通常意味着您" + "销毁了一个图层，但并未销毁其关联的processor。",
    'minZoomLevelError': "minZoomLevel属性仅适合用于" + "使用了固定缩放级别的图层。 ",
    'commitSuccess': "WFS 处理成功。 ${response}",
    'commitFailed': "WFS 处理失败。 ${response}",
    'googleWarning': "Google图层不能正确加载。<br><br>",
    'getLayerWarning': "${layerType} 图层不能正确加载。<br><br>" + "要消除这个信息，请在右上角的" + "图层控制面板中选择其他的基础图层。<br><br>" + "这种情况很可能是没有正确的包含" + "${layerLib} 脚本库。<br><br>",
    'scale': "比例尺 = 1 : ${scaleDenom}",
    'layerAlreadyAdded': "所要添加的图层： ${layerName} 之前已经被添加。",
    'reprojectDeprecated': "${layerName} 图层上的'reproject'选项已经不再使用。",
    'methodDeprecated': "该方法不被支持," + "请使用 ${newMethod} 方法来替代。",
    'boundsoffsetByXYError': "必须传递 x 和 y 两个参数值到 boundsoffsetByXY 方法。",
    'XYZoffsetByXYZError': "必须传递 x ,y和 z 三个参数值到 XYZoffsetByXYZ 方法。",
    'latlngoffsetByXYError': "必须传递 x 和 y 两个参数值到 latlngoffsetByXY 方法。",
    'pixeloffsetByXYError': "必须传递 x and y 两个参数值到 pixeloffsetByXY 方法。",
    'unsupportedGeometryType': "不支持的几何体类型： ${geomType}",
    'pagePositionFailed': "NUtility.pagePosition 失败：id 为 ${elemId} 的元素可能被错置。",
    'end': ''
};
NDomainRequest = function (url, callback) {
    var element = document.createElement("script");
    element.charset = 'utf-8';
    element.type = "text/javascript";
    if (callback) element.src = url + "&callback=" + callback;
    else element.src = url;
    document.body.appendChild(element)
};
NChangeService = function (url, source, destination) {
    if (url) return url.replace("service=" + source, "service=" + destination);
    else return url
};
NChange2Service = function (url, destination) {
    if (url == '') return url;
    var source = '';
    var pos = url.indexOf('service');
    if (pos >= 0) {
        var len = url.length;
        for (var i = pos; i < len; i++) {
            var c = url.charAt(i);
            if (c != '&') {
                source += c
            } else {
                break
            }
        }
        if (url && source != '') return url.replace(source, "service=" + destination);
        else return url
    } else {
        return url
    }
};
NPointLabelTool = NObject(NTool, {
    toolType: "NPointLabelTool",
    defaultProcessorOptions: {
        'single': true,
        'double': false,
        'pixelTolerance': 0,
        'stopSingle': true,
        'stopDouble': false,
        'mousemove': false,
        "mousedown": false,
        "mouseup": false
    },
    callback: null,
    markers: null,
    icon: null,
    processorOptions: null,
    construct: function (options) {
        this.processorOptions = NUtility.extend({}, this.defaultProcessorOptions);
        this.processor = new NClickProcessor(this, {
            'click': this.excute
        }, this.processorOptions);
        NTool.prototype.construct.apply(this, [options])
    },
    excute: function (e) {
        var latlng = this.map._mapViewPortPxToWorld(e.xy);
        var newIcon = (this.icon) ? this.icon : NMarker.defaultIcon();
        if (this.markers == null) {
            this.markers = new NMarkersLayer("Markers");
            this.markers.layersort = 8888;
            this.map.addLayer(this.markers)
        }
        var marker = new NMarker(new NLatLng(latlng.lon, latlng.lat), newIcon);
        this.markers.addMarker(marker);
        if (this.callback != null) {
            this.callback(marker)
        }
    },
    enable: function () {
        NTool.prototype.enable.apply(this, arguments);
        this.map.div.style.cursor = 'crosshair';
        return true
    },
    _CLASS_NAME: "NPointLabelTool"
});
NLineLabelTool = NObject(NTool, {
    toolType: "NLineLabelTool",
    layer: null,
    callbacks: null,
    EVENT_TYPES: ["featureadded"],
    featureAdded: function () {},
    processorOptions: null,
    construct: function (layer, options) {
        if (layer != null) {
            this.layer = layer
        }
        this.EVENT_TYPES = NLineLabelTool.prototype.EVENT_TYPES.concat(NTool.prototype.EVENT_TYPES);
        NTool.prototype.construct.apply(this, [options]);
        this.callbacks = NUtility.extend({
            done: this.drawFeature
        }, this.callbacks);
        this.processor = new NDrawPathProcessor(this, this.callbacks, this.processorOptions)
    },
    enable: function () {
        NTool.prototype.enable.apply(this, arguments);
        this.map.div.style.cursor = 'crosshair';
        if (this.layer == null) {
            this.layer = new NVectorLayer("Label Vector Layer");
            this.map.addLayers([this.layer])
        }
        return true
    },
    drawFeature: function (geometry) {
        var feature = new NVectorFeature(geometry);
        this.layer.addFeatures([feature]);
        this.featureAdded(feature);
        this.events.triggerEvent("featureadded", {
            feature: feature
        })
    },
    _CLASS_NAME: "NLineLabelTool"
});
NPolyLabelTool = NObject(NTool, {
    toolType: "NPolyLabelTool",
    layer: null,
    callbacks: null,
    EVENT_TYPES: ["featureadded"],
    featureAdded: function () {},
    processorOptions: null,
    construct: function (layer, options) {
        if (layer != null) {
            this.layer = layer
        }
        this.EVENT_TYPES = NPolyLabelTool.prototype.EVENT_TYPES.concat(NTool.prototype.EVENT_TYPES);
        NTool.prototype.construct.apply(this, [options]);
        this.callbacks = NUtility.extend({
            done: this.drawFeature
        }, this.callbacks);
        this.processor = new NDrawPolygonProcessor(this, this.callbacks, this.processorOptions)
    },
    enable: function () {
        NTool.prototype.enable.apply(this, arguments);
        this.map.div.style.cursor = 'crosshair';
        if (this.layer == null) {
            this.layer = new NVectorLayer("Label Vector Layer");
            this.map.addLayers([this.layer])
        }
        return true
    },
    drawFeature: function (geometry) {
        var feature = new NVectorFeature(geometry);
        this.layer.addFeatures([feature]);
        this.featureAdded(feature);
        this.events.triggerEvent("featureadded", {
            feature: feature
        })
    },
    _CLASS_NAME: "NPolyLabelTool"
});
NPrintTool = NObject(NTool, {
    toolType: "NPrintTool",
    type: NTool.TYPE_BUTTON,
    printPageUrl: '',
    excute: function () {
        if (this.map) {
            NPrintTool.NPrintMap = this.map;
            if (this.printPageUrl == '') this.printPageUrl = NUtility.getImagesLocation() + "\print.html";
            window.open(this.printPageUrl)
        }
    },
    _CLASS_NAME: "NPrintTool"
});
NPrintTool.NPrintMap = null;
NCircleQueryTool = NObject(NTool, {
    layer: '',
    callback: null,
    construct: function (complete) {
        NTool.prototype.construct.apply(this);
        NUtility.extend(this, complete);
        this.callbacks = NUtility.extend({
            done: this.afterDraw
        }, this.callbacks);
        this.processor = new NDrawRegularPolygonProcessor(this, this.callbacks);
        this.processor.setParameters({
            sides: 40
        });
        this.completeCallback = complete
    },
    afterDraw: function (geometry) {
        try {
            if (this.processor.circleCenter == null) return;
            var originPoint = this.processor.circleCenter;
            if (this.map == null) return;
            if (this.callback == null) return;
            if (this.layer == '') {
                alert('未设定要统计的图层');
                return
            }
            if (this.statfield == '') {
                alert('未设定指定图层的统计字段');
                return
            }
            var tempsrs = this.map.getProjectionCode();
            var radius = 0;
            if (geometry instanceof NGeometry.Polygon) {
                var points = geometry.components[0];
                if (points.components.length > 0) {
                    var ringPoint = points.components[0];
                    radius = Math.sqrt((originPoint.x - ringPoint.x) * (originPoint.x - ringPoint.x) + (originPoint.y - ringPoint.y) * (originPoint.y - ringPoint.y))
                } else return
            } else return;
            this.layer.spatialQuery("point", {
                page: 1,
                coords: this.processor.circleCenter.toSimpleString(),
                srs: tempsrs,
                buffer: radius,
                qtype: 'JSON',
                callback: this.callback
            })
        } catch (ex) {
            return
        }
    },
    enable: function () {
        NTool.prototype.enable.apply(this, arguments);
        this.map.div.style.cursor = 'help';
        return true
    },
    _CLASS_NAME: "NCircleQueryTool"
});
NCircleStatTool = NObject(NTool, {
    layer: '',
    callback: null,
    statfield: '',
    construct: function (complete) {
        NTool.prototype.construct.apply(this);
        NUtility.extend(this, complete);
        this.callbacks = NUtility.extend({
            done: this.drawComplete
        }, this.callbacks);
        this.processor = new NDrawRegularPolygonProcessor(this, this.callbacks);
        this.processor.setParameters({
            sides: 40
        });
        this.completeCallback = complete
    },
    drawComplete: function (geometry) {
        try {
            if (this.processor.circleCenter == null) return;
            var originPoint = this.processor.circleCenter;
            if (this.map == null) return;
            if (this.layer == null || this.layer == '') {
                alert('未设定要统计的图层');
                return
            }
            if (this.statfield == '') {
                alert('未设定指定图层的统计字段');
                return
            }
            var radius = 0;
            if (geometry instanceof NGeometry.Polygon) {
                var points = geometry.components[0];
                if (points.components.length > 0) {
                    var ringPoint = points.components[0];
                    radius = Math.sqrt((originPoint.x - ringPoint.x) * (originPoint.x - ringPoint.x) + (originPoint.y - ringPoint.y) * (originPoint.y - ringPoint.y))
                } else return
            } else return;
            var tempsrs = this.map.getProjectionCode();
            if (this.callback == null) this.layer.spatialStat("point", {
                page: 1,
                coords: this.processor.circleCenter.toSimpleString(),
                statfield: this.statfield,
                srs: tempsrs,
                buffer: radius,
                qtype: 'JSON',
                callback: "NTool.statResult"
            });
            else this.layer.spatialStat("point", {
                page: 1,
                coords: this.processor.circleCenter.toSimpleString(),
                statfield: this.statfield,
                srs: tempsrs,
                buffer: radius,
                qtype: 'JSON',
                callback: this.callback
            })
        } catch (ex) {
            return
        }
    },
    enable: function () {
        NTool.prototype.enable.apply(this, arguments);
        this.map.div.style.cursor = 'help';
        return true
    },
    _CLASS_NAME: "NCircleStatTool"
});
NPolygonQueryTool = NObject(NTool, {
    toolType: "NPolygonQueryTool",
    layer: '',
    callback: null,
    construct: function (complete) {
        NTool.prototype.construct.apply(this);
        NUtility.extend(this, complete);
        this.callbacks = NUtility.extend({
            done: this.afterDraw
        }, this.callbacks);
        this.processor = new NDrawPolygonProcessor(this, this.callbacks);
        this.completeCallback = complete
    },
    afterDraw: function (geometry) {
        try {
            if (this.callback == null) return;
            if (this.map == null) return;
            if (this.layer == '') {
                alert('未设定要查询的图层');
                return
            }
            var strCoors = "";
            if (geometry instanceof NGeometry.Polygon) {
                var points = geometry.components[0];
                strCoors = points.components[0].toSimpleString();
                for (var i = 1, len = points.components.length; i < len; i++) {
                    strCoors += ',' + points.components[i].toSimpleString()
                }
            } else {
                alert('请确保查询区域是多边形区域');
                return
            }
            var tempsrs = this.map.getProjectionCode();
            this.layer.spatialQuery("polygon", {
                'coords': strCoors,
                srs: tempsrs,
                'qtype': 'JSON',
                'page': 1,
                'callback': this.callback
            })
        } catch (ex) {}
    },
    enable: function () {
        NTool.prototype.enable.apply(this, arguments);
        this.map.div.style.cursor = 'help';
        return true
    },
    _CLASS_NAME: "NPolygonQueryTool"
});
NPolygonStatTool = NObject(NTool, {
    toolType: "NPolygonStatTool",
    layer: '',
    callback: null,
    statfield: '',
    construct: function (complete) {
        NTool.prototype.construct.apply(this);
        NUtility.extend(this, complete);
        this.callbacks = NUtility.extend({
            done: this.afterDraw
        }, this.callbacks);
        this.processor = new NDrawPolygonProcessor(this, this.callbacks);
        this.completeCallback = complete
    },
    enable: function () {
        NTool.prototype.enable.apply(this, arguments);
        this.map.div.style.cursor = 'help';
        return true
    },
    afterDraw: function (geometry) {
        try {
            if (this.map == null) return;
            if (this.layer == '') {
                alert('未设定要统计的图层');
                return
            }
            if (this.statfield == '') {
                alert('未设定指定图层的统计字段');
                return
            }
            var strCoors = "";
            if (geometry instanceof NGeometry.Polygon) {
                var points = geometry.components[0];
                strCoors = points.components[0].toSimpleString();
                for (var i = 0, len = points.components.length; i < len; i++) {
                    strCoors += ',' + points.components[i].toSimpleString()
                }
            } else {
                alert('请确保统计区域是多边形区域');
                return
            }
            var tempsrs = this.map.getProjectionCode();
            if (this.callback == null) this.layer.spatialStat("polygon", {
                coords: strCoors,
                statfield: this.statfield,
                srs: tempsrs,
                qtype: 'JSON',
                callback: "NTool.statResult"
            });
            else this.layer.spatialStat("polygon", {
                coords: strCoors,
                statfield: this.statfield,
                srs: tempsrs,
                qtype: 'JSON',
                callback: this.callback
            })
        } catch (ex) {}
    },
    _CLASS_NAME: "NPolygonStatTool"
});
NRectQueryTool = NObject(NTool, {
    toolType: "NRectQueryTool",
    layer: '',
    callback: null,
    construct: function (complete) {
        NTool.prototype.construct.apply(this);
        NUtility.extend(this, complete);
        this.callbacks = NUtility.extend({
            done: this.zoomBox
        }, this.callbacks);
        this.processor = new NDrawRectProcessor(this, this.callbacks);
        this.completeCallback = complete
    },
    zoomBox: function (position) {
        try {
            if (this.callback == null) {
                alert('未指定统计结果处理函数');
                return
            }
            if (this.map == null) return;
            if (this.layer == '') {
                alert('未设定要统计的图层');
                return
            }
            if (this.statfield == '') {
                alert('未设定指定图层的统计字段');
                return
            }
            var tempsrs = this.map.getProjectionCode();
            if (position instanceof NBounds) {
                var tempPixel = new NPixel(position.left, position.bottom);
                var geoXYmin = this.map.pixelToWorld(tempPixel);
                tempPixel.x = position.right;
                tempPixel.y = position.top;
                var geoXYmax = this.map.pixelToWorld(tempPixel);
                var strCoords = geoXYmin.toSimpleString() + ',' + geoXYmax.toSimpleString();
                this.layer.spatialQuery("bbox", {
                    page: 1,
                    coords: strCoords,
                    qtype: 'JSON',
                    srs: tempsrs,
                    callback: this.callback
                })
            } else {
                var geoXY = this.map.pixelToWorld(position);
                this.layer.spatialQuery("point", {
                    page: 1,
                    coords: geoXY.toSimpleString(),
                    buffer: 0,
                    srs: tempsrs,
                    qtype: 'JSON',
                    callback: this.callback
                })
            }
        } catch (ex) {}
    },
    enable: function () {
        NTool.prototype.enable.apply(this, arguments);
        this.map.div.style.cursor = 'help';
        return true
    },
    _CLASS_NAME: "NRectQueryTool"
});
NRectStatTool = NObject(NTool, {
    toolType: "NRectStatTool",
    layer: '',
    callback: null,
    statfield: '',
    construct: function (complete) {
        NTool.prototype.construct.apply(this);
        NUtility.extend(this, complete);
        this.callbacks = NUtility.extend({
            done: this.zoomBox
        }, this.callbacks);
        this.processor = new NDrawRectProcessor(this, this.callbacks);
        this.completeCallback = complete
    },
    zoomBox: function (position) {
        try {
            if (this.map == null) return;
            if (this.layer == '') {
                alert('未设定要统计的图层');
                return
            }
            if (this.statfield == '') {
                alert('未设定指定图层的统计字段');
                return
            }
            var tempsrs = this.map.getProjectionCode();
            if (position instanceof NBounds) {
                var tempPixel = new NPixel(position.left, position.bottom);
                var geoXYmin = this.map.pixelToWorld(tempPixel);
                tempPixel.x = position.right;
                tempPixel.y = position.top;
                var geoXYmax = this.map.pixelToWorld(tempPixel);
                var strCoords = geoXYmin.toSimpleString() + ',' + geoXYmax.toSimpleString();
                if (this.callback == null) this.layer.spatialStat("bbox", {
                    coords: strCoords,
                    srs: tempsrs,
                    statfield: this.statfield,
                    qtype: 'JSON',
                    callback: "NTool.statResult"
                });
                else this.layer.spatialStat("bbox", {
                    coords: strCoords,
                    srs: tempsrs,
                    statfield: this.statfield,
                    qtype: 'JSON',
                    callback: this.callback
                })
            } else {
                var geoXY = this.map.pixelToWorld(position);
                if (this.callback == null) this.layer.spatialStat("point", {
                    coords: geoXY.toSimpleString(),
                    buffer: 0,
                    statfield: this.statfield,
                    qtype: 'JSON',
                    srs: tempsrs,
                    callback: "NTool.statResult"
                });
                else this.layer.spatialStat("point", {
                    coords: geoXY.toSimpleString(),
                    buffer: 0,
                    statfield: this.statfield,
                    qtype: 'JSON',
                    srs: tempsrs,
                    callback: this.callback
                })
            }
        } catch (ex) {}
    },
    enable: function () {
        NTool.prototype.enable.apply(this, arguments);
        this.map.div.style.cursor = 'help';
        return true
    },
    _CLASS_NAME: "NRectStatTool"
});
NTools.GetListResources = function (url, key, callback) {
    NuserKey = key;
    NbaseUrl = url;
    var resourceUrl = url + "&service=catalogue&q=xml&key=" + key;
    NDomainRequest(resourceUrl, callback)
};
NTools.PostResources = function (url, key) {
    var baseUrl = url + "&service=catalogue&meathod=post&q=json&key=" + key;
    NDomainRequest(baseUrl, callback)
};
NserverIP = "";
NuserID = "";
NuserName = "";
NuserKey = "";
NbaseUrl = "";
NClearFeatureTool = NObject(NTool, {
    toolType: "NClearFeatureTool",
    type: NTool.TYPE_BUTTON,
    excute: function () {
        for (var i = 0, len = this.map.tools.length; i < len; i++) {
            if ((this.map.tools[i]._CLASS_NAME == "NMeasureTool") || (this.map.tools[i]._CLASS_NAME == "NMeasureAreaTool")) {
                if (this.map.tools[i].processor) {
                    if (!this.map.tools[i].processor.drawing) {
                        this.map.tools[i].processor.disposeFeature();
                        if (this.map.tools[i].resultDiv) {
                            this.map.tools[i].resultDiv.innerHTML = ''
                        }
                    }
                }
            }
        }
    },
    _CLASS_NAME: "NClearFeatureTool"
});
NLineLabelTool = NObject(NTool, {
    toolType: "NLineLabelTool",
    layer: null,
    callbacks: null,
    EVENT_TYPES: ["featureadded"],
    featureAdded: function () {},
    processorOptions: null,
    construct: function (layer, options) {
        if (layer != null) {
            this.layer = layer
        }
        this.EVENT_TYPES = NLineLabelTool.prototype.EVENT_TYPES.concat(NTool.prototype.EVENT_TYPES);
        NTool.prototype.construct.apply(this, [options]);
        this.callbacks = NUtility.extend({
            done: this.drawFeature
        }, this.callbacks);
        this.processor = new NDrawPathProcessor(this, this.callbacks, this.processorOptions)
    },
    enable: function () {
        NTool.prototype.enable.apply(this, arguments);
        this.map.div.style.cursor = 'crosshair';
        if (this.layer == null) {
            this.layer = new NVectorLayer("Label Vector Layer");
            this.map.addLayers([this.layer])
        }
        return true
    },
    drawFeature: function (geometry) {
        var feature = new NVectorFeature(geometry);
        this.layer.addFeatures([feature]);
        this.featureAdded(feature);
        this.events.triggerEvent("featureadded", {
            feature: feature
        })
    },
    _CLASS_NAME: "NLineLabelTool"
});
NPolyLabelTool = NObject(NTool, {
    toolType: "NPolyLabelTool",
    layer: null,
    callbacks: null,
    EVENT_TYPES: ["featureadded"],
    featureAdded: function () {},
    processorOptions: null,
    construct: function (layer, options) {
        if (layer != null) {
            this.layer = layer
        }
        this.EVENT_TYPES = NPolyLabelTool.prototype.EVENT_TYPES.concat(NTool.prototype.EVENT_TYPES);
        NTool.prototype.construct.apply(this, [options]);
        this.callbacks = NUtility.extend({
            done: this.drawFeature
        }, this.callbacks);
        this.processor = new NDrawPolygonProcessor(this, this.callbacks, this.processorOptions)
    },
    enable: function () {
        NTool.prototype.enable.apply(this, arguments);
        this.map.div.style.cursor = 'crosshair';
        if (this.layer == null) {
            this.layer = new NVectorLayer("Label Vector Layer");
            this.map.addLayers([this.layer])
        }
        return true
    },
    drawFeature: function (geometry) {
        var feature = new NVectorFeature(geometry);
        this.layer.addFeatures([feature]);
        this.featureAdded(feature);
        this.events.triggerEvent("featureadded", {
            feature: feature
        })
    },
    _CLASS_NAME: "NPolyLabelTool"
});
NCircleQueryTool = NObject(NTool, {
    layer: '',
    callback: null,
    construct: function (complete) {
        NTool.prototype.construct.apply(this);
        NUtility.extend(this, complete);
        this.callbacks = NUtility.extend({
            done: this.afterDraw
        }, this.callbacks);
        this.processor = new NDrawRegularPolygonProcessor(this, this.callbacks);
        this.processor.setParameters({
            sides: 40
        });
        this.completeCallback = complete
    },
    afterDraw: function (geometry) {
        try {
            if (this.processor.circleCenter == null) return;
            var originPoint = this.processor.circleCenter;
            if (this.map == null) return;
            if (this.callback == null) return;
            if (this.layer == '') {
                alert('未设定要统计的图层');
                return
            }
            if (this.statfield == '') {
                alert('未设定指定图层的统计字段');
                return
            }
            var tempsrs = this.map.getProjectionCode();
            var radius = 0;
            if (geometry instanceof NGeometry.Polygon) {
                var points = geometry.components[0];
                if (points.components.length > 0) {
                    var ringPoint = points.components[0];
                    radius = Math.sqrt((originPoint.x - ringPoint.x) * (originPoint.x - ringPoint.x) + (originPoint.y - ringPoint.y) * (originPoint.y - ringPoint.y))
                } else return
            } else return;
            this.layer.spatialQuery("point", {
                page: 1,
                coords: this.processor.circleCenter.toSimpleString(),
                srs: tempsrs,
                buffer: radius,
                qtype: 'JSON',
                callback: this.callback
            })
        } catch (ex) {
            return
        }
    },
    enable: function () {
        NTool.prototype.enable.apply(this, arguments);
        this.map.div.style.cursor = 'help';
        return true
    },
    _CLASS_NAME: "NCircleQueryTool"
});
NCircleStatTool = NObject(NTool, {
    layer: '',
    callback: null,
    statfield: '',
    construct: function (complete) {
        NTool.prototype.construct.apply(this);
        NUtility.extend(this, complete);
        this.callbacks = NUtility.extend({
            done: this.drawComplete
        }, this.callbacks);
        this.processor = new NDrawRegularPolygonProcessor(this, this.callbacks);
        this.processor.setParameters({
            sides: 40
        });
        this.completeCallback = complete
    },
    drawComplete: function (geometry) {
        try {
            if (this.processor.circleCenter == null) return;
            var originPoint = this.processor.circleCenter;
            if (this.map == null) return;
            if (this.layer == null || this.layer == '') {
                alert('未设定要统计的图层');
                return
            }
            if (this.statfield == '') {
                alert('未设定指定图层的统计字段');
                return
            }
            var radius = 0;
            if (geometry instanceof NGeometry.Polygon) {
                var points = geometry.components[0];
                if (points.components.length > 0) {
                    var ringPoint = points.components[0];
                    radius = Math.sqrt((originPoint.x - ringPoint.x) * (originPoint.x - ringPoint.x) + (originPoint.y - ringPoint.y) * (originPoint.y - ringPoint.y))
                } else return
            } else return;
            var tempsrs = this.map.getProjectionCode();
            if (this.callback == null) this.layer.spatialStat("point", {
                page: 1,
                coords: this.processor.circleCenter.toSimpleString(),
                statfield: this.statfield,
                srs: tempsrs,
                buffer: radius,
                qtype: 'JSON',
                callback: "NTool.statResult"
            });
            else this.layer.spatialStat("point", {
                page: 1,
                coords: this.processor.circleCenter.toSimpleString(),
                statfield: this.statfield,
                srs: tempsrs,
                buffer: radius,
                qtype: 'JSON',
                callback: this.callback
            })
        } catch (ex) {
            return
        }
    },
    enable: function () {
        NTool.prototype.enable.apply(this, arguments);
        this.map.div.style.cursor = 'help';
        return true
    },
    _CLASS_NAME: "NCircleStatTool"
});
NPointLabelTool = NObject(NTool, {
    toolType: "NPointLabelTool",
    defaultProcessorOptions: {
        'single': true,
        'double': false,
        'pixelTolerance': 0,
        'stopSingle': true,
        'stopDouble': false,
        'mousemove': false,
        "mousedown": false,
        "mouseup": false
    },
    callback: null,
    markers: null,
    icon: null,
    processorOptions: null,
    construct: function (options) {
        this.processorOptions = NUtility.extend({}, this.defaultProcessorOptions);
        this.processor = new NClickProcessor(this, {
            'click': this.excute
        }, this.processorOptions);
        NTool.prototype.construct.apply(this, [options])
    },
    excute: function (e) {
        var latlng = this.map._mapViewPortPxToWorld(e.xy);
        var newIcon = (this.icon) ? this.icon : NMarker.defaultIcon();
        if (this.markers == null) {
            this.markers = new NMarkersLayer("Markers");
            this.markers.layersort = 8888;
            this.map.addLayer(this.markers)
        }
        var marker = new NMarker(new NLatLng(latlng.lon, latlng.lat), newIcon);
        this.markers.addMarker(marker);
        if (this.callback != null) {
            this.callback(marker)
        }
    },
    enable: function () {
        NTool.prototype.enable.apply(this, arguments);
        this.map.div.style.cursor = 'crosshair';
        return true
    },
    _CLASS_NAME: "NPointLabelTool"
});
NPolygonQueryTool = NObject(NTool, {
    toolType: "NPolygonQueryTool",
    layer: '',
    callback: null,
    construct: function (complete) {
        NTool.prototype.construct.apply(this);
        NUtility.extend(this, complete);
        this.callbacks = NUtility.extend({
            done: this.afterDraw
        }, this.callbacks);
        this.processor = new NDrawPolygonProcessor(this, this.callbacks);
        this.completeCallback = complete
    },
    afterDraw: function (geometry) {
        try {
            if (this.callback == null) return;
            if (this.map == null) return;
            if (this.layer == '') {
                alert('未设定要查询的图层');
                return
            }
            var strCoors = "";
            if (geometry instanceof NGeometry.Polygon) {
                var points = geometry.components[0];
                strCoors = points.components[0].toSimpleString();
                for (var i = 1, len = points.components.length; i < len; i++) {
                    strCoors += ',' + points.components[i].toSimpleString()
                }
            } else {
                alert('请确保查询区域是多边形区域');
                return
            }
            var tempsrs = this.map.getProjectionCode();
            this.layer.spatialQuery("polygon", {
                'coords': strCoors,
                srs: tempsrs,
                'qtype': 'JSON',
                'page': 1,
                'callback': this.callback
            })
        } catch (ex) {}
    },
    enable: function () {
        NTool.prototype.enable.apply(this, arguments);
        this.map.div.style.cursor = 'help';
        return true
    },
    _CLASS_NAME: "NPolygonQueryTool"
});
NPolygonStatTool = NObject(NTool, {
    toolType: "NPolygonStatTool",
    layer: '',
    callback: null,
    statfield: '',
    construct: function (complete) {
        NTool.prototype.construct.apply(this);
        NUtility.extend(this, complete);
        this.callbacks = NUtility.extend({
            done: this.afterDraw
        }, this.callbacks);
        this.processor = new NDrawPolygonProcessor(this, this.callbacks);
        this.completeCallback = complete
    },
    enable: function () {
        NTool.prototype.enable.apply(this, arguments);
        this.map.div.style.cursor = 'help';
        return true
    },
    afterDraw: function (geometry) {
        try {
            if (this.map == null) return;
            if (this.layer == '') {
                alert('未设定要统计的图层');
                return
            }
            if (this.statfield == '') {
                alert('未设定指定图层的统计字段');
                return
            }
            var strCoors = "";
            if (geometry instanceof NGeometry.Polygon) {
                var points = geometry.components[0];
                strCoors = points.components[0].toSimpleString();
                for (var i = 0, len = points.components.length; i < len; i++) {
                    strCoors += ',' + points.components[i].toSimpleString()
                }
            } else {
                alert('请确保统计区域是多边形区域');
                return
            }
            var tempsrs = this.map.getProjectionCode();
            if (this.callback == null) this.layer.spatialStat("polygon", {
                coords: strCoors,
                statfield: this.statfield,
                srs: tempsrs,
                qtype: 'JSON',
                callback: "NTool.statResult"
            });
            else this.layer.spatialStat("polygon", {
                coords: strCoors,
                statfield: this.statfield,
                srs: tempsrs,
                qtype: 'JSON',
                callback: this.callback
            })
        } catch (ex) {}
    },
    _CLASS_NAME: "NPolygonStatTool"
});
NRectQueryTool = NObject(NTool, {
    toolType: "NRectQueryTool",
    layer: '',
    callback: null,
    construct: function (complete) {
        NTool.prototype.construct.apply(this);
        NUtility.extend(this, complete);
        this.callbacks = NUtility.extend({
            done: this.zoomBox
        }, this.callbacks);
        this.processor = new NDrawRectProcessor(this, this.callbacks);
        this.completeCallback = complete
    },
    zoomBox: function (position) {
        try {
            if (this.callback == null) {
                alert('未指定统计结果处理函数');
                return
            }
            if (this.map == null) return;
            if (this.layer == '') {
                alert('未设定要统计的图层');
                return
            }
            if (this.statfield == '') {
                alert('未设定指定图层的统计字段');
                return
            }
            var tempsrs = this.map.getProjectionCode();
            if (position instanceof NBounds) {
                var tempPixel = new NPixel(position.left, position.bottom);
                var geoXYmin = this.map.pixelToWorld(tempPixel);
                tempPixel.x = position.right;
                tempPixel.y = position.top;
                var geoXYmax = this.map.pixelToWorld(tempPixel);
                var strCoords = geoXYmin.toSimpleString() + ',' + geoXYmax.toSimpleString();
                this.layer.spatialQuery("bbox", {
                    page: 1,
                    coords: strCoords,
                    qtype: 'JSON',
                    srs: tempsrs,
                    callback: this.callback
                })
            } else {
                var geoXY = this.map.pixelToWorld(position);
                this.layer.spatialQuery("point", {
                    page: 1,
                    coords: geoXY.toSimpleString(),
                    buffer: 0,
                    srs: tempsrs,
                    qtype: 'JSON',
                    callback: this.callback
                })
            }
        } catch (ex) {}
    },
    enable: function () {
        NTool.prototype.enable.apply(this, arguments);
        this.map.div.style.cursor = 'help';
        return true
    },
    _CLASS_NAME: "NRectQueryTool"
});
NRectStatTool = NObject(NTool, {
    toolType: "NRectStatTool",
    layer: '',
    callback: null,
    statfield: '',
    construct: function (complete) {
        NTool.prototype.construct.apply(this);
        NUtility.extend(this, complete);
        this.callbacks = NUtility.extend({
            done: this.zoomBox
        }, this.callbacks);
        this.processor = new NDrawRectProcessor(this, this.callbacks);
        this.completeCallback = complete
    },
    zoomBox: function (position) {
        try {
            if (this.map == null) return;
            if (this.layer == '') {
                alert('未设定要统计的图层');
                return
            }
            if (this.statfield == '') {
                alert('未设定指定图层的统计字段');
                return
            }
            var tempsrs = this.map.getProjectionCode();
            if (position instanceof NBounds) {
                var tempPixel = new NPixel(position.left, position.bottom);
                var geoXYmin = this.map.pixelToWorld(tempPixel);
                tempPixel.x = position.right;
                tempPixel.y = position.top;
                var geoXYmax = this.map.pixelToWorld(tempPixel);
                var strCoords = geoXYmin.toSimpleString() + ',' + geoXYmax.toSimpleString();
                if (this.callback == null) this.layer.spatialStat("bbox", {
                    coords: strCoords,
                    srs: tempsrs,
                    statfield: this.statfield,
                    qtype: 'JSON',
                    callback: "NTool.statResult"
                });
                else this.layer.spatialStat("bbox", {
                    coords: strCoords,
                    srs: tempsrs,
                    statfield: this.statfield,
                    qtype: 'JSON',
                    callback: this.callback
                })
            } else {
                var geoXY = this.map.pixelToWorld(position);
                if (this.callback == null) this.layer.spatialStat("point", {
                    coords: geoXY.toSimpleString(),
                    buffer: 0,
                    statfield: this.statfield,
                    qtype: 'JSON',
                    srs: tempsrs,
                    callback: "NTool.statResult"
                });
                else this.layer.spatialStat("point", {
                    coords: geoXY.toSimpleString(),
                    buffer: 0,
                    statfield: this.statfield,
                    qtype: 'JSON',
                    srs: tempsrs,
                    callback: this.callback
                })
            }
        } catch (ex) {}
    },
    enable: function () {
        NTool.prototype.enable.apply(this, arguments);
        this.map.div.style.cursor = 'help';
        return true
    },
    _CLASS_NAME: "NRectStatTool"
});
NPanTool = NObject(NTool, {
    toolType: "NPanTool",
    slideStep: 50,
    direction: null,
    type: NTool.TYPE_BUTTON,
    construct: function (direction, options) {
        this.direction = direction;
        this._CLASS_NAME += this.direction;
        NTool.prototype.construct.apply(this, [options])
    },
    excute: function () {
        switch (this.direction) {
        case NPanTool.NORTH:
            this.map.pan(0, -this.slideStep);
            break;
        case NPanTool.SOUTH:
            this.map.pan(0, this.slideStep);
            break;
        case NPanTool.WEST:
            this.map.pan(-this.slideStep, 0);
            break;
        case NPanTool.EAST:
            this.map.pan(this.slideStep, 0);
            break
        }
    },
    _CLASS_NAME: "NPanTool"
});
NPanTool.NORTH = "North";
NPanTool.SOUTH = "South";
NPanTool.EAST = "East";
NPanTool.WEST = "West";
NZoomInTool = NObject(NTool, {
    toolType: "NZoomInTool",
    type: NTool.TYPE_BUTTON,
    excute: function () {
        this.map.zoomIn()
    },
    _CLASS_NAME: "NZoomInTool"
});
NZoomOutTool = NObject(NTool, {
    toolType: "NZoomOutTool",
    type: NTool.TYPE_BUTTON,
    excute: function () {
        this.map.zoomOut()
    },
    _CLASS_NAME: "NZoomOutTool"
});