( function ( window ) {
    'use strict';

    var info = {
        'version' : '1.0.0',
        'author' : 'irmmr',
        'description' : 'Hash.js is a simple js library . By this library you can manage page hash . Hash.js has different parts for add , get , change and extract .',
        'git_url' : 'https://github.com/irmmr/hash.js',
        'lang' : 'English',
        'help' : 'Please go on github page . address : %s',
        'message' : '** Hash.js library | v %v **\nSimple & Useful\nBy: %s\nAbout: %r\nGithub: %p',
        'remove_error' : 'hash.js Info : After see all information, please remove hash.info function from your source.'
    };

    var messages = {
        'load_error' : 'hash.js : can\'t load z.js',
        'test' : 'hash.js : It\'s work ! please remove z.test function .',
        'untitled_message' : 'untitled',
        'error_element' : 'hash.js : Error to find element . we can\'t find %s in window hash',
        'error_remove' : 'hash.js : Error to find "%s" in window hash',
        'error_referrer' : 'hash.js : For check referrer url , you should add url first . for exa : example.referrer(\'https://url.com\')',
        'change_hash' : '#%r : hash changed to "%s"',
        'hash_first' : '#%r : first hash is "%s"',
        'hash_log_start' : 'hash.js Log : start is Date %r and Time %p',
        'set_error' : 'hash.js : Error to set hash , please input text value . for exa : example.set({ text : \'hello\' })',
        'set_have_error' : 'hash.js : Error to set hash element , in your hash "%s" exits ! we just set the text',
        'warning_loop' : 'hash.js : Remove loop number is bigger than 50 . please check that !',
        'remove_empty' : 'hash.js : Remove function must has words and loop for start',
        'test_message' : 'hash.js is active ! for more you can run \'.help\' in Hash.info()',
        'hash_log_info' : 'hash.js Log is working : for disable hash log, remove hash.log from your source . we write your page all hash changing !',
        'error_symbol_array' : 'hash.js : Symbol value must be add like {} . for exa : { before : \'/\' , after : \'=\' }',
        'hash_saved_find' : 'hash.js : We can\'t find the "%s" cookie for get window hash, please check cookie name .',
        'error_set_vap' : 'hash.js : We can\'t set window hash. The type of "#%s" element is not %r.',
        //SPA
        'spa_el_error' : 'hash.js SPA : Error to get "%s". please check el id, that should be start with a "#"',
        'spa_router' : 'hash.js SPA : This router have not any "{any}" to find.',
        //Element
        'replace_error' : 'hash.js Element : We can\'t find "%s" in "%r".',
        'replace_error_bn' : 'hash.js Element : Please set to and from in syntax .',
        //Debug
        'debug_start' : 'hash.js Debug is started!\nThis log all actions in router and spa .\nFor disable, remove debug from SPA function!',
        'dls' : 'Load "%s" component\nStatus: success\nType: %r',
        'func_error' : 'hash.js SPA : Error to find "%s" function.',
        'app_run' : 'hash.js App : App running on "%s"',
        'app_run_time' : 'hash.js App : App run in "%s" date code',
        'app_own_id' : 'hash.js App : App warning to get h-app id. for easy run we set that\'s id to "%s", please set an id for h-app.',
        'event_error_empty' : 'hash.js Event : event type required.\nHash.event(type, function)',
        'event_error' : 'hash.js Event : event type is incorrect. (%s)'
    };

    var Bool = (el) => {
        var topAttr = el;

        if ( typeof topAttr === 'boolean' ) {
            return el;
        } else {
            var topString = topAttr.toLowerCase();
            
            switch (topString) {
                case "true" : return true; break;
                case "false" : return false ; break;
                default : return false ; break;
            }
        }
    };

    var Attr = (el, attribute) => {
        if ( el.hasAttribute(attribute) ) {
            return el.getAttribute(attribute);
        } else {
            return "";
        }
    };



    //class for elements
    class HashJsLink extends HTMLElement {
        constructor() {
            super();

            var link = Attr(this, 'link');

            var scrollTop = false;
            //Scroll top
            if ( this.hasAttribute('h-top') ) {
                scrollTop = Bool(this.getAttribute('h-top'));
            }

            //Set cursor pointer for h-link
            var hsStyle = document.createElement('style');
            hsStyle.textContent = "h-link{cursor:pointer}";
            document.getElementsByTagName("head")[0].appendChild(hsStyle);

            this.onclick = function() {
                if ( this.hasAttribute('link') ) {
                    window.location.hash = link;
                }
                if ( scrollTop ) {
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                }
            }

        }
    }

    class HashJsApp extends HTMLElement {
        constructor() {
            super();

            var app = Attr(this, 'app');
            var log = Attr(this, 'log');
            var ifLoad = Attr(this, 'if-load');
            var ifChange = Attr(this, 'if-change');
            var ifMethod = Attr(this, 'if');

            //Change log to boolean
            log = Bool(log);

            //Check app id
            if ( this.hasAttribute('id') ) {
                var MyId = this.getAttribute('id');
            } else {
                this.setAttribute('id', 'hashJsAppLoadMentId');
                var MyId = 'hashJsAppLoadMentId';
                console.warn( messages["app_own_id"].replace('%s', MyId) );
            }

            if ( app !== "" ) {
                var _app = this.getElementsByTagName('h-main');
                for (var i=0 ; i<_app.length ; i++) {
                    var _noewE = this.getElementsByTagName('h-main')[i];
                    
                    if (_noewE.hasAttribute('id')) {
                        if ( _noewE.getAttribute('id') == app ) {
                            console.info( messages['app_run'].replace('%s', app) );
                            console.info( messages['app_run_time'].replace('%s', Date.now()) );
                            
                            if ( log ) {

                                var Headers = [];
                                var _headers = this.getElementsByTagName('h-header');
                                for (var p=0 ; p<_headers.length ; p++) {
                                    Headers[p] = this.getElementsByTagName('h-header')[p].innerHTML;
                                }

                                var Footers = [];
                                var _footers = this.getElementsByTagName('h-footer');
                                for (var e=0 ; e<_footers.length ; e++) {
                                    Footers[e] = this.getElementsByTagName('h-footer')[e].innerHTML;
                                }

                                var Main = [];
                                var _main = this.getElementsByTagName('h-main');
                                for (var x=0 ; x<_main.length ; x++) {
                                    Main[x] = this.getElementsByTagName('h-main')[x].innerHTML;
                                }

                                var Return = {
                                    header : Headers,
                                    app : Main,
                                    footer : Footers,
                                };
                                console.log("App returned first: ", Return);
                            }

                        }
                    }

                }
            }

            if ( ifLoad !== "" ) {
                var scriptType = document.createElement('script');
                scriptType.textContent = ifLoad;
                document.body.appendChild(scriptType);
            }

            function if_func() {
                if ( app !== "" && ifMethod !== "" ) {
                    var pLx = document.createElement('script');
                    pLx.textContent = `
                    if (${ifMethod}) {
                        document.getElementById('${MyId}').style.display = "block";
                    } else {
                        document.getElementById('${MyId}').style.display = "none";
                    }`;
                    document.body.appendChild(pLx);
                }
            }

            //Load if 
            if_func();

            window.addEventListener('hashchange', function() {

                if ( ifChange !== "" ) {
                    var scriptTypeO = document.createElement('script');
                    scriptTypeO.textContent = ifChange;
                    document.body.appendChild(scriptTypeO);
                }
                
                //Load if
                if_func();

            });

            //Set cursor pointer for h-app
            var hsStyle = document.createElement('style');
            hsStyle.textContent = "h-app{margin:0;display:block}";
            document.getElementsByTagName("head")[0].appendChild(hsStyle);

        }
    }

    class HashJsHeader extends HTMLElement {
        constructor() {
            super();

            //Set cursor pointer for h-app
            var hsStyle = document.createElement('style');
            hsStyle.textContent = "h-header{margin:0;display:block}";
            document.getElementsByTagName("head")[0].appendChild(hsStyle);

        }
    }

    class HashJsFooter extends HTMLElement {
        constructor() {
            super();

            //Set cursor pointer for h-app
            var hsStyle = document.createElement('style');
            hsStyle.textContent = "h-footer{margin:0;display:block}";
            document.getElementsByTagName("head")[0].appendChild(hsStyle);

        }
    }

    class HashJsMain extends HTMLElement {
        constructor() {
            super();

            //Set cursor pointer for h-app
            var hsStyle = document.createElement('style');
            hsStyle.textContent = "h-main{margin:0;display:block}";
            document.getElementsByTagName("head")[0].appendChild(hsStyle);

        }
    }

    var LoadElements = () => {
        customElements.define('h-link', HashJsLink);
        customElements.define('h-app', HashJsApp);
        customElements.define('h-header', HashJsHeader);
        customElements.define('h-footer', HashJsFooter);
        customElements.define('h-main', HashJsMain);
    };

    var NoneFunc = () => {
        //empty
    }

    var DoInside = (method) => {
        console.error(messages['func_error'].replace('%s', method));
    };

    var ReplaceAll = (text, a, b) => {
        return text.replace(new RegExp(a, 'g'), b);
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

    var lunchFunction = (func, ar=null) => {
        if ( typeof func !== 'undefined' ) {
            if ( typeof func === 'function' ) {
                ar !== null ? func(ar) : func();
            } else {
                DoInside(func);
            }
        }
    };

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

    var HashMain, HashInfo, HashLog, HashSPA, HashEl, HashEvent;

    HashEvent = function( event, AppMethod ) {

        event = typeof event === 'string' ? event.toLowerCase() : '';
        AppMethod = typeof AppMethod === 'function' ? AppMethod : function() {};

        if ( event !== '' ) {

            switch(event) {
                case 'change' : 
                    window.addEventListener('hashchange', AppMethod);
                    return true;
                break;
                default :
                    console.warn( messages['event_error'].replace('%s', event) );
                break;
            }

        } else {
            console.warn( messages['event_error_empty'] );
        }

        return false;
    };

    HashInfo = function ( AppMethod={} ) {

        this.status = true;
        this.version = info['version'];
        this.author = info['author'];
        this.about = info['description'];
        this.git = info['git_url'];
        this.lang = info['lang'];
        this.help = info['help'].replace('%s',info['git_url']);

        this.log = function () {
            console.info( info['message'].replace('%v',info['version']).replace('%s',info['author']).replace('%r',info['description']).replace('%p',info['git_url']) );
            console.info( info['remove_error'] );
            return true;
        };

        this.addons = {
            'data' : typeof Hash.data !== 'undefined',
            'load' : typeof Hash.load !== 'undefined',
            'toolitop' : typeof Hash.toolitop !== 'undefined',
        }

    };

    HashLog = function ( AppMethod={} ) {

        var getDate = new Date();
        var nowDate = getDate.getFullYear()+'/'+getDate.getMonth()+'/'+getDate.getDay();
        var nowTime = getDate.getHours()+':'+getDate.getMinutes()+':'+getDate.getSeconds()+':'+getDate.getMilliseconds();
        this.runDate = nowDate;
        this.runTime = nowTime;

        this.start = () => {
            console.info( messages['hash_log_info'] );
            console.info( messages['hash_log_start'].replace('%r' , nowDate).replace('%p' , nowTime) );
    
            if ( !window.location.hash.includes("/") ) {
                console.log( messages['hash_first'].replace('%s', window.location.hash.slice(1)).replace('%r', Date.now()) );
            } else {
                let H = window.location.hash.slice(1).split('/');
                console.log( messages['hash_first'].replace('%s', window.location.hash.slice(1)).replace('%r', Date.now()), H);
            }
    
            window.addEventListener("hashchange", function() {
                var hashGet = window.location.hash.slice(1);
                if ( !hashGet.includes("/") ) {
                    console.log( messages['change_hash'].replace('%s', hashGet).replace('%r', Date.now()) );
                } else {
                    var H = hashGet.split('/');
                    console.log( messages['change_hash'].replace('%s', hashGet).replace('%r', Date.now()), H);
                }
            });

            return true;
        };

    };

    HashMain = function ( AppMethod={} ) {

        AppMethod['log'] = typeof AppMethod['log'] !== 'undefined' ? AppMethod['log'] : true;
        var AppLog = typeof AppMethod['log'] !== 'boolean' ? true : AppMethod['log'];

        this.hash = window.location.hash;
        this.href = window.location.href;

        this.test = function () {
            AppLog ? console.info( messages['test_message'] ) : alert( messages['test_message'] );
            return true;
        };

        this.auto = function ( method={} ) {
            method = typeof method !== 'undefined' ? method : {};
            const startAuto = window.location.hash !== "" ? true : false;

            method['save'] = typeof method['save'] !== 'undefined' ? method['save'] : {};
            method['save']['active'] = typeof method['save']['active'] !== 'undefined' ? method['save']['active'] == true || method['save']['active'] == false ? method['save']['active'] : false : false;
            method['save']['days'] = typeof method['save']['days'] !== 'number' ? 10 : method['save']['days'];
            method['save']['name'] = typeof method['save']['days'] !== 'undefined' ? method['save']['name'] : "hash";

            if ( method['save']['active'] && startAuto ) {
                window.onhashchange = function () {
                    var d = new Date();
                    d.setTime(d.getTime() + (method['save']['days'] * 24 * 60 * 60 * 1000));
                    var expires = "expires="+d.toUTCString();
                    document.cookie = "hashJs_" + method['save']['name'] + "=" + window.location.hash.slice(1) + ";" + expires + ";path=/";
                }
            }

            method['meta'] = typeof method['meta'] !== 'undefined' ? method['meta'] : {};
            method['meta']['active'] = typeof method['meta']['active'] !== 'undefined' ? method['meta']['active'] == true || method['meta']['active'] == false ? method['meta']['active'] : false : false;
            method['meta']['space'] = typeof method['meta']['space'] !== 'undefined' ? method['meta']['space'] : '-';
            method['meta']['escape'] = typeof method['meta']['escape'] !== 'undefined' ? method['meta']['escape'] == true || method['meta']['escape'] == false ? method['meta']['escape'] : false : false;

            if ( method['meta']['active'] && startAuto ) {

                if ( method['meta']['escape'] ) {
                    window.location.hash = escape(window.location.hash.slice(1));
                }

                while ( window.location.hash.includes("%20") || window.location.hash.includes(" ") || window.location.hash.includes("%2520") ) {
                    window.location.hash = ReplaceAll(window.location.hash, " ", method['meta']['space']);
                    window.location.hash = ReplaceAll(window.location.hash, "%20", method['meta']['space']);
                    window.location.hash = ReplaceAll(window.location.hash, "%2520", method['meta']['space']);
                }

            }

        };


        this.remove = function ( method = {} ) {

            if ( typeof method !== 'undefined' && method !== {} ) {

                method.log = typeof method.log === 'boolean' ? method.log : true;

                //Get words and clear all of them
                if ( typeof method['words'] !== 'undefined' ) {
                    method['words'] = Array.isArray(method['words']) ? Array.from(new Set(method['words'])) : [ method['words'] ];
                } else {
                    method['words'] = [];
                }
                method['words'] = method['words'].filter(value => value !== "");

                var statusWords = {
                    ok : [],
                    no : []
                }

                for ( var j = 0 ; j<method['words'].length ; j++ ) {

                    if ( window.location.hash.includes(method['words'][j]) || window.location.hash.includes(escape(method['words'][j])) ) {

                        window.location.hash = ReplaceAll(window.location.hash, method['words'][j], '');
                        window.location.hash = ReplaceAll(window.location.hash, escape(method['words'][j]), '');
                        statusWords.ok.push(method['words'][j]);

                    } else {
                        AppLog && method.log ? console.warn( messages['error_remove'].replace('%s' , method['words'][j]) ) : null;
                        statusWords.no.push(method['words'][j]);
                    }

                }

                return statusWords;

            } else {
                AppLog && method.log ? console.error( messages['remove_empty'] ) : null;

                return false;
            }

        };

        this.ref = function ( url='' ) {

            if ( url !== '' ) {

                if ( document.referrer !== '' ) {
                    return document.referrer == url;
                } else {
                    return false;
                }

            } else {

                return document.referrer;

            }

        };

        this.have = function ( value='' ) {

            if ( window.location.hash !== '' ) {

                if ( value == '' ) {
                    return true;
                } else {
                    return window.location.hash.includes(value) ? true : false;
                }

            } else {
                return false;
            }

        };

        this.clear = function ( method={} ) {

            method['all'] = typeof method['all'] !== 'boolean' ? true : method['all'];

            if ( method['all'] ) {

                window.location.hash = '';
                var noHashURL = window.location.href.replace(/#.*$/, '');
                window.history.replaceState('', document.title, noHashURL);

            } else {

                if ( window.location.hash !== '' )
                    window.location.hash = '';
            }

            return true;
        };

        this.get = function ( without=true , element={} ) {

            if ( element == {} ) {

                return without ? window.location.hash.slice(1) : window.location.hash;

            } else {

                if ( typeof element['saved'] !== 'undefined' && element['saved'] !== "" && element['saved'] !== " " ) {
                    var saved_hash = "";
                    var name = "hashJs_" + element['saved'] + "=";
                    var ca = document.cookie.split(';');
                    for(var i = 0; i < ca.length; i++) {
                        var c = ca[i];
                        while (c.charAt(0) == ' ') {
                            c = c.substring(1);
                        }
                        if (c.indexOf(name) == 0) {
                            var saved_hash = c.substring(name.length, c.length);
                        }
                    }
                    if ( saved_hash !== "" ) {
                        return saved_hash;
                    } else {
                        AppLog ? console.warn( messages['hash_saved_find'].replace("%s" , element['saved']) ) : null;
                        return "";
                    }
                } else {

                    element['element'] = typeof element['element'] !== 'undefined' ? element['element'] : '';

                    if ( window.location.hash.includes(element['element']) ) {
                        var count_element = element['element'].length;
                        return without ? window.location.hash.slice(1+count_element) : window.location.hash.slice(count_element);
                    } else {
                        AppLog ? console.warn( messages['error_element'].replace( '%s' , element['element'] ) ) : null;
                        return '';
                    }

                }

            }

        };

        this.set = function ( method={} ) {

            if ( typeof method['text'] !== 'undefined' ) {

                method['type'] = typeof method['type'] !== 'undefined' ? method['type'] : '';

                if ( typeof method['element'] !== 'undefined' ) {

                    method['element']['name'] = typeof method['element']['name'] !== 'undefined' ? method['element']['name'] : '';
                    method['element']['symbol'] = typeof method['element']['symbol'] !== 'undefined' ? method['element']['symbol'] : { before : '' , after : '' };

                    if ( typeof method['element']['symbol'] !== 'string' && typeof method['element']['symbol'] !== 'number' && typeof method['element']['symbol'] !== 'boolean' && !Array.isArray(method['element']['symbol']) ) {

                        method['element']['symbol']['before'] = typeof method['element']['symbol']['before'] !== 'undefined' ? method['element']['symbol']['before'] : '';
                        method['element']['symbol']['after'] = typeof method['element']['symbol']['after'] !== 'undefined' ? method['element']['symbol']['after'] : '';

                        var symbol_before = method['element']['symbol']['before'],
                            symbol_after = method['element']['symbol']['after'];

                        if ( symbol_before+method['element']['name']+symbol_after !== '' ) {

                            if ( typeof method['text']['el'] !== 'undefined' ) {

                                method['text']['el'] = method['text']['el'].startsWith('#') ? method['text']['el'].replace('#' , '') : "";
                                method['text']['type'] = typeof method['text']['type'] !== 'undefined' && (method['text']['type'] == 'value' || method['text']['type'] == 'html') ? method['text']['type'] : "html";

                                var MetHtml = method['text']['type'] == 'value' ? document.getElementById(method['text']['el']).value : document.getElementById(method['text']['el']).innerHTML;

                                if ( typeof MetHtml == 'undefined' ) {
                                    MetHtml = "";
                                    AppLog ? console.error( messages['error_set_vap'].replace('%s',method['text']['el']).replace('%r',method['text']['type']) ) : null;
                                }

                                switch ( method['type'] ) {
                                    case 'json' :
                                        window.location.hash = symbol_before+method['element']['name']+symbol_after + JSON.stringify(MetHtml);
                                        break;
                                    case 'escape' :
                                        window.location.hash = symbol_before+method['element']['name']+symbol_after + escape(MetHtml);
                                        break;
                                    default :
                                        window.location.hash = symbol_before+method['element']['name']+symbol_after + MetHtml;
                                        break;
                                }

                            } else {

                                switch ( method['type'] ) {
                                    case 'json' :
                                        window.location.hash = symbol_before+method['element']['name']+symbol_after + JSON.stringify(method['text']);
                                        break;
                                    case 'escape' :
                                        window.location.hash = symbol_before+method['element']['name']+symbol_after + escape(method['text']);
                                        break;
                                    default :
                                        window.location.hash = symbol_before+method['element']['name']+symbol_after + method['text'];
                                        break;
                                }
                            }

                        }

                    } else {
                        AppLog ? console.error( messages['error_symbol_array'] ) : false;
                    }


                } else {

                    if ( typeof method['text']['el'] !== 'undefined' ) {

                        method['text']['el'] = method['text']['el'].startsWith('#') ? method['text']['el'].replace('#' , '') : "";
                        method['text']['type'] = typeof method['text']['type'] !== 'undefined' && (method['text']['type'] == 'value' || method['text']['type'] == 'html') ? method['text']['type'] : "html";

                        var MetHtml = method['text']['type'] == 'value' ? document.getElementById(method['text']['el']).value : document.getElementById(method['text']['el']).innerHTML;

                        if ( typeof MetHtml == 'undefined' ) {
                            MetHtml = "";
                            AppLog ? console.error( messages['error_set_vap'].replace('%s',method['text']['el']).replace('%r',method['text']['type']) ) : null;
                        }

                        switch ( method['type'] ) {
                            case 'json' :
                                window.location.hash = JSON.stringify(MetHtml);
                                break;
                            case 'escape' :
                                window.location.hash = escape(MetHtml);
                                break;
                            default :
                                window.location.hash = MetHtml;
                                break;
                        }

                    } else {

                        switch ( method['type'] ) {
                            case 'json' :
                                window.location.hash = JSON.stringify(method['text']);
                                break;
                            case 'escape' :
                                window.location.hash = escape(method['text']);
                                break;
                            default :
                                window.location.hash = method['text'];
                                break;
                        }
                    }

                }

            } else {
                AppLog ? console.error( messages['set_error'] ) : null;
            }


        };
		
		this.lock = function() {
			
			const hash = window.location.hash;
			window.onhashchange = function() {
				window.location.hash = hash;
			}
			
		};


    };

    HashSPA = function ( method={} ) {

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

    };

    
    HashEl = function(method={}) {

        this.replace = (method={}) => {

            method.text = typeof method.text !== 'undefined' ? method.text : '';
            method.replace = typeof method.replace !== 'undefined' && Array.isArray(method.replace) ? method.replace : {};

            for ( var i=0 ; i<method.replace.length ; i++ ) {
                if (method.replace[i] !== null && typeof method.replace[i] === 'object') {
                    method.replace[i].from = typeof method.replace[i].from !== 'undefined' ? method.replace[i].from : null;
                    method.replace[i].to = typeof method.replace[i].to !== 'undefined' ? method.replace[i].to : null;
    
                    if ( method.replace[i].from !== null && method.replace[i].to !== null ) {
                        if ( method.text.includes(method.replace[i].from) ) {
                            method.text = ReplaceAll(method.text, method.replace[i].from, method.replace[i].to);
                        } else {
                            console.warn( messages['replace_error'].replace('%s' , method.replace[i].from).replace('%r' , method.text) );
                        }
                    } else {
                        console.error( messages['replace_error_bn'] );
                    }
                }
            }

            return method.text;
        };

        this.create = (method={}) => {

            method.type = typeof method.type !== 'undefined' ? method.type : 'div';
            method.class = typeof method.class !== 'undefined' ? ' class="'+method.class+'" ' : '';
            method.render = typeof method.render !== 'undefined' ? method.render : '';
            method.id = typeof method.id !== 'undefined' ? ' id="'+method.id+'"' : '';
            method.add = typeof method.add !== 'undefined' ? method.add : '';
            
            var Element = `<${method.type}${method.class}${method.id}${method.add}>${method.render}</${method.type}>`;
            return Element;

        };

        this.app = (method={}) => {

            method.el = typeof method.el !== 'undefined' ? method.el : '';
            method.name = typeof method.name !== 'undefined' ? "{{"+method.name+"}}" : null;
            method.return = typeof method.return !== 'boolean' ? false : method.return;
            method.render = typeof method.render !== 'undefined' ? method.render : '';
            method.append = typeof method.append !== 'boolean' ? true : method.append;

            if ( method.el !== '' && method.el.startsWith('#') ) {
                method.el = method.el.replace('#','');

                if ( method.name !== null ) {

                    if ( method.append ) {
                        document.getElementById(method.el).innerHTML = ReplaceAll(document.getElementById(method.el).innerHTML, method.name, method.render);
                    }

                    if ( method.return ) {
                        var Ve = document.getElementById(method.el).innerHTML;
                        Ve = ReplaceAll(Ve, method.name, method.render);
                        //return element
                        return Ve;
                    }

                }
    

            } else {
                console.error( messages['spa_el_error'].replace('SPA','Element').replace('%s',method.el) );
            }

            return '';
        };

    };


    const Hash = {
        lib : HashMain,
        info : HashInfo,
        log : HashLog,
        SPA : HashSPA,
        El : HashEl,
        event : HashEvent,
        ready : true
    };


    var LoadHash = false;

    if (typeof define === 'function' && define.amd) {
        define(Hash);
        LoadHash = true;
    } else {
        window.Hash = Hash;
        LoadHash = true;
    }

    if (typeof exports === 'object') {
        module.exports = Hash();
        LoadHash = true;
    }

    if (LoadHash) {
        window.addEventListener('load', LoadElements);
    } else {
        console.error( messages['load_error'] );
    }

})(window);