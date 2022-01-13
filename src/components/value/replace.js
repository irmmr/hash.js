import {HashCpValue} from "../holder.js"
import {getHashValue, getWinHash, isEmpty, isRegExp, isString, setEvHash} from "../../helpers.js"

/**
 * replace hash value string.
 * @param {string|RegExp} from
 * @param {string} to
 * @returns HashCpValue
 */
HashCpValue.replace = (from, to) => {
    let cp = HashCpValue

    if (!isString(to) || (!isString(from) && !isRegExp(from))) {
        return cp
    }

    let wh      = getWinHash(),
        value   = getHashValue(wh)

    if (isEmpty(value)) {
        return cp
    }

    setEvHash({
        string: {
            value: value.replace(from, to)
        }
    })

    return cp
}
