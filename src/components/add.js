import helper from "../helpers";

export default {

    /**
     * add a string to location hash.
     * @param {string} n
     * @returns boolean
     */
    add: function (n = '') {
        if (!this._h.isString(n) || this._h.isEmpty(n)) {
            return false
        }
        let wh = this._h.getWinHash()
        if (this._h.isEmpty(wh)) {
            this._h.setWinHash(n)
            return true
        }
        this._h.setWinHash(wh + n)
        return true
    },

    /**
     * add a value to location hash.
     * @param {string} n
     * @returns boolean
     */
    addValue: function (n = '') {
        if (!this._h.isString(n) || this._h.isEmpty(n)) {
            return false
        }
        if (n.includes('?')) {
            n = this._h.replaceAll(n, '?', encodeURIComponent('?'))
        }
        let wh      = this._h.getWinHash(),
            hash    = this._h.getTrueHash(wh),
            hsh_val = hash[0],
            hsh_que = hash[1]
        if (!this._h.isEmpty(hsh_val)) {
            n = hsh_val + n
        }
        if (!this._h.isEmpty(hsh_que)) {
            n += '?' + hsh_que
        }
        this._h.setWinHash(n)
        return true
    },

    /**
     * add a query to location hash.
     * @param {*} n
     * @returns boolean
     */
    addQuery: function (n = {}) {
        if (!this._h.isObj(n) || n.length === 0) {
            return false
        }
        let wh      = this._h.getWinHash(),
            hash    = this._h.getTrueHash(wh),
            hsh_val = hash[0],
            hsh_que = hash[1],
            vl      = ''
        if (!this._h.isEmpty(hsh_que)) {
            let oq  = this._h.getQuery(hsh_que)
            n       = Object.assign(oq, n)
        }
        if (!this._h.isEmpty(hsh_val)) {
            vl += hsh_val
        }
        vl += '?' + this._h.toQuery(n)
        this._h.setWinHash(vl)
        return true
    }

}

