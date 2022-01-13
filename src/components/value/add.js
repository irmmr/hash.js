import {HashCpValue} from "../holder.js"
import {
    getBool,
    getHashValue,
    getWinHash,
    insertStr,
    isEmpty,
    isString,
    parseKv,
    replaceAll,
    setEvHash
} from "../../helpers.js"

/**
 * add a string to value.
 * @param {string} value
 * @param {object|string} options
 * @returns HashCpValue
 */
HashCpValue.add = (value, options = {
    position: 'after',
    multiple: false
}) => {
    let cp = HashCpValue

    if (!isString(value) || isEmpty(value)) {
        return cp
    }

    let wh      = getWinHash(),
        v       = getHashValue(wh),
        entry   = ''

    // parse position options
    if (isString(options)) {
        options = {position: options}
    }

    let position = options.position || 'after',
        multiple = getBool(options.multiple || false)

    if (isEmpty(position) || !isString(position)) {
        position = 'after'
    }

    let pos = parseKv(position, false)

    if ('after' in pos) {
        let a_pos = pos.after

        if (isEmpty(a_pos)) {
            entry = v + value
        } else {
            if (multiple) {
                entry = replaceAll(v, a_pos, a_pos + value)
            } else {
                entry = v.replace(a_pos, a_pos + value)
            }
        }
    } else if ('before' in pos) {
        let b_pos = pos.before

        if (isEmpty(b_pos)) {
            entry = value + v
        } else {
            if (multiple) {
                entry = replaceAll(v, b_pos, value + b_pos)
            } else {
                entry = v.replace(b_pos, value + b_pos)
            }
        }
    } else if ('index' in pos) {
        entry = insertStr(v, value, pos.index)
    }

    if (!isEmpty(entry)) {
        setEvHash({
            value: entry
        })
    }

    return cp
}
