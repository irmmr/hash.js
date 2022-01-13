import HashComponent from "../../component.js"
import {getWinHash, isArr, isEmpty, toArray} from "../../helpers.js"

/**
 * check or searching for a string in hash.
 * @param {string|array} data
 * @returns boolean
 */
HashComponent.have = (data = '') => {
    data = toArray(data)
    if (!isArr(data)) {
        return false
    }

    let wh = getWinHash()
    data   = data.filter(i => i !== '')

    if (isEmpty(data)) {
        return !isEmpty(wh)
    }

    for (let i in data) {
        if (!data.hasOwnProperty(i) || !wh.includes(data[i])) {
            return false
        }
    }

    return true
}
