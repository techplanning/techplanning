/**
 * <pre>
 * NumberCheck
 * 빈공간을 허용한다.
 * </pre>
 * @param field form.element
 * @param error_msg 에러 message
 * @return boolean
 */
function isNumber(field, error_msg){
	var val = field.value;

	if(checkDigitOnly(val, false) ) {
		return true;
	} else {
		if(error_msg.length > 0) {
			alert(error_msg);
			field.focus();
			field.select();
		}
		return false;
	}
}


/**
 * <pre>
 * NumberCheck
 * 빈공간을 허용한다.
 * </pre>
 * @param field form.element
 * @param error_msg 에러 message
 * @return boolean
 */
function isCurrencyNumber(field, error_msg){
	var val = toNormalNum(field.value);

	if(checkDigitOnly(val, false) ) {

		return true;
	} else {
		if(error_msg.length > 0) {
			alert(error_msg);
			field.focus();
			field.select();
		}
		return false;
	}
}



/**
 * <pre>
 * 숫자인지 아닌지  검사한다.
 * 검사할 값이 "" 일 경우 true를 리턴하고 싶으면, space인수에 true를 넣으면 된다.
 * </pre>
 * @param digitChar 검사할 string
 * @param space ""일 때 허용여부(true||false)
 * @return boolean
 */
function checkDigitOnly( digitChar, space ) {
	if(!space){
		if ( digitChar == null || digitChar=='' ){
    		return false ;
    	}
	}
	for(var i=0;i<digitChar.length;i++){
    	var c=digitChar.charCodeAt(i);
       	if( !(  0x30 <= c && c <= 0x39 ) ) {
       		return false ;
       	}
     }

    return true ;
}

/**
 * <pre>
 * 숫자나 문자열을 통화(Money) 형식으로 만든다.( 쉼표(,) 찍는다는 소리.. )
 * &lt;input type="text" name="test" value="" onkeyup="this.value=toCurrency(this.value);"&gt;
 * or
 * var num = toCurrency(document.form[0].text.value);
 * </pre>
 * @param	amount	"1234567"
 * @return	currencyString "1,234,567"
 */
function toCurrency(amount){
	if(typeof amount == "number"){
		amount = amount + "";
	}
	var data = amount.split('.');
	var sign = "";

	var firstChar = data[0].substr(0,1);
	if(firstChar == "-"){
		sign = firstChar;
		data[0] = data[0].substring(1, data[0].length);
	}

	data[0] = data[0].replace(/\D/g,"");
	if(data.length > 1){
		data[1] = data[1].replace(/\D/g,"");
	}

	firstChar = data[0].substr(0,1);

	//0으로 시작하는 숫자들 처리
	if(firstChar == "0"){
		if(data.length == 1){
			return sign + parseFloat(data[0]);
		}
	}

	var comma = new RegExp('([0-9])([0-9][0-9][0-9][,.])');

	data[0] += '.';
	do {
		data[0] = data[0].replace(comma, '$1,$2');
	} while (comma.test(data[0]));

	if (data.length > 1) {
		return sign + data.join('');
	} else {
		return sign + data[0].split('.')[0];
	}
}

/**
 * <pre>
 * 숫자나 문자열을 통화(Money) 형식으로 만든다.( 쉼표(,) 찍는다는 소리.. )
 * 단, 양수만 허용한다.
 * &lt;input type="text" name="test" value="" onkeyup="this.value=toCurrency(this.value);"&gt;
 * or
 * var num = toCurrency(document.form[0].text.value);
 * </pre>
 * @param	amount	"1234567"
 * @return	currencyString "1,234,567"
 * @see #toCurrency(amount)
 */
function toCurrencyPositive(amount){
	var firstChar = amount.substr(0,1);
	if(firstChar == "-"){
		amount = amount.substring(1, amount.length);
	}
	return toCurrency(amount);
}

/**
 * 주어진 값(val)을 소수점이하 num자리수에서 반올림한값을 리턴한다.
 *
 * @param val 반올림할 값
 * @param num 반올림할 자리수
 * @return number
 */
function round(val, num){
	val = val * Math.pow(10, num - 1);
	val = Math.round(val);
	val = val / Math.pow(10, num - 1);
	return val;
}

/**
 * ,이 있는 숫자를 순수한 숫자로 바꿔준다. (+), (-) 허용
 *
 * @param num
 * @return number
 */
function toNormalNum( num ) {
	if (num=='0') {
	  return '0' ;
	} else {
    num = num.replace(/,/g, '');
    var args = Number(num);
	return args;
	}
}

/**
 * 숫자가 해당 범위를 벗어나는지 검사
 * 벗어나면 에러 메세지를 보여주고 true를 리턴한다.
 *
 * @param field form.element
 * @param min int 최소값
 * @param max int 최대값
 * @param error_msg string 에러 메세지
 * @return boolean
 */
function isOutOfNumericRange(field, min, max, error_msg) {
	if(field.value < min || field.value > max) {
		alert(error_msg);
		field.focus();
		field.select();
		return true;
	}
	return false;
}


/**
 * author : papillon212
 *
 * type="text" 에 숫자값만 입력가능
 * onkeyup="checkNumberOnly(this,1,event)" onblur="checkNumberOnly(this,1,event)"
 *
 * obj는 해당 object
 * default_value는 기본값
 * @param id : element 이름
 */
function checkNumberOnly(obj, default_value, event){
	var str = obj.value;
	var set_value = "";

	var key_code = event.keyCode;

	if(key_code == 0x10 || (key_code >= 0x25 && key_code <= 0x28) || (0x30 <= key_code && key_code <= 0x39) || (0x60 <= key_code && key_code <= 0x69)){ //shift나 방향키나 숫자키일때 리턴
		return;
	}

	for(var i=0;i<str.length;i++){
		var c = str.charCodeAt(i);
		if( 0x30 <= c && c <= 0x39 ){
			set_value += str.charAt(i);
		}
	}

	if(set_value == ""){
		set_value = default_value+"";
	}

	obj.value = set_value;
}

/**
 * type="text" 에 숫자값만 입력가능
 * onKeyUp="javascript: checkNum(this, this.value);">
 * @param obj
 * @param value
 * @return
 */

function checkNum(obj, value) {

    var regExp = /[^0-9]+/g;

    if(regExp.test(value)) {

        alert("'숫자' 만 입력 가능합니다.");

        var returnStr = "";

        for(i = 0; i < value.length; i++) {
            if(value.charAt(i) >= '0' && value.charAt(i) <= '9') {
                returnStr += value.charAt(i);
            }
        }

        obj.value = returnStr;
        obj.focus();
    }
}
