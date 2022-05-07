import {HashCpValue} from "../holder.js";
import {setEvHash} from "../../helpers.js";

/**
 * clear value from hash.
 * @returns HashCpValue
 */
HashCpValue.clear = () => {
    let cp = HashCpValue;

    if (cp.have()) {
        setEvHash({
            value: ''
        });
    }

    return cp;
}
