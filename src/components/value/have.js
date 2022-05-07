import {HashCpValue} from "../holder.js";
import {isArr, isEmpty, toArray} from "../../helpers.js";

/**
 * check for location hash value.
 * @param data
 * @returns boolean
 */
HashCpValue.have = (data = '') => {
    data = toArray(data);

    if (!isArr(data)) {
        return false;
    }

    let hashValue = HashCpValue.get();

    if (isEmpty(data)) {
        return !isEmpty(hashValue);
    }

    for (let i in data) {
        if (!data.hasOwnProperty(i)) continue;

        if (!hashValue.includes(data[i])) {
            return false;
        }
    }

    return true;
}
