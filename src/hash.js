// set main Hash.js definer
import components from './components'

// config options
let configs = {}

// set main hash.js function
const Hash = function (n = {}) {
    n = Object.assign(configs, n)
    return components(n)
}

export default Hash
