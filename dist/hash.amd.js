/**
 * HashJs javascript library v1.6.3
 * Copyright (c) 2021 irmmr
 * MIT License
 *
 * (amd)
 * https://github.com/irmmr/hash.js
 */

define(function () { 'use strict';

    // define main helpers handle
    var helper = {

        /**
         * check if the variable is defined.
         * @param {*} h The input variable of check
         * @returns {boolean}
         */
        isDef: function (h) {
            return typeof h !== undefined && h !== null
        },

        /**
         * check if variable is not defined.
         * @param {*} h The input variable of check
         * @returns 
         */
        isUnDef: function (h) {
            return typeof h === undefined || h === null
        },

        /**
         * check if the type of variable is string.
         * @param {*} h The input variable of check
         * @returns 
         */
        isString: function (h) {
            return this.isDef(h) && typeof h === 'string'
        },

        /**
         * check if the type of variable is boolean
         * @param {*} h The input variable of check
         * @returns 
         */
        isBool: function (h) {
            return this.isDef(h) && typeof h === 'boolean'
        },

        /**
         * Convert anything to boolean data type.
         * @param {string|boolean|number} h The input data
         * @returns
         */
        getBool: function (h) {
            if (this.isBool(h)) {
                return h
            }
            return this.isString(h) && h.toLowerCase() === 'true'
        },

        /**
         * Get attribute value if exists
         * @param {*} el     Element
         * @param {*} attr   Attribute name
         * @returns 
         */
        getAttr: function (el, attr) {
            return el.hasAttribute(attr) ? el.getAttribute(attr) : ""
        },

        /**
         * check if the type of variable is object.
         * @param {*} h The input data
         * @returns 
         */
        isObj: function (h) {
            return h !== null && typeof h === 'object'
        },

        /**
         * check if the type of variable is function.
         * @param {*} h The input data
         * @returns 
         */
        isFunc: function (h) {
            return this.isDef(h) && typeof h === 'function'
        },

        /**
         * replace all a to b in a string data.
         * @param {string} h The input string
         * @param {string} a Needle string
         * @param {string} b Replace with
         * @returns 
         */
        replaceAll: function (h, a, b) {
            return h.split(a).join(b)
        },

        /**
         * run a callback using argument is safe mode.
         * @param {function}  func Function name
         * @param {*}         argc Function arguments
         * @returns 
         */
        lunchFunc: function (func, argc) {
            if ( argc === void 0 ) argc = null;

            return this.isFunc(func) ? argc !== null ? func(argc) : func() : null
        },

        /**
         * check if the type of variable is number.
         * @param {*} h The input data
         * @returns 
         */
        isNum: function (h) {
            return this.isDef(h) && Number.isNaN(Number(h))
        },

        /**
         * check if the value of variable is empty.
         * @param {*} h The input data
         * @returns 
         */
        isEmpty: function (h) {
            return h === ''
        },

        /**
         * check if the value of variable is null.
         * @param {*} h The input data
         * @returns 
         */
        isNull: function (h) {
            return h == null
        },

        /**
         * get the object length
         * @param {object} h The object
         * @returns The object length/size
         */
        objSize: function (h) {
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
        },

        /**
         * split just one time in string.
         * @param {string} string The input string
         * @param {string} delim  The delim for split
         * @returns 
         */
        splitOnce: function (string, delim) {
            var components = string.split(delim);
            return [components.shift(), components.join(delim)]
        },

        /**
         * split just one time in string from end.
         * @param {string} string The input string
         * @param {string} delim  The delim for split
         * @returns
         */
        splitOnceEnd: function (string, delim) {
            var components = string.split(delim);
            return [components.slice(0, components.length - 1).join(delim), components.pop()]
        },
        
        /**
         * check if the type of variable is array.
         * @param {*} h The input data
         * @returns 
         */
        isArr: function (h) {
            return this.isDef(h) && Array.isArray(h)
        },

        /**
         * convert data to string
         * @param {*} h 
         * @returns 
         */
        getString: function (h) {
            return this.isDef(h) ? this.isString(h) ? h : h.toString() : ''
        },

        /**
         * check if string is query
         * @param {string} q The input string
         * @returns 
         */
        isQuery: function (q) {
            if (!this.isString(q)) {
                return false
            }
            if (!q.startsWith('?')) {
                q = '?' + q;
            }
            return (new RegExp(/\?.+(=|).*/g)).test(q)
        },

        /**
         * get all values and names of query.
         * @param {string} q The query string without "?"
         * @returns 
         */
        getQuery: function (q) {
            if (!this.isQuery(q)) {
                return {}
            }
            var qa = q.split('&'),
                output = {};
            for (var i in qa) {
                if (!qa.hasOwnProperty(i)) {
                    continue
                }
                var query    = qa[i],
                    q_parse  = this.splitOnce(query, '='),
                    q_len    = query.split('=').length,
                    needle   = this.getString(q_parse[0]);
                if (this.isEmpty(query)) {
                    continue
                }
                if (q_len >= 2) {
                    var val        = this.getString(q_parse[1]);
                    output[needle] = decodeURIComponent(val);
                } else {
                    output[needle] = null;
                }
            }
            return output
        },
        
        /**
         * convert object to query string.
         * @param {object}  q           The query object
         * @param {boolean} encode_uri  Encode uri component status
         * @returns 
         */
        toQuery: function (q, encode_uri) {
            if ( encode_uri === void 0 ) encode_uri = false;

            if (!this.isDef(q) || !this.isObj(q)) {
                return ''
            }
            var all_query = '',
                que_size  = this.objSize(q),
                num_data  = 0;
            for (var i in q) {
                if (!q.hasOwnProperty(i)) {
                    continue
                }
                num_data ++;
                var data_val = q[i];
                if (this.isNull(data_val)) {
                    all_query += num_data === que_size ? i : i + '&';
                } else {
                    var data_str    = this.getString(data_val),
                        data_encode = encode_uri ? encodeURIComponent(data_str) : data_str;
                    all_query += num_data === que_size ? i + '=' + data_encode : i + '=' + data_encode + '&';
                }
            }
            return all_query
        },

        /**
         * get length of all "q" in "t".
         * @param {string} t The input string
         * @param {string} q The input char/string
         * @returns 
         */
        lenOfChar: function (t, q) {
            if (!t.includes(q)) {
                return 0
            }
            return t.split('').filter(function (i) { return i === q; }).length
        },

        /**
         * validation a hash for query exists.
         * @param {string} q The hash string
         * @returns 
         */
        isTrueHash: function (q) {
            if (!this.isString(q)) {
                return false
            }
            if (q.includes('?')) {
                var spt = this.splitOnce(q, '?'),
                    que = spt[1];
                return this.isEmpty(que) || this.isQuery(que)
            }
            return true
        },

        /**
         * get hash value and query string.
         * @param {string} q The hash string
         * @returns 
         */
        getTrueHash: function (q) {
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
        },

        /**
         * get the value of window hash.
         * @returns 
         */
        getWinHash: function () {
            var hsh = window.location.hash;
            return hsh.startsWith('#') ? hsh.slice(1) : hsh
        },

        /**
         * set the window hash.
         * @param {string} q Hash value
         */
        setWinHash: function (q) {
            window.location.hash = q;
        }

    };

    // Hash main information of library such as versions.
    var info = {
        version : '1.6.3'
    };

    // import all main helpers and info


    // main lock variables
    var locked     = false,
        force_lock = false;

    // blank variables for use in return of functions
    Object.freeze({});
        var emptyFunc  = function() {};

    // Hash Main component
    function components (conf) {

        // return all components
        return {

            /**
             * Hash Event component.
             * @param {string} e The listeners
             * @param {*} func   The function/callback
             * @returns
             */
            event : function(e, func) {
                if ( func === void 0 ) func = function() {};

                if (!helper.isDef(e) || !helper.isString(e)) {
                    return
                }
                var event   = e.toLowerCase(),
                    evs     = event.split(',');
                func    = helper.isDef(func) && helper.isFunc(func) ? func : emptyFunc;
                for (var i in evs) {
                    if (!evs.hasOwnProperty(i)) {
                        continue
                    }
                    var current_ev = helper.replaceAll(evs[i], ' ', '');
                    switch (current_ev) {
                        case 'change' :
                            window.addEventListener('hashchange', func);
                            break;
                        case 'load' :
                            window.addEventListener('load', func);
                            break;
                        case 'ready' :
                            helper.lunchFunc(func);
                            break;
                    }
                }
            },

            /**
             * Hash Info component.
             * @param {object} h Config info
             * @returns
             */
            info : function(h) {

                return {
                    version : info.version 
                }
            },

            /**
             * remove a string from location hash.
             * @param {string|array} n The words/chars list
             * @returns boolean
             */
            remove : function (n) {
                if ( n === void 0 ) n = [];

                if (helper.isString(n) && !helper.isEmpty(n)) {
                    n = [n];
                }
                if (!helper.isArr(n) || n.length === 0) {
                    return false
                }
                var wh = helper.getWinHash();
                if (helper.isEmpty(wh)) {
                    return false
                }
                for (var i in n) {
                    if (!n.hasOwnProperty(i)) {
                        continue
                    }
                    var vl = n[i];
                    if (helper.getWinHash().includes(vl)) {
                        helper.setWinHash(
                            helper.replaceAll(
                                helper.getWinHash(), vl, ''
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
            removeValue : function (n) {
                if ( n === void 0 ) n = [];

                if (helper.isString(n) && !helper.isEmpty(n)) {
                    n = [n];
                }
                if (!helper.isArr(n) || n.length === 0) {
                    return false
                }
                var wh      = helper.getWinHash(),
                    hash    = helper.getTrueHash(wh),
                    hsh_val = hash[0],
                    hsh_que = hash[1],
                    vt      = '';
                if (helper.isEmpty(wh) || helper.isEmpty(hsh_val)) {
                    return false
                }
                for (var i in n) {
                    if (!n.hasOwnProperty(i)) {
                        continue
                    }
                    var vl = n[i];
                    if (hsh_val.includes(vl)) {
                        hsh_val = helper.replaceAll(hsh_val, vl, '');
                    }
                }
                vt += hsh_val;
                if (!helper.isEmpty(hsh_que)) {
                    vt += '?' + hsh_que;
                }
                helper.setWinHash(vt);
                return true
            },

            /**
             * remove a query from location hash.
             * @param {string|array} n
             * @returns boolean
             */
            removeQuery : function (n) {
                if ( n === void 0 ) n = [];

                if (helper.isString(n) && !helper.isEmpty(n)) {
                    n = [n];
                }
                if (!helper.isArr(n) || n.length === 0) {
                    return false
                }
                var wh      = helper.getWinHash(),
                    hash    = helper.getTrueHash(wh),
                    hsh_val = hash[0],
                    hsh_que = hash[1],
                    vt      = '',
                    cl      = {};
                if (helper.isEmpty(wh) || helper.isEmpty(hsh_que)) {
                    return false;
                }
                var que = helper.getQuery(hsh_que);
                for (var i in que) {
                    if (!que.hasOwnProperty(i)) {
                        continue
                    }
                    if (!n.includes(i)) {
                        cl[i] = que[i];
                    }
                }
                if (!helper.isEmpty(hsh_val)) {
                    vt += hsh_val;
                }
                if (helper.objSize(cl) !== 0) {
                    vt += '?' + helper.toQuery(cl);
                }
                helper.setWinHash(vt);
                return true
            },

            /**
             * check for location hash value.
             * @param {string} n
             * @returns boolean
             */
            haveValue : function (n) {
                if ( n === void 0 ) n = '';

                if (!helper.isString(n)) {
                    return false
                }
                var wh = helper.getWinHash(),
                    wg = helper.getTrueHash(wh)[0];
                if (helper.isEmpty(n)) {
                    return !helper.isEmpty(wg)
                }
                return wg.includes(n)
            },

            /**
             * checking for query exists on location hash.
             * @param {string|array} n
             * @retuens boolean
             */
            haveQuery : function (n) {
                if ( n === void 0 ) n = [];

                if (helper.isString(n)) {
                    n = [n];
                }
                if (!helper.isArr(n)) {
                    return false
                }
                var wh = helper.getWinHash(),
                    wq = helper.getTrueHash(wh)[1];
                if (n.length === 0) {
                    return !helper.isEmpty(wq)
                }
                if (!helper.isQuery(wq)) {
                    return false
                }
                var que = helper.getQuery(wq);
                for (var i in n) {
                    if (!n.hasOwnProperty(i)) {
                        continue
                    }
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
            have : function (n) {
                if ( n === void 0 ) n = '';

                if (!helper.isString(n)) {
                    return false
                }
                var wh = helper.getWinHash();
                if (helper.isEmpty(wh)) {
                    return false
                }
                if (helper.isEmpty(n)) {
                    return true
                }
                return wh.includes(n)
            },

            /**
             * clear the page hash.
             * @param {boolean} n
             * @returns boolean
             */
            clear : function (n) {
                if ( n === void 0 ) n = true;

                if (!helper.isBool(n)) {
                    return false
                }
                window.location.hash = '';
                if (n) {
                    history.pushState(null, null, window.location.href.split('#')[0]);
                }
                return true
            },

            /**
             * clear hash value from location hash.
             * @returns boolean
             */
            clearValue : function () {
                var wh = helper.getWinHash();
                if (!helper.isTrueHash(wh)) {
                    return false
                }
                var wg = helper.getTrueHash(wh)[1];
                helper.setWinHash('?' + wg);
                return true
            },

            /**
             * clear hash query from location hash.
             * @returns boolean
             */
            clearQuery : function () {
                var wh = helper.getWinHash();
                if (!helper.isTrueHash(wh)) {
                    return false
                }
                var wg = helper.getTrueHash(wh)[0];
                helper.setWinHash(wg);
                return true
            },

            /**
             * an easy way to get location hash.
             * @param {*} n
             * @returns string
             */
            get : function (n) {

                return helper.getWinHash()
            },

            /**
             * get location hash value.
             * @param {*} n
             * @returns string
             */
            getValue : function (n) {

                var wh = helper.getWinHash();
                return helper.isEmpty(wh) ? '' : helper.getTrueHash(wh)[0]
            },

            /**
             * get the location hash query.
             * @param {string|array} n
             * @returns object
             */
            getQuery : function (n) {
                if ( n === void 0 ) n = [];

                if (helper.isString(n)) {
                    n = [n];
                }
                if (!helper.isArr(n)) {
                    return {}
                }
                var wh = helper.getWinHash();
                if (helper.isEmpty(wh)) {
                    return {}
                }
                var hsh_que = helper.getTrueHash(wh)[1];
                if (helper.isEmpty(hsh_que) || !helper.isQuery(hsh_que)) {
                    return {}
                }
                var que = helper.getQuery(hsh_que);
                if (n.length === 1) {
                    return que.hasOwnProperty(n[0]) ? que[n[0]] : ''
                } else if (n.length !== 0) {
                    var ans = {};
                    for (var i in n) {
                        if (n.hasOwnProperty(i) && que.hasOwnProperty(n[i])) {
                            var v  = n[i];
                            ans[v] = que[v];
                        }
                    }
                    return ans
                }
                return que
            },

            /**
             * set the page hash.
             * @param {string} n
             * @returns boolean
             */
            set : function (n) {
                if ( n === void 0 ) n = '';

                if (!helper.isString(n) || helper.isEmpty(n)) {
                    return false
                }
                helper.setWinHash(n);
                return true
            },

            /**
             * set a value to location hash.
             * @param {string} n
             * @returns boolean
             */
            setValue : function (n) {
                if ( n === void 0 ) n = '';

                if (!helper.isString(n) || helper.isEmpty(n)) {
                    return false
                }
                if (n.includes('?')) {
                    n = helper.replaceAll(n, '?', encodeURIComponent('?'));
                }
                var wh      = helper.getWinHash(),
                    hsh_que = helper.getTrueHash(wh)[1];
                if (helper.isEmpty(wh) || helper.isEmpty(hsh_que)) {
                    helper.setWinHash(n);
                    return true
                }
                helper.setWinHash(n + '?' + hsh_que);
                return true
            },

            /**
             * set a query to location hash.
             * @param {object} n
             * @returns boolean
             */
            setQuery : function (n) {
                if ( n === void 0 ) n = {};

                if (!helper.isObj(n) || n.length === 0) {
                    return false
                }
                var wh   = helper.getWinHash(),
                    hash = helper.getTrueHash(wh)[0],
                    aq   = helper.toQuery(n);
                if (helper.isEmpty(wh) || helper.isEmpty(hash)) {
                    helper.setWinHash('?' + aq);
                    return true
                }
                helper.setWinHash(hash + '?' + aq);
                return true
            },

            /**
             * add a string to location hash.
             * @param {string} n
             * @returns boolean
             */
            add : function (n) {
                if ( n === void 0 ) n = '';

                if (!helper.isString(n) || helper.isEmpty(n)) {
                    return false
                }
                var wh = helper.getWinHash();
                if (helper.isEmpty(wh)) {
                    helper.setWinHash(n);
                    return true
                }
                helper.setWinHash(wh + n);
                return true
            },

            /**
             * add a value to location hash.
             * @param {string} n
             * @returns boolean
             */
            addValue : function (n) {
                if ( n === void 0 ) n = '';

                if (!helper.isString(n) || helper.isEmpty(n)) {
                    return false
                }
                if (n.includes('?')) {
                    n = helper.replaceAll(n, '?', encodeURIComponent('?'));
                }
                var wh      = helper.getWinHash(),
                    hash    = helper.getTrueHash(wh),
                    hsh_val = hash[0],
                    hsh_que = hash[1];
                if (!helper.isEmpty(hsh_val)) {
                    n = hsh_val + n;
                }
                if (!helper.isEmpty(hsh_que)) {
                    n += '?' + hsh_que;
                }
                helper.setWinHash(n);
                return true
            },

            /**
             * add a query to location hash.
             * @param {*} n
             * @returns boolean
             */
            addQuery : function (n) {
                if ( n === void 0 ) n = {};

                if (!helper.isObj(n) || n.length === 0) {
                    return false
                }
                var wh      = helper.getWinHash(),
                    hash    = helper.getTrueHash(wh),
                    hsh_val = hash[0],
                    hsh_que = hash[1],
                    vl      = '';
                if (!helper.isEmpty(hsh_que)) {
                    var oq  = helper.getQuery(hsh_que);
                    n       = Object.assign(oq, n);
                }
                if (!helper.isEmpty(hsh_val)) {
                    vl += hsh_val;
                }
                vl += '?' + helper.toQuery(n);
                helper.setWinHash(vl);
                return true
            },

            /**
             * update a query value in location hash.
             * @param {string} n
             * @param {string|null|number} e
             * @returns boolean
             */
            updateQuery : function (n, e) {
                if (!helper.isString(n) || !(helper.isString(e) || helper.isNum(e) || helper.isNull(e))) {
                    return false
                }
                var wh      = helper.getWinHash(),
                    hash    = helper.getTrueHash(wh),
                    hsh_val = hash[0],
                    hsh_que = hash[1],
                    vl      = '',
                    cl      = {},
                    ch      = 0;
                if (helper.isEmpty(hsh_que)) {
                    return false
                }
                if (!helper.isEmpty(hsh_val)) {
                    vl += hsh_val;
                }
                var que = helper.getQuery(hsh_que);
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
                vl += '?' + helper.toQuery(cl);
                helper.setWinHash(vl);
                return ch !== 0
            },

            /**
             * check if hash is locked.
             * @param {object} n
             * @returns boolean
             */
            isLocked : function (n) {
                if ( n === void 0 ) n = {};

                if (!helper.isDef(n) || !helper.isObj(n)) {
                    return false
                }
                return locked
            },

            /**
             * unlock location's hash.
             * @param {object} n
             * @returns boolean
             */
            unLock : function (n) {
                if ( n === void 0 ) n = {};

                if (!helper.isDef(n) || !helper.isObj(n)) {
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
            lock : function (n) {
                if ( n === void 0 ) n = {};

                if (locked || !helper.isDef(n) || !helper.isObj(n)) {
                    return false
                }
                var is_force = 'force' in n ? helper.getBool(n.force) : false;
                locked       = true;
                force_lock   = is_force;
                var wh     = helper.getWinHash();
                window.onhashchange = function() {
                    if (locked) {
                        helper.setWinHash(wh);
                    }
                };
                return true
            },

            /**
             * checking with equals in location hash.
             * @param {string} n
             * @returns boolean
             */
            is : function (n) {
                if ( n === void 0 ) n = '';

                if (!helper.isString(n)) {
                    return false
                }
                return helper.getWinHash() === n
            },

            /**
             * checking for value string in location hash.
             * @param {string} n
             * @return boolean
             */
            isValue : function (n) {
                if ( n === void 0 ) n = '';

                if (!helper.isString(n)) {
                    return false
                }
                var wh = helper.getWinHash(),
                    hash = helper.getTrueHash(wh)[0];
                return hash === n
            },

            /**
             * check for query value in location hash.
             * @param {string} n
             * @param {string|null|number} e
             * @returns boolean
             */
            isQuery : function (n, e) {
                if (!helper.isString(n) || helper.isEmpty(n) ||
                    (!helper.isString(e) && !helper.isNum(e) && !helper.isNull(e))) {
                    return false
                }
                var wh      = helper.getWinHash(),
                    hsh_que = helper.getTrueHash(wh)[1];
                if (helper.isEmpty(hsh_que)) {
                    return false
                }
                var que = helper.getQuery(hsh_que);
                if (!que.hasOwnProperty(n)) {
                    return false
                }
                return que[n] === e
            }

        }

    }

    // set main Hash.js definer

    // config options
    var configs = {};

    // set main hash.js function
    var Hash = function (n) {
        if ( n === void 0 ) n = {};

        n = Object.assign(configs, n);
        return components()
    };

    return Hash;

});
