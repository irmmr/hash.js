import {HashComponent} from "./core";

// add prototypes
import addMethod from "./components/add"
import clearMethod from "./components/clear"
import configMethod from "./components/config"
import eventMethod from "./components/event"
import getMethod from "./components/get"
import haveMethod from "./components/have"
import infoMethod from "./components/info"
import isMethod from "./components/is"
import lockMethod from "./components/lock"
import queryMethod from "./components/query"
import removeMethod from "./components/remove"
import setMethod from "./components/set"

// set all components as prototype to 'HashComponent'
HashComponent.prototype = Object.assign(
    // all prototypes and methods
    addMethod,
    clearMethod,
    configMethod,
    eventMethod,
    getMethod,
    haveMethod,
    infoMethod,
    isMethod,
    lockMethod,
    queryMethod,
    removeMethod,
    setMethod,
    // prototypes of 'HashComponent'
    HashComponent.prototype
)

export default HashComponent
