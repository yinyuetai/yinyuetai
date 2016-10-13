webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by caoxifeng on 16/4/11.
	 */
	var $ = __webpack_require__(1);
	__webpack_require__(2);
	var MainView = __webpack_require__(23);
	$(function () {
	    // 入口视图
	    var mainView = new MainView();
	});


/***/ },

/***/ 2:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 23:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var base = __webpack_require__(24);
	var BaseView = base.View;
	var ItemView = __webpack_require__(37);
	var topbar = __webpack_require__(42);
	
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
	        var itemView = new ItemView();
	        new topbar();
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

/***/ 37:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var base = __webpack_require__(24);
	var BaseView = base.View;
	
	var Config = __webpack_require__(38);
	var toolsDate = __webpack_require__(39);
	var env = Config.env[Config.scheme];
	var ItemModel = __webpack_require__(40);
	var View = BaseView.extend({
	    el: '.program-list',
	    rawLoader: function() {
	        return '';
	    },
	    context: function(args) {
	    },
	    beforeMount: function() {
	        //  初始化一些自定义属性
	        this.calendarDataList = [];
	        this.dataIndex = 0;
	        this.nowTime = '今日';
	        this.bScoll = true;
	    },
	    afterMount: function() {
	        //  获取findDOMNode DOM Node
	        this.calendarItemTpl = __webpack_require__(41);
	    },
	    ready: function() {
	        //  初始化
	        var self = this;
	        this.itemModel = new ItemModel();
	        var promise1 = this.itemModel.executeJSONP({
	            order: 'FOLLOW',
	            offset: 0,
	            size: 9,
	            deviceinfo: '{"aid":"30001001"}',
	        });
	        promise1.done(function(res) {
	            self.serializelist();
	        });
	        promise1.fail(function(res) {
	            console.log(res);
	        });
	        this._events();
	    },
	    serializelist: function() {
	        var self = this;
	        if (this.itemModel.get('msg') == 'SUCCESS') {
	            var data = this.itemModel.get('data');
	            if (data.size < 9) {
	                this.BScroll = false;
	            }
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
	            this.render();
	        }
	    },
	    render: function() {
	        console.log(this.calendarDataList);
	        if(this.calendarDataList[0]==undefined){
	            this.dataIndex--;
	            this.calendarDataList.shift();
	        }
	        var calendarHtml = this.compileHTML(this.calendarItemTpl, {
	            dateList: this.calendarDataList
	        });
	        this.$el.html(calendarHtml);
	
	    },
	    _events: function() {
	        var self = this;
	        var i = 0;
	        function load() {
	            if (!self.bScoll) return;
	            var $windowScrollTop = $(window).scrollTop();
	            var $windowHeight = $(window).height();
	            var $documentHeight = $(document).height();
	            if (($windowScrollTop + $windowHeight) == $documentHeight) {
	                i++;
	                var promise1 = self.itemModel.executeJSONP({
	                    order: 'FOLLOW',
	                    offset: i * 9,
	                    size: 9,
	                    deviceinfo: '{"aid":"30001001"}',
	                });
	                promise1.done(function(res) {
	                    if(res.code==0&&res.data.schedules.length==0){
	                        self.bScoll=false;
	                    }
	                    self.serializelist();
	                });
	                promise1.fail(function(res) {
	                    console.log(res);
	                });
	                $(window).scrollTop($documentHeight);
	            }
	        }
	        $(window).on('scroll', function() {
	            load();
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

/***/ 40:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var base = __webpack_require__(24);
	var Config = __webpack_require__(38);
	var BaseModel = base.Model;
	var env = Config.env[Config.scheme];
	
	var Model = BaseModel.extend({
	  url: '{{url_prefix}}/upcoming/list.json',
	  beforeEmit: function beforeEmit() {
	    // 给请求地址替换一下环境变量
	    if (/^\{{0,2}(url_prefix)\}{0,2}/.test(this.url)) {
	      this.url = this.url.replace('{{url_prefix}}', env.url_prefix);
	    }
	  },
	  // formatter : function (response) {
	  //   response.test = 1;
	  //   console.log(response);
	  //   return response;
	  // }
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

/***/ 41:
/***/ function(module, exports) {

	module.exports = "{{each dateList as val}}\r\n<dd class=\"program\">\r\n\t<div class=\"date\">\r\n\t\t<div class=\"dot\"></div>\r\n\t\t<div class=\"time\">{{val.title}}</div>\r\n\t</div>\r\n\t<ul class=\"program-oneday-list\">\r\n\t\t{{each val.list as info}}\r\n\t\t<li class=\"program-oneday-li clearfix\" data-videoid=\"{{info.liveId}}\">\r\n\t\t\t<div class=\"videoBox\">\r\n\t\t\t\t<a href=\"living.html?videoId={{info.liveId}}&channelId={{info.channel.channelId}}\"><img src=\"{{info.posterPic}}\" alt=\"\"></a>\r\n\t\t\t\t{{if info.liveType===\"VOD\"}}\r\n\t\t\t\t\t<!-- <span class=\"palytime\"><%=info.T_palytime%></span> -->\r\n\t\t\t\t{{else}}\r\n\t\t\t\t\t<span class=\"live-ico\"></span>\r\n\t\t\t\t{{/if}}\r\n\t\t\t</div>\r\n\t\t\t<div class=\"program-msg\">\r\n\t\t\t\t<a href=\"living.html?videoId={{info.liveId}}&channelId={{info.channel.channelId}}\"><h4 class=\"title\">{{info.liveName}}</h4></a>\r\n\t\t\t\t<span class=\"time\">{{info.T_onAirtime}}</span>\r\n\t\t\t</div>\r\n\t\t\t<!-- <div class=\"tips\"></div>\r\n\t\t\t<div class=\"clickBox\">\r\n\t\t\t\t<div class=\"shadow\"></div>\r\n\t\t\t\t<div class=\"erweima\"></div>\r\n\t\t\t</div> -->\r\n\t\t</li>\r\n\t\t{{/each}}\r\n\t</ul>\r\n</dd>\r\n{{/each}}\r\n"

/***/ }

});
//# sourceMappingURL=calendar.js.map