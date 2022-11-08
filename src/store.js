class HashStore {
    static ready        = false;
    static readyDate    = null;

    static lock = {
        status: false,
        force: false,
        time: null,
        value: null
    }
}

export default HashStore;