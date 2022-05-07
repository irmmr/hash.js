import {HashCpQueryStr} from "../../holder.js";
import {
    getBool, getHashQuery,
    getWinHash,
    insertStr,
    isEmpty,
    isString,
    parseKv,
    replaceAll,
    setEvHash
} from "../../../helpers.js";

/**
 * add a string to query as string.
 * @param {string} value
 * @param {object|string} options
 * @returns HashCpQueryStr
 */
HashCpQueryStr.add = (value, options = {
    position: 'after',
    multiple: false
}) => {
    let cp = HashCpQueryStr;

    if (!isString(value) || isEmpty(value)) {
        return cp;
    }

    let hash        = getWinHash();
    let hashQuery   = getHashQuery(hash);
    let entry       = '';

    // parse position options
    if (isString(options)) {
        options = {position: options};
    }

    let position = options.position || 'after';
    let multiple = getBool(options.multiple || false);

    if (isEmpty(position) || !isString(position)) {
        position = 'after';
    }

    let posParse = parseKv(position, false);

    if ('after' in posParse) {
        let posAfter = posParse.after;

        if (isEmpty(posAfter)) {
            entry = hashQuery + value;
        } else {
            if (multiple) {
                entry = replaceAll(hashQuery, posAfter, posAfter + value);
            } else {
                entry = hashQuery.replace(posAfter, posAfter + value);
            }
        }
    } else if ('before' in posParse) {
        let posBefore = posParse.before;

        if (isEmpty(posBefore)) {
            entry = value + hashQuery;
        } else {
            if (multiple) {
                entry = replaceAll(hashQuery, posBefore, value + posBefore);
            } else {
                entry = hashQuery.replace(posBefore, value + posBefore);
            }
        }
    } else if ('index' in posParse) {
        entry = insertStr(hashQuery, value, posParse.index);
    }

    if (!isEmpty(entry)) {
        setEvHash({
            string: {
                query: entry
            }
        });
    }

    return cp;
}
