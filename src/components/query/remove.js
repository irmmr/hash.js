import {HashCpQuery} from "../holder.js"
import {isEmpty, objFilter, toArray} from "../../helpers.js"

/**
 * remove some parts of hash query.
 * @param {string|array} name The queries|query name(s).
 * @returns HashCpValue
 */
HashCpQuery.remove = (name = []) => {
    let cp = HashCpQuery

    name = toArray(name)
    if (isEmpty(name)) {
        return cp
    }

    let que     = cp.get(),
        entry   = que

    if (isEmpty(que)) {
        return cp
    }

    entry = objFilter(entry, ([k, v]) => {
        return !name.includes(k)
    })

    if (que !== entry) {
        cp.define(entry)
    }

    return cp
}
