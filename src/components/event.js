import { empty_func } from "../vars.js";
import message from "../message.js";
import HashComponent from "../component.js";
import { err, getWindow, isEmpty, isFunc, isString, replaceAll } from "../helpers.js";
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
            case 'hash.ready':
                HashTrigger.addListener('ready', callback, HashStore.ready, {
                    date: HashStore.readyDate
                });

                break;

            case 'hash.lock':
                const data = HashStore.lock;

                HashTrigger.addListener('lock', callback, HashComponent.isLocked(), {
                    at: data.time,
                    value: data.value,
                    force: data.force
                });

                break;

            case 'hash.unlock':
                HashTrigger.addListener('unlock', callback, false);

                break;

            default:
                const packName = name.replace('hash.', '').trim();
                HashTrigger.addListener(packName, callback);

                break;
        }
    });

    return cp;
}
