/**
 * 
 */
if (typeof tmall !== 'object') {
    var tmall = {};
}

tmall.order = tmall.order || {};

tmall.order.ui = {};

tmall.order.ui.CardInfo = function(cardCd, cardNm, disabled) {
    var obj = {
        cardCd: cardCd,
        cardNm: cardNm,
        disabled: disabled
    };
    return obj;
};

tmall.order.ui.PayRestrictInfo = (function() {
    function PayRestrictInfo() {
        this.payTypeCd = null; // 쿠폰에서 사용하는 결제수단 제한 코드 (TR165)
        this.payTypeNm = null; // 제한 결제수단 이름
        this.ordersheetPayTypeCd = null; // 주문서에서 사용하는 결제수단 코드
        this.cardCd = null; // 카드결제 제한일 경우, 제한 카드 코드
        this.cardNm = null; // 카드결제 제한일 경우, 제한 카드 이름
        this.cardDtlCd = null; // 카드결제 상세수단 코드(00:전체, 01:앱카드, 02:안심클릭)
        this.strCardCd = null; // 카드추가할인 제한일 경우, 제한 카드 코드 (, 구분)
        this.strCardNm = null; // 카드추가할인 제한일 경우, 제한 카드 이름 (, 구분)
        this.detailCd = null; // 무통장계좌이체 제한일 경우 은행코드
        this.strOrdersheetPayTypeCd = null; //카드결제 제한일 경우, 사용가능한 결제수단코드
    }
    return PayRestrictInfo;
})();

tmall.order.ui.cardFreeBO = (function() {
    function cardFreeBO(code, month, money, fcode, comment, directvisitYn) {
        this.code = code;
        this.month = month;
        this.money = money;
        this.fcode = fcode;
        this.comment = comment;
        this.directvisitYn = directvisitYn;
    }
    return cardFreeBO;
})();

tmall.order.ui.cardFreeCpBO = (function() {
    function cardFreeCpBO(month, comment, money, cardCd) { // 무이자 가능한 개월, 부분무이자 정보, 무이자 가능 최소 결재금액)
        this.month = month;
        this.comment = comment;
        this.money = money;
        this.cardCd = cardCd;
    }
    return cardFreeCpBO;
})();

tmall.order.ui.popBill = (function() {
	var popBill = {
			id: '',
	        open: function(id) {
	            var body = document.body,
	                wrap = document.getElementById('wrap'),
	                div = document.getElementById(id);

	            window.scrollTo(0, 1);
	            this.id = id;

	            if (body.className.indexOf('backType') < 0) {
	                body.className += ' backType';
	            }

	            //back
	            var back = document.createElement("div");
	            back.id = "back";
	            body.insertBefore(back, wrap);
	            back.style.display = 'block';

	            div.style.display = 'block';
	            this.heightSize();
	            window.addEventListener('resize', popBill.heightSize, false);

	            var btn = div.getElementsByClassName('close')[0];
	            btn.addEventListener('click', popBill.close, false);

	            var imgId = document.orderForm.sendGiftSmsImg.value;
	            if (imgId == '') {
	                imgId = "00";
	            }

	            $('html, body').animate({
	                scrollTop: $('#sendGiftImgLI_' + imgId).offset().top
	            }, 200);

	            $('#sendGiftImgUL > li').removeClass('on');
	            $('#sendGiftImgLI_' + imgId).addClass('on');

	        },
	        heightSize: function() {
	            var body = document.body,
	                wrap = document.getElementById('wrap'),
	                div = document.getElementById(this.id) || document.getElementById(popBill.id);	
	            if (div.offsetHeight < window.innerHeight) {
	                wrap.style.height = window.innerHeight + 'px';
	            } else {
	                wrap.style.height = div.offsetHeight + 'px';
	            }
	        },
	        close: function(id) {
	            var body = document.body,
	                wrap = document.getElementById('wrap'),
	                div = document.getElementById(id) || document.getElementById(popBill.id);

	            body.className = body.className.replace(' backType', '');
	            wrap.style.height = '';
	            window.removeEventListener('resize', popBill.heightSize, false);

	            //back
	            var back = document.getElementById('back');
	            body.removeChild(back);

	            var btn = div.getElementsByClassName('close')[0];
	            btn.removeEventListener('click', popBill.close, false);
	            //back.removeEventListener('click', popBill.close, false);

	            div.style.display = 'none';
	        }
	};
	return popBill;
})();

tmall.order.ui.uiPrice = (function() {
    var uiPrice = {
        id: '',
        view: '',
        enabled: true,
        first: true,
        point: 0,
        pointTime: true,
        focus: true,
        pos: function() {
            var a = document.getElementById(this.id) || this.id;
            return a;
        },
        fixed: function() {
            var wHeight = window.innerHeight,
                wOffset = window.pageYOffset;

            var posTop = document.getElementById(this.view).offsetTop + document.getElementById('cts').offsetTop;

            if ((wOffset + wHeight) > posTop) {
                this.enabled = false;
                if (this.first == false) {
                    return;
                }
                this.hide();
                this.first = false;
            } else {
                this.enabled = true;
                if (this.first == true) {
                    return;
                }
                this.show();
                this.first = true;
            }
        },
        scrolltime: function() {
            this.hide();
            var timer = setInterval(function() {
                if (uiPrice.point == window.pageYOffset) {
                    uiPrice.show();
                    clearInterval(timer);
                } else {
                    uiPrice.hide();
                    uiPrice.point = window.pageYOffset;
                }
            }, 300);
        },
        hide: function() {
            //if(this.enabled == false) return;
            this.pointTime = false;
            this.pos().style.display = 'none';
            this.pos().style.webkitTransition = '';
            this.pos().style.opacity = '0';
        },
        show: function() {
            if (this.enabled == false) {
            	return;
            }
            if (this.focus == false) {
            	return;
            }
            this.pos().style.webkitTransition = 'all 0.3s ease 0';
            this.pos().style.display = 'block';
            this.pointTime = true;
            setTimeout(function() {
                if (uiPrice.pointTime == true) {
                    uiPrice.pos().style.opacity = '100';
                }
            }, 800);
        }
    };
    return uiPrice;
})();

tmall.order.ui.uiPricefix = (function(Order) {
    function uiPricefix() {
        var uAgent = navigator.userAgent.toLowerCase();
        if (uAgent.indexOf("android 2") > -1 && uAgent.indexOf("shw-m180") > -1) {
            document.getElementById('totalSPrice').style.display = 'none';
            return;
        }

        Order.ui.uiPrice.id = 'totalSPrice';
        Order.ui.uiPrice.view = 'orderBtn';
        Order.ui.uiPrice.fixed();
        //키패드버그
        if ((uAgent.indexOf("android 4.0") > -1) || (uAgent.indexOf("iphone") > -1) || (uAgent.indexOf("ipad") > -1)) {
            var eleInput = document.getElementsByTagName("input");
            var eleSelect = document.getElementsByTagName("select");

            for (var i = 0; i < eleInput.length; i++) {
                if (((eleInput[i].type == 'text') || (eleInput[i].type == 'password') || (eleInput[i].type == 'tel')) && (eleInput[i].getAttribute('readonly') == null)) {
                    eleInput[i].addEventListener("focus", function() {
                        Order.ui.uiPrice.focus = false;
                        Order.ui.uiPrice.hide();
                    }, false);
                    eleInput[i].addEventListener("blur", function() {
                        Order.ui.uiPrice.focus = true;
                        Order.ui.uiPrice.show();
                    }, false);
                }
            }
            for (var j = 0; j < eleSelect.length; j++) {
                if (eleSelect[j].getAttribute('readonly') == null) {
                    eleSelect[j].addEventListener("focus", function() {
                        Order.ui.uiPrice.focus = false;
                        Order.ui.uiPrice.hide();
                    }, false);
                    eleSelect[j].addEventListener("blur", function() {
                        Order.ui.uiPrice.focus = true;
                        Order.ui.uiPrice.show();
                    }, false);
                }
            }
        }

        if (window.attachEvent) {
        	window.attachEvent("onscroll", Order.ui.uiPrice.fixed());
        }
        else {
        	window.addEventListener("scroll", function() {
	            Order.ui.uiPrice.fixed();
	        }, false);
        }

        if (uAgent.indexOf("android 2") > -1 && (uAgent.indexOf("shw") > -1 || uAgent.indexOf("shv") > -1)) {
            window.addEventListener("scroll", function() {
                Order.ui.uiPrice.scrolltime();
            }, false);
            window.addEventListener("touchmove", function() {
                Order.ui.uiPrice.hide();
            }, false);
        } else if (uAgent.indexOf("iphone os 5") > -1) {
            window.addEventListener("touchmove", function() {
                Order.ui.uiPrice.hide();
            }, false);
            window.addEventListener("touchend", function() {
                Order.ui.uiPrice.show();
            }, false);
            window.addEventListener("orientationchange", function() {
                var wOffset = window.pageYOffset;
                document.getElementById('totalSPrice').style.position = 'static';
                Order.ui.uiPrice.hide();
                setTimeout(function() {
                    Order.ui.uiPrice.show();
                }, 100);
                setTimeout(function() {
                    document.getElementById('totalSPrice').style.position = '';
                }, 500);
            }, false);
        }
    }
    return uiPricefix;
})(tmall.order);