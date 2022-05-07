import {HashCpQuery} from "../holder.js";
import {isString} from "../../helpers.js";

/**
 * checking for query in location hash.
 * @return boolean
 * @param name
 * @param value
 */
HashCpQuery.is = (name, value) => {
    return isString(name) && HashCpQuery.get(name) === value;
}
