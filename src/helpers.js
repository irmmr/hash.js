import info from "./info.js"
import message from "./message.js"
import {default as conf} from "./config.js"
import {and_symbol, equ_symbol, que_symbol} from "./vars.js"

/**
 * check if the variable is defined.
 * @param {*} h The input variable of check
 * @returns {boolean}
 */
export function isDef(h) {
    return typeof h !== 'undefined' && h !== null
}

/**
 * check if variable is not defined.
 * @param {*} h The input variable of check
 * @returns
 */
export function isUnDef(h) {
    return typeof h === 'undefined' || h === null
}

/**
 * check if the type of variable is string.
 * @param {*} h The input variable of check
 * @returns
 */
export function isString(h) {
    return typeof h === 'string'
}

/**
 * check if the type of variable is boolean
 * @param {*} h The input variable of check
 * @returns
 */
export function isBool(h) {
    return typeof h === 'boolean'
}

/**
 * Convert anything to boolean data type.
 * @param {string|boolean|number} h The input data
 * @returns
 */
export function getBool(h) {
    if (isBool(h)) {
        return h
    }

    return (isString(h) && h.toLowerCase() === 'true') ||
        (isNum(h) && h === 1)
}

/**
 * check if the type of variable is object.
 * @param {*} h The input data
 * @returns
 */
export function isObj(h) {
    return h !== null && typeof h === 'object' && h.constructor === Object
}

/**
 * check if the type of variable is function.
 * @param {*} h The input data
 * @returns
 */
export function isFunc(h) {
    return typeof h === 'function'
}

/**
 * replace all a to b in a string data.
 * @param {string} h The input string
 * @param {string} a Needle string
 * @param {string} b Replace with
 * @returns
 */
export function replaceAll(h, a, b) {
    return h.split(a).join(b)
}

/**
 * run a callback using argument is safe mode.
 * @param {function}  func Function name
 * @returns
 */
export function lunchFunc(func) {
    let args = Array.prototype.slice.call(arguments).slice(1)

    if (isFunc(func)) {
        let th = {func, args}
        return args.length !== 0 ? func.call(th, args) : func.call(th)
    }

    return null
}

/**
 * check if the type of variable is number.
 * @param {*} h The input data
 * @returns
 */
export function isNum(h) {
    return h !== null && !isNaN(h) && typeof h === 'number'
}

/**
 * check if data is numeric.
 * @param {*} h The input data
 * @returns
 */
export function isNumeric(h) {
    return isDef(h) && !isNaN(Number(h))
}

/**
 * check if the value of variable is empty.
 * @param {*} h The input data
 * @returns
 */
export function isEmpty(h) {
    if (isUnDef(h)) {
        return true
    } else if (isString(h)) {
        return h === ''
    } else if (isArr(h)) {
        return h.length === 0
    } else if (isObj(h)) {
        return objSize(h) === 0
    }

    return false
}

/**
 * check if the value of variable is null.
 * @param {*} h The input data
 * @returns
 */
export function isNull(h) {
    return h == null
}

/**
 * get the object length
 * @param {object} h The object
 * @returns The object length/size
 */
export function objSize(h) {
    if (!isDef(h) || !isObj(h)) {
        return 0
    }

    return Object.entries(h).length || 0
}

/**
 * split just one time in string.
 * @param {string} string The input string
 * @param {string} delim  The delim for split
 * @returns
 */
export function splitOnce(string, delim) {
    let components = string.split(delim)
    return [components.shift(), components.join(delim)]
}

/**
 * split just one time in string from end.
 * @param {string} string The input string
 * @param {string} delim  The delim for split
 * @returns
 */
export function splitOnceEnd(string, delim) {
    let components = string.split(delim)
    return [components.slice(0, components.length - 1).join(delim), components.pop()]
}

/**
 * check if the type of variable is array.
 * @param {*} h The input data
 * @returns
 */
export function isArr(h) {
    return isDef(h) && Array.isArray(h)
}

/**
 * convert data to string
 * @param {*} h
 * @returns
 */
export function getString(h) {
    return isString(h) ? h : h.toString()
}

/**
 * check if string is query
 * @param {string} q The input string
 * @returns
 */
export function isQuery(q) {
    if (!isString(q)) {
        return false
    }

    return (new RegExp('.+(=|).*', 'g')).test(q)
}

/**
 * get all values and names of query.
 * @param {string} q The query string without "?"
 * @returns
 */
export function getQuery(q) {
    if (!isQuery(q) || isEmpty(q)) {
        return {}
    }

    let equ_sym = conf.get('equSymbol', equ_symbol),
        and_sym = conf.get('andSymbol', and_symbol)

    let qa     = q.split(and_sym),
        output = {}

    qa.forEach((query, i) => {
        if (isEmpty(query)) {
            return {}
        }

        let parse   = splitOnce(query, equ_sym),
            len     = query.split(equ_sym).length,
            name    = getString(parse[0])

        if (isEmpty(name)) {
            return {}
        }

        if (len >= 2) {
            let value = getString(parse[1])

            try {
                value = decodeURIComponent(value)
            } catch (e) {}

            output[name] = value
        } else {
            output[name] = null
        }
    })

    return output
}

/**
 * convert object to query string.
 * @param {object}  q           The query object
 * @param {boolean} encode_uri  Encode uri component status
 * @returns
 */
export function toQuery(q, encode_uri = false) {
    q = filterQueEntry(q)

    if (isEmpty(q)) {
        return ''
    }

    let collector   = [],
        equ_sym     = conf.get('equSymbol', equ_symbol),
        and_sym     = conf.get('andSymbol', and_symbol)

    objForeach(q, ([name, value]) => {
        if (value === undefined) {
            return
        }

        if (isNull(value)) {
            collector.push(name)
        } else {
            let data_str    = getString(value),
                data_encode = encode_uri ? encodeURIComponent(data_str) : data_str
            collector.push(name + equ_sym + data_encode)
        }
    })

    return collector.join(and_sym)
}

/**
 * get length of all "q" in "t".
 * @param {string} t The input string
 * @param {string} q The input char/string
 * @returns
 */
export function lenOfChar(t, q) {
    if (!isString(t) || !isString(q)) {
        return 0
    }

    return !t.includes(q) ? 0 : t.split('').filter(i => i === q).length
}

/**
 * validation a hash for query exists.
 * @param {string} q The hash string
 * @returns
 */
export function isTrueHash(q) {
    if (!isString(q) || isEmpty(q)) {
        return false
    }

    let que_sym = conf.get('queSymbol', que_symbol)

    if (q.includes(que_sym)) {
        let spt = splitOnce(q, que_sym),
            que = spt[1]

        return isEmpty(que) || isQuery(que)
    }

    return true
}

/**
 * get hash value and query string.
 * @param {string} q The hash string
 * @returns
 */
export function getTrueHash(q) {
    if (!isString(q) || isEmpty(q)) {
        return ['', '']
    }

    let emp = [q, '']

    if (!isTrueHash(q)) {
        return emp
    }

    let que_sym = conf.get('queSymbol', que_symbol)

    if (q.includes(que_sym)) {
        return splitOnce(q, que_sym)
    }

    return emp
}

/**
 * get the value of window hash.
 * @returns
 */
export function getWinHash() {
    let hash = '',
        win  = getWindow(),
        hsh  = conf.get('getHashCallback')

    if (isFunc(hsh)) {
        hash = lunchFunc(hsh)
    } else {
        try {
            hash = win.location.hash
        } catch (e) {
            err([message.win_problem, e])
        }
    }

    // convert to string
    hash = getString(hash)

    // apply filters
    let fil = conf.get('getHashFilter')

    if (isFunc(fil)) {
        hash = lunchFunc(fil, hash)
    }

    // convert again to string
    hash = getString(hash)

    return hash.startsWith('#') ? hash.slice(1) : hash
}

/**
 * set the window hash.
 * @param {string} q Hash value
 */
export function setWinHash(q) {
    let handle = conf.get('setHashCallback'),
        filter = conf.get('setHashFilter'),
        win    = getWindow()

    if (isFunc(filter)) {
        q = lunchFunc(filter, q)
    }

    q = getString(q)

    if (isFunc(handle)) {
        lunchFunc(handle, q)
    } else {
        try {
            win.location.hash = q
        } catch (e) {
            err([message.win_problem, e])
        }
    }

}

/**
 * create object of values.
 */
export function createObjVal(names, value) {
    if (isString(names) && !isEmpty(names)) {
        names = [names]
    }

    if (!isArr(names)) {
        return {}
    }

    names = names.filter(i => i !== '')

    if (isEmpty(names)) {
        return {}
    }

    let fetch = {}, i

    for (i in names) {
        if (!names.hasOwnProperty(i)) continue
        fetch[names[i]] = value
    }

    return fetch
}

/**
 * check if the parameter/argument is a valid query value type.
 * @param n The input value
 * @returns {*|boolean}
 */
export function isQueParOk(n) {
    return isString(n) || isNull(n) || n === undefined || isNum(n)
}

/**
 * get window location href.
 * @returns {*}
 */
export function getHref() {
    let href = '',
        win  = getWindow(),
        hsh  = conf.get('getHrefCallback')

    if (isFunc(hsh)) {
        href = lunchFunc(hsh)
    } else {
        try {
            href = win.location.href
        } catch (e) {
            err([message.win_problem, e])
        }
    }

    // convert to string
    return getString(href)
}

/**
 * get window master.
 * @returns {Window|string|*}
 */
export function getWindow() {
    return conf.get('window') || window
}

/**
 * the default error handle.
 * @param messages    The message of error.
 * @param force_log   The force logger.
 */
export function err(messages, force_log = false) {
    messages = toArray(messages)

    let message = messages.join(', ')
    if (force_log || conf.get('log') === true) {
        throw new Error(`(${info.name}) ${message}`)
    }
}

/**
 * filter all queries.
 * @param queries
 * @returns {{}|[string, any][]}
 */
export function filterQueEntry(queries) {
    if (!isObj(queries)) {
        return {}
    }

    return objFilter(queries, q => {
        let key     = q[0],
            value   = q[1]
        return isString(key) && !isEmpty(key) && isQueParOk(value)
    })
}

/**
 * get hash value as string
 * @param wh
 * @returns {*}
 */
export function getHashValue(wh) {
    return getTrueHash(wh)[0]
}

/**
 * get hash query as string
 * @param wh
 * @returns {*}
 */
export function getHashQuery(wh) {
    return getTrueHash(wh)[1]
}

/**
 * set multiple window hash.
 * @param options
 */
export function setEvHash(options = {}) {
    let value = '',
        query = {},
        wh      = getWinHash(),
        parse   = getTrueHash(wh),
        cu_val  = parse[0],
        cu_que  = getQuery(parse[1])

    let que_sym = conf.get('queSymbol', que_symbol)

    if ('value' in options) {
        let v = options.value
        value = getString(v)

        if (value.includes(que_sym)) {
            value = replaceAll(value, que_sym, encodeURIComponent(que_sym))
        }
    } else {
        value = cu_val
    }

    if ('query' in options) {
        let q     = options.query,
            entry = q.entry || {},
            type  = q.type || 'merge'

        if (isObj(entry)) {
            entry   = filterQueEntry(entry)

            if (type === 'merge' && !isEmpty(entry)) {
                query = Object.assign(cu_que, entry)
            } else if (type === 'define') {
                query = entry
            }
        }
    } else {
        query = cu_que
    }

    // enter hash using string type
    if ('string' in options) {
        let str = '',
            sv = parse[0],
            sq = parse[1]

        if (typeof options.string.value !== 'undefined') {
            sv = options.string.value
        }

        if (typeof options.string.query !== 'undefined') {
            sq = options.string.query
        }

        str = sv
        if (!isEmpty(sq)) {
            str += que_sym + sq
        }

        setWinHash(str)
        return
    }

    let entry = value

    if (!isEmpty(query)) {
        entry += que_sym + toQuery(query)
    }

    setWinHash(entry)
}

/**
 * convert data to array.
 * @param data
 * @param filter
 * @returns {*[]|*[]}
 */
export function toArray(data, filter = true) {
    data = isArr(data) ? data : [data]

    if (filter) {
        data = data.filter(d => !isEmpty(d))
    }

    return data
}

/**
 * object for each function.
 * @param obj
 * @param callback
 */
export function objForeach(obj, callback) {
    Object.entries(obj).forEach(callback)
}

/**
 * object filter action.
 * @param obj
 * @param callback
 * @returns {{[p: string]: unknown}|{}}
 */
export function objFilter(obj, callback) {
    return Object.fromEntries(Object.entries(obj).filter(callback))
}

/**
 * object map action.
 * @param obj
 * @param callback
 * @returns {{}|{[p: string]: any}}
 */
export function objMap(obj, callback) {
    let cl = {}, k

    if (!isFunc(callback)) {
        return obj
    }

    for (k in obj) {
        let key = k,
            val = obj[key],
            c   = callback(k, val)

        if (isArr(c) && c.length === 2) {
            key = c[0]
            val = c[1]
        }

        cl[key] = val
    }

    return cl
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
        return {}
    }

    data        = data.trim()
    let loop    = multiple ? data.split(',') : [data],
        cl      = {}

    loop.forEach(i => {
        let kv  = splitOnce(i.trim(), ':'),
            k   = unescape(kv[0]),
            v   = unescape(kv[1])

        if (!isEmpty(k)) {
            cl[k] = v
        }
    })

    return cl
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
        return data
    }

    if (isString(index)) {
        index = index.trim()

        if (index === '-') {
            index = data.length
        }

        index = Number(index)
    }

    if (!isNum(index)) {
        return data
    }

    if (index < 0) {
        index = data.length + index
    }

    if (index > 0) {
        return data.substring(0, index) + insert + data.substr(index)
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
        return data
    }

    if (isString(data) && isQueParOk(value) && !isEmpty(data)) {
        let d   = {}
        d[data] = value

        return d
    }

    return false
}

/**
 * Get hash-value from url address.
 * @param url
 * @returns {string}
 */
export function getUrlHash(url) {
    return splitOnce(url, '#')[1] || ''
}

/**
 * Check for data if instanceof RegExp.
 * @param data
 * @returns {boolean}
 */
export function isRegExp(data) {
    return data instanceof RegExp
}
