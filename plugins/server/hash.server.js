(function(window) {

    /* Console messages in an object */
    var serverMessage = {
        'load_error': 'hash.js Load : can\'t load HashJs. please befor run Hash event, run Hash.js library.',
        'load_do_1': 'hash.js Load : for "do", you should add a function. "%s" is %r',
        'load_do_2': 'hash.js Load : "do" argc is required!'
    }

    var ServerApp;

    ServerApp = function(n = {}) {

        this.connect = (m = {}) => {

            if ('type' in m) {

                var cType = m.type.toLowerCase();

                if (cType == 'get' || cType == 'post') {

                    if ('url' in m) {

                        var cUrl = m.url,
                            cData = 'data' in m ? m.data : null,
                            cResult = 'result' in m ? m.result : null;

                        

                    }

                }

            }

        }

    }



    var HashServer = ServerApp;


    var LoadHashNew = false;
    if (typeof Hash !== 'undefined') {

        if (typeof define === 'function' && define.amd) {
            define(HashServer);
            LoadHashNew = true;
        } else {
            window.Hash.server = HashServer;
            LoadHashNew = true;
        }

        if (typeof exports === 'object') {
            module.exports = HashServer();
            LoadHashNew = true;
        }

    } else {
        console.error(serverMessage['load_error']);
    }

})(window)