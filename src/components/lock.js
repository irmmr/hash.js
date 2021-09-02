// main lock variables
let locked     = false,
    force_lock = false

export default {

    /**
     * check if hash is locked.
     * @param {object} n
     * @returns boolean
     */
    isLocked: function (n = {}) {
        if (!this._h.isDef(n) || !this._h.isObj(n)) {
            return false
        }
        return locked
    },

    /**
     * unlock location's hash.
     * @param {object} n
     * @returns boolean
     */
    unLock: function (n = {}) {
        if (!this._h.isDef(n) || !this._h.isObj(n)) {
            return false
        }
        if (locked && !force_lock) {
            locked = false
            return true
        }
        return false
    },

    /**
     * lock the page hash.
     * @param {object} n
     * @returns boolean
     */
    lock: function (n = {}) {
        if (locked || !this._h.isDef(n) || !this._h.isObj(n)) {
            return false
        }
        let is_force = 'force' in n ? this._h.getBool(n.force) : false
        locked       = true
        force_lock   = is_force
        const wh     = this._h.getWinHash(),
              th     = this
        window.onhashchange = function() {
            if (locked) {
                th._h.setWinHash(wh)
            }
        }
        return true
    }

}
