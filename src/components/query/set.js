import {HashCpQuery} from "../holder.js"
import {isObj, setEvHash, toObjQue} from "../../helpers.js"

/**
 * set query.
 * @param data
 * @param value
 * @returns {HashCpQuery}
 */
HashCpQuery.set = (data, value = null) => {
    let cp = HashCpQuery

    data = toObjQue(data, value)

    if (!data || !isObj(data)) {
        return cp
    }

    setEvHash({
        query: {
            entry: data
        }
    })

    return cp
}
