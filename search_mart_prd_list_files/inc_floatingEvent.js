(function() {
    function init() {
        var appType = getCookie('appType');
        if('appmw' === appType || 'appmwi' === appType) {
            return;
        }
        var pagePath = window.location.pathname + window.location.search;

        var params = {
            url : "http://m.11st.co.kr/MW/jsp/api/event/floatingEvent.jsp?inflowUrl="+encodeURIComponent(pagePath),
            method: "post",
            success : function(result) {
                try{
                    if(result) {
                        var obj = JSON.parse(result);
                        if (result) {
                            displayBanner(obj);
                        }
                    }

                } catch(e) {}

            },
            error: function(e) {console.log(e);}
        };
        callAjax(params)
    };

    function displayBanner(data) {
        if(data.floatIcon) {
            var wrap = document.createElement('div');
            wrap.setAttribute('id', 'floatWrap');
            wrap.setAttribute('style', 'position: absolute;width: 35%;top: 55%;left: 60%;');
            document.body.appendChild(wrap);

            var iconHtml = '<div class="closeArea" id="floatCloseArea" style="position: absolute;top: 0;right: 35%;width: 15%;background-size: cover;z-index: 20;">';
                iconHtml += '<a href="#"><img src="http://i.011st.com/ui_img/cm_display/2016/07/MPSM/120-15/float/close.png" alt="" width="100%;"></a>';
                iconHtml += '</div>';
                iconHtml += '<div class="bnrArea" id="floatIconArea" style="position: relative;width: 60%;background-size: cover;z-index: 10;">';
                iconHtml += '<a href="#"><img src="'+data.floatIcon+'" alt="" width="100%"></a>';
                iconHtml += '</div>';

            document.getElementById('floatWrap').innerHTML = iconHtml;

            var floatIconArea = document.getElementById('floatIconArea');
            floatIconArea.addEventListener('click', function(){
                wrap.setAttribute('style', 'display:none');
                eventProc(data);
            });

            var floatCloseArea = document.getElementById('floatCloseArea');
            floatCloseArea.addEventListener('click', function(){
                wrap.setAttribute('style', 'display:none');
            });

        }
    }

    function eventProc(data) {
        var procUrl = data.eventProcUrl;
        if(procUrl) {
            var params = {
                url : procUrl,
                method:"post",
                success : function(result) {
                    var obj = JSON.parse(result);
                    var wrap = document.createElement('div');
                    wrap.setAttribute('id', 'floatAlertWrap');
                    wrap.setAttribute('style', 'position: absolute;width: 80%;top: 25%;left: 10%;z-index:100;border:1px solid #ccc;background: #fff;');
                    document.body.appendChild(wrap);

                    var alertHtml = '';
                    if(obj.message.rcode == '101' || obj.message.rcode == '102' || obj.message.rcode == '201') {
                        var message = obj.message.text.replace(/\n/g, "<br />");

                        alertHtml += '<div style="width:50%;position: absolute;left:50%;margin-left: -25%;top:10%;"><img src="http://i.011st.com/ui_img/cm_display/2016/12/PM/698-12/ic_01.png" alt="" style="width:100%"></div>';
                        alertHtml += '<div style="position: absolute;bottom: 0%;left: 0;width: 100%;background-size: cover;z-index: 20;" id="floatAlertCloseBtn">';
                        var linkUrl = obj.rightButton.url;
                        if(obj.message.rcode == '201') {
                            linkUrl = "javascript:void(0);";
                        }
                        alertHtml += '<a href="' + linkUrl + '"><img src="http://i.011st.com/ui_img/cm_display/2016/12/PM/698-12/p_btn_01.png" alt="È®ÀÎ" width="100%;" id="floatAlertCloseBtn"></a>';
                        alertHtml += '</div>';
                        alertHtml += '<div class="gift-txt" style="text-align: center;position: absolute;top: 40%;width: 100%;font-size: 1.0em;letter-spacing: -2px;"><span>'+message+'</span></div>';
                        alertHtml += '<img src="http://i.011st.com/ui_img/cm_display/2016/12/PM/698-12/p_03_1.png" alt="" width="100%;">';
                    } else if(obj.message.rcode == '202') {
                        document.location.href = 'https://m.11st.co.kr/MW/Login/login.tmall?returnUrl='+encodeURIComponent(document.URL);
                    } else {
                        alert(obj.message.text);
                        return;
                    }

                    document.getElementById('floatAlertWrap').innerHTML = alertHtml;

                    var floatAlertCloseBtn = document.getElementById('floatAlertCloseBtn');
                    floatAlertCloseBtn.addEventListener('click', function(){
                        wrap.setAttribute('style', 'display:none');
                    });

                },
                error: function(e) {console.log(e);}
            };
            callAjax(params);
        } else {
            document.location.href = 'https://m.11st.co.kr/MW/Login/login.tmall?returnUrl='+encodeURIComponent(document.URL);
        }

    }

    function setCookie(cName, value, expiredays) {
        var todayDate = new Date();
        todayDate.setSeconds(todayDate.getDate() + 5);
        document.cookie = cName + "=" + escape(value) + "; path=/; expires="
            + todayDate.toGMTString() + ";";
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

    function callAjax(s) {
        var xhr = window.ActiveXObject ? new window.ActiveXObject('Microsoft.XMLHTTP') : new window.XMLHttpRequest();
        var method = s.method ? s.method : 'get';
        var async = s.async ? s.async : true;
        try {
            if (s.param && s.param != "") {
                xhr.open(method, url.url, async);
                var contentType = url.contentType ? s.contentType : "application/x-www-form-urlencoded";
                xhr.setRequestHeader("Content-type", contentType);
                xhr.setRequestHeader("Content-length", s.param.length);
                xhr.setRequestHeader("Connection", "close");
                xhr.send(s.param);
            } else {
                xhr.open(method, s.url, async);
                xhr.send(null);
            }

            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    var data;
                    if (xhr.status == 200) {
                        data = xhr.responseText;
                        if(s.success) s.success(data);
                    }
                }
            };
        } catch (e){
            if(s.error) s.error(e);
        }
    };

    init();


})();
