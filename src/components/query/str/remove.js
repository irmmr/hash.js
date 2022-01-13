import {HashCpQueryStr} from "../../holder.js"
import {
    getHashQuery,
    getWinHash,
    isEmpty,
    isRegExp,
    isString,
    replaceAll,
    setEvHash,
    toArray
} from "../../../helpers.js"

/**
 * remove some parts of query as string.
 * @param {string|array} values The words/chars list
 * @returns HashCpQueryStr
 */
HashCpQueryStr.remove = (values = []) => {
    let cp = HashCpQueryStr

    values = toArray(values)
    if (isEmpty(values)) {
        return cp
    }

    let wh      = getWinHash(),
        qs      = getHashQuery(wh),
        entry   = qs

    if (isEmpty(qs)) {
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

    if (entry !== qs) {
        setEvHash({
            string: {
                query: entry
            }
        })
    }

    return cp
}
