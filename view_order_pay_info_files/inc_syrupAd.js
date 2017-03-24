var SyrupAdInfo = function(pin) {
	this.site			= pin.site;
	this.action			= pin.action;
	this.items			= [];
	/*
	this.url			= pin.url;
	this.ref			= pin.ref;
	this.d_uid			= pin.d_uid;
	this.callback		= pin.callback;
	this.debug			= pin.debug;
	 */

	var getSyrupAdCookie = function(cName) {
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
	};
	var getSyrupAdAppType = function() {
		return getSyrupAdCookie('appType');
	};
	var getSyrupAdAppVCA = function() {
		return getSyrupAdCookie('appVCA'); 
	};
	
	if(this.site == null || typeof this.site == "undefined" || this.site == "") {
		this.site = "2";	// 11��
	}
	if(this.action == null || typeof this.action == "undefined" || this.action == "") {
		this.action = "view";	// page view
	}
	if(pin.ref != null && typeof pin.ref != "undefined" && pin.ref != "") {
		this.ref = pin.ref;
	}
	if(pin.ref_cd != null && typeof pin.ref_cd != "undefined" && pin.ref_cd != "") {
		this.ref_cd = pin.ref_cd;
	} else {
		this.ref_cd = "";
	}
	if(pin.mid != null && typeof pin.mid != "undefined" && pin.mid != "") {
		this.mid = pin.mid;
	} else {
		this.mid = "";
	}
	if(pin.channel != null && typeof pin.channel != "undefined" && pin.channel != "") {
		this.channel = pin.channel;
	} else {
		this.channel = ""; 
	}
	if(pin.gender != null && typeof pin.gender != "undefined" && pin.gender != "") {
		this.gender = pin.gender;
	} else {
		this.gender = ""; 
	}
	if(pin.age != null && typeof pin.age != "undefined" && pin.age != "") {
		this.age = pin.age;
	} else {
		this.age = ""; 
	}
	if(pin.pcid != null && typeof pin.pcid != "undefined" && pin.pcid != "") {
		this.pcid = pin.pcid;
	} else {
		this.pcid = ""; 
	}
	if(this.action == "view" || this.action == "basket" || this.action == "order" || this.action == "wish") {
		this.url = pin.url;
		
		if(this.url == null || typeof this.url == "undefined" || this.url == "") {
			this.url = document.location.href; 
		}
	}
	try {
		if(getSyrupAdAppType() == "appmw" && Number(getSyrupAdAppVCA()) >= 640) {
			var d_uid = window.SyrupAdInterface.getDeviceId();
			this.d_uid = d_uid;
		}
	} catch(e) {}
	if(pin.gaid != null && typeof pin.gaid != "undefined" && pin.gaid != "") {
		this.gaid = pin.gaid;
	}
	if(pin.idfa != null && typeof pin.idfa != "undefined" && pin.idfa != "") {
		this.idfa = pin.idfa;
	}
	if(pin.callback != null && typeof pin.callback != "undefined" && pin.callback != "") {
		this.callback = pin.callback;
	}
	if(pin.debug != null && typeof pin.debug != "undefined" && pin.debug != "") {
		this.debug = pin.debug;
	}
	
	this.getUrl	= function(syrupAdServer) {
		var resultStr = syrupAdServer + "?data=" + encodeURIComponent(JSON.stringify(this));
		return resultStr;
	}
}

var SyrupAdPrd = function(pin, actionType) {
	this.id				= pin.id;
	this.count			= pin.count;
	
	/*
	// view, basket, wish
	this.c1				= pin.c1;
	this.c2				= pin.c2;
	this.c3				= pin.c3;
	this.c4				= pin.c4;
	this.c5				= pin.c5;
	this.c6				= pin.c6;
	
	// view, basket, order, wish
	this.total_sales	= pin.total_sales;
	this.title			= pin.title;
	this.img			= pin.img;
	
	// view
	this.sales_state	= pin.sales_state;
	*/
	
	if(actionType == null || typeof actionType == "udefined" || actionType == "") {
		actionType = "view";
	}
	
	if(this.id == null || typeof this.id == "undefined" || this.id == "") {
		this.id = "";
		return;
	}

	if(this.count == null || typeof this.count == "undefined" || this.count == "") {
		this.count = "1";
	}
	
	if(actionType == "view" || actionType == "basket" || actionType == "wish") {
		if(pin.c1 != null && typeof pin.c1 != "undefined" && pin.c1 != "") {
			this.c1 = pin.c1;
		}
		if(pin.c2 != null && typeof pin.c2 != "undefined" && pin.c2 != "") {
			this.c2 = pin.c2;
		}
		if(pin.c3 != null && typeof pin.c3 != "undefined" && pin.c3 != "") {
			this.c3 = pin.c3;
		}
		if(pin.c4 != null && typeof pin.c4 != "undefined" && pin.c4 != "") {
			this.c4 = pin.c4;
		}
		if(pin.c5 != null && typeof pin.c5 != "undefined" && pin.c5 != "") {
			this.c5 = pin.c5;
		}
		if(pin.c6 != null && typeof pin.c6 != "undefined" && pin.c6 != "") {
			this.c6 = pin.c6;
		}
	}
	
	if(actionType == "view" || actionType == "basket" || actionType == "order" || actionType == "wish") {
		this.total_sales	= pin.total_sales;
		this.title			= pin.title;
		this.img			= pin.img;
		
		if(this.total_sales == null || typeof this.total_sales == "undefined" || this.total_sales == "") {
			this.total_sales = 0;
		}
		if(this.title == null || typeof this.title == "undefined") {
			this.title = "";
		}
		if(this.img == null || typeof this.img == "undefined") {
			this.img = "";
		}
	}
	
	if(actionType == "view" && pin.sales_state != null && typeof pin.sales_state != "undefined" && pin.sales_state != "") {
		this.sales_state = pin.sales_state;
	}
}

function callSyrupAdPrdStat(syrupAdInfo, syrupAdServer) {
	if(syrupAdServer == null || typeof syrupAdServer == "undefined" || syrupAdServer == "") {
		syrupAdServer	= "http://idm.skplanet.com/dcd/log.skp";
	}

	try {
		var img = new Image();
		img.src = syrupAdInfo.getUrl(syrupAdServer);
	} catch(e) {}
}
 