var CtlgDeclare = {
	ctlgVar : null,
	$popBtn: $('#ctlgDeclareBtn'),
	$popCloseBtn: $('#ctlgDeclareCloseBtn'),
	$procBtn: $('#ctlgDeclareProcBtn'),
	isProcess : false,
	init: function(ctlgVar) {
		this.ctlgVar = ctlgVar;
		this.setHandler();
	},
	initData: function() {
		$('input:checkbox[name="dclTypCd"]:checked').removeAttr('checked');
		$('#dclCont').val('');
		$('#emailRcvYn').removeAttr('checked');
	},
	setHandler: function() {
		var _this = this;
		this.$popBtn.on('click', function() {
			if( _this.ctlgVar.Common.isLogin === 'true' ) {
				_this.initData();
				mwUI.layerPopTop('popDeclare');
				$('html, body').animate({scrollTop : 0}, 400);
			} else {
				document.location.href = _this.ctlgVar.Const.SK_HTTP_SSL_CONTEXT_URL + '/Login/login.tmall?returnURL=' + encodeURIComponent(encodeURIComponent(document.location.href));
			}
		});
		
		this.$popCloseBtn.on('click', function() {
			_this.close();
			return false;
		});
		
		this.$procBtn.on('click', function() {
			_this.submit();
			return false;
		});
	},
	bytelength: function(str) {
		var i, ch;
		var len = str.length;
		for (i = 0; i < str.length; i++) {
			ch = str.substr(i,1).charCodeAt(0);
			if (ch > 127) { len++; }
		}
		return len;
	},
	close: function() {
		mwUI.layerPopClose('popDeclare');
	},
	submit: function() {
		var _this = this;
		
		if( $('input:checkbox[name="dclTypCd"]').is(':checked') === false ) {
			alert('신고 유형을 1개 이상 선택해 주세요.');
			return;
		}
		
		var $dclContObj = $('#dclCont');
		
		if( _this.bytelength($dclContObj.val()) > 1000 ) {
			alert('한글 기준 500자 까지 입력 가능합니다.');
			$dclContObj.focus();
			return;
		}
		
		var dclTypCdStr = [];
		
		$('input:checkbox[name="dclTypCd"]:checked').each(function() {
			dclTypCdStr.push($(this).val());
		});
		
		if( _this.isProcess ) {
			alert('처리 중입니다.');
			return;
		}
		
		var paramData = {
			'ctlgNo' : _this.ctlgVar.catalogNo
			, 'dclTypCdStr' : dclTypCdStr.join(',')
			, 'dclCont' : encodeURIComponent($dclContObj.val())
			, 'emailRcvYn' : $('#emailRcvYn').is(':checked') ? 'Y' : 'N'
		};
		
		$.ajax({
			url: _this.ctlgVar.Const.SK_HTTP_CONTEXT_URL + '/Catalog/catalogDeclareRegister.tmall'
			,dataType : 'json'
			,data : paramData
			,type : 'post'
			,async : true
			,success : function(json){
				_this.isProcess = false;
				if( json.RESULT_CODE == 'SUCCESS' ) {
					alert('가격비교 신고가 정상 "접수"되었습니다.\n고객님의 소중한 의견 감사 드리며, 신고 내용 확인 후 빠른 시일 내에 조치할 수 있도록 하겠습니다.');
					_this.close();
				} else if( json.RESULT_CODE == 'ERROR' && json.ERROR_MSG != null && json.ERROR_MSG != '' ) {
					alert(json.ERROR_MSG);
				} else {
					alert('처리 중 오류가 발생하였습니다.');
				}
			}
			,error:function(xhr, status, err){
				_this.isProcess = false;
				alert('처리 중 오류가 발생하였습니다.');
			}
		});
	}
};