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
HashComponent.prototype.add         = addMethod.add
HashComponent.prototype.addValue    = addMethod.addValue
HashComponent.prototype.addQuery    = addMethod.addQuery
HashComponent.prototype.clear       = clearMethod.clear
HashComponent.prototype.clearValue  = clearMethod.clearValue
HashComponent.prototype.clearQuery  = clearMethod.clearQuery
HashComponent.prototype.config      = configMethod.config
HashComponent.prototype.event       = eventMethod.event
HashComponent.prototype.get         = getMethod.get
HashComponent.prototype.getValue    = getMethod.getValue
HashComponent.prototype.getQuery    = getMethod.getQuery
HashComponent.prototype.haveValue   = haveMethod.haveValue
HashComponent.prototype.haveQuery   = haveMethod.haveQuery
HashComponent.prototype.have        = haveMethod.have
HashComponent.prototype.info        = infoMethod.info
HashComponent.prototype.is          = isMethod.is
HashComponent.prototype.isValue     = isMethod.isValue
HashComponent.prototype.isQuery     = isMethod.isQuery
HashComponent.prototype.isLocked    = lockMethod.isLocked
HashComponent.prototype.unLock      = lockMethod.unLock
HashComponent.prototype.lock        = lockMethod.lock
HashComponent.prototype.updateQuery = queryMethod.updateQuery
HashComponent.prototype.remove      = removeMethod.remove
HashComponent.prototype.removeValue = removeMethod.removeValue
HashComponent.prototype.removeQuery = removeMethod.removeQuery
HashComponent.prototype.set         = setMethod.set
HashComponent.prototype.setValue    = setMethod.setValue
HashComponent.prototype.setQuery    = setMethod.setQuery

export default HashComponent
