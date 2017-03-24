var keyArray = new Array();
var keyLinkArray = new Array();
var num = 0;
var flg = true;
var flgValus = false;

function keyShow()
{	
	if (flg)
	{
		if (num > keyArray.length)
			num = 0;
		num = num % keyArray.length;

		$("#decSearchKeyword").val(keyArray[num]);
		$("#dispObjLnkUrl").val(keyLinkArray[num]);
		num++;
		setTimeout("keyShow()", 3000);
		flgValus = true;
	}
}
function fncStop()
{
	if (flgValus)
		document.querySelector('#decSearchKeyword').value = '';

	if ($("#decSearchKeyword").val() == "")
		fncSearchList();

	document.querySelector('#dispObjLnkUrl').value = '';
	$("#decSearchKeyword").focus();
	flg = !flg;
}
var timer;
var checkFirst = false;
var searchSwipe;
function getInput()
{
	if (checkFirst == false)
		timer = setTimeout('autoComplete()', 250);
	
	checkFirst = true;
}
function releaseInput()
{
	if (timer)
		clearTimeout(timer);
}
function clearInput(elem)
{
	document.querySelector('#'+elem).value = '';
	$("#" + elem).focus();
}
function clearInputValue(elem)
{
	clearInput(elem);
	vLayer("kwd", false);	
}
function fncSearchList(work)
{
	var strSearchName = "";
	var strSearchNameArray = "";
	var index = 0;
	var endstr = 0;
	var strAutoComplete = "";
	
	index = document.cookie.indexOf("SEARCH_NAME" + "=");
	if (index == -1)
	{
		strAutoComplete = '<p class="none">최근 검색내역이 없습니다.</p>';
		$("#schword01").html(strAutoComplete);
		setBodyClass(true);
		vLayer('kwd', false);
		setSearchSwipe(work);
		return null;
	}

	index = document.cookie.indexOf("=", index) + 1;
	endstr = document.cookie.indexOf(";", index);
	if (endstr == -1)
		endstr = document.cookie.length;
	strSearchName = document.cookie.substring(index, endstr);

	if (strSearchName != "")
	{
		strSearchName = decodeURIComponent(strSearchName);
		strSearchNameArray = strSearchName.split('_');
		var searchNameArrayCount = strSearchNameArray.length;
		
		if (searchNameArrayCount > 20) searchNameArrayCount = 20;
		
		var chkSearchName = "";
		strAutoComplete += "<ul>";
		for (var i = 0; i < searchNameArrayCount ; i++)
		{
			if (strSearchNameArray[i].indexOf("#") > -1) {
				chkSearchName = chkValidText(strSearchNameArray[i].split("#")[0]);
				if (chkSearchName.trim() != '')
				strAutoComplete += "<li><a href=\"#\" onclick=\"autoSearch('" + strSearchNameArray[i].split("#")[0] + "');callStatAjax('WSRC03','WSRC03');return false;\" class=\"ico_x\" >" + chkSearchName + "</a><button type=\"button\" onclick=\"callStatAjax('WSRC04','WSRC04');fncSearchDelete('"+strSearchNameArray[i].split('#')[0]+"')\">삭제</button></li>";
			}
			else{
				chkSearchName = chkValidText(strSearchNameArray[i]);
				if (chkSearchName.trim() != '')
				strAutoComplete += "<li><a href=\"#\" onclick=\"autoSearch('" + strSearchNameArray[i] + "');callStatAjax('WSRC03','WSRC03');return false;\" class=\"ico_x\" >" + chkSearchName + "</a><button type=\"button\" onclick=\"callStatAjax('WSRC04','WSRC04');fncSearchDelete('"+strSearchNameArray[i]+"')\">삭제</button></li>";
			}
		}
		strAutoComplete += "</ul><button type='button' class='del_all' onclick=\"callStatAjax('WSRC05','WSRC05');fncSearchAllDelete()\">전체삭제</button>";
	}
	
	$("#schword01").html(strAutoComplete);
	vLayer('kwd', false);
	setBodyClass(true);	
	setSearchSwipe(work);
}
function gnbRemoveKeyboard(e) {
    var node = e.srcElement || e.target;
    if(node.id && node.id == 'search') return true;
    var logo = document.querySelector('#search_submit');
    logo.focus();
}
function setBodyClass(flag)
{	
    if (flag) {
        $('body').addClass('totalSearchType');
        vLayer('schwd', true);
        $('button.del').css('display','block');

        //var hd = document.querySelector('header');
        //hd.addEventListener('touchstart',gnbRemoveKeyboard);
    } else {
        $('body').removeClass('totalSearchType');
        vLayer('schwd', false);
        $('button.del').css('display','none');
        //var hd = document.querySelector('header');
        //hd.removeEventListener('touchstart',gnbRemoveKeyboard);
        
        window.scrollTo(0, 1);
    }
}
function vLayer(layer, flag)
{
	if (flag)
		$("#" + layer).show();
	else
		$("#" + layer).hide();
}

var autoCnt = 0;
var tempDecSearchKeyword = "";
function autoComplete()
{
	var descSearchKeywordVal = document.querySelector('#decSearchKeyword').value;
	var searchKeywordVal = document.querySelector('#searchKeyword').value;
	var schdelbtn = document.querySelector('#schdelbtn');
	
	if ((descSearchKeywordVal == searchKeywordVal) && (tempDecSearchKeyword != searchKeywordVal))
	{
		if (descSearchKeywordVal == ""){
			schdelbtn.style.display='none';
			tempDecSearchKeyword = '';
			fncSearchList();
		}else
		{
			schdelbtn.style.display='block';
			try
			{
				var param = "";
				var url = "/MW/Common/getSearchAutoCompleteAjax.tmall?getAutoCompleteKey=" + encodeURIComponent(encodeURIComponent(descSearchKeywordVal));
				tempDecSearchKeyword = descSearchKeywordVal;
				
				$.ajax({
					type: "get"
					,async: true
					,url: url
					,cache: false
					,dataType : 'json'
					,contetnType: "application/x-www-urlencoded; charset=UTF=8"
					,timeout: 1000
					,success: function(jsonData)
					{
						if (typeof jsonData == 'string') jsonData = JSON.parse(jsonData);
						
						showAutoComplete(jsonData.AKCResult, jsonData.CTGRList);
					}
					,error: function(e) { }
				});
				return;
			} 
			catch (err) { }
		}
	}
	else document.querySelector('#searchKeyword').value = descSearchKeywordVal;
	
	if (window.navigator.appName.indexOf('Explorer') < 0) {
		clearTimeout(timer);
		clearInterval(timer);
		checkFirst = false;
		timer = setTimeout('autoComplete();', 250);
	}
}
function setSearchRiseKeyword(data, date)
{
	var container 		= document.querySelector('#schword02');
	var searchSwipeNave = document.getElementById('searchSwipeNavi');
	var swipeHtml = '', swipeNaviHtml='';
	
	if (data) {
		for (var i=0 ;i<data.length ; i++) {
			var spanClass = 'on';
			if (data.length < 4) {
				if (i > 0) spanClass ='';
				swipeNaviHtml += '<span class="'+spanClass+'"></span>';
			}			
			swipeHtml += '<div><div class="sw_con fast"><ul>' + data[i] + '</ul><div class="sw_time">'+date+'</div></div></div>';
		}
		swipeNaviHtml += '<b id="searchSwipePage">'+data.length+'페이지중 1페이지</b>';
	}

	if (swipeNaviHtml != '') searchSwipeNave.innerHTML = swipeNaviHtml;
	
	container.innerHTML = swipeHtml;	
}
function getSwipeData(jsonData)
{
	var result=[];
	var markup = '';

	for (var i=0 ; i<jsonData.totalCount ; i++) {
		var riseData = jsonData.list[i];
		var rnkOrder = riseData.searchRankOrder;
		var keyword = riseData.keyword;
		var rankClass='', rankOrderClass='', rankOrderTxt='';
		
		if (i < 3) rankClass = 'rk';
		
		if (rnkOrder == 'new') {
			rankOrderClass = 'rt nw';
			rankOrderTxt = 'new';
		} else {
			if (rnkOrder > 0) {
				rankOrderTxt = rnkOrder+'<span>상승</span>';
				rankOrderClass = 'rt up';
			} else if (rnkOrder < 0) {				
				rnkOrder = Math.abs(rnkOrder);
				rankOrderTxt = rnkOrder+'<span>하락</span>';
				rankOrderClass = 'rt dw';
			} else {
				rankOrderTxt = rnkOrder+'<span>동일</span>';
				rankOrderClass = 'rt sm';
			}
		}
		
		markup += '<li class="'+rankClass+'"><a href="#" onclick="autoSearch(\''+keyword+'\');callStatAjax(\'WSRC07\',\'WSRC07\');" ><b>'+(i+1)+'</b>'+keyword+'<span class="'+rankOrderClass+'">'+rankOrderTxt+'</span></a></li>';
		
		if ((i+1)%10==0 || i == (jsonData.totalCount-1)) {
			result.push(markup);
			markup = '';
		}
	}
	
	return result;
}
var searchRiseInitFlag = true;
var searchInitFlag = true;
function riseKeyword(type) {
	if (searchRiseInitFlag) {
		getPopularKeywordList(type);
	}
}
function popularKeyword(type) {
	if (searchInitFlag) {
		getPopularKeywordList(type);
	}
}
function getPopularKeywordList(type)
{
	try
	{
		var url = "/MW/Common/getPopularKeywordAjax.tmall?type="+type;

		$.ajax({
			type: "get"
			,async: false
			,url: url
			,cache: false
			,dataType : 'json'
			,contetnType: "application/x-www-urlencoded; charset=UTF=8"
			,success: function(jsonData)
			{
				if (jsonData) {
					if (typeof jsonData == 'string') jsonData = JSON.parse(jsonData);
					
					if ('rise' == type) {
						var swipeData = getSwipeData(jsonData);
						var date = jsonData.date;
						setSearchRiseKeyword(swipeData, date);
						searchRiseInitFlag = false;
					} else {
						var popularObj = document.getElementById('schword03');
						var popularMarkup = '<div class="sw_con ppu"><ul>', rankClass='rk';
						for (var i=0 ; i<jsonData.list.length ; i++) {
							var data = jsonData.list[i];
							if (i>2) rankClass = '';
							popularMarkup += '<li class="'+rankClass+'"><a href="#" onclick="autoSearch(\''+data.keyword+'\');callStatAjax(\'WSRC10\',\'WSRC10\');return false;" ><b>'+(i+1)+'</b>'+data.keyword+'</a></li>';
						}
						popularMarkup += '</ul>';
						popularMarkup += '<div class="sw_time">'+jsonData.date+'</div></div>';
						popularObj.innerHTML = popularMarkup;
						searchInitFlag = false;
					}
					setSearchSwipe();
				}				
			}
			,error: function(e) { }
		});
		return;
	} 
	catch (err) { }
}
function showAutoComplete(akcResult, cateResult)
{
	var htmlStr	= "", htmlCateStr = "";
	var keyword = $("#decSearchKeyword").val();
	var display = false, htmlKeyword= "", cateDisplay = false;
	
	if(akcResult == null || akcResult.length == "undefined") {
		htmlStr = "<li></li>";
		display = true;
	}else {
		var listCount = akcResult.length;
		var cateCount = cateResult.length;
		
		if (listCount > 0)
		{
			if (listCount > 10)
				listCount = 10;

			for (var i = 0; i < listCount; i++)
			{
				var obj1 = akcResult[i].outKwd;
				var obj2 = akcResult[i].outKwd1;
				var logUrl = akcResult[i].logUrl;
				var logUrlAdd = akcResult[i].logUrlAdd;
				var isChange = false;
				var temp = "";
				var wiselogCd = "WSRC"+(i+15);
				if (obj1 != "") {
					if(obj1.indexOf(keyword) > -1) {
						temp = obj1.substr(obj1.indexOf(keyword) + keyword.length);
						htmlKeyword = obj1.substr(0,keyword.length) + "<strong>" + temp + "</strong>";
						isChange = true;
					}
					if(isChange == false && obj1.toUpperCase().indexOf(keyword) > -1) {
						temp = obj1.substr(obj1.toUpperCase().indexOf(keyword) + keyword.length);
						htmlKeyword = obj1.substr(0,keyword.length) + "<strong>" + temp + "</strong>";
						isChange = true;
					}
					if(isChange == false && obj1.toLowerCase().indexOf(keyword) > -1) {
						temp = obj1.substr(obj1.toLowerCase().indexOf(keyword) + keyword.length);
						htmlKeyword = obj1.substr(0,keyword.length) + "<strong>" + temp + "</strong>";
						isChange = true; 
					}
					if(isChange == false) {
						htmlKeyword = obj1;
					}
					htmlStr += "<li><a href=\"#\" onclick='autoCompleteClickLog(\""+logUrl+"\"); autoSearch(\"" + obj1 + "\"); callStatAjax(\""+wiselogCd+"\",\""+wiselogCd+"\");return false;'>" + chkValidText(htmlKeyword) + "</a><button type=\"button\" onclick='autoCompleteClickLog(\""+logUrlAdd+"\"); autoShowWord(\"" + obj1 + "\");return false;'>자동입력</button></li>";
				} else {
					if(obj2.indexOf(keyword) > -1) {
						temp = obj2.substr(0, obj2.indexOf(keyword));
						htmlKeyword = "<strong>" + temp + "</strong>" + obj2.substr(temp.length);
						isChange = true;
					}
					if(isChange == false && obj2.toUpperCase().indexOf(keyword) > -1) {
						temp = obj2.substr(0, obj2.toUpperCase().indexOf(keyword));
						htmlKeyword = "<strong>" + temp + "</strong>" + obj2.substr(temp.length);
						isChange = true;
					} 
					if(isChange == false && obj2.toLowerCase().indexOf(keyword) > -1) {
						temp = obj2.substr(0, obj2.toLowerCase().indexOf(keyword));
						htmlKeyword = "<strong>" + temp + "</strong>" + obj2.substr(temp.length);
						isChange = true;
					}
					if(isChange == false) {
						htmlKeyword = obj2;
					}
					htmlStr += "<li><a href=\"#\" onclick='autoCompleteClickLog(\""+logUrl+"\"); autoSearch(\"" + obj2 + "\"); callStatAjax(\""+wiselogCd+"\",\""+wiselogCd+"\");return false;'>" + chkValidText(htmlKeyword) + "</a><button type=\"button\" onclick='autoCompleteClickLog(\""+logUrlAdd+"\"); autoShowWord(\"" + obj2 + "\");return false;'>자동입력</button></li>";
				}
			}
			display = true;
		}
		//else
		//	display = false;
		
		if (cateCount > 0)
		{
			if (cateCount > 2)
				cateCount = 2;

			var isCate = false;
			htmlCateStr = "<h2>" + keyword + " 추천카테고리</h2>";
			htmlCateStr += "<ul>";
			
			for (var j = 0; j < cateCount; j++)
			{
				if (cateResult[j].ctgrNm != "") {	
					htmlCateStr += "<li class=\"m"+cateResult[j].metaNo+"\"><a href=\"#\" onclick=\"autoCompleteClickLog('"+cateResult[j].logUrl+"'); callStatAjax('WSRC"+(j+13)+"','WSRC"+(j+13)+"'); selectedCategorySearchGnb('" + keyword + "', " + cateResult[j].ctgrNO + "," + cateResult[j].ctgrLevel + "); return false;\">"+chkValidText(cateResult[j].ctgrNm)+"</a></li>";
					isCate = true;
				}
			}
			htmlCateStr += "</ul>";
			if(isCate == true) {
				cateDisplay = true;
			}else {
				htmlCateStr = "";
			}
		}
		else
			cateDisplay = false;
	}	

	$("#autoComplete").html(htmlStr);
	$("#ctgDiv").html(htmlCateStr);
	setBodyClass(true);
	vLayer('schwd', false);
	vLayer('kwd', display);
	vLayer('ctgDiv', cateDisplay);
	
	if (window.navigator.appName.indexOf('Explorer') < 0) {
		clearTimeout(timer);
		clearInterval(timer);
		checkFirst = false;
		timer = setTimeout('autoComplete();', 250);
	}
}
function autoShowWord(keyword) {
	$("#decSearchKeyword").val(keyword);
	autoComplete();
}
function autoCompleteClickLog(logUrl) {
	if ( logUrl && logUrl != '' ) {
		var img = new Image();
		img.src = logUrl;
	}
}
//통합검색 전용
function selectedCategorySearchGnb(kwd, ctgrNo, ctgrLevel) {
	var searchObj = {};
	searchObj.dispCtgrNo = ctgrNo;
	searchObj.dispCtgrLevel = ctgrLevel;
	searchObj.searchKeyword = kwd;
	searchObj.pageNo = 1;

	location.href = _MOBILE_URL_+"/Search/searchProduct.tmall?" + encodeDataGnb(searchObj);
	return false;
}
function encodeDataGnb(data) {
	return Object.keys(data).map(function(key) {
		if(data[key] != undefined && data[key] != 'undefined')
			return [ key, encodeURIComponent(data[key]) ].map(encodeURIComponent).join("=");
	}).join("&");
}
function chkValidText(text)
{
	return text.replace(/[^\uAC00-\uD7A3A-Za-z0-9<>\/ ]/gi, "");
}
function autoSearch(keyword)
{
	$("#decSearchKeyword").val(keyword);
	searchSubmit();
}
function fncSearchDelete(keyword) {
	keywordDelete(keyword);
	fncSearchList("D");
}
function keywordDelete(keyword)
{
	var cName = 'SEARCH_NAME';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cName);
    var cValue = '', encKeyword = encodeURIComponent(keyword);
    var expireTime = (1000 * 3600 * 24 * 7);

    if(start != -1){
         start += cName.length+1;
         var end = cookieData.indexOf(';', start);
         if(end == -1)end = cookieData.length;
         cValue = cookieData.substring(start, end);
    }

    if (cValue.indexOf(encKeyword) > -1) {
    	if (cValue.length > cValue.indexOf(encKeyword) + encKeyword.length) {
    		cValue = cValue.replace(encKeyword+'_','');
    	} else {
    		if (cValue.indexOf('_') > -1) {
    			cValue = cValue.replace('_'+encKeyword,'');
    		} else {
    			expireTime = (-1*1000 * 3600 * 24 * 30);
    			cValue = cValue.replace(encKeyword,'');
    		}
    	}
    	
    	var expdate = new Date();
    	expdate.setTime(expdate.getTime() + expireTime); // 7day
    	setSearchCookie11st(cName, cValue, expdate);
    }
}
function fncSearchAllDelete()
{
	if (confirm('최근검색어를 모두\n삭제하시겠습니까?')) {
		keywordAllDelete();	
		fncSearchList("D");
	}
}
function keywordAllDelete()
{
	var expdate = new Date();
	expdate.setTime(expdate.getTime() + (-1*1000 * 3600 * 24 * 30)); // -30day
	setSearchCookie11st("SEARCH_NAME", "", expdate);
}
function setSearchCookie11st (name, value, expires) 
{
	  document.cookie = name + "=" + value + "; path=/; domain=.11st.co.kr; expires=" + expires.toGMTString();
}
function goPrev() {
	if (searchSwipe) searchSwipe.prev();
}
function goNext() {
	if (searchSwipe) searchSwipe.next();
}
function goSearchSwipeMove(moveFlag) {
	if (searchSwipe) {
		if(moveFlag == 2){
			var lastIdx = searchSwipe.getDataLength();
			searchSwipe.move(lastIdx-1);			
		}else{
			searchSwipe.move(moveFlag);
		}
	}
}
var isSubTabWiseCall = false;
function setSearchSwipe(work)
{

	if(searchRiseInitFlag && searchInitFlag && !searchSwipe){
		riseKeyword('rise');
		popularKeyword('day');
	}

	if(!searchRiseInitFlag && !searchInitFlag && (!searchSwipe || work == "D") ){
		
		var tempSchword01 = '<div class="sw_con rec" id="schword01">'+document.querySelector("#schword01").innerHTML+'</div>';
		var tempSchword02 = document.querySelectorAll('#schword02>div');
		var tempSchword03 = document.querySelector('#schword03');
		
		var templDatas = [];
		templDatas.push(tempSchword01);
		
		for(var i=0; i<tempSchword02.length; i++) {
			templDatas.push(tempSchword02[i].innerHTML);
		}
		templDatas.push(tempSchword03.innerHTML);
		
		document.querySelector("#view_sch_swipe").innerHTML = "";
		document.querySelector("#view_sch_swipe").innerHTML = '<div class="mwContainer"><div></div><div></div><div></div></div>';

		searchSwipe = new MWSwipe(templDatas,{
			containerSelector:'#view_sch_swipe>.mwContainer'
			,viewSelector: 'div'
			,onChangeEnd: function(n, index){
				var lastIdx = searchSwipe.getDataLength();
				var tabList = document.querySelectorAll('#schwd>.sw_tab>li');
				
				for(var i = 0; i < tabList.length; i++){
					if(index == 0 && i == 0){
						tabList[i].className = "on";
						callStatAjax("WSRC02", "WSRC02");
						isSubTabWiseCall = false;
					}else if(index == lastIdx-1 && i == 2){
						tabList[i].className = "on";
						callStatAjax("WSRC09", "WSRC09");
						isSubTabWiseCall = false;
					}else if((index > 0 && index < lastIdx-1) && i == 1){
						tabList[i].className = "on";
						if(!isSubTabWiseCall) {
							callStatAjax("WSRC06", "WSRC06");
						}
					}else{
						tabList[i].className = "";
					}
				}
				
				if( index > 0 && index < lastIdx-1){
					var swipeNavi = document.getElementById('searchSwipeNavi');
					var naviArr = swipeNavi.getElementsByTagName('span');
					var naviTxtArr = document.getElementById('searchSwipePage');
					
					if (naviArr && naviArr.length > 1) {
						for (var i=0 ; i<naviArr.length ; i++) {
							if (i == index-1) naviArr[i].className = 'on';
							else naviArr[i].className = '';
						}
					}
					naviTxtArr.innerHTML = templDatas.length +'페이지중 ' + (index+1) + '페이지';
					if(isSubTabWiseCall) {
						callStatAjax("WSRC08", "WSRC08");
					}else{
						isSubTabWiseCall = true;
					}
				}
			}
		});
		
		var _nIdx = 1;
		var _pIdx = templDatas.length-1;
		var _viewTemp = searchSwipe.getItems();
		
		_viewTemp[1].innerHTML = templDatas[_nIdx];
		_viewTemp[1].setAttribute('data-viewIdx', _nIdx);
		
		_viewTemp[2].innerHTML = templDatas[_pIdx];
		_viewTemp[2].setAttribute('data-viewIdx', _pIdx);
		
		searchSwipe.resize();
	}
}
function searchSubmit()
{
	try {
		var str_action = $("#decSearchKeyword")[0].value;
		ga('send', 'event', 'MW_GNB_통합검색>키워드검색', document.title , str_action);
	}catch(e){}
	
	if ((document.searchForm.decSearchKeyword.value).replace(/\s*$/,"") == "")
	{
    	alert("검색어를 입력해 주세요");
	}
	else
	{
		var txtBnr = $("#dispObjLnkUrl").val();
		if (txtBnr != "")
	        document.location.href = txtBnr;
		else
		{
	        document.searchForm.searchKeyword.value = encodeURIComponent(document.searchForm.decSearchKeyword.value);
	        document.searchForm.submit();
	    }
	}
}
function isApp() {
	var appType = getCookie("appType");
	if(appType.indexOf("appmw") > -1) {	
		return true;
	} else {
		return false;
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
