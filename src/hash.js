/* 
* HashJs javascript library v1.2.1
* Copyright (c) 2020 IRMMR
* MIT License
*/
( function ( window ) {
    'use strict';

    var info = {
        hash_version : '1.2.1',
        pack_version : '1.2.5'
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

                /* get all words must be remove */
                var words = 'words' in n ? Array.isArray(n.words) ? n.words : [n.words] : [];

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

        this.have = function (n = '') {

            /* get window hash */
            var wh = window.location.hash;

            /* chekc hash */
            if (!isEmpty(wh)) {

                if (isEmpty(n)) {
                    return true;
                } else {
                    return wh.includes(n);
                }

            } else {
                return false;
            }

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

                /* get window hash */
                var wh = without ? window.location.hash.slice(1) : window.location.hash;

                /* get hash */
                return wh;

            }

            return '';
        }

        this.set = function(n = {}) {

            if (isDef(n) && isObj(n)) {

                if ('val' in n) {

                    var val = n.val;
                    window.location.hash = val;

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

                    return wh == hash;

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