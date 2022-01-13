import HashComponent from "../../component.js"
import {getWinHash, isEmpty, isRegExp, isString, replaceAll, setWinHash, toArray} from "../../helpers.js"

/**
 * remove a string from location hash.
 * @param {string|array} values The words/chars list
 * @returns HashComponent
 */
HashComponent.remove = (values = []) => {
    let cp = HashComponent

    values = toArray(values)
    if (isEmpty(values)) {
        return cp
    }

    let wh      = getWinHash(),
        entry   = wh

    if (isEmpty(wh)) {
        return cp
    }

    values.forEach(v => {
        if (isString(v)) {
            if (entry.includes(v)) {
                entry = replaceAll(entry, v, '')
            }
        } else if (isRegExp(v)) {
            entry = entry.replace(v, '')
        }
    })

    if (entry !== wh) {
        setWinHash(entry)
    }

    return cp
}
