import {HashCpQueryStr} from "../../holder.js";
import {isArr, isEmpty, toArray} from "../../../helpers.js";

/**
 * check for location hash query string.
 * @param data
 * @returns boolean
 */
HashCpQueryStr.have = (data = '') => {
    data = toArray(data);

    if (!isArr(data)) {
        return false;
    }

    let queryStr = HashCpQueryStr.get();

    if (isEmpty(data)) {
        return !isEmpty(queryStr);
    }

    for (let i in data) {
        if (!data.hasOwnProperty(i)) continue;

        if (!queryStr.includes(data[i])) {
            return false;
        }
    }

    return true;
}
