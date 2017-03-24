(function() {
  var previousDevice, _addClass, _doc_element, _find, _handleOrientation, _hasClass, _orientation_event, _removeClass, _supports_orientation, _user_agent;
  previousDevice = window.device;
  window.mDevice = {};
  _doc_element = window.document.documentElement;
  _user_agent = window.navigator.userAgent.toLowerCase();

  mDevice.ios = function() {
    return mDevice.iphone() || mDevice.ipod() || mDevice.ipad();
  };

  mDevice.iphone = function() {
    return _find('iphone');
  };

  mDevice.ipod = function() {
    return _find('ipod');
  };

  mDevice.ipad = function() {
    return _find('ipad');
  };

  mDevice.android = function() {
    return _find('android');
  };

  mDevice.androidPhone = function() {
    return mDevice.android() && _find('mobile');
  };

  mDevice.androidTablet = function() {
    return mDevice.android() && !_find('mobile');
  };

  mDevice.blackberry = function() {
    return _find('blackberry') || _find('bb10') || _find('rim');
  };

  mDevice.blackberryPhone = function() {
    return mDevice.blackberry() && !_find('tablet');
  };

  mDevice.blackberryTablet = function() {
    return mDevice.blackberry() && _find('tablet');
  };

  mDevice.windows = function() {
    return _find('windows');
  };

  mDevice.windowsPhone = function() {
    return mDevice.windows() && _find('phone');
  };

  mDevice.windowsTablet = function() {
    return mDevice.windows() && _find('touch');
  };

  mDevice.fxos = function() {
    return _find('(mobile; rv:') || _find('(tablet; rv:');
  };

  mDevice.fxosPhone = function() {
    return mDevice.fxos() && _find('mobile');
  };

  mDevice.fxosTablet = function() {
    return mDevice.fxos() && _find('tablet');
  };

  mDevice.mobile = function() {
    return mDevice.androidPhone() || mDevice.iphone() || mDevice.ipod() || mDevice.windowsPhone() || mDevice.blackberryPhone() || mDevice.fxosPhone();
  };

  mDevice.tablet = function() {
    return mDevice.ipad() || mDevice.androidTablet() || mDevice.blackberryTablet() || mDevice.windowsTablet() || mDevice.fxosTablet();
  };

  mDevice.portrait = function() {
    return Math.abs(window.orientation) !== 90;
  };

  mDevice.landscape = function() {
    return Math.abs(window.orientation) === 90;
  };

  mDevice.noConflict = function() {
    window.mDevice = previousDevice;
    return this;
  };

  _find = function(needle) {
    return _user_agent.indexOf(needle) !== -1;
  };

  _hasClass = function(class_name) {
    var regex;
    regex = new RegExp(class_name, 'i');
    return _doc_element.className.match(regex);
  };

  _addClass = function(class_name) {
    if (!_hasClass(class_name)) {
      return _doc_element.className += " " + class_name;
    }
  };

  _removeClass = function(class_name) {
    if (_hasClass(class_name)) {
      return _doc_element.className = _doc_element.className.replace(class_name, "");
    }
  };

  if (mDevice.ios()) {
    if (mDevice.ipad()) {
      _addClass("ios ipad tablet");
    } else if (mDevice.iphone()) {
      _addClass("ios iphone mobile");
    } else if (mDevice.ipod()) {
      _addClass("ios ipod mobile");
    }
    try {
        var ar = _user_agent.match(/OS\s([\d|\_]+\s)/i);
        if(ar !== null&& ar.length > 1){
            var v = ar[1];
            var vSplit = v.split('_');
            _addClass('v'+vSplit[0]+'_0');
        }
    }catch(e){}
  } else if (mDevice.android()) {
    if (mDevice.androidTablet()) {
      _addClass("android tablet");
    } else {
      _addClass("android mobile");
    }
    try{
        var ar = _user_agent.match(/Android\s([^\;]*)/i);
        if(ar !== null&& ar.length > 1){
            var v = ar[1].replace(/\./g,'_');
            var vSplit = v.split('_');
            var majorNum = vSplit[0];
            var minorNum = 0;
            if(majorNum >= 4) {
                minorNum = vSplit[1];
            }
            _addClass('v'+majorNum+'_'+minorNum);
        }
    }catch(e){}
  } else if (mDevice.blackberry()) {
    if (mDevice.blackberryTablet()) {
      _addClass("blackberry tablet");
    } else {
      _addClass("blackberry mobile");
    }
  } else if (mDevice.windows()) {
    if (mDevice.windowsTablet()) {
      _addClass("windows tablet");
    } else if (mDevice.windowsPhone()) {
      _addClass("windows mobile");
    } else {
      _addClass("desktop");
    }
  } else if (mDevice.fxos()) {
    if (mDevice.fxosTablet()) {
      _addClass("fxos tablet");
    } else {
      _addClass("fxos mobile");
    }
  } else {
    _addClass("desktop");
  }

  _handleOrientation = function() {
    if (mDevice.landscape()) {
      _removeClass("portrait");
      return _addClass("landscape");
    } else {
      _removeClass("landscape");
      return _addClass("portrait");
    }
  };

  _supports_orientation = "onorientationchange" in window;

  _orientation_event = _supports_orientation ? "orientationchange" : "resize";

  if (window.addEventListener) {
    window.addEventListener(_orientation_event, _handleOrientation, false);
  } else if (window.attachEvent) {
    window.attachEvent(_orientation_event, _handleOrientation);
  } else {
    window[_orientation_event] = _handleOrientation;
  }

  _handleOrientation();

}).call(this);