import HashComponent from "../../component.js"
import {getWinHash, isString} from "../../helpers.js"

/**
 * checking with equals in location hash.
 * @returns boolean
 * @param data
 */
HashComponent.is = (data) => {
    return isString(data) && getWinHash() === data
}
