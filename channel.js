webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by caoxifeng on 16/4/11.
	 */
	var $ = __webpack_require__(1);
	__webpack_require__(64);
	var MainView = __webpack_require__(80);
	$(function () {
	    // 入口视图
	    var mainView = new MainView();
	});


/***/ },

/***/ 39:
/***/ function(module, exports) {

	/*
	日期格式化
	*/
	Date.prototype.format = function(format) {
	    var o = {
	        "M+": this.getMonth() + 1,
	        "d+": this.getDate(),
	        "h+": this.getHours(),
	        "m+": this.getMinutes(),
	        "s+": this.getSeconds(),
	        "q+": Math.floor((this.getMonth() + 3) / 3),
	        "S": this.getMilliseconds()
	    };
	
	    if (/(y+)/.test(format)) {
	        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    }
	
	    for (var k in o) {
	        if (new RegExp("(" + k + ")").test(format)) {
	            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	        }
	    }
	    return format;
	};
	/*
	获取序列化时间
	*/
	function toD(n) {
	    return n >= 10 ? '' + n : '0' + n;
	}
	Date.prototype.formatdate = function(format) {
	    Y = this.getFullYear();
	    M = this.getMonth() + 1;
	    D = this.getDate();
	    h = this.getHours();
	    s = this.getMinutes();
	    return Y + '年' + toD(M) + '月' + toD(D) + '日 ' + toD(h) + ':' + toD(s);
	};
	module.exports = {
	    sec2time: function(sec) {
	        if (sec == 'undefined') {
	            return '00:00';
	        }
	        var h = parseInt(sec / 3600);
	        var m = parseInt((sec - h * 3600) / 60);
	        var s = parseInt(sec - h * 3600 - m * 60);
	        return h > 0 ? h + ':' + toD(m) + ':' + toD(s) : toD(m) + ':' + toD(s);
	    },
	}


/***/ },

/***/ 64:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 80:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var base = __webpack_require__(24);
	var BaseView = base.View;
	var VideoView = __webpack_require__(81);
	var CalendarView = __webpack_require__(85);
	var ChannelDetailView = __webpack_require__(88);
	var user = __webpack_require__(59);
	var topbar = __webpack_require__(42);
	var loginBox = __webpack_require__(50);
	var View = BaseView.extend({
	    el: '.container',
	    events: {
	        'click .nav_v_c li': 'tab',
	    },
	    rawLoader: function() {
	        return '';
	    },
	    context: function(args) {
	        console.log(args);
	    },
	    beforeMount: function() {
	        //  初始化一些自定义属性
	        this.scollStatus = 0;
	    },
	    afterMount: function() {
	        //  获取findDOMNode DOM Node
	    },
	    ready: function() {
	        //  初始化
	        this._videoBox = this.$el.find('.videoBox');
	        this._calenderBox = this.$el.find('.calenderBox');
	        this.topbar = new topbar();
	        this.videoView = new VideoView();
	        this.calendarView = new CalendarView();
	        this.channelDetailView = new ChannelDetailView();
	
	        this.onEvents();
	    },
	    beforeDestroy: function() {
	        //  进入销毁之前,将引用关系设置为null
	    },
	    destroyed: function() {
	        //  销毁之后
	    },
	    tab: function(e) {
	        var $this = $(e.currentTarget);
	        if ($this.hasClass('on')) return;
	        if ($this.hasClass('video')) {
	            this._videoBox.show();
	            this._calenderBox.hide();
	            this.scollStatus = 0;
	        } else {
	            this._videoBox.hide();
	            this._calenderBox.show();
	            this.scollStatus = 1;
	        }
	        $this.addClass('on').siblings().removeClass('on');
	    },
	    onEvents : function () {
	        var self = this;
	        function loading() {
	            if(self.scollStatus==0){
	                if(self.videoView.bStopFetch)return;
	            }else{
	                if(self.calendarView.bStopFetch)return;
	            }
	
	            var $windowScrollTop = $(window).scrollTop();
	            var $windowHeight = $(window).height();
	            var $documentHeight = $(document).height();
	            if (($windowScrollTop + $windowHeight) > $documentHeight - 200) {
	                self.scrollIndex++;
	                // 调用viewView里面的注册事件
	                if(self.scollStatus==0){
	                    self.videoView.trigger('events:getVideoList');
	                }else{
	                    self.calendarView.trigger('events:getCalendarList');
	                }
	
	            }
	        }
	        var load = _.throttle(loading,500);
	        $(window).scroll(load);
	    },
	});
	
	module.exports = View;


/***/ },

/***/ 81:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var base = __webpack_require__(24);
	var BaseView = base.View;
	var Config = __webpack_require__(38);
	var env = Config.env[Config.scheme];
	var VideoModel = __webpack_require__(82);
	var gobal = __webpack_require__(58);
	var url = __webpack_require__(83);
	var date = __webpack_require__(39);
	var View = BaseView.extend({
	    el: '.programlist',
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
	        this.offsetIndex = 0;
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
	        // 初始化页面
	        this.getVideo(0);
	    },
	    beforeDestroy: function() {
	        //  进入销毁之前,将引用关系设置为null
	    },
	    destroyed: function() {
	        //  销毁之后
	    },
	    onEvent: function() {
	        this.on('events:getVideoList',function () {
	            if(this.bStopFetch)return;
	            this.bStopFetch = true;
	            this.offsetIndex+=9;
	            this.getVideo(this.offsetIndex);
	        });
	    },
	    getVideo: function(offset) {
	        var self = this;
	        var promise = this.videoModel.executeJSONP({
	            offset: offset||0,
	            size:9,
	            channelId:this.channelId,
	            deviceinfo: '{"aid":"30001001"}',
	        });
	        promise.done(function (res) {
	            if (res.msg === 'SUCCESS') {
	                if(offset===0&&res.data.length===0){
	                    self.$el.siblings('.noMore').show();
	                    self.bStopFetch = true;
	                }else if(res.data.length<9){
	                    self.bStopFetch = true;
	                }else{
	                    self.bStopFetch = false;
	                }
	                $.each(res.data, function(index, val) {
	                    val.T_playtime = self.sec2time(val.playtime);
	                    val.T_onAirStartTime = self.dateToYMD(val.onAirStartTime);
	                });
	            }
	            var html = self.compileHTML(self.videoTpl, {videos:self.videoModel.get('data')});
	            self.$el.append(html);
	        });
	    },
	    toD: function(n) {
	        return n >= 10 ? '' + n : '0' + n;
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

/***/ 82:
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

/***/ 84:
/***/ function(module, exports) {

	module.exports = "{{each videos as info index}}\r\n{{if info.charge == true}}\r\n<li class=\"program channel{{info.channel.channelId}} charge\" data-channelid=\"{{info.channel.channelId}}\">\r\n{{else}}\r\n<li class=\"program channel{{info.channel.channelId}}\" data-channelid=\"{{info.channel.channelId}}\">\r\n{{/if}}\r\n    <h3 class=\"program-top\">\r\n        <a href=\"/channel.html?channelId={{info.channel.channelId}}\"><img src=\"{{info.channel.profileImg}}\" alt=\"\" class=\"avator\">\r\n        <span class=\"name\">{{info.channel.channelName}}</span></a>\r\n            {{if info.mysub == true}}\r\n            <div class=\"meet disabled\">已订阅</div>\r\n            {{/if}}\r\n    </h3> {{if info.charge == true}}\r\n    <a href=\"/living.html?videoId={{info.videoId}}&channelId={{info.channel.channelId}}\">\r\n        <div class=\"viedoBox\" data-videoid=\"{{info.videoId}}\">\r\n            <i class=\"fee\"></i>\r\n            <img src=\"{{info.posterPic}}\" alt=\"\" class=\"videoImg\">\r\n            <div class=\"shadow\"></div>\r\n            <div class=\"play_ico\"></div>\r\n            {{if info.videoType == \"LIVE\"}}\r\n            <span class=\"live-ico\"></span>\r\n            {{else if info.T_playtime != \"00:00\"}}\r\n            <span class=\"viedo_time\">{{info.T_playtime}}</span>\r\n            {{/if}}\r\n        </div>\r\n    </a>\r\n    {{else}}\r\n    <a href=\"/living.html?videoId={{info.videoId}}&channelId={{info.channel.channelId}}\">\r\n        <div class=\"viedoBox\" data-videoid=\"{{info.videoId}}\">\r\n            <i class=\"\"></i>\r\n            <img src=\"{{info.posterPic}}\" alt=\"\" class=\"videoImg\">\r\n            <div class=\"shadow\"></div>\r\n            <div class=\"play_ico\"></div>\r\n            {{if info.videoType==\"LIVE\"}}\r\n            <span class=\"live-ico\"></span>\r\n            {{else if info.T_playtime != \"00:00\"}}\r\n            <span class=\"viedo_time\">{{info.T_playtime}}</span>\r\n            {{/if}}\r\n        </div>\r\n    </a>\r\n    {{/if}}\r\n    <div class=\"program_msg\">\r\n        <a href=\"living.html?videoId={{info.videoId}}\" class=\"title\">{{info.videoName}}</a>\r\n        <div class=\"program_time\">{{info.T_onAirStartTime}}</div>\r\n        <div class=\"program_support clearfix\">\r\n            <span class=\"program_visit\">{{info.visitCount}}</span>\r\n            <span class=\"program_love\">{{info.likeCount}}</span>\r\n        </div>\r\n    </div>\r\n</li>\r\n{{/each}}\r\n"

/***/ },

/***/ 85:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var base = __webpack_require__(24);
	var BaseView = base.View;
	var Config = __webpack_require__(38);
	var env = Config.env[Config.scheme];
	var CalendarModel = __webpack_require__(86);
	var gobal = __webpack_require__(58);
	var url = __webpack_require__(83);
	var date = __webpack_require__(39);
	var View = BaseView.extend({
	    el: '.calendar-list',
	    rawLoader: function() {
	        return '';
	    },
	    context: function(args) {
	        console.log(args);
	    },
	    beforeMount: function() {
	        //  初始化一些自定义属性
	        this.bStopFetch = false;
	        this.offset = 0;
	        this.dataIndex = 0;
	        this.calendarDataList = [];
	        var urlHASH = url.parseSearch(location.search);
	        this.channelId = urlHASH.channelId;
	    },
	    afterMount: function() {
	        //  获取findDOMNode DOM Node
	        this.calendarTpl = __webpack_require__(87);
	    },
	    ready: function() {
	        //  初始化
	        this.calendarModel = new CalendarModel();
	        // 注册方法
	        this.onEvent();
	        // 初始化页面
	        this.getCalendar(0);
	    },
	    beforeDestroy: function() {
	        //  进入销毁之前,将引用关系设置为null
	    },
	    destroyed: function() {
	        //  销毁之后
	    },
	    onEvent: function() {
	        this.on('events:getCalendarList', function() {
	            if (this.bStopFetch) return;
	            this.offset += 4;
	            this.getCalendar(this.offset);
	        });
	    },
	    getCalendar: function(offset) {
	        var self = this;
	        if (self.bStopFetch) return;
	        var promise = this.calendarModel.executeJSONP({
	            channelId: this.channelId,
	            offset: offset || 0,
	            size: 4,
	            deviceinfo: '{"aid":"30001001"}',
	        });
	        promise.done(function(res) {
	            var len = res.data.schedules.length;
	            if (offset === 0 && len === 0) {
	                self.$el.siblings('.noMore').show();
	                self.bStopFetch = true;
	                return;
	            } else if (len < 4) {
	                self.bStopFetch = true;
	                self.$el.show();
	            } else {
	                self.bStopFetch = false;
	                self.$el.show();
	            }
	            self.serializelist();
	        });
	        promise.fail(function(res) {
	            console.log(res);
	        });
	    },
	    serializelist: function() {
	        var self = this;
	        if (this.calendarModel.get('msg') == 'SUCCESS') {
	            var data = this.calendarModel.get('data');
	            $.each(data.schedules, function(index, val) {
	                var date = new Date();
	                var today = date.format('d');
	                date.setTime(val.onAirTime);
	                val.T_onAirtime = date.formatdate();
	                var onAirDay = date.format('d');
	
	                var d = date.format('M') + '.' + onAirDay;
	                if (today == onAirDay) {
	                    self.nowTime = onAirDay;
	                    if (!self.calendarDataList[0]) {
	                        self.calendarDataList[0] = {
	                            title: '今日',
	                            list: [val]
	                        };
	                    } else {
	                        self.calendarDataList[0].list.push(val);
	                    }
	                } else if (onAirDay != self.nowTime) {
	                    if(self.calendarDataList[0]!=undefined){
	                        self.dataIndex++;
	                    }
	                    self.nowTime = onAirDay;
	                    self.calendarDataList[self.dataIndex] = {
	                        title: d,
	                        list: [val]
	                    };
	
	                } else {
	                    self.calendarDataList[self.dataIndex].list.push(val);
	                }
	            });
	            console.log(self.calendarDataList);
	            this.render();
	        }
	    },
	    render: function() {
	        var calendarHtml = this.compileHTML(this.calendarTpl, {
	            dateList: this.calendarDataList
	        });
	        this.$el.html(calendarHtml);
	    },
	});
	module.exports = View;


/***/ },

/***/ 86:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var base = __webpack_require__(24);
	var Config = __webpack_require__(38);
	var BaseModel = base.Model;
	var env = Config.env[Config.scheme];
	
	var Model = BaseModel.extend({
	  url: '{{url_prefix}}/channel/upcoming_list.json',
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

/***/ 87:
/***/ function(module, exports) {

	module.exports = "{{each dateList as val index}}\r\n<dd class=\"program\">\r\n\t<div class=\"date\">\r\n\t\t<div class=\"dot\"></div>\r\n\t\t<div class=\"time\">{{val.title}}</div>\r\n\t</div>\r\n\t<ul class=\"program-oneday-list\">\r\n\t\t{{each val.list as info index}}\r\n\t\t<li class=\"program-oneday-li clearfix\" data-videoid=\"{{info.liveId}}\">\r\n\t\t\t<div class=\"videoBox\">\r\n\t\t\t\t<a href=\"living.html?videoId={{info.liveId}}\"><img src=\"{{info.posterPic}}\" alt=\"\"></a>\r\n\t\t\t\t{{if info.liveType===\"VOD\"}}\r\n\t\t\t\t\t<!-- <span class=\"palytime\"><%=info.T_palytime%></span> -->\r\n\t\t\t\t{{else}}\r\n\t\t\t\t\t<span class=\"live-ico\"></span>\r\n\t\t\t\t{{/if}}\r\n\t\t\t</div>\r\n\t\t\t<div class=\"program-msg\">\r\n\t\t\t\t<a href=\"living.html?videoId={{info.liveId}}\"><h4 class=\"title\">{{info.liveName}}</h4></a>\r\n\t\t\t\t<span class=\"time\">{{info.T_onAirtime}}</span>\r\n\t\t\t</div>\r\n\t\t\t<!-- <div class=\"tips\"></div>\r\n\t\t\t<div class=\"clickBox\">\r\n\t\t\t\t<div class=\"shadow\"></div>\r\n\t\t\t\t<div class=\"erweima\"></div>\r\n\t\t\t</div> -->\r\n\t\t</li>\r\n\t\t{{/each}}\r\n\t</ul>\r\n</dd>\r\n{{/each}}\r\n"

/***/ },

/***/ 88:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var base = __webpack_require__(24);
	var BaseView = base.View;
	var BannerModel = __webpack_require__(89);
	var url = __webpack_require__(83);
	var user = __webpack_require__(59);
	var alertify = __webpack_require__(90);
	var gobal = __webpack_require__(58);
	var loginBox = __webpack_require__(50);
	var Share = __webpack_require__(91);
	var View = BaseView.extend({
	    el: '.channel-detail',
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
	        var urlHASH = url.parseSearch(location.search);
	        this.channelId = urlHASH.channelId;
	    },
	    afterMount: function() {
	        //  获取findDOMNode DOM Node
	        this.loginBox = loginBox();
	        this._dialog = this.loginBox.dialog;
	        this.detailTpl = __webpack_require__(94);
	    },
	    ready: function() {
	        //  初始化
	        this.bannerModel = new BannerModel();
	        //注册方法
	        this.onevent();
	        // 初始化页面
	        this.getDetail();
	
	    },
	    error: function(res) {
	
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
	    getDetail: function() {
	        var self = this;
	        var token = null;
	        if (user.isLogined()) {
	            token = 'web-' + user.getToken()
	        }
	        var promise = this.bannerModel.executeJSONP({
	            channelId: this.channelId,
	            deviceinfo: '{"aid":"30001001"}',
	            access_token: token
	        });
	        promise.done(function(res) {
	            self.renderShare();
	            self.renderDetail();
	        });
	        promise.fail(function() {
	
	        });
	    },
	    onevent: function() {
	
	    },
	    renderShare: function() {
	        var rq_db = this.bannerModel.get('data');
	        var opts = {
	            title: '【' + rq_db.channelName + '】的直播太精彩了！',
	            url: window.location.href,
	            summary: '【' + rq_db.channelName + '】的直播太精彩了！',
	            content: '【' + rq_db.channelName + '】的直播太精彩了！',
	            pic: rq_db.profileImg,
	            channelId: rq_db.channelId,
	            desc: ''
	        };
	        this.share = new Share({
	            el : '.share',
	        });
	        this.share.trigger('events:initAttr',opts);
	    },
	    renderDetail: function() {
	        var html = this.compileHTML(this.detailTpl, this.bannerModel.get('data'));
	        this.$el.append(html);
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

/***/ 89:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var base = __webpack_require__(24);
	var Config = __webpack_require__(38);
	var BaseModel = base.Model;
	var env = Config.env[Config.scheme];
	
	var Model = BaseModel.extend({
	  url: '{{url_prefix}}/channel/detail.json',
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

/***/ 91:
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

/***/ 92:
/***/ function(module, exports, __webpack_require__) {

	var require;var require;/*! * clipboard.js v1.5.12 * https://zenorocha.github.io/clipboard.js * * Licensed MIT © Zeno Rocha */!function(t){if(true)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.Clipboard=t()}}(function(){var t,e,n;return function t(e,n,o){function i(a,c){if(!n[a]){if(!e[a]){var s="function"==typeof require&&require;if(!c&&s)return require(a,!0);if(r)return r(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var u=n[a]={exports:{}};e[a][0].call(u.exports,function(t){var n=e[a][1][t];return i(n?n:t)},u,u.exports,t,e,n,o)}return n[a].exports}for(var r="function"==typeof require&&require,a=0;a<o.length;a++)i(o[a]);return i}({1:[function(t,e,n){var o=t("matches-selector");e.exports=function(t,e,n){for(var i=n?t:t.parentNode;i&&i!==document;){if(o(i,e))return i;i=i.parentNode}}},{"matches-selector":5}],2:[function(t,e,n){function o(t,e,n,o,r){var a=i.apply(this,arguments);return t.addEventListener(n,a,r),{destroy:function(){t.removeEventListener(n,a,r)}}}function i(t,e,n,o){return function(n){n.delegateTarget=r(n.target,e,!0),n.delegateTarget&&o.call(t,n)}}var r=t("closest");e.exports=o},{closest:1}],3:[function(t,e,n){n.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},n.nodeList=function(t){var e=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===e||"[object HTMLCollection]"===e)&&"length"in t&&(0===t.length||n.node(t[0]))},n.string=function(t){return"string"==typeof t||t instanceof String},n.fn=function(t){var e=Object.prototype.toString.call(t);return"[object Function]"===e}},{}],4:[function(t,e,n){function o(t,e,n){if(!t&&!e&&!n)throw new Error("Missing required arguments");if(!c.string(e))throw new TypeError("Second argument must be a String");if(!c.fn(n))throw new TypeError("Third argument must be a Function");if(c.node(t))return i(t,e,n);if(c.nodeList(t))return r(t,e,n);if(c.string(t))return a(t,e,n);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function i(t,e,n){return t.addEventListener(e,n),{destroy:function(){t.removeEventListener(e,n)}}}function r(t,e,n){return Array.prototype.forEach.call(t,function(t){t.addEventListener(e,n)}),{destroy:function(){Array.prototype.forEach.call(t,function(t){t.removeEventListener(e,n)})}}}function a(t,e,n){return s(document.body,t,e,n)}var c=t("./is"),s=t("delegate");e.exports=o},{"./is":3,delegate:2}],5:[function(t,e,n){function o(t,e){if(r)return r.call(t,e);for(var n=t.parentNode.querySelectorAll(e),o=0;o<n.length;++o)if(n[o]==t)return!0;return!1}var i=Element.prototype,r=i.matchesSelector||i.webkitMatchesSelector||i.mozMatchesSelector||i.msMatchesSelector||i.oMatchesSelector;e.exports=o},{}],6:[function(t,e,n){function o(t){var e;if("INPUT"===t.nodeName||"TEXTAREA"===t.nodeName)t.focus(),t.setSelectionRange(0,t.value.length),e=t.value;else{t.hasAttribute("contenteditable")&&t.focus();var n=window.getSelection(),o=document.createRange();o.selectNodeContents(t),n.removeAllRanges(),n.addRange(o),e=n.toString()}return e}e.exports=o},{}],7:[function(t,e,n){function o(){}o.prototype={on:function(t,e,n){var o=this.e||(this.e={});return(o[t]||(o[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){function o(){i.off(t,o),e.apply(n,arguments)}var i=this;return o._=e,this.on(t,o,n)},emit:function(t){var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),o=0,i=n.length;for(o;i>o;o++)n[o].fn.apply(n[o].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),o=n[t],i=[];if(o&&e)for(var r=0,a=o.length;a>r;r++)o[r].fn!==e&&o[r].fn._!==e&&i.push(o[r]);return i.length?n[t]=i:delete n[t],this}},e.exports=o},{}],8:[function(e,n,o){!function(i,r){if("function"==typeof t&&t.amd)t(["module","select"],r);else if("undefined"!=typeof o)r(n,e("select"));else{var a={exports:{}};r(a,i.select),i.clipboardAction=a.exports}}(this,function(t,e){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i=n(e),r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},a=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),c=function(){function t(e){o(this,t),this.resolveOptions(e),this.initSelection()}return t.prototype.resolveOptions=function t(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];this.action=e.action,this.emitter=e.emitter,this.target=e.target,this.text=e.text,this.trigger=e.trigger,this.selectedText=""},t.prototype.initSelection=function t(){this.text?this.selectFake():this.target&&this.selectTarget()},t.prototype.selectFake=function t(){var e=this,n="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return e.removeFake()},this.fakeHandler=document.body.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[n?"right":"left"]="-9999px",this.fakeElem.style.top=(window.pageYOffset||document.documentElement.scrollTop)+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,document.body.appendChild(this.fakeElem),this.selectedText=(0,i.default)(this.fakeElem),this.copyText()},t.prototype.removeFake=function t(){this.fakeHandler&&(document.body.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(document.body.removeChild(this.fakeElem),this.fakeElem=null)},t.prototype.selectTarget=function t(){this.selectedText=(0,i.default)(this.target),this.copyText()},t.prototype.copyText=function t(){var e=void 0;try{e=document.execCommand(this.action)}catch(n){e=!1}this.handleResult(e)},t.prototype.handleResult=function t(e){e?this.emitter.emit("success",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)}):this.emitter.emit("error",{action:this.action,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})},t.prototype.clearSelection=function t(){this.target&&this.target.blur(),window.getSelection().removeAllRanges()},t.prototype.destroy=function t(){this.removeFake()},a(t,[{key:"action",set:function t(){var e=arguments.length<=0||void 0===arguments[0]?"copy":arguments[0];if(this._action=e,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function t(){return this._action}},{key:"target",set:function t(e){if(void 0!==e){if(!e||"object"!==("undefined"==typeof e?"undefined":r(e))||1!==e.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&e.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(e.hasAttribute("readonly")||e.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=e}},get:function t(){return this._target}}]),t}();t.exports=c})},{select:6}],9:[function(e,n,o){!function(i,r){if("function"==typeof t&&t.amd)t(["module","./clipboard-action","tiny-emitter","good-listener"],r);else if("undefined"!=typeof o)r(n,e("./clipboard-action"),e("tiny-emitter"),e("good-listener"));else{var a={exports:{}};r(a,i.clipboardAction,i.tinyEmitter,i.goodListener),i.clipboard=a.exports}}(this,function(t,e,n,o){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function c(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function s(t,e){var n="data-clipboard-"+t;if(e.hasAttribute(n))return e.getAttribute(n)}var l=i(e),u=i(n),f=i(o),d=function(t){function e(n,o){r(this,e);var i=a(this,t.call(this));return i.resolveOptions(o),i.listenClick(n),i}return c(e,t),e.prototype.resolveOptions=function t(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];this.action="function"==typeof e.action?e.action:this.defaultAction,this.target="function"==typeof e.target?e.target:this.defaultTarget,this.text="function"==typeof e.text?e.text:this.defaultText},e.prototype.listenClick=function t(e){var n=this;this.listener=(0,f.default)(e,"click",function(t){return n.onClick(t)})},e.prototype.onClick=function t(e){var n=e.delegateTarget||e.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new l.default({action:this.action(n),target:this.target(n),text:this.text(n),trigger:n,emitter:this})},e.prototype.defaultAction=function t(e){return s("action",e)},e.prototype.defaultTarget=function t(e){var n=s("target",e);return n?document.querySelector(n):void 0},e.prototype.defaultText=function t(e){return s("text",e)},e.prototype.destroy=function t(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)},e}(u.default);t.exports=d})},{"./clipboard-action":8,"good-listener":4,"tiny-emitter":7}]},{},[9])(9)});

/***/ },

/***/ 93:
/***/ function(module, exports) {

	module.exports = "<a href=\"http://v.yinyuetai.com/share/weixin?title={{content}}&url={{url}}\" title=\"分享到微信\" data-video-id=\"{{videoId}}\" data-tongji-id=\"520\" class=\"weixin J_sharelink\" target=\"_blank\"></a>\r\n<a href=\"http://connect.qq.com/widget/shareqq/index.html?showcount=1&desc={{desc}}&summary={{summary}}&site=音悦台&pics={{pic}}&title={{title}}&url={{url}}\" title=\"分享到QQ\" data-video-id=\"{{videoId}}\" data-tongji-id=\"518\" class=\"qq J_sharelink\" target=\"_blank\"></a>\r\n<a href=\"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={{url}}&desc={{content}}&title={{title}}&pics={{pic}}\" title=\"分享到QQ空间\" data-video-id=\"{{videoId}}\" data-tongji-id=\"519\" class=\"qqzone J_sharelink\" target=\"_blank\"></a>\r\n<a href=\"http://v.t.sina.com.cn/share/share.php?appkey=1033972380&url={{url}}&title={{content}}&content=gb2312&pic={{pic}}&ralateUid=1698229264\" title=\"分享到新浪微博\" data-video-id=\"{{videoId}}\" data-tongji-id=\"517\" class=\"weibo J_sharelink\" target=\"_blank\"></a>\r\n<span href=\"javascript:;\" title=\"复制地址\" data-video-id=\"{{videoId}}\" data-tongji-id=\"517\" class=\"jia \" target=\"_blank\" id=\"copyUrlBtn\"  data-clipboard-action=\"copy\" data-clipboard-target=\"#bar\"></span>\r\n<textarea id=\"bar\" style=\"opacity:0;\">{{href}}</textarea>\r\n"

/***/ },

/***/ 94:
/***/ function(module, exports) {

	module.exports = "<div class=\"posterPic\">\r\n    <div class=\"imgCon\">\r\n        <img src=\"{{posterPic}}\" alt=\"\">\r\n    </div>\r\n</div>\r\n<div class=\"detail\">\r\n    <div class=\"bg\" style=\"background-color:{{representativeColor}};\"></div>\r\n    <div class=\"channel_avator\"><img src=\"{{profileImg}}\" alt=\"\"></div>\r\n    <div class=\"channel_name\">{{channelName}}</div>\r\n    <div class=\"channel_desc\">{{desc}}</div>\r\n    <div class=\"followAndvideos\">\r\n        <span class=\"follow\">{{videoCount}}</span>\r\n        <span class=\"videosNum\">{{follow}}</span>\r\n    </div>\r\n    {{if subscribed==true}}\r\n    <div class=\"meet disabled\">已订阅</div>\r\n    {{else}}\r\n    <div class=\"meet meetable\">订阅频道</div>\r\n    {{/if}}\r\n</div>\r\n"

/***/ }

});
//# sourceMappingURL=channel.js.map