import HashComponent from "../component.js"
import {createObjVal, getQuery, getTrueHash, getWinHash, isArr, isEmpty, isQuery, isString} from "../helpers.js";

/**
 * an easy way to get location hash.
 * @returns string
 */
HashComponent.get = () => {
    return getWinHash()
}

/**
 * get location hash value.
 * @returns string
 */
HashComponent.getValue = () => {
    let wh = getWinHash()
    return isEmpty(wh) ? '' : getTrueHash(wh)[0]
}

/**
 * get the location hash query.
 * @param {string|array} n
 * @returns object
 */
HashComponent.getQuery = (n = []) => {
    if (isString(n)) {
        n = [n]
    }

    if (!isArr(n)) {
        return {}
    }

    n       = n.filter(i => i !== '')
    let emp = n.length === 1 ? undefined : createObjVal(n, undefined),
        wh  = getWinHash()

    if (isEmpty(wh)) {
        return emp
    }

    let hsh_que = getTrueHash(wh)[1]

    if (isEmpty(hsh_que) || !isQuery(hsh_que)) {
        return emp
    }

    let que = getQuery(hsh_que)

    if (n.length === 1) {
        return que.hasOwnProperty(n[0]) ? que[n[0]] : emp
    } else if (n.length !== 0) {
        let ans = {}, i

        for (i in n) {
            if (n.hasOwnProperty(i)) {
                let v  = n[i]
                ans[v] = que.hasOwnProperty(v) ? que[v] : undefined
            }
        }

        return ans
    }

    return que
}
