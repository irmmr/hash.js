import HashComponent from "../../component.js";
import {getBool, getWinHash, insertStr, isEmpty, isString, parseKv, replaceAll, setWinHash} from "../../helpers.js";

/**
 * add a string to location hash.
 *
 * @param   {string}        value       entry value to add
 * @param   {object|string} options     adding options
 * @returns HashComponent
 */
HashComponent.add = (value, options = {
    position: 'after',
    multiple: false
}) => {
    let cp = HashComponent;

    if (!isString(value) || isEmpty(value)) {
        return cp;
    }

    let hash        = getWinHash();
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

    let parsePosition = parseKv(position, false);

    if ('after' in parsePosition) {
        let posAfter = parsePosition.after;

        if (isEmpty(posAfter)) {
            entry = hash + value;
        } else {
            if (multiple) {
                entry = replaceAll(hash, posAfter, posAfter + value);
            } else {
                entry = hash.replace(posAfter, posAfter + value);
            }
        }
    } else if ('before' in parsePosition) {
        let posBefore = parsePosition.before;

        if (isEmpty(posBefore)) {
            entry = value + hash;
        } else {
            if (multiple) {
                entry = replaceAll(hash, posBefore, value + posBefore);
            } else {
                entry = hash.replace(posBefore, value + posBefore);
            }
        }
    } else if ('index' in parsePosition) {
        entry = insertStr(hash, value, parsePosition.index);
    }

    if (!isEmpty(entry)) {
        setWinHash(entry);
    }

    return cp;
}
