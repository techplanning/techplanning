!function (e, t, callback) {
    function n() {
        var e = navigator.userAgent.toLowerCase();
        return e.indexOf("msie") != -1 && parseInt(e.split("msie")[1])
    }

    function r(e, t) {/**/
        e[t] = function () {
            e.push([t].concat(Array.prototype.slice.call(arguments, 0)))
        }
    }

    try {
        var o, s = "RAKE";
        if ("DEV" === _$RAKE_ENV) o = "https://pg.rake.skplanet.com:8443/log/static/js/rake/current/"; else {
            if ("LIVE" !== _$RAKE_ENV)throw Error("Invalid $_RAKE_ENV: " + _$RAKE_ENV);
            o = "https://rake.skplanet.com:8443/log/static/js/rake/current/"
        }
        if (window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest) o += "rake.bundle.js"; else if (8 == n()) o += "rake.bundle-ie8.js"; else {
            if (9 != n())throw new Error("Unsupported IE version: " + n());
            o += "rake.bundle-ie9.js"
        }
        var i = "_$SV", a = "_$cb";
        if (t[i]) console.warn("RAKE snippet is already initialized"); else {
            window[s] = t;
            var c, l, p, u;
            c = e.createElement("script"), c.type = "text/javascript", c.onload=callback, c.async = !0, c.src = o, l = e.getElementsByTagName("script")[0], l.parentNode.insertBefore(c, l);
            var E = t;
            for (p = ["create", "remove", "track", "collect", "flush"], u = 0; u < p.length; u++)r(E, p[u]);
            t[i] = 1, t[a] = function (e) {
                window[s] = e
            }
        }
    } catch (e) {
        console && console.log && (console.log("Failed to execute RAKE snippet due to"), console.log(e))
    }
}(document, window[window.RAKE] || []);