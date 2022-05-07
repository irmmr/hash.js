// All direct components are deprecated!!

import HashComponent from "../component.js"
import {
    createObjVal,
    getQuery,
    getTrueHash,
    getWinHash, isArr,
    isEmpty,
    isObj, isQueParOk, isQuery,
    isString, isTrueHash, objSize,
    replaceAll,
    setWinHash,
    toQuery
} from "../helpers.js"


/* Add functions */

/**
 * add a value to location hash.
 * @deprecated Deprecated in `v1.7.4`, Please use `.value|v.add()` instead.
 * @param {string} n
 * @returns boolean
 */
HashComponent.addValue = (n = '') => {
    if (!isString(n) || isEmpty(n)) {
        return false
    }

    if (n.includes('?')) {
        n = replaceAll(n, '?', encodeURIComponent('?'))
    }

    let wh      = getWinHash(),
        hash    = getTrueHash(wh),
        hsh_val = hash[0],
        hsh_que = hash[1]

    if (!isEmpty(hsh_val)) {
        n = hsh_val + n
    }

    if (!isEmpty(hsh_que)) {
        n += '?' + hsh_que
    }

    setWinHash(n)

    return true
}

/**
 * add a query to location hash.
 * @deprecated Deprecated in `v1.7.4`, Please use `.query|q.add()` instead.
 * @param {*} n
 * @returns boolean
 */
HashComponent.addQuery = (n = {}) => {
    if (!isObj(n) || n.length === 0) {
        return false
    }

    let wh      = getWinHash(),
        hash    = getTrueHash(wh),
        hsh_val = hash[0],
        hsh_que = hash[1],
        vl      = ''

    if (!isEmpty(hsh_que)) {
        let oq  = getQuery(hsh_que)
        n       = Object.assign(oq, n)
    }

    if (!isEmpty(hsh_val)) {
        vl += hsh_val
    }

    vl += '?' + toQuery(n)
    setWinHash(vl)

    return true
}

/* Clear functions */

/**
 * clear hash value from location hash.
 * @deprecated Deprecated in `v1.7.4`, Please use `.value|v.clear()` instead.
 * @returns boolean
 */
HashComponent.clearValue = () => {
    let wh = getWinHash()

    if (isEmpty(wh)) {
        return true
    }

    if (!isTrueHash(wh)) {
        return false
    }

    let wg = getTrueHash(wh),
        wv = wg[0],
        wq = wg[1]

    if (isEmpty(wv)) {
        return true
    }

    setWinHash(isEmpty(wq) ? '' : '?' + wq)
    return true
}

/**
 * clear hash query from location hash.
 * @deprecated Deprecated in `v1.7.4`, Please use `.query|q.clear()` instead.
 * @returns boolean
 */
HashComponent.clearQuery = () => {
    let wh = getWinHash()

    if (isEmpty(wh)) {
        return true
    }

    if (!isTrueHash(wh)) {
        return false
    }

    let wg = getTrueHash(wh),
        wv = wg[0],
        wq = wg[1]

    if (isEmpty(wq)) {
        return true
    }

    setWinHash(wv)
    return true
}

/* Get functions */

/**
 * get location hash value.
 * @deprecated Deprecated in `v1.7.4`, Please use `.value|v.get()` instead.
 * @returns string
 */
HashComponent.getValue = () => {
    let wh = getWinHash()
    return isEmpty(wh) ? '' : getTrueHash(wh)[0]
}

/**
 * get the location hash query.
 * @deprecated Deprecated in `v1.7.4`, Please use `.query|q.get()` instead.
 * @param {string|array} n
 * @returns object
 */
HashComponent.getQuery = (n = []) => {
    if (isString(n)) {
        n = [n]
    }

    if (!isArr(n)) {
        return {}
    }

    n       = n.filter(i => i !== '')
    let emp = n.length === 1 ? undefined : createObjVal(n, undefined),
        wh  = getWinHash()

    if (isEmpty(wh)) {
        return emp
    }

    let hsh_que = getTrueHash(wh)[1]

    if (isEmpty(hsh_que) || !isQuery(hsh_que)) {
        return emp
    }

    let que = getQuery(hsh_que)

    if (n.length === 1) {
        return que.hasOwnProperty(n[0]) ? que[n[0]] : emp
    } else if (n.length !== 0) {
        let ans = {}, i

        for (i in n) {
            if (n.hasOwnProperty(i)) {
                let v  = n[i]
                ans[v] = que.hasOwnProperty(v) ? que[v] : undefined
            }
        }

        return ans
    }

    return que
}

/* Have functions */

/**
 * check for location hash value.
 * @deprecated Deprecated in `v1.7.4`, Please use `.value|v.have()` instead.
 * @param {string|array} n
 * @returns boolean
 */
HashComponent.haveValue = (n = '') => {
    if (isString(n)) {
        n = [n]
    }

    if (!isArr(n)) {
        return false
    }

    let wv = HashComponent.getValue()
    n      = n.filter(i => i !== '')

    if (isEmpty(n)) {
        return !isEmpty(wv)
    }

    for (let i in n) {
        if (!n.hasOwnProperty(i)) continue

        if (!wv.includes(n[i])) {
            return false
        }
    }

    return true
}

/**
 * checking for query exists on location hash.
 * @deprecated Deprecated in `v1.7.4`, Please use `.query|q.have()` instead.
 * @param {string|array} n
 * @retuens boolean
 */
HashComponent.haveQuery = (n = []) => {
    if (isString(n)) {
        n = [n]
    }

    if (!isArr(n)) {
        return false
    }

    let wh = getWinHash(),
        wq = getTrueHash(wh)[1]

    if (n.length === 0) {
        return !isEmpty(wq)
    }

    if (!isQuery(wq)) {
        return false
    }

    let que = getQuery(wq), i

    for (i in n) {
        if (!n.hasOwnProperty(i)) continue
        if (!que.hasOwnProperty(n[i])) {
            return false
        }
    }

    return true
}

/* Is functions */

/**
 * checking for value string in location hash.
 * @deprecated Deprecated in `v1.7.4`, Please use `.value|v.is()` instead.
 * @param {string} n
 * @return boolean
 */
HashComponent.isValue = (n) => {
    return isString(n) && HashComponent.getValue() === n
}

/**
 * check for query value in location hash.
 * @deprecated Deprecated in `v1.7.4`, Please use `.query|q.is()` instead.
 * @param {string} n
 * @param {string|null|number|undefined} e
 * @returns boolean
 */
HashComponent.isQuery = (n, e) => {
    if (!isString(n) || isEmpty(n) || !isQueParOk(e)) {
        return false
    }

    return HashComponent.getQuery(n) === e
}

/* Update functions */

/**
 * update a query value in location hash.
 * @deprecated Deprecated in `v1.7.4`, Please use `.query|q.update()` instead.
 * @param {string} n
 * @param {string|null|number} e
 * @returns boolean
 */
HashComponent.updateQuery = (n, e) => {
    if (!isString(n) || isEmpty(n) || !isQueParOk(e)) {
        return false
    }

    if (e === undefined) {
        return false
    }

    let wh      = getWinHash(),
        hash    = getTrueHash(wh),
        hsh_val = hash[0],
        hsh_que = hash[1],
        vl      = '',
        cl      = {},
        ch      = 0

    if (isEmpty(hsh_que)) {
        return false
    }

    if (!isEmpty(hsh_val)) {
        vl += hsh_val
    }

    let que = getQuery(hsh_que), i

    for (i in que) {
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

    vl += '?' + toQuery(cl)
    setWinHash(vl)
    return ch !== 0
}

/* Remove functions */

/**
 * remove a value from location hash.
 * @deprecated Deprecated in `v1.7.4`, Please use `.value|v.remove()` instead.
 * @param {string|array} n The words list
 * @returns boolean
 */
HashComponent.removeValue = (n = []) => {
    if (isString(n) && !isEmpty(n)) {
        n = [n]
    }

    if (!isArr(n) || n.length === 0) {
        return false
    }

    let wh      = getWinHash(),
        hash    = getTrueHash(wh),
        hsh_val = hash[0],
        hsh_que = hash[1],
        vt      = ''

    if (isEmpty(wh) || isEmpty(hsh_val)) {
        return false
    }

    for (let i in n) {
        if (!n.hasOwnProperty(i)) continue

        let vl = n[i]
        if (hsh_val.includes(vl)) {
            hsh_val = replaceAll(hsh_val, vl, '')
        }
    }

    vt += hsh_val

    if (!isEmpty(hsh_que)) {
        vt += '?' + hsh_que
    }

    setWinHash(vt)
    return true
}

/**
 * remove a query from location hash.
 * @deprecated Deprecated in `v1.7.4`, Please use `.query|q.remove()` instead.
 * @param {string|array} n
 * @returns boolean
 */
HashComponent.removeQuery = (n = []) => {
    if (isString(n) && !isEmpty(n)) {
        n = [n]
    }

    if (!isArr(n) || n.length === 0) {
        return false
    }

    let wh      = getWinHash(),
        hash    = getTrueHash(wh),
        hsh_val = hash[0],
        hsh_que = hash[1],
        vt      = '',
        cl      = {}

    if (isEmpty(wh) || isEmpty(hsh_que)) {
        return false;
    }

    let que = getQuery(hsh_que), i

    for (i in que) {
        if (!que.hasOwnProperty(i)) continue

        if (!n.includes(i)) {
            cl[i] = que[i]
        }
    }

    if (!isEmpty(hsh_val)) {
        vt += hsh_val
    }

    if (objSize(cl) !== 0) {
        vt += '?' + toQuery(cl)
    }

    setWinHash(vt)
    return true
}

/* Set functions */

/**
 * set a value to location hash.
 * @deprecated Deprecated in `v1.7.4`, Please use `.value|v.set()` instead.
 * @param {string} n
 * @returns boolean
 */
HashComponent.setValue = (n = '') => {
    if (!isString(n) || isEmpty(n)) {
        return false
    }

    if (n.includes('?')) {
        n = replaceAll(n, '?', encodeURIComponent('?'))
    }

    let wh      = getWinHash(),
        hsh_que = getTrueHash(wh)[1]

    if (isEmpty(wh) || isEmpty(hsh_que)) {
        setWinHash(n)
        return true
    }

    setWinHash(n + '?' + hsh_que)
    return true
}

/**
 * set a query to location hash.
 * @deprecated Deprecated in `v1.7.4`, Please use `.query|q.set()` instead.
 * @param {object} n
 * @returns boolean
 */
HashComponent.setQuery = (n = {}) => {
    if (!isObj(n) || n.length === 0) {
        return false
    }
    let wh   = getWinHash(),
        hash = getTrueHash(wh)[0],
        aq   = toQuery(n)

    if (isEmpty(wh) || isEmpty(hash)) {
        setWinHash('?' + aq)
        return true
    }

    setWinHash(hash + '?' + aq)
    return true
}
