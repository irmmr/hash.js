import HashComponent from "../../component.js";
import {getWinHash, isString} from "../../helpers.js";

/**
 * checking with equals in location hash.
 * @param   {string}    data
 * @returns boolean
 */
HashComponent.is = (data) => {
    return isString(data) && getWinHash() === data;
}
