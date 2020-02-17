( function ( window ) {
    'use strict';

    var info = {
        version : '1.2'
    }

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

    var emptyObj = Object.freeze({}),
        emptyFunc = function() {};

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

    function isEmpty(h) {
        return h == ''
    }


    var hashMain, hashInfo, HashEl, hashEvent;

    hashEvent = function(e, func = function() {}) {

        if ( isDef(e) && isString(e) ) {
            var event = e.toLowerCase(),
                func = isDef(func) && isFunc(func) ? func : emptyFunc;

            switch(event) {

                case 'change' : 
                    window.addEventListener('hashchange', func);
                break;

                default :  
                    // Nothing to do
                break;

            }

        }

    }

    hashInfo = function(h = {}) {

        this.version = isDef(info.version) ? info.version : '?';

        this.addons = {
            data : typeof Hash.data !== 'undefined',
            load : typeof Hash.load !== 'undefined',
            wikitip : typeof Hash.wikitip !== 'undefined',
            spa : typeof Hash.spa !== 'undefined',
        }

    }


    hashMain = function(h = {}) {

        /* simple hash and href */
        this.hash = window.location.hash;
        this.href = window.location.href;

        /* remove obj */
        this.remove = function(n = {}) {

            if ( isDef(n) && isObj(n) ) {

                /* get all words must be remove */
                var words = 'words' in n ? Array.isArray(n.words) ? n.words : [n.words] : [];

                /* remove equal words */
                words = Array.from(new Set(words));

                /* filter and delete empty words */
                words = words.filter(val => val !== '');

                /* remove words */
                for (var i=0 ; i<words.length ; i++) {

                    var wh = window.location.hash;
                    window.location.hash = replaceAll(wh, words[i], '');
                    window.location.hash = replaceAll(wh, escape(words[i]), '');

                }
                
            }

        }

        this.ref = function(h = '') {

            if (!isEmpty(h) && isString(h)) {

                /* get window reff */
                var reff = document.referrer;

                if (!isEmpty(reff)) {
                    return reff == h;
                } else {
                    return false;
                }

            } else {
                return document.referrer;
            }

        }

        this.have = function (h = '') {

            /* get window hash */
            var wh = window.location.hash;

            /* chekc hash */
            if (!isEmpty(wh)) {

                if (isEmpty(h)) {
                    return true;
                } else {
                    return wh.includes(h);
                }

            } else {
                return false;
            }

        }

        this.clear = function(h = {}) {

            if (isDef(h) && isObj(h)) {

                /* sharp boolean */
                var sharp = 'sharp' in h ? isBool(h.sharp) ? h.sharp : false : false;

                /* get window hash */
                var wh = window.location.hash;

                /* remove hash */
                window.location.hash = '';

                /* clear sharp */
                if (sharp) {

                    var clearHash = wh.replace(/#.*$/, '');
                    window.history.replaceState('', document.title, clearHash);

                }

            }

        }

        this.get = function(without = true, h = {}) {

            if (isDef(without) && isBool(without) && isDef(h) && isObj(h)) {

                /* get window hash */
                var wh = without ? window.location.hash.slice(1) : window.location.hash;

                /* get hash */
                if (h == emptyObj) {

                    return wh;

                } else {

                    return wh;

                }

            }

        }

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
            
            /* get window hash */
            const wh = window.location.hash;
            
            /* change it when replaced */
			window.onhashchange = function() {
				window.location.hash = wh;
			}
			
		}


    }
    
    HashEl = function(h = {}) {

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
        El : HashEl,
        event : HashEvent,
        ready : true
    }


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

})(window);