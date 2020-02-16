( function ( window ) {

    var eventMessage = {
        'load_error' : 'hash.js Data : can\'t load HashJs. please befor run Hash event, run Hash.js library.',
        'error_console' : 'hash.js Data : "%s" is not a type of console.'
    }

    var gd = (elem, insted='', type='undefined') => {
        return typeof elem !== type ? elem : insted;
    };

    var gds = (elem, insted='', type='number') => {
        return typeof elem === type ? elem : insted;
    };

    var AttrData = (el, attribute) => {
        if ( el.hasAttribute(attribute) ) {
            return el.getAttribute(attribute);
        } else {
            return "";
        }
    };

    var BoolData = (el) => {
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

    class HashJsBlockData extends HTMLElement {
        constructor() {
            super();
            
            var Log = this.hasAttribute('log') ? BoolData(this.getAttribute('log')) : false;

            var style = "";
            var allAttr = this.getAttributeNames();
            for ( var i=0 ; i<allAttr.length ; i++ ) {
                if ( allAttr[i].toLowerCase().startsWith('hs-') ) {
                    var attr = allAttr[i];
                    allAttr[i] = allAttr[i].replace(new RegExp('hs-', 'g'), '').toLowerCase();
                    style += `${allAttr[i]}:${this.getAttribute(attr)};`;
                }
            }

            this.style.cssText = style;

            if (Log) {
                console.log(`Style (h-block) (#${this.hasAttribute('id') ? this.getAttribute('id') : 'none'}) : ${style}`);
            }

        }
    }


    class HashJsIsInfo extends HTMLParagraphElement {
        constructor() {
            super();

            var styles = this.hasAttribute('style') ? this.getAttribute('style').split(';') : [];
            var elId = this.hasAttribute('id') ? '#'+this.getAttribute('id') : 'without id';
            var elClass = this.hasAttribute('class') ? this.classList.value.split(' ') : "without class";
            var elAttr = this.getAttributeNames();

            console.info(
                `Element info: (${elId})\nLoaded in ${Date.now()}\n\nInformation:`,
                `\nEl class: `, elClass,
                `\nEl style:`, styles,
                `\nEl attr:`, elAttr,
                `\nEl output:`, {
                    html : {
                        val : this.innerHTML,
                        length : this.innerHTML.length
                    },
                    text : {
                        val : this.innerText,
                        lenght : this.innerText.length
                    }
                },
                `\nNode name:`, this.nodeName,
                `\nNode Type:`, this.nodeType,
                `\nNode Val:`, this.nodeValue,
                `\nChild count:`, this.childElementCount,
                `\nChild list:`, this.children
            );
        }
    }


    class HashJsScript extends HTMLScriptElement {
        constructor() {
            super();
            
            var sh = this.attachShadow({mode:'open'});
            var ch = this.textContent;

            ch = ch.replace('$', 'var ');

            var scriptMe = document.createElement("script");
            scriptMe.textContent = ch;
            document.body.appendChild(scriptMe);

        }
    }



    var loadElementsData = () => {
        customElements.define('h-block', HashJsBlockData);
        customElements.define('h-script', HashJsScript, { extends : 'script' });
        customElements.define('hs-info', HashJsIsInfo, { extends: 'p' });
    }

    Data = function(n={}) {

  
        this.escape = (method={}) => {
    
            method.data = gd(method.data);
            return escape(method.data);

        }
    
        this.unescape = (method={}) => {
    
            method.data = gd(method.data);
            return unescape(method.data);

        }

        this.type = (method={}) => {

            method.data = gd(method.data);
            return typeof method.data;

        }


        this.lower = (method={}) => {

            method.data = gd(method.data);
            return method.data.toLowerCase();

        }

        this.uper = (method={}) => {

            method.data = gd(method.data);
            return method.data.toUpperCase();

        }

        this.split = (method={}) => {

            method.data = gd(method.data);
            method.split = gd(method.split);

            return method.data.split(method.split);

        }

        this.repeat = (method={}) => {

            method.data = gd(method.data);
            method.repeat = gds(method.split, 1, 'number');

            return method.data.split(method.split);

        }

        this.sort = (method={}) => {

            method.data = gd(method.data);
            
            if ( Array.isArray(method.data) ) {
                var dataReturn = method.data.sort();
            } else {
                var dataReturn = "";
                var _data = method.data.split('');
                _data = _data.sort();
                _data.forEach(element => {
                    dataReturn += element;
                });
            }

            return dataReturn;

        }

        this.clearConsole = (method={}) => {
    
            method.time = gds(method.time, 0);

            setTimeout(function() {
                console.clear();
            }, method.time);

            return true;

        }

        this.setConsole = (method={}) => {

            method.type = gd(method.type, 'log');
            method.type = method.type.toLowerCase();
            method.data = gd(method.data, 'Empty log with hashJs event, set data for Hash.data().setConsole set.');

            switch(method.type) {
                case "log" :      console.log(method.data)      ;break;
                case "info" :     console.info(method.data)     ;break;
                case "error" :    console.error(method.data)    ;break;
                case "warning" :  console.warn(method.data)     ;break;
                default : console.warn( eventMessage['error_console'].replace('%s', method.type) )  ;break;
            }

            return {
                status : true,
                text : method.data,
                type : method.type
            };

        }
    }



    var HashData = Data;

    if ( typeof Hash !== 'undefined' ) {

        var LoadHashNew = false;

        if (typeof define === 'function' && define.amd) {
            define(HashData);
            LoadHashNew = true;
        } else {
            window.Hash.data = HashData;
            LoadHashNew = true;
        }
    
        if (typeof exports === 'object') {
            module.exports = HashData();
            LoadHashNew = true;
        }

        if ( LoadHashNew ) {
            window.addEventListener('load', loadElementsData);
        }

    } else {
        console.error( eventMessage['load_error'] );
    }

})(window)