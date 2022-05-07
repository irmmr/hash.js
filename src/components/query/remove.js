import {HashCpQuery} from "../holder.js";
import {isEmpty, objFilter, toArray} from "../../helpers.js";

/**
 * remove some parts of hash query.
 * @param {string|array} name The queries|query name(s).
 * @returns HashCpValue
 */
HashCpQuery.remove = (name = []) => {
    let cp = HashCpQuery;

    name = toArray(name);

    if (isEmpty(name)) {
        return cp;
    }

    let query   = cp.get();
    let entry   = query;

    if (isEmpty(query)) {
        return cp;
    }

    entry = objFilter(entry, ([key, value]) => {
        return !name.includes(key);
    });

    if (query !== entry) {
        cp.define(entry);
    }

    return cp;
}
