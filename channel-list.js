webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by caoxifeng on 16/4/11.
	 */
	var $ = __webpack_require__(1);
	__webpack_require__(95);
	var MainView = __webpack_require__(98);
	$(function () {
	    // 入口视图
	    var mainView = new MainView();
	});


/***/ },

/***/ 95:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 98:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var base = __webpack_require__(24);
	var BaseView = base.View;
	var ChannelItem = __webpack_require__(99);
	var topbar = __webpack_require__(42);
	
	var View = BaseView.extend({
	  el: '',
	  rawLoader: function () {
	    return '';
	  },
	  context: function (args) {
	  },
	  beforeMount: function () {
	    //  初始化一些自定义属性
	  },
	  afterMount: function () {
	    //  获取findDOMNode DOM Node
	  },
	  ready: function () {
	    //  初始化
	    var channelItem = new ChannelItem();
	    new topbar();
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

/***/ 99:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var base = __webpack_require__(24);
	var BaseView = base.View;
	var gobal = __webpack_require__(58);
	var Config = __webpack_require__(38);
	var env = Config.env[Config.scheme];
	var ChannelItemModel = __webpack_require__(100);
	var user = __webpack_require__(59);
	var loginBox = __webpack_require__(50);
	var View = BaseView.extend({
	    el: '.channel-list',
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
	        this.loginBox = loginBox();
	        this._dialog = this.loginBox.dialog;
	        this.channelItemModel = new ChannelItemModel();
	    },
	    afterMount: function() {
	        //  获取findDOMNode DOM Node
	
	        this.channelItemTpl = __webpack_require__(101);
	    },
	    ready: function() {
	        //  初始化
	
	        var promise = this.channelItemModel.executeJSONP({
	            order: 'FOLLOW',
	            offset: 0,
	            size: 20,
	            deviceinfo: '{"aid":"30001001"}',
	        });
	        var self = this;
	        promise.done(function(res) {
	            if (res.msg === "SUCCESS") {
	                self.renderChannelList();
	            }
	        });
	        promise.fail(function(res) {
	            console.log(res);
	        });
	    },
	    renderChannelList: function() {
	        var channelItem = this.compileHTML(this.channelItemTpl, { channels: this.channelItemModel.get('data') });
	        this.$el.append(channelItem);
	    },
	    beforeDestroy: function() {
	        //  进入销毁之前,将引用关系设置为null
	    },
	    subscribe: function(e) {
	        var status = this._dialog.status();
	        if (!user.isLogined()) {
	            if (status == 'hide') {
	                this._dialog.trigger('show');
	            } else {
	                this._dialog.trigger('hide');
	            }
	            return false;
	        }
	        var _program = $(e.currentTarget.parentElement.parentElement.parentElement),
	            channelId = _program.attr('data-channelid'),
	            $meets = $(e.currentTarget);
	        var subscribe_params = { channelId: channelId };
	        gobal.jsonp('/channel/subscribe.json',subscribe_params,function(res) {
	            if (res.msg === "SUCCESS") {
	                $meets.removeClass('meetable').addClass('disabled').html('已订阅');
	            }
	        }, function() {
	
	        },true);
	    },
	    unsubscribe: function(e) {
	        var _program = $(e.currentTarget.parentElement.parentElement.parentElement),
	            channelId = _program.attr('data-channelid'),
	            $meets = $(e.currentTarget);
	        var subscribe_params = { channelId: channelId };
	        gobal.jsonp('/channel/unsubscribe.json',subscribe_params,function(res) {
	            if (res.msg === "SUCCESS") {
	                $meets.removeClass('disabled').addClass('meetable').html('订阅频道');
	            }
	        }, function() {
	
	        },true);
	    },
	    destroyed: function() {
	        //  销毁之后
	    }
	});
	
	module.exports = View;


/***/ },

/***/ 100:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var base = __webpack_require__(24);
	var Config = __webpack_require__(38);
	var BaseModel = base.Model;
	var env = Config.env[Config.scheme];
	
	var Model = BaseModel.extend({
	  url: '{{url_prefix}}/channel/pc_list.json',
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

/***/ 101:
/***/ function(module, exports) {

	module.exports = "{{each channels as item index}}\r\n<li class=\"channel-li\" data-channelId=\"{{item.channelId}}\">\r\n  <div class=\"channel\"><a href=\"channel.html?channelId={{item.channelId}}\">\r\n      <div class=\"tit\"><img src=\"{{item.posterPic}}\" alt=\"\"/></div></a>\r\n    <div class=\"avator\"><a href=\"channel.html?channelId={{item.channelId}}\"><img src=\"{{item.profileImg}}\" alt=\"\"/></a></div>\r\n    <div class=\"channel-detail\">\r\n      <div class=\"channel_name\">{{item.channelName}}</div>\r\n      <div class=\"clearfix detail\"><span class=\"channel_play\">{{item.videoCount}}</span><span class=\"channel_online\">{{item.follow}}</span></div>\r\n      {{if item.subscribed===true}}\r\n      <div class=\"meet disabled\">已订阅</div>\r\n      {{else}}\r\n      <div class=\"meet testLogin meetable\">订阅频道</div>\r\n      {{/if}}\r\n    </div>\r\n  </div>\r\n</li>\r\n{{/each}}\r\n"

/***/ }

});
//# sourceMappingURL=channel-list.js.map