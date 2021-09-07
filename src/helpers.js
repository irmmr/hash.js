// define main helpers handle
import vars from "./vars";
import info from "./info";
import message from "./message";

export default class HashHelper {
    /**
     * get a config value for other methods for helpers.
     *
     * @param   name    The name of config.
     * @param   def     The default value of config.
     * @returns {string|*}
     * @private
     */
    __conf(name = '', def = null) {
        if ('' === name) return this._conf
        return this.__has_conf(name) ? this._conf[name] : def
    }

    /**
     * check for a config exists.
     * @param   name     The name if config.
     * @returns {boolean}
     * @private
     */
    __has_conf(name) {
        return typeof this._conf[name] !== 'undefined'
    }

    /**
     * main constructor.
     * @param configs
     */
    constructor(configs = {}) {
        this._conf = configs
    }

    /**
     * re-load all configs.
     *
     * @param   configs Entry options
     */
    __config(configs) {
        this._conf = configs
    }

    /**
     * check if the variable is defined.
     * @param {*} h The input variable of check
     * @returns {boolean}
     */
    isDef(h) {
        return typeof h !== undefined && h !== null
    }

    /**
     * check if variable is not defined.
     * @param {*} h The input variable of check
     * @returns 
     */
    isUnDef(h) {
        return typeof h === undefined || h === null
    }

    /**
     * check if the type of variable is string.
     * @param {*} h The input variable of check
     * @returns 
     */
    isString(h) {
        return this.isDef(h) && typeof h === 'string'
    }

    /**
     * check if the type of variable is boolean
     * @param {*} h The input variable of check
     * @returns 
     */
    isBool(h) {
        return this.isDef(h) && typeof h === 'boolean'
    }

    /**
     * Convert anything to boolean data type.
     * @param {string|boolean|number} h The input data
     * @returns
     */
    getBool(h) {
        if (this.isBool(h)) {
            return h
        }
        return this.isString(h) && h.toLowerCase() === 'true'
    }

    /**
     * check if the type of variable is object.
     * @param {*} h The input data
     * @returns 
     */
    isObj(h) {
        return h !== null && typeof h === 'object'
    }

    /**
     * check if the type of variable is function.
     * @param {*} h The input data
     * @returns 
     */
    isFunc(h) {
        return this.isDef(h) && typeof h === 'function'
    }

    /**
     * replace all a to b in a string data.
     * @param {string} h The input string
     * @param {string} a Needle string
     * @param {string} b Replace with
     * @returns 
     */
    replaceAll(h, a, b) {
        return h.split(a).join(b)
    }

    /**
     * run a callback using argument is safe mode.
     * @param {function}  func Function name
     * @param {*}         argc Function arguments
     * @returns 
     */
    lunchFunc(func, argc = null) {
        return this.isFunc(func) ? argc !== null ? func(argc) : func() : null
    }

    /**
     * check if the type of variable is number.
     * @param {*} h The input data
     * @returns 
     */
    isNum(h) {
        return this.isDef(h) && Number.isNaN(Number(h))
    }

    /**
     * check if the value of variable is empty.
     * @param {*} h The input data
     * @returns 
     */
    isEmpty(h) {
        if (this.isString(h)) {
            return h === ''
        } else if (this.isArr(h)) {
            return h.length === 0
        } else if (this.isObj(h)) {
            return this.objSize(h) === 0
        }
        return false
    }

    /**
     * check if the value of variable is null.
     * @param {*} h The input data
     * @returns 
     */
    isNull(h) {
        return h == null
    }

    /**
     * get the object length
     * @param {object} h The object
     * @returns The object length/size
     */
    objSize(h) {
        let size = 0, key
        if (!this.isDef(h) || !this.isObj(h)) {
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
    splitOnce(string, delim) {
        let components = string.split(delim)
        return [components.shift(), components.join(delim)]
    }

    /**
     * split just one time in string from end.
     * @param {string} string The input string
     * @param {string} delim  The delim for split
     * @returns
     */
    splitOnceEnd(string, delim) {
        let components = string.split(delim)
        return [components.slice(0, components.length - 1).join(delim), components.pop()]
    }
    
    /**
     * check if the type of variable is array.
     * @param {*} h The input data
     * @returns 
     */
    isArr(h) {
        return this.isDef(h) && Array.isArray(h)
    }

    /**
     * convert data to string
     * @param {*} h 
     * @returns 
     */
    getString(h) {
        if (typeof h === 'undefined') return ''
        return this.isString(h) ? h : h.toString()
    }

    /**
     * check if string is query
     * @param {string} q The input string
     * @returns 
     */
    isQuery(q) {
        if (!this.isString(q)) {
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
    getQuery(q) {
        if (!this.isQuery(q)) {
            return {}
        }
        let qa = q.split('&'),
            output = {}
        for (let i in qa) {
            if (!qa.hasOwnProperty(i)) continue
            let query    = qa[i],
                q_parse  = this.splitOnce(query, '='),
                q_len    = query.split('=').length,
                needle   = this.getString(q_parse[0])
            if (this.isEmpty(query)) {
                continue
            }
            if (q_len >= 2) {
                let val        = this.getString(q_parse[1])
                output[needle] = decodeURIComponent(val)
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
    toQuery(q, encode_uri = false) {
        if (!this.isDef(q) || !this.isObj(q)) {
            return ''
        }
        let collector = []
        for (let i in q) {
            if (!q.hasOwnProperty(i) || q[i] === undefined) continue
            let data_val = q[i]
            if (this.isNull(data_val)) {
                collector.push(i)
            } else {
                let data_str    = this.getString(data_val),
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
    lenOfChar(t, q) {
        if (!t.includes(q)) {
            return 0
        }
        return t.split('').filter(i => i === q).length
    }

    /**
     * validation a hash for query exists.
     * @param {string} q The hash string
     * @returns 
     */
    isTrueHash(q) {
        if (!this.isString(q)) {
            return false
        }
        if (q.includes('?')) {
            let spt = this.splitOnce(q, '?'),
                que = spt[1]
            return this.isEmpty(que) || this.isQuery(que)
        }
        return true
    }

    /**
     * get hash value and query string.
     * @param {string} q The hash string
     * @returns 
     */
    getTrueHash(q) {
        if (!this.isString(q)) {
            return ['', '']
        }
        let emp = [q, '']
        if (!this.isTrueHash(q)) {
            return emp
        }
        if (q.includes('?')) {
            return this.splitOnce(q, '?')
        }
        return emp
    }

    /**
     * get the value of window hash.
     * @returns 
     */
    getWinHash() {
        let hash = '',
            win  = this.getWindow(),
            hsh  = this.__conf('getHashCallback')
        if (this.isFunc(hsh)) {
            hash = this.lunchFunc(hsh)
        } else {
            if (typeof win.location !== 'undefined' &&
                typeof win.location.hash !== 'undefined') {
                hash = win.location.hash
            } else {
                this.err(message.win_problem)
            }
        }
        // convert to string
        hash = this.getString(hash)
        // apply filters
        let fil = this.__conf('getHashFilter')
        if (this.isFunc(fil)) {
            hash = this.lunchFunc(fil, hash)
        }
        // convert again to string
        hash = this.getString(hash)
        return hash.startsWith('#') ? hash.slice(1) : hash
    }

    /**
     * set the window hash.
     * @param {string} q Hash value
     */
    setWinHash(q) {
        let handle = this.__conf('setHashCallback'),
            filter = this.__conf('setHashFilter'),
            win    = this.getWindow()
        if (this.isFunc(filter)) {
            q = this.lunchFunc(filter, q)
        }
        q = this.getString(q)
        if (this.isFunc(handle)) {
            this.lunchFunc(handle, q)
        } else {
            if (typeof win.location !== 'undefined' &&
                typeof win.location.hash !== 'undefined') {
                win.location.hash = q
            } else {
                this.err(message.win_problem)
            }
        }
    }

    /**
     * create object of values.
     */
    createObjVal(names, value) {
        if (this.isString(names) && !this.isEmpty(names)) {
            names = [names]
        }
        if (!this.isArr(names)) {
            return {}
        }
        names = names.filter(i => i !== '')
        if (this.isEmpty(names)) {
            return {}
        }
        let fetch = {}
        for (let i in names) {
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
    isQueParOk(n) {
        return this.isString(n) || this.isNull(n) || n === undefined || this.isNum(n)
    }

    /**
     * get window location href.
     * @returns {*}
     */
    getHref() {
        let href = '',
            win  = this.getWindow(),
            hsh  = this.__conf('getHrefCallback')
        if (this.isFunc(hsh)) {
            href = this.lunchFunc(hsh)
        } else {
            if (typeof win.location !== 'undefined' &&
                typeof win.location.href !== 'undefined') {
                href = win.location.href
            } else {
                this.err(message.win_problem)
            }
        }
        // convert to string
        return this.getString(href)
    }

    /**
     * get window master.
     * @returns {Window|string|*}
     */
    getWindow() {
        return this.__conf('window') || window
    }

    /**
     * the default error handle.
     * @param message    The message of error.
     * @param force_log  The force logger.
     */
    err(message, force_log = false) {
        if (force_log || this.__conf('log') === true) {
            throw new Error(info.name + " -> " + message)
        }
    }

}
