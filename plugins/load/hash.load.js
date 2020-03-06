/* 
* HashJs plugin : load v1.0
* Copyright (c) 2020 IRMMR
* MIT License
*/
(function(window) {
    'use strict';

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

    function selectId(h) {
        return document.getElementById(h)
    }


    var hashLoad = function(n = {}) {

        this.page = function(h = {}) {

            /* do when loaded */
            var doLoad = 'do' in h ? isFunc(h.do) ? h.do : emptyFunc : emptyFunc,
                doLoaded = 'load' in h ? isFunc(h.load) ? h.load : emptyFunc : emptyFunc;

            /* load function */
            doLoaded.call(this, {
                startTime : Date.now()
            });

            /* loading vars */
            var loadInterval = setInterval(checkPageReady, 10),
                checkTime = 0,
                startDate = Date.now();

            /* loading function */
            function checkPageReady() {
                checkTime ++;

                if (typeof document.getElementsByTagName('body')[0] !== 'undefined') {

                    /* clearn interval when loaded */
                    window.clearInterval(loadInterval);

                    /* get page load time */
                    var loadTime = window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart;

                    /* return to do */
                    var returned = {
                        loadTime : loadTime,
                        checkLen : checkTime,
                        startLoad : startDate,
                        endLoad : Date.now(),
                        load : true
                    }

                    /* run user function */
                    doLoad.call(this, returned);
                }
            }

        }

        this.component = function(h = {}) {

            if ('app' in h) {

                if (isDef( selectId(h.app) )) {

                    /* set all vars */
                    var app = h.app,
                        doLoaded = 'do' in h ? isFunc(h.do) ? h.do : emptyFunc : emptyFunc,
                        doLoad = 'load' in h ? isFunc(h.load) ? h.load : emptyFunc : emptyFunc,
                        errorSy = 'error' in h ? isString(h.error) ? h.error : '<!--h:error-->' : '<!--h:error-->',
                        application = selectId(app),
                        appVal = application.innerHTML;
                    
                    /* check when hash changed */
                    window.addEventListener('hashchange', function() {

                        /* cons app */
                        var checkTime = 0,
                            startTime = Date.now();

                        /* do first load actions */
                        doLoad.call(this, {
                            hash : window.location.hash.slice(1),
                            startTime : startTime
                        });

                        /* set load interval */
                        var loadInterval = setInterval(checkPageReadyCom, 10);

                        /* load function */
                        function checkPageReadyCom() {
                            checkTime ++;

                            var newVal = application.innerHTML;
                            if (
                                newVal !== appVal || 
                                newVal.includes(errorSy)
                            ) {
                                /* clear when loaded */
                                window.clearInterval(loadInterval);

                                /* do action when loaded */
                                doLoaded.call(this, {
                                    hash : window.location.hash.slice(1),
                                    startTime : startTime,
                                    endTime : Date.now(),
                                    loadTime : Date.now() - startTime,
                                    checkLen : checkTime,
                                    load : true
                                });

                                /* set new value to old val */
                                appVal = newVal;
                            }
                        }

                    });

                }
                

            }
            

        }

    }


    var HashLoad = hashLoad;


    var LoadHashNew = false;
    if (typeof Hash !== 'undefined') {

        if (typeof define === 'function' && define.amd) {
            define(HashLoad);
            LoadHashNew = true;
        } else {
            window.Hash.load = HashLoad;
            LoadHashNew = true;
        }

        if (typeof exports === 'object') {
            module.exports = HashLoad();
            LoadHashNew = true;
        }

    }

})(window)