import HashComponent from "../../component.js"
import {getBool, getWindow, getWinHash, isObj, setWinHash} from "../../helpers.js"

let locked     = false,
    force_lock = false

/**
 * check if hash is locked.
 * @returns boolean
 */
HashComponent.isLocked = () => {
    return locked
}

/**
 * unlock location's hash.
 * @returns HashComponent
 */
HashComponent.unlock = () => {
    if (locked && !force_lock) {
        locked = false
    }

    return HashComponent
}

/**
 * lock the page hash.
 * @param {object} options
 * @returns HashComponent
 */
HashComponent.lock = (options = {}) => {
    let cp = HashComponent

    if (locked || !isObj(options)) {
        return cp
    }

    force_lock   = getBool(options.force || false)
    const wh     = getWinHash(),
          wn     = getWindow()

    if (typeof wn.onhashchange !== 'undefined') {
        wn.onhashchange = () => {
            if (locked) {
                setWinHash(wh)
            }
        }

        locked = true
    }

    return cp
}
