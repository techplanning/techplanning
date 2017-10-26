<!--
/**
 * FAQ �˻��� ȣ��Ǵ� �Լ��̴�.
 */
function searchFaq(text)
{
	var inForm = document.rarForm;
	inForm.question.value = text;
	inForm.action = urlWebCtx + "/faq/RarList.jsp";
   	inForm.submit();
}

/**
 * TOP 10 ���콺 ������ ǥ�õǴ� �޼ҵ��̴�.
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
 * KB ������ �̵��� ����  �޼ҵ��̴�.
 */
function goto(pageNo)
{
	var inForm = document.listForm;
	inForm.nodeId.value = initNodeId;
	inForm.pageNo.value = pageNo;
	inForm.submit();
}

/**
 * KB �˾�/������ �̵� ��� �󼼺��� ȭ�鿡�� ������ ��ư�� ������ �� ����ϴ� �޼ҵ��̴�.
 */
function clickPrevKbId()
{
	var inForm = document.answerForm;
	var prevKbId = $("btnPrevKbId").getAttribute("kbId");
	if (prevKbId == "0")
	{
		alert("ó�����Դϴ�.");
	}
	else
	{
		inForm.kbId.value = prevKbId;
		inForm.submit();
	}
}

/**
 * KB �˾�/������ �̵� ��� �󼼺��� ȭ�鿡�� ������ ��ư�� ������ �� ����ϴ� �޼ҵ��̴�.
 */
function clickNextKbId()
{
	var inForm = document.answerForm;
	var nextKbId = $("btnNextKbId").getAttribute("kbId");
	if(nextKbId == "0")
	{
		alert("���������Դϴ�.");
	}
	else
	{
		inForm.kbId.value = nextKbId;
		inForm.submit();
	}
}

/**
 * KB ������ �̵� ��� �󼼺��� ȭ�鿡�� ���ȭ������ ���� ���� ����ϴ� �޼ҵ��̴�.
 */
function clickList()
{
	var inForm = document.answerForm;
	if(inForm.surveyType.value == "FAQAF")
	{
		inForm.action = urlWebCtx + "/faq/FaqList.jsp";	// FAQ ��Ͽ��� ���� ��
	}
	else
	{
		inForm.action = urlWebCtx + "/faq/RarList.jsp";	// �ڵ��˻� ��Ͽ��� ���� ��
	}
	inForm.submit();
}

/**
 * KB ī�װ� �̵��� ���� ����ϴ� �޼ҵ��̴�.
 */
function clickNode(nodeId, inForm)
{
	inForm.nodeId.value = nodeId;
	inForm.pageNo.value = 1;
	inForm.action = urlWebCtx + "/faq/FaqList.jsp";
	inForm.submit();
}

//hslee:11st custmizing. �����ŷ� ���̵� ī�װ� ����.
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
        //hslee:�����ŷ� ī�װ� ���ý� ���ܿ��� ���Ǵ� ������ parentNodeId ���� reset.
        inForm.parentNodeId.value = "";

        //hslee:Rar ������ Faq ������ ��ȯ�ɶ��� �˻����� reset.
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
        //hslee:Rar ������ Faq ������ ��ȯ�ɶ��� �˻����� reset.
        inForm.nodeId1st.value = "";
        inForm.nodeId2nd.value = "";
        inForm.question.value = "";
    }
    catch(e) {}

    //hslee:Top10, new FAQ�� ���� ���������� ����� ��������ȣ�� 0�� ����ó��. (üũ�뵵. ���� �������� 1�� ���õ�)
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
        //hslee:Rar ������ Faq ������ ��ȯ�ɶ��� �˻����� reset.
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

//hslee:11st custmizing. 3, 2�� ī�װ� click. (Book, Beauty������ 2, 1��)
function clickParentNode(nodeId, leftNodeId1st)
{
    var inForm = $('listForm');
    if(typeof inForm == 'undefined' || inForm == null)
    {
        inForm = $('answerForm');
    }

    //hslee:���� ����Ŭ���� ������ ���ε� ó��.
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
        //hslee:��� 2,3�� ī�װ� ���ý� ���ܿ��� ���Ǵ� ������ parentNodeId ���� reset.
        inForm.parentNodeId.value = "";

        //hslee:Rar ������ Faq ������ ��ȯ�ɶ��� �˻����� reset.
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
 * KB �� ������ ���� ����  �޼ҵ��̴�.
 */
var faqAnswer = Class.create();
/* ��Ӵٿ� �󼼺��⿡�� ���ο� FAQ�� �� ��, �����ִ� FAQ�� �ݱ� ���� ���� FAQ ������Ʈ�� ���� */
var oldCtrl = "";
faqAnswer.prototype =
{
	browser : getBrowserInfoEE(),						// ������ ����
	initialize: function(ctrl, page, tooltip, logId, nodeId)
	{
		this.ctrl = ctrl;							// ������Ʈ��
        this.page = page;							// ������ �̵����
    	this.kb_id = ctrl.getAttribute("kbId");		// ������Ʈ�� kbId �Ӽ� ���� �о�´�.
    	this.target_no = ctrl.getAttribute("targetNo"); //hslee:������Ʈ�� targetNo �Ӽ� ���� �о�´�.
		this.tooltip = tooltip || "Y";				// ���� ��� ����
        this.mouse_over = false;					// ���� ���� �ش� Faq�� ���콺 over �Ǿ� �ִ��� ����
        this.logId = logId || "";					// Rar �˻��� ���� �˻��α� ID�� �Ѿ�´�.
		this.nodeId = nodeId						// FAQ�� ��� ���̵� (�˻���Ͽ��� ���)

      	Event.observe(this.ctrl, "click", this.faqClick.bindAsEventListener(this), false);	// FAQ Ŭ�� �̺�Ʈ ����
		ctrl.onclick = function(){return false;};

		try
        {
		    this.tr = this.ctrl.up("tr");             // Ŭ���� FAQ�� �����ִ� TR

		    // mod. mrshin. 20100930. �ּ�ó��
    		//Event.observe(this.tr, "mouseover", this.trMouseOver.bindAsEventListener(this), false);
    		//Event.observe(this.tr, "mouseout", this.trMouseOut.bindAsEventListener(this), false);
        	if(this.tooltip == "Y")
    		{
    			/* ���� ���� ���� */
    			Event.observe(this.ctrl, "mouseover", this.tooltipOn.bindAsEventListener(this), false);
    			/* ���� ���� ���� */
    			Event.observe(this.ctrl, "mouseout", this.tooltipOff.bindAsEventListener(this), false);
    		}
		}
		catch(e)
		{
		    //hslee:���� �Լ��� table�� �����Ǵ� ���� �������� �ۼ��Ǿ��־, try������ ����.
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
    	var url = urlWebCtx + "/faq/FaqContents.jsp";		// FAQ �� ������ �о�� ������
        var inForm = document.listForm;
        inForm.kbId.value = this.kb_id;
        var params = Form.serialize(inForm);

    	/* �������� �������� �κ� */
        var myAjax = new Ajax.Request (
            url, {method: 'post', parameters: params, onComplete: this.makeContents.bindAsEventListener(this)}
        );
        /* ���� ���� ���� mouse_over �Ǿ� ���� */
        this.mouse_over = true;
    },

    makeContents: function(xmlHttp)
    {
        var contents = xmlHttp.responseText;
        /**
         * ���� ���� ���� ../js/wz_tooltip.js ���
         * �ڼ��� ������ http://www.walterzorn.com/tooltip/tooltip_e.htm ����
         */
        if (this.mouse_over)
        {
    		Tip(contents, BGCOLOR, '#FFFFFF', BORDERCOLOR, '#63b900');
    	}
    },

    tooltipOff: function()
    {
    	/* ���� ���� ���� mouse_out �Ǿ� ���� */
    	this.mouse_over = false;
    	/* ���� ���� */
    	UnTip();
    },

	faqClick: function()
	{
		var inForm = document.listForm;
	    if(typeof inForm == 'undefined' || inForm == null)
	    {
	        //hslee:����, �����۷� faq �׸��� �����϶� ����Ǵ� form.
	        inForm = document.answerForm;
	        //hslee:����, �����۷� FaqAnswer.jsp �θ� �������� �̵��ص� ����Ʈ�� �ʹ�ȣ ������ �����ؾ� ��.
	        inForm.pageNo.value = Math.floor(parseInt(this.target_no)/parseInt(inForm.rowsPerPage.value))+1;
	    }

		var url;
		inForm.kbId.value = this.kb_id;
		inForm.targetNo.value = this.target_no;   //hslee:����, ��������� �������� ���� startNo

		/* RAR�˻��� �� �α� ���̵� �Ѿ�´�. */
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
			/* ��â�� ��� FAQ �󼼳��� �������� �����ش�. */
			url = urlWebCtx + "/faq/FaqAnswerPopup.jsp";
			var target = "FAQ";
			var width = "800";
			var height = "400";
			var scroll = "yes";
			openWindow(url, target, width, height, scroll, params);
		}
		else if (this.page == "DROP_DOWN")
		{
			/* ������� �Ʒ���  FAQ �󼼳����� �־��ش�. */
			url = urlWebCtx + "/faq/FaqAnswerDropDown.jsp";

			if (oldCtrl == this.ctrl)
			{
				/* �̹� �����ִ� ��Ӵٿ� FAQ�� Ŭ���ϸ� ���̾ ������.
				      �����ִ� FAQ�� �ϳ��� �����Ƿ� oldCtrl�� �ʱ�ȭ�ȴ�. */
				this.closeDropDown();
				oldCtrl = "";
			}
			else
			{
				/* �����ִ� ��Ӵٿ� FAQ�� Ŭ���ϸ� �����ִ� ���̾ ������.
				      �׸��� ���ο� FAQ�� �����鼭 oldCtrl�� ���� ���� ���� Faq�� �ٲپ� �ش�. */
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
			/* ����Ʈ�ڽ� ���̾ ���� FAQ �󼼳����� �����ش�.*/
			this.createLayer();
			url = urlWebCtx + "/faq/FaqAnswerLayer.jsp";
			this.loadContents(url, "this.makeHtmlLayer", params);
		}
		else
		{
			/* ������ �̵��Ͽ� FAQ �󼼳����� �����ش�.*/
			inForm.action = url;
			inForm.submit();
		}
	},
	// ���̾� �˾��� ��Ӵٿ� �󼼺��⿡�� �ʿ��� FAQ �� �������� �������� ���� HTML �������� ����� �Ѱ��ش�.
	loadContents: function(url, func, params)
	{
		var myAjax = new Ajax.Request(
		    url,
		    {method: "post", parameters: params, asynchronous: false, onComplete: eval(func).bindAsEventListener(this)}
		);
	},
	// ����ٿ��� ��, ���õ� FAQ�� �� ��Ÿ���� �������ְ� FAQ ���� �Ʒ� ������ ������ HTML�� �־��ش�.
	makeHtmlDropDown: function(xmlHttp)
	{
		var inForm = document.listForm;

		var idx = this.tr.rowIndex + 1;		// ���� ������ Faq ������ ����ȣ�� ã�� 1�� ���ϸ� ������ ���� ����  ����ȣ�� ���´�.
		//this.tr.className = "list_over";	// ���õ� Faq ���� TR�� ��Ÿ���� ���� : mod. mrshin. 20100930. �ּ�ó��

		var objTable = $("faqTbl");
		var objTr = objTable.insertRow(idx);
		var objTd = objTr.insertCell(-1);

		//objTd.colSpan = objTable.rows(0).cells.length;	// ie������ �̺κ��� �ᵵ ������ ũ�ν������������� �� �� ����.
		var childElement = this.tr.immediateDescendants();	// tr�� 1���� ���ϵ� ������Ʈ�� ��ȯ
		var tdCount = 0;
		childElement.each(function (value, index) {
			tdCount++
		});

		// add. mrshin. ������ ����
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

		//replyList();	// ���
		if((this.logId != "" && inForm.surveyType.value == "SCHAF"))
		{
			surveyList(false);	// ����
		}
		else
		{
			surveyList(false);	// ����
		}
	},
	// ����ٿ�� FAQ�� �ݾ��� ��
	closeDropDown: function()
	{
		var objTable = $("faqTbl");			// FAQ ��� ���̺� ID
		var oldTr = oldCtrl.up("tr");		// �����ִ� FAQ ������ TR ��ü�� ã��
		//oldTr.className = "list_out";		// ���� ���� ��Ÿ���� ������ ���� ��Ÿ�Ϸ� �ٲپ��ش�. : mod. mrshin. 20100930. �ּ�ó��
		oldIdx = oldTr.rowIndex + 1;		// �����ִ� FAQ ������ ����ȣ�� ã�� 1�� ���ϸ� �ٷ� ���� ���� ������ ����ȣ
		objTable.deleteRow(oldIdx);			// ���� ����ȣ�� FAQ �󼼳��� TR�� �����ش�.
	},
	// ���̾� �˾��� ��
	makeHtmlLayer: function(xmlHttp)
	{
		var result = xmlHttp.responseText;
		if (browser == "Internet Explorer")		// IE�� ��쿡 ����Ʈ �ڽ��� �����ش�.
		{
		    hideSelects("hidden");
		}
		this.displayLightbox();
		$("lightbox").innerHTML = result;

		replyList(false);			// ��� ��� �������� �κ�
		this.createObserv();	// ���̾� �ݱ�, ������, ������ ��ư�� �ʱ�ȭ
		this.displayOverlay();
		if((this.logId != "" && inForm.surveyType.value == "SCHAF"))
		{
		}
		else
		{
			surveyList(false);	// ����
		}
	},
	// �켱 ���̾� �˾� ������ �ʱ�ȭ, ����Ʈ�ڽ��� �ٱ� ���� ���̾ �����Ѵ�.
	createLayer: function()
	{
		var body = document.getElementsByTagName("body")[0];
		var overlay = document.createElement("div");		// FAQ �󼼳��� �ٱ� ����
		overlay.id = "overlay";
		var lightbox = document.createElement("div");		// FAQ �󼼳��� ���÷��� ����
		lightbox.id = "lightbox";
		body.appendChild(overlay);
		body.appendChild(lightbox);
		$("overlay").style.display = "none";
		$("lightbox").style.display = "none";
	},
	// ������ ����Ʈ �ڽ��� ��ġ�� ����
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
	// ����Ʈ �ڽ� �ٱ� ���̾��� ��ġ�� ����
	displayOverlay: function()
	{
		var bodyHeight = document.body.scrollHeight;		// ���� ȭ���� ����
		if(bodyHeight < document.body.getHeight())
		{
			bodyHeight = document.body.getHeight();
		}
		var bodyWidth = document.body.scrollWidth;			// ���� ȭ���� ����
		$("overlay").setStyle({position:"absolute",top:"0",left:"0",width:bodyWidth,height:bodyHeight + 50,backgroundColor:"#000000",filter:"alpha(opacity=50)",opacity:".50"});
		$("overlay").style.display = "block";
	},
	// ����Ʈ�ڽ� ���̾� �ݱ�
	deActivate: function()
	{
		/* ����Ʈ�ڽ��� ���� �Ҵ�Ǿ��� �̺�Ʈ ������ ���� */
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
	// ����Ʈ �ڽ� ��� ���� ��ư �̺�Ʈ ����
	createObserv: function()
	{
		/* ����Ʈ�ڽ� ���̾� �ݱ� */
		var closeLayer = $("closeLayer");
		Event.observe(closeLayer, "click", this.deActivate.bindAsEventListener(this), false);
		closeLayer.onclick = function(){return false;};

		/* ������ �̵� */
		var btnPrevKbId = $("btnPrevKbId")
		Event.observe(btnPrevKbId, "click", this.clickPrevKbId.bindAsEventListener(this), false);
		btnPrevKbId.onclick = function(){return false;};

		/* ������ �̵� */
		var btnNextKbId = $("btnNextKbId")
		Event.observe(btnNextKbId, "click", this.clickNextKbId.bindAsEventListener(this), false);
		btnNextKbId.onclick = function(){return false;};
	},
	// ������ �̵� - ���̾� �˾����� ���
	clickPrevKbId: function()
	{
		var inForm = document.listForm;
		var prevKbId = $("btnPrevKbId").getAttribute("kbId");
		if (prevKbId == "0" )
		{
			alert("ó�����Դϴ�.");
		}
		else
		{
			inForm.kbId.value = prevKbId;
			var params = Form.serialize(inForm);
			url = urlWebCtx + "/faq/FaqAnswerLayer.jsp";
			this.loadContents(url, "this.makeHtmlLayer", params);
		}
	},
	// ������ �̵� - ���̾� �˾����� ���
	clickNextKbId: function()
	{
		var inForm = document.answerForm;
		var nextKbId = $("btnNextKbId").getAttribute("kbId");
		if (nextKbId == "0" )
		{
			alert("���������Դϴ�.");
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