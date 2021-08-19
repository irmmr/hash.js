import helper from "../helpers";

export default {

    /**
     * add a string to location hash.
     * @param {string} n
     * @returns boolean
     */
    add: function (n = '') {
        if (!helper.isString(n) || helper.isEmpty(n)) {
            return false
        }
        let wh = helper.getWinHash()
        if (helper.isEmpty(wh)) {
            helper.setWinHash(n)
            return true
        }
        helper.setWinHash(wh + n)
        return true
    },

    /**
     * add a value to location hash.
     * @param {string} n
     * @returns boolean
     */
    addValue: function (n = '') {
        if (!helper.isString(n) || helper.isEmpty(n)) {
            return false
        }
        if (n.includes('?')) {
            n = helper.replaceAll(n, '?', encodeURIComponent('?'))
        }
        let wh      = helper.getWinHash(),
            hash    = helper.getTrueHash(wh),
            hsh_val = hash[0],
            hsh_que = hash[1]
        if (!helper.isEmpty(hsh_val)) {
            n = hsh_val + n
        }
        if (!helper.isEmpty(hsh_que)) {
            n += '?' + hsh_que
        }
        helper.setWinHash(n)
        return true
    },

    /**
     * add a query to location hash.
     * @param {*} n
     * @returns boolean
     */
    addQuery: function (n = {}) {
        if (!helper.isObj(n) || n.length === 0) {
            return false
        }
        let wh      = helper.getWinHash(),
            hash    = helper.getTrueHash(wh),
            hsh_val = hash[0],
            hsh_que = hash[1],
            vl      = ''
        if (!helper.isEmpty(hsh_que)) {
            let oq  = helper.getQuery(hsh_que)
            n       = Object.assign(oq, n)
        }
        if (!helper.isEmpty(hsh_val)) {
            vl += hsh_val
        }
        vl += '?' + helper.toQuery(n)
        helper.setWinHash(vl)
        return true
    }

}

