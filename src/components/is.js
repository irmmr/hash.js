import helper from "../helpers";
import {HashComponent} from "../core";

export default {

    /**
     * checking with equals in location hash.
     * @param {string} n
     * @returns boolean
     */
    is: function (n = '') {
        if (!helper.isString(n)) {
            return false
        }
        return helper.getWinHash() === n
    },

    /**
     * checking for value string in location hash.
     * @param {string} n
     * @return boolean
     */
    isValue: function (n = '') {
        if (!helper.isString(n)) {
            return false
        }
        let wh = helper.getWinHash(),
            hash = helper.getTrueHash(wh)[0]
        return hash === n
    },

    /**
     * check for query value in location hash.
     * @param {string} n
     * @param {string|null|number} e
     * @returns boolean
     */
    isQuery: function (n, e) {
        if (!helper.isString(n) || helper.isEmpty(n) ||
            (!helper.isString(e) && !helper.isNum(e) && !helper.isNull(e))) {
            return false
        }
        let wh      = helper.getWinHash(),
            hsh_que = helper.getTrueHash(wh)[1]
        if (helper.isEmpty(hsh_que)) {
            return false
        }
        let que = helper.getQuery(hsh_que)
        if (!que.hasOwnProperty(n)) {
            return false
        }
        return que[n] === e
    }
    
}
