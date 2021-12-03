import HashComponent from "../component.js"
import {getQuery, getTrueHash, getWinHash, isArr, isEmpty, isString, objSize, replaceAll, setWinHash, toQuery} from "../helpers.js"

/**
 * remove a string from location hash.
 * @param {string|array} n The words/chars list
 * @returns boolean
 */
HashComponent.remove = (n = []) => {
    if (isString(n) && !isEmpty(n)) {
        n = [n]
    }

    if (!isArr(n) || n.length === 0) {
        return false
    }

    let wh = getWinHash()

    if (isEmpty(wh)) {
        return false
    }

    for (let i in n) {
        if (!n.hasOwnProperty(i)) continue

        let vl = n[i]
        if (getWinHash().includes(vl)) {
            setWinHash(
                replaceAll(
                    getWinHash(), vl, ''
                )
            );
        }
    }

    return true
}

/**
 * remove a value from location hash.
 * @param {string|array} n The words list
 * @returns boolean
 */
HashComponent.removeValue = (n = []) => {
    if (isString(n) && !isEmpty(n)) {
        n = [n]
    }

    if (!isArr(n) || n.length === 0) {
        return false
    }

    let wh      = getWinHash(),
        hash    = getTrueHash(wh),
        hsh_val = hash[0],
        hsh_que = hash[1],
        vt      = ''

    if (isEmpty(wh) || isEmpty(hsh_val)) {
        return false
    }

    for (let i in n) {
        if (!n.hasOwnProperty(i)) continue

        let vl = n[i]
        if (hsh_val.includes(vl)) {
            hsh_val = replaceAll(hsh_val, vl, '')
        }
    }

    vt += hsh_val

    if (!isEmpty(hsh_que)) {
        vt += '?' + hsh_que
    }

    setWinHash(vt)
    return true
}

/**
 * remove a query from location hash.
 * @param {string|array} n
 * @returns boolean
 */
HashComponent.removeQuery = (n = []) => {
    if (isString(n) && !isEmpty(n)) {
        n = [n]
    }

    if (!isArr(n) || n.length === 0) {
        return false
    }

    let wh      = getWinHash(),
        hash    = getTrueHash(wh),
        hsh_val = hash[0],
        hsh_que = hash[1],
        vt      = '',
        cl      = {}

    if (isEmpty(wh) || isEmpty(hsh_que)) {
        return false;
    }

    let que = getQuery(hsh_que), i

    for (i in que) {
        if (!que.hasOwnProperty(i)) continue

        if (!n.includes(i)) {
            cl[i] = que[i]
        }
    }

    if (!isEmpty(hsh_val)) {
        vt += hsh_val
    }

    if (objSize(cl) !== 0) {
        vt += '?' + toQuery(cl)
    }

    setWinHash(vt)
    return true
}
