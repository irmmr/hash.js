import HashComponent from "../../component.js";
import {getHref, setWinHash, splitOnce, triggerEvent} from "../../helpers.js";

/**
 * clear the page hash.
 *
 * @param   {boolean}   push_state  remove '#' from hash or no?
 * @returns HashComponent
 */
HashComponent.clear = (push_state = true) => {
    let cp      = HashComponent;

    if (push_state === true) {
        let href      = getHref();
        let hashEmpty = splitOnce(href, '#')[0];

        history.pushState(null, null, hashEmpty);
        triggerEvent(new HashChangeEvent('hashchange', { oldURL: href, newURL: hashEmpty }));
    } else {
        if (cp.have()) {
            setWinHash('');
        }
    }

    return cp;
}
