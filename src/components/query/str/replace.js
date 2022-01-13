import {HashCpQueryStr} from "../../holder.js"
import {getHashQuery, getWinHash, isEmpty, isRegExp, isString, setEvHash} from "../../../helpers.js"

/**
 * replace hash query string.
 * @param {string|RegExp} from
 * @param {string} to
 * @returns HashCpQueryStr
 */
HashCpQueryStr.replace = (from, to) => {
    let cp = HashCpQueryStr

    if (!isString(to) || (!isString(from) && !isRegExp(from))) {
        return cp
    }

    let wh      = getWinHash(),
        query   = getHashQuery(wh)

    if (isEmpty(query)) {
        return cp
    }

    setEvHash({
        string: {
            query: query.replace(from, to)
        }
    })

    return cp
}
