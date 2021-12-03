import {empty_func} from "../vars"
import message from "../message"
import HashComponent from "../component"
import {err, getWindow, isDef, isFunc, isString, lunchFunc, replaceAll} from "../helpers.js"

/**
 * Hash Event component.
 * @param {string} e The listeners
 * @param {*} func   The function/callback
 * @returns
 */
HashComponent.event = (e, func = function() {}) => {
    if (!isDef(e) || !isString(e)) {
        return
    }

    let event   = e.toLowerCase(),
        evs     = event.split(','),
        wn      = getWindow()

    func        = isDef(func) && isFunc(func) ? func : empty_func

    // check addEventListener based on window
    if (typeof wn.addEventListener === 'undefined') {
        err(message.event_und)
        return
    }

    for (let i in evs) {
        if (!evs.hasOwnProperty(i)) continue

        let current_ev = replaceAll(evs[i], ' ', '')

        switch (current_ev) {
            case 'change' :
                wn.addEventListener('hashchange', func);
                break;
            case 'load' :
                wn.addEventListener('load', func);
                break;
            case 'ready' :
                lunchFunc(func);
                break;
            default :
                // nothing to do
                break;
        }
    }
}

