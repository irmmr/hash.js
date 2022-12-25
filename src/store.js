/**
 * class HashStore
 * store all data that we need!
 */
export default class HashStore {
    // ready time and status
    static ready        = false;
    static readyDate    = null;

    // lock.js => lock status and value data
    static lock = {
        status: false,
        force: false,
        time: null,
        value: null
    }
}