import helper from "../helpers";

export default {
    
    /**
     * update a query value in location hash.
     * @param {string} n
     * @param {string|null|number} e
     * @returns boolean
     */
    updateQuery: function (n, e) {
        if (!helper.isString(n) || !helper.isQueParOk(e)) {
            return false
        }
        if (e === undefined) {
            return false
        }
        let wh      = helper.getWinHash(),
            hash    = helper.getTrueHash(wh),
            hsh_val = hash[0],
            hsh_que = hash[1],
            vl      = '',
            cl      = {},
            ch      = 0
        if (helper.isEmpty(hsh_que)) {
            return false
        }
        if (!helper.isEmpty(hsh_val)) {
            vl += hsh_val
        }
        let que = helper.getQuery(hsh_que)
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
        vl += '?' + helper.toQuery(cl)
        helper.setWinHash(vl)
        return ch !== 0
    }
    
}
