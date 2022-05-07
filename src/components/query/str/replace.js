import {HashCpQueryStr} from "../../holder.js";
import {getHashQuery, getWinHash, isEmpty, isRegExp, isString, setEvHash} from "../../../helpers.js";

/**
 * replace hash query string.
 * @param {string|RegExp} from
 * @param {string} to
 * @returns HashCpQueryStr
 */
HashCpQueryStr.replace = (from, to) => {
    let cp = HashCpQueryStr;

    if (!isString(to) || (!isString(from) && !isRegExp(from))) {
        return cp;
    }

    let hash        = getWinHash();
    let hashQuery   = getHashQuery(hash);

    if (isEmpty(hashQuery)) {
        return cp;
    }

    setEvHash({
        string: {
            query: hashQuery.replace(from, to)
        }
    });

    return cp;
}
