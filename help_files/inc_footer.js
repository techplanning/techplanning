var IncFooter = {}; 

IncFooter.search = { 
	bShowFooterSearch : 'N',
	searchTabNm : '통합검색',
	searchActionUrl : 'http://search.11st.co.kr/SearchPrdAction.tmall',
	searchMethodUrl : 'getTotalSearchSeller',
	searchTargetTab : 'T',
	areaCode : 'FO0101',
	area : (typeof(HeaderGnb) == 'undefined') ? 'MAINS' : HeaderGnb.makeGnb.area,
	areaCodePre : (typeof(HeaderGnb) == 'undefined') ? 'MAINS' : HeaderGnb.makeGnb.areaCodePre,
	noSearchResult : true,
	searchKeywd : '',
	setParam : function() {
		var _this = this;

		if ( typeof(noSearchReault) == 'undefined' ) {
			_this.noSearchResult = false;
		};
		if (  typeof(footerKwd) != 'undefined' ) {
			_this.searchKeywd = footerKwd;
		}

		if ( (typeof(bFooterSearch) != 'undefined' && bFooterSearch == 'Y') || _this.area == 'extra' ) {
			_this.bShowFooterSearch = 'Y';
		};

		if( _this.area == 'mini' ) {
			_this.bShowFooterSearch = 'N';
		}

		if( typeof(TARGET_TAB) != 'undefined' ) {
			_this.searchTargetTab = TARGET_TAB;
		}

		if (_this.searchTargetTab == "CONTENTS"){ //컨텐츠검색
			_this.searchTabNm = "컨텐츠검색";
			_this.searchActionUrl = "http://search.11st.co.kr/ContentsSearchAction.tmall";
			_this.searchMethodUrl = "getContentsSearch";
		}else if (_this.searchTargetTab == "BRAND"){ //브랜드 검색
			_this.searchTabNm = "브랜드검색";
			_this.searchActionUrl = "http://search.11st.co.kr/BrandSearchAction.tmall";
			_this.searchMethodUrl = "getBrandSearch";
		};
	},
	drawFooterSearch : function() {
		var _this = this;
		var strFSrch = [];
		var k = 0;
		strFSrch.push('<form name="FooterSearchForm" action="' + _this.searchActionUrl + '">');
		strFSrch.push('<input type="hidden" name="method" value="' + _this.searchMethodUrl + '">');
		strFSrch.push('<input type="hidden" name="targetTab" value="' + _this.searchTargetTab + '">');
		strFSrch.push('<input type="hidden" name="isGnb" value="Y">');
		strFSrch.push('<input type="hidden" name="category">');
		strFSrch.push('<input type="hidden" name="cmd">');
		strFSrch.push('<input type="hidden" name="pageSize">');
		strFSrch.push('<input type="hidden" name="semanticFromGNB" value="">');

		strFSrch.push('<div class="footer_search2" data-log-actionid-area="bottomsearchbox">');
		strFSrch.push('<fieldset class="total_search">');
		strFSrch.push('<legend><label for="bottomKwd">하단 통합 검색</label></legend>');
		strFSrch.push('<h4>' +_this.searchTabNm + '</h4>');
		strFSrch.push('<input name="kwd" type="text" class="text" value="'+_this.searchKeywd+'" id="bottomKwd" data-log-actionid-label="keyword"');
		strFSrch.push('" onKeyPress="if(event.keyCode == 13) {rakeLog.sendRakeLog(this,\'click\');goFooterSearch(\''+ _this.areaCodePre + _this.areaCode +'\'); return false;}" style="ime-mode:active;">');
		strFSrch.push('<input type="button" value="검색" data-log-actionid-label="keyword" onclick="rakeLog.sendRakeLog(this);ga(\'send\',\'event\', \'통합검색(전체상품)\', \'하단검색창\', \'\');goFooterSearch(\''+ _this.areaCodePre + _this.areaCode +'\');" class="search">');
		strFSrch.push('</fieldset>');

		if(_this.searchKeywd != '' && !_this.noSearchResult) {
			strFSrch.push('<a class="btn_research" data-log-actionid-area="voc" data-log-actionid-label="send" onclick="rakeLog.sendRakeLog(this);IncFooter.search.searchResearchPop()"><span class="ico_rsch"><em>설문아이콘</em></span>검색결과 설문조사</a>');
		}

		strFSrch.push('</div>');
		strFSrch.push('</form>');

		try {
			if($ID("footerSearch")) {
				$ID("footerSearch").innerHTML = strFSrch.join('');
			}else{
				document.write(strFSrch.join(''));
			}
		} catch(e) {}
	},
	//검색결과 설문조사 팝업
	searchResearchPop : function() {
		var _this = this;

		var url = "http://search.11st.co.kr/jsp/search/include/searchSurveyPop.jsp?kwd=" + _this.searchKeywd + "&targetTab=" + _this.searchTargetTab;
		window.open(url, 'searchResearchPop', 'width=430,height=430,scrollbars=no,status=no,resizable=no');
	},
	init : function() {
		this.setParam();

		if(this.bShowFooterSearch == 'Y') {
			this.drawFooterSearch();
		}
	}
};
IncFooter.search.init();

/*
 * Right Wing Banner
 */
IncFooter.rightWingBanner = {
	area: (typeof(HeaderGnb) === 'undefined') ? 'MAINS' : HeaderGnb.makeGnb.area,
	areaCodePre: (typeof(HeaderGnb) === 'undefined') ? 'MAINS' : HeaderGnb.makeGnb.areaCodePre,
	baseURL : 'http://i.011st.com',
	staticURL : 'http://s.011st.com',
	protocol : window.location.protocol,
	recentPrdData : {},
	recommendPrdData : {},
	prdDispCnt : 2,
	makeBasicWingBnnr : function(){
		var _this = this;

		//특정 페이지에 CSS 추가
		var currentURL = location.href;
		var extraCss = '';
		if( currentURL == 'http://deal.11st.co.kr/html/nc/deal/main.html' || currentURL == 'http://www.11st.co.kr/browsing/ShockingDealAction.tmall?method=getShockingDealMain&shggen=T' ){
			extraCss = ' wing_shockingmain';
		}else if( currentURL.substring(0,36) == 'http://www.11st.co.kr/html/mainTheme' || currentURL.substring(0,46) == 'http://www.11st.co.kr/browsing/MainThemeAction' 
			 || currentURL.substring(0,46) == 'http://www.11st.co.kr/browsing/BrandHomeAction' ){
			extraCss = ' wing_conermain';
		}
		var basicElements = [];
		
		basicElements.push('<div class="wing_banner' + extraCss + '" id="wingBanner" data-log-actionid-area="wing_banner"><!-- 2017-02-17 cyn  스크롤 이벤트 발생시 .wing_fixed 넣어주세요 -->');
		
		basicElements.push('	<!-- 최근 본 상품 -->');
		basicElements.push('	<div class="wing_prd_wrap"  id="wingRecentWrap" style="display:none;">');
		basicElements.push('		<div class="hwrap">');
		basicElements.push('			<!-- 2017-02-22 cyn 타이틀 영역 마크업 수정 -->');
		basicElements.push('			<strong class="tit">');
		basicElements.push('				<a href="#" id="wingRecentCount"><span class="tx">최근 본 상품</span><span class="count">0</span><span class="ico"></span></a>');
		basicElements.push('			</strong>');
		basicElements.push('			<!-- //2017-02-22 cyn 타이틀 영역 마크업 수정 -->');
		basicElements.push('		</div>');
		basicElements.push('		<div class="wing_prd_list" id="windRecentPrdList">');
		basicElements.push('		</div>');
		basicElements.push('		<div class="wing_paging"><!-- 2017-02-17 cyn 상품이 두 개 이하 존재할 경우 페이징 비노출 -->');
		basicElements.push('			<div class="wing_btn" data-log-actionid-label="arrow">');
		basicElements.push('				<button type="button" class="wing_btn_prev" id="wb_btn_recentPrd_prev" data-log-body="{\'arrow\':\'left\'}">이전 상품 리스트</button>');
		basicElements.push('				<button type="button" class="wing_btn_next" id="wb_btn_recentPrd_next" data-log-body="{\'arrow\':\'right\'}">다음 상품 리스트</button>');
		basicElements.push('			</div>');
		basicElements.push('		</div>');
		basicElements.push('		<!-- 최근 본 상품 레이어 -->');
		basicElements.push('		<div class="wing_prd_layer"><!-- 2017-02-17 cyn 레이어 오픈시 .on 넣어주세요 -->');
		basicElements.push('			<ul id="wingRecentPrdListLayer"></ul>');
		basicElements.push('			<button type="button" class="wing_btn_close">최근 본 상품목록 닫기</button>');
		basicElements.push('			<span class="wing_layer_tail"></span>');
		basicElements.push('		</div>');
		basicElements.push('		<!-- //최근 본 상품 레이어 -->');
		basicElements.push('	</div>');
		basicElements.push('	<!-- 최근 본 상품 -->');
			
		basicElements.push('	<!-- 추천 상품 -->');
		basicElements.push('	<div id="wingRecmPrd" class="wing_prd_wrap wing_prd_wrap2" style="display: none;">');
		basicElements.push('		<div class="hwrap">');
		basicElements.push('			<strong class="tit">추천상품</strong>');
		basicElements.push('		</div>');
		basicElements.push('		<div class="wing_prd_list" id="recommendPrdList">');
		basicElements.push('		</div>');
		basicElements.push('		<div class="ad_nwlay">');
		basicElements.push('			<button type="button" class="ad_link" id="wingHelpPopBtn">광고<span class="ico"></span></button>');
		basicElements.push('			<div class="help_pop" style="display:none;" id="wingHelpPop">');
		basicElements.push('				<p>11번가 판매자의 추천상품으로 추천상품 광고 아이템을 구매한 상품입니다.</p>');
		basicElements.push('				<button type="button" class="btn_close" id="wingHelpPopCloseBtn">레이어 닫기</button>');
		basicElements.push('			</div>');
		basicElements.push('		</div>');
		basicElements.push('	</div>');
		basicElements.push('	<!-- 추천 상품 -->');
		
		basicElements.push('	<div class="wing_vis_area" id="dsLeftWingBannerMiddle" data-log-actionid-label="banner"></div>');
		basicElements.push('	<div class="btn_top" data-log-actionid-label="top">');
		basicElements.push('		<a href="#"><!-- 2017-02-17 main페이지 #wrap으로 이동, 서브페이지 #wrapBody로 이동-->');
		basicElements.push('			<img src="' + this.staticURL + '/img/main/wing/img_top.gif" alt="페이지 상단으로 이동">');
		basicElements.push('		</a>');
		basicElements.push('	</div>');
		basicElements.push('</div>');

		return basicElements.join('');
	},
	insertBanner: function () {
		function getNitmusParam(existParam){
			var param = TMCookieUtil.getSubCookie(0,'nitmus');
			var result = "";

			if (param !== ""){
				var delimiter = existParam ? "&" : "?";
				result = delimiter + decodeURIComponent(param);
			}

			return appendTimeStamp(result);
		}

		var adUrl = '//ds.11st.co.kr/NetInsight/text/11st/11st_main/main@2017_main_right' + getNitmusParam(false);
		jQuery.ajax({
			url: adUrl,
			dataType: "script",
			scriptCharset: "euc-kr"
		}).fail(function() {
		    jQuery( "#dsLeftWingBannerMiddle" ).hide();
		}).done(function() {
			jQuery('#dsLeftWingBannerMiddle a').attr('data-log-body', "{'content_name':'"+jQuery('#dsLeftWingBannerMiddle a img').attr('alt') + "', 'content_type':'BANNER'}");
		})
		
	},
	displayWB : function(){
		var _this = this;
		if(_this.protocol == "https:"){
			_this.baseURL = 'https://image.11st.co.kr';
			_this.staticURL = 'https://www.11st.co.kr';
		}
		
		if( jQuery('#layBodyWrap').length > 0 ){
			jQuery("#layBodyWrap").append(_this.makeBasicWingBnnr());
		}else if( jQuery('#container').length > 0 ){
			jQuery("#container").append(_this.makeBasicWingBnnr());
		}
		
		_this.insertBanner();
	},
	recentProduct : {
		totalPrdCount : 0,
		currentPage : 1,
		maxPage : 0,
		getPrd : function() { //최근 본 상품
			//최근 본 상품 정보
			var recentPrd = null;
			var _this = this;
			var _outer = IncFooter.rightWingBanner;
			var dataUrl = _outer.protocol + '//www.11st.co.kr/wingR/WingRBannerAction.tmall?method=getRecentPrd&json=Y&callback=?&currentPage=1&showCount=30';
			jQuery.ajax({
				url : dataUrl,
				dataType : 'jsonp',
				scriptCharset : 'utf-8',
				success : function(data){
					recentPrdData = data;
					_this.totalPrdCount = data.totalCount;
					
					_this.maxPage = Math.ceil(data.totalCount / _outer.prdDispCnt );
					if(  _this.currentPage > _this.maxPage ) {
						_this.currentPage = _this.maxPage;
					}
					
					if(data.totalCount > 0){
						jQuery('#wingRecentWrap').show();
						jQuery('#wingRecentCount span.count').text(data.totalCount);

						for(var i = 1; i <= _this.maxPage; i++){
							jQuery('#windRecentPrdList').append('<ul id="wingRecentPrd_' + i + '" style="display:none;" data-log-actionid-label="recent_product"></ul>');
						}
						
						_this.setPrd('innerPrd');
						
						if(_this.maxPage == 1) {
							jQuery(".wing_paging").hide();
						}
					}else{
						jQuery('#wingRecentWrap').hide();
						jQuery('#wingRecentCount span.count').text(data.totalCount);
					}
					
					recommendPrdData = data.recommendPrdData;
					_outer.recommendPrd.setPrd();
				}
			});
		},
		setPrd : function(area){
			var _this = this;
			var _outer = IncFooter.rightWingBanner;
			var baseLink = 'http://www.11st.co.kr/product/SellerProductDetail.tmall?method=getSellerProductDetail&prdNo=';
			if(area == 'innerPrd'){
				if(jQuery('#wingRecentPrd_'+this.currentPage).children().length == 0){
					var prdData = recentPrdData.DATA[(this.currentPage*2-2)];
					if(prdData){
						jQuery('#wingRecentPrd_' + this.currentPage ).append('<li class="wing_prd" id="' +  prdData.PRD_NO + '"><a href="' + baseLink + prdData.PRD_NO + '" target="_blank" data-log-body="{\'content_name\':\'' + prdData.TXT1 + '\'}"><span class="wing_prd_img"><img src="' + _outer.baseURL + prdData.IMG1+ '" alt="' + prdData.TXT1 + '" onerror="skp11.common.blankImage(this, 60);"></span><span class="wing_prd_info"><span class="p_name">' + prdData.TXT1 + '</span><span class="p_price"><strong>' + prdData.PRC1 + '</strong>원' + (prdData.OPT_YN == 'Y'? '~' : '' ) + '</span></span></a><button type="button" class="wing_btn_delete" prdNo="' +  prdData.PRD_NO + '">목록에서 상품 삭제</button></li>');
					}
					prdData = recentPrdData.DATA[(this.currentPage*2-1)];
					if(prdData){
						jQuery('#wingRecentPrd_' + this.currentPage ).append('<li class="wing_prd" id="' +  prdData.PRD_NO + '"><a href="' + baseLink + prdData.PRD_NO + '" target="_blank" data-log-body="{\'content_name\':\'' + prdData.TXT1 + '\'}"><span class="wing_prd_img"><img src="' + _outer.baseURL + prdData.IMG1+ '" alt="' + prdData.TXT1 + '" onerror="skp11.common.blankImage(this, 60);"></span><span class="wing_prd_info"><span class="p_name">' + prdData.TXT1 + '</span><span class="p_price"><strong>' + prdData.PRC1 + '</strong>원' + (prdData.OPT_YN == 'Y'? '~' : '' ) + '</span></span></a><button type="button" class="wing_btn_delete" prdNo="' +  prdData.PRD_NO + '">목록에서 상품 삭제</button></li>');
					}
				}
				jQuery('#wingRecentPrd_'+this.currentPage).show();
			}
			if(area == 'layerPrd' || jQuery('.wing_prd_wrap > .wing_prd_layer').hasClass('on')){
				var tgtUl = jQuery('#wingRecentPrdListLayer');
				if(jQuery('#wingRecentPrdListLayer').children().length == 0) {
					for(var i = 0; i < recentPrdData.totalCount; i++){
						var prdData = recentPrdData.DATA[i];
						tgtUl.append('<li><a href="' + baseLink + prdData.PRD_NO + '" target="_blank"><span class="wing_prd"><span class="wing_prd_img"><img src="' + _outer.baseURL + prdData.IMG1+ '" alt="' + prdData.TXT1 + '" onerror="skp11.common.blankImage(this, 60);"></span><span class="wing_prd_info2"><span class="p_name">' + prdData.TXT1 + '</span><span class="p_price"><strong>' + prdData.PRC1 + '</strong>원' + (prdData.OPT_YN == 'Y'? '~' : '' ) + '</span></span></span></a><button type="button" class="wing_btn_delete" prdNo="' +  prdData.PRD_NO + '">목록에서 상품 삭제</button></li>');
					}
				}
			}
		},
		deletePrd : function(prdNo){ // 최근 본 상품 삭제
			var _outer = IncFooter.rightWingBanner;
			var _this = this;

			if(!HeaderComm.isEmpty(prdNo)) {
				var dataUrl = _outer.protocol +  '//www.11st.co.kr/wingBanner/WingBannerAjaxAction.tmall?method=deleteRecentViewProductJSON&callback=?&prdNo=' + prdNo;
				jQuery.ajax({
					url : dataUrl,
					dataType : 'jsonp',
					scriptCharset : 'utf-8',
					sync : true,
					success : function(data){
						jQuery('#windRecentPrdList').html('');
						jQuery('#wingRecentPrdListLayer').html('');
						jQuery("#recommendPrdList").html('');
						_this.getPrd();
					}
				});
			}

		},
		nextPage : function(){
			this.currentPage++;
			if(this.currentPage > this.maxPage){
				this.currentPage = 1;
			}
			jQuery('#windRecentPrdList ul').hide();
			this.setPrd('innerPrd');
		},
		prevPage : function() {
			this.currentPage--;
			if(this.currentPage <= 0){
				this.currentPage = this.maxPage;
			}
			jQuery('#windRecentPrdList ul').hide();
			this.setPrd('innerPrd');
		}
	},
	recommendPrd : {
		simpleCallAjax : function(urlList){
            for(var jnx=0; jnx < urlList.length; jnx++){
            	jQuery.ajax({
                    url : urlList[jnx],
                    dataType : 'jsonp'
                });
            }
        },
		setPrd : function(){
			var _this = this;
			var _outer = IncFooter.rightWingBanner;
			
			if(recommendPrdData && recommendPrdData.totalCount > 0){
				var thisData = recommendPrdData.items[0], prdURL = 'http://www.11st.co.kr/product/SellerProductDetail.tmall?method=getSellerProductDetail&prdNo=';
				var recommendPrdHtml = [];
				recommendPrdHtml.push('			<ul data-log-actionid-label="recommend_product">');
				recommendPrdHtml.push('				<li class="wing_prd">');
				recommendPrdHtml.push('					<a href="' + prdURL + thisData.PRD_NO +'" title="새창열기" target="_blank" data-log-body="{\'content_name\':\'' + thisData.TXT1 + '\', \'content_type\':\'PRODUCT\'}">');
				recommendPrdHtml.push('						<span class="wing_prd_img"><img src="' + _outer.baseURL + thisData.IMG2 + '" alt="' + thisData.TXT1 + '" onerror="skp11.common.blankImage(this, 60);"></span>');
				recommendPrdHtml.push('						<span class="wing_prd_info">');
				recommendPrdHtml.push('							<span class="p_name">' + thisData.TXT1 + '</span>');
				recommendPrdHtml.push('							<span class="p_price"><strong>' + thisData.PRC1 + '</strong>원' + (thisData.OPT_YN == 'Y'? '~' : '' ) + '</span>');
				recommendPrdHtml.push('						</span>');
				recommendPrdHtml.push('					</a>');
				recommendPrdHtml.push('				</li>');
				recommendPrdHtml.push('			</ul>');
				
				jQuery("#recommendPrdList").append(recommendPrdHtml.join(''));
				
				//display log 호출
				var adDispTrcUrlList = thisData.AD_DISP_TRC_URL_LIST;
				if(adDispTrcUrlList){
					_this.simpleCallAjax(adDispTrcUrlList);
				}
				
				jQuery("#wingRecmPrd").show();
			}
			
		}
	},
	setWingData : function() {
		this.recentProduct.getPrd();
	},
	initEvent: function () {
		var _this = this;
		var _outer = IncFooter.rightWingBanner;
		var tgtLay = jQuery('.wing_prd_wrap > .wing_prd_layer');
		// 16-10-17 1.5버전으로 다운그레이드 START
		jQuery('#wingBanner').bind({
			click: function (e) {
				var $target = jQuery(e.target);
				
				if ($target.parent().is('#wingRecentCount')) {
					e.preventDefault();
					if (tgtLay.hasClass('on')) {
						tgtLay.removeClass('on');
						jQuery('.wing_banner .wing_prd_wrap .hwrap .tit').removeClass('on')
					} else {
						_outer.recentProduct.setPrd('layerPrd');
						tgtLay.addClass('on');
						jQuery('.wing_banner .wing_prd_wrap .hwrap .tit').addClass('on')
					}
					ga('send','event','PC_스카이스크래퍼','최근 본 상품','최근본상품 전체보기');
				}

				// 최근 본 상품 클릭시
				if ($target.is('#windRecentPrdList span.wing_prd_info') || $target.parent().is('#windRecentPrdList span.wing_prd_info')) {
					ga('send','event','PC_스카이스크래퍼','최근 본 상품','최근본상품 선택');
				}
				// 최근 본 상품 레이어 상품 클릭시
				if ($target.parent().parent().is('#wingRecentPrdListLayer span.wing_prd')) {
					ga('send','event','PC_스카이스크래퍼','최근 본 상품','최근본상품 레이어 전체');
				}
				// 최근본 상품 레이어 닫기 버튼 클릭시
				if ($target.is('button.wing_btn_close')) {
					e.preventDefault();
					if (tgtLay.hasClass('on')) {
						tgtLay.removeClass('on');
						jQuery('.wing_banner .wing_prd_wrap .hwrap .tit').removeClass('on')
					} else {
						tgtLay.addClass('on');
						jQuery('.wing_banner .wing_prd_wrap .hwrap .tit').addClass('on')
					}
				}

				// 최근본 상품 삭제 버튼 클릭시
				if ($target.is('button.wing_btn_delete')) {
					e.preventDefault();
					_outer.recentProduct.deletePrd($target.attr('prdNo'));
				}
				
				//최근 본 상품 페이지 이동
				if($target.is('#wb_btn_recentPrd_prev')){
					ga('send','event','PC_스카이스크래퍼','최근 본 상품','최근본상품 <> 클릭');
					_outer.recentProduct.prevPage();
				}
				if($target.is('#wb_btn_recentPrd_next')){
					ga('send','event','PC_스카이스크래퍼','최근 본 상품','최근본상품 <> 클릭');
					_outer.recentProduct.nextPage();
				}
				
				// 툴바에서 UP 버튼 클릭시
				if ($target.is('.btn_top img')) {
					e.preventDefault();
					ga('send','event','PC_스카이스크래퍼','TOP 버튼','');
					jQuery('html, body').animate({
						'scrollTop' : 0
					}, 500);
				}

				// 추천상품 클릭시
				if ($target.is('#recommendPrdList span.wing_prd_info') || $target.parent().is('#recommendPrdList span.wing_prd_info')) {
					ga('send','event','PC_스카이스크래퍼','추천상품(광고)','추천상품(광고) 클릭');
					var thisData = recommendPrdData.items[0];
					var adClickTrcUrlList = thisData.AD_CLICK_TRC_URL_LIST;
					if(adClickTrcUrlList){
						_outer.recommendPrd.simpleCallAjax(adClickTrcUrlList);
					}
				}
				
				// 광고 툴팁 클릭시
				if ($target.is('#wingHelpPopBtn')) {
					e.preventDefault();
					jQuery('#wingHelpPop').toggle();
					ga('send','event','PC_스카이스크래퍼','추천상품(광고)','광고? 클릭');
				}
				// 광고 툴팁 닫기버튼 클릭 시
				if ($target.is('#wingHelpPopCloseBtn')) {
					e.preventDefault();
					jQuery('#wingHelpPop').toggle();
				}
				
				if ($target.parent().parent().is('#dsLeftWingBannerMiddle')) {
					ga('send','event','PC_스카이스크래퍼','광고배너','');
				}
			}
		});

		jQuery('#recommendPrdList > ul > li').bind({
			click: function (thisObj) {
				
				var $target = jQuery(thisObj.currentTarget);
				
				var prdNo = $target.attr('data-prdno');
				var typGubn = $target.attr('data-typecd');
				var areaGubn = $target.attr('data-areacd');
				var trcNo = $target.attr('data-trcno');
				
				stck(typGubn, areaGubn, trcNo);
				ad_headerCommonJs.util.instance.ConversionCookieQueue.add(trcNo, prdNo, (typGubn + '' + areaGubn));
			}
		});
	},
	
	wingBannerPosition : function() {
		if( jQuery('#wingBanner').length > 0 ){
			// 초기 높이 및 기준 높이
			var WBTopPosition = jQuery('#wingBanner').offset().top;
			jQuery(window).scroll(function() {
				var sct = (document.body.scrollTop) ? document.body.scrollTop : document.documentElement.scrollTop;
				if(isIE6){
					if(sct <= WBTopPosition){
						jQuery('#wingBanner').removeClass('wing_fixed');
					}
					else{
						jQuery('#wingBanner').addClass('wing_fixed');
					}
				}else{
					if(sct <= WBTopPosition){
						jQuery('#wingBanner').removeClass('wing_fixed');
					}
					else
					{
						jQuery('#wingBanner').addClass('wing_fixed');
					}
				}
			});
		}
	},
	init : function() {
		if (isWingBnnr) {
			this.displayWB();
			this.initEvent();
			this.wingBannerPosition();
			this.setWingData();
		}
	}
};
jQuery(document).ready(function(){
	IncFooter.rightWingBanner.init();
});

/*
 * OM Footer
 */
'use strict';

IncFooter.footer = {
	area: (typeof(HeaderGnb) === 'undefined') ? 'MAINS' : HeaderGnb.makeGnb.area,
	areaCodePre: (typeof(HeaderGnb) === 'undefined') ? 'MAINS' : HeaderGnb.makeGnb.areaCodePre,
	baseURL : 'http://i.011st.com',
	staticURL : 'http://s.011st.com',
	protocol : window.location.protocol,

	displayWB : function(){
		var _this = this;
		if(_this.protocol == "https:"){
			_this.baseURL = 'https://image.11st.co.kr';
			_this.staticURL = 'https://www.11st.co.kr';
		} else{
		}
	},
	
	drawExtraArea: function () {
		var strExtraArea = [];
		strExtraArea.push('<div id="myHistoryArea" class="my_history2_wrap" style="display:none"></div>'); // My History Div
		strExtraArea.push('<div id="newFooterAdArea" class="ftr_banner_wrap" style="display:none"></div>'); // Footer AD Banner Area
		document.write(strExtraArea.join(''));
	},

	drawFooter: function () {
		var _this = this;
		var element = [];

		element.push('<div id="footerWrap3" class="footer_wrap3">');
		element.push('	<div class="f_menu">');
		element.push('	    <ul class="menu_conts clfix" data-log-actionid-area="footer" data-log-actionid-label="btn">');
		element.push('		    <li><a href="' + _GNB_CONTEXT_PATH_ + '/commons/CommonAbout.tmall?method=corp1_1" onclick="popupFromFooter(this.href,\'FOOTER_POP\');doCommonStat(\'' + _this.areaCodePre + 'FO0201\'); rakeLog.sendRakeLog(this); return false;" target="_blank" title="새창 열림" data-log-body="{\'btn_name\':\'회사소개\'}"><span>회사소개</span></a></li>');
		element.push('		    <li><a href="' + _GNB_CONTEXT_PATH_ + '/annc/AnncMainPreview.tmall?method=getProvision&anncCd=01" onclick="popupFromFooter(this.href,\'FOOTER_POP\');doCommonStat(\'' + _this.areaCodePre + 'FO0202\'); rakeLog.sendRakeLog(this); return false;" target="_blank" title="새창 열림" data-log-body="{\'btn_name\':\'이용약관\'}"><span>이용약관</span></a></li>');
		element.push('		    <li><a href="' + _GNB_CONTEXT_PATH_ + '/annc/AnncMainPreview.tmall?method=getProvision&anncCd=06" onclick="popupFromFooter(this.href,\'FOOTER_POP\');doCommonStat(\'' + _this.areaCodePre + 'FO0203\'); rakeLog.sendRakeLog(this); return false;" target="_blank" title="새창 열림" data-log-body="{\'btn_name\':\'전자금융거래약관\'}"><span>전자금융거래약관</span></a></li>');
		element.push('		    <li><a href="' + _GNB_CONTEXT_PATH_ + '/annc/AnncMainPreview.tmall?method=getProvision&anncCd=03" onclick="popupFromFooter(this.href,\'FOOTER_POP\');doCommonStat(\'' + _this.areaCodePre + 'FO0204\'); rakeLog.sendRakeLog(this); return false;" target="_blank" title="새창 열림" data-log-body="{\'btn_name\':\'개인정보처리방침\'}"><strong>개인정보처리방침</strong></a></li>');
		element.push('		    <li><a href="' + _GNB_CONTEXT_PATH_ + '/commons/CommonAbout.tmall?method=corp1_2" onclick="popupFromFooter(this.href,\'FOOTER_POP\');doCommonStat(\'' + _this.areaCodePre + 'FO0205\'); rakeLog.sendRakeLog(this); return false;" target="_blank" title="새창 열림" data-log-body="{\'btn_name\':\'입점문의\'}"><span>입점문의</span></a></li>');
		element.push('		    <li><a href="' + _SELLER_URL_ + '" onclick="popupFromFooter(this.href,\'FOOTER_POP\');doCommonStat(\'' + _this.areaCodePre + 'FO0206\'); rakeLog.sendRakeLog(this); return false;" target="_blank" title="새창 열림" data-log-body="{\'btn_name\':\'셀러존\'}"><span>셀러존</span></a></li>');
		element.push('		    <li><a href="' + _GNB_CONTEXT_PATH_ + '/brandadcenter/Main.tmall" onclick="popupFromFooter(this.href,\'FOOTER_POP\');doCommonStat(\'' + _this.areaCodePre + 'FO0207\'); rakeLog.sendRakeLog(this); return false;" target="_blank" title="새창 열림" data-log-body="{\'btn_name\':\'브랜드광고센터\'}"><span>브랜드광고센터</span></a></li>');
		element.push('		    <li><a href="' + _GNB_CONTEXT_PATH_ + '/safety/SafetyMain.tmall" onclick="popupFromFooter(this.href,\'FOOTER_POP\');doCommonStat(\'' + _this.areaCodePre + 'FO0208\'); rakeLog.sendRakeLog(this); return false;" target="_blank" title="새창 열림" data-log-body="{\'btn_name\':\'안전거래센터\'}"><span>안전거래센터</span></a></li>');
		element.push('		    <li><a href="http://openapi.11st.co.kr/openapi/OpenApiIndex.tmall" onclick="popupFromFooter(this.href,\'FOOTER_POP\');doCommonStat(\'' + _this.areaCodePre + 'FO0210\'); rakeLog.sendRakeLog(this); return false;" target="_blank" title="새창 열림" data-log-body="{\'btn_name\':\'Open API\'}"><span>Open API</span></a></li>');
		element.push('		    <li><a href="' + _GNB_CONTEXT_PATH_ + '/commons/CommonAbout.tmall?method=serviceMap" onclick="popupFromFooter(this.href,\'FOOTER_POP\');doCommonStat(\'' + _this.areaCodePre + 'FO0211\'); rakeLog.sendRakeLog(this); return false;" target="_blank" title="새창 열림" data-log-body="{\'btn_name\':\'서비스맵\'}"><span>서비스맵</span></a></li>');
		element.push('	    </ul>');
		element.push('	</div>');

		element.push('	<div class="f_info">');
		element.push('	    <div class="add_sk">');
		element.push('          <dl>');
		element.push('              <dt>SK플래닛(주)</dt>');
		element.push('              <dd>(13487) 경기도 성남시 분당구 판교로 264 (삼평동)</dd>');
		element.push('              <dd>대표이사 : 서성원 <span class="pd">사업자등록번호 : 104-86-36968</span><a href="http://www.ftc.go.kr/info/bizinfo/communicationView.jsp?apv_perm_no=2014378021930200030&area1=&area2=&currpage=1&searchKey=04&searchVal=1048636968&stdate=&enddate=" onclick="popupFromFooter(this.href,\'FOOTER_POP\');doCommonStat(\'' + _this.areaCodePre + 'FO0302\');return false;" target="_blank" title="새 창" class="btn_small arr">사업자정보확인<span class="ico"></span></a></dd>');
		element.push('              <dd>통신판매업신고 : 2014-경기성남-0036</dd>');
		element.push('              <dd>Tel: 1599-0110 <span class="pd">Fax: 02-849-4962</span></dd>');
		element.push('          </dl>');
		element.push('          <span class="logo"></span>');
		element.push('	    </div>');
		element.push('	    <div class="add_center">');
		element.push('          <dl>');
		element.push('              <dt>고객센터</dt>');
		element.push('              <dd>(08378) 서울특별시 구로구 디지털로 306 (구로동)</dd>');
		element.push('              <dd>Tel : 1599-0110 <a href="http://help.11st.co.kr/11st/faq/FaqIndex.jsp" onclick="doCommonStat(\'' + _this.areaCodePre + 'FO0301\');" target="_blank" class="btn_f_arr">전화전클릭</a></dd>');
		element.push('              <dd>Fax : 02-849-4962</dd>');
		element.push('              <dd>E-mail : <a href="http://help.11st.co.kr/11st/mail/MailQuestion.jsp" onclick="popupFromFooter(this.href,\'FOOTER_POP\');return false;">customerservice@11st.co.kr</a></dd>');
		element.push('          </dl>');
		element.push('	    </div>');
		element.push('	    <div class="add_ele">');
		element.push('         <dl>');
		element.push('              <dt>전자금융거래분쟁담당</dt>');
		element.push('              <dd>Tel : 1599-0110</dd>');
		element.push('              <dd>Fax : 02-849-4962</dd>');
		element.push('              <dd>E-mail : <a href="http://help.11st.co.kr/11st/mail/MailQuestion.jsp" onclick="popupFromFooter(this.href,\'FOOTER_POP\');return false;">customerservice@11st.co.kr</a></dd>');
		element.push('          </dl>');
		element.push('	    </div>');
		element.push('	    <div class="info_conts">');
		element.push('	        <div class="fr">');
		element.push('	            <button type="button" class="btn_small" onClick="FooterComm.prdImgToggle.init(this);doCommonStat(\'' + _this.areaCodePre + 'FO0501\');">이미지 정지</button>');
		element.push('	            <div class="fam_wrap">');
		element.push('		            <button type="button" onClick="familyLink();doCommonStat(\'' + _this.areaCodePre + 'FO0601\')">Family Site<span class="ico"></span></button>'); // 16-08-29 수정
		element.push('		            <ul id="familyLink_sub" style="display:none">');
		element.push('			            <li><a href="http://www.sktelecom.com" onclick="popupFromFooter(this.href,\'FOOTER_POP\');return false;" target="_blank" title="새창 열림">SK Telecom</a></li>');
		element.push('			            <li><a href="http://www.skplanet.com" onclick="popupFromFooter(this.href,\'FOOTER_POP\');return false;" target="_blank" title="새창 열림">SK Planet</a></li>');
		element.push('			            <li><a href="http://www.sksports.net/index.asp" onclick="popupFromFooter(this.href,\'FOOTER_POP\');return false;" target="_blank" title="새창 열림">SK스포츠단</a></li>');
		element.push('			            <li><a href="http://www.skbroadband.com" onclick="popupFromFooter(this.href,\'FOOTER_POP\');return false;" target="_blank" title="새창 열림">SK브로드밴드</a></li>');
		element.push('			            <li><a href="http://www.nate.com" onclick="popupFromFooter(this.href,\'FOOTER_POP\');return false;" target="_blank" title="새창 열림">NATE</a></li>');
		element.push('		            </ul>');
		element.push('	            </div>');
		element.push('	        </div>');
		element.push('	        <div class="btnwrap">');
		element.push('		        <a href="' + _GNB_CONTEXT_PATH_ + '/browsing/MembershipBenefitPlace.tmall?method=getCompensationBenefit&addCtgrNo=952005" onclick="popupFromFooter(this.href,\'FOOTER_POP\');doCommonStat(\'' + _this.areaCodePre + 'FO0401\');return false;" target="_blank" title="새창 열림" class="btn_small">최저가110%보상제</a>');
		element.push('		        <a href="' + _GNB_CONTEXT_PATH_ + '/browsing/MembershipBenefitPlace.tmall?method=getCompensationBenefit&addCtgrNo=952020&tabIdx=2" onclick="popupFromFooter(this.href,\'FOOTER_POP\');doCommonStat(\'' + _this.areaCodePre + 'FO0402\');return false;" target="_blank" title="새창 열림" class="btn_small">위조품110%보상제</a>');
		element.push('		        <a href="' + _GNB_CONTEXT_PATH_ + '/browsing/MembershipBenefitPlace.tmall?method=getCompensationBenefit&addCtgrNo=952021&tabIdx=3" onclick="popupFromFooter(this.href,\'FOOTER_POP\');doCommonStat(\'' + _this.areaCodePre + 'FO0403\');return false;" target="_blank" title="새창 열림" class="btn_small">고객실수 보상서비스</a>');
		element.push('		        <a href="http://help.11st.co.kr" onclick="popupFromFooter(this.href,\'FOOTER_POP\');doCommonStat(\'' + _this.areaCodePre + 'FO0404\');return false;" target="_blank" title="새창 열림" class="btn_small">24시간 콜센터</a>');
		element.push('	        </div>');
		element.push('		    <p class="txt">SK플래닛(주)는 통신판매중개자로서 오픈마켓 11번가의 거래당사자가 아니며, 입점판매자가 등록한 상품정보 및 거래에 대해 SK플래닛(주)는 일체 책임을 지지 않습니다.</p>');
		element.push('		    <p class="copy">Copyright SK planet. All rights reserved.</p>');
		element.push('	    </div>');

		if (_this.area === 'main') {
			element.push('	</div>');
			element.push(Main.footer.MainAwardArea());
			element.push('</div>');
		} else {
			element.push('</div>');
		}
		
		try{
			if(isMobile){
				var mobileLink = 'http://m.11st.co.kr/MW/';
				if ( this.isBookDomain() ) {
					mobileLink = 'http://books.m.11st.co.kr/MW/';
				}

				element.push('<a href="' + mobileLink + '" class="go_mobileW"><span>모바일 버전으로 보기</span></a>');
			}
		}catch(e){}

		document.write(element.join(''));
	},
	
	toolbarEvent: function () {
		var _this = this;

		jQuery('#footerWrap3').find('button.btn_small').bind({
			click : function () {
				var $this = jQuery(this);

				if ($this.is('.on')) {
					$this.html('이미지 정지').removeClass('on');
				} else {
					$this.html('이미지 동작').addClass('on');
				}
			}
		});
	},
	
	isBookDomain: function () {
		return window.location.host === 'books.11st.co.kr';
	},

	drawEndBodyWrap: function () {
		document.write('</div>');	// end wrapBody - inc_header.js에서 생성
	},
	
	init : function() {
		var _this = this;
		_this.displayWB();
		_this.drawExtraArea();
		
		jQuery(document).ready(function () {
			jQuery(document).ready(function () {
				jQuery('#footerWrap3').addClass('no_toolbar');
			});
		});
		_this.toolbarEvent();
		_this.drawFooter();
		_this.drawEndBodyWrap();
	}
};

IncFooter.footer.init();

function familyLink()	{
	var $familyLink = jQuery('#familyLink_sub');
	if($familyLink.is(':visible')) {
		$familyLink.hide().parent().removeClass('on');
	} else	{
		$familyLink.show().parent().addClass('on');
	}
}

var footerPopup = "";
function popupFromFooter(url, popupName){

	if(footerPopup == undefined || footerPopup == ""){
		footerPopup = window.open(url, popupName);
	}else{
		footerPopup = window.open(url, popupName);
		footerPopup.focus();
	}
}

// ============================= 코딩팀시작
// 열리고 닫힘 높이
//080109_2 추가
function	 topLink()	{
	if(document.body.scrollTop)
		document.body.scrollTop = 0;
	else
		document.documentElement.scrollTop = 0;
}
//__080109_2 추가

var divAccount = document.getElementById("layAccount");
function setY(open,classV){

	if(!classV) classV="acHeight1";
	if (classV=="acHeight1")		H=27;
	else							H=145;

	divAccount.style.height=H + "px";
}
// ============================= 코딩팀시작
/** xtractor_cookie.js Start *****/
function makeXTVIDCookie() {
    if (! isXTVID()) {
        setXTVIDCookie();
	}
}

function isXTVID() {
	var vid = getXTCookie("XTVID");
	if(vid != null && vid != "") {
		return true;
	}
	return false;
}

function getXTCookie(name) {
    var cookies = document.cookie.split("; ");
    for (var i=0; i < cookies.length; i++)  {
        var cPos = cookies[i].indexOf( "=" );
        var cName = cookies[i].substring( 0, cPos );
        if ( cName == name ) {
            return unescape( cookies[i].substring( cPos + 1 ) );
        }
    }
    return "";
}

function setXTVIDCookie(){
    var randomid = Math.floor(Math.random()* 1000);
    var xtvid = "A" + makeXTVIDValue() + randomid;
	expireDate = new Date();
	expireDate.setYear(expireDate.getYear()+ 10);

	setXTCookie("XTVID", xtvid, 365*10, "/", getXDomain());
}

function setXTLIDCookie(userNo){
    setXTCookie("XTLID", userNo, -1, "/", getXDomain());
}

function removeXTCookie(name){
    setXTCookie(name, "", 0, "/", getXDomain());
}

function setXTCookie(name, value, expires, path, domain){
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expires);
    var expiresInfo = (expires < 0)? '' : todayDate.toGMTString();
    document.cookie = name + "=" +escape(value) + ";" + "path=" + path + ";domain=" + domain + ";expires="+ expiresInfo;
}

function getXDomain() {
	var host = document.domain;
	var tokens = host.split('.');
	var xdomain = tokens[tokens.length-2] + '.' + tokens[tokens.length-1];
	return (tokens[tokens.length-1].length == 2) ? tokens[tokens.length-3] + '.' + xdomain : xdomain;
}

function makeXTVIDValue() {
    var str = '';
    nowdate = new Date();
    digit = nowdate.getYear();
    if (digit < 2000) {
		digit = digit - 1900;
    } else {
		digit = digit - 2000;
	}
	str += paddingNo(digit);

    digit = nowdate.getMonth() + 1;
	str += paddingNo(digit);

    digit = nowdate.getDate();
	str += paddingNo(digit);

    digit = nowdate.getHours();
	str += paddingNo(digit);

	digit = nowdate.getMinutes();
	str += paddingNo(digit);

    digit = nowdate.getSeconds();
	str += paddingNo(digit);

    digit = nowdate.getMilliseconds();
	if ((digit <= 99) && (digit > 9)) {
        str += '0' + digit;
    } else if (digit <= 9) {
        str += '00' + digit;
    } else {
		str += '' + digit;
	}
    return str;
}

function paddingNo(val) {
	var st = '';
	if (val <= 9) {
		st += '0' + val;
	} else {
		st = '' + val;
	}
	return st;
}

try  {
	var t_prd_list = "";
	var t_cells = document.getElementsByTagName("a");
	var prdNoReg = new RegExp("prdNo=[0-9]*","g");
	var t_prePrdNo = ""
	for (var i = 0; i < t_cells.length; i++) {
		var t_link = t_cells[i].getAttribute("href");
		if ( t_link == null ) continue;
		var t_prdNos = t_link.match( prdNoReg );
		var t_prdNo = ""
		if ( t_prdNos != null && t_prdNos.length > 0 ) {
			if ( t_link.indexOf("SellerProductDetail.tmall") > 0 && t_prdNos[0].length > 6 ) {
				t_prdNo = t_prdNos[0].substring( 6 );
				if ( t_prePrdNo != t_prdNo ) {
					t_prd_list = t_prd_list + t_prdNo +"^";
					t_prePrdNo = t_prdNo;
				}
			}
		}
	}
} catch (t_ex) {}

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

	while (i < clen) {
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
	var expiredDate = new Date(2020,1,1);
	var cookie;
	var value;

	cookie = Nethru_GetCookie(name);
	if ( cookie ) {		//이미 존재하는지 확인
   		return 1;
	}

	var values = new Array();
	for ( i=0; i < length ; i++ ) {
		values[i] = "" + Math.random();
	}

	value = today.getTime();

	// use first decimal
	for ( i=0; i < length ; i++ ) {
		value += values[i].charAt(2);
	}

	Nethru_SetCookie(name,value,expiredDate,path,domain);
}

function Nethru_getDomain() {
	var _host   = document.domain;
	var so = _host.split('.');
	var dm  = so[so.length-2] + '.' + so[so.length-1];

	return (so[so.length-1].length == 2) ? so[so.length-3] + '.' + dm : dm;
}

var Nethru_domain  = Nethru_getDomain();

Nethru_makePersistentCookie("PCID",10,"/",Nethru_domain);

// 특수문자 치환
function fncRemoveScriptTag(str){
	var specialChars='<>()';
	var result=str;
	var i, j;

	if(result != null){
		if(result.indexOf("script") >= 0 || result.indexOf("iframe") >= 0 || result.indexOf("alert") >= 0)
		for (i = 0; i < result.length; i++) {
			for (j = 0; j < specialChars.length; j++) {
				if (result.charAt(i) == specialChars.charAt(j))
					result = result.replace(result.charAt(i), " ");
			}
		}
	}

	return result;
}

jQuery(document).ready(
	function() {
		try {
			var isCheck = TMCookieUtil.isExist(0, 'scrnChk');

			if ( !isCheck ) {
				var	i =	new	Image();
				var protocol = window.location.protocol;
				var width = window.screen.width;
				var height = window.screen.height;
				i.src =	protocol + '//www.11st.co.kr/st/screen.st?resolution=' + width + 'x' + height + '&isMobile=n';
				TMCookieUtil.add(0, 'scrnChk', 'Y');
			}
		} catch (ex) {}
	}
); 