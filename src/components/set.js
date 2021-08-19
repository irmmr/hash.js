import helper from "../helpers";

export default {

    /**
     * set the page hash.
     * @param {string} n
     * @returns boolean
     */
    set: function (n = '') {
        if (!helper.isString(n) || helper.isEmpty(n)) {
            return false
        }
        helper.setWinHash(n)
        return true
    },

    /**
     * set a value to location hash.
     * @param {string} n
     * @returns boolean
     */
    setValue: function (n = '') {
        if (!helper.isString(n) || helper.isEmpty(n)) {
            return false
        }
        if (n.includes('?')) {
            n = helper.replaceAll(n, '?', encodeURIComponent('?'))
        }
        let wh      = helper.getWinHash(),
            hsh_que = helper.getTrueHash(wh)[1]
        if (helper.isEmpty(wh) || helper.isEmpty(hsh_que)) {
            helper.setWinHash(n)
            return true
        }
        helper.setWinHash(n + '?' + hsh_que)
        return true
    },

    /**
     * set a query to location hash.
     * @param {object} n
     * @returns boolean
     */
    setQuery: function (n = {}) {
        if (!helper.isObj(n) || n.length === 0) {
            return false
        }
        let wh   = helper.getWinHash(),
            hash = helper.getTrueHash(wh)[0],
            aq   = helper.toQuery(n)
        if (helper.isEmpty(wh) || helper.isEmpty(hash)) {
            helper.setWinHash('?' + aq)
            return true
        }
        helper.setWinHash(hash + '?' + aq)
        return true
    }
    
}
