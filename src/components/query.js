import HashComponent from "../component.js"
import {getQuery, getTrueHash, getWinHash, isEmpty, isQueParOk, isString, setWinHash, toQuery} from "../helpers.js"

/**
 * update a query value in location hash.
 * @param {string} n
 * @param {string|null|number} e
 * @returns boolean
 */
HashComponent.updateQuery = (n, e) => {
    if (!isString(n) || isEmpty(n) || !isQueParOk(e)) {
        return false
    }

    if (e === undefined) {
        return false
    }

    let wh      = getWinHash(),
        hash    = getTrueHash(wh),
        hsh_val = hash[0],
        hsh_que = hash[1],
        vl      = '',
        cl      = {},
        ch      = 0

    if (isEmpty(hsh_que)) {
        return false
    }

    if (!isEmpty(hsh_val)) {
        vl += hsh_val
    }

    let que = getQuery(hsh_que), i

    for (i in que) {
        if (!que.hasOwnProperty(i)) {
            continue
        }
        if (i === n) {
            cl[i] = e
            ch ++
        } else {
            cl[i] = que[i]
        }
    }

    vl += '?' + toQuery(cl)
    setWinHash(vl)
    return ch !== 0
}
