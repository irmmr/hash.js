import {HashCpQuery} from "../holder.js"
import {
    createObjVal,
    getHashQuery,
    getQuery,
    getWinHash,
    isArr,
    isEmpty, isQuery,
    toArray
} from "../../helpers.js"

/**
 * get the location hash query.
 * @param {string|array} que
 * @returns object
 */
HashCpQuery.get = (que = []) => {
    que = toArray(que)
    if (!isArr(que)) {
        return {}
    }

    que = que.filter(i => i !== '')

    let emp = que.length === 1 ? undefined : createObjVal(que, undefined),
        wh  = getWinHash()

    if (isEmpty(wh)) {
        return emp
    }

    let hsh_que = getHashQuery(wh)

    if (isEmpty(hsh_que) || !isQuery(hsh_que)) {
        return emp
    }

    let q   = getQuery(hsh_que),
        len = que.length

    if (len === 0) {
        return q
    }

    if (len === 1) {
        let fe = que[0]
        return q.hasOwnProperty(fe) ? q[fe] : emp
    }

    let ans = {}, i

    for (i in que) {
        if (que.hasOwnProperty(i)) {
            let v  = que[i]
            ans[v] = q.hasOwnProperty(v) ? q[v] : undefined
        }
    }

    return ans
}
