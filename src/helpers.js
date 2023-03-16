import info from "./info.js";
import message from "./message.js";
import {default as conf} from "./config.js";
import {and_symbol, equ_symbol, que_symbol} from "./vars.js";

/**
 * check if the variable is defined.
 * @param {*} h The input variable of check
 * @returns {boolean}
 */
export function isDef(h) {
    return typeof h !== 'undefined' && h !== null;
}

/**
 * check if variable is not defined.
 * @param {*} h The input variable of check
 * @returns
 */
export function isUnDef(h) {
    return typeof h === 'undefined' || h === null;
}

/**
 * check if the type of variable is string.
 * @param {*} h The input variable of check
 * @returns
 */
export function isString(h) {
    return typeof h === 'string';
}

/**
 * check if the type of variable is boolean
 * @param {*} h The input variable of check
 * @returns
 */
export function isBool(h) {
    return typeof h === 'boolean';
}

/**
 * Convert anything to boolean data type.
 * @param {string|boolean|number} h The input data
 * @returns
 */
export function getBool(h) {
    if (isBool(h)) {
        return h;
    }

    return (isString(h) && h.toLowerCase() === 'true') ||
        (isNum(h) && h === 1);
}

/**
 * check if the type of variable is object.
 * @param {*} h The input data
 * @returns
 */
export function isObj(h) {
    return h !== null && typeof h === 'object' && h.constructor === Object;
}

/**
 * check if the type of variable is function.
 * @param {*} h The input data
 * @returns
 */
export function isFunc(h) {
    return typeof h === 'function';
}

/**
 * replace all a to b in a string data.
 * @param {string} h The input string
 * @param {string} a Needle string
 * @param {string} b Replace with
 * @returns
 */
export function replaceAll(h, a, b) {
    return h.split(a).join(b);
}

/**
 * run a callback using argument is safe mode.
 * @param {function}    func    Function name
 * @param {*}           th      Function this argument
 * @param {*}           args    Function other arguments
 * @returns
 */
export function lunchFunc(func, th, ...args) {
    if (isFunc(func)) {
        return func.call(th, ...args);
    }

    return null;
}

/**
 * check if the type of variable is number.
 * @param {*} h The input data
 * @returns
 */
export function isNum(h) {
    return h !== null && !isNaN(h) && typeof h === 'number';
}

/**
 * check if data is numeric.
 * @param {*} h The input data
 * @returns
 */
export function isNumeric(h) {
    return !isEmpty(h) && !isNaN(Number(h));
}

/**
 * check if the value of variable is empty.
 * @param {*} h The input data
 * @returns
 */
export function isEmpty(h) {
    if (isUnDef(h)) {
        return true;
    } else if (isString(h)) {
        return h === '';
    } else if (isArr(h)) {
        return h.length === 0;
    } else if (isObj(h)) {
        return objSize(h) === 0;
    }

    return false;
}

/**
 * check if the value of variable is null.
 * @param {*} h The input data
 * @returns
 */
export function isNull(h) {
    return h == null;
}

/**
 * get the object length
 * @param {object} h The object
 * @returns The object length/size
 */
export function objSize(h) {
    if (!isDef(h) || !isObj(h)) {
        return 0;
    }

    return Object.entries(h).length || 0;
}

/**
 * split just one time in string.
 * @param {string} string The input string
 * @param {string} delim  The delim for split
 * @returns
 */
export function splitOnce(string, delim) {
    let components = string.split(delim);
    return [components.shift(), components.join(delim)];
}

/**
 * split just one time in string from end.
 * @param {string} string The input string
 * @param {string} delim  The delim for split
 * @returns
 */
export function splitOnceEnd(string, delim) {
    let components = string.split(delim);
    return [components.slice(0, components.length - 1).join(delim), components.pop()];
}

/**
 * check if the type of variable is array.
 * @param {*} h The input data
 * @returns
 */
export function isArr(h) {
    return isDef(h) && Array.isArray(h);
}

/**
 * convert data to string
 * @param {*} h
 * @returns
 */
export function getString(h) {
    return isString(h) ? h : h.toString();
}

/**
 * check if string is query
 * @param {string} q The input string
 * @returns
 */
export function isQuery(q) {
    if (!isString(q)) {
        return false;
    }

    return (new RegExp('.+(=|).*', 'g')).test(q);
}

/**
 * get all values and names of query.
 * @param {string} q The query string without "?"
 * @returns
 */
export function getQuery(q) {
    if (!isQuery(q) || isEmpty(q)) {
        return {};
    }

    const parseValue  = conf.get('parseQueryValue', true);
    const equalSymbol = conf.getPri(equ_symbol, 'equSymbol', 'querySymbols.equ');
    const andSymbol   = conf.getPri(and_symbol, 'andSymbol', 'querySymbols.and');

    let queryParse  = q.split(andSymbol);
    let output      = {};

    queryParse.forEach((query, i) => {
        if (isEmpty(query)) {
            return {};
        }

        let parse   = splitOnce(query, equalSymbol);
        let len     = query.split(equalSymbol).length;
        let name    = getString(parse[0]);

        if (isEmpty(name)) {
            return {};
        }

        if (len >= 2) {
            let value = getString(parse[1]);

            try {
                value = decodeURIComponent(value);
            } catch (e) {}

            // parse query value to other data types
            if (parseValue && !isEmpty(value)) {
                if (isNumeric(value)) {
                    value = parseInt(value);
                } else if (value === 'true') {
                    value = true;
                } else if (value === 'false') {
                    value = false;
                }
            }

            output[name] = value;
        } else {
            output[name] = null;
        }
    })

    return output;
}

/**
 * convert object to query string.
 * @param {object}  q           The query object
 * @param {boolean} encode_uri  Encode uri component status
 * @returns
 */
export function toQuery(q, encode_uri = true) {
    q = filterQueEntry(q);

    if (isEmpty(q)) {
        return '';
    }

    let collector     = [];
    let equSymbol     = conf.getPri(equ_symbol, 'equSymbol', 'querySymbols.equ');
    let andSymbol     = conf.getPri(and_symbol, 'andSymbol', 'querySymbols.and');

    objForeach(q, ([name, value]) => {
        if (value === undefined) {
            return;
        }

        if (isNull(value)) {
            collector.push(name);
        } else {
            let dataString  = getString(value);
            let dataEncode  = encode_uri ? encodeURIComponent(dataString) : dataString;

            collector.push(name + equSymbol + dataEncode);
        }
    })

    return collector.join(andSymbol);
}

/**
 * get length of all "q" in "t".
 * @param {string} t The input string
 * @param {string} q The input char/string
 * @returns
 */
export function lenOfChar(t, q) {
    if (!isString(t) || !isString(q)) {
        return 0;
    }

    return !t.includes(q) ? 0 : t.split('').filter(i => i === q).length;
}

/**
 * validation a hash for query exists.
 * @param {string} q The hash string
 * @returns
 */
export function isTrueHash(q) {
    if (!isString(q) || isEmpty(q)) {
        return false;
    }

    const queSymbol = conf.getPri(que_symbol, 'queSymbol', 'querySymbols.que');

    if (q.includes(queSymbol)) {
        let queryParse  = splitOnce(q, queSymbol);
        let query       = queryParse[1];

        return isEmpty(query) || isQuery(query);
    }

    return true;
}

/**
 * get hash value and query string.
 * @param {string} q The hash string
 * @returns
 */
export function getTrueHash(q) {
    if (!isString(q) || isEmpty(q)) {
        return ['', ''];
    }

    let empty = [q, ''];

    if (!isTrueHash(q)) {
        return empty;
    }

    let queSymbol = conf.getPri(que_symbol, 'queSymbol', 'querySymbols.que');

    if (q.includes(queSymbol)) {
        return splitOnce(q, queSymbol);
    }

    return empty;
}

/**
 * get the value of window hash.
 * @param {object} options  hash getter options
 *  - decodeValue -> decodeURIComponent act for value
 * @returns
 */
export function getWinHash(options = {
    decodeValue: false
}) {
    // read all options of getter
    const decodeVal = Boolean(options.decodeValue || false);

    // get some basic and window settings
    // we need getCallback to get hash and
    // query symbol to assemble hash with value, query
    const win         = getWindow();
    const getHash     = conf.get('getHashCallback');
    const queSymbol   = conf.getPri(que_symbol, 'queSymbol', 'querySymbols.que');

    // hash, store hash value and update it!
    let hash;

    // if defined in the configuration, get the hash from setCallback
    // or try to get it from location hash
    if (isFunc(getHash)) {
        hash = lunchFunc(getHash);
    } else {
        try {
            hash = win.location.hash;
        } catch (e) {
            err([message.win_problem, e]);
        }
    }

    // check if the hash is empty
    if (isEmpty(hash)) {
        return hash;
    }

    // remove "#" from start
    hash = hash.startsWith('#') ? hash.slice(1) : hash;

    // apply filters, filter to manipulate the hash
    const hashFilter = conf.get('getHashFilter');
    if (isFunc(hashFilter)) {
        hash = lunchFunc(hashFilter, null, hash);
    }

    // parse hash into value and query
    const parsed    = getTrueHash(getString(hash));
    let value       = getString(parsed[0]);
    let query       = getString(parsed[1]);

    // this has two consequences
    // only value or value + query
    if (isEmpty(query)) {
        return decodeData(value);
    }

    // utf8 decode (only for value)
    if (decodeVal) {
        value = decodeData(value);
    }

    // combine params with values to build hash
    return value + queSymbol + query;
}

/**
 * set the window hash.
 * @param {string} q Hash value
 */
export function setWinHash(q) {
    let setHash     = conf.get('setHashCallback');
    let setFilter   = conf.get('setHashFilter');
    let win         = getWindow();

    if (isFunc(setFilter)) {
        q = lunchFunc(setFilter, null, q);
    }

    q = getString(q);

    if (isFunc(setHash)) {
        lunchFunc(setHash, null, q);
    } else {
        try {
            win.location.hash = q;
        } catch (e) {
            err([message.win_problem, e]);
        }
    }
}

/**
 * create object of values.
 */
export function createObjVal(names, value) {
    if (isString(names) && !isEmpty(names)) {
        names = [names];
    }

    if (!isArr(names)) {
        return {};
    }

    // remove empty items
    names = names.filter(i => i !== '');

    if (isEmpty(names)) {
        return {};
    }

    let fetch = {};

    for (let i in names) {
        if (names.hasOwnProperty(i)) {
            fetch[names[i]] = value;
        }
    }

    return fetch;
}

/**
 * check if the parameter/argument is a valid query value type.
 * @param n The input value
 * @returns {*|boolean}
 */
export function isQueParOk(n) {
    return isString(n) || isNull(n) || n === undefined || isNum(n) || isBool(n);
}

/**
 * get window location href.
 * @returns {*}
 */
export function getHref() {
    let href        = '';
    let win         = getWindow();
    let getHref     = conf.get('getHrefCallback');

    if (isFunc(getHref)) {
        href = lunchFunc(getHref);
    } else {
        try {
            href = win.location.href;
        } catch (e) {
            err([message.win_problem, e]);
        }
    }

    // convert to string
    return getString(href);
}

/**
 * get window master.
 * @returns {Window|string|*}
 */
export function getWindow() {
    return conf.get('window') || getDefWindow();
}

/**
 * the default error handle.
 * @param messages    The message of error.
 * @param force_log   The force logger.
 */
export function err(messages, force_log = false) {
    messages = toArray(messages);

    let message = messages.join(', ');

    if (force_log || conf.get('log') === true) {
        throw new Error(`(${info.name}) ${message}`);
    }
}

/**
 * the default warning handle.
 * @param messages    The message of warn.
 * @param force_log   The force logger.
 */
export function warn(messages, force_log = false) {
    messages = toArray(messages);

    let message = messages.join(', ');

    if (force_log || conf.get('log') === true) {
        console.warn(`(${info.name}) ${message}`);
    }
}

/**
 * filter all queries.
 * @param queries
 * @returns {{}|[string, any][]}
 */
export function filterQueEntry(queries) {
    if (!isObj(queries)) {
        return {};
    }

    return objFilter(queries, q => {
        let key     = q[0];
        let value   = q[1];

        return isString(key) && !isEmpty(key) && isQueParOk(value);
    });
}

/**
 * get hash value as string
 * @param wh
 * @returns {*}
 */
export function getHashValue(wh) {
    return decodeData( getTrueHash(wh)[0] );
}

/**
 * get hash query as string
 * @param wh
 * @returns {*}
 */
export function getHashQuery(wh) {
    return getTrueHash(wh)[1];
}

/**
 * set multiple window hash.
 * @param options
 */
export function setEvHash(options = {}) {
    // value is first part of any hash: #value?...
    // in the first we should init value for set any hash
    let value       = '';

    // query is second part of hash: #...?query
    // this one should enter as a key:value object
    let query       = {};

    // get the current window hash as string
    let hash        = getWinHash();

    // trying to parse hash into 2 parts, value and query
    let parse       = getTrueHash(hash);

    // get first part of parsed hash as value
    let hashValue   = parse[0];

    // get first part of parsed hash as query and convert it to object
    let hashQuery   = getQuery(parse[1]);

    // get query symbol with configs
    let queSymbol = conf.getPri(que_symbol, 'queSymbol', 'querySymbols.que');

    // checking for appending "value"
    // if it's defined replace it and else use old value
    if ('value' in options) {
        let val = options.value;
        value = getString(val);

        // encoding all query symbols with "URIComponent" to prevent parsing errors
        if (value.includes(queSymbol)) {
            value = replaceAll(value, queSymbol, encodeURIComponent(queSymbol));
        }
    } else {
        value = hashValue;
    }

    // check for appending "query"
    // if it's defined replace it and else use old query
    if ('query' in options) {
        let que     = options.query;
        let entry   = que.entry || {};
        let type    = que.type || 'merge';

        if (isObj(entry)) {
            entry   = filterQueEntry(entry);

            if (type === 'merge' && !isEmpty(entry)) {
                query = Object.assign(hashQuery, entry);
            } else if (type === 'define') {
                query = entry;
            }
        }
    } else {
        query = hashQuery;
    }

    // setting hash as string
    // it works as a standalone part
    if ('string' in options) {
        let str      = '';

        // old query and value
        let valueStr = parse[0];
        let queryStr = parse[1];

        if (typeof options.string.value !== 'undefined') {
            valueStr = options.string.value;
        }

        if (typeof options.string.query !== 'undefined') {
            queryStr = options.string.query;
        }

        str = valueStr;

        if (!isEmpty(queryStr)) {
            str += queSymbol + queryStr;
        }

        setWinHash(str);

        return;
    }

    let entry = value;

    if (!isEmpty(query)) {
        entry += queSymbol + toQuery(query);
    }

    setWinHash(entry);
}

/**
 * convert data to array.
 * @param data
 * @param filter
 * @returns {*[]|*[]}
 */
export function toArray(data, filter = true) {
    data = isArr(data) ? data : [data];

    if (filter) {
        data = data.filter(d => !isEmpty(d));
    }

    return data;
}

/**
 * object for each function.
 * @param obj
 * @param callback
 */
export function objForeach(obj, callback) {
    Object.entries(obj).forEach(callback);
}

/**
 * object filter action.
 * @param obj
 * @param callback
 * @returns {{[p: string]: unknown}|{}}
 */
export function objFilter(obj, callback) {
    return Object.fromEntries(Object.entries(obj).filter(callback));
}

/**
 * object map action.
 * @param obj
 * @param callback
 * @returns {{}|{[p: string]: any}}
 */
export function objMap(obj, callback) {
    let fetch = {};

    if (!isFunc(callback)) {
        return obj;
    }

    for (let k in obj) {
        let key         = k;
        let value       = obj[key];
        let collect     = callback(k, value);

        if (isArr(collect) && collect.length === 2) {
            key = collect[0];
            value = collect[1];
        }

        fetch[key] = value;
    }

    return fetch;
}

/**
 * parse key-value string of options.
 * you must enter escaped '%2C' instead of ',' for entry data.
 * @param {string} data
 * @param {boolean} multiple
 * @returns {{}}
 */
export function parseKv(data, multiple = true) {
    if (!isString(data)) {
        return {};
    }

    data        = data.trim();
    let loop    = multiple ? data.split(',') : [data];
    let fetch   = {};

    loop.forEach(i => {
        let parse   = splitOnce(i.trim(), ':');
        let key     = decodeURIComponent(parse[0]);
        let value   = decodeURIComponent(parse[1]);

        if (!isEmpty(key)) {
            fetch[key] = value;
        }
    });

    return fetch;
}

/**
 * insert string data.
 * @param data
 * @param index
 * @param insert
 * @returns {string|*}
 */
export function insertStr(data, insert, index) {
    if (!isString(data)) {
        return data;
    }

    if (isString(index)) {
        index = index.trim();

        if (index === '-') {
            index = data.length;
        }

        index = Number(index);
    }

    if (!isNum(index)) {
        return data;
    }

    if (index < 0) {
        index = data.length + index;
    }

    if (index > 0) {
        return data.substring(0, index) + insert + data.substring(index);
    }

    return insert + data;
}

/**
 * Convert key->value data to object for queries
 * objective data.
 * @param data
 * @param value
 * @returns {object|false}
 */
export function toObjQue(data, value) {
    if (isObj(data)) {
        return data;
    }

    if (isString(data) && isQueParOk(value) && !isEmpty(data)) {
        let obj   = {};
        obj[data] = value;

        return obj;
    }

    return false;
}

/**
 * Get hash-value from url address.
 * @param url
 * @returns {string}
 */
export function getUrlHash(url) {
    return splitOnce(url, '#')[1] || '';
}

/**
 * Check for data if instanceof RegExp.
 * @param data
 * @returns {boolean}
 */
export function isRegExp(data) {
    return data instanceof RegExp;
}

/**
 * Trigger the event for hash-events.
 *
 * @param {string}  name
 * @param {any}     target
 */
export function triggerEvent(event, target = null) {
    target = target || getWindow();
    target.dispatchEvent(event);
}

/**
 * Trigger a custom event.
 *
 * @param {string}  name
 * @param {object}  options
 * @param {any}     target
 */
export function triCustomEvent(name, options = {}, target = null) {
    triggerEvent(new CustomEvent(name, options), target);
}

/**
 * Trigger an event.
 *
 * @param {string}  name
 * @param {object}  options
 * @param {any}     target
 */
export function triEvent(name, options = {}, target = null) {
    triggerEvent(new Event(name, options), target);
}

/**
 * Create random string as id.
 *
 * @param   {int}   length  length of string
 * @returns string
 */
export function makeRandStr(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

/**
 * check for equal values.
 * @param {*} a
 * @param {*} b
 * @returns boolean
 */
export function isEqual(a, b) {
    if ((isObj(a) && isObj(b)) ||
        (Array.isArray(a) && Array.isArray(b))) {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    return a === b;
}

/**
 * get default window.
 * @returns {Window}
 */
export function getDefWindow() {
    return window;
}

/**
 * decode uri component
 * for fix "Uncaught URIError: malformed URI sequence" error with "%"
 * @param {string} data
 * @return {string}
 */
export function decodeURI(data) {
    return decodeURIComponent( encodeURIComponent( unescape(data) ) );
}

/**
 * utf8 decode
 * After the original "_decodeData" the data will not be readable and
 * will need another utf8 decoding as a final step.
 * @param {string} data
 * @returns {string}
 */
export function decodeUTF8(data) {
    return decodeURIComponent( escape(data) );
}

/**
 * decode uri + utf8
 * a secure way to decode uri component to prevent error
 * malformed URI sequence after decoding.
 * @param {string} data
 * @returns {string}
 */
export function decodeData(data) {
    return decodeUTF8( decodeURI(data) );
}