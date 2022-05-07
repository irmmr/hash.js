import {HashCpValue} from "../holder.js";
import {
    getBool,
    getHashValue,
    getWinHash,
    insertStr,
    isEmpty,
    isString,
    parseKv,
    replaceAll,
    setEvHash
} from "../../helpers.js";

/**
 * add a string to value.
 * @param {string} value
 * @param {object|string} options
 * @returns HashCpValue
 */
HashCpValue.add = (value, options = {
    position: 'after',
    multiple: false
}) => {
    let cp = HashCpValue;

    if (!isString(value) || isEmpty(value)) {
        return cp;
    }

    let hash        = getWinHash();
    let hashValue   = getHashValue(hash);
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
            entry = hashValue + value;
        } else {
            if (multiple) {
                entry = replaceAll(hashValue, posAfter, posAfter + value);
            } else {
                entry = hashValue.replace(posAfter, posAfter + value);
            }
        }
    } else if ('before' in posParse) {
        let posBefore = posParse.before;

        if (isEmpty(posBefore)) {
            entry = value + hashValue;
        } else {
            if (multiple) {
                entry = replaceAll(hashValue, posBefore, value + posBefore);
            } else {
                entry = hashValue.replace(posBefore, value + posBefore);
            }
        }
    } else if ('index' in posParse) {
        entry = insertStr(hashValue, value, posParse.index);
    }

    if (!isEmpty(entry)) {
        setEvHash({
            value: entry
        });
    }

    return cp;
}
