import info from "../info.js";
import HashComponent from "../component.js";
import { isEmpty, isString } from "../helpers.js";

/**
 * Hash Info component.
 * @param {string} key
 * @returns {object|undefined|*}
 */
HashComponent.info = (key = null) => {
    const data = {
        version : info.version || '?',
        name: info.name || '?',
        module: info.module || '?'
    }

    if (!isString(key) || isEmpty(key)) {
        return data;
    }

    if (key in data) {
        return data[key];
    }

    return undefined;
}
