import HashComponent from "../../component.js";
import {getWinHash, isEmpty, isRegExp, isString, replaceAll, setWinHash, toArray} from "../../helpers.js";

/**
 * remove a string from location hash.
 * @param {string|array} values The words/chars list
 * @returns HashComponent
 */
HashComponent.remove = (values = []) => {
    let cp = HashComponent;

    values = toArray(values);

    if (isEmpty(values)) {
        return cp;
    }

    let hash      = getWinHash();
    let entry     = hash;

    if (isEmpty(hash)) {
        return cp;
    }

    values.forEach(val => {
        if (isString(val)) {
            if (entry.includes(val)) {
                entry = replaceAll(entry, val, '');
            }
        } else if (isRegExp(val)) {
            entry = entry.replace(val, '');
        }
    });

    if (entry !== hash) {
        setWinHash(entry);
    }

    return cp;
}
