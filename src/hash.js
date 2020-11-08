/* 
 * HashJs javascript library v1.4.1
 * Copyright (c) 2020 IRMMR
 * MIT License
 */
(function(window) {
    'use strict';

    const info = {
        hash_version : '1.4.1',
        pack_version : '1.5.1'
    }

    const emptyObj = Object.freeze({}),
        emptyFunc = function() {};

    function isDef(h) {
        return typeof h !== undefined && h !== null
    }

    function isUnDef(h) {
        return typeof h === undefined || h === null
    }

    function isString(h) {
        return isDef(h) && typeof h === 'string'
    }

    function isBool(h) {
        return isDef(h) && typeof h === 'boolean'
    }

    function getBool(h) {
        return (
            isDef(h) ? isBool(h) ? h : isString(h) ? h.toLowerCase() === 'true' : false : false
        )
    }

    function getAttr(h, attr) {
        return h.hasAttribute(attr) ? h.getAttribute(attr) : ""
    }

    function isObj(h) {
        return h !== null && typeof h === 'object'
    }

    function isFunc(h) {
        return isDef(h) && typeof h === 'function'
    }

    function replaceAll(h, a, b) {
        return h.split(a).join(b)
    }

    function lunchFunc(func, argc = null) {
        return isFunc(func) ? argc !== null ? func(argc) : func() : null;
    }

    function isEmpty(h) {
        return h === ''
    }

    function isNull(h) {
        return h == null
    }

    function objSize(h) {
        let size = 0, key;
        if (!isDef(h) || !isObj(h)) {
            return size;
        }
        for (key in h) {
            if (!h.hasOwnProperty(key)) {
                continue;
            }
            size ++;
        }
        return size;
    }

    function isArr(h) {
        return isDef(h) && Array.isArray(h)
    }

    function getString(h) {
        return isDef(h) ? isString(h) ? h : h.toString() : ''
    }

    function isQuery(q) {
        if (!isString(q)) {
            return false;
        }
        let qa = q.split('&'),
            itsQuery = 0;
        for (let i in qa) {
            if (!qa.hasOwnProperty(i)) {
                continue;
            }
            let dq = qa[i],
                da = dq.split('='),
                daLen = da.length;
            if (daLen === 2) {
                if (isString(da[0]) && isString(da[1])) {
                    itsQuery ++;
                }
            } else if (daLen === 1) {
                if (isString(da[0])) {
                    itsQuery ++;
                }
            }
        }
        return qa.length === itsQuery;
    }

    function getQuery(q) {
        if (!isString(q) || !isQuery(q)) {
            return {};
        }
        let qa = q.split('&'),
            myObj = {};
        for (let i in qa) {
            if (!qa.hasOwnProperty(i)) {
                continue;
            }
            let dq = qa[i],
                da = dq.split('='),
                daLen = da.length;
            if (daLen === 2) {
                let dOne = getString(da[0]);
                myObj[dOne] = decodeURIComponent(getString(da[1]));
            } else if (daLen === 1) {
                let dOne = getString(da[0]);
                myObj[dOne] = null;
            }
        }
        return myObj;
    }
    
    function toQuery(q) {
        if (!isDef(q) || !isObj(q)) {
            return '';
        }
        let allQuery = '',
            queSize = objSize(q),
            numData = 0;
        for (let i in q) {
            if (!q.hasOwnProperty(i)) {
                continue;
            }
            numData ++;
            let dataMe = q[i];
            if (isNull(dataMe)) {
                allQuery += numData === queSize ? i : i + '&';
            } else {
                let dataEncode = encodeURIComponent(isString(dataMe) ? dataMe : dataMe.toString());
                allQuery += numData === queSize ? i + '=' + dataEncode : i + '=' + dataEncode + '&';
            }
        }
        return allQuery;
    }

    function lenOfChar(t, q) {
        if (!t.includes(q)) {
            return 0;
        }
        return t.split('').filter(i => i === q).length;
    }

    function isTrueHash(q) {
        if (!isString(q)) {
            return false;
        }
        if (q.includes('?')) {
            let spt = q.split('?');
            if (spt.length == 2) {
                return isQuery(spt[1]);
            }
        }
        return true;
    }

    function getTrueHash(q) {
        if (!isString(q)) {
            return ['', ''];
        }
        let emp = [q, ''];
        if (!isTrueHash(q)) {
            return emp;
        }
        if (q.includes('?') && lenOfChar(q, '?') == 1) {
            let spt = q.split('?');
            if (spt.length == 2) {
                return spt;
            }
        }
        return emp;
    }

    function getWinHash() {
        let hsh = window.location.hash;
        if (hsh.startsWith('#')) {
            return hsh.slice(1);
        }
        return hsh;
    }

    function setWinHash(q) {
        window.location.hash = q;
    }
    
    // library main variables
    let hashMain, hashInfo, hashEvent;
    
    /**
     * Hash Event component
     */
    hashEvent = function(e, func = function() {}) {
        if (!isDef(e) || !isString(e)) {
            return;
        }
        let event   = e.toLowerCase(),
            evs     = event.split(',');
        func        = isDef(func) && isFunc(func) ? func : emptyFunc;
        for (let i in evs) {
            if (!evs.hasOwnProperty(i)) {
                continue;
            }
            let currentEv = replaceAll(evs[i], ' ', '');
            switch (currentEv) {
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
                    // Nothing to do
                    break;
            }
        }
    }

    /**
     * Hash Info component
     */
    hashInfo = function(h = {}) {
        return {
            hashVersion : isDef(info.hash_version) ? info.hash_version : '?',
            packVersion : isDef(info.pack_version) ? info.pack_version : '?',
        }
    }
    
    /**
     * Hash Main component
     */
    hashMain = function (h = {}) {
        this.realHash   = window.location.hash;
        this.cleanHash  = getWinHash();

        /**
         * Remove a hash string from location hash
         * @param {*} n 
         * @returns boolean
         */
        this.remove = function (n = []) {
            if (isString(n) && !isEmpty(n)) {
                n = [n];
            }
            if (!isArr(n) || n.length == 0) {
                return false;
            }
            let wh = getWinHash();
            if (isEmpty(wh)) {
                return false;
            }
            for (let i in n) {
                if (!n.hasOwnProperty(i)) {
                    continue;
                }
                let vl = n[i];
                if (getWinHash().includes(vl)) {
                    setWinHash(replaceAll(getWinHash(), vl, ''));
                }
            }
            return true;
        }

        /**
         * Remove a hash value from location hash
         * @param {*} n 
         * @returns boolean
         */
        this.removeValue = function (n = []) {
            if (isString(n) && !isEmpty(n)) {
                n = [n];
            }
            if (!isArr(n) || n.length == 0) {
                return false;
            }
            let wh = getWinHash(),
                gh = getTrueHash(wh),
                gv = gh[0],
                gq = gh[1],
                vt = '';
            if (isEmpty(wh) || isEmpty(gv)) {
                return false;
            }
            for (let i in n) {
                if (!n.hasOwnProperty(i)) {
                    continue;
                }
                let vl = n[i];
                if (gv.includes(vl)) {
                    gv = replaceAll(gv, vl, '');
                }
            }
            vt += gv;
            if (!isEmpty(gq)) {
                vt += '?' + gq;
            }
            setWinHash(vt);
            return true;
        }

        /**
         * Remove a hash query from location hash
         * @param {*} n 
         * @returns boolean
         */
        this.removeQuery = function (n = []) {
            if (isString(n) && !isEmpty(n)) {
                n = [n];
            }
            if (!isArr(n) || n.length == 0) {
                return false;
            }
            let wh = getWinHash(),
                gh = getTrueHash(wh),
                gv = gh[0],
                gq = gh[1],
                vt = '',
                cl = {};
            if (isEmpty(wh) || isEmpty(gq)) {
                return false;
            }
            let que = getQuery(gq);
            for (let i in que) {
                if (!que.hasOwnProperty(i)) {
                    continue;
                }
                if (!n.includes(i)) {
                    cl[i] = que[i];
                }
            }
            if (!isEmpty(gv)) {
                vt += gv;
            }
            vt += '?' + toQuery(cl);
            setWinHash(vt);
            return true;
        }

        /**
         * Check for location hash value
         * @param {*} n 
         * @returns boolean
         */
        this.haveValue = function (n = '') {
            if (!isString(n)) {
                return false;
            }
            let wh = getWinHash(),
                wg = getTrueHash(wh)[0];
            if (isEmpty(n)) {
                return !isEmpty(wg);
            }
            return wg.includes(n);
        }

        /**
         * Checking for query exists on location hash
         * @param {*} n 
         * @retuens boolean
         */
        this.haveQuery = function (n = []) {
            if (isString(n)) {
                n = [n];
            }
            if (!isArr(n)) {
                return false;
            }
            let wh = getWinHash(),
                wq = getTrueHash(wh)[1];
            if (n.length == 0) {
                return !isEmpty(wq);
            }
            if (!isQuery(wq)) {
                return false;
            }
            let que = getQuery(wq);
            for (let i in n) {
                if (!n.hasOwnProperty(i)) {
                    continue;
                }
                if (!que.hasOwnProperty(n[i])) {
                    return false;
                }
            }
            return true;
        }

        /**
         * Check or searching for a string in hash
         * @param {*} n 
         * @returns boolean
         */
        this.have = function (n = '') {
            if (!isString(n)) {
                return false;
            }
            let wh = getWinHash();
            if (isEmpty(wh)) {
                return false;
            }
            if (isEmpty(n)) {
                return true;
            }
            return wh.includes(n);
        }

        /**
         * Clear the page hash
         * @param {*} n 
         * @returns boolean
         */
        this.clear = function (n = true) {
            if (!isBool(n)) {
                return false;
            }
            window.location.hash = '';
            if (n) {
                history.pushState(null, null, window.location.href.split('#')[0]);
            }
            return true;
        }

        /**
         * Clear hash value from location hash
         * @returns boolean
         */
        this.clearValue = function () {
            let wh = getWinHash();
            if (!isTrueHash(wh)) {
                return false;
            }
            let wg = getTrueHash(wh)[1];
            setWinHash('?' + wg);
            return true;
        }

        /**
         * Clear hash query from location hash
         * @returns boolean
         */
        this.clearQuery = function () {
            let wh = getWinHash();
            if (!isTrueHash(wh)) {
                return false;
            }
            let wg = getTrueHash(wh)[0];
            setWinHash(wg);
            return true;
        }

        /**
         * An easy way to get location hash 
         * @param {*} n 
         * @returns string
         */
        this.get = function (n = {}) {
            return getWinHash();
        }

        /**
         * Get location hash value
         * @param {*} n 
         * @returns string
         */
        this.getValue = function (n = {}) {
            let wh = getWinHash();
            if (isEmpty(wh)) {
                return '';
            }
            let gh = getTrueHash(wh)[0];
            return gh;
        }

        /**
         * Get the location hash query
         * @param {*} n 
         * @returns object
         */
        this.getQuery = function (n = []) {
            if (isString(n)) {
                n = [n];
            }
            if (!isArr(n)) {
                return {};
            }
            let wh = getWinHash();
            if (isEmpty(wh)) {
                return {};
            }
            let gq = getTrueHash(wh)[1];
            if (isEmpty(gq) || !isQuery(gq)) {
                return {};
            }
            let que = getQuery(gq);
            if (n.length !== 0) {
                let ans = {};
                for (let i in n) {
                    if (!n.hasOwnProperty(i)) {
                        continue;
                    }
                    if (que.hasOwnProperty(n[i])) {
                        let v = n[i];
                        ans[v] = que[v];
                    }
                }
                return ans;
            }
            return que;
        }

        /**
         * Set the page hash
         * @param {*} n 
         * @returns boolean
         */
        this.set = function (n = '') {
            if (!isString(n) || isEmpty(n)) {
                return false;
            }
            setWinHash(n);
            return true;
        }

        /**
         * Set a value to location hash
         * @param {*} n 
         * @returns boolean
         */
        this.setValue = function (n = '') {
            if (!isString(n) || isEmpty(n)) {
                return false;
            }
            if (n.includes('?')) {
                n = replaceAll(n, '?', encodeURIComponent('?'));
            }
            let wh = getWinHash(),
                gq = getTrueHash(wh)[1];
            if (isEmpty(wh) || isEmpty(gq)) {
                setWinHash(n);
                return true;
            }
            setWinHash(n + '?' + gq);
            return true;
        }

        /**
         * Set a query to location hash
         * @param {*} n 
         * @returns boolean
         */
        this.setQuery = function (n = {}) {
            if (!isObj(n) || n.length == 0) {
                return false;
            }
            let wh = getWinHash(),
                gh = getTrueHash(wh)[0],
                aq = toQuery(n);
            if (isEmpty(wh) || isEmpty(gh)) {
                setWinHash('?' + aq);
                return true;
            }
            setWinHash(gh + '?' + aq);
            return true;
        }

        /**
         * Add a string to location hash
         * @param {*} n 
         * @returns boolean
         */
        this.add = function(n = '') {
            if (!isString(n) || isEmpty(n)) {
                return false;
            }
            let wh = getWinHash();
            if (isEmpty(wh)) {
                setWinHash(n);
                return true;
            }
            setWinHash(wh + n);
            return true;
        }

        /**
         * Add a value to location hash
         * @param {*} n 
         * @returns boolean
         */
        this.addValue = function (n = '') {
            if (!isString(n) || isEmpty(n)) {
                return false;
            }
            if (n.includes('?')) {
                n = replaceAll(n, '?', encodeURIComponent('?'));
            }
            let wh = getWinHash(),
                gh = getTrueHash(wh),
                gv = gh[0],
                gq = gh[1];
            if (!isEmpty(gv)) {
                n = gv + n;
            }
            if (!isEmpty(gq)) {
                n += '?' + gq;
            }
            setWinHash(n);
            return true;
        }

        /**
         * Add a query to location hash
         * @param {*} n 
         * @returns boolean
         */
        this.addQuery = function (n = {}) {
            if (!isObj(n) || n.length == 0) {
                return false;
            }
            let wh = getWinHash(),
                gh = getTrueHash(wh),
                gv = gh[0], gq = gh[1],
                vl = '';
            if (!isEmpty(gq)) {
                let oq = getQuery(gq);
                for (let i in oq) {
                    if (!oq.hasOwnProperty(i) || n.hasOwnProperty(i)) {
                        continue;
                    }
                    n[i] = oq[i];
                }
            }
            if (!isEmpty(gv)) {
                vl += gv;
            }
            vl += '?' + toQuery(n);
            setWinHash(vl);
            return true;
        }
       
        /**
         * Update a query value in location hash
         * @param {*} n 
         * @param {*} e 
         * @returns boolean
         */
        this.updateQuery = function (n, e = '') {
            if (!isString(n) || !(isString(e) || isNull(e))) {
                return false;
            }
            let wh = getWinHash(),
                gh = getTrueHash(wh),
                gv = gh[0],
                gq = gh[1],
                vl = '',
                cl = {},
                ch = 0;
            if (isEmpty(gq)) {
                return false;
            }
            if (!isEmpty(gv)) {
                vl += gv;
            }
            let que = getQuery(gq);
            for (let i in que) {
                if (!que.hasOwnProperty(i)) {
                    continue;
                }
                if (i == n) {
                    cl[i] = e;
                    ch ++;
                } else {
                    cl[i] = que[i];
                }
            }
            vl += '?' + toQuery(cl);
            setWinHash(vl);
            return ch !== 0;
        }

        /**
         * Lock the page hash
         * @param {*} n 
         * @returns boolean
         */
		this.lock = function(n = {}) {
            if (!isDef(n) || !isObj(n)) {
                return false;
            }
            const wh = window.location.hash;
			window.onhashchange = function() {
				window.location.hash = wh;
			}
			return true;
        }
        
        /**
         * Checking with equals in location hash
         * @param {*} n 
         * @returns boolean
         */
        this.is = function (n = '') {
            if (!isString(n)) {
                return false;
            }
            return getWinHash() == n;
        }

        /**
         * Checking for value string in location hash
         * @param {*} n 
         * @return boolean
         */
        this.isValue = function (n = '') {
            if (!isString(n)) {
                return false;
            }
            let wh = getWinHash(),
                gh = getTrueHash(wh)[0];
            return gh == n;
        }

        /**
         * Check for query value in location hash
         * @param {*} n 
         * @param {*} e 
         * @returns boolean
         */
        this.isQuery = function (n, e = '') {
            if (!isString(n) || isEmpty(n) || (!isString(e) && !isNull(e))) {
                return false;
            }
            let wh = getWinHash(),
                gq = getTrueHash(wh)[1];
            if (isEmpty(gq)) {
                return false;
            }
            let que = getQuery(gq);
            if (!que.hasOwnProperty(n)) {
                return false;
            }
            return que[n] == e;
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
        lib : hashMain,
        info : hashInfo,
        event : hashEvent,
        ready : true
    }
    
    /**
     * Load and manage hash library
     */
    let LoadHash = false;
    if (typeof define === 'function' && define.amd) {
        define(Hash);
        LoadHash = true;
    } else {
        window.Hash = Hash;
        LoadHash = true;
    }
    if (typeof exports === 'object') {
        module.exports = Hash();
        LoadHash = true;
    }
    if (LoadHash && 'location' in window && isObj(window.location)) {
        window.location.HashModule = {
            lib : new Hash.lib(),
            info : Hash.info(),
            event : function (e, f = function() {}) {
                return Hash.event(e, f);
            }
        };
    }
})(window);