import helper from "../helpers";

export default {

    /**
     * remove a string from location hash.
     * @param {string|array} n The words/chars list
     * @returns boolean
     */
    remove: function (n = []) {
        if (this._h.isString(n) && !this._h.isEmpty(n)) {
            n = [n]
        }
        if (!this._h.isArr(n) || n.length === 0) {
            return false
        }
        let wh = this._h.getWinHash()
        if (this._h.isEmpty(wh)) {
            return false
        }
        for (let i in n) {
            if (!n.hasOwnProperty(i)) {
                continue
            }
            let vl = n[i]
            if (this._h.getWinHash().includes(vl)) {
                this._h.setWinHash(
                    this._h.replaceAll(
                        this._h.getWinHash(), vl, ''
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
    removeValue: function (n = []) {
        if (this._h.isString(n) && !this._h.isEmpty(n)) {
            n = [n]
        }
        if (!this._h.isArr(n) || n.length === 0) {
            return false
        }
        let wh      = this._h.getWinHash(),
            hash    = this._h.getTrueHash(wh),
            hsh_val = hash[0],
            hsh_que = hash[1],
            vt      = ''
        if (this._h.isEmpty(wh) || this._h.isEmpty(hsh_val)) {
            return false
        }
        for (let i in n) {
            if (!n.hasOwnProperty(i)) {
                continue
            }
            let vl = n[i]
            if (hsh_val.includes(vl)) {
                hsh_val = this._h.replaceAll(hsh_val, vl, '')
            }
        }
        vt += hsh_val
        if (!this._h.isEmpty(hsh_que)) {
            vt += '?' + hsh_que
        }
        this._h.setWinHash(vt)
        return true
    },

    /**
     * remove a query from location hash.
     * @param {string|array} n
     * @returns boolean
     */
    removeQuery: function (n = []) {
        if (this._h.isString(n) && !this._h.isEmpty(n)) {
            n = [n]
        }
        if (!this._h.isArr(n) || n.length === 0) {
            return false
        }
        let wh      = this._h.getWinHash(),
            hash    = this._h.getTrueHash(wh),
            hsh_val = hash[0],
            hsh_que = hash[1],
            vt      = '',
            cl      = {}
        if (this._h.isEmpty(wh) || this._h.isEmpty(hsh_que)) {
            return false;
        }
        let que = this._h.getQuery(hsh_que)
        for (let i in que) {
            if (!que.hasOwnProperty(i)) {
                continue
            }
            if (!n.includes(i)) {
                cl[i] = que[i]
            }
        }
        if (!this._h.isEmpty(hsh_val)) {
            vt += hsh_val
        }
        if (this._h.objSize(cl) !== 0) {
            vt += '?' + this._h.toQuery(cl)
        }
        this._h.setWinHash(vt)
        return true
    }
    
}
