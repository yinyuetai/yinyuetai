webpackJsonp([4],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by caoxifeng on 16/4/11.
	 */
	var $ = __webpack_require__(1);
	__webpack_require__(118);
	var MainView = __webpack_require__(123);
	$(function () {
	    // 入口视图
	    new MainView();
	});


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */
/***/ function(module, exports) {

	module.exports = {
		/**
		 * [parseSearch 将search参数转换为obj]
		 * @param  {[type]} query [description]
		 * @return {[type]}       [description]
		 */
		parseSearch:function(query){
			var _query = {};
			var seg = query.replace(/^\?/, '').split('&'),
				leng = seg.length,
				i = 0,
				value,
				target;
			for (; i < leng; i++) {
				if (!seg[i]) continue;
				target = seg[i].split('=');
				value = target[1];
				if ((/^\[/.test(value) && /\]$/.test(value)) || (/^{/.test(value) || /\}$/.test(value))) {
					value = JSON.parse(value);
				};
				_query[target[0]] = value;
			}
			return _query;
		}
	};


/***/ },
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *如果使用zepto，fadeIn,fadeOut,innerHeight等函数不被支持
	 */
	
	var prober = __webpack_require__(55);
	var _ = __webpack_require__(43);
	
	var isIE = prober.browser.name == "ie",
	    isIE6 = isIE && prober.browser.version < "7";
	
	function Alertify() {
	    this.iframe = $("<iframe></iframe>").addClass("alertify-wrapper-iframe");
	    this.el = $("<div/>").addClass("alertify-wrapper clearfix");
	    this.ctn = $("<div/>").addClass("alertify-wrapper-ctn");
	    this.ctnInner = $("<div/>").addClass("alertify-wrapper-ctn-inner");
	    this.ctnInnerContWrapper = $("<div/>");
	    this.contElStr = "<i></i>";
	    this.body = $("body");
	    this.init();
	}
	
	Alertify.prototype = {
	    constructor: Alertify,
	    init: function() {
	        this.runningTime = 400;
	        this.stayTime = 1000;
	        this.timeId = null;
	        this.ctn.appendTo(this.el);
	        this.ctnInner.appendTo(this.ctn);
	        if (isIE) {
	            this.iframe.appendTo(this.ctnInner);
	        }
	        this.ctnInnerContWrapper.appendTo(this.ctnInner);
	        this.el.appendTo(this.body);
	    },
	    showInfo: function(css, mess, callback, delay) {
	        var self = this;
	        var stayTime = delay ? delay : self.stayTime;
	
	        if (typeof mess !== "undefined" && $.trim(mess) !== "") {
	            clearTimeout(self.timeId);
	            if (this.running) {
	                try {
	                    this.el.stop().hide();
	                } catch (e) {}
	                this.ctnInnerContWrapper.removeClass();
	                clearTimeout(this.timeId);
	                typeof self.callback === "function" && self.callback();
	            }
	            this.callback = callback;
	            //标示alertify是否为显示状态
	            this.running = true;
	
	            this.ctnInnerContWrapper.addClass(css).html(this.contElStr + mess);
	
	            this.setPosition();
	
	            try {
	                this.el.fadeIn(this.runningTime, function() {
	                    if (_.indexOf(Alertify.manualType, self.currentType) === -1) {
	                        self.timeId = setTimeout(function() {
	                            self.hideInfo();
	                        }, stayTime);
	                    }
	                });
	            } catch (e) {
	                this.el.css({
	                    "opacity": 1,
	                    "display": "block"
	                });
	                self.timeId = setTimeout(function() {
	                    self.hideInfo();
	                }, stayTime);
	            }
	
	        }
	    },
	    hideInfo: function() {
	        var self = this;
	        try {
	            this.el.fadeOut(this.runningTime, function() {
	                typeof self.callback === "function" && self.callback();
	                self.ctnInnerContWrapper.removeClass();
	                self.running = false;
	            });
	        } catch (e) {
	            this.el.css({
	                "opacity": 0,
	                "display": "none"
	            });
	            typeof self.callback === "function" && self.callback();
	            self.ctnInnerContWrapper.removeClass();
	            self.running = false;
	        }
	
	    },
	    setPosition: function() {
	        var clientHeight = document.documentElement.clientHeight;
	        try {
	            var alertifyHeight = this.el.innerHeight();
	        } catch (e) {
	            var alertifyHeight = this.el.height();
	        }
	
	        var alertifyTop = (clientHeight - alertifyHeight) / 2;
	
	        this.iframe.css("height", alertifyHeight + "px");
	
	        if (isIE6) {
	            var stylesInIE = {
	                position: "absolute",
	                top: alertifyTop + $(window).scrollTop() + "px"
	            };
	            this.el.css(stylesInIE);
	        } else {
	            this.el.css("top", alertifyTop + "px");
	        }
	    },
	    hide: function(time, callback) {
	        var time = typeof time === "number" ? time : this.runningTime,
	            self = this;
	        if (!this.running) {
	            return;
	        }
	
	        if (this.el.fadeOut) {
	            this.el.fadeOut(time, function() {
	                typeof callback === "function" && callback();
	                self.ctnInnerContWrapper.removeClass();
	                self.running = false;
	            });
	        } else {
	            this.el.hide();
	            self.ctnInnerContWrapper.removeClass();
	            self.running = false;
	        }
	    }
	};
	
	//alertify控件支持的类型，{如需要新增类型，直接在此属性加入即可}
	Alertify.automaticType = ["log", "error", "success"];
	Alertify.manualType = ["loading"];
	
	var alertify = new Alertify(),
	    exportsObj = {
	        hide: function(time, callback) {
	            var time = time,
	                callback = callback;
	            if (arguments.length === 1 && typeof arguments[0] === "function") {
	                callback = time;
	                time = null;
	            }
	            alertify.hide(time, callback);
	        }
	    };
	
	_.each(Alertify.automaticType.concat(Alertify.manualType), function(type, index) {
	    exportsObj[type] = function() {
	        var message = arguments[0];
	        if (type === "loading") {
	            message || (message = "加载中，请稍后...");
	        }
	        alertify.currentType = type;
	        alertify.showInfo("alertify-" + type, message, arguments[1], arguments[2]);
	    }
	});
	
	/**
	 * interface 对外的接口
	 * @return {
	 *      log: function() {},         常态输出
	 *      loading: function() {},     loading状态
	 *      error: function() {},       错误输出
	 *      success: function() {}      成功输出
	 *      hide: function() {}         关闭提示组件,可传入回调
	 * }
	 * 每个方法都接受二个参数message和callback回调,callback不是必须的。(hide接受的是time和callback参数,可直接单独传入callback)
	 */
	
	module.exports = exportsObj;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var base = __webpack_require__(24);
	var BaseView = base.View;
	var ClipBoard = __webpack_require__(92);
	var alertify = __webpack_require__(90);
	var View = BaseView.extend({
	    el: '',
	    events: {
	        'click .J_sharelink': 'windowOpen'
	    },
	    rawLoader: function() {
	        return '';
	    },
	    context: function(args) {
	        console.log(args);
	    },
	    beforeMount: function() {
	        //  初始化一些自定义属性
	        this.clipBoard = ClipBoard;
	    },
	    onEvents: function() {
	        this.on('events:initAttr', function(options) {
	            this.renderShare(options);
	        });
	    },
	    afterMount: function() {
	        //  获取findDOMNode DOM Node
	        this.shareItem = __webpack_require__(93);
	    },
	    ready: function() {
	        //  初始化
	        this.onEvents();
	    },
	    beforeDestroy: function() {
	        //  进入销毁之前,将引用关系设置为null
	    },
	    destroyed: function() {
	        //  销毁之后
	    },
	    renderShare: function(opts) {
	        var _opts = {};
	        for (var v in opts) {
	            _opts[v] = encodeURIComponent(opts[v]);
	        }
	        this.options = _opts;
	        this.options.href = window.location.href;
	        var html = this.compileHTML(this.shareItem,  this.options);
	        this.$el.append(html);
	        this.clipBoardInit();
	    },
	    windowOpen: function(e) {
	        e.preventDefault();
	        var windowWidth = $(window).width();
	        var windowHeight = $(window).height();
	        var offsetX, offsetY;
	        var width = 800;
	        var height = 700;
	        var url = $(e.target).attr('href');
	
	        if (width >= windowWidth) {
	            offsetX = 0;
	            width = windowWidth;
	        } else {
	            offsetX = (windowWidth - width) / 2;
	        }
	        if (height >= windowWidth) {
	            offsetY = 0;
	            height = windowHeight;
	        } else {
	            offsetY = (windowHeight - height) / 2;
	        }
	        window.open(url, 'newwindow',
	            'height=' + height + ',width=' + width +
	            ',left=' + offsetX + ',top=' + offsetY +
	            ',toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');
	    },
	    clipBoardInit: function() {
	        var clipboard = new this.clipBoard(copyUrlBtn);
	        clipboard.on('success', function(e) {
	            alertify.success('复制成功');
	            e.clearSelection();
	        });
	
	        clipboard.on('error', function(e) {
	            alertify.error('复制失败，请重试');
	        });
	    }
	});
	
	module.exports = View;


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var require;var require;/*! * clipboard.js v1.5.12 * https://zenorocha.github.io/clipboard.js * * Licensed MIT © Zeno Rocha */!function(t){if(true)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.Clipboard=t()}}(function(){var t,e,n;return function t(e,n,o){function i(a,c){if(!n[a]){if(!e[a]){var s="function"==typeof require&&require;if(!c&&s)return require(a,!0);if(r)return r(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var u=n[a]={exports:{}};e[a][0].call(u.exports,function(t){var n=e[a][1][t];return i(n?n:t)},u,u.exports,t,e,n,o)}return n[a].exports}for(var r="function"==typeof require&&require,a=0;a<o.length;a++)i(o[a]);return i}({1:[function(t,e,n){var o=t("matches-selector");e.exports=function(t,e,n){for(var i=n?t:t.parentNode;i&&i!==document;){if(o(i,e))return i;i=i.parentNode}}},{"matches-selector":5}],2:[function(t,e,n){function o(t,e,n,o,r){var a=i.apply(this,arguments);return t.addEventListener(n,a,r),{destroy:function(){t.removeEventListener(n,a,r)}}}function i(t,e,n,o){return function(n){n.delegateTarget=r(n.target,e,!0),n.delegateTarget&&o.call(t,n)}}var r=t("closest");e.exports=o},{closest:1}],3:[function(t,e,n){n.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},n.nodeList=function(t){var e=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===e||"[object HTMLCollection]"===e)&&"length"in t&&(0===t.length||n.node(t[0]))},n.string=function(t){return"string"==typeof t||t instanceof String},n.fn=function(t){var e=Object.prototype.toString.call(t);return"[object Function]"===e}},{}],4:[function(t,e,n){function o(t,e,n){if(!t&&!e&&!n)throw new Error("Missing required arguments");if(!c.string(e))throw new TypeError("Second argument must be a String");if(!c.fn(n))throw new TypeError("Third argument must be a Function");if(c.node(t))return i(t,e,n);if(c.nodeList(t))return r(t,e,n);if(c.string(t))return a(t,e,n);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function i(t,e,n){return t.addEventListener(e,n),{destroy:function(){t.removeEventListener(e,n)}}}function r(t,e,n){return Array.prototype.forEach.call(t,function(t){t.addEventListener(e,n)}),{destroy:function(){Array.prototype.forEach.call(t,function(t){t.removeEventListener(e,n)})}}}function a(t,e,n){return s(document.body,t,e,n)}var c=t("./is"),s=t("delegate");e.exports=o},{"./is":3,delegate:2}],5:[function(t,e,n){function o(t,e){if(r)return r.call(t,e);for(var n=t.parentNode.querySelectorAll(e),o=0;o<n.length;++o)if(n[o]==t)return!0;return!1}var i=Element.prototype,r=i.matchesSelector||i.webkitMatchesSelector||i.mozMatchesSelector||i.msMatchesSelector||i.oMatchesSelector;e.exports=o},{}],6:[function(t,e,n){function o(t){var e;if("INPUT"===t.nodeName||"TEXTAREA"===t.nodeName)t.focus(),t.setSelectionRange(0,t.value.length),e=t.value;else{t.hasAttribute("contenteditable")&&t.focus();var n=window.getSelection(),o=document.createRange();o.selectNodeContents(t),n.removeAllRanges(),n.addRange(o),e=n.toString()}return e}e.exports=o},{}],7:[function(t,e,n){function o(){}o.prototype={on:function(t,e,n){var o=this.e||(this.e={});return(o[t]||(o[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){function o(){i.off(t,o),e.apply(n,arguments)}var i=this;return o._=e,this.on(t,o,n)},emit:function(t){var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),o=0,i=n.length;for(o;i>o;o++)n[o].fn.apply(n[o].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),o=n[t],i=[];if(o&&e)for(var r=0,a=o.length;a>r;r++)o[r].fn!==e&&o[r].fn._!==e&&i.push(o[r]);return i.length?n[t]=i:delete n[t],this}},e.exports=o},{}],8:[function(e,n,o){!function(i,r){if("function"==typeof t&&t.amd)t(["module","select"],r);else if("undefined"!=typeof o)r(n,e("select"));else{var a={exports:{}};r(a,i.select),i.clipboardAction=a.exports}}(this,function(t,e){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i=n(e),r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},a=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),c=function(){function t(e){o(this,t),this.resolveOptions(e),this.initSelection()}return t.prototype.resolveOptions=function t(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];this.action=e.action,this.emitter=e.emitter,this.target=e.target,this.text=e.text,this.trigger=e.trigger,this.selectedText=""},t.prototype.initSelection=function t(){this.text?this.selectFake():this.target&&this.selectTarget()},t.prototype.selectFake=function t(){var e=this,n="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return e.removeFake()},this.fakeHandler=document.body.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[n?"right":"left"]="-9999px",this.fakeElem.style.top=(window.pageYOffset||document.documentElement.scrollTop)+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,document.body.appendChild(this.fakeElem),this.selectedText=(0,i.default)(this.fakeElem),this.copyText()},t.prototype.removeFake=function t(){this.fakeHandler&&(document.body.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(document.body.removeChild(this.fakeElem),this.fakeElem=null)},t.prototype.selectTarget=function t(){this.selectedText=(0,i.default)(this.target),this.copyText()},t.prototype.copyText=function t(){var e=void 0;try{e=document.execCommand(this.action)}catch(n){e=!1}this.handleResult(e)},t.prototype.handleResult=function t(e){e?this.emitter.emit("success",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)}):this.emitter.emit("error",{action:this.action,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})},t.prototype.clearSelection=function t(){this.target&&this.target.blur(),window.getSelection().removeAllRanges()},t.prototype.destroy=function t(){this.removeFake()},a(t,[{key:"action",set:function t(){var e=arguments.length<=0||void 0===arguments[0]?"copy":arguments[0];if(this._action=e,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function t(){return this._action}},{key:"target",set:function t(e){if(void 0!==e){if(!e||"object"!==("undefined"==typeof e?"undefined":r(e))||1!==e.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&e.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(e.hasAttribute("readonly")||e.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=e}},get:function t(){return this._target}}]),t}();t.exports=c})},{select:6}],9:[function(e,n,o){!function(i,r){if("function"==typeof t&&t.amd)t(["module","./clipboard-action","tiny-emitter","good-listener"],r);else if("undefined"!=typeof o)r(n,e("./clipboard-action"),e("tiny-emitter"),e("good-listener"));else{var a={exports:{}};r(a,i.clipboardAction,i.tinyEmitter,i.goodListener),i.clipboard=a.exports}}(this,function(t,e,n,o){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function c(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function s(t,e){var n="data-clipboard-"+t;if(e.hasAttribute(n))return e.getAttribute(n)}var l=i(e),u=i(n),f=i(o),d=function(t){function e(n,o){r(this,e);var i=a(this,t.call(this));return i.resolveOptions(o),i.listenClick(n),i}return c(e,t),e.prototype.resolveOptions=function t(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];this.action="function"==typeof e.action?e.action:this.defaultAction,this.target="function"==typeof e.target?e.target:this.defaultTarget,this.text="function"==typeof e.text?e.text:this.defaultText},e.prototype.listenClick=function t(e){var n=this;this.listener=(0,f.default)(e,"click",function(t){return n.onClick(t)})},e.prototype.onClick=function t(e){var n=e.delegateTarget||e.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new l.default({action:this.action(n),target:this.target(n),text:this.text(n),trigger:n,emitter:this})},e.prototype.defaultAction=function t(e){return s("action",e)},e.prototype.defaultTarget=function t(e){var n=s("target",e);return n?document.querySelector(n):void 0},e.prototype.defaultText=function t(e){return s("text",e)},e.prototype.destroy=function t(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)},e}(u.default);t.exports=d})},{"./clipboard-action":8,"good-listener":4,"tiny-emitter":7}]},{},[9])(9)});

/***/ },
/* 93 */
/***/ function(module, exports) {

	module.exports = "<a href=\"http://v.yinyuetai.com/share/weixin?title={{content}}&url={{url}}\" title=\"分享到微信\" data-video-id=\"{{videoId}}\" data-tongji-id=\"520\" class=\"weixin J_sharelink\" target=\"_blank\"></a>\r\n<a href=\"http://connect.qq.com/widget/shareqq/index.html?showcount=1&desc={{desc}}&summary={{summary}}&site=音悦台&pics={{pic}}&title={{title}}&url={{url}}\" title=\"分享到QQ\" data-video-id=\"{{videoId}}\" data-tongji-id=\"518\" class=\"qq J_sharelink\" target=\"_blank\"></a>\r\n<a href=\"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={{url}}&desc={{content}}&title={{title}}&pics={{pic}}\" title=\"分享到QQ空间\" data-video-id=\"{{videoId}}\" data-tongji-id=\"519\" class=\"qqzone J_sharelink\" target=\"_blank\"></a>\r\n<a href=\"http://v.t.sina.com.cn/share/share.php?appkey=1033972380&url={{url}}&title={{content}}&content=gb2312&pic={{pic}}&ralateUid=1698229264\" title=\"分享到新浪微博\" data-video-id=\"{{videoId}}\" data-tongji-id=\"517\" class=\"weibo J_sharelink\" target=\"_blank\"></a>\r\n<span href=\"javascript:;\" title=\"复制地址\" data-video-id=\"{{videoId}}\" data-tongji-id=\"517\" class=\"jia \" target=\"_blank\" id=\"copyUrlBtn\"  data-clipboard-action=\"copy\" data-clipboard-target=\"#bar\"></span>\r\n<textarea id=\"bar\" style=\"opacity:0;\">{{href}}</textarea>\r\n"

/***/ },
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	var user = __webpack_require__(59);
	module.exports = {
	    dealParamsJsonP: function(model, params, useToken) {
	        var _params = params || {};
	        _params.deviceinfo = '{"aid":"30001001"}';
	        if (!!useToken && user.isLogined()) {
	            _params.access_token = 'web-' + user.getToken();
	        }
	        var promise = model.executeJSONP(_params);
	        return promise;
	    }
	};


/***/ },
/* 118 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var base = __webpack_require__(24);
	var BaseView = base.View;
	var topbar = __webpack_require__(42);
	var DetailView = __webpack_require__(124);
	var HistoryView = __webpack_require__(145);
	var View = BaseView.extend({
	    el: '',
	    rawLoader: function() {
	        return '';
	    },
	    context: function(args) {
	        console.log(args);
	    },
	    beforeMount: function() {
	        //  初始化一些自定义属性
	    },
	    afterMount: function() {
	        //  获取findDOMNode DOM Node
	    },
	    ready: function() {
	        //  初始化
	        this.topbar = new topbar();
	        this.detailView = new DetailView();
	        this.historyView = new HistoryView();
	
	        this.renderPage();
	    },
	    renderPage: function() {
	        //解决游客问题
	        $('body').on('click', '.J_close', function() {
	            window.location.reload();
	        });
	    },
	    beforeDestroy: function() {
	        //  进入销毁之前,将引用关系设置为null
	    },
	    destroyed: function() {
	        //  销毁之后
	    }
	});
	
	module.exports = View;


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var base = __webpack_require__(24);
	var BaseView = base.View;
	var DetailModel = __webpack_require__(125);
	var url = __webpack_require__(83);
	var FlashApi = __webpack_require__(126);
	var alertify = __webpack_require__(90);
	var gobal = __webpack_require__(58);
	var user = __webpack_require__(59);
	var loginBox = __webpack_require__(50);
	var dealModel = __webpack_require__(117).dealParamsJsonP;
	var ChatView = __webpack_require__(127);
	var Share = __webpack_require__(91);
	var pay = __webpack_require__(132);
	var View = BaseView.extend({
	    el: '.videoWin',
	    events: {
	        'click .meetable': 'subscribe', //channelId
	        'click .disabled': 'unsubscribe', //channelId
	        'click .loveBtn': 'like',
	    },
	    rawLoader: function() {
	        return '';
	    },
	    context: function(args) {
	        console.log(args);
	    },
	    beforeMount: function() {
	        //  初始化一些自定义属性
	        var urlHASH = url.parseSearch(location.search);
	        this.videoId = urlHASH.videoId;
	        this.channelId = urlHASH.channelId;
	        this.loginBox = loginBox();
	        this._dialog = this.loginBox.dialog;
	        this.now = 5;
	        this.count = 5;
	        this.max = 5;
	        this.bInitVideo = true;
	        this.bStartUp = false;
	        this.powerSection = ['13%', '28%', '43%', '58%', '73%', '88%'];
	        this.playState = false; //是否开始播放视频;
	        this.bFetchVideo = false; //是否阻止更新更新视频信息;
	        this.detailModel = new DetailModel();
	        this.chatView = new ChatView();
	        this.pay = new pay();
	        this.renderVideo();
	    },
	    afterMount: function() {
	        //  获取findDOMNode DOM Node
	        this.videoWin = __webpack_require__(141);
	        this.downloadTips = __webpack_require__(142);
	        this.tipsTpl = __webpack_require__(143);
	    },
	    ready: function() {
	        //  初始化
	        if(this.videoId==848){
	            this.$el.after(this.tipsTpl);
	            var _TipsWin = $('.tipsWin');
	            var _close = _TipsWin.find('.close');
	            _close.click(function () {
	                _TipsWin.remove();
	            });
	        }
	
	        var self = this;
	        this.DetailPromise = dealModel(this.detailModel, {
	            videoId: this.videoId
	        }, true);
	        window.flashApi = new FlashApi({
	            el: 'flashBox',
	            props: {
	                src: '../../../flash/RTMPInplayer.swf',
	                width: 807,
	                height: 454
	            }
	        });
	
	        this.DetailPromise.done(function(res) {
	            //没有找到资源的情况下
	            if (res.code == 10027) {
	                alert(res.msg);
	                window.location.href = 'http://startv.yinyuetai.com/';
	                return;
	            }
	            if (res.msg === "SUCCESS") {
	
	                var rq_db = res.data;
	                self.renderVideoMsg(rq_db);
	                self.renderShare(rq_db);
	                var status = self._dialog.status();
	                self.chatView.trigger('events:setChatroomId', rq_db);
	                if (!user.isLogined()) {
	                    if (status == 'hide') {
	                        self._dialog.trigger('show');
	                    } else {
	                        self._dialog.trigger('hide');
	                    }
	                    return false;
	                }
	                self.longPolling();
	            } else {
	                throw new Error(res.msg)
	            }
	        });
	    },
	    renderVideo: function() {
	        var self = this;
	        this.listenTo(this.detailModel, 'change', function() {
	            if (!user.isLogined()) return;
	            var rq_db = this.detailModel.get('data');
	            var rq_status = this.detailModel.get('msg');
	            if (rq_status !== 'SUCCESS') return;
	            if (rq_db.failureType === 'NONE') {
	                //有播放的权限
	                if (rq_db.encryptionType == 'NONE') {
	                    if(!rq_db.multiSeats){
	                        self.loadVideo();
	                    }else{
	                        var html = this.compileHTML(this.downloadTips, {
	                            name: rq_db.videoName,
	                            erwm: __webpack_require__(140)
	                        });
	                        $('.payDialog').html(html).show();
	                        $('.payDialog').on('click', '.closeErm', function() {
	                            window.location.href = './';
	                        });
	                    }
	
	                } else {
	                    var html = this.compileHTML(this.downloadTips, {
	                        name: rq_db.videoName,
	                        erwm: __webpack_require__(140)
	                    });
	                    $('.payDialog').html(html).show();
	                    $('.payDialog').on('click', '.closeErm', function() {
	                        window.location.href = './';
	                    });
	                }
	            } else if (rq_db.failureType === 'NOTLOGIN') {
	                //涉及登陆的问题
	                this.bFetchVideo = true;
	            } else if (rq_db.failureType === 'CHARGE') {
	                //收费
	                this.bFetchVideo = true;
	                this.pay.judgeRight(rq_db);
	            } else {
	                //需要引导到app
	                this.bFetchVideo = true;
	                console.log('引导');
	            }
	        });
	    },
	    //长轮询视频信息
	    longPolling: function() {
	        var self = this;
	        long();
	
	        function long() {
	            gobal.jsonp('/video/longpolling.json', {
	                videoId: self.videoId
	            }, function(res) {
	                if(20010===~~res.code){
	                    alert(res.msg);
	                    window.location.href = 'http://login.yinyuetai.com/logout';
	                }
	                if (res.msg === 'SUCCESS') {
	                    var rq_db = res.data;
	                    $('.usersCount').html(rq_db.visitCount);
	                    $('.lovesCount').html(rq_db.likeCount);
	                    $('.com_name i').html(rq_db.bulletCurtain);
	                    //判断是否开始
	                    if (rq_db.playStart) {
	                        if (!self.playState && !self.bFetchVideo) {
	                            self.playState = true;
	                            var promise = dealModel(self.detailModel, {
	                                videoId: self.videoId
	                            }, true);
	                        }
	                    }
	                }
	            });
	        }
	        setInterval(long, 15000);
	    },
	    //加载视频到播放器
	    loadVideo: function() {
	        this.playState = true;
	        var videoObj, videoBoo, rq_db, flashApi;
	        flashApi = window.flashApi;
	        rq_db = this.detailModel.get('data');
	        if (rq_db.videoType === 'LIVE') {
	            videoObj = rq_db.liveStream;
	            // videoObj.key = rq_db.channel.channelId+'-'+urlHASH.videoId+'-'+rq_db.videoType;
	            $('.flash_shadow').hide();
	            videoBoo = true;
	            flashApi.onReady(function() {
	                try {
	                    flashApi.init(videoObj, videoBoo);
	                } catch (e) {
	
	                }
	            });
	        } else {
	            videoObj = rq_db.vodStream;
	            videoBoo = false;
	            flashApi.onReady(function() {
	                try {
	                    $('.flash_shadow').hide();
	                    flashApi.init(videoObj, videoBoo);
	                } catch (e) {
	
	                }
	            });
	        }
	
	    },
	    renderVideoMsg: function(rq_db) {
	        rq_db.liveLog = __webpack_require__(144);
	        var html = this.compileHTML(this.videoWin, rq_db);
	        this.$el.append(html);
	
	    },
	    renderShare: function(rq_db) {
	        // var rq_db = this.bannerModel.get('data');
	        var opts = {
	            title: '【' + rq_db.videoName + '】的直播太精彩了！',
	            url: window.location.href,
	            summary: '【' + rq_db.videoName + '】的直播太精彩了！',
	            content: '【' + rq_db.videoName + '】的直播太精彩了！',
	            pic: rq_db.posterPic,
	            channelId: rq_db.channelId,
	            desc: ''
	        };
	        this.share = new Share({
	            el : '.share',
	        });
	        this.share.trigger('events:initAttr',opts);
	    },
	    like: function(e) {
	        var self = this;
	        var self = this;
	        var status = self._dialog.status();
	        if (!user.isLogined()) {
	            if (status == 'hide') {
	                self._dialog.trigger('show');
	            } else {
	                self._dialog.trigger('hide');
	            }
	            return false;
	        }
	        var $power = $(e.currentTarget).find('.power');
	        if (this.count === 0) {
	            return;
	        }
	         window.flashApi.like();
	        if(!self.bStartUp){
	            self.upPower();
	        }
	        self.bStartUp = true;
	        updataCount_like();
	        self.now--;
	        self.count = self.now;
	        if (self.now < 0) {
	            self.now = 0;
	        }
	        gobal.jsonp('/video/count.json', {
	            videoId: self.videoId,
	            type: 4,
	            count: 1
	        }, function(res) {
	            if (res.msg === 'SUCCESS') {
	                // window.flashApi.like();
	                // if(!self.bStartUp){
	                //     self.upPower();
	                // }
	                // self.bStartUp = true;
	                // updataCount_like();
	                // self.now--;
	                // console.log(self.now--);
	                // self.count = self.now;
	                // if (self.now < 0) {
	                //     self.now = 0;
	                // }
	            }
	        }, function(res) {
	            console.log(res);
	        }, true);
	
	    },
	    upPower: function() {
	        var self = this;
	        setInterval(upP, 1000);
	        var $power = $('.loveBtn .power');
	        function upP() {
	            if (self.now >= (self.max+1)) {
	                self.now = self.max;
	                self.count = self.now;
	                return;
	            }
	            $power.css({
	                height :  self.powerSection[self.now]
	            });
	            self.now++;
	            self.count = self.now;
	
	        }
	    },
	    subscribe: function(e) {
	        var self = this;
	        var $this = $(e.currentTarget);
	        var status = this._dialog.status();
	        if (!user.isLogined()) {
	            if (status == 'hide') {
	                this._dialog.trigger('show');
	            } else {
	                this._dialog.trigger('hide');
	            }
	            return false;
	        }
	        var subscribe_params = {
	            channelId: this.channelId
	        };
	        gobal.jsonp('/channel/subscribe.json', subscribe_params, function(res) {
	            if (res.msg === "SUCCESS") {
	                alertify.success('订阅成功');
	                $this.removeClass('meetable').addClass('disabled').html('已订阅');
	            }
	            console.log("success");
	        }, this.error, true);
	    },
	    unsubscribe: function(e) {
	        var self = this;
	        var $this = $(e.currentTarget);
	        var subscribe_params = {
	            channelId: this.channelId
	        };
	        gobal.jsonp('/channel/unsubscribe.json', subscribe_params, function(res) {
	            if (res.msg === "SUCCESS") {
	                alertify.error('取消订阅成功');
	                $this.removeClass('disabled').addClass('meetable').html('订阅频道');
	            }
	        }, this.error, true);
	    },
	    beforeDestroy: function() {
	        //  进入销毁之前,将引用关系设置为null
	    },
	    destroyed: function() {
	        //  销毁之后
	    }
	});
	
	function updataCount_like(argument) {
	    var $like_count = $('.lovesCount');
	    var num = $like_count.html().replace(/\d+/, function(d) {
	        d++;
	        return d;
	    });
	    $like_count.html(num);
	}
	module.exports = View;


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var base = __webpack_require__(24);
	var Config = __webpack_require__(38);
	var BaseModel = base.Model;
	var env = Config.env[Config.scheme];
	
	var Model = BaseModel.extend({
	    url: '{{url_prefix}}/video/detail.json',
	    beforeEmit: function beforeEmit() {
	        // 给请求地址替换一下环境变量
	        if (/^\{{0,2}(url_prefix)\}{0,2}/.test(this.url)) {
	            this.url = this.url.replace('{{url_prefix}}', env.url_prefix);
	        }
	    }
	});
	
	var shared = null;
	Model.sharedInstanceModel = function sharedInstanceModel() {
	    if (!shared) {
	        shared = new Model();
	    }
	    return shared;
	};
	
	module.exports = Model;


/***/ },
/* 126 */
/***/ function(module, exports) {

	/**
	 * @time 2016年3月18日
	 * @author icepy
	 * @info 封装Flash接口
	 */
	
	'use strict';
	// exports.FlashAPI = function () {
	var flashTemp =
	    '<object width="{width}" height="{height}"  align="middle" id="{id}" type="application/x-shockwave-flash" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">' +
	    '<param value="{src}" name="movie">' +
	    '<param value="{always}" name="allowscriptaccess">' +
	    '<param value="{fullscreen}" name="allowfullscreen">' +
	    '<param value="{quality}" name="quality">' +
	    '<param value="{flashvars}" name="flashvars">' +
	    '<param value="{wmode}" name="wmode" />' +
	    '<embed width="{width}" height="{height}"  name="{id}" type="application/x-shockwave-flash" src="{src}" allowscriptaccess="{always}" allowfullscreen="{fullscreen}" quality="{quality}"  wmode="{wmode}" flashvars="{flashvars}" />' +
	    '</object>';
	var win = window;
	var origin = win.location.origin;
	var isWindows = win.navigator.appName.indexOf("Microsoft") != -1;
	var uid = 999;
	win.YYTPCFlashReadyState = false;
	/**
	    {
	        "props":{
	            构建页面所依赖的数据源
	        },
	        "methods":{
	
	        },
	        el
	    }
	 */
	var getSwfDOM = function(id) {
	    var swf, embed, el = document.getElementById(id) || null;
	    if (el && el.nodeName.toUpperCase() == 'OBJECT') {
	        if (typeof el.SetVariable != 'undefined') {
	            swf = el;
	        } else {
	            embed = el.getElementsByTagName('embed')[0];
	            if (embed) {
	                swf = embed;
	            }
	        }
	    }
	    return swf;
	};
	var render = function(tpl, data) {
	    if (data) {
	        return tpl.replace(/\{(.*?)\}/ig, function() {
	            return data[arguments[1]] || "";
	        });
	    }
	    return tpl;
	};
	var FlashAPI = function(options) {
	    this.$el = typeof options.el === 'string' ? document.getElementById(options.el) : options.el;
	    this._options = options;
	    this._props = options.props || {};
	    this.$attrs = {
	        'id': 'YYTFlash' + (uid++), //配置id
	        'src': this._props.src || origin + '/flash/RTMPInplayer.swf?t=20160407.6', //引入swf文件
	        'width': this._props.width || 808,
	        'height': this._props.height || 428,
	        'wmode': this._props.wmode || 'transparent', //控制显示模型
	        'flashvar': this._props.flashvar || '', //初始化参数
	        'always': this._props.always || 'always', //控制是否交互
	        'fullscreen': this._props.fullscreen || true, //控制是否全屏
	        'quality': this._props.quality || 'high'
	    };
	    this._html = render(flashTemp, this.$attrs);
	    this._methods = options.methods || {};
	    this._ready = false;
	    this._init();
	};
	FlashAPI.prototype._init = function() {
	    this.$el.innerHTML = this._html;
	    this.$swf = getSwfDOM(this.$attrs.id);
	    window.$swf = this.$swf;
	};
	FlashAPI.prototype.onReady = function(callback) {
	    var self = this;
	    if (win.YYTPCFlashReadyState || this._ready) {
	        callback.call(this);
	    } else {
	        this.$timer = setInterval(function() {
	            if (win.YYTPCFlashReadyState) {
	                self._ready = true;
	                win.YYTPCFlashReadyState = false;
	                clearInterval(self.$timer);
	                self.$timer = null;
	                callback.call(self);
	            }
	        }, 0)
	    };
	};
	FlashAPI.prototype.init = function(data, boo) {
	    this.$swf.initData(data, boo);
	};
	FlashAPI.prototype.isReady = function() {
	    return this._ready;
	};
	FlashAPI.prototype.addUrl = function(url, name) {
	    this.$swf.setvedioUrl(url, name);
	};
	FlashAPI.prototype.setName = function(arr) {
	    this.$swf.set_name(arr);
	    //[{left:boo,url:avatorUrl,name:'sam'}]
	};
	FlashAPI.prototype.bubble = function(index, txt) {
	    this.$swf.set_say(index, txt);
	    //索引值从0开始,与set_name对应
	};
	FlashAPI.prototype.width = function(value) {
	    if (typeof value === 'string') {
	        value = ~~value;
	    };
	    this.$swf.setPlayerWidth(value);
	};
	FlashAPI.prototype.height = function(value) {
	    if (typeof value === 'string') {
	        value = ~~value;
	    };
	    this.$swf.setPlayerHeight(value);
	};
	FlashAPI.prototype.notifying = function(obj) {
	    this.$swf.setOneMessageInchat(JSON.stringify(obj));
	};
	FlashAPI.prototype.clear = function() {
	    this.$swf.cleanAllMessage();
	};
	FlashAPI.prototype.like = function() {
	    this.$swf.clickHurt();
	}
	
	var shared = null;
	FlashAPI.sharedInstanceFlashAPI = function(options) {
	    if (!shared) {
	        shared = new FlashAPI(options)
	    }
	    return shared;
	};
	win.YYTPCFlashOnReady = function() {
	    //flash init success
	    win.YYTPCFlashReadyState = true;
	};
	module.exports = FlashAPI;


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var base = __webpack_require__(24);
	var BaseView = base.View;
	var imServer = __webpack_require__(128);
	var chat = __webpack_require__(130);
	var user = __webpack_require__(59);
	var alertify = __webpack_require__(90);
	var Backbone = window.Backbone;
	var ChatModel = Backbone.Model.extend({});
	var chatModel = new ChatModel();
	var View = BaseView.extend({
	    el: '.commentWin',
	    model: chatModel,
	    events: {
	        'click .inputBox .button': 'clickSendMsg',
	        'keydown .input_comment': 'clockSendMsg',
	        'click .closeScroll': 'closeScroll',
	        'click .clearScroll': 'clearScroll',
	    },
	    rawLoader: function() {
	        return '';
	    },
	    context: function(args) {
	        console.log(args);
	    },
	    beforeMount: function() {
	        //  初始化一些自定义属性
	        this.bSend = true;
	        this.bScroll = true;
	        this.bStopHistory = false;
	        this.chatroomIds = [];
	        this._MsgCount = $('.com_name i');
	        this.bInit = false;
	        this.bOne = true;
	        this._txt = this.$el.find('.input_comment');
	        this.commentList = this.$el.find('.nowList');
	        this.historyList = this.$el.find('.historyList');
	        this._con = this.$el.find('.comment_con');
	    },
	    afterMount: function() {
	        //  获取findDOMNode DOM Node
	        this.chatItemTpl = __webpack_require__(131);
	    },
	    ready: function() {
	        //  初始化
	        this.initCountChat = parseInt(this._MsgCount.html());
	        var self = this;
	        this.onEvents();
	        this.listenTo(this.model, 'change', this.renderChat);
	        this.countInit = 0;
	    },
	    onEvents: function() {
	        var self = this;
	        this.on('events:setChatroomId', function(attr, isTranslator) {
	            var chatroomId = attr.chatroomId;
	            this.videoId = attr.videoId;
	
	            if (/\]/i.test(chatroomId)) {
	                this.chatroomIds = eval(chatroomId);
	            } else {
	                this.chatroomIds.push(chatroomId);
	            }
	            this.isTranslator = isTranslator || false;
	            chat.init({
	                chatroomIds: this.chatroomIds,
	                videoId: this.videoId,
	                view: this,
	                userMsg: user
	            }, function(res) {
	                self.bInit = res;
	            })
	            var timer = setInterval(function() {
	                if (self.bInit) {
	                    // self.applyGround();
	                    clearInterval(timer);
	                }
	            }, 1000);
	        });
	        this.on('events:normal', function() {
	            this.syncMsg();
	        });
	        this.on('events:loadHistory',function () {
	            this.renderHistory();
	        });
	        this.on('events:initHistory',function () {
	            this.renderHistory();
	            this._con.scrollTop(10000);
	            function scroll() {
	                if(self._con.scrollTop()<15){
	                    chat.getSyncGroupMsgs();
	                }
	            }
	            var delay = _.throttle(scroll,500);
	            this._con.scroll(delay);
	        });
	    },
	    renderChat: function() {
	        if(this.bOne){
	            this.bOne = false;
	            this.countInit = parseInt(this._MsgCount.html());
	        }
	        var self = this;
	        var html = '';
	        var countChat = 0;
	        $.each(chatModel.attributes, function(index, el) {
	            html += self.compileHTML(self.chatItemTpl, el);
	            countChat ++;
	        });
	
	        this.commentList.html(html);
	        this._MsgCount.html(this.countInit+countChat);
	        if (this.bScroll) {
	            this._con.scrollTop(10000000);
	        }
	    },
	    beforeDestroy: function() {
	        //  进入销毁之前,将引用关系设置为null
	    },
	    destroyed: function() {
	        //  销毁之后
	    },
	    syncMsg: function() {
	        chatModel.set(chat.msgCon.normal);
	    },
	    renderHistory : function () {
	        var len = chat.msgCon.historyList.length;
	        if(this.bStopHistory)return;
	        if(len<20){
	            this.bStopHistory = true;
	        }
	        for (var i = 0; i < len; i++) {
	            var pop = chat.msgCon.historyList.pop();
	            var html = this.compileHTML(this.chatItemTpl,pop);
	            this.historyList.prepend(html);
	        }
	        this._con.scrollTop(500);
	    },
	    clickSendMsg: function() {
	        this.sendMsg();
	    },
	    //回车发送消息
	    clockSendMsg: function(e) {
	        if (e.keyCode == 13) {
	            if (!user.isLogined()) {
	                !/* require */(/* empty */function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(50)]; (function(loginBox) {
	                    if (loginBox.status() == 'hide') {
	                        loginBox.trigger('show');
	                    } else {
	                        loginBox.trigger('hide');
	                    }
	                }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}());
	                return false;
	            }
	            this.sendMsg();
	            return false;
	        }
	    },
	    //关闭滚屏
	    closeScroll: function(e) {
	        var $this = $(e.currentTarget);
	        if (this.bScroll === true) {
	            this.bScroll = false;
	            $this.html('开启滚屏');
	            $this.addClass('on');
	        } else {
	            this.bScroll = true;
	            $this.html('关闭滚屏');
	            $this.removeClass('on');
	            this._con.scrollTop(10000000);
	        }
	    },
	    //清理消息
	    clearScroll: function() {
	        chat.chatItems = [];
	        this.countInit = parseInt(this._MsgCount.html());
	        if(chat.msgCon.normal){
	            chat.msgCon.normal.length = 0;
	        }
	
	        chatModel.clear();
	        this.historyList.html('');
	        this.renderHistory = function(){};
	        // window.flashApi.clear();
	    },
	    sendMsg: function() {
	        var self = this;
	        if (!this.bSend) {
	            alertify.error('亲，不能发送太频繁了!');
	            return;
	        }
	        if(this.bOne){
	            this.bOne = false;
	            this.countInit = parseInt(this._MsgCount.html())
	        }
	        this.bSend = false;
	        setTimeout(function() {
	            self.bSend = true;
	        }, 30);
	        var txt = this._txt.val();
	        if (txt === '') {
	            alertify.error('亲~消息不能为空');
	            return;
	        }
	        var c = parseInt(this._MsgCount.html());
	        this._MsgCount.html(c+1);
	        this._txt.val('');
	        chat.sendMsg(txt);
	    }
	});
	
	module.exports = View;


/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 *author liminshen 2016/08/04
	 *腾讯云
	 *功能 1.初始化im 2.发送普通消息 3.发送红包消息 4.加入群组 5.退出群组 6.获取群组列表 7.获取漫游消息列表
	 */
	'use strict';
	var base = __webpack_require__(24);
	var IMModel = __webpack_require__(129);
	var imModel = IMModel.sharedInstanceIMModel();
	var store = base.storage;
	var webim = window.webim;
	var _ = __webpack_require__(43);
	var $ = __webpack_require__(1);
	
	var imServer = {
	    groupIdList: [],
	    setting: {
	        listeners: {
	            onMsgNotify: null,
	            onGroupInfoChangeNotify: null,
	            groupSystemNotifys: null
	        }
	    },
	    NextMsgSeq : -1,
	    canJoin : false,//是否允许加入群，当所有以前的群退出后变成true
	};
	
	imServer.init = function(listeners) {
	    var self = this;
	    var defer = $.Deferred();
	    var promise = imModel.fetchIMUserSig();
	    promise.then(function(imSig) {
	        var loginInfo = {
	            sdkAppID: imSig.imAppid, // 用户所属应用id
	            appIDAt3rd: imSig.imAppid, // 用户所属应用id
	            accountType: imSig.imAccountType, // 用户所属应用帐号类型
	            identifier: imSig.imIdentifier, // 当前用户ID
	            userSig: imSig.userSig // 当前用户身份凭证
	        };
	        self.im = loginInfo;
	        if (imSig && listeners) {
	            // 腾讯IM初始化
	            // webim.init(loginInfo, listeners, null);
	            webim.login(loginInfo, listeners, {isLogOn:false}, function(res) {
	                self.getJoinedGroupListHigh();
	                defer.resolve(res);
	            }, function(err) {
	                console.log(err);
	                defer.reject();
	            });
	        } else {
	            defer.reject();
	        }
	    }, function(err) {
	        console.log(err);
	        defer.reject();
	    });
	    return defer.promise();
	};
	/**
	 * 发送普通消息
	 *
	 */
	imServer.sendMessage = function(attrs) {
	    var defer = $.Deferred();
	    var currentSession = webim.MsgStore.sessByTypeId('GROUP', attrs.groupId);
	    var random = Math.floor(Math.random() * 10000);
	    var sendMsg;
	    var msg;
	    if (!currentSession) {
	        // var currentSession = new webim.Session('GROUP', attrs.groupId, attrs.groupId, '', random);
	        currentSession = new webim.Session('GROUP', attrs.groupId, attrs.groupId, '', random);
	    }
	    if (currentSession) {
	        sendMsg = new webim.Msg(currentSession, true);
	        msg = new webim.Msg.Elem('TIMCustomElem', {
	            data: JSON.stringify(attrs.msg)
	        });
	        sendMsg.elems.push(msg);
	        sendMsg.fromAccount = this.im.imIdentifier;
	        webim.sendMsg(sendMsg, function(resp) {
	            defer.resolve(resp);
	        }, function(err) {
	            defer.reject(err);
	        });
	    }
	    return defer.promise();
	};
	/**
	 * 红包消息
	 *  attrs.subType
	 *  attrs.msg.fromAccount
	 */
	imServer.sendMsg = function(attrs) {
	    var defer = $.Deferred();
	    var currentSession = webim.MsgStore.sessByTypeId('GROUP', attrs.groupId);
	    var random = Math.round(Math.random() * 4294967296); // 消息随机数，用于去重
	
	    if (!currentSession) {
	        currentSession = new webim.Session(
	            webim.SESSION_TYPE.GROUP, attrs.groupId, attrs.groupId, '', random);
	    }
	    var seq = -1; // 消息序列，-1表示sdk自动生成，用于去重
	    var msgTime = Math.round(new Date().getTime() / 1000); // 消息时间戳
	    var subType = attrs.subType || webim.GROUP_MSG_SUB_TYPE.REDPACKET;
	    var msg = new webim.Msg(
	        currentSession,
	        true, seq, random, msgTime, attrs.msg.fromAccount, subType, '');
	    var textObj = new webim.Msg.Elem('TIMCustomElem', {
	        data: JSON.stringify(attrs.msg)
	    });
	    msg.fromAccount = this.im.imIdentifier;
	    msg.elems.push(textObj);
	    webim.sendMsg(msg, function(resp) {
	        defer.resolve(resp);
	    }, function(err) {
	        defer.reject(err);
	    });
	    return defer.promise();
	};
	/*
	 *退出群组
	 */
	imServer.quitGroup = function(chatroomId, cb) {
	    var self = this;
	    webim.quitGroup({
	        'GroupId': chatroomId
	    }, function(res) {
	        cb && cb(res)
	    }, function(res) {
	        cb && cb(res)
	    });
	};
	/**
	 * 加入群组
	 * @param  {[type]}   chatroomId 房间号
	 * @param  {Function} cb         申请结果回到函数
	 * @return {[type]}              [description]
	 */
	imServer.applyJoinGroup = function(chatroomId, cb) {
	    var self = this;
	    this.chatroomId = chatroomId;
	    function callback(res) {
	        self.getGroupInfo(function (res) {
	            self.NextMsgSeq = res.GroupInfo[0].NextMsgSeq;
	        });
	        cb && cb(res);
	    }
	    webim.applyJoinGroup({
	        GroupId: chatroomId
	    }, callback, callback);
	};
	/**
	 * 获取群组列表
	 * @param  {Function}   cbOk
	 * @return [Function]   cbFail
	 */
	imServer.getGroupInfo = function(cbOk, cbFail) {
	    var opts = {
	        'GroupIdList': [
	            this.chatroomId
	        ],
	        'GroupBaseInfoFilter': [
	            'Type',
	            'Name',
	            'Introduction',
	            'Notification',
	            'FaceUrl',
	            'CreateTime',
	            'Owner_Account',
	            'LastInfoTime',
	            'LastMsgTime',
	            'NextMsgSeq',
	            'MemberNum',
	            'MaxMemberNum',
	            'ApplyJoinOption'
	        ],
	        'MemberInfoFilter': [
	            'Account',
	            'Role',
	            'JoinTime',
	            'LastSendMsgTime',
	            'ShutUpUntil'
	        ]
	    };
	    webim.getGroupInfo(opts, cbOk, cbFail);
	};
	/**
	 * 获取群组历史消息
	 * @param  {[type]} cbOk   [description]
	 * @param  {[type]} cbFail [description]
	 * @return {[type]}        [description]
	 */
	imServer.getSyncGroupMsgs = function(ReqMsgSeq,cbOk) {
	    var self = this;
	    var ReqMsgSeq = this.NextMsgSeq-1-ReqMsgSeq;
	    var opts = {
	        'GroupId': self.chatroomId,
	        'ReqMsgSeq': ReqMsgSeq,
	        'ReqMsgNumber': 20
	    };
	    if (opts.ReqMsgSeq === null || opts.ReqMsgSeq === undefined || opts.ReqMsgSeq <0) {
	        console.log('群消息序列号非法');
	        return;
	    }
	    webim.syncGroupMsgs(opts,function(res) {
	        res.NextMsgSeq = self.NextMsgSeq - 20;
	        self.NextMsgSeq = res.NextMsgSeq;
	        if(self.NextMsgSeq<=0){
	            self.NextMsgSeq = 0;
	        }
	        cbOk&&cbOk(res);
	    });
	};
	/**
	 *
	 * @param  {[type]}   inputMsg 输入的消息字符串
	 * @param  {Function} done     成功回调函数,包含结果，消息对象
	 * @param  {[type]}   fail     失败回调函数,包含错误信息
	 * @return {[type]}            [description]
	 */
	imServer.getJoinedGroupListHigh = function() {
	    var self = this;
	    var option = {
	        'Member_Account': self.im.identifier,
	        'Limit': 20,
	        'Offset': 0,
	    };
	    function callback(res) {
	        self.groupIdList = res.GroupIdList;
	        if(self.groupIdList.length==0){
	            self.canJoin = true;
	        }
	        for (var i = 0; i < self.groupIdList.length; i++) {
	            (function (index) {
	                self.quitGroup(self.groupIdList[index].GroupId,function () {
	                    if(index==self.groupIdList.length-1){
	                        self.canJoin = true;
	                    }
	                });
	            })(i)
	
	        }
	    }
	    webim.getJoinedGroupListHigh(option, callback, callback);
	};
	module.exports = imServer;


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @time {时间}
	 * @author {编写者}
	 * @info {实现的功能}
	 */
	
	'use strict';
	
	var $ = __webpack_require__(1);
	var base = __webpack_require__(24);
	var Config = __webpack_require__(38);
	var BaseModel = base.Model;
	var env = Config.env[Config.scheme];
	var storage = base.storage;
	var UserModel = __webpack_require__(44);
	var user = UserModel.sharedInstanceUserModel();
	
	var Model = BaseModel.extend({
	    url: '{{url_prefix}}/user/sig_get.json',
	    beforeEmit: function() {
	        // 如果需要开启对请求数据的本地缓存，可将下列两行注释去掉
	        // this.storageCache = true; //开启本地缓存
	        // this.expiration = 1; //设置缓存过期时间（1表示60*60*1000 一小时）
	        // 给请求地址替换一下环境变量
	        if (/^\{{0,2}(url_prefix)\}{0,2}/.test(this.url)) {
	            this.url = this.url.replace('{{url_prefix}}', env.url_prefix);
	        }
	        this.notTokenURL = this.url;
	        this.imData = null;
	    },
	    /**
	     * [isAnchor 判断是否为主播]
	     * @return {Boolean} [description]
	     */
	    isAnchor: function() {
	        return !!this.get('data').anchor;
	    },
	    setTokenUrl: function(token) {
	        this.imData = {
	            deviceinfo: '{"aid":"30001001"}',
	            access_token: 'web-' + token
	        };
	    },
	    setNoTokenUrl: function() {
	        this.imData = {
	            deviceinfo: '{"aid":"30001001"}'
	        };
	    },
	    /**
	     * [fetchIMUserSig 获取IM签名]
	     * @param  {Function} callback [description]
	     * @param  {[type]}   error    [description]
	     * @return {[type]}            [description]
	     */
	    fetchIMUserSig: function() {
	        //  先获取本地签名
	        var defer = $.Deferred();
	        var token;
	        var imSig;
	        imSig = storage.get('imSig');
	        if (imSig) {
	            this.set({
	                data: imSig
	            });
	            defer.resolve(imSig);
	            return defer.promise();
	        }
	        token = user.getToken();
	        if (token) {
	            this.setTokenUrl(token);
	        }
	        var sigModelPromise = this.executeJSONP(this.imData);
	        sigModelPromise.done(function(response) {
	            var data = response.data;
	            storage.set('imSig', data);
	            defer.resolve(data);
	        });
	        sigModelPromise.fail(function(e) {
	            defer.reject(e);
	        });
	        return defer.promise();
	    },
	    //  更新缓存
	    updateIMUserSig: function() {
	        var defer = $.Deferred();
	        var token;
	        storage.remove('imSig');
	        token = user.getToken();
	        if (token) {
	            this.setTokenUrl(token);
	        }
	        var sigModelPromise = this.executeJSONP();
	        sigModelPromise.done(function(response) {
	            var data = response.data;
	            storage.set('imSig', data);
	            defer.resolve(data);
	        });
	        sigModelPromise.fail(function(e) {
	            defer.reject(e);
	        });
	        return defer.promise();
	    },
	    remove: function() {
	        storage.remove('imSig');
	    }
	});
	
	var shared = null;
	Model.sharedInstanceIMModel = function() {
	    if (!shared) {
	        shared = new Model();
	    }
	    return shared;
	};
	module.exports = Model;


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	/*
	*   time 2016/08/10
	*   author liminshen
	*   传入对应的view来实现IM和view的通讯
	*   兼容了翻译者加入多群组的聊天室，发送多聊天室功能
	*   添加先退所有群后加当前房间的IM群功能,保持性能最优化
	*/
	/*
	*   time 2016/08/13
	*   author liminshen
	*   添加了消息缓存机制,增加了消息结构的拓展性，和为上传消息内容做一个准备
	*   优化事件触发机制，启用订阅发布模式  pushChatItem
	*   添加了限制消息长度的设置
	*/
	'use strict';
	var imServer = __webpack_require__(128);
	
	function jsonpCallback(rspData) {
	    //设置jsonp返回的
	    webim.setJsonpLastRspData(rspData);
	}
	//初始化信息
	//attr需要的属性，初始化成功的回调
	function init(attr,cb) {
	    var self = this;
	    this.view = attr.view||null;//传入聊天对应的view
	    this.userMsg = attr.userMsg;//用户的信息
	    this.msgCon = {};//消息的容器，缓存所有当前的消息
	    this.chatroomIds = attr.chatroomIds||[];//房间列表
	    this.videoId = attr.videoId;//当前房间的videoId
	    this.isLimitMsgLength = attr.isLimitMsgLength || true;//默认限制
	    this.limitMsgLength = attr.limitMsgLength || 1000;//默认限制条数
	    this.limitScale = attr.limitScale || 10;//默认删除消息的比例
	    this._cutLen = this.limitMsgLength/this.limitScale;//默认限制条数
	    this.bInit = false;
	    this.listeners = {
	        onMsgNotify: this.notifyMsg,
	        jsonpCallback: jsonpCallback, //IE9以下的jsonp回调函数
	        onGroupInfoChangeNotify: null,
	        groupSystemNotifys: this.groupSystemNotifys()
	    };
	    imServer.init(this.listeners).done(function(res) {
	        if (~~res.ErrorCode === 0) {
	            cb(true);
	            // self.bInit = true;
	            self.applyGround();
	        }
	    });
	    return this;
	}
	function notifyMsg (notifyInfo) {
	    var _this = chat;
	    // 监听漫游消息
	        var vId = _this.videoId;
	        if (notifyInfo.length === 0) return;
	        for (var i in notifyInfo) {
	            var val = notifyInfo[i];
	            if (val.msg) {
	                val = val.msg;
	            }
	            if (val.isSend === false) {
	                var syncMsgText = val.elems[0].content.data;
	                var MsgJson = $.parseJSON(syncMsgText);
	                if (MsgJson.videoId == vId) {
	                    //翻译
	                    if (MsgJson.msgType === 3) {
	                        pushChatItem('translator',MsgJson);
	                        window.flashApi.notifying(MsgJson);
	                    }
	                    //聊天
	                    if (MsgJson.msgType === 0) {
	                        //监听
	                        pushChatItem('normal',MsgJson);
	                    }
	                    //运营消息
	                    if (MsgJson.msgType === 4) {
	                        //监听
	                        // _this.view.trigger('events:syncMsgCm', MsgJson);
	                    }
	                    //提前翻译消息
	                    if (MsgJson.msgType === 5) {
	                        //监听
	                        if(MsgJson.c==0){//保证发重复消息只保留第一条
	                            pushChatItem('preTranslator',MsgJson);
	                        }
	                    }
	                } else if (MsgJson.videoId === -1) {
	                    if (MsgJson.msgType === 3) {
	                        window.flashApi.notifying(MsgJson);
	                    }
	                }
	            } else {
	                var syncMsgText = val.elems[0].content.data;
	                var MsgJson = $.parseJSON(syncMsgText);
	                if (MsgJson.videoId == vId) {
	                    //翻译
	                    if (MsgJson.msgType === 3) {
	                        window.flashApi.notifying(MsgJson);
	                    }
	                    //翻译
	                    if (MsgJson.msgType === 5) {
	                        if(MsgJson.c==0){//保证发重复消息只保留第一条
	                            pushChatItem('preSTranslator',MsgJson);
	                        }
	                        window.flashApi.notifying(MsgJson);
	                    }
	                }
	            }
	        }
	}
	function applyGround () {
	    var timer = null;
	    var self = this;
	    timer = setInterval(function() {
	        if (imServer.canJoin) {
	            for (var i = 0; i < self.chatroomIds.length; i++) {
	                imServer.applyJoinGroup(self.chatroomIds[i], function(res) {
	                    var timer2 = setInterval(function () {
	                        if(imServer.NextMsgSeq!=-1){
	                            getSyncGroupMsgs();
	
	                            clearInterval(timer2);
	                        }
	                    },1000);
	                });
	            }
	            clearInterval(timer);
	        }
	    },300);
	}
	var bHistoryOne = true;
	var countHistory = 0;
	function getSyncGroupMsgs() {
	    imServer.getSyncGroupMsgs(0,function (msgs) {
	        if(!chat.msgCon['historyList']){
	            chat.msgCon['historyList'] = [];
	        }
	        if(countHistory>=200)return;
	        countHistory+=msgs.length;
	        $.each(msgs,function (index,msg) {
	            var HistoryTxt = msg.elems[0].content.data;
	            var MsgJson = $.parseJSON(HistoryTxt);
	            chat.msgCon['historyList'].splice(index,0,MsgJson);
	        });
	        if(bHistoryOne){
	            chat.view.trigger('events:initHistory');
	            bHistoryOne = false;
	        }else{
	            chat.view.trigger('events:loadHistory');
	        }
	    });
	}
	function groupSystemNotifys () {
	    function callback(notifyInfo) {
	        console.log(notifyInfo);
	    }
	    return {
	        "1": callback, //申请加群请求（只有管理员会收到）
	        "2": callback, //申请加群被同意（只有申请人能够收到）
	        "3": callback, //申请加群被拒绝（只有申请人能够收到）
	        "4": callback, //被管理员踢出群(只有被踢者接收到)
	        "5": callback, //群被解散(全员接收)
	        "6": callback, //创建群(创建者接收)
	        "7": callback, //邀请加群(被邀请者接收)
	        "8": callback, //主动退群(主动退出者接收)
	        "9": callback, //设置管理员(被设置者接收)
	        "10": callback, //取消管理员(被取消者接收)
	        "11": callback, //群已被回收(全员接收)
	        "255": callback //用户自定义通知(默认全员接收,暂不支持)
	    };
	}
	//发送普通消息
	function sendMsg(txt) {
	    var msg = {
	        videoId : this.videoId,
	        smallAvatar : this.userMsg.get('headImg'),
	        nickName : this.userMsg.get('userName'),
	        msgType : 0,
	        content : txt,
	        time : new Date().getTime()
	    };
	    pushChatItem('normal',msg);
	    for (var i = 0; i < this.chatroomIds.length; i++) {
	        imServer.sendMessage({
	            groupId : this.chatroomIds[i],
	            msg : msg
	        }).done(function (res) {
	            console.log(res,'发送成功');
	        })
	    }
	}
	//发送翻译消息
	function sendTMsg(txt) {
	    var msg = {
	        videoId : this.videoId,
	        msgType : 3,
	        content : txt,
	        time : new Date().getTime()
	    };
	    pushChatItem('translator',msg);
	    for (var i = 0; i < this.chatroomIds.length; i++) {
	        msg.c = i;
	        imServer.sendMsg({
	            groupId : this.chatroomIds[i],
	            msg : msg
	        }).done(function (res) {
	            console.log(res);
	        })
	    }
	}
	//发送提前消息
	function sendPTMsg(txt) {
	    var msg = {
	        videoId : this.videoId,
	        msgType : 5,
	        content : txt,
	        time : new Date().getTime()
	    };
	    // pushChatItem('preTranslator',msg);
	    for (var i = 0; i < this.chatroomIds.length; i++) {
	        msg.c = i;
	        imServer.sendMsg({
	            groupId : this.chatroomIds[i],
	            msg : msg
	        }).done(function (res) {
	            console.log(res);
	        })
	    }
	}
	//保存消息到消息容器，并且发布对应的监听消息的事件
	//type : 消息的类型
	//msg : 未包装的消息体
	function pushChatItem(type,msg) {
	    if(chat.msgCon[type]==undefined){
	        chat.msgCon[type] = [];
	    }
	    var chatItems = chat.msgCon[type];
	    if(chat.isLimitMsgLength){
	        if(chatItems.length>chat.limitMsgLength){
	            for (var i = 0; i < chat._cutLen; i++) {
	                chatItems.shift();
	            }
	        }
	    }
	    chatItems.push(msg);
	    chat.view.trigger('events:'+type);
	}
	var chat = {
	    init : init,//初始化属性
	    applyGround : applyGround,//加入组
	    notifyMsg : notifyMsg,//监听漫游消息
	    groupSystemNotifys : groupSystemNotifys,//监听系统消息
	    sendMsg : sendMsg, //发送普通消息
	    sendTMsg : sendTMsg, //发送红包消息
	    sendPTMsg : sendPTMsg, //发送红包消息
	    getSyncGroupMsgs : getSyncGroupMsgs, //获取漫游消息
	};
	module.exports = chat;


/***/ },
/* 131 */
/***/ function(module, exports) {

	module.exports = "<li class=\"commentMsg clearfix\"  data-time=\"{{time}}\">\r\n\t<img src=\"{{smallAvatar}}\" alt=\"\" class=\"com_avator\">\r\n\t<div class=\"con\">\r\n\t\t<h4 class=\"name\">{{nickName}}</h4>\r\n\t\t<p>{{content}}</p>\r\n\t</div>\r\n</li>\r\n"

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var base = __webpack_require__(24);
	var BaseView = base.View;
	var Model = Backbone.Model.extend({});
	var user = __webpack_require__(59);
	var alertify = __webpack_require__(90);
	var UserPayModel = __webpack_require__(133);
	var SuggestModel = __webpack_require__(134);
	var FListModel = __webpack_require__(135);
	var PayFModel = __webpack_require__(136);
	var dealModel = __webpack_require__(117).dealParamsJsonP;
	var loginBox = __webpack_require__(50);
	var View = BaseView.extend({
	    el: '.payDialog',
	    events: {
	        'click .ment span': 'choosePayWay',
	        'click .buy': 'gotoPay',
	        'click .closeWin': 'closePay',
	        'click .dealPay .btn': 'dealPay',
	        'click .payBtn': 'showPayWayWin',
	        'click .payMent .close': 'hidePayWayWin',
	        'click .cdkey_list_btn': 'showCdWin',
	        'click .cdkey_box .close': 'hideCdWin',
	        'click .packageChoose li ': 'chooseGood',
	        'click .nav_cdkey .singleBtn': 'showSingle',
	        'click .nav_cdkey .packageBtn': 'showPackage',
	        'click .canUse': 'chooseCdkey',
	        'click .cdkey_btn': 'testCdKey'
	    },
	    rawLoader: function() {
	        return '';
	    },
	    context: function(args) {
	        console.log(args);
	    },
	    beforeMount: function() {
	        //  初始化一些自定义属性
	    },
	    afterMount: function() {
	        //  获取findDOMNode DOM Node
	        this.downloadTipsTpl = __webpack_require__(137);
	        this.fCdKeyItemTpl = __webpack_require__(138);
	        this.payinfoTpl = __webpack_require__(139);
	        this.erwm_bs64 = __webpack_require__(140);
	    },
	    ready: function() {
	        //  初始化
	        this.userPayModel = new UserPayModel();
	        this.suggestModel = new SuggestModel();
	        this.payFModel = new PayFModel();
	        this.fListModel = new FListModel();
	        this.PayWay = 'weixin';
	        this.videoName = '';
	        this.listenTo(this.suggestModel, 'change', this.render);
	    },
	    beforeDestroy: function() {
	        //  进入销毁之前,将引用关系设置为null
	    },
	    destroyed: function() {
	        //  销毁之后
	    },
	    //渲染支付信息，初始化属性
	    render: function() {
	        this.videoId = this.suggestModel.get('data').videoId;
	        var html = this.compileHTML(this.payinfoTpl, this.suggestModel.get('data'));
	        this.$el.html(html);
	        this.$el.show();
	        this.$payInfo = this.$el.find('.pay_info');
	        this.$buyBtn = this.$el.find('.buy');
	        this.dealPayId = -1;
	        this.bScroll_single = false;
	        this.bScroll_package = false;
	        this.tabCdkeyList = 0;
	    },
	    //选择支付方式
	    choosePayWay: function(e) {
	        var $this = $(e.currentTarget);
	        this.PayWay = $.trim($this.attr('class'));
	        $this.addClass('selected').siblings('span').removeClass('selected');
	    },
	    //跳转到支付窗口，打开判断支付结果弹窗
	    gotoPay: function(e) {
	        var $this = $(e.currentTarget);
	        var self = this;
	        setTimeout(function() {
	            $('.payMent').hide();
	            $('.pay_confirm').show();
	        }, 1000);
	        this.dealPayId = $this.attr('data-goodsid');
	        if (this.PayWay == 'weixin') {
	            window.open('http://pay.yinyuetai.com/virtual/do-buy?goodsId=' + $this.attr('data-goodsid') + '&count=1&WIDdefaultbank=tenPay');
	        } else if (this.PayWay == 'alipay') {
	            window.open('http://pay.yinyuetai.com/virtual/do-buy?goodsId=' + $this.attr('data-goodsid') + '&count=1');
	        }
	    },
	    //关闭整个窗口
	    closePay: function() {
	        this.$el.hide();
	        // window.location.reload();
	        window.location.href = './';
	    },
	    //校验支付结果
	    dealPay: function(e) {
	        var self = this;
	        var promise = dealModel(this.userPayModel,{videoId: this.videoId},true);
	        promise.done(function(data) {
	            if (data.msg == 'SUCCESS') {
	                // data.data.success = true;
	                if (data.data.success == true) {
	                    var html = self.compileHTML(self.downloadTipsTpl,{name:self.videoName,erwm:self.erwm_bs64});
	                    self.$el.html(html).show();
	                    self.$el.on('click', '.closeErm', function() {
	                        window.location.href = './';
	                    });
	                } else {
	                    alertify.error('支付失败，请重新支付');
	                    setTimeout(function() {
	                        window.location.reload();
	                        self.$el.hide();
	                    }, 2000);
	                    return false;
	                }
	            } else {
	                alertify.error('支付失败，请重新支付');
	                setTimeout(function() {
	                    window.location.reload();
	                    self.$el.hide();
	                }, 2000);
	            }
	        });
	    },
	    //显示支付方式窗口
	    showPayWayWin: function() {
	        $('.pay_info').hide();
	        $('.payMent').show();
	    },
	    //隐藏支付方式窗口
	    hidePayWayWin: function() {
	        $('.pay_info').show();
	        $('.payMent').hide();
	    },
	    //显示我的单集兑换码列表
	    showSingle: function(e) {
	        var $this = $(e.currentTarget);
	        $this.addClass('on').siblings().removeClass('on');
	        $('.package_list').hide();
	        $('.single_list').show();
	    },
	    //显示我的打包兑换码列表
	    showPackage: function(e) {
	        var $this = $(e.currentTarget);
	        $this.addClass('on').siblings().removeClass('on');
	        $('.package_list').show();
	        $('.single_list').hide();
	    },
	    //选择兑换码
	    chooseCdkey: function(e) {
	        var $this = $(e.currentTarget);
	        if ($this.hasClass('disabled')) return;
	        var _input = $this.siblings('.cdkey_c');
	        $('.cdkey_txt').val(_input.val());
	        $('.cdkey_box').hide();
	        $('.pay_info').show();
	    },
	    //显示我的兑换码列表并且拉取收条信息
	    showCdWin: function() {
	        this.fetchCdKey(this.videoId, 'VIDEO', 0, 20, function(res) {
	            if (res.msg == "SUCCESS") {
	                if (res.data.length > 0) {
	                    $('.single_list').html(juicer(CdKeyLi, res));
	                } else {
	                    $('.noMore_cdkey').show();
	                }
	            }
	        });
	        this.fetchCdKey(this.videoId, 'FOLDER', 0, 20, function(res) {
	            if (res.msg == "SUCCESS") {
	                if (res.data.length > 0) {
	                    $('.package_list').html(juicer(CdKeyLi, res));
	                } else {
	                    $('.noMore_cdkey').show();
	                }
	            }
	        });
	        $('.pay_info').hide();
	        $('.cdkey_box').show();
	    },
	    //隐藏我的兑换码列表
	    hideCdWin: function() {
	        $('.pay_info').show();
	        $('.cdkey_box').hide();
	    },
	    //选择支付商品
	    chooseGood: function(e) {
	        var $this = $(e.currentTarget);
	        $this.addClass('on').siblings().removeClass('on');
	        this.$buyBtn.attr('data-goodsid', $this.attr('data-goodsid'));
	    },
	    //校验电子券
	    testCdKey: function() {
	        var code = $('.cdkey_txt').val();
	        if (code === '') {
	            alertify.error('兑换码不能为空！');
	            return;
	        }
	        var self = this;
	        var promise = dealModel(this.payFModel,{code: code,videoId: this.videoId},true);
	        promise.done( function(data) {
	            if (data.msg == 'SUCCESS') {
	                // data.data.success = true;
	                if (data.data.success == true) {
	                    var html = self.compileHTML(self.downloadTipsTpl,{name:self.videoName,erwm:self.erwm_bs64});
	                    self.$el.html(html).show();
	                    self.$el.on('click', '.closeErm', function() {
	                        window.location.href = './';
	                    });
	                    // setTimeout(function() {
	                    //     window.location.reload();
	                    // }, 3000);
	                } else {
	                    alertify.error(data.data.message);
	                    return false;
	                }
	            } else {
	                alertify.error(data.msg);
	            }
	        });
	    },
	    judgeRight: function(rq_db) {
	        var self = this;
	        var videoId = rq_db.videoId;
	        var videoName = rq_db.videoName;
	        this.videoName = videoName;
	        var promise = dealModel(this.userPayModel, {
	            videoId: rq_db.videoId
	        }, true);
	        promise.done(function(data) {
	            var success = data.data.success;
	            // success = true;
	            if (!success) {
	                self.fetchModel(videoId);
	                self.userPayModel.clear();
	            } else {
	                // alertify.success('您已购买过此视频请去APP进行观看！') //后期可能需要做一个引导页
	                var html = self.compileHTML(self.downloadTipsTpl, {
	                    name: videoName,
	                    erwm: self.erwm_bs64
	                });
	                self.$el.html(html).show();
	                self.$el.on('click', '.closeErm', function() {
	                    window.location.href = './';
	                });
	            }
	        });
	    },
	    fetchModel: function(videoId) {
	        var promise = dealModel(this.suggestModel, {
	            videoId: videoId,
	            source: 'PC'
	        }, true);
	        promise.done(function(result) {
	            if (result.data.goodsId == '0') {
	                alertify.error('支付失败，请重新支付');
	                return;
	            }
	        });
	    },
	    fetchCdKey : function (id, t, o, s, okCb, faillCb) {
	        var promise = dealModel(this.fListModel,{
	            videoId: id,
	            type: t,
	            offset: o,
	            size: s
	        },true);
	        promise.done(function(res) {
	            okCb(res);
	        });
	        promise.fail(function() {
	            faillCb && faillCb();
	        });
	        // Server.f_list({
	        //     videoId: id,
	        //     type: t,
	        //     offset: o,
	        //     size: s
	        // }, function(res) {
	        //     okCb(res);
	        // }, function() {
	        //     faillCb && faillCb();
	        // });
	    },
	});
	// new View();
	
	module.exports = View;


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @time {时间}
	 * @author {编写者}
	 * @info {实现的功能}
	 */
	
	'use strict';
	
	var $ = __webpack_require__(1);
	var base = __webpack_require__(24);
	var Config = __webpack_require__(38);
	var BaseModel = base.Model;
	var env = Config.env[Config.scheme];
	var storage = base.storage;
	var UserModel = __webpack_require__(44);
	var user = UserModel.sharedInstanceUserModel();
	
	var Model = BaseModel.extend({
	    url: '{{url_prefix}}/video/user_pay.json',
	    beforeEmit: function() {
	        // 如果需要开启对请求数据的本地缓存，可将下列两行注释去掉
	        // this.storageCache = true; //开启本地缓存
	        // this.expiration = 1; //设置缓存过期时间（1表示60*60*1000 一小时）
	        // 给请求地址替换一下环境变量
	        if (/^\{{0,2}(url_prefix)\}{0,2}/.test(this.url)) {
	            this.url = this.url.replace('{{url_prefix}}', env.url_prefix);
	        }
	    },
	});
	
	var shared = null;
	Model.sharedInstanceIMModel = function() {
	    if (!shared) {
	        shared = new Model();
	    }
	    return shared;
	};
	module.exports = Model;


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @time {时间}
	 * @author {编写者}
	 * @info {实现的功能}
	 */
	
	'use strict';
	
	var $ = __webpack_require__(1);
	var base = __webpack_require__(24);
	var Config = __webpack_require__(38);
	var BaseModel = base.Model;
	var env = Config.env[Config.scheme];
	var storage = base.storage;
	var UserModel = __webpack_require__(44);
	var user = UserModel.sharedInstanceUserModel();
	
	var Model = BaseModel.extend({
	    url: '{{url_prefix}}/video/pay_suggest.json',
	    beforeEmit: function() {
	        // 如果需要开启对请求数据的本地缓存，可将下列两行注释去掉
	        // this.storageCache = true; //开启本地缓存
	        // this.expiration = 1; //设置缓存过期时间（1表示60*60*1000 一小时）
	        // 给请求地址替换一下环境变量
	        if (/^\{{0,2}(url_prefix)\}{0,2}/.test(this.url)) {
	            this.url = this.url.replace('{{url_prefix}}', env.url_prefix);
	        }
	    },
	    formatter:function(response){
	        console.log(response);
	        if(response.data.expensivePayPack==null){
	            response.data.expensivePayPack = {};
	            response.data.expensivePayPack.packageImage = 'http://img4.yytcdn.com/user/photo/160822/2841251/-M-4723db6600a93d95386b00886dbba2f6_800x0.png';
	          //formatter方法可以格式化数据
	        }
	        return response;
	    }
	
	});
	
	var shared = null;
	Model.sharedInstanceIMModel = function() {
	    if (!shared) {
	        shared = new Model();
	    }
	    return shared;
	};
	module.exports = Model;


/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @time {时间}
	 * @author {编写者}
	 * @info {实现的功能}
	 */
	
	'use strict';
	
	var $ = __webpack_require__(1);
	var base = __webpack_require__(24);
	var Config = __webpack_require__(38);
	var BaseModel = base.Model;
	var env = Config.env[Config.scheme];
	var storage = base.storage;
	var UserModel = __webpack_require__(44);
	var user = UserModel.sharedInstanceUserModel();
	
	var Model = BaseModel.extend({
	    url: '{{url_prefix}}/exchange/f_list.json',
	    beforeEmit: function() {
	        // 如果需要开启对请求数据的本地缓存，可将下列两行注释去掉
	        // this.storageCache = true; //开启本地缓存
	        // this.expiration = 1; //设置缓存过期时间（1表示60*60*1000 一小时）
	        // 给请求地址替换一下环境变量
	        if (/^\{{0,2}(url_prefix)\}{0,2}/.test(this.url)) {
	            this.url = this.url.replace('{{url_prefix}}', env.url_prefix);
	        }
	    },
	});
	
	var shared = null;
	Model.sharedInstanceIMModel = function() {
	    if (!shared) {
	        shared = new Model();
	    }
	    return shared;
	};
	module.exports = Model;


/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @time {时间}
	 * @author {编写者}
	 * @info {实现的功能}
	 */
	
	'use strict';
	
	var $ = __webpack_require__(1);
	var base = __webpack_require__(24);
	var Config = __webpack_require__(38);
	var BaseModel = base.Model;
	var env = Config.env[Config.scheme];
	var storage = base.storage;
	var UserModel = __webpack_require__(44);
	var user = UserModel.sharedInstanceUserModel();
	
	var Model = BaseModel.extend({
	    url: '{{url_prefix}}/exchange/pay_f.json',
	    beforeEmit: function() {
	        // 如果需要开启对请求数据的本地缓存，可将下列两行注释去掉
	        // this.storageCache = true; //开启本地缓存
	        // this.expiration = 1; //设置缓存过期时间（1表示60*60*1000 一小时）
	        // 给请求地址替换一下环境变量
	        if (/^\{{0,2}(url_prefix)\}{0,2}/.test(this.url)) {
	            this.url = this.url.replace('{{url_prefix}}', env.url_prefix);
	        }
	    },
	});
	
	var shared = null;
	Model.sharedInstanceIMModel = function() {
	    if (!shared) {
	        shared = new Model();
	    }
	    return shared;
	};
	module.exports = Model;


/***/ },
/* 137 */
/***/ function(module, exports) {

	module.exports = "<div class=\"payDowload\">\r\n    <i class=\"close closeErm\"></i>\r\n    <h4>恭喜您已获得{{name}}的观看资格</h4>\r\n    <p>为保护艺人权益，本次直播仅限APP观看\r\n        <br/>请扫二维码安装APP体验流畅高清的直播吧</p>\r\n    <img src=\"{{erwm}}\" alt=\"\">\r\n</div>\r\n"

/***/ },
/* 138 */
/***/ function(module, exports) {

	module.exports = "{{each data as item}}\r\n<li class=\"cdkey\">\r\n    {{if item.fList[0].used==true}}\r\n    <input type=\"text\" value=\"{{item.fList[0].fCode}}\" readonly=\"readonly\" class=\"cdkey_c\"><span class=\"canUse disabled\">已使用</span> {{else}}\r\n    <input type=\"text\" value=\"{{item.fList[0].fCode}}\" readonly=\"readonly\" class=\"cdkey_c\"><span class=\"canUse\">使用</span> {{/if}}\r\n</li>\r\n{{/each}}\r\n"

/***/ },
/* 139 */
/***/ function(module, exports) {

	module.exports = "<div class=\"pay pay_info\"><i class=\"close closeWin\"></i>\r\n    <div class=\"payImg\"><img src=\"{{expensivePayPack.packageImage}}\"></div>\r\n    <div class=\"pay_btnBox\">\r\n        <p>你未获得此视频的观看资格</p>\r\n        <p>请购买相应资格</p>\r\n        <div class=\"payBtn\">立即购买</div>\r\n    </div>\r\n    <div class=\"cdKey_box\">\r\n        <p class=\"title\">已有兑换码的用户请在下方输入兑换码：</p>\r\n        <input placeholder=\"请输入兑换码\" type=\"text\" class=\"cdkey_txt\" max-length=\"30\">\r\n        <div class=\"cdkey_list_btn\" data-videoId=\"{{videoId}}\">我的兑换码</div>\r\n        <div class=\"cdkey_btn\">使用</div>\r\n    </div>\r\n</div>\r\n<div class=\"payMent\">\r\n    <div class=\"close\"></div>\r\n    <div class=\"pay_title\">请选择购买内容</div>\r\n    <ul class=\"packageChoose\">\r\n        {{if type== 'PACKAGE_WITHOUT_VIDEO'}}\r\n        <li class=\"packLi on\" data-goodsid=\"{{expensivePayPack.packageGoodsId}}\">{{expensivePayPack.packageName}}<span class=\"price\">￥<i>{{expensivePayPack.packagePrice}}</i></span></li>\r\n        {{else if type=='VIDEO_SINGLE'}}\r\n        <li class=\"packLi on\" data-goodsid=\"{{videoGoodsId}}\">{{videoName}}<span class=\"price\">￥<i>{{videoPrice}}</i></span></li>\r\n        {{else if type=='PACKAGE_WITH_VIDEO'}}\r\n        <li class=\"packLi on\" data-goodsid=\"{{videoGoodsId}}\">{{videoName}}<span class=\"price\">￥<i>{{videoPrice}}</i></span></li>\r\n        <li class=\"packLi\" data-goodsid=\"{{expensivePayPack.packageGoodsId}}\">{{expensivePayPack.packageName}}<span class=\"price\">￥<i>{{expensivePayPack.packagePrice}}</i></span></li>\r\n        {{/if}}\r\n    </ul>\r\n    <p>付款方式：</p>\r\n    <p class=\"ment\"><span class=\"weixin selected\"><i></i></span><span class=\"alipay\"><i></i></span></p>\r\n    <p class=\"goBuy\">\r\n        {{if videoGoodsId != 0}}\r\n        <div data-goodsid=\"{{videoGoodsId}}\" class=\"buy\">立即购买</div>\r\n        {{else}}\r\n        <div data-goodsid=\"{{expensivePayPack.packageGoodsId}}\" class=\"buy\">立即购买</div>\r\n        {{/if}}\r\n    </p>\r\n</div>\r\n<div class=\"cdkey_box\" data-videoId=\"{{videoId}}\">\r\n    <div class=\"close\"></div>\r\n    <div class=\"title\">我的兑换码</div>\r\n    <ul class=\"nav_cdkey clearfix\">\r\n        <li class=\"singleBtn on\">单集</li>\r\n        <li class=\"packageBtn\">礼包</li>\r\n    </ul>\r\n    <div class=\"cdkey_con\">\r\n        <ul class=\"single_list on\">\r\n        </ul>\r\n        <ul class=\"package_list\"></ul>\r\n    </div>\r\n    <div class=\"noMore_cdkey\">您还没有对应的兑换码</div>\r\n</div>\r\n<div class=\"pay_confirm\">\r\n    <i class=\"close closeWin\"></i>\r\n    <p>请您在新打开的页面中完成支付，支付完成后，根据结果选择相应的操作。</p>\r\n    <div class=\"dealPay\">\r\n        <div class=\"btn\">重新支付</div>\r\n        <div class=\"current btn\">支付成功</div>\r\n    </div>\r\n</div>\r\n"

/***/ },
/* 140 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOcAAADnAQMAAADfOtNjAAAABlBMVEX///8AAABVwtN+AAABPElEQVRYhe2XMZaDMAxExaOg5AgchaPB0ThKjkCZwo+JRrY3yVt3u83wPEVs/NUIKWNh1tXV9R+aQT1tAYZk82ON54cy5WZ8+s/GIFv3eqhLV1xjzhc4nXrQHSgXi+VGdC8V1KcWPblgz7G7NTpWimbf4HEpZMNVpGjVcthl02ltKdEZh9EwvIJIQZG0adZEC4ygwy0epzalb8SxL/DWHNL00ZOaNOfr3h63VQwWwpSb0pMDIl8zcQqOexOp+wZwbPZhH5L0nS8rGOPsuydF6XZxs4YTMu3xa6IQpLx4vYwHTZ31vGJO16U1CGVGMlOndUYC79/IHunbN+QoNyMpar6/p1wx+vM9aHTCMtXegLpKIb+dUJcuHGed+m01Nt6GFDUrz/lfhlbHStHqGz6Sp/zl0XIVIdrV1fU3vQAQv6g5IR3bhQAAAABJRU5ErkJggg=="

/***/ },
/* 141 */
/***/ function(module, exports) {

	module.exports = "<div class=\"videoMsg\">\r\n\t<div class=\"videoMsg_con clearfix\">\r\n\t\t<div class=\"channel_avator\">\r\n\t\t\t<img src=\"{{channel.profileImg}}\" alt=\"\">\r\n\t\t</div>\r\n\t\t<div class=\"channel_detail\">\r\n\t\t\t<div class=\"video_name clearfix\">\r\n\t\t\t\t<h3>{{videoName}}</h3>\r\n\t\t\t\t{{if videoType===\"LIVE\"}}\r\n\t\t\t\t<img src=\"{{liveLog}}\" alt=\"\" class=\"liveLog\">\r\n\t\t\t\t{{/if}}\r\n\t\t\t</div>\r\n\t\t\t<div class=\"channel_name\">{{channel.channelName}}</div>\r\n\t\t</div>\r\n\t</div>\r\n\t{{ if channel.subscribed==true }}\r\n\t\t<div class=\"meet disabled\">已订阅</div>\r\n\t{{else}}\r\n\t\t<div class=\"meet meetable\">订阅频道</div>\r\n\t{{/if}}\r\n\t<div class=\"supportBox\">\r\n\t\t<span class=\"usersCount\">{{visitCount}}</span>\r\n\t\t<span class=\"lovesCount\">{{likeCount}}</span>\r\n\t</div>\r\n\t<div class=\"loveBtn\">\r\n\t\t<div class=\"power\"></div>\r\n\t\t<div class=\"shadow\"></div>\r\n\t</div>\r\n</div>\r\n"

/***/ },
/* 142 */
/***/ function(module, exports) {

	module.exports = "<div class=\"payDowload\">\r\n    <i class=\"close closeErm\"></i>\r\n    <h4>恭喜您已获得{{name}}的观看资格</h4>\r\n    <p>为保护艺人权益，本次直播仅限APP观看\r\n        <br/>请扫二维码安装APP体验流畅高清的直播吧</p>\r\n    <img src=\"{{erwm}}\" alt=\"\">\r\n</div>\r\n"

/***/ },
/* 143 */
/***/ function(module, exports) {

	module.exports = "<div class=\"tipsWin\">\r\n    <div class=\"close\"></div>\r\n    <p>看成员的单人机位<br> 锁定你的最爱！<br> 快去StarTV APP<br> showcase视频成员视角中<br> 为他赠送道具,<br>达标即可解锁成员单人机位!</p>\r\n</div>\r\n"

/***/ },
/* 144 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAXCAYAAACmnHcKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjAyQjUzQzBCMEMzODExRTZBRDkwOTkzMTU3QUZBQUIyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjAyQjUzQzBDMEMzODExRTZBRDkwOTkzMTU3QUZBQUIyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDJCNTNDMDkwQzM4MTFFNkFEOTA5OTMxNTdBRkFBQjIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDJCNTNDMEEwQzM4MTFFNkFEOTA5OTMxNTdBRkFBQjIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7nOTLLAAAH9ElEQVR42sxXTWxcVxU+9743b8YzY49/YsdJ3MZxpFLhtGpok4aiBFFo6CKplFJWCBlYURawYANiUSGBugEWFRIsEFKrdIGQCHUihGkbKU2BRqA0FLtNQmInJontsT1/nt/37ruH77479jhhBrGIpb7R8/Pcuee87zv/VzDZ6yLuEj1PPp2moxQTOZpgZ2APZZLBdr9HHq90+592SWeS7AgjU6MYbdXVRQEJPKsiZEWymFrz/uqV9OliNbYUrs5RP70q/kQBe3Sceuh39KmmnLtZCZPCp4dU7DDHMjszcm/tuyqd+KaU7mBGe8R4AzfZJwVvGRkGTKM9iduQ0t30DTWslt1y7ZdS7PypKh4tquA8zKnuktuAdCESPC4edIc4PTa6y9sZe1VK5/MW/NYB//8vQQLMtA7f9u8EE+XZG7fnVRb4T/OT93pmkFKk3B4eGBnqo2H3dZLOZ5nbkAhCogYsIqG5C6Fm3mAupYnqgTWlEXOkdaPGncA+V9p95rvZt75u9hh9YiM8rE7zmyPuihuzVcDA8WF6Pe4PnSjdquddlcJvlc2e8SiMHRP1wXFyR5wfy1Tq+9SOSF2RePwBks/uI17Ik37jH0g0nygMSezbSfKZT1pwIMrZIsh6JDIp0qcvEf9rxRog7ZHz5ceJerH+5kykVj79sCVnSJg9dZ/05AfEt4stI9zlJEG6UnlZ3Qp/kFieISc4A2HfeqZAz4pE8gmSfZW9MpF+Eb5s72kfifnQDpLHHiNeKRK/+SFxvoZ1kNzdT/KFAxtb9dnpaK8YGSCu14k/PBdZVxzaTfJrh+0ekBSPjpD80oF7vA8yf75GdCN3j3c2kopkoutF2Vf6dVB54vpaUYlemmTQfo2o/4gIB3LkJOMnwLr3f6ZI2CRqQoObYYGQ0O9eJ750077r+iLpn7xFfHnBWn7/mN0I68tHHrB75paIr2Zbeks1Ut/7LalvnST1nd8Qz64iYJwOFSLyTq/Ba3Ab/IYHyJykHk8J4RgbiANRmKzHert7M9P1NRMaCyXi5TW7nl0jns+R/uO0jYrRARLjw0TdCLuDo1b03FWi1bKVjXJOEV+5Qzw9Dy/eJio3mqWsDYYmRuA9aHAb/IaHy+IjURFPuq70XA51X5TI3ME1SH5e9wz2MPaa2wLiDWBscsYUgJkFECySGMxEIcfZMomx7cQNhNFfrpFW8JRuvgu55f78q6ZcES8VKXxpErJIbLeDd0x+hbpXSC9eERWVFh9pdy25m4J0Q3gc8wDUEciLTmTY/KZa+cSBivIICOxzXS7yLEDdhnfOXSHnhYNE+0dI9MUicHwFJP9+0xZCFI+Wp3VL1uhDLnbMXwgbvJKF56cboeHhJumLwFcWLEOXlMh3FDYYTZ40yTDjhYhzysF6cdQRH15TTWB4ctW3aXJhFmQOkDy0l3h8l8X87mXINizo0BqAC2XyJ35FtFK2rRJei7ziq854NBegwE1pIVzw2DQB4HuoZ1iL5zsKm7BqkhXxZvyPbrNW+jcSNuk1Q6aLaFuSeLVG+p0r8FCexK5+Ej2pyIN6asbqMWG7HmYALj6xAw2vGunhuRXiOx1Kc6uqTUe4m3nsVmmKAvkUp4UUaJIYBDiP9b62wgZAs8KIoV7yfvaVdZYUnv2AnCMP2+r1yG5yJp6i4Ed/sOD/dp0ckIlUzMyTvrZsQTYQSp4Fa/qR94uJVnq+fIbUK2+T6E12ogKv0AUB3GUZcgw83O7qTSqXP8e6Nwwx193CAPZ7tNKvtxWPId6vZSmcmo68IUzQm3mt2gDABRJBDOLCeupm3vYIWFydfA8NtMuSeeMiQqpOwngxyp8lq88QknJjguDZleh9HYsRi1P4eyuQOowX4zpdnTcTwFHSw087jUyuW5K7HbIwL78EJfvbVhCTNzX/v9dNfCvVqtzxmB13omaL9WpTxowp62NMpA/eqQVtRmfP5mI7MkK8j/uH+OWyZLVUKMXLcvGsApnXqNCflbG+pYTrxtCuBRoC70OCfxuKHmsNTR+HKzLAJYTWK/gHIwYvKqVW6/nBeiY3qKPZrEDPiUTfIZcH11IxFkNa0jDW9yA5j4HUF6Cj92MwNBdA4i2E4hmYdw79aTEQnBXL3ZVG/j2VwTjTGjS9Y7K+bTzmJOvd0sE5ACmOnOgHoQdRGMZhlYdAqsfMwxsTxdbYfrNeTLBUQnZehUdmkOvziLocxsysDlU2rCbWEiszgeOfMY2udZ6ZjY4AJ5zR4WFPJ0QaBzJUNDmAA1mvGfbx9JpEnCjcI5dvDRtunl0iMrgB0sdyDc8ClldD7edlncs3Fhd9V50Kx5pHgI0+s4wFoYo6l034PYM7StStTVZWyShgTkenWTJnZeE0i6k5Ydxn/0Q0bEGzh0JDJsByDVFSRvib4a+sK4laYXlBFYCXgXvs3sOZqTuYoviifyo8unyEK9X9WveX/YTLUOLFMeDFTM1ClkkXJdQQUmYIu6+nUIkznZktzNilSXI0VprXBMx+ox4IX+bSQaryfnjRf0d30Wcos0navTvHXHxK5PpTrP3hQMo9oedW/apUtRrmN3QRmcSpQWspKuxtSN3vTO8SPmhprmLmwwlKdxUTnNSp0FdJrfNz2qUptP0gwkudyFgrm6U499E/EZ3PwEjndTdNhpRCV9eHRRzd3oS1JmfLCpcHDKb1hoDsyvPcXTHnpOc4Q4/iORnhax2mWtd/BBgAsbYIyllg/wsAAAAASUVORK5CYII="

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var base = __webpack_require__(24);
	var BaseView = base.View;
	var HistoryModel = __webpack_require__(146);
	var dealModel = __webpack_require__(117).dealParamsJsonP;
	var url = __webpack_require__(83);
	var View = BaseView.extend({
	    el: '.live_history',
	    events: {
	        'mouseover': 'showBtns',
	        'mouseout': 'hideBtns',
	        'click .btn': 'tabHistory',
	    },
	    rawLoader: function() {
	        return '';
	    },
	    context: function(args) {
	        console.log(args);
	    },
	    beforeMount: function() {
	        //  初始化一些自定义属性
	        var urlHASH = url.parseSearch(location.search);
	        this.channelId = urlHASH.channelId;
	        this.historyModel = new HistoryModel();
	        this._con = this.$el.find('.programlist');
	        this.h_len = 0;
	        this.h_index = 0;
	        this.h_width = -1;
	        this.$lBtn = this.$el.find('.lBtn');
	        this.$rBtn = this.$el.find('.rBtn');
	        this.$btns = this.$el.find('.btn');
	    },
	    afterMount: function() {
	        //  获取findDOMNode DOM Node
	        this.historyItem = __webpack_require__(147);
	    },
	    ready: function() {
	        //  初始化
	        var self = this;
	        var promise = dealModel(this.historyModel, {
	            videoType: 2,
	            channelId: this.channelId
	        });
	        promise.done(function(res) {
	            if (res.msg === 'SUCCESS') {
	                if(res.data.length>0){
	                    self.renderHistoryList(res);
	                    self.$el.show();
	                }
	            }
	        });
	    },
	    renderHistoryList: function(res) {
	        var html = this.compileHTML(this.historyItem, res);
	        this._con.html(html);
	        var Items = this._con.children();
	        this.h_len = Items.length;
	        if (this.h_len > 3) {
	            this.$rBtn.show();
	        }
	        this.h_width = Items.eq(0).outerWidth() + parseInt(Items.eq(0).css('marginRight'));
	        this._con.css({
	            width: this.h_len * this.h_width
	        });
	    },
	    tabHistory: function(e) {
	        var $this = $(e.currentTarget);
	        if ($this.hasClass('lBtn')) {
	            this.h_index--;
	            if (this.h_index <= 0){
	                this.h_index = 0;
	                $this.hide();
	                return;
	            }
	            this.$rBtn.show();
	        } else {
	            this.h_index++;
	            if (this.h_index == this.h_len - 3) $this.hide();
	            this.$lBtn.show();
	        }
	        this._con.stop().animate({
	            left: -this.h_index * this.h_width
	        }, 300);
	    },
	    showBtns: function() {
	        if (this.h_len > 3) {
	            if (this.h_index !== 0) {
	                this.$lBtn.show();
	            }
	            if (this.h_index != this.h_len - 3) {
	                this.$rBtn.show();
	            }
	        }
	        this.$btns.stop().animate({
	            opacity: 1
	        }, 300);
	    },
	    hideBtns: function() {
	        this.$btns.stop().animate({
	            opacity: 0
	        }, 300);
	    },
	    beforeDestroy: function() {
	        //  进入销毁之前,将引用关系设置为null
	    },
	    destroyed: function() {
	        //  销毁之后
	    }
	});
	
	module.exports = View;


/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var base = __webpack_require__(24);
	var Config = __webpack_require__(38);
	var BaseModel = base.Model;
	var env = Config.env[Config.scheme];
	
	var Model = BaseModel.extend({
	    url: '{{url_prefix}}/video/list_bychannel.json',
	    beforeEmit: function beforeEmit() {
	        // 给请求地址替换一下环境变量
	        if (/^\{{0,2}(url_prefix)\}{0,2}/.test(this.url)) {
	            this.url = this.url.replace('{{url_prefix}}', env.url_prefix);
	        }
	    },
	    formatter: function(response) {
	        //formatter方法可以格式化数据
	        if (response.data.length > 0) {
	            for (var i = 0; i < response.data.length; i++) {
	
	                response.data[i].T_playtime = sec2time(response.data[i].playtime);
	                response.data[i].T_onAirStartTime = dateToYMD(response.data[i].onAirStartTime);
	            }
	        }
	        return response;
	    }
	});
	
	function toD(n) {
	    return n >= 10 ? '' + n : '0' + n;
	}
	
	function dateToYMD(timestamp) {
	    var date = new Date(),
	        Y, M, D, h, s;
	    date.setTime(timestamp);
	    Y = date.getFullYear();
	    M = date.getMonth() + 1;
	    D = date.getDate();
	    h = date.getHours();
	    s = date.getSeconds();
	    return Y + '年' + toD(M) + '月' + toD(D) + '日 ' + toD(h) + ':' + toD(s);
	}
	
	function sec2time(sec) {
	    if (sec == 'undefined') {
	        return '00:00';
	    }
	    var h = parseInt(sec / 3600);
	    var m = parseInt((sec - h * 3600) / 60);
	    var s = parseInt(sec - h * 3600 - m * 60);
	    return h > 0 ? h + ':' + toD(m) + ':' + toD(s) : toD(m) + ':' + toD(s);
	}
	var shared = null;
	Model.sharedInstanceModel = function sharedInstanceModel() {
	    if (!shared) {
	        shared = new Model();
	    }
	    return shared;
	};
	
	module.exports = Model;


/***/ },
/* 147 */
/***/ function(module, exports) {

	module.exports = "{{each data as info}}\r\n<li class=\"program\">\r\n\t<a href=\"living.html?videoId={{info.videoId}}&channelId={{info.channel.channelId}}\"><div class=\"viedoBox\">\r\n\t\t<img src=\"{{info.posterPic}}\" alt=\"\">\r\n\t\t<div class=\"shadow\"></div>\r\n\t\t<div class=\"play_ico\"></div>\r\n\t\t{{if info.T_playtime!==\"00:00\"}}\r\n            <span class=\"viedo_time\">{{info.T_playtime}}</span>\r\n        {{/if}}\r\n\t</div>\r\n\t<div class=\"program_msg\">\r\n\t\t<a href=\"\" class=\"title\">{{info.videoName}}</a>\r\n\t\t<div class=\"program_time\">{{info.T_onAirStartTime}}</div>\r\n\t\t<div class=\"program_support clearfix\">\r\n\t\t\t<span class=\"program_visit\">{{info.visitCount}}</span>\r\n\t\t\t<span class=\"program_love\">{{info.likeCount}}</span>\r\n\t\t</div>\r\n\t</div></a>\r\n</li>\r\n{{/each}}\r\n"

/***/ }
]);
//# sourceMappingURL=living.js.map