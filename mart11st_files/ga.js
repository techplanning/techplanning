(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

function getDimensionValue(){
   	var dimenVal = 'WEB';
	try{
		var cName = 'appType=';
	    var cookieData = document.cookie;
	    var start = cookieData.indexOf(cName);
	    var cValue = '';
	    if(start != -1){
	         start += cName.length;
	         var end = cookieData.indexOf(';', start);
	         if(end == -1)end = cookieData.length;
	         cValue = cookieData.substring(start, end);
	    }
	   	var appType = unescape(cValue);
	   	if(appType.indexOf('app') > -1){
	   		dimenVal = 'APP';
	   	} else if (appType.indexOf('deal') > -1){
	   		dimenVal = 'APP_SD';
	   	}

	}catch(e){}
	return dimenVal;
}

var dimensionValue = getDimensionValue();
ga('create', 'UA-68494772-1', 'auto');
ga('set', 'dimension6', dimensionValue);

window.addEventListener("load",  function() {

	function createGtmFrame(containerId) {
		var gaTag = document.createElement('noscript');
		var gaIframe = document.createElement('iframe');
		var footerObj = document.querySelector('footer');
		gaIframe.width = 0;
		gaIframe.height = 0;
		gaIframe.style.display = 'none';
		gaIframe.style.visibility = 'hidden';
		gaTag.appendChild(gaIframe);
		footerObj.appendChild(gaTag);
		gaIframe.src = '//www.googletagmanager.com/ns.html?id=' + containerId;
	}

	createGtmFrame('GTM-NTCVDT');
	createGtmFrame('GTM-5GFZQ4'); // GTM For UT Script Managing

}, false);

(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
	new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
	j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
	'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','GA_dataLayer','GTM-NTCVDT');
try{
	GA_dataLayer.push(
			{ '11st_cd_6': dimensionValue }
	);
}catch(e){}

// GTM For UT Script Managing
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
	new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
	j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
	'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','GA_dataLayer','GTM-5GFZQ4');

