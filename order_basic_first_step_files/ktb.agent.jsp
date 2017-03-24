


var ktb = {};
var clientKeys = {"lsHash":"Qlkqwerlkj1lJF","lsCode":"0d2120738415226e7fa56bec5bae527f","lsKey":"iBf8tc3oIMFLXDvMm4i+3w==","lsValue":"3To0hnbPMle1s6oDwoKrL2gs+lg1nfUVHcP8RamWTZ/GXTN22z9G1w==","lsTgs":"iYTQd3KX6IMAbjsA36LJjg==","lsVer":"1xATn9jkViI="}
ktb.flashUrl = "/js/ktb/flash/nonaStorage.swf";

/** lib load start ****************************/
/**
CryptoJS 
*/
var CryptoJS=CryptoJS||function(t,e){var r={},i=r.lib={},n=function(){},s=i.Base={extend:function(t){n.prototype=this;var e=new n;return t&&e.mixIn(t),e.hasOwnProperty("init")||(e.init=function(){e.$super.init.apply(this,arguments)}),e.init.prototype=e,e.$super=this,e},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var e in t)t.hasOwnProperty(e)&&(this[e]=t[e]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}},c=i.WordArray=s.extend({init:function(t,r){t=this.words=t||[],this.sigBytes=r!=e?r:4*t.length},toString:function(t){return(t||a).stringify(this)},concat:function(t){var e=this.words,r=t.words,i=this.sigBytes;if(t=t.sigBytes,this.clamp(),i%4)for(var n=0;t>n;n++)e[i+n>>>2]|=(r[n>>>2]>>>24-8*(n%4)&255)<<  24-8*((i+n)%4);else if(65535<  r.length)for(n=0;t>n;n+=4)e[i+n>>>2]=r[n>>>2];else e.push.apply(e,r);return this.sigBytes+=t,this},clamp:function(){var e=this.words,r=this.sigBytes;e[r>>>2]&=4294967295<<  32-8*(r%4),e.length=t.ceil(r/4)},clone:function(){var t=s.clone.call(this);return t.words=this.words.slice(0),t},random:function(e){for(var r=[],i=0;e>i;i+=4)r.push(4294967296*t.random()|0);return new c.init(r,e)}}),o=r.enc={},a=o.Hex={stringify:function(t){var e=t.words;t=t.sigBytes;for(var r=[],i=0;t>i;i++){var n=e[i>>>2]>>>24-8*(i%4)&255;r.push((n>>>4).toString(16)),r.push((15&n).toString(16))}return r.join("")},parse:function(t){for(var e=t.length,r=[],i=0;e>i;i+=2)r[i>>>3]|=parseInt(t.substr(i,2),16)<<  24-4*(i%8);return new c.init(r,e/2)}},h=o.Latin1={stringify:function(t){var e=t.words;t=t.sigBytes;for(var r=[],i=0;t>i;i++)r.push(String.fromCharCode(e[i>>>2]>>>24-8*(i%4)&255));return r.join("")},parse:function(t){for(var e=t.length,r=[],i=0;e>i;i++)r[i>>>2]|=(255&t.charCodeAt(i))<<  24-8*(i%4);return new c.init(r,e)}},f=o.Utf8={stringify:function(t){try{return decodeURIComponent(escape(h.stringify(t)))}catch(e){throw Error("Malformed UTF-8 data")}},parse:function(t){return h.parse(unescape(encodeURIComponent(t)))}},l=i.BufferedBlockAlgorithm=s.extend({reset:function(){this._data=new c.init,this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=f.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(e){var r=this._data,i=r.words,n=r.sigBytes,s=this.blockSize,o=n/(4*s),o=e?t.ceil(o):t.max((0|o)-this._minBufferSize,0);if(e=o*s,n=t.min(4*e,n),e){for(var a=0;e>a;a+=s)this._doProcessBlock(i,a);a=i.splice(0,e),r.sigBytes-=n}return new c.init(a,n)},clone:function(){var t=s.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0});i.Hasher=l.extend({cfg:s.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset()},reset:function(){l.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){return t&&this._append(t),this._doFinalize()},blockSize:16,_createHelper:function(t){return function(e,r){return new t.init(r).finalize(e)}},_createHmacHelper:function(t){return function(e,r){return new u.HMAC.init(t,r).finalize(e)}}});var u=r.algo={};return r}(Math);!function(){var t=CryptoJS,e=t.lib.WordArray;t.enc.Base64={stringify:function(t){var e=t.words,r=t.sigBytes,i=this._map;t.clamp(),t=[];for(var n=0;r>n;n+=3)for(var s=(e[n>>>2]>>>24-8*(n%4)&255)<<  16|(e[n+1>>>2]>>>24-8*((n+1)%4)&255)<<  8|e[n+2>>>2]>>>24-8*((n+2)%4)&255,c=0;4>c&&r>n+.75*c;c++)t.push(i.charAt(s>>>6*(3-c)&63));if(e=i.charAt(64))for(;t.length%4;)t.push(e);return t.join("")},parse:function(t){var r=t.length,i=this._map,n=i.charAt(64);n&&(n=t.indexOf(n),-1!=n&&(r=n));for(var n=[],s=0,c=0;r>c;c++)if(c%4){var o=i.indexOf(t.charAt(c-1))<<  2*(c%4),a=i.indexOf(t.charAt(c))>>>6-2*(c%4);n[s>>>2]|=(o|a)<<  24-8*(s%4),s++}return e.create(n,s)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}}(),function(t){function e(t,e,r,i,n,s,c){return t=t+(e&r|~e&i)+n+c,(t<<  s|t>>>32-s)+e}function r(t,e,r,i,n,s,c){return t=t+(e&i|r&~i)+n+c,(t<<  s|t>>>32-s)+e}function i(t,e,r,i,n,s,c){return t=t+(e^r^i)+n+c,(t<<  s|t>>>32-s)+e}function n(t,e,r,i,n,s,c){return t=t+(r^(e|~i))+n+c,(t<<  s|t>>>32-s)+e}for(var s=CryptoJS,c=s.lib,o=c.WordArray,a=c.Hasher,c=s.algo,h=[],f=0;64>f;f++)h[f]=4294967296*t.abs(t.sin(f+1))|0;c=c.MD5=a.extend({_doReset:function(){this._hash=new o.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(t,s){for(var c=0;16>c;c++){var o=s+c,a=t[o];t[o]=16711935&(a<<  8|a>>>24)|4278255360&(a<<  24|a>>>8)}var c=this._hash.words,o=t[s+0],a=t[s+1],f=t[s+2],l=t[s+3],u=t[s+4],p=t[s+5],d=t[s+6],_=t[s+7],y=t[s+8],v=t[s+9],g=t[s+10],B=t[s+11],k=t[s+12],S=t[s+13],m=t[s+14],x=t[s+15],z=c[0],w=c[1],C=c[2],E=c[3],z=e(z,w,C,E,o,7,h[0]),E=e(E,z,w,C,a,12,h[1]),C=e(C,E,z,w,f,17,h[2]),w=e(w,C,E,z,l,22,h[3]),z=e(z,w,C,E,u,7,h[4]),E=e(E,z,w,C,p,12,h[5]),C=e(C,E,z,w,d,17,h[6]),w=e(w,C,E,z,_,22,h[7]),z=e(z,w,C,E,y,7,h[8]),E=e(E,z,w,C,v,12,h[9]),C=e(C,E,z,w,g,17,h[10]),w=e(w,C,E,z,B,22,h[11]),z=e(z,w,C,E,k,7,h[12]),E=e(E,z,w,C,S,12,h[13]),C=e(C,E,z,w,m,17,h[14]),w=e(w,C,E,z,x,22,h[15]),z=r(z,w,C,E,a,5,h[16]),E=r(E,z,w,C,d,9,h[17]),C=r(C,E,z,w,B,14,h[18]),w=r(w,C,E,z,o,20,h[19]),z=r(z,w,C,E,p,5,h[20]),E=r(E,z,w,C,g,9,h[21]),C=r(C,E,z,w,x,14,h[22]),w=r(w,C,E,z,u,20,h[23]),z=r(z,w,C,E,v,5,h[24]),E=r(E,z,w,C,m,9,h[25]),C=r(C,E,z,w,l,14,h[26]),w=r(w,C,E,z,y,20,h[27]),z=r(z,w,C,E,S,5,h[28]),E=r(E,z,w,C,f,9,h[29]),C=r(C,E,z,w,_,14,h[30]),w=r(w,C,E,z,k,20,h[31]),z=i(z,w,C,E,p,4,h[32]),E=i(E,z,w,C,y,11,h[33]),C=i(C,E,z,w,B,16,h[34]),w=i(w,C,E,z,m,23,h[35]),z=i(z,w,C,E,a,4,h[36]),E=i(E,z,w,C,u,11,h[37]),C=i(C,E,z,w,_,16,h[38]),w=i(w,C,E,z,g,23,h[39]),z=i(z,w,C,E,S,4,h[40]),E=i(E,z,w,C,o,11,h[41]),C=i(C,E,z,w,l,16,h[42]),w=i(w,C,E,z,d,23,h[43]),z=i(z,w,C,E,v,4,h[44]),E=i(E,z,w,C,k,11,h[45]),C=i(C,E,z,w,x,16,h[46]),w=i(w,C,E,z,f,23,h[47]),z=n(z,w,C,E,o,6,h[48]),E=n(E,z,w,C,_,10,h[49]),C=n(C,E,z,w,m,15,h[50]),w=n(w,C,E,z,p,21,h[51]),z=n(z,w,C,E,k,6,h[52]),E=n(E,z,w,C,l,10,h[53]),C=n(C,E,z,w,g,15,h[54]),w=n(w,C,E,z,a,21,h[55]),z=n(z,w,C,E,y,6,h[56]),E=n(E,z,w,C,x,10,h[57]),C=n(C,E,z,w,d,15,h[58]),w=n(w,C,E,z,S,21,h[59]),z=n(z,w,C,E,u,6,h[60]),E=n(E,z,w,C,B,10,h[61]),C=n(C,E,z,w,f,15,h[62]),w=n(w,C,E,z,v,21,h[63]);c[0]=c[0]+z|0,c[1]=c[1]+w|0,c[2]=c[2]+C|0,c[3]=c[3]+E|0},_doFinalize:function(){var e=this._data,r=e.words,i=8*this._nDataBytes,n=8*e.sigBytes;r[n>>>5]|=128<<  24-n%32;var s=t.floor(i/4294967296);for(r[(n+64>>>9<<  4)+15]=16711935&(s<<  8|s>>>24)|4278255360&(s<<  24|s>>>8),r[(n+64>>>9<<  4)+14]=16711935&(i<<  8|i>>>24)|4278255360&(i<<  24|i>>>8),e.sigBytes=4*(r.length+1),this._process(),e=this._hash,r=e.words,i=0;4>i;i++)n=r[i],r[i]=16711935&(n<<  8|n>>>24)|4278255360&(n<<  24|n>>>8);return e},clone:function(){var t=a.clone.call(this);return t._hash=this._hash.clone(),t}}),s.MD5=a._createHelper(c),s.HmacMD5=a._createHmacHelper(c)}(Math),function(){var t=CryptoJS,e=t.lib,r=e.Base,i=e.WordArray,e=t.algo,n=e.EvpKDF=r.extend({cfg:r.extend({keySize:4,hasher:e.MD5,iterations:1}),init:function(t){this.cfg=this.cfg.extend(t)},compute:function(t,e){for(var r=this.cfg,n=r.hasher.create(),s=i.create(),c=s.words,o=r.keySize,r=r.iterations;c.length<  o;){a&&n.update(a);var a=n.update(t).finalize(e);n.reset();for(var h=1;r>h;h++)a=n.finalize(a),n.reset();s.concat(a)}return s.sigBytes=4*o,s}});t.EvpKDF=function(t,e,r){return n.create(r).compute(t,e)}}(),CryptoJS.lib.Cipher||function(t){var e=CryptoJS,r=e.lib,i=r.Base,n=r.WordArray,s=r.BufferedBlockAlgorithm,c=e.enc.Base64,o=e.algo.EvpKDF,a=r.Cipher=s.extend({cfg:i.extend(),createEncryptor:function(t,e){return this.create(this._ENC_XFORM_MODE,t,e)},createDecryptor:function(t,e){return this.create(this._DEC_XFORM_MODE,t,e)},init:function(t,e,r){this.cfg=this.cfg.extend(r),this._xformMode=t,this._key=e,this.reset()},reset:function(){s.reset.call(this),this._doReset()},process:function(t){return this._append(t),this._process()},finalize:function(t){return t&&this._append(t),this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(t){return{encrypt:function(e,r,i){return("string"==typeof r?d:p).encrypt(t,e,r,i)},decrypt:function(e,r,i){return("string"==typeof r?d:p).decrypt(t,e,r,i)}}}});r.StreamCipher=a.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var h=e.mode={},f=function(e,r,i){var n=this._iv;n?this._iv=t:n=this._prevBlock;for(var s=0;i>s;s++)e[r+s]^=n[s]},l=(r.BlockCipherMode=i.extend({createEncryptor:function(t,e){return this.Encryptor.create(t,e)},createDecryptor:function(t,e){return this.Decryptor.create(t,e)},init:function(t,e){this._cipher=t,this._iv=e}})).extend();l.Encryptor=l.extend({processBlock:function(t,e){var r=this._cipher,i=r.blockSize;f.call(this,t,e,i),r.encryptBlock(t,e),this._prevBlock=t.slice(e,e+i)}}),l.Decryptor=l.extend({processBlock:function(t,e){var r=this._cipher,i=r.blockSize,n=t.slice(e,e+i);r.decryptBlock(t,e),f.call(this,t,e,i),this._prevBlock=n}}),h=h.CBC=l,l=(e.pad={}).Pkcs7={pad:function(t,e){for(var r=4*e,r=r-t.sigBytes%r,i=r<<  24|r<<  16|r<<  8|r,s=[],c=0;r>c;c+=4)s.push(i);r=n.create(s,r),t.concat(r)},unpad:function(t){t.sigBytes-=255&t.words[t.sigBytes-1>>>2]}},r.BlockCipher=a.extend({cfg:a.cfg.extend({mode:h,padding:l}),reset:function(){a.reset.call(this);var t=this.cfg,e=t.iv,t=t.mode;if(this._xformMode==this._ENC_XFORM_MODE)var r=t.createEncryptor;else r=t.createDecryptor,this._minBufferSize=1;this._mode=r.call(t,this,e&&e.words)},_doProcessBlock:function(t,e){this._mode.processBlock(t,e)},_doFinalize:function(){var t=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){t.pad(this._data,this.blockSize);var e=this._process(!0)}else e=this._process(!0),t.unpad(e);return e},blockSize:4});var u=r.CipherParams=i.extend({init:function(t){this.mixIn(t)},toString:function(t){return(t||this.formatter).stringify(this)}}),h=(e.format={}).OpenSSL={stringify:function(t){var e=t.ciphertext;return t=t.salt,(t?n.create([1398893684,1701076831]).concat(t).concat(e):e).toString(c)},parse:function(t){t=c.parse(t);var e=t.words;if(1398893684==e[0]&&1701076831==e[1]){var r=n.create(e.slice(2,4));e.splice(0,4),t.sigBytes-=16}return u.create({ciphertext:t,salt:r})}},p=r.SerializableCipher=i.extend({cfg:i.extend({format:h}),encrypt:function(t,e,r,i){i=this.cfg.extend(i);var n=t.createEncryptor(r,i);return e=n.finalize(e),n=n.cfg,u.create({ciphertext:e,key:r,iv:n.iv,algorithm:t,mode:n.mode,padding:n.padding,blockSize:t.blockSize,formatter:i.format})},decrypt:function(t,e,r,i){return i=this.cfg.extend(i),e=this._parse(e,i.format),t.createDecryptor(r,i).finalize(e.ciphertext)},_parse:function(t,e){return"string"==typeof t?e.parse(t,this):t}}),e=(e.kdf={}).OpenSSL={execute:function(t,e,r,i){return i||(i=n.random(8)),t=o.create({keySize:e+r}).compute(t,i),r=n.create(t.words.slice(e),4*r),t.sigBytes=4*e,u.create({key:t,iv:r,salt:i})}},d=r.PasswordBasedCipher=p.extend({cfg:p.cfg.extend({kdf:e}),encrypt:function(t,e,r,i){return i=this.cfg.extend(i),r=i.kdf.execute(r,t.keySize,t.ivSize),i.iv=r.iv,t=p.encrypt.call(this,t,e,r.key,i),t.mixIn(r),t},decrypt:function(t,e,r,i){return i=this.cfg.extend(i),e=this._parse(e,i.format),r=i.kdf.execute(r,t.keySize,t.ivSize,e.salt),i.iv=r.iv,p.decrypt.call(this,t,e,r.key,i)}})}(),function(){function t(t,e){var r=(this._lBlock>>>t^this._rBlock)&e;this._rBlock^=r,this._lBlock^=r<<  t}function e(t,e){var r=(this._rBlock>>>t^this._lBlock)&e;this._lBlock^=r,this._rBlock^=r<<  t}var r=CryptoJS,i=r.lib,n=i.WordArray,i=i.BlockCipher,s=r.algo,c=[57,49,41,33,25,17,9,1,58,50,42,34,26,18,10,2,59,51,43,35,27,19,11,3,60,52,44,36,63,55,47,39,31,23,15,7,62,54,46,38,30,22,14,6,61,53,45,37,29,21,13,5,28,20,12,4],o=[14,17,11,24,1,5,3,28,15,6,21,10,23,19,12,4,26,8,16,7,27,20,13,2,41,52,31,37,47,55,30,40,51,45,33,48,44,49,39,56,34,53,46,42,50,36,29,32],a=[1,2,4,6,8,10,12,14,15,17,19,21,23,25,27,28],h=[{0:8421888,268435456:32768,536870912:8421378,805306368:2,1073741824:512,1342177280:8421890,1610612736:8389122,1879048192:8388608,2147483648:514,2415919104:8389120,2684354560:33280,2952790016:8421376,3221225472:32770,3489660928:8388610,3758096384:0,4026531840:33282,134217728:0,402653184:8421890,671088640:33282,939524096:32768,1207959552:8421888,1476395008:512,1744830464:8421378,2013265920:2,2281701376:8389120,2550136832:33280,2818572288:8421376,3087007744:8389122,3355443200:8388610,3623878656:32770,3892314112:514,4160749568:8388608,1:32768,268435457:2,536870913:8421888,805306369:8388608,1073741825:8421378,1342177281:33280,1610612737:512,1879048193:8389122,2147483649:8421890,2415919105:8421376,2684354561:8388610,2952790017:33282,3221225473:514,3489660929:8389120,3758096385:32770,4026531841:0,134217729:8421890,402653185:8421376,671088641:8388608,939524097:512,1207959553:32768,1476395009:8388610,1744830465:2,2013265921:33282,2281701377:32770,2550136833:8389122,2818572289:514,3087007745:8421888,3355443201:8389120,3623878657:0,3892314113:33280,4160749569:8421378},{0:1074282512,16777216:16384,33554432:524288,50331648:1074266128,67108864:1073741840,83886080:1074282496,100663296:1073758208,117440512:16,134217728:540672,150994944:1073758224,167772160:1073741824,184549376:540688,201326592:524304,218103808:0,234881024:16400,251658240:1074266112,8388608:1073758208,25165824:540688,41943040:16,58720256:1073758224,75497472:1074282512,92274688:1073741824,109051904:524288,125829120:1074266128,142606336:524304,159383552:0,176160768:16384,192937984:1074266112,209715200:1073741840,226492416:540672,243269632:1074282496,260046848:16400,268435456:0,285212672:1074266128,301989888:1073758224,318767104:1074282496,335544320:1074266112,352321536:16,369098752:540688,385875968:16384,402653184:16400,419430400:524288,436207616:524304,452984832:1073741840,469762048:540672,486539264:1073758208,503316480:1073741824,520093696:1074282512,276824064:540688,293601280:524288,310378496:1074266112,327155712:16384,343932928:1073758208,360710144:1074282512,377487360:16,394264576:1073741824,411041792:1074282496,427819008:1073741840,444596224:1073758224,461373440:524304,478150656:0,494927872:16400,511705088:1074266128,528482304:540672},{0:260,1048576:0,2097152:67109120,3145728:65796,4194304:65540,5242880:67108868,6291456:67174660,7340032:67174400,8388608:67108864,9437184:67174656,10485760:65792,11534336:67174404,12582912:67109124,13631488:65536,14680064:4,15728640:256,524288:67174656,1572864:67174404,2621440:0,3670016:67109120,4718592:67108868,5767168:65536,6815744:65540,7864320:260,8912896:4,9961472:256,11010048:67174400,12058624:65796,13107200:65792,14155776:67109124,15204352:67174660,16252928:67108864,16777216:67174656,17825792:65540,18874368:65536,19922944:67109120,20971520:256,22020096:67174660,23068672:67108868,24117248:0,25165824:67109124,26214400:67108864,27262976:4,28311552:65792,29360128:67174400,30408704:260,31457280:65796,32505856:67174404,17301504:67108864,18350080:260,19398656:67174656,20447232:0,21495808:65540,22544384:67109120,23592960:256,24641536:67174404,25690112:65536,26738688:67174660,27787264:65796,28835840:67108868,29884416:67109124,30932992:67174400,31981568:4,33030144:65792},{0:2151682048,65536:2147487808,131072:4198464,196608:2151677952,262144:0,327680:4198400,393216:2147483712,458752:4194368,524288:2147483648,589824:4194304,655360:64,720896:2147487744,786432:2151678016,851968:4160,917504:4096,983040:2151682112,32768:2147487808,98304:64,163840:2151678016,229376:2147487744,294912:4198400,360448:2151682112,425984:0,491520:2151677952,557056:4096,622592:2151682048,688128:4194304,753664:4160,819200:2147483648,884736:4194368,950272:4198464,1015808:2147483712,1048576:4194368,1114112:4198400,1179648:2147483712,1245184:0,1310720:4160,1376256:2151678016,1441792:2151682048,1507328:2147487808,1572864:2151682112,1638400:2147483648,1703936:2151677952,1769472:4198464,1835008:2147487744,1900544:4194304,1966080:64,2031616:4096,1081344:2151677952,1146880:2151682112,1212416:0,1277952:4198400,1343488:4194368,1409024:2147483648,1474560:2147487808,1540096:64,1605632:2147483712,1671168:4096,1736704:2147487744,1802240:2151678016,1867776:4160,1933312:2151682048,1998848:4194304,2064384:4198464},{0:128,4096:17039360,8192:262144,12288:536870912,16384:537133184,20480:16777344,24576:553648256,28672:262272,32768:16777216,36864:537133056,40960:536871040,45056:553910400,49152:553910272,53248:0,57344:17039488,61440:553648128,2048:17039488,6144:553648256,10240:128,14336:17039360,18432:262144,22528:537133184,26624:553910272,30720:536870912,34816:537133056,38912:0,43008:553910400,47104:16777344,51200:536871040,55296:553648128,59392:16777216,63488:262272,65536:262144,69632:128,73728:536870912,77824:553648256,81920:16777344,86016:553910272,90112:537133184,94208:16777216,98304:553910400,102400:553648128,106496:17039360,110592:537133056,114688:262272,118784:536871040,122880:0,126976:17039488,67584:553648256,71680:16777216,75776:17039360,79872:537133184,83968:536870912,88064:17039488,92160:128,96256:553910272,100352:262272,104448:553910400,108544:0,112640:553648128,116736:16777344,120832:262144,124928:537133056,129024:536871040},{0:268435464,256:8192,512:270532608,768:270540808,1024:268443648,1280:2097152,1536:2097160,1792:268435456,2048:0,2304:268443656,2560:2105344,2816:8,3072:270532616,3328:2105352,3584:8200,3840:270540800,128:270532608,384:270540808,640:8,896:2097152,1152:2105352,1408:268435464,1664:268443648,1920:8200,2176:2097160,2432:8192,2688:268443656,2944:270532616,3200:0,3456:270540800,3712:2105344,3968:268435456,4096:268443648,4352:270532616,4608:270540808,4864:8200,5120:2097152,5376:268435456,5632:268435464,5888:2105344,6144:2105352,6400:0,6656:8,6912:270532608,7168:8192,7424:268443656,7680:270540800,7936:2097160,4224:8,4480:2105344,4736:2097152,4992:268435464,5248:268443648,5504:8200,5760:270540808,6016:270532608,6272:270540800,6528:270532616,6784:8192,7040:2105352,7296:2097160,7552:0,7808:268435456,8064:268443656},{0:1048576,16:33555457,32:1024,48:1049601,64:34604033,80:0,96:1,112:34603009,128:33555456,144:1048577,160:33554433,176:34604032,192:34603008,208:1025,224:1049600,240:33554432,8:34603009,24:0,40:33555457,56:34604032,72:1048576,88:33554433,104:33554432,120:1025,136:1049601,152:33555456,168:34603008,184:1048577,200:1024,216:34604033,232:1,248:1049600,256:33554432,272:1048576,288:33555457,304:34603009,320:1048577,336:33555456,352:34604032,368:1049601,384:1025,400:34604033,416:1049600,432:1,448:0,464:34603008,480:33554433,496:1024,264:1049600,280:33555457,296:34603009,312:1,328:33554432,344:1048576,360:1025,376:34604032,392:33554433,408:34603008,424:0,440:34604033,456:1049601,472:1024,488:33555456,504:1048577},{0:134219808,1:131072,2:134217728,3:32,4:131104,5:134350880,6:134350848,7:2048,8:134348800,9:134219776,10:133120,11:134348832,12:2080,13:0,14:134217760,15:133152,2147483648:2048,2147483649:134350880,2147483650:134219808,2147483651:134217728,2147483652:134348800,2147483653:133120,2147483654:133152,2147483655:32,2147483656:134217760,2147483657:2080,2147483658:131104,2147483659:134350848,2147483660:0,2147483661:134348832,2147483662:134219776,2147483663:131072,16:133152,17:134350848,18:32,19:2048,20:134219776,21:134217760,22:134348832,23:131072,24:0,25:131104,26:134348800,27:134219808,28:134350880,29:133120,30:2080,31:134217728,2147483664:131072,2147483665:2048,2147483666:134348832,2147483667:133152,2147483668:32,2147483669:134348800,2147483670:134217728,2147483671:134219808,2147483672:134350880,2147483673:134217760,2147483674:134219776,2147483675:0,2147483676:133120,2147483677:2080,2147483678:131104,2147483679:134350848}],f=[4160749569,528482304,33030144,2064384,129024,8064,504,2147483679],l=s.DES=i.extend({_doReset:function(){for(var t=this._key.words,e=[],r=0;56>r;r++){var i=c[r]-1;e[r]=t[i>>>5]>>>31-i%32&1}for(t=this._subKeys=[],i=0;16>i;i++){for(var n=t[i]=[],s=a[i],r=0;24>r;r++)n[r/6|0]|=e[(o[r]-1+s)%28]<<  31-r%6,n[4+(r/6|0)]|=e[28+(o[r+24]-1+s)%28]<<  31-r%6;for(n[0]=n[0]<<  1|n[0]>>>31,r=1;7>r;r++)n[r]>>>=4*(r-1)+3;n[7]=n[7]<<  5|n[7]>>>27}for(e=this._invSubKeys=[],r=0;16>r;r++)e[r]=t[15-r]},encryptBlock:function(t,e){this._doCryptBlock(t,e,this._subKeys)},decryptBlock:function(t,e){this._doCryptBlock(t,e,this._invSubKeys)},_doCryptBlock:function(r,i,n){this._lBlock=r[i],this._rBlock=r[i+1],t.call(this,4,252645135),t.call(this,16,65535),e.call(this,2,858993459),e.call(this,8,16711935),t.call(this,1,1431655765);for(var s=0;16>s;s++){for(var c=n[s],o=this._lBlock,a=this._rBlock,l=0,u=0;8>u;u++)l|=h[u][((a^c[u])&f[u])>>>0];this._lBlock=a,this._rBlock=o^l}n=this._lBlock,this._lBlock=this._rBlock,this._rBlock=n,t.call(this,1,1431655765),e.call(this,8,16711935),e.call(this,2,858993459),t.call(this,16,65535),t.call(this,4,252645135),r[i]=this._lBlock,r[i+1]=this._rBlock},keySize:2,ivSize:2,blockSize:2});r.DES=i._createHelper(l),s=s.TripleDES=i.extend({_doReset:function(){var t=this._key.words;this._des1=l.createEncryptor(n.create(t.slice(0,2))),this._des2=l.createEncryptor(n.create(t.slice(2,4))),this._des3=l.createEncryptor(n.create(t.slice(4,6)))},encryptBlock:function(t,e){this._des1.encryptBlock(t,e),this._des2.decryptBlock(t,e),this._des3.encryptBlock(t,e)},decryptBlock:function(t,e){this._des3.decryptBlock(t,e),this._des2.encryptBlock(t,e),this._des1.decryptBlock(t,e)},keySize:6,ivSize:2,blockSize:2}),r.TripleDES=i._createHelper(s)}();

/**
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
CryptoJS.mode.ECB=function(){var e=CryptoJS.lib.BlockCipherMode.extend();return e.Encryptor=e.extend({processBlock:function(e,c){this._cipher.encryptBlock(e,c)}}),e.Decryptor=e.extend({processBlock:function(e,c){this._cipher.decryptBlock(e,c)}}),e}();

/**
swfobject
*/
var swfobject=function(){function e(){if(!G){try{var e=M.getElementsByTagName("body")[0].appendChild(h("span"));e.parentNode.removeChild(e)}catch(t){return}G=!0;for(var n=R.length,a=0;n>a;a++)R[a]()}}function t(e){G?e():R[R.length]=e}function n(e){if(typeof x.addEventListener!=L)x.addEventListener("load",e,!1);else if(typeof M.addEventListener!=L)M.addEventListener("load",e,!1);else if(typeof x.attachEvent!=L)m(x,"onload",e);else if("function"==typeof x.onload){var t=x.onload;x.onload=function(){t(),e()}}else x.onload=e}function a(){P?i():r()}function i(){var e=M.getElementsByTagName("body")[0],t=h(k);t.setAttribute("type",O);var n=e.appendChild(t);if(n){var a=0;!function(){if(typeof n.GetVariable!=L){var i=n.GetVariable("$version");i&&(i=i.split(" ")[1].split(","),X.pv=[parseInt(i[0],10),parseInt(i[1],10),parseInt(i[2],10)])}else if(10>a)return a++,void setTimeout(arguments.callee,10);e.removeChild(t),n=null,r()}()}else r()}function r(){var e=D.length;if(e>0)for(var t=0;e>t;t++){var n=D[t].id,a=D[t].callbackFn,i={success:!1,id:n};if(X.pv[0]>0){var r=y(n);if(r)if(!g(D[t].swfVersion)||X.wk&&X.wk<312)if(D[t].expressInstall&&s()){var f={};f.data=D[t].expressInstall,f.width=r.getAttribute("width")||"0",f.height=r.getAttribute("height")||"0",r.getAttribute("class")&&(f.styleclass=r.getAttribute("class")),r.getAttribute("align")&&(f.align=r.getAttribute("align"));for(var d={},u=r.getElementsByTagName("param"),p=u.length,v=0;p>v;v++)"movie"!=u[v].getAttribute("name").toLowerCase()&&(d[u[v].getAttribute("name")]=u[v].getAttribute("value"));l(f,d,n,a)}else c(r),a&&a(i);else b(n,!0),a&&(i.success=!0,i.ref=o(n),a(i))}else if(b(n,!0),a){var h=o(n);h&&typeof h.SetVariable!=L&&(i.success=!0,i.ref=h),a(i)}}}function o(e){var t=null,n=y(e);if(n&&"OBJECT"==n.nodeName)if(typeof n.SetVariable!=L)t=n;else{var a=n.getElementsByTagName(k)[0];a&&(t=a)}return t}function s(){return!J&&g("6.0.65")&&(X.win||X.mac)&&!(X.wk&&X.wk<312)}function l(e,t,n,a){J=!0,A=a||null,N={success:!1,id:n};var i=y(n);if(i){"OBJECT"==i.nodeName?(E=f(i),S=null):(E=i,S=n),e.id=F,(typeof e.width==L||!/%$/.test(e.width)&&parseInt(e.width,10)<310)&&(e.width="310"),(typeof e.height==L||!/%$/.test(e.height)&&parseInt(e.height,10)<137)&&(e.height="137"),M.title=M.title.slice(0,47)+" - Flash Player Installation";var r=X.ie&&X.win?"ActiveX":"PlugIn",o="MMredirectURL="+x.location.toString().replace(/&/g,"%26")+"&MMplayerType="+r+"&MMdoctitle="+M.title;if(typeof t.flashvars!=L?t.flashvars+="&"+o:t.flashvars=o,X.ie&&X.win&&4!=i.readyState){var s=h("div");n+="SWFObjectNew",s.setAttribute("id",n),i.parentNode.insertBefore(s,i),i.style.display="none",function(){4==i.readyState?i.parentNode.removeChild(i):setTimeout(arguments.callee,10)}()}d(e,t,n)}}function c(e){if(X.ie&&X.win&&4!=e.readyState){var t=h("div");e.parentNode.insertBefore(t,e),t.parentNode.replaceChild(f(e),t),e.style.display="none",function(){4==e.readyState?e.parentNode.removeChild(e):setTimeout(arguments.callee,10)}()}else e.parentNode.replaceChild(f(e),e)}function f(e){var t=h("div");if(X.win&&X.ie)t.innerHTML=e.innerHTML;else{var n=e.getElementsByTagName(k)[0];if(n){var a=n.childNodes;if(a)for(var i=a.length,r=0;i>r;r++)1==a[r].nodeType&&"PARAM"==a[r].nodeName||8==a[r].nodeType||t.appendChild(a[r].cloneNode(!0))}}return t}function d(e,t,n){var a,i=y(n);if(X.wk&&X.wk<312)return a;if(i)if(typeof e.id==L&&(e.id=n),X.ie&&X.win){var r="";for(var o in e)e[o]!=Object.prototype[o]&&("data"==o.toLowerCase()?t.movie=e[o]:"styleclass"==o.toLowerCase()?r+=' class="'+e[o]+'"':"classid"!=o.toLowerCase()&&(r+=" "+o+'="'+e[o]+'"'));var s="";for(var l in t)t[l]!=Object.prototype[l]&&(s+='<param name="'+l+'" value="'+t[l]+'" />');i.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+r+'>'+s+'</object>',W[W.length]=e.id,a=y(e.id)}else{var c=h(k);c.setAttribute("type",O);for(var f in e)e[f]!=Object.prototype[f]&&("styleclass"==f.toLowerCase()?c.setAttribute("class",e[f]):"classid"!=f.toLowerCase()&&c.setAttribute(f,e[f]));for(var d in t)t[d]!=Object.prototype[d]&&"movie"!=d.toLowerCase()&&u(c,d,t[d]);i.parentNode.replaceChild(c,i),a=c}return a}function u(e,t,n){var a=h("param");a.setAttribute("name",t),a.setAttribute("value",n),e.appendChild(a)}function p(e){var t=y(e);t&&"OBJECT"==t.nodeName&&(X.ie&&X.win?(t.style.display="none",function(){4==t.readyState?v(e):setTimeout(arguments.callee,10)}()):t.parentNode.removeChild(t))}function v(e){var t=y(e);if(t){for(var n in t)"function"==typeof t[n]&&(t[n]=null);t.parentNode.removeChild(t)}}function y(e){var t=null;try{t=M.getElementById(e)}catch(n){}return t}function h(e){return M.createElement(e)}function m(e,t,n){e.attachEvent(t,n),H[H.length]=[e,t,n]}function g(e){var t=X.pv,n=e.split(".");return n[0]=parseInt(n[0],10),n[1]=parseInt(n[1],10)||0,n[2]=parseInt(n[2],10)||0,t[0]>n[0]||t[0]==n[0]&&t[1]>n[1]||t[0]==n[0]&&t[1]==n[1]&&t[2]>=n[2]?!0:!1}function w(e,t,n,a){if(!X.ie||!X.mac){var i=M.getElementsByTagName("head")[0];if(i){var r=n&&"string"==typeof n?n:"screen";if(a&&(T=null,I=null),!T||I!=r){var o=h("style");o.setAttribute("type","text/css"),o.setAttribute("media",r),T=i.appendChild(o),X.ie&&X.win&&typeof M.styleSheets!=L&&M.styleSheets.length>0&&(T=M.styleSheets[M.styleSheets.length-1]),I=r}X.ie&&X.win?T&&typeof T.addRule==k&&T.addRule(e,t):T&&typeof M.createTextNode!=L&&T.appendChild(M.createTextNode(e+" {"+t+"}"))}}}function b(e,t){if(U){var n=t?"visible":"hidden";G&&y(e)?y(e).style.visibility=n:w("#"+e,"visibility:"+n)}}function C(e){var t=/[\\\"< >\.;]/,n=null!=t.exec(e);return n&&typeof encodeURIComponent!=L?encodeURIComponent(e):e}{var E,S,A,N,T,I,L="undefined",k="object",j="Shockwave Flash",B="ShockwaveFlash.ShockwaveFlash",O="application/x-shockwave-flash",F="SWFObjectExprInst",$="onreadystatechange",x=window,M=document,V=navigator,P=!1,R=[a],D=[],W=[],H=[],G=!1,J=!1,U=!0,X=function(){var e=typeof M.getElementById!=L&&typeof M.getElementsByTagName!=L&&typeof M.createElement!=L,t=V.userAgent.toLowerCase(),n=V.platform.toLowerCase(),a=/win/.test(n?n:t),i=/mac/.test(n?n:t),r=/webkit/.test(t)?parseFloat(t.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):!1,o=!1,s=[0,0,0],l=null;if(typeof V.plugins!=L&&typeof V.plugins[j]==k)l=V.plugins[j].description,!l||typeof V.mimeTypes!=L&&V.mimeTypes[O]&&!V.mimeTypes[O].enabledPlugin||(P=!0,o=!1,l=l.replace(/^.*\s+(\S+\s+\S+$)/,"$1"),s[0]=parseInt(l.replace(/^(.*)\..*$/,"$1"),10),s[1]=parseInt(l.replace(/^.*\.(.*)\s.*$/,"$1"),10),s[2]=/[a-zA-Z]/.test(l)?parseInt(l.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0);else if(typeof x.ActiveXObject!=L)try{var c=new ActiveXObject(B);c&&(l=c.GetVariable("$version"),l&&(o=!0,l=l.split(" ")[1].split(","),s=[parseInt(l[0],10),parseInt(l[1],10),parseInt(l[2],10)]))}catch(f){}return{w3:e,pv:s,wk:r,ie:o,win:a,mac:i}}();!function(){X.w3&&((typeof M.readyState!=L&&"complete"==M.readyState||typeof M.readyState==L&&(M.getElementsByTagName("body")[0]||M.body))&&e(),G||(typeof M.addEventListener!=L&&M.addEventListener("DOMContentLoaded",e,!1),X.ie&&X.win&&(M.attachEvent($,function(){"complete"==M.readyState&&(M.detachEvent($,arguments.callee),e())}),x==top&&!function(){if(!G){try{M.documentElement.doScroll("left")}catch(t){return void setTimeout(arguments.callee,0)}e()}}()),X.wk&&!function(){return G?void 0:/loaded|complete/.test(M.readyState)?void e():void setTimeout(arguments.callee,0)}(),n(e)))}(),function(){X.ie&&X.win&&window.attachEvent("onunload",function(){for(var e=H.length,t=0;e>t;t++)H[t][0].detachEvent(H[t][1],H[t][2]);for(var n=W.length,a=0;n>a;a++)p(W[a]);for(var i in X)X[i]=null;X=null;for(var r in swfobject)swfobject[r]=null;swfobject=null})}()}return{registerObject:function(e,t,n,a){if(X.w3&&e&&t){var i={};i.id=e,i.swfVersion=t,i.expressInstall=n,i.callbackFn=a,D[D.length]=i,b(e,!1)}else a&&a({success:!1,id:e})},getObjectById:function(e){return X.w3?o(e):void 0},embedSWF:function(e,n,a,i,r,o,c,f,u,p){var v={success:!1,id:n};X.w3&&!(X.wk&&X.wk<312)&&e&&n&&a&&i&&r?(b(n,!1),t(function(){a+="",i+="";var t={};if(u&&typeof u===k)for(var y in u)t[y]=u[y];t.data=e,t.width=a,t.height=i;var h={};if(f&&typeof f===k)for(var m in f)h[m]=f[m];if(c&&typeof c===k)for(var w in c)typeof h.flashvars!=L?h.flashvars+="&"+w+"="+c[w]:h.flashvars=w+"="+c[w];if(g(r)){var C=d(t,h,n);t.id==n&&b(n,!0),v.success=!0,v.ref=C}else{if(o&&s())return t.data=o,void l(t,h,n,p);b(n,!0)}p&&p(v)})):p&&p(v)},switchOffAutoHideShow:function(){U=!1},ua:X,getFlashPlayerVersion:function(){return{major:X.pv[0],minor:X.pv[1],release:X.pv[2]}},hasFlashPlayerVersion:g,createSWF:function(e,t,n){return X.w3?d(e,t,n):void 0},showExpressInstall:function(e,t,n,a){X.w3&&s()&&l(e,t,n,a)},removeSWF:function(e){X.w3&&p(e)},createCSS:function(e,t,n,a){X.w3&&w(e,t,n,a)},addDomLoadEvent:t,addLoadEvent:n,getQueryParamValue:function(e){var t=M.location.search||M.location.hash;if(t){if(/\?/.test(t)&&(t=t.split("?")[1]),null==e)return C(t);for(var n=t.split("&"),a=0;a< n.length;a++)if(n[a].substring(0,n[a].indexOf("="))==e)return C(n[a].substring(n[a].indexOf("=")+1))}return""},expressInstallCallback:function(){if(J){var e=y(F);e&&E&&(e.parentNode.replaceChild(E,e),S&&(b(S,!0),X.ie&&X.win&&(E.style.display="block")),A&&A(N)),J=!1}}}}();

/** 
Copyright (c) Copyright (c) 2007, Carl S. Yestrau All rights reserved.
Code licensed under the BSD License: http://www.featureblend.com/license.txt
Version: 1.0.4
*/
var FlashDetect=new function(){var r=this;r.installed=!1,r.raw="",r.major=-1,r.minor=-1,r.revision=-1,r.revisionStr="";var n=[{name:"ShockwaveFlash.ShockwaveFlash.7",version:function(r){return e(r)}},{name:"ShockwaveFlash.ShockwaveFlash.6",version:function(r){var n="6,0,21";try{r.AllowScriptAccess="always",n=e(r)}catch(i){}return n}},{name:"ShockwaveFlash.ShockwaveFlash",version:function(r){return e(r)}}],e=function(r){var n=-1;try{n=r.GetVariable("$version")}catch(i){}return n},a=function(r){var n=-1;try{n=new ActiveXObject(r)}catch(i){n={activeXError:!0}}return n},t=function(r){var n=r.split(",");return{raw:r,major:parseInt(n[0].split(" ")[1],10),minor:parseInt(n[1],10),revision:parseInt(n[2],10),revisionStr:n[2]}},o=function(r){var n=r.split(/ +/),i=n[2].split(/\./),e=n[3];return{raw:r,major:parseInt(i[0],10),minor:parseInt(i[1],10),revisionStr:e,revision:s(e)}},s=function(n){return parseInt(n.replace(/[a-zA-Z]/g,""),10)||r.revision};r.majorAtLeast=function(n){return r.major>=n},r.minorAtLeast=function(n){return r.minor>=n},r.revisionAtLeast=function(n){return r.revision>=n},r.versionAtLeast=function(){var n=[r.major,r.minor,r.revision],e=Math.min(n.length,arguments.length);for(i=0;i< e;i++){if(n[i]>=arguments[i]){if(i+1< e&&n[i]==arguments[i])continue;return!0}return!1}},r.FlashDetect=function(){if(navigator.plugins&&navigator.plugins.length>0){var i="application/x-shockwave-flash",e=navigator.mimeTypes;if(e&&e[i]&&e[i].enabledPlugin&&e[i].enabledPlugin.description){var s=e[i].enabledPlugin.description,v=o(s);r.raw=v.raw,r.major=v.major,r.minor=v.minor,r.revisionStr=v.revisionStr,r.revision=v.revision,r.installed=!0}}else if(-1==navigator.appVersion.indexOf("Mac")&&window.execScript)for(var s=-1,c=0;c< n.length&&-1==s;c++){var l=a(n[c].name);if(!l.activeXError&&(r.installed=!0,s=n[c].version(l),-1!=s)){var v=t(s);r.raw=v.raw,r.major=v.major,r.minor=v.minor,r.revision=v.revision,r.revisionStr=v.revisionStr}}}()};FlashDetect.JS_RELEASE="1.0.4";
/** lib load end ****************************/

// ?¸ì??ê°? ?¤ì??
ktb.setupLsvalue = function(args) {
	ktb.ls_hash		= args.lsHash;
	ktb.ls_key		= args.lsKey;
	ktb.ls_value	= args.lsValue;
	ktb.ls_tgs		= args.lsTgs;
	ktb.ls_code		= args.lsCode;
	ktb.av			= args.lsVer;
}
ktb.setupLsvalue(clientKeys);


ktb.flash_id = "nonaStorage";
ktb.flash_name = ktb.flashUrl; // Flash?? ????ê²½ë? ?¤ì??
ktb.websocket_disable = false;
ktb.keySize = 128;
ktb.iterationCount = 1000;
ktb.g_public_key;
ktb.g_private_ip;
ktb.g_local_port;
ktb.security_value;
ktb.private_ip_index=0;
ktb.private_ip_event=false;
ktb.lg_gey;ktb.lg_key;
ktb.lg_value;ktb.lg_first;
ktb.cg_gey;ktb.cg_key;
ktb.cg_value;ktb.cg_first;
ktb.sg_gey;
ktb.sg_key;
ktb.sg_value;
ktb.sg_first;
ktb.mg_gey;
ktb.mg_key;
ktb.mg_value;
ktb.mg_first;
ktb.store="L";
ktb.ie_security="false";
ktb.screen_width=screen.availWidth;
ktb.screen_height=screen.availHeight;
ktb.color_depth=screen.colorDepth;
ktb.pixel_depth=screen.pixelDepth;
ktb.cookie_use = navigator.cookieEnabled;
ktb.local_use = "false";
ktb.flash_use = "false";

ktb.al;
ktb.ac;
ktb.as;
ktb.platform;
ktb.postData;

ktb.nullCheck = function(Str) {
	if(Str == undefined) {
		Str = "";
	}

	if(Str == "undefined") {
		Str = "";
	}
	return Str;
};
ktb.set_cookie = function(cname, cvalue, exdays) {
	var today = new Date();
	today.setTime(today.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+today.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
	return;
};
ktb.get_cookie = function(cname) {
	var name = cname + "=";
		var ca = document.cookie.split(";");
		for(var i=0; i<  ca.length; i++) {
			 if(ca[i].indexOf(name) >= 0) {
			var spc = ca[i].split("=");
			return spc[1];
			break;
		};
		};
		return "";
};
ktb.delete_cookie = function(cname) {
	var today = new Date();
	today.setTime(today.getTime() - 1);
	var value = getCookie(cname);
	if(value != "") {
		document.cookie = cname + "=" + value + "; path=/; expires=" + today.toGMTString();
	};
	return;
};
ktb.plugins = navigator.plugins;
ktb.plugins_info = "";
ktb.plugins_name = "";
ktb.plugins_filename = "";
for(ktb.i=0; ktb.i<  ktb.plugins.length; ktb.i++) {
	ktb.plugins_name+=ktb.plugins[ktb.i].name+","; 
	ktb.plugins_filename+=ktb.plugins[ktb.i].filename+",";
};
if(window.ActiveXObject && !ktb.plugins_name){
	var names = ['ShockwaveFlash.ShockwaveFlash',
				'AcroPDF.PDF',
				'PDF.PdfCtrl',
				'QuickTime.QuickTime',
				'rmocx.RealPlayer G2 Control',
				'rmocx.RealPlayer G2 Control.1',
				'RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)',
				'RealVideo.RealVideo(tm) ActiveX Control (32-bit)',
				'RealPlayer',
				'SWCtl.SWCtl',
				'WMPlayer.OCX',
				'AgControl.AgControl',
				'Skype.Detection'];
	for(var i=0; i<  names.length; i++) {
		try {
			var result = new ActiveXObject(names[i]);
			ktb.plugins_name+=names[i];
		} catch(e){
		}
	}
};
ktb.uniqueArray = function(data) {
	var setArray = data.split(",");
	for(var j=0; j<  setArray.length; j++) {
		var checkArray = setArray[j].split(".");
		if(checkArray.length == 4) {
			if(ktb.private_array.indexOf(setArray[j]) <   0) {
				 if (setArray[j].match(/^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/)) {
				 	ktb.private_array.push(setArray[j]);
				 }
			};
		};
	};
};

ktb.private_array = new Array();
ktb.getPrivateIP = function() {
	var RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
	var useWebKit = !!window.webkitRTCPeerConnection;
	if(!RTCPeerConnection) {
		ktb.private_ip_event = true;
		return;
	};
	var mediaConstraints = {optional: [{RtpDataChannels: true}]};
	var servers = undefined;
	if(useWebKit) {
		servers = {iceServers: [{urls: "stun:stun.services.mozilla.com"}]};
	};
	try {
		var pc = new RTCPeerConnection(servers, mediaConstraints);
		function handleCandidate(candidate) {
			var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
			var ip_addr = ip_regex.exec(candidate);
			if(ip_addr!=null) {
				ktb.uniqueArray(ip_addr.toString());	
			}
		};
		pc.onicecandidate = function(ice) {
			if(ice.candidate) {
				handleCandidate(ice.candidate.candidate);
			}
		};
		pc.createDataChannel("");
		pc.createOffer(function(result){
			pc.setLocalDescription(result, function(){}, function(){});
		}, function(){});
	} catch(err) {
		ktb.private_ip_event = true;
	};
};
ktb.getPrivateIP();

ktb.getLocalStorage = function() {
	if(typeof(Storage) != "undefined") {
		try {
			var ls_value = localStorage.getItem(ktb.ls_hash);
			if( ls_value == null) {
				localStorage.setItem(ktb.ls_hash,ktb.ls_key);
				localStorage.setItem(ktb.ls_key,ktb.ls_value);
				localStorage.setItem("first","true");
			} else {
				localStorage.setItem("first","false");
			};
			ktb.lg_gey = ktb.ls_hash;
			ktb.lg_key = localStorage.getItem(ktb.lg_gey);
			ktb.lg_value = localStorage.getItem(ktb.lg_key);
			ktb.lg_first = localStorage.getItem("first");
		} catch(e) {
			ktb.ie_security = "true";
		};
		ktb.local_use = "true";
	};
	return;
};
ktb.getLocalStorage();

ktb.getCookieStorage = function() {
	var ls_value = ktb.get_cookie(ktb.ls_hash);
	if(!ls_value) {
		ktb.set_cookie(ktb.ls_hash,ktb.ls_key,3600);
		ktb.set_cookie(ktb.ls_key,ktb.ls_value,3600);
		ktb.set_cookie("first","true",3600);
	} else {
		ktb.set_cookie("first", "false", 3600);
	};	
	ktb.cg_gey = ktb.ls_hash;
	ktb.cg_key = ktb.get_cookie(ktb.cg_gey);
	ktb.cg_value = ktb.get_cookie(ktb.cg_key);
	ktb.cg_first = ktb.get_cookie("first");
	return;
};
ktb.getCookieStorage();

ktb.lsHash = function() {return ktb.ls_hash;};
ktb.lsKey = function() {return ktb.ls_key;};
ktb.lsValue = function() {return ktb.ls_value;};
ktb.lstgs = function() {return ktb.ls_tgs;};
ktb.lsCode = function() {return ktb.ls_code;};

ktb.flash_is_flag = false;
ktb.flash_ls_hash;
ktb.flash_ls_key;
ktb.flash_ls_value;
ktb.flash_ls_tgs;
ktb.flash_ls_code;
ktb.flash_ls_first;

// Flash ë¡?ì»¬ì?¤í??ë¦¬ì? ê°? ?¤ì??
ktb.setlsHash = function(setVlaue) {ktb.flash_ls_hash = setVlaue};
ktb.setlsKey = function(setVlaue) {ktb.flash_ls_key = setVlaue};
ktb.setlsValue = function(setVlaue) {ktb.flash_ls_value = setVlaue};
ktb.setlstgs = function(setVlaue) {ktb.flash_ls_tgs = setVlaue};
ktb.setlsCode = function(setVlaue) {ktb.flash_ls_code = setVlaue};
ktb.setlsFirst = function(setVlaue) {ktb.flash_ls_first = setVlaue};

// Flash êµ¬ë???¬ë? ????
ktb.__initialize = function() {
	var container = document.createElement("div");
	container.id = "ktbFlashContainer";
	container.style.position = "absolute";
	container.style.left = "-100px";
	container.style.top = "-100px";
	var holder = document.createElement("div");
	holder.id = ktb.flash_id;
	container.appendChild(holder);
	document.body.appendChild(container);
	
	swfobject.embedSWF(
		ktb.flash_name,
		ktb.flash_id,
		"0" /* width */,
		"0" /* height */,
		"10.0.0" /* SWF version */,
		null,
		null,
		{hasPriority: true, swliveconnect : true, allowScriptAccess: "always"},
		null,
		function(e) {
			if(e.success == true) {
				// Flashê°? êµ¬ë????ë©? ?¤í??
				ktb.flash_is_flag = true;
				ktb.flash_use = "true";
				ktb.setupWasData("@F");
			} else {
				ktb.setupWasData("@H");
			}
		}
	);
};

// Flash êµ¬ë???¬ë? ???? Method ?¤í??
swfobject.addDomLoadEvent(function() {
	ktb.__initialize();
});

// nona Solution ??ë¬¸ì??ì§? Method
ktb.set_index = 0;
ktb.set_timeout = 150;
ktb.ktbOnevent = function() {
	setTimeout(function() {
		ktb.set_index++;
		if(ktb.set_index >= ktb.set_timeout) {
			ktb.set11stWasData(ktb.platform);
		} else {
			ktb.ktbOnevent();
		}
	}, 0);
	return;
};

// Platform?? ???? ???¤ë©´..
ktb.setupWasData = function(platform) {
	ktb.platform = platform;
	// Flash2ì°? ê²??? -> Flashê°? ?¤ì????? ??ì§? ???¤ë©´..
	if(!FlashDetect.installed){
		ktb.platform = "@H";
	}
	// nona Solution ??ë¬¸ì??ì§? ?¤í??
	ktb.ktbOnevent();
	return;
}

ktb.set11stWasData = function() {
	if(!ktb.platform) {
		ktb.setupWasData("@H")
		ktb.set11stWasData();
		return;
	}

	ktb.mg_gey = ktb.lg_gey;
	ktb.mg_key = ktb.lg_key;
	ktb.mg_value = ktb.lg_value;
	ktb.mg_first = ktb.lg_first;
	if(!ktb.lg_gey || ktb.lg_gey == null) {
		ktb.mg_gey = ktb.cg_gey;
		ktb.mg_key = ktb.cg_key;
		ktb.mg_value = ktb.cg_value;
		ktb.mg_first = ktb.cg_first;
	};

	
	// Flashê°? êµ¬ë???? ???? ??ê²½ì?´ë?¼ë??.. ë¸??¼ì?°ì?????? êµ¬ë???? ???½ì?? ?? ?? ??ê¸? ??ë¬¸ì?? ???¬ì?¬ê? ê°??? ???¸í???? ???¼ë©´ ë¡?ì»¬ì?¤í??ë¦¬ì?ë¡? ê°??? ?¤í?? ????.
	if(ktb.flash_ls_hash != null || ktb.flash_ls_key) {
		ktb.mg_gey = ktb.nullCheck(ktb.flash_ls_hash);
		ktb.mg_key = ktb.nullCheck(ktb.flash_ls_key);
		ktb.mg_value = ktb.nullCheck(ktb.flash_ls_value);
		ktb.mg_first = ktb.nullCheck(ktb.flash_ls_first);
		ktb.store = "F";
	}

	ktb.al = ktb.nullCheck(ktb.lg_value);
	ktb.ac = ktb.nullCheck(ktb.cg_value);
	ktb.as = ktb.nullCheck(ktb.flash_ls_value);
	
	// WASë¡? ???¡í??ê¸? ???? ?°ì?´í?? ì¡°í??

	var set_value = ktb.platform+"|";
	set_value = set_value + ktb.av+"|";
	set_value = set_value + ktb.nullCheck(ktb.private_array.toString())+"|";
	set_value = set_value + ktb.mg_key+"|";
	set_value = set_value + ktb.mg_value+"|";
	set_value = set_value + ktb.mg_first+"|";
	set_value = set_value + ktb.ls_tgs+"|";
	set_value = set_value + ktb.store+"|";
	set_value = set_value + ktb.screen_width+"|";
	set_value = set_value + ktb.screen_height+"|";
	set_value = set_value + ktb.pixel_depth+"|";
	set_value = set_value + ktb.ie_security+"|";
	set_value = set_value + ktb.al+"|";
	set_value = set_value + ktb.ac+"|";
	set_value = set_value + ktb.as+"|";
	set_value = set_value + ktb.cookie_use+"|";
	set_value = set_value + ktb.local_use+"|";
	set_value = set_value + ktb.flash_use+"|";
	set_value = set_value + ktb.plugins_name+"|";
	set_value = set_value + ktb.plugins_filename+"|";
	ktb.security_value = set_value;
	
	// WASë¡? ???¡í???? ìµ?ì¢? ?°ì?´í?? ????
	ktb.postData = ktb.ls_code+ktb.encryptByDES(ktb.security_value, ktb.ls_code);
	return;
};

ktb.encryptByDES = function (message, key) {
		var keyHex = CryptoJS.enc.Utf8.parse(key);
		var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7
		});
		return encrypted.toString();
}
 
ktb.decryptByDES = function(ciphertext, key) {
		var keyHex = CryptoJS.enc.Utf8.parse(key);
		var decrypted = CryptoJS.DES.decrypt({
				ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
		}, keyHex, {
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7
		});
		return decrypted.toString(CryptoJS.enc.Utf8);
}


// 11ST?¸ì? ?¨ì??
ktb.getScanResult = function() {
	return ktb.postData;
}
