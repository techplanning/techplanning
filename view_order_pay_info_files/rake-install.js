window.rake = {
    LIVE: "LIVE",
    DEV:  "DEV"
};

window.rake.install = function (config) {
    var RAKE_BUILD_DATE = "20150804_200651";

    if (config === undefined)
        throw new Error('invalid rake configuration. passed config === undefined');

    if (config.token === undefined)
        throw new Error('invalid rake token. passed config.token === undefined');

    if ((typeof config.token != 'string')
        && !(config.token instanceof String))
        throw new Error("invalid rake token. the type of token should be string (or instance of String) instead of '" + typeof config.token);

    if (config.env === undefined)
        throw new Error('invalid rake env. passed config.env === undefined');

    if (config.env !== rake.LIVE && config.env !== rake.DEV)
        throw new Error("invalid rake env. you should pass rake.LIVE or rake.DEV instead of '" + config.env + "'");

    var isDev = (config.env === rake.DEV) ? true : false;
    var token = config.token;
    var rakeJsVersion = "1.5";
    var rakeServerUrl = undefined;

    if (isDev) {
        rakeServerUrl = 'https://pg.rake.skplanet.com:8443/log/resources/js/rake-skp.test-1.5.min.js';
    } else {
        rakeServerUrl = 'https://rake.skplanet.com:8443/log/resources/js/rake-skp-1.5.min.js';
    }

    (function(e,b){if(!b.__SV){var a,f,i,g;window.mixpanel=b;a=e.createElement("script");a.type="text/javascript";a.async=!0;a.src=rakeServerUrl;f=e.getElementsByTagName("script")[0];f.parentNode.insertBefore(a,f);b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable track collect flush track_pageview track_links track_forms flush register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user".split(" ");for(g=0;g<i.length;g++)f(c,i[g]);b._i.push([a,e,d])};b.__SV=1.2}})(document,window.mixpanel||[]);mixpanel.init(token);

    window.rake.track = function(shuttle, callback) {
        window.mixpanel.track("", shuttle, callback);
    };
    window.rake.flush = window.mixpanel.flush;
    window.rake.collect = window.mixpanel.collect;
};
