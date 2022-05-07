import {HashCpQuery} from "../holder.js";
import {
    createObjVal,
    getHashQuery,
    getQuery,
    getWinHash,
    isArr,
    isEmpty, isQuery,
    toArray
} from "../../helpers.js";

/**
 * get the location hash query.
 * @param {string|array} queries
 * @returns object
 */
HashCpQuery.get = (queries = []) => {
    queries = toArray(queries);

    if (!isArr(queries)) {
        return {};
    }

    let empty   = queries.length === 1 ? undefined : createObjVal(queries, undefined);
    let hash    = getWinHash();

    if (isEmpty(hash)) {
        return empty;
    }

    let hashQuery = getHashQuery(hash);

    if (isEmpty(hashQuery) || !isQuery(hashQuery)) {
        return empty;
    }

    let query   = getQuery(hashQuery);
    let len     = queries.length;

    if (len === 0) {
        return query;
    }

    if (len === 1) {
        let firstQuery = queries[0];
        return query.hasOwnProperty(firstQuery) ? query[firstQuery] : empty;
    }

    let fetch = {};

    for (let i in queries) {
        if (queries.hasOwnProperty(i)) {
            let value  = queries[i];
            fetch[value] = query.hasOwnProperty(value) ? query[value] : undefined;
        }
    }

    return fetch;
}
