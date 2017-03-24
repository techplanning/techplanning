(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([
            'jquery',
            'handlebars.runtime'
        ], factory);
    } else {
        root.Utils = factory(
            root.jQuery,
            root.Handlebars
        );
    }
}(this, function($, Handlebars) {

    (function() {
        function checkCondition(v1, operator, v2) {
            switch (operator) {
                case '===':
                    return (v1 === v2);
                case '!==':
                    return (v1 !== v2);
                case '<':
                    return (v1 < v2);
                case '<=':
                    return (v1 <= v2);
                case '>':
                    return (v1 > v2);
                case '>=':
                    return (v1 >= v2);
                case '&&':
                    return (v1 && v2);
                case '||':
                    return (v1 || v2);
                case '!=':
                	return (v1 != v2);
                default:
                    return false;
            }
        }
        
        Handlebars.registerHelper('ifPrdTypCdCond', function(v1, operator, v2, options) {
        	if(v1 == undefined) v1= document.getElementsByName("prdTypCd")[0].value;
            return checkCondition(v1, operator, v2) ? options.fn(this) : options.inverse(this);
        });
        
        Handlebars.registerHelper('goShopDtl', function(strNo) {
        	return "/lifeplus/lifePlusShopDetail.tmall?strNo="+strNo+"&ctgrNo="+document.getElementsByName("sDispCtgrNo")[0].value;
        });

        Handlebars.registerHelper('ifCond', function(v1, operator, v2, options) {
            return checkCondition(v1, operator, v2) ? options.fn(this) : options.inverse(this);
        });

        Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
            lvalue = parseFloat(lvalue);
            rvalue = parseFloat(rvalue);

            return {
                "+": lvalue + rvalue,
                "-": lvalue - rvalue,
                "*": lvalue * rvalue,
                "/": lvalue / rvalue,
                "%": lvalue % rvalue
            }[operator];
        });
    }());

    var Utils = {
        infinityScroll: InfinityScroll,
        chart: Chart,
        tab: Tab,

        getUA: {
            ua: function() {
                return navigator.userAgent.toLowerCase();
            },
            isiOS: function() {
                return /iPad|iPhone|iPod/g.test(navigator.userAgent);
            },
            isAOS: function() {
                return this.ua().indexOf('android') > -1;
            },
            AOSVersion: function() {
                if (this.isAOS()) {
                    return parseFloat(this.ua().slice(this.ua().indexOf("android")+8));
                }
            }
        },
        dimmedLayer: {
            init: function() {
                if (!this.layer) {
                    this.layer = $('.dimmed_layer');
                    this.zIndex = this.layer.css('z-index');
                    this.layer.addClass('animated');
                    this.setHandler();
                }
            },
            setHandler: function() {
                var _this = this;

                this.layer.on('click', function(e) {
                    e.preventDefault();
                    _this.toggle();
                    $(this).trigger('dimmedLayerEvent', ['click']);
                });

                this.layer.on('touchmove', function(e) {
                    e.preventDefault();
                });
            },
            toggle: function() {
                if (!this.layer) {
                    this.init();
                }

                if (this.layer.css('display') === 'none') {
                    this.show();
                } else {
                    this.hide();
                }
            },
            show: function(zIndex) {
                if (!this.layer) {
                    this.init();
                }

                zIndex = (zIndex) ? zIndex : this.zIndex;

                if (this.layer.css('display') === 'none') {
                    $('body').css('overflow', 'hidden');
                    this.layer
                        .css('z-index', zIndex)
                        .show()
                        .switchClass({
                            removeClassName: 'fadeOut',
                            addClassName: 'fadeIn'
                        });
                }
            },
            hide: function() {
                if (!this.layer) {
                    this.init();
                }

                if (this.layer.css('display') !== 'none') {
                    $('body').css('overflow', 'auto');
                    this.layer
                        .switchClass({
                            removeClassName: 'fadeIn',
                            addClassName: 'fadeOut'
                        })
                        .show(0).delay(400).hide(0);
                }
            }
        },
        template: {
            setHTML: function(options) {
                var template = Handlebars.templates[options.tplName],
                    html = template(options.data);

                options.targetEl.html(html);
            },
            appendHTML: function(options) {
                var template = Handlebars.templates[options.tplName],
                    html = template(options.data);

                options.targetEl.append(html);

                if (typeof options.fnCallback === 'function') {
                    options.fnCallback();
                }
            }
        },
        checkImageLoad: function(options) {
            var images = options.images,
                fnCallback = options.fnCallback;

            images.one('load', function() {
                if (typeof fnCallback === 'function') {
                    fnCallback();
                }
            }).each(function() {
                $(this).on('error', function() {
                    $(this).hide().load();
                });
                if (this.complete) {
                    $(this).load();
                }
            });
        }
    };

    
    /**
     * InfinityScroll Module
     */
    function InfinityScroll(global, opts) {
        this.global = global;
        this.options = {
            screenHeight: $(window).height()
        };
        $.extend(true, this.options, opts);
        this.init();
    }
    InfinityScroll.prototype = {
        init: function() {
            var _this = this;

            $(window).on('resize.infinityScrollEvent', function() {
                _this.options.screenHeight = $(this).height();
            });
        },
        start: function(target) {
            var _this = this;

            this.options.target = target,
            this.options.offset = this.options.target.offset();

            $(window).on('scroll.infinityScrollEvent', function() {
                var scrollTop = $(this).scrollTop(),
                    offsetY = _this.options.offset.top - _this.options.screenHeight;

                if (scrollTop >= offsetY) {
                    if (typeof _this.options.fnCallback === 'function') {
                        _this.options.fnCallback.call(_this.global);
                    }
                }
            });
        },
        stop: function() {
            $(window).off('.infinityScrollEvent');
        },
        refresh: function() {
            this.options.offset = this.options.target.offset();
        },
        destroy: function() {
            this.stop();
        }
    };

    /**
     * Chart Module
     */
    function Chart(root, opts) {
        this.root = root;
        this.options = {
            type: 'donut'
        };

        $.extend(true, this.options, opts);
    }

    Chart.prototype = {
        draw: function() {
            if (this.options.type === 'donut') {
                this.drawDonut();
            }
        },
        drawDonut: function() {

            var wrap = this.root,
                slice1 = $('.slice1>.slice-fill', wrap),
                slice2 = $('.slice2>.slice-fill', wrap),
                chartText = $('.chart-text', wrap),
                perc = this.options.perc || wrap.data('perc'),
                deg1 = perc / 100 * 360,
                deg2 = 0;

            if (perc > 50) {
                deg2 = deg1 - 180;
                deg1 = 180;
            }

            slice1.css({
                '-webkit-transform': 'rotate('+ deg1 + 'deg)',
                'transform': 'rotate('+ deg1 + 'deg)'
            });
            slice2.css({
                '-webkit-transform': 'rotate('+ deg2 + 'deg)',
                'transform': 'rotate('+ deg2 + 'deg)'
            });

            // if (typeof chartText !== 'undefined') {
            //     chartText.html(perc + '%');
            // }
        }
    };

    function Tab(opts) {
        this.options = {
            delegateEvent: 'tabEvent'
        };
        $.extend(true, this.options, opts);
    }

    Tab.prototype = {
        init: function() {
            this.activeIndex = this.options.first;
            this.setHandler();
            this.selectTabMenu();
        },
        setHandler: function() {
            this.options.tabMenu
                .on('click', 'a', function(e) {
                    e.preventDefault();
                    this.activeIndex = $(e.currentTarget).parent().index();
                    this.selectTabMenu();
                }.bind(this))
                .on(this.options.delegateEvent, function(e, type) {
                    this.showTabContent();

                    if (typeof this.options.onSelectTab === 'function') {
                        this.options.onSelectTab.call(null, this.activeIndex);
                    }
                }.bind(this));
        },
        selectTabMenu: function(type) {
            var tabMenuList = this.options.tabMenu.children(),
                activeTabMenu = tabMenuList.eq(this.activeIndex);

            if (!activeTabMenu.hasClass(this.options.activeClassName)) {
                tabMenuList.removeClass(this.options.activeClassName);
                activeTabMenu.addClass(this.options.activeClassName);

                this.delegate('selectTab');
            }
        },
        showTabContent: function() {
            this.options.tabContent.hide();
            this.options.tabContent.eq(this.activeIndex).show();
        },
        delegate: function(type) {
            this.options.tabMenu.trigger(this.options.delegateEvent, type);
        }
    };

    $.fn.switchClass = function(options) {
        var removeClassName = options.removeClassName,
            addClassName = options.addClassName,
            fnCallback = options.fnCallback;

        return this.each(function() {
            $(this)
                .removeClass(removeClassName)
                .addClass(addClassName);

            if (typeof fnCallback === 'function') {
                fnCallback();
            }
        });
    };

    $.fn.scrollTo = function(target, callback) {
        return this.each(function() {
            var scrollPane = $(this),
                scrollTarget = (typeof target === 'number') ? target : $(target),
                scrollY = (typeof target === 'number') ? scrollTarget : scrollTarget.offset().top;

            scrollPane.scrollTop(scrollY);
        });
    };

    loadJsData = function(url) {

    	var scriptElem = document.createElement('script');
    	scriptElem.src = url;
    	document.getElementsByTagName('head')[0].appendChild(scriptElem);
    };
    
    
    return Utils;
}));