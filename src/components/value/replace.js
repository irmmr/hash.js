import {HashCpValue} from "../holder.js";
import {getHashValue, getWinHash, isEmpty, isRegExp, isString, setEvHash} from "../../helpers.js";

/**
 * replace hash value string.
 * @param {string|RegExp} from
 * @param {string} to
 * @returns HashCpValue
 */
HashCpValue.replace = (from, to) => {
    let cp = HashCpValue;

    if (!isString(to) || (!isString(from) && !isRegExp(from))) {
        return cp;
    }

    let hash        = getWinHash();
    let hashValue   = getHashValue(hash);

    if (isEmpty(hashValue)) {
        return cp;
    }

    setEvHash({
        string: {
            value: hashValue.replace(from, to)
        }
    });

    return cp;
}
