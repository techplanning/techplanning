(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require(undefined), require(undefined));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "skpui.util"], factory);
	else if(typeof exports === 'object')
		exports["skpui"] = factory(require(undefined), require(undefined));
	else
		root["skpui"] = factory(root["jQuery"], root["skpui.util"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/skpui/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	(function (root, $) {
	    /* istanbul ignore next */
	    if (( false ? 'undefined' : _typeof(exports)) === 'object') {
	        var SKPUI_VERSION = '0.1.0';
	
	        $.extend(module.exports = {
	            version: SKPUI_VERSION,
	            infinityScroll: __webpack_require__(1),
	            caption: __webpack_require__(4),
	            starRating: __webpack_require__(5),
	            dimmedLayer: __webpack_require__(6),
	            modal: __webpack_require__(7),
	            toggleLayer: __webpack_require__(8),
	            magnet: __webpack_require__(9),
	            sticky: __webpack_require__(10),
	            tab: __webpack_require__(11),
	            calendar: __webpack_require__(12)
	        }, root.skpui);
	    }
	})(window, jQuery);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/**
	 * InfinityScroll Component(UMD)
	 *
	 * @deps: jquery v2.1.1+
	 * @env: MOBILE
	 *
	 * @example:
	 *     var infinityScroll = new skpui.infinityScroll({
	 *         wrap: [require] Element Selector {String},
	 *         totalCount: [require] total lists count {number},
	 *         onBeforeScroll: [require] InfinityScroll이 실행될 때 callback func. next html append를 위해 {필수},
	 *
	 *         pageView: 한 번 스크롤에 생성될 list 갯수 {default: 10}{number},
	 *         onEndInfinityScroll: 마지막 스크롤 callback func. 스크롤 객체를 삭제하거나 다음 액션을 처리할 때 사용,
	 *         loader: loading Element Selector {String},
	 *         maxPage: total count와 상관없이 보여질 페이지 수 정의 (0부터 시작)
	 *     });
	 *
	 * @ UI development team. SKP.
	 */
	(function (root, factory) {
	    /* istanbul ignore next */
	    if (( false ? 'undefined' : _typeof(exports)) === 'object') {
	        module.exports = factory(__webpack_require__(2), (typeof skpui === 'undefined' ? 'undefined' : _typeof(skpui)) === 'object' ? skpui.util : __webpack_require__(3));
	    } else {
	        root.skpui = root.skpui || {};
	        root.skpui['infinityScroll'] = factory(root.jQuery, root.skpui.util);
	    }
	})(undefined, function ($, Util) {
	    'use strict';
	
	    var $win = $(window);
	
	    var InfinityScroll = function InfinityScroll(opts) {
	        this.options = $.extend({}, InfinityScroll.defaults, opts);
	        this.initialize();
	    };
	
	    /**
	     * initialize
	     */
	    InfinityScroll.prototype.initialize = function () {
	        this.$wrap = $(this.options.wrap);
	        this.isStart = false;
	        this.options.maxPage = this.getMaxPage();
	        this.options.screenHeight = $win.height();
	
	        if (this.options.cache === true) {
	            this.initStorage();
	        }
	
	        this.setLoader();
	
	        if (this.options.autoStart === true) {
	            this.isStart = true;
	            this.start();
	        }
	    };
	
	    /**
	     * 페이지 진입 시 session storage 확인
	     * 캐싱된 mark-up으로 교체
	     */
	    InfinityScroll.prototype.initStorage = function () {
	        var storage = Util.browser.webStorage.session.getItem(this.options.instancename);
	
	        if (!$.isEmptyObject(storage)) {
	            storage = JSON.parse(storage);
	            if (storage.cachedAt + this.options.cacheTime > new Date().getTime()) {
	                this.options.scrollCount = storage.scrollCount;
	                this.$wrap.html(storage.markup);
	            }
	            this.removeCachePage();
	        }
	    };
	
	    /**
	     * wrapper 캐싱
	     */
	    InfinityScroll.prototype.cachePage = function () {
	        Util.browser.webStorage.session.setItem(this.options.instancename, {
	            markup: this.$wrap.html(),
	            scrollCount: this.options.scrollCount,
	            cachedAt: new Date().getTime()
	        });
	    };
	
	    InfinityScroll.prototype.removeCachePage = function () {
	        Util.browser.webStorage.session.removeItem(this.options.instancename);
	    };
	
	    /**
	     * 마지막 스크롤 페이지 확인을 위해 총 페이지 수를 저장
	     */
	    InfinityScroll.prototype.getMaxPage = function () {
	        var realMaxPage = Math.ceil(parseInt(this.options.totalCount, 10) / this.options.pageView) - 1;
	        return typeof this.options.maxPage === 'undefined' ? realMaxPage : Math.min(this.options.maxPage, realMaxPage);
	    };
	
	    /**
	     * loader 생성
	     */
	    InfinityScroll.prototype.setLoader = function () {
	        if (typeof this.options.loader === 'undefined') {
	            return;
	        }
	        this.$loader = $(this.options.loader);
	    };
	
	    /**
	     * Add Event Handler
	     */
	    InfinityScroll.prototype.addHandler = function () {
	        var _this = this,
	            offset = this.options.nextTarget.offset() || { top: 0 },
	            offsetY = offset.top - this.options.screenHeight - this.options.bottomPadding;
	
	        $win.on('scroll.' + this.options.scrollEvent, Util.throttle(function () {
	            var scrollTop = $(this).scrollTop();
	
	            if (scrollTop >= offsetY) {
	                if (_this.options.maxPage <= _this.options.scrollCount) {
	                    _this.destroy();
	                    return;
	                }
	                _this.stop();
	            }
	        })).on('resize.' + this.options.scrollEvent, Util.throttle(function () {
	            _this.options.screenHeight = $(this).height();
	            offset = _this.options.nextTarget.offset();
	            offsetY = offset.top - _this.options.screenHeight - _this.options.bottomPadding;
	        }));
	    };
	
	    /**
	     * Remove Event Handler
	     */
	    InfinityScroll.prototype.removeHandler = function () {
	        $win.off('.' + this.options.scrollEvent);
	    };
	
	    /**
	     * loader handler
	     */
	    InfinityScroll.prototype.showLoader = function (isShow) {
	        if (!this.$loader) {
	            return;
	        }
	        if (isShow) {
	            this.$loader.show();
	        } else {
	            this.$loader.remove();
	            this.$loader = null;
	        }
	    };
	
	    /**
	     * Scroll Stop
	     */
	    InfinityScroll.prototype.stop = function () {
	        this.removeHandler();
	
	        if (typeof this.options.onBeforeScroll === 'function') {
	            this.options.onBeforeScroll({
	                scrollCount: this.options.scrollCount
	            });
	        }
	    };
	
	    /**
	     * Scroll destroy
	     * - callback 'onEndInfinityScroll'
	     */
	    InfinityScroll.prototype.destroy = function () {
	        this.removeHandler();
	        this.showLoader(false);
	
	        if (typeof this.options.onEndInfinityScroll === 'function') {
	            this.options.onEndInfinityScroll();
	        }
	    };
	
	    /**
	     * Scroll start
	     */
	    InfinityScroll.prototype.start = function () {
	        if (!this.isStart) {
	            this.isStart = true;
	        }
	        this.options.nextTarget = this.$loader ? this.$loader : this.$wrap.children().last();
	        this.addHandler();
	    };
	
	    /**
	     * Scroll Refresh
	     */
	    InfinityScroll.prototype.refresh = function () {
	        if (!this.isStart) {
	            return;
	        }
	        this.options.scrollCount++;
	        this.start();
	    };
	
	    /**
	     * get scroll count
	     */
	    InfinityScroll.prototype.current = function () {
	        return this.options.scrollCount;
	    };
	
	    InfinityScroll.defaults = {
	        instancename: 'InfinityScroll.js',
	        scrollEvent: 'infinityScrollEvent',
	        scrollCount: 0,
	        screenHeight: 0,
	        bottomPadding: 50,
	        pageView: 10,
	        cache: true,
	        cacheTime: 60000,
	        autoStart: true
	    };
	
	    return InfinityScroll;
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/**
	 * Caption Plugin(UMD)
	 *
	 * @env: MOBILE
	 *
	 * @example:
	 *     var caption = new skpui.Caption({
	 *         id: Element Selector {String},
	 *         captions: text captions {Array}
	 *     });
	 *
	 * @ UI development team. SKP.
	 */
	(function (root, factory) {
	    /* istanbul ignore next */
	    if (( false ? 'undefined' : _typeof(exports)) === 'object') {
	        module.exports = factory();
	    } else {
	        root.skpui = root.skpui || {};
	        root.skpui['caption'] = factory();
	    }
	})(undefined, function () {
	    'use strict';
	
	    var Caption = function Caption(opts) {
	        this.captionEl = document.querySelector(opts.id);
	        this.captions = opts.captions;
	
	        this.initialize();
	    };
	
	    Caption.prototype.initialize = function () {
	        this.captions.unshift(this.captionEl.innerHTML);
	    };
	
	    Caption.prototype.change = function (idx) {
	        this.captionEl.innerHTML = this.captions[idx];
	    };
	
	    Caption.prototype.getCurrentCaption = function (idx) {
	        return this.captions[idx];
	    };
	
	    return Caption;
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/**
	 * StarRating Plugin(UMD)
	 *
	 * @deps: jquery v2.1.1+
	 * @deps: util.js
	 * @deps: polyfill.js
	 * @env: MOBILE
	 *
	 * @example:
	 *     var starRate = new skpui.StarRating({
	 *         wrap: Element Selector {String},
	 *         captionId: Caption Element Selector {String},
	 *         percentage: return percentage value {true/false},
	 *         step: max에 비례되는 리턴값 {0.0 ~ 1}. ex)절반짜리 별이 필요 할 경우 0.5
	 *         max: 리턴값의 최대 value. {default: list 갯수}
	 *         callBackFn: function(object) {idx, val, per:optional, caption:optional}
	 *     });
	 *
	 * @ UI development team. SKP.
	 */
	(function (root, factory) {
	    /* istanbul ignore next */
	    if (( false ? 'undefined' : _typeof(exports)) === 'object') {
	        module.exports = factory(__webpack_require__(2), __webpack_require__(4), function () {
	            if ((typeof skpui === 'undefined' ? 'undefined' : _typeof(skpui)) === 'object') {
	                return skpui.util;
	            } else {
	                return __webpack_require__(3);
	            }
	        }());
	    } else {
	        root.skpui = root.skpui || {};
	        root.skpui['starRating'] = factory(root.jQuery, root.skpui.caption, root.skpui.util);
	    }
	})(undefined, function ($, Caption, Util) {
	    'use strict';
	
	    function StarRating(opts) {
	        if (typeof opts.wrap === 'undefined' || opts.wrap === null) {
	            console.error('StarRating Plugin Message : wrap is null.');
	            return;
	        }
	        this.options = $.extend({}, StarRating.defaults, opts);
	        this.initialize();
	    }
	
	    StarRating.prototype.initialize = function () {
	        this.wrap = typeof this.options.wrap === 'string' ? document.querySelector(this.options.wrap) : this.options.wrap;
	        this.rect = this.wrap.getBoundingClientRect();
	        this.lists = this.wrap.querySelectorAll(this.options.lists || '.star');
	        this.listLen = this.lists.length;
	        this.activeNum = null;
	        this.data = {
	            wrap: this.wrap
	        };
	        this.options.max = this.options.max || this.listLen;
	        if (this.options.captionId) {
	            this.caption = new Caption({
	                id: this.options.captionId,
	                captions: this.getCaptions()
	            });
	        }
	        this.setHandler();
	    };
	
	    /**
	     * Event Handler
	     */
	    StarRating.prototype.setHandler = function () {
	        var $win = $(window),
	            $wrap = $(this.wrap);
	
	        $win.on('resize', $.proxy(this.resize, this));
	        $wrap.on('touchstart touchmove mousemove', $.proxy(this.play, this)).on('touchend mouseleave', $.proxy(this.stop, this));
	    };
	
	    /**
	     * Active Handler
	     */
	    StarRating.prototype.play = function (e) {
	        var pos = this.getTouchPosition(e);
	
	        e.preventDefault();
	        $.extend(this.data, this.calculate(pos));
	        this.render(this.data);
	    };
	
	    /**
	     * Inactive Handler
	     */
	    StarRating.prototype.stop = function (e) {
	        e.preventDefault();
	
	        if (typeof this.options.callBackFn !== 'undefined') {
	            if (this.options.captionId) {
	                this.data.caption = this.caption.getCurrentCaption(this.data.val);
	            }
	            this.options.callBackFn(this.data);
	        }
	    };
	
	    /**
	     * touch event가 발생한 곳의 page position을 구한다.
	     * @param: {touch/mouse event}
	     * @return: object {x, y}
	     */
	    StarRating.prototype.getTouchPosition = function (e) {
	        var pos = Util.browser.getPosition(e);
	
	        pos.x = Math.floor(pos.x - this.rect.left);
	        pos.y = Math.floor(pos.y - this.rect.top);
	
	        return pos;
	    };
	
	    /**
	     * touch event가 발생한 구간의 현재위치 값을 구한다.
	     * @deps: getValueFromPosition()
	     * @deps: getPercentFromPosition()
	     * @param: object {x, y}
	     * @return: object {
	     *                  val: this.options.step에 비례한 value (0 ~ max),
	     *                  per: 백분율,
	     *                  idx: DOM index (0 ~ max - 1)
	     *          }
	     */
	    StarRating.prototype.calculate = function (pos) {
	        var obj = {};
	
	        obj.val = this.getValueFromPosition(pos);
	        obj.idx = Math.floor(Math.max(Math.ceil(obj.val) - 1, this.options.min) * (this.listLen / this.options.max));
	
	        if (this.options.percentage) {
	            obj.per = this.getPercentFromPosition(pos);
	        }
	
	        return obj;
	    };
	
	    /**
	     * position에 따른 값을 구한다.
	     * @param: object {x, y}
	     * @return: Number {this.options.step에 비례한 value (0 ~ max)}
	     */
	    StarRating.prototype.getValueFromPosition = function (pos) {
	        var xPos, val;
	
	        this.maxWidth = this.maxWidth || this.rect.width;
	        xPos = Math.ceil(this.options.max * pos.x / (this.rect.width * this.options.step));
	        val = parseFloat(this.options.min + xPos * this.options.step).toFixed(1);
	        val = Math.max(Math.min(val, this.options.max), this.options.min);
	
	        return val;
	    };
	
	    /**
	     * position에 따른 백분율을 구한다.
	     * @param: object {x, y}
	     * @return: Number {percent (0 ~ 100)}
	     */
	    StarRating.prototype.getPercentFromPosition = function (pos) {
	        var per, val;
	
	        this.maxWidth = this.maxWidth || this.rect.width;
	        per = Math.floor(pos.x * 100 / this.maxWidth);
	        val = Math.max(Math.min(per, 100), 0);
	
	        return val;
	    };
	
	    /**
	     * UI render
	     * @param: object {idx, val, per}
	     * @deps: changeStar()
	     * @deps: changeCaption()
	     */
	    StarRating.prototype.render = function (data) {
	        if (this.activeNum !== data.val) {
	            this.activeNum = data.val;
	
	            this.changeStar(data);
	
	            if (this.options.captionId) {
	                this.changeCaption(data);
	            }
	        }
	    };
	
	    /**
	     * Star change method
	     * @param: object {idx, val, per}
	     * @note:
	     * - 정수일 때 addClass: 'on'
	     * - 소수일 때 addClass: 'on half'
	     */
	    StarRating.prototype.changeStar = function (data) {
	        var val = parseFloat((data.val - data.idx).toFixed(1)),
	            $lists = $(this.lists),
	            $list,
	            i,
	            len;
	
	        for (i = 0, len = this.listLen; i < len; i++) {
	            $list = $lists.eq(i);
	
	            if (val === 0 || i > data.idx) {
	                $list.removeClass(this.options.activeClass).removeClass(this.options.halfClass);
	            } else if (i === data.idx) {
	                $list.addClass(this.options.activeClass);
	
	                if (val <= 0.5) {
	                    $list.addClass(this.options.halfClass);
	                } else {
	                    $list.removeClass(this.options.halfClass);
	                }
	            } else {
	                $list.addClass(this.options.activeClass);
	            }
	        }
	    };
	
	    /**
	     * DOM에서 각 Step의 Caption을 가져온다.
	     * @return: Array
	     */
	    StarRating.prototype.getCaptions = function () {
	        var lists = this.lists,
	            arr = [],
	            span,
	            i,
	            len;
	
	        for (i = 0, len = this.listLen; i < len; i++) {
	            span = lists[i].querySelector('span');
	            arr.push(span.innerHTML);
	        }
	
	        return arr;
	    };
	
	    /**
	     * Caption change method
	     * @param: object {idx, val, per}
	     */
	    StarRating.prototype.changeCaption = function (data) {
	        var idx = data.val === 0 ? 0 : data.idx + 1;
	        this.caption.change(idx);
	    };
	
	    /**
	     * window resize handler method
	     * @param: object {events}
	     */
	    StarRating.prototype.resize = function () {
	        this.rect = this.wrap.getBoundingClientRect();
	    };
	
	    StarRating.defaults = {
	        min: 0,
	        step: 1,
	        activeClass: 'on',
	        halfClass: 'half'
	    };
	
	    return StarRating;
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/**
	 * DimmedLayer Plugin(UMD)
	 *
	 * @env: MOBILE
	 *
	 * @example:
	 *     skpui.dimmedLayer.init();
	 *
	 * @ UI development team. SKP.
	 */
	(function (root, factory) {
	    /* istanbul ignore next */
	    if (( false ? 'undefined' : _typeof(exports)) === 'object') {
	        module.exports = factory(__webpack_require__(2));
	    } else {
	        root.skpui = root.skpui || {};
	        root.skpui['dimmedLayer'] = factory(root.jQuery);
	    }
	})(undefined, function ($) {
	    'use strict';
	
	    var dimmedLayer = null;
	
	    var create = function create() {
	        return {
	            init: function init() {
	                $.extend(this, dimmedLayer.defaults);
	
	                /* istanbul ignore next */
	                if ($('body').length === 0) {
	                    return;
	                }
	
	                if (!this.layer) {
	                    this.layer = $('.dim');
	
	                    if (this.layer.length < 1) {
	                        this.layer = $('<div class="dim"/>');
	                        $('body').append(this.layer);
	                    }
	                    this.layer.addClass('animated');
	                    if (isNaN(this.layer.css('z-index')) || parseInt(this.layer.css('z-index'), 10) === 0) {
	                        this.layer.css('z-index', this.zIndex);
	                    } else {
	                        this.zIndex = parseInt(this.layer.css('z-index'), 10);
	                    }
	                    this.setHandler();
	                }
	            },
	            setHandler: function setHandler() {
	                var _this = this;
	
	                this.layer.on('touchmove', function (e) {
	                    e.preventDefault();
	                }).on('click', function (e) {
	                    e.preventDefault();
	                    $(this).trigger(_this.event, ['click']);
	                });
	            },
	            show: function show() {
	                if (!this.layer) {
	                    this.init();
	                }
	                if (this.layer.is(':hidden')) {
	                    $('body').css('overflow', 'hidden');
	                    this.layer.show().removeClass('fadeOut').addClass('fadeIn');
	                }
	            },
	            hide: function hide() {
	                if (!this.layer) {
	                    this.init();
	                }
	                if (this.layer.is(':visible')) {
	                    $('body').css('overflow', 'auto');
	                    this.layer.removeClass('fadeIn').addClass('fadeOut').show(0).delay(300).hide(0);
	                }
	            }
	        };
	    };
	
	    var getInstance = function getInstance() {
	        if (!dimmedLayer) {
	            dimmedLayer = create();
	            dimmedLayer.defaults = {
	                event: 'dimmedLayerEvent',
	                zIndex: 101
	            };
	            dimmedLayer.init();
	        }
	        return dimmedLayer;
	    };
	
	    return getInstance();
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/**
	 * Modal Component
	 *
	 * @deps: jquery v2.1.1+
	 * @deps: skpui.dimmedLayer.js
	 *
	 * @example:
	 *      // setting
	 *      var modal = new skpui.modal({
	 *          modalEl: [require] Element Selector {string},
	 *          closeEl: [require] Element Selector {string},
	 *          openEl: Element Selector {string},
	 *          type: show animation type {string},
	 *          outType: hide animation type {string},
	 *          position: modal position {string},
	 *          dimmed: use dimmed layer {boolean},
	 *          onBeforeOpen: callback method {function},
	 *          onAfterOpen: callback method {function},
	 *          onBeforeClose: callback method {function},
	 *          onAfterClose: callback method {function}
	 *      });
	 *
	 *      // use
	 *      $('.btn').on('click', function(e) {
	 *          e.preventDefault();
	 *
	 *          modal.open(e);
	 *      });
	 */
	(function (root, factory) {
	    /* istanbul ignore next */
	    if (( false ? 'undefined' : _typeof(exports)) === 'object') {
	        module.exports = factory(__webpack_require__(2), __webpack_require__(6));
	    } else {
	        root.skpui = root.skpui || {};
	        root.skpui['modal'] = factory(root.jQuery, root.skpui['dimmedLayer']);
	    }
	})(undefined, function ($, DimmedLayer) {
	    'use strict';
	
	    var win = window,
	        $win = $(win);
	
	    function Modal(opts) {
	        $.extend(this, Modal.defaults, opts);
	        this.initialize();
	    }
	
	    Modal.prototype.initialize = function () {
	        var name = this.modalEl.split(' ');
	        this.instancename = name[0].substr(1);
	        this.$modal = null;
	        this.modalType = '';
	        this.modalTypeOut = '';
	        this.transitionAnimationEndEvent = this.getTransitionEndEventNames() + ' ' + this.getAnimationEndEventNames();
	    };
	
	    Modal.prototype.getTransitionEndEventNames = function () {
	        return this._getEndEventNames(this.transitionEndEventNames);
	    };
	
	    Modal.prototype.getAnimationEndEventNames = function () {
	        return this._getEndEventNames(this.animationEndEventNames);
	    };
	
	    Modal.prototype._getEndEventNames = function (obj) {
	        var events = [];
	
	        for (var eventName in obj) {
	            if (obj.hasOwnProperty(eventName)) {
	                events.push(obj[eventName]);
	            }
	        }
	
	        return events.join(' ');
	    };
	
	    Modal.prototype.refresh = function () {
	        if (this.$modal.length !== 1) {
	            return;
	        }
	        this.resetModalHeight();
	    };
	
	    Modal.prototype.open = function (e) {
	        var $btn, modalZIndex, zIndex, pos;
	
	        if (this.isShown) {
	            return;
	        }
	        this.isShown = true;
	
	        $btn = $(e && e.currentTarget || this.openEl);
	        this.$modal = $($btn.data('modal-target') || this.modalEl);
	
	        if (this.$modal.length !== 1) {
	            return;
	        }
	
	        if (!this.$modal.hasClass('animated')) {
	            this.$modal.addClass('animated');
	        }
	
	        modalZIndex = this.$modal.css('z-index');
	        zIndex = isNaN(modalZIndex) || parseInt(modalZIndex, 10) === 0 ? DimmedLayer.zIndex + 1 : modalZIndex;
	        this.$modal.css('z-index', zIndex);
	        this.$closeEl = this.$modal.find(this.closeEl);
	        /**
	         * 1. find modal-type attribute of open button element
	         * 2. find this.type
	         */
	        this.modalType = $btn.data('modal-type') || this.type;
	
	        if (!this.animationType[this.modalType]) {
	            this.modalType = this.type = 'fadeIn';
	        }
	
	        /**
	         * 1. find modal-out-type attribute of open button element
	         * 2. find this.outType
	         * 3. find this.animationType[this.modalType].out
	         */
	        this.modalTypeOut = $btn.data('modal-out-type') || this.outType || this.animationType[this.modalType].out;
	
	        if (this.modalType === 'fadeIn') {
	            /**
	             * 1. find modal-position attribute of open button element
	             * 2. find this.position
	             */
	            pos = $btn.data('modal-position') || this.position || 'center';
	        } else {
	            pos = this.animationType[this.modalType].position;
	        }
	        this.modalPosition = this.prefix + pos;
	
	        this.addHandler();
	        this.openModal();
	        if (typeof this.onBeforeOpen === 'function') {
	            this.onBeforeOpen(e);
	        }
	    };
	
	    Modal.prototype.addHandler = function () {
	        var _this = this;
	
	        this.$modal.on('touchmove mousemove', function (e) {
	            e.preventDefault();
	        });
	        this.$closeEl.on('click', $.proxy(this.close, this));
	        $(window).on('resize.' + this.instancename, function () {
	            _this.refresh();
	        });
	    };
	
	    Modal.prototype.isFullSize = function () {
	        var h = this.$modal.outerHeight();
	        return h === $win.height();
	    };
	
	    Modal.prototype.resetModalHeight = function () {
	        var winHeight = $win.height(),
	            marginTop = 0,
	            modalHeight = this.$modal.outerHeight() >= winHeight ? winHeight : this.$modal.outerHeight();
	
	        if (this.isSidePosition() && modalHeight < winHeight) {
	            marginTop = parseInt((winHeight - modalHeight) / 2, 10);
	        }
	        this.$modal.css('margin-top', marginTop);
	    };
	
	    Modal.prototype.openModal = function () {
	        if (this.dimmed) {
	            this.addDimmed();
	        }
	
	        this.$modal.show();
	        this.resetModalHeight();
	        this.$modal.addClass(this.modalPosition).addClass(this.modalType).on(this.transitionAnimationEndEvent, $.proxy(function () {
	            this.$modal.off(this.transitionAnimationEndEvent);
	            if (this.dimmed) {
	                DimmedLayer.layer.on(DimmedLayer.event, $.proxy(this.close, this));
	            }
	
	            if (typeof this.onAfterOpen === 'function') {
	                this.onAfterOpen();
	            }
	        }, this));
	    };
	
	    Modal.prototype.isSidePosition = function () {
	        return this.modalPosition.indexOf('left') !== -1 || this.modalPosition.indexOf('right') !== -1;
	    };
	
	    Modal.prototype.close = function (e) {
	        if (e) {
	            e.preventDefault();
	        }
	
	        if (!this.isShown) {
	            return;
	        }
	
	        this.$modal.on(this.transitionAnimationEndEvent, $.proxy(this.closeModal, this));
	        this.$modal.removeClass(this.modalType);
	        this.$modal.addClass(this.modalTypeOut);
	
	        this.removeHandler();
	        if (this.dimmed) {
	            DimmedLayer.layer.off(DimmedLayer.event);
	            this.removeDimmed();
	        }
	        if (typeof this.onBeforeClose === 'function') {
	            this.onBeforeClose(e);
	        }
	    };
	
	    Modal.prototype.closeModal = function () {
	        this.$modal.off(this.transitionAnimationEndEvent).hide().removeClass(this.modalTypeOut).removeClass(this.modalPosition);
	
	        this.modalPosition = '';
	        this.modalTypeOut = '';
	        this.modalType = '';
	        this.isShown = false;
	
	        if (typeof this.onAfterClose === 'function') {
	            this.onAfterClose();
	        }
	    };
	
	    Modal.prototype.removeHandler = function () {
	        this.$modal.off('touchstart touchmove scroll mousemove');
	        this.$closeEl.off('touchstart click');
	        $(window).off('resize.' + this.instancename);
	    };
	
	    Modal.prototype.addDimmed = function () {
	        DimmedLayer.show();
	    };
	
	    Modal.prototype.removeDimmed = function () {
	        DimmedLayer.hide();
	    };
	
	    Modal.defaults = {
	        prefix: 'modal-',
	        modalEl: '.modal-wrap',
	        closeEl: '.modal-close',
	        type: 'fadeIn',
	        dimmed: true,
	
	        modalPressedEvent: 'touchstart click',
	        animationEndEventNames: {
	            'WebkitAnimation': 'webkitAnimationEnd',
	            'OAnimation': 'oAnimationEnd',
	            'msAnimation': 'MSAnimationEnd',
	            'animation': 'animationend'
	        },
	        transitionEndEventNames: {
	            'WebkitTransition': 'webkitTransitionEnd',
	            'OTransition': 'oTransitionEnd',
	            'msTransition': 'MSTransitionEnd',
	            'transition': 'transitionend'
	        },
	        animationType: {
	            'fadeIn': {
	                'out': 'fadeOut'
	            },
	            'fadeInLeft': {
	                'out': 'fadeOutLeft',
	                'position': 'left'
	            },
	            'fadeInRight': {
	                'out': 'fadeOutRight',
	                'position': 'right'
	            },
	            'slideInTop': {
	                'out': 'slideOutTop',
	                'position': 'top'
	            },
	            'slideInBottom': {
	                'out': 'slideOutBottom',
	                'position': 'bottom'
	            },
	            'slideInLeft': {
	                'out': 'slideOutLeft',
	                'position': 'left'
	            },
	            'slideInRight': {
	                'out': 'slideOutRight',
	                'position': 'right'
	            }
	        }
	    };
	
	    return Modal;
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/**
	 * ToggleLayer Component
	 * @deps: jquery v2.1.1+
	 * @deps: skpui.dimmedLayer.js
	 * @example:
	 *      var cate = new skpui.toggleLayer('#toggleCate');
	 *      var cate = new skpui.toggleLayer('#toggleCate', {
	 *          dimmed: true
	 *      });
	 */
	(function (root, factory) {
	    /* istanbul ignore next */
	    if (( false ? 'undefined' : _typeof(exports)) === 'object') {
	        module.exports = factory(__webpack_require__(2), __webpack_require__(6));
	    } else {
	        root.skpui = root.skpui || {};
	        root.skpui['toggleLayer'] = factory(root.jQuery, root.skpui['dimmedLayer']);
	    }
	})(undefined, function ($, DimmedLayer) {
	    'use strict';
	
	    // var opts = {},
	    //         isShow = false;
	    // var isShow = false;
	
	    function ToggleLayer(el, options) {
	        this.$el = $(el);
	        if (this.$el.length < 1) {
	            return;
	        }
	        this.opts = $.extend({}, ToggleLayer.defaults, options);
	        this.isShow = false;
	
	        this.initialize();
	    }
	
	    ToggleLayer.prototype.initialize = function () {
	        this.addHandler();
	    };
	
	    ToggleLayer.prototype.addHandler = function () {
	        var _this = this;
	
	        this.$openEl = $(this.opts.openEl);
	        this.$openEl.on('click', function (e) {
	            e.preventDefault();
	            _this.toggle();
	        });
	
	        this.$closeEl = $(this.opts.closeEl);
	        this.$closeEl.on('click', function (e) {
	            e.preventDefault();
	            _this.toggle();
	        });
	    };
	
	    ToggleLayer.prototype.toggle = function () {
	        this.isShow ? this.hide() : this.show();
	        this.isShow = !this.isShow;
	    };
	
	    ToggleLayer.prototype.show = function () {
	        this.$el.addClass(this.opts.wrapElToggleClass);
	        this.$openEl.addClass(this.opts.openElToggleClass);
	        if (typeof this.opts.container !== 'undefined') {
	            $(this.opts.container).show();
	        }
	        if (this.opts.dimmed) {
	            DimmedLayer.layer.on(DimmedLayer.event, $.proxy(this.toggle, this));
	            this.addDimmed();
	        }
	        if (typeof this.opts.onAfterOpen === 'function') {
	            this.opts.onAfterOpen();
	        }
	    };
	
	    ToggleLayer.prototype.hide = function () {
	        this.$el.removeClass(this.opts.wrapElToggleClass);
	        this.$openEl.removeClass(this.opts.openElToggleClass);
	        if (typeof this.opts.container !== 'undefined') {
	            $(this.opts.container).hide();
	        }
	        if (this.opts.dimmed) {
	            DimmedLayer.layer.off(DimmedLayer.event);
	            this.removeDimmed();
	        }
	        if (typeof this.opts.onAfterClose === 'function') {
	            this.opts.onAfterClose();
	        }
	    };
	
	    ToggleLayer.prototype.addDimmed = function () {
	        DimmedLayer.show();
	    };
	
	    ToggleLayer.prototype.removeDimmed = function () {
	        DimmedLayer.hide();
	    };
	
	    ToggleLayer.defaults = {
	        dimmed: false,
	        openEl: '.toggle-open',
	        closeEl: '.toggle-close',
	        openElToggleClass: 'on',
	        wrapElToggleClass: 'toggle-show'
	    };
	
	    return ToggleLayer;
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/**
	 * Magnet Component(UMD)
	 *
	 * @deps    jquery v2.1.1+
	 * @deps    util.js
	 * @deps    polyfill.js
	 * @param   {Object} skpui
	 * @param   {Function} factory
	 * @env     MOBILE
	 * @exports Magnet
	 * @example:
	 *     new skpui.magnet(selector, parameters);
	 *
	 *     var nav = new skpui.magnet('#nav', {
	 *         wrapperClassName: wapper className {default: 'c-magnet'},
	 *         stickyClassName: position sticky를 사용할 경우 className {default: 'c-magnet--sticky'},
	 *         fixedClassName: position fixed를 사용할 경우 className {default: 'c-magnet--fixed'},
	 *         activeClassName: magnet이 되었을 경우 className {default: 'is--active'},
	 *         useSticky: position sticky 사용 여부 {default: true},
	 *         zIndex: z-index value {default: 'auto'},
	 *         topSpacing: 상단 간격 {default: 0}
	 *     });
	 */
	(function (root, factory) {
	    /* istanbul ignore next */
	    if (( false ? 'undefined' : _typeof(exports)) === 'object') {
	        module.exports = factory(__webpack_require__(2), (typeof skpui === 'undefined' ? 'undefined' : _typeof(skpui)) === 'object' ? skpui.util : __webpack_require__(3));
	    } else {
	        root.skpui = root.skpui || {};
	        root.skpui['magnet'] = factory(root.jQuery, root.skpui.util);
	    }
	})(undefined, function ($, Util) {
	    'use strict';
	
	    var $win = $(window);
	
	    /**
	     * @constructor
	     * @param {[type]} element [description]
	     * @param {[type]} options [description]
	     */
	    function Magnet(element, options) {
	        this.$el = $(element);
	        this.opts = $.extend({}, Magnet.defaults, options);
	
	        this.initialize();
	    }
	
	    /**
	     * initialize description
	     */
	    Magnet.prototype.initialize = function () {
	        // 안드로이드 2,3에서는 고정기능 사용하지 않음(클릭이슈)
	        if (Util.device.isAOS() && Util.device.version() < 3) {
	            return;
	        }
	
	        this.useSticky = this.useSticky();
	
	        this.wrapping();
	        this.addHandler();
	    };
	
	    /**
	     * useSticky
	     * position sticky 사용 여부
	     * @return {Blean}
	     */
	    Magnet.prototype.useSticky = function () {
	        var useSticky = false;
	
	        if (Util.device.isIOS() && Util.featureDetect('position', 'sticky') && this.opts.useSticky) {
	            useSticky = true;
	        }
	
	        return useSticky;
	    };
	
	    /**
	     * wrapping description
	     * magnet 되었을 경우 영역을 잡기 위해 wrapping
	     */
	    Magnet.prototype.wrapping = function () {
	        var $wrapper = $('<div></div>');
	
	        $wrapper.css({
	            'margin-top': this.$el.css('margin-top'),
	            'height': this.$el.outerHeight(),
	            'zIndex': this.opts.zIndex
	        }).addClass(this.opts.wrapperClassName);
	
	        if (this.useSticky) {
	            $wrapper.css('top', this.opts.topSpacing).addClass(this.opts.stickyClassName);
	        } else {
	            $wrapper.addClass(this.opts.fixedClassName);
	        }
	
	        this.$el.css('margin-top', 0).wrapAll($wrapper);
	    };
	
	    /**
	     * unwrapping
	     * margnet wrapping 제거
	     */
	    Magnet.prototype.unwrapping = function () {
	        var wrapperMarginTop = this.$el.parent().css('margin-top');
	
	        this.$el.css({
	            'margin-top': wrapperMarginTop,
	            'top': 'auto'
	        }).unwrap();
	    };
	
	    /**
	     * scroller description
	     * scroll시 magnet 처리
	     */
	    Magnet.prototype.scroller = function () {
	        var $wrapper = this.$el.parent();
	
	        if (!$wrapper.hasClass(this.opts.wrapperClassName)) {
	            return false;
	        }
	
	        if ($win.scrollTop() >= $wrapper.offset().top - this.opts.topSpacing) {
	            if (!this.useSticky) {
	                this.$el.css('top', this.opts.topSpacing);
	            }
	
	            $wrapper.addClass(this.opts.activeClassName);
	        } else {
	            if (!this.useSticky) {
	                this.$el.css('top', 'auto');
	            }
	            $wrapper.removeClass(this.opts.activeClassName);
	        }
	
	        return true;
	    };
	
	    /**
	     * refresh
	     * magnet 재설정
	     */
	    Magnet.prototype.refresh = function () {
	        this.scroller();
	    };
	
	    /**
	     * destroy
	     * magnet 초기화
	     */
	    Magnet.prototype.destroy = function () {
	        this.unwrapping();
	    };
	
	    /**
	     * addHandler
	     */
	    Magnet.prototype.addHandler = function () {
	        $win.on('load resize scroll', function () {
	            this.scroller();
	        }.bind(this));
	    };
	
	    Magnet.defaults = {
	        wrapperClassName: 'c-magnet',
	        stickyClassName: 'c-magnet--sticky',
	        fixedClassName: 'c-magnet--fixed',
	        activeClassName: 'is--active',
	        useSticky: true,
	        zIndex: 'auto',
	        topSpacing: 0
	    };
	
	    return Magnet;
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/**
	 * Sticky Component(UMD)
	 *
	 * @deps    jquery v2.1.1+
	 * @deps    skpui.util
	 * @param   {Object} skpui
	 * @param   {Function} factory
	 * @env     MOBILE
	 * @exports Sticky
	 * @example:
	        var sticky = new skpui.sticky({
	            el: Sticky Wrapper el
	            topSpacing: 상단 간격 {default: 0}
	            onStickyStart: function(sticked) {},
	            onStickyEnd: function(sticked) {}
	        });
	 *
	 */
	(function (root, factory) {
	    /* istanbul ignore next */
	    if (( false ? 'undefined' : _typeof(exports)) === 'object') {
	        module.exports = factory(__webpack_require__(2), (typeof skpui === 'undefined' ? 'undefined' : _typeof(skpui)) === 'object' ? skpui.util : __webpack_require__(3));
	    } else {
	        root.skpui = root.skpui || {};
	        root.skpui['sticky'] = factory(root.jQuery, root.skpui.util);
	    }
	})(undefined, function ($, Util) {
	
	    'use strict';
	
	    var $win = $(window);
	
	    /**
	     * @constructor
	     * @param {[type]} element [description]
	     * @param {[type]} options [description]
	     */
	    function Sticky(options) {
	        this.opts = $.extend({}, Sticky.defaults, options);
	        this.$el = $(this.opts.el);
	        this.$header = this.$el.find('.' + this.opts.headerClassName);
	    }
	
	    /**
	     * initialize description
	     */
	    Sticky.prototype.initialize = function () {
	        if (this.isEnableDevice()) {
	            if (this.isSupportSticky()) {
	                this.setPositionSticky();
	            } else {
	                this.insertDummyEl();
	                this.setUpsideHeight();
	                this.addHandler();
	            }
	        }
	    };
	
	    /**
	     * addHandler
	     */
	    Sticky.prototype.addHandler = function () {
	        $win.on('scroll.' + this.opts.el, function () {
	            this.scroller();
	        }.bind(this));
	    };
	
	    /**
	     * isEnableDevice
	     * 고정기능 사용 디바이스 체크
	     * @return {Boolean}
	     */
	    Sticky.prototype.isEnableDevice = function () {
	        // 안드로이드 2,3에서는 고정기능 사용하지 않음(클릭이슈)
	        if (Util.device.isAOS() && Util.device.version() < 3) {
	            return false;
	        }
	
	        return true;
	    };
	
	    /**
	     * isSupportSticky
	     * position: sticky 지원여부 체크
	     * @return {Boolean}
	     */
	    Sticky.prototype.isSupportSticky = function () {
	        if (this.opts.useDefaultSticky && Util.device.isIOS() && Util.featureDetect('position', 'sticky')) {
	            return true;
	        }
	
	        return false;
	    };
	
	    /**
	     * setPositionSticky
	     * position:sticky 기능을 설정한다.
	     */
	    Sticky.prototype.setPositionSticky = function () {
	        this.$header.addClass(this.opts.stickyClassName).css({ top: this.opts.topSpacing });
	    };
	
	    /**
	     * insertDummyEl
	     * Header 이동 시 Wrapper의 높이를 맞춰주기 위한 Dummy El을 설정한다.
	     */
	    Sticky.prototype.insertDummyEl = function () {
	        var $dummyEl = $('<div class="' + this.opts.dummyClassName + '"></div>');
	
	        if (this.$el.find('.' + this.opts.dummyClassName).length === 0) {
	            $dummyEl.insertAfter(this.$header);
	        }
	    };
	
	    /**
	     * setUpsideHeight
	     * Header의 윗 공간을 계산한다.
	     */
	    Sticky.prototype.setUpsideHeight = function () {
	        this.upsideHeight = this.$header.position().top + parseInt(this.$header.css('margin-top'), 10);
	    };
	
	    /**
	     * computeStickyZone
	     * Sticky Header의 높이와 Wrapper의 높이 등을 계산한다.
	     * @param {jQuery Array} $header header
	     * @return {Array} 현재 Sticky Header + 위 header + 아래 header
	     */
	    Sticky.prototype.computeStickyZone = function ($header) {
	        if ($header.length === 0) {
	            throw new Error('Can not find [headerClassName] elements in configured [el]. check option [el, headerClassName]');
	        }
	
	        var $wrapper = this.$el,
	            wrapperOffset = $wrapper.offset() || {},
	            wrapperTop = wrapperOffset.top || 0;
	
	        return {
	            start: wrapperTop + this.upsideHeight - this.opts.topSpacing,
	            end: wrapperTop + $wrapper.outerHeight(false) - $header.outerHeight() - this.opts.topSpacing,
	            isActive: $header.hasClass(this.opts.activeClassName)
	        };
	    };
	
	    /**
	     * setDeactive
	     * Header를 초기화 한다.
	     * @param {string} $headerEl 대상 header
	     */
	    Sticky.prototype.setDeactive = function ($headerEl) {
	        var opts = this.opts;
	
	        $headerEl.removeClass(opts.activeClassName).removeClass(opts.fixedClassName).css({ top: '' });
	    };
	
	    /**
	     * setActive
	     * Header의 포지션을 Fixed로 변경한다.
	     * @param {string} $headerEl 대상 header
	     */
	    Sticky.prototype.setActive = function ($headerEl) {
	        var opts = this.opts,
	            height = $headerEl.outerHeight();
	
	        $headerEl.siblings('.' + opts.dummyClassName).css('height', height);
	
	        $headerEl.removeClass(opts.absoluteClassName).css({
	            top: opts.topSpacing
	            // width: width,
	            // height: height
	        }).addClass(opts.activeClassName).addClass(opts.fixedClassName);
	    };
	
	    /**
	     * eventTrigger
	     * 이벤트를 발생시킨다.
	     * @return {[type]} [description]
	     */
	    Sticky.prototype.eventTrigger = function (events) {
	        var i = 0,
	            len = events.length;
	
	        for (; i < len; i++) {
	            if (typeof this.opts[events[i]] === 'function') {
	                this.opts[events[i]](this.$el);
	            } else {
	                this.$el.trigger(events[i], [this.$el]);
	            }
	        }
	    };
	
	    /**
	     * scroller
	     * scroll시 Sticky 처리
	     */
	    Sticky.prototype.scroller = function () {
	        var opts = this.opts,
	            scrollTop = $win.scrollTop(),
	            $header = this.$header,
	            stickyZone = this.computeStickyZone($header),
	            isScrollIn = scrollTop > stickyZone.start && scrollTop < stickyZone.end,
	            isScrollOutToDown = scrollTop > stickyZone.end,
	            isScrollOutToUp = scrollTop < stickyZone.start;
	
	        if (stickyZone.isActive) {
	            if (isScrollOutToDown || isScrollOutToUp) {
	                this.setDeactive($header);
	
	                isScrollOutToDown && $header.addClass(opts.absoluteClassName);
	
	                this.eventTrigger(['onStickyEnd', 'stickyEnd']);
	            }
	        } else {
	            if (isScrollIn) {
	                this.setActive($header);
	                this.eventTrigger(['onStickyStart', 'stickyStart']);
	            }
	        }
	    };
	
	    /**
	     * init
	     * initialize description
	     */
	    Sticky.prototype.init = function () {
	        this.initialize();
	    };
	
	    /**
	     * refresh
	     * Sticky 재설정
	     */
	    Sticky.prototype.refresh = function () {
	        this.destroy();
	        this.init();
	    };
	
	    /**
	     * destroy
	     * Sticky 초기화
	     */
	    Sticky.prototype.destroy = function () {
	        $win.off('scroll.' + this.opts.el);
	
	        this.$el.find('.' + this.opts.dummyClassName).remove();
	
	        this.$header.removeClass(this.opts.stickyClassName).removeClass(this.opts.fixedClassName).removeClass(this.opts.absoluteClassName).removeClass(this.opts.activeClassName).removeAttr('style');
	    };
	
	    Sticky.defaults = {
	        headerClassName: 'c-sticky__header',
	        stickyClassName: 'c-sticky__header--sticky',
	        fixedClassName: 'c-sticky__header--fixed',
	        absoluteClassName: 'c-sticky__header--absolute',
	        activeClassName: 'c-sticky__header--active',
	        dummyClassName: 'c-sticky__dummy',
	        topSpacing: 0,
	        useDefaultSticky: true
	    };
	
	    return Sticky;
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/**
	 * Tab Component(UMD)
	
	 * @deps    jquery v2.1.1+
	 * @deps    skpui.magnet
	 * @param   {Object} skpui
	 * @param   {Function} factory
	 * @env     MOBILE
	 * @exports Tab
	 * @example
	 *   var tab = new skpui.tab({
	 *      el: '#tab', // 네비게이션 영역의 wrapEl의 ID
	 *      activeClass: 'on', // 네비게이션, 컨텐츠 영역의 Active 클래스명
	 *      activeIndex: 0, // 탭 생성 후 기본으로 선택될 인덱스
	 *      callbackOnFirst: false, //탭 생성 후 선택 콜백 발생 여부
	 *      magnet: {use: true, option: {}} // 네비게이션 영역의 Magnet 적용여부
	 *   });
	 *
	 *   tab1.init();
	 */
	(function (root, factory) {
	    /* istanbul ignore next */
	    if (( false ? 'undefined' : _typeof(exports)) === 'object') {
	        module.exports = factory(__webpack_require__(2), __webpack_require__(9));
	    } else {
	        root.skpui = root.skpui || {};
	        root.skpui['tab'] = factory(root.jQuery, root.skpui.magnet);
	    }
	})(undefined, function ($, Magnet) {
	
	    'use strict';
	
	    /**
	     * @constructor
	     * @param {[type]} options [description]
	     */
	
	    function Tab(options) {
	        this.opts = $.extend({}, Tab.defaults, options);
	    }
	
	    /**
	     * initialize description
	     */
	    Tab.prototype.initialize = function () {
	        this.$navisEl = $(this.opts.el);
	        this.$contentsEl = $('body').find('[data-tab="' + this.$navisEl.attr('id') + '"]');
	
	        this.addHandler();
	
	        this.opts.magnet && this.opts.magnet.use && this.setMagnet();
	
	        this.active(this.opts.activeIndex, !this.opts.callbackOnFirst);
	    };
	
	    /**
	     * addHandler
	     */
	    Tab.prototype.addHandler = function () {
	        this.$navisEl.on('click', this.opts.naviEl, function (e) {
	            e.preventDefault();
	
	            this.active($(e.currentTarget).index());
	        }.bind(this));
	    };
	
	    /**
	     * setMagnet
	     * 네비게이션 Magnet 설정
	     */
	    Tab.prototype.setMagnet = function () {
	        this.magnet = new Magnet(this.$navisEl, this.opts.magnet.option);
	    };
	
	    /**
	     * getNavis
	     * 네비게이션의 탭 리스트 반환
	     * @return [TabEl]
	     */
	    Tab.prototype.getNavis = function () {
	        return this.$navisEl.find(this.opts.naviEl);
	    };
	
	    /**
	     * getContents
	     * 컨텐츠 리스트 반환
	     * @return [ContentsEl]
	     */
	    Tab.prototype.getContents = function () {
	        return this.$contentsEl.children(this.opts.contentEl);
	    };
	
	    /**
	     * toggleNavigations
	     * 네비게이션의 Active CSS 클래스 제거, 선택된 네비게이션의 Active CSS 클래스 추가
	     */
	    Tab.prototype.toggleNavigations = function (index) {
	        var $_liList = this.getNavis();
	
	        $_liList.removeClass(this.opts.activeClass);
	        index > -1 && $_liList.eq(index).addClass(this.opts.activeClass);
	    };
	
	    /**
	     * toggleContents
	     * 컨텐츠영역의 Active CSS 클래스 제거, 선택된 컨텐츠영역의 Active CSS 클래스 추가
	     */
	    Tab.prototype.toggleContents = function (index) {
	        var $_divList = this.getContents();
	
	        $_divList.removeClass(this.opts.activeClass);
	        index > -1 && $_divList.eq(index).addClass(this.opts.activeClass);
	    };
	
	    /**
	     * active
	     * 탭 선택
	     */
	    Tab.prototype.active = function (index, skipCallback) {
	        this.activeIndex = index;
	
	        this.toggleNavigations(index);
	        this.toggleContents(index);
	
	        var _args = {
	            naviEl: this.getNavis().eq(index),
	            contentsEl: this.getContents().eq(index),
	            activeIndex: this.activeIndex
	        };
	
	        if (!skipCallback) {
	            this.$navisEl.trigger(this.opts.tabClickEvent, _args);
	
	            if (typeof this.opts.onTabClick === 'function') {
	                this.opts.onTabClick(_args);
	            }
	        }
	    };
	
	    /**
	     * init
	     * initialize description
	     */
	    Tab.prototype.init = function () {
	        this.initialize();
	    };
	
	    /**
	     * update
	     * 탭 선택
	     */
	    Tab.prototype.update = function (index) {
	        this.active(index);
	    };
	
	    /**
	     * add
	     * 탭 추가
	     */
	    Tab.prototype.add = function (newTab) {
	        this.$navisEl.find(this.opts.naviEl).last().after(newTab.naviEl);
	
	        this.$contentsEl.length > 0 && this.$contentsEl.append(newTab.contentEl);
	    };
	
	    /**
	     * remove
	     * 탭 삭제
	     */
	    Tab.prototype.remove = function (index) {
	        this.getNavis().eq(index).remove();
	
	        this.$contentsEl.length > 0 && this.getContents().eq(index).remove();
	    };
	
	    /**
	     * destroy
	     * 컴포넌트 해제
	     */
	    Tab.prototype.destroy = function () {
	        this.$navisEl.off('click');
	        this.toggleNavigations(-1);
	        this.toggleContents(-1);
	    };
	
	    Tab.defaults = {
	        naviEl: 'li',
	        contentEl: 'div',
	        activeClass: 'on',
	        activeIndex: 0,
	        callbackOnFirst: false,
	        tabClickEvent: 'tabClick',
	        magnet: {
	            zIndex: 3,
	            topSpacing: 0
	        }
	    };
	
	    return Tab;
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/**
	 * Calendar Component(UMD)
	
	 * @deps    jquery v1.12.4+
	 * @param   {Object} skpui
	 * @param   {Function} factory
	 * @env     MOBILE
	 * @exports Calendar
	 * @example
	 *      var calendar = new skpui.calendar('#wrapper', {
	            today: {
	                date: '20170112',
	                label: 'TODAY'
	            },
	            marks: [
	                {
	                    list: [
	                        {date: '20170101', label: '신정'},
	                        {date: '20170127', label: '설날'},
	                        {date: '20170128', label: '설날'},
	                        {date: '20170129', label: '설날'},
	                        {date: '20170130', label: '대체휴일'},
	                        {date: '20170301', label: '삼일절'},
	                        {date: '20170503', label: '석가탄신일'},
	                        {date: '20170606', label: '현충일'},
	                        {date: '20170815', label: '광복절'},
	                        {date: '20171003', label: '개천절'},
	                        {date: '20171004', label: '추석'},
	                        {date: '20171005', label: '추석'},
	                        {date: '20171009', label: '한글날'},
	                        {date: '20171220', label: '19대 대통령선거일'},
	                        {date: '20171225', label: '크리스마스'}
	                    ],
	                    className: holidayClass
	                },
	                {
	                    list: [
	                        '20170107',
	                        '20170108',
	                        '20170109',
	                        '20170111',
	                        '20170112',
	                        '20170113',
	                        '20170114',
	                        '20170115',
	                        '20170116',
	                        '20170117',
	                        '20170118',
	                        '20170119',
	                        '20170120',
	                        '20170127'
	                    ],
	                    className: availableClass
	                }
	            ],
	            limit: {
	                start: '20160820',
	                end: '201803020'
	            },
	            onDrawAfter: function(data) {
	                calendar.setSelectDate('20170117', selectedClass);
	                calendar.getDateByNotMark(availableClass).addClass(disabledClass);
	            }
	        });
	
	        calendar.$wrapper.on('calendar.select', function(e, data) {
	            // Marking Selected Date
	            if (data.classes.indexOf('day_impossible') === -1) {
	                calendar.$wrapper.find('td[data-date]').removeClass(selectedClass);
	                calendar.$wrapper.find('td[data-date="' + data.date + '"]').addClass(selectedClass);
	            }
	
	            console.log(data);
	        });
	
	        calendar.$wrapper.on('calendar.button.prev', function(e, data) {
	            console.log(data);
	        });
	
	        calendar.$wrapper.on('calendar.button.next', function(e, data) {
	            console.log(data);
	        });
	 */
	(function (root, factory) {
	    /* istanbul ignore next */
	    if (( false ? 'undefined' : _typeof(exports)) === 'object') {
	        module.exports = factory(__webpack_require__(2));
	    } else {
	        root.skpui = root.skpui || {};
	        root.skpui['calendar'] = factory(root.jQuery);
	    }
	})(undefined, function ($) {
	
	    'use strict';
	
	    var Util = {
	        date: {
	            getLastDayOfMonth: function getLastDayOfMonth(y, m) {
	                return new Date(y, m, 0).getDate();
	            },
	            getDayCode: function getDayCode(y, m, d) {
	                return new Date(y, m - 1, d).getDay();
	            },
	            moveMonth: function moveMonth(y, m, diff) {
	                var date = new Date(y, m - 1, 1);
	
	                date.setMonth(date.getMonth() + diff);
	
	                return date;
	            },
	            parseStringToObject: function parseStringToObject(dateString) {
	                if (dateString.length < 8) {
	                    throw new Error('Invalid Date type. check option [today.date]');
	                }
	
	                return {
	                    year: parseInt(dateString.substring(0, 4), 10),
	                    month: parseInt(dateString.substring(4, 6), 10),
	                    date: parseInt(dateString.substring(6, 8), 10)
	                };
	            },
	            parseStringToDate: function parseStringToDate(dateString) {
	                if (dateString.length < 8) {
	                    throw new Error('Invalid Date type. check option [today.date]');
	                }
	
	                return new Date(parseInt(dateString.substring(0, 4), 10), parseInt(dateString.substring(4, 6), 10) - 1, parseInt(dateString.substring(6, 8), 10));
	            },
	            getYYYYMMDD: function getYYYYMMDD(date) {
	                if (date instanceof Date) {
	                    return [date.getFullYear(), (date.getMonth() + 1 > 9 ? '' : '0') + (date.getMonth() + 1), (date.getDate() > 9 ? '' : '0') + date.getDate()].join('');
	                } else {
	                    return [date.year, (date.month > 9 ? '' : '0') + date.month, (date.date > 9 ? '' : '0') + date.date].join('');
	                }
	            }
	        },
	        template: {
	            render: function render(stringEl, data) {
	                var extractVarsPt = /(\{\{)([a-z0-9_\.-])\w+(\}\})/g,
	                    getKeyPt = /([a-z0-9_\.-])\w+/g,
	                    parsedEl = stringEl;
	
	                var vars, key, i, len;
	
	                if (data) {
	                    vars = stringEl.match(extractVarsPt);
	
	                    i = 0;
	                    len = vars.length;
	
	                    for (; i < len; i++) {
	                        key = vars[i].match(getKeyPt)[0];
	                        parsedEl = parsedEl.replace(vars[i], data[key]);
	                    }
	                }
	
	                return $(parsedEl);
	            }
	        }
	    };
	
	    /**
	     * @constructor
	     * @param {String} wrapper Calendar wrapper selector
	     * @param {Object} options Option object
	     */
	    function Calendar(wrapper, options) {
	        this.opts = $.extend(true, {}, Calendar.defaults, options);
	        this.$wrapper = $(wrapper);
	    }
	
	    /**
	     * initialize description
	     */
	    Calendar.prototype.initialize = function () {
	        this.now = Util.date.parseStringToObject(this.opts.today.date);
	
	        this.addHandler();
	        this.select(new Date(this.now.year, this.now.month - 1, this.now.date));
	    };
	
	    Calendar.prototype.select = function (date) {
	        var selectedDate = date;
	
	        if (!(date instanceof Date)) {
	            selectedDate = Util.date.parseStringToDate(date);
	        }
	
	        this.calendarDate = {
	            year: selectedDate.getFullYear(),
	            month: selectedDate.getMonth() + 1,
	            date: 1
	        };
	
	        this.draw();
	    };
	
	    /**
	     * Calendar를 그린다.
	     */
	    Calendar.prototype.draw = function () {
	        var template = this.opts.template,
	            $headerEl = Util.template.render(template.header, this.calendarDate),
	            $bodyEl = Util.template.render(this.opts.template.body);
	
	        var i = 0,
	            len = this.opts.marks.length;
	
	        this.$wrapper.empty();
	
	        this.drawHeader($headerEl);
	        this.drawBodyHeader($bodyEl);
	        this.drawBody($bodyEl);
	
	        for (; i < len; i++) {
	            this.setMark(this.opts.marks[i]);
	        }
	
	        this.opts.onDrawAfter(this.calendarDate);
	    };
	
	    /**
	     * 달력의 헤더부분을 그린다.
	     */
	    Calendar.prototype.drawHeader = function ($headerEl) {
	        this.$wrapper.html($headerEl);
	    };
	
	    /**
	     * 달력의 요일표시 부분을 그린다.
	     */
	    Calendar.prototype.drawBodyHeader = function ($bodyEl) {
	        var template = this.opts.template,
	            dayOfWeek = this.opts.dayOfWeek,
	            $tr = Util.template.render(template.tr),
	            i = 0,
	            len = dayOfWeek.length;
	
	        for (; i < len; i++) {
	            $tr.append(Util.template.render(template.th, dayOfWeek[i]));
	        }
	
	        $bodyEl.find('thead').html($tr);
	    };
	
	    /**
	     * 달력의 날짜표시 부분을 그린다
	     */
	    Calendar.prototype.drawBody = function ($bodyEl) {
	        var template = this.opts.template,
	            calendarDays = this.setCalendarData(),
	            now = Util.date.getYYYYMMDD(this.now),
	            tdList = [],
	            _date,
	            _td,
	            $tr,
	            $td,
	            $em;
	
	        var i = 0,
	            len = calendarDays.length;
	
	        for (; i < len; i++) {
	            _date = calendarDays[i];
	
	            $td = Util.template.render(template.td, _date).addClass(_date.className);
	
	            // Set Sunday
	            Util.date.getDayCode(_date.year, _date.month, _date.date) === 0 && $td.addClass(this.opts.classes.sunday);
	            // Set Saturday
	            Util.date.getDayCode(_date.year, _date.month, _date.date) === 6 && $td.addClass(this.opts.classes.saturday);
	
	            // Set TODAY
	            if (now === calendarDays[i].fullDate) {
	                $em = Util.template.render(this.opts.template.em, { label: this.opts.today.label });
	                $td.find('button').append($em);
	                $td.addClass(this.opts.classes.today);
	            }
	
	            tdList.push($td);
	
	            if (tdList.length === 7) {
	                $tr = Util.template.render(template.tr);
	
	                while (_td = tdList.shift()) {
	                    $tr.append(_td);
	                }
	
	                $bodyEl.find('tbody').append($tr);
	
	                tdList = [];
	            }
	        }
	
	        this.$wrapper.append($bodyEl);
	    };
	
	    /**
	     * Calendar를 그리는데 필요한 값을 계산한다
	     */
	    Calendar.prototype.setCalendarData = function () {
	        var thisMonthLast = Util.date.getLastDayOfMonth(this.calendarDate.year, this.calendarDate.month),
	            thisMonthStartDayCode = Util.date.getDayCode(this.calendarDate.year, this.calendarDate.month, 1),
	            thisMonthEndDayCode = Util.date.getDayCode(this.calendarDate.year, this.calendarDate.month, thisMonthLast),
	            nextMonth = Util.date.moveMonth(this.calendarDate.year, this.calendarDate.month, 1),
	            prevMonth = Util.date.moveMonth(this.calendarDate.year, this.calendarDate.month, -1),
	            prevMonthLast = Util.date.getLastDayOfMonth(prevMonth.getFullYear(), prevMonth.getMonth() + 1);
	
	        var calendarDays = [],
	            i;
	
	        //전달
	        for (i = thisMonthStartDayCode; i > 0; i--) {
	            calendarDays.push({
	                fullDate: Util.date.getYYYYMMDD({
	                    year: prevMonth.getFullYear(),
	                    month: prevMonth.getMonth() + 1,
	                    date: prevMonthLast - i + 1
	                }),
	                year: prevMonth.getFullYear(),
	                month: prevMonth.getMonth() + 1,
	                date: prevMonthLast - i + 1,
	                className: this.opts.classes.otherMonthDay
	            });
	        }
	
	        // 이번달
	        for (i = 1; i <= thisMonthLast; i++) {
	            calendarDays.push({
	                fullDate: Util.date.getYYYYMMDD({
	                    year: this.calendarDate.year,
	                    month: this.calendarDate.month,
	                    date: i
	                }),
	                year: this.calendarDate.year,
	                month: this.calendarDate.month,
	                date: i,
	                className: this.opts.classes.thisMonthDay
	            });
	        }
	
	        //다음달
	        for (i = 1; i <= 7 - thisMonthEndDayCode; i++) {
	            calendarDays.push({
	                fullDate: Util.date.getYYYYMMDD({
	                    year: nextMonth.getFullYear(),
	                    month: nextMonth.getMonth() + 1,
	                    date: i
	                }),
	                year: nextMonth.getFullYear(),
	                month: nextMonth.getMonth() + 1,
	                date: i,
	                className: this.opts.classes.otherMonthDay
	            });
	        }
	
	        return calendarDays;
	    };
	
	    /**
	     * 공휴일을 표시한다.
	     */
	    Calendar.prototype.setMark = function (mark) {
	        var i = 0,
	            len = mark.list.length,
	            $em,
	            _date,
	            _label;
	
	        for (; i < len; i++) {
	            _date = _typeof(mark.list[i]) === 'object' ? mark.list[i].date : mark.list[i];
	            _label = _typeof(mark.list[i]) === 'object' ? mark.list[i].label : '';
	
	            if (_label.length > 0) {
	                $em = Util.template.render(this.opts.template.em, { label: _label });
	                this.$wrapper.find('td[data-date="' + _date + '"] button').append($em);
	            }
	
	            this.$wrapper.find('td[data-date="' + _date + '"]').addClass(mark.className);
	        }
	    };
	
	    /**
	     * Add Event Binding
	     */
	    Calendar.prototype.addHandler = function () {
	        this.$wrapper.on('click', 'td[data-date] > button', $.proxy(function (e) {
	            e.preventDefault();
	
	            var $target = $(e.currentTarget).closest('td'),
	                dateString = $target.data('date').toString();
	
	            this.$wrapper.trigger('calendar.select', {
	                date: dateString,
	                classes: $target.attr('class')
	            });
	        }, this));
	
	        this.$wrapper.on('click', 'button.view_prev', $.proxy(function (e) {
	            e.preventDefault();
	
	            var prevMonth = Util.date.moveMonth(this.calendarDate.year, this.calendarDate.month, -1);
	
	            this.select(prevMonth);
	            this.setMoveButtons();
	
	            this.$wrapper.trigger('calendar.button.prev', this.calendarDate);
	        }, this));
	
	        this.$wrapper.on('click', 'button.view_next', $.proxy(function (e) {
	            e.preventDefault();
	
	            var nextMonth = Util.date.moveMonth(this.calendarDate.year, this.calendarDate.month, 1);
	
	            this.select(nextMonth);
	            this.setMoveButtons();
	
	            this.$wrapper.trigger('calendar.button.next', this.calendarDate);
	        }, this));
	    };
	
	    Calendar.prototype.setMoveButtons = function () {
	        var nowDateFrom = new Date(this.calendarDate.year, this.calendarDate.month - 1, this.calendarDate.date),
	            nowDateTo = new Date(this.calendarDate.year, this.calendarDate.month - 1, Util.date.getLastDayOfMonth(this.calendarDate.year, this.calendarDate.month)),
	            limitCond = this.opts.limit;
	
	        var isDisabledPrev, isDisabledNext, limitFromDate, limitToDate;
	
	        if (limitCond) {
	            limitFromDate = Util.date.parseStringToDate(limitCond.start.substring(0, 8) + '01');
	            limitToDate = Util.date.parseStringToDate(limitCond.end.substring(0, 8) + '01');
	
	            isDisabledPrev = limitFromDate.getTime() >= nowDateFrom.getTime();
	            isDisabledNext = nowDateTo.getTime() >= limitToDate.getTime();
	
	            this.$wrapper.find('button.view_prev').attr('disabled', isDisabledPrev);
	            this.$wrapper.find('button.view_next').attr('disabled', isDisabledNext);
	        }
	    };
	
	    /**
	     * 캘린더의 데이터를 가져온다.
	     * @returns Object 현재월에 대한 정보, today: 설정된 오늘일자 정보
	     */
	    Calendar.prototype.getData = function () {
	        return {
	            calendarDate: this.calendarDate,
	            today: this.now
	        };
	    };
	
	    /**
	     * 현재 월에서 특정 클래스(Mark)가 있는 일자 리스트를 가지고 온다
	     * @param className 클래스명
	     * @returns $Object 특정 클래스가 있는 일자 리스트
	     */
	    Calendar.prototype.getDateByMark = function (className) {
	        return this.$wrapper.find('td[data-date].' + className);
	    };
	
	    /**
	     * 현재 월에서 특정 클래스(Mark)가 없는 일자 리스트를 가지고 온다
	     * @param className 클래스명
	     * @returns $Object 특정 클래스가 없는 일자 리스트
	     */
	    Calendar.prototype.getDateByNotMark = function (className) {
	        return this.$wrapper.find('td[data-date]:not(.' + className + ')');
	    };
	
	    /**
	     * 특정일자를 선택한다
	     * @param date 선택일자('YYYYMMDD')
	     * @param className 선택일자 표시클래스
	     */
	    Calendar.prototype.setSelectDate = function (date, className) {
	        this.$wrapper.find('td[data-date="' + date + '"]').addClass(className);
	    };
	
	    Calendar.prototype.init = function () {
	        this.initialize();
	    };
	
	    Calendar.prototype.destroy = function () {
	        this.$wrapper.off('click').empty();
	    };
	
	    Calendar.defaults = {
	        today: {
	            date: Util.date.getYYYYMMDD(new Date()),
	            label: ''
	        },
	        marks: [],
	        template: {
	            header: '<div class="area_month"><b>{{year}}.{{month}}</b>' + '<button type="button" class="view_prev">이전달</button>' + '<button type="button" class="view_next">다음달</button></div>',
	            body: '<div class="area_day"><table>' + '<caption>날짜 선택 달력</caption>' + '<thead></thead><tbody></tbody></table></div>',
	            tr: '<tr></tr>',
	            th: '<th scope="col" data-code="{{code}}">{{label}}</th>',
	            td: '<td data-date="{{fullDate}}"><button type="button"><span>{{date}}</span></button></td>',
	            em: '<em>{{label}}</em>'
	        },
	        dayOfWeek: [{ code: 'SUN', label: '일' }, { code: 'MON', label: '월' }, { code: 'TUE', label: '화' }, { code: 'WED', label: '수' }, { code: 'THU', label: '목' }, { code: 'FRI', label: '금' }, { code: 'SAT', label: '토' }],
	        classes: {
	            today: 'day_today',
	            sunday: 'day_sunday',
	            saturday: 'day_saturday',
	            thisMonthDay: 'day_thisMonth',
	            otherMonthDay: 'day_otherMonth'
	        }
	    };
	
	    return Calendar;
	});

/***/ }
/******/ ])
});
;
//# sourceMappingURL=map/skpui.js.map