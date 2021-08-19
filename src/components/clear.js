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
        window.location.hash = ''
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
        if (!helper.isTrueHash(wh)) {
            return false
        }
        let wg = helper.getTrueHash(wh)[1]
        helper.setWinHash('?' + wg)
        return true
    },

    /**
     * clear hash query from location hash.
     * @returns boolean
     */
    clearQuery: function () {
        let wh = helper.getWinHash()
        if (!helper.isTrueHash(wh)) {
            return false
        }
        let wg = helper.getTrueHash(wh)[0]
        helper.setWinHash(wg)
        return true
    }

}
