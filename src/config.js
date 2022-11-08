import {empty_object, and_symbol, equ_symbol, que_symbol} from "./vars.js";

/**
 * HashConfig class.
 */
class HashConfig {
    /**
     * define all default config data
     */
    static #configs = HashConfig.defaults();

    /**
     * Get all default configs
     *
     * @returns {object}
     */
    static defaults() {
        return {
            getHashCallback: null,
            setHashCallback: null,
            getHashFilter: null,
            setHashFilter: null,
            getHrefCallback: null,
            // window default variable
            window: null,
            // log enable/disable
            log: true,
            // query symbols
            andSymbol: and_symbol,
            equSymbol: equ_symbol,
            queSymbol: que_symbol
        }
    }

    /**
     * Instance call with set options
     * @param   {object}        options
     * @returns {HashConfig}
     */
    static instance(options = {}) {
        HashConfig.set(options);

        return HashConfig;
    }

    /**
     * Clear all configs
     */
    static clear() {
        HashConfig.define(empty_object);
    }

    /**
     * Reset configs into defaults
     */
    static reset() {
        HashConfig.define(HashConfig.defaults());
    }

    /**
     * Check for config
     *
     * @param   {string}    name
     * @returns {boolean}
     */
    static has(name) {
        return typeof HashConfig.#configs === 'object' && name in HashConfig.#configs;
    }

    /**
     * Define config
     *
     * @param {object} options
     */
    static define(options) {
        if (typeof options !== 'object') {
            return;
        }

        HashConfig.#configs = options;
    }

    /**
     * Set config
     * @param options
     */
    static set(options) {
        if (typeof options !== 'object') {
            return;
        }

        let configs = HashConfig.#configs;
        HashConfig.define(Object.assign({}, configs, options));
    }

    /**
     * Get config
     *
     * @param   {string}    name
     * @param   {*}         def
     * @returns {string|Readonly<{}>|*}
     */
    static get(name = null, def = '') {
        let configs = HashConfig.#configs;

        if (null == name) {
            return configs;
        }

        let exp = name.toString().trim().split('.');
        let i;

        if (exp.length === 1) {
            if (HashConfig.has(name)) {
                return configs[name];
            }
        } else {
            let val     = configs;
            let find    = false;

            for (i in exp) {
                if (!exp.hasOwnProperty(i)) continue;

                if (typeof val[exp[i]] !== 'undefined') {
                    find    = true;
                    val     = val[exp[i]];
                } else {
                    find    = false;
                    break;
                }
            }

            if (find) {
                return val;
            }
        }

        return def;
    }
}

export default HashConfig