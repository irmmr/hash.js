import {HashCpValue} from "../holder.js"
import {getHashValue, getWinHash} from "../../helpers.js"

/**
 * get value.
 * @returns HashCpValue
 */
HashCpValue.get = () => {
    return getHashValue(getWinHash())
}
