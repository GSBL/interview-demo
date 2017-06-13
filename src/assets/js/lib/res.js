let win = window,
	doc = win.document,
	docElem = doc.documentElement,
	metaElem = doc.querySelector('meta[name=viewport]'),
	responsiveElem = doc.querySelector('meta[name=responsive]'),
	wdpr = Math.floor(win.devicePixelRatio) || 1, // 向下取整解决浏览器各种奇葩dpr
	tid = 0

//判断页面是否支持缩放
res.isScalable = (function (){
	// 禁用缩放，通过配置全局变量disableScale = true
	if (win.disableScale) {
            return false;
        }
    let isIos = win.navigator.appVersion.match(/iphone/gi),
        isAndroid = win.navigator.appVersion.match(/android/gi),
        isChrome = !!win.chrome, // 判断是不是chrome浏览器，不包括webview
     	ua = win.navigator.userAgent;

    if (isIos) {
        let version = ua.match(/(iPhone\sOS)\s([\d_]+)/);
        return parseFloat(version[2]) < 7 ? false : true;
    } else if (isAndroid) {
        let kernelVersion = ua.match(/AppleWebKit\/([\d\.]+)/i),
            UC = ua.match(/UCBrowser\/([\d\.]+)/i),
            QQ = ua.match(/MQQBrowser\/([\d\.]+)/i),
            chrome = ua.match(/Chrome\/([\d\.]+)/i),
            MI = ua.match(/MiuiBrowser/i),
            weixin = ua.match(/MicroMessenger\/([\d\.]+)/i);
        if (kernelVersion && parseFloat(kernelVersion[1]) >= 537.36 && MI) {
            return true;
        } else if (UC && parseFloat(UC[1]) >= 9.6 || weixin && parseFloat(weixin[1]) >= 6.1) {
            return true;
        } else if (chrome && parseFloat(chrome[1]) >= 30.0 && isChrome) {
            return true;
        } else {
            return false;
        }
        return false;
    } else {
        return false;
    }
})()

// 获取自定义dpr
if (responsiveElem && res.isScalable) {
    content = responsiveElem.getAttribute("content");
    if (content) {
        var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
        if (initialDpr) {
            res.dpr = Math.floor(initialDpr[1]);
        }
    }
}

function createMeta() {
    if (!metaElem) {
        var deviceWidth = 1 == res.scale ? "width=device-width, " : "";
        metaElem = doc.createElement("meta");
        metaElem.setAttribute("name", "viewport");
        metaElem.setAttribute("content", deviceWidth + "initial-scale=" + res.scale + ", maximum-scale=" + res.scale + ", minimum-scale=" + res.scale + ", user-scalable=no");
        if (docElem.firstElementChild)
            docElem.firstElementChild.appendChild(metaElem);
        else {
            var div = doc.createElement("div");
            div.appendChild(metaElem);
            doc.write(div.innerHTML);
        }
    }
}

res.scaleLock = false;

// scaleLock为true时禁止页面缩放
res.changeScale = function(d, scaleLock) {
    if (!this.scaleLock) {
        if (this.isScalable) {
            var d = Math.floor(d) || wdpr;
            this.dpr = d <= 3 ? d : 3;
        } else{
            this.dpr = 1;
        }
        this.scale = 1 / this.dpr;
        if(metaElem){
            metaElem.parentNode.removeChild(metaElem);
            metaElem = null;
        }
        createMeta();
    }
    if (scaleLock) {
        this.scaleLock = scaleLock;
    }
    var clientWidth = docElem.getBoundingClientRect().width,
        innerWidth = win.innerWidth;
    if(clientWidth > innerWidth) {
        var deviceWidth = 1 == this.scale ? "device-width" : innerWidth;
        metaElem.setAttribute("content", "width=" + deviceWidth + ",initial-scale=" + this.scale + ", maximum-scale=" + this.scale + ", minimum-scale=" + this.scale + ", user-scalable=no")
    }
    this.baseFontSize = clientWidth / 10,
    this.baseFontSize = Math.max(this.baseFontSize, 32),
    docElem.style.fontSize = this.baseFontSize + "px",

    // 设置data-dpr便于css hack
    docElem.setAttribute("data-dpr", this.dpr);
}

 res.changeScale();

    win.addEventListener("DOMContentLoaded", function(argument) {
        doc.body.style.fontSize = 12 * res.dpr + "px";
    }, false);

    win.addEventListener("resize", function(e) {
        clearTimeout(tid);
        if (!res.scaleLock && !win.noScaling) {
            tid = setTimeout(res.changeScale, 100);
        }
    }, false);

    win.addEventListener("pageshow", function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            if (!res.scaleLock) {
                tid = setTimeout(res.changeScale, 100);
            }
        }
    }, false);

    // 辅助函数
    res.rem2px = function(v) {
        var val = parseFloat(v) * this.dpr * this.baseFontSize;
        if (typeof v === "string" && v.match(/rem$/)) {
            val += "px";
        }
        return val;
    }

    res.px2rem = function(v) {
        var val = parseFloat(v) * this.dpr / this.baseFontSize;
        if (typeof v === "string" && v.match(/px$/)) {
            val += "rem";
        }
        return val;
    }

    res.px2px = function(v) {
        var val = parseFloat(v) * this.dpr;
        if (typeof v === "string" && v.match(/px$/)) {
            val += "px";
        }
        return val;
    }


module.exports = 