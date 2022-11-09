import HashComponent from "../../component.js";
import {err, getBool, getWindow, getWinHash, isObj, setWinHash} from "../../helpers.js";
import message from '../../message.js';
import HashStore from "../../store.js";
import HashTrigger from "../../trigger.js";

/**
 * this function should set locked
 * version of hash every time after
 * locking by checking lock status.
 */
const hashLockEvent = () => {
    if (HashStore.lock.status === true) {
        setWinHash(HashStore.lock.value);
    }
}

/**
 * check if hash is locked.
 *
 * @returns boolean
 */
HashComponent.isLocked = () => {
    return HashStore.lock.status;
}

/**
 * unlock location's hash.
 * @returns HashComponent
 */
HashComponent.unlock = () => {
    const cp   = HashComponent;
    const win  = getWindow();
    const data = HashStore.lock;

    if (data.status && !data.force) {
        HashStore.lock.status = false;

        // trigger -> when hash unlocked
        HashTrigger.run('unlock', {
            lockedAt: data.time,
            at: Date.now(),
            value: data.value,
            force: data.force
        });

        HashStore.lock.time = null;
        HashStore.lock.value = null;

        // check for event listener support
        if (typeof win.addEventListener === 'undefined') {
            err(message.event_und);
            return cp;
        }

        // remove event listener
        win.removeEventListener('hashchange', hashLockEvent);
    }

    return cp;
}

/**
 * Lock the page hash.
 *
 * @param {object} options
 * @returns HashComponent
 */
HashComponent.lock = (options = {}) => {
    let cp = HashComponent;

    if (HashStore.lock.status || !isObj(options)) {
        return cp;
    }

    const force     = getBool(options.force || false);
    const hash      = getWinHash();
    const win       = getWindow();

    // check for event listener support
    if (typeof win.addEventListener === 'undefined') {
        err(message.event_und);
        return cp;
    }

    // update store data
    HashStore.lock.time     = Date.now();
    HashStore.lock.status   = true;
    HashStore.lock.value    = hash;
    HashStore.lock.force    = force;

    // add event listener
    win.addEventListener('hashchange', hashLockEvent);

    // trigger -> dispatch all locked events
    HashTrigger.run('lock', {
        at: HashStore.lock.time,
        value: hash,
        force: force
    });

    return cp;
}
