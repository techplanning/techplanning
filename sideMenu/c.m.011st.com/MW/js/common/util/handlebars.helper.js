Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);

    return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue
    }[operator];
});

Handlebars.registerHelper('nvl', function (value, nullValue) {
    if (value)
        return value;
    else 
        return nullValue;
});

Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (parseInt(v1) < parseInt(v2)) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (parseInt(v1) <= parseInt(v2)) ? options.fn(this) : options.inverse(this);
        case '>':
            return (parseInt(v1) > parseInt(v2)) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (parseInt(v1) >= parseInt(v2)) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});

Handlebars.registerHelper('commaNumber', function (v1) {
    if (typeof v1 === 'string' &&  v1.indexOf(',') > -1)
        return v1;
    else
        return commaNumberFormat(v1);
});

Handlebars.registerHelper('toJson', function (v1) {
    return JSON.stringify(v1);
});

Handlebars.registerHelper('decodeData', function (v1, cnt) {
	var result = v1;
	
	if ( !cnt ) {
		cnt = 1;
	}
	
	for (var index = 0; index < cnt; index++) {
		result = decodeURIComponent(result);
	} 
	
	return result;
});

Handlebars.registerHelper('eachUpTo', function(ary, max, options) {
	if(!ary || ary.length == 0)
		return options.inverse(this);

	var result = [ ];
	for(var i = 0; i < max && i < ary.length; ++i)
		result.push(options.fn(ary[i]));
	return result.join('');
});

Handlebars.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});

Handlebars.registerHelper('thumbnail', function(src, size) {
    var result = '';

    if ( src && size ){
        if ( src.indexOf('http://i.011st.com') > -1 ) {
            result = src.replace('http://i.011st.com', 'http://i.011st.com/ex_t/R/' + size + 'x' + size + '/0/85/1/src');
        }
    }

    return result;
});


function commaNumberFormat(num) {
    var argStr = (num + "").trim();
    var rtnStr = "";
    var split1 = "";
    var split2 = "";
    var isMinus = false;

    if (argStr == "") return "";

    if (num < 0) {
        num *= -1;
        argStr = num+"";
        isMinus = true;
    }

    if (argStr.indexOf(".") > 0) {
        split1 = argStr.substring(0, argStr.indexOf("."));
        split2 = argStr.substr(argStr.indexOf("."));
        argStr = split1;
    }

    var commaPos = argStr.length % 3;

    if (commaPos) {
        rtnStr = argStr.substring(0, commaPos);
        if (argStr.length > 3)
            rtnStr += ",";
    } else {
        rtnStr = "";
    }

    for ( var i = commaPos; i < argStr.length; i += 3) {
        rtnStr += argStr.substring(i, i + 3);
        if (i < argStr.length - 3)
            rtnStr += ",";
    }

    if (isMinus)
        rtnStr = "-" + rtnStr;
    return rtnStr + split2;
}