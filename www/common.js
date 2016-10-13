/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		9:0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);
/******/
/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;
/******/
/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + ({"0":"calendar","1":"channel","2":"channel-list","3":"index","4":"living","5":"searchresult","6":"translator","7":"translator-list","8":"translator-pre"}[chunkId]||chunkId) + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ function(module, exports) {

	module.exports = window.jQuery;

/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAA+CAYAAACGPyP0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkZCOEMwQTgzMTY5NDExRTZBOEM3QjM1MjAxMkIyOEVFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkZCOEMwQTg0MTY5NDExRTZBOEM3QjM1MjAxMkIyOEVFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RkI4QzBBODExNjk0MTFFNkE4QzdCMzUyMDEyQjI4RUUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RkI4QzBBODIxNjk0MTFFNkE4QzdCMzUyMDEyQjI4RUUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4F2PzpAAAM60lEQVR42sRa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"

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAVCAYAAABCIB6VAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkZDMjIzNjU0MEQxOTExRTZCRTBGQ0IwQUZGRjEyNTVEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkZDMjIzNjU1MEQxOTExRTZCRTBGQ0IwQUZGRjEyNTVEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RkMyMjM2NTIwRDE5MTFFNkJFMEZDQjBBRkZGMTI1NUQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RkMyMjM2NTMwRDE5MTFFNkJFMEZDQjBBRkZGMTI1NUQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7eUc2aAAAB4ElEQVR42pTV30uTURzH8edRSrZaS/TCYhOyAqHRRSDbbsLBkAhNgryquy76A6J/obsuo4vAm26DpBAhIpW8WSWIsaC2IdiUMbqwH4421h7fB77K1+P2+OwLLziT7/n4PGfnnLme5zlWnUUK07iOOBoo4S0WsIq641cmWElj3vOvJp5ixJp7iP5wC9sqoIES1rCOTesfrODKccFj2FKT8ngkE0OIIIUnKKu+DxjqFBzFgmp+5/ckuInvqv8xTrYLNo0tafqCS35rJ6awI3O+4ard0yPfvot/eIGic3yZ3fFaxheRthtMcFLGFcw7waouvU30IoETdnBcxr9QcIJXGTUZR9FnB7v7WxqtLoJ1r6tyDoIrMj6NC10En8MpGf+R03koOCfj87gRMDSMrKyvedP8kSPO1riN/7J1PiIWYLtlUZU5X3Gt3T4ewJLa8C8x7BOaxGfV/xxupyOdwU/rqN7FZfRjEAk8RMG6Mz5h3O8Suqdez5PlyeEV3sip1LWrxkU5jW2DjUlrWTqVef07WFR/+4GZTsGOrO8DedIN1PBbvqRZCTwjvaNYVuEV3EfYbfMLsl8DIiRbahdV2bO6RvAME/L5LzJOgK0VhLmT59Q1GvF74m4rhjG8N/fOngADAL38sEU/EM3DAAAAAElFTkSuQmCC"

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkIzOEE4MzYyMEQxQTExRTZBNTJGQzUyNTc4OTNBOEU0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkIzOEE4MzYzMEQxQTExRTZBNTJGQzUyNTc4OTNBOEU0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjM4QTgzNjAwRDFBMTFFNkE1MkZDNTI1Nzg5M0E4RTQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjM4QTgzNjEwRDFBMTFFNkE1MkZDNTI1Nzg5M0E4RTQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5I0e3pAAABm0lEQVR42qSVy0tCQRTG773Zg+wF0QN3FW4CJRdhFhTYIpfRrj+lfybosWhVRptqE0hR7cKgjWE76UGgpEX0sO/ENzAMc69aB344zjnnY5w55+jW63XHYr1gDERBBIS5XwMlUAB34MVMdC2CMTAHRp1guwdn4NpP0AWLFHOd5kyST8EJ+DYFl0DK+ZudgyNZeNrPVGJv4KMJEYl55TpFjV9BufB5LTAH1kE1QKzGmJy2Jxo9IjgBhjTHDAiBTVCxiFXoa2OsMtEY91gauvWDVdAFNkBZ85Up1sGYASM36rHOTOtmgohvUUjYBn30hS15EXnlNSw6fe7qHWTBI78Pg+WgeK/BS0piAjyTRICYo1456DVvecIkyXLPz6oh9uagxXkDdsE0i14dYAesgElLTinERo8Zjjw4ALMgre2LcDvYA58gbuQVRLAInrRavKLYglHwytKs03327xT3RaOo7lCv+C+Q8RHTuyLDWL3DqvpwyBiV34pdgEOHR1d2zM9ki+PrUsu1Dtg4Z+JIA7EHDth8o4n9r7+AHwEGAJeZb4RSWwa8AAAAAElFTkSuQmCC"

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAYAAACo29JGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4QUU2MjA5RjUyNEYxMUU2QUJBMUVDRThGNDU0QkVEQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4QUU2MjBBMDUyNEYxMUU2QUJBMUVDRThGNDU0QkVEQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjhBRTYyMDlENTI0RjExRTZBQkExRUNFOEY0NTRCRURCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjhBRTYyMDlFNTI0RjExRTZBQkExRUNFOEY0NTRCRURCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+IyuwLQAACG5JREFUeNrMWmlwFEUU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"

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "images/ghs.png";

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = "data:image/gif;base64,R0lGODlhKAAwANX/AP//////AP/88P/54P/20P/zwP/vsP/soP/pkP/mgP/icP/iAP/fYP/cUP/ZQP/VMP/SIP/SAP/PEP/PAP/MAP/FAP+/AP+yAP+oAP+lAP+iAP+ZAP+PAP+MAP9/AP9yAP9pAP9mAP9fAP9ZAP9MAP8/AP88AP8zAP8vAP8sAP8mAP8fAP8ZAP8PAP8MAP8AAAAAAMDAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADEALAAAAAAoADAAQAb/wJhwSCwaj8jkcDKxfFavqHQ6XYUwzIOSOUUtoFQVs0V9iQJU5nFcLjFVZVGTXFYrJRMQlZSZhKIbFh5wU24TSndMFiJTKhdMFYiSRQgPTJcVEwqTRwkVFSdTIhghUBxMHi8qHhehUmITDkgMFSVlZSonJyi3L3QvJ3ZGDhV/ZhkfExi8tyIRExwWhMGHnKi9ZSRMCJyTlhUSWt3j5OUJEp9NIGBRqxYT6ZvjeIRUK7q6v2nVSPAXtlI8fKBCjUqLDSQKYREmBA+YEiLwSTxxasKGifhKsGO4hEMUCxtCihR5yeJIkRk8vvhQgUE/lSEAYgGBUdepVC9CJHwBIlai/50vSFgg0ULESA4ciIKw4OrFCo5JGMzB1svDBAnlYiRgskEfFTkVZGUdVrIk1rFo06pdK0QBkwfi2AoxQCsTNBIksNiFO9YBvEwIsbUgUfFtNwQVcFLtJSLsJLcZ7Il4VzYDUSpWHyihNQHoCw4ffmmbANDpBkZSRms2wmWKh8h1JpRZMTRNhbhCWkdZwWwPvNJUsxSR6ur1yZMcjosUFIWakQPFFr/oMwE2VW1ni0y4EMVDiO/fH20AD/5RBvIgAG6owM2IVNSPysqfv7051CUToLS4sAIW+f8VPHOPdY8gEgF33aFywRNVeLDBKRUAtYEmiByw3S8qZECKPioItUFBPZ+1ZM0ETUknxX4TtMcJHtaZKAc/40A3gWLYjCbWWFJVB2IULVjlE1uWcKVCjyUZINcQCMCDiUtHHoFbk00GAQA7yqXuscHjLqxChd6IqBnwjMwgyhaJ5kPJlRiEAYb5glxiRBfOCNDAdQjiMoAUzgAEwhKGOARGgzrsYKGF8zBw4YY7zPMBhzvsd4U0sBkyAQMpRPeOFGHxs8MljL2THw6IMJDBGUO1p+MBl5Cg448qTPUBkDGCxUBVETLQBP+BV8zgwoWhgLhhhhcalRQDJZiUZAwrXcEECUzF96GUFjrGgGYkJBZMc4jgwwGOuYn14kxkWkhCAQyQcIU8zxBxCZKHCPgFVxoQYaaI79DA45l5PeNYCbQkwtsIZfQ5zjzuuQOFY1MxICJJ3DGSD5NXEBHMEVVQRMKG0sxQhRM8qvaMCwEBeMhPLQj1DBMaFHpFFURsSART0WiAaHw0MrKAgBMSBdBLTMQ4xRHAgBQjXAyAoOUiP3FAhRZR3SCNXVe8qMEN1z4zJ3oEMWADGW95M0W6I13CQqQMXaKSePDM4wGgjvyUQRPN8usYBmldY2MUBa/HHISdYJQLw+HlxMJntpwgwEoTYcTLT04oYNxJQzYOQcZWc021Uy2FkOyuGVyclmHILBuiMTpRjIHynH2JXDMaEjt0BhhZMJEhBjXg+3OSrPywQigeJLw0Ii6LwoKtUwdKDhBKZ63IczBg7fXYZJdttiGBAAA7"

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "images/loginbox.png";

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGsAAAAfCAYAAADgDDPbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk1RUFGNTI3NTg3RTExRTZCMDBEQjBBQTZBRkUwODU2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk1RUFGNTI4NTg3RTExRTZCMDBEQjBBQTZBRkUwODU2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTVFQUY1MjU1ODdFMTFFNkIwMERCMEFBNkFGRTA4NTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTVFQUY1MjY1ODdFMTFFNkIwMERCMEFBNkFGRTA4NTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7t5SMLAAAHbklEQVR42uxa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"

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGsAAAAfCAYAAADgDDPbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQwMzFCNTBFNTg3RTExRTY5NkE4QzU1NEE0MkUzRTQ3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQwMzFCNTBGNTg3RTExRTY5NkE4QzU1NEE0MkUzRTQ3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDAzMUI1MEM1ODdFMTFFNjk2QThDNTU0QTQyRTNFNDciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RDAzMUI1MEQ1ODdFMTFFNjk2QThDNTU0QTQyRTNFNDciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5Tvq1aAAAHXElEQVR42uxa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"

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAMAAABOo35HAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxQzY2MjM4OEU3OUZFMTExOUIzOEZBNDgwRjI4MDU0QiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBMjgxREFCODA4NEQxMUUyOUQ2NkYxNDUzM0U5NkE3MyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBMjgxREFCNzA4NEQxMUUyOUQ2NkYxNDUzM0U5NkE3MyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1LjEgV2luZG93cyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjEyNjJGMjg4QkIwN0UyMTE5MkQ2RDQ0RUU4NTZDMUNEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjFDNjYyMzg4RTc5RkUxMTE5QjM4RkE0ODBGMjgwNTRCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+UpnBBAAAAwBQTFRFmZmZujVfnLRsy9W83uvHyUh4ky5TipN7gYGBZ5cB5XCmvTtmbGxs0drEaJEibZQMbJMUaJkCrcOD3t3deasEcqUC3GKWjas4xdCzkzBVuM2TqMVt3mSbsy1W4WmdjSdKapIcdnZ27vPj5e7TqKiow0Ju4u/OYY0CtjFambtV5OTkwc6te58c3OnFR2kBdptB1eDDbpQHWoQBdqQc1lmNe6cjysrKs8iMztfAorl0enp6iiZLj4+PZZEC8vXs6urqvdGZbqAC0tHRz87O3H+rXokCdacEzU+CfKYclK5ibZ0CtS1Wbp4NnKSQ1eK+7u7u0FCC2tnZ19bW5nSmx8bGcKIDjCZMaZUDaJsD4uLitDBU+Przd6gEu9KOUnkBgasuZpkA+fn5////Z5sAaZwAdakDe7AEeKwDd6sDeq4Dc6cCZpAsb5UCfbEE8fHx7/nh4e3J7vjf/f398vLy8PDw8fvla50GbaAJcaQNdKgAea4CbKABb6MAdqoAbqIBdacQd6wBZ5oBbaEAcaQCeasUa54Aa54BcqYAfbAYb6MCdKgCeq8Df7QEe7ACea0DdqoDfLEEfrIEfrMEcKQCgLQE+Pj49fX1/Pz86PTW9/f36fLW5vLT6/bc4+/N5vHR8Prk4+7M6/bb4/DQ4e7M8/zo7fXd5/PV7Pfe4O3J6vXa/v7++/v7+vr69PT09vb28Prj6PPX4O7L4e7K8/Pz5fHR8vvn5fDR7ffd8Pfj6fTY6vXZ9PrpkKpc9P3pwNSe8vvmxMPD0t294uHh8vzn3+zI2+XAaJEn1FeJ53KmZ5EptC5T4ODg0E6Dxdelb6AD5+fnaoM311+U5/HbkC5UkChK8fvmsLueWXgZeKcEZpYN8PXnu7u7xM+wzVCDyMfH8frlaJMDyNO3vsqqs7+h4m6i09zId6cCV4ABxD9vzd2zbaAB3Nvb3d/a4nCj4nGn43Sn0t64zMvLf7MEl7Bm1NPTqL58tS9Ypbx54OfR4uzP4OrK6/LejbNBkbVH4uvO////auxZFgAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAbdSURBVHja7Nt5VBVVHMBxRDOVxS1RVIRU3A0URQQNUUFFwR3JBZP2Is1S21fa9w1ttd3Mdltst0URxC1x1xQ1NZfKNW193RmDBHy8w2+u5o3v98B7f8y575z5nJl5M+/OeLnMKGvp18KWZqnh8+tnOK7+fC9DsNpMTRc2tY0a3m77A47b3s4UrLxZ4vLU8IzrNJRhDNaV4iysDrdoqIMpWHXlWHUtrBs1ZA7WNHE21rUaMgZr9+vidqvhNe/SUE1TsAa/IW6whXWDhk4GVnBKSkpwsPoLDo6JKb04JSUmJXiFWrYi5niLC7HGibOxbtPQScAK7F3j33oHllxcNejYqrr7lCFyrCFqeK07NFSrGFZe8+bj3a/1b40arZNgfZ+T81PO0J+H5tTIyfmxNNbIoIUjg4JG9levC/u7x8oSZ2Odr6HiWLt9fatNcrvW7QekjnWv5eV17NuxWI2bpKc3sVJvjUth5bf6JT29lZX15hbr4FviDlpY52moOJYrT2kNdL9pKa2m7rG8il6LY30bkJ4+KyBAvaYHBOSX2rIqVVILKv3zmu/u43u+Ka6nhXWuhkpgudqc6Rsd61arWURq5+VlaR3HyhW4oFMnBWH/d1pQejf08fFRi+x/Hx+3W1bPq8RZWCE6sEJKrpyltbRMrWZlaB3HyhXYZ9GiQfYl7aDvBvUpvRuGhv4Qai8OVbndsnqNF9frhGG5Bkb7Rrs/WjftnNrZVfaeWGrTOc1KYdjvVcu5uAhrkjgb61YNlcZSm1YZpxPNIga0LueW5WHTyS97wytsnxxrnxrun6oh/5Jrd46yynJr9ZeyGlXOY5aHg5KHQ1phkfLdMNLCmqKhkliW1TS3Vr9GTGk9rbzfhh6+7jx8WRZhyQ/wNtbVGiqB1Sbat9u4svbBP0eV+zzLw4mUh9Owwja+J26jGp59jYayi61bbDXfbu73wd/HDvhjVPnP4D2cons4wS9s2FRxwyysmzVUHGv8+vVlXO6sGzNGcrnj4eLPw6VjEdaT4iys3Ns1lHsSfnXw8LOChx8lCo9ZsdLr6FjrmBUWcbfjIsJM+T1rYOSXwiKt67fwsMscFxZuCtYpEVhgVWysdTu/ELbT+gqvWNP3i1t8LqzFYjW83ZrLHbfGmOn7Hi+L66GGZ1yoIWOm73t8IM7C6nCJhoyZZG04d7K0hhbWRRoyB+ttcTbWxRoyB2viBGkWVs0LNGTM9H2XieK6WFiXasgcrDnibKxMDRmDVecFaXPqWPOGN2moljFYn4izsa7XkDlYT0ibYWPdqSFjsA5NF3fIdUJuDDmFO/ysuMNqeIiOG0NCTMHqOltcV9cJm74/VbGukDaz4mF5zxZreavh/jqw/I3Bel5cxcM6MP1DaQcqHtZT4iysbB1Y2aZg9XtFXL+Kh/WROAsrVwdWrjEH+ORPhSVbB/iwtc6t1hozfX/E+zNh3kdcTN//B4EFVsXG2pN0urCkPWp41LKzHLcsyhSspFVb2orasipJDV+dtqOjw3akrTYFa2ty+3mi2idvVcPT4guqO6wgPs0UrLZV5gmr0lYN71h9V5yzJzPjdlXvaArWhpniNqjh8bXvcVzteFOwGrwrroGFlZr5mNNSzcF6SZyNlVjPcYnmYLUQZ2G1THQ+e5/Y0hSszS+K22xhxd3ruDhzsN4XZ2MtcX4TzRJzsJ4WZ2MNf8hxw43BqjxDXGUby/m9bAZhvSPOwuqe6fwuyeHdjcH6WNxRrAcdl2kMVtRr4qIsrHrOb1auZw7WM+KOYt3nOIOwXhVnYyU4f2YgwRgsP/kNuH5qeEHCw45LKDAGS3xn94SjWM6f3TEHa9tz4rap4SNGP+K40SOMwRI/jTL5KNajjjMHy2/TXGGb/Gys+x1nENbyld+IWrncwmq3Zv/jDtufYMzzhmeHfyUs/Gw1fG/f0Wc4bHTfvUyyliOwwAILLLDAIrDAAgsssMAisMACCyywwCKwwAILLLDAIrDAAgsssMAisMACCyywwCKwwAILLLDAIrDAAgsssMAisMACCyywwCKwwAILLLDAIrDAAgsssMAisMACCyywwCKwwAILLLDAIrDAAgsssMAisMACCyywwCKwwAILLLDAIrDAAgsssMAisMACCyywwCKwwAILLLDAIrDAAgsssMAisMACCyywwCKwwAILLLDAIrDAAgsssMAisMACCyywwCKwwAILLLDAIrDAAgsssMAisMACCyywwCKwwAILLLDAIrDAAgsssMAisMACCyywwCKwwAILLLDAIrDAAgsssMAisMACCyywwCKwwAILLLDAIrDAAgsssMAisMACCyywwCKwwAILLLD+p/0twABFVDz6r17hOQAAAABJRU5ErkJggg=="

/***/ },
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var BaseView = __webpack_require__(25);
	var BaseModel = __webpack_require__(33);
	var BaseRouter = __webpack_require__(35);
	var ManagedObject = __webpack_require__(36);
	var storage = __webpack_require__(34);
	module.exports = {
	    'View':BaseView,
	    'Model':BaseModel,
	    'Router':BaseRouter,
	    'ManagedObject':ManagedObject,
	    'storage':storage
	};


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @time 2012年10月19日
	 * @author icepy
	 * @info 完成基础的View类
	 *
	 * @time 2016年2月27日
	 * @author icepy
	 * @info 改造兼容webpack打包
	 */
	
	'use strict';
	
	var Backbone = __webpack_require__(26);
	var tplEng = __webpack_require__(27);
	var warn = __webpack_require__(28);
	var Tools = __webpack_require__(31);
	var error = __webpack_require__(32);
	var uid = 999;
	var createID = function(){
		return 'view_'+(uid++)+'_'+(new Date().getTime())+Math.floor(Math.random(100)*100);
	};
	var BaseView = Backbone.View.extend({
		initialize:function(options){
			//初始化参数
			this._ICEOptions = options || {};
			if (_.isFunction(this.beforeMount)){
				this.beforeMount();
			}else{
				warn('推荐使用beforeMount钩子方法，用来初始化自定义属性');
			};
			if (this.router) {
				this.id = createID();
				this.$el.append('<div id="'+this.id+'"></div>');
				this.$el = this.$el.find('#'+this.id);
			};
			this._ICEinit();
			return this;
		},
		_ICEinit:function(){
			if (_.isFunction(this.rawLoader)) {
				this._template = this.rawLoader();
				if (this._template) {
					this.$el.append(this._template);
				};
			}
			if (typeof this.afterMount === 'function') {
				this.afterMount();
			}else{
				warn('推荐使用afterMount钩子方法，在此钩子方法中来获取DOM对象');
			};
			this._ICEObject();
		},
		_ICEObject:function(){
			this._ICEinitNode();
			this.__YYTPC__ = true;
			if (_.isFunction(this.ready)) {
				this.ready(this._ICEOptions);
			}else{
				error('一个View对象周期内必须实现ready钩子方法');
			};
		},
		_ICEinitEvent:function(){
			this.delegateEvents(this.events);
		},
		_ICEinitNode:function(){
			var self = this;
			this.$parent = this._ICEOptions.parent;
			this.$children  = [];
			this.$root = this.$parent ? this.$parent.$root : this;
			if (this.$parent && this.$parent.__YYTPC__) {
				this.$parent.$children.push(this);
			};
			this.on('hook:context',function(){
				var args = Tools.toArray(arguments);
				if (self && self.__YYTPC__) {
					if (_.isFunction(self.context)) {
						self.context.apply(self,args);
					}else{
						warn('未定义context上下文钩子方法');
					};
				};
			});
		},
		_ICEDestroy:function(){
			//实例销毁之前
			if (_.isFunction(this.beforeDestroy)) {
				this.beforeDestroy();
			};
			this.remove();
			this.undelegate();
			//实例销毁之后
			if (_.isFunction(this.destroyed)) {
				this.destroyed();
			};
		},
		/**
		 * [triggerHook 触发父对象的Hook]
		 * @return {[type]} [description]
		 */
		triggerContextHook:function(){
			if (this.$parent && this.$parent.__YYTPC__) {
				var args = Tools.toArray(arguments);
				var event = args[0];
				if (_.isString(event)) {
					args[0] = 'hook:context';
				}else{
					args.splice(0,0,'hook:context');
				};
				switch (event) {
					case 'root':
							this.$root.trigger.apply(this.$root,args);
						break;
					default:
							this.$parent.trigger.apply(this.$parent,args);
						break;
				}
			}else{
				warn('在View实例对象初始化时未指明对象的结构关系');
			}
		},
		/**
		 * [findDOMNode 查找DOM节点]
		 * @param  {[type]} exprs [description]
		 * @return {[type]}       [description]
		 */
		findDOMNode:function(exprs){
			return this.$el && this.$el.find(exprs);
		},
		/**
		 * [compileHTML 编译模板]
		 * @param  {[type]} tplStr [description]
		 * @param  {[type]} data   [description]
		 * @return {[type]}        [description]
		 */
		compileHTML:function(tplStr,data){
			return tplEng.compile(tplStr)(data);
		},
		/**
		 * [broadcast 触发所有子组件相应的事件]
		 * @param  {[type]} event [description]
		 * @return {[type]}       [description]
		 */
		broadcast:function(){
			var args = Tools.toArray(arguments);
			var children = this.$children;
			var i = 0;
			var j = children.length;
			for(;i<j;i++){
				var child = children[i];
				var propagate = child.trigger.apply(child,args);
				if(propagate){
					child.broadcast.apply(child,args);
				};
			}
			return this;
		},
		/**
		 * [dispatch 触发所有父组件相应的事件]
		 * @param  {[type]} event [description]
		 * @return {[type]}       [description]
		 */
		dispatch:function(){
			var args = Tools.toArray(arguments);
			var parent = this.$parent;
			while(parent){
				parent.trigger.apply(parent,args);
				parent = parent.$parent;
			}
			return this;
		},
		/**
		 * [destroy 销毁实例]
		 * @return {[type]} [description]
		 */
		destroy:function(){
			this._ICEOptions = null;
			this.$children.length = 0;
			this.$parent = null;
			this.$root = null;
			this._ICEDestroy();
		}
	});
	
	module.exports = BaseView;


/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = window.Backbone;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!art-template - Template Engine | http://aui.github.com/artTemplate/*/
	!function(){function a(a){return a.replace(t,"").replace(u,",").replace(v,"").replace(w,"").replace(x,"").split(/^$|,+/)}function b(a){return"'"+a.replace(/('|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n")+"'"}function c(c,d){function e(a){return m+=a.split(/\n/).length-1,k&&(a=a.replace(/\s+/g," ").replace(/<!--.*?-->/g,"")),a&&(a=s[1]+b(a)+s[2]+"\n"),a}function f(b){var c=m;if(j?b=j(b,d):g&&(b=b.replace(/\n/g,function(){return m++,"$line="+m+";"})),0===b.indexOf("=")){var e=l&&!/^=[=#]/.test(b);if(b=b.replace(/^=[=#]?|[\s;]*$/g,""),e){var f=b.replace(/\s*\([^\)]+\)/,"");n[f]||/^(include|print)$/.test(f)||(b="$escape("+b+")")}else b="$string("+b+")";b=s[1]+b+s[2]}return g&&(b="$line="+c+";"+b),r(a(b),function(a){if(a&&!p[a]){var b;b="print"===a?u:"include"===a?v:n[a]?"$utils."+a:o[a]?"$helpers."+a:"$data."+a,w+=a+"="+b+",",p[a]=!0}}),b+"\n"}var g=d.debug,h=d.openTag,i=d.closeTag,j=d.parser,k=d.compress,l=d.escape,m=1,p={$data:1,$filename:1,$utils:1,$helpers:1,$out:1,$line:1},q="".trim,s=q?["$out='';","$out+=",";","$out"]:["$out=[];","$out.push(",");","$out.join('')"],t=q?"$out+=text;return $out;":"$out.push(text);",u="function(){var text=''.concat.apply('',arguments);"+t+"}",v="function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);"+t+"}",w="'use strict';var $utils=this,$helpers=$utils.$helpers,"+(g?"$line=0,":""),x=s[0],y="return new String("+s[3]+");";r(c.split(h),function(a){a=a.split(i);var b=a[0],c=a[1];1===a.length?x+=e(b):(x+=f(b),c&&(x+=e(c)))});var z=w+x+y;g&&(z="try{"+z+"}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:"+b(c)+".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");try{var A=new Function("$data","$filename",z);return A.prototype=n,A}catch(B){throw B.temp="function anonymous($data,$filename) {"+z+"}",B}}var d=function(a,b){return"string"==typeof b?q(b,{filename:a}):g(a,b)};d.version="3.0.0",d.config=function(a,b){e[a]=b};var e=d.defaults={openTag:"<%",closeTag:"%>",escape:!0,cache:!0,compress:!1,parser:null},f=d.cache={};d.render=function(a,b){return q(a,b)};var g=d.renderFile=function(a,b){var c=d.get(a)||p({filename:a,name:"Render Error",message:"Template not found"});return b?c(b):c};d.get=function(a){var b;if(f[a])b=f[a];else if("object"==typeof document){var c=document.getElementById(a);if(c){var d=(c.value||c.innerHTML).replace(/^\s*|\s*$/g,"");b=q(d,{filename:a})}}return b};var h=function(a,b){return"string"!=typeof a&&(b=typeof a,"number"===b?a+="":a="function"===b?h(a.call(a)):""),a},i={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},j=function(a){return i[a]},k=function(a){return h(a).replace(/&(?![\w#]+;)|[<>"']/g,j)},l=Array.isArray||function(a){return"[object Array]"==={}.toString.call(a)},m=function(a,b){var c,d;if(l(a))for(c=0,d=a.length;d>c;c++)b.call(a,a[c],c,a);else for(c in a)b.call(a,a[c],c)},n=d.utils={$helpers:{},$include:g,$string:h,$escape:k,$each:m};d.helper=function(a,b){o[a]=b};var o=d.helpers=n.$helpers;d.onerror=function(a){var b="Template Error\n\n";for(var c in a)b+="<"+c+">\n"+a[c]+"\n\n";"object"==typeof console&&console.error(b)};var p=function(a){return d.onerror(a),function(){return"{Template Error}"}},q=d.compile=function(a,b){function d(c){try{return new i(c,h)+""}catch(d){return b.debug?p(d)():(b.debug=!0,q(a,b)(c))}}b=b||{};for(var g in e)void 0===b[g]&&(b[g]=e[g]);var h=b.filename;try{var i=c(a,b)}catch(j){return j.filename=h||"anonymous",j.name="Syntax Error",p(j)}return d.prototype=i.prototype,d.toString=function(){return i.toString()},h&&b.cache&&(f[h]=d),d},r=n.$each,s="break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",t=/\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,u=/[^\w$]+/g,v=new RegExp(["\\b"+s.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),w=/^\d[^,]*|,\d[^,]*/g,x=/^,+|,+$/g;e.openTag="{{",e.closeTag="}}";var y=function(a,b){var c=b.split(":"),d=c.shift(),e=c.join(":")||"";return e&&(e=", "+e),"$helpers."+d+"("+a+e+")"};e.parser=function(a,b){a=a.replace(/^\s/,"");var c=a.split(" "),e=c.shift(),f=c.join(" ");switch(e){case"if":a="if("+f+"){";break;case"else":c="if"===c.shift()?" if("+c.join(" ")+")":"",a="}else"+c+"{";break;case"/if":a="}";break;case"each":var g=c[0]||"$data",h=c[1]||"as",i=c[2]||"$value",j=c[3]||"$index",k=i+","+j;"as"!==h&&(g="[]"),a="$each("+g+",function("+k+"){";break;case"/each":a="});";break;case"echo":a="print("+f+");";break;case"print":case"include":a=e+"("+c.join(",")+");";break;default:if(-1!==f.indexOf("|")){var l=b.escape;0===a.indexOf("#")&&(a=a.substr(1),l=!1);for(var m=0,n=a.split("|"),o=n.length,p=l?"$escape":"$string",q=p+"("+n[m++]+")";o>m;m++)q=y(q,n[m]);a="=#"+q}else a=d.helpers[e]?"=#"+e+"("+c.join(",")+");":"="+a}return a}, true?!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return d}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"undefined"!=typeof exports?module.exports=d:this.template=d}();

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @time 2012年10月26日
	 * @author icepy
	 * @info 完成warn包装
	 */
	
	'use strict';
	
	var log = __webpack_require__(29);
	
	var warn = function(msg,e){
		log.warn(msg,e);
	}
	module.exports = warn;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * @time 2012年10月26日
	 * @author icepy
	 * @info debug信息打印
	 */
	
	'use strict';
	
	var log = {
		warn:function(){},
		error:function(){},
		info:function(){},
		dir:function(){}
	};
	if (process.env.NODE_ENV !== 'product') {
		var hasConsole =  typeof console !== undefined;
		log.warn = function(msg,e){
			if (hasConsole) {
				console.warn('[YYT PC Warning]:'+ msg);
				if (e) {
					throw e;
				}else{
					var warning = new Error('Warning Stack Trace');
					console.warn(warning.stack);
				}
			};
		};
		log.error = function(msg){
			var error = new Error(msg);
			throw error.stack;
		};
		log.info = function(msg){
			if (hasConsole) {
				console.info('[YYT PC INFO]'+msg);
			}
		};
		log.dir = function(tag){
			var arr = document.querySelectorAll(tag);
			if (arr && arr.length) {
				arr.forEach(function(element){
					console.dir(element);
				});
			}
		};
	}
	module.exports = log;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30)))

/***/ },
/* 30 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * @time 2012年10月26日
	 * @author icepy
	 * @info 完成处理tools对象
	 */
	
	'use strict';
	
	(function (factory) {
	    var root = (typeof self == 'object' && self.self == self && self) ||
	        (typeof global == 'object' && global.global == global && global);
	    if (true) {
	        module.exports = factory();
	    } else if (typeof exports === 'object') {
	        exports['tools'] = factory()
	    } else {
	        if (!root.ICEPlugs) {
	            root.ICEPlugs = {};
	        }
	        root.ICEPlugs.tools = factory();
	    }
	})(function () {
	    var tools = {};
	    var toString = Object.prototype.toString;
	    var OBJECT_TYPE = '[object Object]';
	    /**
	     * [isPlainObject 判断是否为普通对象]
	     * @param  {[Object]}  obj [对象]
	     * @return {Boolean}
	     */
	    tools.isPlainObject = function (obj) {
	        return toString.call(obj) === OBJECT_TYPE;
	    };
	    /**
	     * [isObject 判断是否为对象]
	     * @param  {[*]}  obj [任意一个元素]
	     * @return {Boolean}
	     */
	    tools.isObject = function (obj) {
	        return obj !== null && typeof obj === 'object';
	    };
	    var hasOwnProperty = Object.prototype.hasOwnProperty;
	    /**
	     * [hasOwn 检查对象是否为自身的属性]
	     * @param  {[Object]}  obj [description]
	     * @param  {[String]}  key [description]
	     * @return {Boolean}     [description]
	     */
	    tools.hasOwn = function (obj, key) {
	        return hasOwnProperty.call(obj, key);
	    };
	    /**
	     * [toArray 类数组对象转数组]
	     * @param  {[Array-like]} list  [类数组]
	     * @param  {[Number]} index [起始索引]
	     * @return {[Array]}       [返回一个新的真实数组]
	     */
	    tools.toArray = function (list, index) {
	        index = index || 0;
	        var i = list.length - index;
	        var _array = new Array(i);
	        while (i--) {
	            _array[i] = list[i + index];
	        }
	        return _array;
	    };
	    /**
	     * [toType 导出类型字符串]
	     * @param  {[type]} value [description]
	     * @return {[type]}       [description]
	     */
	    tools.toType = function (value) {
	        return toString.call(value);
	    };
	    /**
	     * [exportToNumber 导出数字]
	     * @param  {[*]} value [description]
	     * @return {[*|Number]}       [description]
	     */
	    tools.exportToNumber = function (value) {
	        if (typeof value !== 'string') {
	            return value;
	        } else {
	            var number = Number(value);
	            return isNaN(number) ? value : number;
	        }
	    };
	
	    /**
	     * [isArray 判断是否为数组]
	     * @param  {*} value [description]
	     * @return {Boolean}       [description]
	     */
	    tools.isArray = function(obj){
	        return tools.toType(obj) === '[object Array]';
	    };
	
	    /**
	     * [mergeData 合并数据]
	     * @param  {obj} value [description]
	     * @param  {obj} value [description]
	     * @return {obj}       [description]
	     */
	    tools.mergeData = function(to,from){
	        var key,toVal,fromVal;
	        for(key in from){
	            toVal = to[key];
	            fromVal = from[key];
	            if (tools.isPlainObject(toVal) && tools.isPlainObject(fromVal)) {
	                tools.mergeData(toVal,fromVal);
	            }
	        }
	        return to;
	    };
	    return tools;
	});
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @time 2012年10月26日
	 * @author icepy
	 * @info 完成error包装
	 */
	
	'use strict';
	
	var log = __webpack_require__(29);
	
	var error = function(msg,e){
		log.error(msg,e);
	}
	module.exports = error;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @time 2012年10月19日
	 * @author icepy
	 * @info 实现基础的模型类
	 *
	 * @time 2012年10月27日
	 * @author icepy
	 * @info 现实对请求进行本地缓存
	 *
	 * @time 2016年2月27日
	 * @author icepy
	 * @info 改造兼容webpack打包以及扩展Model
	 *
	 */
	
	
	'use strict';
	var Backbone = __webpack_require__(26)
	var storage = __webpack_require__(34);
	var Tools = __webpack_require__(31);
	var warn = __webpack_require__(28);
	var uid = 1314;
	var expiration = storage.expiration;
	var BaseModel = Backbone.Model.extend({
		initialize:function(options){
			if (_.isFunction(this.beforeEmit)) {
				this.beforeEmit(options);
			};
			this._url = this.url;
		},
		_ICEFetch:function(options){
			this.fetch(options);
		},
		_ICESave:function(HTTPBody,options){
			this.save(HTTPBody,options);
		},
		_ICEDestroy:function(options){
			this.destroy(options);
		},
		_ICEJSONP:function(parameter,options){
			$.ajax($.extend({
				url:this.url,
				data:parameter || {},
				dataType:'jsonp',
				jsonp:'callback'
			},options));
		},
		_ICESendHelper:function(message,defer){
			var self = this;
			if (message.url) {
				//如果存在url，将this的url替换
				this.url = message.url;
			};
			var options = {};
			options.beforeSend = function(xhr,setting){
				for(var key in this.headers){
					xhr.setRequestHeader(key,this.headers[key]);
				}
			};
			options.success = function(model,response,afterSetting){
				response = self._ICEProcessData(response);
				defer.resolve.call(model,response,afterSetting.xhr);
			}
			options.error = function(model,xhr){
				defer.reject.call(model,xhr);
			}
			switch(message.type){
				case 'POST':
					this._ICESave(message.HTTPBody,options);
					break;
				case 'PUT':
					var id = message.HTTPBody.id;
					if(!id && id !== 0){
						message.HTTPBody.id = 'icepy'+(uid++);
					};
					this._ICESave(message.HTTPBody,options);
					break;
				case 'DELETE':
					this._ICEDestroy(options);
					break;
				case 'JSONP':
					this._ICEJSONP(message.parameter,{
						success:function(response,state,xhr){
							response = self._ICEProcessData(response);
							defer.resolve.call(self,response,state,xhr);
						},
						error:function(xhr,state,errors){
							defer.reject.call(self,xhr,state,errors);
						}
					});
					break;
				default:
					this._ICEFetch(options);
					break;
			}
		},
		_ICESendMessage:function(message,defer){
			var self = this;
			if (this.storageCache && this.expiration){
				if (!storage.enabled){
					this._ICESendHelper(message,defer);
				}else{
					var data = expiration.get(this.url);
					if (!data) {
						this._ICESendHelper(message,defer);
						return false;
					};
					setTimeout(function(){
						data = self._ICEProcessData(data,true);
						defer.reslove(data)
					},50);
				};
			}else{
				this._ICESendHelper(message,defer);
			};
		},
		_ICEProcessData:function(response,before){
			//如果自定义了formatter方法，先对数据进行格式化
			if (_.isFunction(this.formatter)) {
				response = this.formatter(response);
			};
			//如果开启了缓存，对数据源进行本地存储
			if (this.storageCache && this.expiration && !before) {
				if (storage.enabled){
					expiration.set(this.url,response,this.expiration);
				};
			};
			this.set(response);
			return response;
		},
		/**
		 * [execute GET请求简化版]
		 * @param  {[type]} success [description]
		 * @param  {[type]} error   [description]
		 * @return {[type]}         [description]
		 */
		execute:function(){
			var defer = $.Deferred();
			var message = {
				type:'GET'
			};
			var args = Tools.toArray(arguments);
			var g = args.splice(0,1)[0];
			if (Tools.isPlainObject(g)) {
				message = _.extend(message,g);
			}
			this._ICESendMessage(message,defer);
			return defer.promise();
		},
		/**
		 * [executeGET 发起GET请求]
		 * @param  {[type]} success [description]
		 * @param  {[type]} error   [description]
		 * @return {[type]}         [description]
		 */
		executeGET:function(){
			var message = {
				type:'GET'
			};
			return this.execute(message);
		},
		/**
		 * [executePOST 发起POST请求]
		 * @param  {[type]} HTTPBody [description]
		 * @param  {[type]} success  [description]
		 * @param  {[type]} error    [description]
		 * @return {[type]}          [description]
		 */
		executePOST:function(HTTPBody){
			var message = {
				type:'POST',
				HTTPBody:HTTPBody
			};
			return this.execute(message);
		},
		/**
		 * [executePUT 发起PUT请求]
		 * @param  {[type]} HTTPBody [description]
		 * @param  {[type]} success  [description]
		 * @param  {[type]} error    [description]
		 * @return {[type]}          [description]
		 */
		executePUT:function(HTTPBody){
			var message = {
				type:'PUT',
				HTTPBody:HTTPBody
			};
			return this.execute(message);
		},
		/**
		 * [executeDELETE 发起delete请求]
		 * @return {[type]} [description]
		 */
		executeDELETE:function(){
			var message = {
				type:'DELETE'
			};
			return this.execute(message);
		},
		/**
		 * [executeJSONP 发起JSONP跨域请求]
		 * @param  {[type]} success [description]
		 * @param  {[type]} error   [description]
		 * @return {[type]}         [description]
		 */
		executeJSONP:function(parameter){
			var message = {
				type:'JSONP',
				parameter:parameter
			};
			return this.execute(message);
		},
		/**
		 * [setChangeURL 辅助拼接URL参数]
		 * @param {[type]} parameter [description]
		 */
		setChangeURL:function(parameter){
			var url = ''
			if (!parameter) {
				return this.url;
			};
			for(var key in parameter){
				var value = parameter[key];
				if (!url.length) {
					url += '?'+key+'='+value;
				}else{
					url += '&'+key+'='+value;
				};
			};
			this.url = this._url + url;
		},
		/**
		 * [setHeaders 设置XHR 头信息]
		 * @param {[string|object]} headers [description]
		 */
		setHeaders:function(){
			if (!this.headers) {
				this.headers = {};
			};
			var args = Tools.toArray(arguments);
			if (args.length === 1) {
				var headers = args[0];
				for(var key in headers){
					this.headers[key] = headers[key];
				}
			}else{
				if (args.length) {
					var key = args[0];
					var value = args[1];
					this.headers[key] = value;
				}
			}
		},
		/**
		 * [setUpdateStorage 将实体数据更新到本地缓存]
		 * @return {[type]} [description]
		 */
		setUpdateStorage:function(){
			if (storage.enabled){
				expiration.set(self.url,this.manager.$get(),self.expiration);
			};
		}
	});
	module.exports = BaseModel;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * @time 2012年10月27日
	 * @author icepy
	 * @info 封装完成本地缓存API
	 *
	 * @time 2016年2月27日
	 * @author icepy
	 * @info 改造兼容webpack打包
	 */
	
	'use strict';
	
	(function(factory) {
		var root = (typeof self == 'object' && self.self == self && self) ||
			(typeof global == 'object' && global.global == global && global);
		if(true){
			module.exports = factory();
		}else if(typeof exports === 'object'){
			exports['storage'] = factory()
		}else{
			if (!root.ICEPlugs) {
				root.ICEPlugs = {};
			};
			root.ICEPlugs.storage = factory();
		};
	})(function() {
		var store = {};
		var _window = window;
		var localStorageName = 'localStorage';
		var sessionStorageName = 'sessionStorage';
		var rootKey = 'ICEStorageCache';
		var storage, session;
		var isLocalStorageNameSupported = function() {
			try {
				return (localStorageName in _window && _window[localStorageName]);
			} catch (err) {
				return false;
			}
		};
		var isSessionStorageNameSupported = function() {
			try {
				return (sessionStorageName in _window && _window[sessionStorageName]);
			} catch (err) {
				return false;
			}
		};
		store.disabled = false;
		store.version = '0.0.1';
		/**
		 * [has 根据Key判断是否存在]
		 * @param  {[String]}  key [description]
		 * @return {Boolean}     [description]
		 */
		store.has = function(key) {
			return store.get(key) !== undefined;
		};
	
		/**
		 * [transact 有存储是否成功的回调函数]
		 * @param  {[String]} key           [description]
		 * @param  {[String]} defaultVal    [description]
		 * @param  {[type]} transactionFn [description]
		 */
		store.transact = function(key, defaultVal, transactionFn) {
			if (transactionFn == null) {
				transactionFn = defaultVal;
				defaultVal = null;
			}
	
			if (defaultVal == null) {
				defaultVal = {};
			}
	
			var val = store.get(key, defaultVal);
			transactionFn(val);
			store.set(key, val);
		};
		/**
		 * [serialize 对象转字符串]
		 * @param  {[Object]} value [description]
		 * @return {[String]}       [description]
		 */
		store.serialize = function(value) {
			return JSON.stringify(value);
		};
		/**
		 * [deserialize 字符串格式化对象]
		 * @param  {[String]} value [description]
		 * @return {[Object]}       [description]
		 */
		store.deserialize = function(value) {
			if (typeof value != 'string') {
				return undefined;
			}
			try {
				return JSON.parse(value);
			} catch (e) {
				return value || undefined;
			}
		};
		if (isLocalStorageNameSupported()) {
			storage = _window[localStorageName];
			/**
			 * [set  存储本地缓存]
			 * @param {[String]} key [description]
			 * @param {[Object]} val [description]
			 */
			store.set = function(key, val) {
				if (val === undefined) {
					return store.remove(key);
				}
				storage.setItem(key, store.serialize(val));
				return val;
			};
	
			/**
			 * [get 获取本地缓存]
			 * @param  {[String]} key        [description]
			 * @param  {[type]} defaultVal [description]
			 * @return {[Boolean]}            [description]
			 */
			store.get = function(key, defaultVal) {
				var val = store.deserialize(storage.getItem(key));
				return (val === undefined ? defaultVal : val);
			};
	
			/**
			 * [remove 根据key名删除一个本地缓存]
			 * @param  {[String]} key [description]
			 */
			store.remove = function(key) {
				storage.removeItem(key);
			};
	
			/**
			 * [clear 清除所有的本地缓存]
			 */
			store.clear = function() {
				storage.clear();
			};
	
			/**
			 * [getAll description]
			 * @return {[Object]} [description]
			 */
			store.getAll = function() {
				var ret = {};
				store.forEach(function(key, val) {
					ret[key] = val;
				});
				return ret;
			};
			store.forEach = function(callback) {
				for (var i = 0; i < storage.length; i++) {
					var key = storage.key(i);
					callback(key, store.get(key));
				}
			};
			//可以设置过期时间
			store.expiration = {
				/**
				 * [set 存储可以设置过期时间的本地缓存]
				 * @param {[String]} key [description]
				 * @param {[Object]} val [description]
				 * @param {[Number]} exp [description]
				 */
				set: function(key, val, exp) {
					//exp 接受自然整数，以一小时60分钟为单位
					var Root = store.get(rootKey) || {};
					Root[key] = {
						val: val,
						exp: exp * (1000 * 60 * 60),
						time: new Date().getTime()
					};
					store.set(rootKey, Root);
				},
				/**
				 * [get 获取有过期时间的本地缓存]
				 * @param  {[String]} key [description]
				 * @return {[*]}     [*]
				 */
				get: function(key) {
					var Root = store.get(rootKey);
					if (!Root) {
						//根节点不存在
						return null;
					};
					var info = Root[key];
					if (!info) {
						return null;
					}
					if (new Date().getTime() - info.time > info.exp) {
						return null;
					}
					return info.val
				},
				getAll: function() {
					var Root = store.get(rootKey);
					return Root || null;
				},
				resetSave: function(val) {
					store.set(rootKey, val);
				}
			};
			if (isSessionStorageNameSupported()) {
				session = _window[sessionStorageName];
				//会话模式
				store.session = {
					/**
					 * [set 存储一个会话]
					 * @param {[String]} key [description]
					 * @param {[*]} val [*]
					 */
					set: function(key, val) {
						if (val === undefined) {
							return store.remove(key);
						}
						var stayStore;
						if (Object.prototype.toString.call(val) === '[object Object]') {
							stayStore = store.serialize(val);
						} else {
							stayStore = val;
						};
						session.setItem(key, stayStore);
					},
					/**
					 * [get 获取一个会话]
					 * @param  {[String]} key [description]
					 * @return {[Boolean]}     [description]
					 */
					get: function(key) {
						var val = store.deserialize(session.getItem(key));
						return (val === undefined ? defaultVal : val);
					}
				}
			};
		}
		try {
			var testKey = '__storeJs__';
			store.set(testKey, testKey);
			if (store.get(testKey) != testKey) {
				store.disabled = true;
			}
			store.remove(testKey);
		} catch (e) {
			store.disabled = true;
		}
		store.enabled = !store.disabled;
		if (store.enabled) {
			var modelCache = store.expiration.getAll();
			if (modelCache) {
				for (var cacheKey in modelCache) {
					var cache = modelCache[cacheKey];
					if (new Date().getTime() - cache.time > cache.exp) {
						cache = null;
						delete modelCache[cacheKey]
					}
				}
			};
			store.expiration.resetSave(modelCache);
		};
		return store;
	});
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @time 2016年3月21日
	 * @author icepy
	 * @info 基于路由的生命周期
	 */
	
	'use strict'
	
	var Backbone = __webpack_require__(26);
	var warn = __webpack_require__(28);
	var stack = [];
	var routerHash = {};
	var curr = null;
	var router = null;
	var routerHashTop = function(key) {
	    return routerHash[key];
	};
	var routerHashRmove = function(key) {
	    delete routerHash[key];
	};
	var BaseRouter = Backbone.Router.extend({
	    addLifeCycleHelper: function(name, view, parameter) {
	        var top = routerHashTop(name);
	        var stackCheckHandler = function() {
	            if (curr) {
	                //视图隐藏或者销毁之前
	                if (_.isFunction(router.viewWillDisappear)) {
	                    router.viewWillDisappear.call(curr);
	                }else{
	                    if (router.dealloc) {
	                        warn('销毁实例{dealloc = true}之前必须存在viewWillDisappear，在此进行解除其他对象的引用或者调用（每个）destroy方法');
	                    };
	                };
	                if (router.dealloc) {
	                    //进入实例销毁流程
	                    curr.destroy();
	                    var obj = routerHashTop(curr._router);
	                    if (obj) {
	                        routerHashRmove(curr._router);
	                        stack.splice(stack.indexOf(curr.cid), 1);
	                        obj = null;
	                    };
	                }
	                //视图隐藏或者销毁之后
	                if (_.isFunction(router.viewDidDisappear)) {
	                    router.viewDidDisappear.call(curr);
	                };
	            }
	        }
	        if (top) {
	            stackCheckHandler();
	            curr = null;
	            curr = top;
	            curr.trigger('viewWillAppear');
	        } else {
	            stackCheckHandler();
	            curr = parameter ? new view({
	                '$parameter': parameter
	            }) : new view();
	            stack.push(curr.cid);
	            curr._router = name;
	            curr._didLoad = false; //记录viewDidLoad跟随路由呈现的生命周期状态
	            router = curr.router;
	            routerHash[name] = curr;
	            //视图呈现的生命周期只会触发一次
	            curr.once('viewDidLoad', function() {
	                if (_.isFunction(router.viewDidLoad)) {
	                    router.viewDidLoad.call(curr);
	                }else{
	                    warn('基于路由的Root Component，必须存在viewDidLoad钩子');
	                };
	                if (!curr._didLoad) {
	                    curr._didLoad = true;
	                    curr.trigger('viewDidAppear');
	                };
	            });
	            //视图将要呈现之前
	            curr.on('viewWillAppear', function() {
	                if (_.isFunction(router.viewWillAppear)) {
	                    router.viewWillAppear.call(curr);
	                }else{
	                    warn('基于路由的Root Component，必须存在viewWillAppear');
	                };
	                if (!curr._didLoad) {
	                    //viewDidLoad事件还未触发
	                    curr.trigger('viewDidLoad');
	                }else{
	                    curr.trigger('viewDidAppear');
	                };
	            });
	            //视图已经呈现之后
	            curr.on('viewDidAppear', function() {
	                if (_.isFunction(router.viewDidAppear)) {
	                    router.viewDidAppear.call(curr);
	                }else{
	                    warn('基于路由的Root Component，必须存在viewDidAppear');
	                };
	            });
	            curr.trigger('viewWillAppear');
	        }
	        return curr;
	    }
	});
	module.exports = BaseRouter;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @time 2016年3月29日
	 * @author icepy
	 * @info 实体管理类
	 */
	var Tools = __webpack_require__(31);
	var baseModelSort = [];
	
	var ManagedObject = function(options){
	    options = options || {};
	    this.entity = options.entity || {};
	};
	
	ManagedObject.prototype.$update = function(obj){
	    var entity = _.extend(this.entity,obj);
	    this.entity = null;
	    this.entity = entity;
	};
	/**
	 * [$get 从实体中获取数据，无参将返回所有数据，参数使用.结构化表达式（this.$get('items.0.id')）]
	 * @param  {[type]} expression [description]
	 * @return {[type]}            [description]
	 */
	ManagedObject.prototype.$get = function(expression){
	    if (!expression) {
	        return this.entity;
	    }
	    var attrNodes = expression.split('.');
	    var lh = attrNodes.length;
	    if (lh > 0) {
	        var node = attrNodes[0];
	        var i = 0;
	        var entity = this.entity;
	        while(node){
	            i++
	            entity = entity[node];
	            node = attrNodes[i];
	        }
	        return entity;
	    }
	};
	/**
	 * [$set 向实体内部更新数据，以key/value的方式，第一个参数使用结构化表达式，第二个参数可以是任意类型的数据]
	 * @param {[type]} expression [description]
	 * @param {[type]} value      [description]
	 */
	ManagedObject.prototype.$set = function(expression,value,options){
	    if (expression === null || expression === undefined) {
	        return this;
	    };
	    if (Tools.isPlainObject(expression)) {
	        this.entity = null;
	        this.entity = expression;
	        return this.entity;
	    };
	    var attrNodes = expression.split('.');
	    var lh = attrNodes.length;
	    if (lh > 0) {
	        var i = 0;
	        var node = attrNodes[i];
	        var entity = this.entity;
	        if (lh !== 1) {
	            while(node){
	                i++
	                entity = entity[node];
	                node = attrNodes[i];
	                if (i > (lh - 2)) {
	                    break;
	                }
	            }
	        }
	        switch(Tools.toType(entity)){
	            case '[object Object]':
	                entity[node] = value;
	                break;
	            case '[object Array]':
	                entity[Tools.exportToNumber(node)] = value;
	                break;
	            default:
	                entity = value;
	                break;
	        };
	    }
	};
	/**
	 * [$filter 向实体内部的某项数据进行筛选，第一个参数是要筛选数据的.结构化表达式，第二个参数是筛选根据]
	 * @param  {[type]} expression [description]
	 * @param  {[type]} value      [description]
	 * @return {[type]}            [description]
	 */
	ManagedObject.prototype.$filter = function(expression,value){
	    var data = this.$get(expression);
	    var result = [];
	    if (Tools.isArray(data)) {
	        var i = data.length;
	        var n;
	        while(i--){
	            var val = data[i];
	            switch(Tools.toType(value)){
	                case '[object Object]':
	                    n = true;
	                    for(var k in value){
	                        if (!(val[k] === value[k])) {
	                            n = null;
	                            break;
	                        }
	                    }
	                    break
	                case '[object Function]':
	                    n = value(val,i);
	                    break
	                default:
	                    n = (val === value);
	                    break
	            };
	            if (n) {
	                result.push(val)
	            };
	        };
	    };
	    return result;
	};
	/**
	 * [$sort 对实体内部的某项数据进行排序，第二个参数是要排序数据的.结构化表达式，第二个参数是排序的根据]
	 * @param  {[type]} expression [description]
	 * @param  {[type]} value      [description]
	 * @return {[type]}            [description]
	 */
	ManagedObject.prototype.$sort = function(expression,value){
	    // > 大于 true
	    // < 小于 false
	    var data = this.$get(expression);
	    baseModelSort.length = 0;
	    if (Tools.isArray(data)) {
	        switch(Tools.toType(value)){
	            case '[object Function]':
	                baseModelSort = this._sort(data,value)
	                break
	            default:
	                if (typeof value === 'string') {
	                    var attrNodes = value.split('.');
	                    var logic = null;
	                    var lh = attrNodes.length - 1;
	                    switch(attrNodes[lh]){
	                        case '>':
	                            logic = true;
	                            break
	                        case '<':
	                            logic = false;
	                            break
	                        default:
	                            return baseModelSort;
	                            break
	                    };
	                    if (logic !== null) {
	                        return this._sort(data,function(val1,val2){
	                            var node = attrNodes[0];
	                            var i = 0;
	                            while(node){
	                                val1 = val1[node];
	                                val2 = val2[node];
	                                i++
	                                if (i === lh) {
	                                    break;
	                                };
	                                node = attrNodes[i];
	                            }
	                            if (logic) {
	                                return val1 > val2;
	                            }else{
	                                return val1 < val2;
	                            };
	                        });
	                    }
	
	                };
	                break
	        }
	    };
	    return baseModelSort;
	};
	
	ManagedObject.prototype._sort = function(data,fun){
	    var n = data.length;
	    if (n < 2) {
	        return data;
	    };
	    var i = 0;
	    var j = i+1;
	    var logic,temp,key;
	    for(;i<j;i++){
	        for(j = i+1;j<n;j++){
	            logic = fun.call(this,data[i],data[j]);
	            key = (typeof logic === 'number' ? logic : !!logic ? 1 : 0) > 0 ? true : false;
	            if (key) {
	                temp = data[i];
	                data[i] = data[j];
	                data[j] = temp;
	            }
	        }
	    }
	    return data;
	};
	
	module.exports = ManagedObject;


/***/ },
/* 37 */,
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var config = {
	  scheme: 'release',
	  env: {
	    alpha: {
	      url_prefix: 'http://cxf.yinyuetai.com:3000'
	    },
	    beta: {
	      url_prefix: 'http://beta.yinyuetai.com:9026'
	    },
	    release: {
	      url_prefix: 'http://lnapi.yinyuetai.com'
	    }
	  },
	  prefix: '',
	  domains: {
	    urlStatic: 'http://s.yytcdn.com',
	    loginSite: 'http://login.yinyuetai.com',
	    mainSite: 'http://www.yinyuetai.com',
	    mvSite: 'http://mv.yinyuetai.com',
	    homeSite: 'http://i.yinyuetai.com',
	    vchartSite: 'http://vchart.yinyuetai.com',
	    commentSite: 'http://comment.yinyuetai.com',
	    playlistSite: 'http://pl.yinyuetai.com',
	    searcresiehSite: 'http://so.yinyuetai.com',
	    vSite: 'http://v.yinyuetai.com',
	    fanSite: '',
	    paySite: '',
	    tradeSite: '',
	    shopSite: '',
	    vipSite: ''
	  }
	};
	
	if (process.env.NODE_ENV !== 'product') {
	  config.scheme = 'release';
	  // config.prefix = '/www';
	}
	module.exports = config;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30)))

/***/ },
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var base = __webpack_require__(24);
	var BaseView = base.View;
	var _ = __webpack_require__(43);
	var UserModel = __webpack_require__(44);
	var user = UserModel.sharedInstanceUserModel();
	var prober = __webpack_require__(55);
	var placeholder = __webpack_require__(56);
	var store = __webpack_require__(57);
	var gobal = __webpack_require__(58);
	var historyStoreArr;
	var loginBox = __webpack_require__(50);
	var token;
	
	function searchAjax(val) {
	    var self = this;
	    var params = {
	        size: 10,
	        keyword: val,
	        type: ''
	    };
	    gobal.jsonp('/search/suggest.json', params, function(data) {
	        if (data.msg == 'SUCCESS') {
	            var rq_db_arr = data.data,
	                htmlArr = [];
	            if (rq_db_arr.length == 0) {
	                $('.searchResult').hide();
	                return;
	            } else {
	                $('.searchResult').show();
	            }
	            $.each(rq_db_arr, function(index, val) {
	                htmlArr.push(tplSearch(val));
	            });
	            self.$result.html(htmlArr.join(''));
	            self.$historyBox.hide();
	        }
	    });
	}
	
	function tplSearch(info) {
	    var info = info || {},
	        html = '<a href="./searchresult.html?keyword=' + info.suggestName + '" class="li">' + info.suggestName + '</a>';
	    return html;
	}
	
	var throttled = _.throttle(searchAjax, 100);
	
	
	function subString(str, len, hasDot) {
	    var newLength, newStr, chineseRegex, singleChar, strLength, i;
	
	    newLength = 0;
	    newStr = "";
	    chineseRegex = /[^\x00-\xff]/g;
	    singleChar = "";
	    strLength = str.replace(chineseRegex, "**").length;
	
	    for (i = 0; i < strLength; i++) {
	        singleChar = str.charAt(i).toString();
	        if (singleChar.match(chineseRegex) != null) {
	            newLength += 2;
	        } else {
	            newLength++;
	        }
	        if (newLength > len) {
	            break;
	        }
	        newStr += singleChar;
	    }
	
	    if (hasDot && strLength > len) {
	        newStr += "...";
	    }
	    return newStr;
	}
	
	
	var View = BaseView.extend({
	    el: '.topbar',
	    events: {
	        'click .J_login': '_showLoginBox',
	        'focus .searchWin': '_showSearchHistory',
	        'keyup .searchWin': '_searchVideoChannel',
	        'keydown .searchWin': 'enterValforSearch',
	        'click .searchResultBox': '_hideSearchHistory',
	        'click .searchCloseBtn': 'clearkeyword',
	        'click .result a': 'addHistory'
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
	        this.loginBox = loginBox();
	        this._dialog = this.loginBox.dialog;
	    },
	    _attr: function() {
	        this.$el = $('.topbar');
	        this.$searchBox = $('.searchBox');
	        this.$searchResultBox = this.$searchBox.find('.searchResultBox');
	        this.$historyBox = this.$searchBox.find('.histortyBox');
	        this.$result = this.$searchBox.find('.result');
	        this.$history = this.$searchBox.find('.history');
	        this.$SearchWin = this.$searchBox.find('.searchWin');
	    },
	    ready: function() {
	        //  初始化
	        this._attr();
	        this.render();
	        this.goBackTop();
	    },
	    render: function() {
	        var self = this;
	        if (!user.isLogined()) {
	            this._notLoginHandler();
	        }
	        user.logined(function() {
	            $(window).off('focus');
	            self._loginHandler();
	        });
	        if (this.$searchBox.length == 1) {
	            this._initHistory();
	        }
	        createIframeShim.call(self);
	        this._menusHoverEffect();
	    },
	    _menusHoverEffect: function() {
	        var $useInfo = $('.useInfo'),
	            $menu = $useInfo.find('.loglist');
	        $useInfo.on('mouseover', function() {
	            $menu.show();
	        });
	        $useInfo.on('mouseout', function() {
	            $menu.hide();
	        });
	    },
	    _hideSearchHistory: function() {
	        this.$searchResultBox.hide();
	    },
	    _initHistory: function() {
	        if (localStorage.history) {
	            historyStoreArr = _.union(localStorage.history.split('**'));
	            historyStoreArr = _.uniq(historyStoreArr);
	        } else {
	            historyStoreArr = [];
	        }
	        this.$history.html(historyStoreArr.join(''));
	    },
	    goBackTop: function() {
	        var _window = $(window);
	        var _topBtn = $('.topBtn');
	        _window.scroll(function(event) {
	            if (_window.scrollTop() > 2000) {
	                _topBtn.show();
	            } else {
	                _topBtn.hide();
	            }
	        });
	        _topBtn.click(function() {
	            $('body,html').animate({
	                scrollTop: 0
	            }, 1000);
	        });
	    },
	    clearkeyword: function(e) {
	        var $this = $(e.currentTarget);
	        $this.hide();
	        this._initHistory();
	        this.$SearchWin.val('');
	        $('.inputplaceholder').show();
	        $('.searchResult').show();
	        $('.searchResult .histortyBox').show();
	        $('.searchCloseBtn').hide();
	        $('.result').html('');
	    },
	    _loginHandler: function() { //登陆后的控制
	        //添加单点登录标记网页,添加pathname即可
	        var testPathnames = [
	            /\/living.html/gi,
	            /\/translator.html/gi,
	            /\/translator-pre.html/gi,
	        ];
	        // 引入globe
	        $.each(testPathnames,function (index,rg) {
	            if(rg.test(window.location.pathname)){
	                gobal.jsonp('/user/mark_login.json', {}, function(data) {
	                    console.log(data,'单点登录标记');
	                });
	            }
	        });
	
	        var userinfo, decoration, login;
	        token = {
	            access_token: user.getWebToken()
	        };
	        userinfo = this.$el.find('.useInfo');
	        login = this.$el.find('.signOut').eq(0);
	        userinfo.find('.name').text(subString(user.get('userName'), 10)).attr('title', user.get('userName')); //设置用户名
	        userinfo.find('.avator').attr('src', user.get('headImg'));
	        login.hide(); //隐藏登录注册
	        userinfo.show(); //显示用户信息
	        this._dialog.trigger('hide');
	        testQQ();
	    },
	    _notLoginHandler: function() {
	        var flag, self;
	        self = this;
	        flag = 0;
	        var status = this._dialog.status();
	        $(window).on('focus', function() {
	            user.emit();
	            if (user.isLogined() && flag == 0) {
	                flag = 1;
	                if (status == 'show') {
	                    self.$el.find('.J_login').click();
	                }
	            }
	        });
	        store.remove('imSig');
	    },
	    _searchVideoChannel: function(e) { //搜索结果显示
	        var $this = $(e.currentTarget);
	        var val = $this.val();
	        $this.val($.trim($this.val()));
	        if (val === '') {
	            $('.inputplaceholder').show();
	            $('.searchResult').show();
	            $('.searchResult .histortyBox').show();
	            $('.searchCloseBtn').hide();
	            $('.result').html('');
	        } else {
	            $('.inputplaceholder').hide();
	            $('.searchCloseBtn').show();
	        }
	        throttled.call(this, val);
	    },
	    enterValforSearch: function(e) {
	        var self = e.currentTarget;
	        var link = './searchresult.html?keyword=';
	        if (e.keyCode !== 8) {
	            $('.inputplaceholder').hide();
	        }
	        if (e.keyCode == 13) {
	            if ($.trim(self.value) === '') return;
	            historyStoreArr.unshift(tplSearch({
	                suggestName: self.value
	            }));
	            if (historyStoreArr.length > 10) {
	                historyStoreArr.shift();
	            }
	            var temp = self.value;
	            self.value = '';
	            localStorage.history = historyStoreArr.join('**');
	            window.location.href = link + temp;
	        }
	    },
	    _showLoginBox: function(e) {
	        e.preventDefault();
	        var status = this._dialog.status();
	        if (status == 'hide') {
	            this._dialog.trigger('show');
	        } else {
	            this._dialog.trigger('hide');
	        }
	    },
	    _showSearchHistory: function() {
	        if (historyStoreArr.length == 0) {
	            $('.searchResult').hide()
	        };
	        this.$searchResultBox.show();
	    },
	    addHistory: function(e) {
	        var _this = e.currentTarget;
	        historyStoreArr.push(_this.outerHTML);
	        if (historyStoreArr.length > 10) {
	            historyStoreArr.shift();
	        }
	        localStorage.history = historyStoreArr.join('**');
	    },
	    beforeDestroy: function() {
	        //  进入销毁之前,将引用关系设置为null
	    },
	    destroyed: function() {
	        //  销毁之后
	    }
	});
	function testQQ() {
	    var _XHR = $.ajax({
	        url : 'http://applogin.yinyuetai.com/v1/account/plat_check.json',
	        dataType : 'jsonp',
	        data : {
	            deviceinfo: '{"aid":"30001001"}',
	            access_token : 'web-'+user.getToken()
	        }
	    });
	    _XHR.done(function (res) {
	        if(res.code==0){
	            if(res.data.plat == 'QQ'){
	                window.location.href = 'http://login.yinyuetai.com/logout';
	            }
	        }
	    });
	}
	function createIframeShim() {
	    var root = this.$el;
	    iframe().css({
	        width: '100%',
	        height: '88px',
	        opacity: 0,
	        display: 'none'
	    }).insertAfter(root);
	    var menushim = iframe().css({
	        top: '0',
	    }).appendTo(root.find('.content'));
	}
	
	function iframe() {
	    return $('<iframe />').attr({
	        'frameborder': 0,
	        'scrolling': 'no',
	        'class': 'iframeshim'
	    });
	}
	
	module.exports = View;


/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = window._;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by YYT on 2016/4/20.
	 */
	var base = __webpack_require__(24);
	var Auxiliary = __webpack_require__(45);
	var _ = __webpack_require__(43);
	var BaseModel = base.Model;
	var Dialog = __webpack_require__(46);
	var loginBox = __webpack_require__(50);
	var cookie = Auxiliary.cookie;
	var Config = __webpack_require__(38);
	var domains = Config.domains;
	var checkEmailTemplate = __webpack_require__(54);
	var checkEmailHTML = checkEmailTemplate.replace('{homeSite}', domains.homeSite);
	var loginbox = loginBox().dialog;
	
	var CheckVIPModel = BaseModel.extend({
	    url: 'http://vip.yinyuetai.com/vip/check-vip',
	    setEnv: true,
	    beforeEmit: function() {
	        // 如果需要开启对请求数据的本地缓存，可将下列两行注释去掉
	        // this.storageCache = true; //开启本地缓存
	        // this.expiration = 1; //设置缓存过期时间（1表示60*60*1000 一小时）
	    }
	});
	
	var FetchUserInfoForDB = BaseModel.extend({
	    url: domains.loginSite + '/login-info',
	    setEnv: true,
	    beforeEmit: function() {
	        //  如果需要开启对请求数据的本地缓存，可将下列两行注释去掉
	        //  this.storageCache = true; //开启本地缓存
	        //  this.expiration = 1; //设置缓存过期时间（1表示60*60*1000 一小时）
	    }
	});
	
	var UserModel = BaseModel.extend({
	    setEnv: true,
	    beforeEmit: function() {
	        //  如果需要开启对请求数据的本地缓存，可将下列两行注释去掉
	        //  this.storageCache = true; //开启本地缓存
	        //  this.expiration = 1; //设置缓存过期时间（1表示60*60*1000 一小时）
	        this.checkVIPModel = new CheckVIPModel();
	        this.fetchUserInfoForDBModel = new FetchUserInfoForDB();
	    },
	    /**
	     * [isLogined 判断用户是否登录]
	     * @return {Boolean} [description]
	     */
	    isLogined: function() {
	        return !!this.getToken();
	    },
	    logined: function(callback) {
	        if (this.isLogined()) {
	            callback();
	        } else {
	            this.on('logined', callback);
	        }
	    },
	    /**
	     * [login 检查是否登录，如果未登录调出对话框]
	     * @param  {Function} callback [description]
	     * @param  {[type]}   onCancel [description]
	     * @return {[type]}            [description]
	     */
	    login: function() {
	        var defer = $.Deferred();
	        if (this.isLogined()) {
	            //  已经登录
	            defer.resolve();
	        } else {
	            loginbox.trigger('show');
	            loginbox.once('hide', function() {
	                defer.resolve();
	            });
	        }
	        return defer.promise();
	    },
	    /**
	     * [getUserInfo 获取用户信息]
	     * @param  {[type]}   key      [description]
	     * @param  {Function} callback [description]
	     * @return {[type]}            [description]
	     */
	    getUserInfo: function(key, callback) {
	        var value;
	        var email;
	        var self = this;
	        var _key = key;
	        var _callback = callback;
	        var getParam = function() {
	            if (_.isFunction(_key)) {
	                return self.get();
	            }
	            return self.get(_key);
	        };
	        if (this.isLogined()) {
	            email = this.get('isEmailVerified');
	            if (!_callback) {
	                _callback = _key;
	            }
	            if (email) {
	                if (_.isFunction(_callback)) {
	                    value = getParam();
	                    _callback.call(this, value);
	                }
	            } else {
	                this.fetchUserInfo(function() {
	                    if (_.isFunction(_callback)) {
	                        value = getParam();
	                        _callback.call(self, value);
	                    }
	                });
	            }
	        }
	    },
	    /**
	     * [checkUserEmail 检查用户是否绑定邮箱]
	     * @param  {Function} callback [description]
	     * @return {[type]}            [description]
	     */
	    checkUserEmail: function(callback) {
	        var self = this;
	        this.getUserInfo('isEmailVerified', function(isEmailVerified) {
	            if (isEmailVerified) {
	                if (typeof callback === 'function') {
	                    callback.call(self);
	                }
	            } else {
	                Dialog.classInstanceDialog(checkEmailHTML, {
	                    title: '邮箱验证',
	                    width: 400,
	                    height: 100,
	                    isAutoShow: true
	                });
	            }
	        });
	    },
	    /**
	     * [checkVIPUser 检查是否为VIP用户]
	     * @return {[type]} [description]
	     */
	    checkUserVIP: function(success, error) {
	        var vip;
	        var self = this;
	        if (this.isLogined()) {
	            this.login(function() {
	                self.fetchVIPInfo(success, error);
	            });
	        } else {
	            vip = this.get('vipInfo');
	            if (vip) {
	                if (vip && !vip.error && vip.realVip && ~~vip.realVip > 0) {
	                    success(vip);
	                }
	            } else {
	                this.fetchVIPInfo(success, error);
	            }
	        }
	    },
	    /**
	     * [emit 初始化]
	     * @return {[type]} [description]
	     */
	    emit: function() {
	        var token = this.getToken();
	        var uinf = cookie.get('u_inf');
	        if (token) {
	            if (uinf && uinf.length > 0) {
	                this.readUserInfoForCookie(uinf);
	            } else {
	                this.fetchUserInfo();
	            }
	        }
	    },
	    /**
	     * [isVIPUser 判断是否是vip用户]
	     * @return {Boolean} [description]
	     */
	    isVIPUser: function() {
	        var list;
	        var token;
	        var val;
	        token = cookie.get('token');
	        if (token) {
	            list = token.split('.');
	            if (list.length > 2) {
	                val = list[2];
	                return ~~val[0] > 0;
	            }
	        }
	        return false;
	    },
	    /**
	     * [readUserInfoForCookie 从cookie中读取用户信息]
	     * @param  {[type]} u_inf [description]
	     * @return {[type]}       [description]
	     */
	    readUserInfoForCookie: function(uinfs) {
	        var uinf;
	        var users;
	        var splitChar;
	        splitChar = String.fromCharCode(2);
	        uinf = decodeURIComponent(uinfs);
	        users = uinf.split(splitChar);
	        this.set({
	            userId: ~~users[0],
	            userName: users[1],
	            headImg: users[4]
	        });
	    },
	    /**
	     * [fetchUserInfo 获取用户信息]
	     * @param  {Function} callback [description]
	     * @return {[type]}            [description]
	     */
	    fetchUserInfo: function(callback) {
	        var self = this;
	        var promise = this.fetchUserInfoForDBModel.executeJSONP();
	        promise.done(function(response) {
	            alert('stop');
	            self.set(response);
	            if (_.isFunction(callback)) {
	                callback.call(self);
	            }
	        });
	        promise.fail(function() {
	            if (_.isFunction(callback)) {
	                callback.call(self.e);
	            }
	        });
	    },
	    /**
	     * [fetchVIPInfo 获取vip信息]
	     * @return {[type]}         [description]
	     */
	    fetchVIPInfo: function() {
	        var self = this;
	        var defer = $.Deferred();
	        var promise = this.checkVIPModel.executeJSONP();
	        promise.done(function(result) {
	            if (result && !result.error) {
	                if ((result.realVip && parseInt(result.realVip, 10) > 0) || result.isWo) {
	                    self.set('vipInfo', result);
	                    defer.resolve.call(self, result);
	                }
	            }
	        });
	        promise.fail(function(e) {
	            defer.reject.call(self, e);
	        });
	        return defer.promise();
	    },
	    /**
	     * [getToken 获取token]
	     * @return {[type]} [description]
	     */
	    getToken: function() {
	        return cookie.get('token');
	    },
	    getWebToken: function() {
	        var token = cookie.get('token');
	        return token ? ('web-' + token) : '';
	    },
	    /**
	     * [getUserId 获取userId]
	     * @return {[type]} [description]
	     */
	    getUserId: function() {
	        return this.get('userId');
	    }
	});
	var shared = null;
	var reload_chose = false;
	if(cookie.get('token')){
	    reload_chose = true;
	}
	UserModel.sharedInstanceUserModel = function () {
	  if (!shared) {
	    shared = new UserModel();
	    shared.on('change:userId', function () {
	        if(!reload_chose){
	            window.location.reload();
	        }
	      shared.trigger('login');
	      shared.trigger('logined');
	    });
	    shared.emit();
	  }
	  return shared;
	};
	
	UserModel.get = function(name) {
	  if (shared) {
	      return shared.get(name);
	  }
	  return null;
	};
	
	module.exports = UserModel;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Auxiliary=t():e.Auxiliary=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){var r=n(1),o=n(2),i=n(3),a=n(4),s=n(5),c=n(7);e.exports={url:r,sheet:o,isNativeFunction:i,cookie:a,AjaxForm:s,UploadFile:c}},function(e,t){"use strict";var n=[];window.location;e.exports={parse:function(e){var t=document.createElement("a");t.href=e;for(var n,r={port:t.port,protocol:t.protocol.replace(":",""),hash:t.hash.replace("#",""),host:t.host,href:t.href,hostname:t.hostname,pathname:t.pathname,search:t.search,query:{}},o=r.search.replace(/^\?/,"").split("&"),i=o.length,a=0;i>a;a++)o[a]&&(n=o[a].split("="),r.query[n[0]]=n[1]);return t=null,r},format:function(e,t){var r=0,o=t.query,i=t.hash;if(n.length=0,n.push(e.lastIndexOf("?")>-1?e:e+"?"),o)for(var a in o){var s=o[a];r?n.push("&"+a+"="+s):(r++,n.push(a+"="+s))}return i&&n.push(i.indexOf("#")>-1?i:"#"+i),n.join("")},resolve:function(e,t){return/^(.\/)/.test(t)&&(t=t.replace(/^(.\/)/,"/")),/^(..\/)/.test(t)&&(e=e.substr(0,e.lastIndexOf("/")),t=t.replace(/^(..\/)/,"/")),e+t},extname:function(e){var t=e.split(".");return t[t.length-1]||""},parseSearch:function(e){for(var t,n,r={},o=e.replace(/^\?/,"").split("&"),i=o.length,a=0;i>a;a++)o[a]&&(n=o[a].split("="),t=n[1],(/^\[/.test(t)&&/\]$/.test(t)||/^{/.test(t)||/\}$/.test(t))&&(t=JSON.parse(t)),r[n[0]]=t);return r}}},function(e,t){"use strict";function n(){var e=document.createElement("style");return e.appendChild(document.createTextNode("")),document.head.appendChild(e),e.sheet}e.exports=n()},function(e,t){"use strict";function n(e){var t=typeof e;return"function"===t?a.test(o.call(e)):e&&"object"===t&&i.test(r.call(e))||!1}e.exports=n;var r=Object.prototype.toString,o=Function.prototype.toString,i=/^\[object .+?Constructor\]$/,a=RegExp("^"+String(r).replace(/[.*+?^${}()|[\]\/\\]/g,"\\$&").replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$")},function(e,t){"use strict";function n(){for(var e=0,t={};e<arguments.length;e++){var n=arguments[e];for(var r in n)t[r]=n[r]}return t}function r(e){function t(r,o,i){var a;if(arguments.length>1){if(i=n({path:"/"},t.defaults,i),"number"==typeof i.expires){var s=new Date;s.setMilliseconds(s.getMilliseconds()+864e5*i.expires),i.expires=s}try{a=JSON.stringify(o),/^[\{\[]/.test(a)&&(o=a)}catch(c){}return o=e.write?e.write(o,r):encodeURIComponent(String(o)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),r=encodeURIComponent(String(r)),r=r.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),r=r.replace(/[\(\)]/g,escape),document.cookie=[r,"=",o,i.expires&&"; expires="+i.expires.toUTCString(),i.path&&"; path="+i.path,i.domain&&"; domain="+i.domain,i.secure?"; secure":""].join("")}r||(a={});for(var p=document.cookie?document.cookie.split("; "):[],l=/(%[0-9A-Z]{2})+/g,u=0;u<p.length;u++){var f=p[u].split("="),h=f[0].replace(l,decodeURIComponent),d=f.slice(1).join("=");'"'===d.charAt(0)&&(d=d.slice(1,-1));try{if(d=e.read?e.read(d,h):e(d,h)||d.replace(l,decodeURIComponent),this.json)try{d=JSON.parse(d)}catch(c){}if(r===h){a=d;break}r||(a[h]=d)}catch(c){}}return a}return t.get=t.set=t,t.getJSON=function(){return t.apply({json:!0},[].slice.call(arguments))},t.defaults={},t.remove=function(e,r){t(e,"",n(r,{expires:-1}))},t.withConverter=r,t}e.exports=r(function(){})},function(e,t,n){"use strict";var r=(n(1),n(6)),o=function(e){e=e||{},this.$el="string"==typeof e.el?$(e.el):e.el,this.uid=r("AjaxForm-"),this.loadState=!1,this._init()};o.prototype._init=function(){var e=$.Deferred();$.extend(this,e.promise()),this._createIframe(),this._addEvent(e)},o.prototype._createIframe=function(){var e='<iframe id="'+this.uid+'" name="'+this.uid+'"  style="display: none;" src="about:blank"></iframe>';this.$el.attr("target",this.uid),this.$el.append(e),this._iframe=$("#"+this.uid),$("<input />").attr({type:"hidden",name:"cross_post",value:"1"}).appendTo(this.$el)},o.prototype._addEvent=function(e){var t=this;this._iframe.on("load",function(){if(t.loadState){var n=this.contentWindow,r=n.location;if("about:blank"===r.href)e.reject(n);else try{var o=this._iframe[0].contentWindow.document.body;innerText=o.innerText,innerText||(innerText=o.innerHTML),innerText&&e.resolve($.parseJSON(innerText))}catch(i){e.resolve(n)}t.loadState=!1}})},o.prototype.encrypto=function(e){var t=this;$.each(e,function(e,n){var r=t.$el.find("[name="+e+"]");0===r.length?$("<input />").attr({type:"hidden",name:e,value:n}).appendTo(t.$el):r.val(n)})};var i=null;o.sharedInstanceAjaxForm=function(e,t){return i||(t=t||{},t.el=e,i=new o(t)),i},o.classInstanceAjaxForm=function(e,t){return t=t||{},t.el=e,new o(t)},e.exports=o},function(e,t){function n(e){var t=++r+"";return e?e+t:t}e.exports=n;var r=0},function(e,t,n){"use strict";var r=n(1),o=n(5),i=n(6),a=function(e){if(this.$el="string"==typeof e.el?$(e.el):e.el,this.uid=i("UploadFile-"),this.options=e,this._data=e.data||{},this._filename=e.filename||"image",this._url=e.url,!this._url)return void console.warn("配置上传URL");this._init();var t=$.Deferred();$.extend(this,t.promise()),this.ajaxForm=o.classInstanceAjaxForm(this.$el,{type:"img"}),this.ajaxForm.done(function(e){var n=e.location,o=decodeURIComponent(n.search),i=r.parseSearch(o);t.resolve(i)}),this.ajaxForm.fail(function(){t.reject(this)})};a.prototype._init=function(){this._createElement()},a.prototype._createElement=function(){var e="";for(var t in this._data){var n=this._data[t],r=Object.prototype.toString.call(n);"[object Object]"!==r&&"[object Array]"!==r||(n=JSON.stringify(n)),e+='<input type="hidden" name="'+t+"\" value='"+n+"'/>"}e+='<input type="file" class="opacity0 upload-file '+this.options.className+'" name="'+this._filename+'"  />',this.$el.attr("method","POST"),this.$el.attr("action",this._url),this.$el.attr("enctype","multipart/form-data"),this.$el.append(e)},a.prototype.parseErrorMsg=function(e){if(e&&"SUCCESS"==e.state)return!0;var t=1*e.errCode||0;switch(t){case 29:return"上传的文件太大了,请重新上传";case 31:return"请上传JPGE,JPG,PNG,GIF等格式的图片文件"}return"文件上传失败,请重新上传"},a.prototype.submit=function(){this.ajaxForm.loadState=!0,"function"==typeof this._before&&this._before(),this.$el.submit()};var s=null;a.sharedInstanceUploadFile=function(e){return s||(s=new a(e)),s},a.classInstanceUploadFile=function(e){return new a(e)},e.exports=a}])});
	//# sourceMappingURL=auxiliary.min.js.map

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @time {时间}
	 * @author {编写者}
	 * @info 场控管理列表
	 */
	
	'use strict';
	var base = __webpack_require__(24);
	var BaseView = base.View; // View的基类
	var Mask = __webpack_require__(47);
	var mask;
	var uid = 999;
	var _ = __webpack_require__(43);
	
	var View = BaseView.extend({
	    clientRender: false,
	    events: {
	        //  监听事件
	        'click .J_close': '_close'
	    },
	    //  当模板挂载到元素之前
	    beforeMount: function() {
	        this.id = 'YYT_UI_Dialog' + (uid++);
	        this.options = {
	            width: '', // box宽度
	            height: '', // box高度
	            hasMark: true, // 是否显示遮罩层
	            hasClose: true, // 是否显示关闭按钮
	            isRemoveAfterHide: true, // 隐藏后是否自动销毁相关dom
	            isAutoShow: true, // 是否自动显示dialog
	            title: '',
	            className: '',
	            effect: 'fade', // 显示效果 可选none, fade
	            draggable: false,
	            mainClass: 'dialog',
	            closeClass: 'ico_close J_close',
	            closeText: '关闭',
	            onShow: function() {},
	            onHide: function() {}
	        };
	        this.options = _.extend(this.options, this._ICEOptions);
	        this._status = false;
	        this.$el = $('<div id="' + this.id + '" class="' + this.options.mainClass + '"/>')
	            .append(this.$el.show())
	            .addClass(this.options.className)
	            .appendTo(document.body);
	        this.$title = this.$el.find('.upload-title');
	        this._ICEinitEvent();
	    },
	    // 当模板挂载到元素之后
	    afterMount: function() {
	        this.closeTemp = __webpack_require__(48);
	        this.titleTemp = __webpack_require__(49);
	    },
	    // 当事件监听器，内部实例初始化完成，模板挂载到文档之后
	    ready: function() {
	        // 渲染模板
	        this._renderTitle();
	        this._renderClose();
	        // 获取位置
	        this._adjustPosition();
	        this.on('show', function() {
	            this._status = true;
	            this._toggle('show');
	        });
	        this.on('hide', function() {
	            this._status = false;
	            this._toggle('hide');
	        });
	        this.on('show', this.options.onShow, this.$el);
	        this.on('hide', this.options.onHide, this.$el);
	        if (this.options.isAutoShow) {
	            this.trigger('show');
	        }
	        if (typeof this.options.attached === 'function') {
	            this.options.attached.call(this);
	        }
	    },
	    _renderTitle: function() {
	        var title = this.options.title;
	        if (title) {
	            this.$title.text(title);
	        }
	    },
	    _renderClose: function() {
	        var self = this;
	        var id = 'dialogClose' + (uid++);
	        var closeHTML;
	        if (this.options.hasClose) {
	            closeHTML = this.compileHTML(this.closeTemp, {
	                closeClass: this.options.closeClass,
	                closeText: this.options.closeText,
	                id: id
	            });
	            $(closeHTML).attr('hidefocus', 'true').appendTo(this.$el);
	            $('#' + id).on('click', function(e) {
	                e.preventDefault();
	                self.hide();
	            });
	        }
	    },
	    _adjustPosition: function() {
	        var size = {
	            width: this.options.width || this.$el.innerWidth(),
	            height: this.options.height ? this.options.height : this.$el.innerHeight()
	        };
	        this.$el.css(_.extend({
	            marginLeft: -(size.width / 2),
	            marginTop: -(size.height / 2)
	        }, size));
	    },
	    _close: function() {
	        this.trigger('hide');
	    },
	    _toggle: function(action) {
	        var effect = this.options.effect;
	        var self = this;
	        if (action === 'show') {
	            if (effect === 'none') {
	                this.$el.css('display', 'block');
	            } else if (effect === 'fade') {
	                this.$el.fadeIn();
	            }
	        } else if (action === 'hide') {
	            if (effect === 'none') {
	                this.$el.css('display', 'none');
	            } else if (effect === 'fade') {
	                this.$el.fadeOut();
	            }
	            if (this.options.isRemoveAfterHide) {
	                setTimeout(function() {
	                    self.$el.remove();
	                }, 2000);
	            }
	        }
	        this._toggleMask(action);
	    },
	    _toggleMask: function(action) {
	        if (this.options.hasMark) {
	            if (action === 'show') {
	                mask.show();
	            } else if (action === 'hide') {
	                mask.hide();
	            }
	        }
	    },
	    status: function() {
	        return this._status ? 'show' : 'hide';
	    },
	    show: function() {
	        this.trigger('show');
	        return this;
	    },
	    hide: function() {
	        this.trigger('hide');
	        return this;
	    },
	    destroy: function() {
	        this.$el.remove();
	        mask.hide();
	    },
	    resize: function(width, height) {
	        this.options.width = width;
	        this.options.height = height;
	        this._adjustPosition();
	        return this;
	    },
	    title: function(title) {
	        if (this.$title) {
	            this.$title.html(title);
	        }
	        return this;
	    }
	});
	var shared = null;
	View.sharedInstanceDialog = function(options) {
	    if (!shared) {
	        if (!mask) {
	            mask = Mask.classInstanceMask();
	        }
	        shared = new View(options || {});
	    }
	    return shared;
	};
	View.classInstanceDialog = function(content, options) {
	    var ops = options || {};
	    ops.el = content || '<b>11111111</b>';
	    if (!mask) {
	        mask = Mask.classInstanceMask();
	    }
	    return new View(ops);
	};
	module.exports = View;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 clientRender:{bool} // 默认设置为false，如果为true，内部将不会调用rawLoader方法或者根据templateUrl请求模版
	 */
	
	
	/**
	 * @time {时间}
	 * @author {编写者}
	 * @info {实现的功能}
	 */
	
	'use strict';
	
	var base = __webpack_require__(24);
	var BaseView = base.View; //  View的基类
	var doc = $(document);
	var isIE6 = navigator.userAgent.indexOf('MSIE 6.0') !== -1;
	var style = {
	  position: isIE6 ? 'absolute' : 'fixed',
	  top: 0,
	  left: 0,
	  width: '100%',
	  height: isIE6 ? doc.outerHeight(true) : '100%',
	  display: 'none',
	  'z-index': 998,
	  opacity: 0.2,
	  'background-color': 'black'
	};
	var View = BaseView.extend({
	  clientRender: false,
	  // 当模板挂载到元素之前
	  beforeMount: function () {
	    this.element = $('<iframe/>').attr({
	      frameborder: 0,
	      scrolling: 'no'
	    }).css(style).appendTo(document.body);
	  },
	  // 当模板挂载到元素之后
	  afterMount: function () {
	
	  },
	  // 当事件监听器，内部实例初始化完成，模板挂载到文档之后
	  ready: function () {
	
	  },
	  show: function () {
	    this.element.fadeIn();
	  },
	  hide: function () {
	    this.element.fadeOut();
	  }
	});
	
	var shared = null;
	View.sharedInstanceMask = function () {
	  if (!shared) {
	    shared = new View();
	  }
	  return shared;
	};
	View.classInstanceMask = function () {
	  return new View();
	};
	module.exports = View;


/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = "<a  href=\"\" id=\"{{id}}\" class=\"{{closeClass}} icons am-yyt-close close-white\"></a>\r\n"

/***/ },
/* 49 */
/***/ function(module, exports) {

	module.exports = "<h3 class=\"dialog_title J_title\">{{title}}</h3>\r\n"

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @time {时间}
	 * @author {编写者}
	 * @info {实现的功能}
	 */
	
	'use strict';
	
	var Auxiliary = __webpack_require__(45);
	// Diglog类
	var Dialog = __webpack_require__(46);
	var AjaxForm = Auxiliary.AjaxForm;
	var url = Auxiliary.url;
	var pwdencrypt = __webpack_require__(51);
	var loginBoxTemp = __webpack_require__(52);
	var tplEng = __webpack_require__(27);
	var secret = __webpack_require__(53);
	
	
	// 邮件
	var EMAIL_PATTERN =
	    /^([a-zA-Z0-9_\.\-\+])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	// 数字
	var NUMBER_PATTERN =
	    /^[+-]?[1-9][0-9]*(\.[0-9]+)?([eE][+-][1-9][0-9]*)?$|^[+-]?0?\.[0-9]+([eE][+-][1-9][0-9]*)?$/;
	
	/* 标记是否极验验证通过 */
	var isGeetest = false;
	var Geetest;
	var errorinfo;
	var email;
	var password;
	var loginBoxForm;
	var ajaxForm;
	var dialog;
	var user;
	
	// 验证成功
	window.gt_custom_ajax = function(result) {
	    var info;
	    if (result) {
	        isGeetest = true;
	        info = loginBoxForm.find('.errorinfo');
	        if (info.html() === '拖动滑块完成验证') {
	            info.css('visibility', 'hidden');
	        }
	    }
	};
	
	// 加密字段
	function _setFocusEffect(input) {
	    if (input.attr('name') === 'email') {
	        input.focus(function() {
	            $(this).parent().addClass('emailfocus').removeClass('emailerror');
	        });
	        input.blur(function() {
	            $(this).parent().removeClass('emailfocus');
	        });
	    } else {
	        input.focus(function() {
	            $(this).parent().addClass('focus').removeClass('error');
	        });
	        input.blur(function() {
	            $(this).parent().removeClass('focus');
	        });
	    }
	}
	
	// 验证码
	function refreshGeetest() {
	    Geetest.refresh();
	    isGeetest = false;
	}
	// 初始化登录表单
	function _initForm() {
	    var UserModel = __webpack_require__(44);
	    errorinfo = loginBoxForm.find('.errorinfo');
	    email = loginBoxForm.find('[name=email]');
	    password = loginBoxForm.find('.pwd');
	    _setFocusEffect(email);
	    _setFocusEffect(password);
	    user = UserModel.sharedInstanceUserModel();
	    $('<input />').attr({
	        type: 'hidden',
	        name: 'cross_post',
	        value: '1'
	    }).appendTo(loginBoxForm);
	}
	// 加密字段
	function cryptoParam() {
	    return [$.trim(email.val()) + $.trim(password.val())];
	}
	
	function validator() {
	    var emailVal = $.trim(email.val());
	    var passwordVal = $.trim(password.val());
	    if (emailVal.length === 0) {
	        errorinfo.text('邮箱或手机不能为空').css('visibility', 'visible');
	        email.parent().addClass('emailerror');
	        return false;
	    }
	    if (!EMAIL_PATTERN.test(emailVal)) {
	        if (NUMBER_PATTERN.test(emailVal)) {
	            if (emailVal.length !== 11) {
	                errorinfo.text('请输入正确的电子邮箱或手机').css('visibility', 'visible');
	                email.parent().addClass('emailerror');
	                return false;
	            }
	        } else {
	            errorinfo.text('请输入正确的电子邮箱或手机').css('visibility', 'visible');
	            email.parent().addClass('emailerror');
	            return false;
	        }
	    }
	    if (passwordVal.length === 0) {
	        errorinfo.text('密码不能为空').css('visibility', 'visible');
	        password.parent().addClass('error');
	        return false;
	    }
	    if (passwordVal.length < 4 || passwordVal.length > 20) {
	        errorinfo.text('密码长度必须大于4且小于20').css('visibility', 'visible');
	        password.parent().addClass('error');
	        return false;
	    }
	    return true;
	}
	
	function isPassTest() {
	    var errorText = '拖动滑块完成验证';
	    if (!validator()) {
	        return false;
	    }
	    if (!isGeetest) {
	        errorinfo.text(errorText).css('visibility', 'visible');
	        return false;
	    }
	    if (loginBoxForm.find('[name=encpsw]').length !== 0) {
	        loginBoxForm.find('[name=encpsw]').val(pwdencrypt(password.val()));
	    } else {
	        $('<input />').attr({
	            type: 'hidden',
	            name: 'encpsw',
	            value: pwdencrypt(password.val())
	        }).appendTo(loginBoxForm);
	    }
	    return true;
	}
	
	// 模拟submit
	function loginSubmit(e) {
	    var _crytoP = cryptoParam();
	    e.preventDefault();
	    if (isPassTest()) {
	        ajaxForm = AjaxForm.classInstanceAjaxForm(loginBoxForm);
	        ajaxForm.encrypto(secret.apply(window, _crytoP));
	        ajaxForm.done(function(cw) {
	            var search = decodeURIComponent(cw.location.search);
	            var response = url.parseSearch(search);
	            response = response.json;
	            if (!response.error) {
	                if (response.platFormRef) {
	                    location.href = 'http://login.yinyuetai.com/platform';
	                } else {
	                    user.set(response);
	                    dialog.trigger('hide');
	                    window.location.reload();
	                }
	            } else {
	
	                errorinfo.text(response.message).css('visibility', 'visible');
	                refreshGeetest();
	            }
	        });
	        ajaxForm.fail(function(cw) {
	            console.log(cw);
	        });
	        ajaxForm.loadState = true;
	        this.submit();
	    }
	}
	
	function compileHTML(tplStr, data) {
	    return tplEng.compile(tplStr)(data);
	}
	
	function LoginBox() {
	    var dialogHTML = compileHTML(loginBoxTemp, {
	        url: 'http://login.yinyuetai.com'
	    });
	    if (!dialog) {
	        dialog = Dialog.classInstanceDialog(dialogHTML, {
	            width: 691,
	            height: 342,
	            isRemoveAfterHide: false,
	            isAutoShow: false
	        });
	        loginBoxForm = dialog.$el.find('#loginBoxForm');
	        dialog.on('show', function() {
	            if (!Geetest) {
	                /* 添加验证框*/
	                Geetest = new window.Geetest({
	                    gt: 'cc34bd7df5c42f7d9c3f540fdfb671cf',
	                    product: 'float'
	                });
	                Geetest.appendTo('#captcha');
	            }
	            _initForm();
	            // UA_Opt.reload();
	            $.getJSON('http://www.yinyuetai.com/partner/get-partner-code?placeIds=reg_window&callback=?', function(data) {
	                if (data && data.reg_window) {
	                    self.dialog.$el.find('.loginbox-placehold').html(data.reg_window);
	                }
	            });
	        });
	        dialog.on('hide', function() {
	            var form = dialog.$el.find('form');
	            form.find('.errorinfo').css('visibility', 'hidden');
	            form.find('[name=email],[name=password]')
	                .parent()
	                .removeClass('emailerror')
	                .removeClass('error');
	            // 去掉悦单播放页面中下载悦单的active效果
	            $('.J_pop_download').removeClass('v_button_curv');
	            // setTimeout(function() {
	            //     refreshGeetest();
	            // }, 500);
	        });
	        loginBoxForm.on('submit', loginSubmit);
	    }
	    return {
	        dialog: dialog
	    };
	}
	module.exports = LoginBox;


/***/ },
/* 51 */
/***/ function(module, exports) {

	function yytcrypt(o) {
		var l = 0, S = 1, t = "inputvec", O = 1, C = "yytcdn2b";
		var B = new Array(16843776, 0, 65536, 16843780, 16842756, 66564, 4, 65536, 1024, 16843776, 16843780, 1024, 16778244, 16842756,
				16777216, 4, 1028, 16778240, 16778240, 66560, 66560, 16842752, 16842752, 16778244, 65540, 16777220, 16777220, 65540, 0,
				1028, 66564, 16777216, 65536, 16843780, 4, 16842752, 16843776, 16777216, 16777216, 1024, 16842756, 65536, 66560, 16777220,
				1024, 4, 16778244, 66564, 16843780, 65540, 16842752, 16778244, 16777220, 1028, 66564, 16843776, 1028, 16778240, 16778240, 0,
				65540, 66560, 0, 16842756);
		var A = new Array(-2146402272, -2147450880, 32768, 1081376, 1048576, 32, -2146435040, -2147450848, -2147483616, -2146402272,
				-2146402304, -2147483648, -2147450880, 1048576, 32, -2146435040, 1081344, 1048608, -2147450848, 0, -2147483648, 32768,
				1081376, -2146435072, 1048608, -2147483616, 0, 1081344, 32800, -2146402304, -2146435072, 32800, 0, 1081376, -2146435040,
				1048576, -2147450848, -2146435072, -2146402304, 32768, -2146435072, -2147450880, 32, -2146402272, 1081376, 32, 32768,
				-2147483648, 32800, -2146402304, 1048576, -2147483616, 1048608, -2147450848, -2147483616, 1048608, 1081344, 0, -2147450880,
				32800, -2147483648, -2146435040, -2146402272, 1081344);
		var z = new Array(520, 134349312, 0, 134348808, 134218240, 0, 131592, 134218240, 131080, 134217736, 134217736, 131072, 134349320,
				131080, 134348800, 520, 134217728, 8, 134349312, 512, 131584, 134348800, 134348808, 131592, 134218248, 131584, 131072,
				134218248, 8, 134349320, 512, 134217728, 134349312, 134217728, 131080, 520, 131072, 134349312, 134218240, 0, 512, 131080,
				134349320, 134218240, 134217736, 512, 0, 134348808, 134218248, 131072, 134217728, 134349320, 8, 131592, 131584, 134217736,
				134348800, 134218248, 520, 134348800, 131592, 8, 134348808, 131584);
		var x = new Array(8396801, 8321, 8321, 128, 8396928, 8388737, 8388609, 8193, 0, 8396800, 8396800, 8396929, 129, 0, 8388736, 8388609,
				1, 8192, 8388608, 8396801, 128, 8388608, 8193, 8320, 8388737, 1, 8320, 8388736, 8192, 8396928, 8396929, 129, 8388736,
				8388609, 8396800, 8396929, 129, 0, 0, 8396800, 8320, 8388736, 8388737, 1, 8396801, 8321, 8321, 128, 8396929, 129, 1, 8192,
				8388609, 8193, 8396928, 8388737, 8193, 8320, 8388608, 8396801, 128, 8388608, 8192, 8396928);
		var w = new Array(256, 34078976, 34078720, 1107296512, 524288, 256, 1073741824, 34078720, 1074266368, 524288, 33554688, 1074266368,
				1107296512, 1107820544, 524544, 1073741824, 33554432, 1074266112, 1074266112, 0, 1073742080, 1107820800, 1107820800,
				33554688, 1107820544, 1073742080, 0, 1107296256, 34078976, 33554432, 1107296256, 524544, 524288, 1107296512, 256, 33554432,
				1073741824, 34078720, 1107296512, 1074266368, 33554688, 1073741824, 1107820544, 34078976, 1074266368, 256, 33554432,
				1107820544, 1107820800, 524544, 1107296256, 1107820800, 34078720, 0, 1074266112, 1107296256, 524544, 33554688, 1073742080,
				524288, 0, 1074266112, 34078976, 1073742080);
		var v = new Array(536870928, 541065216, 16384, 541081616, 541065216, 16, 541081616, 4194304, 536887296, 4210704, 4194304, 536870928,
				4194320, 536887296, 536870912, 16400, 0, 4194320, 536887312, 16384, 4210688, 536887312, 16, 541065232, 541065232, 0,
				4210704, 541081600, 16400, 4210688, 541081600, 536870912, 536887296, 16, 541065232, 4210688, 541081616, 4194304, 16400,
				536870928, 4194304, 536887296, 536870912, 16400, 536870928, 541081616, 4210688, 541065216, 4210704, 541081600, 0, 541065232,
				16, 16384, 541065216, 4210704, 16384, 4194320, 536887312, 0, 541081600, 536870912, 4194320, 536887312);
		var u = new Array(2097152, 69206018, 67110914, 0, 2048, 67110914, 2099202, 69208064, 69208066, 2097152, 0, 67108866, 2, 67108864,
				69206018, 2050, 67110912, 2099202, 2097154, 67110912, 67108866, 69206016, 69208064, 2097154, 69206016, 2048, 2050, 69208066,
				2099200, 2, 67108864, 2099200, 67108864, 2099200, 2097152, 67110914, 67110914, 69206018, 69206018, 2, 2097154, 67108864,
				67110912, 2097152, 69208064, 2050, 2099202, 69208064, 2050, 67108866, 69208066, 69206016, 2099200, 0, 2, 69208066, 0,
				2099202, 69206016, 2048, 67108866, 67110912, 2048, 2097154);
		var q = new Array(268439616, 4096, 262144, 268701760, 268435456, 268439616, 64, 268435456, 262208, 268697600, 268701760, 266240,
				268701696, 266304, 4096, 64, 268697600, 268435520, 268439552, 4160, 266240, 262208, 268697664, 268701696, 4160, 0, 0,
				268697664, 268435520, 268439552, 266304, 262144, 266304, 262144, 268701696, 4096, 64, 268697664, 4096, 266304, 268439552,
				64, 268435520, 268697600, 268697664, 268435456, 262144, 268439616, 0, 268701760, 262208, 268435520, 268697600, 268439552,
				268439616, 0, 268701760, 266240, 266240, 4160, 4160, 262208, 268435456, 268701696);
		pc2bytes0 = new Array(0, 4, 536870912, 536870916, 65536, 65540, 536936448, 536936452, 512, 516, 536871424, 536871428, 66048, 66052,
				536936960, 536936964);
		pc2bytes1 =
				new Array(0, 1, 1048576, 1048577, 67108864, 67108865, 68157440, 68157441, 256, 257, 1048832, 1048833, 67109120, 67109121,
						68157696, 68157697);
		pc2bytes2 = new Array(0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272, 0, 8, 2048, 2056, 16777216, 16777224, 16779264,
				16779272);
		pc2bytes3 = new Array(0, 2097152, 134217728, 136314880, 8192, 2105344, 134225920, 136323072, 131072, 2228224, 134348800, 136445952,
				139264, 2236416, 134356992, 136454144);
		pc2bytes4 = new Array(0, 262144, 16, 262160, 0, 262144, 16, 262160, 4096, 266240, 4112, 266256, 4096, 266240, 4112, 266256);
		pc2bytes5 = new Array(0, 1024, 32, 1056, 0, 1024, 32, 1056, 33554432, 33555456, 33554464, 33555488, 33554432, 33555456, 33554464,
				33555488);
		pc2bytes6 =
				new Array(0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746, 0, 268435456, 524288, 268959744, 2, 268435458,
						524290, 268959746);
		pc2bytes7 = new Array(0, 65536, 2048, 67584, 536870912, 536936448, 536872960, 536938496, 131072, 196608, 133120, 198656, 537001984,
				537067520, 537004032, 537069568);
		pc2bytes8 =
				new Array(0, 262144, 0, 262144, 2, 262146, 2, 262146, 33554432, 33816576, 33554432, 33816576, 33554434, 33816578, 33554434,
						33816578);
		pc2bytes9 =
				new Array(0, 268435456, 8, 268435464, 0, 268435456, 8, 268435464, 1024, 268436480, 1032, 268436488, 1024, 268436480, 1032,
						268436488);
		pc2bytes10 =
				new Array(0, 32, 0, 32, 1048576, 1048608, 1048576, 1048608, 8192, 8224, 8192, 8224, 1056768, 1056800, 1056768, 1056800);
		pc2bytes11 = new Array(0, 16777216, 512, 16777728, 2097152, 18874368, 2097664, 18874880, 67108864, 83886080, 67109376, 83886592,
				69206016, 85983232, 69206528, 85983744);
		pc2bytes12 = new Array(0, 4096, 134217728, 134221824, 524288, 528384, 134742016, 134746112, 16, 4112, 134217744, 134221840, 524304,
				528400, 134742032, 134746128);
		pc2bytes13 = new Array(0, 4, 256, 260, 0, 4, 256, 260, 1, 5, 257, 261, 1, 5, 257, 261);
		var M = C.length > 8 ? 3 : 1;
		var y = new Array(32 * M);
		var f = new Array(0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0);
		var E, h, K = 0, J = 0, k;
		for (var N = 0; N < M; N++) {
			g = (C.charCodeAt(K++) << 24) | (C.charCodeAt(K++) << 16) | (C.charCodeAt(K++) << 8) | C.charCodeAt(K++);
			I = (C.charCodeAt(K++) << 24) | (C.charCodeAt(K++) << 16) | (C.charCodeAt(K++) << 8) | C.charCodeAt(K++);
			k = ((g >>> 4) ^ I) & 252645135;
			I ^= k;
			g ^= (k << 4);
			k = ((I >>> -16) ^ g) & 65535;
			g ^= k;
			I ^= (k << -16);
			k = ((g >>> 2) ^ I) & 858993459;
			I ^= k;
			g ^= (k << 2);
			k = ((I >>> -16) ^ g) & 65535;
			g ^= k;
			I ^= (k << -16);
			k = ((g >>> 1) ^ I) & 1431655765;
			I ^= k;
			g ^= (k << 1);
			k = ((I >>> 8) ^ g) & 16711935;
			g ^= k;
			I ^= (k << 8);
			k = ((g >>> 1) ^ I) & 1431655765;
			I ^= k;
			g ^= (k << 1);
			k = (g << 8) | ((I >>> 20) & 240);
			g = (I << 24) | ((I << 8) & 16711680) | ((I >>> 8) & 65280) | ((I >>> 24) & 240);
			I = k;
			for (var P = 0; P < f.length; P++) {
				if (f[P]) {
					g = (g << 2) | (g >>> 26);
					I = (I << 2) | (I >>> 26)
				} else {
					g = (g << 1) | (g >>> 27);
					I = (I << 1) | (I >>> 27)
				}
				g &= -15;
				I &= -15;
				E = pc2bytes0[g >>> 28] | pc2bytes1[(g >>> 24) & 15] | pc2bytes2[(g >>> 20) & 15] | pc2bytes3[(g >>> 16) & 15] |
						pc2bytes4[(g >>> 12) & 15] | pc2bytes5[(g >>> 8) & 15] | pc2bytes6[(g >>> 4) & 15];
				h = pc2bytes7[I >>> 28] | pc2bytes8[(I >>> 24) & 15] | pc2bytes9[(I >>> 20) & 15] | pc2bytes10[(I >>> 16) & 15] |
						pc2bytes11[(I >>> 12) & 15] | pc2bytes12[(I >>> 8) & 15] | pc2bytes13[(I >>> 4) & 15];
				k = ((h >>> 16) ^ E) & 65535;
				y[J++] = E ^ k;
				y[J++] = h ^ (k << 16)
			}
		}
		var K = 0, P, N, k, a, U, T, g, I, c;
		var L, H, Q, d;
		var D, e;
		var p = o.length;
		var b = 0;
		var M = y.length == 32 ? 3 : 9;
		if (M == 3) {c = S ? new Array(0, 32, 2) : new Array(30, -2, -2)} else {
			c = S ? new Array(0, 32, 2, 62, 30, -2, 64, 96, 2) : new Array(94, 62, -2, 32, 64, 2, 30, -2, -2)
		}
		k = 8 - (p % 8);
		o += String.fromCharCode(k, k, k, k, k, k, k, k);
		if (k == 8) {p += 8}
		result = "";
		tempresult = "";
		while (K < p) {
			g = (o.charCodeAt(K++) << 24) | (o.charCodeAt(K++) << 16) | (o.charCodeAt(K++) << 8) | o.charCodeAt(K++);
			I = (o.charCodeAt(K++) << 24) | (o.charCodeAt(K++) << 16) | (o.charCodeAt(K++) << 8) | o.charCodeAt(K++);
			k = ((g >>> 4) ^ I) & 252645135;
			I ^= k;
			g ^= (k << 4);
			k = ((g >>> 16) ^ I) & 65535;
			I ^= k;
			g ^= (k << 16);
			k = ((I >>> 2) ^ g) & 858993459;
			g ^= k;
			I ^= (k << 2);
			k = ((I >>> 8) ^ g) & 16711935;
			g ^= k;
			I ^= (k << 8);
			k = ((g >>> 1) ^ I) & 1431655765;
			I ^= k;
			g ^= (k << 1);
			g = ((g << 1) | (g >>> 31));
			I = ((I << 1) | (I >>> 31));
			for (N = 0; N < M; N += 3) {
				D = c[N + 1];
				e = c[N + 2];
				for (P = c[N]; P != D; P += e) {
					U = I ^ y[P];
					T = ((I >>> 4) | (I << 28)) ^ y[P + 1];
					k = g;
					g = I;
					I = k ^ (A[(U >>> 24) & 63] | x[(U >>> 16) & 63] | v[(U >>> 8) & 63] | q[U & 63] | B[(T >>> 24) & 63] |
							z[(T >>> 16) & 63] | w[(T >>> 8) & 63] | u[T & 63])
				}
				k = g;
				g = I;
				I = k
			}
			g = ((g >>> 1) | (g << 31));
			I = ((I >>> 1) | (I << 31));
			k = ((g >>> 1) ^ I) & 1431655765;
			I ^= k;
			g ^= (k << 1);
			k = ((I >>> 8) ^ g) & 16711935;
			g ^= k;
			I ^= (k << 8);
			k = ((I >>> 2) ^ g) & 858993459;
			g ^= k;
			I ^= (k << 2);
			k = ((g >>> 16) ^ I) & 65535;
			I ^= k;
			g ^= (k << 16);
			k = ((g >>> 4) ^ I) & 252645135;
			I ^= k;
			g ^= (k << 4);
			tempresult += String.fromCharCode((g >>> 24), ((g >>> 16) & 255), ((g >>> 8) & 255), (g & 255), (I >>> 24), ((I >>> 16) & 255),
					((I >>> 8) & 255), (I & 255));
			b += 8;
			if (b == 512) {
				result += tempresult;
				tempresult = "";
				b = 0
			}
		}
		var F = result + tempresult;
		var G = "";
		var R = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");
		for (var P = 0; P < F.length; P++) {G += R[F.charCodeAt(P) >> 4] + R[F.charCodeAt(P) & 15]}
		return G
	};
	module.exports = yytcrypt;


/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = "<div class=\"loginbox\">\r\n    <div class=\"external\">\r\n        <p class=\"title\">使用合作账号登录<span>(推荐)</span></p>\r\n        <ul>\r\n            <li>\r\n                <a href=\"{{url}}/api/login/sina-auth\" target=\"_blank\" class=\"weibo\" hidefocus>微博帐号</a>\r\n            </li>\r\n            <li>\r\n                <a href=\"{{url}}/api/login/wechat-auth\" target=\"_blank\" class=\"wechat\" hidefocus>微信账号</a>\r\n                <!-- <a href=\"{{url}}/api/login/qq-auth\" target=\"_blank\" class=\"qq\" hidefocus>QQ帐号</a> -->\r\n            </li>\r\n            <li>\r\n                <a href=\"{{url}}/api/login/renren-auth\" target=\"_blank\" class=\"renren\" hidefocus>人人账号</a>\r\n            </li>\r\n            <li>\r\n                <a href=\"{{url}}/api/login/baidu-auth\" target=\"_blank\" class=\"baidu\" hidefocus>百度帐号</a>\r\n            </li>\r\n        </ul>\r\n        <div class=\"loginbox-placehold\"></div>\r\n        <p class=\"text\">快捷登录，无需注册</p>\r\n        <p class=\"text\">与你的朋友分享你的爱！</p>\r\n    </div>\r\n    <div class=\"site\">\r\n        <p class=\"title\">音悦Tai账号登录</p>\r\n        <form id=\"loginBoxForm\" action=\"https://login.yinyuetai.com/login-ajax\" method=\"post\">\r\n            <p class=\"errorinfo\">错误信息提示</p>\r\n            <div class=\"email focuss\">\r\n                <input type=\"text\" name=\"email\" placeholder=\"您的邮箱地址或绑定手机\"/>\r\n            </div>\r\n            <div class=\"password\">\r\n                <input type=\"password\" class=\"pwd\" placeholder=\"请输入密码\"/>\r\n            </div>\r\n            <div id=\"captcha\"></div>\r\n            <div>\r\n                <p class=\"autologin\"><input type=\"checkbox\" id=\"autocheckbox\" name=\"autologin\" checked hidefocus/><label for=\"autocheckbox\">下次自动登录</label></p>\r\n                <a class=\"forgot\" href=\"{{url}}/forgot-password\" target=\"_blank\" hidefocus>忘记密码</a>\r\n            </div>\r\n            <div>\r\n                <input class=\"submit\" type=\"submit\" hidefocus/>\r\n                <p class=\"reg\">还没有音悦Tai账号？<a href=\"{{url}}/register\" target=\"_blank\" hidefocus>立即注册！</a></p>\r\n            </div>\r\n        </form>\r\n    </div>\r\n</div>\r\n"

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	function hex_y(a) {
		return binl2hex(core_y(str2binl(a), a.length * 8));
	}
	
	function hex_y_16(c) {
		var a = hex_y(c);
		a = a.substring(8, 24);
		return y_vv(a);
	}
	
	function core_y(r, k) {
		r[k >> 5] |= 128 << ((k) % 32);
		r[ (((k + 64) >>> 9) << 4) + 14] = k;
		var q = 1732584193;
		var p = -271733879;
		var m = -1732584194;
		var l = 271733878;
		for (var g = 0; g < r.length; g += 16) {
			var j = q;
			var h = p;
			var f = m;
			var e = l;
			q = y_ff(q, p, m, l, r[g + 0], 7, -680876936);
			l = y_ff(l, q, p, m, r[g + 1], 12, -389564586);
			m = y_ff(m, l, q, p, r[g + 2], 17, 606105819);
			p = y_ff(p, m, l, q, r[g + 3], 22, -1044525330);
			q = y_ff(q, p, m, l, r[g + 4], 7, -176418897);
			l = y_ff(l, q, p, m, r[g + 5], 12, 1200080426);
			m = y_ff(m, l, q, p, r[g + 6], 17, -1473231341);
			p = y_ff(p, m, l, q, r[g + 7], 22, -45705983);
			q = y_ff(q, p, m, l, r[g + 8], 7, 1770035416);
			l = y_ff(l, q, p, m, r[g + 9], 12, -1958414417);
			m = y_ff(m, l, q, p, r[g + 10], 17, -42063);
			p = y_ff(p, m, l, q, r[g + 11], 22, -1990404162);
			q = y_ff(q, p, m, l, r[g + 12], 7, 1804603682);
			l = y_ff(l, q, p, m, r[g + 13], 12, -40341101);
			m = y_ff(m, l, q, p, r[g + 14], 17, -1502002290);
			p = y_ff(p, m, l, q, r[g + 15], 22, 1236535329);
			q = y_gg(q, p, m, l, r[g + 1], 5, -165796510);
			l = y_gg(l, q, p, m, r[g + 6], 9, -1069501632);
			m = y_gg(m, l, q, p, r[g + 11], 14, 643717713);
			p = y_gg(p, m, l, q, r[g + 0], 20, -373897302);
			q = y_gg(q, p, m, l, r[g + 5], 5, -701558691);
			l = y_gg(l, q, p, m, r[g + 10], 9, 38016083);
			m = y_gg(m, l, q, p, r[g + 15], 14, -660478335);
			p = y_gg(p, m, l, q, r[g + 4], 20, -405537848);
			q = y_gg(q, p, m, l, r[g + 9], 5, 568446438);
			l = y_gg(l, q, p, m, r[g + 14], 9, -1019803690);
			m = y_gg(m, l, q, p, r[g + 3], 14, -187363961);
			p = y_gg(p, m, l, q, r[g + 8], 20, 1163531501);
			q = y_gg(q, p, m, l, r[g + 13], 5, -1444681467);
			l = y_gg(l, q, p, m, r[g + 2], 9, -51403784);
			m = y_gg(m, l, q, p, r[g + 7], 14, 1735328473);
			p = y_gg(p, m, l, q, r[g + 12], 20, -1926607734);
			q = y_hh(q, p, m, l, r[g + 5], 4, -378558);
			l = y_hh(l, q, p, m, r[g + 8], 11, -2022574463);
			m = y_hh(m, l, q, p, r[g + 11], 16, 1839030562);
			p = y_hh(p, m, l, q, r[g + 14], 23, -35309556);
			q = y_hh(q, p, m, l, r[g + 1], 4, -1530992060);
			l = y_hh(l, q, p, m, r[g + 4], 11, 1272893353);
			m = y_hh(m, l, q, p, r[g + 7], 16, -155497632);
			p = y_hh(p, m, l, q, r[g + 10], 23, -1094730640);
			q = y_hh(q, p, m, l, r[g + 13], 4, 681279174);
			l = y_hh(l, q, p, m, r[g + 0], 11, -358537222);
			m = y_hh(m, l, q, p, r[g + 3], 16, -722521979);
			p = y_hh(p, m, l, q, r[g + 6], 23, 76029189);
			q = y_hh(q, p, m, l, r[g + 9], 4, -640364487);
			l = y_hh(l, q, p, m, r[g + 12], 11, -421815835);
			m = y_hh(m, l, q, p, r[g + 15], 16, 530742520);
			p = y_hh(p, m, l, q, r[g + 2], 23, -995338651);
			q = y_ii(q, p, m, l, r[g + 0], 6, -198630844);
			l = y_ii(l, q, p, m, r[g + 7], 10, 1126891415);
			m = y_ii(m, l, q, p, r[g + 14], 15, -1416354905);
			p = y_ii(p, m, l, q, r[g + 5], 21, -57434055);
			q = y_ii(q, p, m, l, r[g + 12], 6, 1700485571);
			l = y_ii(l, q, p, m, r[g + 3], 10, -1894986606);
			m = y_ii(m, l, q, p, r[g + 10], 15, -1051523);
			p = y_ii(p, m, l, q, r[g + 1], 21, -2054922799);
			q = y_ii(q, p, m, l, r[g + 8], 6, 1873313359);
			l = y_ii(l, q, p, m, r[g + 15], 10, -30611744);
			m = y_ii(m, l, q, p, r[g + 6], 15, -1560198380);
			p = y_ii(p, m, l, q, r[g + 13], 21, 1309151649);
			q = y_ii(q, p, m, l, r[g + 4], 6, -145523070);
			l = y_ii(l, q, p, m, r[g + 11], 10, -1120210379);
			m = y_ii(m, l, q, p, r[g + 2], 15, 718787259);
			p = y_ii(p, m, l, q, r[g + 9], 21, -343485551);
			q = safe_add(q, j);
			p = safe_add(p, h);
			m = safe_add(m, f);
			l = safe_add(l, e);
		}
		return Array(q, p, m, l);
	}
	
	function y_cmn(h, e, d, c, g, f) {
		return safe_add(bit_rol(safe_add(safe_add(e, h), safe_add(c, f)), g), d);
	}
	
	function y_ff(g, f, l, k, e, j, h) {
		return y_cmn((f & l) | ((~f) & k), g, f, e, j, h);
	}
	
	function y_gg(g, f, l, k, e, j, h) {
		return y_cmn((f & k) | (l & (~k)), g, f, e, j, h);
	}
	
	function y_hh(g, f, l, k, e, j, h) {
		return y_cmn(f ^ l ^ k, g, f, e, j, h);
	}
	
	function y_ii(g, f, l, k, e, j, h) {
		return y_cmn(l ^ (f | (~k)), g, f, e, j, h);
	}
	
	function safe_add(a, e) {
		var d = (a & 65535) + (e & 65535);
		var c = (a >> 16) + (e >> 16) + (d >> 16);
		return(c << 16) | (d & 65535);
	}
	
	function bit_rol(a, c) {
		return(a << c) | (a >>> (32 - c));
	}
	
	function str2binl(e) {
		var d = Array();
		var a = (1 << chrsz) - 1;
		for (var c = 0; c < e.length * chrsz; c += chrsz) {
			d[c >> 5] |= (e.charCodeAt(c / chrsz) & a) << (c % 32);
		}
		return d;
	}
	
	function binl2hex(d) {
		var c = "0123456789abcdef";
		var e = "";
		for (var a = 0; a < d.length * 4; a++) {
			e += c.charAt((d[a >> 2] >> ((a % 4) * 8 + 4)) & 15) + c.charAt((d[a >> 2] >> ((a % 4) * 8)) & 15);
		}
		return e;
	}
	
	function y_vv(d) {
		var a = "";
		for (var c = d.length - 1; c >= 0; c--) {
			a += d.charAt(c);
		}
		return a;
	}
	
	function yyt32(c, a) {
		if (a.length != 13) {
			alert("timesign error !!!");
			return "";
		}
		return hex_y(hex_y(c) + a.substring(5, 11));
	}
	
	function yyt16(c, a) {
		if (a.length != 13) {
			alert("timesign error !!!");
			return "";
		}
		return hex_y(hex_y_16(c) + a.substring(5, 11));
	}
	
	var chrsz = 8;
	var Auxiliary = __webpack_require__(45);
	var cookie =  Auxiliary.cookie;
	
	module.exports = function(p0) {
		var t1, t2, p1, p2;
		t1 = "" + (new Date()).getTime();
		t2 = y_vv(t1);
		if (p0 && p0.length != 0) {
			p1 = yyt32(p0, t1);
			p2 = yyt16(p0, t2);
		} else {
			p1 = yyt32(t1, t2);
			p2 = yyt16(t2, t1);
		}
		cookie.set('p2', p2, {
			domain : 'yinyuetai.com',
			path : '/'
		});
		return {
			_t : t1,
			_p1 : p1,
			_p2 : p2
		}
	};


/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = "<div style=\"padding: 20px 30px;\">\r\n  <p>您好像还没有进行邮箱验证。</p>\r\n  <p>为不影响部分功能的使用，请先进行\r\n    <a href=\"{homeSite}/settings/bind\" target=\"_blank\" class=\"special f14\">邮箱验证</a>\r\n  </p>\r\n</div>\r\n"

/***/ },
/* 55 */
/***/ function(module, exports) {

	//Thanks :
	// - https://github.com/aralejs/detector/blob/master/src/detector.js
	// - http://article.yeeyan.org/view/heart5/19211
	
	var prober, userAgent, external, re_msie, toString, DEVICES, OS, ENGINE, BROWSER;
	
	prober = {};
	userAgent = navigator.userAgent || '';
	external = window.external;
	re_msie = /\b(?:msie|ie) ([0-9.]+)/;
	toString = Object.prototype.toString;
	
	function each(object, factory, argument) {
	    var i, len;
	
	    for (i = 0, len = object.length; i < len; i++) {
	        if (factory.call(object, object[i], i) === false) {
	            break;
	        }
	    }
	};
	
	//硬件设备信息识别表达式
	DEVICES = [
	    ['nokia', function(ua) {
	        if (ua.indexOf('nokia ') !== -1) {
	            return /\bnokia ([0-9]+)?/;
	        } else if (/\bnokia[\d]/.test(ua)) {
	            return /\bnokia(\d+)/;
	        } else {
	            return 'nokia';
	        }
	    }],
	    ['wp', function(ua) {
	        return ua.indexOf('windows phone ') !== -1 ||
	            ua.indexOf('xblwp') !== -1 ||
	            ua.indexOf("zunewp") !== -1 ||
	            ua.indexOf("windows ce") !== -1;
	    }],
	    ['mi', function(ua) {
	        if (ua.indexOf('mi-one plus') !== -1) {
	            return {
	                version: '1s'
	            };
	        } else {
	            return /\bmi ([0-9.as]+)/;
	        }
	    }],
	    ['playstation', function(ua) {
	        return (ua.indexOf('playstation') !== -1 ||
	                ua.indexOf('wii') !== -1) &&
	            ua.indexOf('windows') == -1;
	    }],
	    ['blackberry', function(ua) {
	        return (ua.indexOf('blackberry') !== -1 ||
	                ua.indexOf('playbook ') !== -1 ||
	                ua.indexOf('rim') !== -1 ||
	                ua.indexOf('tablet') !== -1 ||
	                ua.indexOf('bb10') !== -1) &&
	            ua.indexOf('windows') == -1;
	    }],
	    ['pc', 'windows'],
	    ['ipad', 'ipad'],
	    ['ipod', 'ipod'],
	    ['iphone', 'iphone'],
	    ['mac', 'macintosh'],
	    ['aliyun', 'aliyunos'],
	    ['meizu', /\bm([0-9]+)\b/],
	    ['nexus', /\bnexus ([0-9.]+)/],
	    ['android', 'android']
	];
	
	//操作系统信息识别表达式
	OS = [
	    ['wp', function(ua) {
	        if (ua.indexOf('windows phone ') !== -1) {
	            return /\bwindows phone (?:os )?([0-9.]+)/;
	        } else if (ua.indexOf("xblwp") !== -1) {
	            return /\bxblwp([0-9.]+)/;
	        } else if (ua.indexOf("zunewp") !== -1) {
	            return /\bzunewp([0-9.]+)/;
	        }
	        return 'windows phone';
	    }],
	    ['windows', /\bwindows nt ([0-9.]+)/],
	    ['macosx', /\bmac os x ([0-9._]+)/],
	    ['ios', /\bcpu(?: iphone)? os ([0-9._]+)/],
	    ['yunos', /\baliyunos ([0-9.]+)/],
	    ['android', /\bandroid[ -]([0-9.]+)/],
	    ['chromeos', /\bcros i686 ([0-9.]+)/],
	    ['linux', 'linux'],
	    ['windowsce', /\bwindows ce(?: ([0-9.]+))?/],
	    ['symbian', /\bsymbianos\/([0-9.]+)/],
	    ['blackberry', 'blackberry']
	];
	
	//渲染引擎信息识别表达式
	ENGINE = [
	    ['trident', re_msie],
	    ['webkit', /\bapplewebkit\/([0-9.+]+)/],
	    ['gecko', /\bgecko\/(\d+)/],
	    ['presto', /\bpresto\/([0-9.]+)/]
	];
	
	//浏览器信息识别表达式
	BROWSER = [
	    ['sg', / se ([0-9.x]+)/],
	    ['mx', function(ua) {
	        try {
	            if (external && (external.mxVersion || external.max_version)) {
	                return {
	                    version: external.mxVersion || external.max_version
	                };
	            }
	        } catch (e) {}
	        return /\bmaxthon(?:[ \/]([0-9.]+))?/;
	    }],
	    ['qq', /\bqqbrowser\/([0-9.]+)/],
	    ['green', 'greenbrowser'],
	    ['tt', /\btencenttraveler ([0-9.]+)/],
	    ['lb', function(ua) {
	        if (ua.indexOf('lbbrowser') === -1) {
	            return false;
	        }
	        var version = '-1';
	        try {
	            if (external && external.LiebaoGetVersion) {
	                version = external.LiebaoGetVersion();
	            }
	        } catch (e) {}
	        return {
	            version: version
	        };
	    }],
	    ['tao', /\btaobrowser\/([0-9.]+)/],
	    ['fs', /\bcoolnovo\/([0-9.]+)/],
	    ['sy', 'saayaa'],
	    // 有基于 Chromniun 的急速模式和基于 IE 的兼容模式。必须在 IE 的规则之前。
	    ['baidu', /\bbidubrowser[ \/]([0-9.x]+)/],
	    ['ie', re_msie],
	    ['mi', /\bmiuibrowser\/([0-9.]+)/],
	    // Opera 15 之后开始使用 Chromniun 内核，需要放在 Chrome 的规则之前。
	    ['opera', function(ua) {
	        var re_opera_old = /\bopera.+version\/([0-9.ab]+)/;
	        var re_opera_new = /\bopr\/([0-9.]+)/;
	        return re_opera_old.test(ua) ? re_opera_old : re_opera_new;
	    }],
	    ['chrome', / (?:chrome|crios|crmo)\/([0-9.]+)/],
	    // Android 默认浏览器。该规则需要在 safari 之前。
	    ['android', function(ua) {
	        if (ua.indexOf('android') === -1) {
	            return;
	        }
	        return /\bversion\/([0-9.]+(?: beta)?)/;
	    }],
	    ['safari', /\bversion\/([0-9.]+(?: beta)?)(?: mobile(?:\/[a-z0-9]+)?)? safari\//],
	    ['firefox', /\bfirefox\/([0-9.ab]+)/],
	    ['uc', function(ua) {
	        return ua.indexOf('ucbrowser') !== -1 ? /\bucbrowser\/([0-9.]+)/ : /\bucweb([0-9.]+)/;
	    }]
	];
	
	//解析使用Trident内核浏览器的"浏览器模式"和"文档模式"信息
	function ieMode(ua) {
	    var m, engineMode, engineVersion, browserMode, browserVersion, compatible, v_mode, v_version;
	
	    if (!re_msie.test(ua)) {
	        return null;
	    }
	
	    compatible = false;
	
	    if (ua.indexOf('trident/') !== -1) {
	        m = /\btrident\/([0-9.]+)/.exec(ua);
	        if (m && m.length >= 2) {
	            engineVersion = m[1];
	            v_version = m[1].split('.');
	            v_version[0] = parseInt(v_version[0], 10) + 4;
	            browserVersion = v_version.join('.');
	        }
	    }
	
	    m = re_msie.exec(ua);
	    browserMode = m[1];
	    v_mode = m[1].split('.');
	    if ('undefined' === typeof browserVersion) {
	        browserVersion = browserMode;
	    }
	    v_mode[0] = parseInt(v_mode[0], 10) - 4;
	    engineMode = v_mode.join('.');
	    if ('undefined' === typeof engineVersion) {
	        engineVersion = engineMode;
	    }
	
	    return {
	        browserVersion: browserVersion,
	        browserMode: browserMode,
	        engineVersion: engineVersion,
	        engineMode: engineMode,
	        compatible: engineVersion !== engineMode
	    };
	};
	
	function matchHandler(name, expression, ua) {
	    var expr, info, t, m;
	
	    if (typeof ua === 'undefined') {
	        ua = userAgent;
	    }
	
	    expr = toString.call(expression) === '[object Function]' ? expression.call(null, ua) : expression;
	    if (!expr) {
	        return null;
	    }
	
	    info = {
	        name: name,
	        version: '-1',
	        codename: ''
	    };
	    t = toString.call(expr);
	
	    if (expr === true) {
	        return info;
	    } else if (t === '[object String]') {
	        if (ua.indexOf(expr) !== -1) {
	            return info;
	        }
	    } else if (toString.call(expr) === '[object Object]') {
	        if (expr.hasOwnProperty('version')) {
	            info.version = expr.version;
	        }
	        return info;
	    } else if (expr.exec) {
	        m = expr.exec(ua);
	        if (m) {
	            if (m.length >= 2 && m[1]) {
	                info.version = m[1].replace(/_/g, '.');
	            } else {
	                info.version = '-1';
	            }
	            return info;
	        }
	    }
	};
	
	function getUAInfoHandler(ua, patterns, factory) {
	    var info;
	
	    info = {
	        name: 'na',
	        version: '-1'
	    };
	
	    each(patterns, function(pattern) {
	        var temp;
	
	        temp = matchHandler(pattern[0], pattern[1], ua);
	        if (temp) {
	            info = temp;
	            return false;
	        }
	    });
	
	    factory(info.name, info.version);
	};
	
	//解析UA，得到device, os, engine, browser信息
	function parse(ua) {
	    var o, ieCore;
	
	    o = {};
	    ua = (ua || '').toLowerCase();
	
	    getUAInfoHandler(ua, DEVICES, function(name, version) {
	        var v;
	
	        v = parseFloat(version);
	        o.device = {
	            name: name,
	            version: v,
	            fullVersion: version
	        };
	        o.device[name] = v;
	    });
	
	    getUAInfoHandler(ua, OS, function(name, version) {
	        var v;
	
	        v = parseFloat(version);
	        o.os = {
	            name: name,
	            version: v,
	            fullVersion: version
	        };
	        o.os[name] = v;
	    });
	
	    ieCore = ieMode(ua);
	
	    getUAInfoHandler(ua, ENGINE, function(name, version) {
	        var mode, v;
	
	        mode = version;
	        if (ieCore) {
	            version = ieCore.engineVersion || ieCore.engineMode;
	            mode = ieCore.engineMode;
	        }
	
	        v = parseFloat(version);
	        o.engine = {
	            name: name,
	            version: v,
	            fullVersion: version,
	            mode: parseFloat(mode),
	            fullMode: mode,
	            compatible: ieCore ? ieCore.compatible : false
	        };
	        o.engine[name] = v;
	    });
	
	    getUAInfoHandler(ua, BROWSER, function(name, version) {
	        var mode, v;
	
	        mode = version;
	        if (ieCore) {
	            if (name === 'ie') {
	                version = ieCore.browserVersion;
	            }
	            mode = ieCore.browserMode;
	        }
	
	        v = parseFloat(version);
	        o.browser = {
	            name: name,
	            version: v,
	            fullVersion: version,
	            mode: parseFloat(mode),
	            fullMode: mode,
	            compatible: ieCore ? ieCore.compatible : false
	        };
	        o.browser[name] = v;
	    });
	
	    return o;
	};
	
	prober = parse(navigator.userAgent);
	prober.parse = parse;
	
	module.exports = prober


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    //Thanks :
	    // - https://github.com/mathiasbynens/jquery-placeholder
	
	    var placeholder, ret;
	
	    ret = (function($) {
	        var isInputSupported = 'placeholder' in document.createElement('input');
	        var isTextareaSupported = 'placeholder' in document.createElement('textarea');
	        var prototype = {};
	        var valHooks = $.valHooks;
	        var propHooks = $.propHooks;
	        var hooks;
	        var placeholder;
	
	        if (isInputSupported && isTextareaSupported) {
	
	            placeholder = prototype.placeholder = function() {
	                return this;
	            };
	
	            placeholder.input = placeholder.textarea = true;
	
	        } else {
	
	            placeholder = prototype.placeholder = function() {
	                var $this = this;
	                $this
	                        .filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
	                        .not('.placeholder')
	                        .bind({
	                            'focus.placeholder' : clearPlaceholder,
	                            'blur.placeholder' : setPlaceholder
	                        })
	                        .data('placeholder-enabled', true)
	                        .trigger('blur.placeholder');
	                return $this;
	            };
	
	            placeholder.input = isInputSupported;
	            placeholder.textarea = isTextareaSupported;
	
	            hooks = {
	                'get' : function(element) {
	                    var $element = $(element);
	
	                    var $passwordInput = $element.data('placeholder-password');
	                    if ($passwordInput) {
	                        return $passwordInput[0].value;
	                    }
	
	                    return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
	                },
	                'set' : function(element, value) {
	                    var $element = $(element);
	
	                    var $passwordInput = $element.data('placeholder-password');
	                    if ($passwordInput) {
	                        return $passwordInput[0].value = value;
	                    }
	
	                    if (!$element.data('placeholder-enabled')) {
	                        return element.value = value;
	                    }
	                    if (value == '') {
	                        element.value = value;
	                        // Issue #56: Setting the placeholder causes problems if the element continues to have focus.
	                        if (element != document.activeElement) {
	                            // We can't use `triggerHandler` here because of dummy text/password inputs :(
	                            setPlaceholder.call(element);
	                        }
	                    } else if ($element.hasClass('placeholder')) {
	                        clearPlaceholder.call(element, true, value) || (element.value = value);
	                    } else {
	                        element.value = value;
	                    }
	                    // `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
	                    return $element;
	                }
	            };
	
	            if (!isInputSupported) {
	                valHooks.input = hooks;
	                propHooks.value = hooks;
	            }
	            if (!isTextareaSupported) {
	                valHooks.textarea = hooks;
	                propHooks.value = hooks;
	            }
	
	            $(function() {
	                // Look for forms
	                $(document).delegate('form', 'submit.placeholder', function() {
	                    // Clear the placeholder values so they don't get submitted
	                    var $inputs = $('.placeholder', this).each(clearPlaceholder);
	                    setTimeout(function() {
	                        $inputs.each(setPlaceholder);
	                    }, 10);
	                });
	            });
	
	            // Clear placeholder values upon page reload
	            $(window).bind('beforeunload.placeholder', function() {
	                $('.placeholder').each(function() {
	                    this.value = '';
	                });
	            });
	
	        }
	
	        function args(elem) {
	            // Return an object of element attributes
	            var newAttrs = {};
	            var rinlinejQuery = /^jQuery\d+$/;
	            $.each(elem.attributes, function(i, attr) {
	                if (attr.specified && !rinlinejQuery.test(attr.name)) {
	                    newAttrs[attr.name] = attr.value;
	                }
	            });
	            return newAttrs;
	        }
	
	        function clearPlaceholder(event, value) {
	            var input = this;
	            var $input = $(input);
	            if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
	                if ($input.data('placeholder-password')) {
	                    $input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
	                    // If `clearPlaceholder` was called from `$.valHooks.input.set`
	                    if (event === true) {
	                        return $input[0].value = value;
	                    }
	                    $input.focus();
	                } else {
	                    input.value = '';
	                    $input.removeClass('placeholder');
	                    input == document.activeElement && input.select();
	                }
	            }
	        }
	
	        function setPlaceholder() {
	            var $replacement;
	            var input = this;
	            var $input = $(input);
	            var id = this.id;
	            if (input.value == '') {
	                if (input.type == 'password') {
	                    if (!$input.data('placeholder-textinput')) {
	                        try {
	                            $replacement = $input.clone().attr({ 'type' : 'text' });
	                        } catch (e) {
	                            $replacement = $('<input>').attr($.extend(args(this), { 'type' : 'text' }));
	                        }
	                        $replacement
	                                .removeAttr('name')
	                                .data({
	                                    'placeholder-password' : $input,
	                                    'placeholder-id' : id
	                                })
	                                .bind('focus.placeholder', clearPlaceholder);
	                        $input
	                                .data({
	                                    'placeholder-textinput' : $replacement,
	                                    'placeholder-id' : id
	                                })
	                                .before($replacement);
	                    }
	                    $input = $input.removeAttr('id').hide().prev().attr('id', id).show();
	                    // Note: `$input[0] != input` now!
	                }
	                $input.addClass('placeholder');
	                $input[0].value = $input.attr('placeholder');
	            } else {
	                $input.removeClass('placeholder');
	            }
	        }
	
	        return placeholder;
	    })($);
	
	    placeholder = (!ret.input || !ret.textarea) ? function(element) {
	        if (!element) {
	            element = $('input, textarea');
	        }
	        if (element) {
	            ret.call($(element));
	        }
	    } : function() {};
	
	    placeholder();
	
	    placeholder.clear = function(element) {
	        element = $(element);
	
	        if (element[0].tagName === 'FORM') {
	            clearInput(element.find('input.placeholder, textarea.placeholder'));
	        } else {
	            clearInput(element);
	        }
	
	        function clearInput(input) {
	            input.each(function(i, item) {
	                item = $(item);
	                if (item[0].value === item.attr('placeholder') && item.hasClass('placeholder')) {
	                    item[0].value = '';
	                }
	            });
	        }
	    };
	
	    module.exports = placeholder;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * @time 2012年10月27日
	 * @author icepy
	 * @info 封装完成本地缓存API
	 *
	 * @time 2016年2月27日
	 * @author icepy
	 * @info 改造兼容webpack打包
	 */
	
	'use strict';
	
	(function(factory) {
	    var root = (typeof self == 'object' && self.self == self && self) ||
	        (typeof global == 'object' && global.global == global && global);
	    if (true) {
	        module.exports = factory();
	    } else if (typeof exports === 'object') {
	        exports['store'] = factory()
	    } else {
	        if (!root.ICEPlugs) {
	            root.ICEPlugs = {};
	        };
	        root.ICEPlugs.store = factory();
	    };
	})(function() {
	    var store = {};
	    var _window = window;
	    var localStorageName = 'localStorage';
	    var sessionStorageName = 'sessionStorage';
	    var rootKey = 'ICEStorageCache';
	    var storage, session;
	    var isLocalStorageNameSupported = function() {
	        try {
	            return (localStorageName in _window && _window[localStorageName]);
	        } catch (err) {
	            return false;
	        }
	    };
	    var isSessionStorageNameSupported = function() {
	        try {
	            return (sessionStorageName in _window && _window[sessionStorageName]);
	        } catch (err) {
	            return false;
	        }
	    };
	    store.disabled = false;
	    store.version = '0.0.1';
	    /**
	     * [has 根据Key判断是否存在]
	     * @param  {[String]}  key [description]
	     * @return {Boolean}     [description]
	     */
	    store.has = function(key) {
	        return store.get(key) !== undefined;
	    };
	
	    /**
	     * [transact 有存储是否成功的回调函数]
	     * @param  {[String]} key           [description]
	     * @param  {[String]} defaultVal    [description]
	     * @param  {[type]} transactionFn [description]
	     */
	    store.transact = function(key, defaultVal, transactionFn) {
	        if (transactionFn == null) {
	            transactionFn = defaultVal;
	            defaultVal = null;
	        }
	
	        if (defaultVal == null) {
	            defaultVal = {};
	        }
	
	        var val = store.get(key, defaultVal);
	        transactionFn(val);
	        store.set(key, val);
	    };
	    /**
	     * [serialize 对象转字符串]
	     * @param  {[Object]} value [description]
	     * @return {[String]}       [description]
	     */
	    store.serialize = function(value) {
	        return JSON.stringify(value);
	    };
	    /**
	     * [deserialize 字符串格式化对象]
	     * @param  {[String]} value [description]
	     * @return {[Object]}       [description]
	     */
	    store.deserialize = function(value) {
	        if (typeof value != 'string') {
	            return undefined;
	        }
	        try {
	            return JSON.parse(value);
	        } catch (e) {
	            return value || undefined;
	        }
	    };
	    if (isLocalStorageNameSupported()) {
	        storage = _window[localStorageName];
	        /**
	         * [set  存储本地缓存]
	         * @param {[String]} key [description]
	         * @param {[Object]} val [description]
	         */
	        store.set = function(key, val) {
	            if (val === undefined) {
	                return store.remove(key);
	            }
	            storage.setItem(key, store.serialize(val));
	            return val;
	        };
	
	        /**
	         * [get 获取本地缓存]
	         * @param  {[String]} key        [description]
	         * @param  {[type]} defaultVal [description]
	         * @return {[Boolean]}            [description]
	         */
	        store.get = function(key, defaultVal) {
	            var val = store.deserialize(storage.getItem(key));
	            return (val === undefined ? defaultVal : val);
	        };
	
	        /**
	         * [remove 根据key名删除一个本地缓存]
	         * @param  {[String]} key [description]
	         */
	        store.remove = function(key) {
	            storage.removeItem(key);
	        };
	
	        /**
	         * [clear 清除所有的本地缓存]
	         */
	        store.clear = function() {
	            storage.clear();
	        };
	
	        /**
	         * [getAll description]
	         * @return {[Object]} [description]
	         */
	        store.getAll = function() {
	            var ret = {};
	            store.forEach(function(key, val) {
	                ret[key] = val;
	            });
	            return ret;
	        };
	        store.forEach = function(callback) {
	            for (var i = 0; i < storage.length; i++) {
	                var key = storage.key(i);
	                callback(key, store.get(key));
	            }
	        };
	        //可以设置过期时间
	        store.expiration = {
	            /**
	             * [set 存储可以设置过期时间的本地缓存]
	             * @param {[String]} key [description]
	             * @param {[Object]} val [description]
	             * @param {[Number]} exp [description]
	             */
	            set: function(key, val, exp) {
	                //exp 接受自然整数，以一小时60分钟为单位
	                var Root = store.get(rootKey) || {};
	                Root[key] = {
	                    val: val,
	                    exp: exp * (1000 * 60 * 60),
	                    time: new Date().getTime()
	                };
	                store.set(rootKey, Root);
	            },
	            /**
	             * [get 获取有过期时间的本地缓存]
	             * @param  {[String]} key [description]
	             * @return {[*]}     [*]
	             */
	            get: function(key) {
	                var Root = store.get(rootKey);
	                if (!Root) {
	                    //根节点不存在
	                    return null;
	                };
	                var info = Root[key];
	                if (!info) {
	                    return null;
	                }
	                if (new Date().getTime() - info.time > info.exp) {
	                    return null;
	                }
	                return info.val
	            },
	            getAll: function() {
	                var Root = store.get(rootKey);
	                return Root || null;
	            },
	            resetSave: function(val) {
	                store.set(rootKey, val);
	            }
	        };
	        if (isSessionStorageNameSupported()) {
	            session = _window[sessionStorageName];
	            //会话模式
	            store.session = {
	                /**
	                 * [set 存储一个会话]
	                 * @param {[String]} key [description]
	                 * @param {[*]} val [*]
	                 */
	                set: function(key, val) {
	                    if (val === undefined) {
	                        return store.remove(key);
	                    }
	                    var stayStore;
	                    if (Object.prototype.toString.call(val) === '[object Object]') {
	                        stayStore = store.serialize(val);
	                    } else {
	                        stayStore = val;
	                    };
	                    session.setItem(key, stayStore);
	                },
	                /**
	                 * [get 获取一个会话]
	                 * @param  {[String]} key [description]
	                 * @return {[Boolean]}     [description]
	                 */
	                get: function(key) {
	                    var val = store.deserialize(session.getItem(key));
	                    return (val === undefined ? defaultVal : val);
	                }
	            }
	        };
	    }
	    try {
	        var testKey = '__storeJs__';
	        store.set(testKey, testKey);
	        if (store.get(testKey) != testKey) {
	            store.disabled = true;
	        }
	        store.remove(testKey);
	    } catch (e) {
	        store.disabled = true;
	    }
	    store.enabled = !store.disabled;
	    if (store.enabled) {
	        var modelCache = store.expiration.getAll();
	        if (modelCache) {
	            for (var cacheKey in modelCache) {
	                var cache = modelCache[cacheKey];
	                if (new Date().getTime() - cache.time > cache.exp) {
	                    cache = null;
	                    delete modelCache[cacheKey]
	                }
	            }
	        };
	        store.expiration.resetSave(modelCache);
	    };
	    return store;
	});
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Chandler on 16/4/6.
	 */
	
	var _ = __webpack_require__(43);
	var user = __webpack_require__(59);
	var Config = __webpack_require__(38);
	var env = Config.env[Config.scheme];
	
	/*
	 获得一个字符串的字节数
	 */
	String.prototype.bytes = function() {
	    var strLength = 0;
	    for (var i = 0; i < this.length; i++) {
	        if (this.charAt(i) > '~') strLength += 2;
	        else strLength += 1;
	    }
	    return strLength;
	};
	
	/*
	 JSON返回的日期类型转换为字符串
	 */
	String.prototype.toDate = function(format) {
	    var d = new Date();
	    d.setTime(this.match(/\d+/)[0]);
	    return (!!format) ? d.format(format) : d;
	};
	
	
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
	
	
	var gobalAjax =  {
	    jsonp: function(url, data, okFn, errFn, UseToken) {
	        // var token = window.localStorage.getItem('accessToken') || '';
	        if (_.isObject(data)) {
	            data = _.extend({
	                deviceinfo: '{"aid":"30001001"}'
	            }, data);
	            if (UseToken) {
	                data['access_token'] = 'web-' + user.getToken();
	            }
	        }
	        if (data.constructor.name == 'String') {
	            data = 'deviceinfo={"aid":"30001001"}&' + data;
	            if (UseToken) {
	                data += '&access_token=' + 'web-' + user.getToken();
	            }
	        }
	        $.ajax({
	            data: data,
	            method: 'GET',
	            jsonp: 'callback',
	            dataType: 'jsonp',
	            url: env.url_prefix + url,
	            success: okFn,
	            error: errFn
	        });
	    },
	    get: function(url, data, okFn, errFn) {
	        data = _.extend({
	            deviceinfo: '{"aid":"10102002","uid":"28a0daf7414b7424e9d69b8deabfeddc"}'
	        }, data);
	
	        $.ajax({
	            data: data,
	            method: 'GET',
	            // jsonp: 'callback',
	            // dataType: 'jsonp',
	            url: env.url_prefix + url,
	            success: okFn,
	            error: errFn
	        });
	    },
	    /**
	     * 获取随机数
	     * @param max   最大值
	     * @param min   最小值
	     * @returns {Number}
	     */
	    getRandom: function(max, min) {
	        max = max || 1000;
	        min = min || 0;
	        return parseInt(Math.random() * (max - min) + min);
	    }
	};
	
	module.exports = gobalAjax;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	    var CHECK_VIP_SERVICE = "http://vip.yinyuetai.com/vip/check-vip";
	    var Cookie, User, Yajax;
	
	    Cookie = __webpack_require__(60);
	    Yajax = __webpack_require__(61);
	
	    User = Backbone.Model.extend({
	        defaults: {
	            userName: '',
	            userId: 0,
	            headImg: ''
	        },
	        isLogined: function() {
	            return parseInt(this.get('userId')) ? true : false;
	        },
	        onLogin: function(callback) {
	            this.on('logined', callback);
	        },
	        logined: function(callback) {
	            if (this.isLogined()) {
	                callback();
	            } else {
	                this.on('logined', callback);
	            }
	        },
	        login: function(callback, onCancel) {
	            var self = this;
	            if (this.isLogined()) {
	                callback();
	            } else {
	                this.on('login', callback);
	                var loginBox = __webpack_require__(50);
	                var loginbox = loginBox().dialog;
	                    loginbox.trigger('show');
	                    loginbox.once('hide', function() {
	                        self.off('login');
	                        onCancel && onCancel();
	                    });
	            }
	        },
	        emit: function() {
	            var token, u_inf;
	
	            token = Cookie.get('token');
	            u_inf = Cookie.get('u_inf');
	
	            if (token != null) {
	                if (u_inf != null && u_inf.length > 0) {
	                    readUserInfoForCookie(u_inf);
	                } else {
	                    readUserInfoForDB();
	                }
	            }
	        },
	        //@param key 可以不传，直接传callback则表示user的全部字段都要
	        getUserInfo: function(key, callback) {
	            if (this.isLogined()) {
	                var context = this;
	                var getParam = function() {
	                    if (typeof key === 'function') {
	                        return context.toJSON();
	                    } else {
	                        return context.get(key);
	                    }
	                };
	                if (context.has('isEmailVerified')) { //login-info已发送
	                    callback && callback(getParam());
	                } else {
	                    readUserInfoForDB(function() {
	                        callback && callback(getParam());
	                    });
	                }
	            }
	        },
	        checkEmail: function(callback) {
	            this.getUserInfo('isEmailVerified', function(isEmailVerified) {
	                if (!isEmailVerified) {
	                    var con = '<div style="padding: 20px 30px;">' +
	                        '<p>您好像还没有进行邮箱验证。</p>' +
	                        '<p>为不影响部分功能的使用，请先进行 <a href="' + Y.domains.homeSite +
	                        '/settings/bind" target="_blank" class="special f14">邮箱验证</a></p>' +
	                        '</div>';
	                    var Dialog = __webpack_require__(46);
	                    new Dialog(con, {
	                        title: '邮箱验证',
	                        width: 400,
	                        height: 100,
	                        isAutoShow: true
	                    })
	
	                } else if (callback) {
	                    callback();
	                }
	            })
	        },
	
	        //判断是否是vip用户
	        checkVIP: function(success, cancel) {
	            if (!this.isLogined()) {
	                this.login(function() {
	                    fetchVIPInfo(success, cancel);
	                }, cancel);
	            } else {
	                if (user.get("vipInfo")) {
	                    var info = user.get("vipInfo");
	
	                    if (info && !info.error &&
	                        info.realVip && parseInt(info.realVip) > 0) {
	                        success(info);
	                    } else {
	                        cancel();
	                    }
	                } else {
	                    fetchVIPInfo(success, cancel);
	                }
	            }
	        },
	
	        //同步判断是否是vip用户
	        isVipUser: function() {
	            var token = Cookie.get('token');
	
	            if (token) {
	                var list = token.split(".");
	                var val;
	
	                if (list.length > 2) {
	                    val = list[2];
	                    return parseInt(val[0]) > 0;
	                }
	            }
	
	            return false;
	        },
	
	        getToken: function() {
	            return Cookie.get("token");
	        }
	    });
	
	    function readUserInfoForCookie(u_inf) {
	        var splitChar, users;
	
	        splitChar = String.fromCharCode(2);
	        u_inf = decodeURIComponent(u_inf);
	        users = u_inf.split(splitChar);
	        user.set({
	            userId: users[0] * 1,
	            userName: users[1],
	            headImg: users[4]
	        });
	    }
	
	    function readUserInfoForDB(callabck) {
	        Yajax.getJSON(Y.domains.loginSite + '/login-info', '', function(data) {
	            if (data.logined == true) {
	                var loginBox = __webpack_require__(50);
	                var loginbox = loginBox().dialog;
	                    loginbox.trigger('hide');
	            }
	            user.set(data);
	            callabck && callabck();
	        });
	    }
	
	    function fetchVIPInfo(success, cancel) {
	        $.ajax({
	            url: CHECK_VIP_SERVICE,
	            type: "get",
	            dataType: "jsonp",
	            jsonp: "callback",
	            success: function(result) {
	                if (result && !result.error) {
	                    if ((result.realVip && parseInt(result.realVip) > 0) || result.isWo) {
	                        user.set("vipInfo", result);
	                        success(result);
	                        return;
	                    }
	                }
	                cancel();
	            },
	            error: function() {
	                cancel();
	            }
	        });
	    }
	
	    var user = new User();
	    user.on('change:userId', function() {
	        user.trigger('logined');
	        user.trigger('login');
	    });
	    user.emit();
	    return user;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 60 */
/***/ function(module, exports) {

	//Thanks :
	// - https://github.com/aralejs/cookie/blob/master/src/cookie.js
	
	var decode, encode;
	
	decode = decodeURIComponent; //解码
	encode = encodeURIComponent; //编码
	
	exports.get = function(key, options) {
	    var cookies, converter, raw;
	
	    validate(key);
	    options = options || {};
	    raw = options.raw || false;
	    converter = options.converter || function(o) {
	        return o;
	    };
	
	    cookies = parseCookie(document.cookie, !raw);
	    return converter(cookies[key]);
	};
	
	exports.set = function(key, value, options) {
	    var expires, domain, path, text, date;
	
	    validate(key);
	    options = options || {};
	    expires = options['expires'];
	    domain = options['domain'];
	    path = options['path'];
	
	    if (!options['raw']) {
	        value = encode(String(value));
	    }
	
	    text = key + '=' + value;
	    date = expires;
	
	    if (typeof date === 'number') {
	        date = new Date();
	        date.setDate(date.getDate() + expires);
	    }
	
	    if (date instanceof Date) {
	        text += '; expires=' + date.toUTCString();
	    }
	
	    if (domain && domain.length) {
	        text += '; domain=' + domain;
	    }
	
	    if (path && path.length) {
	        text += '; path=' + path;
	    }
	
	    //http://www.oschina.net/question/8676_3423 secure作用
	    if (options['secure']) {
	        text += '; secure';
	    }
	
	    document.cookie = text;
	    return text;
	};
	
	exports.remove = function(key, options) {
	    options = options || {};
	    options['expires'] = new Date(0);
	    return this.set(key, '', options);
	};
	
	//把document.cookie字符串解析为{cookieName : cookieValue}
	function parseCookie(text, shouldDecode) {
	    var i, len, cookies, decodeValue, cookieParts, cookieName, cookieValue, cookieNameValue;
	
	    cookies = {};
	    decodeValue = shouldDecode ? decode : (function(o) {
	        return o;
	    });
	    cookieParts = text.split(/;\s/g);
	
	    for (i = 0, len = cookieParts.length; i < len; i++) {
	        cookieNameValue = cookieParts[i].match(/([^=]+)=/i);
	        if (cookieNameValue instanceof Array) {
	            try {
	                cookieName = decode(cookieNameValue[1]);
	                cookieValue = decodeValue(cookieParts[i].substring(cookieNameValue[1].length + 1));
	            } catch (e) {}
	        } else {
	            cookieName = decode(cookieParts[i]);
	            cookieValue = '';
	        }
	
	        if (cookieName) {
	            cookies[cookieName] = cookieValue;
	        }
	    }
	
	    return cookies;
	}
	
	function validate(key) {
	    if (!(key && key.length)) {
	        throw new TypeError('Cookie name must be a non-empty string');
	    }
	}


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created with IntelliJ IDEA.
	 * User: zhangyan
	 * Date: 13-6-24
	 * Time: 下午5:55
	 * @fileoverview 1.防止同一个ajax同时发送多次
	 * 2.用ajaxform处理post的跨域请求
	 */
	
	var _ = __webpack_require__(43);
	var Uri = __webpack_require__(62);
	var secret = __webpack_require__(53);
	
	var _requestList = [];
	var equal = function(obj1, obj2) {
	    if (typeof(obj1) === 'string' && typeof(obj2) === 'string') {
	        return obj1 === obj2;
	    } else if (typeof(obj1) === 'object' && typeof(obj2) === 'object') {
	        return $.param(obj1) === $.param(obj2);
	    }
	    return false;
	};
	
	var isCrossDomain = function(url) {
	    var host = new Uri(url).host();
	    return host !== '' && host !== document.domain;
	};
	
	var createPostForm = function(settings) {
	    var $form = $('<form method="post"></form>').attr({
	        'action': settings.url
	    }).appendTo(document.body);
	    var data = settings.data || '',
	        datas, dataJSON = {};
	
	    if (typeof data === 'string') {
	        datas = data.split('&');
	        $.each(datas, function(index, item) {
	            item = item.split('=');
	            dataJSON[item[0]] = item[1];
	        })
	    } else {
	        dataJSON = data;
	    }
	    $.each(dataJSON, function(key, value) {
	        $('<input type="hidden"/>').attr({
	            name: key,
	            value: value
	        }).appendTo($form);
	    });
	
	    return $form;
	};
	
	var crossDomainPost = function(settings) {
	    var AjaxForm = __webpack_require__(63);
	
	    var $form = createPostForm(settings);
	
	    new AjaxForm($form, {
	        secretParam: settings.secretParam || function() {
	            return [];
	        },
	        onComplete: function(result) {
	            $($form.attr('target')).remove();
	            $form.remove();
	            if (settings.success) {
	                settings.success(result);
	            }
	            if (_.isFunction(settings.complete)) {
	                settings.complete(result);
	            } else if (_.isArray(settings.complete)) {
	                _.each(settings.complete, function(fun) {
	                    fun(result);
	                })
	            }
	        }
	    });
	    $form.submit();
	};
	
	var beforeSend = function(settings) {
	    for (var i = 0, len = _requestList.length; i < len; i++) {
	        var _request = _requestList[i];
	        if (settings.url == _request.url && equal(_request.data, settings.data)) {
	            return false;
	        }
	    }
	    _requestList.push(settings);
	
	    var _type = settings.type.toLowerCase();
	    if (isCrossDomain(settings.url)) {
	        if (_type === 'post') {
	            crossDomainPost(settings);
	            return false;
	        } else {
	            settings.dataType = "jsonp";
	        }
	    } else if (_type === 'post') {
	        var json = encrypt(settings.secretName, settings.secretParam);
	        if (json) {
	            if (settings.data) {
	                if (typeof settings.data === 'string') {
	                    settings.data += '&' + $.param(json);
	                } else {
	                    settings.data = $.extend(settings.data, json);
	                }
	            } else {
	                settings.data = json;
	            }
	        }
	    }
	    return settings;
	};
	
	
	var encrypt = function(secretName, secretParam) {
	    if (secret[secretName]) {
	        return secret[secretName](secretParam());
	    }
	    return null;
	    /*return require(['modules/yinyuetai/secret'], function(secret) {
	     if (secret[secretName]) {
	     return secret[secretName](secretParam());
	     }
	     return null;
	     });*/
	};
	
	var Ajax_Process = {
	    ajax: function(options) {
	        var complete = [function() {
	            _requestList = _.without(_requestList, options);
	        }];
	        if (options.complete) {
	            complete = complete.concat(options.complete);
	        }
	        options.complete = undefined;
	        options = $.extend({
	            timeout: 10000,
	            jsonp: 'callback',
	            type: 'get',
	            secretName: 'des',
	            secretParam: function() {
	                return [];
	            },
	            complete: complete
	        }, options);
	
	        var checkResult = true;
	        if (options.beforeSend && typeof options.beforeSend === "function") {
	            checkResult = options.beforeSend();
	        }
	        if (checkResult === false) {
	            return;
	        }
	        var settings = beforeSend(options);
	        if (settings) {
	            return $.ajax(settings);
	        }
	    },
	    get: function(url, data, callback, dataType) {
	        var options = {
	            type: 'GET'
	        };
	        url && (options.url = url);
	        data && (options.data = data);
	        callback && (options.success = callback);
	        dataType && (options.dataType = dataType);
	        return this.ajax(options);
	    },
	    getJSON: function(url, data, callback) {
	        return this.get(url, data, callback, 'json');
	    },
	    post: function(url, data, callback, dataType) {
	        var options = {
	            type: 'POST'
	        };
	        url && (options.url = url);
	        data && (options.data = data);
	        callback && (options.success = callback);
	        dataType && (options.dataType = dataType);
	        return this.ajax(options);
	    }
	};
	
	module.exports = Ajax_Process;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	* jsUri
	* https://github.com/derek-watson/jsUri
	*
	* Copyright 2013, Derek Watson
	* Released under the MIT license.
	*
	* Includes parseUri regular expressions
	* http://blog.stevenlevithan.com/archives/parseuri
	* Copyright 2007, Steven Levithan
	* Released under the MIT license.
	*/
	
	 /*globals define, module */
	
	(function(global) {
	
	  var re = {
	    starts_with_slashes: /^\/+/,
	    ends_with_slashes: /\/+$/,
	    pluses: /\+/g,
	    query_separator: /[&;]/,
	    uri_parser: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	  };
	
	  /**
	* Define forEach for older js environments
	* @see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/forEach#Compatibility
	*/
	  if (!Array.prototype.forEach) {
	    Array.prototype.forEach = function(fn, scope) {
	      for (var i = 0, len = this.length; i < len; ++i) {
	        fn.call(scope || this, this[i], i, this);
	      }
	    };
	  }
	
	  /**
	* unescape a query param value
	* @param {string} s encoded value
	* @return {string} decoded value
	*/
	  function decode(s) {
	    if (s) {
	      s = decodeURIComponent(s);
	      s = s.replace(re.pluses, ' ');
	    }
	    return s;
	  }
	
	  /**
	* Breaks a uri string down into its individual parts
	* @param {string} str uri
	* @return {object} parts
	*/
	  function parseUri(str) {
	    var parser = re.uri_parser;
	    var parserKeys = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
	    var m = parser.exec(str || '');
	    var parts = {};
	
	    parserKeys.forEach(function(key, i) {
	      parts[key] = m[i] || '';
	    });
	
	    return parts;
	  }
	
	  /**
	* Breaks a query string down into an array of key/value pairs
	* @param {string} str query
	* @return {array} array of arrays (key/value pairs)
	*/
	  function parseQuery(str) {
	    var i, ps, p, n, k, v;
	    var pairs = [];
	
	    if (typeof(str) === 'undefined' || str === null || str === '') {
	      return pairs;
	    }
	
	    if (str.indexOf('?') === 0) {
	      str = str.substring(1);
	    }
	
	    ps = str.toString().split(re.query_separator);
	
	    for (i = 0; i < ps.length; i++) {
	      p = ps[i];
	      n = p.indexOf('=');
	
	      if (n !== 0) {
	        k = decodeURIComponent(p.substring(0, n));
	        v = decodeURIComponent(p.substring(n + 1));
	        pairs.push(n === -1 ? [p, null] : [k, v]);
	      }
	
	    }
	    return pairs;
	  }
	
	  /**
	* Creates a new Uri object
	* @constructor
	* @param {string} str
	*/
	  function Uri(str) {
	    this.uriParts = parseUri(str);
	    this.queryPairs = parseQuery(this.uriParts.query);
	    this.hasAuthorityPrefixUserPref = null;
	  }
	
	  /**
	* Define getter/setter methods
	*/
	  ['protocol', 'userInfo', 'host', 'port', 'path', 'anchor'].forEach(function(key) {
	    Uri.prototype[key] = function(val) {
	      if (typeof val !== 'undefined') {
	        this.uriParts[key] = val;
	      }
	      return this.uriParts[key];
	    };
	  });
	
	  /**
	* if there is no protocol, the leading // can be enabled or disabled
	* @param {Boolean} val
	* @return {Boolean}
	*/
	  Uri.prototype.hasAuthorityPrefix = function(val) {
	    if (typeof val !== 'undefined') {
	      this.hasAuthorityPrefixUserPref = val;
	    }
	
	    if (this.hasAuthorityPrefixUserPref === null) {
	      return (this.uriParts.source.indexOf('//') !== -1);
	    } else {
	      return this.hasAuthorityPrefixUserPref;
	    }
	  };
	
	  /**
	* Serializes the internal state of the query pairs
	* @param {string} [val] set a new query string
	* @return {string} query string
	*/
	  Uri.prototype.query = function(val) {
	    var s = '', i, param;
	
	    if (typeof val !== 'undefined') {
	      this.queryPairs = parseQuery(val);
	    }
	
	    for (i = 0; i < this.queryPairs.length; i++) {
	      param = this.queryPairs[i];
	      if (s.length > 0) {
	        s += '&';
	      }
	      if (param[1] === null) {
	        s += param[0];
	      } else {
	        s += param[0];
	        s += '=';
	        if (param[1]) {
	          s += encodeURIComponent(param[1]);
	        }
	      }
	    }
	    return s.length > 0 ? '?' + s : s;
	  };
	
	  /**
	* returns the first query param value found for the key
	* @param {string} key query key
	* @return {string} first value found for key
	*/
	  Uri.prototype.getQueryParamValue = function (key) {
	    var param, i;
	    for (i = 0; i < this.queryPairs.length; i++) {
	      param = this.queryPairs[i];
	      if (key === param[0]) {
	        return param[1];
	      }
	    }
	  };
	
	  /**
	* returns an array of query param values for the key
	* @param {string} key query key
	* @return {array} array of values
	*/
	  Uri.prototype.getQueryParamValues = function (key) {
	    var arr = [], i, param;
	    for (i = 0; i < this.queryPairs.length; i++) {
	      param = this.queryPairs[i];
	      if (key === param[0]) {
	        arr.push(param[1]);
	      }
	    }
	    return arr;
	  };
	
	  /**
	* removes query parameters
	* @param {string} key remove values for key
	* @param {val} [val] remove a specific value, otherwise removes all
	* @return {Uri} returns self for fluent chaining
	*/
	  Uri.prototype.deleteQueryParam = function (key, val) {
	    var arr = [], i, param, keyMatchesFilter, valMatchesFilter;
	
	    for (i = 0; i < this.queryPairs.length; i++) {
	
	      param = this.queryPairs[i];
	      keyMatchesFilter = decode(param[0]) === decode(key);
	      valMatchesFilter = param[1] === val;
	
	      if ((arguments.length === 1 && !keyMatchesFilter) || (arguments.length === 2 && (!keyMatchesFilter || !valMatchesFilter))) {
	        arr.push(param);
	      }
	    }
	
	    this.queryPairs = arr;
	
	    return this;
	  };
	
	  /**
	* adds a query parameter
	* @param {string} key add values for key
	* @param {string} val value to add
	* @param {integer} [index] specific index to add the value at
	* @return {Uri} returns self for fluent chaining
	*/
	  Uri.prototype.addQueryParam = function (key, val, index) {
	    if (arguments.length === 3 && index !== -1) {
	      index = Math.min(index, this.queryPairs.length);
	      this.queryPairs.splice(index, 0, [key, val]);
	    } else if (arguments.length > 0) {
	      this.queryPairs.push([key, val]);
	    }
	    return this;
	  };
	
	  /**
	* replaces query param values
	* @param {string} key key to replace value for
	* @param {string} newVal new value
	* @param {string} [oldVal] replace only one specific value (otherwise replaces all)
	* @return {Uri} returns self for fluent chaining
	*/
	  Uri.prototype.replaceQueryParam = function (key, newVal, oldVal) {
	    var index = -1, i, param;
	
	    if (arguments.length === 3) {
	      for (i = 0; i < this.queryPairs.length; i++) {
	        param = this.queryPairs[i];
	        if (decode(param[0]) === decode(key) && decodeURIComponent(param[1]) === decode(oldVal)) {
	          index = i;
	          break;
	        }
	      }
	      this.deleteQueryParam(key, oldVal).addQueryParam(key, newVal, index);
	    } else {
	      for (i = 0; i < this.queryPairs.length; i++) {
	        param = this.queryPairs[i];
	        if (decode(param[0]) === decode(key)) {
	          index = i;
	          break;
	        }
	      }
	      this.deleteQueryParam(key);
	      this.addQueryParam(key, newVal, index);
	    }
	    return this;
	  };
	
	  /**
	* Define fluent setter methods (setProtocol, setHasAuthorityPrefix, etc)
	*/
	  ['protocol', 'hasAuthorityPrefix', 'userInfo', 'host', 'port', 'path', 'query', 'anchor'].forEach(function(key) {
	    var method = 'set' + key.charAt(0).toUpperCase() + key.slice(1);
	    Uri.prototype[method] = function(val) {
	      this[key](val);
	      return this;
	    };
	  });
	
	  /**
	* Scheme name, colon and doubleslash, as required
	* @return {string} http:// or possibly just //
	*/
	  Uri.prototype.scheme = function() {
	    var s = '';
	
	    if (this.protocol()) {
	      s += this.protocol();
	      if (this.protocol().indexOf(':') !== this.protocol().length - 1) {
	        s += ':';
	      }
	      s += '//';
	    } else {
	      if (this.hasAuthorityPrefix() && this.host()) {
	        s += '//';
	      }
	    }
	
	    return s;
	  };
	
	  /**
	* Same as Mozilla nsIURI.prePath
	* @return {string} scheme://user:password@host:port
	* @see https://developer.mozilla.org/en/nsIURI
	*/
	  Uri.prototype.origin = function() {
	    var s = this.scheme();
	
	    if (s == 'file://') {
	      return s + this.uriParts.authority
	    }
	
	    if (this.userInfo() && this.host()) {
	      s += this.userInfo();
	      if (this.userInfo().indexOf('@') !== this.userInfo().length - 1) {
	        s += '@';
	      }
	    }
	
	    if (this.host()) {
	      s += this.host();
	      if (this.port()) {
	        s += ':' + this.port();
	      }
	    }
	
	    return s;
	  };
	
	  /**
	* Adds a trailing slash to the path
	*/
	  Uri.prototype.addTrailingSlash = function() {
	    var path = this.path() || ''
	
	    if (path.substr(-1) !== '/') {
	      this.path(path + '/')
	    }
	
	    return this;
	  }
	
	  /**
	* Serializes the internal state of the Uri object
	* @return {string}
	*/
	  Uri.prototype.toString = function() {
	    var path, s = this.origin();
	
	    if (this.path()) {
	      path = this.path();
	      if (!(re.ends_with_slashes.test(s) || re.starts_with_slashes.test(path))) {
	        s += '/';
	      } else {
	        if (s) {
	          s.replace(re.ends_with_slashes, '/');
	        }
	        path = path.replace(re.starts_with_slashes, '/');
	      }
	      s += path;
	    } else {
	      if (this.host() && (this.query().toString() || this.anchor())) {
	        s += '/';
	      }
	    }
	    if (this.query().toString()) {
	      if (this.query().toString().indexOf('?') !== 0) {
	        s += '?';
	      }
	      s += this.query().toString();
	    }
	
	    if (this.anchor()) {
	      if (this.anchor().indexOf('#') !== 0) {
	        s += '#';
	      }
	      s += this.anchor();
	    }
	
	    return s;
	  };
	
	  /**
	* Clone a Uri object
	* @return {Uri} duplicate copy of the Uri
	*/
	  Uri.prototype.clone = function() {
	    return new Uri(this.toString());
	  };
	
	  /**
	* export via AMD or CommonJS, otherwise leak a global
	*/
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return Uri;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	    module.exports = Uri;
	  } else {
	    global.Uri = Uri;
	  }
	}(this));


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
		var Class, Uri, secret;
	
		Uri = __webpack_require__(62);
		secret = __webpack_require__(53);
		Class = Backbone.View.extend({
			options : {
				secretName : 'des',
				secretParam : function() {
					return [];
				},
				onRequest : function() {
					return true;
				},
				onComplete : function(data) {},
				onError : function(msg) {}
			},
			initialize : function(options) {
				var form, frameId;
	
				form = this.$el;
	
				//一个跨域的form表单，多次提交只产生一个iframe element
				if (form.attr('target') && $(form.attr('target')).length != 0) {
					return;
				}
	
				if (new Uri(form.attr('action')).host() !== '' || form.find('[type=file]').length !== 0) {
					frameId = 'f' + new Date().getTime();
					form.attr('target', frameId);
					this.iframe = iframe.call(this, frameId);
				} else {
					ajax.call(this);
				}
			}
		});
	
		function ajax() {
			var form, options;
	
			form = this.$el;
			options = this.options;
	
			form.submit(function(e) {
				e.preventDefault();
				encrypt(form, secret[options.secretName].apply(window, options.secretParam()));
				if (options.onRequest.call(form)) {
					$.ajax({
						type : 'POST',
						url : form.attr('action'),
						data : form.serialize(),
						success : function(data) {
							options.onComplete.call(form, data);
						}
					});
				}
			});
		}
	
		function iframe(frameId) {
			var form, options, iframe, innerText, secretName, secretParam, requesting;//requesting 防止重复提交的变量
			form = this.$el;
			options = this.options;
			secretName = options.secretName;
			secretParam = options.secretParam;
	
			$('<input />').attr({
				type : 'hidden',
				name : 'cross_post',
				value : '1'
			}).appendTo(form);
	
			iframe = $('<iframe name=' + frameId + '/>').attr({
				id : frameId,
				src : 'about:blank'
			}).css('display', 'none').appendTo(document.body);
	
			iframe.on('load', function() {
				var body , iframeWindow , response;
				try {
					body = $('#' + frameId)[0].contentWindow.document.body;
					iframeWindow = $('#' + frameId)[0].contentWindow;
				} catch (e) {
					options.onError.call('上传错误');
				}
				requesting = false;
				try {//如果后台没有作跨域处理，则需手动触发onComplete
					var body = $('#' + frameId)[0].contentWindow.document.body;
					innerText = body.innerText;
					if (!innerText) {
						innerText = body.innerHTML;
					}
					if (innerText) {
						responseJson = decodeURIComponent(iframeWindow.location.search.split('json=')[1]);
						options.onComplete.call(null, $.parseJSON(responseJson));
					}
				} catch (e) {
					options.onComplete.call(null);
				}
			});
	
			form.on('submit', submit);
	
			function submit(e) {
				console.log('subsub');
				e.preventDefault();
				if (options.onRequest.call(form)) {
					if (requesting) {
						return false;
					}
					requesting = true;
					form.off('submit');
					//加密处理
					encrypt(form, secret[secretName].apply(window, secretParam()));
					form.submit();
					form.on('submit', submit);
				}
			}
	
			return iframe;
		}
	
		function encrypt(element, secret) {
			$.each(secret, function(key, value) {
				var $item = element.find('[name=' + key + ']');
				if ($item.length === 0) {
					$('<input />').attr({
						type : 'hidden',
						name : key,
						value : value
					}).appendTo(element);
				} else {
					$item.val(value);
				}
			});
		}
	
		function AjaxForm(element, options) {
			options = options || {};
			options.el = element;
			return new Class(options);
		}
	
		return AjaxForm;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }
/******/ ]);
//# sourceMappingURL=common.js.map