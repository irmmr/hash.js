import {HashCpQueryStr} from "../../holder.js";
import {getHashQuery, getWinHash} from "../../../helpers.js";

/**
 * get query string.
 * @returns HashCpQueryStr
 */
HashCpQueryStr.get = () => {
    return getHashQuery(getWinHash())
}
