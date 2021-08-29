// component main class
import vars from "./vars";

export class HashComponent {
    #_conf     = vars.emptyObj
    #_def_conf = vars.emptyObj

    // main constructor
    constructor(default_options = {}, options = {}) {
        this.#_conf           = typeof options === 'object' ? options : {}
        this.#_def_conf       = typeof default_options === 'object' ? default_options : {}
    }

    /**
     * get a config value for other methods.
     *
     * @param   name    The name if config.
     * @param   def     The default value of config.
     * @returns {string|*}
     * @private
     */
    #_getConfig(name, def = '') {
        return typeof this.#_conf[name] !== 'undefined' ? this.#_conf[name] : def
    }

    /**
     * set config and settings into Hash.js.
     *
     * @param   config  The config settings.
     * @returns {HashComponent}
     */
    config(config = {}) {
        this.#_conf = Object.assign(this.#_conf, config)
        this.#_conf = Object.assign(this.#_def_conf, this.#_conf)
        return this
    }
}
