import core from "./core.js";
import * as h from "./helpers.js";

/**
 * Define Hash constant to use as main access
 * to all helpers and components.
 *
 * @type {object}
 */
const Hash = Object.assign({
    config: core.config.instance,
    h
}, core.components);

export default Hash;
