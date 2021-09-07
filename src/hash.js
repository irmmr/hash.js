import HashComponent from './component'

// default configs
const default_configs = {
    getHashCallback: null,
    setHashCallback: null,
    getHashFilter: null,
    setHashFilter: null,
    getHrefCallback: null,
    window: null,
    log: true
}

// define all hash components into main handle
const Hash = new HashComponent(default_configs)

export default Hash
