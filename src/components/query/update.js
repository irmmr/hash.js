import {HashCpQuery} from "../holder.js";
import {isEmpty, isObj, objFilter, toObjQue} from "../../helpers.js";

/**
 * update query.
 * @param data
 * @param value
 * @returns {HashCpQuery}
 */
HashCpQuery.update = (data, value = null) => {
    let cp = HashCpQuery;

    data = toObjQue(data, value);

    if (!data || !isObj(data) || !cp.have()) {
        return cp;
    }

    data = objFilter(data, d => {
        let name    = d[0];
        let value   = d[1];

        return value !== undefined && cp.have(name);
    });

    return isEmpty(data) ? cp : cp.set(data);
}