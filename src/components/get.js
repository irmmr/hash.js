import {HashComponent} from "../core";
import helper from "../helpers";

export default {
    
    /**
     * an easy way to get location hash.
     * @param {*} n
     * @returns string
     */
    get: function (n = {}) {
        return this._h.getWinHash()
    },

    /**
     * get location hash value.
     * @param {*} n
     * @returns string
     */
    getValue: function (n = {}) {
        let wh = this._h.getWinHash()
        return this._h.isEmpty(wh) ? '' : this._h.getTrueHash(wh)[0]
    },

    /**
     * get the location hash query.
     * @param {string|array} n
     * @returns object
     */
    getQuery: function (n = []) {
        if (this._h.isString(n)) {
            n = [n]
        }
        if (!this._h.isArr(n)) {
            return {}
        }
        n       = n.filter(i => i !== '')
        let emp = n.length === 1 ? undefined : this._h.createObjVal(n, undefined),
            wh  = this._h.getWinHash()
        if (this._h.isEmpty(wh)) {
            return emp
        }
        let hsh_que = this._h.getTrueHash(wh)[1]
        if (this._h.isEmpty(hsh_que) || !this._h.isQuery(hsh_que)) {
            return emp
        }
        let que = this._h.getQuery(hsh_que)
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

