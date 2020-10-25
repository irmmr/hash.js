/* 
* HashJs javascript library v1.3 (V1.2.4 rewrite)
* Copyright (c) 2020 IRMMR
* MIT License
*/
(function(window) {
    'use strict';

    let info = {
        hash_version : '1.3',
        pack_version : '1.4'
    }

    let emptyObj = Object.freeze({}),
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
        return h.replace(new RegExp(a, 'g'), b)
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
                myObj[dOne] = getString(da[1]);
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
            let dataMe = q[i],
                dataAdd = isString(dataMe) ? dataMe : dataMe.toString(),
                dataEncode = encodeURIComponent(dataAdd);
            allQuery += numData === queSize ? i + '=' + dataEncode : i + '=' + dataEncode + '&';
        }
        return allQuery;
    }
    
    // library main variables
    let hashMain, hashInfo, hashEl, hashEvent;
    
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
            switch(currentEv) {
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
        this.hashVersion = isDef(info.hash_version) ? info.hash_version : '?';
        this.packVersion = isDef(info.pack_version) ? info.pack_version : '?';
        this.addons = {
            load : typeof Hash.load !== 'undefined',
            spa : typeof Hash.spa !== 'undefined',
            server : typeof Hash.server !== 'undefined'
        }
    }
    
    /**
     * Hash Main component
     */
    hashMain = function(h = {}) {
        this.hash = window.location.hash;
        this.href = window.location.href;

        /**
         * Remove a hash value or hash query
         * @param {*} n 
         * @returns boolean
         */
        this.remove = function(n = {}) {
            if (!isDef(n) || !isObj(n)) {
                return false;
            }
            if ('words' in n) {
                let words = n.words;
                if (!isArr(words)) {
                    return false;
                }
                words = Array.from(new Set(words));
                words = words.filter(val => val !== '');
                for (let i=0 ; i<words.length ; i++) {
                    let wh = window.location.hash;
                    window.location.hash = replaceAll(wh, words[i], '');
                    window.location.hash = replaceAll(wh, escape(words[i]), '');
                }
                return true;
            }
            if ('query' in n) {
                let que = n.query,
                    wh = window.location.hash.slice(1);
                if (!isArr(que) || !isQuery(wh)) {
                    return false;
                }
                let theQuery = getQuery(wh),
                    newQuery = {};
                for (let i in theQuery) {
                    if (!theQuery.hasOwnProperty(i)) {
                        continue;
                    }
                    for (let t in que) {
                        if (!que.hasOwnProperty(t)) {
                            continue;
                        }
                        if (i !== que[t]) {
                            newQuery[i] = theQuery[i];
                        }
                    }
                }
                window.location.hash = toQuery(newQuery);
                return true;
            }
            return false;
        }

        /**
         * Get document referrer or reference
         * @param {*} n 
         * @returns boolean|string
         */
        this.ref = function(n = '') {
            if (!isEmpty(n) && isString(n)) {
                let ref = document.referrer;
                return !isEmpty(ref) ? ref === n : false;
            } else {
                return document.referrer;
            }
        }

        /**
         * Check or searching for a value or query in hash
         * @param {*} n 
         * @param {*} s 
         * @returns boolean
         */
        this.have = function (n = '', s = '') {
            if (!isString(n)) {
                return false;
            }
            let type = isEmpty(s) || !isString(s) ? 'value' : s,
                wh = window.location.hash;
            if (isEmpty(wh)) {
                return false;
            }
            wh = wh.slice(1);
            switch(type) {
                case 'value' :
                    return wh.includes(n);
                case 'query' :
                    if (isQuery(wh)) {
                        return getQuery(wh).hasOwnProperty(n);
                    }
                break;
            }
            return false;
        }

        /**
         * Clear the page hash
         * @param {*} n 
         * @returns boolean
         */
        this.clear = function(n = {}) {
            if (!isDef(n) || !isObj(n)) {
                return false;
            }
            let sharp = 'sharp' in n ? isBool(n.sharp) ? n.sharp : true : true;
            window.location.hash = '';
            if (sharp) {
                history.pushState(null, null, window.location.href.split('#')[0]);
            }
            return true;
        }

        /**
         * Getting the page hash based on query and string
         * @param {*} without 
         * @param {*} n 
         * @returns object|string|null
         */
        this.get = function(without = true, n = {}) {
            if (!isDef(without) || !isBool(without) || !isDef(n) || !isObj(n)) {
                return false;
            }
            let wh = window.location.hash.slice(1);
            if ('query' in n) {
                let que = n.query,
                    ansQuery = {};
                if (!isQuery(wh)) {
                    return {};
                }
                let theQuery = getQuery(wh);
                if (isString(que)) {
                    if (que === '*') {
                        for (let i in theQuery) {
                            if (!theQuery.hasOwnProperty(i)) {
                                continue;
                            }
                            ansQuery[i] = theQuery[i];
                        }
                    } else {
                        for (let i in theQuery) {
                            if (i === que && theQuery.hasOwnProperty(i)) {
                                ansQuery[i] = theQuery[i];
                            }
                        }
            
                    }
                } else if (isArr(que)) {
                    for (let i in que) {
                        if (!que.hasOwnProperty(i)) {
                            continue;
                        }
                        let thisQ = que[i];
                        if (theQuery.hasOwnProperty(thisQ)) {
                            ansQuery[thisQ] = theQuery[thisQ];
                        }
                    }
                }
                return ansQuery;
            } else if (isArr(que)) {
                return without ? window.location.hash.slice(1) : window.location.hash;
            }
            return null;
        }

        /**
         * Set the page hash
         * @param {*} n 
         * @returns boolean
         */
        this.set = function(n = {}) {
            if (!isDef(n) || !isObj(n)) {
                return false;
            }
            if ('val' in n) {
                let val = n.val;
                if (isString(val)) {
                    window.location.hash = val;
                    return true;
                }
            } else if ('query' in n) {
                let que = n.query;
                if (isObj(que)) {
                    window.location.hash = toQuery(que);
                    return true;
                }
            }
            return false;
        }

        /**
         * Add a value or query to page hash
         * @param {*} n 
         * @returns boolean
         */
        this.add = function(n = {}) {
            if (!isDef(n) || !isObj(n)) {
                return false;
            }
            if ('val' in n) {
                let val = n.val;
                if (isString(val)) {
                    window.location.hash += val;
                    return true;
                }
            } else if ('query' in n) {
                let que = n.query,
                    wh = window.location.hash.slice(1);
                if (!isObj(que)) {
                    return false;
                }
                let theQue = toQuery(que);
                if (!isEmpty(wh) && isQuery(wh)) {
                    if (!isEmpty(theQue)) {
                        window.location.hash = !wh.endsWith('&') ? wh + '&' + theQue : wh + theQue;
                        return true;
                    }
                } else if (isEmpty(wh)) {
                    window.location.hash = theQue;
                    return true;
                }
            }
            return false;
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
         * Checking for hash value or query that equals or not
         * @param {*} hash 
         * @param {*} n 
         * @returns boolean
         */
        this.is = function(hash, n = {}) {
            if (!isString(hash) || !isDef(n) || !isObj(n)) {
                return false;
            }
            let wh = window.location.hash.slice(1);
            if (isEmpty(hash)) {
                return false;
            }
            if ('query' in n) {
                let que = n.query;
                if (!isQuery(wh) || !isString(que)) {
                    return false;
                }
                let theQuery = getQuery(wh);
                if (theQuery.hasOwnProperty(que)) {
                    return theQuery[que] === hash;
                }
            }
            return wh === hash;
        }

    }
    
    /**
     * Hash Element component
     */
    hashEl = function(h = {}) {

        /**
         * Replace string by all targets goal
         * @param {*} n 
         * @returns boolean
         */
        this.replace = function(n = {}) {
            if (!('text' in n)) {
                return '';
            }
            let val = isString(n.text) ? n.text : '',
                rep = 'replace' in n ? Array.isArray(n.replace) ? n.replace : [n.replace] : [];
            rep = Array.from(new Set(rep));
            for (let i=0 ; i<rep.length ; i++) {
                let re = rep[i];
                if (!isObj(re) || !('from' in re) || !('to' in re)) {
                    continue;
                }
                let toRep = re.to,
                    fromRep = re.from;
                if (isNull(toRep) || isNull(fromRep) || !val.includes(fromRep)) {
                    continue;
                }
                val = replaceAll(val, fromRep, toRep);
            }
            return val;
        }
    }
    
    /**
     * Hash library main variables.
     * Hash.lib     - main lib
     * Hash.info    - lib info
     * Hash.el      - elements components
     * Hash.event   - lib event
     * Hash.ready   - only returns true!
     */
    const Hash = {
        lib : hashMain,
        info : hashInfo,
        el : hashEl,
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
})(window);