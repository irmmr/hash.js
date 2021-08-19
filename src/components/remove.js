import helper from "../helpers";

export default {

    /**
     * remove a string from location hash.
     * @param {string|array} n The words/chars list
     * @returns boolean
     */
    remove: function (n = []) {
        if (helper.isString(n) && !helper.isEmpty(n)) {
            n = [n]
        }
        if (!helper.isArr(n) || n.length === 0) {
            return false
        }
        let wh = helper.getWinHash()
        if (helper.isEmpty(wh)) {
            return false
        }
        for (let i in n) {
            if (!n.hasOwnProperty(i)) {
                continue
            }
            let vl = n[i]
            if (helper.getWinHash().includes(vl)) {
                helper.setWinHash(
                    helper.replaceAll(
                        helper.getWinHash(), vl, ''
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
        if (helper.isString(n) && !helper.isEmpty(n)) {
            n = [n]
        }
        if (!helper.isArr(n) || n.length === 0) {
            return false
        }
        let wh      = helper.getWinHash(),
            hash    = helper.getTrueHash(wh),
            hsh_val = hash[0],
            hsh_que = hash[1],
            vt      = ''
        if (helper.isEmpty(wh) || helper.isEmpty(hsh_val)) {
            return false
        }
        for (let i in n) {
            if (!n.hasOwnProperty(i)) {
                continue
            }
            let vl = n[i]
            if (hsh_val.includes(vl)) {
                hsh_val = helper.replaceAll(hsh_val, vl, '')
            }
        }
        vt += hsh_val
        if (!helper.isEmpty(hsh_que)) {
            vt += '?' + hsh_que
        }
        helper.setWinHash(vt)
        return true
    },

    /**
     * remove a query from location hash.
     * @param {string|array} n
     * @returns boolean
     */
    removeQuery: function (n = []) {
        if (helper.isString(n) && !helper.isEmpty(n)) {
            n = [n]
        }
        if (!helper.isArr(n) || n.length === 0) {
            return false
        }
        let wh      = helper.getWinHash(),
            hash    = helper.getTrueHash(wh),
            hsh_val = hash[0],
            hsh_que = hash[1],
            vt      = '',
            cl      = {}
        if (helper.isEmpty(wh) || helper.isEmpty(hsh_que)) {
            return false;
        }
        let que = helper.getQuery(hsh_que)
        for (let i in que) {
            if (!que.hasOwnProperty(i)) {
                continue
            }
            if (!n.includes(i)) {
                cl[i] = que[i]
            }
        }
        if (!helper.isEmpty(hsh_val)) {
            vt += hsh_val
        }
        if (helper.objSize(cl) !== 0) {
            vt += '?' + helper.toQuery(cl)
        }
        helper.setWinHash(vt)
        return true
    }
    
}
