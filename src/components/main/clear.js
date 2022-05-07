import HashComponent from "../../component.js";
import {getHref, setWinHash, splitOnce} from "../../helpers.js";

/**
 * clear the page hash.
 *
 * @param   {boolean}   push_state  remove '#' from hash or no?
 * @returns HashComponent
 */
HashComponent.clear = (push_state = true) => {
    let cp = HashComponent;

    if (push_state === true) {
        history.pushState(null, null, splitOnce(getHref(), '#')[0]);
    } else {
        if (cp.have()) {
            setWinHash('');
        }
    }

    return cp;
}
