import HashTrigger from "./trigger.js";

/**
 * class HashTriggerListener
 * Create an instance for every event
 */
export default class HashTriggerListener {
    /**
     * Trigger event id that makes
     * with random chars.
     * @var {string} 
     */
    id     = null;

    /**
     * Trigger date time code using
     * Date.now()
     * @var {number}
     */
    time   = null;

    /**
     * Trigger event name, ez pz
     * @var {string}
     */
    event  = null;

    /**
     * HashTrigger holder to make
     * an easy way to access trigger
     * and even use this one in methods
     * @var {HashTrigger}
     */
    //trigger = HashTrigger;

    /**
     * Main trigger listener constructor that
     * initialize data and create whole things 
     * @param {object} data 
     */
    constructor(data = {}) {
        this.id     = data.id || this.id;
        this.event  = data.event || this.event;
        this.time   = data.time || this.time;
    }

    /**
     * Remove listener from trigger to end this
     * one's actions
     */
    remove() {
        HashTrigger.removeListener(this.event, this.id);
    }

    /**
     * Get listener from trigger api
     * @returns {object|null} object { time: number, callback: function } or null for failure
     */
    get() {
        return HashTrigger.getListener(this.event, this.id);
    }
}