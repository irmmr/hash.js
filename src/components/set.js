import helper from "../helpers";

export default {

    /**
     * set the page hash.
     * @param {string} n
     * @returns boolean
     */
    set: function (n = '') {
        if (!this._h.isString(n) || this._h.isEmpty(n)) {
            return false
        }
        this._h.setWinHash(n)
        return true
    },

    /**
     * set a value to location hash.
     * @param {string} n
     * @returns boolean
     */
    setValue: function (n = '') {
        if (!this._h.isString(n) || this._h.isEmpty(n)) {
            return false
        }
        if (n.includes('?')) {
            n = this._h.replaceAll(n, '?', encodeURIComponent('?'))
        }
        let wh      = this._h.getWinHash(),
            hsh_que = this._h.getTrueHash(wh)[1]
        if (this._h.isEmpty(wh) || this._h.isEmpty(hsh_que)) {
            this._h.setWinHash(n)
            return true
        }
        this._h.setWinHash(n + '?' + hsh_que)
        return true
    },

    /**
     * set a query to location hash.
     * @param {object} n
     * @returns boolean
     */
    setQuery: function (n = {}) {
        if (!this._h.isObj(n) || n.length === 0) {
            return false
        }
        let wh   = this._h.getWinHash(),
            hash = this._h.getTrueHash(wh)[0],
            aq   = this._h.toQuery(n)
        if (this._h.isEmpty(wh) || this._h.isEmpty(hash)) {
            this._h.setWinHash('?' + aq)
            return true
        }
        this._h.setWinHash(hash + '?' + aq)
        return true
    }
    
}
