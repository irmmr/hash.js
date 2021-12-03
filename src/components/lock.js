import HashComponent from "../component"
import {getBool, getWindow, getWinHash, isDef, isObj, setWinHash} from "../helpers.js"

let locked     = false,
    force_lock = false

/**
 * check if hash is locked.
 * @param {object} n
 * @returns boolean
 */
HashComponent.isLocked = (n = {}) => {
    if (!isDef(n) || !isObj(n)) {
        return false
    }

    return locked
}

/**
 * unlock location's hash.
 * @param {object} n
 * @returns boolean
 */
HashComponent.unLock = (n = {}) => {
    if (!isDef(n) || !isObj(n)) {
        return false
    }

    if (locked && !force_lock) {
        locked = false
        return true
    }

    return false
}

/**
 * lock the page hash.
 * @param {object} n
 * @returns boolean
 */
HashComponent.lock = (n = {}) => {
    if (locked || !isDef(n) || !isObj(n)) {
        return false
    }

    force_lock   = getBool(n.force || false)
    const wh     = getWinHash(),
          wn     = getWindow()

    if (typeof wn.onhashchange !== 'undefined') {
        wn.onhashchange = function() {
            if (locked) {
                setWinHash(wh)
            }
        }

        locked = true
        return true
    }

    return false
}
