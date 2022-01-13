import core from "./core.js"
import * as h from "./helpers.js"

const Hash = Object.assign({
    config: core.config.instance,
    h
}, core.components)

export default Hash
