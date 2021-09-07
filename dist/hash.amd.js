/**
 * HashJs javascript library v1.7.2
 * Copyright (c) 2021 irmmr
 * MIT License
 *
 * (amd)
 * https://github.com/irmmr/hash.js
 */

define(function () { 'use strict';

    // blank variables for use in return of functions
    var vars = {
        emptyObj: Object.freeze({}),
        emptyFunc: function() {}
    };

    // Hash main information of library such as versions.
    var info = {
        name: 'HashJs',
        module: 'Hash',
        version : '1.7.2'
    };

    var message = {
        event_und: '"addEventListener" does not exist in the "window" that you defined.',
        win_problem: 'The "window" you defined in configs has some problems.'
    };

    // define main helpers handle

    var HashHelper = function HashHelper(configs) {
        if ( configs === void 0 ) configs = {};

        this._conf = configs;
    };

    /**
     * re-load all configs.
     *
     * @param   configs Entry options
     */
    HashHelper.prototype.__conf = function __conf (name, def) {
            if ( name === void 0 ) name = '';
            if ( def === void 0 ) def = null;

        if ('' === name) { return this._conf }
        return this.__has_conf(name) ? this._conf[name] : def
    };

    /**
     * check for a config exists.
     * @param   name The name if config.
     * @returns {boolean}
     * @private
     */
    HashHelper.prototype.__has_conf = function __has_conf (name) {
        return typeof this._conf[name] !== 'undefined'
    };

    HashHelper.prototype.__config = function __config (configs) {
        this._conf = configs;
    };

    /**
     * check if the variable is defined.
     * @param {*} h The input variable of check
     * @returns {boolean}
     */
    HashHelper.prototype.isDef = function isDef (h) {
        return typeof h !== undefined && h !== null
    };

    /**
     * check if variable is not defined.
     * @param {*} h The input variable of check
     * @returns 
     */
    HashHelper.prototype.isUnDef = function isUnDef (h) {
        return typeof h === undefined || h === null
    };

    /**
     * check if the type of variable is string.
     * @param {*} h The input variable of check
     * @returns 
     */
    HashHelper.prototype.isString = function isString (h) {
        return this.isDef(h) && typeof h === 'string'
    };

    /**
     * check if the type of variable is boolean
     * @param {*} h The input variable of check
     * @returns 
     */
    HashHelper.prototype.isBool = function isBool (h) {
        return this.isDef(h) && typeof h === 'boolean'
    };

    /**
     * Convert anything to boolean data type.
     * @param {string|boolean|number} h The input data
     * @returns
     */
    HashHelper.prototype.getBool = function getBool (h) {
        if (this.isBool(h)) {
            return h
        }
        return this.isString(h) && h.toLowerCase() === 'true'
    };

    /**
     * check if the type of variable is object.
     * @param {*} h The input data
     * @returns 
     */
    HashHelper.prototype.isObj = function isObj (h) {
        return h !== null && typeof h === 'object'
    };

    /**
     * check if the type of variable is function.
     * @param {*} h The input data
     * @returns 
     */
    HashHelper.prototype.isFunc = function isFunc (h) {
        return this.isDef(h) && typeof h === 'function'
    };

    /**
     * replace all a to b in a string data.
     * @param {string} h The input string
     * @param {string} a Needle string
     * @param {string} b Replace with
     * @returns 
     */
    HashHelper.prototype.replaceAll = function replaceAll (h, a, b) {
        return h.split(a).join(b)
    };

    /**
     * run a callback using argument is safe mode.
     * @param {function}  func Function name
     * @param {*}     argc Function arguments
     * @returns 
     */
    HashHelper.prototype.lunchFunc = function lunchFunc (func, argc) {
            if ( argc === void 0 ) argc = null;

        return this.isFunc(func) ? argc !== null ? func(argc) : func() : null
    };

    /**
     * check if the type of variable is number.
     * @param {*} h The input data
     * @returns 
     */
    HashHelper.prototype.isNum = function isNum (h) {
        return this.isDef(h) && Number.isNaN(Number(h))
    };

    /**
     * check if the value of variable is empty.
     * @param {*} h The input data
     * @returns 
     */
    HashHelper.prototype.isEmpty = function isEmpty (h) {
        if (this.isString(h)) {
            return h === ''
        } else if (this.isArr(h)) {
            return h.length === 0
        } else if (this.isObj(h)) {
            return this.objSize(h) === 0
        }
        return false
    };

    /**
     * check if the value of variable is null.
     * @param {*} h The input data
     * @returns 
     */
    HashHelper.prototype.isNull = function isNull (h) {
        return h == null
    };

    /**
     * get the object length
     * @param {object} h The object
     * @returns The object length/size
     */
    HashHelper.prototype.objSize = function objSize (h) {
        var size = 0, key;
        if (!this.isDef(h) || !this.isObj(h)) {
            return size
        }
        for (key in h) {
            if (h.hasOwnProperty(key)) {
                size ++;
            }
        }
        return size
    };

    /**
     * split just one time in string.
     * @param {string} string The input string
     * @param {string} delim  The delim for split
     * @returns 
     */
    HashHelper.prototype.splitOnce = function splitOnce (string, delim) {
        var components = string.split(delim);
        return [components.shift(), components.join(delim)]
    };

    /**
     * split just one time in string from end.
     * @param {string} string The input string
     * @param {string} delim  The delim for split
     * @returns
     */
    HashHelper.prototype.splitOnceEnd = function splitOnceEnd (string, delim) {
        var components = string.split(delim);
        return [components.slice(0, components.length - 1).join(delim), components.pop()]
    };
        
    /**
     * check if the type of variable is array.
     * @param {*} h The input data
     * @returns 
     */
    HashHelper.prototype.isArr = function isArr (h) {
        return this.isDef(h) && Array.isArray(h)
    };

    /**
     * convert data to string
     * @param {*} h 
     * @returns 
     */
    HashHelper.prototype.getString = function getString (h) {
        if (typeof h === 'undefined') { return '' }
        return this.isString(h) ? h : h.toString()
    };

    /**
     * check if string is query
     * @param {string} q The input string
     * @returns 
     */
    HashHelper.prototype.isQuery = function isQuery (q) {
        if (!this.isString(q)) {
            return false
        }
        if (!q.startsWith('?')) {
            q = '?' + q;
        }
        return (new RegExp(/\?.+(=|).*/g)).test(q)
    };

    /**
     * get all values and names of query.
     * @param {string} q The query string without "?"
     * @returns 
     */
    HashHelper.prototype.getQuery = function getQuery (q) {
        if (!this.isQuery(q)) {
            return {}
        }
        var qa = q.split('&'),
            output = {};
        for (var i in qa) {
            if (!qa.hasOwnProperty(i)) { continue }
            var query= qa[i],
                q_parse  = this.splitOnce(query, '='),
                q_len= query.split('=').length,
                needle   = this.getString(q_parse[0]);
            if (this.isEmpty(query)) {
                continue
            }
            if (q_len >= 2) {
                var val    = this.getString(q_parse[1]);
                output[needle] = decodeURIComponent(val);
            } else {
                output[needle] = null;
            }
        }
        return output
    };
        
    /**
     * convert object to query string.
     * @param {object}  q       The query object
     * @param {boolean} encode_uri  Encode uri component status
     * @returns 
     */
    HashHelper.prototype.toQuery = function toQuery (q, encode_uri) {
            if ( encode_uri === void 0 ) encode_uri = false;

        if (!this.isDef(q) || !this.isObj(q)) {
            return ''
        }
        var collector = [];
        for (var i in q) {
            if (!q.hasOwnProperty(i) || q[i] === undefined) { continue }
            var data_val = q[i];
            if (this.isNull(data_val)) {
                collector.push(i);
            } else {
                var data_str= this.getString(data_val),
                    data_encode = encode_uri ? encodeURIComponent(data_str) : data_str;
                collector.push(i + '=' + data_encode);
            }
        }
        return collector.join('&')
    };

    /**
     * get length of all "q" in "t".
     * @param {string} t The input string
     * @param {string} q The input char/string
     * @returns 
     */
    HashHelper.prototype.lenOfChar = function lenOfChar (t, q) {
        if (!t.includes(q)) {
            return 0
        }
        return t.split('').filter(function (i) { return i === q; }).length
    };

    /**
     * validation a hash for query exists.
     * @param {string} q The hash string
     * @returns 
     */
    HashHelper.prototype.isTrueHash = function isTrueHash (q) {
        if (!this.isString(q)) {
            return false
        }
        if (q.includes('?')) {
            var spt = this.splitOnce(q, '?'),
                que = spt[1];
            return this.isEmpty(que) || this.isQuery(que)
        }
        return true
    };

    /**
     * get hash value and query string.
     * @param {string} q The hash string
     * @returns 
     */
    HashHelper.prototype.getTrueHash = function getTrueHash (q) {
        if (!this.isString(q)) {
            return ['', '']
        }
        var emp = [q, ''];
        if (!this.isTrueHash(q)) {
            return emp
        }
        if (q.includes('?')) {
            return this.splitOnce(q, '?')
        }
        return emp
    };

    /**
     * get the value of window hash.
     * @returns 
     */
    HashHelper.prototype.getWinHash = function getWinHash () {
        var hash = '',
            win  = this.getWindow(),
            hsh  = this.__conf('getHashCallback');
        if (this.isFunc(hsh)) {
            hash = this.lunchFunc(hsh);
        } else {
            if (typeof win.location !== 'undefined' &&
                typeof win.location.hash !== 'undefined') {
                hash = win.location.hash;
            } else {
                this.err(message.win_problem);
            }
        }
        // convert to string
        hash = this.getString(hash);
        // apply filters
        var fil = this.__conf('getHashFilter');
        if (this.isFunc(fil)) {
            hash = this.lunchFunc(fil, hash);
        }
        // convert again to string
        hash = this.getString(hash);
        return hash.startsWith('#') ? hash.slice(1) : hash
    };

    /**
     * set the window hash.
     * @param {string} q Hash value
     */
    HashHelper.prototype.setWinHash = function setWinHash (q) {
        var handle = this.__conf('setHashCallback'),
            filter = this.__conf('setHashFilter'),
            win= this.getWindow();
        if (this.isFunc(filter)) {
            q = this.lunchFunc(filter, q);
        }
        q = this.getString(q);
        if (this.isFunc(handle)) {
            this.lunchFunc(handle, q);
        } else {
            if (typeof win.location !== 'undefined' &&
                typeof win.location.hash !== 'undefined') {
                win.location.hash = q;
            } else {
                this.err(message.win_problem);
            }
        }
    };

    /**
     * create object of values.
     */
    HashHelper.prototype.createObjVal = function createObjVal (names, value) {
        if (this.isString(names) && !this.isEmpty(names)) {
            names = [names];
        }
        if (!this.isArr(names)) {
            return {}
        }
        names = names.filter(function (i) { return i !== ''; });
        if (this.isEmpty(names)) {
            return {}
        }
        var fetch = {};
        for (var i in names) {
            if (!names.hasOwnProperty(i)) { continue }
            fetch[names[i]] = value;
        }
        return fetch
    };

    /**
     * check if the parameter/argument is a valid query value type.
     * @param n The input value
     * @returns {*|boolean}
     */
    HashHelper.prototype.isQueParOk = function isQueParOk (n) {
        return this.isString(n) || this.isNull(n) || n === undefined || this.isNum(n)
    };

    /**
     * get window location href.
     * @returns {*}
     */
    HashHelper.prototype.getHref = function getHref () {
        var href = '',
            win  = this.getWindow(),
            hsh  = this.__conf('getHrefCallback');
        if (this.isFunc(hsh)) {
            href = this.lunchFunc(hsh);
        } else {
            if (typeof win.location !== 'undefined' &&
                typeof win.location.href !== 'undefined') {
                href = win.location.href;
            } else {
                this.err(message.win_problem);
            }
        }
        // convert to string
        return this.getString(href)
    };

    /**
     * get window master.
     * @returns {Window|string|*}
     */
    HashHelper.prototype.getWindow = function getWindow () {
        return this.__conf('window') || window
    };

    /**
     * the default error handle.
     * @param messageThe message of error.
     * @param force_log  The force logger.
     */
    HashHelper.prototype.err = function err (message, force_log) {
            if ( force_log === void 0 ) force_log = false;

        if (force_log || this.__conf('log') === true) {
            throw new Error(info.name + " -> " + message)
        }
    };

    // component main class

    var HashComponent = function HashComponent(default_options, options) {
        if ( default_options === void 0 ) default_options = {};
        if ( options === void 0 ) options = {};

        this._def_conf  = typeof default_options === 'object' ? default_options : {};
        this._conf  = typeof options === 'object' ? Object.assign(this._def_conf, options) : this._def_conf;
        this._h      = new HashHelper(this._conf);
    };

    /**
     * get a config value for other methods.
     *
     * @param   nameThe name of config.
     * @param   def The default value of config.
     * @returns {string|*}
     */
    HashComponent.prototype.__g_conf = function __g_conf (name, def) {
            if ( name === void 0 ) name = '';
            if ( def === void 0 ) def = '';

        if ('' === name) { return this._conf }
        return typeof this._conf[name] !== 'undefined' ? this._conf[name] : def
    };

    /**
     * set config and settings into Hash.js.
     *
     * @param   config  The config settings.
     * @returns {HashComponent}
     */
    HashComponent.prototype.config = function config (config) {
            if ( config === void 0 ) config = {};

        this._conf = Object.assign(this._conf, config);
        this._conf = Object.assign(this._def_conf, this._conf);
        this._h.__config(this._conf);

        return this
    };

    /**
     * reset all configs.
     */
    HashComponent.prototype.resetConfig = function resetConfig () {
        this._conf = this._def_conf;
        this._h.__config(this._conf);

        return this
    };

    var getMethod = {
        
        /**
         * an easy way to get location hash.
         * @param {*} n
         * @returns string
         */
        get: function (n) {

            return this._h.getWinHash()
        },

        /**
         * get location hash value.
         * @param {*} n
         * @returns string
         */
        getValue: function (n) {

            var wh = this._h.getWinHash();
            return this._h.isEmpty(wh) ? '' : this._h.getTrueHash(wh)[0]
        },

        /**
         * get the location hash query.
         * @param {string|array} n
         * @returns object
         */
        getQuery: function (n) {
            if ( n === void 0 ) n = [];

            if (this._h.isString(n)) {
                n = [n];
            }
            if (!this._h.isArr(n)) {
                return {}
            }
            n       = n.filter(function (i) { return i !== ''; });
            var emp = n.length === 1 ? undefined : this._h.createObjVal(n, undefined),
                wh  = this._h.getWinHash();
            if (this._h.isEmpty(wh)) {
                return emp
            }
            var hsh_que = this._h.getTrueHash(wh)[1];
            if (this._h.isEmpty(hsh_que) || !this._h.isQuery(hsh_que)) {
                return emp
            }
            var que = this._h.getQuery(hsh_que);
            if (n.length === 1) {
                return que.hasOwnProperty(n[0]) ? que[n[0]] : emp
            } else if (n.length !== 0) {
                var ans = {};
                for (var i in n) {
                    if (n.hasOwnProperty(i)) {
                        var v  = n[i];
                        ans[v] = que.hasOwnProperty(v) ? que[v] : undefined;
                    }
                }
                return ans
            }
            return que
        }
        
    };

    var addMethod = {

        /**
         * add a string to location hash.
         * @param {string} n
         * @returns boolean
         */
        add: function (n) {
            if ( n === void 0 ) n = '';

            if (!this._h.isString(n) || this._h.isEmpty(n)) {
                return false
            }
            var wh = this._h.getWinHash();
            if (this._h.isEmpty(wh)) {
                this._h.setWinHash(n);
                return true
            }
            this._h.setWinHash(wh + n);
            return true
        },

        /**
         * add a value to location hash.
         * @param {string} n
         * @returns boolean
         */
        addValue: function (n) {
            if ( n === void 0 ) n = '';

            if (!this._h.isString(n) || this._h.isEmpty(n)) {
                return false
            }
            if (n.includes('?')) {
                n = this._h.replaceAll(n, '?', encodeURIComponent('?'));
            }
            var wh      = this._h.getWinHash(),
                hash    = this._h.getTrueHash(wh),
                hsh_val = hash[0],
                hsh_que = hash[1];
            if (!this._h.isEmpty(hsh_val)) {
                n = hsh_val + n;
            }
            if (!this._h.isEmpty(hsh_que)) {
                n += '?' + hsh_que;
            }
            this._h.setWinHash(n);
            return true
        },

        /**
         * add a query to location hash.
         * @param {*} n
         * @returns boolean
         */
        addQuery: function (n) {
            if ( n === void 0 ) n = {};

            if (!this._h.isObj(n) || n.length === 0) {
                return false
            }
            var wh      = this._h.getWinHash(),
                hash    = this._h.getTrueHash(wh),
                hsh_val = hash[0],
                hsh_que = hash[1],
                vl      = '';
            if (!this._h.isEmpty(hsh_que)) {
                var oq  = this._h.getQuery(hsh_que);
                n       = Object.assign(oq, n);
            }
            if (!this._h.isEmpty(hsh_val)) {
                vl += hsh_val;
            }
            vl += '?' + this._h.toQuery(n);
            this._h.setWinHash(vl);
            return true
        }

    };

    var clearMethod = {

        /**
         * clear the page hash.
         * @param {boolean} n
         * @returns boolean
         */
        clear: function (n) {
            if ( n === void 0 ) n = true;

            if (!this._h.isBool(n)) {
                return false
            }
            if (n) {
                history.pushState(null, null, this._h.getHref().split('#')[0]);
            } else {
                this._h.setWinHash('');
            }
            return true
        },

        /**
         * clear hash value from location hash.
         * @returns boolean
         */
        clearValue: function () {
            var wh = this._h.getWinHash();
            if (this._h.isEmpty(wh)) {
                return true
            }
            if (!this._h.isTrueHash(wh)) {
                return false
            }
            var wg = this._h.getTrueHash(wh),
                wv = wg[0],
                wq = wg[1];
            if (this._h.isEmpty(wv)) {
                return true
            }
            this._h.setWinHash(this._h.isEmpty(wq) ? '' : '?' + wq);
            return true
        },

        /**
         * clear hash query from location hash.
         * @returns boolean
         */
        clearQuery: function () {
            var wh = this._h.getWinHash();
            if (this._h.isEmpty(wh)) {
                return true
            }
            if (!this._h.isTrueHash(wh)) {
                return false
            }
            var wg = this._h.getTrueHash(wh),
                wv = wg[0],
                wq = wg[1];
            if (this._h.isEmpty(wq)) {
                return true
            }
            this._h.setWinHash(wv);
            return true
        }

    };

    var eventMethod = {

        /**
         * Hash Event component.
         * @param {string} e The listeners
         * @param {*} func   The function/callback
         * @returns
         */
        event: function (e, func) {
            if ( func === void 0 ) func = function() {};

            if (!this._h.isDef(e) || !this._h.isString(e)) {
                return
            }
            var event   = e.toLowerCase(),
                evs     = event.split(','),
                wn      = this._h.getWindow();
            func    = this._h.isDef(func) && this._h.isFunc(func) ? func : vars.emptyFunc;
            // check addEventListener based on window
            if (typeof wn.addEventListener === 'undefined') {
                this._h.err(message.event_und);
                return
            }
            for (var i in evs) {
                if (!evs.hasOwnProperty(i)) { continue }
                var current_ev = this._h.replaceAll(evs[i], ' ', '');
                switch (current_ev) {
                    case 'change' :
                        wn.addEventListener('hashchange', func);
                        break;
                    case 'load' :
                        wn.addEventListener('load', func);
                        break;
                    case 'ready' :
                        this._h.lunchFunc(func);
                        break;
                }
            }
        }

    };

    var haveMethod = {

        /**
         * check for location hash value.
         * @param {string|array} n
         * @returns boolean
         */
        haveValue: function (n) {
            if ( n === void 0 ) n = '';

            if (this._h.isString(n)) {
                n = [n];
            }
            if (!this._h.isArr(n)) {
                return false
            }
            var wv = this.getValue();
            n      = n.filter(function (i) { return i !== ''; });
            if (this._h.isEmpty(n)) {
                return !this._h.isEmpty(wv)
            }
            for (var i in n) {
                if (!n.hasOwnProperty(i)) { continue }
                if (!wv.includes(n[i])) {
                    return false
                }
            }
            return true
        },

        /**
         * checking for query exists on location hash.
         * @param {string|array} n
         * @retuens boolean
         */
        haveQuery: function (n) {
            if ( n === void 0 ) n = [];

            if (this._h.isString(n)) {
                n = [n];
            }
            if (!this._h.isArr(n)) {
                return false
            }
            var wh = this._h.getWinHash(),
                wq = this._h.getTrueHash(wh)[1];
            if (n.length === 0) {
                return !this._h.isEmpty(wq)
            }
            if (!this._h.isQuery(wq)) {
                return false
            }
            var que = this._h.getQuery(wq);
            for (var i in n) {
                if (!n.hasOwnProperty(i)) { continue }
                if (!que.hasOwnProperty(n[i])) {
                    return false
                }
            }
            return true
        },

        /**
         * check or searching for a string in hash.
         * @param {string|array} n
         * @returns boolean
         */
        have: function (n) {
            if ( n === void 0 ) n = '';

            if (this._h.isString(n)) {
                n = [n];
            }
            if (!this._h.isArr(n)) {
                return false
            }
            var wh = this._h.getWinHash();
            n      = n.filter(function (i) { return i !== ''; });
            if (this._h.isEmpty(n)) {
                return !this._h.isEmpty(wh)
            }
            for (var i in n) {
                if (!n.hasOwnProperty(i)) { continue }
                if (!wh.includes(n[i])) {
                    return false
                }
            }
            return true
        }
        
    };

    var infoMethod = {

        /**
         * Hash Info component.
         * @returns
         */
        info: function () {
            return {
                version : info.version ,
                name: info.name ,
                module: info.module 
            }
        }
        
    };

    var isMethod = {

        /**
         * checking with equals in location hash.
         * @param {string} n
         * @returns boolean
         */
        is: function (n) {
            return this._h.isString(n) && this._h.getWinHash() === n
        },

        /**
         * checking for value string in location hash.
         * @param {string} n
         * @return boolean
         */
        isValue: function (n) {
            return this._h.isString(n) && this.getValue() === n
        },

        /**
         * check for query value in location hash.
         * @param {string} n
         * @param {string|null|number|undefined} e
         * @returns boolean
         */
        isQuery: function (n, e) {
            if (!this._h.isString(n) || this._h.isEmpty(n) || !this._h.isQueParOk(e)) {
                return false
            }
            return this.getQuery(n) === e
        }
        
    };

    // main lock variables
    var locked     = false,
        force_lock = false;

    var lockMethod = {

        /**
         * check if hash is locked.
         * @param {object} n
         * @returns boolean
         */
        isLocked: function (n) {
            if ( n === void 0 ) n = {};

            if (!this._h.isDef(n) || !this._h.isObj(n)) {
                return false
            }
            return locked
        },

        /**
         * unlock location's hash.
         * @param {object} n
         * @returns boolean
         */
        unLock: function (n) {
            if ( n === void 0 ) n = {};

            if (!this._h.isDef(n) || !this._h.isObj(n)) {
                return false
            }
            if (locked && !force_lock) {
                locked = false;
                return true
            }
            return false
        },

        /**
         * lock the page hash.
         * @param {object} n
         * @returns boolean
         */
        lock: function (n) {
            if ( n === void 0 ) n = {};

            if (locked || !this._h.isDef(n) || !this._h.isObj(n)) {
                return false
            }
            force_lock   = this._h.getBool(n.force || false);
            var wh     = this._h.getWinHash(),
                  th     = this,
                  wn     = this._h.getWindow();
            if (typeof wn.onhashchange !== 'undefined') {
                wn.onhashchange = function() {
                    if (locked) {
                        th._h.setWinHash(wh);
                    }
                };
                locked = true;
                return true
            }
            return false
        }

    };

    var queryMethod = {
        
        /**
         * update a query value in location hash.
         * @param {string} n
         * @param {string|null|number} e
         * @returns boolean
         */
        updateQuery: function (n, e) {
            if (!this._h.isString(n) || !this._h.isQueParOk(e)) {
                return false
            }
            if (e === undefined) {
                return false
            }
            var wh      = this._h.getWinHash(),
                hash    = this._h.getTrueHash(wh),
                hsh_val = hash[0],
                hsh_que = hash[1],
                vl      = '',
                cl      = {},
                ch      = 0;
            if (this._h.isEmpty(hsh_que)) {
                return false
            }
            if (!this._h.isEmpty(hsh_val)) {
                vl += hsh_val;
            }
            var que = this._h.getQuery(hsh_que);
            for (var i in que) {
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
            vl += '?' + this._h.toQuery(cl);
            this._h.setWinHash(vl);
            return ch !== 0
        }
        
    };

    var removeMethod = {

        /**
         * remove a string from location hash.
         * @param {string|array} n The words/chars list
         * @returns boolean
         */
        remove: function (n) {
            if ( n === void 0 ) n = [];

            if (this._h.isString(n) && !this._h.isEmpty(n)) {
                n = [n];
            }
            if (!this._h.isArr(n) || n.length === 0) {
                return false
            }
            var wh = this._h.getWinHash();
            if (this._h.isEmpty(wh)) {
                return false
            }
            for (var i in n) {
                if (!n.hasOwnProperty(i)) {
                    continue
                }
                var vl = n[i];
                if (this._h.getWinHash().includes(vl)) {
                    this._h.setWinHash(
                        this._h.replaceAll(
                            this._h.getWinHash(), vl, ''
                        )
                    );
                }
            }
            return true
        },

        /**
         * remove a value from location hash.
         * @param {string|array} n The words list
         * @returns boolean
         */
        removeValue: function (n) {
            if ( n === void 0 ) n = [];

            if (this._h.isString(n) && !this._h.isEmpty(n)) {
                n = [n];
            }
            if (!this._h.isArr(n) || n.length === 0) {
                return false
            }
            var wh      = this._h.getWinHash(),
                hash    = this._h.getTrueHash(wh),
                hsh_val = hash[0],
                hsh_que = hash[1],
                vt      = '';
            if (this._h.isEmpty(wh) || this._h.isEmpty(hsh_val)) {
                return false
            }
            for (var i in n) {
                if (!n.hasOwnProperty(i)) {
                    continue
                }
                var vl = n[i];
                if (hsh_val.includes(vl)) {
                    hsh_val = this._h.replaceAll(hsh_val, vl, '');
                }
            }
            vt += hsh_val;
            if (!this._h.isEmpty(hsh_que)) {
                vt += '?' + hsh_que;
            }
            this._h.setWinHash(vt);
            return true
        },

        /**
         * remove a query from location hash.
         * @param {string|array} n
         * @returns boolean
         */
        removeQuery: function (n) {
            if ( n === void 0 ) n = [];

            if (this._h.isString(n) && !this._h.isEmpty(n)) {
                n = [n];
            }
            if (!this._h.isArr(n) || n.length === 0) {
                return false
            }
            var wh      = this._h.getWinHash(),
                hash    = this._h.getTrueHash(wh),
                hsh_val = hash[0],
                hsh_que = hash[1],
                vt      = '',
                cl      = {};
            if (this._h.isEmpty(wh) || this._h.isEmpty(hsh_que)) {
                return false;
            }
            var que = this._h.getQuery(hsh_que);
            for (var i in que) {
                if (!que.hasOwnProperty(i)) {
                    continue
                }
                if (!n.includes(i)) {
                    cl[i] = que[i];
                }
            }
            if (!this._h.isEmpty(hsh_val)) {
                vt += hsh_val;
            }
            if (this._h.objSize(cl) !== 0) {
                vt += '?' + this._h.toQuery(cl);
            }
            this._h.setWinHash(vt);
            return true
        }
        
    };

    var setMethod = {

        /**
         * set the page hash.
         * @param {string} n
         * @returns boolean
         */
        set: function (n) {
            if ( n === void 0 ) n = '';

            if (!this._h.isString(n) || this._h.isEmpty(n)) {
                return false
            }
            this._h.setWinHash(n);
            return true
        },

        /**
         * set a value to location hash.
         * @param {string} n
         * @returns boolean
         */
        setValue: function (n) {
            if ( n === void 0 ) n = '';

            if (!this._h.isString(n) || this._h.isEmpty(n)) {
                return false
            }
            if (n.includes('?')) {
                n = this._h.replaceAll(n, '?', encodeURIComponent('?'));
            }
            var wh      = this._h.getWinHash(),
                hsh_que = this._h.getTrueHash(wh)[1];
            if (this._h.isEmpty(wh) || this._h.isEmpty(hsh_que)) {
                this._h.setWinHash(n);
                return true
            }
            this._h.setWinHash(n + '?' + hsh_que);
            return true
        },

        /**
         * set a query to location hash.
         * @param {object} n
         * @returns boolean
         */
        setQuery: function (n) {
            if ( n === void 0 ) n = {};

            if (!this._h.isObj(n) || n.length === 0) {
                return false
            }
            var wh   = this._h.getWinHash(),
                hash = this._h.getTrueHash(wh)[0],
                aq   = this._h.toQuery(n);
            if (this._h.isEmpty(wh) || this._h.isEmpty(hash)) {
                this._h.setWinHash('?' + aq);
                return true
            }
            this._h.setWinHash(hash + '?' + aq);
            return true
        }
        
    };

    // set all components as prototype to 'HashComponent'
    HashComponent.prototype.add         = addMethod.add;
    HashComponent.prototype.addValue    = addMethod.addValue;
    HashComponent.prototype.addQuery    = addMethod.addQuery;
    HashComponent.prototype.clear       = clearMethod.clear;
    HashComponent.prototype.clearValue  = clearMethod.clearValue;
    HashComponent.prototype.clearQuery  = clearMethod.clearQuery;
    HashComponent.prototype.event       = eventMethod.event;
    HashComponent.prototype.get         = getMethod.get;
    HashComponent.prototype.getValue    = getMethod.getValue;
    HashComponent.prototype.getQuery    = getMethod.getQuery;
    HashComponent.prototype.haveValue   = haveMethod.haveValue;
    HashComponent.prototype.haveQuery   = haveMethod.haveQuery;
    HashComponent.prototype.have        = haveMethod.have;
    HashComponent.prototype.info        = infoMethod.info;
    HashComponent.prototype.is          = isMethod.is;
    HashComponent.prototype.isValue     = isMethod.isValue;
    HashComponent.prototype.isQuery     = isMethod.isQuery;
    HashComponent.prototype.isLocked    = lockMethod.isLocked;
    HashComponent.prototype.unLock      = lockMethod.unLock;
    HashComponent.prototype.lock        = lockMethod.lock;
    HashComponent.prototype.updateQuery = queryMethod.updateQuery;
    HashComponent.prototype.remove      = removeMethod.remove;
    HashComponent.prototype.removeValue = removeMethod.removeValue;
    HashComponent.prototype.removeQuery = removeMethod.removeQuery;
    HashComponent.prototype.set         = setMethod.set;
    HashComponent.prototype.setValue    = setMethod.setValue;
    HashComponent.prototype.setQuery    = setMethod.setQuery;

    // default configs
    var default_configs = {
        getHashCallback: null,
        setHashCallback: null,
        getHashFilter: null,
        setHashFilter: null,
        getHrefCallback: null,
        window: null,
        log: true
    };

    // define all hash components into main handle
    var Hash = new HashComponent(default_configs);

    return Hash;

});
