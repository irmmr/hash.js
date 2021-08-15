/* 
 * HashJs javascript library v1.5.1
 * Copyright (c) 2021 irmmr
 * MIT License
 * 
 * https://github.com/irmmr/hash.js
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.Hash = factory())
}(this, (function() {
    // defines that JavaScript code should be executed in "strict mode"
    // i read it on w3schools :)
    'use strict'

    // main information of library such is versions
    const info = {
        version : '1.5.1'
    }

    // blank variables for use in return of functions
    const emptyObj = Object.freeze({}),
        emptyFunc = function() {}

    /**
     * check if the variable is defined.
     * @param {*} h The input variable of check
     * @returns {boolean}
     */
    function isDef(h) {
        return typeof h !== undefined && h !== null
    }

    /**
     * check if variable is not defined.
     * @param {*} h The input variable of check
     * @returns 
     */
    function isUnDef(h) {
        return typeof h === undefined || h === null
    }

    /**
     * check if the type of variable is string.
     * @param {*} h The input variable of check
     * @returns 
     */
    function isString(h) {
        return isDef(h) && typeof h === 'string'
    }

    /**
     * check if the type of variable is boolean
     * @param {*} h The input variable of check
     * @returns 
     */
    function isBool(h) {
        return isDef(h) && typeof h === 'boolean'
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
     * Get attribute value if exists
     * @param {*} el     Element
     * @param {*} attr   Attribute name
     * @returns 
     */
    function getAttr(el, attr) {
        return el.hasAttribute(attr) ? el.getAttribute(attr) : ""
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
        return isDef(h) && typeof h === 'function'
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
     * @param {string}  func Function name
     * @param {*}       argc Funtion arguments
     * @returns 
     */
    function lunchFunc(func, argc = null) {
        return isFunc(func) ? argc !== null ? func(argc) : func() : null
    }

    /**
     * check if the type of variable is number.
     * @param {*} h The input data
     * @returns 
     */
     function isNum(h) {
        return isDef(h) && Number.isNaN(Number(h))
    }

    /**
     * check if the value of variable is empty.
     * @param {*} h The input data
     * @returns 
     */
    function isEmpty(h) {
        return h === ''
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
        let size = 0, key
        if (!isDef(h) || !isObj(h)) {
            return size
        }
        for (key in h) {
            if (h.hasOwnProperty(key)) {
                size ++
            }
        }
        return size
    }

    /**
     * split just one time is string.
     * @param {string} string The input string
     * @param {string} delim  The delim for split
     * @returns 
     */
    function splitOnce(string, delim) {
        let components = string.split(delim)
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
        return isDef(h) ? isString(h) ? h : h.toString() : ''
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
            q = '?' + q
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
        let qa = q.split('&'),
            output = {}
        for (let i in qa) {
            if (!qa.hasOwnProperty(i)) {
                continue
            }
            let query    = qa[i],
                q_parse  = splitOnce(query, '='),
                q_len    = q_parse.length,
                needle   = getString(q_parse[0])
            if (isEmpty(query)) {
                continue
            }
            if (q_len === 2) {
                let val        = getString(q_parse[1])
                output[needle] = decodeURIComponent(val)
            } else {
                output[needle] = null
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
    function toQuery(q, encode_uri = false) {
        if (!isDef(q) || !isObj(q)) {
            return ''
        }
        let all_query = '',
            que_size  = objSize(q),
            num_data  = 0
        for (let i in q) {
            if (!q.hasOwnProperty(i)) {
                continue
            }
            num_data ++
            let data_val = q[i]
            if (isNull(data_val)) {
                all_query += num_data === que_size ? i : i + '&'
            } else {
                let data_str    = getString(data_val),
                    data_encode = encode_uri ? encodeURIComponent(data_str) : data_str
                all_query += num_data === que_size ? i + '=' + data_encode : i + '=' + data_encode + '&'
            }
        }
        return all_query
    }

    /**
     * get length of all "q" in "t".
     * @param {string} t The input string
     * @param {string} q The input char/string
     * @returns 
     */
    function lenOfChar(t, q) {
        if (!t.includes(q)) {
            return 0
        }
        return t.split('').filter(i => i === q).length
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
            let spt = q.split('?')
            if (spt.length == 2) {
                return isQuery(spt[1])
            }
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
        let emp = [q, '']
        if (!isTrueHash(q)) {
            return emp
        }
        if (q.includes('?')) {
            let spt = q.split('?')
            if (spt.length == 2) {
                return spt
            }
        }
        return emp
    }

    /**
     * get the value of window hash.
     * @returns 
     */
    function getWinHash() {
        let hsh = window.location.hash
        return hsh.startsWith('#') ? hsh.slice(1) : hsh
    }

    /**
     * set the window hash.
     * @param {string} q Hash value
     */
    function setWinHash(q) {
        window.location.hash = q
    }
    
    // library main variables
    let hashMain, hashInfo, hashEvent
    
    /**
     * Hash Event component
     */
    hashEvent = function(e, func = function() {}) {
        if (!isDef(e) || !isString(e)) {
            return
        }
        let event   = e.toLowerCase(),
            evs     = event.split(',')
            func    = isDef(func) && isFunc(func) ? func : emptyFunc
        for (let i in evs) {
            if (!evs.hasOwnProperty(i)) {
                continue
            }
            let current_ev = replaceAll(evs[i], ' ', '')
            switch (current_ev) {
                case 'change' :
                    window.addEventListener('hashchange', func);
                    break;
                case 'load' :
                    window.addEventListener('load', func);
                    break;
                case 'ready' :
                    lunchFunc(func);
                    break;
                default :
                    // nothing to do
                    break;
            }
        }
    }

    /**
     * Hash Info component
     */
    hashInfo = function(h = {}) {
        return {
            version : isDef(info.version) ? info.version : '?'
        }
    }
    
    /**
     * Hash Main component
     */
    hashMain = function (h = {}) {
        this.realHash   = window.location.hash
        this.cleanHash  = getWinHash()
        
        /**
         * remove a string from location hash.
         * @param {string|array} n The words/chars list
         * @returns boolean
         */
        this.remove = function (n = []) {
            if (isString(n) && !isEmpty(n)) {
                n = [n]
            }
            if (!isArr(n) || n.length == 0) {
                return false
            }
            let wh = getWinHash()
            if (isEmpty(wh)) {
                return false
            }
            for (let i in n) {
                if (!n.hasOwnProperty(i)) {
                    continue
                }
                let vl = n[i]
                if (getWinHash().includes(vl)) {
                    setWinHash(
                        replaceAll(
                            getWinHash(),vl, ''
                        )
                    );
                }
            }
            return true
        }

        /**
         * remove a value from location hash.
         * @param {string|array} n The words list
         * @returns boolean
         */
        this.removeValue = function (n = []) {
            if (isString(n) && !isEmpty(n)) {
                n = [n]
            }
            if (!isArr(n) || n.length == 0) {
                return false
            }
            let wh      = getWinHash(),
                hash    = getTrueHash(wh),
                hsh_val = hash[0],
                hsh_que = hash[1],
                vt      = ''
            if (isEmpty(wh) || isEmpty(hsh_val)) {
                return false
            }
            for (let i in n) {
                if (!n.hasOwnProperty(i)) {
                    continue
                }
                let vl = n[i]
                if (hsh_val.includes(vl)) {
                    hsh_val = replaceAll(hsh_val, vl, '')
                }
            }
            vt += hsh_val
            if (!isEmpty(hsh_que)) {
                vt += '?' + hsh_que
            }
            setWinHash(vt)
            return true
        }

        /**
         * remove a query from location hash.
         * @param {string|array} n 
         * @returns boolean
         */
        this.removeQuery = function (n = []) {
            if (isString(n) && !isEmpty(n)) {
                n = [n]
            }
            if (!isArr(n) || n.length == 0) {
                return false
            }
            let wh      = getWinHash(),
                hash    = getTrueHash(wh),
                hsh_val = hash[0],
                hsh_que = hash[1],
                vt      = '',
                cl      = {}
            if (isEmpty(wh) || isEmpty(hsh_que)) {
                return false;
            }
            let que = getQuery(hsh_que)
            for (let i in que) {
                if (!que.hasOwnProperty(i)) {
                    continue
                }
                if (!n.includes(i)) {
                    cl[i] = que[i]
                }
            }
            if (!isEmpty(hsh_val)) {
                vt += hsh_val
            }
            vt += '?' + toQuery(cl)
            setWinHash(vt)
            return true
        }

        /**
         * check for location hash value.
         * @param {string} n 
         * @returns boolean
         */
        this.haveValue = function (n = '') {
            if (!isString(n)) {
                return false
            }
            let wh = getWinHash(),
                wg = getTrueHash(wh)[0]
            if (isEmpty(n)) {
                return !isEmpty(wg)
            }
            return wg.includes(n)
        }

        /**
         * checking for query exists on location hash.
         * @param {string|array} n 
         * @retuens boolean
         */
        this.haveQuery = function (n = []) {
            if (isString(n)) {
                n = [n]
            }
            if (!isArr(n)) {
                return false
            }
            let wh = getWinHash(),
                wq = getTrueHash(wh)[1]
            if (n.length == 0) {
                return !isEmpty(wq)
            }
            if (!isQuery(wq)) {
                return false
            }
            let que = getQuery(wq)
            for (let i in n) {
                if (!n.hasOwnProperty(i)) {
                    continue
                }
                if (!que.hasOwnProperty(n[i])) {
                    return false
                }
            }
            return true
        }

        /**
         * check or searching for a string in hash.
         * @param {string|array} n 
         * @returns boolean
         */
        this.have = function (n = '') {
            if (!isString(n)) {
                return false
            }
            let wh = getWinHash()
            if (isEmpty(wh)) {
                return false
            }
            if (isEmpty(n)) {
                return true
            }
            return wh.includes(n)
        }

        /**
         * clear the page hash.
         * @param {boolean} n 
         * @returns boolean
         */
        this.clear = function (n = true) {
            if (!isBool(n)) {
                return false
            }
            window.location.hash = ''
            if (n) {
                history.pushState(null, null, window.location.href.split('#')[0])
            }
            return true
        }

        /**
         * clear hash value from location hash.
         * @returns boolean
         */
        this.clearValue = function () {
            let wh = getWinHash()
            if (!isTrueHash(wh)) {
                return false
            }
            let wg = getTrueHash(wh)[1]
            setWinHash('?' + wg)
            return true
        }

        /**
         * clear hash query from location hash.
         * @returns boolean
         */
        this.clearQuery = function () {
            let wh = getWinHash()
            if (!isTrueHash(wh)) {
                return false
            }
            let wg = getTrueHash(wh)[0]
            setWinHash(wg)
            return true
        }

        /**
         * an easy way to get location hash.
         * @param {*} n
         * @returns string
         */
        this.get = function (n = {}) {
            return getWinHash()
        }

        /**
         * get location hash value.
         * @param {*} n
         * @returns string
         */
        this.getValue = function (n = {}) {
            let wh = getWinHash()
            return isEmpty(wh) ? '' : getTrueHash(wh)[0]
        }

        /**
         * get the location hash query.
         * @param {string|array} n 
         * @returns object
         */
        this.getQuery = function (n = []) {
            if (isString(n)) {
                n = [n]
            }
            if (!isArr(n)) {
                return {}
            }
            let wh = getWinHash()
            if (isEmpty(wh)) {
                return {}
            }
            let hsh_que = getTrueHash(wh)[1]
            if (isEmpty(hsh_que) || !isQuery(hsh_que)) {
                return {}
            }
            let que = getQuery(hsh_que)
            if (n.length === 1) {
                return que.hasOwnProperty(n[0]) ? que[n[0]] : ''
            } else if (n.length !== 0) {
                let ans = {}
                for (let i in n) {
                    if (n.hasOwnProperty(i) && que.hasOwnProperty(n[i])) {
                        let v  = n[i]
                        ans[v] = que[v]
                    }
                }
                return ans
            }
            return que
        }

        /**
         * set the page hash.
         * @param {string} n 
         * @returns boolean
         */
        this.set = function (n = '') {
            if (!isString(n) || isEmpty(n)) {
                return false
            }
            setWinHash(n)
            return true
        }

        /**
         * set a value to location hash.
         * @param {string} n 
         * @returns boolean
         */
        this.setValue = function (n = '') {
            if (!isString(n) || isEmpty(n)) {
                return false
            }
            if (n.includes('?')) {
                n = replaceAll(n, '?', encodeURIComponent('?'))
            }
            let wh      = getWinHash(),
                hsh_que = getTrueHash(wh)[1]
            if (isEmpty(wh) || isEmpty(hsh_que)) {
                setWinHash(n)
                return true
            }
            setWinHash(n + '?' + hsh_que)
            return true
        }

        /**
         * set a query to location hash.
         * @param {object} n 
         * @returns boolean
         */
        this.setQuery = function (n = {}) {
            if (!isObj(n) || n.length == 0) {
                return false
            }
            let wh   = getWinHash(),
                hash = getTrueHash(wh)[0],
                aq   = toQuery(n)
            if (isEmpty(wh) || isEmpty(hash)) {
                setWinHash('?' + aq)
                return true
            }
            setWinHash(hash + '?' + aq)
            return true
        }

        /**
         * add a string to location hash.
         * @param {string} n 
         * @returns boolean
         */
        this.add = function(n = '') {
            if (!isString(n) || isEmpty(n)) {
                return false
            }
            let wh = getWinHash()
            if (isEmpty(wh)) {
                setWinHash(n)
                return true
            }
            setWinHash(wh + n)
            return true
        }

        /**
         * add a value to location hash.
         * @param {string} n 
         * @returns boolean
         */
        this.addValue = function (n = '') {
            if (!isString(n) || isEmpty(n)) {
                return false
            }
            if (n.includes('?')) {
                n = replaceAll(n, '?', encodeURIComponent('?'))
            }
            let wh      = getWinHash(),
                hash    = getTrueHash(wh),
                hsh_val = hash[0],
                hsh_que = hash[1]
            if (!isEmpty(hsh_val)) {
                n = hsh_val + n
            }
            if (!isEmpty(hsh_que)) {
                n += '?' + hsh_que
            }
            setWinHash(n)
            return true
        }

        /**
         * add a query to location hash.
         * @param {*} n 
         * @returns boolean
         */
        this.addQuery = function (n = {}) {
            if (!isObj(n) || n.length == 0) {
                return false
            }
            let wh      = getWinHash(),
                hash    = getTrueHash(wh),
                hsh_val = hash[0],
                hsh_que = hash[1],
                vl      = ''
            if (!isEmpty(hsh_que)) {
                let oq  = getQuery(hsh_que)
                n       = Object.assign(oq, n)
            }
            if (!isEmpty(hsh_val)) {
                vl += hsh_val
            }
            vl += '?' + toQuery(n)
            setWinHash(vl)
            return true
        }
       
        /**
         * update a query value in location hash.
         * @param {string} n 
         * @param {string|null|number} e 
         * @returns boolean
         */
        this.updateQuery = function (n, e) {
            if (!isString(n) || !(isString(e) || isNum(e) || isNull(e))) {
                return false
            }
            let wh      = getWinHash(),
                hash    = getTrueHash(wh),
                hsh_val = hash[0],
                hsh_que = hash[1],
                vl      = '',
                cl      = {},
                ch      = 0
            if (isEmpty(hsh_que)) {
                return false
            }
            if (!isEmpty(hsh_val)) {
                vl += hsh_val
            }
            let que = getQuery(hsh_que)
            for (let i in que) {
                if (!que.hasOwnProperty(i)) {
                    continue
                }
                if (i == n) {
                    cl[i] = e
                    ch ++
                } else {
                    cl[i] = que[i]
                }
            }
            vl += '?' + toQuery(cl)
            setWinHash(vl)
            return ch !== 0
        }

        /**
         * lock the page hash.
         * @param {object} n 
         * @returns boolean
         */
		this.lock = function(n = {}) {
            if (!isDef(n) || !isObj(n)) {
                return false
            }
            const wh = getWinHash()
			window.onhashchange = function() {
				setWinHash(wh)
			}
			return true
        }
        
        /**
         * checking with equals in location hash.
         * @param {string} n 
         * @returns boolean
         */
        this.is = function (n = '') {
            if (!isString(n)) {
                return false
            }
            return getWinHash() == n
        }

        /**
         * checking for value string in location hash.
         * @param {string} n 
         * @return boolean
         */
        this.isValue = function (n = '') {
            if (!isString(n)) {
                return false
            }
            let wh = getWinHash(),
                hash = getTrueHash(wh)[0]
            return hash == n
        }

        /**
         * check for query value in location hash.
         * @param {string} n 
         * @param {string|null|number} e 
         * @returns boolean
         */
        this.isQuery = function (n, e) {
            if (!isString(n) || isEmpty(n) || (!isString(e) && !isNum(e) && !isNull(e))) {
                return false
            }
            let wh      = getWinHash(),
                hsh_que = getTrueHash(wh)[1]
            if (isEmpty(hsh_que)) {
                return false
            }
            let que = getQuery(hsh_que)
            if (!que.hasOwnProperty(n)) {
                return false
            }
            return que[n] == e
        }

    }
    
    /**
     * Hash library main variables.
     * Hash.lib     - main lib
     * Hash.info    - lib info
     * Hash.event   - lib event
     * Hash.ready   - only returns true!
     */
    const Hash = {
        lib     : hashMain,
        info    : hashInfo,
        event   : hashEvent,
        ready   : true
    }
    
    /**
     * Load and manage hash library
     */
    if ('location' in window && isObj(window.location)) {
        window.location.HashModule = {
            lib     : new Hash.lib(),
            info    : Hash.info(),
            event   : function (e, f = function() {}) {
                return Hash.event(e, f)
            }
        }
    }

    // return the library handle
    return Hash
})))