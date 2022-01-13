import HashComponent from "../component.js"
import {HashCpQuery} from "./holder.js"

import "./query/add.js"
import "./query/clear.js"
import "./query/define.js"
import "./query/get.js"
import "./query/have.js"
import "./query/is.js"
import "./query/set.js"
import "./query/update.js"
import "./query/remove.js"

import "./query/str.js"

HashComponent.query = HashCpQuery
HashComponent.q     = HashCpQuery
