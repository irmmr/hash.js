import info from "./info"
import message from "./message"
import {default as conf} from "./config.js"

/**
 * check if the variable is defined.
 * @param {*} h The input variable of check
 * @returns {boolean}
 */
export function isDef(h) {
    return typeof h !== undefined && h !== null
}

/**
 * check if variable is not defined.
 * @param {*} h The input variable of check
 * @returns
 */
export function isUnDef(h) {
    return typeof h === undefined || h === null
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

    return isString(h) && h.toLowerCase() === 'true'
}

/**
 * check if the type of variable is object.
 * @param {*} h The input data
 * @returns
 */
export function isObj(h) {
    return h !== null && typeof h === 'object'
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
 * @param {*}         argc Function arguments
 * @returns
 */
export function lunchFunc(func, argc = null) {
    return isFunc(func) ? argc !== null ? func(argc) : func() : null
}

/**
 * check if the type of variable is number.
 * @param {*} h The input data
 * @returns
 */
export function isNum(h) {
    return isDef(h) && !isNaN(Number(h))
}

/**
 * check if the value of variable is empty.
 * @param {*} h The input data
 * @returns
 */
export function isEmpty(h) {
    if (isString(h)) {
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
    let size = 0, key

    if (!isDef(h) || !isObj(h)) {
        return size
    }

    for (key in h) {
        if (h.hasOwnProperty(key)) {
            size ++
        }
    }

    return size
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

    if (!q.startsWith('?')) {
        q = '?' + q
    }

    return (new RegExp(/\?.+(=|).*/g)).test(q)
}

/**
 * get all values and names of query.
 * @param {string} q The query string without "?"
 * @returns
 */
export function getQuery(q) {
    if (!isQuery(q)) {
        return {}
    }

    let qa     = q.split('&'),
        output = {}, i

    for (i in qa) {
        if (!qa.hasOwnProperty(i)) continue

        let query    = qa[i],
            q_parse  = splitOnce(query, '='),
            q_len    = query.split('=').length,
            needle   = getString(q_parse[0])

        if (isEmpty(query)) {
            continue
        }

        if (q_len >= 2) {
            let val     = getString(q_parse[1])

            try {
                val = decodeURIComponent(val)
            } catch (e) {}

            output[needle] = val
        } else {
            output[needle] = null
        }
    }

    return output
}

/**
 * convert object to query string.
 * @param {object}  q           The query object
 * @param {boolean} encode_uri  Encode uri component status
 * @returns
 */
export function toQuery(q, encode_uri = false) {
    if (!isObj(q)) {
        return ''
    }

    let collector = [], i

    for (i in q) {
        if (!q.hasOwnProperty(i) || q[i] === undefined) continue

        let data_val = q[i]

        if (isNull(data_val)) {
            collector.push(i)
        } else {
            let data_str    = getString(data_val),
                data_encode = encode_uri ? encodeURIComponent(data_str) : data_str
            collector.push(i + '=' + data_encode)
        }
    }

    return collector.join('&')
}

/**
 * get length of all "q" in "t".
 * @param {string} t The input string
 * @param {string} q The input char/string
 * @returns
 */
export function lenOfChar(t, q) {
    return !t.includes(q) ? 0 : t.split('').filter(i => i === q).length
}

/**
 * validation a hash for query exists.
 * @param {string} q The hash string
 * @returns
 */
export function isTrueHash(q) {
    if (!isString(q)) {
        return false
    }

    if (q.includes('?')) {
        let spt = splitOnce(q, '?'),
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
    if (!isString(q)) {
        return ['', '']
    }

    let emp = [q, '']

    if (!isTrueHash(q)) {
        return emp
    }

    if (q.includes('?')) {
        return splitOnce(q, '?')
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
        if (typeof win.location !== 'undefined' &&
            typeof win.location.hash !== 'undefined') {
            hash = win.location.hash
        } else {
            err(message.win_problem)
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
        if (typeof win.location !== 'undefined' &&
            typeof win.location.hash !== 'undefined') {

            win.location.hash = q

        } else {
            err(message.win_problem)
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
        if (typeof win.location !== 'undefined' &&
            typeof win.location.href !== 'undefined') {

            href = win.location.href

        } else {
            err(message.win_problem)
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
 * @param message    The message of error.
 * @param force_log  The force logger.
 */
export function err(message, force_log = false) {
    if (force_log || conf.get('log') === true) {
        throw new Error(info.name + " -> " + message)
    }
}
