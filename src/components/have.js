import helper from "../helpers";

export default {

    /**
     * check for location hash value.
     * @param {string} n
     * @returns boolean
     */
    haveValue: function (n = '') {
        if (!helper.isString(n)) {
            return false
        }
        let wh = helper.getWinHash(),
            wg = helper.getTrueHash(wh)[0]
        if (helper.isEmpty(n)) {
            return !helper.isEmpty(wg)
        }
        return wg.includes(n)
    },

    /**
     * checking for query exists on location hash.
     * @param {string|array} n
     * @retuens boolean
     */
    haveQuery: function (n = []) {
        if (helper.isString(n)) {
            n = [n]
        }
        if (!helper.isArr(n)) {
            return false
        }
        let wh = helper.getWinHash(),
            wq = helper.getTrueHash(wh)[1]
        if (n.length === 0) {
            return !helper.isEmpty(wq)
        }
        if (!helper.isQuery(wq)) {
            return false
        }
        let que = helper.getQuery(wq)
        for (let i in n) {
            if (!n.hasOwnProperty(i)) {
                continue
            }
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
        if (!helper.isString(n)) {
            return false
        }
        let wh = helper.getWinHash()
        if (helper.isEmpty(wh)) {
            return false
        }
        if (helper.isEmpty(n)) {
            return true
        }
        return wh.includes(n)
    }
    
}
