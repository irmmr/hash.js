import HashComponent from "../../component.js";
import {getBool, getWindow, getWinHash, isObj, setWinHash} from "../../helpers.js";

// defined as 2 global variable in this section
// to save "locked" and "force_lock" status
let locked     = false;
let force_lock = false;

/**
 * check if hash is locked.
 *
 * @returns boolean
 */
HashComponent.isLocked = () => {
    return locked;
}

/**
 * unlock location's hash.
 * @returns HashComponent
 */
HashComponent.unlock = () => {
    if (locked && !force_lock) {
        locked = false;
    }

    return HashComponent;
}

/**
 * Lock the page hash.
 *
 * @param {object} options
 * @returns HashComponent
 */
HashComponent.lock = (options = {}) => {
    let cp = HashComponent;

    if (locked || !isObj(options)) {
        return cp;
    }

    force_lock      = getBool(options.force || false);
    const hash      = getWinHash();
    const win       = getWindow();

    if (typeof win.onhashchange !== 'undefined') {
        win.onhashchange = () => {
            if (locked) {
                setWinHash(hash);
            }
        }

        locked = true;
    }

    return cp;
}
