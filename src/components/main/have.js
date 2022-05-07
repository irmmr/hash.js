import HashComponent from "../../component.js";
import {getWinHash, isArr, isEmpty, toArray} from "../../helpers.js";

/**
 * check or searching for a string in hash.
 *
 * @param {string|array}    data    word(s)/string(s) to check in hash string
 * @returns boolean
 */
HashComponent.have = (data = '') => {
    data = toArray(data);

    if (!isArr(data)) {
        return false;
    }

    let hash    = getWinHash();

    if (isEmpty(data)) {
        return !isEmpty(hash);
    }

    for (let i in data) {
        if (!data.hasOwnProperty(i) || !hash.includes(data[i])) {
            return false;
        }
    }

    return true;
}
