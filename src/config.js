import { changeDispatch } from "./event/init.js";
import { getWindow, getDefWindow, isEqual } from "./helpers.js";
import { empty_object, and_symbol, equ_symbol, que_symbol } from "./vars.js";

/**
 * HashConfig class.
 * manage all config actions for Hash
 */
export default class HashConfig {
    /**
     * define all default config data
     */
    static #configs = HashConfig.defaults();

    /**
     * check for data type, if it is readl Object {}
     * @access private
     * @param {any} data
     * @returns boolean
     */
    static #isObj(data) {
        return data !== null && typeof data === 'object' && data.constructor === Object;
    }

    /**
     * deep merge objects over and over
     * @access private
     * @param {object} target
     * @param  {...object} sources
     * @returns object
     */
    static #deepMerge(target, ...sources) {
        if (!sources.length) {
            return target;
        }

        const cp     = HashConfig;
        const source = sources.shift();

        if (cp.#isObj(target) && cp.#isObj(source)) {
            for (const key in source) {
                if (cp.#isObj(source[key])) {
                    if (!target[key]) {
                        Object.assign(target, { [key]: {} });
                    }

                    cp.#deepMerge(target[key], source[key]);
                } else {
                    Object.assign(target, { [key]: source[key] });
                }
            }
        }

        return cp.#deepMerge(target, ...sources);
    }

    /**
     * trigger every change in configs to replace values
     * and data in other parts of lib.
     * @param {string} key      The config key
     * @param {*} old_value     The key old value
     * @param {*} new_value     The key new value to set
     */
    static #keyChanged(key, old_value, new_value) {
        if (key === 'window') {
            // check if new value is default
            const old_win = old_value === null ? getWindow() : old_win;
            const new_win = new_value === null ? getDefWindow() : new_value;

            // remove listener from old window
            if (typeof old_win !== 'undefined' && typeof old_win.removeEventListener !== 'undefined') {
                old_win.removeEventListener('hashchange', changeDispatch, false);
            }

            // create listener for new window
            if (typeof new_win !== 'undefined' && typeof new_win.addEventListener !== 'undefined') {
                new_win.addEventListener('hashchange', changeDispatch, false);
            }
        }
    }

    /**
     * Trigger and report every change in configs.
     * @param {object} a    old config
     * @param {object} b    new config
     */
    static #triggerChange(a, b) {
        const defaults = HashConfig.defaults();

        for (const i in defaults) {
            if (!defaults.hasOwnProperty(i)) continue;

            // get old and new value
            const ov = a[i];
            const nv = b[i];

            if (!isEqual(ov, nv)) {
                HashConfig.#keyChanged(i, ov, nv);
            }
        }
    }

    /**
     * Try to cast data type using main data types
     * of js such as Array, Object, String.
     * @param {any}         data
     * @param {function}    type
     * @returns
     */
    static #castType(data, type = null) {
        if (typeof type !== 'function') {
            return data;
        }

        return type.call(null, data);
    }

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
            //andSymbol: and_symbol,
            //equSymbol: equ_symbol,
            //queSymbol: que_symbol,
            // query symbols 1.7.5<
            querySymbols: {
                and: and_symbol,
                equ: equ_symbol,
                que: que_symbol
            },
            // parse query value or just return string?
            parseQueryValue: true
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

        HashConfig.#triggerChange(HashConfig.#configs, options);
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

        const configs = HashConfig.#configs;
        const merged  = HashConfig.#deepMerge({}, configs, options);

        HashConfig.define(merged);
    }

    /**
     * Get config
     * - The default value will not be casted
     * @param   {array|string}  keys
     * @param   {any}           def
     * @param   {function}      cast
     * @returns {any}
     */
    static get(keys = null, def = '', cast = null) {
        let configs = HashConfig.#configs;

        if (null == keys || '' == keys) {
            return configs;
        }

        // convert keys to array
        if (typeof keys === 'string') {
            keys = [keys];
        }

        // check if names were listed
        if (!Array.isArray(keys)) {
            return def;
        }

        for (const name of keys) {
            const exp = name.toString().trim().split('.');
            const len = exp.length;

            if (len === 1) {
                if (HashConfig.has(name)) {
                    return HashConfig.#castType(configs[name], cast);
                }
            } else {
                let value = configs;
                let found = false;

                for (const i in exp) {
                    if (!exp.hasOwnProperty(i)) continue;

                    if (typeof value[exp[i]] !== 'undefined') {
                        found = true;
                        value = value[exp[i]];
                    } else {
                        found = false;
                        break;
                    }
                }

                if (found) {
                    return HashConfig.#castType(value, cast);;
                }
            }
        }

        return def;
    }

    /**
     * Get config as priority
     * @param {any} def
     * @param  {...string} keys
     * @returns {any}
     */
    static getPri(def, ...keys) {
        return HashConfig.get(keys, def);
    }
}