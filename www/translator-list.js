webpackJsonp([7],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by caoxifeng on 16/4/11.
	 */
	var $ = __webpack_require__(1);
	__webpack_require__(166);
	var MainView = __webpack_require__(167);
	$(function () {
	    // 入口视图
	    var mainView = new MainView();
	});


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

/***/ 166:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 167:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var base = __webpack_require__(24);
	var BaseView = base.View;
	var topbar = __webpack_require__(42);
	var LiveList = __webpack_require__(168);
	
	var View = BaseView.extend({
	  el: '',
	  rawLoader: function () {
	    return '';
	  },
	  context: function (args) {
	    console.log(args);
	  },
	  beforeMount: function () {
	    //  初始化一些自定义属性
	    this.topbar = new topbar();
	    this.liveList = new LiveList();
	  },
	  afterMount: function () {
	    //  获取findDOMNode DOM Node
	  },
	  ready: function () {
	    //  初始化
	  },
	  beforeDestroy: function () {
	    //  进入销毁之前,将引用关系设置为null
	  },
	  destroyed: function () {
	    //  销毁之后
	  }
	});
	
	module.exports = View;


/***/ },

/***/ 168:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var base = __webpack_require__(24);
	var BaseView = base.View;
	var LivelistModel = __webpack_require__(169);
	var dealModel = __webpack_require__(117).dealParamsJsonP;
	
	var View = BaseView.extend({
	    el: '.con',
	    rawLoader: function() {
	        return '';
	    },
	    context: function(args) {
	        console.log(args);
	    },
	    beforeMount: function() {
	        //  初始化一些自定义属性
	        this.livelistModel = new LivelistModel();
	    },
	    afterMount: function() {
	        //  获取findDOMNode DOM Node
	        this.liveListItem = __webpack_require__(170);
	    },
	    ready: function() {
	        //  初始化
	        var self = this;
	        var home_list_params = {
	            videoType: 1,
	            sortType: 1,
	            offset: 0,
	            size: 30,
	        };
	        var promise = dealModel(this.livelistModel, home_list_params);
	        promise.done(function(res) {
	            self.renderLiveList(res);
	        });
	    },
	    beforeDestroy: function() {
	        //  进入销毁之前,将引用关系设置为null
	    },
	    destroyed: function() {
	        //  销毁之后
	    },
	    renderLiveList : function (res) {
	        var html = this.compileHTML(this.liveListItem, res.data);
	        this.$el.append(html);
	    }
	});
	
	module.exports = View;


/***/ },

/***/ 169:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var base = __webpack_require__(24);
	var Config = __webpack_require__(38);
	var BaseModel = base.Model;
	var env = Config.env[Config.scheme];
	
	var Model = BaseModel.extend({
	    url: '{{url_prefix}}/video/list.json',
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

/***/ 170:
/***/ function(module, exports) {

	module.exports = "{{each videos as val}}\r\n<tr>\r\n\t<td>{{val.channel.channelName}}</td>\r\n\t<td>{{val.videoName}}</td>\r\n\t<!-- //&channelid=<%=val.channel.channelId%>&videoType=<%=val.videoType%> -->\r\n\t<td><a target=\"_blank\" href=\"/translator-pre.html?videoId={{val.videoId}}\">点击跳转翻译(提前)</a></td>\r\n\t<!-- //&channelid=<%=val.channel.channelId%>&videoType=<%=val.videoType%> -->\r\n\t<td><a target=\"_blank\" href=\"/translator.html?videoId={{val.videoId}}\">点击跳转翻译</a></td>\r\n\t<td>{{val.T_onAirStartTime}}</td>\r\n</tr>\r\n{{/each}}\r\n"

/***/ }

});
//# sourceMappingURL=translator-list.js.map