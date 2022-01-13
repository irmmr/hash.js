import {HashCpQueryStr} from "../../holder.js"
import {isString, setEvHash} from "../../../helpers.js"

/**
 * set query string.
 * @param string
 * @returns {HashCpQueryStr}
 */
HashCpQueryStr.set = (string) => {
    let cp = HashCpQueryStr

    if (!isString(string)) {
        return cp
    }

    setEvHash({
        string: {
            query: string
        }
    })

    return cp
}
