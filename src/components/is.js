import helper from "../helpers";

export default {

    /**
     * checking with equals in location hash.
     * @param {string} n
     * @returns boolean
     */
    is: function (n) {
        return this._h.isString(n) && this._h.getWinHash() === n
    },

    /**
     * checking for value string in location hash.
     * @param {string} n
     * @return boolean
     */
    isValue: function (n) {
        return this._h.isString(n) && this.getValue() === n
    },

    /**
     * check for query value in location hash.
     * @param {string} n
     * @param {string|null|number|undefined} e
     * @returns boolean
     */
    isQuery: function (n, e) {
        if (!this._h.isString(n) || this._h.isEmpty(n) || !this._h.isQueParOk(e)) {
            return false
        }
        return this.getQuery(n) === e
    }
    
}
