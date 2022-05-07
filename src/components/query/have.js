import {HashCpQuery} from "../holder.js";
import {isArr, isEmpty, toArray} from "../../helpers.js";

/**
 * check for location hash query.
 * @param data
 * @returns boolean
 */
HashCpQuery.have = (data = '') => {
    data = toArray(data);

    if (!isArr(data)) {
        return false;
    }

    let query  = HashCpQuery.get();

    if (isEmpty(data)) {
        return !isEmpty(query);
    }

    for (let i in data) {
        if (!data.hasOwnProperty(i) || !query.hasOwnProperty(data[i])) {
            return false;
        }
    }

    return true;
}
