// define main helpers handle
export default {

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
    lunchFunc: function (func, argc = null) {
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
    },

    /**
     * split just one time in string.
     * @param {string} string The input string
     * @param {string} delim  The delim for split
     * @returns 
     */
    splitOnce: function (string, delim) {
        let components = string.split(delim)
        return [components.shift(), components.join(delim)]
    },

    /**
     * split just one time in string from end.
     * @param {string} string The input string
     * @param {string} delim  The delim for split
     * @returns
     */
    splitOnceEnd: function (string, delim) {
        let components = string.split(delim)
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
            q = '?' + q
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
        let qa = q.split('&'),
            output = {}
        for (let i in qa) {
            if (!qa.hasOwnProperty(i)) {
                continue
            }
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
    },
    
    /**
     * convert object to query string.
     * @param {object}  q           The query object
     * @param {boolean} encode_uri  Encode uri component status
     * @returns 
     */
    toQuery: function (q, encode_uri = false) {
        if (!this.isDef(q) || !this.isObj(q)) {
            return ''
        }
        let all_query = '',
            que_size  = this.objSize(q),
            num_data  = 0
        for (let i in q) {
            if (!q.hasOwnProperty(i)) {
                continue
            }
            num_data ++
            let data_val = q[i]
            if (this.isNull(data_val)) {
                all_query += num_data === que_size ? i : i + '&'
            } else {
                let data_str    = this.getString(data_val),
                    data_encode = encode_uri ? encodeURIComponent(data_str) : data_str
                all_query += num_data === que_size ? i + '=' + data_encode : i + '=' + data_encode + '&'
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
        return t.split('').filter(i => i === q).length
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
            let spt = this.splitOnce(q, '?'),
                que = spt[1]
            return !this.isEmpty(que) && this.isQuery(que)
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
        let emp = [q, '']
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
        let hsh = window.location.hash
        return hsh.startsWith('#') ? hsh.slice(1) : hsh
    },

    /**
     * set the window hash.
     * @param {string} q Hash value
     */
    setWinHash: function (q) {
        window.location.hash = q
    }

}
