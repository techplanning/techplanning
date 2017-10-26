/*
 * 공백 체크
 */
function isEmpty(s)
{
  return ((s == null) || (s.length == 0));
}

/*
 * 오브젝트인지 체크
 */
function isObject(obj) {
	return typeof(obj) != "undefined";
}

/*
 * 유효한 파일명인지 체크
 */
function isVaildFileName(fileName) 
{
	var i;
	for(i = 0; i < fileName.length; i++) 
	{
		ch = fileName.charAt(i);
		if( ch == '/' || ch == ':' || ch == '*'|| ch == '?' || ch == '\"' || ch == '<' || ch == '>' || ch == '|' || ch == '\\') 
		{
			return false;
		}
	}
	return true;
}

/*
 * 윈도우 팝업
 */
function openPopup(url, target, features) 
{
	window.open(url,target,features);
}

/*
 * 윈도우 센터 팝업
 */
function openWindow(url, target, width, height, scroll, params) 
{
	var winLeft = (screen.width - width) / 2;
	var winTop = (screen.height - height) / 2;
	features = 'height='+height+',width='+width+',top='+winTop+',left='+winLeft+',scrollbars='+scroll+',resizable=no';
	
	// 파라미터가 있으면 url에 파라미터 정보를 붙여준다 - 2008.05.26 shson 수정
	if(params.length > 0 && params.include('='))
	{
		url += (url.include('?') ? '&' : '?') + params;
	}
	
	win = window.open(url, target, features);
	if (parseInt(navigator.appVersion) >= 4) 
	{ 
	  	win.window.focus(); 
	}
}

/*
 * It pauses for milliseconds
 */
function pause(numberMillis) 
{
	var now = new Date();
	var exitTime = now.getTime() + numberMillis;
	
	while (true) 
	{
	  	now = new Date();
	  	if (now.getTime() > exitTime)
	    	return;
	}
}

/*
 * If user enters other keys except NUMBER, BACKSPACE, TAB. returns false;
 */
function onlyNumber(event)
{
	/*
	if(event.keyCode == 8 || event.keyCode == 9) // allow backspace, tab
	{
		event.returnValue = true;
	}
	else if(event.keyCode < 45 || (event.keyCode > 57 && event.keyCode < 96) || event.keyCode > 105) // allow number only
	{
		event.returnValue = false;
	}
	*/
	
	var	keyCode = event.keyCode;
	if (event.shiftKey == true)
	{
		event.returnValue = false;
	}
	else if(keyCode == 8 || keyCode == 9) // allow backspace, tab
	{
		event.returnValue = true;
	}
	else if((keyCode > 47 && keyCode < 58) || (keyCode > 95 && keyCode < 106)) // allow number only
	{
		event.returnValue = true;
	}
	else
	{
		event.returnValue = false;
	}
}

function chkAllNumber(obj)
{
 	val=obj.value;
	re=/[^0-9]/gi;
	obj.value=val.replace(re,"");
}


/*
 * It trims.
 */
function ltrim(str)
{
	var s = new String(str);
	
	if (s.substr(0,1) == " ")
	{
		return ltrim(s.substr(1));
	}
	else
	{
		return s;
	}
}

function rtrim(str)
{
  var s = new String(str);
  if(s.substr(s.length-1,1) == " ")
  { 
  	return rtrim(s.substring(0, s.length-1))
  }
  else
  {
  	return s;
  }
}

function trim(str)
{
	return ltrim(rtrim(str));
}

function setCookie (name, value, expires) 
{
	document.cookie = name + "=" + escape (value) + "; path=/; expires=" + expires.toGMTString();
}

function getCookie(name) 
{
	var search = name + "="
	if (document.cookie.length > 0) 
	{ 
		offset = document.cookie.indexOf(search)
		if (offset != -1) 
		{ 
			offset += search.length
			end = document.cookie.indexOf(";", offset)
			if (end == -1)
				end = document.cookie.length
			return unescape(document.cookie.substring(offset, end))
		}
	}
	return "";
}

/** 
 * HTML 태그 제거
 */
function stripHtmltag(string) 
{
	var objStrip = new RegExp();
	objStrip = /[<][^>]*[>]/gi;
	return string.replace(objStrip, "");
}

/** 
 * 브라우저 체크
 */
function getBrowserInfoEE() 
{
	if (checkIt("konqueror")) 
	{
		browser = "Konqueror";
		OS = "Linux";
	}
	else if (checkIt("safari")) 
	{
		browser = "Safari";
	}
	else if (checkIt("omniweb")) 
	{
		browser = "OmniWeb";
	}
	else if (checkIt("opera")) 
	{
		browser = "Opera";
	}
	else if (checkIt("webtv")) 
	{
		browser = "WebTV";
	}
	else if (checkIt("icab")) 
	{
		browser = "iCab";
	}	
	else if (checkIt("msie"))
	{
		browser = "Internet Explorer";
	}
	else if (!checkIt("compatible")) 
	{
		browser = "Netscape Navigator";
	}
	else
	{ 
		browser = "An unknown browser";
	}
  return browser;
}

function checkIt(str) 
{	
	var detect = navigator.userAgent.toLowerCase();	
	place = detect.indexOf(str) + 1;
	return place;
}

/**
 * 셀렉트 박스 감추기 - ie에서만 사용
 */
function hideSelects(visibility) 
{
    selects = document.getElementsByTagName("select");
    for (i = 0; i < selects.length; i++) 
    {
      selects[i].style.visibility = visibility;
    }
}

/**
 * 페이지 설정 보이기(FAQ/MAIL)
 */
function showConfigPageTab(obj)
{
	if (obj.id == "configFaq")
	{
		$("configFaqArea").style.display = "";
		$("configFaq").setAttribute("class","layer_tab_active_bg");
        $("configFaq").setAttribute("className","layer_tab_active_bg");
		$("configMailArea").style.display = "none";
        $("configMail").setAttribute("class","layer_tab_deactive_bg");
        $("configMail").setAttribute("className","layer_tab_deactive_bg");
	}
	else if (obj.id == "configMail")
	{
		$("configFaqArea").style.display = "none";
        $("configFaq").setAttribute("class","layer_tab_deactive_bg");
        $("configFaq").setAttribute("className","layer_tab_deactive_bg");
		$("configMailArea").style.display = "";
        $("configMail").setAttribute("class","layer_tab_active_bg");
        $("configMail").setAttribute("className","layer_tab_active_bg");
	}
	
}
/**
 * 페이지 설정 저장하기(쿠키에 저장)
 * include/SaveConfigPage.jsp에 xmlHttp로 호출한다.
 */
function saveConfigPage()
{
	var obj = new Ajax.Request("/demo/include/SaveConfigPage.jsp", 
        	{
        			method : "POST",
        			postBody : "configPage=" + encodeURIComponent(Form.serialize("configForm")),
        			onComplete : callbackSaveConfigPage
        		}
        	);
}

/**
 * saveConfigPage 함수에 대한 콜백함수이다.
 */
function callbackSaveConfigPage()
{
	alert("저장되었습니다");
	closeSetting();
}

/**
 * 페이지 설정에 대한 설정값(쿠키정보)을 가져온다.
 */
function getConfigPage(name)
{
	var cookieString = getCookie("CONFIG_PAGE");
	if (cookieString == "") // 쿠키값을 없을때는 기본값을 넘겨준다.
		return getDefaultConfigPage(name);
		
	var arCookieString = cookieString.split("&");
	for (var i=0; i<arCookieString.length; i++)
	{
		var arItem = arCookieString[i].split("=");
		if (arItem.length < 2)
			continue;
		if (name == arItem[0])
			return arItem[1];
	}
	return "";
}

/**
 * 페이지설정에 대한 쿠키값이 없을때 기본값을 리턴해준다.
 */
function getDefaultConfigPage(name)
{
	if (name == "configFaqViewContents")
	    return "DROP_DOWN";    // mod. mrshin. 20100930.
	else if (name == "configFaqFeedback")
		return "RADIO";		
	else if (name == "configMailViewContents")
		return "DROP_DOWN";
	else if (name == "RADIO")
		return "DROP_DOWN";
	else if (name == "configMailAttachCount")
		return "ONE";
	else if (name == "configMailSelectNode")
		return "SELECT";		//cichung:11st customizing.
	else if (name == "configMailUseToolTip")
		return "N";			//cichung:11st customizing.
	else if (name == "configFaqUseToolTip")
        return "N";         //hslee:11st customizing.
}

/**
 * 로딩될 때 나오는 이미지 디스플레이
 * view : 로딩 이미지가 표시될 영역
 * img : 로딩 이미지의 경로
 */
function waitDisplay(view, img)
{
	var waitDisplay = $(view);
	var waitHtml = "";
	waitHtml += "<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";
	waitHtml += "  <tr>";
	waitHtml += "    <td align=\"center\"><img src=\"" + img + "\" /></td>";
	waitHtml += "  </tr>";
	waitHtml += "</table>";
	waitDisplay.innerHTML = waitHtml;
}

//IE 버전 체크 
function getInternetExplorerVersion() { 
 var rv = -1; // Return value assumes failure.
 if (navigator.appName == 'Microsoft Internet Explorer') {
      var ua = navigator.userAgent;
      var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) != null)
          rv = parseFloat(RegExp.$1);
     } else {
     	rv = 99;
     }
 return rv;
}

// IE 10 미만 버전 일 때 check
function goDial() {
	var  IE_VERSION = getInternetExplorerVersion();
	if (IE_VERSION >= 10 ) {
		goWindowOpen('http://dial.11st.co.kr/index.do', 'true', 640, 640, 'yes');
	} else {
		alert("11*메신저 상담은 IE10 이상 버전에 최적화 되어있어 IE9이하는\nUpdate 혹은 비회원(판매자)E-mail 상담이용을 부탁드립니다.\n(*IE10이상에서 본 메세지가 뜨는 경우에는 Chrome을 이용혹은\n호환성설정을 IE10이상으로 변경 후 이용 가능합니다)");
		
	}
} 