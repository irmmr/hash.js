import { HashCpQuery, HashCpValue, HashCpQueryStr } from "../holder.js";
import HashComponent from "../../component.js";

import "./str/set.js";
import "./str/get.js";
import "./str/have.js";
import "./str/is.js";
import "./str/replace.js";
import "./str/remove.js";
import "./str/add.js";

/**
 * Create a component that is a way
 * to main component and a way to other
 * components for using in one-line mode
 */
HashCpQueryStr.main  = HashCpQueryStr.m = HashComponent;
HashCpQueryStr.value = HashCpQueryStr.v = HashCpValue;
HashCpQueryStr.query = HashCpQueryStr.q = HashCpQuery;

/**
 * Hash query string components.
 *
 * @type {HashCpQueryStr}
 */
HashCpQuery.str = HashCpQueryStr;
