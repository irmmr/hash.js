import {HashCpValue} from "../holder.js";
import {isString} from "../../helpers.js";

/**
 * checking for value string in location hash.
 * @return boolean
 * @param data
 */
HashCpValue.is = (data) => {
    return isString(data) && HashCpValue.get() === data;
}
