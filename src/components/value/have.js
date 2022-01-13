import {HashCpValue} from "../holder.js"
import {isArr, isEmpty, toArray} from "../../helpers.js"

/**
 * check for location hash value.
 * @param data
 * @returns boolean
 */
HashCpValue.have = (data = '') => {
    data = toArray(data)
    if (!isArr(data)) {
        return false
    }

    let wv = HashCpValue.get()

    if (isEmpty(data)) {
        return !isEmpty(wv)
    }

    for (let i in data) {
        if (!data.hasOwnProperty(i)) continue

        if (!wv.includes(data[i])) {
            return false
        }
    }

    return true
}
