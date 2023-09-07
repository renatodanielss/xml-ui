!function (e, t) { function n() { if (!i) { i = !0; for (var e = 0; e < r.length; e++)r[e].fn.call(window, r[e].ctx); r = [] } } function a() { "complete" === document.readyState && n() } e = e || "docReady", t = t || window; var r = [], i = !1, o = !1; t[e] = function (e, t) { return i ? void setTimeout(function () { e(t) }, 1) : (r.push({ fn: e, ctx: t }), void ("complete" === document.readyState ? setTimeout(n, 1) : o || (document.addEventListener ? (document.addEventListener("DOMContentLoaded", n, !1), window.addEventListener("load", n, !1)) : (document.attachEvent("onreadystatechange", a), window.attachEvent("onload", n)), o = !0))) } }("dispatchOnLoad", window); var Iugu = function () { function e(e, t) { var n, a, r; a = e.getElementsByTagName("input"), r = e.getElementsByTagName("select"), n = {}; for (var i = 0; i < a.length; i++)attr = a[i].getAttribute("data-iugu"), null != attr && -1 != t.indexOf(attr) && (n[attr] = a[i].value, "full_name" == attr && (splitted_name = Iugu.utils.getFirstLastNameByFullName(a[i].value), n.first_name = splitted_name[0], n.last_name = splitted_name[1])); for (var i = 0; i < r.length; i++)attr = r[i].getAttribute("data-iugu"), null != attr && -1 != t.indexOf(attr) && null != r[i].selectedIndex && (n[attr] = r[i].options[r[i].selectedIndex].value); return n } function t(e, n, a) { null == n && (n = []); for (index in e) param = e[index], a && (index = a + "[" + index + "]"), "object" == typeof param ? t(param, n, index) : n.push(index + "=" + encodeURIComponent(param)); return n.join("&").replace(/%20/g, "+") } function n() { return r + "/" + i + "/" } function a(e, n) { var a = n.callbackName || "callback", r = n.onSuccess || function () { }, i = n.onTimeout || function () { }, u = n.onError || function () { }, d = n.timeout || 10, s = n.data || {}, l = a; if (1 != window[l]) { var c = (new Date).getTime(); a += ++c, s.account_id = o, s.callback = a; var f = document.createElement("script"); window[l] = !0; var m = function () { try { delete window[a], delete window[l] } catch (e) { window[a] = void 0, window[l] = void 0 } }, v = (window.setTimeout(function () { window[l] = void 0 }, 1e3 * d), window.setTimeout(function () { window[a] = function () { }, i(), document.getElementsByTagName("head")[0].removeChild(f), m() }, 1e3 * d)); window[a] = function (e) { window.clearTimeout(v), r(e), document.getElementsByTagName("head")[0].removeChild(f), m() }, f.type = "text/javascript", f.async = !0, f.src = e + "?" + t(s), f.onerror = function () { window.clearTimeout(v), u(), document.getElementsByTagName("head")[0].removeChild(f), m() }, document.getElementsByTagName("head")[0].appendChild(f) } } var r = "https://api.iugu.com", i = "v1", o = null, u = !1, d = ["number", "verification_value", "first_name", "last_name", "expiration", "expiration_month", "expiration_year", "full_name"]; window.hasOwnProperty = window.hasOwnProperty || Object.prototype.hasOwnProperty, Array.prototype.indexOf || (Array.prototype.indexOf = function (e, t) { for (var n = t || 0, a = this.length; a > n; n++)if (this[n] === e) return n; return -1 }), "function" != typeof String.prototype.trim && (String.prototype.trim = function () { return this.replace(/^\s+|\s+$/g, "") }), Object.keys || (Object.keys = function (e) { var t = []; for (var n in e) e.hasOwnProperty(n) && t.push(n); return t }); var s = function () { try { var e = window.localStorage } catch (t) { } try { var n = window.sessionStorage } catch (a) { } var r = "ig_fp"; return generateGUID = "undefined" != typeof window.crypto && "undefined" != typeof window.crypto.getRandomValues ? function () { var e = new Uint16Array(8); window.crypto.getRandomValues(e); var t = function (e) { for (var t = e.toString(16); t.length < 4;)t = "0" + t; return t }; return t(e[0]) + t(e[1]) + "-" + t(e[2]) + "-" + t(e[3]) + "-" + t(e[4]) + "-" + t(e[5]) + t(e[6]) + t(e[7]) } : function () { return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) { var t = 16 * Math.random() | 0, n = "x" == e ? t : 3 & t | 8; return n.toString(16) }) }, readwrite_db = function (e, t) { try { if (window.openDatabase) { var n = window.openDatabase("sqlite_" + r, "", r, 1048576); void 0 !== t ? n.transaction(function (n) { n.executeSql("CREATE TABLE IF NOT EXISTS data (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, value TEXT NOT NULL, UNIQUE (name))", [], function () { }, function () { }), n.executeSql("INSERT OR REPLACE INTO data (name, value) VALUES(?, ?)", [e, t], function () { }, function () { }) }) : n.transaction(function (t) { t.executeSql("SELECT value FROM data WHERE name=?", [e], function (e, t) { t.rows.length >= 1 ? self._ec.dbData = t.rows.item(0).value : self._ec.dbData = "" }, function () { }) }) } } catch (a) { } }, readwrite_local = function (t, n) { try { if (e) { if (void 0 === n) return e.getItem(t); e.setItem(t, n) } } catch (a) { } }, readwrite_index = function (e, t) { try { if ("indexedDB" in window || (indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB, IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction, IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange), indexedDB) { var n = 1, a = indexedDB.open("idb_" + r, n); a.onerror = function () { }, a.onupgradeneeded = function (e) { var t = e.target.result; t.createObjectStore(r, { keyPath: "name", unique: !1 }) }, void 0 !== t ? a.onsuccess = function (n) { var a = n.target.result; if (a.objectStoreNames.contains(r)) { var i = a.transaction([r], "readwrite"), o = i.objectStore(r); o.put({ name: e, value: t }) } a.close() } : a.onsuccess = function (t) { var n = t.target.result; if (n.objectStoreNames.contains(r)) { var a = n.transaction([r]), i = a.objectStore(r), o = i.get(e); o.onsuccess = function () { void 0 === o.result ? window.iugu_idbData = void 0 : window.iugu_idbData = o.result.value } } else window.iugu_idbData = void 0; n.close() } } } catch (i) { } }, readwrite_session = function (e, t) { try { if (n) { if (void 0 === t) return n.getItem(e); n.setItem(e, t) } } catch (a) { } }, readwrite_global = function (e, t) { if (window.globalStorage) try { if (void 0 === t) return window.globalStorage["iugu.com"][e]; window.globalStorage["iugu.com"][e] = t } catch (n) { } }, readwrite_cookie = function (e, t) { return void 0 === t ? readwrite_getFromStr(e, document.cookie) : (document.cookie = e + "=; expires=Mon, 20 Sep 2010 00:00:00 UTC; path=/; domain=iugu.com", void (document.cookie = e + "=" + t + "; expires=Tue, 31 Dec 2030 00:00:00 UTC; path=/; domain=iugu.com")) }, readwrite_getFromStr = function (e, t) { if ("string" == typeof t) { var n, a, r = e + "=", i = t.split(/[;&]/); for (n = 0; n < i.length; n++) { for (a = i[n]; " " === a.charAt(0);)a = a.substring(1, a.length); if (0 === a.indexOf(r)) return a.substring(r.length, a.length) } } }, { generate: function () { return value = readwrite_cookie("__ifpi"), null != value ? value : (value = readwrite_session("__ifpi"), null != value ? value : (value = readwrite_global("__ifpi"), null != value ? value : (value = readwrite_local("__ifpi"), null != value ? value : (value = readwrite_index("__ifpi"), null != value ? value : (value = readwrite_db("__ifpi"), null != value ? value : (_validFP = generateGUID(), readwrite_cookie("__ifpi", _validFP), readwrite_session("__ifpi", _validFP), readwrite_global("__ifpi", _validFP), readwrite_local("__ifpi", _validFP), readwrite_index("__ifpi", _validFP), readwrite_db("__ifpi", _validFP), _validFP)))))) } } }(), l = { listen: function (e, t, n) { if (t.addEventListener) t.addEventListener(e, n, !1); else if (t.attachEvent) { var a = t.attachEvent("on" + e, n); return a } }, hasClass: function (e, t) { return e.className.match(new RegExp("(\\s|^)" + t + "(\\s|$)")) }, addClass: function (e, t) { l.hasClass(e, t) || (e.className += " " + t) }, removeClass: function (e, t) { if (l.hasClass(e, t)) { var n = new RegExp("(\\s|^)" + t + "(\\s|$)"); e.className = e.className.replace(n, " "), e.className = e.className.replace("  ", " "), e.className = e.className.trim() } } }; return cards = { elo: { cvv_pattern: /^[0-9]{3}$/, brand: /^(4011(78|79)|43(1274|8935)|45(1416|7393|763(1|2))|50(4175|6699|67[0-7][0-9]|9000)|50(9[0-9][0-9][0-9])|627780|63(6297|6368)|650(03([^4])|04([0-9])|05(0|1)|05([7-9])|06([0-9])|07([0-9])|08([0-9])|4([0-3][0-9]|8[5-9]|9[0-9])|5([0-9][0-9]|3[0-8])|9([0-6][0-9]|7[0-8])|7([0-2][0-9])|541|700|720|727|901)|65165([2-9])|6516([6-7][0-9])|65500([0-9])|6550([0-5][0-9])|655021|65505([6-7])|6516([8-9][0-9])|65170([0-4]))/ }, visa: { cvv_pattern: /^[0-9]{3}$/, brand: /^4/ }, mastercard: { cvv_pattern: /^[0-9]{3}$/, brand: /^(5[1-5]|677189|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)/ }, amex: { cvv_pattern: /^[0-9]{4}$/, brand: /^(34|37)/ }, diners: { cvv_pattern: /^[0-9]{3}$/, brand: /^(30|36|38|39)/ } }, utils = { validateAccountID: function (e) { return /^[a-fA-F0-9]{8}[a-fA-F0-9]{4}[a-fA-F0-9]{4}[a-fA-F0-9]{4}[a-fA-F0-9]{12}$/.test(e) ? void 0 : "ID de Conta (AccountID) inv\xe1lido.\r\nConfigure usando o m\xe9todo setAccountID()" }, formatUUID: function (e) { var t = e.toUpperCase().replace("-", ""); return t.substr(0, 8) + "-" + t.substr(8, 4) + "-" + t.substr(12, 4) + "-" + t.substr(16, 4) + "-" + t.substr(20, 12) }, validateCreditCardNumber: function (e) { if (0 == e.length || /[^0-9-\s]+/.test(e)) return !1; var t = 0, n = 0, a = !1; e = e.replace(/\D/g, ""); for (var r = e.length - 1; r >= 0; r--) { var i = e.charAt(r), n = parseInt(i, 10); a && (n *= 2) > 9 && (n -= 9), t += n, a = !a } return t % 10 == 0 }, validateCVV: function (e, t) { return t && cards[t] ? cards[t].cvv_pattern.test(e) : !1 }, validateExpiration: function (e, t) { if (today = new Date, isNaN(parseInt(e)) || isNaN(parseInt(t))) return !1; if (void 0 == e) return !1; if (e > 12 || 1 > e) return !1; if (void 0 == t) return !1; if (2 == t.length && (t = today.getFullYear().toString().substr(0, 2) + t), t < today.getFullYear()) return !1; if (t == today.getFullYear()) { if (e > 12 || e < today.getMonth() + 1) return !1 } else if (t > today.getFullYear() && (e > 12 || 1 > e)) return !1; return !0 }, validateExpirationString: function (e) { return e = this.getMonthYearByFullExpiration(e), e && 2 == e.length ? this.validateExpiration(e[0], e[1]) : !1 }, validateFirstName: function (e) { return !(!e || 0 == e.length) }, validateLastName: function (e) { return !(!e || 0 == e.length) }, getMonthYearByFullExpiration: function (e) { return e ? (e = e.toString().split("/"), e && 2 == e.length ? [e[0], e[1]] : !1) : !1 }, getFirstLastNameByFullName: function (e) { return e ? (e = e.toString().split(" "), [e.shift(), e.join(" ")]) : !1 }, getBrandByCreditCardNumber: function (e) { e = e.replace(/[^0-9]/g, ""); for (var t in cards) if (cards.hasOwnProperty(t)) { cards[t]; if (cards[t].brand.test(e)) return utils.keyOf(cards, cards[t]) } return !1 }, keyOf: function (e, t) { for (var n in e) if (hasOwnProperty.call(e, n) && e[n] === t) return n; return null } }, { utils: utils, CreditCard: function (e, t, n, a, r, i) { e = e, e && (e = e.replace(/ +/g, ""), e = e.replace(/-+/g, "")), t = t, n = n; var o = new Date; return void 0 != n && 2 == n.length && (n = o.getFullYear().toString().substr(0, 2) + n), a = a, r = r, void 0 != a && (a = a.toUpperCase()), void 0 != r && (r = r.toUpperCase()), i = i, { errors: function () { return _errors = {}, e && utils.validateCreditCardNumber(e) || (_errors.number = "is_invalid"), i && utils.validateCVV(i, utils.getBrandByCreditCardNumber(e)) || (_errors.verification_value = "is_invalid"), t && n && utils.validateExpiration(t, n) || (_errors.expiration = "is_invalid"), a && utils.validateFirstName(a) || (_errors.first_name = "is_invalid"), r && utils.validateLastName(r) || (_errors.last_name = "is_invalid"), _errors }, valid: function () { return !(Object.keys(this.errors()).length > 0) }, brand: function () { return utils.getBrandByCreditCardNumber(e) }, toData: function () { return { number: e, verification_value: i, first_name: a, last_name: r, month: t, year: n, brand: this.brand() } } } }, createPaymentToken: function (t, r) { var r = r || function () { }; return err = utils.validateAccountID(o), err ? void alert(err) : (cc = !1, void 0 !== t.tagName && "FORM" == t.tagName.toUpperCase() ? (formData = e(t, d), expiration = this.utils.getMonthYearByFullExpiration(formData.expiration), cc = this.CreditCard(formData.number, expiration[0], expiration[1], formData.first_name, formData.last_name, formData.verification_value)) : void 0 !== t.toData ? cc = t : void 0 !== t.number && (cc = this.CreditCard(t.number, t.month, t.year, t.first_name, t.last_name, t.verification_value)), cc.valid() ? (cc_data = cc.toData(), cc_data.fingerprint = s.generate(), data = { method: "credit_card", data: cc_data }, 1 == u && (data.test = 1), void a(n() + "payment_token", { data: data, onSuccess: function (e) { void 0 == e.errors && 32 == e.id.length && (e.id = utils.formatUUID(e.id)), r(e) }, onTimeout: function () { r({ errors: { timeout: "operation_timeout" } }) } })) : r({ errors: cc.errors() })) }, setAccountID: function (e) { o = "string" == typeof e ? e.replace(/\-/g, "").toUpperCase() : e, this.setup() }, setTestMode: function (e) { u = !!e }, setup: function () { var e = !1; if ("undefined" != typeof Formatter && (e = !0), "undefined" == typeof this.initializedFields && (this.initializedFields = []), 0 != e) { inputs = document.getElementsByTagName("input"); for (var t = 0; t < inputs.length; t++)if (attr = inputs[t].getAttribute("data-iugu"), null != attr && -1 == this.initializedFields.indexOf(inputs[t])) if (this.initializedFields.push(inputs[t]), "number" == attr) { var n = inputs[t]; formatter = new Formatter(n, { pattern: "{{9999}} {{9999}} {{9999}} {{9999}}", persistent: !1 }), l.listen("keyup", n, function () { number = n.value.replace(/\ /g, ""), number = number.replace(/\-/g, ""), brand = utils.getBrandByCreditCardNumber(number), form = n.form, l.hasClass(form, brand) || (l.removeClass(form, "visa"), l.removeClass(form, "mastercard"), l.removeClass(form, "amex"), l.removeClass(form, "diners"), l.removeClass(form, "elo"), brand && (l.addClass(form, brand), "amex" == brand ? formatter.resetPattern("{{9999}} {{9999999}} {{99999}}") : "diners" == brand ? formatter.resetPattern("{{9999}} {{999999}} {{9999}}") : formatter.resetPattern("{{9999}} {{9999}} {{9999}} {{9999}}"))) }) } else "expiration" == attr ? new Formatter(inputs[t], { pattern: "{{99}}/{{99}}", persistent: !1 }) : "verification_value" == attr && new Formatter(inputs[t], { pattern: "{{9999}}", persistent: !1 }) } } } }(); dispatchOnLoad(function () { Iugu.setup() });
