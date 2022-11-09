import core from "./core.js";
import * as h from "./helpers.js";
import HashStore from "./store.js";
import HashTrigger from "./trigger.js";
import { changeDispatch } from "./events.js";

/**
 * Define Hash constant to use as main access
 * to all helpers and components.
 *
 * @type {object}
 */
const Hash = Object.assign({
    // configs class for manage by user
    config: core.config.instance,

    // all helpers for using by user
    h,

    // api list of system classes to use by user
    api: {
        trigger: HashTrigger,
        store: HashStore
    },

    /**
     * ready status
     * @returns boolean
     */
    isReady: () => {
        return HashStore.ready;
    },

    /**
     * ready on-line usage
     * Hash.ready()?.set('its-ready!')
     * @returns null|HashComponent
     */
    ready: () => {
        return HashStore.ready ? core.components : null;
    }
}, core.components);

/**
 * Ready event!
 * try to run all library ready events
 * plus setting ready status to TRUE
 */
HashStore.ready = true;
HashStore.readyDate = Date.now();

HashTrigger.run('ready', {
    time: HashStore.readyDate
});

/**
 * Dispatch events
 * try to add other events using hashchange
 * and make a multiple event handler using window.addEventListener
 */
const win = h.getWindow();

if (typeof win.addEventListener !== 'undefined') {
    win.addEventListener('hashchange', changeDispatch, false);
}

export default Hash;
