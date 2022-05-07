import HashComponent from "../../component.js";
import {getWinHash, isRegExp, isString, setWinHash} from "../../helpers.js";

/**
 * replace hash string.
 * @param {string|RegExp} from
 * @param {string} to
 * @returns HashComponent
 */
HashComponent.replace = (from, to) => {
    let cp = HashComponent;

    if (!isString(to) || (!isString(from) && !isRegExp(from))) {
        return cp;
    }

    setWinHash(getWinHash().replace(from, to));

    return cp;
}
