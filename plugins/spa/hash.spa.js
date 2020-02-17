(function(window) {

    var emptyObj = Object.freeze({});

    function isDef(h) {
        return typeof h !== undefined && h !== null
    }

    function isUnDef(h) {
        return typeof h === undefined || h === null
    }

    function isString(h) {
        return isDef(h) && typeof h === 'string'
    }

    function isBool(h) {
        return isDef(h) && typeof h === 'boolean'
    }

    function getBool(h) {

        return (
            isDef(h) ? isBool(h) ? h : isString(h) ? h.toLowerCase() == 'true' ? true : false : false : false
        )

    }

    function getAttr(h, attr) {
        return h.hasAttribute(attr) ? h.getAttribute(attr) : ""
    }

    function isObj(h) {
        return h !== null && typeof h === 'object'
    }

    function isFunc(h) {
        return isDef(h) && typeof h === 'function'
    }

    function replaceAll(h, a, b) {
        return h.replace(new RegExp(a, 'g'), b)
    }

    function lunchFunc(func, argc = null) {
        return isFunc(func) ? argc !== null ? func(argc) : func() : null;
    }

    class HashJsLink extends HTMLElement {
        constructor() {
            super();

            var link = getAttr(this, 'link'),
                topScroll = false;

            
            if ( this.hasAttribute('h-top') ) {
                topScroll = getBool( getAttr(this, 'h-top') );
            }

            this.onclick = function() {
                if ( this.hasAttribute('link') ) {
                    window.location.hash = link;
                }
                if ( topScroll ) {
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                }
            }

        }
    }

    function loadElements() {
        customElements.define('h-link', HashJsLink);
    }

    var MeduHash = ( El , Co , WH , ERR , MTH ) => {

        if ( window.location.hash == '' && MTH.defualt !== null ) {
            window.location.hash = MTH.defualt;
        }

        MTH.router = typeof MTH.router !== 'undefined' ? Array.isArray(MTH.router) ? MTH.router : [] : [];

        var vi = '';
        MTH.router.forEach(item => {
            vi += MeduRouter(item).status ? 1 : '';
        });

        if ( vi == '' ) {
            if ( !window.location.hash.includes('/') ) {
                if ( typeof Co[WH] !== 'undefined' ) {
                    document.getElementById(El).innerHTML = MTH.components[WH].main;
                    document.title = MTH.components[WH].title;
                    lunchFunction(MTH.components[WH].do);
                } else {
                    if ( vi == '' ) {
                        document.getElementById(El).innerHTML = ERR.render;
                        document.title = ERR.title;
                        lunchFunction(ERR.do);
                    }
                }
            } else {
                let WS = window.location.hash.slice(1).split("/");
                let LN = WS.length;

                if ( typeof Co[WS[0]] !== 'undefined' ) {

                    switch(WS.length) {
                        case 2 : 
        
                        Co[WS[0]].loop = typeof Co[WS[0]].loop !== 'undefined' ? Co[WS[0]].loop : {};
                        
                        if ( typeof Co[WS[0]] !== 'undefined' &&
                         typeof Co[WS[0]].loop[WS[1]] !== 'undefined' &&
                          typeof Co[WS[0]].loop[WS[1]].main !== 'undefined'&&
                          typeof Co[WS[0]].loop[WS[1]].title !== 'undefined' ) {
                            document.getElementById(El).innerHTML = Co[WS[0]].loop[WS[1]].main;
                            document.title = Co[WS[0]].loop[WS[1]].title;
                            lunchFunction(Co[WS[0]].loop[WS[1]].do);
                        } else {
                            if ( vi == '' ) {
                                document.getElementById(El).innerHTML = ERR.render;
                                document.title = ERR.title;
                                lunchFunction(ERR.do);
                            }
                        }
        
                        ;break;
        
                        case 3 : 
        
                        Co[WS[0]].loop = typeof Co[WS[0]].loop !== 'undefined' ? Co[WS[0]].loop : {};
                        Co[WS[0]].loop[WS[1]] = typeof Co[WS[0]].loop[WS[1]] !== 'undefined' ? Co[WS[0]].loop[WS[1]] : {};
                        Co[WS[0]].loop[WS[1]].loop = typeof Co[WS[0]].loop[WS[1]].loop !== 'undefined' ? Co[WS[0]].loop[WS[1]].loop : {};
        
                        if ( typeof Co[WS[0]] !== 'undefined' &&
                          typeof Co[WS[0]].loop[WS[1]].loop[WS[2]] !== 'undefined' &&
                           typeof Co[WS[0]].loop[WS[1]].loop[WS[2]].main !== 'undefined' &&
                           typeof Co[WS[0]].loop[WS[1]].loop[WS[2]].title !== 'undefined' ) {
                            document.getElementById(El).innerHTML = Co[WS[0]].loop[WS[1]].loop[WS[2]].main;
                            document.title = Co[WS[0]].loop[WS[1]].loop[WS[2]].title;
                            lunchFunction(Co[WS[0]].loop[WS[1]].loop[WS[2]].do);
                        } else {
                            if ( vi == '' ) {
                                document.getElementById(El).innerHTML = ERR.render;
                                document.title = ERR.title;
                                lunchFunction(ERR.do);
                            }
                        }
        
                        ;break;
        
                        case 4 : 
        
                        Co[WS[0]].loop = typeof Co[WS[0]].loop !== 'undefined' ? Co[WS[0]].loop : {};
                        Co[WS[0]].loop[WS[1]] = typeof Co[WS[0]].loop[WS[1]] !== 'undefined' ? Co[WS[0]].loop[WS[1]] : {};
                        Co[WS[0]].loop[WS[1]].loop = typeof Co[WS[0]].loop[WS[1]].loop !== 'undefined' ? Co[WS[0]].loop[WS[1]].loop : {};
                        Co[WS[0]].loop[WS[1]].loop[WS[2]] = typeof Co[WS[0]].loop[WS[1]].loop[WS[2]] !== 'undefined' ? Co[WS[0]].loop[WS[1]].loop[WS[2]] : {};
                        Co[WS[0]].loop[WS[1]].loop[WS[2]].loop = typeof Co[WS[0]].loop[WS[1]].loop[WS[2]].loop !== 'undefined' ? Co[WS[0]].loop[WS[1]].loop[WS[2]].loop : {};
        
                        if ( typeof Co[WS[0]] !== 'undefined' &&
                           typeof Co[WS[0]].loop[WS[1]].loop[WS[2]].loop[WS[3]] !== 'undefined' &&
                            typeof Co[WS[0]].loop[WS[1]].loop[WS[2]].loop[WS[3]].main !== 'undefined' &&
                            typeof Co[WS[0]].loop[WS[1]].loop[WS[2]].loop[WS[3]].title !== 'undefined' ) {
                            document.getElementById(El).innerHTML = Co[WS[0]].loop[WS[1]].loop[WS[2]].loop[WS[3]].main;
                            document.title = Co[WS[0]].loop[WS[1]].loop[WS[2]].loop[WS[3]].title;
                            lunchFunction(Co[WS[0]].loop[WS[1]].loop[WS[2]].loop[WS[3]].do);
                        } else {
                            if ( vi == '' ) {
                                document.getElementById(El).innerHTML = ERR.render;
                                document.title = ERR.title;
                                lunchFunction(ERR.do);
                            }
                        }
        
                        ;break;
        
                        default : 
                        if ( vi == '' ) {
                            document.getElementById(El).innerHTML = ERR.render;
                            document.title = ERR.title;
                            lunchFunction(ERR.do);
                        }
                        ;break;
        
                    }
                } else {
                    if ( vi == '' ) {
                        document.getElementById(El).innerHTML = ERR.render;
                        document.title = ERR.title;
                        lunchFunction(ERR.do);
                    }
                }
    
            }
        }

    };

    var MeduSpa = (Rout,Rend,El,title,Do,Re) => {
        var TheRouter = Rout;
        Rout = MeduRouter(Rout);
        if ( Rout.status ) {
            var reInfo = [];
            var reLegend = {};
            if ( Rend !== '' ) {
                if ( typeof Rout.info !== 'undefined' ) {
                    Rout.info = Rout.info.split(",");
                    Rout.info.forEach((item,index) => {
                        index++;
                        title = ReplaceAll(title, '{HS:'+index+'}', item);
                        Rend = ReplaceAll(Rend, '{HS:'+index+'}', item);
                    });
                    reInfo = Rout.info;
                    reLegend['info'] = Rout.info;
                }
                document.getElementById(El).innerHTML = Rend;
                document.title = title;
                //Do that
                reLegend['el'] = El;
                reLegend['router'] = TheRouter;
                reLegend['hash'] = window.location.hash.slice(1);
                lunchFunction(Do, reLegend);
                //Return info
                return Re ? Rout.info : [];
            }
        }
    };

    var MeduRouter = (router) => {
        var router_any = router.split("/");
        var wv = window.location.hash.slice(1).split("/");

        var glade = '';
        router_any.forEach((element,index) => {
            if ( element == '{any}' )
            glade += index
        });
        glade = glade.split('');

        var es = '';
        var inb = '';
        if ( router_any.length == wv.length ) {
            wv.forEach((item,index) => {
                if ( router_any[index] == item || router_any[index] == '{any}' ) {
                    if ( router_any[index] == '{any}' ) {
                        inb += item + ',';
                        es += 1;
                    } else {
                        es += 1;
                    }
                }
            });
        }

        if ( es.length == wv.length ) {
            return {
                status : true,
                info : inb
            };
        } else {
            return {
                status : false
            };
        }
    };


    var SpaApp;

    SpaApp = function(n = {}) {

        method.log = typeof method.log !== 'boolean' ? true : method.log;
        var Log = method.log;

        //El part
        method['el'] = typeof method['el'] !== 'undefined' ? method['el'] : "";
        var viEl = false;
        if ( method['el'].startsWith('#') && typeof method['el'] == 'string' ) {
            viEl = true;
            method['el'] = method['el'].replace('#','');
        } else {
            viEl = false;
            Log ? console.error( messages['spa_el_error'].replace('%s',method['el']) ) : null;
        }

        method.components = typeof method.components !== 'undefined' ? method.components : {};
        method.defualt = typeof method.defualt !== 'undefined' ? method.defualt : null;

        method.errors = typeof method.errors !== 'undefined' ? method.errors : {};
        method.errors.not_found = typeof method.errors.not_found !== 'undefined' ? method.errors.not_found : {render : '',title : ''};
        method.errors.not_found.render = typeof method.errors.not_found.render !== 'undefined' ? method.errors.not_found.render : '';
        method.errors.not_found.title = typeof method.errors.not_found.title !== 'undefined' ? method.errors.not_found.title : '';

        

        MeduHash(method['el'],method.components,window.location.hash.slice(1),method.errors.not_found,method);

        window.onhashchange = function() {
            MeduHash(method['el'],method.components,window.location.hash.slice(1),method.errors.not_found,method);
        };

        this.router = ( method={} ) => {

            method.render = typeof method.render !== 'undefined' ? method.render : '';

            method['el'] = typeof method['el'] !== 'undefined' ? method['el'] : "";
            var viEl = false;
            if ( method['el'].startsWith('#') && typeof method['el'] == 'string' ) {
                viEl = true;
                method['el'] = method['el'].replace('#','');
            } else {
                viEl = false;
                Log ? console.error( messages['spa_el_error'].replace('%s',method['el']) ) : null;
            }

            method.Router = typeof method.Router !== 'undefined' ? method.Router : '';
            method.title = typeof method.title !== 'undefined' ? method.title : '';
            method.do = typeof method.do !== 'undefined' ? typeof method.do === 'function' ? method.do : DoInside.call(this, method.do) : NoneFunc;
            method.return = typeof method.return === 'boolean' ? method.return : false;

            if ( method.Router.includes('{any}') ) {
                MeduSpa(method.Router,method.render,method['el'],method.title,method.do,method.return);
                window.addEventListener("hashchange", function() {
                    MeduSpa(method.Router,method.render,method['el'],method.title,method.do,method.return);
                });
            } else {
                Log ? console.error( messages['spa_router'] ) : null;
            }

        };

    }



    var HashSpa = SpaApp;


    var LoadHashNew = false;
    if (typeof Hash !== 'undefined') {

        if (typeof define === 'function' && define.amd) {
            define(HashSpa);
            LoadHashNew = true;
        } else {
            window.Hash.spa = HashSpa;
            LoadHashNew = true;
        }

        if (typeof exports === 'object') {
            module.exports = HashSpa();
            LoadHashNew = true;
        }

        if (LoadHashNew) {
            window.addEventListener('load', loadElements);
        }

    } else {
        console.error( 'Hash spa: hash.js is not loaded!' );
    }

})(window)