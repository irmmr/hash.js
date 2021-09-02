import helper from "../helpers";

export default {

    /**
     * check for location hash value.
     * @param {string|array} n
     * @returns boolean
     */
    haveValue: function (n = '') {
        if (this._h.isString(n)) {
            n = [n]
        }
        if (!this._h.isArr(n)) {
            return false
        }
        let wv = this.getValue()
        n      = n.filter(i => i !== '')
        if (this._h.isEmpty(n)) {
            return !this._h.isEmpty(wv)
        }
        for (let i in n) {
            if (!n.hasOwnProperty(i)) continue
            if (!wv.includes(n[i])) {
                return false
            }
        }
        return true
    },

    /**
     * checking for query exists on location hash.
     * @param {string|array} n
     * @retuens boolean
     */
    haveQuery: function (n = []) {
        if (this._h.isString(n)) {
            n = [n]
        }
        if (!this._h.isArr(n)) {
            return false
        }
        let wh = this._h.getWinHash(),
            wq = this._h.getTrueHash(wh)[1]
        if (n.length === 0) {
            return !this._h.isEmpty(wq)
        }
        if (!this._h.isQuery(wq)) {
            return false
        }
        let que = this._h.getQuery(wq)
        for (let i in n) {
            if (!n.hasOwnProperty(i)) continue
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
    have: function (n = '') {
        if (this._h.isString(n)) {
            n = [n]
        }
        if (!this._h.isArr(n)) {
            return false
        }
        let wh = this._h.getWinHash()
        n      = n.filter(i => i !== '')
        if (this._h.isEmpty(n)) {
            return !this._h.isEmpty(wh)
        }
        for (let i in n) {
            if (!n.hasOwnProperty(i)) continue
            if (!wh.includes(n[i])) {
                return false
            }
        }
        return true
    }
    
}
