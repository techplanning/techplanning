var mwUI;
(function(mwUI) {
	this.mwUI = mwUI;
})((function() {
	var mwUI = {};
	var uAgent = navigator.userAgent.toLowerCase();
	//[unit] div check
	mwUI.stateDisplay = function(element) {
		if(element.currentStyle)
			var value = element.currentStyle['display'];
		else if(document.defaultView.getComputedStyle)
			var value = document.defaultView.getComputedStyle(element,null)['display'];
		return value;
	};
	//[unit] div toggle
	mwUI.toggle = function(id) {
		if(!document.getElementById(id)) return false;

		var div = document.getElementById(id),
			state = this.stateDisplay(div);
		div.style.display = (state != 'none') ? "none": "block";
	};
	//[unit] button class change
	mwUI.toggleBtnClass = function(id, btn, btnClass) {
		if(!document.getElementById(id)) return false;

		var div = document.getElementById(id),
			state = mwUI.stateDisplay(div),
			btns = (document.getElementById(btn)) ? document.getElementById(btn) : btn;
		if(state != 'none') {
			btns.className = (btns.className.lastIndexOf(' ' + btnClass) >= 0) ? btns.className.replace(" " + btnClass, "") : btns.className.replace(btnClass, "");
		} else {
			btns.className += " " + btnClass;
		}
	};
	//[unit] button text change
	mwUI.toggleBtnText = function(id, btn, textOpen, textClose) {
		if(!document.getElementById(id)) return false;

		var div = document.getElementById(id),
			state = mwUI.stateDisplay(div),
			btns = (document.getElementById(btn)) ? document.getElementById(btn) : btn,
			nodeChild = btns.firstChild;
		while(nodeChild.nodeValue == null) {
			nodeChild = nodeChild.firstChild;
		}
		if(state != 'none') {
			nodeChild.nodeValue = nodeChild.nodeValue.replace(textClose, textOpen);
		} else {
			nodeChild.nodeValue = nodeChild.nodeValue.replace(textOpen, textClose);
		}
	};
	//[unit] layer position
	mwUI.layerPos = function(id, btn) {
		if(!document.getElementById(id)) return false;

		var div = document.getElementById(id),
			pos = (document.getElementById(btn)) ? document.getElementById(btn) : btn;
		if(pos){
			var posTop = pos.offsetTop,
				posHeight = pos.offsetHeight;

			if(div.offsetParent !== pos.offsetParent) {
				var posParent = pos.offsetParent;
				while (posParent.offsetParent) {
					posTop += posParent.offsetTop;
					posParent = posParent.offsetParent;
				};

				var idParent = div.offsetParent;
				while (idParent.offsetParent) {
					posTop -= idParent.offsetTop;
					idParent = idParent.offsetParent;
				};
			}
			div.style.top = posTop + posHeight +'px';
		}
	};
	//[unit] layer close all
	mwUI.classClose = function(id, allClass) {
		var elses = this.getElementsByClassNames(allClass);
		for (var i=0; i < elses.length; i++){
			if((elses[i].style.display != 'none') && (elses[i].id != id)) {elses[i].style.display = 'none'} ;
		}
	};
	//[unit] classname find
	mwUI.getElementsByClassNames = function(className, obj) {
		var doc = obj || document;
		if(document.getElementsByClassName){
			return doc.getElementsByClassName(className);
		} else {
			var regEx = new RegExp('(^| )'+className+'( |$)');
			var nodes = new Array();
			var elements = document.body.getElementsByTagName("*");
			var len = elements.length;
			for(var i=0; i < len ; i++) {
				if(regEx.test(elements[i].className)) {
					nodes.push(elements[i]);
				}
			}
			elements = null;
			return nodes;
		}
	}
	//[unit] posiiton
	mwUI.positionTop = function(element) {
		if(!element) return false;
		var posTop = element.offsetTop,
			posParent = element.offsetParent;

		if(!posParent) return posTop;
		while (posParent.offsetParent) {
			posTop += posParent.offsetTop;
			posParent = posParent.offsetParent;
		};
		return posTop
	};
	//[unit] layer center
	mwUI.posCenter = function(id) {
		if(!document.getElementById(id)) return false;

		var self = document.getElementById(id);
		var selfPos = (window.innerHeight - self.offsetHeight)/2 + window.pageYOffset;
		selfPos = (selfPos < window.pageYOffset )? window.pageYOffset : selfPos;

		if(self.offsetParent){
			var idParent = self.offsetParent;
			while (idParent.offsetParent) {
				selfPos -= idParent.offsetTop;
				idParent = idParent.offsetParent;
			};
		}
		self.style.top = selfPos +'px';
	}
	//div toggle Type
	mwUI.viewToggle = function(id, btn, btnClass, textOpen, textClose) {
		if(!document.getElementById(id)) return false;

		var obj = document.getElementById(id),
		className = btnClass || 'on',
		close_btn = obj.querySelector('.close');

		if(btn && btnClass && (btnClass !='')) this.toggleBtnClass(id, btn, btnClass);
		if(textOpen) this.toggleBtnText(id, btn, textOpen, textClose);
		this.toggle(id);
		if(close_btn){
			close_btn.onclick = function(){
				if(btn && className && (className !='')) mwUI.toggleBtnClass(id, btn, className);
				mwUI.toggle(id);
			}
		}
	};
	mwUI.viewToggleSlide = function(id, btn, btnClass, textOpen, textClose, aniTime, height) {
		if(!document.getElementById(id)) return false;

		var obj = document.getElementById(id),
		className = btnClass || 'on',
		close_btn = obj.querySelector('.close');

		if(btn && className && (className !='')) mwUI.toggleBtnClass(id, btn, className);
		if(textOpen) this.toggleBtnText(id, btn, textOpen, textClose);

		if(obj.style.display != 'block') {
			open();
		} else {
			close();
		}
		if(close_btn){
			close_btn.onclick = function(){
				if(btn && className && (className !='')) mwUI.toggleBtnClass(id, btn, className);
				close();
			}
		}
		function open(){
			obj.style.display = 'block';
			var setHeight = obj.offsetHeight;
			obj.style.height = '0';
			setTimeout(function() {
				obj.style.webkitTransitionDuration = obj.style.transitionDuration = '300ms';
				obj.style.height = setHeight + 'px';
			}, 10);
			obj.addEventListener('webkitTransitionEnd', openEnd, false);
			obj.addEventListener('transitionEnd', openEnd, false);
		}
		function openEnd() {
			obj.style.webkitTransitionDuration = obj.style.transitionDuration = '';
			obj.style.height = '';
			obj.removeEventListener('webkitTransitionEnd', openEnd, false);
			obj.removeEventListener('transitionEnd', openEnd, false);
		}
		function close(){
			setHeight = obj.offsetHeight;
			obj.style.height = setHeight + 'px';
			setTimeout(function() {
				obj.style.webkitTransitionDuration = obj.style.transitionDuration = '300ms';
				obj.style.height = '0';
			}, 10);
			obj.addEventListener('webkitTransitionEnd', closeEnd, false);
			obj.addEventListener('transitionEnd', closeEnd, false);
		}
		function closeEnd() {
			obj.style.display = '';
			obj.style.height = '';
			obj.style.webkitTransitionDuration = obj.style.transitionDuration = '';
			obj.removeEventListener('webkitTransitionEnd', closeEnd, false);
			obj.removeEventListener('transitionEnd', closeEnd, false);
			obj.style.display = 'none';
		}
	};
	//[unit] layer bug and close
	mwUI.layerBugclose = function(id) {
		if(!document.getElementById(id)) return false;

		var div = document.getElementById(id);
		if(uAgent.indexOf('android 2') > -1 || uAgent.indexOf('android 3') > -1){
			div.addEventListener('touchstart', function(e){
				var node = e.srcElement || e.target;
				while(1) {
					if (node.nodeName && node.nodeName.toLowerCase() === 'button') {
						break;
					} else {
						if (node.parentNode) {node = node.parentNode;}
						else {break;}
					}
				}
				if(node.nodeName && node.nodeName.toLowerCase() === 'button' && node.className == 'cls'){
					e.preventDefault();
					div.style.display='none';
					return false;
				}
			}, false);
		} else {
			var closeBtn = this.getElementsByClassNames('cls', div);
			for(var i=0; i < closeBtn.length ; i++) {
				if(window.attachEvent) closeBtn[i].attachEvent("onclick", function() {div.style.display='none';});
				else closeBtn[i].addEventListener("click", function() {div.style.display='none';}, false);
			}
		}
	}
	//[unit] dim Open
	mwUI.backOpen = function(scroll, type, backClass) {
		var body = document.body,
			wrap = document.getElementById('wrap');

		if(!!document.getElementById('back')) return false;

		if(backClass == null) backClass = 'backType';
		body.className += ' ' + backClass;
		var back = document.createElement("div");
		back.id = 'back';
		if(type === 1) {
			back.className = 'type1'; //투명배경타입
		}
		body.insertBefore(back, wrap);
		back.style.display = 'block';

		if(scroll=='no') back.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		this.layerBug('back');
		return back;
	}
	//[unit] dim Close
	mwUI.backClose = function(backClass) {
		var back = document.getElementById('back'),
			body = document.body,
			wrap = document.getElementById('wrap');

		if(backClass == null) backClass = 'backType';
		body.className = body.className.replace(' ' + backClass, '');
		if(back) body.removeChild(back);
	}
	//layer toggle Type
	mwUI.layerToggle = function(id, btn, allClass, btnClass, textOpen, textClose) {
		if(!document.getElementById(id)) return false;

		var div = document.getElementById(id),
			state = this.stateDisplay(div);

		if(btnClass && (btnClass !='')) this.toggleBtnClass(id, btn, btnClass);
		if(textOpen) this.toggleBtnText(id, btn, textOpen, textClose);
		this.toggle(id);
		if(btn && (state == 'none')) this.layerPos(id, btn);
		if(allClass && (state == 'none')) this.classClose(id, allClass);
		if(div.className == 'lyw'){this.layerBugclose(id)}
	};
	//layer toggle Type (같은 위치에 있을때 margin으로 컨트롤)
	mwUI.layerToggleRs = function(id, btn, allClass, btnClass, textOpen, textClose, gap) {
		if(!document.getElementById(id)) return false;

		var div = document.getElementById(id),
			state = this.stateDisplay(div);

		if(btnClass && (btnClass !='')) this.toggleBtnClass(id, btn, btnClass);
		if(textOpen) this.toggleBtnText(id, btn, textOpen, textClose);
		this.toggle(id);
		if(btn && (state == 'none')) {
			var pos = (document.getElementById(btn)) ? document.getElementById(btn) : btn;
			div.style.marginTop = '0';
			if(pos){
				var posTop = mwUI.positionTop(pos),
					posHeight = pos.offsetHeight,
					divTop = mwUI.positionTop(div);
				if(gap && typeof gap == 'number') {
					div.style.marginTop = posTop + posHeight - divTop + gap +'px';
				} else {
					div.style.marginTop = posTop + posHeight - divTop +'px';
				}
			}
		}
		if(allClass && (state == 'none')) this.classClose(id, allClass);
		if(div.className == 'lyw' || div.className == 'lyr'){this.layerBugclose(id)}
	};
	//layer open Type
	mwUI.layerOpen = function(id, btn) {
		if(!document.getElementById(id)) return false;

		var div = document.getElementById(id),
			state = this.stateDisplay(div);

		div.style.display='block';
		if(btn) this.layerPos(id, btn);
		if(div.className == 'lyw'){this.layerBugclose(id)}
	};
	//layer ceter Type
	mwUI.layerCenter = function(id, btn) {
		if(!document.getElementById(id)) return false;

		var div = document.getElementById(id),
			state = this.stateDisplay(div);

		div.style.display='block';
		this.posCenter(id);
		if(div.className == 'lyw'){mwUI.layerBugclose(id)}
	};
	//layer ceter Type (dim)
	mwUI.layerPop = function(id, scroll, bug, dim_click) {
		if(!document.getElementById(id)) return false;

		var self = document.getElementById(id);
		self.style.display='block';
		if(scroll=='no') self.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

		this.posCenter(id);
		if(bug != 'no') this.layerBug(id);

		var dim = this.backOpen(scroll);
		if(dim_click != 'no') dim.addEventListener('click', function (e) {mwUI.layerPopClose(id)}, false);
	}
	//layer Type (dim)
	mwUI.layerPopTop = function(id, scroll) {
		if(!document.getElementById(id)) return false;

		var self = document.getElementById(id);
		self.style.display='block';

		var dim = this.backOpen(scroll);
		dim.addEventListener('click', function (e) {mwUI.layerPopClose(id)}, false);
	}
	mwUI.layerPopPos = function(id, topPos, scroll) {
		if(!document.getElementById(id)) return false;

		var self = document.getElementById(id);
		self.style.display='block';

		if(topPos == undefined) topPos = 0;
		var selfPos = window.pageYOffset + topPos;

		if(self.offsetParent){
			var idParent = self.offsetParent;
			while (idParent.offsetParent) {
				selfPos -= idParent.offsetTop;
				idParent = idParent.offsetParent;
			};
		}
		self.style.top = selfPos +'px';


		var dim = this.backOpen(scroll);
		dim.addEventListener('click', function (e) {mwUI.layerPopClose(id)}, false);
	}
	mwUI.layerPopClose = function(id) {
		var self = document.getElementById(id);
		self.style.display='none';

		this.backClose();
	}
	mwUI.layerPopup = function(id) {
		if(!document.getElementById(id)) return false;

		var self = document.getElementById(id);
		self.style.display='block';
		self.style.top = '50%';
		self.style.marginTop = -self.offsetHeight/2 +'px';

		/*
		if(scroll=='no') self.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

		if(dimed === true){
			var dim = this.backOpen(scroll);
			dim.addEventListener('click', function (e) {mwUI.layerPopClose(id)}, false);
		}
		*/
	}
	//layer allview (scroll)
	mwUI.popAllview = {
		obj : '',
		open : function(id) {
			if(!document.getElementById(id)) return false;

			var body = document.body,
				wrap = document.getElementById('wrap'),
				div = document.getElementById(id);

			this.obj = div;
			if(uAgent.indexOf('android 2') > -1 || uAgent.indexOf('android 3') > -1 || uAgent.indexOf('android 4.0') > -1){
				window.scrollTo(0, 1);
				mwUI.backOpen(null, null, 'backType');
				div.style.display = 'block';
				this.heightSize();
				window.addEventListener('resize', mwUI.popAllview.heightSize, false);
			} else if(uAgent.indexOf('ios') > -1){
				window.addEventListener('touchmove', mwUI.popAllview.scroll, false);
			} else {
				mwUI.backOpen('no', null, 'backType_fix');	//back
				div.style.display = 'block';
			}

			var btn = div.getElementsByClassName('close')[0];
			btn.addEventListener('click', mwUI.popAllview.close, false);
			back.addEventListener('click', mwUI.popAllview.close, false);
		},
		heightSize : function() {
			var body = document.body,
				wrap = document.getElementById('wrap'),
				back = document.getElementById('back'),
				div = this.obj || mwUI.popAllview.obj;

			if(div.offsetHeight > wrap.offsetHeight) {
				back.style.height = div.offsetHeight + 'px';
			} else {
				back.style.height = '';
			}
		},
		scroll : function() {
			window.scrollTo(0, 1);
		},
		close : function() {
			var body = document.body,
				back = document.getElementById('back'),
				div = this.obj || mwUI.popAllview.obj;

			back.removeEventListener('click', mwUI.popAllview.close, false);

			if(uAgent.indexOf('android 2') > -1 || uAgent.indexOf('android 3') > -1){
				window.removeEventListener('resize', mwUI.popAllview.heightSize, false);
				mwUI.backClose('backType');
			} else if(uAgent.indexOf('ios') > -1){
				window.removeEventListener('touchmove', mwUI.popAllview.scroll, false);
			} else {
				mwUI.backClose('backType_fix');
			}
			div.style.display = 'none';
		}
	}
	//loading
	mwUI.loadingFull = function(option) {
		var body = document.body,
			wrap = document.getElementById('wrap'),
			contents = '';

		option = option || {}
		var opt = {
				type : option.type || 0, //로딩타입
				backType : option.backType || 0,  //dim 타입 (1:투명배경타입)
				text : option.text || null
			}

		if(!!document.querySelector('.loading_full')) return false;

		var loading = document.createElement("div");
		loading.className = 'loading_full';
		body.insertBefore(loading, wrap);
		if(opt.type == 1) {
			contents = '<div class="circle type1">Loading</div>';
		} else {
			contents = '<div class="circle">Loading</div>';
		}
		if(opt.text != null) {
			contents = contents + '<div class="txt">' + opt.text + '</div>';
		}
		loading.innerHTML = contents;

		if(opt.backType == 1) {
			var dim = this.backOpen('no', opt.backType); //background Type
		} else {
			var dim = this.backOpen('no');
		}

		//test
		//dim.addEventListener('click', function (e) {mwUI.loadingFullClose();}, false);
	}
	//loading Close
	mwUI.loadingFullClose = function() {
		var loading = document.querySelector('.loading_full'),
			body = document.body;

		this.backClose();
		if(loading) body.removeChild(loading);
	}
	mwUI.isLoadingFullstate = function() {
		var loading = document.querySelector('.loading_full');
		if(loading) return true;
	}
	//className Type
	mwUI.moreToggle = function(id, className, btn, textOpen, textClose, btnClassName) {
		var element = document.getElementById(id),
			btns = btn;
		if(element.className.lastIndexOf(className) < 0) {
			element.className += " " + className;
			if(btns != undefined) {
				var nodeText = btns.firstChild;
				nodeText.nodeValue = nodeText.nodeValue.replace(textOpen, textClose);
			}
			if(btnClassName != undefined) btns.className += " " + btnClassName;
		} else {
			element.className = element.className.replace(" " + className, "");
			if(btns != undefined) {
				var nodeText = btns.firstChild;
				nodeText.nodeValue = nodeText.nodeValue.replace(textClose, textOpen);
			}
			if(btnClassName != undefined) btns.className = btns.className.replace(" " + btnClassName, "");;
		}
	}
	//[unit] 레이어 아래 눌림 버그
	mwUI.layerBug = function(id) {
		var uAgent = navigator.userAgent.toLowerCase();
		if((uAgent.indexOf('android 2') > -1) || (uAgent.indexOf('android 3') > -1) || (uAgent.indexOf('android 4.0') > -1)){
			document.getElementById(id).addEventListener('touchstart', function(e){
				var node = e.srcElement || e.target;
				while(1) {
					if (node.nodeName && node.nodeName.toLowerCase() === 'a') {
						break;
					} else if (node.nodeName && node.nodeName.toLowerCase() === 'button') {
						break;
					} else {
						if (node.parentNode) {node = node.parentNode;}
						else {break;}
					}
				}
				if(node.nodeName && node.nodeName.toLowerCase() === 'a') {
					if(node.getAttribute('data-move') && node.getAttribute('data-move') == 'no' ) {
						e.preventDefault();
						if(node.onclick) {
							var oldFuc = node.onclick;
							node.onclick();
							node.onclick = null;
							setTimeout(function(){node.onclick = oldFuc;},500);
						}
						return false;
					} else {
						return true;
					}
				} else if(node.nodeName && node.nodeName.toLowerCase() === 'button'){
					if(node.getAttribute('data-move') && node.getAttribute('data-move') == 'no' ) {
						e.preventDefault();
						if(node.onclick) {
							var oldFuc = node.onclick;
							node.onclick();
							node.onclick = null;
							setTimeout(function(){node.onclick = oldFuc;},500);
						}
						return false;
					} else {
						return true;
					}
				} else {
					e.preventDefault();
					return false;
				}
			}, false);
		}
	}
	//list toggle Type
	mwUI.listToggle = function(id, btnClass, onClass, textOpen, textClose) {
		if(!document.getElementById(id)) return false;

		var self = document.getElementById(id),
			item = this.getElementsByClassNames(btnClass, self),
			onClassName = onClass || 'on';

		var Container = [];
		for (var i=0; i < item.length ; i++ ){
			Container[i] = item[i].parentNode;
		}

		for (var i=0; i < item.length ; i++ ){
			var thisbtns = item[i];
			thisbtns.ele = thisbtns.parentNode;

			thisbtns.addEventListener('click', function(){
				for (var j=0; j < Container.length ; j++ ){
					if(Container[j] != this.ele) {
						Container[j].className = (Container[j].className.lastIndexOf(' ' + onClassName) >= 0) ? Container[j].className.replace(" " + onClassName, "") : Container[j].className.replace(onClassName, "");
						if(textOpen && item[j].firstChild.nodeValue) item[j].firstChild.nodeValue = item[j].firstChild.nodeValue.replace(textClose, textOpen);
					}
				}
				if(this.ele.className.lastIndexOf(onClassName) < 0) {
					this.ele.className += " " + onClassName;
					if(textOpen) this.firstChild.nodeValue = this.firstChild.nodeValue.replace(textOpen, textClose);
				} else {
					this.ele.className = (this.ele.className.lastIndexOf(' ' + onClassName) >= 0) ? this.ele.className.replace(" " + onClassName, "") : this.ele.className.replace(onClassName, "");
					if(textOpen) this.firstChild.nodeValue = this.firstChild.nodeValue.replace(textClose, textOpen);
				}
				//위치설정
				var posTop = this.ele.offsetTop,
					posParent = this.ele.offsetParent;
				while (posParent.offsetParent) {
					posTop += posParent.offsetTop;
					posParent = posParent.offsetParent;
				};
				if(posTop < window.pageYOffset){
					window.scrollTo(0, posTop);
				}
				return true;
			}, false);
		}
	};
	//list toggle Motion Type
	mwUI.listToggleMotion = function(id, first, option) {
		if(!document.getElementById(id)) return false;

		option = option || {}
		var opt = {
				itemType : option.itemType || '> li > a',
				aniType : option.aniType || null, // null일때는 동시에, next : 닫히고 난 다음 열림, only : 각각 열고 닫음
				aniTime : option.aniTime || 300,
				sub : option.sub || false,
				subitemType : option.subitemType || '> li > ul > li > a'
			}

		var item = document.querySelectorAll('#' + id + opt.itemType),
			start = first || -1,
			current = null;

		for (var i=0; i < item.length ; i++){
			item[i].Container = content(item[i]);
			item[i].oldFn = item[i].onclick;
			item[i].onclick = function() {
				if(current == this) {
					hidden(this);
					current = null;
				} else {
					if(opt.aniType == 'only') {
						if(this.Container.style.display != 'block'){
							visible(this);
						} else {
							hidden(this);
						}
					} else {
						if(current && opt.aniType == 'next') {
							change(this, current);
						} else if(current && opt.aniType == null) {
							hidden(current);
							visible(this);
						} else {
							visible(this);
						}
						current = this;
					}
				}
				if(this.oldFn)this.oldFn();
				return false;
			}
		}
		if(opt.sub == true){
			var itemSub = document.querySelectorAll('#' + id + opt.subitemType),
			currentSub = null;
			for (var i=0; i < itemSub.length ; i++){
				itemSub[i].Container = content(itemSub[i]);
				itemSub[i].oldFn = itemSub[i].onclick;
				itemSub[i].onclick = function() {
					if(currentSub == this) {
						hidden(this);
						currentSub = null;
					} else {
						if(opt.aniType == 'only') {
							if(this.Container.style.display != 'block'){
								visible(this);
							} else {
								hidden(this, false, false);
							}
						} else {
							if(currentSub && opt.aniType == 'next') {
								change(this, currentSub);
							} else if(currentSub && opt.aniType == null) {
								hidden(currentSub, false, false);
								visible(this);
							} else {
								visible(this);
							}
							currentSub = this;
						}
					}
					if(this.oldFn)this.oldFn();
					return false;
				}
			}

		}

		function content(self) {
			var conts = self.nextSibling;
			if(!conts) return null;
			while(conts.nodeType && conts.nodeType != 1) {
				conts = conts.nextSibling;
			}
			return conts;
		}
		function subHidden(subitem){
			if(currentSub && subitem !== false) {
				currentSub.className = currentSub.className.replace(' open', '');
				currentSub.Container.style.display = '';
				currentSub = null;
			}
		}
		function hidden(self, next, subitem) {
			self.className = self.className.replace(' open', '');
			if(!self.Container) {
				if(next) visible(next)
				return false;
			}
			var setHeight = self.Container.offsetHeight;
			self.Container.style.maxHeight = setHeight + 'px';
			self.Container.style.webkitTransitionDuration = self.Container.style.transitionDuration = opt.aniTime + 'ms';
			setTimeout(function() {
				self.Container.style.maxHeight = 0;
			}, 10);
			function closeEnd() {
				if(opt.sub == true) subHidden(subitem);
				self.Container.style.display = '';
				self.Container.style.maxHeight = '';
				self.Container.style.webkitTransitionDuration = self.Container.style.transitionDuration = '';
				self.Container.removeEventListener('webkitTransitionEnd', closeEnd, false);
				self.Container.removeEventListener('transitionEnd', closeEnd, false);
				if(next) visible(next)
			}
			self.Container.addEventListener('webkitTransitionEnd', closeEnd, false);
			self.Container.addEventListener('transitionEnd', closeEnd, false);
		}
		function visible(self) {
			self.className += ' open';
			if(!self.Container) {
				return false;
			}
			self.Container.style.display = 'block';
			var setHeight = self.Container.offsetHeight;
			self.Container.style.maxHeight = 0;
			self.Container.style.webkitTransitionDuration = self.Container.style.transitionDuration = opt.aniTime + 'ms';
			setTimeout(function() {
				self.Container.style.maxHeight = setHeight + 'px';
			}, 10);
			function openEnd() {
				self.Container.style.maxHeight = '';
				self.Container.style.webkitTransitionDuration = self.Container.style.transitionDuration = '';
				self.Container.removeEventListener('webkitTransitionEnd', openEnd, false);
				self.Container.removeEventListener('transitionEnd', openEnd, false);
			}
			self.Container.addEventListener('webkitTransitionEnd', openEnd, false);
			self.Container.addEventListener('transitionEnd', openEnd, false);
		}
		function change(self, prev) {
			if(prev) hidden(prev, self);
		}
		if(start > -1 && start < item.length) {
			item[num].onclick();
		}
	};
	//tab Type
	mwUI.tabs = function(id, first, toggle, onClass, contNo) {
		if(!document.getElementById(id)) return false;

		var self = document.getElementById(id),
			item = self.getElementsByTagName('a'),
			onClassName = onClass || 'on',
			currentmenu;

		for (var i=0; i < item.length ; i++ ){
			if(contNo == 'no') {
				thismenu = item[i];
			} else if(item[i].href.split("#")[1]) {
				thismenu = item[i];
			} else {
				continue;
			}

			if(thismenu.parentNode.className.lastIndexOf(onClassName) >= 0) currentmenu = thismenu;

			thismenu.Container = document.getElementById(thismenu.href.split("#")[1]);
			if(thismenu.Container) thismenu.Container.style.display = 'none';
			thismenu.onclick = function tabMenuClick() {
				//if(currentmenu == this && toggle != 'toggle') return false;
				if(currentmenu) {
					if(currentmenu.Container) currentmenu.Container.style.display = 'none';
					currentmenu.parentNode.className = (currentmenu.parentNode.className.lastIndexOf(' ' + onClassName) >= 0) ? currentmenu.parentNode.className.replace(" " + onClassName, "") : currentmenu.parentNode.className.replace(onClassName, "");
				}

				if(currentmenu == this && toggle == 'toggle') {
					currentmenu = '';
				} else {
					if(this.Container) this.Container.style.display = 'block';
					if(this.parentNode.className.lastIndexOf(onClassName) < 0)this.parentNode.className += ' ' + onClassName;
					currentmenu = this;
				}
				return false;
			}
		}
		if(first >= 0) {item[first].onclick();}
		else if(currentmenu) {currentmenu.onclick();}
		//우선순서 : first가 정해졌을때, class가 있을때
	};
	//tab Type 2
	mwUI.jsTab = function(id, first, option) {
		if(!document.getElementById(id)) return false;

		var self = document.getElementById(id),
			item = self.getElementsByTagName('a'),
			currentmenu = null;

		if(!self) return false;

		option = option || {}
		var opt = {
				onClassName : option.className || 'on', //tab menu class name
				toggle : option.toggle || false,		//toggle 일때 true
				contNo : option.contNo || false,		//content 없을때 true
				hash : option.hash || false,			//기본동작 true
				pos : option.pos || null,			//위치지정 (first : 처음에만 위치로, all : 모두 위치로)
				selftype : option.selftype || false				//부모노드 아닌 자기자신에게 class
			}

		for (var i=0; i < item.length ; i++ ){
			if(opt.contNo) {
				thismenu = item[i];
			} else if(item[i].href.split("#")[1]) {
				thismenu = item[i];
			} else {
				continue;
			}

			if(opt.selftype == true) {
				if(thismenu.className.lastIndexOf(opt.onClassName) >= 0) {
					currentmenu = thismenu;
				}
			} else {
				if(thismenu.parentNode.className.lastIndexOf(opt.onClassName) >= 0) {
					currentmenu = thismenu;
				}
			}

			thismenu.Container = document.getElementById(thismenu.href.split("#")[1]);
			if(thismenu.Container && opt.pos != 'first') thismenu.Container.style.display = 'none';

			thismenu.addEventListener('click',function(e){
				if(opt.selftype == true) {
					tabMenuClickSelf(this);
				} else {
					tabMenuClick(this);
				}
				if(opt.hash == false) e.preventDefault();
			}, false);
			if(opt.pos != null) {
				var top = mwUI.positionTop(self);
			}
			function tabMenuClick(selfmenu) {
				if(opt.toggle != true || currentmenu != selfmenu) {
					if(selfmenu.Container) selfmenu.Container.style.display = 'block';
					if(selfmenu.parentNode.className.lastIndexOf(opt.onClassName) < 0)selfmenu.parentNode.className += ' ' + opt.onClassName;
				}
				if((currentmenu != selfmenu && currentmenu != null) || (currentmenu == selfmenu && opt.toggle == true)) {
					if(currentmenu.Container && opt.contNo == false) currentmenu.Container.style.display = 'none';
					currentmenu.parentNode.className = (currentmenu.parentNode.className.lastIndexOf(' ' + opt.onClassName) >= 0) ? currentmenu.parentNode.className.replace(" " + opt.onClassName, "") : currentmenu.parentNode.className.replace(opt.onClassName, "");
				}

				if(currentmenu == selfmenu && opt.toggle == true) {
					currentmenu = null;
				} else {
					currentmenu = selfmenu;
				}
				if(opt.pos == 'all') {
					top = mwUI.positionTop(self);
					setTimeout(function() { window.scrollTo(0, top);}, 100);
				}
			}
			function tabMenuClickSelf(selfmenu) {
				if(opt.toggle != true || currentmenu != selfmenu) {
					if(selfmenu.Container) selfmenu.Container.style.display = 'block';
					if(selfmenu.className.lastIndexOf(opt.onClassName) < 0)selfmenu.className += ' ' + opt.onClassName;
				}
				if((currentmenu != selfmenu && currentmenu != null) || (currentmenu == selfmenu && opt.toggle == true)) {
					if(currentmenu.Container && opt.contNo == false) currentmenu.Container.style.display = 'none';
					currentmenu.className = (currentmenu.className.lastIndexOf(' ' + opt.onClassName) >= 0) ? currentmenu.className.replace(" " + opt.onClassName, "") : currentmenu.className.replace(opt.onClassName, "");
				}

				if(currentmenu == selfmenu && opt.toggle == true) {
					currentmenu = null;
				} else {
					currentmenu = selfmenu;
				}
				if(opt.pos == 'all') {
					top = mwUI.positionTop(self);
					setTimeout(function() { window.scrollTo(0, top);}, 100);
				}
			}
		}
		if(first >= 0) {
			tabMenuClick(item[first]);
			if(opt.pos == 'first') {
				top = mwUI.positionTop(self);
				setTimeout(function() { window.scrollTo(0, top);}, 100);
			}
		} else if(currentmenu != null) {
			tabMenuClick(currentmenu);
		}
	};
	//tab Type
	mwUI.tabClick = function(self, option) {
		var self = self,
			parent = null,
			item = null,
			type = 'a';

		if(self.nodeName.toLowerCase() !== 'a') type = self.nodeName.toLowerCase();

		parent = self.parentNode;
		if(parent.className.lastIndexOf('on') < 0) {
			parent.className += ' on';
			if((type == 'a') && document.getElementById(self.href.split("#")[1])) document.getElementById(self.href.split("#")[1]).style.display = 'block';
		} else {
			return false;
		}
		while (parent.nodeName && parent.nodeName.toLowerCase() !== 'ul'){
			parent = parent.parentNode;
		}

		item = parent.getElementsByTagName(type);
		for (var i=0; i < item.length ; i++ ){
			if(item[i] == self) continue;
			item[i].parentNode.className = (item[i].parentNode.className.lastIndexOf(' on') < 0) ? item[i].parentNode.className.replace('on', '') : item[i].parentNode.className.replace(' on', '');
			if((type == 'a') && document.getElementById(item[i].href.split("#")[1])) document.getElementById(item[i].href.split("#")[1]).style.display = 'none';
		}
	};
	//fix layer
	mwUI.fixLayer = {
		id : '',
		view : '',
		enabled : true,
		change : true,
		times : 300,
		point : 0,
		pointTime : true,
		focus : true, //키패드버그
		element : function() {var a = document.getElementById(this.id) || this.id; return a},
		viewPort : function() {
			var wHeight = window.innerHeight || document.documentElement.clientHeight,
				wOffset = window.pageYOffset || document.documentElement.scrollTop,
				points = document.getElementById(this.view),
				viewTop = mwUI.positionTop(points);

			if((wOffset + wHeight) > viewTop) {
				if(this.change == false) return;
				this.change = false;
				this.hide();
				this.enabled = false;
			} else {
				if(this.change == true) return;
				this.change = true;
				this.enabled = true;
				this.show();
			}
		},
		scrolltime : function() { //android 2 버그
			this.hide();
			var timer = setInterval(function() {
				if(mwUI.fixLayer.point == window.pageYOffset) {
					mwUI.fixLayer.show();
					clearInterval(timer);
				} else {
					mwUI.fixLayer.hide();
					mwUI.fixLayer.point = window.pageYOffset;
				}
			}, 300);
		},
		hide : function() {
			if(this.enabled == false) return;
			this.element().style.display='none';
			this.element().style.webkitTransition = '';
			this.element().style.opacity = '0';
		},
		show : function() {
			if((this.enabled == false)||(this.focus == false)) return;
			this.element().style.webkitTransitionDuration = this.element().style.MozTransitionDuration = this.element().style.msTransitionDuration = this.element().style.OTransitionDuration = this.element().style.transitionDuration = this.times + 'ms';
			this.element().style.display='block';
			if(uAgent.indexOf("android 2") > -1 && (uAgent.indexOf("shw") > -1 || uAgent.indexOf("shv") > -1)) {
				this.pointTime = true;
				setTimeout(function() {
					if(mwUI.fixLayer.pointTime == true) {mwUI.fixLayer.element().style.opacity = '100';}
				}, 300);
			} else {
				setTimeout(function() {
					mwUI.fixLayer.element().style.opacity = '100';
				}, 100);
			}
		},
		bug : function(layer) {
			var uAgent = navigator.userAgent.toLowerCase();

			if(uAgent.indexOf("android 2") > -1 && (uAgent.indexOf("shw") > -1 || uAgent.indexOf("shv") > -1)) {
				window.addEventListener("scroll", function() {mwUI.fixLayer.pointTime = false;mwUI.fixLayer.scrolltime();}, false);
				window.addEventListener("touchmove", function() {mwUI.fixLayer.pointTime = false;mwUI.fixLayer.hide();}, false);
			} else if(uAgent.indexOf("iphone os 5") > -1) {
				window.addEventListener("touchmove", function() {mwUI.fixLayer.hide();}, false);
				window.addEventListener("touchend", function() {mwUI.fixLayer.show();}, false);
			}

			//레이어 아래 눌림 버그
			mwUI.layerBug(layer);

			//키패드버그 Android 4.0 , ios
			if((uAgent.indexOf('android 4.0') > -1) || (uAgent.indexOf('iphone') > -1) || (uAgent.indexOf('ipad') > -1)){
				var eleInput = document.getElementsByTagName('input'),
					eleSelect = document.getElementsByTagName('select');
				for (var i = 0; i < eleInput.length; i++ ){
					if(((eleInput[i].type == 'text') || (eleInput[i].type == 'password') || (eleInput[i].type == 'tel')) && (eleInput[i].getAttribute('readonly') == null)) {
						eleInput[i].addEventListener('focus', function() {mwUI.fixLayer.focus=false;mwUI.fixLayer.hide();}, false);
						eleInput[i].addEventListener('blur', function() {mwUI.fixLayer.focus=true;mwUI.fixLayer.show();}, false);
					};
				}
				for (var j = 0; j < eleSelect.length; j++ ){
					if(eleSelect[j].getAttribute('readonly') == null) {
						eleSelect[j].addEventListener('focus', function() {mwUI.fixLayer.focus=false;mwUI.fixLayer.hide();}, false);
						eleSelect[j].addEventListener('blur', function() {mwUI.fixLayer.focus=true;mwUI.fixLayer.show();}, false);
					};
				}
			}
			//ios5 앱에서 회전시 너비,위치 못찾는 버그
			if(uAgent.indexOf('iphone os 5') > -1) {
				window.addEventListener('orientationchange',function(){
					mwUI.fixLayer.element().style.position = 'static';
					mwUI.fixLayer.hide();
					setTimeout(function() {mwUI.fixLayer.show();}, 100);
					setTimeout(function() {mwUI.fixLayer.element().style.position = '';}, 500);
				}, false);
			}
		},
		startView : function(layer, viewpoint) {
			this.id = layer;
			this.view = viewpoint;
			this.viewPort(); //load시 실행

			if(window.attachEvent) window.attachEvent('onscroll', function() {mwUI.fixLayer.viewPort();});
			else window.addEventListener('scroll', function() {mwUI.fixLayer.viewPort();}, false);

			this.bug(layer);
		},
		//버튼타입
		viewPortBtn : function() {
			var wHeight = window.innerHeight || document.documentElement.clientHeight,
				wOffset = window.pageYOffset || document.documentElement.scrollTop,
				points = document.getElementById(this.view),
				gap = this.element().offsetHeight/2,
				gapBug = this.element().offsetHeight;

			var viewZoom = wHeight/2,
				viewTop = mwUI.positionTop(points) - wOffset + gap + gapBug,
				viewBottom = mwUI.positionTop(points) + points.offsetHeight - wOffset - gap - gapBug;

			if(viewZoom < viewTop) {
				if(this.change == false) return;
				this.change = false;
				this.element().style.position = 'absolute';
				this.element().style.top = 0 + gap + 'px';
			} else if (viewZoom > viewBottom) {
				if(this.change == false) return;
				this.change = false;
				this.element().style.position = 'absolute';
				this.element().style.top = points.offsetHeight - gap + 'px';
			} else {
				if(this.change == true) return;
				this.change = true;
				this.element().style.position = '';
				this.element().style.top = '';
			}
		},
		startBtn : function(layer, viewpoint) {
			this.id = layer;
			this.view = viewpoint;
			this.viewPortBtn(); //load시 실행

			window.addEventListener('scroll', function() {mwUI.fixLayer.viewPortBtn();}, false);
			window.addEventListener('resize', function() {mwUI.fixLayer.viewPortBtn();}, false);
			window.addEventListener('orientationchange',function(){mwUI.fixLayer.viewPortBtn();}, false);

			//레이어 아래 눌림 버그
			mwUI.layerBug(layer);
		},
		//상단고정
		viewPortTop : function() {
			var wOffset = window.pageYOffset || document.documentElement.scrollTop,
				points = document.getElementById(this.view),
				viewTop = mwUI.positionTop(points);

			if(wOffset > viewTop) {
				if(this.change == false) return;
				this.change = false;
				this.element().className += ' fixed';
				//android 2 버그
				this.enabled = true;
			} else {
				if(this.change == true) return;
				this.change = true;
				this.element().className =this.element().className.replace(' fixed', '');
			}
		},
		startTop : function(layer, viewpoint) {
			if(navigator.userAgent.indexOf('SHW-M180') > -1) return false; //갤탭 제외

			this.id = layer;
			this.view = viewpoint;
			this.enabled = false;
			this.viewPortTop(); //load시 실행
			window.addEventListener('scroll', function() {mwUI.fixLayer.viewPortTop();}, false);

			//레이어 아래 눌림 버그
			mwUI.layerBug(layer);
		}
	}
	//알리미
	mwUI.schAlimi = function(id, btns, state) {
		if(!document.getElementById(id)) return false;
		var Div = document.getElementById(id),
			btnDiv = document.getElementById(btns);

		if(state == 'open') {
			if((uAgent.indexOf("android") > -1) || (uAgent.indexOf("msie 8") > -1)) {
				Div.style.left = 0 + '%';
			} else {
				Div.style.webkitTransform = Div.style.msTransform = Div.style.MozTransform = Div.style.OTransform ="translateX(100%)";
			}
			var timer = setTimeout(function() { btnDiv.style.display = "none";}, 500);
		} else {
			btnDiv.style.display = "block";
			if(uAgent.indexOf("android") > -1) {
				Div.style.left = -100 + '%';
			} else {
				Div.style.webkitTransform = Div.style.msTransform = Div.style.MozTransform = Div.style.OTransform ="translateX(0%)";
			}
		}
	};
	return mwUI;
}()));

//ui.sticky
mwUI.sticky = (function($) {
	var opts,
		ua,
		AOSVersion,
		$window,
		$element,
		$elementOffsetTop,
		$elementMarginTop,
		$elementHeight;

	var featureTest = function(property, value, noPrefixes) {
		var prop = property + ':',
			el = document.createElement('test'),
			mStyle = el.style;

		if (!noPrefixes) {
			mStyle.cssText = prop + ['-webkit-', '-moz-', '-ms-', '-o-', ''].join(value + ';' + prop) + value + ';';
		} else {
			mStyle.cssText = prop + value;
		}
		return mStyle[property].indexOf(value) !== -1;
	};

	var isIOS = function() {
		return navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;
	};

	var wrapping = function(callback) {
		$element
			.css('margin-top', 0)
			.wrapAll($('<div></div>').css({
				height: $elementHeight,
				'padding-top': $elementMarginTop
			}));
		callback();
	};

	var addHandler = function() {
		if (featureTest('position', 'sticky') && isIOS()) {
			$element.addClass('mwUI_is_sticky');

			$window.on('load resize scroll', function() {
				if ($window.scrollTop() >= $element.offset().top) {
					$element.addClass('onSticky');
				} else {
					$element.removeClass('onSticky');
				}
			});
		} else {
			// position: fixed가 될 경우 영역을 잡기 위해 wrapping
			wrapping(function() {
				$window.on('load resize scroll', function() {
					//if (!$element.hasClass('mwUI_is_fixed') && $element.parent().css('display') === 'block') {
					if (!$element.hasClass('mwUI_is_fixed') && $element.offset().top > 0) {
						$elementOffsetTop = $element.offset().top;
					}
					if ($window.scrollTop() >= $elementOffsetTop) {
						$element.addClass('mwUI_is_fixed');
					} else {
						$element.removeClass('mwUI_is_fixed');
					}
				});
			});
		}
	};

	var initialize = function(options) {
		opts = options;
		ua = navigator.userAgent.toLowerCase(),
		AOSVersion = parseFloat(ua.slice(ua.indexOf("android")+8));

		// 안드로이드 2,3에서는 고정기능 사용하지 않음(클릭이슈)
		if (AOSVersion <= 3) {
			return false;
		}

		$window = $(window);
		$element = $(options.element);
		$elementOffsetTop = $element.offset().top;
		$elementHeight = $element.outerHeight();
		$elementMarginTop = $element.css('margin-top');

		addHandler();
	};

	return {
		init: initialize
	};
}(jQuery));
//side slide
mwUI.slideSide = (function($) {
	var $window,
		$body,
		$wrap,
		$dimmedLayer,
		$sideClose,
		$sideContent,
		myScroll,
		ua,
		AOSVersion;

	var show = function() {
		$body
			.css('overflow', 'hidden')
			.queue(function() {
				$dimmedLayer.appendTo($(this)).fadeIn(300);
				$wrap
					.show()
					.queue(function() {
						setTimeout(function() {
							$wrap.addClass('showLayer');
							setScroll();
						}, 0);
						$(this).dequeue();
					});
				$(this).dequeue();
			});

	//	if (history.pushState) {
	//		history.pushState({
	//			slideSidebar: 'show'
	//		}, document.title, location.href);
	//	}
	};

	var hide = function() {
		$body
			.css('overflow', 'auto')
			.queue(function() {
				$dimmedLayer.fadeOut(300);
				$wrap
					.removeClass('showLayer')
					.queue(function() {
						setTimeout(function() {
							$wrap.hide();
						}, 300);
						$(this).dequeue();
					});

				$(this).dequeue();
			});

	//	if (history.replaceState) {
	//		history.replaceState({
	//			slideSidebar: 'hide'
	//		}, document.title, location.href);
	//	}
	};

	var setScroll = function() {
		// @bug fix : AOS 하위 버전 클릭 이슈
		var sideContent = '#' + $sideContent.attr('id'),
			iScrollOptions = {
				preventDefaultException: {tagName:/.*/},
				scrollbars: true,
				fadeScrollbars: true,
				mouseWheel: true,
				tab: true
			};

		if (AOSVersion <= 2.3) {
			iScrollOptions = {
				mouseWheel: true,
				scrollbars: true,
				click: false
			}
		}

		if (typeof myScroll === 'object') {
			myScroll.destroy();
			myScroll = null;
		}

		myScroll = new IScroll(sideContent, iScrollOptions);
	};

	var addHandler = function() {
		$sideClose.on('click', function() {
			hide();
		});

		$dimmedLayer.on({
			touchmove: function(e) {
				e.preventDefault();
			},
			click: function() {
				hide();
			}
		});

	//	$window.on('popstate', function() {
	//		hide();
	//	});
	};

	var initialize = function(options) {
		$window = $(window);
		$body = $('body');
		$wrap = $(options.wrap);
		$sideContent = $(options.sideContent);
		$sideClose = $(options.sideClose);
		$dimmedLayer = $('<div class="dim">&nbsp;</div>');
		ua = navigator.userAgent.toLowerCase();
		AOSVersion = parseFloat(ua.slice(ua.indexOf("android")+8));

		addHandler();
	};

	return {
		init: initialize,
		show: show
	};
}(jQuery));
//ui.search_filter-0.1.0
mwUI.searchFilter = (function($) {
	var $window,
		$body,
		$wrap,
		$dimmedLayer,
		$tabMenu,
		$tabClose,
		$tabContent,
		myScroll,
		myScrollTab,
		ua,
		AOSVersion;

	var show = function(index) {
		var tabIndex = index;

		if (tabIndex === 'undefined' || typeof tabIndex !== 'number') {
			tabIndex = 0;
		}

		$body
			.css('overflow', 'hidden')
			.queue(function() {
				$dimmedLayer.appendTo($(this)).fadeIn(300);
				$wrap
					.show()
					.queue(function() {
						setTimeout(function() {
							$wrap.addClass('showLayer');
							selectTab(tabIndex);
						}, 0);
						$(this).dequeue();
					});
				$(this).dequeue();
			});

		if (history.pushState) {
			history.pushState({
				searchFilter: 'show'
			}, document.title, location.href);
		}
	};

	var hide = function() {
		$body
			.css('overflow', 'auto')
			.queue(function() {
				$dimmedLayer.fadeOut(300);
				$wrap
					.removeClass('showLayer')
					.queue(function() {
						setTimeout(function() {
							$wrap.hide();
						}, 300);
						$(this).dequeue();
					});

				$(this).dequeue();
			});

		if (history.replaceState) {
			history.replaceState({
				searchFilter: 'hide'
			}, document.title, location.href);
		}
	};

	var selectTab = function(index) {
		var tabId = $tabMenu.attr('id');

		// listing.js -> filterTabClickedHandler 과 중복되어 제거
		// mwUI.jsTab(tabId, index);
		setScroll();
		setScrollTab();
	};

	var setScroll = function() {
		// @bug fix : AOS 하위 버전 클릭 이슈
		var tabContent = '#' + $tabContent.attr('id'),
			iScrollOptions = {
				preventDefaultException: {tagName:/.*/},
				scrollbars: true,
				fadeScrollbars: true,
				mouseWheel: true,
				tab: true
			};

		if (AOSVersion <= 2.3) {
			iScrollOptions = {
				mouseWheel: true,
				scrollbars: true,
				click: false
			}
		}

		if (typeof myScroll === 'object') {
			myScroll.destroy();
			myScroll = null;
		}

		myScroll = new IScroll(tabContent, iScrollOptions);
	};

	var setScrollTab = function() {
		// @bug fix : AOS 하위 버전 클릭 이슈
		var tabContent = '#' + $tabMenu.attr('id'),
			iScrollOptions = {
				preventDefaultException: {tagName:/.*/},
				scrollbars: true,
				fadeScrollbars: true,
				mouseWheel: true,
				tab: true
			};

		if (AOSVersion <= 2.3) {
			iScrollOptions = {
				mouseWheel: true,
				scrollbars: true,
				click: false
			}
		}

		if (typeof myScrollTab === 'object') {
			myScrollTab.destroy();
			myScrollTab = null;
		}

		myScrollTab = new IScroll(tabContent, iScrollOptions);
	};

	var addHandler = function() {
		$tabMenu.find('a').each(function(index) {
			$(this).on('click', function() {
				selectTab(index);
			});
		});

		$tabClose.on('click', function() {
			hide();
		});

		$dimmedLayer.on({
			touchmove: function(e) {
				e.preventDefault();
			},
			click: function() {
				hide();
			}
		});

		$tabMenu.on('touchmove', function(e) {
			e.preventDefault();
		});

		$window.on('popstate', function() {
			hide();
		});
	};
	var brandIndexingScroll = function (ele, du) {
		myScroll.scrollToElement(ele, du);
	}

	var initialize = function(options) {
		$window = $(window);
		$body = $('body');
		$wrap = $(options.wrap);
		$tabMenu = $(options.tabMenu);
		$tabContent = $(options.tabContent);
		$tabClose = $(options.tabClose);
		$dimmedLayer = $('<div class="dim">&nbsp;</div>');
		ua = navigator.userAgent.toLowerCase();
		AOSVersion = parseFloat(ua.slice(ua.indexOf("android")+8));

		addHandler();
	};

	return {
		init: initialize,
		show: show,
		hide: hide,
		setScroll: setScroll,
		setScrollTab : setScrollTab,
		brandIndexingScroll : brandIndexingScroll
	};
}(jQuery));
//ui.quick
mwUI.quickOpen = (function($) {
	var $window,
		$body,
		$dimmedLayer,
		$element,
		$button;

	var show = function() {
		$body.css('overflow', 'hidden');
		if ($body.find('div.dim').length === 0) {
        	$dimmedLayer.appendTo($body).fadeIn(300);
    	} else {
    		$dimmedLayer = $body.find('div.dim');
    		$dimmedLayer.fadeIn(300);
    	}
    	addDimmedHandler();
		$element.addClass('open');

		if (history.pushState) {
			history.pushState({
				quickMenu: 'show'
			}, document.title, location.href);
		}
	};
	var hide = function() {
		$body.css('overflow', 'auto');
		$dimmedLayer.fadeOut(300);
		removeDimmedHandler();
		$element.removeClass('open');

		if (history.replaceState) {
			history.replaceState({
				quickMenu: 'hide'
			}, document.title, location.href);
		}
	};
	var addHandler = function() {
		$button.on('click', function() {
			show();
		});
		$element.on('touchmove', function(e) {
			e.preventDefault();
		});
		$window.on('popstate', function() {
			hide();
		});
	};
	var addDimmedHandler = function() {
		removeDimmedHandler();
		$dimmedLayer.on('touchmove', function(e) {
        	e.preventDefault();
        }).on('click', function(e) {
			hide();
        });
	};
	var removeDimmedHandler = function() {
		$dimmedLayer.off();
	};
	var initialize = function(options) {
		$window = $(window);
		$body = $('body');
		$element = $(options.element);
		$button = $element.find(options.buttonClass || 'button')
		$dimmedLayer = $('<div class="dim">&nbsp;</div>');


		addHandler();
	};
	return {
		init: initialize
	};
}(jQuery));
//공통 리스팅
mwUI.listingMenu = (function($) {
	var $window,
		$body,
		$element,
		$buttonClass,
		$openText,
		$closeText;

	var toggle = function(that, btn) {
		if(that.hasClass('open')){
			that.removeClass('open');
			btn.text($openText);
		} else{
			closeOther();
			that.addClass('open');
			btn.text($closeText);
		}
	};
	var closeOther = function(that) {
		$element.each(function() {
			if($(this).hasClass('open')){
				$(this).removeClass('open');
				$(this).find($buttonClass).text($openText);
			}
		});
	}
	var addHandler = function() {
		$element.each(function() {
			var $that = $(this),
				$btn = $that.find($buttonClass);
			$btn.on('click', function() {
				toggle($that, $btn);
			});
		});
	};
	var initialize = function(options) {
		$window = $(window);
		$body = $('body');
		$element = $(options.element);
		$buttonClass = options.buttonClass || '.btn';
		$openText = options.openText || '열기';
		$closeText = options.closeText || '닫기';

		addHandler();
	};
	return {
		init: initialize
	};
}(jQuery));

/**
 * Magnet Component
 * @deps: jquery v2.1.1+
 * @example:
 * 		var margnetMainNav = new mwUI.magnet('#mainNav');
 * 		var margnetBestNav = new mwUI.magnet('.nav_best_cate', {
 * 			topSpacing: 44
 *    	});
 */
mwUI.magnet = (function($) {
	'use strict';

	var $win = $(window);

	function Magnet(element, options) {
		this.$el = $(element);
		this.opts = $.extend({}, Magnet.defaults, options);

        this.initialize();
	}

	Magnet.prototype.initialize = function() {
		var ua = navigator.userAgent.toLowerCase(),
			AOSVersion = parseFloat(ua.slice(ua.indexOf("android") + 8));

		// 안드로이드 2,3에서는 고정기능 사용하지 않음(클릭이슈)
        if (AOSVersion <= 3) {
            return;
        }

        this.$elOffsetTop = this.$el.offset().top;
        this.$elMarginTop = this.$el.css('margin-top');
        this.$elHeight = this.$el.outerHeight();

        this.addHandler();
	};

	Magnet.prototype.featureTest = function(property, value, noPrefixes) {
        var prop = property + ':',
            el = document.createElement('test'),
            mStyle = el.style;

        if (!noPrefixes) {
            mStyle.cssText = prop + ['-webkit-', '-moz-', '-ms-', '-o-', ''].join(value + ';' + prop) + value + ';';
        } else {
            mStyle.cssText = prop + value;
        }
        return mStyle[property].indexOf(value) !== -1;
    };

    Magnet.prototype.isIOS = function() {
        return navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;
    };

    Magnet.prototype.wrapping = function(fnCallback) {
    	this.$el
            .css('margin-top', 0)
            .wrapAll($('<div class="' + this.opts.fixedWrapClassName + '"></div>').css({
                height: this.$elHeight,
                'padding-top': this.$elMarginTop
            }));
        fnCallback();
    };

    Magnet.prototype.addHandler = function() {
    	if (this.featureTest('position', 'sticky') && this.isIOS() && this.opts.useSticky) {
            this.$el
                .addClass(this.opts.stickyClassName)
                .css('top', this.opts.topSpacing);


            $win.on('load resize scroll', $.proxy(function() {
                if ($win.scrollTop() >= this.$elOffsetTop - this.opts.topSpacing) {
                    this.$el.addClass(this.opts.stickyStatus);
                } else {
                    this.$el.removeClass(this.opts.stickyStatus);
                }
            }, this));
        } else {
            // position: fixed가 될 경우 영역을 잡기 위해 wrapping
            this.wrapping($.proxy(function() {
            	$win.on('load resize scroll', $.proxy(function() {
            		if (!this.$el.hasClass('mwUI_is_fixed') && this.$el.offset().top > 0 && this.$el.parent().css('display') === 'block') {
                        this.$elOffsetTop = this.$el.offset().top;
                    }

                    if ($win.scrollTop() >= this.$elOffsetTop - this.opts.topSpacing) {
                        this.$el
                            .addClass(this.opts.fixedClassName)
                            .css('top', this.opts.topSpacing);
                    } else {
                        this.$el
                            .removeClass(this.opts.fixedClassName)
                            .css('top', 'auto');
                    }
            	}, this))
            }, this));
        }
    };

	Magnet.defaults = {
		useSticky: true,
		topSpacing: 0,
        stickyClassName: 'mwUI_is_sticky',         // position:sticky를 사용할 때 사용할 className
        stickyStatus: 'onSticky',                  // position:sticky로 고정되었을때 상태를 표현할 className
        fixedClassName: 'mwUI_is_fixed',           // position:fixed를 사용할 때 사용할 className
        fixedWrapClassName: 'mwUI_is_fixed_wrap'   // position:fixed를 사용할 때 wrapper className
	};

	return Magnet;
}(jQuery));

/**
 * Slide Layer Component
 * @deps: jquery v2.1.1+
 * @example:
 * 		var searchFilter = new mwUI.slideLayer('#filterWrap', {
 * 			toggleClas: 'showLayer',
 * 			btnOpen: '#filterBtn > a',
 * 			btnClose: '#filterClose'
 * 		};
 *
 * 		// layer show event
 * 		searchFilter.$container.on('slideLayerEvent.show', function(e) {
 * 			console.log(e);
 * 		}
 *
 * 		// layer hide event
 * 		searchFilter.$container.on('slideLayerEvent.hide', function(e) {
 * 			console.log(e);
 * 		}
 *
 * 		// transition end event
 * 		searchFilter.$container.on('slideLayerEvent.transitionend', function(e) {
 * 			console.log(e);
 * 		}
 */
mwUI.slideLayer = (function($) {
    'use strict';

    var $win = $(window),
        $body,
        $dimmedLayer;

    function SlideLayer(root, options) {
        this.$container = $(root);
        this.opts = $.extend({}, SlideLayer.defaults, options);

        this.initialize();
    }

    SlideLayer.prototype.initialize = function() {
    	if (!this.$container.length && !this.opts.btnOpen && !this.opts.btnClose) {
    		return;
    	}

        $body = $('body');
        $dimmedLayer = $('<div class="dim">&nbsp;</div>');

        this.addHandler();
    };

    SlideLayer.prototype.showLayer = function() {
    	var _this = this;

        $body.css('overflow', 'hidden');
        $dimmedLayer.appendTo($body).fadeIn(300);

        this.$container
            .show(0, '', function() {
                setTimeout(function() {
                	_this.$container.addClass(_this.opts.toggleClass);
                }, 0);
            });

        this.delegate('show');
    };

    SlideLayer.prototype.hideLayer = function() {
        var _this = this;

        $body.css('overflow', 'auto');
        $dimmedLayer.fadeOut(300);
        this.$container.removeClass(_this.opts.toggleClass);

        this.delegate('hide');
    };

    SlideLayer.prototype.addHandler = function() {
        var _this = this;

        $(this.opts.btnOpen).on('click', function(e) {
            e.preventDefault();

            _this.showLayer();
        });

        $(this.opts.btnClose).on('click', function(e) {
            e.preventDefault();

            _this.hideLayer();
        });

        this.$container.on('webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd transitionend', function() {
        	if (!_this.$container.hasClass(_this.opts.toggleClass)) {
        		_this.$container.hide();
        	}
        	_this.delegate('transitionend');
        });

        $dimmedLayer.on({
        	touchmove: function(e) {
        		e.preventDefault();
        	},
        	click: function() {
        		_this.hideLayer();
        	}
        });
    };

    SlideLayer.prototype.delegate = function(type) {
        this.$container.trigger('slideLayerEvent.' + type);
    };

    SlideLayer.defaults = {
        toggleClass: 'showLayer'
    };

    return SlideLayer;
}(jQuery));
