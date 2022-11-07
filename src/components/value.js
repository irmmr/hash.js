import HashComponent from "../component.js";
import {HashCpValue, HashCpQuery} from "./holder.js";

import "./value/add.js";
import "./value/clear.js";
import "./value/get.js";
import "./value/have.js";
import "./value/is.js";
import "./value/set.js";
import "./value/replace.js";
import "./value/remove.js";

/**
 * Create a component that is a way
 * to main component and a way to other
 * components for using in one-line mode
 */
HashCpValue.main  = HashCpValue.m = HashComponent;
HashCpValue.query = HashCpValue.q = HashCpQuery;

/**
 * Value components
 *
 * @type {HashCpValue}
 */
HashComponent.value = HashComponent.v = HashCpValue;
