import HashConfig from "./config.js";
import HashComponent from "./component.js";

// deprecated components
import "./components/direct.js";

// main components
import "./components/main.js";
import "./components/event.js";
import "./components/info.js";

// value and query components
import "./components/value.js";
import "./components/query.js";

export default {
    components: HashComponent,
    config: HashConfig
}