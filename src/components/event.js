import vars from "../vars";
import message from "../message";

export default {

    /**
     * Hash Event component.
     * @param {string} e The listeners
     * @param {*} func   The function/callback
     * @returns
     */
    event: function (e, func = function() {}) {
        if (!this._h.isDef(e) || !this._h.isString(e)) {
            return
        }
        let event   = e.toLowerCase(),
            evs     = event.split(','),
            wn      = this._h.getWindow()
        func    = this._h.isDef(func) && this._h.isFunc(func) ? func : vars.emptyFunc
        // check addEventListener based on window
        if (typeof wn.addEventListener === 'undefined') {
            this._h.err(message.event_und)
            return
        }
        for (let i in evs) {
            if (!evs.hasOwnProperty(i)) continue
            let current_ev = this._h.replaceAll(evs[i], ' ', '')
            switch (current_ev) {
                case 'change' :
                    wn.addEventListener('hashchange', func);
                    break;
                case 'load' :
                    wn.addEventListener('load', func);
                    break;
                case 'ready' :
                    this._h.lunchFunc(func);
                    break;
                default :
                    // nothing to do
                    break;
            }
        }
    }

}
