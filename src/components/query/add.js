import {HashCpQuery} from "../holder.js";
import {isEmpty, isObj, objFilter, setEvHash, toObjQue} from "../../helpers.js";

/**
 * add query.
 * @param {object|string} data
 * @param {string|number|null|undefined} value
 * @returns HashCpQuery
 */
HashCpQuery.add = (data, value = null) => {
    let cp  = HashCpQuery;

    data = toObjQue(data, value);

    if (!data || !isObj(data)) {
        return cp;
    }

    let query = cp.get();

    if (!isEmpty(query)) {
        data = objFilter(data, ([name, value]) => {
            return !query.hasOwnProperty(name);
        });
    }

    if (isEmpty(data)) {
        return cp;
    }

    setEvHash({
        query: {
            entry: Object.assign(query, data)
        }
    });

    return cp;
}
