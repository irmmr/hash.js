/**
 * HashJs javascript library v1.7.3
 * Copyright (c) 2021 irmmr
 * MIT License
 *
 * (life)
 * https://github.com/irmmr/hash.js
 */

var Hash = (function () {
    'use strict';

    var empty_object = Object.freeze({});

    var empty_func   = function () {};

    var default_configs = {
        getHashCallback: null,
        setHashCallback: null,
        getHashFilter: null,
        setHashFilter: null,
        getHrefCallback: null,
        window: null,
        log: true
    };

    var HashConfig = function HashConfig () {};

    HashConfig.defaults = function defaults () {
        return default_configs
    };

    /**
     * Instance call with set options
     * @param options
     * @returns {HashConfig}
     */
    HashConfig.instance = function instance (options) {
            if ( options === void 0 ) options = {};

        HashConfig.set(options);

        return HashConfig
    };

    /**
     * Clear all configs
     */
    HashConfig.clear = function clear () {
        HashConfig.configs = empty_object;
    };

    /**
     * Reset configs into defaults
     */
    HashConfig.reset = function reset () {
        HashConfig.configs = default_configs;
    };

    /**
     * Check for config
     * @param name
     * @returns {boolean}
     */
    HashConfig.has = function has (name) {
        return typeof HashConfig.configs === 'object' && name in HashConfig.configs
    };

    /**
     * Define config
     * @param options
     */
    HashConfig.define = function define (options) {
        if (typeof options !== 'object') {
            return
        }

        HashConfig.configs = options;
    };

    /**
     * Set config
     * @param options
     */
    HashConfig.set = function set (options) {
        if (typeof options !== 'object') {
            return
        }

        HashConfig.configs = Object.assign(HashConfig.configs, options);
    };

    /**
     * Get config
     * @param name
     * @param def
     * @returns {string|Readonly<{}>|*}
     */
    HashConfig.get = function get (name, def) {
            if ( name === void 0 ) name = null;
            if ( def === void 0 ) def = '';

        if (null == name) {
            return HashConfig.configs
        }

        if (HashConfig.has(name)) {
            return HashConfig.configs[name]
        }

        return def
    };

    // set configs value
    HashConfig.configs = default_configs;

    var HashComponent = function HashComponent () {};

    // Hash main information of library such as versions.
    var info = {
        name: 'HashJs',
        module: 'Hash',
        version : '1.7.3'
    };

    var message = {
        event_und: '"addEventListener" does not exist in the "window" that you defined.',
        win_problem: 'The "window" you defined in configs has some problems.'
    };

    /**
     * check if the variable is defined.
     * @param {*} h The input variable of check
     * @returns {boolean}
     */
    function isDef(h) {
        return typeof h !== undefined && h !== null
    }

    /**
     * check if the type of variable is string.
     * @param {*} h The input variable of check
     * @returns
     */
    function isString(h) {
        return typeof h === 'string'
    }

    /**
     * check if the type of variable is boolean
     * @param {*} h The input variable of check
     * @returns
     */
    function isBool(h) {
        return typeof h === 'boolean'
    }

    /**
     * Convert anything to boolean data type.
     * @param {string|boolean|number} h The input data
     * @returns
     */
    function getBool(h) {
        if (isBool(h)) {
            return h
        }

        return isString(h) && h.toLowerCase() === 'true'
    }

    /**
     * check if the type of variable is object.
     * @param {*} h The input data
     * @returns
     */
    function isObj(h) {
        return h !== null && typeof h === 'object'
    }

    /**
     * check if the type of variable is function.
     * @param {*} h The input data
     * @returns
     */
    function isFunc(h) {
        return typeof h === 'function'
    }

    /**
     * replace all a to b in a string data.
     * @param {string} h The input string
     * @param {string} a Needle string
     * @param {string} b Replace with
     * @returns
     */
    function replaceAll(h, a, b) {
        return h.split(a).join(b)
    }

    /**
     * run a callback using argument is safe mode.
     * @param {function}  func Function name
     * @param {*}         argc Function arguments
     * @returns
     */
    function lunchFunc(func, argc) {
        if ( argc === void 0 ) argc = null;

        return isFunc(func) ? argc !== null ? func(argc) : func() : null
    }

    /**
     * check if the type of variable is number.
     * @param {*} h The input data
     * @returns
     */
    function isNum(h) {
        return isDef(h) && !isNaN(Number(h))
    }

    /**
     * check if the value of variable is empty.
     * @param {*} h The input data
     * @returns
     */
    function isEmpty(h) {
        if (isString(h)) {
            return h === ''
        } else if (isArr(h)) {
            return h.length === 0
        } else if (isObj(h)) {
            return objSize(h) === 0
        }

        return false
    }

    /**
     * check if the value of variable is null.
     * @param {*} h The input data
     * @returns
     */
    function isNull(h) {
        return h == null
    }

    /**
     * get the object length
     * @param {object} h The object
     * @returns The object length/size
     */
    function objSize(h) {
        var size = 0, key;

        if (!isDef(h) || !isObj(h)) {
            return size
        }

        for (key in h) {
            if (h.hasOwnProperty(key)) {
                size ++;
            }
        }

        return size
    }

    /**
     * split just one time in string.
     * @param {string} string The input string
     * @param {string} delim  The delim for split
     * @returns
     */
    function splitOnce(string, delim) {
        var components = string.split(delim);
        return [components.shift(), components.join(delim)]
    }

    /**
     * check if the type of variable is array.
     * @param {*} h The input data
     * @returns
     */
    function isArr(h) {
        return isDef(h) && Array.isArray(h)
    }

    /**
     * convert data to string
     * @param {*} h
     * @returns
     */
    function getString(h) {
        return isString(h) ? h : h.toString()
    }

    /**
     * check if string is query
     * @param {string} q The input string
     * @returns
     */
    function isQuery(q) {
        if (!isString(q)) {
            return false
        }

        if (!q.startsWith('?')) {
            q = '?' + q;
        }

        return (new RegExp(/\?.+(=|).*/g)).test(q)
    }

    /**
     * get all values and names of query.
     * @param {string} q The query string without "?"
     * @returns
     */
    function getQuery(q) {
        if (!isQuery(q)) {
            return {}
        }

        var qa     = q.split('&'),
            output = {}, i;

        for (i in qa) {
            if (!qa.hasOwnProperty(i)) { continue }

            var query    = qa[i],
                q_parse  = splitOnce(query, '='),
                q_len    = query.split('=').length,
                needle   = getString(q_parse[0]);

            if (isEmpty(query)) {
                continue
            }

            if (q_len >= 2) {
                var val     = getString(q_parse[1]);

                try {
                    val = decodeURIComponent(val);
                } catch (e) {}

                output[needle] = val;
            } else {
                output[needle] = null;
            }
        }

        return output
    }

    /**
     * convert object to query string.
     * @param {object}  q           The query object
     * @param {boolean} encode_uri  Encode uri component status
     * @returns
     */
    function toQuery(q, encode_uri) {
        if ( encode_uri === void 0 ) encode_uri = false;

        if (!isObj(q)) {
            return ''
        }

        var collector = [], i;

        for (i in q) {
            if (!q.hasOwnProperty(i) || q[i] === undefined) { continue }

            var data_val = q[i];

            if (isNull(data_val)) {
                collector.push(i);
            } else {
                var data_str    = getString(data_val),
                    data_encode = encode_uri ? encodeURIComponent(data_str) : data_str;
                collector.push(i + '=' + data_encode);
            }
        }

        return collector.join('&')
    }

    /**
     * validation a hash for query exists.
     * @param {string} q The hash string
     * @returns
     */
    function isTrueHash(q) {
        if (!isString(q)) {
            return false
        }

        if (q.includes('?')) {
            var spt = splitOnce(q, '?'),
                que = spt[1];

            return isEmpty(que) || isQuery(que)
        }

        return true
    }

    /**
     * get hash value and query string.
     * @param {string} q The hash string
     * @returns
     */
    function getTrueHash(q) {
        if (!isString(q)) {
            return ['', '']
        }

        var emp = [q, ''];

        if (!isTrueHash(q)) {
            return emp
        }

        if (q.includes('?')) {
            return splitOnce(q, '?')
        }

        return emp
    }

    /**
     * get the value of window hash.
     * @returns
     */
    function getWinHash() {
        var hash = '',
            win  = getWindow(),
            hsh  = HashConfig.get('getHashCallback');

        if (isFunc(hsh)) {
            hash = lunchFunc(hsh);
        } else {
            if (typeof win.location !== 'undefined' &&
                typeof win.location.hash !== 'undefined') {
                hash = win.location.hash;
            } else {
                err(message.win_problem);
            }
        }

        // convert to string
        hash = getString(hash);

        // apply filters
        var fil = HashConfig.get('getHashFilter');

        if (isFunc(fil)) {
            hash = lunchFunc(fil, hash);
        }

        // convert again to string
        hash = getString(hash);

        return hash.startsWith('#') ? hash.slice(1) : hash
    }

    /**
     * set the window hash.
     * @param {string} q Hash value
     */
    function setWinHash(q) {
        var handle = HashConfig.get('setHashCallback'),
            filter = HashConfig.get('setHashFilter'),
            win    = getWindow();

        if (isFunc(filter)) {
            q = lunchFunc(filter, q);
        }

        q = getString(q);

        if (isFunc(handle)) {
            lunchFunc(handle, q);
        } else {
            if (typeof win.location !== 'undefined' &&
                typeof win.location.hash !== 'undefined') {

                win.location.hash = q;

            } else {
                err(message.win_problem);
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
            return {}
        }

        names = names.filter(function (i) { return i !== ''; });

        if (isEmpty(names)) {
            return {}
        }

        var fetch = {}, i;

        for (i in names) {
            if (!names.hasOwnProperty(i)) { continue }
            fetch[names[i]] = value;
        }

        return fetch
    }

    /**
     * check if the parameter/argument is a valid query value type.
     * @param n The input value
     * @returns {*|boolean}
     */
    function isQueParOk(n) {
        return isString(n) || isNull(n) || n === undefined || isNum(n)
    }

    /**
     * get window location href.
     * @returns {*}
     */
    function getHref() {
        var href = '',
            win  = getWindow(),
            hsh  = HashConfig.get('getHrefCallback');

        if (isFunc(hsh)) {
            href = lunchFunc(hsh);
        } else {
            if (typeof win.location !== 'undefined' &&
                typeof win.location.href !== 'undefined') {

                href = win.location.href;

            } else {
                err(message.win_problem);
            }
        }

        // convert to string
        return getString(href)
    }

    /**
     * get window master.
     * @returns {Window|string|*}
     */
    function getWindow() {
        return HashConfig.get('window') || window
    }

    /**
     * the default error handle.
     * @param message    The message of error.
     * @param force_log  The force logger.
     */
    function err(message, force_log) {
        if ( force_log === void 0 ) force_log = false;

        if (force_log || HashConfig.get('log') === true) {
            throw new Error(info.name + " -> " + message)
        }
    }

    /**
     * an easy way to get location hash.
     * @returns string
     */
    HashComponent.get = function () {
        return getWinHash()
    };

    /**
     * get location hash value.
     * @returns string
     */
    HashComponent.getValue = function () {
        var wh = getWinHash();
        return isEmpty(wh) ? '' : getTrueHash(wh)[0]
    };

    /**
     * get the location hash query.
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

    /**
     * add a string to location hash.
     * @param {string} n
     * @returns boolean
     */
    HashComponent.add = function (n) {
        if ( n === void 0 ) n = '';

        if (!isString(n) || isEmpty(n)) {
            return false
        }

        var wh = getWinHash();

        if (isEmpty(wh)) {
            setWinHash(n);
            return true
        }

        setWinHash(wh + n);

        return true
    };

    /**
     * add a value to location hash.
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
     * @param {*} n
     * @returns boolean
     */
    HashComponent.addQuery =function (n) {
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

    /**
     * clear the page hash.
     * @param {boolean} n
     * @returns boolean
     */
    HashComponent.clear = function (n) {
        if ( n === void 0 ) n = true;

        if (!isBool(n)) {
            return false
        }

        if (n) {
            history.pushState(null, null, getHref().split('#')[0]);
        } else {
            setWinHash('');
        }

        return true
    };

    /**
     * clear hash value from location hash.
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

    /**
     * Hash Event component.
     * @param {string} e The listeners
     * @param {*} func   The function/callback
     * @returns
     */
    HashComponent.event = function (e, func) {
        if ( func === void 0 ) func = function() {};

        if (!isDef(e) || !isString(e)) {
            return
        }

        var event   = e.toLowerCase(),
            evs     = event.split(','),
            wn      = getWindow();

        func        = isDef(func) && isFunc(func) ? func : empty_func;

        // check addEventListener based on window
        if (typeof wn.addEventListener === 'undefined') {
            err(message.event_und);
            return
        }

        for (var i in evs) {
            if (!evs.hasOwnProperty(i)) { continue }

            var current_ev = replaceAll(evs[i], ' ', '');

            switch (current_ev) {
                case 'change' :
                    wn.addEventListener('hashchange', func);
                    break;
                case 'load' :
                    wn.addEventListener('load', func);
                    break;
                case 'ready' :
                    lunchFunc(func);
                    break;
            }
        }
    };

    /**
     * check for location hash value.
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

    /**
     * check or searching for a string in hash.
     * @param {string|array} n
     * @returns boolean
     */
    HashComponent.have = function (n) {
        if ( n === void 0 ) n = '';

        if (isString(n)) {
            n = [n];
        }

        if (!isArr(n)) {
            return false
        }

        var wh = getWinHash();
        n      = n.filter(function (i) { return i !== ''; });

        if (isEmpty(n)) {
            return !isEmpty(wh)
        }

        for (var i in n) {
            if (!n.hasOwnProperty(i)) { continue }

            if (!wh.includes(n[i])) {
                return false
            }
        }

        return true
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

    /**
     * checking with equals in location hash.
     * @param {string} n
     * @returns boolean
     */
    HashComponent.is = function (n) {
        return isString(n) && getWinHash() === n
    };

    /**
     * checking for value string in location hash.
     * @param {string} n
     * @return boolean
     */
    HashComponent.isValue = function (n) {
        return isString(n) && HashComponent.getValue() === n
    };

    /**
     * check for query value in location hash.
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

    var locked     = false,
        force_lock = false;

    /**
     * check if hash is locked.
     * @param {object} n
     * @returns boolean
     */
    HashComponent.isLocked = function (n) {
        if ( n === void 0 ) n = {};

        if (!isDef(n) || !isObj(n)) {
            return false
        }

        return locked
    };

    /**
     * unlock location's hash.
     * @param {object} n
     * @returns boolean
     */
    HashComponent.unLock = function (n) {
        if ( n === void 0 ) n = {};

        if (!isDef(n) || !isObj(n)) {
            return false
        }

        if (locked && !force_lock) {
            locked = false;
            return true
        }

        return false
    };

    /**
     * lock the page hash.
     * @param {object} n
     * @returns boolean
     */
    HashComponent.lock = function (n) {
        if ( n === void 0 ) n = {};

        if (locked || !isDef(n) || !isObj(n)) {
            return false
        }

        force_lock   = getBool(n.force || false);
        var wh     = getWinHash(),
              wn     = getWindow();

        if (typeof wn.onhashchange !== 'undefined') {
            wn.onhashchange = function() {
                if (locked) {
                    setWinHash(wh);
                }
            };

            locked = true;
            return true
        }

        return false
    };

    /**
     * update a query value in location hash.
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

    /**
     * remove a string from location hash.
     * @param {string|array} n The words/chars list
     * @returns boolean
     */
    HashComponent.remove = function (n) {
        if ( n === void 0 ) n = [];

        if (isString(n) && !isEmpty(n)) {
            n = [n];
        }

        if (!isArr(n) || n.length === 0) {
            return false
        }

        var wh = getWinHash();

        if (isEmpty(wh)) {
            return false
        }

        for (var i in n) {
            if (!n.hasOwnProperty(i)) { continue }

            var vl = n[i];
            if (getWinHash().includes(vl)) {
                setWinHash(
                    replaceAll(
                        getWinHash(), vl, ''
                    )
                );
            }
        }

        return true
    };

    /**
     * remove a value from location hash.
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

    /**
     * set the page hash.
     * @param {string} n
     * @returns boolean
     */
    HashComponent.set = function (n) {
        if ( n === void 0 ) n = '';

        if (!isString(n) || isEmpty(n)) {
            return false
        }

        setWinHash(n);
        return true
    };

    /**
     * set a value to location hash.
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

    var core = {
        components: HashComponent,
        config: HashConfig
    };

    var Hash = Object.assign({config: core.config.instance}, core.components);

    return Hash;

}());
