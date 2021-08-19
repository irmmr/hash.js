import helper from "../helpers";

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
        if (!helper.isDef(n) || !helper.isObj(n)) {
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
        if (!helper.isDef(n) || !helper.isObj(n)) {
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
        if (locked || !helper.isDef(n) || !helper.isObj(n)) {
            return false
        }
        let is_force = 'force' in n ? helper.getBool(n.force) : false
        locked       = true
        force_lock   = is_force
        const wh     = helper.getWinHash()
        window.onhashchange = function() {
            if (locked) {
                helper.setWinHash(wh)
            }
        }
        return true
    }

}
