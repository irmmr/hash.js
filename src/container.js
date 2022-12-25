import HashComponent from "./component.js";
import HashStore from "./store.js";
import HashTrigger from "./event/trigger.js";
import HashConfig from "./config.js";
import * as helpers from "./helpers.js";

/**
 * class HashContainer
 * main container that exports as Hash
 */
export default class HashContainer extends HashComponent {
    /**
     * define api variable
     * @type {object}
     */
    static api = {
        trigger: HashTrigger,
        store: HashStore
    }

    /**
     * define all helpers into h
     * @type {object}
     */
    static h = helpers;

    /**
     * create a HashConfig class instance
     * @param {object} options 
     * @returns {HashConfig}
     */
    static config(options = {}) {
        return HashConfig.instance(options);
    }

    /**
     * ready status
     * @returns {boolean}
     */
    static isReady() {
        return !!HashStore.ready;
    }

    /**
     * ready on-line usage
     * Hash.ready()?.set('its-ready!')
     * @returns {null|HashComponent}
     */
    static ready() {
        return HashStore.ready ? HashComponent : null;
    }
}