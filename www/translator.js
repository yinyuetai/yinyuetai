webpackJsonp([6],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by caoxifeng on 16/4/11.
	 */
	var $ = __webpack_require__(1);
	__webpack_require__(158);
	var MainView = __webpack_require__(160);
	$(function () {
	    // 入口视图
	    var mainView = new MainView();
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

/***/ 126:
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

/***/ 128:
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

/***/ 129:
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

/***/ 130:
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

/***/ 144:
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAXCAYAAACmnHcKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjAyQjUzQzBCMEMzODExRTZBRDkwOTkzMTU3QUZBQUIyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjAyQjUzQzBDMEMzODExRTZBRDkwOTkzMTU3QUZBQUIyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDJCNTNDMDkwQzM4MTFFNkFEOTA5OTMxNTdBRkFBQjIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDJCNTNDMEEwQzM4MTFFNkFEOTA5OTMxNTdBRkFBQjIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7nOTLLAAAH9ElEQVR42sxX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"

/***/ },

/***/ 158:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 160:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var base = __webpack_require__(24);
	var BaseView = base.View;
	var DetailView = __webpack_require__(161);
	var topbar = __webpack_require__(42);
	var gobal = __webpack_require__(58);
	
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
	    var self = this;
	    this.topbar = new topbar();
	    //校验用户权限 1为翻译者
	    gobal.jsonp('/user/opera_role_list.json',{},function (res) {
	        if('0'==res.code){
	            if(~~res.data.operationRoles[0]===1){
	                self.detailView = new DetailView();
	            }else{
	                alert('非翻译人员，需要权限请联系技术人员');
	                window.location.reload();
	            }
	        }
	
	    },function () {
	
	    },true);
	
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

/***/ 161:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var base = __webpack_require__(24);
	var BaseView = base.View;
	var RtmpDetailModel = __webpack_require__(162);
	var url = __webpack_require__(83);
	var FlashApi = __webpack_require__(126);
	var alertify = __webpack_require__(90);
	var gobal = __webpack_require__(58);
	var user = __webpack_require__(59);
	var loginBox = __webpack_require__(50);
	var dealModel = __webpack_require__(117).dealParamsJsonP;
	var ChatView = __webpack_require__(163);
	var View = BaseView.extend({
	    el: '.videoWin',
	    events: {
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
	        this.loginBox = loginBox();
	        this._dialog = this.loginBox.dialog;
	        this.playState = false; //是否开始播放视频;
	        this.bFetchVideo = false; //是否阻止更新更新视频信息;
	        this.rtmpDetailModel = new RtmpDetailModel();
	        this.chatView = new ChatView();
	        this.renderVideo();
	    },
	    afterMount: function() {
	        //  获取findDOMNode DOM Node
	        this.videoWin = __webpack_require__(165);
	    },
	    ready: function() {
	        //  初始化
	        var self = this;
	        this.DetailPromise = dealModel(this.rtmpDetailModel, {
	            videoId: this.videoId
	        }, true);
	        window.flashApi = new FlashApi({
	            el: 'flashBox',
	            props: {
	                src: '../../../flash/RTMPInplayer.swf',
	                width: 808,
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
	                var status = self._dialog.status();
	                self.chatView.trigger('events:setChatroomId',rq_db);
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
	        this.listenTo(this.rtmpDetailModel, 'change', function() {
	            if (!user.isLogined()) return;
	            var rq_db = this.rtmpDetailModel.get('data');
	            var rq_status = this.rtmpDetailModel.get('msg');
	            if (rq_status !== 'SUCCESS') return;
	            if (rq_db.failureType === 'NONE') {
	                //有播放的权限
	                self.loadVideo();
	            } else if (rq_db.failureType === 'NOTLOGIN') {
	                //涉及登陆的问题
	                this.bFetchVideo = true;
	                //由于游客问题~这边不作处理,在全局做限制
	            } else if (rq_db.failureType === 'CHARGE') {
	                this.bFetchVideo = true;
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
	                            var promise = dealModel(self.rtmpDetailModel, {
	                                videoId: self.videoId
	                            }, true);
	                            promise.done(function(res) {
	                                console.log(res);
	                            });
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
	        rq_db = this.rtmpDetailModel.get('data');
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
	
	    beforeDestroy: function() {
	        //  进入销毁之前,将引用关系设置为null
	    },
	    destroyed: function() {
	        //  销毁之后
	    }
	});
	module.exports = View;


/***/ },

/***/ 162:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var base = __webpack_require__(24);
	var Config = __webpack_require__(38);
	var BaseModel = base.Model;
	var env = Config.env[Config.scheme];
	
	var Model = BaseModel.extend({
	    url: '{{url_prefix}}/video/detail_byrtmp.json',
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

/***/ 163:
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
	    el: '.common_con',
	    model: chatModel,
	    events: {
	        'keydown .win': 'clockSendMsg',
	        'input .win': 'countMsg',
	        'click .button': 'clickSendMsg',
	        'click .preListCon .item': 'clickPreSend'
	    },
	    rawLoader: function () {
	        return '';
	    },
	    context: function (args) {
	        console.log(args);
	    },
	    beforeMount: function () {
	        //  初始化一些自定义属性
	        this.chatroomIds = [];
	        this.bInit = false;
	        this._txt = this.$el.find('.win');
	        this._name = $('.articleName');
	        this._countNow = this.$el.find('.countInput .now');
	        this.commentList = this.$el.find('.commentList');
	        this._con = this.$el.find('.comment_con');
	    },
	    afterMount: function () {
	        //  获取findDOMNode DOM Node
	        this.preChatItemTpl = __webpack_require__(164);
	    },
	    ready: function () {
	        //  初始化
	        var self = this;
	        this.onEvents();
	        this.listenTo(chatModel, 'change', this.renderChat)
	    },
	    onEvents: function () {
	        var self = this;
	        this.on('events:setChatroomId', function (attr, isTranslator) {
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
	            }, function (res) {
	                self.bInit = res;
	            })
	            var timer = setInterval(function () {
	                if (self.bInit) {
	                    // self.applyGround();
	                    clearInterval(timer);
	                }
	            }, 1000);
	        });
	        this.on('events:syncMsg', function () {
	            this.syncMsg();
	        });
	        this.on('events:preTranslator', function () {
	            this.preTranslator();
	        });
	    },
	    beforeDestroy: function () {
	        //  进入销毁之前,将引用关系设置为null
	    },
	    destroyed: function () {
	        //  销毁之后
	    },
	    syncMsg: function () {
	        chatModel.set(chat.chatItems);
	    },
	    preTranslator: function () {
	        chatModel.clear();
	        chatModel.set(chat.msgCon);
	    },
	    clickSendMsg: function () {
	        this.sendMsg();
	    },
	    //回车发送消息
	    clockSendMsg: function (e) {
	        if (e.keyCode == 13) {
	            this.sendMsg();
	            return false;
	        }
	    },
	    clickPreSend: function (e) {
	        var $this = $(e.currentTarget);
	        var txt = $this.find('.con').html();
	        chat.sendTMsg(txt);
	        // $this.remove();
	    },
	    renderChat: function () {
	        var preTranslator = chatModel.get('preTranslator');
	        if (preTranslator != undefined) {
	            var html = this.compileHTML(this.preChatItemTpl, {list: preTranslator});
	            $('.preListCon .list').html(html);
	            $('.preListCon').show();
	        }
	    },
	    sendMsg: function () {
	        var self = this;
	        var txt = this._txt.val();
	        if (txt === '') {
	            alertify.error('亲~消息不能为空');
	            return;
	        }
	        if (this._name.val() !== '') {
	            txt = this._name.val() + ':' + txt;
	        }
	        this._txt.val('');
	        this._countNow.html(0);
	        chat.sendTMsg(txt);
	    },
	    countMsg: function (e) {
	        var $this = $(e.currentTarget);
	        this._countNow.html($this.val().length);
	    },
	});
	
	module.exports = View;


/***/ },

/***/ 164:
/***/ function(module, exports) {

	module.exports = "{{each list as item index}}\r\n<li class=\"item\" data-id=\"{{item.videoId}}\" data-index={{index}}>\r\n    <span>点击发送</span><div class=\"con\">{{item.content}}</div>\r\n</li>\r\n{{/each}}\r\n"

/***/ },

/***/ 165:
/***/ function(module, exports) {

	module.exports = "<div class=\"videoMsg\">\r\n\t<div class=\"videoMsg_con clearfix\">\r\n\t\t<div class=\"channel_avator\">\r\n\t\t\t<img src=\"{{channel.profileImg}}\" alt=\"\">\r\n\t\t</div>\r\n\t\t<div class=\"channel_detail\">\r\n\t\t\t<div class=\"video_name clearfix\">\r\n\t\t\t\t<h3>{{videoName}}</h3>\r\n\t\t\t\t{{if videoType===\"LIVE\"}}\r\n\t\t\t\t<img src=\"{{liveLog}}\" alt=\"\" class=\"liveLog\">\r\n\t\t\t\t{{/if}}\r\n\t\t\t</div>\r\n\t\t\t<div class=\"channel_name\">{{channel.channelName}}</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n"

/***/ }

});
//# sourceMappingURL=translator.js.map