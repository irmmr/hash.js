/* 
* HashJs javascript library v1.2.3
* Copyright (c) 2020 IRMMR
* MIT License
*/
( function ( window ) {
    'use strict';

    var info = {
        hash_version : '1.2.3',
        pack_version : '1.2.9'
    }

    var emptyObj = Object.freeze({}),
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
            isDef(h) ? isBool(h) ? h : isString(h) ? h.toLowerCase() == 'true' ? true : false : false : false
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
        return h == ''
    }

    function isNull(h) {
        return h == null
    }

    function objSize(h) {
        var size = 0, key;
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

            var qa = q.split('&'),
                itsQuery = 0;

            for (var i in qa) {

                var dq = qa[i],
                    da = dq.split('='),
                    daLen = da.length;

                if (daLen == 2) {

                    if (isString(da[0]) && isString(da[1])) {
                        itsQuery ++;
                    }
                    
                } else if (daLen == 1) {

                    if (isString(da[0])) {
                        itsQuery ++;
                    }

                }

            }

            return qa.length == itsQuery;

        }

        return false;
    }

    function getQuery(q) {
        if (isString(q)) {

            if (isQuery(q)) {

                var qa = q.split('&'),
                    myObj = {};

                for (var i in qa) {

                    var dq = qa[i],
                        da = dq.split('='),
                        daLen = da.length;

                    if (daLen == 2) {

                        var dOne = getString(da[0]),
                            dTwo = getString(da[1]);
        
                        myObj[dOne] = dTwo;

                    } else if (daLen == 1) {

                        var dOne = getString(da[0]),
                            dTwo = null;
        
                        myObj[dOne] = dTwo;

                    }


                }

                return myObj;
            }

        }

        return {};
    }

    function toQuery(q) {
        if (isDef(q) && isObj(q)) {

            var allQuery = '',
                queSize = objSize(q),
                numData = 0;

            for (var i in q) {

                if (q.hasOwnProperty(i)) {

                    numData ++;

                    var dataMe = q[i],
                        dataAdd = isString(dataMe) ? dataMe : dataMe.toString(),
                        dataEncode = encodeURIComponent(dataAdd);

                    allQuery += numData == queSize ? i + '=' + dataEncode : i + '=' + dataEncode + '&';

                }

            }

            return allQuery;
        }

        return '';
    }

    var hashMain, hashInfo, hashEl, hashEvent;

    hashEvent = function(e, func = function() {}) {

        if ( isDef(e) && isString(e) ) {
            var event = e.toLowerCase(),
                func = isDef(func) && isFunc(func) ? func : emptyFunc;

            switch(event) {

                case 'change' : 
                    window.addEventListener('hashchange', func);
                break;

                default :  
                    // Nothing to do
                break;

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
                    var words = n.words;

                    /* check app array */
                    if (isArr(words)) {

                        /* remove equal words */
                        words = Array.from(new Set(words));

                        /* filter and delete empty words */
                        words = words.filter(val => val !== '');

                        /* remove words */
                        for (var i=0 ; i<words.length ; i++) {

                            var wh = window.location.hash;
                            window.location.hash = replaceAll(wh, words[i], '');
                            window.location.hash = replaceAll(wh, escape(words[i]), '');

                        }

                    }

                }

                /* query part */
                if ('query' in n) {

                    /* get this query */
                    var que = n.query,
                        wh = window.location.hash.slice(1);

                    /* if query is array */
                    if (isArr(que)) {

                        /* check query */
                        if (isQuery(wh)) {

                            /* get own query */
                            var theQuery = getQuery(wh),
                                newQuery = {};

                            /* get query loops */
                            for (var i in theQuery) {

                                /* check in query */
                                if (theQuery.hasOwnProperty(i)) {

                                    /* remove loop */
                                    for (var t in que) {

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
                var reff = document.referrer;

                if (!isEmpty(reff)) {
                    return reff == n;
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
                var type = isEmpty(s) || !isString(s) ? 'value' : s;

                /* get window hash */
                var wh = window.location.hash;

                /* chekc hash */
                if (!isEmpty(wh)) {

                    /* remove # */
                    wh = wh.slice(1);

                    /* check type */
                    switch(type) {

                        case 'value' :
                            return wh.includes(n);
                        break;

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
                var sharp = 'sharp' in n ? isBool(n.sharp) ? n.sharp : true : true;

                /* get window hash */
                var wh = window.location.hash;

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
                var wh = window.location.hash.slice(1);

                /* get other types */
                if ('query' in n) {

                    /* get own query */
                    var que = n.query;

                    /* if hash is query */
                    if (isQuery(wh)) {

                        /* get query */
                        var theQuery = getQuery(wh),
                            ansQuery = {};

                        /* check the own query */
                        if (isString(que)) {

                            /* if everything */
                            if (que == '*') {

                                for (var i in theQuery) {

                                    /* check query */
                                    if (theQuery.hasOwnProperty(i)) {

                                        /* this query */
                                        var thisQ = theQuery[i];
                                        ansQuery[i] = thisQ;
                                    }

                                }

                            } else {

                                for (var i in theQuery) {

                                    /* check query */
                                    if (i == que && theQuery.hasOwnProperty(i)) {

                                        /* this query */
                                        var thisQ = theQuery[i];
                                        ansQuery[i] = thisQ;

                                    }

                                }

                            }

                        } else if (isArr(que)) {

                            for (var i in que) {

                                /* this query */
                                var thisQ = que[i];

                                /* check query */
                                if (theQuery.hasOwnProperty(thisQ)) {
                                    ansQuery[thisQ] = theQuery[thisQ];
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
                    var val = n.val;

                    /* set val (text) */
                    if (isString(val)) {
                        window.location.hash = val;
                    }

                } else if ('query' in n) {

                    /* get query */
                    var que = n.query,
                        wh = window.location.hash.slice(1);

                    /* set query */
                    if (isObj(que)) {

                        /* get query */
                        var theQue = toQuery(que);

                        /* set hash */
                        window.location.hash = theQue;

                    }

                }

            }

        }

        this.add = function(n = {}) {

            if (isDef(n) && isObj(n)) {

                if ('val' in n) {

                    /* get value */
                    var val = n.val;

                    /* set val (text) */
                    if (isString(val)) {
                        window.location.hash += val;
                    }

                } else if ('query' in n) {

                    /* get query */
                    var que = n.query,
                        wh = window.location.hash.slice(1);

                    /* is query */
                    if (isObj(que)) {

                        /* make query */
                        var theQue = toQuery(que);

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
                var wh = window.location.hash.slice(1);

                /* check empty hash */
                if (!isEmpty(hash)) {

                    /* query check */
                    if ('query' in n) {

                        /* get own query */
                        var que = n.query;

                        /* if is query */
                        if (isQuery(wh) && isString(que)) {

                            /* get query */
                            var theQuery = getQuery(wh);

                            /* check query */
                            if (theQuery.hasOwnProperty(que)) {
                                return theQuery[que] == hash;
                            }

                        }

                    } else {
                        return wh == hash;
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
                var val = isString(n.text) ? n.text : '',
                    rep = 'replace' in n ? Array.isArray(n.replace) ? n.replace : [n.replace] : [];
                
                /* clear replace array */
                rep = Array.from(new Set(rep));

                /* replace */
                for (var i=0 ; i<rep.length ; i++) {

                    /* get loop replace */
                    var re = rep[i];

                    /* check loop */
                    if (isObj(re) && 'from' in re && 'to' in re) {

                        /* get to and from */
                        var toRep = re.to,
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


    var LoadHash = false;

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