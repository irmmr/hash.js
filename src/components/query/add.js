import {HashCpQuery} from "../holder.js"
import {isEmpty, isObj, objFilter, setEvHash, toObjQue} from "../../helpers.js"

/**
 * add query.
 * @param {object|string} data
 * @param {string|number|null|undefined} value
 * @returns HashCpQuery
 */
HashCpQuery.add = (data, value = null) => {
    let cp  = HashCpQuery

    data = toObjQue(data, value)
    if (!data || !isObj(data)) {
        return cp
    }

    let que = cp.get()

    if (!isEmpty(que)) {
        data = objFilter(data, ([n, v]) => {
            return !que.hasOwnProperty(n)
        })
    }

    if (isEmpty(data)) {
        return cp
    }

    setEvHash({
        query: {
            entry: Object.assign(que, data)
        }
    })

    return cp
}
