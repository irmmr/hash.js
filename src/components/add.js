import HashComponent from "../component"
import {getQuery, getTrueHash, getWinHash, isEmpty, isObj, isString, replaceAll, setWinHash, toQuery} from "../helpers"

/**
 * add a string to location hash.
 * @param {string} n
 * @returns boolean
 */
HashComponent.add = (n = '') => {
    if (!isString(n) || isEmpty(n)) {
        return false
    }

    let wh = getWinHash()

    if (isEmpty(wh)) {
        setWinHash(n)
        return true
    }

    setWinHash(wh + n)

    return true
}

/**
 * add a value to location hash.
 * @param {string} n
 * @returns boolean
 */
HashComponent.addValue = (n = '') => {
    if (!isString(n) || isEmpty(n)) {
        return false
    }

    if (n.includes('?')) {
        n = replaceAll(n, '?', encodeURIComponent('?'))
    }

    let wh      = getWinHash(),
        hash    = getTrueHash(wh),
        hsh_val = hash[0],
        hsh_que = hash[1]

    if (!isEmpty(hsh_val)) {
        n = hsh_val + n
    }

    if (!isEmpty(hsh_que)) {
        n += '?' + hsh_que
    }

    setWinHash(n)

    return true
}

/**
 * add a query to location hash.
 * @param {*} n
 * @returns boolean
 */
HashComponent.addQuery =(n = {}) => {
    if (!isObj(n) || n.length === 0) {
        return false
    }

    let wh      = getWinHash(),
        hash    = getTrueHash(wh),
        hsh_val = hash[0],
        hsh_que = hash[1],
        vl      = ''

    if (!isEmpty(hsh_que)) {
        let oq  = getQuery(hsh_que)
        n       = Object.assign(oq, n)
    }

    if (!isEmpty(hsh_val)) {
        vl += hsh_val
    }

    vl += '?' + toQuery(n)
    setWinHash(vl)

    return true
}
