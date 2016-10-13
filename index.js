webpackJsonp([3],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by caoxifeng on 16/4/11.
	 */
	var $ = __webpack_require__(1);
	__webpack_require__(102);
	var MainView = __webpack_require__(110);
	$(function () {
	    // 入口视图
	    var mainView = new MainView();
	});


/***/ },

/***/ 84:
/***/ function(module, exports) {

	module.exports = "{{each videos as info index}}\r\n{{if info.charge == true}}\r\n<li class=\"program channel{{info.channel.channelId}} charge\" data-channelid=\"{{info.channel.channelId}}\">\r\n{{else}}\r\n<li class=\"program channel{{info.channel.channelId}}\" data-channelid=\"{{info.channel.channelId}}\">\r\n{{/if}}\r\n    <h3 class=\"program-top\">\r\n        <a href=\"/channel.html?channelId={{info.channel.channelId}}\"><img src=\"{{info.channel.profileImg}}\" alt=\"\" class=\"avator\">\r\n        <span class=\"name\">{{info.channel.channelName}}</span></a>\r\n            {{if info.mysub == true}}\r\n            <div class=\"meet disabled\">已订阅</div>\r\n            {{/if}}\r\n    </h3> {{if info.charge == true}}\r\n    <a href=\"/living.html?videoId={{info.videoId}}&channelId={{info.channel.channelId}}\">\r\n        <div class=\"viedoBox\" data-videoid=\"{{info.videoId}}\">\r\n            <i class=\"fee\"></i>\r\n            <img src=\"{{info.posterPic}}\" alt=\"\" class=\"videoImg\">\r\n            <div class=\"shadow\"></div>\r\n            <div class=\"play_ico\"></div>\r\n            {{if info.videoType == \"LIVE\"}}\r\n            <span class=\"live-ico\"></span>\r\n            {{else if info.T_playtime != \"00:00\"}}\r\n            <span class=\"viedo_time\">{{info.T_playtime}}</span>\r\n            {{/if}}\r\n        </div>\r\n    </a>\r\n    {{else}}\r\n    <a href=\"/living.html?videoId={{info.videoId}}&channelId={{info.channel.channelId}}\">\r\n        <div class=\"viedoBox\" data-videoid=\"{{info.videoId}}\">\r\n            <i class=\"\"></i>\r\n            <img src=\"{{info.posterPic}}\" alt=\"\" class=\"videoImg\">\r\n            <div class=\"shadow\"></div>\r\n            <div class=\"play_ico\"></div>\r\n            {{if info.videoType==\"LIVE\"}}\r\n            <span class=\"live-ico\"></span>\r\n            {{else if info.T_playtime != \"00:00\"}}\r\n            <span class=\"viedo_time\">{{info.T_playtime}}</span>\r\n            {{/if}}\r\n        </div>\r\n    </a>\r\n    {{/if}}\r\n    <div class=\"program_msg\">\r\n        <a href=\"living.html?videoId={{info.videoId}}\" class=\"title\">{{info.videoName}}</a>\r\n        <div class=\"program_time\">{{info.T_onAirStartTime}}</div>\r\n        <div class=\"program_support clearfix\">\r\n            <span class=\"program_visit\">{{info.visitCount}}</span>\r\n            <span class=\"program_love\">{{info.likeCount}}</span>\r\n        </div>\r\n    </div>\r\n</li>\r\n{{/each}}\r\n"

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

/***/ 102:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 110:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var base = __webpack_require__(24);
	var BaseView = base.View;
	
	var BannerView = __webpack_require__(111);
	var VideoView = __webpack_require__(115);
	var alertify = __webpack_require__(90);
	var user = __webpack_require__(59);
	var topbar = __webpack_require__(42);
	var loginBox = __webpack_require__(50);
	var View = BaseView.extend({
	    el: '.container',
	    events: {
	        'click .newest': 'tab_newest',
	        'click .hostest': 'tab_hostest',
	        'click .mysub': 'tab_mysub',
	    },
	    rawLoader: function() {
	        return '';
	    },
	    context: function(args) {
	        console.log(args);
	    },
	    beforeMount: function() {
	        //  初始化一些自定义属性
	        this.condition = {
	            videoTotal: 0,
	            pageNum: 0,
	            listType: 1,
	            PageNow: 1
	        }
	    },
	    afterMount: function() {
	        //  获取findDOMNode DOM Node
	        this.loginBox = loginBox();
	        this._dialog = this.loginBox.dialog;
	    },
	    ready: function() {
	        //  初始化
	        this.scrollIndex = 0;
	        this.bannerView = new BannerView();
	        this.videoView = new VideoView();
	        this.topbar = new topbar();
	        this.scrollLoad();
	    },
	    beforeDestroy: function() {
	        //  进入销毁之前,将引用关系设置为null
	    },
	    destroyed: function() {
	        //  销毁之后
	    },
	    scrollLoad: function() {
	        var self = this;
	        // 滚动监听函数进行下拉加载更多操作
	        function load() {
	            if (self.bScorll) return;
	            var $windowScrollTop = $(window).scrollTop();
	            var $windowHeight = $(window).height();
	            var $documentHeight = $(document).height();
	            if (($windowScrollTop + $windowHeight) > $documentHeight - 200) {
	                self.scrollIndex++;
	                // 调用viewView里面的注册事件
	                self.videoView.trigger('events:scoll_fetch', self.scrollIndex)
	            }
	        }
	        var delayLoad =  _.throttle(load,300);
	        // 监听滚动条目
	        $(window).on('scroll', delayLoad);
	    },
	    tab_newest: function(e) {
	        var $this = $(e.currentTarget);
	        if ($this.hasClass('on')) return;
	        this.scrollIndex = 0;
	        $(window).scrollTop(0);
	        $('.noMore').hide();
	        $('.bannerBox,.common_con h2').show();
	        $('.appDownloadAd').show();
	        $this.addClass('on').siblings('li').removeClass('on');
	        $('.programlist').html('');
	        this.videoView.trigger('events:tab_fetch', 1);
	    },
	    tab_hostest: function(e) {
	        var $this = $(e.currentTarget);
	        if ($this.hasClass('on')) return;
	        this.scrollIndex = 0;
	        $(window).scrollTop(0);
	        $('.noMore').hide();
	        $('.bannerBox,.common_con h2').hide();
	        $('.appDownloadAd').hide();
	        $this.addClass('on').siblings('li').removeClass('on');
	        $('.programlist').html('');
	        this.videoView.trigger('events:tab_fetch', 2);
	    },
	    tab_mysub: function(e) {
	        var _this = this;
	        var status = this._dialog.status();
	        var $this = $(e.currentTarget);
	        if ($this.hasClass('on')) return;
	        if (!user.isLogined()) {
	            if (status == 'hide') {
	                this._dialog.trigger('show');
	            } else {
	                this._dialog.trigger('hide');
	            }
	            return false;
	        }
	        this.scrollIndex = 0;
	        $(window).scrollTop(0);
	        $('.bannerBox,.common_con h2').hide();
	        $('.appDownloadAd').hide();
	        $this.addClass('on').siblings('li').removeClass('on');
	        $('.programlist').html('');
	        this.videoView.trigger('events:tab_fetch', 3);
	    }
	});
	module.exports = View;


/***/ },

/***/ 111:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var base = __webpack_require__(24);
	var BaseView = base.View;
	
	// 如果判断登陆就引入userModel的模块
	
	var BannelModel = __webpack_require__(112);
	
	var View = BaseView.extend({
	    el: '.bannerBox',
	    events: {
	        'click .lBtn': 'preBanner',
	        'click .rBtn': 'nextBanner',
	        'click .bannerBtnBox li': 'btnTab'
	    },
	    _attr: function() {
	        this.bannerIndex = 0;
	        this.maxlen = -1;
	        this.zIndex = 3;
	        this.$banners = null;
	        this.$liBtns = null;
	    },
	    rawLoader: function() {
	        return '';
	    },
	    context: function(args) {
	        console.log(args);
	    },
	    beforeMount: function() {
	        //  初始化一些自定义属性
	        this._attr();
	        this.deviceinfo = {
	            deviceinfo: '{"aid":"30001001"}',
	            access_token: ''
	        }
	    },
	    afterMount: function() {
	        //  获取findDOMNode DOM Node
	        this.bannerTpl = __webpack_require__(113);
	        this.bannerBtnTpl = __webpack_require__(114);
	    },
	    ready: function() {
	        //  初始化
	        this.bannerModel = new BannelModel();
	        var promise = this.bannerModel.executeJSONP(this.deviceinfo);
	        var self = this;
	        promise.done(function(response) {
	            if (response.msg == "SUCCESS") {
	                self.renderBanner();
	            }
	        });
	        promise.fail(function(xhr) {
	            if (xhr) {
	                // 这里可以引入一个弹框的效果 进行提示
	                console.log('error');
	            }
	        });
	    },
	    beforeDestroy: function() {
	        //  进入销毁之前,将引用关系设置为null
	    },
	    destroyed: function() {
	        //  销毁之后
	    },
	    renderBanner: function() {
	        var self = this;
	        var $father = $(this.el);
	        var $bannerBox = $father.find('.bannerlist');
	        var $bannerBtnBox = $father.find('.bannerBtnBox ol');
	        var htmlBanner = this.compileHTML(this.bannerTpl, this.bannerModel.get('data'));
	        var htmlBannerBtn = this.compileHTML(this.bannerBtnTpl, this.bannerModel.get('data'));
	        $bannerBox.append(htmlBanner);
	        $bannerBtnBox.append(htmlBannerBtn);
	        this.$banners = $bannerBox.find('li');
	        this.maxlen = this.$banners.length;
	        this.$liBtns = $bannerBtnBox.find('li');
	        if (this.bannerModel.get('data').recs.length > 1) {
	            $('.bannerBtnBox').show();
	            $('.lBtn').show();
	            $('.rBtn').show();
	        };
	        setTimeout(function() {
	            self.bannerTab();
	        }, 6000);
	    },
	    preBanner: function() {
	        var bannerIndex = this.bannerIndex;
	        this.$banners.eq(bannerIndex).stop().animate({
	            opacity: 0,
	            zIndex: 0
	        }, 1000);
	        this.$liBtns.eq(bannerIndex).removeClass('on');
	        bannerIndex--;
	        if (bannerIndex < 0) bannerIndex += this.maxlen;
	        bannerIndex %= this.maxlen;
	        this.$liBtns.eq(bannerIndex).addClass('on');
	        this.$banners.eq(bannerIndex).stop().animate({
	            opacity: 1,
	            zIndex: 2
	        }, 1000);
	        this.bannerIndex = bannerIndex;
	    },
	    nextBanner: function() {
	        var bannerIndex = this.bannerIndex;
	        this.$banners.eq(bannerIndex).stop().animate({
	            opacity: 0,
	            zIndex: 0
	        }, 1000);
	        this.$liBtns.eq(bannerIndex).removeClass('on');
	        bannerIndex++;
	        bannerIndex %= this.maxlen;
	        this.$liBtns.eq(bannerIndex).addClass('on');
	        this.$banners.eq(bannerIndex).stop().animate({
	            opacity: 1,
	            zIndex: 2
	        }, 1000);
	        this.bannerIndex = bannerIndex;
	    },
	    btnTab: function(e) {
	        var i = $(e.currentTarget).index();
	        this.bannerIndex = i;
	        this.$banners.eq(i).stop().animate({
	            opacity: 1,
	            zIndex: 2
	        }, 1000).siblings('').stop().animate({
	            opacity: 0
	        }, 1000);
	        this.$liBtns.eq(i).addClass('on').siblings('li').removeClass('on');
	    },
	    bannerTab: function() {
	        var self = this,
	            timer = null,
	            $bannerBox = $('.bannerBox');
	        timer = setInterval(function() {
	            self.nextBanner();
	        }, 3000);
	        $bannerBox.mouseover(function(event) {
	            clearInterval(timer);
	        });
	        $bannerBox.mouseout(function(event) {
	            timer = setInterval(function() {
	                self.nextBanner();
	            }, 3000);
	        });
	    }
	});
	
	module.exports = View;


/***/ },

/***/ 112:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var base = __webpack_require__(24);
	var Config = __webpack_require__(38);
	var BaseModel = base.Model;
	var env = Config.env[Config.scheme];
	
	var Model = BaseModel.extend({
	  url: '{{url_prefix}}/home/rec_list.json',
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

/***/ 113:
/***/ function(module, exports) {

	module.exports = "{{each recs as item index}}\r\n    {{if index == 0}}\r\n\t    <li class=\"now\">\r\n\t\t\t{{if item.type == \"VIDEO\"}}\r\n\t\t\t    <a href=\"http://{{host}}/web/living.html?videoId={{item.recId}}&channelid={{item.extras.channelId}}\" target=\"_blank\">\r\n\t\t\t{{else if item.type == \"WEB\"}}\r\n\t\t\t    <a href=\"{{item.url}}\" target=\"_blank\">\r\n\t\t\t{{/if}}\r\n\t\t\t    <img src=\"{{item.pcPic}}\" alt=\"\">\r\n\t\t\t    </a>\r\n\t\t</li>\r\n\t{{else}}\r\n\t\t<li>\r\n\t\t\t{{if item.type == \"VIDEO\"}}\r\n\t\t\t    <a href=\"http://{{host}}/web/living.html?videoId={{item.recId}}&channelid={{item.extras.channelId}}\" target=\"_blank\">\r\n\t\t\t{{else if item.type == \"WEB\"}}\r\n\t\t\t    <a href=\"{{item.url}}\" target=\"_blank\">\r\n\t\t\t{{/if}}\r\n\t\t\t    <img src=\"{{item.pcPic}}\" alt=\"\">\r\n\t\t        </a>\r\n\t\t</li>\r\n\t{{/if}}\r\n{{/each}}\r\n"

/***/ },

/***/ 114:
/***/ function(module, exports) {

	module.exports = "{{each recs as item index}}\r\n    {{if item.length == 1}}\r\n        <li style=\"display:none\"></li>\r\n    {{else}}\r\n        {{if index == 0 }}\r\n            <li class=\"on\"></li>\r\n        {{else}}\r\n            <li></li>\r\n        {{/if}}\r\n    {{/if}}\r\n{{/each}}\r\n"

/***/ },

/***/ 115:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var base = __webpack_require__(24);
	var BaseView = base.View;
	
	var Config = __webpack_require__(38);
	var env = Config.env[Config.scheme];
	var VideoModel = __webpack_require__(116);
	var alertify = __webpack_require__(90);
	var dealModel = __webpack_require__(117).dealParamsJsonP;
	var gobal = __webpack_require__(58);
	
	// 定义一些变量
	var bSub = false;
	var bOne = true;
	var bStopFetch = false;
	
	var View = BaseView.extend({
	    el: '.programlist',
	    events: {
	        'click .meetable': 'subscribe',
	        'click .disabled': 'unsubscribe'
	    },
	    rawLoader: function() {
	        return '';
	    },
	    context: function(args) {
	        console.log(args);
	    },
	    beforeMount: function() {
	        //  初始化一些自定义属性
	        this.params = {
	            offset: 0,
	            sortType: 1,
	            size: 9,
	        };
	        this.reqType = false;
	    },
	    afterMount: function() {
	        //  获取findDOMNode DOM Node
	        this.videoTpl = __webpack_require__(84);
	    },
	    ready: function() {
	        //  初始化
	        this.videoModel = new VideoModel();
	        // 注册方法
	        this.onEvent();
	        // 执行方法
	        this.trigger('events:initVideoList');
	    },
	    beforeDestroy: function() {
	        //  进入销毁之前,将引用关系设置为null
	    },
	    destroyed: function() {
	        //  销毁之后
	    },
	    onEvent: function() {
	        var self = this;
	        this.on('events:initVideoList', function(data) {
	            self.fetchModel();
	        });
	        this.on('events:tab_fetch', function(listType) {
	            bStopFetch = false;
	            bOne = true;
	            self.params.offset = 0;
	            switch (listType) {
	                case 1:
	                    bSub = false;
	                    this.videoModel.url = env.url_prefix + '/video/home_list.json';
	                    self.params.sortType = 1;
	                    self.reqType = false;
	                    break;
	                case 2:
	                    bSub = false;
	                    this.videoModel.url = env.url_prefix + '/video/home_list.json';
	                    self.params.sortType = 2;
	                    self.reqType = false;
	                    break;
	                case 3:
	                    bSub = true;
	                    this.videoModel.url = env.url_prefix + '/video/mysub_list.json';
	                    self.params.sortType = null;
	                    self.reqType = true;
	                    break;
	            }
	            self.fetchModel();
	        });
	        this.on('events:scoll_fetch', function(Scroll_count) {
	            if (bStopFetch) return;
	            bOne = false;
	            var offset = Scroll_count * 9;
	            self.params.offset = offset;
	            self.fetchModel();
	        });
	    },
	    fetchModel: function() {
	        dealModel
	        var promise = dealModel(this.videoModel,this.params,true);
	        var self = this;
	        promise.done(function(res) {
	            if (res.msg == 'SUCCESS') {
	                $.each(res.data.videos, function(index, val) {
	                    val.T_playtime = self.sec2time(val.playtime);
	                    val.T_onAirStartTime = self.dateToYMD(val.onAirStartTime);
	                    if (self.reqType && self.reqType === true) {
	                        val.mysub = true;
	                    }
	                });
	                self.renerVideo();
	            }
	        });
	        promise.fail(function(xhr) {
	            if (xhr) {
	                // 这里可以引入一个弹框的效果 进行提示
	                console.log('error');
	            }
	        });
	    },
	    renerVideo: function() {
	        // 视图添加渲染
	        if (this.videoModel.get('data').videos.length === 0) {
	            if (bSub && bOne) {
	                $('.noMore').show();
	            }
	            bStopFetch = true;
	            return false;
	        }
	        var html = this.compileHTML(this.videoTpl, this.videoModel.get('data'));
	        this.$el.append(html);
	    },
	    subscribe: function(e) {
	        var _program = $(e.currentTarget.parentElement.parentElement),
	            channelId = _program.attr('data-channelid'),
	            channelClass = '.channel' + channelId + ' .meet',
	            $meets = $(channelClass);
	        var subscribe_params = {
	            channelId: channelId
	        };
	        gobal.jsonp('/channel/subscribe.json', subscribe_params, function(res) {
	            console.log(res);
	            if (res.msg === "SUCCESS") {
	                $meets.removeClass('meetable').addClass('disabled').html('已订阅');
	                // alertify.success('订阅成功');
	            }
	            console.log("success");
	        }, this.error, true);
	    },
	    unsubscribe: function(e) {
	        var _program = $(e.currentTarget.parentElement.parentElement),
	            channelId = _program.attr('data-channelid'),
	            channelClass = '.channel' + channelId + ' .meet',
	            $meets = $(channelClass);
	        var subscribe_params = {
	            channelId: channelId
	        };
	        gobal.jsonp('/channel/unsubscribe.json', subscribe_params, function(res) {
	            if (res.msg === "SUCCESS") {
	                $meets.removeClass('disabled').addClass('meetable').html('订阅频道');
	                // alertify.error('取消订阅成功');
	            }
	        }, this.error, true);
	    },
	    toD: function(n) {
	        return n >= 10 ? '' + n : '0' + n;
	    },
	    error: function(res) {
	        console.log('errMeg: ' + res);
	    },
	    sec2time: function(sec) {
	        if (sec == 'undefined') {
	            return '00:00';
	        }
	        var h = parseInt(sec / 3600);
	        var m = parseInt((sec - h * 3600) / 60);
	        var s = parseInt(sec - h * 3600 - m * 60);
	        return h > 0 ? h + ':' + this.toD(m) + ':' + this.toD(s) : this.toD(m) + ':' + this.toD(s);
	    },
	    dateToYMD: function(timestamp) {
	        var date = new Date(),
	            Y, M, D, h, s;
	        date.setTime(timestamp);
	        Y = date.getFullYear();
	        M = date.getMonth() + 1;
	        D = date.getDate();
	        h = date.getHours();
	        s = date.getSeconds();
	        return Y + '年' + this.toD(M) + '月' + this.toD(D) + '日 ' + this.toD(h) + ':' + this.toD(s);
	    }
	});
	
	module.exports = View;


/***/ },

/***/ 116:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var base = __webpack_require__(24);
	var Config = __webpack_require__(38);
	var BaseModel = base.Model;
	var env = Config.env[Config.scheme];
	
	var Model = BaseModel.extend({
	    url: '{{url_prefix}}/video/home_list.json',
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


/***/ }

});
//# sourceMappingURL=index.js.map