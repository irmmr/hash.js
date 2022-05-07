import {empty_func} from "../vars.js";
import message from "../message.js";
import HashComponent from "../component.js";
import {err, getUrlHash, getWindow, isEmpty, isFunc, isString, lunchFunc, replaceAll} from "../helpers.js";

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

    let listeners   = replaceAll(listener, ',', ' ');
    let win         = getWindow();

    callback    = isFunc(callback) ? callback : empty_func;

    // check addEventListener based on window
    if (typeof win.addEventListener === 'undefined') {
        err(message.event_und);

        return cp;
    }

    let events  = listeners.split(' ').filter(e => !isEmpty(e));
    let fetch   = []

    // instead of [...new Set(array)]
    events.forEach(i => {
        if (!fetch.includes(i)) {
            fetch.push(i);
        }
    })

    fetch.forEach(name => {
        switch (name) {
            case 'change':
                win.addEventListener('hashchange', e => {
                    let newHash = getUrlHash(e.newURL || '');
                    let oldHash = getUrlHash(e.oldURL || '');

                    lunchFunc(callback, e, {oldHash, newHash});
                });

                break;

            case 'load':
                win.addEventListener('load', callback);

                break;

            case 'ready':
                lunchFunc(callback);

                break;
        }
    });

    return cp;
}
