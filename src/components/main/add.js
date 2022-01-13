import HashComponent from "../../component.js"
import {getBool, getWinHash, insertStr, isEmpty, isString, parseKv, replaceAll, setWinHash} from "../../helpers.js"

/**
 * add a string to location hash.
 * @param {string} value
 * @param {object|string} options
 * @returns HashComponent
 */
HashComponent.add = (value, options = {
    position: 'after',
    multiple: false
}) => {
    let cp = HashComponent

    if (!isString(value) || isEmpty(value)) {
        return cp
    }

    let wh      = getWinHash(),
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
            entry = wh + value
        } else {
            entry = multiple ? replaceAll(wh, a_pos, a_pos + value)
                : wh.replace(a_pos, a_pos + value)
        }
    } else if ('before' in pos) {
        let b_pos = pos.before

        if (isEmpty(b_pos)) {
            entry = value + wh
        } else {
            entry = multiple ? replaceAll(wh, b_pos, value + b_pos)
                : wh.replace(b_pos, value + b_pos)
        }
    } else if ('index' in pos) {
        entry = insertStr(wh, value, pos.index)
    }

    if (!isEmpty(entry)) {
        setWinHash(entry)
    }

    return cp
}
