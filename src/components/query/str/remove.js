import {HashCpQueryStr} from "../../holder.js";
import {
    getHashQuery,
    getWinHash,
    isEmpty,
    isRegExp,
    isString,
    replaceAll,
    setEvHash,
    toArray
} from "../../../helpers.js";

/**
 * remove some parts of query as string.
 * @param {string|array} values The words/chars list
 * @returns HashCpQueryStr
 */
HashCpQueryStr.remove = (values = []) => {
    let cp = HashCpQueryStr;

    values = toArray(values);

    if (isEmpty(values)) {
        return cp;
    }

    let hash        = getWinHash();
    let hashQuery   = getHashQuery(hash);
    let entry       = hashQuery;

    if (isEmpty(hashQuery)) {
        return cp;
    }

    values.forEach(value => {
        if (isString(value)) {
            if (entry.includes(value)) {
                entry = replaceAll(entry, value, '');
            }
        } else if (isRegExp(value)) {
            entry = entry.replace(value, '');
        }
    });

    if (entry !== hashQuery) {
        setEvHash({
            string: {
                query: entry
            }
        });
    }

    return cp;
}
