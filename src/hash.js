import HashContainer from "./container.js";
import * as helpers from "./helpers.js";
import HashStore from "./store.js";
import { changeDispatch } from "./event/init.js";
import HashTrigger from "./event/trigger.js";

/**
 * Define and add all main components to
 * HashComponent to create main parts.
 */

// deprecated components
import "./components/direct.js";

// main components
import "./components/main.js";
import "./components/event.js";
import "./components/info.js";

// value and query components
import "./components/value.js";
import "./components/query.js";

/**
 * Ready event!
 * try to run all library ready events
 * plus setting ready status to TRUE
 */
HashStore.ready = true;
HashStore.readyDate = Date.now();

// run ready trigger
HashTrigger.run('ready', { time: HashStore.readyDate });

/**
 * Dispatch events
 * try to add other events using hashchange
 * and make a multiple event handler using window.addEventListener
 */
const win = helpers.getWindow();

if (typeof win.addEventListener !== 'undefined') {
    win.addEventListener('hashchange', changeDispatch, false);
}

export default HashContainer;