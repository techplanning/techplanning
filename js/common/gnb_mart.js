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
	if (checkFirst == false){
		timer = setTimeout('autoComplete()', 250);
	}
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
	
	index = document.cookie.indexOf("R_KWD" + "=");
	if (index == -1)
	{
		strAutoComplete = '<p class="none">�ֱ� �˻������� �����ϴ�.</p>';
		$("#schword01").html(strAutoComplete);
		setBodyClass(true);
		vLayer('kwd', false);
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
				strAutoComplete += "<li><a href=\"#\" onclick=\"autoSearch('" + strSearchNameArray[i].split("#")[0] + "');callStatAjax('WSRC03','WSRC03');return false;\" class=\"ico_x\" >" + chkSearchName + "</a><button type=\"button\" onclick=\"callStatAjax('WSRC04','WSRC04');fncSearchDelete('"+strSearchNameArray[i].split('#')[0]+"')\">����</button></li>";
			}
			else{
				chkSearchName = chkValidText(strSearchNameArray[i]);
				if (chkSearchName.trim() != '')
				strAutoComplete += "<li><a href=\"#\" onclick=\"autoSearch('" + strSearchNameArray[i] + "');callStatAjax('WSRC03','WSRC03');return false;\" class=\"ico_x\" >" + chkSearchName + "</a><button type=\"button\" onclick=\"callStatAjax('WSRC04','WSRC04');fncSearchDelete('"+strSearchNameArray[i]+"')\">����</button></li>";
			}
		}
		strAutoComplete += "</ul><button type='button' class='del_all' onclick=\"callStatAjax('WSRC05','WSRC05');fncSearchAllDelete()\">��ü����</button>";
	}
	
	$("#schword01").html(strAutoComplete);
	vLayer('kwd', false);
	setBodyClass(true);	
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
        $('#schdelbtn').css('display','block');
    } else {
        $('body').removeClass('totalSearchType');
        vLayer('schwd', false);
        $('#schdelbtn').css('display','none');
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
	
/*	if ((descSearchKeywordVal == searchKeywordVal) && (tempDecSearchKeyword != searchKeywordVal))
	{
		if (descSearchKeywordVal == ""){
			schdelbtn.style.display='none';
			fncSearchList();
		}else
		{
			schdelbtn.style.display='block';
			try
			{
				var param = "";
				var url = _MOBILE_URL_ + "/Common/getMartSearchAutoCompleteAjax.tmall?getAutoCompleteKey=" + encodeURIComponent(encodeURIComponent(descSearchKeywordVal));
				tempDecSearchKeyword = descSearchKeywordVal;
				
				$.ajax({
					type: "get"
					,async: true
					,url: url
					,cache: false
					,dataType : 'json'					
					,contetnType: "application/x-www-urlencoded; charset=UTF=8"
					,success: function(jsonData)
					{
						if (typeof jsonData == 'string') jsonData = JSON.parse(jsonData);
						
						var obj1 = jsonData.AKCResult.outKwd;
						var obj2 = jsonData.AKCResult1.outKwd1;
						showAutoComplete(obj1, obj2);
					}
					,error: function(e) { }
				});
				return;
			} 
			catch (err) { }
		}
	}
	else document.querySelector('#searchKeyword').value = descSearchKeywordVal;*/
	
	if (window.navigator.appName.indexOf('Explorer') < 0) {
		clearTimeout(timer);
		clearInterval(timer);
		checkFirst = false;
		timer = setTimeout('autoComplete();', 250);
	}
}
var searchRiseInitFlag = true;
var searchInitFlag = true;
function showAutoComplete(obj1, obj2)
{
	var htmlStr	= "";
	var htmlKeywordStr = "";
	var keyword = $("#decSearchKeyword").val();

	for (var i=0 ; i<obj1.length ; i++) {
		for (var j=0 ; j<obj2.length ; j++) {
			if (obj1[i] == obj2[j]) {
				obj2.splice(j,1);
			}
		}
	}

	var display = "", htmlKeyword= "";
	var obj1ListCount = obj1.length;
	var obj2ListCount = obj2.length;
	var objListCountMax = 0;
	if ((obj1ListCount > 0) || (obj2ListCount > 0))
	{
		if (obj1ListCount > 5)
			obj1ListCount = 5;

		if (obj2ListCount > 5)
			obj2ListCount = 5;

		if (obj1ListCount > obj2ListCount)
			objListCountMax = obj1ListCount;
		else
			objListCountMax = obj2ListCount;

		// �� �˻� Ű����
		for (var i = 0; i < objListCountMax; i++)
		{
			if (obj1[i])
			{
				htmlKeyword = obj1[i].replace(keyword, "<strong>" + keyword + "</strong>");
				htmlStr += "<li><a href='#' onclick='autoSearch(\"" + obj1[i] + "\");return false;' data-clickurl=\"WSRC01\" data-clickkey=\"WSRC01\">" + chkValidText(htmlKeyword) + "</a></li>";
			}
			else
				htmlStr += "<li> </li>";
		}
		// �� �˻� Ű����
		for (var i = 0; i < objListCountMax; i++)
		{
			if (obj2[i])
			{
				htmlKeyword = obj2[i].replace(keyword, "<strong>" + keyword + "</strong>");
				htmlKeywordStr += "<li><a href='#' onclick='autoSearch(\"" + obj2[i] + "\");return false;' data-clickurl=\"WSRC01\" data-clickkey=\"WSRC01\">" + chkValidText(htmlKeyword) + "</a></li>";
			}
			else
				htmlKeywordStr += "<li> </li>";
		}
		display = true;
	}
	else
		display = false;
	
	$("#autoComplete").html(htmlStr);
	$("#autoCompleteKeyWord").html(htmlKeywordStr);
	setBodyClass(true);
	vLayer('schwd', false);
	vLayer('kwd', display);
	
	if (window.navigator.appName.indexOf('Explorer') < 0) {
		clearTimeout(timer);
		clearInterval(timer);
		checkFirst = false;
		timer = setTimeout('autoComplete();', 250);
	}
	
	callStatAjax('MWMART01' , 'MWMART0103');
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
	var cName = 'R_KWD';
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
	if (confirm('�ֱٰ˻�� ���\n�����Ͻðڽ��ϱ�?')) {
		keywordAllDelete();	
		fncSearchList("D");
	}
}
function keywordAllDelete()
{
	var expdate = new Date();
	expdate.setTime(expdate.getTime() + (-1*1000 * 3600 * 24 * 30)); // -30day
	setSearchCookie11st("R_KWD", "", expdate);
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

function searchSubmit()
{
	if ((document.searchForm.decSearchKeyword.value).replace(/\s*$/,"") == "") {
    	alert("검색어를 입력해 주세요");
	} else if (document.searchForm.decSearchKeyword.value == defaultSearchKeyword) {
		alert("검색어를 입력해 주세요");
		document.searchForm.decSearchKeyword.value = '';
	} else {
		var txtBnr = $("#dispObjLnkUrl").val();
		if (txtBnr != "")
	        document.location.href = txtBnr;
		else {
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
