import { makeRandStr } from "./helpers.js";

/**
 * Hash trigger, a step to forward for 
 * trigger and callbacks
 */
class HashTrigger {
    /**
     * listeners to store all handlers
     * and functions.
     */
    static #listeners = {};
    
    /**
     * list of packages that run and started
     * by trigger.
     */
    static #runList = {};
    
    /**
     * [run]
     * check if listener is in run list
     * @param {string} name     package name 
     * @param {string} id       id of listener
     * @returns boolean
     */
    static itsRun(name, id) {
        const list = HashTrigger.#runList;
        return list.hasOwnProperty(name) && list[name].includes(id);
    }

    /**
     * [run]
     * add listener id into runList
     * @param {string} name     package name 
     * @param {string} id       id of listener
     */
    static addRun(name, id) {
        let list = HashTrigger.#runList;

        // create run-list:pack if does not exists
        if (!list.hasOwnProperty(name)) {
            HashTrigger.#runList[name] = [];

            // update list after push data
            list = HashTrigger.#runList;
        }

        // add into runList
        if (!list[name].includes(id)) {
            HashTrigger.#runList[name].push(id);
        }
    }

    /**
     * [pack]
     * get pack listeners
     * @param {string} name handler name 
     * @returns object handlers callbacks
     */
    static get(name) {
        return HashTrigger.has(name) ?
            HashTrigger.#listeners[name] : {};
    }

    /**
     * [listener]
     * get a listener from pack
     * @param {string} name handler name 
     * @returns object|null handlers callbacks
     */
     static getListener(name, id) {
        return HashTrigger.hasListener(name, id) ?
            HashTrigger.#listeners[name][id] : null;
    }

    /**
     * [pack]
     * create handler if not exists
     * @param {string} name hanlder name 
     */
    static add(name) {
        if (!HashTrigger.has(name)) {
            HashTrigger.#listeners[name] = {};
        }
    }

    /**
     * [pack]
     * check if handler is exists
     * @param {string} name hanlder name
     * @return boolean yes or no
     */
    static has(name) {
        return HashTrigger.#listeners.hasOwnProperty(name) &&
            typeof HashTrigger.#listeners[name] === 'object';
    }

    /**
     * [listener]
     * check for listener exists
     * @param {string} name hanlder name
     * @return boolean yes or no
     */
    static hasListener(name, id) {
        return HashTrigger.has(name) && HashTrigger.get(name).hasOwnProperty(id);
    }

    /**
     * [listener]
     * add a trigger or handle
     * @param {string}   name       hanlder name
     * @param {function} callback   the callback 
     * @param {boolean}  run        run for first time
     */
    static addListener(name, callback, run = false, runDetail = {}) {
        // add listeners pack for $name
        HashTrigger.add(name);

        // create random id for listener
        const id = makeRandStr(16) + Date.now();

        // push listener details in pack
        HashTrigger.#listeners[name][id] = {
            time: Date.now(),
            callback
        }

        // run it for this time
        if (run) {
            HashTrigger.runListener(name, id, runDetail);
        }

        return id;
    }

    /**
     * [listener]
     * run listener
     * @param {string}  name    The name of pack
     * @param {string}  id      The id of listeners in pack
     * @param {object}  detail  The detail data object
     * @param {boolean} log     Logging on runList or not?
     * @returns 
     */
    static runListener(name, id, detail = {}, log = true) {
        // check for exists
        if (!HashTrigger.hasListener(name, id)) {
            return;
        }

        // get listener from pack
        const listener = HashTrigger.getListener(name, id);

        // call the callback with data
        listener.callback.call(null, detail);
        
        // log into runList
        if (log) {
            HashTrigger.addRun(name, id);
        }
    }

    /**
     * [pack]
     * run handler list
     * @param {string} name of pack
     */
    static run(name, detail = {}, duplicate = true) {
        // check for pack exists
        if (!HashTrigger.has(name)) {
            return;
        }

        // get every listener from pack
        for (let id in HashTrigger.get(name)) {
            if (!duplicate && HashTrigger.itsRun(name, id)) {
                continue;
            }

            // run this listener
            HashTrigger.runListener(name, id, detail);
        }
    }
}

export default HashTrigger;