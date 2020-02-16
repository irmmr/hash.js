class m3e {
    constructor(conf = {
        editor : true,
        shadow : true,
        padding : 2,
        margin : 2,
        width : 100,
        bg : 'bg-light'

    }) {

        var ed = conf.editor;
        ed = 'editor' in conf ? ed : true;

        if (ed) {
            var padding = 'padding' in conf ? conf.padding : 2,
            margin = 'margin' in conf ? conf.margin : 1,
            shadow = 'shadow' in conf ? conf.shadow : true,
            background = 'background' in conf ? conf.background : 'bg-light',
            width = 'width' in conf ? conf.width : 100,
            classes = 'class' in conf ? conf.class : [],
            style = 'style' in conf ? conf.style : null;
            
            var apClass=  [
                'm3e',
                'w-'+width,
                background,
                shadow ? 'shadow' : null,
                'd-block',
                'p-'+padding,
                'm-'+margin,
                'mb-5'
            ];

            if (Array.isArray(classes)) {
                classes.forEach(i => {
                    apClass.push(i);
                });
            }

            this.m3eEvent({
                class : apClass,
                style : style
            });
        }
        
    }
    m3eEvent(e = {}) {
        var self = this;

        var id = self.getAllAppId();
        id.forEach(i => {
            var ap = this.find(i);
            self.addClass(ap, e.class);

            if (e.style !== null) {
                if (ap.hasAttribute('style')) {
                    var st = ap.getAttribute('style');
                    ap.setAttribute('style', st.endsWith(';') ? st + e.style : st + ';' + e.style);
                } else {
                    ap.setAttribute('style', e.style);
                }
            }
            
            var loading = self.setMsg(ap, self.msg(204), self.msg(205), 'primary', '', '<div class="spinner m-0 p-0 text-center w-100"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>');
            if (loading !== null) {

                self.titleApp(ap, self.getTitle(ap));
                self.editorApp(ap);
                self.btnAppend(ap, self.getBtn(ap).val, self.getBtn(ap).link);
                

                var editor = ap.getElementsByClassName('m3e-editor')[0];
                if (typeof editor !== 'undefined') {
                    if (typeof CodeMirror !== 'undefined') {
                        var val = self.getVal(ap);
                        var mode = self.getMode(ap);;
                        CodeMirror.runMode(unescape(val), mode, editor);
                    } else {
                        self.hide(editor);
                        console.warn( self.msg(201) );
                        self.setMsg(ap, self.msg(203), self.msg(202), 'danger', 'fas fa-tv');
                    }
                }

                var checkLoad = 0;
                var loadingApp = setInterval(function() {
                    checkLoad++;
                    var ac = ap.childElementCount;
                    

                    if (ac !== 0 && typeof ap !== 'undefined') {
                        /*
                        * Close loading after elements loaded
                        */
                        self.hide(loading);

                        /*
                        * Check if app have title, show it after loading
                        * getTitle => ap
                        */
                        if (self.getTitle(ap) !== "" && typeof CodeMirror !== 'undefined') {
                            var m3e_title = ap.getElementsByClassName('m3e-title')[0];
                            self.show( m3e_title );
                        }

                        /*
                        * Check if app have button, show it after loading
                        * getBtn => ap = [a, b]
                        */
                        if (self.getBtn(ap).val !== "" && self.getBtn(ap).link !== "" && typeof CodeMirror !== 'undefined') {
                            var m3e_btn = ap.getElementsByClassName('m3e-btn')[0];
                            self.show( m3e_btn );
                        }

                        /*
                        * Show editor code after loaded
                        */
                        if (typeof CodeMirror !== 'undefined') {
                            self.show( editor );
                        }
                        
                        

                        /*
                        * Clear interval from window after loaded
                        */
                        window.clearInterval(loadingApp);
                    } else {
                        if (checkLoad >= 300) {
                            self.hide(loading);
                            self.setMsg(ap, self.msg(207), self.msg(208), 'danger', 'fas fa-window-close');
                            window.clearInterval(loadingApp);
                        }
                    }

                }, 100);



            } else {
                console.error( self.msg(206) );
            }

        });
        
    }
    editorApp(el) {
        var e = document.createElement('pre');
        e.classList = "w-100 p-2 m3e-editor bg-white cm-s-default mb-2";

        if (el !== null) {
            el.appendChild(e);
            return true;
        } else {
            return false;
        }
    }
    titleApp(el, val = "") {
        var e = document.createElement('div');
        e.classList = "m3e-title text-right text-dark mb-3";
        e.innerHTML = '<i class="fas fa-code text-primary ml-1"></i> ' + val;

        if (el !== null && val !== "") {
            el.appendChild(e);
            return true;
        } else {
            return false;
        }
    }
    tryButton(el) {
        var e = document.createElement('pre');
        e.classList = "w-100 p-2 m3e-editor bg-white cm-s-default mb-2";

        if (el !== null) {
            el.appendChild(e);
            return true;
        } else {
            return false;
        }
    }
    btnAppend(el, val = "", link = "#") {
        var e = document.createElement('a');
        e.classList = "m3e-btn";
        e.href = link;
        e.target = "_blank";
        e.innerHTML = '<button class="btn btn-primary mt-1"><i class="fas fa-angle-double-right ml-1"></i> ' + val + '</button>';

        if (el !== null && val !== "" && link !== "") {
            el.appendChild(e);
        }
    }
    setMsg(el, sub, msg, color = 'danger', icon = 'fas fa-times', icon_html = '') {
        var e = document.createElement('div');
        e.classList = "m3e-error text-center w-100 p-2";
        e.innerHTML = `${icon !== '' ? '<i class="'+icon+' text-'+color+' mb-2"></i>' : ''}` + `${icon_html !== '' ? icon_html : ''}` +
        '<br />'+
        '<b class="text-'+color+'">'+sub+'</b><br />'+
        '<small class="text-dark mt-1">'+msg+'</small>';

        var msg_id = Math.ceil(Date.now() / sub.length) + '_' + this.getId(el) + '_' + Math.ceil( Math.random()*10000 );
        e.setAttribute('id', 'm3e_msg_' +  msg_id);

        
        if (el !== null) {
            el.appendChild(e);
            return this.selectId(e.id);
        } else {
            return null;
        }
    }
    getAllAppId() {
        var self = this;
        var met = self.selectAll('[m3e-id]');
        var ai = [];
        
        for (var i=0 ; i<met.length ; i++) {
            var clone = met[i];
            var id = this.getId(clone);

            if ( !ai.includes(id) ) {
                ai.push(id);
            } else {
                var new_id = id+'_'+i;
                self.setId(clone, new_id);
                ai.push(new_id);
            }
        }
        return ai;
    }
    msg(code) {
        var msg = {
            200 : 'M3e%20running...',
            201 : 'M3e%3A%20CodeMirror%20is%20not%20exits.%20for%20run%20editor%20part%2C%20you%20must%20requir%20that%20library.%0ALibrary%20website%3A%20https%3A//codemirror.net',
            202 : '%u0627%u062F%u06CC%u062A%u0648%u0631%20%u06A9%u062F%20%u0647%u0627%20%u0628%u0627%u06CC%u062F%20%u0641%u0631%u0627%u062E%u0648%u0627%u0646%u06CC%20%u0634%u0648%u062F%20%u062A%u0627%20%u0628%u062A%u0648%u0627%u0646%20%u0627%u0632%20M3e%20%u0627%u0633%u062A%u0641%u0627%u062F%u0647%20%u06A9%u0631%u062F%20.%20%u0644%u0637%u0641%u0627%20%u06A9%u0646%u0633%u0648%u0644%20%u0645%u0631%u0648%u0631%u06AF%u0631%20%u0631%u0627%20%u0686%u06A9%20%u06A9%u0646%u06CC%u062F%20.',
            203 : '%u0645%u0634%u06A9%u0644%20%u062F%u0631%20%u0628%u0627%u0631%u06AF%u0632%u0627%u0631%u06CC%20%u0627%u062F%u06CC%u062A%u0648%u0631',
            204 : '%u062F%u0631%20%u062D%u0627%u0644%20%u0628%u0627%u0631%u06AF%u0632%u0627%u0631%u06CC%20...',
            205 : '%u0644%u0637%u0641%u0627%20%u062A%u0627%20%u062F%u0631%u06CC%u0627%u0641%u062A%20%u06A9%u0627%u0645%u0644%20%u0627%u0637%u0644%u0627%u0639%u0627%u062A%20%u0635%u0628%u0631%20%u06A9%u0646%u06CC%u062F%20%20.',
            206 : 'M3e%3A%20can%20not%20loading%20any%20method%20for%20showing%21',
            207 : '%u0627%u0634%u06A9%u0627%u0644%20%u062F%u0631%20%u0628%u0627%u0631%u06AF%u0632%u0627%u0631%u06CC',
            208 : '%u062F%u0631%u06CC%u0627%u0641%u062A%20%u0627%u0632%20%u0633%u0631%u0648%u0631%20%u0628%u0627%20%u0645%u0634%u06A9%u0644%20%u0631%u0648%u0628%u0631%u0648%20%u0634%u062F%21%20%u0644%u0637%u0641%u0627%20%u0635%u0641%u062D%u0647%20%u0631%u0627%20%u0631%u0641%u0631%u0634%20%u06A9%u0646%u06CC%u062F%20.'
        },
            val = msg[code];

        return val ? unescape(val) : null;
    }

    show(el) {
        if (el !== null) {
            el.style.display = "block";
            return true;
        }

        return false;
    }
    hide(el) {
        if (el !== null) {
            el.style.display = "none";
            return true;
        }

        return false;
    }
    isExits(el) {
        return this.type(el) !== 'undefined';
    }
    isObject(el) {
        return this.type(el) === 'object';
    }
    type(el) {
        return typeof el;
    }
    selectId(id) {
        return document.getElementById(id);
    }
    select(query) {
        return document.querySelector(query);
    }
    selectAll(query) {
        return document.querySelectorAll(query);
    }
    find(query) {
        return this.select('[m3e-id="'+query+'"]');
    }
    getId(el) {
        if (el.hasAttribute('m3e-id')) {
            return el.getAttribute('m3e-id');
        }
        return el;
    }
    getVal(el) {
        if (el.hasAttribute('m3e-code')) {
            return el.getAttribute('m3e-code');
        }
        return "";
    }
    getTitle(el) {
        if (el.hasAttribute('m3e-title')) {
            return el.getAttribute('m3e-title');
        }
        return "";
    }
    getBtn(el) {
        var simple = {
            val : '',
            link : '#'
        };
        if (el.hasAttribute('m3e-btn')) {
            var g = el.getAttribute('m3e-btn');
            var gs = g.split(':');

            if (gs.length == 2) {
                return {
                    val : unescape(gs[0]),
                    link : unescape(gs[1])
                }
            } else {
                return simple;
            }
            
        }
        return simple;
    }
    getMode(el) {
        if (el.hasAttribute('m3e-mode')) {
            return el.getAttribute('m3e-mode');
        }
        return el;
    }
    setId(el, id='') {
        return el.setAttribute('m3e-id', id);
    }
    addClass(el, className=[]) {
        className = Array.isArray(className) ? className : [className];
        className = Array.from(new Set(className));
        if (el !== null) {
            className.forEach(ic => {
                if (ic !== null) {
                    if (!el.classList.contains(ic)) {
                        el.classList.add(ic);
                    }
                }
            });
        } else {
            return false;
        }


        return true;
    }
    removeClass(el, className=[]) {
        className = Array.isArray(className) ? className : [className];
        className = Array.from(new Set(className));
        if (el !== null) {
            className.forEach(ic => {
                if (ic !== null) {
                    if (el.classList.contains(ic)) {
                        el.classList.remove(ic);
                    }
                }
            });
        } else {
            return false;
        }

        return true;
    }

}