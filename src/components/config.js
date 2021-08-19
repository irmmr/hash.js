export default {

    /**
     * set config and settings into Hash.js.
     *
     * @param   config  The config settings.
     * @returns {HashComponent}
     */
    config: function (config = {}) {
        this.confing = Object.assign(this.default_config, this.confing)
        return this
    }

}
