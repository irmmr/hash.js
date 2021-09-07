export default {

    /**
     * clear the page hash.
     * @param {boolean} n
     * @returns boolean
     */
    clear: function (n = true) {
        if (!this._h.isBool(n)) {
            return false
        }
        if (n) {
            history.pushState(null, null, this._h.getHref().split('#')[0])
        } else {
            this._h.setWinHash('')
        }
        return true
    },

    /**
     * clear hash value from location hash.
     * @returns boolean
     */
    clearValue: function () {
        let wh = this._h.getWinHash()
        if (this._h.isEmpty(wh)) {
            return true
        }
        if (!this._h.isTrueHash(wh)) {
            return false
        }
        let wg = this._h.getTrueHash(wh),
            wv = wg[0],
            wq = wg[1]
        if (this._h.isEmpty(wv)) {
            return true
        }
        this._h.setWinHash(this._h.isEmpty(wq) ? '' : '?' + wq)
        return true
    },

    /**
     * clear hash query from location hash.
     * @returns boolean
     */
    clearQuery: function () {
        let wh = this._h.getWinHash()
        if (this._h.isEmpty(wh)) {
            return true
        }
        if (!this._h.isTrueHash(wh)) {
            return false
        }
        let wg = this._h.getTrueHash(wh),
            wv = wg[0],
            wq = wg[1]
        if (this._h.isEmpty(wq)) {
            return true
        }
        this._h.setWinHash(wv)
        return true
    }

}
