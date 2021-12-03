import info from "../info";
import HashComponent from "../component"

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
