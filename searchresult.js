webpackJsonp([5],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by caoxifeng on 16/4/11.
	 */
	var $ = __webpack_require__(1);
	__webpack_require__(148);
	var MainView = __webpack_require__(153);
	$(function () {
	    // 入口视图
	    new MainView();
	});


/***/ },

/***/ 83:
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

/***/ 90:
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

/***/ 117:
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

/***/ 148:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 153:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var base = __webpack_require__(24);
	var BaseView = base.View;
	var topbar = __webpack_require__(42);
	var ResultView = __webpack_require__(154);
	
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
	        this.topbar = new topbar();
	        this.resultView = new ResultView();
	        this.ready();
	    },
	    afterMount: function() {
	        //  获取findDOMNode DOM Node
	    },
	    ready: function() {
	        //  初始化
	        var self = this;
	
	        function load() {
	            var $windowScrollTop = $(window).scrollTop();
	            var $windowHeight = $(window).height();
	            var $documentHeight = $(document).height();
	            if (($windowScrollTop + $windowHeight) == $documentHeight) {
	                self.resultView.trigger('events:scroll_fetch');
	            }
	        }
	        $(window).on('scroll', load);
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

/***/ 154:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var base = __webpack_require__(24);
	var BaseView = base.View;
	var SearchResultModel = __webpack_require__(155);
	var dealModel = __webpack_require__(117).dealParamsJsonP;
	var gobal = __webpack_require__(58);
	var alertify = __webpack_require__(90);
	var url = __webpack_require__(83);
	var user = __webpack_require__(59);
	var loginBox = __webpack_require__(50);
	var urlHASH = url.parseSearch(location.search);
	var View = BaseView.extend({
	    el: '.container',
	    events: {
	        'click .meetable': 'subscribe', //channelId
	        'click .disabled': 'unsubscribe', //channelId
	    },
	    rawLoader: function() {
	        return '';
	    },
	    context: function(args) {
	        console.log(args);
	    },
	    beforeMount: function() {
	        //  初始化一些自定义属性
	        var self = this;
	        this.channelList = [];
	        this.searchResultModel = new SearchResultModel();
	        this.loginBox = loginBox();
	        this.bScorll = true;
	        setTimeout(function() {
	            self.bScorll = false;
	        }, 2000)
	        this._dialog = this.loginBox.dialog;
	        this.programlist = this.$el.find('.programlist');
	        this.channeList = this.$el.find('.channeList');
	        this.channelBox = this.$el.find('.channelBox');
	        this.noMore = this.$el.find('.noMore');
	        this.listenTo(this.searchResultModel, 'change', this.rendPage)
	    },
	    afterMount: function() {
	        //  获取findDOMNode DOM Node
	        this.videoItem = __webpack_require__(156);
	        this.channelItem = __webpack_require__(157);
	    },
	    ready: function() {
	        //  初始化
	        this.oneFetch = true;
	        this.scroll_count = 0;
	        this.fetchModel(this.scroll_count);
	        this.on('events:scroll_fetch', function() {
	            if (this.bScorll) return;
	            this.scroll_count++;
	            this.fetchModel(this.scroll_count);
	        });
	    },
	    rendPage: function() {
	        var rq_db = this.searchResultModel.get('data');
	        var videos = this.searchResultModel.get('data').videos;
	        var channels = this.searchResultModel.get('data').channels;
	        var len = this.channelList.length;
	
	        if (videos.length == 0 && channels.length == 0) {
	            this.bScorll = true;
	        }
	        if (videos.length > 0) {
	            this.oneFetch = false;
	            this.renderVideo(rq_db);
	        } else if (this.oneFetch) {
	            this.oneFetch = false;
	            this.programlist.hide();
	            this.noMore.show();
	        }
	        if (channels.length > 0) {
	            if (len > 0) {
	                if (this.channelList[len - 1].channelId != channels[0].channelId) {
	                    $.merge(this.channelList, channels);
	                }
	            } else {
	                $.merge(this.channelList, channels);
	            }
	            this.renderChannel();
	            this.channelBox.show();
	        }
	    },
	    subscribe: function(e) {
	        var self = this;
	        var $this = $(e.currentTarget);
	        var _parent = $this.parents('.channel');
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
	            channelId: _parent.attr('data-channelid')
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
	        var _parent = $this.parents('.channel');
	        var subscribe_params = {
	            channelId: _parent.attr('data-channelid')
	        };
	        gobal.jsonp('/channel/unsubscribe.json', subscribe_params, function(res) {
	            console.log(res);
	            if (res.msg === "SUCCESS") {
	                alertify.error('取消订阅成功');
	                $this.removeClass('disabled').addClass('meetable').html('订阅频道');
	            }
	        }, this.error, true);
	    },
	    renderChannel: function() {
	        var html = this.compileHTML(this.channelItem, {
	            channels: this.channelList
	        });
	        this.channeList.html(html);
	        var $channel_con = $('.channel_con'),
	            $channeList = $channel_con.find('.channeList'),
	            $lBtn = $channel_con.find('.lBtn'),
	            $rBtn = $channel_con.find('.rBtn');
	        var maxlen = $channeList.find('li').length;
	        var now = 0;
	        var maxLeftIndex = maxlen - 3;
	        $channeList.css({
	            width: 400 * maxlen
	        });
	        if (maxlen > 3) {
	            $rBtn.show();
	        }
	        $rBtn.click(function() {
	            now++;
	            $lBtn.show();
	            $channeList.stop().animate({
	                left: -now * 400
	            });
	            if (now == maxLeftIndex) {
	                $rBtn.hide();
	            }
	        });
	        $lBtn.click(function() {
	            now--;
	            $rBtn.show();
	            $channeList.stop().animate({
	                left: -now * 400
	            });
	            if (now == 0) {
	                $lBtn.hide();
	            }
	        });
	    },
	    renderVideo: function(rq_db) {
	        var html = this.compileHTML(this.videoItem, rq_db);
	        this.programlist.append(html);
	    },
	    beforeDestroy: function() {
	        //  进入销毁之前,将引用关系设置为null
	    },
	    destroyed: function() {
	        //  销毁之后
	    },
	    fetchModel: function(o) {
	        var promise = dealModel(this.searchResultModel, {
	            offset: o * 9,
	            size: 9,
	            keyword: urlHASH.keyword
	        }, true);
	    }
	});
	
	module.exports = View;


/***/ },

/***/ 155:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var base = __webpack_require__(24);
	var Config = __webpack_require__(38);
	var BaseModel = base.Model;
	var env = Config.env[Config.scheme];
	
	var Model = BaseModel.extend({
	    url: '{{url_prefix}}/search/all.json',
	    beforeEmit: function beforeEmit() {
	        // 给请求地址替换一下环境变量
	        if (/^\{{0,2}(url_prefix)\}{0,2}/.test(this.url)) {
	            this.url = this.url.replace('{{url_prefix}}', env.url_prefix);
	        }
	    },
	    formatter: function(response) {
	        //formatter方法可以格式化数据
	        var list = response.data.videos;
	        if (list.length > 0) {
	            for (var i = 0; i < list.length; i++) {
	                list[i].T_playtime = sec2time(list[i].playtime);
	                list[i].T_onAirStartTime = dateToYMD(list[i].onAirStartTime);
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

/***/ 156:
/***/ function(module, exports) {

	module.exports = "{{each videos as info index}}\r\n{{if info.charge == true}}\r\n<li class=\"program channel{{info.channel.channelId}} charge\" data-channelid=\"{{info.channel.channelId}}\">\r\n{{else}}\r\n<li class=\"program channel{{info.channel.channelId}}\" data-channelid=\"{{info.channel.channelId}}\">\r\n{{/if}}\r\n    <h3 class=\"program-top\">\r\n        <a href=\"/channel.html?channelId={{info.channel.channelId}}\"><img src=\"{{info.channel.profileImg}}\" alt=\"\" class=\"avator\">\r\n        <span class=\"name\">{{info.channel.channelName}}</span></a>\r\n            {{if info.mysub == true}}\r\n            <div class=\"meet disabled\">已订阅</div>\r\n            {{/if}}\r\n    </h3> {{if info.charge == true}}\r\n    <a href=\"/living.html?videoId={{info.videoId}}&channelId={{info.channel.channelId}}\">\r\n        <div class=\"viedoBox\" data-videoid=\"{{info.videoId}}\">\r\n            <i class=\"fee\"></i>\r\n            <img src=\"{{info.posterPic}}\" alt=\"\" class=\"videoImg\">\r\n            <div class=\"shadow\"></div>\r\n            <div class=\"play_ico\"></div>\r\n            {{if info.videoType == \"LIVE\"}}\r\n            <span class=\"live-ico\"></span>\r\n            {{else if info.T_playtime != \"00:00\"}}\r\n            <span class=\"viedo_time\">{{info.T_playtime}}</span>\r\n            {{/if}}\r\n        </div>\r\n    </a>\r\n    {{else}}\r\n    <a href=\"/living.html?videoId={{info.videoId}}&channelId={{info.channel.channelId}}\">\r\n        <div class=\"viedoBox\" data-videoid=\"{{info.videoId}}\">\r\n            <i class=\"\"></i>\r\n            <img src=\"{{info.posterPic}}\" alt=\"\" class=\"videoImg\">\r\n            <div class=\"shadow\"></div>\r\n            <div class=\"play_ico\"></div>\r\n            {{if info.videoType==\"LIVE\"}}\r\n            <span class=\"live-ico\"></span>\r\n            {{else if info.T_playtime != \"00:00\"}}\r\n            <span class=\"viedo_time\">{{info.T_playtime}}</span>\r\n            {{/if}}\r\n        </div>\r\n    </a>\r\n    {{/if}}\r\n    <div class=\"program_msg\">\r\n        <a href=\"living.html?videoId={{info.videoId}}\" class=\"title\">{{info.videoName}}</a>\r\n        <div class=\"program_time\">{{info.T_onAirStartTime}}</div>\r\n        <div class=\"program_support clearfix\">\r\n            <span class=\"program_visit\">{{info.visitCount}}</span>\r\n            <span class=\"program_love\">{{info.likeCount}}</span>\r\n        </div>\r\n    </div>\r\n</li>\r\n{{/each}}\r\n"

/***/ },

/***/ 157:
/***/ function(module, exports) {

	module.exports = "{{each channels as channel}}\r\n\t<li>\r\n\t\t<div class=\"channel\" data-channelId=\"{{channel.channelId}}\" data-channelType=\"{{channel.channelType}}\">\r\n\t\t\t<div class=\"channel_avator\">\r\n\t\t\t\t<div class=\"imgBox\">\r\n\t\t\t\t\t<a href=\"/channel.html?channelId={{channel.channelId}}\"><img src=\"{{channel.profileImg}}\" alt=\"\"></a>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"channel_name\">{{channel.channelName}}</div>\r\n\t\t\t<div class=\"clearfix\">\r\n\t\t\t<span class=\"channel_play\">{{channel.videoCount}}</span>\r\n\t\t\t<span class=\"channel_online\">{{channel.follow}}</span>\r\n\t\t\t</div>\r\n\t\t\t{{if channel.subscribed === false}}\r\n\t\t\t\t<div class=\"meet meetable\">订阅频道</div>\r\n\t\t\t{{else}}\r\n\t\t\t\t<div class=\"meet disabled\">已订阅</div>\r\n\t\t\t{{/if}}\r\n\t\t</div>\r\n\t</li>\r\n{{/each}}\r\n"

/***/ }

});
//# sourceMappingURL=searchresult.js.map