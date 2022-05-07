import {HashCpQueryStr} from "../../holder.js";
import {isString} from "../../../helpers.js";

/**
 * checking for query string in location hash.
 * @return boolean
 * @param data
 */
HashCpQueryStr.is = (data) => {
    return isString(data) && HashCpQueryStr.get() === data;
}
