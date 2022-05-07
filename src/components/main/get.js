import HashComponent from "../../component.js";
import {getWinHash} from "../../helpers.js";

/**
 * an easy way to get location hash.
 * @returns string
 */
HashComponent.get = () => {
    return getWinHash();
}
