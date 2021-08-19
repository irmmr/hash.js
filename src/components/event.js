import helper from "../helpers"
import vars from "../vars";

export default {

    /**
     * Hash Event component.
     * @param {string} e The listeners
     * @param {*} func   The function/callback
     * @returns
     */
    event: function (e, func = function() {}) {
        if (!helper.isDef(e) || !helper.isString(e)) {
            return
        }
        let event   = e.toLowerCase(),
            evs     = event.split(',')
        func    = helper.isDef(func) && helper.isFunc(func) ? func : vars.emptyFunc
        for (let i in evs) {
            if (!evs.hasOwnProperty(i)) {
                continue
            }
            let current_ev = helper.replaceAll(evs[i], ' ', '')
            switch (current_ev) {
                case 'change' :
                    window.addEventListener('hashchange', func);
                    break;
                case 'load' :
                    window.addEventListener('load', func);
                    break;
                case 'ready' :
                    helper.lunchFunc(func);
                    break;
                default :
                    // nothing to do
                    break;
            }
        }
    }

}
