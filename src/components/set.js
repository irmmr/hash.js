import HashComponent from "../component"
import {getTrueHash, getWinHash, isEmpty, isObj, isString, replaceAll, setWinHash, toQuery} from "../helpers.js"

/**
 * set the page hash.
 * @param {string} n
 * @returns boolean
 */
HashComponent.set = (n = '') => {
    if (!isString(n) || isEmpty(n)) {
        return false
    }

    setWinHash(n)
    return true
}

/**
 * set a value to location hash.
 * @param {string} n
 * @returns boolean
 */
HashComponent.setValue = (n = '') => {
    if (!isString(n) || isEmpty(n)) {
        return false
    }

    if (n.includes('?')) {
        n = replaceAll(n, '?', encodeURIComponent('?'))
    }

    let wh      = getWinHash(),
        hsh_que = getTrueHash(wh)[1]

    if (isEmpty(wh) || isEmpty(hsh_que)) {
        setWinHash(n)
        return true
    }

    setWinHash(n + '?' + hsh_que)
    return true
}

/**
 * set a query to location hash.
 * @param {object} n
 * @returns boolean
 */
HashComponent.setQuery = (n = {}) => {
    if (!isObj(n) || n.length === 0) {
        return false
    }
    let wh   = getWinHash(),
        hash = getTrueHash(wh)[0],
        aq   = toQuery(n)

    if (isEmpty(wh) || isEmpty(hash)) {
        setWinHash('?' + aq)
        return true
    }

    setWinHash(hash + '?' + aq)
    return true
}
