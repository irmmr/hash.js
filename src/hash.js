/* 
* HashJs javascript library v1.2.4
* Copyright (c) 2020 IRMMR
* MIT License
*/
( function ( window ) {
    'use strict';

    let info = {
        hash_version : '1.2.4',
        pack_version : '1.3.0'
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
        if (isDef(h) && isObj(h)) {
            for(key in h) {
                if (h.hasOwnProperty(key)) {
                    size ++;
                }
            }
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
        if (isString(q)) {

            let qa = q.split('&'),
                itsQuery = 0;

            for (let i in qa) {

                if (qa.hasOwnProperty(i)) {
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

            }

            return qa.length === itsQuery;

        }

        return false;
    }

    function getQuery(q) {
        if (isString(q)) {

            if (isQuery(q)) {

                let qa = q.split('&'),
                    myObj = {};

                for (let i in qa) {

                    if (qa.hasOwnProperty(i)) {
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

                }

                return myObj;
            }

        }

        return {};
    }

    function toQuery(q) {
        if (isDef(q) && isObj(q)) {

            let allQuery = '',
                queSize = objSize(q),
                numData = 0;

            for (let i in q) {

                if (q.hasOwnProperty(i)) {

                    numData ++;

                    let dataMe = q[i],
                        dataAdd = isString(dataMe) ? dataMe : dataMe.toString(),
                        dataEncode = encodeURIComponent(dataAdd);

                    allQuery += numData === queSize ? i + '=' + dataEncode : i + '=' + dataEncode + '&';

                }

            }

            return allQuery;
        }

        return '';
    }

    let hashMain, hashInfo, hashEl, hashEvent;

    hashEvent = function(e, func = function() {}) {

        if ( isDef(e) && isString(e) ) {
            let event   = e.toLowerCase(),
                func    = isDef(func) && isFunc(func) ? func : emptyFunc,
                evs     = event.split(',');

            for (let i in evs) {

                if (evs.hasOwnProperty(i)) {

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

        }

    }

    hashInfo = function(h = {}) {

        this.hashVersion = isDef(info.hash_version) ? info.hash_version : '?';
        this.packVersion = isDef(info.pack_version) ? info.pack_version : '?';

        this.addons = {
            load : typeof Hash.load !== 'undefined',
            spa : typeof Hash.spa !== 'undefined',
            server : typeof Hash.server !== 'undefined'
        }

    }

    hashMain = function(h = {}) {

        /* simple hash and href */
        this.hash = window.location.hash;
        this.href = window.location.href;

        /* remove obj */
        this.remove = function(n = {}) {

            if ( isDef(n) && isObj(n) ) {

                /* words part */
                if ('words' in n) {

                    /* get all words must be remove */
                    let words = n.words;

                    /* check app array */
                    if (isArr(words)) {

                        /* remove equal words */
                        words = Array.from(new Set(words));

                        /* filter and delete empty words */
                        words = words.filter(val => val !== '');

                        /* remove words */
                        for (let i=0 ; i<words.length ; i++) {

                            let wh = window.location.hash;
                            window.location.hash = replaceAll(wh, words[i], '');
                            window.location.hash = replaceAll(wh, escape(words[i]), '');

                        }

                    }

                }

                /* query part */
                if ('query' in n) {

                    /* get this query */
                    let que = n.query,
                        wh = window.location.hash.slice(1);

                    /* if query is array */
                    if (isArr(que)) {

                        /* check query */
                        if (isQuery(wh)) {

                            /* get own query */
                            let theQuery = getQuery(wh),
                                newQuery = {};

                            /* get query loops */
                            for (let i in theQuery) {

                                /* check in query */
                                if (theQuery.hasOwnProperty(i)) {

                                    /* remove loop */
                                    for (let t in que) {

                                        if (i !== que[t]) {

                                            /* make new query */
                                            newQuery[i] = theQuery[i];

                                        }

                                    }

                                }

                            }

                            /* set new hash */
                            window.location.hash = toQuery(newQuery);

                        }

                    }

                }
                
            }

        }

        this.ref = function(n = '') {

            if (!isEmpty(n) && isString(n)) {

                /* get window reff */
                let ref = document.referrer;

                if (!isEmpty(ref)) {
                    return ref === n;
                } else {
                    return false;
                }

            } else {
                return document.referrer;
            }

        }

        this.have = function (n = '', s = '') {

            /* check n */
            if (isString(n)) {

                /* set def type */
                let type = isEmpty(s) || !isString(s) ? 'value' : s;

                /* get window hash */
                let wh = window.location.hash;

                /* check hash */
                if (!isEmpty(wh)) {

                    /* remove # */
                    wh = wh.slice(1);

                    /* check type */
                    switch(type) {

                        case 'value' :
                            return wh.includes(n);

                        case 'query' :
                            if (isQuery(wh)) {
                                return getQuery(wh).hasOwnProperty(n);
                            }
                        break;

                    }

                }

            }

            return false;
        }

        this.clear = function(n = {}) {

            if (isDef(n) && isObj(n)) {

                /* sharp boolean */
                let sharp = 'sharp' in n ? isBool(n.sharp) ? n.sharp : true : true;

                /* get window hash */
                let wh = window.location.hash;

                /* remove hash */
                window.location.hash = '';

                /* clear sharp */
                if (sharp) {

                    history.pushState(null, null, window.location.href.split('#')[0]);

                }

            }

        }

        this.get = function(without = true, n = {}) {

            if (isDef(without) && isBool(without) && isDef(n) && isObj(n)) {

                /* get location hash */
                let wh = window.location.hash.slice(1);

                /* get other types */
                if ('query' in n) {

                    /* get own query */
                    let que = n.query,
                        ansQuery = {};

                    /* if hash is query */
                    if (isQuery(wh)) {

                        /* get query */
                        let theQuery = getQuery(wh);

                        /* check the own query */
                        if (isString(que)) {

                            /* if everything */
                            if (que === '*') {

                                for (let i in theQuery) {

                                    /* check query */
                                    if (theQuery.hasOwnProperty(i)) {

                                        /* this query */
                                        ansQuery[i] = theQuery[i];
                                    }

                                }

                            } else {

                                for (let i in theQuery) {

                                    /* check query */
                                    if (i === que && theQuery.hasOwnProperty(i)) {

                                        /* this query */
                                        ansQuery[i] = theQuery[i];

                                    }

                                }

                            }

                        } else if (isArr(que)) {

                            for (let i in que) {

                                if (que.hasOwnProperty(i)) {
                                    /* this query */
                                    let thisQ = que[i];

                                    /* check query */
                                    if (theQuery.hasOwnProperty(thisQ)) {
                                        ansQuery[thisQ] = theQuery[thisQ];
                                    }
                                }

                            }

                        }

                    }

                    /* get queries */
                    return ansQuery;

                } else {
                    /* get window hash */
                    return without ? window.location.hash.slice(1) : window.location.hash;
                }

            }

            return '';
        }

        this.set = function(n = {}) {

            if (isDef(n) && isObj(n)) {

                if ('val' in n) {

                    /* get value */
                    let val = n.val;

                    /* set val (text) */
                    if (isString(val)) {
                        window.location.hash = val;
                    }

                } else if ('query' in n) {

                    /* get query */
                    let que = n.query,
                        wh = window.location.hash.slice(1);

                    /* set query */
                    if (isObj(que)) {

                        /* get query */
                        window.location.hash = toQuery(que);

                    }

                }

            }

        }

        this.add = function(n = {}) {

            if (isDef(n) && isObj(n)) {

                if ('val' in n) {

                    /* get value */
                    let val = n.val;

                    /* set val (text) */
                    if (isString(val)) {
                        window.location.hash += val;
                    }

                } else if ('query' in n) {

                    /* get query */
                    let que = n.query,
                        wh = window.location.hash.slice(1);

                    /* is query */
                    if (isObj(que)) {

                        /* make query */
                        let theQue = toQuery(que);

                        /* make query */
                        if (!isEmpty(wh) && isQuery(wh)) {

                            /* add query */
                            if (!isEmpty(theQue)) {
                                window.location.hash = !wh.endsWith('&') ? wh + '&' + theQue : wh + theQue;
                            }
    
                        } else if (isEmpty(wh)) {

                            /* add query */
                            window.location.hash = theQue;
    
                        }

                    }

                }

            }

        }
		
		this.lock = function(n = {}) {
            
            if (isDef(n) && isObj(n)) {

                /* get window hash */
                const wh = window.location.hash;
            
                /* change it when replaced */
			    window.onhashchange = function() {
				    window.location.hash = wh;
			    }

            }
			
        }
        
        this.is = function(hash, n = {}) {

            /* check methods */
            if (isString(hash) && isDef(n) && isObj(n)) {

                /* get window hash */
                let wh = window.location.hash.slice(1);

                /* check empty hash */
                if (!isEmpty(hash)) {

                    /* query check */
                    if ('query' in n) {

                        /* get own query */
                        let que = n.query;

                        /* if is query */
                        if (isQuery(wh) && isString(que)) {

                            /* get query */
                            let theQuery = getQuery(wh);

                            /* check query */
                            if (theQuery.hasOwnProperty(que)) {
                                return theQuery[que] === hash;
                            }

                        }

                    } else {
                        return wh === hash;
                    }

                }

            }

            return false;

        }


    }
    
    hashEl = function(h = {}) {

        this.replace = function(n = {}) {

            if ('text' in n) {

                /* get text and replace array */
                let val = isString(n.text) ? n.text : '',
                    rep = 'replace' in n ? Array.isArray(n.replace) ? n.replace : [n.replace] : [];
                
                /* clear replace array */
                rep = Array.from(new Set(rep));

                /* replace */
                for (let i=0 ; i<rep.length ; i++) {

                    /* get loop replace */
                    let re = rep[i];

                    /* check loop */
                    if (isObj(re) && 'from' in re && 'to' in re) {

                        /* get to and from */
                        let toRep = re.to,
                            fromRep = re.from;
                        
                        /* method */
                        if (!isNull(toRep) && !isNull(fromRep)) {

                            /* search for 'from' in val */
                            if (val.includes(fromRep)) {

                                val = replaceAll(val, fromRep, toRep);

                            }

                        }

                    }

                }
                
                /* return val */
                return val;

            }

            return '';

        }

    }

    const Hash = {
        lib : hashMain,
        info : hashInfo,
        el : hashEl,
        event : hashEvent,
        ready : true
    }


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