/**
 * 
 */
if (typeof tmall !== 'object') {
    var tmall = {};
}

tmall.order = tmall.order || {};

if (typeof mwUI !== 'object') {
    var mwUI = mwUI || {};
}

tmall.order.utils = (function(win, doc, Order, $) {
	var Utils = {		
			//값 존재 여부 확인. 선언되지 않은 변수/ 빈공란의 문자열도 공백으로 반환 
			validation: {
				is_null: function(value) {
	                var bool = false;

	                if (typeof value == 'undefined' || value == null) {
	                    bool = true;
	                } else if (typeof value == 'string' && $.trim(value) == '') {
	                    bool = true;
	                }

	                return bool;
	            }
			},
			ajax: function(options) {
				var defaults = {
		                url: '',
		                type: 'GET',
		                dataType: 'json',
		                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
				};
		        $.ajax($.extend({}, defaults, options));
			},
			autoTab: function(limit, formName, nodeName, that) {
				var form = doc.forms[formName],
						el = form.elements[nodeName],
						len = that.value.length;

				if (limit <= len) {
					el.value = '';
					el.focus();
				}
			},
//			launchCenter: function(url, name, w, h, scroll) {	
//	            var str = 'height=' + h + ',innerHeight=' + h + ',width=' + w + ',innerWidth=' + w + ',status=no,scrollbars=' + scroll,
//	                scr = win.screen,
//	                ah, aw, xc, yc;
//
//	            if (scr) {
//	                ah = scr.availHeight - 30;
//	                aw = scr.availWidth - 10;
//	                xc = (aw - w) >> 1;
//	                yc = (ah - h) >> 1;
//	                str = str + ',left=' + xc + ',screenX=' + xc + ',top=' + yc + ',screenY=' + yc;
//	            }
//
//	            return win.open(url, name, str);
//	        },
	        strLength: function(str) {
	            var bytes = 0,
	                i = 0;

	            for (i = 0; i < str.length; i++) {
	                bytes += (str.charCodeAt(i) > 128) ? 2 : 1;
	            }
	            return bytes;
	        },
	        nvl: function(str, replaceStr) {	//숫자
	            return (this.validation.is_null(str)) ? replaceStr : parseInt(str, 10);
	        },
	        validationCheck: function(field, formName, maxLength, nullAble, minLength) {
	            var value = field.value.trim(),
	                bytes = this.strLength(value),
	                min = this.nvl(minLength, 0);

	            if (bytes > parseInt(maxLength)) {
	                alert(formName + ' ' + maxLength + 'byte이내로 입력해주세요.');
	                field.focus();
	                field.select();
	                return false;
	            } else if (bytes == 0) {
	                if (!nullAble) {
	                    alert(formName + ' 정확히 입력해주세요.');
	                    field.focus();
	                    field.select();
	                    return false;
	                }
	            } else if (bytes < min && min != 0) {
	                alert('입력하신 항목이 유효하지 않습니다.\n확인후 다시 입력하여 주십시오.');
	                field.focus();
	                field.select();
	                return false;
	            }

	            return true;
	        },
	        cutStringByte: function(str, maxLength, obj) {
	            var value = str,
	                bytes = this.strLength(value),
	                isOver = false;

	            if (bytes > maxLength) {
	                bytes = maxLength;
	                isOver = true;
	            }
	            value = value.substr(0, bytes);

	            if (obj) {
	                obj.value = value;
	                if (isOver) {
	                    alert(maxLength + "byte를 초과했습니다.");
	                }
	            }

	            return value;
	        },
	        onlyEngInput: function(str) {
	            //var reg = /[^A-Za-z]/g;
	            //return !reg.test(str);
	        	 var c;
	        	  var i;
	        	  for (i = 0; i < str.length; i++) {
	        	      c = str.charAt(i);

	        	      if (!((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c == ' '))) {
	        	          return false;
	        	      }
	        	  }
	        	  return true;
	        },
	        onlyEngNumberInput: function(str) { // 영문+숫자 입력 가능
	          var c;
	          var i;
	          for (i = 0; i < str.length; i++) {
	              c = str.charAt(i);

	              if (!((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c == ' ') || (c >= '0' && c <= '9'))) {
	                  return false;
	              }
	          }
	          return true;
	        },
	        //숫자에 , 넣기.
	        formatToCommaNum: function(x) {
	            var reg = /(^[+-]?\d+)(\d{3})/,
	                v;

	            if (isNaN(x) || x.length == 0) {
	                alert('숫자만 입력 하세요');
	                return false;
	            }

	            v = String(Number(x)) + '';
	            while (reg.test(v)) {
	                v = v.replace(reg, '$1' + ',' + '$2');
	            }

	            return v;
	        },
	        numbersOnly: function(e, decimal) {
	            var charCode = (e.which) ? e.which : e.keyCode;
	        	if(charCode < 48 || charCode > 57){
	                return false;
	            }
	            return true;	          
	        },
	        //영문,숫자만 입력가능
	        numberAndChar: function(e) {
	            var charCode = (e.which) ? e.which : e.keyCode,
	                keychar = String.fromCharCode(charCode),
	                reg = /^\w+$/; ///(^[a-zA-Z0-9\b]+$)/;

	            if (!reg.test(keychar)) {
	                return false;
	            } else {
	                return;
	            }
	        },
//	        toTimeObject: function(time) {
//	            var year = time.substr(0, 4),
//	                month = time.substr(4, 2) - 1,
//	                day = time.substr(6, 2),
//	                hour = time.substr(8, 2),
//	                min = time.substr(10, 2),
//	                sec = time.substr(12, 2);
//	            return new Date(year, month, day, hour, min, sec);
//	        },
//	        calcTextareaValueLength: function(field, destObj, len) {
//	            var value = field.value.trim(),
//	                bytes = this.strLength(value),
//	                limit = 80;
//
//	            if (bytes > limit) {
//	                bytes = limit;
//	            }
//	            if (bytes > len) {
//	                alert(len + 'Byte까지 입력이 가능합니다.');
//	                field.value = value.substr(0, len);
//	                return;
//	            } else {
//	                destObj.innerHTML = bytes;
//	            }
//	            /*var str = field.value,
//	                one_char = "",
//	                li_byte = 0,
//	                li_len = 0;
//
//	            for (var i = 0; i < str.length; i++) {
//	                one_char = str.charAt(i);
//	                if (escape(one_char).length > 4) {
//	                    li_byte += 2;
//	                } else {
//	                    li_byte++;
//	                }
//
//	                if (li_byte <= 80) {
//	                    li_len = i + 1;
//	                }
//	            }
//
//	            if (li_byte > len) {
//	                alert(len + "Byte까지 입력이 가능합니다.");
//	                field.value = str.substr(0, li_len);
//	                return;
//	            } else {
//	                destObj.innerHTML = li_byte;
//	            }*/
//	        },
	        cutString: function(aro_name, ari_max) {
	            var ls_str = aro_name.value, // 이벤트가 일어난 컨트롤의 value 값
	                li_str_len = ls_str.length, // 전체길이
	                li_max = ari_max, // 제한할 글자수 크기
	                i = 0, // for문에 사용
	                li_byte = 0, // 한글일경우는 2 그밗에는 1을 더함
	                li_len = 0, // substring하기 위해서 사용
	                ls_one_char = '', // 한글자씩 검사한다
	                ls_str2 = ''; // 글자수를 초과하면 제한할수 글자전까지만 보여준다.

	            for (i = 0; i < li_str_len; i++) {	
	                ls_one_char = ls_str.charAt(i);	
	                if (escape(ls_one_char).length > 4) {
	                    li_byte++;
	                }else {
	                    li_byte++;
	                }	
	                if (li_byte <= li_max) {
	                    li_len = i + 1;
	                }
	            }	
	            if (li_byte > li_max) {
	                alert(li_max + ' 자를 초과 입력할수 없습니다. \n초과된 내용은 자동으로 삭제 됩니다. ');
	                ls_str2 = ls_str.substr(0, li_len);
	                aro_name.value = ls_str2;

	            }
	            aro_name.focus();
	        },
	        cutOverString: function(aro_name, ari_max) {
	        	var ls_str = aro_name.value, 
	                li_str_len = ls_str.length, // 전체길이
	                li_max = ari_max, // 제한할 글자수 크기
	                i = 0, // for문에 사용
	                li_byte = 0, // 한글일경우는 2 그밗에는 1을 더함
	                li_len = 0, // substring하기 위해서 사용
	                ls_one_char = '', // 한글자씩 검사한다
	                ls_str2 = ''; // 글자수를 초과하면 제한할수 글자전까지만 보여준다.

	            for (i = 0; i < li_str_len; i++) {	
	                ls_one_char = ls_str.charAt(i);	
	                if (escape(ls_one_char).length > 4) {
	                    li_byte = li_byte+2;
	                }else {
	                    li_byte++;
	                }	
	                if (li_byte <= li_max) {
	                    li_len = i + 1;
	                }
	            }	
	            if (li_byte > li_max) {
	                alert('한글' + (li_max/2) + '자,' + '영문' + li_max + ' 자를 초과 입력할수 없습니다. \n초과된 내용은 자동으로 삭제 됩니다. ');
	                ls_str2 = ls_str.substr(0, li_len);
                	aro_name.value = ls_str2;
	            }
	        },
	        sortNumber: function(a, b) {
	            return a - b;
	        },
	        sortNumberCardFree: function(a, b) {
	            return a.month - b.month;
	        },	        
	        chkBizNo: function(bizNo) {
	        	 var a = [],
	                	b = [1, 3, 7, 1, 3, 7, 1, 3, 5],
	                	sum = 0,
	                	z = 0,
	                	y, i;
	        	 for (i = 0; i < 10; i++) {
	                 a[i] = bizNo.substr(i, 1);
	             }
	             for (i = 0; i < 9; i++) {
	                 sum = sum + (a[i] * b[i]);
	             }
	             sum = sum + ((a[8] * 5) / 10);
	             y = (sum - (sum % 1)) % 10;
	             z = (y == 0) ? 0 : 10 - y;

	             if (z != a[9]) {
	                 return false;
	             }
	             return true;
	        },
	        setMCookie: function(cName, value, min) {
	            var expdate = new Date();
	            expdate.setTime(expdate.getTime() + (min * 60 * 1000));
	            document.cookie = cName + "=" + value + "; path=/; domain=" + document.domain + "; expires=" + expdate.toGMTString();
	        },
	        getCookie: function(cName) {
	            var cookieData = document.cookie,
	                cValue = '',
	                start, end;

	            cName = cName + '=';
	            start = cookieData.indexOf(cName);

	            if (start != -1) {
	                start += cName.length;
	                end = cookieData.indexOf(';', start);
	                if (end == -1) {
	                    end = cookieData.length;
	                }
	                cValue = cookieData.substring(start, end);
	            }
	            return unescape(cValue);
	        },
			callAppScheme_line: function(scheme) { // inc_shoppingTak_sns.js에 있는 executeAppCommand와 같음. 단 irame 제거시 setTimeout 한것만 다름.
				  var appActionID = "appExecuteFrame";
				  var actionFrame = doc.createElement("IFRAME");

				  actionFrame.id = appActionID;
				  actionFrame.name = actionFrame.id;
				  actionFrame.width = 0;
				  actionFrame.height = 0;
				  actionFrame.src = scheme;

				  doc.body.appendChild(actionFrame);
				  setTimeout(function() {
				      doc.body.removeChild(actionFrame);
				  }, 100);
			},
	        openConactList: function() {
	            var appAction = "app://contact/open/";

	            this.callAppScheme_line(appAction + encodeURIComponent(JSON.stringify(Order.dlvInfo.makeContactData())));
	            return false;
	        },
	        openConactListDeal: function() {
				var appAction = "deal://contact/open/";
				this.callAppScheme_line(appAction + encodeURIComponent(JSON.stringify(Order.dlvInfo.makeContactData()))) ;
				return false;
			},
			openConactListOption : function(opt) {
	            var appAction = "app://contact/open/";
	            this.callAppScheme_line(appAction + encodeURIComponent(JSON.stringify(Order.dlvInfo.makeContactDataOption(opt))));
	            return false;
	        },
	        openConactListDealOption: function(opt) {
	        	var appAction = "deal://contact/open/";
	        	this.callAppScheme_line(appAction + encodeURIComponent(JSON.stringify(Order.dlvInfo.makeContactDataOption(opt)))) ;
	        	return false;
	        },
            //특수문자 체크
	        checkObjStr: function(str){
	        	var stringRegx=/^[0-9|a-z|ㄱ-ㅎ|ㅏ-ㅣ|A-Z|가-힝]*$/;
        	    if(!stringRegx.test(str)) { 
        	    	alert("특수문자는 입력할 수 없습니다.");
        	    	return false;
        	    }else{
        	    	return true;
        	    }

	        },
	        callPayClickCode: function() {
	        	var appVal = Order.pay.getSelPayment(),
        			   clickCode = null;
//	            console.log(appVal);
	            switch (appVal) {
	                case "SYRUP":
	                    clickCode = "MORPM001";
	                    break;
	                case "3101":
	                    clickCode = "MORPM002";
	                    break;
	                case "5101":
	                    clickCode = "MORPM003";
	                    break;
	                case "4101":
	                    clickCode = "MORPM004";
	                    break;
	                case "6101":
	                    clickCode = "MORPM005";
	                    break;
	                case "4203":
	                    clickCode = "MORPM006";
	                    break;
	                case "7201":
	                    clickCode = "MORPM007";
	                    break;
	                case "3201":
	                    clickCode = "MORPM008";
	                    break;
	                case "7301":
	                    clickCode = "MORPM009";
	                    break;
	            }
	            if (clickCode) {
	                win.callStatAjax('MORPM', clickCode);
	            }
	        },
	        //레이어Toggle
	        layerToggle: function(ele, btn, all) {
	            var element = doc.getElementById(ele),
	                elStyle = element.style,
	                pos, posTop, posHeight, posParent, elementParent;

	            elStyle.display = (elStyle.display != 'none') ? 'none' : 'block';

	            if (btn && (elStyle.display != 'none')) {
	                pos = (doc.getElementById(btn)) ? doc.getElementById(btn) : btn;
	                if (pos) {
	                    posTop = pos.offsetTop;
	                    posHeight = pos.offsetHeight;

	                    if (element.offsetParent != pos.offsetParent) {
	                        posParent = pos.offsetParent;
	                        while (posParent.offsetParent) {
	                            posTop += posParent.offsetTop;
	                            posParent = posParent.offsetParent;
	                        }

	                        elementParent = element.offsetParent;
	                        while (elementParent.offsetParent) {
	                            posTop -= elementParent.offsetTop;
	                            elementParent = elementParent.offsetParent;
	                        }
	                    }
	                    elStyle.top = posTop + posHeight + 'px';
	                }
	            }
	            if (all && (elStyle.display != 'none')) {
	                this.classClose(ele, all);
	            }
	        },
	        //help layer닫기
	        helpClose: function(ele) {
	            ele.parentNode.style.display = 'none';
	        },
	        //div열기
	        divOpen: function(ele, all) {
	            var element = doc.getElementById(ele);
	            element.style.display = 'block';
	            if (all) {
	                this.classClose(ele, all);
	            }
	        },
	        //같은 class 닫기
	        classClose: function(ele, all) {
	            var elses, elsesLen, elStyle, el, i;

	            if (doc.getElementsByClassName) {
	                elses = doc.getElementsByClassName(all);
	            } else {
	                var getElementsByClassName = function(className) {
	                    var regEx = new RegExp('(^| )' + className + '( |$)'),
	                        nodes = [],
	                        elements = doc.body.getElementsByTagName("*"),
	                        len = elements.length,
	                        i = 0;

	                    for (i = 0; i < len; i++) {
	                        if (regEx.test(elements[i].className)) {
	                            nodes.push(elements[i]);
	                        }
	                    }
	                    elements = null;
	                    return nodes;
	                };
	                elses = getElementsByClassName(all);
	            }
	            elsesLen = elses.length;
	            for (i = 0; i < elsesLen; i++) {
	                el = elses[i];
	                elStyle = el.style;
	                if ((elStyle.display != 'none') && (el.id != ele)) {
	                    elStyle.display = 'none';
	                }
	            }
	        },
	        //더보기 className이용
	        //주문서에서는 사용안됨. 결제수단별 페이지에서 사용>orderCommon.js 파일 머지 필요 
	        moreToggle: function(ele, btn, className, textOpen, textClose) {
	            var element = doc.getElementById(ele),
	                btns = btn;
	            if (element.className.lastIndexOf(className) < 0) {
	                element.className += " " + className;
	                btns.firstChild.nodeValue = textClose;
	            } else {
	                element.className = element.className.replace(" " + className, "");
	                btns.firstChild.nodeValue = textOpen;
	            }
	        },
	        //토글, 버튼class변경
	        useToggle: function(ele, btn, btnClass) {
	            var element = doc.getElementById(ele),
	                elStyle = element.style,
	                btns = (doc.getElementById(btn)) ? doc.getElementById(btn) : btn;

	            if (elStyle.display != 'none') {
	                elStyle.display = 'none';
	                btns.className = btns.className.replace(' ' + btnClass, '');
	            } else {
	                elStyle.display = 'block';
	                btns.className += ' ' + btnClass;
	                //console.log(btnClass);
	            }
	        },
	        //레이어 Show/Hidden 처리
	        displayLayer: function(id, disp, inn) {
	            var obj = doc.getElementById(id),
	                temp_value;

	            obj.style.display = disp;

	            if (inn) {
	                temp_value = obj.innerHTML;
	                obj.innerHTML = temp_value;
	            }
	        },
	        dlvAddrInfo: {
	            dlvAddrListModel: null,
	            recentAddrModel: null,
	            baseAddrModel: null,
	            setDlvAddrList: function(model) {
	                this.dlvAddrListModel = model;
	            },
	            getDlvAddrList: function() {
	                return this.dlvAddrListModel;
	            },
	            setRecentAddr: function(model) {
	                this.recentAddrModel = model;
	            },
	            getRecentAddr: function() {
	                return this.recentAddrModel;
	            },
	            setBaseAddr: function(model) {
	                this.baseAddrModel = model;
	            },
	            getBaseAddr: function() {
	                return this.baseAddrModel;
	            }
	        },
	        getRadioValue: function(obj, cnt) {
	            var value = '',
	                i = 0;

	            for (i = 0; i < cnt; i++) {
	                if (obj[i].checked) {
	                    value = obj[i].value;
	                }
	            }
	            return value;
	        },
	        useToggleForFreeGift: function(element, lyr_id, chkBoxId) {
	            var chkBox = doc.getElementById(chkBoxId),
	                giftInf = doc.getElementById(lyr_id);

	            mwUI.viewToggle(lyr_id, element, 'on', '신청', '취소');
	            chkBox.checked = (giftInf.style.display != 'none') ? true : false;
	        },
	        selEml: function(objEmlsel, objEml2) {
	            if (objEmlsel.value != null && objEmlsel.value == '') {
	                objEmlsel.style.display = 'none';
	                objEml2.value = '';
	                objEml2.style.display = '';
	            } else {
	                objEml2.value = objEmlsel.value;
	            }
	        },
	        movFocus: function(limit, formName, nodeName, that) {
	            var form = doc.forms[formName],
	                el = form.elements[nodeName],
	                len = that.value.length;

	            if (!Order.common._isIphoneF) {
	                if (limit <= len) {
	                    el.value = '';
	                    el.focus();
	                }
	            }
	        },
//	        confirmAndFocus: function(alertMsg, confirmMsg, focusObj) {
//	            if (Order.common._isIphoneF) {
//	                setTimeout(function() {
//	                    alert(alertMsg);
//	                }, 500);
//	            } else {
//	                if (confirm(alertMsg + '\n' + confirmMsg)) {
//	                    if (focusObj) {
//	                        focusObj.focus();
//	                    }
//	                }
//	            }
//	        },
	        selectCtlRemoveAll: function(selectCtl) {
	            while (selectCtl.firstChild) {
	                selectCtl.removeChild(selectCtl.firstChild);
	            }
	        },
	        changeStaxView: function(ele) {
	            this.divOpen(ele, 'ctax');
	        },
	        orderDlvTab: function(id) {
	            var items, i;

	            if (!doc.getElementById(id)) {
	                return;
	            }
	            items = doc.querySelectorAll('#' + id + ' a');
	            for (i = 0; i < items.length; i++) {
	                items[i].addEventListener('click', Order.authAgree.setAgreeInfoAdd, false);
	            }
	        },
	        getCurTabNm: function(id) {
	            var tabnm = '',
	                items = doc.querySelectorAll('#' + id + ' a'),
	                i;

	            for (i = 0; i < items.length; i++) {
	                if (items[i].parentNode.className.lastIndexOf('on') > -1) {
	                    tabnm = items[i].href.split('#')[1];
	                }
	            }
	            return tabnm;
	        },
	        timeClick: function(self) {
	            var parent = self.parentNode,
	                items = null,
	                itemParent = null;

	            if (parent.className.lastIndexOf('on') < 0) {
	                parent.className += ' on';
	            } else {
	                return false;
	            }
	            while (parent.nodeName && parent.nodeName.toLowerCase() != 'table') {
	                parent = parent.parentNode;
	            }

	            items = parent.getElementsByTagName('button');
	            for (var i = 0; i < items.length; i++) {
	                if (items[i] == self) {
	                    continue;
	                }
	                itemParent = items[i].parentNode;
	                itemParent.className = (itemParent.className.lastIndexOf(' on') < 0) ? itemParent.className.replace('on', '') : itemParent.className.replace(' on', '');
	            }
	        },
	        setUIPriceFix: function(){
	        	//가격layer 고정
	        	if(window.attachEvent) window.attachEvent("onload", Order.ui.uiPricefix(Order));
	        	else window.addEventListener("load", Order.ui.uiPricefix(Order), false);
	        },	      
	       check_fgnno: function(fgnno) { //외국인 번호 체크
		     	var sum=0;
		     	var odd=0;
		     	buf = new Array(13);
		     	for(i=0; i<13; i++) {
		     		buf[i]=parseInt(fgnno.charAt(i));
		     	}
		     	odd = buf[7]*10 + buf[8];
		     	if(odd%2 != 0) {
		     		return false;
		     	}
		     	if( (buf[11]!=6) && (buf[11]!=7) && (buf[11]!=8) && (buf[11]!=9) ) {
		     		return false;
		     	}
		     	multipliers = [2,3,4,5,6,7,8,9,2,3,4,5];
		     	for(i=0, sum=0; i<12; i++) {
		     		sum += (buf[i] *= multipliers[i]);
		     	}
		     	sum = 11 - (sum%11);
		     	if(sum >= 10) {
		     		sum -= 10;
		     	}
		     	sum += 2;
		     	if(sum >= 10) {
		     		sum -= 10;
		     	}
		     	if(sum != buf[12]) {
		     		return false
		     	}
		     	return true;
	        },
	        HashMap: (function() {
	            var HashMap = function() {
	                this.map = [];
	            };

	            HashMap.prototype = {
	                put: function(key, value) {
	                    this.map[key] = value;
	                },
	                get: function(key) {
	                    return this.map[key];
	                },
	                getAll: function() {
	                    return this.map;
	                },
	                clear: function() {
	                    this.map = [];
	                },
	                getKeys: function() {
	                    var keys = [];
	                    for (var i in this.map) {
	                        keys.push(i);
	                    }
	                    return keys;
	                }
	            };
	            return HashMap;
	        })()
	};
	return Utils;
})(window, document, tmall.order, jQuery);

String.prototype.isBiznum = function() {
    var arg = arguments[0] ? arguments[0] : "",
        reg = new RegExp('[0-9]{3}' + arg + '[0-9]{2}' + arg + '[0-9]{5}$'),
        biznum = this.match(reg),
        sum, num, i;

    if (biznum == null) {
        return false;
    } else {
        biznum = biznum.toString(); //.num().toString();
    }

    sum = parseInt(biznum.charAt(0));
    num = [0, 3, 7, 1, 3, 7, 1, 3];
    for (i = 1; i < 8; i++) {
        sum += (parseInt(biznum.charAt(i)) * num[i]) % 10;
    }
    sum += Math.floor(parseInt(parseInt(biznum.charAt(8))) * 5 / 10);
    sum += (parseInt(biznum.charAt(8)) * 5) % 10 + parseInt(biznum.charAt(9));

    return (sum % 10 == 0) ? true : false;
};
String.prototype.isMobile = function() {
    var arg = arguments[0] ? arguments[0] : "",
        reg = new RegExp('01[016789]' + arg + '[1-9]{1}[0-9]{2,3}' + arg + '[0-9]{4}$');
    return reg.test(this);
};
String.prototype.isJumin = function() {
    var arg = arguments[0] ? arguments[0] : "",
        reg = new RegExp('[0-9]{2}[01]{1}[0-9]{1}[0123]{1}[0-9]{1}' + arg + '[1234]{1}[0-9]{6}$'),
        jumin = this.match(reg),
        birthYY, birthMM, birthDD, birthDay, sum, num, last, i;

    if (jumin == null) {
        return false;
    } else {
        jumin = jumin.toString(); //.num().toString();
    }

    //생년월일 체크
    birthYY = (parseInt(jumin.charAt(6)) == (1 || 2)) ? '19' : '20';
    birthYY += jumin.substr(0, 2);
    birthMM = jumin.substr(2, 2) - 1;
    birthDD = jumin.substr(4, 2);
    birthDay = new Date(birthYY, birthMM, birthDD);
    if (birthDay.getYear() % 100 != parseInt(jumin.substr(0, 2), 10) || birthDay.getMonth() != parseInt(birthMM, 10) || birthDay.getDate() != parseInt(birthDD, 10)) {
        return false;
    }

    sum = 0;
    num = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
    last = parseInt(jumin.charAt(12));
    for (i = 0; i < 12; i++) {
        sum += parseInt(jumin.charAt(i)) * num[i];
    }
    return ((11 - sum % 11) % 10 == last) ? true : false;
};

