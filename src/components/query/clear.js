import {HashCpQuery} from "../holder.js"
import {getHashValue, getWinHash, isEmpty, setWinHash} from "../../helpers.js"

/**
 * clear query from hash.
 * @returns HashCpQuery
 */
HashCpQuery.clear = () => {
    let cp = HashCpQuery,
        wh = getWinHash(),
        wv = getHashValue(wh)

    if (!cp.have()) {
        return cp
    }

    if (!isEmpty(wv)) {
        setWinHash(wv)
    } else {
        setWinHash('')
    }

    return cp
}
