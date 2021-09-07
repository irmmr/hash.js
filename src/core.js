// component main class
import vars from "./vars";
import HashHelper from "./helpers";

export class HashComponent {
    /**
     * main constructor.
     * @param default_options
     * @param options
     */
    constructor(default_options = {}, options = {}) {
        this._def_conf  = typeof default_options === 'object' ? default_options : {}
        this._conf      = typeof options === 'object' ? Object.assign(this._def_conf, options) : this._def_conf
        this._h          = new HashHelper(this._conf)
    }

    /**
     * get a config value for other methods.
     *
     * @param   name    The name of config.
     * @param   def     The default value of config.
     * @returns {string|*}
     */
    __g_conf(name = '', def = '') {
        if ('' === name) return this._conf
        return typeof this._conf[name] !== 'undefined' ? this._conf[name] : def
    }

    /**
     * set config and settings into Hash.js.
     *
     * @param   config  The config settings.
     * @returns {HashComponent}
     */
    config(config = {}) {
        this._conf = Object.assign(this._conf, config)
        this._conf = Object.assign(this._def_conf, this._conf)
        this._h.__config(this._conf)

        return this
    }

    /**
     * reset all configs.
     */
    resetConfig() {
        this._conf = this._def_conf
        this._h.__config(this._conf)

        return this
    }
}
