import {HashCpQuery} from "../holder.js"
import {isObj, setEvHash} from "../../helpers.js"

/**
 * set query.
 * @param data
 * @returns {HashCpQuery}
 */
HashCpQuery.define = (data) => {
    let cp    = HashCpQuery

    if (!isObj(data)) {
        return cp
    }

    setEvHash({
        query: {
            entry: data,
            type: 'define'
        }
    })

    return cp
}
