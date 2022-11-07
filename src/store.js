class HashStore {
    //static ready        = false;
    //static readyDate    = null;

    //static lock = {};
}

// [ES5] cause of ES5 class structures and rollup
// problem about it!

HashStore.ready = false;
HashStore.readyDate = null;

HashStore.lock = {
    status: false,
    force: false,
    time: null,
    value: null
}

export default HashStore;