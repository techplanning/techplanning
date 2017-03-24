var MWSwipe = function(dataset,options) {
	var container;
	var view, liveIdx = 0;
	var dataSetIdx = 0;
	var enabled = true;
	 
	//set default parameters 
	var options = options || {};
	var dataset = dataset || [];
	defaultOptions = {
		containerSelector : '.mwContainer'
		,viewSelector: '.mwView'
		,viewCount: 3
		,initPos: 0
		,isLazyLoad: false
		,keyset: []
		,datasetCount: dataset.length
		,usetransforms3d: true
		,reloadable: true
	};
	for (var prop in defaultOptions) {
        if (! (prop in options)) {
            options[prop] = defaultOptions[prop];
        }
    }
	if(options.isLazyLoad && (options.datasetCount == dataset.length)) {
		options.datasetCount = options.keyset.length;
	}
	
	var support = {
        touch : (window.Modernizr && Modernizr.touch === true) || (function () {
            'use strict';
            return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
        })(),
        transforms3d : (window.Modernizr && Modernizr.csstransforms3d === true) || (function () {
            'use strict';
            var div = document.createElement('div').style;
            return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
        })(),
        transforms : (window.Modernizr && Modernizr.csstransforms === true) || (function () {
            'use strict';
            var div = document.createElement('div').style;
            return ('transform' in div || 'WebkitTransform' in div || 'MozTransform' in div || 'msTransform' in div || 'MsTransform' in div || 'OTransform' in div);
        })(),
        transitions : (window.Modernizr && Modernizr.csstransitions === true) || (function () {
            'use strict';
            var div = document.createElement('div').style;
            return ('transition' in div || 'WebkitTransition' in div || 'MozTransition' in div || 'msTransition' in div || 'MsTransition' in div || 'OTransition' in div);
        })(),
        classList : (function () {
            'use strict';
            var div = document.createElement('div').style;
            return 'classList' in div;
        })()
    };
	var util = {
		addClass : function(el, value) {
			var vList = value.split(' ');
			if (el.nodeType === 1) {
				if ( !el.className && vList.length === 1 ) {
					el.className = value;
				} else {
					var setClass = el.className+' ';
					for(var i=0,len=vList.length; i<len; i++) {
						if (setClass.indexOf(vList[i]) < 0) {
							setClass += vList[i]+' ';
						}
					}
					el.className = setClass.trim();
				}
			}
		},
        getWidth: function (el, outer) {
            'use strict';
            var width = window.getComputedStyle(el, null).getPropertyValue('width');
            var returnWidth = parseFloat(width);
            //IE Fixes
            if (isNaN(returnWidth) || width.indexOf('%') > 0) {
                returnWidth = el.offsetWidth - parseFloat(window.getComputedStyle(el, null).getPropertyValue('padding-left')) - parseFloat(window.getComputedStyle(el, null).getPropertyValue('padding-right'));
            }
            if (outer) returnWidth += parseFloat(window.getComputedStyle(el, null).getPropertyValue('padding-left')) + parseFloat(window.getComputedStyle(el, null).getPropertyValue('padding-right'));
            return returnWidth;
        },
        getHeight: function (el, outer) {
            'use strict';
            if (outer) return el.getBoundingClientRect().height || el.offsetHeight;

            var height = window.getComputedStyle(el, null).getPropertyValue('height');
            var returnHeight = parseFloat(height);
            //IE Fixes
            if (isNaN(returnHeight) || height.indexOf('%') > 0) {
                returnHeight = el.offsetHeight - parseFloat(window.getComputedStyle(el, null).getPropertyValue('padding-top')) - parseFloat(window.getComputedStyle(el, null).getPropertyValue('padding-bottom'));
            }
            if (outer) returnHeight += parseFloat(window.getComputedStyle(el, null).getPropertyValue('padding-top')) + parseFloat(window.getComputedStyle(el, null).getPropertyValue('padding-bottom'));
            return returnHeight;
        },
        addEventListener : function (el, event, listener, useCapture) {
            'use strict';
            if (typeof useCapture === 'undefined') {
                useCapture = false;
            }

            if (el.addEventListener) {
                el.addEventListener(event, listener, useCapture);
            }
            else if (el.attachEvent) {
                el.attachEvent('on' + event, listener);
            }
        },
        removeEventListener : function (el, event, listener, useCapture) {
            'use strict';
            if (typeof useCapture === 'undefined') {
                useCapture = false;
            }

            if (el.removeEventListener) {
                el.removeEventListener(event, listener, useCapture);
            }
            else if (el.detachEvent) {
                el.detachEvent('on' + event, listener);
            }
        },
		ajax : function(s) { 
            'use strict';
			if (s.dataType && s.dataType == 'script') {
				var sc = document.createElement('script');
				if(s.async) sc.async = 'async';
				if (s.success) {
					if (sc.readyState) {
						sc.onreadystatechange = function() {
							if (sc.readyState == 'loaded' || sc.readyState == 'complete') {
								sc.onreadystatechange = null;
								s.success;
							}
						};
					} else {
						sc.onload = s.success;
					}
				}
				sc.src = s.url;
				document.getElementsByTagName('head')[0].appendChild(sc);
				
				return true;
			}
			
			var xhr = window.ActiveXObject ? new window.ActiveXObject('Microsoft.XMLHTTP') : new window.XMLHttpRequest();
			var method = s.method ? s.method : 'get';
			var async = s.async ? s.async : true;
			try {
				if (s.param && s.param != "")
				{
					xhr.open(method, s.url, async);
					var contetnType = s.contetnType ? s.contetnType : "application/x-www-form-urlencoded";
					xhr.setRequestHeader("Content-type", contetnType);
					xhr.setRequestHeader("Content-length", s.param.length);
					xhr.setRequestHeader("Connection", "close");
		
					xhr.send(s.param);
				} else {
					xhr.open(method, s.url, async);
					xhr.send(null);
				}
		
				xhr.onreadystatechange = function()
				{
					if (xhr.readyState == 4) {
						var data;
						if (xhr.status == 200) {
							if (s.dataType == 'xml') {
								data = xhr.responseXml;
								if(s.success) s.success(data);
							} else {
								data = xhr.responseText;
								if(s.success) s.success(data);
							}                   
						}
					}
				};
			} catch (e){ if(s.error) s.error(); }
		}
    }

	//set Event Handler
	var isScrolling;
	var isAnimationLoading = false;
	var isAnimationLoadingTO;
	var moveStopTO;
	var start = {};
	var delta = {};
	var touchEvent = {
		handleEvent: function(e) {
		  switch (e.type) {
			case 'touchstart': this.touchstart(e); break;
			case 'touchmove': this.touchmove(e); break;
			case 'touchend': this.touchend(e); break;
			case 'webkitTransitionEnd':
			case 'msTransitionEnd':
			case 'oTransitionEnd':
			case 'otransitionend':
			case 'transitionend': this.transitionEnd(e); break;
			case 'resize': resize.call(); break;
		  }
		},
		touchstart: function(e) {
			  options.onTouchStart && options.onTouchStart(e, view[liveIdx], dataSetIdx);
 			if(isAnimationLoading == true) return;
			if(enabled == false) return;
			var touches = e.touches[0];
			start = {
				x: touches.pageX,
				y: touches.pageY,
				time: (new Date()).getTime()
			};
			isScrolling = undefined;
			delta = {};
			util.addEventListener(container, 'touchmove', this);
			util.addEventListener(container, 'touchend', this);

		},
		touchmove: function(e) {
			if(moveStopTO) clearTimeout(moveStopTO);
			
			if(isAnimationLoading == true) return;
			if(enabled == false) return;
			
			moveStopTO = setTimeout(function() {
				container.setAttribute('data-status', 'done');
				setTransition(container, 300);
				setTranslate(container, {x:'0px', y:'0px', z:'0px'});
				setTimeout(function() {
					setTransition(container, 0);
				},100);
			},3000);
			
			var touches = e.touches[0];
			var deltaX = touches.pageX - start.x;
			var deltaY = touches.pageY - start.y;
			
			delta = {
				x: deltaX,
				y: deltaY
			};

			if ( typeof isScrolling == 'undefined') {
				isScrolling = !!( isScrolling || Math.abs(delta.x) < Math.abs(delta.y) );
			}
			if (!isScrolling) {
				e.preventDefault();
				setTranslate(container, {x:delta.x+'px', y:'0px', z:'0px'});
				options.onTouchMove && options.onTouchMove(e, view[liveIdx], dataSetIdx);
			}

		},
		touchend: function(e) {
			if(moveStopTO) clearTimeout(moveStopTO);
			
			if(isAnimationLoading == true) return;
			
			var timeDiff = (new Date()).getTime() - start.time;
			var isValidSlide = Math.abs(delta.x) > 70 || Math.abs(delta.x) > util.getWidth(container)/2;
			var direct = delta.x > 0;

			if (!isScrolling) {
				if(isValidSlide) {
					if(direct) { //left
						setAnimation(getDataSetIdx('prev'),'prev');
					} else {
						setAnimation(getDataSetIdx('next'));
					}
				} else {
					container.setAttribute('data-status', 'done');
					setTransition(container, 300);
					setTranslate(container, {x:'0px', y:'0px', z:'0px'});
					setTimeout(function() {
						setTransition(container, 0);
					},100);
				}
				options.onTouchEnd && options.onTouchEnd(e, view[liveIdx], dataSetIdx);
			}
			util.removeEventListener(container, 'touchmove', this);
			util.removeEventListener(container, 'touchend', this);
		},
		transitionEnd: function(e) {
			var t = e.srcElement || e.target;
			  if(t == container) {
				  var dStatus = container.getAttribute('data-status');
				  if(dStatus && dStatus == 'moving') {
					  doneAnimation();
				  } else if(dStatus && dStatus == 'done') {
				  } else {
					  isAnimationLoading = false;
					  if(isAnimationLoadingTO) clearTimeout(isAnimationLoadingTO);
					  setTimeout(function() {
						  resize();
					  },500);
					  options.onChangeEnd && options.onChangeEnd(e, view[liveIdx], dataSetIdx);
				  }
			  }
		}
	}

	//function for CSS transform & translate
    function setTransform(el, transform) {
        'use strict';
        var es = el.style;
        es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = transform;
    }
    function setTranslate(el, translate, percent) {
        'use strict';
        var es = el.style;
        var pos = {
            x : translate.x || '0px',
            y : translate.y || '0px',
            z : translate.z || '0px'
        };
        var transformString = (options.usetransforms3d && support.transforms3d) ? 'translate3d(' + (pos.x) + ',' + (pos.y) + ',' + (pos.z) + ')' : 'translate(' + (pos.x) + ',' + (pos.y) + ')';
        es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = transformString;
        if (!support.transforms) {
            es.left = pos.x;
            es.top = pos.y;
        }
    }
  	function setTransEasing(el, value) {
          'use strict';
          var es = el.style;
          es.webkitTransitionTimingFunction = es.MsTransitionTimingFunction = es.msTransitionTimingFunction = es.MozTransitionTimingFunction = es.OTransitionTimingFunction = es.transitionTimingFunction = value;
  	}
    function setTransition(el, duration) {
        'use strict';
        var es = el.style;
        es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = duration + 'ms';
    }

  	function doneAnimation() {
		var dIdx = Number(container.getAttribute('data-dIdx'));
		var direct = container.getAttribute('data-direct');
		container.setAttribute('data-status', 'done');
		container.setAttribute('data-dIdx', '');
		container.setAttribute('data-direct', '');

		var nowIdx = getIdx();
		var nextIdx = getIdx(direct);
		var prevIdx = getIdx(direct=='next'?'prev':'next');

		options.onChangeEnd && options.onChangeEnd(view[nextIdx], dIdx);

			var nowPercent = '100%';
			var prevPercent = '-100%';
			if(direct == 'next') {
				nowPercent = '-100%';
				prevPercent = '100%';
			}
			view[nextIdx].style.zIndex = '10';
            view[prevIdx].style.zIndex = '1';
            view[nowIdx].style.zIndex = '1';


			setTranslate(view[nextIdx], {x:'0%', y:'0px', z:'0px'});			
			setTranslate(view[nowIdx], {x:nowPercent, y:'0px', z:'0px'});

			setTransition(container, 0);
			setTranslate(container, {x:'0px', y:'0px', z:'0px'});

			liveIdx = nextIdx;
			dataSetIdx = dIdx;


			if(options.isLazyLoad && dataset[getDataSetIdx(direct)] == null) {
				getLazyData(direct, function() {
					view[prevIdx].innerHTML = dataset[getDataSetIdx(direct)];
					view[prevIdx].setAttribute('data-viewIdx', getDataSetIdx(direct));
					isAnimationLoading = false;
					if(isAnimationLoadingTO) clearTimeout(isAnimationLoadingTO);
				});
			} else {
				isAnimationLoading = false;
				if(isAnimationLoadingTO) clearTimeout(isAnimationLoadingTO);
				view[prevIdx].innerHTML = dataset[getDataSetIdx(direct)];
				view[prevIdx].setAttribute('data-viewIdx', getDataSetIdx(direct));
			}

			setTimeout(function() {
				setTranslate(view[prevIdx], {x:prevPercent, y:'0px', z:'0px'});
				resize();
			},200);
  }

  function setAnimation(dIdx, direct) {
	if(isAnimationLoading == true) return;
	isAnimationLoading = true;

	var direct = direct || 'next';
	var nextIdx = getIdx(direct);

	setTransition(container, 300);
	var movePx = util.getWidth(view[nextIdx]);
	if(direct == 'next') movePx = -movePx;
	setTranslate(container, {x:movePx+'px', y:'0px', z:'0px'});

	container.setAttribute('data-status', 'moving');
	container.setAttribute('data-dIdx', dIdx);
	container.setAttribute('data-direct', direct);

	isAnimationLoadingTO = setTimeout(function() {
		isAnimationLoading = false;
		setTransition(container, 0);
		setTranslate(container, {x:'0px', y:'0px', z:'0px'});
    },3000);
  }
	function getLazyData(direct, callback) {
		var url = options.lazyLoadUrl.replace('{{key}}',options.keyset[getDataSetIdx(direct)]);
		util.ajax({
			url: url
			,success: function(data) {
				if(data) {
					dataset[getDataSetIdx(direct)] = data;
					callback && callback();
				} else {
					setTimeout(function() {getLazyData(direct);},200);
				}
			}
			,error: function(e) {
				setTimeout(function() {getLazyData(direct);},200);
			}
		});
	}
	function getLazyDataDirect(idx, callback) {
		var url = options.lazyLoadUrl.replace('{{key}}',options.keyset[idx]);
		util.ajax({
			url: url
			,success: function(data) {
				if(data) {
					dataset[idx] = data;
					callback && callback();	
				} else {
					setTimeout(function() {getLazyDataDirect(idx, callback);},200);
				}
			}
			,error: function(e) {
				setTimeout(function() {getLazyDataDirect(idx, callback);},200);
			}
		});
	}

	//Outer API
	function init() {
		container = document.querySelector(options.containerSelector);
		if(container) {
			setTransition(container, 0);
			setTranslate(container, {x:'0px', y:'0px', z:'0px'});
			setTransEasing(container, 'ease-out');

			view = document.querySelectorAll(options.containerSelector+'>'+options.viewSelector);
			if(view && view.length > 1) {
				if(view[0].innerHTML == '' || options.initPos > 0) {
                    dataSetIdx = Number(options.initPos);
                    if(options.isLazyLoad && dataset[options.initPos] == null) {
                        getLazyDataDirect(options.initPos,function() {
                            view[0].innerHTML = dataset[options.initPos];
							view[0].setAttribute('data-viewIdx', options.initPos);
                            options.onLoad && options.onLoad(view[0], getDataSetIdx());
                        });
                    } else {
                        view[0].innerHTML = dataset[options.initPos];
						view[0].setAttribute('data-viewIdx', options.initPos);
                        options.onLoad && options.onLoad(view[0], getDataSetIdx());
                    }
                } else {
					view[0].setAttribute('data-viewIdx', 0);
				}
				container.style.height = util.getHeight(view[0],false)+'px';
				
				util.addClass(view[0],'mwView');
				setTranslate(view[0], {x:'0%', y:'0px', z:'0px'});
				setTransition(view[0], 0);
				setTransEasing(view[0], 'ease-out');

				util.addClass(view[1],'mwView');
				setTranslate(view[1], {x:'100%', y:'0px', z:'0px'});
				setTransition(view[1], 0);
				setTransEasing(view[1], 'ease-out');

				if(options.viewCount > 2 && view.length > 2) {
					util.addClass(view[2],'mwView');
					setTranslate(view[2], {x:'-100%', y:'0px', z:'0px'});
					setTransition(view[2], 0);
					setTransEasing(view[2], 'ease-out');
				} else if(options.viewCount > 2 && view.length < 3) {
                    var cNode = view[1].cloneNode(true);
                    container.appendChild(cNode);
                    view = document.querySelectorAll(options.containerSelector+'>'+options.viewSelector);
                    setTranslate(view[2], {x:'-100%', y:'0px', z:'0px'});
                    setTransition(view[2], 0);
                    setTransEasing(view[2], 'ease-out');
                }
			}
		}
	}
	function getIdx(direct) {
		var idx = liveIdx;
		if(direct == 'next') {
			idx = idx+1>=view.length ? 0 : idx+1;
		} else if(direct == 'prev') {
			idx = idx-1<0 ? view.length-1 : idx-1;
		}
		return idx;
	}
	function getDataSetIdx(direct) {
		var idx = dataSetIdx;
		if(direct == 'next') {
			idx = idx+1>=options.datasetCount ? 0 : idx+1;
		} else if(direct == 'prev') {
			idx = idx-1<0 ? options.datasetCount-1 : idx-1;
		}
		return idx;
	}
	function disable() {
		enabled = false;
	}
	function enable() {
		enabled = true;
	}
	function move(dIdx, direct, callback) {
	
		if(isAnimationLoading == true) return;
		if(!options.reloadable && dIdx == getDataSetIdx()) return;
		var direct = direct || (dIdx > getDataSetIdx() ? 'next' : 'prev');
		var xPercent = '100%';
		var pIdx = 0;
		var nIdx = getIdx();
		
		if(direct == 'next') {
			pIdx = dIdx-1 < 0 ? options.datasetCount-1 : dIdx-1;
		} else {
			xPercent = '-100%';
			pIdx = dIdx+1 >= options.datasetCount ? 0 : dIdx+1;
		}
		var idx = getIdx(direct);
		var viewNowIdx = view[idx].getAttribute('data-viewIdx');
		if(!viewNowIdx || viewNowIdx != dIdx) {
			if(options.isLazyLoad && dataset[dIdx] == null) {
				getLazyDataDirect(dIdx,function() {
					view[idx].innerHTML = dataset[dIdx];
					view[idx].setAttribute('data-viewIdx', dIdx);
				});
			} else {
				view[idx].innerHTML = dataset[dIdx];
				view[idx].setAttribute('data-viewIdx', dIdx);
			}
		}

		setTranslate(view[idx], {x:xPercent, y:'0px', z:'0px'});
		setTimeout(function() {
			setAnimation(dIdx,direct);
			callback && callback();
			setTimeout(function() {
				var viewPrevIdx = view[nIdx].getAttribute('data-viewIdx');
				if(!viewPrevIdx || viewPrevIdx != pIdx) {
					if(options.isLazyLoad && dataset[pIdx] == null) {
						getLazyDataDirect(pIdx,function() {
							view[nIdx].innerHTML = dataset[pIdx];
							view[nIdx].setAttribute('data-viewIdx', pIdx);
						});
					} else {
						view[nIdx].innerHTML = dataset[pIdx];
						view[nIdx].setAttribute('data-viewIdx', pIdx);
					}
				}
			}, 200);
		},100);
	}
	function prev() {
		move(getDataSetIdx('prev'), 'prev');
	}
	function next() {
		move(getDataSetIdx('next'), 'next');
	}
	function resize() {
		if(util.getHeight(view[liveIdx]) > 0) {
			container.style.height = util.getHeight(view[liveIdx])+'px';
		}
	}
	function kill() {
		util.removeEventListener(container, 'touchstart', touchEvent);
        util.removeEventListener(container, 'transitionend', touchEvent);
        util.removeEventListener(container, 'webkitTransitionEnd', touchEvent);
        util.removeEventListener(window, 'resize', touchEvent);
        util.removeEventListener(window, 'DOMContentLoaded', resize);
        container = null;
        view = null;
	}

	init();
	if(options.isLazyLoad) {
		if(options.viewCount > 2) {
			var nIdx = getDataSetIdx('next');
			getLazyDataDirect(nIdx,function() {
				view[1].innerHTML = dataset[nIdx];
				view[1].setAttribute('data-viewIdx', nIdx);
			});
			
			var pIdx = getDataSetIdx('prev');
			getLazyDataDirect(pIdx,function() {
				view[2].innerHTML = dataset[pIdx];
				view[2].setAttribute('data-viewIdx', pIdx);
			});
		}
		
		for(var i=0,len=options.datasetCount; i<len; i++) {
			if(dataset[i] == null)
				getLazyDataDirect(i);
		}
	}

  util.addEventListener(container, 'touchstart', touchEvent);
  util.addEventListener(container, 'transitionend', touchEvent);
  util.addEventListener(container, 'webkitTransitionEnd', touchEvent);
  util.addEventListener(window, 'resize', touchEvent);
  util.addEventListener(window, 'DOMContentLoaded', resize);
	
	return {
		getIdx : getIdx
		,disable : disable
		,enable : enable
		,move : move 
		,prev : prev 
		,next : next 
		,resize : resize 
		,getItems : function() {return view;}
		,getDatas : function() {return dataset;}
		,getDataLength : function() {return dataset.length;}
		,kill : kill
	}
};
