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
function executeApp(appUrl, storeUrl) {
	var appAction = "app://callapp/";
	var object = new Object();
	
	object["app-url"] = appUrl;
	object["store-url"] = storeUrl;
	
	callAppScheme(appAction + JSON.stringify(object));
}
function callAppScheme(scheme) {
    var appActionID = "appExecuteFrame";
    var actionFrame = document.createElement("IFRAME");

    actionFrame.id = appActionID;
    actionFrame.name = actionFrame.id;
    actionFrame.width = 0;
    actionFrame.height = 0;
    actionFrame.src = scheme;

    document.body.appendChild(actionFrame);
    setTimeout(function() {
        document.body.removeChild(actionFrame);
    }, 100);
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
function setMCookie(c_name,value,min)
{
    var expdate = new Date();
    expdate.setTime(expdate.getTime() + (min * 60 * 1000));
    document.cookie = c_name+"=" + value + "; path=/; domain="+document.domain+"; expires=" + expdate.toGMTString();
}

function isApp() {
	var appType = getCookie("appType");
	if(appType.indexOf("appmw") > -1) {	
		return true;
	} else {
		return false;
	}
}
function isIOSApp() {
	var appType = getCookie("appType");
	var appVCA = 0;
	try{
		appVCA = parseInt(getCookie("appVCA"));
	}catch(e){ appVCA=0; }
	
	if(appType == "appmwi" && appVCA >= 300) {	
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
		if(isApp()) {
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
	var appDownlink = document.querySelectorAll('li.appDownlink');
    for(var i=0,len=appDownlink.length; i<len; i++) {
        appDownlink[i].innerHTML = "<a href='"+downLink+"'>11번가 앱 다운로드</a>";
    }
}
function goAppStore()
{
    if ((navigator.userAgent.indexOf("iPhone") > -1) || (navigator.userAgent.indexOf("iPad") > -1) || (navigator.userAgent.indexOf("iPod") > -1))
        window.location.href = "itms-apps://itunes.apple.com/app/id397938216?mt=8";
    else
        window.location.href = "market://details?id=com.elevenst";
}

function searchParam(paramName) {
	  var query = window.location.search.substring(1);
	  var vars = query.split("&");
	  for (var i=0;i<vars.length;i++) {
	    var pair = vars[i].split("=");
	   	if(pair.length > 1 && pair[0] == paramName){
	   		return pair[1];
	   	}
	  } 
} 