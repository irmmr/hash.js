// import all main helpers and info
import helper from './helpers'
import info from './info'


// main lock variables
let locked     = false,
    force_lock = false

// blank variables for use in return of functions
const emptyObj = Object.freeze({}),
    emptyFunc  = function() {}

// Hash Main component
export default function (conf = {}) {

    // check conf value
    if (!helper.isObj(conf)) {
        conf = {}
    }

    // return all components
    return {

        /**
         * Hash Event component.
         * @param {string} e The listeners
         * @param {*} func   The function/callback
         * @returns
         */
        event : function(e, func = function() {}) {
            if (!helper.isDef(e) || !helper.isString(e)) {
                return
            }
            let event   = e.toLowerCase(),
                evs     = event.split(',')
            func    = helper.isDef(func) && helper.isFunc(func) ? func : emptyFunc
            for (let i in evs) {
                if (!evs.hasOwnProperty(i)) {
                    continue
                }
                let current_ev = helper.replaceAll(evs[i], ' ', '')
                switch (current_ev) {
                    case 'change' :
                        window.addEventListener('hashchange', func);
                        break;
                    case 'load' :
                        window.addEventListener('load', func);
                        break;
                    case 'ready' :
                        helper.lunchFunc(func);
                        break;
                    default :
                        // nothing to do
                        break;
                }
            }
        },

        /**
         * Hash Info component.
         * @param {object} h Config info
         * @returns
         */
        info : function(h = {}) {
            return {
                version : helper.isDef(info.version) ? info.version : '?'
            }
        },

        /**
         * remove a string from location hash.
         * @param {string|array} n The words/chars list
         * @returns boolean
         */
        remove : function (n = []) {
            if (helper.isString(n) && !helper.isEmpty(n)) {
                n = [n]
            }
            if (!helper.isArr(n) || n.length === 0) {
                return false
            }
            let wh = helper.getWinHash()
            if (helper.isEmpty(wh)) {
                return false
            }
            for (let i in n) {
                if (!n.hasOwnProperty(i)) {
                    continue
                }
                let vl = n[i]
                if (helper.getWinHash().includes(vl)) {
                    helper.setWinHash(
                        helper.replaceAll(
                            helper.getWinHash(),vl, ''
                        )
                    );
                }
            }
            return true
        },

        /**
         * remove a value from location hash.
         * @param {string|array} n The words list
         * @returns boolean
         */
        removeValue : function (n = []) {
            if (helper.isString(n) && !helper.isEmpty(n)) {
                n = [n]
            }
            if (!helper.isArr(n) || n.length === 0) {
                return false
            }
            let wh      = helper.getWinHash(),
                hash    = helper.getTrueHash(wh),
                hsh_val = hash[0],
                hsh_que = hash[1],
                vt      = ''
            if (helper.isEmpty(wh) || helper.isEmpty(hsh_val)) {
                return false
            }
            for (let i in n) {
                if (!n.hasOwnProperty(i)) {
                    continue
                }
                let vl = n[i]
                if (hsh_val.includes(vl)) {
                    hsh_val = helper.replaceAll(hsh_val, vl, '')
                }
            }
            vt += hsh_val
            if (!helper.isEmpty(hsh_que)) {
                vt += '?' + hsh_que
            }
            helper.setWinHash(vt)
            return true
        },

        /**
         * remove a query from location hash.
         * @param {string|array} n
         * @returns boolean
         */
        removeQuery : function (n = []) {
            if (helper.isString(n) && !helper.isEmpty(n)) {
                n = [n]
            }
            if (!helper.isArr(n) || n.length === 0) {
                return false
            }
            let wh      = helper.getWinHash(),
                hash    = helper.getTrueHash(wh),
                hsh_val = hash[0],
                hsh_que = hash[1],
                vt      = '',
                cl      = {}
            if (helper.isEmpty(wh) || helper.isEmpty(hsh_que)) {
                return false;
            }
            let que = helper.getQuery(hsh_que)
            for (let i in que) {
                if (!que.hasOwnProperty(i)) {
                    continue
                }
                if (!n.includes(i)) {
                    cl[i] = que[i]
                }
            }
            if (!helper.isEmpty(hsh_val)) {
                vt += hsh_val
            }
            vt += '?' + helper.toQuery(cl)
            helper.setWinHash(vt)
            return true
        },

        /**
         * check for location hash value.
         * @param {string} n
         * @returns boolean
         */
        haveValue : function (n = '') {
            if (!helper.isString(n)) {
                return false
            }
            let wh = helper.getWinHash(),
                wg = helper.getTrueHash(wh)[0]
            if (helper.isEmpty(n)) {
                return !helper.isEmpty(wg)
            }
            return wg.includes(n)
        },

        /**
         * checking for query exists on location hash.
         * @param {string|array} n
         * @retuens boolean
         */
        haveQuery : function (n = []) {
            if (helper.isString(n)) {
                n = [n]
            }
            if (!helper.isArr(n)) {
                return false
            }
            let wh = helper.getWinHash(),
                wq = helper.getTrueHash(wh)[1]
            if (n.length === 0) {
                return !helper.isEmpty(wq)
            }
            if (!helper.isQuery(wq)) {
                return false
            }
            let que = helper.getQuery(wq)
            for (let i in n) {
                if (!n.hasOwnProperty(i)) {
                    continue
                }
                if (!que.hasOwnProperty(n[i])) {
                    return false
                }
            }
            return true
        },

        /**
         * check or searching for a string in hash.
         * @param {string|array} n
         * @returns boolean
         */
        have : function (n = '') {
            if (!helper.isString(n)) {
                return false
            }
            let wh = helper.getWinHash()
            if (helper.isEmpty(wh)) {
                return false
            }
            if (helper.isEmpty(n)) {
                return true
            }
            return wh.includes(n)
        },

        /**
         * clear the page hash.
         * @param {boolean} n
         * @returns boolean
         */
        clear : function (n = true) {
            if (!helper.isBool(n)) {
                return false
            }
            window.location.hash = ''
            if (n) {
                history.pushState(null, null, window.location.href.split('#')[0])
            }
            return true
        },

        /**
         * clear hash value from location hash.
         * @returns boolean
         */
        clearValue : function () {
            let wh = helper.getWinHash()
            if (!helper.isTrueHash(wh)) {
                return false
            }
            let wg = helper.getTrueHash(wh)[1]
            helper.setWinHash('?' + wg)
            return true
        },

        /**
         * clear hash query from location hash.
         * @returns boolean
         */
        clearQuery : function () {
            let wh = helper.getWinHash()
            if (!helper.isTrueHash(wh)) {
                return false
            }
            let wg = helper.getTrueHash(wh)[0]
            helper.setWinHash(wg)
            return true
        },

        /**
         * an easy way to get location hash.
         * @param {*} n
         * @returns string
         */
        get : function (n = {}) {
            return helper.getWinHash()
        },

        /**
         * get location hash value.
         * @param {*} n
         * @returns string
         */
        getValue : function (n = {}) {
            let wh = helper.getWinHash()
            return helper.isEmpty(wh) ? '' : helper.getTrueHash(wh)[0]
        },

        /**
         * get the location hash query.
         * @param {string|array} n
         * @returns object
         */
        getQuery : function (n = []) {
            if (helper.isString(n)) {
                n = [n]
            }
            if (!helper.isArr(n)) {
                return {}
            }
            let wh = helper.getWinHash()
            if (helper.isEmpty(wh)) {
                return {}
            }
            let hsh_que = helper.getTrueHash(wh)[1]
            if (helper.isEmpty(hsh_que) || !helper.isQuery(hsh_que)) {
                return {}
            }
            let que = helper.getQuery(hsh_que)
            if (n.length === 1) {
                return que.hasOwnProperty(n[0]) ? que[n[0]] : ''
            } else if (n.length !== 0) {
                let ans = {}
                for (let i in n) {
                    if (n.hasOwnProperty(i) && que.hasOwnProperty(n[i])) {
                        let v  = n[i]
                        ans[v] = que[v]
                    }
                }
                return ans
            }
            return que
        },

        /**
         * set the page hash.
         * @param {string} n
         * @returns boolean
         */
        set : function (n = '') {
            if (!helper.isString(n) || helper.isEmpty(n)) {
                return false
            }
            helper.setWinHash(n)
            return true
        },

        /**
         * set a value to location hash.
         * @param {string} n
         * @returns boolean
         */
        setValue : function (n = '') {
            if (!helper.isString(n) || helper.isEmpty(n)) {
                return false
            }
            if (n.includes('?')) {
                n = helper.replaceAll(n, '?', encodeURIComponent('?'))
            }
            let wh      = helper.getWinHash(),
                hsh_que = helper.getTrueHash(wh)[1]
            if (helper.isEmpty(wh) || helper.isEmpty(hsh_que)) {
                helper.setWinHash(n)
                return true
            }
            helper.setWinHash(n + '?' + hsh_que)
            return true
        },

        /**
         * set a query to location hash.
         * @param {object} n
         * @returns boolean
         */
        setQuery : function (n = {}) {
            if (!helper.isObj(n) || n.length === 0) {
                return false
            }
            let wh   = helper.getWinHash(),
                hash = helper.getTrueHash(wh)[0],
                aq   = helper.toQuery(n)
            if (helper.isEmpty(wh) || helper.isEmpty(hash)) {
                helper.setWinHash('?' + aq)
                return true
            }
            helper.setWinHash(hash + '?' + aq)
            return true
        },

        /**
         * add a string to location hash.
         * @param {string} n
         * @returns boolean
         */
        add : function (n = '') {
            if (!helper.isString(n) || helper.isEmpty(n)) {
                return false
            }
            let wh = helper.getWinHash()
            if (helper.isEmpty(wh)) {
                helper.setWinHash(n)
                return true
            }
            helper.setWinHash(wh + n)
            return true
        },

        /**
         * add a value to location hash.
         * @param {string} n
         * @returns boolean
         */
        addValue : function (n = '') {
            if (!helper.isString(n) || helper.isEmpty(n)) {
                return false
            }
            if (n.includes('?')) {
                n = helper.replaceAll(n, '?', encodeURIComponent('?'))
            }
            let wh      = helper.getWinHash(),
                hash    = helper.getTrueHash(wh),
                hsh_val = hash[0],
                hsh_que = hash[1]
            if (!helper.isEmpty(hsh_val)) {
                n = hsh_val + n
            }
            if (!helper.isEmpty(hsh_que)) {
                n += '?' + hsh_que
            }
            helper.setWinHash(n)
            return true
        },

        /**
         * add a query to location hash.
         * @param {*} n
         * @returns boolean
         */
        addQuery : function (n = {}) {
            if (!helper.isObj(n) || n.length === 0) {
                return false
            }
            let wh      = helper.getWinHash(),
                hash    = helper.getTrueHash(wh),
                hsh_val = hash[0],
                hsh_que = hash[1],
                vl      = ''
            if (!helper.isEmpty(hsh_que)) {
                let oq  = helper.getQuery(hsh_que)
                n       = Object.assign(oq, n)
            }
            if (!helper.isEmpty(hsh_val)) {
                vl += hsh_val
            }
            vl += '?' + helper.toQuery(n)
            helper.setWinHash(vl)
            return true
        },

        /**
         * update a query value in location hash.
         * @param {string} n
         * @param {string|null|number} e
         * @returns boolean
         */
        updateQuery : function (n, e) {
            if (!helper.isString(n) || !(helper.isString(e) || helper.isNum(e) || helper.isNull(e))) {
                return false
            }
            let wh      = helper.getWinHash(),
                hash    = helper.getTrueHash(wh),
                hsh_val = hash[0],
                hsh_que = hash[1],
                vl      = '',
                cl      = {},
                ch      = 0
            if (helper.isEmpty(hsh_que)) {
                return false
            }
            if (!helper.isEmpty(hsh_val)) {
                vl += hsh_val
            }
            let que = helper.getQuery(hsh_que)
            for (let i in que) {
                if (!que.hasOwnProperty(i)) {
                    continue
                }
                if (i === n) {
                    cl[i] = e
                    ch ++
                } else {
                    cl[i] = que[i]
                }
            }
            vl += '?' + helper.toQuery(cl)
            helper.setWinHash(vl)
            return ch !== 0
        },

        /**
         * check if hash is locked.
         * @param {object} n
         * @returns boolean
         */
        isLocked : function (n = {}) {
            if (!helper.isDef(n) || !helper.isObj(n)) {
                return false
            }
            return locked
        },

        /**
         * unlock location's hash.
         * @param {object} n
         * @returns boolean
         */
        unLock : function (n = {}) {
            if (!helper.isDef(n) || !helper.isObj(n)) {
                return false
            }
            if (locked && !force_lock) {
                locked = false
                return true
            }
            return false
        },

        /**
         * lock the page hash.
         * @param {object} n
         * @returns boolean
         */
        lock : function (n = {}) {
            if (locked || !helper.isDef(n) || !helper.isObj(n)) {
                return false
            }
            let is_force = 'force' in n ? helper.getBool(n.force) : false
            locked       = true
            force_lock   = is_force
            const wh     = helper.getWinHash()
            window.onhashchange = function() {
                if (locked) {
                    helper.setWinHash(wh)
                }
            }
            return true
        },

        /**
         * checking with equals in location hash.
         * @param {string} n
         * @returns boolean
         */
        is : function (n = '') {
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
        isValue : function (n = '') {
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
        isQuery : function (n, e) {
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

}
