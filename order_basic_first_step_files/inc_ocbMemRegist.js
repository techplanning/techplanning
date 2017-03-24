
var popOcbRegistAgr = {
    id : null,
    conScroll : null,
    memType : null,
    callback : null,
    pathTypCd : "00",
    handled : false,
    open : function() {
        var args = arguments;

        this.checkOcbMemTypeAjax();
        mwUI.layerPop(args[0], null, null, 'no');
        this.id = args[0];
        this.callback = args[1];
        switch(args.length){
            case 3 :
                this.pathTypCd = args[2];
                console.log(args[2]);
                break;
        }

    },
    checkOcbMemTypeAjax : function(){
        jQuery.ajax({
            url: 'https://m.11st.co.kr/MW/Member/checkOcbMemType.tmall',
            async: false,
            dataType: 'jsonp',
            jsonp : 'callback',
            success: function(res) {

                if(res.result === 'SUCCESS'){
                    popOcbRegistAgr.memType = res.memType;
                    popOcbRegistAgr.viewMemTypeText();
                } else {
                    alert("해외셀러, 영문11번가(이메일인증,외국인등록번호) 회원은 OK캐쉬백 사용이 불가합니다.");
                    popOcbRegistAgr.close('popOkagree');
                    return;
                }

            }
        });
    },
    register : function(id){

        if(this.handled == false){

            this.handled = true;

            jQuery.ajax({
                url: 'https://m.11st.co.kr/MW/Member/registOcbMember.tmall',
                async:false,
                data: {'pathTypCd':this.pathTypCd},
                dataType: 'jsonp',
                jsonp : 'callback',
                success: function(res) {
                    if(res.result === 'SUCCESS'){
                        alert("OK캐쉬백 등록이 완료되어 OK캐쉬백 전 가맹점에서 적립/사용이 가능합니다.자세한 내용은 나의11번가>OK캐쉬백을 확인해주세요.");
                        if(typeof popOcbRegistAgr.callback === 'function'){
                            popOcbRegistAgr.callback();
                        }

                    }else{
                        alert(res.resultMsg);
                    }

                },
                error : function(request, status, error ){
                    console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                    alert("시스템 문제로 실패하였습니다. 잠시 후 다시 시도해주시기 바랍니다.")
                },
                complete : function(){
                    popOcbRegistAgr.handled = false;
                    popOcbRegistAgr.close(id);
                }

            });

        }


    },
    viewMemTypeText : function(){

        var revType = (this.memType === 'PRIVATE') ? 'ENTERPRISE' : 'PRIVATE';

        var memTypediv = $('#okmemType_'+this.memType);
        var revTypediv = $('#okmemType_'+revType);

        memTypediv.show();
        revTypediv.hide();

        var memPrivateAgreeText = $('#okagree02');
        if(this.memType === 'PRIVATE') {
            memPrivateAgreeText.show();
        } else {
            memPrivateAgreeText.hide();
        }

    },
    close : function(id) {
        this.agrClose();
        mwUI.layerPopClose(id);
    },
    toggle : function(low_id) {
        var $self = $('#' + low_id),
            con_id = $self.find('.law_con').attr('id'),
            iScrollOption = {
                scrollY: true,
                scrollbars: true,
                preventDefaultException: {tagName:/.*/},
                tab: true
            };

        if($self.hasClass('open') !== true){
            this.agrClose();

            //해당약관열기
            $self.addClass('open');
            $self.find('.btn_v').text('전문닫기'); // 수정 2016-12-23
            this.conScroll = new IScroll('#' + con_id, iScrollOption);
            mwUI.posCenter(this.id);
        } else{
            $self.removeClass('open');
            $self.find('.btn_v').text('전문보기'); // 수정 2016-12-23
            this.conScroll.destroy();
            this.conScroll = null;
            mwUI.posCenter(this.id);
        }
    },
    agrClose : function() {
        //오픈된 약관 닫기
        $('#' + this.id).find('.law.open').removeClass('open').find('.btn_v').text('전문보기'); // 수정 2016-12-23
        if(this.conScroll != null){
            this.conScroll.destroy();
            this.conScroll = null;
        }
    },
    agrTab : function(self) {
        mwUI.tabClick(self);
        this.conScroll.refresh();
    }
}
