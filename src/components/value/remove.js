import {HashCpValue} from "../holder.js";
import {getHashValue, getWinHash, isEmpty, isRegExp, isString, replaceAll, setEvHash, toArray} from "../../helpers.js";

/**
 * remove some parts of value as string.
 * @param {string|array} values The words/chars list
 * @returns HashCpValue
 */
HashCpValue.remove = (values = []) => {
    let cp = HashCpValue;

    values = toArray(values);

    if (isEmpty(values)) {
        return cp;
    }

    let hash        = getWinHash();
    let hashValue   = getHashValue(hash);
    let entry       = hashValue;

    if (isEmpty(hashValue)) {
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

    if (entry !== hashValue) {
        setEvHash({
            value: entry
        });
    }

    return cp;
}
