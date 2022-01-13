import {empty_func} from "../vars.js"
import message from "../message.js"
import HashComponent from "../component.js"
import {err, getUrlHash, getWindow, isEmpty, isFunc, isString, lunchFunc, replaceAll} from "../helpers.js"

/**
 * Hash Event component.
 * @param {string} type The listeners
 * @param {function} listener   The function/callback
 * @returns HashComponent
 */
HashComponent.event = HashComponent.on = (type, listener = empty_func) => {
    let cp = HashComponent

    if (!isString(type)) {
        return cp
    }

    let evs     = replaceAll(type, ',', ' '),
        wn      = getWindow()

    listener    = isFunc(listener) ? listener : empty_func

    // check addEventListener based on window
    if (typeof wn.addEventListener === 'undefined') {
        err(message.event_und)
        return cp
    }

    let split = evs.split(' ').filter(e => !isEmpty(e)),
        event = []

    split.forEach(i => {
        if (!event.includes(i)) {
            event.push(i)
        }
    })

    event.forEach(e => {
        switch (e) {
            case 'change':
                wn.addEventListener('hashchange', e => {
                    let newHash = getUrlHash(e.newURL || ''),
                        oldHash = getUrlHash(e.oldURL || '')
                    lunchFunc(listener, e, {oldHash, newHash})
                })
                break

            case 'load':
                wn.addEventListener('load', listener)
                break

            case 'ready':
                lunchFunc(listener)
                break
        }
    })

    return cp
}
