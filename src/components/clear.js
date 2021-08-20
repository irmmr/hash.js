import helper from "../helpers";

export default {

    /**
     * clear the page hash.
     * @param {boolean} n
     * @returns boolean
     */
    clear: function (n = true) {
        if (!helper.isBool(n)) {
            return false
        }
        helper.setWinHash('')
        if (n) {
            history.pushState(null, null, window.location.href.split('#')[0])
        }
        return true
    },

    /**
     * clear hash value from location hash.
     * @returns boolean
     */
    clearValue: function () {
        let wh = helper.getWinHash()
        if (helper.isEmpty(wh)) {
            return true
        }
        if (!helper.isTrueHash(wh)) {
            return false
        }
        let wg = helper.getTrueHash(wh),
            wv = wg[0],
            wq = wg[1]
        if (helper.isEmpty(wv)) {
            return true
        }
        helper.setWinHash(helper.isEmpty(wq) ? '' : '?' + wq)
        return true
    },

    /**
     * clear hash query from location hash.
     * @returns boolean
     */
    clearQuery: function () {
        let wh = helper.getWinHash()
        if (helper.isEmpty(wh)) {
            return true
        }
        if (!helper.isTrueHash(wh)) {
            return false
        }
        let wg = helper.getTrueHash(wh),
            wv = wg[0],
            wq = wg[1]
        if (helper.isEmpty(wq)) {
            return true
        }
        helper.setWinHash(wv)
        return true
    }

}
