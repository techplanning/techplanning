




	// Global Var
	var _IMG_PATH_  = "http://www.11st.co.kr";
	var _UPLOAD_IMG_PATH_  = "http://image.11st.co.kr";
	var _SSL_UPLOAD_IMG_PATH_ = "https://www.11st.co.kr/is";
	var _ACTION_CONTEXT_  = "";
	var _FILE_UPLOAD_PATH_ = "http://image.11st.co.kr";
	var _GNB_CONTEXT_PATH_ = "http://www.11st.co.kr";
	var _ACTION_CONTEXT_URL_ = "http://www.11st.co.kr";
	var _SSL_ACTION_CONTEXT_URL_ = "https://www.11st.co.kr";
	var _SSL_IMG_PATH_ = "https://www.11st.co.kr";
	var _GLOBAL_CONTEXT_PATH_ = "http://globalshopping.11st.co.kr";
	var _BEAUTY_CONTEXT_PATH_ = "http://beauty.11st.co.kr";
	var _SOHO_CONTEXT_PATH_ = "http://soho.11st.co.kr";
	var _JS_PATH_ = "http://www.11st.co.kr";

	var _GNB_LOGIN_URL_ = "https://login.11st.co.kr/login/Login.tmall";
	var _GNB_LOGOUT_URL_ = "https://login.11st.co.kr/login/Logout.tmall";
	var _PRODUCT_DETAIL_URL_ = "http://www.11st.co.kr/product/SellerProductDetail.tmall?method=getSellerProductDetail&prdNo=";

	var _ENJOY_SEARCH_VAR_ = "NONE";
	var _ENJOY_SEARCH_KEY_YN_ = "N";

	var _SELLER_SHOP_DOMAIN_ = "http://shop.11st.co.kr";

	// 변경 권고
	var _CSS_URL_			= "http://c.011st.com";
	var _SSL_CSS_URL_		= "https://www.11st.co.kr";
	var _IMG_URL_			= "http://s.011st.com";
	var _SSL_IMG_URL_		= "https://www.11st.co.kr";
	var _UPLOAD_URL_		= "http://i.011st.com";
	var _SSL_UPLOAD_URL_	= "https://www.11st.co.kr/is";

	var _LOGIN_TARGET_URL_ 	= "https://login.11st.co.kr";

	// TZONE Var
	var _TZONE_URL_			= "http://skt.11st.co.kr";
	var _TZONE_URL_HOME_	= "http://skt.11st.co.kr/html/tzone/tZoneMain.html";
	var _SELLER_URL_		= "http://seller.11st.co.kr";
	var _SOFFICE_URL_		= "http://soffice.11st.co.kr";
	var _DS_URL_			= "http://ds.11st.co.kr";
	var _MY11ST_URL_		= "http://buy.11st.co.kr/order/myTmall.tmall?method=getMyTmallMain";
	var _SHOPPINGCART_URL_ 	= "http://buy.11st.co.kr/cart/CartAction.tmall?method=getCartList";
	var _MYSELL_URL_ 		= "http://soffice.11st.co.kr";
	var _CATEGORY_ACTION_URL_ = "http://www.11st.co.kr/browsing/Category.tmall";
	var _NEW_CATEGORY_ACTION_URL_ = "http://www.11st.co.kr/browsing/DisplayCategory.tmall";
	var _SEARCH_ACTION_URL_ = "http://search.11st.co.kr/SearchPrdAction.tmall";

	// TOWN 11st
	var _TOWN11ST_URL_ 		= "http://town.11st.co.kr";
	var _TOWN_PRODUCT_DETAIL_URL_ = "http://town.11st.co.kr/town/TownProductDetail.tmall?method=getTownProductDetail&prdNo=";
	var _TOWN_SHOP_URL_ 	= "http://town.11st.co.kr/town/TownShopDetail.tmall?method=getTownShopDetail&shopNo=";
	var _TOWN_DOMAIN_ 		= "http://town.11st.co.kr";
	var _TOWN_SOFFICE_URL_ 	= "http://town.soffice.11st.co.kr";


	// Order 11st
	var _ORDER_IMG_PATH_ 	= "http://buy.11st.co.kr";
	var _ORDER_URL_ 	 	= "http://buy.11st.co.kr";
	var _ORDER_DOMAIN_ 	 	= "http://buy.11st.co.kr";
	var _SSL_ORDER_URL_  	= "https://buy.11st.co.kr";
	var _SSL_ORDER_IMG_PATH_ = "https://www.11st.co.kr";
	var _ORDER_HIS_URL_		= "http://buy.11st.co.kr/order/OrderList.tmall";

	// ShockingDeal 11st (쇼킹딜)
	var _SHOCKING_DEAL_URL_ = "http://deal.11st.co.kr";
	
	var _SRCH_PARAM_DELIMITER_ = "@;";
	
	// 제외 제휴사
	var _EXCEPT_XSITE_LIST_ = "|1000014299|1000107070|1000138417|1000111850|1000336402|1000436475|1000601391|1000951353|1001023201|1001023200|1001023199|1001023198|1001023197|1001023196|1001021054|";		

var IS_AD_BNNR = "N";




var CP_IS_AUTH = false;

var ieCheck=true;
var appVer=navigator.appVersion.substring(25,22);
var _isShowCtgrSub = false;

var strLBanner = '';
var isLBComplete;

/* 코너별 배너 사용 여부 설정 */
var isLeftBnnr  = true;		//왼쪽 배너
var isWingBnnr  = true;		//윙 배너
var isToastBnnr = false;	//토스트 배너
var isToastBnnrAct = false;			//토스트 배너 동작여부
var isPopUnder  = false;	//팝 언더
/* 코너별 배너 사용 여부 설정 */

var _LINEMAP_;
var banerCheck = "";

// 업로드 이미지 SSL 분리
function getUploadImgUrl(imgUrl)	{
	try	{
		if ( imgUrl.indexOf("http:") > -1 || imgUrl.indexOf("https:") > -1 )	{
			return this.getCommonImgUrl(imgUrl);
		}

		if ( window.document.location.protocol == "https:" )	{
			return _SSL_UPLOAD_IMG_PATH_ + imgUrl;
		}	else	{
			return _UPLOAD_IMG_PATH_ + imgUrl;
		}
	} catch (e)	{
		return _UPLOAD_IMG_PATH_ + imgUrl;
	}
}
	
// 로그인 관련 함수 ------------------------------------------
function openLogin(type, formName, targetUrl, width, height, scroll, refresh, noNonMem) {
	login();
}
//---------------------------------------------------------

function getHtmlCharset()	{
	var charset = "euc-kr";
	try	{
		var metas = document.getElementsByTagName("meta");
		for ( var i = 0 ; i < metas.length ; i++)	{
			var content = metas[i].content.toLowerCase();

			if ( content.indexOf("utf-8") > -1 )	{
				charset = "utf-8"
				break;
			}	else if ( content.indexOf("euc-kr") > -1 )	{
				charset = "euc-kr"
				break;
			}
		}
	}	catch (e)	{}

	return charset;
}




var HeaderExtra = new function()
{
	var gnb3lfBnrImg = new Array();
	var gnb3lfBnrUrl = new Array();
	var gnb3lfBnrTrc = new Array();
	
	var gnb3rfBnrImg = new Array();
	var gnb3rfBnrUrl = new Array();
	var gnb3rfBnrTrc = new Array();
	
	

try	{

} catch (ex) {}

		
	
	var gnbRBannerData = [];	
	var gnbRBannerIdx = 0;
	var gnbRBannerStatCd = '';
	var gnbRBannerDataSize = 0;
	
	var _ID = function(id, w)
	{
		if (w == null)	w = window;
		return w.document.getElementById(id);
	}
	
	//우측 상단 배너 삽입
	this.setGnbRightBanner = function( data, statCd ) {
		gnbRBannerData = data; 
		gnbRBannerStatCd = statCd;
		gnbRBannerDataSize = data.length;
	
		var wrapper = _ID("gnbRBannerWrapper");
		var btnWrapper = _ID("gnbRBannerBtn");
		btnWrapper.innerHTML = '';
	
		var aImgTag = document.createElement("a");
		aImgTag.setAttribute("id", "gnrRBannerLink");
	
		var imgTag = document.createElement("img");
		imgTag.setAttribute("src", getCommonImgUrl( _IMG_PATH_ )+ "/img/common/blank.gif");
		imgTag.setAttribute("width", "125");
		imgTag.setAttribute("height", "70");
		imgTag.setAttribute("id", "gnrRBannerImg");
	
		aImgTag.appendChild(imgTag);
	
		if(gnbRBannerDataSize > 0){
			wrapper.appendChild(aImgTag);
		}
		
		if(gnbRBannerDataSize > 1) {
			var btnStr = '';
			btnStr += '<em name="bcb_seq" id="gnbRBannerNo"></em>/'+ gnbRBannerDataSize;
			btnStr += '<button type="button" class="in_prev" onclick="HeaderExtra.moveGnbRBanner(\'leftBtn\');">이전 광고</button>';
			btnStr += '<button type="button" class="in_next" onclick="HeaderExtra.moveGnbRBanner(\'rightBtn\');">다음 광고</button>';
			btnWrapper.innerHTML = btnStr;
		}
	
		gnbRBannerIdx = parseInt(Math.floor(Math.random() * gnbRBannerDataSize));
		_ID("gnbRBannerNo").innerHTML = (gnbRBannerIdx+1);
		_ID("gnrRBannerImg").src =  getCommonImgUrl(_UPLOAD_IMG_PATH_ + gnbRBannerData[gnbRBannerIdx].imgUrl);
		_ID("gnrRBannerLink").href = "javascript:goStatUrl('" + gnbRBannerData[gnbRBannerIdx].link + "','" + gnbRBannerStatCd + "');";
		jQuery('#gnbRBannerWrapper').addClass('ticket');
	}	

	//우측 상단 배너 화살표 액션
	this.moveGnbRBanner = function(move){
		if(move == "leftBtn"){
			if(gnbRBannerIdx == 0){
				gnbRBannerIdx = gnbRBannerDataSize-1;
			} else if(gnbRBannerIdx > 0){
				gnbRBannerIdx = gnbRBannerIdx-1;
			}
		}else if(move == "rightBtn"){
			if(gnbRBannerIdx == gnbRBannerDataSize-1){
				gnbRBannerIdx = 0;
			} else if(gnbRBannerIdx < gnbRBannerDataSize-1){
				gnbRBannerIdx = gnbRBannerIdx+1;
			}
		}
		_ID("gnbRBannerNo").innerHTML = (gnbRBannerIdx+1);
		_ID("gnrRBannerImg").src=  getCommonImgUrl(_UPLOAD_IMG_PATH_ + gnbRBannerData[gnbRBannerIdx].imgUrl);
		_ID("gnrRBannerLink").href= "javascript:goStatUrl('" + gnbRBannerData[gnbRBannerIdx].link + "','" + gnbRBannerStatCd + "');";		
	}
	
	//로그인여부
	var _funcCheckIsLogin = function() {
		var arg = "TMALL_AUTH=";
		var alen = arg.length;
		var clen = document.cookie.length;
		var i = 0;
	
		while(i < clen){
			var j = i + alen;
			if(document.cookie.substring(i, j) == arg)
				return true;
				i = document.cookie.indexOf(" ", i) + 1;
			if(i == 0) break;
		}
		return false;
	}
	
	// 공통 이미지 처리
	this.getCommonImgUrl = function(imgUrl)	{
		try	{
			var protocol = window.document.location.protocol;
			if ( protocol == "https:" )	{
				if ( _UPLOAD_IMG_PATH_!= "" && imgUrl.indexOf(_UPLOAD_IMG_PATH_) > -1 )	{
					return imgUrl.replace(_UPLOAD_IMG_PATH_, _SSL_UPLOAD_IMG_PATH_);
				} else if ( _IMG_PATH_ != "" && imgUrl.indexOf(_IMG_PATH_) > -1 )	{
					return imgUrl.replace(_IMG_PATH_, _SSL_IMG_PATH_);
				} else if ( _IMG_URL_ != "" && imgUrl.indexOf(_IMG_URL_) > -1 )	{
					return imgUrl.replace(_IMG_URL_, _SSL_IMG_URL_);
				} else if ( _UPLOAD_URL_ != "" && imgUrl.indexOf(_UPLOAD_URL_) > -1 )	{
					return imgUrl.replace(_UPLOAD_URL_, _SSL_UPLOAD_URL_);
				} else if ( _CSS_URL_ != "" && imgUrl.indexOf(_CSS_URL_) > -1 )	{
					return imgUrl.replace(_CSS_URL_, _SSL_CSS_URL_);
				} else if ( imgUrl.indexOf("http:") > -1 )	{
					return imgUrl.replace("http:", protocol);
				}
			}	else if ( protocol == "http:" )	{
				if ( _SSL_UPLOAD_IMG_PATH_ != "" && imgUrl.indexOf(_SSL_UPLOAD_IMG_PATH_) > -1 )	{
					return imgUrl.replace(_SSL_UPLOAD_IMG_PATH_, _UPLOAD_IMG_PATH_);
				} else if ( _SSL_IMG_PATH_ != "" && imgUrl.indexOf(_SSL_IMG_PATH_) > -1 )	{
					return imgUrl.replace(_SSL_IMG_PATH_, _IMG_PATH_);
				} else if ( _SSL_IMG_URL_ != "" && imgUrl.indexOf(_SSL_IMG_URL_) > -1 )	{
					return imgUrl.replace(_SSL_IMG_URL_, _IMG_URL_);
				} else if ( _SSL_UPLOAD_URL_ != "" && imgUrl.indexOf(_SSL_UPLOAD_URL_) > -1 )	{
					return imgUrl.replace(_SSL_UPLOAD_URL_, _UPLOAD_URL_);
				} else if ( _SSL_CSS_URL_ != "" && imgUrl.indexOf(_SSL_CSS_URL_) > -1 )	{
					return imgUrl.replace(_SSL_CSS_URL_, _CSS_URL_);
				} else if ( imgUrl.indexOf("https:") > -1 )	{
					return imgUrl.replace("https:", protocol);
				}
			}
		} catch (e)	{}
		return imgUrl;
	}
	
	//라인맵
	this.setLineMap = function(mapName){
		//_ID("spLineMap").innerHTML = mapName;
	}
	
	this.setCcWingBanner = function(){
	
		var url = document.URL;
		if(url.indexOf("help.11st.co.kr/11st/faq/FaqIndex.jsp") != -1){
			if(gnb3lfBnrImg.length>0 && gnb3lfBnrUrl.length>0){
				var gnbCcBnrIdxR = 0;
				var contents = "<a href=\"#\" onclick=\"displayPopup('" + gnb3lfBnrUrl[gnbCcBnrIdxR] + "','490','450');doCommonStat('BTN0104');return false;\"><img src='" + this.getCommonImgUrl(_UPLOAD_IMG_PATH_ + gnb3lfBnrImg[gnbCcBnrIdxR]) + "' ></a>"
				_ID("cust_center_banner").innerHTML = contents;
			}
		}
	}
	
	this.initGNB = function() {
		if(!_funcCheckIsLogin()) {
			CP_IS_AUTH =  false;
		} else {
			CP_IS_AUTH =  true;
		}

		HeaderGnb.makeGnb.init('extra');
		//==========================================================================================
		document.write('<script type="text/javascript">setGnbLogInArea(true);<\/script>');// 로그인
		document.write('<script type="text/javascript">setTimeout(HeaderExtra.setCcWingBanner, 1000);<\/script>');
	}
}
function initGNB()
{
	HeaderExtra.initGNB();
}

function setTkGnbBanner()
{
	//2016 GNB 개편 삭제
}



document.write('<script id="headerUtilTemplate" type="text/x-handlebars-template" charset="UTF-8">	<div class="header_util" id="headerUtilArea" data-log-actionid-area="header_util">		<div class="inner">			<div class="header_utilmenu">				<ul>					{{#ifCond channel \'===\' \'DEAL\'}}					<li><a href="http://www.11st.co.kr/html/main.html" class="home">11번가</a><span class="tx_bar"></span></li>					{{/ifCond}}					{{#ifCond channel \'===\' \'SHOP\'}}					<li><a href="http://www.11st.co.kr/html/main.html" class="home">11번가</a><span class="tx_bar"></span></li>					{{/ifCond}}					<li data-log-actionid-label="appdown"><a href="http://www.11st.co.kr/contents/Contents.tmall?method=dispContents&spceid=2103" data-ga-event-category="PC_GNB" data-ga-event-action="상단유틸" data-ga-event-label="앱다운로드" class="appdown" target="_blank"><span class="ico"></span>앱다운로드</a><span class="tx_bar"></span></li>										<li class="direct" id="go11st_wrap" style="display:none;" data-log-actionid-label="shortcut">						<button type="button" class="btn_direct" data-ga-event-category="PC_GNB" data-ga-event-action="상단유틸" data-ga-event-label="바로가기ON/OFF">바로가기</button>						<div class="lay_nw_def direct_go_wrap" id="lay_direct">							<div class="lay_tit"><em id="gbox_text">바로가기 비접속중</em>입니다.</div>							<div class="lay_conts cfix">								<div class="direct_go" id="divDirectBenefit">									<dl>										<dt>바로가기로 방문하는 방법 </dt>										<dd>											<ul class="cfix">												<li><button type="button" class="btn_way" onclick="FooterComm.installDirectVisit(\'\');">바로가기 설치하기</button></li>												<li><button type="button" class="btn_way" onclick="setHomePage();">시작페이지 설정하기</button></li>												<li><button type="button" class="btn_way" onclick="FooterComm.addFavorite();">즐겨찾기 추가하기</button></li>												<li><button type="button" class="btn_way" onclick="FooterComm.clip11stUrl();">URL 직접 입력하기</button></li>											</ul>										</dd>									</dl>									<div class="btn_sec"><a href="http://www.11st.co.kr/browsing/MallPlanDetail.tmall?method=getMallPlanDetail&planDisplayNumber=905236" class="btn_nw_gray">혜택 상세보기</a></div>								</div>							</div>							<button type="button" class="btn_laycls" onclick="jQuery(\'#lay_direct\').toggle();"><span class="hide">레이어 닫기</span></button>						</div>					</li>				</ul>			</div>			<div class="header_user_etc">				<ul>					{{#if isLogin}}					<li data-log-actionid-label="loginout"><a id="gnbLogin" href="javascript:void(0);" onclick="logout(\'\',\'{{loginReturnURL}}\'); rakeLog.sendRakeLog(this);" data-ga-event-category="PC_GNB" data-ga-event-action="상단유틸" data-ga-event-label="로그아웃" data-log-body="{\'state\':\'로그인\'}">로그아웃</a><span class="tx_bar"></span></li>					<li><a id="gnbMember" href="{{_GNB_CONTEXT_PATH_}}/register/memInfoEditForm.tmall?method=getMemberInfo&protocol=https" onclick="goMemberInfoPages();return false;">회원정보</a><span class="tx_bar"></span></li>					{{else}}					<li data-log-actionid-label="loginout"><a id="gnbLogin" href="javascript:void(0);" onclick="login(\'UT0201\',\'{{loginReturnURL}}\'); rakeLog.sendRakeLog(this);" data-ga-event-category="PC_GNB" data-ga-event-action="상단유틸" data-ga-event-label="로그인" data-log-body="{\'state\':\'로그아웃\'}">로그인</a><span class="tx_bar"></span></li>					<li data-log-actionid-label="join"><a id="gnbMember" href="javascript:void(0);" onclick="join(\'\'); rakeLog.sendRakeLog(this);" data-ga-event-category="PC_GNB" data-ga-event-action="상단유틸" data-ga-event-label="회원가입">회원가입</a><span class="tx_bar"></span></li>					{{/if}}					{{#ifCond channel \'===\' \'TOUR\'}}					<li id="utMy11st"><a href="http://www.11st.co.kr/vertical/TourReservationSettleList.tmall?method=displayTourReservationSettleList" data-ga-event-category="PC_GNB" data-ga-event-action="상단유틸" data-ga-event-label="나의 여행11번가">나의 여행11번가</a><span class="tx_bar"></span></li>					{{else}}					<li class="have_sub" id="utMy11st" data-log-actionid-label="my11st"><a href="{{_MY11ST_URL_}}" data-ga-event-category="PC_GNB" data-ga-event-action="상단유틸" data-ga-event-label="나의11번가">나의11번가<span class="ico_arrow"></span><span class="frame"></span></a><span class="tx_bar"></span>						<ul class="user_sub_menu">							<li data-log-actionid-label="orderdlv_inquiry"><a href="{{_ORDER_HIS_URL_}}" data-ga-event-category="PC_GNB" data-ga-event-action="상단유틸" data-ga-event-label="주문배송조회">주문배송조회</a></li>							<li data-log-actionid-label="coupon"><a href="{{_GNB_CONTEXT_PATH_}}/loyalty/AuthCouponGiftDtls.tmall" data-ga-event-category="PC_GNB" data-ga-event-action="상단유틸" data-ga-event-label="쿠폰">쿠폰</a></li>							<li data-log-actionid-label="grade"><a href="{{_GNB_CONTEXT_PATH_}}/register/getGradeInfo.tmall?method=getGrade" data-ga-event-category="PC_GNB" data-ga-event-action="상단유틸" data-ga-event-label="구매등급 혜택">구매등급 혜택</a></li>							<li data-log-actionid-label="favorite_minimall"><a href="{{_GNB_CONTEXT_PATH_}}/minimall/MyMiniMallAction.tmall?method=getMyMiniMall" data-ga-event-category="PC_GNB" data-ga-event-action="상단유틸" data-ga-event-label="단골스토어">단골스토어</a></li>						</ul>					</li>					<li data-log-actionid-label="cart"><a href="{{_SHOPPINGCART_URL_}}" data-ga-event-category="PC_GNB" data-ga-event-action="상단유틸" data-ga-event-label="장바구니">장바구니</a><span class="tx_bar"></span></li>					{{/ifCond}}					<li data-log-actionid-label="customer_center"><a href="http://help.11st.co.kr" data-ga-event-category="PC_GNB" data-ga-event-action="상단유틸" data-ga-event-label="고객센터">고객센터</a><span class="tx_bar"></span></li>					<li class="have_sub" data-log-actionid-label="seller_office"><a href="{{_SOFFICE_URL_}}" data-ga-event-category="PC_GNB" data-ga-event-action="상단유틸" data-ga-event-label="셀러오피스">셀러오피스<span class="ico_arrow"></span><span class="frame"></span></a><span class="tx_bar"></span><!-- 마우스오버시 li에 클래스 on추가 -->						<ul class="user_sub_menu">							<li data-log-actionid-label="seller_ad"><a href="{{_SOFFICE_URL_}}/adcentre/AdvertMain.tmall" data-ga-event-category="PC_GNB" data-ga-event-action="상단유틸" data-ga-event-label="판매자광고센터">판매자광고센터</a></li>							<li data-log-actionid-label="brand_ad"><a href="{{_GNB_CONTEXT_PATH_}}/brandadcenter/Main.tmall" data-ga-event-category="PC_GNB" data-ga-event-action="상단유틸" data-ga-event-label="브랜드광고센터">브랜드광고센터</a></li>							<li data-log-actionid-label="sellerzone"><a href="{{_SELLER_URL_}}" data-ga-event-category="PC_GNB" data-ga-event-action="상단유틸" data-ga-event-label="셀러존">셀러존</a></li>							<li data-log-actionid-label="minimall_mngt"><a href="{{_SELLER_SHOP_DOMAIN_}}/minimall/AuthMiniMallAction.tmall?method=goRepMinimallMng" data-ga-event-category="PC_GNB" data-ga-event-action="상단유틸" data-ga-event-label="스토어관리">스토어관리</a></li>						</ul>					</li>					<li class="have_sub lang_v2" data-log-actionid-label="language"><a href="http://www.11st.co.kr/html/main.html" data-ga-event-category="PC_GNB" data-ga-event-action="상단유틸" data-ga-event-label="KOREA"><span class="flag flag_ko"></span> Korea<span class="ico_arrow"></span><span class="frame"></span></a>						<ul class="user_sub_menu">							<li><a href="http://global.11st.co.kr/?trlang=en" data-ga-event-category="PC_GNB" data-ga-event-action="상단유틸" data-ga-event-label="ENGLISH" data-log-body="{\'language\':\'english\'}"><span class="flag flag_en"></span> English</a></li>                            <li><a href="http://global.11st.co.kr/?trlang=zh" data-ga-event-category="PC_GNB" data-ga-event-action="상단유틸" data-ga-event-label="중국" data-log-body="{\'language\':\'china\'}"><span class="flag flag_ch"></span> China</a></li>							<li><a href="http://www.11street.my" data-ga-event-category="PC_GNB" data-ga-event-action="상단유틸" data-ga-event-label="말레이시아" data-log-body="{\'language\':\'malaysia\'}"><span class="flag flag_ma"></span> Malaysia</a></li>							<li><a href="http://www.elevenia.co.id/" data-ga-event-category="PC_GNB" data-ga-event-action="상단유틸" data-ga-event-label="인도네시아" data-log-body="{\'language\':\'indonesia\'}"><span class="flag flag_in"></span> Indonesia</a></li>							<li><a href="http://www.n11.com/" data-ga-event-category="PC_GNB" data-ga-event-action="상단유틸" data-ga-event-label="터키" data-log-body="{\'language\':\'turkey\'}"><span class="flag flag_tu"></span> Turkey</a></li>							<li><a href="http://www.11street.co.th/html/th/main.html" data-ga-event-category="PC_GNB" data-ga-event-action="상단유틸" data-ga-event-label="태국" data-log-body="{\'language\':\'thailand\'}"><span class="flag flag_th"></span> Thailand</a></li>						</ul>					</li>				</ul>			</div>				</div>	</div>	<hr></script>');
document.write('<script id="headerStartTemplate" type="text/x-handlebars-template" >	{{#ifCond templateType \'===\' \'main\'}}	<div class="skip_nav">		<p><a href="#container">본문 바로가기</a></p>		</div>	<div id="wrap">	{{else}}	<div id="skipNavi">		<a href="#tSearch"><span>통합검색 바로가기</span></a>		<a href="#layBodyWrap"><span>본문 바로가기</span></a>	</div>	<div id="wrapBody">	{{/ifCond}}</script><script id="headerGlobalServiceTemplate" type="text/x-handlebars-template" >	<div class="global_top_cntr" id="global_top_cntr" style="display:none;">		<div>			<p>Please select your preferred language. <em class="c_gbl"><a href="http://global.11st.co.kr/html/en/main.html"  onclick="StartPageManager.english(); return false;">English</a></em> or <em class="c_kor"><a href="http://www.11st.co.kr/html/main.html" onclick="StartPageManager.korean(); return false;">Korean</a></em></p>			<input type="button" value="close layer" onclick="StartPageManager.hide();">		</div>		<div class="choice_ko_en">For International Shipping service, click here <span>(<a href="http://global.11st.co.kr/en/commons/CommonAbout.tmall?method=getInternationalSS&tab=1">English</a>, <a href="http://www.11st.co.kr/html/browsing/worldDelivery/worldDeliveryMain.html">Korean</a>)</span></div>	</div>	<div class="global_deliv_top lang_ko" id="global_deliv_top" style="display:none;">		<div class="inner">			<h2><span><span>전세계배송 서비스</span></span></h2>			<ul>				<li class="glb_serv1"><a href="http://www.11st.co.kr/browsing/WorldDeliverySubAction.tmall?method=getWorldDeliveryInfo&viewFlag=info1"><span><span>전세계배송 이용 가이드</span></span></a></li>				<li class="glb_serv2"><a href="http://www.11st.co.kr/browsing/WorldDeliverySubAction.tmall?method=getWorldDeliveryInfo&viewFlag=info4"><span><span>해외배송비 안내</span></span></a></li>				<li class="glb_serv3"><a href="http://www.11st.co.kr/html/browsing/worldDelivery/worldDeliveryNatiRnk1Img.html"><span><span>국가별 판매랭킹</span></span></a></li>			</ul>			<label for="noView"><input type="checkbox" id="noView" onclick="StartPageManager.hideDlvInfoLayer(true);">더 이상 보이지 않기</label>			<button class="btn_close" onclick="StartPageManager.hideDlvInfoLayer(false);"><span>전세계배송 서비스 레이어 닫기</span></button>		</div>	</div>	<hr></script><script id="headerSearchTemplate" type="text/x-handlebars-template">{{#ifCond templateType \'===\' \'main\'}}<header id="header" role="banner">{{else}}<div id="header" role="banner">{{/ifCond}}	<div class="header_sch_area">		<div class="inner">			{{#ifCond VIEW_BI \'===\' \'seasonBI\'}}			<div class="season" style="background-image:url(\'{{BI_SEASON_IMG}}\');"></div>			{{/ifCond}}			<div class="header_sch" data-log-actionid-area="header_menu" data-log-actionid-label="11st_logo">				<h1 class="hd"><a href="http://www.11st.co.kr" data-ga-event-category="PC_GNB" data-ga-event-action="상단영역_로고" data-ga-event-label="">11번가</a></h1>				<form name="GNBSearchForm" id="AKCFrm" autocomplete="off" method="get" action="http://search.11st.co.kr/SearchPrdAction.tmall" onSubmit="HeaderGnb.search(\'\'); return false;" target="_top">					<input type="hidden" name="method" value="getTotalSearchSeller">					<input type="hidden" name="isGnb" value="Y">					<input type="hidden" name="prdType" value="">					<input type="hidden" name="category" value="">					<input type="hidden" name="cmd" value="">					<input type="hidden" name="pageSize">					<input type="hidden" name="lCtgrNo" value="">					<input type="hidden" name="mCtgrNo" value="">					<input type="hidden" name="sCtgrNo" value="">					<input type="hidden" name="dCtgrNo" value="">					<input type="hidden" name="fromACK" value="">					<input type="hidden" name="semanticFromGNB" value="">					<input type="hidden" name="gnbTag" value="TO">					<input type="hidden" name="schFrom" value="">					<input type="hidden" name="schFrom" value="">					<input type="hidden" name="ID" value="">					<input type="hidden" name="ctgrNo" value="">					<input type="hidden" name="srCtgrNo" value="">					<input type="hidden" name="keyword" value="">					<input type="hidden" name="adUrl" id="adUrl" value="">					<input type="hidden" name="adKwdTrcNo" id="adKwdTrcNo" value="">					<input type="hidden" name="adPrdNo" id="adPrdNo" value="">					<input type="hidden" name="targetTab" value="T">					{{#ifCond area \'===\' \'extra\'}}					<input type="hidden" name="charset" value="getHtmlCharset()">					{{/ifCond}}					<fieldset id="tSearch">						<legend>통합검색</legend>						{{#ifCond area \'===\' \'extra\'}}						<input type="text" class="header_inp_txt" title="11번가 통합검색" name="kwd" value="" id="AKCKwd" onFocus="clearAdUrl();" onKeyPress="if ( event.keyCode == 13) HeaderGnb.search(\'enter\'); " style="ime-mode:active;">						{{else}}						<input type="text" class="header_inp_txt" title="11번가 통합검색" name="kwd" value="{{SRCH_KWD}}" id="AKCKwd" onfocus="clearAdUrl();searchManager.init(true);">						{{/ifCond}}						<div id="gnbTxtAd_divId" title="MA01I" data-log-actionid-area="searchbox"><button type="button" class="btn_search" id="gnbTxtAd" onclick="HeaderGnb.search(\'click\'); return false;">검색</button></div>						{{#ifCond area \'!=\' \'extra\'}}								<div id="auto_seachTopDiv" class="header_sch_autotree">							<button type="button" class="defbtn_sm dtype7" id="btnRecentKwd" style="display:none"><span>최근 검색어</span></button>							<iframe id="autoArea" src="/html/blank.html" frameborder="0" scrolling="no" title="검색 자동 완성 및 검색어 트리" style="height:0px; "></iframe>						</div>						{{/ifCond}}					</fieldset>				</form>			</div>			{{#ifCond templateType \'===\' \'main\'}}			<div class="header_ad" id="gnbRBannerWrapper" data-log-actionid-area="gnb_banner">				{{#if imgUrl}}				<div class="header_ad_view" data-log-actionid-label="banner">					<a name="bcb_conts" href="{{imgLink}}" data-ga-event-category="PC_GNB" data-ga-event-action="기획전 배너" data-ga-event-label="기획전배너 클릭_1_{{altTxt}}"><img src="{{imgUrl}}" alt="{{altTxt}}"></a>				</div>				{{/if}}				{{#ifCond totalCount \'>\' 1}}				<div class="header_ad_btn" data-log-actionid-label="arrow">					<span class="count"><strong name="bcb_seq">{{index}}</strong> / {{totalCount}}</span>					<button type="button" class="btn btn_prev" data-ga-event-category="PC_GNB" data-ga-event-action="기획전 배너" data-ga-event-label="배너 좌/우 이동" data-log-body="{\'direction\':\'left\'}">이전 광고</button>					<button type="button" class="btn btn_next" data-ga-event-category="PC_GNB" data-ga-event-action="기획전 배너" data-ga-event-label="배너 좌/우 이동" data-log-body="{\'direction\':\'right\'}">다음 광고</button>				</div>				{{/ifCond}}			</div>			{{else}}			<div class="header_ad_sub" id="dsGnbBanner" data-log-actionid-area="gnb_banner"></div>			{{/ifCond}}			{{#ifCond area \'!=\' \'mini\'}}			<ul class="nav_benefit" data-log-actionid-area="header_menu">				<li><a href="http://www.11st.co.kr/browsing/CouponPlace.tmall?method=getCouponZoneMain&addCtgrNo=950089" data-ga-event-category="PC_GNB" data-ga-event-action="상단영역_쿠폰존" data-ga-event-label="" data-log-actionid-label="coupon">쿠폰존</a></li>				<li><a href="http://www.11st.co.kr/browsing/NewPlusZonePlace.tmall?method=getEventPage&addCtgrNo=951965" data-ga-event-category="PC_GNB" data-ga-event-action="상단영역_이벤트/혜택존" data-ga-event-label="" data-log-actionid-label="event">이벤트/혜택존</a></li>				<li><a href="http://www.11st.co.kr/html/exhibition/productPlanningMain21.html" data-ga-event-category="PC_GNB" data-ga-event-action="상단영역_기획전" data-ga-event-label="" data-log-actionid-label="plan">기획전</a></li>				<li><a href="http://www.11st.co.kr/browsing/BestSeller.tmall?method=getBestSellerMain&xfrom=main^gnb" data-ga-event-category="PC_GNB" data-ga-event-action="상단영역_베스트100" data-ga-event-label="" data-log-actionid-label="best">베스트100</a></li>			</ul>			{{/ifCond}}		</div>	</div>{{#ifCond area \'===\' \'mini\'}}</div><hr>{{/ifCond}}</script>');
document.write('<script id="headerNavigationTemplate" type="text/x-handlebars-template">		{{#ifCond templateType \'===\' \'main\'}}		<nav class="header_gnb" id="gnbNavArea">		{{else}}		<div class="header_gnb" id="gnbNavArea">		{{/ifCond}}			<div class="inner">				<h1 class="hide">대메뉴</h1>				<div class="gnb_l">					<div class="gnb_nav gnb_nav_category_v2" id="gnbCategoryArea">						<p name="gnbNavBtn" data-log-actionid-area="all_nav" data-log-actionid-label="all_category"><button id="gnbBtnAllNav" type="button" class="gnb_btn_all_v3" data-ga-event-category="PC_LNB 카테고리 탐색" data-ga-event-action="카테고리 전체" data-ga-event-label="카테고리 전체"><span class="in_btn">카테고리 전체</span></button></p>						<div class="ctgrlist_wrap">							<div class="gnb_nav_category_layer_v2" id="metaCategoryInner">							</div>						</div>					</div>										<ul class="gnb_nav gnb_nav_brand" id="gnbCornerArea">						 <li class="nowdely" data-log-actionid-area="header_gnb" data-log-actionid-label="now_dlv">							<a href="http://www.11st.co.kr/browsing/NowDlvAction.tmall?method=nowDlvMain" data-ga-event-category="PC_GNB" data-ga-event-action="GNB_NOW배송" data-ga-event-label="" class="link" name="gnbNavBtn">NOW배송<span class="line"></span></a>						</li>						<li class="shocking" data-log-actionid-area="header_gnb" data-log-actionid-label="shockingdeal"> 												 	<a href="http://deal.11st.co.kr" data-ga-event-category="PC_GNB" data-ga-event-action="GNB_쇼킹딜" data-ga-event-label="" class="link" name="gnbNavBtn">쇼킹딜<span class="line"></span></a>						</li>					</ul>				</div>						<div class="gnb_r">					<strong class="shop">#SHOP</strong>					<ul class="gnb_nav gnb_nav_theme" id="gnbThemeMenuArea" data-log-actionid-area="shop_tab" data-log-actionid-label="menu">						<li style="display:none;" id="seasonMenuArea"><a href="" class="link event" data-ga-event-category="PC_GNB" data-ga-event-action="GNB_테마메뉴" data-ga-event-label=""><img style="display:none;" src="" alt=""></a></li>						<li><a href="http://www.11st.co.kr/browsing/MainThemeAction.tmall?method=departmentMain&ctgrNo=152797&isNewGnb=Y " class="link department" data-ga-event-category="PC_GNB" data-ga-event-action="GNB_테마메뉴" data-ga-event-label="백화점" data-log-body="{\'menu_name\':\'dept\'}">백화점</a></li>						<li><a href="http://www.11st.co.kr/browsing/BrandHomeAction.tmall?method=getBrandTrendMain" class="link brand" data-ga-event-category="PC_GNB" data-ga-event-action="GNB_테마메뉴" data-ga-event-label="브랜드" data-log-body="{\'menu_name\':\'brand\'}">브랜드</a></li>						<li><a href="http://www.11st.co.kr/browsing/MainThemeAction.tmall?method=getFashionMain&isNewGnb=Y " class="link fashion" data-ga-event-category="PC_GNB" data-ga-event-action="GNB_테마메뉴" data-ga-event-label="패션" data-log-body="{\'menu_name\':\'fashion\'}">패션</a></li>						<li><a href="http://www.11st.co.kr/browsing/MainThemeAction.tmall?method=getBeautyMain&isNewGnb=Y " class="link beauty" data-ga-event-category="PC_GNB" data-ga-event-action="GNB_테마메뉴" data-ga-event-label="뷰티" data-log-body="{\'menu_name\':\'beauty\'}">뷰티</a></li>						<li><a href="http://www.11st.co.kr/browsing/MainThemeAction.tmall?method=livingMain&ctgrNo=152711&isNewGnb=Y " class="link living" data-ga-event-category="PC_GNB" data-ga-event-action="GNB_테마메뉴" data-ga-event-label="리빙" data-log-body="{\'menu_name\':\'living\'}">리빙</a></li>						<li><a href="http://www.11st.co.kr/browsing/MainThemeAction.tmall?method=leisureMain&ctgrNo=152712&isNewGnb=Y " class="link leisure" data-ga-event-category="PC_GNB" data-ga-event-action="GNB_테마메뉴" data-ga-event-label="레저" data-log-body="{\'menu_name\':\'leisure\'}">레저</a></li>						<li><a href="http://www.11st.co.kr/browsing/MainThemeAction.tmall?method=digitalMain&ctgrNo=152713&isNewGnb=Y " class="link digital" data-ga-event-category="PC_GNB" data-ga-event-action="GNB_테마메뉴" data-ga-event-label="디지털" data-log-body="{\'menu_name\':\'digital\'}">디지털</a></li>						<li><a href="http://www.11st.co.kr/browsing/MainThemeAction.tmall?method=martMain&ctgrNo=152714&isNewGnb=Y " class="link mart" data-ga-event-category="PC_GNB" data-ga-event-action="GNB_테마메뉴" data-ga-event-label="마트" data-log-body="{\'menu_name\':\'mart\'}">마트</a></li>					</ul>					<div class="gnb_bar"></div>					<ul class="gnb_nav gnb_nav_vertical" data-log-actionid-area="vertical_tab" data-log-actionid-label="menu">						<li><a href="http://books.11st.co.kr" class="link book" data-ga-event-category="PC_GNB" data-ga-event-action="GNB_버티컬" data-ga-event-label="도서" data-log-body="{\'menu_name\':\'book\'}">도서</a></li>						<li class="service_new"><a href="http://tour.11st.co.kr/html/vertical/tourMain.html" class="link trip" data-ga-event-category="PC_GNB" data-ga-event-action="GNB_버티컬" data-ga-event-label="여행" data-log-body="{\'menu_name\':\'travel\'}">여행<span class="ico_new">NEW</span></a></li>						<li class="service_new"><a href="http://ticket.11st.co.kr/11st/Main.asp" class="link ticket" data-ga-event-category="PC_GNB" data-ga-event-action="GNB_버티컬" data-ga-event-label="티켓" data-log-body="{\'menu_name\':\'ticket\'}">티켓<span class="ico_new">NEW</span></a></li>						<li class="service_new"><a href="http://www.11st.co.kr/lifeplus/LifePlusAction.tmall?method=getLifeplusMain" class="link lifeplus" data-ga-event-category="PC_GNB" data-ga-event-action="GNB_버티컬" data-ga-event-label="홈&카서비스" data-log-body="{\'menu_name\':\'home&carservice\'}">홈&카서비스<span class="ico_new">NEW</span></a></li>					</ul>				</div>			</div>		{{#ifCond templateType \'===\' \'main\'}}		</nav>		{{else}}		</div>		{{/ifCond}}	{{#ifCond area \'!=\' \'mini\'}}		{{#ifCond templateType \'===\' \'main\'}}	</header>		{{else}}	</div>		{{/ifCond}}	{{/ifCond}}	<div class="dimm" id="gnbMetaCategoryDimm"></div></script><script id="headerMetaCategoryTemplate" type="text/x-handlebars-template">	<section class="main_category_v2" id="lnbMenu">		<h1 class="hide">카테고리 메뉴</h1>		<ul>		{{#each this}}			<li class="{{AddInfoClassNm}}" data-log-actionid-area="lnb_nav" data-log-actionid-label="meta_category">				<a href="#" name="metaCtgr" data-ga-event-category="PC_LNB 카테고리 탐색" data-ga-event-action="메타카테고리" data-ga-event-label="{{CtgrNm}}">{{CtgrNm}}</a>				<div class="main_category_layer_v2" id="lnb_cate_layer{{metaIdx}}">					<strong class="tit_category">{{CtgrNm}}</strong>					<div class="box_category"></div>				</div>			</li>		{{/each}}		</ul>	</section></script>');

	

	

document.write('<link type="text/css" rel="stylesheet" href="' + HeaderExtra.getCommonImgUrl("http://c.011st.com/css/common/default.css") + '">');
document.write('<script type="text/javascript" src="' + HeaderExtra.getCommonImgUrl("http://www.11st.co.kr/js/lib/jquery/jquery-1.5.min.js") + '" charset="euc-kr"><\/script>');
document.write('<script type="text/javascript" src="' + HeaderExtra.getCommonImgUrl("http://www.11st.co.kr/js/lib/handlebars/handlebars-v4.0.5.min.js") + '" charset="euc-kr"><\/script>');
document.write('<script type="text/javascript" src="' + HeaderExtra.getCommonImgUrl("http://www.11st.co.kr/js/common/headerCommonJs.js") + '" charset="euc-kr"><\/script>');
document.write('<script type="text/javascript" src="' + HeaderExtra.getCommonImgUrl("http://www.11st.co.kr/js/common/inc_header_v7.js") + '" charset="euc-kr"><\/script>');
document.write('<script type="text/javascript" src="' + HeaderExtra.getCommonImgUrl("http://www.11st.co.kr/js/lib/json2.min.js") + '" charset="euc-kr"><\/script>');

