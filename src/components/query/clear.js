import {HashCpQuery} from "../holder.js";
import {getHashValue, getWinHash, isEmpty, setWinHash} from "../../helpers.js";

/**
 * clear query from hash.
 * @returns HashCpQuery
 */
HashCpQuery.clear = () => {
    let cp = HashCpQuery;

    let hash        = getWinHash();
    let hashValue   = getHashValue(hash);

    if (!cp.have()) {
        return cp;
    }

    if (!isEmpty(hashValue)) {
        setWinHash(hashValue);
    } else {
        setWinHash('');
    }

    return cp;
}
