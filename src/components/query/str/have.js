import {HashCpQueryStr} from "../../holder.js"
import {isArr, isEmpty, toArray} from "../../../helpers.js"

/**
 * check for location hash query string.
 * @param data
 * @returns boolean
 */
HashCpQueryStr.have = (data = '') => {
    data = toArray(data)
    if (!isArr(data)) {
        return false
    }

    let qs = HashCpQueryStr.get()

    if (isEmpty(data)) {
        return !isEmpty(qs)
    }

    for (let i in data) {
        if (!data.hasOwnProperty(i)) continue

        if (!qs.includes(data[i])) {
            return false
        }
    }

    return true
}
