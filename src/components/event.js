import { empty_func } from "../vars.js";
import message from "../message.js";
import HashComponent from "../component.js";
import { err, getUrlHash, getWindow, isEmpty, isFunc, isString, lunchFunc, replaceAll } from "../helpers.js";
import HashTrigger from "../trigger.js";
import HashStore from "../store.js";

/**
 * Hash Event component.
 *
 * @param {string}      listener    The listener(s)
 * @param {function}    callback    The function/callback
 * @returns HashComponent
 */
HashComponent.event = HashComponent.on = (listener, callback = empty_func) => {
    let cp = HashComponent;

    if (!isString(listener)) {
        return cp;
    }

    let listeners = replaceAll(listener, ',', ' ');
    let win = getWindow();

    callback = isFunc(callback) ? callback : empty_func;

    // check addEventListener based on window
    if (typeof win.addEventListener === 'undefined') {
        err(message.event_und);

        return cp;
    }

    let events = listeners.split(' ').filter(e => !isEmpty(e));
    let fetch = []

    // add hash prefix for every listener.
    events = events.map(event => {
        return event.startsWith('hash.') ? event : 'hash.' + event;
    });

    // instead of [...new Set(array)]
    events.forEach(i => {
        if (!fetch.includes(i)) {
            fetch.push(i);
        }
    });

    fetch.forEach(name => {
        switch (name) {
            case 'hash.change':
                win.addEventListener('hashchange', e => {
                    let to = getUrlHash(e.newURL || '');
                    let from = getUrlHash(e.oldURL || '');

                    lunchFunc(callback, e, { from, to });
                });

                break;

            case 'hash.ready':
                HashTrigger.addListener('ready', callback, HashStore.ready, {
                    date: HashStore.readyDate
                });

                break;

            case 'hash.locked':
                HashTrigger.addListener('locked', callback, HashComponent.isLocked());

                break;

            case 'hash.unlocked':
                HashTrigger.addListener('unlocked', callback, false);

                break;

            default:
                win.addEventListener(name, callback);

                break;
        }
    });

    return cp;
}
