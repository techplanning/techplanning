;(function(outer){

  /**
	* @Description DeviceInfo의 instance인 device를 생성
	*/
	outer.device = function() {
	  di = new DeviceInfo();
	  di.init();
		return di;
	};
	
	/**
	* @Description 기능별 white list
	*/
	device.whiteList = {
		'move' : [
		  {model:"SHV-E160",version:"+2.1"}
		  ,{model:"SHV-E210",version:"+2.1"}
		  ,{model:"SHV-E110",version:"+2.1"}
		  ,{model:"SHV-E120",version:"+2.1"}
		  ,{'model':'iPhone','version':'+3.2'}
		],
		'prd3dSwipe' : [
		  {model:"SHW-M440",version:"+4.0"}
		  ,{model:"SHV-E210",version:"+4.0"}
		  ,{model:"SHV-E300",version:"+4.0"}
		  ,{model:"SHV-E330",version:"+4.0"}
		  ,{model:"SHV-E370",version:"+4.0"}
		  ,{model:"SHV-E250",version:"+4.0"}
		],
		'wowAd' : [
		   {model:"SHW-M250",version:"+3.0"}//갤럭시s2
		  ,{model:"SHV-E110",version:"+3.0"}//갤럭시s2lte
  		  ,{model:"SHW-M440",version:"+3.0"}//갤럭시s3
   		  ,{model:"SHV-E210",version:"+3.0"}//갤럭시s3lte
  		  ,{model:"SHV-E300",version:"+3.0"}//갤럭시s4
  		  ,{model:"SHV-E160",version:"+3.0"}//갤럭시노트1
  		  ,{model:"SHV-E250",version:"+3.0"}//갤럭시노트2
  		  ,{model:"SM-N900",version:"+3.0"}//갤럭시노트3
  		  ,{model:"SHV-E140",version:"+3.0"}//갤럭시tab8.9
  		  ,{model:"SHW-M380",version:"+3.0"}//갤럭시tab10.1
   		  ,{model:"IM-A800",version:"+3.0"}//스카이베가 lte
   		  ,{model:"LG-SU640",version:"+3.0"}//옵티머스lte
   		  ,{model:"LG-F180",version:"+3.0"}//옵티머스G
   		  ,{model:"LG-F240",version:"+3.0"}//옵티머스G pro
   		  ,{model:"LG-F350",version:"+3.0"}//옵티머스G pro2
  		],
		'iScroll' : [
		   {model:"SHV-E210S",version:"+3.0"}//갤3
		  ,{model:"SHV-E160S",version:"+3.0"}//갤노트1
		  ,{model:"SHV-E250S",version:"+3.0"}//갤노트2
		  ,{model:"SHV-E330S",version:"+3.0"}//갤4 LTE-A
		  ,{model:"SHV-E300S",version:"+3.0"}//갤4 LTE
		]
	};
	
	device.phoneInfo = {
		'iphone' : 'iPhone'
		,'ipad' : 'iPad'
		,'android' : 'Android'
		,'galaxyTab89' : 'SHV-E140'
		,'galaxyTab' : 'SHW-M180'
		,'galaxyTab2' : 'SHW-M380'
		,'galaxyK' : 'SHW-M130K'
		,'galaxyU' : 'SHW-M130L'
		,'galaxyS' : 'SHW-M110'
		,'galaxyS2' : 'SHW-M250'
		,'galaxyS2LTE' : 'SHV-E110'
		,'galaxyS2HD' : 'SHV-E120'
		,'galaxyS3' : 'SHW-M440'
		,'galaxyS3LTE' : 'SHV-E210'
		,'galaxyS4' : 'SHV-E300'
		,'galaxyS4LTEA' : 'SHV-E330'
		,'galaxyS4MINI' : 'SHV-E370'
		,'galaxyNote' : 'SHV-E160'
		,'galaxyNote2' : 'SHV-E250'
		,'galaxyNote3' : 'SM-N900'
		,'galaxyNexus' : 'Galaxy Nexus'
		,'galaxyNexus5' : 'Nexus 5'
		,'galaxyNexus7' : 'Nexus 7'
	    ,'optimusLTE' : 'LG-SU640'
	    ,'vegaLTE' : 'IM-A800'
	    ,'optimusG' : 'LG-F180'
	    ,'optimusGpro2' : 'LG-F350'
	    ,'optimusGpro' : 'LG-F240'
	};
	
	/**
	* @Description DeviceInfo 초기화
	*/
	outer.DeviceInfo = function() {
		this._userAgent = navigator.userAgent;
		this._info = {};
	};
	
	/**
	* @Description userAgent 공용 검색 함수
	*/
	DeviceInfo.prototype.f = function(s,h) {
	  return ((this._userAgent||"").indexOf(s) > -1);
	};
	
	/**
	* @Description DeviceInfo 생성자 함수
	*/
	DeviceInfo.prototype.init = function() {
	    for(var i in device.phoneInfo){
	      this._info[i] = this.f(device.phoneInfo[i]);
	    }    
	    
	    this._info.version = '';
	    this._info.name = '';
	    this._info.model = '';
	    
	    var ar = null;
	    if(this._info.iphone || this._info.ipad){
	        ar = this._userAgent.match(/OS\s([\d|\_]+\s)/i);              
	        if(ar !== null&& ar.length > 1){
	            this._info.version = ar[1];         
	        }       
	    } else if(this._info.android){
	        ar = this._userAgent.match(/Android\s([^\;]*)/i);
	        if(ar !== null&& ar.length > 1){
	            this._info.version = ar[1];
	        }   
	    }
	    this._info.version = this._info.version.replace(/\_/g,'.');
	
	    for(var x in this._info){
	        if (typeof this._info[x] == "boolean" && this._info[x] && this._info.hasOwnProperty(x)) {
	            this._info.name = x;
	            this._info.model = device.phoneInfo[x];
	        }
	    }
	    this._info.bChrome = this._info.android && (this.f('CrMo') || this.f('Chrome'));
	};
	
	/**
	* @Description Device 정보를 담은 객체를 반환
	*/
	DeviceInfo.prototype.getInfo = function() {
	  return this._info;
	};
	
	/**
	* @Description javascript모듈 지원여부 체크\n현재는 모델명만 체크, 추후 version까지 확장 예정
	* @Param (String) external js명
	* @Return (Boolean) 동작 가능 여부
	*/
	DeviceInfo.prototype.able = function(funcName) {
		try {
		  function t(s) {
			  return s.replace(/^\s\s*/,'').replace(/\s\s*$/,'');
		  }
		    var thisModel = t(this._info.model);
		    var thisVersion = t(this._info.version);
			list = device.whiteList[funcName] || [];
			
			function c(s, t) {
			  if (s.indexOf('+') > -1) {
			    var ver = s.substring(1,s.length);		    
			    var sL = ver.split('.');
			    var tL = t.split('.');
			    
			    for(var i in tL) {
			      if (sL[i]) {
	  		      if (tL[i] > sL[i]) {
	  		        return true;
	  		      } else if (tL[i] < sL[i]) {
	  		        return false;
	  		      }
			      }
			    }
			    if (sL.length > tL.length) {
			      return false;
			    }
			    return true;
			  } else {
			    return s == t;
			  }
			}
			for(var i in list) {
				if ( (thisModel||'') == list[i].model ) {
				  if( c(list[i].version, (thisVersion||'')) ) {
				   return true;
				  }
				}
			}
			return false;
		}catch(e) {
			return false;
		}
	};
	
})(this);