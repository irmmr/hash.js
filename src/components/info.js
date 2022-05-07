import info from "../info.js";
import HashComponent from "../component.js";

/**
 * Hash Info component.
 * @returns
 */
HashComponent.info = () => {
    return {
        version : info.version || '?',
        name: info.name || '?',
        module: info.module || '?'
    }
}
