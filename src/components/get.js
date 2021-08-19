import {HashComponent} from "../core";
import helper from "../helpers";

export default {
    
    /**
     * an easy way to get location hash.
     * @param {*} n
     * @returns string
     */
    get: function (n = {}) {
        return helper.getWinHash()
    },

    /**
     * get location hash value.
     * @param {*} n
     * @returns string
     */
    getValue: function (n = {}) {
        let wh = helper.getWinHash()
        return helper.isEmpty(wh) ? '' : helper.getTrueHash(wh)[0]
    },

    /**
     * get the location hash query.
     * @param {string|array} n
     * @returns object
     */
    getQuery: function (n = []) {
        if (helper.isString(n)) {
            n = [n]
        }
        if (!helper.isArr(n)) {
            return {}
        }
        n       = n.filter(i => i !== '')
        let emp = n.length === 1 ? undefined : {}
        let wh  = helper.getWinHash()
        if (helper.isEmpty(wh)) {
            return emp
        }
        let hsh_que = helper.getTrueHash(wh)[1]
        if (helper.isEmpty(hsh_que) || !helper.isQuery(hsh_que)) {
            return emp
        }
        let que = helper.getQuery(hsh_que)
        if (n.length === 1) {
            return que.hasOwnProperty(n[0]) ? que[n[0]] : emp
        } else if (n.length !== 0) {
            let ans = {}
            for (let i in n) {
                if (n.hasOwnProperty(i)) {
                    let v  = n[i]
                    ans[v] = que.hasOwnProperty(v) ? que[v] : undefined
                }
            }
            return ans
        }
        return que
    }
    
}

