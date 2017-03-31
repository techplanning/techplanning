function goAppStore()
{
    if ((navigator.userAgent.indexOf("iPhone") > -1) || (navigator.userAgent.indexOf("iPad") > -1) || (navigator.userAgent.indexOf("iPod") > -1))
        window.location.href = "itms-apps://itunes.apple.com/app/id397938216?mt=8";
    else
        window.location.href = "market://details?id=com.elevenst";
}
function Nethru_getCookieVal(offset)
{
	var endstr = document.cookie.indexOf (";", offset);
	if (endstr == -1)
		endstr = document.cookie.length;
	return unescape(document.cookie.substring(offset, endstr));
}
function Nethru_SetCookie(name, value)
{
	var argv = Nethru_SetCookie.arguments;
	var argc = Nethru_SetCookie.arguments.length;
	var expires = (2 < argc) ? argv[2] : null;
	var path = (3 < argc) ? argv[3] : null;
	var domain = (4 < argc) ? argv[4] : null;
	var secure = (5 < argc) ? argv[5] : false;

	document.cookie = name + "=" + escape (value)
					+ ((expires == null) ? "" : ("; expires="+expires.toGMTString()))
					+ ((path == null) ? "" : ("; path=" + path))
					+ ((domain == null) ? "" : ("; domain=" + domain))
					+ ((secure == true) ? "; secure" : "");
}
function Nethru_GetCookie(name)
{
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;

	while (i < clen)
	{
 		var j = i + alen;
 		if (document.cookie.substring(i, j) == arg)
    		return Nethru_getCookieVal (j);

 		i = document.cookie.indexOf(" ", i) + 1;
 		if (i == 0)
    		break;
 	}
	return null;
}
function Nethru_makePersistentCookie(name,length,path,domain)
{
	var today = new Date();
	var expiredDate = new Date(2020, 1, 1);
	var cookie;
	var value;

	cookie = Nethru_GetCookie(name);
	if (cookie)
   		return 1;

	var values = new Array();
	for (var i = 0; i < length; i++)
		values[i] = "" + Math.random();

	value = today.getTime();

	for (var i = 0; i < length; i++)
		value += values[i].charAt(2);

	Nethru_SetCookie(name, value, expiredDate, path, domain);
}
function Nethru_getDomain()
{
	var _host = document.domain;
	var so = _host.split('.');
	var dm = so[so.length - 2] + '.' + so[so.length - 1];

	return (so[so.length - 1].length == 2) ? so[so.length - 3] + '.' + dm : dm;
}
var Nethru_domain = Nethru_getDomain();
Nethru_makePersistentCookie("PCID", 10, "/", Nethru_domain);