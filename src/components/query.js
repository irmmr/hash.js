import HashComponent from "../component.js";
import {HashCpQuery, HashCpValue} from "./holder.js";

import "./query/add.js";
import "./query/clear.js";
import "./query/define.js";
import "./query/get.js";
import "./query/have.js";
import "./query/is.js";
import "./query/set.js";
import "./query/update.js";
import "./query/remove.js";

import "./query/str.js";

/**
 * Create a component that is a way
 * to main component and a way to other
 * components for using in one-line mode
 */
HashCpQuery.main  = HashCpQuery.m = HashComponent;
HashCpQuery.value = HashCpQuery.v = HashCpValue;

/**
 * Query components
 *
 * @type {HashCpQuery}
 */
HashComponent.query = HashComponent.q = HashCpQuery;
