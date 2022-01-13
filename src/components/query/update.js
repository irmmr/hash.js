import {HashCpQuery} from "../holder.js"
import {isEmpty, isObj, isQueParOk, isString, objFilter, toObjQue} from "../../helpers.js"

/**
 * update query.
 * @param data
 * @param value
 * @returns {HashCpQuery}
 */
HashCpQuery.update = (data, value = null) => {
    let cp = HashCpQuery

    data = toObjQue(data, value)

    if (!data || !isObj(data) || !cp.have()) {
        return cp
    }

    data = objFilter(data, d => {
        let n = d[0],
            v = d[1]
        return v !== undefined && cp.have(n)
    })

    return isEmpty(data) ? cp : cp.set(data)
}