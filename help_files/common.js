/*
 * ���� üũ
 */
function isEmpty(s)
{
  return ((s == null) || (s.length == 0));
}

/*
 * ������Ʈ���� üũ
 */
function isObject(obj) {
	return typeof(obj) != "undefined";
}

/*
 * ��ȿ�� ���ϸ����� üũ
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
 * ������ �˾�
 */
function openPopup(url, target, features) 
{
	window.open(url,target,features);
}

/*
 * ������ ���� �˾�
 */
function openWindow(url, target, width, height, scroll, params) 
{
	var winLeft = (screen.width - width) / 2;
	var winTop = (screen.height - height) / 2;
	features = 'height='+height+',width='+width+',top='+winTop+',left='+winLeft+',scrollbars='+scroll+',resizable=no';
	
	// �Ķ���Ͱ� ������ url�� �Ķ���� ������ �ٿ��ش� - 2008.05.26 shson ����
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
 * HTML �±� ����
 */
function stripHtmltag(string) 
{
	var objStrip = new RegExp();
	objStrip = /[<][^>]*[>]/gi;
	return string.replace(objStrip, "");
}

/** 
 * ������ üũ
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
 * ����Ʈ �ڽ� ���߱� - ie������ ���
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
 * ������ ���� ���̱�(FAQ/MAIL)
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
 * ������ ���� �����ϱ�(��Ű�� ����)
 * include/SaveConfigPage.jsp�� xmlHttp�� ȣ���Ѵ�.
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
 * saveConfigPage �Լ��� ���� �ݹ��Լ��̴�.
 */
function callbackSaveConfigPage()
{
	alert("����Ǿ����ϴ�");
	closeSetting();
}

/**
 * ������ ������ ���� ������(��Ű����)�� �����´�.
 */
function getConfigPage(name)
{
	var cookieString = getCookie("CONFIG_PAGE");
	if (cookieString == "") // ��Ű���� �������� �⺻���� �Ѱ��ش�.
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
 * ������������ ���� ��Ű���� ������ �⺻���� �������ش�.
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
 * �ε��� �� ������ �̹��� ���÷���
 * view : �ε� �̹����� ǥ�õ� ����
 * img : �ε� �̹����� ���
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

//IE ���� üũ 
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

// IE 10 �̸� ���� �� �� check
function goDial() {
	var  IE_VERSION = getInternetExplorerVersion();
	if (IE_VERSION >= 10 ) {
		goWindowOpen('http://dial.11st.co.kr/index.do', 'true', 640, 640, 'yes');
	} else {
		alert("11*�޽��� ����� IE10 �̻� ������ ����ȭ �Ǿ��־� IE9���ϴ�\nUpdate Ȥ�� ��ȸ��(�Ǹ���)E-mail ����̿��� ��Ź�帳�ϴ�.\n(*IE10�̻󿡼� �� �޼����� �ߴ� ��쿡�� Chrome�� �̿�Ȥ��\nȣȯ�������� IE10�̻����� ���� �� �̿� �����մϴ�)");
		
	}
} 