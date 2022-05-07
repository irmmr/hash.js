import HashComponent from "../../component.js";
import {isString, setWinHash} from "../../helpers.js";

/**
 * set the page hash.
 * @param {string} value
 * @returns HashComponent
 */
HashComponent.set = (value = '') => {
    let cp = HashComponent;

    if (!isString(value)) {
        return cp;
    }

    setWinHash(value);

    return cp;
}
