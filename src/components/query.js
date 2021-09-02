import helper from "../helpers";

export default {
    
    /**
     * update a query value in location hash.
     * @param {string} n
     * @param {string|null|number} e
     * @returns boolean
     */
    updateQuery: function (n, e) {
        if (!this._h.isString(n) || !this._h.isQueParOk(e)) {
            return false
        }
        if (e === undefined) {
            return false
        }
        let wh      = this._h.getWinHash(),
            hash    = this._h.getTrueHash(wh),
            hsh_val = hash[0],
            hsh_que = hash[1],
            vl      = '',
            cl      = {},
            ch      = 0
        if (this._h.isEmpty(hsh_que)) {
            return false
        }
        if (!this._h.isEmpty(hsh_val)) {
            vl += hsh_val
        }
        let que = this._h.getQuery(hsh_que)
        for (let i in que) {
            if (!que.hasOwnProperty(i)) {
                continue
            }
            if (i === n) {
                cl[i] = e
                ch ++
            } else {
                cl[i] = que[i]
            }
        }
        vl += '?' + this._h.toQuery(cl)
        this._h.setWinHash(vl)
        return ch !== 0
    }
    
}
