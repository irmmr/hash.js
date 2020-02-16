(function(window) {

    /* Console messages in an object */
    var loadMessage = {
        'load_error': 'hash.js Load : can\'t load HashJs. please befor run Hash event, run Hash.js library.',
        'load_do_1': 'hash.js Load : for "do", you should add a function. "%s" is %r',
        'load_do_2': 'hash.js Load : "do" argc is required!'
    }

    /* A function for  */
    var doNot = (st = "") => {
        if (st !== "") {
            console.warn( loadMessage['load_do_1'].replace('%s', st).replace('%r', typeof st) );
        } else {
            console.warn( loadMessage['load_do_2'] );
        }

        return function() {}
    }

    Load = function(n = {}) {

        this.page = function(method = {}) {

            method.do = typeof method.do !== 'undefined' ? typeof method.do === 'function' ? method.do : doNot(method.do) : doNot();
            var IntervalLoad = setInterval(checkPageReady, 10);
            var ComplateTime = 0;
            var startLoading = Date.now();

            function checkPageReady() {
                ComplateTime ++;

                if ( typeof document.getElementsByTagName('body')[0] !== 'undefined' ) {
                    window.clearInterval(IntervalLoad);
                    var LoadTime = window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart;
                    var returned = {
                        loadTime : LoadTime,
                        checkLen : ComplateTime,
                        startLoad : startLoading,
                        endLoad : Date.now(),
                        load : true
                    }
                    method.do.call(this, returned);
                }
            }

        }

        this.component = function(method = {}) {

            method.app = typeof method.app !== 'undefined' ? typeof document.getElementById(method.app) !== 'undefined' ? method.app : "" : "";
            method.do = typeof method.do !== 'undefined' ? typeof method.do === 'function' ? method.do : doNot(method.do) : doNot();
            method.load = typeof method.load !== 'undefined' ? typeof method.load === 'function' ? method.load : doNot(method.load) : doNot();
            method.error = typeof method.error !== 'undefined' ? method.error : "<!-- Error -->"

            var theVal = method.app !== "" ? document.getElementById(method.app).innerHTML : "";

            window.addEventListener('hashchange', function() {
                if ( method.app !== "" ) {
                    var checkTime = 0;
                    var startLoading = Date.now();

                    method.load.call(this, {
                        hash : window.location.hash.slice(1),
                        startLoad : startLoading
                    });

                    var IntervalLoad = setInterval(checkPageReadyNew, 10);
                    function checkPageReadyNew() {
                        checkTime ++;

                        if ( document.getElementById(method.app).innerHTML !== theVal || 
                        document.getElementById(method.app).innerHTML.includes(method.error) ) {
                            window.clearInterval(IntervalLoad);
                            method.do.call(this, {
                                hash : window.location.hash.slice(1),
                                startLoad : startLoading,
                                endLoad : Date.now(),
                                loadTime : Date.now() - startLoading,
                                checkLen : checkTime,
                                load : true
                            });
                            theVal = document.getElementById(method.app).innerHTML;
                        }
                    }
                }
            });

        }

    }



    var HashLoad = Load;


    var LoadHashNew = false;
    if (typeof Hash !== 'undefined') {

        if (typeof define === 'function' && define.amd) {
            define(HashLoad);
            LoadHashNew = true;
        } else {
            window.Hash.load = HashLoad;
            LoadHashNew = true;
        }

        if (typeof exports === 'object') {
            module.exports = HashLoad();
            LoadHashNew = true;
        }

    } else {
        console.error(loadMessage['load_error']);
    }

})(window)