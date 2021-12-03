import {empty_object} from "./vars.js"

const default_configs = {
    getHashCallback: null,
    setHashCallback: null,
    getHashFilter: null,
    setHashFilter: null,
    getHrefCallback: null,
    window: null,
    log: true
}

class HashConfig {

    /**
     * Get all default configs
     * @returns {{log: boolean, setHashCallback: null, window: null, getHashFilter: null, setHashFilter: null, getHashCallback: null, getHrefCallback: null}}
     */
    static defaults() {
        return default_configs
    }

    /**
     * Instance call with set options
     * @param options
     * @returns {HashConfig}
     */
    static instance(options = {}) {
        HashConfig.set(options)

        return HashConfig
    }

    /**
     * Clear all configs
     */
    static clear() {
        HashConfig.configs = empty_object
    }

    /**
     * Reset configs into defaults
     */
    static reset() {
        HashConfig.configs = default_configs
    }

    /**
     * Check for config
     * @param name
     * @returns {boolean}
     */
    static has(name) {
        return typeof HashConfig.configs === 'object' && name in HashConfig.configs
    }

    /**
     * Define config
     * @param options
     */
    static define(options) {
        if (typeof options !== 'object') {
            return
        }

        HashConfig.configs = options
    }

    /**
     * Set config
     * @param options
     */
    static set(options) {
        if (typeof options !== 'object') {
            return
        }

        HashConfig.configs = Object.assign(HashConfig.configs, options)
    }

    /**
     * Get config
     * @param name
     * @param def
     * @returns {string|Readonly<{}>|*}
     */
    static get(name = null, def = '') {
        if (null == name) {
            return HashConfig.configs
        }

        if (HashConfig.has(name)) {
            return HashConfig.configs[name]
        }

        return def
    }

}

// set configs value
HashConfig.configs = default_configs

export default HashConfig
