function setLogin()
{
	if (funcCheckIsLogin())
		$("#loginBottom").html('<a href="' + _LOGOUT_URL_ + '">로그아웃<\/a>');
	else
		$("#loginBottom").html('<a href="' + _LOGIN_URL_ + '">로그인<\/a>');
	
	setAppDownlink();
}
// 대대카테고리
function vL1(layer, flag)
{
	$("#" + layer).html('<div class="cate"><ul>'
		+ '<li class="m1"><a href="javascript:mw_go_ctgr(1);"><span></span>브랜드패션</a></li>'
		+ '<li class="m2"><a href="javascript:mw_go_ctgr(2);"><span></span>의류</a></li>'
		+ '<li class="m3"><a href="javascript:mw_go_ctgr(3);"><span></span>잡화/뷰티</a></li>'
		+ '<li class="m4"><a href="javascript:mw_go_ctgr(4);"><span></span>식품/유아동</a></li>'
		+ '<li class="m5"><a href="javascript:mw_go_ctgr(5);"><span></span>리빙/건강</a></li>'
		+ '<li class="m6"><a href="javascript:mw_go_ctgr(6);"><span></span>레저/자동차</a></li>'
		+ '<li class="m7"><a href="javascript:mw_go_ctgr(7);"><span></span>디지털/가전</a></li>'
		+ '<li class="m8"><a href="javascript:mw_go_ctgr(8);"><span></span>도서/취미</a></li>'
		+ '</ul></div>'
		+ '<a href="#" onclick="vLayer(\'categoy\',false);" class="btn_close">닫기</a>');
	
	vLayer(layer, flag);
}

function vLayer(layer, flag)
{
	if (flag)
		$("#" + layer).show();
	else
		$("#" + layer).hide();
}

function mw_on_err(obj, size)
{
	var errImg = obj.src;
	var noImg = _IMG_URL_ + '/images/2012/product/no_image_' + size + '.gif';

	if (errImg == noImg)
	{
		obj.disabled = true;
		obj.style.display = 'none';
		return;
	}

	obj.src = noImg;
}
function mw_go_prd(prd_no, target, pr)
{
	var url = URL.prd(prd_no, pr);
	goCommonUrl(url, target);
}
function mw_go_plan(plan_no, target)
{
	var url = URL.plan(plan_no);
	goCommonUrl(url, target);
}
function mw_go_evt(pName, eName, target)
{
	var url = URL.evt(pName, eName);
	goCommonUrl(url, target);
}
function mw_go_ctgr(ctgr_no, target)
{
	var url = URL.ctgr(ctgr_no);
	goCommonUrl(url);
}

function goCommonUrl(url, target)
{
	try
	{
		if ((target == null) || (target == ""))
			target = top;

		if ((url != null) && (url != ""))
		{
			if (target == '_blank')
				window.open(url,target);
			else
				target.location.href = url;
		}
	}
	catch (e) { }
}

var URL =
{
	prd : function(n, pr)
	{
		if (pr)
			return _MOBILE_URL_ + '/Product/productBasicInfo.tmall?prdNo=' + n + pr;
		else
			return _MOBILE_URL_ + '/Product/productBasicInfo.tmall?prdNo=' + n;
	}
	,
	plan : function(n)		{ return _MOBILE_URL_ + '/Product/productPlanningDetail.tmall?plnDispNo=' + n; }
	,
	evt : function(n, i)	{ return _MOBILE_URL_ + '/CEvent/viewEvent.tmall?pName=' + n + '&eName=' + i; }
	,
	ctgr : function(i)		{ return _MOBILE_URL_ + '/Category/displayCategoryGrp.tmall?dispCtgrGrpNo=' + i; }
};
function funcCheckIsLogin()
{
	var arg = "TMALL_AUTH=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;

	while (i < clen)
	{
		var j = i + alen;
		if (document.cookie.substring(i, j) == arg)
			return true;
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0)
			break;
	}
	return false;
}
function tabToggle(tabSize, tabId, idx, targetId)
{
	for (var i = 0; i < tabSize; i++)
	{
		var tab = "#" + tabId + i;
		var target = "#" + targetId + i;
		if (i == idx)
		{
			$(tab)[0].className = $(tab)[0].className.replace("off", "on");
			if ($(target))
				$(target).show();
		}
		else
		{
			$(tab)[0].className = $(tab)[0].className.replace("on", "off");
			if ($(target))
				$(target).hide();
		}
	}
}
function addEvent(evt, func)
{
	if (window.addEventListener)
		window.addEventListener(evt, func, false);
	else
		window.attachEvent(evt, func);
}

function toggleNew(ele, pos, wid){

	// highlight 관련 처리
	if(wid){
		this.source = document.getElementById(wid);

		// select box 관련 처리
		this.sourceA = this.source.getElementsByTagName("select");
		if(this.sourceA){
			for(i=0; i<this.sourceA.length; i++){
				if(value != "none"){this.sourceA[i].disabled = false;}
				else{this.sourceA[i].disabled = true;}
			}
		}

		// input box 관련 처리
		this.sourceB = this.source.getElementsByTagName("input");
		if(this.sourceB){
			for(i=0; i<this.sourceB.length; i++){
				if(value != "none"){this.sourceB[i].disabled = false;}
				else{this.sourceB[i].disabled = true;}
			}
		}
	}

	var element = document.getElementById(ele);
	element.style.display = (element.style.display == 'block') ? "none" : "block";

	if(pos){
		// POSITION : 수정 2012-03-05
		var tpos = $("#"+pos).offset().top,
			theight = $('#cts').offset().top,
			tposheight = $("#"+pos).height();
		$('#'+ele).css("top", tpos - theight + tposheight);
	}
}
function toggleNewtop(ele, pos, wid){

	// highlight 관련 처리
	if(wid){
		this.source = document.getElementById(wid);

		// select box 관련 처리
		this.sourceA = this.source.getElementsByTagName("select");
		if(this.sourceA){
			for(i=0; i<this.sourceA.length; i++){
				if(value != "none"){this.sourceA[i].disabled = false;}
				else{this.sourceA[i].disabled = true;}
			}
		}

		// input box 관련 처리
		this.sourceB = this.source.getElementsByTagName("input");
		if(this.sourceB){
			for(i=0; i<this.sourceB.length; i++){
				if(value != "none"){this.sourceB[i].disabled = false;}
				else{this.sourceB[i].disabled = true;}
			}
		}
	}

	var element = document.getElementById(ele);
	element.style.display = (element.style.display == 'block') ? "none" : "block";

	if(pos){
		var tpos = $("#"+pos).offset().top,
			tposheight = $("#"+pos).height();
		$('#'+ele).css("top", tpos + tposheight);
	}
}
//CPC clickPlus
function cpc(action, param, targetUrl) {

	var dt = new Date().getTime();

	var url;
	if(action == 'display' || action == 'DISPLAY') {			//노출
		var img = new Image();
		url = _ST_URL_+'/a.st?a='+param+'&d='+dt;
		img.src = url;
	} else if(action == 'click' || action == 'CLICK') {			//클릭
		var img = new Image();
		url = _ST_URL_+'/a.st?a='+param+'&d='+dt;
		img.onload = function() { };
		img.onerror = function() {
			;	//none
		};
		img.src = url;
	} else if(action == 'billing' || action == 'BILLING') {	//과금 후 targetUrl로 분기
		var img = new Image();
		url = _ACES_URL_+'/cpc.do?c='+param+'&d='+dt;
		img.onload = function() {
			location.href=targetUrl;
		};
		img.onerror = function() {
			location.href=targetUrl;
		};
		img.src = url;
	}
}
//Power product
function power(action, param, targetUrl) {
	
	var dt = new Date().getTime();

	var url;
	if(action == 'display' || action == 'DISPLAY') {			//노출
		var img = new Image();
		url = _ST_URL_+'/a.st?a='+param+'&d='+dt;
		img.src = url;
	} else if(action == 'click' || action == 'CLICK') {			//클릭
		var img = new Image();
		url = _ST_URL_+'/a.st?a='+param+'&d='+dt;
		img.onload = function() {
			location.href=targetUrl;
		};
		img.onerror = function() {
			location.href=targetUrl;
		};
		img.src = url;
	}
}
function go_ctgr(dispCtgrNo, dispCtgrGrpNo, action) { 
	var formObj = document.forms["dispCtgrInfo"];

	formObj.dispCtgrNo.value = dispCtgrNo; 
	formObj.dispCtgrGrpNo.value = dispCtgrGrpNo; 
	formObj.isShowTop5.value = 'N';
	formObj.isShowPrdList.value = 'N';
	
	formObj.action = action;
	formObj.submit();
}
function go_ctgrPrd(dispCtgrNo, dispCtgrGrpNo, action) {
	var formObj = document.forms["dispCtgrInfo"];

	formObj.dispCtgrNo.value = dispCtgrNo; 
	formObj.dispCtgrGrpNo.value = dispCtgrGrpNo;
	formObj.isShowPrdList.value='Y';

	formObj.action = action;
	formObj.submit();
}
function setAdvTrc(adSaveNo, areaGubn, typGubn) {
	TMCookieUtil.setMobileDomain();
	TMCookieUtil.add(0, "adTrcValid", "true");
	TMCookieUtil.add(0, "adSaveNo", adSaveNo);	//tracno
	TMCookieUtil.add(0, "areaGubn", areaGubn);	//영역타입,  ex)M01
	TMCookieUtil.add(0, "typGubn", typGubn);		//트래킹타입, ex)S
}
var dsAdTO;
function dsADEvent() {
	 $(window).bind("scroll", function() {
        var scrollTop = window.pageYOffset || $(window).scrollTop();
        if(scrollTop >= 30) {
            if (dsAdTO) {
                clearTimeout(dsAdTO);
            }

            hideLayer("dsADLayer");
        }else {
            if (dsAdTO) {
                clearTimeout(dsAdTO);
            }
            dsAdTO = setTimeout(function() {
                showBottomLayer("dsADLayer");
            }, 500);
        }
    });
    $(document).bind("touchmove", function() {
        hideLayer("dsADLayer");
    });
    $(document.body).bind("click", function() {
        hideLayer("dsADLayer");
    });
    setTimeout(function() {
        showBottomLayer("dsADLayer");
    }, 500);
}
function hideLayer(id) {
	if(!$("#"+id).is(":hidden")) {
		$("#"+id).hide();
	}
}
function showBottomLayer(id) {
	if(existObj(id)) {
		var img = new Image();
		$(img).load(function() {
			var $id = $('#'+id);
			var bH = $id.height();
			var scrollTop = window.pageYOffset || $(window).scrollTop();
			var innerHeight = window.innerHeight || $(window).height();

			document.getElementById(id).style.top = ((innerHeight + scrollTop) - bH) + 'px';
			$id.show();
			
		}).attr("src", $("#"+id+" img").attr("src"));
	}
}
function existObj(id) {
	if($('#'+id).length > 0) {
		return true;
	} else {
		return false;
	}
}
function openAllview(tStoreYN){
	if(!existObj("checkAllMenu")) {
		try {
			var param = "tStoreYN="+tStoreYN;
			$.ajax({
				type: "post"
				,async: true
				,url: "/MW/Common/getAllMenuLayerAjax.tmall"
				,cache: false
				,data: param
				,contetnType: "application/x-www-urlencoded; charset=UTF=8"
				,success: function(data)
				{
					$("#allview").html(data);
					showAllView();
				}
				,error: function(e) { }
			});
		} catch (err) { }
	} else {
		showAllView();
	}
}
function showAllView() {
	var $allview = $("#allview");
	var $nav_li = $("#nav li");
	var $category = $("#category");
	if(!$allview.hasClass("open")) {
		$allview.addClass("open");
		$nav_li.last().addClass("on");
		if($category.hasClass("open")) {
			$category.removeClass("open");
		}
	} else {
		$allview.removeClass("open");
		$nav_li.last().removeClass("on");
	}
}
function openCategory()
{
	if(!existObj("checkCategory")) {
		$("#category").html('<div class="cate" id="checkCategory">'
			+ '<ul>'
			+ '<li class="m1"><a href="javascript:mw_go_ctgr(1);">브랜드패션</a></li>'
			+ '<li class="m2"><a href="javascript:mw_go_ctgr(2);">의류</a></li>'
			+ '<li class="m3"><a href="javascript:mw_go_ctgr(3);">잡화/뷰티</a></li>'
			+ '<li class="m4"><a href="javascript:mw_go_ctgr(4);">식품/유아동</a></li>'
			+ '<li class="m5"><a href="javascript:mw_go_ctgr(5);">리빙/건강</a></li>'
			+ '<li class="m6"><a href="javascript:mw_go_ctgr(6);">레저/자동차</a></li>'
			+ '<li class="m7"><a href="javascript:mw_go_ctgr(7);">디지털/가전</a></li>'
			+ '<li class="m8"><a href="javascript:mw_go_ctgr(8);">도서/취미</a></li>'
			+ '</ul>'
			+ '<a href="javascript:openCategory();" class="btn_close">닫기</a>'
			+ '</div>'
		);
	}
	var $category = $("#category");
	var $nav_li = $("#nav li");
	var $allview = $("#allview");
	if(!$category.hasClass("open")) {
		$category.addClass("open");
		if($allview.hasClass("open")) {
			$allview.removeClass("open");
			$nav_li.last().removeClass("on");
		}
	} else {
		$category.removeClass("open");
	}
}
function getCookie(cName) {
    cName = cName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cName);
    var cValue = '';
    if(start != -1){
         start += cName.length;
         var end = cookieData.indexOf(';', start);
         if(end == -1)end = cookieData.length;
         cValue = cookieData.substring(start, end);
    }
    return unescape(cValue);
}
function isEmbedApp() {
	var appType = getCookie("appType");
	if(appType.indexOf("app") > -1) {	
		return true;
	} else {
		return false;
	}
}
function isAppleProduct() {
	if(navigator.userAgent.indexOf("iPhone") > -1 ||  navigator.userAgent.indexOf("iPad") > -1 || navigator.userAgent.indexOf("iPod") > -1) {
		return true;
	} else {
		return false;
	}
}
function setAppDownlink() {
	var downLink = "javascript:;";	
	try {
		if(isEmbedApp()) {
			var tStoreYN = getCookie("tStoreYN");
		    if(isAppleProduct()){
		    	downLink = "javascript:executeApp(\"appexe://\",\"itms-apps://itunes.apple.com/app/id397938216?mt=8\");";
		    }else{
		    	if(tStoreYN && tStoreYN == 'Y') {
                    downLink = "http://m.tstore.co.kr/userpoc/mp.jsp?pid=0000027316";
		    	} else {
		    		downLink = "javascript:executeApp(\"appexe://\",\"market://details?id=com.elevenst\");";
		    	}
		    }
		} else {
			if(isAppleProduct()){
				downLink = "itms-apps://itunes.apple.com/app/id397938216?mt=8";
		    }else{
		    	downLink = "market://details?id=com.elevenst";
		    }
		}
	} catch(e) {}
	return $("#appDownlink").html("<a href='"+downLink+"'>11번가 앱 다운로드</a>");
}
if (!window.executeAppCommand) {
	function executeAppCommand(appAction) {
		var appActionID = "appExecuteFrame";
		var actionFrame = document.createElement("IFRAME");
	
		actionFrame.id = appActionID;
		actionFrame.name = actionFrame.id;
		actionFrame.width = 0;
		actionFrame.height = 0;
		actionFrame.src = appAction;
		
		document.body.appendChild(actionFrame);
		document.body.removeChild(actionFrame);
	}
}

function executeMtAppCommand(appActionId, appAction) {
	var appActionID = appActionId;
	var actionFrame = document.createElement("IFRAME");

	actionFrame.id = appActionID;
	actionFrame.name = actionFrame.id;
	actionFrame.width = 0;
	actionFrame.height = 0;
	actionFrame.src = appAction;
	
	document.body.appendChild(actionFrame);
	document.body.removeChild(actionFrame);
}

function executeApp(appUrl, storeUrl) {
	var appAction = "app://callapp/";
	var object = new Object();
	
	object["app-url"] = appUrl;
	object["store-url"] = storeUrl;
	
	executeAppCommand(appAction + JSON.stringify(object));
}
function loadJsData(url)
{
	var scriptElem = document.createElement('script');
	scriptElem.src = url;
	document.getElementsByTagName('head')[0].appendChild(scriptElem);
}
//2012.09.13/검색/상품상세/카테고리
function loadDsAD(dsADUrl, fFloating, dispYN) {
	$.ajax({
		type : "GET"
		, async : true
		, url : dsADUrl
		, dataType : 'script'
		, complete : function() {
			var dsAD = $.trim($("#dsAD").html());
			if(dsAD == "") {
			} else {
				if(fFloating) {
					try {
						var dsADObj = document.getElementById('dsAD');
						var dsAD_tpos = $('#dsAD').offset().top;
						var windowHeight = window.innerHeight || $(window).height();
						if(dsAD_tpos > windowHeight) {
							var dsAD = $.trim($("#dsAD").html());
							if (!dispYN) dsADObj.innerHTML = '<div id="footDsADLayer"></div>';
							if(dsAD != "") {
								$("#dsAD").append($("<div id='dsADLayer' style='display:none;position:absolute;width:100%;z-index:90;''></div>").html(dsAD));
								dsADEvent();
							}
						}
					} catch(e) {}
				}
			}
		}
	});
}
function executeAppCommand(appAction) {
	var uagent = navigator.userAgent.toLocaleLowerCase();
	
	if(uagent.indexOf("android") > -1 && uagent.indexOf("chrome") > -1) {
		self.location.href=appAction;
	} else {
	    var appActionID = "appExecuteFrame";
	    var actionFrame = document.createElement("IFRAME");

	    actionFrame.id = appActionID;
	    actionFrame.name = actionFrame.id;
	    actionFrame.width = 0;
	    actionFrame.height = 0;
	    actionFrame.src = appAction;

	    document.body.appendChild(actionFrame);
	    document.body.removeChild(actionFrame);
	}
}
var com = new Object();
com.kakao = new Object();
com.kakao.talk = new Object();

var com = {};
com.kakao = {};
com.kakao.talk = {};

com.kakao.talk.KakaoLink = function(appid, appver, url, msg, appname,  isIphoneApp, metainfo) {
	this.msg = encodeURIComponent(msg);
	//this.url = encodeURIComponent(url);
	this.url = url;
	this.appId = encodeURIComponent(appid);
	this.version = encodeURIComponent(appver);
	this.appname = encodeURIComponent(appname);
    this.isIphoneApp = isIphoneApp;
	if (typeof metainfo == "undefined") {
		this.type = "link";
	} else {
		this.type = "app";
	}

	this.apiver = "2.0";
/*
	$(document).find("body").append(
				"<iframe id='____kakaolink____'></iframe>");
	$("#____kakaolink____").hide();
	*/

	try {
		if (isEmptyString(this.appId) || isEmptyString(this.version)
				|| isEmptyString(this.url) || isEmptyString(this.appname)) {
			throw "IllegalArgumentException";
		}
	} catch (e) {
		if (e == "IllegalArgumentException") {
			// error
		}
	}

	var sb = new com.kakao.talk.StringBuilder("kakaolink://sendurl?");
	sb.append("appid=").append(this.appId).append("&appver=").append(
			this.version).append("&url=").append(this.url).append("&type=")
			.append(this.type).append("&apiver=").append(this.apiver).append(
					"&appname=").append(this.appname);
	if (!this.isEmptyString(this.msg)) {
		sb.append("&msg=").append(this.msg);
	}

	if (typeof metainfo != "undefined") {
		sb.append("&metainfo=").append(JSON.KakaoStringify(metainfo));
	}
	this.data = sb.toString();
};

com.kakao.talk.StringBuilder = function(value) {
	this.strings = new Array("");
	this.append(value);
};
com.kakao.talk.StringBuilder.prototype.append = function(value) {
	if (value) {
		this.strings.push(value);
	}
	return this;
};
com.kakao.talk.StringBuilder.prototype.toString = function() {
	return this.strings.join("");
};

com.kakao.talk.KakaoLink.prototype.isEmptyString = function(str) {
	if (str.replace(/^\s*/, "").replace(/\s*$/, "").length == 0)
		return true;
	return false;
};

com.kakao.talk.KakaoLink.prototype.getData = function() {
	return this.data;
};

com.kakao.talk.KakaoLink.prototype.execute = function(callback) {
	var clickedAt = +new Date;
		setTimeout(
				function() {
					if (+new Date - clickedAt < 2000) {
	                    if (window.clickKakao) {
	                        //window.location.reload();
	                    }
						var uagent = navigator.userAgent.toLocaleLowerCase();
						// android, iphone not installed kakaotalk
						if (typeof callback == 'function') {
							callback.call(this);
						} else if (uagent.search("android") > -1) {
						//	$("#____kakaolink____").attr("src",
						//			"market://details?id=com.kakao.talk");
							 executeAppCommand("market://details?id=com.kakao.talk");
						} else if (uagent.search("iphone") > -1) {
							//$("#____kakaolink____")
							//		.attr("src",
							//				"itms://itunes.apple.com/us/app/kakaotalk/id362057947?mt=8");
							executeAppCommand("itms://itunes.apple.com/us/app/kakaotalk/id362057947?mt=8");
						}
					}
				}, 500);
		
		$("#____kakaolink____").attr("src", this.data);

	if (this.isIphoneApp == 'true') executeApp(this.data, "itms://itunes.apple.com/us/app/kakaotalk/id362057947?mt=8");
	else  executeAppCommand(this.data);
};

function MetaInfo(metainfo) {
	this.metainfo = metainfo;
}

JSON.KakaoStringify = JSON.KakaoStringify || function(obj) {
	var t = typeof (obj);
	if (t != "object" || obj === null) {
		// simple data type
		if (t == "string")
			obj = '"' + obj + '"';
		return String(obj);
	} else {
		// recurse array or object
		var n, v, json = [], arr = (obj && obj.constructor == Array);
		for (n in obj) {
			v = obj[n];
			t = typeof (v);
			if (t == "string")
				v = '"' + v + '"';
			else if (t == "object" && v !== null)
				v = JSON.KakaoStringify(v);
			json.push((arr ? "" : '"' + n + '":') + String(v));
		}
		return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
	}
};
function scrollTo11st(xpos, ypos, type, delay) {
	var isScroll = false;
	if(isEmbedApp() && type=="APP") {
		isScroll = true;
	} else if(!isEmbedApp() && type=="WEB") {
		isScroll = true;
	} else if(type=="ALL") {
		isScroll = true;
	}
	if(isScroll) {
		setTimeout(function() {
	        window.scrollTo(xpos, ypos);
	    }, delay);
	}
}