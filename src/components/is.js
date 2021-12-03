import HashComponent from "../component"
import {getWinHash, isEmpty, isQueParOk, isString} from "../helpers.js"

/**
 * checking with equals in location hash.
 * @param {string} n
 * @returns boolean
 */
HashComponent.is = (n) => {
    return isString(n) && getWinHash() === n
}

/**
 * checking for value string in location hash.
 * @param {string} n
 * @return boolean
 */
HashComponent.isValue = (n) => {
    return isString(n) && HashComponent.getValue() === n
}

/**
 * check for query value in location hash.
 * @param {string} n
 * @param {string|null|number|undefined} e
 * @returns boolean
 */
HashComponent.isQuery = (n, e) => {
    if (!isString(n) || isEmpty(n) || !isQueParOk(e)) {
        return false
    }

    return HashComponent.getQuery(n) === e
}
