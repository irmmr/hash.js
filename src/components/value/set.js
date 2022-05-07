import {HashCpValue} from "../holder.js";
import {isString, setEvHash} from "../../helpers.js";

/**
 * set value
 * @param value
 * @returns HashCpValue
 */
HashCpValue.set = (value) => {
    let cp = HashCpValue;

    if (!isString(value)) {
        return cp;
    }

    setEvHash({
        value
    });

    return cp;
}
