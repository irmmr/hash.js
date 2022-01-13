import {HashCpValue} from "../holder.js"
import {getHashValue, getWinHash, isEmpty, isRegExp, isString, replaceAll, setEvHash, toArray} from "../../helpers.js"

/**
 * remove some parts of value as string.
 * @param {string|array} values The words/chars list
 * @returns HashCpValue
 */
HashCpValue.remove = (values = []) => {
    let cp = HashCpValue

    values = toArray(values)
    if (isEmpty(values)) {
        return cp
    }

    let wh      = getWinHash(),
        wv      = getHashValue(wh),
        entry   = wv

    if (isEmpty(wv)) {
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

    if (entry !== wv) {
        setEvHash({
            value: entry
        })
    }

    return cp
}
