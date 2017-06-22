var LEGO = {
	warpperObj : null,
	
	init : function(wrapperId){	

		Handlebars.registerHelper('carrierStartMargin', function (v1) {
            switch (v1) {
                case '0':
                    return "l-grid--adjoin";
                default:
                    return "";
            }
        });

        Handlebars.registerHelper('carrierStartPadding', function (v1) {
            switch (v1) {
                case '0':
                    return "l-grid--adjoin";
                default:
                    return "";
            }
        });
		
		Handlebars.registerHelper('carrierInnerMargin', function (v1) {
		    switch (v1) {
		        case '0':
		            return "0";
		        case '8':
		            return "1";
		        case '16':
		            return "2";
		        default:
		            return "0";
		    }
		});
		
		Handlebars.registerHelper('carrierUnderLine', function (v1) {
		    switch (v1) {
		        case 'Y':
		        	return "l-grid--border";
		        case 'ROW':
		        	return "l-grid__row--border";
		        default:
		            return "";
		    }
		});

        Handlebars.registerHelper('carrierBackgroundColor', function (v1) {
            switch (v1) {
                case '#00000000':
                    return "l-grid--nobg";
                default:
                    return "";
            }
        });
		
		Handlebars.registerHelper('thumbnailImage', function (url, size) {
			if ( url && size ) {
				if ( url.indexOf('http://i.011st.com') > -1 ) {
					url = url.replace('http://i.011st.com', 'http://i.011st.com/ex_t/R/' + size + 'x' + size + '/1/85/1/src');
				} else {
					url = 'http://i.011st.com/ex_t/R/' + size + 'x' + size + '/1/85/1/src' + url;
				}
				
			}
			return url;
		});
		
		Handlebars.registerHelper('commaNumber', function (v1) {
		    if (typeof v1 === 'string' &&  v1.indexOf(',') > -1)
		        return v1;
		    else
		        return commaNumberFormat(v1);
		});
	},
	
	setWarpper : function(wrapperId){
		this.warpperObj = jQuery("#" + wrapperId);
	},
		
	getHandleBarsMarkup : function(template, jsonData){
		try{
			if(jQuery("#" + template)){
				var source = jQuery("#" + template).html();
				var template = Handlebars.compile(source);
				return template(jsonData);
			}
			return '';
		}catch(e){
			alert(e);
		}
	},
	
	constructing : function(carrierJsonArr){
		var markup = "";
		var markupTemplate = "";
		
		var carrierInfoType =  'CaptionCarrier';
		
		for(var carrierIdx = 0; carrierIdx < carrierJsonArr.length; carrierIdx++){			
			var buffer = [];
			
			var carrierInfo = carrierJsonArr[carrierIdx];
			
			var blockList = carrierInfo.blockList;
			
			if(blockList != null && blockList.length > 0){
				var isDrawCarrier = true;
				
				if(carrierInfo.type == carrierInfoType && (blockList[0].list == null || blockList[0].list.length == 0)){
					isDrawCarrier = false;
				}
			
				if(isDrawCarrier){
					buffer.push(this.getHandleBarsMarkup("carrier_template_" + carrierInfo.type, carrierInfo));
					
					// Draw Carrier
					var carrierObj = this.warpperObj.append(buffer.join(''));		
					
					buffer = [];
					
					for(var blockIdx = 0; blockIdx < blockList.length; blockIdx++){
						var blockData = blockList[blockIdx];
						buffer.push(this.getHandleBarsMarkup("block_template_" + blockData.type, blockData));
					}
					
					// Draw Block
					jQuery("#carrier_" + carrierInfo.carrSn).append(buffer.join(''));
				}
			}
			
			if ( carrierInfo.replaceUrl ) {
				$.ajax({
					type : 'get',
					url : carrierInfo.replaceUrl,
					cache : false,
					success : function (json){
						if ( json.data ) {
							var carrierData = json.data;
							var carrierLength = carrierData.length;
							if ( carrierLength === 0  && json.carrSn ) {
								$("#carrier_" + json.carrSn).hide();
							} else {
								for ( var index=0 ; index < carrierLength; index++  ){
									var carrier = carrierData[index];
									LEGO.changeCarrierData(carrier);
								}
							}
						}
					}
				});
			}
		}
	},
	
	formSearch : function(){
		var frm = document.legoSearchForm;
		
		var url = document.location.href.split("?");
		
		location.href = url[0] + "?" + jQuery(frm).serialize() + "#anchorPos";
	},
	
	changeBlockData : function(blockData, blockSn){
		var buffer = [];
				
		buffer.push(this.getHandleBarsMarkup("block_template_" + blockData.type, blockData));

		// Draw Block
		jQuery("#block_" + blockData.blckSn).replaceWith(buffer.join(''));		
	},
	
	changeBlockData : function(blockData, blockSn, changeBlockData){
		var buffer = [];
		
		buffer.push(this.getHandleBarsMarkup("block_template_" + blockData.type, blockData));
		// Draw Block
		var $targetCarrier = $('#carrier_' + carrierInfo.carrSn);
		var $targetBlock = $('.l-grid__row', $targetCarrier).eq(blockSn+1);
		
		$targetBlock.replaceWith(buffer.join(''));
		
	},
	
	changeCarrierData : function(carrierInfo){
		
		var buffer = [];
		var blockBuffer = [];
		var blockList = carrierInfo.blockList;
		var carrierInfoType = 'BlankCarrier';
		
		if(blockList != null && blockList.length > 0){
			var isDrawCarrier = true;
			if(carrierInfo.type != carrierInfoType && (blockList[0].list == null || blockList[0].list.length == 0)){
				isDrawCarrier = false;
				
				if(carrierInfo.type === 'TabCarrier'){
					for(var blockIdx = 0; blockIdx < blockList.length; blockIdx++){
						var blockData = blockList[blockIdx];
						
						LEGO.changeBlockData(blockData, blockIdx, carrierInfo);
					}
				}
			}
		
			if(isDrawCarrier){
				buffer.push(this.getHandleBarsMarkup("carrier_template_" + carrierInfo.type, carrierInfo));
				
				// Draw carrier
				var $targetCarrier = jQuery('#carrier_' + carrierInfo.carrSn);
				$targetCarrier.replaceWith(buffer.join(''));
				
				for(var blockIdx = 0; blockIdx < blockList.length; blockIdx++){
					var blockData = blockList[blockIdx];
					
					blockBuffer.push(this.getHandleBarsMarkup("block_template_" + blockData.type, blockData));
				}
				
				// Draw Block
				$targetCarrier = jQuery('#carrier_' + carrierInfo.carrSn);
				$targetCarrier.append(blockBuffer.join(''));
				
			}
			
			if(carrierInfo.type === 'TabCarrier'){
				var selectedIdx = 0;
				var tabs = carrierInfo.tabs;
					
				for(var i=0; i<tabs.length; i++){
					var tab = tabs[i];
					if ( tab.selectedYN === 'Y' ){
						selectedIdx = i;
						break;
					}
				}
				
				var $targetCarrier = jQuery('#carrier_' + carrierInfo.carrSn);
				
				skp11.menu.sideMenu.tab.init(selectedIdx);
			}
		}
	}
};