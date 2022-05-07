/**
 * HashJs v1.7.5
 * Copyright (c) 2022 Irmmr
 * MIT License
 *
 * https://github.com/irmmr/hash.js [life]
 */

var Hash = (function () {
    'use strict';

    var empty_object   = Object.freeze({});

    var empty_func     = function () {};

    var and_symbol     = '&';
    var equ_symbol     = '=';
    var que_symbol     = '?';

    /**
     * (configs helper)
     * object check.
     *
     * @param   item
     * @returns {boolean}
     */
    var _isObj = function (item) { return (item && typeof item === 'object' && item.constructor === Object); };

    /**
     * (configs helper)
     * Deep merge two objects.
     *
     * @param   {object}    target
     * @param   {object}    source
     * @returns {object}
     */
    var _deepMerge = function (target, source) {
        var obj, obj$1;

        if (!_isObj(target) || !_isObj(source)) {
            return target;
        }

        for (var key in source) {
            if (_isObj(source[key])) {
                if (!target[key]) { Object.assign(target, ( obj = {}, obj[key] = {}, obj )); }

                _deepMerge(target[key], source[key]);
            } else {
                Object.assign(target, ( obj$1 = {}, obj$1[key] = source[key], obj$1 ));
            }
        }

        return target;
    };

    /**
     * HashConfig class.
     */
    var HashConfig = function HashConfig () {};

    HashConfig.defaults = function defaults () {
        return {
            getHashCallback: null,
            setHashCallback: null,
            getHashFilter: null,
            setHashFilter: null,
            getHrefCallback: null,
            // window default variable
            window: null,
            // log enable/disable
            log: true,
            // query symbols
            andSymbol: and_symbol,
            equSymbol: equ_symbol,
            queSymbol: que_symbol
        }
    };

    /**
     * Instance call with set options
     * @param   {object}    options
     * @returns {HashConfig}
     */
    HashConfig.instance = function instance (options) {
            if ( options === void 0 ) options = {};

        HashConfig.set(options);

        return HashConfig;
    };

    /**
     * Clear all configs
     */
    HashConfig.clear = function clear () {
        HashConfig.define(empty_object);
    };

    /**
     * Reset configs into defaults
     */
    HashConfig.reset = function reset () {
        HashConfig.define(HashConfig.defaults());
    };

    /**
     * Check for config
     *
     * @param   {string}name
     * @returns {boolean}
     */
    HashConfig.has = function has (name) {
        return typeof HashConfig.configs === 'object' && name in HashConfig.configs;
    };

    /**
     * Define config
     *
     * @param {object} options
     */
    HashConfig.define = function define (options) {
        if (typeof options !== 'object') {
            return;
        }

        HashConfig.configs = options;
    };

    /**
     * Set config
     * @param options
     */
    HashConfig.set = function set (options) {
        if (typeof options !== 'object') {
            return;
        }

        var configs = HashConfig.configs;
        HashConfig.define(Object.assign(configs, options));
    };

    /**
     * Get config
     *
     * @param   {string}name
     * @param   {*}     def
     * @returns {string|Readonly<{}>|*}
     */
    HashConfig.get = function get (name, def) {
            if ( name === void 0 ) name = null;
            if ( def === void 0 ) def = '';

        var configs = HashConfig.configs;

        if (null == name) {
            return configs;
        }

        var exp = name.toString().trim().split('.');
        var i;

        if (exp.length === 1) {
            if (HashConfig.has(name)) {
                return configs[name];
            }
        } else {
            var val = configs;
            var find= false;

            for (i in exp) {
                if (!exp.hasOwnProperty(i)) { continue; }

                if (typeof val[exp[i]] !== 'undefined') {
                    find= true;
                    val = val[exp[i]];
                } else {
                    find= false;
                    break;
                }
            }

            if (find) {
                return val;
            }
        }

        return def;
    };

    /**
     * Get config helpers.
     *
     * @returns {{isObj: (function(*)), deepMerge: (function(*, *): *)}}
     */
    HashConfig.h = {
        isObj: _isObj,
        deepMerge: _deepMerge
    };

    /**
     * Main config holder.
     *
     * @type {{andSymbol: string, log: boolean, setHashCallback: null, window: null, queSymbol: string, getHashFilter: null, setHashFilter: null, equSymbol: string, getHashCallback: null, getHrefCallback: null}}
     */
    HashConfig.configs = HashConfig.defaults();

    var HashComponent = function HashComponent () {};

    // Hash main information of library such as versions.
    var info = {
        name: 'HashJs',
        module: 'Hash',
        version : '1.7.5'
    };

    var message = {
        event_und: '"addEventListener" does not exist in the "window" that you defined',
        win_problem: 'The "window" you defined in configs has some problems'
    };

    /**
     * check if the variable is defined.
     * @param {*} h The input variable of check
     * @returns {boolean}
     */
    function isDef(h) {
        return typeof h !== 'undefined' && h !== null;
    }

    /**
     * check if variable is not defined.
     * @param {*} h The input variable of check
     * @returns
     */
    function isUnDef(h) {
        return typeof h === 'undefined' || h === null;
    }

    /**
     * check if the type of variable is string.
     * @param {*} h The input variable of check
     * @returns
     */
    function isString(h) {
        return typeof h === 'string';
    }

    /**
     * check if the type of variable is boolean
     * @param {*} h The input variable of check
     * @returns
     */
    function isBool(h) {
        return typeof h === 'boolean';
    }

    /**
     * Convert anything to boolean data type.
     * @param {string|boolean|number} h The input data
     * @returns
     */
    function getBool(h) {
        if (isBool(h)) {
            return h;
        }

        return (isString(h) && h.toLowerCase() === 'true') ||
            (isNum(h) && h === 1);
    }

    /**
     * check if the type of variable is object.
     * @param {*} h The input data
     * @returns
     */
    function isObj(h) {
        return h !== null && typeof h === 'object' && h.constructor === Object;
    }

    /**
     * check if the type of variable is function.
     * @param {*} h The input data
     * @returns
     */
    function isFunc(h) {
        return typeof h === 'function';
    }

    /**
     * replace all a to b in a string data.
     * @param {string} h The input string
     * @param {string} a Needle string
     * @param {string} b Replace with
     * @returns
     */
    function replaceAll(h, a, b) {
        return h.split(a).join(b);
    }

    /**
     * run a callback using argument is safe mode.
     * @param {function}  func Function name
     * @returns
     */
    function lunchFunc(func) {
        var args = Array.prototype.slice.call(arguments).slice(1);

        if (isFunc(func)) {
            var th = {func: func, args: args};
            return args.length !== 0 ? func.call(th, args) : func.call(th);
        }

        return null;
    }

    /**
     * check if the type of variable is number.
     * @param {*} h The input data
     * @returns
     */
    function isNum(h) {
        return h !== null && !isNaN(h) && typeof h === 'number';
    }

    /**
     * check if data is numeric.
     * @param {*} h The input data
     * @returns
     */
    function isNumeric(h) {
        return isDef(h) && !isNaN(Number(h));
    }

    /**
     * check if the value of variable is empty.
     * @param {*} h The input data
     * @returns
     */
    function isEmpty(h) {
        if (isUnDef(h)) {
            return true;
        } else if (isString(h)) {
            return h === '';
        } else if (isArr(h)) {
            return h.length === 0;
        } else if (isObj(h)) {
            return objSize(h) === 0;
        }

        return false;
    }

    /**
     * check if the value of variable is null.
     * @param {*} h The input data
     * @returns
     */
    function isNull(h) {
        return h == null;
    }

    /**
     * get the object length
     * @param {object} h The object
     * @returns The object length/size
     */
    function objSize(h) {
        if (!isDef(h) || !isObj(h)) {
            return 0;
        }

        return Object.entries(h).length || 0;
    }

    /**
     * split just one time in string.
     * @param {string} string The input string
     * @param {string} delim  The delim for split
     * @returns
     */
    function splitOnce(string, delim) {
        var components = string.split(delim);
        return [components.shift(), components.join(delim)];
    }

    /**
     * split just one time in string from end.
     * @param {string} string The input string
     * @param {string} delim  The delim for split
     * @returns
     */
    function splitOnceEnd(string, delim) {
        var components = string.split(delim);
        return [components.slice(0, components.length - 1).join(delim), components.pop()];
    }

    /**
     * check if the type of variable is array.
     * @param {*} h The input data
     * @returns
     */
    function isArr(h) {
        return isDef(h) && Array.isArray(h);
    }

    /**
     * convert data to string
     * @param {*} h
     * @returns
     */
    function getString(h) {
        return isString(h) ? h : h.toString();
    }

    /**
     * check if string is query
     * @param {string} q The input string
     * @returns
     */
    function isQuery(q) {
        if (!isString(q)) {
            return false;
        }

        return (new RegExp('.+(=|).*', 'g')).test(q);
    }

    /**
     * get all values and names of query.
     * @param {string} q The query string without "?"
     * @returns
     */
    function getQuery(q) {
        if (!isQuery(q) || isEmpty(q)) {
            return {};
        }

        var equalSymbol = HashConfig.get('equSymbol', equ_symbol);
        var andSymbol   = HashConfig.get('andSymbol', and_symbol);

        var queryParse  = q.split(andSymbol);
        var output      = {};

        queryParse.forEach(function (query, i) {
            if (isEmpty(query)) {
                return {};
            }

            var parse   = splitOnce(query, equalSymbol);
            var len     = query.split(equalSymbol).length;
            var name    = getString(parse[0]);

            if (isEmpty(name)) {
                return {};
            }

            if (len >= 2) {
                var value = getString(parse[1]);

                try {
                    value = decodeURIComponent(value);
                } catch (e) {}

                output[name] = value;
            } else {
                output[name] = null;
            }
        });

        return output;
    }

    /**
     * convert object to query string.
     * @param {object}  q           The query object
     * @param {boolean} encode_uri  Encode uri component status
     * @returns
     */
    function toQuery(q, encode_uri) {
        if ( encode_uri === void 0 ) encode_uri = false;

        q = filterQueEntry(q);

        if (isEmpty(q)) {
            return '';
        }

        var collector     = [];
        var equSymbol     = HashConfig.get('equSymbol', equ_symbol);
        var andSymbol     = HashConfig.get('andSymbol', and_symbol);

        objForeach(q, function (ref) {
            var name = ref[0];
            var value = ref[1];

            if (value === undefined) {
                return;
            }

            if (isNull(value)) {
                collector.push(name);
            } else {
                var dataString  = getString(value);
                var dataEncode  = encode_uri ? encodeURIComponent(dataString) : dataString;

                collector.push(name + equSymbol + dataEncode);
            }
        });

        return collector.join(andSymbol);
    }

    /**
     * get length of all "q" in "t".
     * @param {string} t The input string
     * @param {string} q The input char/string
     * @returns
     */
    function lenOfChar(t, q) {
        if (!isString(t) || !isString(q)) {
            return 0;
        }

        return !t.includes(q) ? 0 : t.split('').filter(function (i) { return i === q; }).length;
    }

    /**
     * validation a hash for query exists.
     * @param {string} q The hash string
     * @returns
     */
    function isTrueHash(q) {
        if (!isString(q) || isEmpty(q)) {
            return false;
        }

        var queSymbol = HashConfig.get('queSymbol', que_symbol);

        if (q.includes(queSymbol)) {
            var queryParse  = splitOnce(q, queSymbol);
            var query       = queryParse[1];

            return isEmpty(query) || isQuery(query);
        }

        return true;
    }

    /**
     * get hash value and query string.
     * @param {string} q The hash string
     * @returns
     */
    function getTrueHash(q) {
        if (!isString(q) || isEmpty(q)) {
            return ['', ''];
        }

        var empty = [q, ''];

        if (!isTrueHash(q)) {
            return empty;
        }

        var queSymbol = HashConfig.get('queSymbol', que_symbol);

        if (q.includes(queSymbol)) {
            return splitOnce(q, queSymbol);
        }

        return empty;
    }

    /**
     * get the value of window hash.
     * @returns
     */
    function getWinHash() {
        var hash        = '';
        var win         = getWindow();
        var getHash     = HashConfig.get('getHashCallback');

        if (isFunc(getHash)) {
            hash = lunchFunc(getHash);
        } else {
            try {
                hash = win.location.hash;
            } catch (e) {
                err([message.win_problem, e]);
            }
        }

        // convert to string
        hash = getString(hash);

        // apply filters
        var hashFilter = HashConfig.get('getHashFilter');

        if (isFunc(hashFilter)) {
            hash = lunchFunc(hashFilter, hash);
        }

        // convert again to string
        hash = getString(hash);

        return hash.startsWith('#') ? hash.slice(1) : hash;
    }

    /**
     * set the window hash.
     * @param {string} q Hash value
     */
    function setWinHash(q) {
        var setHash     = HashConfig.get('setHashCallback');
        var setFilter   = HashConfig.get('setHashFilter');
        var win         = getWindow();

        if (isFunc(setFilter)) {
            q = lunchFunc(setFilter, q);
        }

        q = getString(q);

        if (isFunc(setHash)) {
            lunchFunc(setHash, q);
        } else {
            try {
                win.location.hash = q;
            } catch (e) {
                err([message.win_problem, e]);
            }
        }
    }

    /**
     * create object of values.
     */
    function createObjVal(names, value) {
        if (isString(names) && !isEmpty(names)) {
            names = [names];
        }

        if (!isArr(names)) {
            return {};
        }

        // remove empty items
        names = names.filter(function (i) { return i !== ''; });

        if (isEmpty(names)) {
            return {};
        }

        var fetch = {};

        for (var i in names) {
            if (names.hasOwnProperty(i)) {
                fetch[names[i]] = value;
            }
        }

        return fetch;
    }

    /**
     * check if the parameter/argument is a valid query value type.
     * @param n The input value
     * @returns {*|boolean}
     */
    function isQueParOk(n) {
        return isString(n) || isNull(n) || n === undefined || isNum(n);
    }

    /**
     * get window location href.
     * @returns {*}
     */
    function getHref() {
        var href        = '';
        var win         = getWindow();
        var getHref     = HashConfig.get('getHrefCallback');

        if (isFunc(getHref)) {
            href = lunchFunc(getHref);
        } else {
            try {
                href = win.location.href;
            } catch (e) {
                err([message.win_problem, e]);
            }
        }

        // convert to string
        return getString(href);
    }

    /**
     * get window master.
     * @returns {Window|string|*}
     */
    function getWindow() {
        return HashConfig.get('window') || window;
    }

    /**
     * the default error handle.
     * @param messages    The message of error.
     * @param force_log   The force logger.
     */
    function err(messages, force_log) {
        if ( force_log === void 0 ) force_log = false;

        messages = toArray(messages);

        var message = messages.join(', ');

        if (force_log || HashConfig.get('log') === true) {
            throw new Error(("(" + (info.name) + ") " + message));
        }
    }

    /**
     * filter all queries.
     * @param queries
     * @returns {{}|[string, any][]}
     */
    function filterQueEntry(queries) {
        if (!isObj(queries)) {
            return {};
        }

        return objFilter(queries, function (q) {
            var key     = q[0];
            var value   = q[1];

            return isString(key) && !isEmpty(key) && isQueParOk(value);
        });
    }

    /**
     * get hash value as string
     * @param wh
     * @returns {*}
     */
    function getHashValue(wh) {
        return getTrueHash(wh)[0];
    }

    /**
     * get hash query as string
     * @param wh
     * @returns {*}
     */
    function getHashQuery(wh) {
        return getTrueHash(wh)[1];
    }

    /**
     * set multiple window hash.
     * @param options
     */
    function setEvHash(options) {
        if ( options === void 0 ) options = {};

        // value is first part of any hash: #value?...
        // in the first we should init value for set any hash
        var value       = '';

        // query is second part of hash: #...?query
        // this one should enter as a key:value object
        var query       = {};

        // get the current window hash as string
        var hash        = getWinHash();

        // trying to parse hash into 2 parts, value and query
        var parse       = getTrueHash(hash);

        // get first part of parsed hash as value
        var hashValue   = parse[0];

        // get first part of parsed hash as query and convert it to object
        var hashQuery   = getQuery(parse[1]);

        // get query symbol with configs
        var queSymbol = HashConfig.get('queSymbol', que_symbol);

        // checking for appending "value"
        // if it's defined replace it and else use old value
        if ('value' in options) {
            var val = options.value;
            value = getString(val);

            // encoding all query symbols with "URIComponent" to prevent parsing errors
            if (value.includes(queSymbol)) {
                value = replaceAll(value, queSymbol, encodeURIComponent(queSymbol));
            }
        } else {
            value = hashValue;
        }

        // check for appending "query"
        // if it's defined replace it and else use old query
        if ('query' in options) {
            var que     = options.query;
            var entry$1   = que.entry || {};
            var type    = que.type || 'merge';

            if (isObj(entry$1)) {
                entry$1   = filterQueEntry(entry$1);

                if (type === 'merge' && !isEmpty(entry$1)) {
                    query = Object.assign(hashQuery, entry$1);
                } else if (type === 'define') {
                    query = entry$1;
                }
            }
        } else {
            query = hashQuery;
        }

        // setting hash as string
        // it works as a standalone part
        if ('string' in options) {
            var str      = '';

            // old query and value
            var valueStr = parse[0];
            var queryStr = parse[1];

            if (typeof options.string.value !== 'undefined') {
                valueStr = options.string.value;
            }

            if (typeof options.string.query !== 'undefined') {
                queryStr = options.string.query;
            }

            str = valueStr;

            if (!isEmpty(queryStr)) {
                str += queSymbol + queryStr;
            }

            setWinHash(str);

            return;
        }

        var entry = value;

        if (!isEmpty(query)) {
            entry += queSymbol + toQuery(query);
        }

        setWinHash(entry);
    }

    /**
     * convert data to array.
     * @param data
     * @param filter
     * @returns {*[]|*[]}
     */
    function toArray(data, filter) {
        if ( filter === void 0 ) filter = true;

        data = isArr(data) ? data : [data];

        if (filter) {
            data = data.filter(function (d) { return !isEmpty(d); });
        }

        return data;
    }

    /**
     * object for each function.
     * @param obj
     * @param callback
     */
    function objForeach(obj, callback) {
        Object.entries(obj).forEach(callback);
    }

    /**
     * object filter action.
     * @param obj
     * @param callback
     * @returns {{[p: string]: unknown}|{}}
     */
    function objFilter(obj, callback) {
        return Object.fromEntries(Object.entries(obj).filter(callback));
    }

    /**
     * object map action.
     * @param obj
     * @param callback
     * @returns {{}|{[p: string]: any}}
     */
    function objMap(obj, callback) {
        var fetch = {};

        if (!isFunc(callback)) {
            return obj;
        }

        for (var k in obj) {
            var key         = k;
            var value       = obj[key];
            var collect     = callback(k, value);

            if (isArr(collect) && collect.length === 2) {
                key = collect[0];
                value = collect[1];
            }

            fetch[key] = value;
        }

        return fetch;
    }

    /**
     * parse key-value string of options.
     * you must enter escaped '%2C' instead of ',' for entry data.
     * @param {string} data
     * @param {boolean} multiple
     * @returns {{}}
     */
    function parseKv(data, multiple) {
        if ( multiple === void 0 ) multiple = true;

        if (!isString(data)) {
            return {};
        }

        data        = data.trim();
        var loop    = multiple ? data.split(',') : [data];
        var fetch   = {};

        loop.forEach(function (i) {
            var parse   = splitOnce(i.trim(), ':');
            var key     = decodeURIComponent(parse[0]);
            var value   = decodeURIComponent(parse[1]);

            if (!isEmpty(key)) {
                fetch[key] = value;
            }
        });

        return fetch;
    }

    /**
     * insert string data.
     * @param data
     * @param index
     * @param insert
     * @returns {string|*}
     */
    function insertStr(data, insert, index) {
        if (!isString(data)) {
            return data;
        }

        if (isString(index)) {
            index = index.trim();

            if (index === '-') {
                index = data.length;
            }

            index = Number(index);
        }

        if (!isNum(index)) {
            return data;
        }

        if (index < 0) {
            index = data.length + index;
        }

        if (index > 0) {
            return data.substring(0, index) + insert + data.substring(index);
        }

        return insert + data;
    }

    /**
     * Convert key->value data to object for queries
     * objective data.
     * @param data
     * @param value
     * @returns {object|false}
     */
    function toObjQue(data, value) {
        if (isObj(data)) {
            return data;
        }

        if (isString(data) && isQueParOk(value) && !isEmpty(data)) {
            var obj   = {};
            obj[data] = value;

            return obj;
        }

        return false;
    }

    /**
     * Get hash-value from url address.
     * @param url
     * @returns {string}
     */
    function getUrlHash(url) {
        return splitOnce(url, '#')[1] || '';
    }

    /**
     * Check for data if instanceof RegExp.
     * @param data
     * @returns {boolean}
     */
    function isRegExp(data) {
        return data instanceof RegExp;
    }

    var h = /*#__PURE__*/Object.freeze({
        __proto__: null,
        isDef: isDef,
        isUnDef: isUnDef,
        isString: isString,
        isBool: isBool,
        getBool: getBool,
        isObj: isObj,
        isFunc: isFunc,
        replaceAll: replaceAll,
        lunchFunc: lunchFunc,
        isNum: isNum,
        isNumeric: isNumeric,
        isEmpty: isEmpty,
        isNull: isNull,
        objSize: objSize,
        splitOnce: splitOnce,
        splitOnceEnd: splitOnceEnd,
        isArr: isArr,
        getString: getString,
        isQuery: isQuery,
        getQuery: getQuery,
        toQuery: toQuery,
        lenOfChar: lenOfChar,
        isTrueHash: isTrueHash,
        getTrueHash: getTrueHash,
        getWinHash: getWinHash,
        setWinHash: setWinHash,
        createObjVal: createObjVal,
        isQueParOk: isQueParOk,
        getHref: getHref,
        getWindow: getWindow,
        err: err,
        filterQueEntry: filterQueEntry,
        getHashValue: getHashValue,
        getHashQuery: getHashQuery,
        setEvHash: setEvHash,
        toArray: toArray,
        objForeach: objForeach,
        objFilter: objFilter,
        objMap: objMap,
        parseKv: parseKv,
        insertStr: insertStr,
        toObjQue: toObjQue,
        getUrlHash: getUrlHash,
        isRegExp: isRegExp
    });

    // All direct components are deprecated!!


    /* Add functions */

    /**
     * add a value to location hash.
     * @deprecated Deprecated in `v1.7.4`, Please use `.value|v.add()` instead.
     * @param {string} n
     * @returns boolean
     */
    HashComponent.addValue = function (n) {
        if ( n === void 0 ) n = '';

        if (!isString(n) || isEmpty(n)) {
            return false
        }

        if (n.includes('?')) {
            n = replaceAll(n, '?', encodeURIComponent('?'));
        }

        var wh      = getWinHash(),
            hash    = getTrueHash(wh),
            hsh_val = hash[0],
            hsh_que = hash[1];

        if (!isEmpty(hsh_val)) {
            n = hsh_val + n;
        }

        if (!isEmpty(hsh_que)) {
            n += '?' + hsh_que;
        }

        setWinHash(n);

        return true
    };

    /**
     * add a query to location hash.
     * @deprecated Deprecated in `v1.7.4`, Please use `.query|q.add()` instead.
     * @param {*} n
     * @returns boolean
     */
    HashComponent.addQuery = function (n) {
        if ( n === void 0 ) n = {};

        if (!isObj(n) || n.length === 0) {
            return false
        }

        var wh      = getWinHash(),
            hash    = getTrueHash(wh),
            hsh_val = hash[0],
            hsh_que = hash[1],
            vl      = '';

        if (!isEmpty(hsh_que)) {
            var oq  = getQuery(hsh_que);
            n       = Object.assign(oq, n);
        }

        if (!isEmpty(hsh_val)) {
            vl += hsh_val;
        }

        vl += '?' + toQuery(n);
        setWinHash(vl);

        return true
    };

    /* Clear functions */

    /**
     * clear hash value from location hash.
     * @deprecated Deprecated in `v1.7.4`, Please use `.value|v.clear()` instead.
     * @returns boolean
     */
    HashComponent.clearValue = function () {
        var wh = getWinHash();

        if (isEmpty(wh)) {
            return true
        }

        if (!isTrueHash(wh)) {
            return false
        }

        var wg = getTrueHash(wh),
            wv = wg[0],
            wq = wg[1];

        if (isEmpty(wv)) {
            return true
        }

        setWinHash(isEmpty(wq) ? '' : '?' + wq);
        return true
    };

    /**
     * clear hash query from location hash.
     * @deprecated Deprecated in `v1.7.4`, Please use `.query|q.clear()` instead.
     * @returns boolean
     */
    HashComponent.clearQuery = function () {
        var wh = getWinHash();

        if (isEmpty(wh)) {
            return true
        }

        if (!isTrueHash(wh)) {
            return false
        }

        var wg = getTrueHash(wh),
            wv = wg[0],
            wq = wg[1];

        if (isEmpty(wq)) {
            return true
        }

        setWinHash(wv);
        return true
    };

    /* Get functions */

    /**
     * get location hash value.
     * @deprecated Deprecated in `v1.7.4`, Please use `.value|v.get()` instead.
     * @returns string
     */
    HashComponent.getValue = function () {
        var wh = getWinHash();
        return isEmpty(wh) ? '' : getTrueHash(wh)[0]
    };

    /**
     * get the location hash query.
     * @deprecated Deprecated in `v1.7.4`, Please use `.query|q.get()` instead.
     * @param {string|array} n
     * @returns object
     */
    HashComponent.getQuery = function (n) {
        if ( n === void 0 ) n = [];

        if (isString(n)) {
            n = [n];
        }

        if (!isArr(n)) {
            return {}
        }

        n       = n.filter(function (i) { return i !== ''; });
        var emp = n.length === 1 ? undefined : createObjVal(n, undefined),
            wh  = getWinHash();

        if (isEmpty(wh)) {
            return emp
        }

        var hsh_que = getTrueHash(wh)[1];

        if (isEmpty(hsh_que) || !isQuery(hsh_que)) {
            return emp
        }

        var que = getQuery(hsh_que);

        if (n.length === 1) {
            return que.hasOwnProperty(n[0]) ? que[n[0]] : emp
        } else if (n.length !== 0) {
            var ans = {}, i;

            for (i in n) {
                if (n.hasOwnProperty(i)) {
                    var v  = n[i];
                    ans[v] = que.hasOwnProperty(v) ? que[v] : undefined;
                }
            }

            return ans
        }

        return que
    };

    /* Have functions */

    /**
     * check for location hash value.
     * @deprecated Deprecated in `v1.7.4`, Please use `.value|v.have()` instead.
     * @param {string|array} n
     * @returns boolean
     */
    HashComponent.haveValue = function (n) {
        if ( n === void 0 ) n = '';

        if (isString(n)) {
            n = [n];
        }

        if (!isArr(n)) {
            return false
        }

        var wv = HashComponent.getValue();
        n      = n.filter(function (i) { return i !== ''; });

        if (isEmpty(n)) {
            return !isEmpty(wv)
        }

        for (var i in n) {
            if (!n.hasOwnProperty(i)) { continue }

            if (!wv.includes(n[i])) {
                return false
            }
        }

        return true
    };

    /**
     * checking for query exists on location hash.
     * @deprecated Deprecated in `v1.7.4`, Please use `.query|q.have()` instead.
     * @param {string|array} n
     * @retuens boolean
     */
    HashComponent.haveQuery = function (n) {
        if ( n === void 0 ) n = [];

        if (isString(n)) {
            n = [n];
        }

        if (!isArr(n)) {
            return false
        }

        var wh = getWinHash(),
            wq = getTrueHash(wh)[1];

        if (n.length === 0) {
            return !isEmpty(wq)
        }

        if (!isQuery(wq)) {
            return false
        }

        var que = getQuery(wq), i;

        for (i in n) {
            if (!n.hasOwnProperty(i)) { continue }
            if (!que.hasOwnProperty(n[i])) {
                return false
            }
        }

        return true
    };

    /* Is functions */

    /**
     * checking for value string in location hash.
     * @deprecated Deprecated in `v1.7.4`, Please use `.value|v.is()` instead.
     * @param {string} n
     * @return boolean
     */
    HashComponent.isValue = function (n) {
        return isString(n) && HashComponent.getValue() === n
    };

    /**
     * check for query value in location hash.
     * @deprecated Deprecated in `v1.7.4`, Please use `.query|q.is()` instead.
     * @param {string} n
     * @param {string|null|number|undefined} e
     * @returns boolean
     */
    HashComponent.isQuery = function (n, e) {
        if (!isString(n) || isEmpty(n) || !isQueParOk(e)) {
            return false
        }

        return HashComponent.getQuery(n) === e
    };

    /* Update functions */

    /**
     * update a query value in location hash.
     * @deprecated Deprecated in `v1.7.4`, Please use `.query|q.update()` instead.
     * @param {string} n
     * @param {string|null|number} e
     * @returns boolean
     */
    HashComponent.updateQuery = function (n, e) {
        if (!isString(n) || isEmpty(n) || !isQueParOk(e)) {
            return false
        }

        if (e === undefined) {
            return false
        }

        var wh      = getWinHash(),
            hash    = getTrueHash(wh),
            hsh_val = hash[0],
            hsh_que = hash[1],
            vl      = '',
            cl      = {},
            ch      = 0;

        if (isEmpty(hsh_que)) {
            return false
        }

        if (!isEmpty(hsh_val)) {
            vl += hsh_val;
        }

        var que = getQuery(hsh_que), i;

        for (i in que) {
            if (!que.hasOwnProperty(i)) {
                continue
            }
            if (i === n) {
                cl[i] = e;
                ch ++;
            } else {
                cl[i] = que[i];
            }
        }

        vl += '?' + toQuery(cl);
        setWinHash(vl);
        return ch !== 0
    };

    /* Remove functions */

    /**
     * remove a value from location hash.
     * @deprecated Deprecated in `v1.7.4`, Please use `.value|v.remove()` instead.
     * @param {string|array} n The words list
     * @returns boolean
     */
    HashComponent.removeValue = function (n) {
        if ( n === void 0 ) n = [];

        if (isString(n) && !isEmpty(n)) {
            n = [n];
        }

        if (!isArr(n) || n.length === 0) {
            return false
        }

        var wh      = getWinHash(),
            hash    = getTrueHash(wh),
            hsh_val = hash[0],
            hsh_que = hash[1],
            vt      = '';

        if (isEmpty(wh) || isEmpty(hsh_val)) {
            return false
        }

        for (var i in n) {
            if (!n.hasOwnProperty(i)) { continue }

            var vl = n[i];
            if (hsh_val.includes(vl)) {
                hsh_val = replaceAll(hsh_val, vl, '');
            }
        }

        vt += hsh_val;

        if (!isEmpty(hsh_que)) {
            vt += '?' + hsh_que;
        }

        setWinHash(vt);
        return true
    };

    /**
     * remove a query from location hash.
     * @deprecated Deprecated in `v1.7.4`, Please use `.query|q.remove()` instead.
     * @param {string|array} n
     * @returns boolean
     */
    HashComponent.removeQuery = function (n) {
        if ( n === void 0 ) n = [];

        if (isString(n) && !isEmpty(n)) {
            n = [n];
        }

        if (!isArr(n) || n.length === 0) {
            return false
        }

        var wh      = getWinHash(),
            hash    = getTrueHash(wh),
            hsh_val = hash[0],
            hsh_que = hash[1],
            vt      = '',
            cl      = {};

        if (isEmpty(wh) || isEmpty(hsh_que)) {
            return false;
        }

        var que = getQuery(hsh_que), i;

        for (i in que) {
            if (!que.hasOwnProperty(i)) { continue }

            if (!n.includes(i)) {
                cl[i] = que[i];
            }
        }

        if (!isEmpty(hsh_val)) {
            vt += hsh_val;
        }

        if (objSize(cl) !== 0) {
            vt += '?' + toQuery(cl);
        }

        setWinHash(vt);
        return true
    };

    /* Set functions */

    /**
     * set a value to location hash.
     * @deprecated Deprecated in `v1.7.4`, Please use `.value|v.set()` instead.
     * @param {string} n
     * @returns boolean
     */
    HashComponent.setValue = function (n) {
        if ( n === void 0 ) n = '';

        if (!isString(n) || isEmpty(n)) {
            return false
        }

        if (n.includes('?')) {
            n = replaceAll(n, '?', encodeURIComponent('?'));
        }

        var wh      = getWinHash(),
            hsh_que = getTrueHash(wh)[1];

        if (isEmpty(wh) || isEmpty(hsh_que)) {
            setWinHash(n);
            return true
        }

        setWinHash(n + '?' + hsh_que);
        return true
    };

    /**
     * set a query to location hash.
     * @deprecated Deprecated in `v1.7.4`, Please use `.query|q.set()` instead.
     * @param {object} n
     * @returns boolean
     */
    HashComponent.setQuery = function (n) {
        if ( n === void 0 ) n = {};

        if (!isObj(n) || n.length === 0) {
            return false
        }
        var wh   = getWinHash(),
            hash = getTrueHash(wh)[0],
            aq   = toQuery(n);

        if (isEmpty(wh) || isEmpty(hash)) {
            setWinHash('?' + aq);
            return true
        }

        setWinHash(hash + '?' + aq);
        return true
    };

    /**
     * add a string to location hash.
     *
     * @param   {string}        value       entry value to add
     * @param   {object|string} options     adding options
     * @returns HashComponent
     */
    HashComponent.add = function (value, options) {
        if ( options === void 0 ) options = {
        position: 'after',
        multiple: false
    };

        var cp = HashComponent;

        if (!isString(value) || isEmpty(value)) {
            return cp;
        }

        var hash        = getWinHash();
        var entry       = '';

        // parse position options
        if (isString(options)) {
            options = {position: options};
        }

        var position = options.position || 'after';
        var multiple = getBool(options.multiple || false);

        if (isEmpty(position) || !isString(position)) {
            position = 'after';
        }

        var parsePosition = parseKv(position, false);

        if ('after' in parsePosition) {
            var posAfter = parsePosition.after;

            if (isEmpty(posAfter)) {
                entry = hash + value;
            } else {
                if (multiple) {
                    entry = replaceAll(hash, posAfter, posAfter + value);
                } else {
                    entry = hash.replace(posAfter, posAfter + value);
                }
            }
        } else if ('before' in parsePosition) {
            var posBefore = parsePosition.before;

            if (isEmpty(posBefore)) {
                entry = value + hash;
            } else {
                if (multiple) {
                    entry = replaceAll(hash, posBefore, value + posBefore);
                } else {
                    entry = hash.replace(posBefore, value + posBefore);
                }
            }
        } else if ('index' in parsePosition) {
            entry = insertStr(hash, value, parsePosition.index);
        }

        if (!isEmpty(entry)) {
            setWinHash(entry);
        }

        return cp;
    };

    /**
     * clear the page hash.
     *
     * @param   {boolean}   push_state  remove '#' from hash or no?
     * @returns HashComponent
     */
    HashComponent.clear = function (push_state) {
        if ( push_state === void 0 ) push_state = true;

        var cp = HashComponent;

        if (push_state === true) {
            history.pushState(null, null, splitOnce(getHref(), '#')[0]);
        } else {
            if (cp.have()) {
                setWinHash('');
            }
        }

        return cp;
    };

    /**
     * an easy way to get location hash.
     * @returns string
     */
    HashComponent.get = function () {
        return getWinHash();
    };

    /**
     * check or searching for a string in hash.
     *
     * @param {string|array}    data    word(s)/string(s) to check in hash string
     * @returns boolean
     */
    HashComponent.have = function (data) {
        if ( data === void 0 ) data = '';

        data = toArray(data);

        if (!isArr(data)) {
            return false;
        }

        var hash    = getWinHash();

        if (isEmpty(data)) {
            return !isEmpty(hash);
        }

        for (var i in data) {
            if (!data.hasOwnProperty(i) || !hash.includes(data[i])) {
                return false;
            }
        }

        return true;
    };

    /**
     * checking with equals in location hash.
     * @param   {string}    data
     * @returns boolean
     */
    HashComponent.is = function (data) {
        return isString(data) && getWinHash() === data;
    };

    // defined as 2 global variable in this section
    // to save "locked" and "force_lock" status
    var locked     = false;
    var force_lock = false;

    /**
     * check if hash is locked.
     *
     * @returns boolean
     */
    HashComponent.isLocked = function () {
        return locked;
    };

    /**
     * unlock location's hash.
     * @returns HashComponent
     */
    HashComponent.unlock = function () {
        if (locked && !force_lock) {
            locked = false;
        }

        return HashComponent;
    };

    /**
     * Lock the page hash.
     *
     * @param {object} options
     * @returns HashComponent
     */
    HashComponent.lock = function (options) {
        if ( options === void 0 ) options = {};

        var cp = HashComponent;

        if (locked || !isObj(options)) {
            return cp;
        }

        force_lock      = getBool(options.force || false);
        var hash      = getWinHash();
        var win       = getWindow();

        if (typeof win.onhashchange !== 'undefined') {
            win.onhashchange = function () {
                if (locked) {
                    setWinHash(hash);
                }
            };

            locked = true;
        }

        return cp;
    };

    /**
     * remove a string from location hash.
     * @param {string|array} values The words/chars list
     * @returns HashComponent
     */
    HashComponent.remove = function (values) {
        if ( values === void 0 ) values = [];

        var cp = HashComponent;

        values = toArray(values);

        if (isEmpty(values)) {
            return cp;
        }

        var hash      = getWinHash();
        var entry     = hash;

        if (isEmpty(hash)) {
            return cp;
        }

        values.forEach(function (val) {
            if (isString(val)) {
                if (entry.includes(val)) {
                    entry = replaceAll(entry, val, '');
                }
            } else if (isRegExp(val)) {
                entry = entry.replace(val, '');
            }
        });

        if (entry !== hash) {
            setWinHash(entry);
        }

        return cp;
    };

    /**
     * set the page hash.
     * @param {string} value
     * @returns HashComponent
     */
    HashComponent.set = function (value) {
        if ( value === void 0 ) value = '';

        var cp = HashComponent;

        if (!isString(value)) {
            return cp;
        }

        setWinHash(value);

        return cp;
    };

    /**
     * replace hash string.
     * @param {string|RegExp} from
     * @param {string} to
     * @returns HashComponent
     */
    HashComponent.replace = function (from, to) {
        var cp = HashComponent;

        if (!isString(to) || (!isString(from) && !isRegExp(from))) {
            return cp;
        }

        setWinHash(getWinHash().replace(from, to));

        return cp;
    };

    /**
     * Hash Event component.
     *
     * @param {string}      listener    The listener(s)
     * @param {function}    callback    The function/callback
     * @returns HashComponent
     */
    HashComponent.event = HashComponent.on = function (listener, callback) {
        if ( callback === void 0 ) callback = empty_func;

        var cp = HashComponent;

        if (!isString(listener)) {
            return cp;
        }

        var listeners   = replaceAll(listener, ',', ' ');
        var win         = getWindow();

        callback    = isFunc(callback) ? callback : empty_func;

        // check addEventListener based on window
        if (typeof win.addEventListener === 'undefined') {
            err(message.event_und);

            return cp;
        }

        var events  = listeners.split(' ').filter(function (e) { return !isEmpty(e); });
        var fetch   = [];

        // instead of [...new Set(array)]
        events.forEach(function (i) {
            if (!fetch.includes(i)) {
                fetch.push(i);
            }
        });

        fetch.forEach(function (name) {
            switch (name) {
                case 'change':
                    win.addEventListener('hashchange', function (e) {
                        var newHash = getUrlHash(e.newURL || '');
                        var oldHash = getUrlHash(e.oldURL || '');

                        lunchFunc(callback, e, {oldHash: oldHash, newHash: newHash});
                    });

                    break;

                case 'load':
                    win.addEventListener('load', callback);

                    break;

                case 'ready':
                    lunchFunc(callback);

                    break;
            }
        });

        return cp;
    };

    /**
     * Hash Info component.
     * @returns
     */
    HashComponent.info = function () {
        return {
            version : info.version ,
            name: info.name ,
            module: info.module 
        }
    };

    var HashCpQuery = function HashCpQuery () {};
    var HashCpQueryStr = function HashCpQueryStr () {};

    var HashCpValue = function HashCpValue () {};

    /**
     * add a string to value.
     * @param {string} value
     * @param {object|string} options
     * @returns HashCpValue
     */
    HashCpValue.add = function (value, options) {
        if ( options === void 0 ) options = {
        position: 'after',
        multiple: false
    };

        var cp = HashCpValue;

        if (!isString(value) || isEmpty(value)) {
            return cp;
        }

        var hash        = getWinHash();
        var hashValue   = getHashValue(hash);
        var entry       = '';

        // parse position options
        if (isString(options)) {
            options = {position: options};
        }

        var position = options.position || 'after';
        var multiple = getBool(options.multiple || false);

        if (isEmpty(position) || !isString(position)) {
            position = 'after';
        }

        var posParse = parseKv(position, false);

        if ('after' in posParse) {
            var posAfter = posParse.after;

            if (isEmpty(posAfter)) {
                entry = hashValue + value;
            } else {
                if (multiple) {
                    entry = replaceAll(hashValue, posAfter, posAfter + value);
                } else {
                    entry = hashValue.replace(posAfter, posAfter + value);
                }
            }
        } else if ('before' in posParse) {
            var posBefore = posParse.before;

            if (isEmpty(posBefore)) {
                entry = value + hashValue;
            } else {
                if (multiple) {
                    entry = replaceAll(hashValue, posBefore, value + posBefore);
                } else {
                    entry = hashValue.replace(posBefore, value + posBefore);
                }
            }
        } else if ('index' in posParse) {
            entry = insertStr(hashValue, value, posParse.index);
        }

        if (!isEmpty(entry)) {
            setEvHash({
                value: entry
            });
        }

        return cp;
    };

    /**
     * clear value from hash.
     * @returns HashCpValue
     */
    HashCpValue.clear = function () {
        var cp = HashCpValue;

        if (cp.have()) {
            setEvHash({
                value: ''
            });
        }

        return cp;
    };

    /**
     * get value.
     * @returns HashCpValue
     */
    HashCpValue.get = function () {
        return getHashValue(getWinHash());
    };

    /**
     * check for location hash value.
     * @param data
     * @returns boolean
     */
    HashCpValue.have = function (data) {
        if ( data === void 0 ) data = '';

        data = toArray(data);

        if (!isArr(data)) {
            return false;
        }

        var hashValue = HashCpValue.get();

        if (isEmpty(data)) {
            return !isEmpty(hashValue);
        }

        for (var i in data) {
            if (!data.hasOwnProperty(i)) { continue; }

            if (!hashValue.includes(data[i])) {
                return false;
            }
        }

        return true;
    };

    /**
     * checking for value string in location hash.
     * @return boolean
     * @param data
     */
    HashCpValue.is = function (data) {
        return isString(data) && HashCpValue.get() === data;
    };

    /**
     * set value
     * @param value
     * @returns HashCpValue
     */
    HashCpValue.set = function (value) {
        var cp = HashCpValue;

        if (!isString(value)) {
            return cp;
        }

        setEvHash({
            value: value
        });

        return cp;
    };

    /**
     * replace hash value string.
     * @param {string|RegExp} from
     * @param {string} to
     * @returns HashCpValue
     */
    HashCpValue.replace = function (from, to) {
        var cp = HashCpValue;

        if (!isString(to) || (!isString(from) && !isRegExp(from))) {
            return cp;
        }

        var hash        = getWinHash();
        var hashValue   = getHashValue(hash);

        if (isEmpty(hashValue)) {
            return cp;
        }

        setEvHash({
            string: {
                value: hashValue.replace(from, to)
            }
        });

        return cp;
    };

    /**
     * remove some parts of value as string.
     * @param {string|array} values The words/chars list
     * @returns HashCpValue
     */
    HashCpValue.remove = function (values) {
        if ( values === void 0 ) values = [];

        var cp = HashCpValue;

        values = toArray(values);

        if (isEmpty(values)) {
            return cp;
        }

        var hash        = getWinHash();
        var hashValue   = getHashValue(hash);
        var entry       = hashValue;

        if (isEmpty(hashValue)) {
            return cp;
        }

        values.forEach(function (value) {
            if (isString(value)) {
                if (entry.includes(value)) {
                    entry = replaceAll(entry, value, '');
                }
            } else if (isRegExp(value)) {
                entry = entry.replace(value, '');
            }
        });

        if (entry !== hashValue) {
            setEvHash({
                value: entry
            });
        }

        return cp;
    };

    /**
     * Value components
     *
     * @type {HashCpValue}
     */
    HashComponent.value = HashComponent.v = HashCpValue;

    /**
     * add query.
     * @param {object|string} data
     * @param {string|number|null|undefined} value
     * @returns HashCpQuery
     */
    HashCpQuery.add = function (data, value) {
        if ( value === void 0 ) value = null;

        var cp  = HashCpQuery;

        data = toObjQue(data, value);

        if (!data || !isObj(data)) {
            return cp;
        }

        var query = cp.get();

        if (!isEmpty(query)) {
            data = objFilter(data, function (ref) {
                var name = ref[0];
                ref[1];

                return !query.hasOwnProperty(name);
            });
        }

        if (isEmpty(data)) {
            return cp;
        }

        setEvHash({
            query: {
                entry: Object.assign(query, data)
            }
        });

        return cp;
    };

    /**
     * clear query from hash.
     * @returns HashCpQuery
     */
    HashCpQuery.clear = function () {
        var cp = HashCpQuery;

        var hash        = getWinHash();
        var hashValue   = getHashValue(hash);

        if (!cp.have()) {
            return cp;
        }

        if (!isEmpty(hashValue)) {
            setWinHash(hashValue);
        } else {
            setWinHash('');
        }

        return cp;
    };

    /**
     * set query.
     * @param data
     * @returns {HashCpQuery}
     */
    HashCpQuery.define = function (data) {
        var cp    = HashCpQuery;

        if (!isObj(data)) {
            return cp;
        }

        setEvHash({
            query: {
                entry: data,
                type: 'define'
            }
        });

        return cp;
    };

    /**
     * get the location hash query.
     * @param {string|array} queries
     * @returns object
     */
    HashCpQuery.get = function (queries) {
        if ( queries === void 0 ) queries = [];

        queries = toArray(queries);

        if (!isArr(queries)) {
            return {};
        }

        var empty   = queries.length === 1 ? undefined : createObjVal(queries, undefined);
        var hash    = getWinHash();

        if (isEmpty(hash)) {
            return empty;
        }

        var hashQuery = getHashQuery(hash);

        if (isEmpty(hashQuery) || !isQuery(hashQuery)) {
            return empty;
        }

        var query   = getQuery(hashQuery);
        var len     = queries.length;

        if (len === 0) {
            return query;
        }

        if (len === 1) {
            var firstQuery = queries[0];
            return query.hasOwnProperty(firstQuery) ? query[firstQuery] : empty;
        }

        var fetch = {};

        for (var i in queries) {
            if (queries.hasOwnProperty(i)) {
                var value  = queries[i];
                fetch[value] = query.hasOwnProperty(value) ? query[value] : undefined;
            }
        }

        return fetch;
    };

    /**
     * check for location hash query.
     * @param data
     * @returns boolean
     */
    HashCpQuery.have = function (data) {
        if ( data === void 0 ) data = '';

        data = toArray(data);

        if (!isArr(data)) {
            return false;
        }

        var query  = HashCpQuery.get();

        if (isEmpty(data)) {
            return !isEmpty(query);
        }

        for (var i in data) {
            if (!data.hasOwnProperty(i) || !query.hasOwnProperty(data[i])) {
                return false;
            }
        }

        return true;
    };

    /**
     * checking for query in location hash.
     * @return boolean
     * @param name
     * @param value
     */
    HashCpQuery.is = function (name, value) {
        return isString(name) && HashCpQuery.get(name) === value;
    };

    /**
     * set query.
     * @param data
     * @param value
     * @returns {HashCpQuery}
     */
    HashCpQuery.set = function (data, value) {
        if ( value === void 0 ) value = null;

        var cp = HashCpQuery;

        data = toObjQue(data, value);

        if (!data || !isObj(data)) {
            return cp;
        }

        setEvHash({
            query: {
                entry: data
            }
        });

        return cp;
    };

    /**
     * update query.
     * @param data
     * @param value
     * @returns {HashCpQuery}
     */
    HashCpQuery.update = function (data, value) {
        if ( value === void 0 ) value = null;

        var cp = HashCpQuery;

        data = toObjQue(data, value);

        if (!data || !isObj(data) || !cp.have()) {
            return cp;
        }

        data = objFilter(data, function (d) {
            var name    = d[0];
            var value   = d[1];

            return value !== undefined && cp.have(name);
        });

        return isEmpty(data) ? cp : cp.set(data);
    };

    /**
     * remove some parts of hash query.
     * @param {string|array} name The queries|query name(s).
     * @returns HashCpValue
     */
    HashCpQuery.remove = function (name) {
        if ( name === void 0 ) name = [];

        var cp = HashCpQuery;

        name = toArray(name);

        if (isEmpty(name)) {
            return cp;
        }

        var query   = cp.get();
        var entry   = query;

        if (isEmpty(query)) {
            return cp;
        }

        entry = objFilter(entry, function (ref) {
            var key = ref[0];
            ref[1];

            return !name.includes(key);
        });

        if (query !== entry) {
            cp.define(entry);
        }

        return cp;
    };

    /**
     * set query string.
     * @param string
     * @returns {HashCpQueryStr}
     */
    HashCpQueryStr.set = function (string) {
        var cp = HashCpQueryStr;

        if (!isString(string)) {
            return cp;
        }

        setEvHash({
            string: {
                query: string
            }
        });

        return cp;
    };

    /**
     * get query string.
     * @returns HashCpQueryStr
     */
    HashCpQueryStr.get = function () {
        return getHashQuery(getWinHash());
    };

    /**
     * check for location hash query string.
     * @param data
     * @returns boolean
     */
    HashCpQueryStr.have = function (data) {
        if ( data === void 0 ) data = '';

        data = toArray(data);

        if (!isArr(data)) {
            return false;
        }

        var queryStr = HashCpQueryStr.get();

        if (isEmpty(data)) {
            return !isEmpty(queryStr);
        }

        for (var i in data) {
            if (!data.hasOwnProperty(i)) { continue; }

            if (!queryStr.includes(data[i])) {
                return false;
            }
        }

        return true;
    };

    /**
     * checking for query string in location hash.
     * @return boolean
     * @param data
     */
    HashCpQueryStr.is = function (data) {
        return isString(data) && HashCpQueryStr.get() === data;
    };

    /**
     * replace hash query string.
     * @param {string|RegExp} from
     * @param {string} to
     * @returns HashCpQueryStr
     */
    HashCpQueryStr.replace = function (from, to) {
        var cp = HashCpQueryStr;

        if (!isString(to) || (!isString(from) && !isRegExp(from))) {
            return cp;
        }

        var hash        = getWinHash();
        var hashQuery   = getHashQuery(hash);

        if (isEmpty(hashQuery)) {
            return cp;
        }

        setEvHash({
            string: {
                query: hashQuery.replace(from, to)
            }
        });

        return cp;
    };

    /**
     * remove some parts of query as string.
     * @param {string|array} values The words/chars list
     * @returns HashCpQueryStr
     */
    HashCpQueryStr.remove = function (values) {
        if ( values === void 0 ) values = [];

        var cp = HashCpQueryStr;

        values = toArray(values);

        if (isEmpty(values)) {
            return cp;
        }

        var hash        = getWinHash();
        var hashQuery   = getHashQuery(hash);
        var entry       = hashQuery;

        if (isEmpty(hashQuery)) {
            return cp;
        }

        values.forEach(function (value) {
            if (isString(value)) {
                if (entry.includes(value)) {
                    entry = replaceAll(entry, value, '');
                }
            } else if (isRegExp(value)) {
                entry = entry.replace(value, '');
            }
        });

        if (entry !== hashQuery) {
            setEvHash({
                string: {
                    query: entry
                }
            });
        }

        return cp;
    };

    /**
     * add a string to query as string.
     * @param {string} value
     * @param {object|string} options
     * @returns HashCpQueryStr
     */
    HashCpQueryStr.add = function (value, options) {
        if ( options === void 0 ) options = {
        position: 'after',
        multiple: false
    };

        var cp = HashCpQueryStr;

        if (!isString(value) || isEmpty(value)) {
            return cp;
        }

        var hash        = getWinHash();
        var hashQuery   = getHashQuery(hash);
        var entry       = '';

        // parse position options
        if (isString(options)) {
            options = {position: options};
        }

        var position = options.position || 'after';
        var multiple = getBool(options.multiple || false);

        if (isEmpty(position) || !isString(position)) {
            position = 'after';
        }

        var posParse = parseKv(position, false);

        if ('after' in posParse) {
            var posAfter = posParse.after;

            if (isEmpty(posAfter)) {
                entry = hashQuery + value;
            } else {
                if (multiple) {
                    entry = replaceAll(hashQuery, posAfter, posAfter + value);
                } else {
                    entry = hashQuery.replace(posAfter, posAfter + value);
                }
            }
        } else if ('before' in posParse) {
            var posBefore = posParse.before;

            if (isEmpty(posBefore)) {
                entry = value + hashQuery;
            } else {
                if (multiple) {
                    entry = replaceAll(hashQuery, posBefore, value + posBefore);
                } else {
                    entry = hashQuery.replace(posBefore, value + posBefore);
                }
            }
        } else if ('index' in posParse) {
            entry = insertStr(hashQuery, value, posParse.index);
        }

        if (!isEmpty(entry)) {
            setEvHash({
                string: {
                    query: entry
                }
            });
        }

        return cp;
    };

    /**
     * Hash query string components.
     *
     * @type {HashCpQueryStr}
     */
    HashCpQuery.str = HashCpQueryStr;

    /**
     * Query components
     *
     * @type {HashCpQuery}
     */
    HashComponent.query = HashComponent.q = HashCpQuery;

    var core = {
        components: HashComponent,
        config: HashConfig
    };

    /**
     * Define Hash constant to use as main access
     * to all helpers and components.
     *
     * @type {object}
     */
    var Hash = Object.assign({
        config: core.config.instance,
        h: h
    }, core.components);

    return Hash;

}());
