import HashComponent from "../component.js"
import {getQuery, getTrueHash, getWinHash, isArr, isEmpty, isQuery, isString} from "../helpers.js"

/**
 * check for location hash value.
 * @param {string|array} n
 * @returns boolean
 */
HashComponent.haveValue = (n = '') => {
    if (isString(n)) {
        n = [n]
    }

    if (!isArr(n)) {
        return false
    }

    let wv = HashComponent.getValue()
    n      = n.filter(i => i !== '')

    if (isEmpty(n)) {
        return !isEmpty(wv)
    }

    for (let i in n) {
        if (!n.hasOwnProperty(i)) continue

        if (!wv.includes(n[i])) {
            return false
        }
    }

    return true
}

/**
 * checking for query exists on location hash.
 * @param {string|array} n
 * @retuens boolean
 */
HashComponent.haveQuery = (n = []) => {
    if (isString(n)) {
        n = [n]
    }

    if (!isArr(n)) {
        return false
    }

    let wh = getWinHash(),
        wq = getTrueHash(wh)[1]

    if (n.length === 0) {
        return !isEmpty(wq)
    }

    if (!isQuery(wq)) {
        return false
    }

    let que = getQuery(wq), i

    for (i in n) {
        if (!n.hasOwnProperty(i)) continue
        if (!que.hasOwnProperty(n[i])) {
            return false
        }
    }

    return true
}

/**
 * check or searching for a string in hash.
 * @param {string|array} n
 * @returns boolean
 */
HashComponent.have = (n = '') => {
    if (isString(n)) {
        n = [n]
    }

    if (!isArr(n)) {
        return false
    }

    let wh = getWinHash()
    n      = n.filter(i => i !== '')

    if (isEmpty(n)) {
        return !isEmpty(wh)
    }

    for (let i in n) {
        if (!n.hasOwnProperty(i)) continue

        if (!wh.includes(n[i])) {
            return false
        }
    }

    return true
}
