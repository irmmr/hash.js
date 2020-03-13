/* 
* HashJs plugin : spa v1.4.3
* Copyright (c) 2020 IRMMR
* MIT License
*/
(function(window) {
    'use strict';

    var emptyObj = Object.freeze({}),
        emptyFunc = function() {};

    var appGetLoad = {
        hash_get : '{hash:get}',
        href_get : '{href:get}'
    }

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

    function selectId(h) {
        return document.getElementById(h)
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

    class HashJsLink extends HTMLElement {
        constructor() {
            super();

            var link = getAttr(this, 'link'),
                topScroll = false;

            
            if ( this.hasAttribute('h-top') ) {
                topScroll = getBool( getAttr(this, 'h-top') );
            }

            this.onclick = function() {
                if ( this.hasAttribute('link') ) {
                    window.location.hash = link;
                }
                if ( topScroll ) {
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                }
            }

        }
    }

    function loadElements() {
        if (typeof customElements !== 'undefined') {
            customElements.define('h-link', HashJsLink);
        }
    }

    function getMain(h) {
        return 'main' in h ? isString(h.main) ? h.main : '' : ''
    }

    function getTitle(h) {
        return 'title' in h ? isString(h.title) ? h.title : '' : ''
    }

    function appendTag(e) {
        if (isString(e)) {
            e = replaceAll(e, appGetLoad.hash_get, window.location.hash.slice(1));
            e = replaceAll(e, appGetLoad.href_get, window.location.href);
        }

        return e;
    }


    function meduRouter(router) {

        /* manage router */
        var rout = router.split('/'),
            hash = window.location.hash.slice(1),
            hRout = hash.split('/');
        
        /* rout vars */
        var routAny = [], routName = [];

        /* check router */
        for(var i=0 ; i<rout.length ; i++) {

            /* rout item */
            var rt = rout[i];

            /* check router type */
            if (rt == '{any}') {
                routAny[i] = 1;
            } else {
                routName[i] = rt;
            }

        }

        /* first step : check len */
        if (hRout.length == rout.length) {

            /* set count */
            var okRout = 0,
                okData = [];

            /* check router and hash url */
            for(var o=0 ; o<hRout.length ; o++) {

                /* rout item */
                var rh = hRout[o];

                /* check rout */
                if (rh == routName[o]) {

                    /* ++ in count var */
                    okRout ++;

                } else if (isDef(routAny[o]) && routAny[o] == 1) {

                    /* ++ in count var */
                    okRout ++;

                    /* add data */
                    okData.push( hRout[o] );

                }

            }

            /* check router */
            return {
                status : hRout.length == okRout,
                data : okData
            };

        }

        return {
            status : false
        };

    }


    function routerSpa(rout, action) {

        /* check medu router */
        var st = meduRouter(rout);

        /* if in router */
        if (st.status) {

            /* function data */
            var data = st.data,
                wh = window.location.hash;

            /* add function */
            action.call(this, data, {
                hash : wh,
                router : rout
            });

        }

    }


    function meduHash(element, component, wh, err, def, block) {

        /* get now hash */
        var nh = window.location.hash;

        /* use def hash */
        if (isEmpty(nh) && !isNull(def)) {
            window.location.hash = def;
        }

        /* check router block */
        var bl = 0;

        /* check by [] */
        for(var i=0 ; i<block.length ; i++) {

            /* block item */
            var b = block[i];

            /* load from router */
            var rou = meduRouter(b);

            /* ++ if router is blocked */
            if (rou.status) {
                bl ++;
            }

        }
        
        /* is not blacked */
        if (bl == 0) {

            /* use spa */
            if (component.hasOwnProperty(wh)) {

                /* get own component */
                var com = component[wh];

                if ('main' in com) {

                    /* app main */
                    var appMain = com.main; 

                    /* app do action (MAIN) */
                    if (isDef(appMain)) {

                        /* replace tags */
                        appMain = appendTag(appMain);

                        /* set into html */
                        selectId(element).innerHTML = appMain;
                    }

                }

                if ('title' in com) {

                    /* app title */
                    var appTitle = com.title; 

                    /* app do action (TITLE) */
                    if (isString(appTitle)) {

                        /* replace tags */
                        appTitle = appendTag(appTitle);

                        /* set to title */
                        document.title = appTitle;
                    }

                }

                if ('do' in com) {

                    /* app do */
                    var appDo = com.do; 

                    /* app do action (DO) */
                    if (isFunc(appDo)) {
                        appDo.call(this, wh, {
                            main : getMain(com),
                            title : getTitle(com)
                        });
                    }

                }
                
                
            } else {

                /* manage errros (404) */
                if ('404' in err) {

                    /* get 404 error */
                    var nf = '404' in err ? isDef(err['404']) && isObj(err['404']) ? err['404'] : emptyObj : emptyObj;

                    if ('main' in nf) {

                        /* manage error main */
                        var nfMain = getMain(nf);

                        /* replace tags */
                        nfMain = appendTag(nfMain);

                        /* set into html */
                        selectId(element).innerHTML = nfMain;

                    }

                    if ('title' in nf) {

                        /* manage error title */
                        var nfTitle = getTitle(nf);

                        /* replace tags */
                        nfTitle = appendTag(nfTitle);

                        /* set into title */
                        document.title = nfTitle;

                    }

                    if ('do' in nf) {

                        /* get do action */
                        var nfDo = nf.do;

                        /* check do action */
                        if (isFunc(nfDo)) {
                            nfDo.call(this, wh);
                        }

                    }

                }
                

            }

        }


    }



    var spaApp = function(n = {}) {

        this.app = function(h = {}) {

            /* if user add app id */
            if ('el' in h) {

                /* get app id */
                var el = h.el;

                /* check app id */
                if (isString(el) && !isNull( selectId(el) )) {

                    /* get component and errors and def and block */
                    var com = 'component' in h ? isDef(h.component) && isObj(h.component) ? h.component : emptyObj : emptyObj,
                        err = 'error' in h ? isDef(h.error) && isObj(h.error) ? h.error : emptyObj : emptyObj,
                        def = 'def' in h ? isString(h.def) && h.def in com ? h.def : null : null,
                        blo = 'block' in h ? isArr(h.block) ? h.block : [] : [];

                    /* get window hash */
                    var wh = window.location.hash.slice(1);

                    /* run spa in load */
                    meduHash(el, com, wh, err, def, blo);

                    /* run spa in hash change */
                    window.onhashchange = function() {
                        var newWh = window.location.hash.slice(1);
                        meduHash(el, com, newWh, err, def, blo);
                    }

                }

            }

        }


        this.router = function(h = {}) {

            /* check router */
            if ('router' in h) {

                /* get router */
                var rout = h.router;

                /* if router is string */
                if (isString(rout)) {

                    /* do action */
                    var doRouter = 'do' in h ? isFunc(h.do) ? h.do : emptyFunc : emptyFunc;


                    /* action when loaded */
                    routerSpa(rout, doRouter);

                    /* action when hash changed */
                    window.addEventListener('hashchange', function() {
                        routerSpa(rout, doRouter);
                    });

                }

            }

        }

        this.exports = function(h = {}) {

            /* rendering */
            this.render = function(s = {}) {
                
                /* check el */
                if ('el' in s) {

                    /* get element */
                    var el = s.el;

                    /* check el id */
                    if (isString(el) && !isNull( selectId(el) )) {

                        /* check render */
                        if ('render' in s) {

                            /* get render */
                            var rend = s.render;

                            /* check render */
                            if (isString(rend)) {

                                /* set html & rendering */
                                selectId(el).innerHTML = rend;

                            }

                        }

                    }

                }

            }

            /* tilte */
            this.title = function(t, s = {}) {

                /* check title */
                if (isString(t)) {

                    /* set title */
                    document.title = t;

                }

            }

        }
 
    }



    var HashSpa = spaApp;


    var LoadHashNew = false;
    if (typeof Hash !== 'undefined') {

        if (typeof define === 'function' && define.amd) {
            define(HashSpa);
            LoadHashNew = true;
        } else {
            window.Hash.spa = HashSpa;
            LoadHashNew = true;
        }

        if (typeof exports === 'object') {
            module.exports = HashSpa();
            LoadHashNew = true;
        }

        if (LoadHashNew) {
            window.addEventListener('load', loadElements);
        }

    }

})(window)