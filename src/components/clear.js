import HashComponent from "../component"
import {getHref, getTrueHash, getWinHash, isBool, isEmpty, isTrueHash, setWinHash} from "../helpers.js"

/**
 * clear the page hash.
 * @param {boolean} n
 * @returns boolean
 */
HashComponent.clear = (n = true) => {
    if (!isBool(n)) {
        return false
    }

    if (n) {
        history.pushState(null, null, getHref().split('#')[0])
    } else {
        setWinHash('')
    }

    return true
}

/**
 * clear hash value from location hash.
 * @returns boolean
 */
HashComponent.clearValue = () => {
    let wh = getWinHash()

    if (isEmpty(wh)) {
        return true
    }

    if (!isTrueHash(wh)) {
        return false
    }

    let wg = getTrueHash(wh),
        wv = wg[0],
        wq = wg[1]

    if (isEmpty(wv)) {
        return true
    }

    setWinHash(isEmpty(wq) ? '' : '?' + wq)
    return true
}

/**
 * clear hash query from location hash.
 * @returns boolean
 */
HashComponent.clearQuery = () => {
    let wh = getWinHash()

    if (isEmpty(wh)) {
        return true
    }

    if (!isTrueHash(wh)) {
        return false
    }

    let wg = getTrueHash(wh),
        wv = wg[0],
        wq = wg[1]

    if (isEmpty(wq)) {
        return true
    }

    setWinHash(wv)
    return true
}
