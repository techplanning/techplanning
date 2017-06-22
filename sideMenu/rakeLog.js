!function(e, t) {
    function n() {
        var e = navigator.userAgent.toLowerCase();
        return e.indexOf("msie") != -1 && parseInt(e.split("msie")[1])
    }
    function r(e, t) {
        e[t] = function() {
            e.push([t].concat(Array.prototype.slice.call(arguments, 0)))
        }
    }
    try {
        var o, s = "RAKE";
        if ("DEV" === rakeLogPageInfo._$RAKE_ENV)
            o = "https://pg.rake.skplanet.com:8663/log/static/js/rake/current/";
        else {
            if ("LIVE" !== rakeLogPageInfo._$RAKE_ENV)
                throw Error("Invalid $_RAKE_ENV: " + rakeLogPageInfo._$RAKE_ENV);
            o = "https://rake.skplanet.com:8663/log/static/js/rake/current/"
        }
        if (window.XMLHttpRequest && "withCredentials"in new XMLHttpRequest)
            o += "rake.bundle.js";
        else if (8 == n())
            o += "rake.bundle-ie8.js";
        else {
            if (9 != n())
                throw new Error("Unsupported IE version: " + n());
            o += "rake.bundle-ie9.js"
        }
        var i = "_$SV"
            , a = "_$cb";
        if (t[i])
            console.warn("RAKE snippet is already initialized");
        else {
            window[s] = t;
            var c, l, p, u;
            c = e.createElement("script"),
                c.type = "text/javascript",
                c.onload = _$RAKE_CALLBACK,
                c.async = !0,
                c.src = o,
                l = e.getElementsByTagName("script")[0],
                l.parentNode.insertBefore(c, l);
            var E = t;
            for (p = ["autoTrack", "create", "remove", "track", "collect", "flush", "setServerPort"],
                     u = 0; u < p.length; u++)
                r(E, p[u]);
            t[i] = 1,
                t[a] = function(e) {
                    window[s] = e
                }
        }
    } catch (e) {
        console && console.log && (console.log("Failed to execute RAKE snippet due to"),
            console.log(e))
    }
}(document, window[window.RAKE] || []);

    //function _$RAKE_CALLBACK() {
        RAKE.create({token: rakeLogPageInfo._$RAKE_TOKEN});
        RAKE.setServerPort(8663);
    //}

    var rakeLog = (function(rakeLog){
    var loggingEnable = true;
    if ("LIVE" === rakeLogPageInfo._$RAKE_ENV) {
        loggingEnable = false;
    }
    var shuttle = new Log11stClientSentinelShuttle(),
        _thisPageInfo = ( typeof rakeLogPageInfo.PageInfo !== 'undefined' ) ? rakeLogPageInfo.PageInfo : "",
        _thisPageDataMerge = ( typeof rakeLogPageInfo.rakeLogDataMerge !== 'undefined' ) ? rakeLogPageInfo.rakeLogDataMerge : false,
        nodeFilter = Array.prototype.filter,
        _thisPageButtonsFilteredBefore = document.querySelectorAll("a, button, area"),
        _thisPageButtons = nodeFilter.call(_thisPageButtonsFilteredBefore, function(ele) {
            return !ele.getAttribute("onclick") || ele.getAttribute("onclick").indexOf("rakeLog.sendRakeLog") == -1
        });

    function initRake() {
        setHeader();
    }

    function setHeader(){
        var href = location.href;
        var poc = "mw";
        if(Utils.isApp()) {
            poc = "app";
        }
        shuttle.setPage_id(_thisPageInfo.page_id);
        shuttle.setPcid(Utils.getCookie("PCID"));
        shuttle.setService_country_code("KR");
        shuttle.setService_language_code("kor");
        shuttle.setService_currency_code("KWR");
        shuttle.setPf_clf("Mobile");
        shuttle.setPoc_clf(poc);
        shuttle.setBm_clf("11번가");
        shuttle.setReserved01(Utils.getSessionId());
        shuttle.setAtrb_code(Utils.getUrlVars(href).trTypeCd);
        shuttle.setMember_no(Utils.getCookie("M_NC"));
        shuttle.setBirthyear(Utils.getBirth());
        shuttle.setGender_code(Utils.getGender());
        shuttle.setAdvrt_no(Utils.getCookie("XSITE"));
        shuttle.setPartner_cd(Utils.getCookie("PARTNER_CD"));
    }

    function pageView(action_id) {
        shuttle.setAction_id(action_id);
        shuttle.setBodyByJSonString(JSON.stringify(_thisPageInfo));
        rakeCollect();
    }

    function parentNodeSearch( ele, attr ) {
        if ( ele.getAttribute(attr) ) {
            return ele;
        } else {
            while ( ele.parentNode && ele.nodeName !== "HTML" ) {
                ele = ele.parentNode;
                if ( ele.getAttribute(attr) ) {
                    return ele;
                }
            }
            return null;
        }
        return null;
    }

    // rake button action
    function pageAction(event, gesture) {
        if ( !parentNodeSearch(this, "data-log-actionid-area") || !parentNodeSearch(this, "data-log-actionid-label") ) {
            return;
        };

        var _thisGesture = event.type;

        if(gesture) {
            _thisGesture = gesture;
        }
        var _this = this,
            _thisActionIdArea = parentNodeSearch(_this, "data-log-actionid-area").getAttribute("data-log-actionid-area"),
            _thisActionIdLabel = _this.getAttribute("data-log-actionid-label") || parentNodeSearch(_this, "data-log-actionid-label").getAttribute("data-log-actionid-label"),
            _thisActionId = _thisGesture + ( _thisActionIdArea ? "." + _thisActionIdArea : "" ) + ( _thisActionIdLabel ? "." + _thisActionIdLabel : ""),
            _thisLogBody

        if ( _this.nodeName === "SELECT" ) {
            _thisLogBody = _this.options[_this.selectedIndex].getAttribute("data-log-body") ? JSON.parse( _this.options[_this.selectedIndex].getAttribute("data-log-body").replace(/'/g, '"') ) : {};
        } else {
            _thisLogBody = _this.getAttribute("data-log-body") ? JSON.parse( _this.getAttribute("data-log-body").replace(/'/g, '"') ) : {};
        }

        if(!_thisActionIdArea || !_thisActionIdLabel) { return;}

        shuttle.setAction_id(_thisActionId);

        if(_this.getAttribute("href") && _this.getAttribute("href").indexOf("http://") > -1) {
            _thisLogBody.link_url = _this.getAttribute("href") || "";
        }

        if(_thisLogBody.content_type == "PRODUCT") {
            _thisLogBody.product_no = _thisLogBody.content_no;
            _thisLogBody.product_name = _thisLogBody.content_name;
        }

        if(_thisPageDataMerge) {
            _thisLogBody = Utils.dataMerge(_thisLogBody, _thisPageInfo);
        }

        shuttle.setBodyByJSonString(JSON.stringify(_thisLogBody));
        rakeCollect();
    }

    function rakeCollect() {
        RAKE.collect({payload:shuttle.getImmutableJSONObject()});

        RAKE.flush({
            timeoutAsMillis: 15000,
            successCallback: function() { Utils.consoleLog('USER SUCCESS CALLBACK') },
            failureCallback: function() { Utils.consoleLog('USER FAILURE CALLBACK') }
        })
    };

    var Utils = {
        dataMerge: function(original, target) {
            for ( var key in target ) {
                if ( original[key] === undefined ) {
                    original[key] = target[key];
                }
            }
            return original;
        },
        getSessionId: function() {
            if(this.isApp()) {
                return rakeLogPageInfo.AppSessionId;
            }
            var sessionId = this.getCookie("rakeSessionId");

            if(!sessionId) {
                var pcId = this.getCookie('PCID');
                var currentTimeMillis = new Date().getTime();
                sessionId = pcId+''+currentTimeMillis;
            }
            this.setCookie("rakeSessionId", sessionId, 30);
            return sessionId;
        },
        getUrlVars: function(url) {
            var vars = [], hash;
            var hashes = url.slice(url.indexOf('?') + 1).split('&');

            for(var i = 0; i < hashes.length; i++)
            {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        },
        setCookie: function(key, value, expires) {
            var _domain = '; domain=.11st.co.kr';
            var _path = '; path=/';
            var _expires = '';
            if ( expires != null ) {
                var date = new Date();
                date.setTime(date.getTime() + (expires * 60 * 1000));
                _expires = '; expires=' + date.toGMTString();
            }
            document.cookie = key + '=' + value + _expires + _domain + _path;
        },
        getCookie: function(key) {
            var keyString = key + '=';
            var cookieArray = document.cookie.split(';');
            for(var i = 0; i < cookieArray.length; i++) {
                var cookie = cookieArray[i];
                while (cookie.charAt(0) == ' ')
                {
                    cookie = cookie.substring(1, cookie.length);
                }
                if (cookie.indexOf(keyString) == 0) return cookie.substring(keyString.length, cookie.length);
            }
            return "";
        },
        getTMCookie : function(ckIdIndex, cookieName){
            var COOKIE_ID_ARR = ["TP", "TD", "TT", "TM", "TW"];
            var classCookies = decodeURIComponent(this.getCookie(COOKIE_ID_ARR[ckIdIndex]));
            var subCookieValue = "";
            var subCookies = classCookies.split('#');
            if(subCookies != null && subCookies.length > 0) {
                for(var index = 0; index < subCookies.length; index++) {
                    if(subCookies[index].split('|')[0] == cookieName) {
                        var subCookie = subCookies[index].split('|');
                        if(subCookie.length > 1) {
                            subCookieValue = subCookie[1];
                            return subCookieValue;
                        }
                    }
                }
            }

            return subCookieValue;
        },
        isApp: function() {
            var appType = this.getCookie('appType');
            if (appType.indexOf('appmw') > -1) {
                return true;
            } else {
                return false;
            }
        },
        getBirth: function() {
            return this.getTMCookie(0, "HODY");
        },
        getGender: function() {
            var gender = this.getTMCookie(0, "GND");
            if(gender != null && gender != "undefined" && gender.length > 0
                && (gender == "10"|| gender == "20")) {
                gender = gender == "10" ? "M" : "F";
            }
            return gender;
        },
        consoleLog: function(message) {
            loggingEnable && console && console.log && console.log(message);
        }
    };

    initRake();

    window.addEventListener("pageshow", function() {
        pageView('page_show');
    }, false);

    window.addEventListener("DOMContentLoaded",  function(){
        pageView('dom_content_loaded');
    });

    // rake action button 및 a 에 적용
    _thisPageButtons.forEach( function(ele) {
        ele.addEventListener("click", pageAction, false);
    });

    rakeLog.refresh = function() {
        pageView('page_show');
        pageView('dom_content_loaded');

        _thisPageButtonsFilteredBefore = document.querySelectorAll("a, button, area");
        _thisPageButtons = nodeFilter.call(_thisPageButtonsFilteredBefore, function(ele) {
            return !ele.getAttribute("onclick") || ele.getAttribute("onclick").indexOf("rakeLog.sendRakeLog") == -1
        });

        _thisPageButtons.forEach( function(ele) {
            ele.removeEventListener("click", pageAction, false);
            ele.addEventListener("click", pageAction, false);
        });
    }

    rakeLog.sendRakeLog = function(ele, gesture) {
        pageAction.call(ele, event, gesture);
    };

    return rakeLog;
}(window.rakeLog || {}));
