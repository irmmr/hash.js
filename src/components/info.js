import info from "../info";

export default {

    /**
     * Hash Info component.
     * @returns
     */
    info: function () {
        return {
            version : info.version || '?'
        }
    }
    
}
