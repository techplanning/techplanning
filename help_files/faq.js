<!--
/**
 * FAQ 검색시 호출되는 함수이다.
 */
function searchFaq(text)
{
	var inForm = document.rarForm;
	inForm.question.value = text;
	inForm.action = urlWebCtx + "/faq/RarList.jsp";
   	inForm.submit();
}

/**
 * TOP 10 마우스 오버시 표시되는 메소드이다.
 */
function topKeywordScrollMouseOver(flag)
{
	if (flag)
	{
		var pos = Position.cumulativeOffset($('topKeywordScrollTd'));
		$("topKeywordScrollOverId").style.left = pos[0] + "px";
		$("topKeywordScrollOverId").style.top = pos[1] + "px";
		$("topKeywordScrollOverId").style.display = "";
	}
	else
	{
		$("topKeywordScrollOverId").style.display = "none";
	}
}

/**
 * KB 페이지 이동을 위한  메소드이다.
 */
function goto(pageNo)
{
	var inForm = document.listForm;
	inForm.nodeId.value = initNodeId;
	inForm.pageNo.value = pageNo;
	inForm.submit();
}

/**
 * KB 팝업/페이지 이동 방식 상세보기 화면에서 이전글 버튼을 눌렀을 때 사용하는 메소드이다.
 */
function clickPrevKbId()
{
	var inForm = document.answerForm;
	var prevKbId = $("btnPrevKbId").getAttribute("kbId");
	if (prevKbId == "0")
	{
		alert("처음글입니다.");
	}
	else
	{
		inForm.kbId.value = prevKbId;
		inForm.submit();
	}
}

/**
 * KB 팝업/페이지 이동 방식 상세보기 화면에서 다음글 버튼을 눌렀을 때 사용하는 메소드이다.
 */
function clickNextKbId()
{
	var inForm = document.answerForm;
	var nextKbId = $("btnNextKbId").getAttribute("kbId");
	if(nextKbId == "0")
	{
		alert("마지막글입니다.");
	}
	else
	{
		inForm.kbId.value = nextKbId;
		inForm.submit();
	}
}

/**
 * KB 페이지 이동 방식 상세보기 화면에서 목록화면으로 가기 위해 사용하는 메소드이다.
 */
function clickList()
{
	var inForm = document.answerForm;
	if(inForm.surveyType.value == "FAQAF")
	{
		inForm.action = urlWebCtx + "/faq/FaqList.jsp";	// FAQ 목록에서 왔을 때
	}
	else
	{
		inForm.action = urlWebCtx + "/faq/RarList.jsp";	// 자동검색 목록에서 왔을 때
	}
	inForm.submit();
}

/**
 * KB 카테고리 이동을 위해 사용하는 메소드이다.
 */
function clickNode(nodeId, inForm)
{
	inForm.nodeId.value = nodeId;
	inForm.pageNo.value = 1;
	inForm.action = urlWebCtx + "/faq/FaqList.jsp";
	inForm.submit();
}

//hslee:11st custmizing. 안전거래 가이드 카테고리 전용.
function clickSafetyTradeNode(nodeId)
{
    var inForm = $('listForm');
    if(typeof inForm == 'undefined' || inForm == null)
    {
        inForm = $('answerForm');
    }

    //hslee:Left menu navigation info reset.
    inForm.leftNodeId1st.value = "";

    try
    {
        //hslee:안전거래 카테고리 선택시 말단에서 사용되는 정보인 parentNodeId 값은 reset.
        inForm.parentNodeId.value = "";

        //hslee:Rar 폼에서 Faq 폼으로 전환될때는 검색조건 reset.
        inForm.nodeId1st.value = "";
        inForm.nodeId2nd.value = "";
        inForm.question.value = "";
    }
    catch(e) {}

    inForm.nodeId.value = nodeId;
    inForm.pageNo.value = 1;
    inForm.action = urlWebCtx + "/faq/FaqList.jsp";
    inForm.submit();
}

//hslee:11st custmizing.
function clickTopn(nodeId, parentNodeId, kbId)
{
    var inForm = $('listForm');
    if(typeof inForm == 'undefined' || inForm == null)
    {
        inForm = $('answerForm');
    }

    try
    {
        //hslee:Rar 폼에서 Faq 폼으로 전환될때는 검색조건 reset.
        inForm.nodeId1st.value = "";
        inForm.nodeId2nd.value = "";
        inForm.question.value = "";
    }
    catch(e) {}

    //hslee:Top10, new FAQ를 통해 상세페이지를 갈경우 페이지번호를 0로 세팅처리. (체크용도. 실제 페이지는 1로 세팅됨)
    inForm.pageNo.value = "0";

    inForm.surveyType.value = "FAQAF";
    inForm.nodeId.value = nodeId;
    inForm.parentNodeId.value = parentNodeId;
    inForm.kbId.value = kbId;
    inForm.action = urlWebCtx + "/faq/FaqAnswer.jsp";
    inForm.submit();
}

//hslee:11st custmizing.
function clickPrevNextKb(nodeId, parentNodeId, kbId, targetNo)
{
    var inForm = $('answerForm');

    inForm.nodeId.value = nodeId;
    inForm.parentNodeId.value = parentNodeId;
    inForm.kbId.value = kbId;
    inForm.targetNo.value = targetNo;
    inForm.action = urlWebCtx + "/faq/FaqAnswer.jsp";
    inForm.submit();
}

//hslee:11st custmizing.
function clickNode(nodeId)
{
    var inForm = $('listForm');
    if(typeof inForm == 'undefined' || inForm == null)
    {
        inForm = $('answerForm');
    }

    try
    {
        //hslee:Rar 폼에서 Faq 폼으로 전환될때는 검색조건 reset.
        inForm.nodeId1st.value = "";
        inForm.nodeId2nd.value = "";
        inForm.question.value = "";
    }
    catch(e) {}

    inForm.nodeId.value = nodeId;
    inForm.pageNo.value = 1;
    inForm.action = urlWebCtx + "/faq/FaqList.jsp";
    inForm.submit();
}

//hslee:11st custmizing. 3, 2차 카테고리 click. (Book, Beauty에서는 2, 1차)
function clickParentNode(nodeId, leftNodeId1st)
{
    var inForm = $('listForm');
    if(typeof inForm == 'undefined' || inForm == null)
    {
        inForm = $('answerForm');
    }

    //hslee:강제 연속클릭시 페이지 리로딩 처리.
    if(typeof inForm == 'undefined' || inForm == null)
    {
        location.reload();
        return false;
    }

    if(typeof leftNodeId1st == 'undefined' || leftNodeId1st == null)
    {
        inForm.leftNodeId1st.value = nodeId;
    }
    else
    {
        inForm.leftNodeId1st.value = leftNodeId1st;
    }

    try
    {
        //hslee:상담 2,3차 카테고리 선택시 말단에서 사용되는 정보인 parentNodeId 값은 reset.
        inForm.parentNodeId.value = "";

        //hslee:Rar 폼에서 Faq 폼으로 전환될때는 검색조건 reset.
        inForm.nodeId1st.value = "";
        inForm.nodeId2nd.value = "";
        inForm.question.value = "";
    }
    catch(e) {}
    inForm.nodeId.value = nodeId;
    inForm.pageNo.value = 1;
    inForm.action = urlWebCtx + "/faq/FaqList.jsp";
    inForm.submit();
}

/**
 * KB 상세 내용을 보기 위한  메소드이다.
 */
var faqAnswer = Class.create();
/* 드롭다운 상세보기에서 새로운 FAQ를 열 때, 열려있던 FAQ를 닫기 위해 이전 FAQ 엘리먼트를 저장 */
var oldCtrl = "";
faqAnswer.prototype =
{
	browser : getBrowserInfoEE(),						// 브라우져 정보
	initialize: function(ctrl, page, tooltip, logId, nodeId)
	{
		this.ctrl = ctrl;							// 엘리먼트명
        this.page = page;							// 페이지 이동방법
    	this.kb_id = ctrl.getAttribute("kbId");		// 엘리먼트의 kbId 속성 값을 읽어온다.
    	this.target_no = ctrl.getAttribute("targetNo"); //hslee:엘리먼트의 targetNo 속성 값을 읽어온다.
		this.tooltip = tooltip || "Y";				// 툴팁 사용 여부
        this.mouse_over = false;					// 툴팁 사용시 해당 Faq에 마우스 over 되어 있는지 여부
        this.logId = logId || "";					// Rar 검색일 때는 검색로그 ID가 넘어온다.
		this.nodeId = nodeId						// FAQ의 노드 아이디 (검색목록에서 사용)

      	Event.observe(this.ctrl, "click", this.faqClick.bindAsEventListener(this), false);	// FAQ 클릭 이벤트 정의
		ctrl.onclick = function(){return false;};

		try
        {
		    this.tr = this.ctrl.up("tr");             // 클릭한 FAQ가 속해있는 TR

		    // mod. mrshin. 20100930. 주석처리
    		//Event.observe(this.tr, "mouseover", this.trMouseOver.bindAsEventListener(this), false);
    		//Event.observe(this.tr, "mouseout", this.trMouseOut.bindAsEventListener(this), false);
        	if(this.tooltip == "Y")
    		{
    			/* 제목 툴팁 설정 */
    			Event.observe(this.ctrl, "mouseover", this.tooltipOn.bindAsEventListener(this), false);
    			/* 제목 툴팁 해제 */
    			Event.observe(this.ctrl, "mouseout", this.tooltipOff.bindAsEventListener(this), false);
    		}
		}
		catch(e)
		{
		    //hslee:기존 함수가 table에 생성되는 것을 기준으로 작성되어있어서, try문으로 감쌈.
		}
	},

	trMouseOver: function()
    {
    	this.tr.className = "list_over";
    },

	trMouseOut: function()
    {
    	if(oldCtrl != this.ctrl)
    	{
    		this.tr.className = "list_out";
    	}
    },

	tooltipOn: function()
    {
    	var url = urlWebCtx + "/faq/FaqContents.jsp";		// FAQ 상세 내용을 읽어올 페이지
        var inForm = document.listForm;
        inForm.kbId.value = this.kb_id;
        var params = Form.serialize(inForm);

    	/* 질문내용 가져오는 부분 */
        var myAjax = new Ajax.Request (
            url, {method: 'post', parameters: params, onComplete: this.makeContents.bindAsEventListener(this)}
        );
        /* 질문 제목 위에 mouse_over 되어 있음 */
        this.mouse_over = true;
    },

    makeContents: function(xmlHttp)
    {
        var contents = xmlHttp.responseText;
        /**
         * 툴팁 색상 설정 ../js/wz_tooltip.js 사용
         * 자세한 설명은 http://www.walterzorn.com/tooltip/tooltip_e.htm 참고
         */
        if (this.mouse_over)
        {
    		Tip(contents, BGCOLOR, '#FFFFFF', BORDERCOLOR, '#63b900');
    	}
    },

    tooltipOff: function()
    {
    	/* 질문 제목 위에 mouse_out 되어 있음 */
    	this.mouse_over = false;
    	/* 툴팁 해제 */
    	UnTip();
    },

	faqClick: function()
	{
		var inForm = document.listForm;
	    if(typeof inForm == 'undefined' || inForm == null)
	    {
	        //hslee:이전, 다음글로 faq 항목이 움직일때 적용되는 form.
	        inForm = document.answerForm;
	        //hslee:이전, 다음글로 FaqAnswer.jsp 로만 페이지가 이동해도 리스트의 쪽번호 정보를 유지해야 함.
	        inForm.pageNo.value = Math.floor(parseInt(this.target_no)/parseInt(inForm.rowsPerPage.value))+1;
	    }

		var url;
		inForm.kbId.value = this.kb_id;
		inForm.targetNo.value = this.target_no;   //hslee:이전, 다음목록을 가져오기 위한 startNo

		/* RAR검색일 때 로그 아이디가 넘어온다. */
		if(this.logId != "" && inForm.surveyType.value == "SCHAF")
		{
			inForm.log_id.value = this.logId;
			inForm.nodeId.value = this.nodeId;
			url = urlWebCtx + "/faq/RarAnswer.jsp";
		}
		else
		{
		    inForm.nodeId.value = this.nodeId;
			url = urlWebCtx + "/faq/FaqAnswer.jsp";
		}
		var params = Form.serialize(inForm);
		var result;

		if (this.page == "POPUP")
		{
			/* 새창을 띄워 FAQ 상세내용 페이지를 열어준다. */
			url = urlWebCtx + "/faq/FaqAnswerPopup.jsp";
			var target = "FAQ";
			var width = "800";
			var height = "400";
			var scroll = "yes";
			openWindow(url, target, width, height, scroll, params);
		}
		else if (this.page == "DROP_DOWN")
		{
			/* 제목라인 아래에  FAQ 상세내용을 넣어준다. */
			url = urlWebCtx + "/faq/FaqAnswerDropDown.jsp";

			if (oldCtrl == this.ctrl)
			{
				/* 이미 열려있는 드롭다운 FAQ를 클릭하면 레이어가 닫힌다.
				      열려있는 FAQ가 하나도 없으므로 oldCtrl는 초기화된다. */
				this.closeDropDown();
				oldCtrl = "";
			}
			else
			{
				/* 닫혀있는 드롭다운 FAQ를 클릭하면 열려있던 레이어가 닫힌다.
				      그리고 새로운 FAQ가 열리면서 oldCtrl의 값을 현재 열린 Faq로 바꾸어 준다. */
				if (oldCtrl)
				{
					this.closeDropDown();
				}
				this.loadContents(url, "this.makeHtmlDropDown", params);
				oldCtrl = this.ctrl;
			}
		}
		else if (this.page == "LAYER_POPUP")
		{
			/* 라이트박스 레이어를 통해 FAQ 상세내용을 보여준다.*/
			this.createLayer();
			url = urlWebCtx + "/faq/FaqAnswerLayer.jsp";
			this.loadContents(url, "this.makeHtmlLayer", params);
		}
		else
		{
			/* 페이지 이동하여 FAQ 상세내용을 보여준다.*/
			inForm.action = url;
			inForm.submit();
		}
	},
	// 레이어 팝업과 드롭다운 상세보기에서 필요한 FAQ 상세 컨텐츠에 디자인을 입혀 HTML 형식으로 만들어 넘겨준다.
	loadContents: function(url, func, params)
	{
		var myAjax = new Ajax.Request(
		    url,
		    {method: "post", parameters: params, asynchronous: false, onComplete: eval(func).bindAsEventListener(this)}
		);
	},
	// 드랍다운일 때, 선택된 FAQ의 셀 스타일을 변경해주고 FAQ 제목 아래 영역에 컨텐츠 HTML을 넣어준다.
	makeHtmlDropDown: function(xmlHttp)
	{
		var inForm = document.listForm;

		var idx = this.tr.rowIndex + 1;		// 현재 선택한 Faq 제목의 열번호를 찾아 1을 더하면 내용을 집어 넣을  열번호가 나온다.
		//this.tr.className = "list_over";	// 선택된 Faq 제목 TR의 스타일을 지정 : mod. mrshin. 20100930. 주석처리

		var objTable = $("faqTbl");
		var objTr = objTable.insertRow(idx);
		var objTd = objTr.insertCell(-1);

		//objTd.colSpan = objTable.rows(0).cells.length;	// ie에서는 이부분을 써도 되지만 크로스브라우저에서는 쓸 수 없다.
		var childElement = this.tr.immediateDescendants();	// tr의 1레벨 차일드 엘리먼트를 반환
		var tdCount = 0;
		childElement.each(function (value, index) {
			tdCount++
		});

		// add. mrshin. 디자인 적용
        objTr.className = "faqDetailW";
        objTd.className = "tdLeft";

		objTd.colSpan = tdCount;
        if( objTable.width > 0 )
        {
            objTd.innerHTML = "<div style=\"width:"+objTable.width+"; overflow:auto;\">" + xmlHttp.responseText + "</div>";
        }
        else
        {
		    objTd.innerHTML = xmlHttp.responseText;
        }

		//replyList();	// 댓글
		if((this.logId != "" && inForm.surveyType.value == "SCHAF"))
		{
			surveyList(false);	// 설문
		}
		else
		{
			surveyList(false);	// 설문
		}
	},
	// 드랍다운된 FAQ를 닫았을 때
	closeDropDown: function()
	{
		var objTable = $("faqTbl");			// FAQ 목록 테이블 ID
		var oldTr = oldCtrl.up("tr");		// 열려있던 FAQ 제목의 TR 개체를 찾아
		//oldTr.className = "list_out";		// 제목 열의 스타일을 열리기 전의 스타일로 바꾸어준다. : mod. mrshin. 20100930. 주석처리
		oldIdx = oldTr.rowIndex + 1;		// 열려있는 FAQ 제목의 열번호를 찾아 1을 더하면 바로 다음 열인 내용의 열번호
		objTable.deleteRow(oldIdx);			// 내용 열번호로 FAQ 상세내용 TR을 지워준다.
	},
	// 레이어 팝업일 때
	makeHtmlLayer: function(xmlHttp)
	{
		var result = xmlHttp.responseText;
		if (browser == "Internet Explorer")		// IE의 경우에 셀렉트 박스를 숨겨준다.
		{
		    hideSelects("hidden");
		}
		this.displayLightbox();
		$("lightbox").innerHTML = result;

		replyList(false);			// 댓글 목록 가져오는 부분
		this.createObserv();	// 레이어 닫기, 이전글, 다음글 버튼을 초기화
		this.displayOverlay();
		if((this.logId != "" && inForm.surveyType.value == "SCHAF"))
		{
		}
		else
		{
			surveyList(false);	// 설문
		}
	},
	// 우선 레이어 팝업 영역을 초기화, 라이트박스와 바깥 영역 레이어를 생성한다.
	createLayer: function()
	{
		var body = document.getElementsByTagName("body")[0];
		var overlay = document.createElement("div");		// FAQ 상세내용 바깥 영역
		overlay.id = "overlay";
		var lightbox = document.createElement("div");		// FAQ 상세내용 디스플레이 영역
		lightbox.id = "lightbox";
		body.appendChild(overlay);
		body.appendChild(lightbox);
		$("overlay").style.display = "none";
		$("lightbox").style.display = "none";
	},
	// 생성된 라이트 박스의 위치를 결정
	displayLightbox: function()
	{
		var body = document.getElementsByTagName("body")[0];
		var bodyDimensions = $(body).getDimensions();
		var lbWidth = 720;
		var lbTop = 100;
		var lbLeft = (bodyDimensions.width / 2) - (lbWidth / 2);
		$("lightbox").setStyle({position:"absolute",top:lbTop + "px",left:lbLeft + "px",width:lbWidth + "px",backgroundColor:"#FFFFFF",border:"1px solid #fff",textAlign:"left"});
		$("lightbox").style.display = "block";
	},
	// 라이트 박스 바깥 레이어의 위치를 결정
	displayOverlay: function()
	{
		var bodyHeight = document.body.scrollHeight;		// 현재 화면의 높이
		if(bodyHeight < document.body.getHeight())
		{
			bodyHeight = document.body.getHeight();
		}
		var bodyWidth = document.body.scrollWidth;			// 현재 화면의 넓이
		$("overlay").setStyle({position:"absolute",top:"0",left:"0",width:bodyWidth,height:bodyHeight + 50,backgroundColor:"#000000",filter:"alpha(opacity=50)",opacity:".50"});
		$("overlay").style.display = "block";
	},
	// 라이트박스 레이어 닫기
	deActivate: function()
	{
		/* 라이트박스를 위해 할당되었던 이벤트 리스너 해제 */
		Event.stopObserving(btnPrevKbId, "click", this.clickPrevKbId.bindAsEventListener(this));
		Event.stopObserving(btnNextKbId, "click", this.clickNextKbId.bindAsEventListener(this));
		Event.stopObserving(closeLayer, "click", this.deActivate.bindAsEventListener(this), false);

		Element.remove($("overlay"));
		Element.remove($("lightbox"));
		if (browser == "Internet Explorer")
		{
		    hideSelects("visible");
		}
	},
	// 라이트 박스 제어를 위한 버튼 이벤트 정의
	createObserv: function()
	{
		/* 라이트박스 레이어 닫기 */
		var closeLayer = $("closeLayer");
		Event.observe(closeLayer, "click", this.deActivate.bindAsEventListener(this), false);
		closeLayer.onclick = function(){return false;};

		/* 이전글 이동 */
		var btnPrevKbId = $("btnPrevKbId")
		Event.observe(btnPrevKbId, "click", this.clickPrevKbId.bindAsEventListener(this), false);
		btnPrevKbId.onclick = function(){return false;};

		/* 다음글 이동 */
		var btnNextKbId = $("btnNextKbId")
		Event.observe(btnNextKbId, "click", this.clickNextKbId.bindAsEventListener(this), false);
		btnNextKbId.onclick = function(){return false;};
	},
	// 이전글 이동 - 레이어 팝업에서 사용
	clickPrevKbId: function()
	{
		var inForm = document.listForm;
		var prevKbId = $("btnPrevKbId").getAttribute("kbId");
		if (prevKbId == "0" )
		{
			alert("처음글입니다.");
		}
		else
		{
			inForm.kbId.value = prevKbId;
			var params = Form.serialize(inForm);
			url = urlWebCtx + "/faq/FaqAnswerLayer.jsp";
			this.loadContents(url, "this.makeHtmlLayer", params);
		}
	},
	// 다음글 이동 - 레이어 팝업에서 사용
	clickNextKbId: function()
	{
		var inForm = document.answerForm;
		var nextKbId = $("btnNextKbId").getAttribute("kbId");
		if (nextKbId == "0" )
		{
			alert("마지막글입니다.");
		}
		else
		{
			inForm.kbId.value = nextKbId;
			var params = Form.serialize(inForm);
			url = urlWebCtx + "/faq/FaqAnswerLayer.jsp";
			this.loadContents(url, "this.makeHtmlLayer", params);
		}
	}
}


//-->