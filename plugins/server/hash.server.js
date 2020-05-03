/* 
* HashJs plugin : server v1.1
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


    var serverApp = function(n = {}) {

        /* create ajax connection */
        this.ajax = (h = {}) => {

            if ('type' in h && 'url' in h) {

                /* get connection type and connection url */
                var cType = h.type.toLowerCase(),
                    cUrl = h.url;

                /* check type (type) */
                if (isString(cType) && isString(cUrl)) {

                    /* POST or GET */
                    if (cType == 'get' || cType == 'post') {

                        /* get data and result */
                        var cData = 'data' in h ? isObj(h.data) ? h.data : emptyObj : emptyObj,
                            cResult = 'result' in h ? isObj(h.result) ?  h.result : emptyObj : emptyObj,
                            cSuccess = 'success' in cResult ? isFunc(cResult.success) ? cResult.success : emptyFunc : emptyFunc,
                            cError = 'error' in cResult ? isFunc(cResult.error) ? cResult.error : emptyFunc : emptyFunc,
                            encodeType = 'encode' in cResult ? isString(Result.encode) ? Result.encode : 'json' : 'json';

                        /* create connection */
                        var xhttp = null;

                        /* http request for browser */
                        if (window.XMLHttpRequest) {

                            /* normal */
                            xhttp = new XMLHttpRequest();

                        } else if (window.ActiveXObject) {

                            /* old */
                            xhttp = new ActiveXObject("Microsoft.XMLHTTP");

                        } else {

                            /* not exits */
                            xhttp = false;

                        }

                        /* check connect */
                        if (xhttp) {

                            /* data result */
                            xhttp.onreadystatechange = function(){
                                
                                /* check data result (GOOD or NOT) */
                                if (xhttp.readyState === XMLHttpRequest.DONE) {

                                    /* request code status */
                                    var resultCode = xhttp.status;

                                    /* success or not */
                                    if (resultCode === 200) {

                                        /* do action when data recived (SUCCESS) */
                                        cSuccess.call(this, xhttp.responseText);

                                    } else {

                                        /* do action when data recived (ERROR) */
                                        cError.call(this, resultCode);

                                    }

                                }

                            };

                            /* send data by request */
                            if (encodeType == 'form') {
                                var sendData = '',
                                    dataSize = objSize(cData),
                                    putData = 0;

                                /* manage data */
                                for (var i in cData) {

                                    if (cData.hasOwnProperty(i)) {

                                        /* action time */
                                        putData ++;

                                        /* add data */
                                        var dataAdd = encodeURIComponent(cData[i]);
                                        sendData += putData == dataSize ? i + '=' + dataAdd : i + '=' + dataAdd + '&';

                                    }

                                }
                            } else if (encodeType == 'json') {
                                var sendData = JSON.stringify(cData);
                            }
                            

                            /* open connection for GET */
                            if (cType == 'get') {

                                /* add ? if have data */
                                if (isEmpty(sendData)) {
                                    xhttp.open('GET', cUrl);
                                } else {
                                    xhttp.open('GET', cUrl + '?' + sendData);
                                }

                                /* encode */
                                xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

                                /* data send */
                                xhttp.send();

                            } 

                            /* open connection for POST */
                            else if (cType == 'post') {

                                /* open data */
                                xhttp.open('POST', cUrl);

                                /* data encode */
                                if (encodeType == 'form') {
                                    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                                } else {
                                    xhttp.setRequestHeader('Content-Type', 'application/json');
                                }

                                /* send if have data */
                                if (isEmpty(sendData)) {
                                    xhttp.send();
                                } else {
                                    xhttp.send(sendData);
                                }
                            

                            }
                            

                        }
    
                    }

                }


            }

        }

    }



    var HashServer = serverApp,
        LoadHashNew = false;

    if (typeof Hash !== 'undefined') {

        if (typeof define === 'function' && define.amd) {
            define(HashServer);
            LoadHashNew = true;
        } else {
            window.Hash.server = HashServer;
            LoadHashNew = true;
        }

        if (typeof exports === 'object') {
            module.exports = HashServer();
            LoadHashNew = true;
        }

    }

})(window)