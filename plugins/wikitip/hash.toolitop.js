( function ( window ) {

    var eventMessage = {
        'load_error' : 'hash.js Toolitop : can\'t load HashJs. please befor run Hash event, run Hash.js library.',
        'open_setting' : 'hash.js Toolitop : Error to open/close setting window! toolitop setting box is not appended to the window.',
        'append_setting' : 'hash.js Toolitop : Setting is not appended! Please run toolitop setting class in body tag script, not in head and other.',
        'load_mode' : 'hash.js Toolitop : Toolitop mode is incorrect. you just can use "light" or "dark", not "%s".',
        'load_status' : 'hash.js Toolitop : Toolitop status is incorrect. you just can use "yes" or "no", not "%s".',
        'load_popper' : 'hash.js Toolitop : For run hash toolitop, "Popper.js" required.'
    }

    var gdTool = (elem, insted='', type='undefined') => {
        return typeof elem !== type ? elem : insted;
    };

    var gdsTool = (elem, insted='', type='number') => {
        return typeof elem === type ? elem : insted;
    };

    var AttrTool = (el, attribute) => {
        return el.hasAttribute(attribute) ? el.getAttribute(attribute) : "";
    };

    var IsImageOk = (img) => {
        if (!img.complete) {
            return false;
        }
        if (img.naturalWidth === 0) {
            return false;
        }
        return true;
    }

    var BoolTool = (el) => {
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

    var OnHover = (el, hover=function() {}, out=function() {}) => {

        hover = typeof hover === 'function' ? hover : function() {};
        out = typeof out === 'function' ? out : function() {};

        if (hover !== function() {}) {
            el.onmouseover = function(e) {
                hover.call(this);
            };
        }

        if (out !== function() {}) {

            el.onmouseout = function(e) {
                out.call(this);
            };
        }

        return true;
    };

    var addClass = (el, className=[]) => {
        className = Array.isArray(className) ? className : [className];
        className = Array.from(new Set(className));
        if (typeof el !== 'undefined' && el !== null) {
            className.forEach(ic => {
                if (!el.classList.contains(ic)) {
                    el.classList.add(ic);
                }
            });
        } else {
            return false;
        }


        return true;
    }

    var Show = (el) => {
        if (el !== null) {
            el.style.display = 'block';
        }

        return true;
    }

    var Hide = (el) => {
        if (el !== null) {
            el.style.display = 'none';
        }

        return true;
    }

    var selectId = (el) => {
        return document.getElementById(el) !== null ? document.getElementById(el) : null;
    }

    var removeClass = (el, className=[]) => {
        className = className.splice(' ');
        className = Array.from(new Set(className));
        if (typeof el !== 'undefined' && el !== null) {
            className.forEach(ic => {
                if (el.classList.contains(ic)) {
                    el.classList.remove(ic);
                }
            });
        } else {
            return false;
        }

        return true;
    }

    var haveClass = (el, className) => {
        className = className.replace(new RegExp(' ', 'g'), '');
        if (el !== null) {
            return el.classList.contains(className);
        } else {
            return false;
        }
    }

    var setCookie = (cname, cvalue, exdays) => {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
      
    var getCookie = (cname) => {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    var haveCookie = (cname) => {
        if (typeof getCookie === 'function') {
            return getCookie(cname) !== "" ? true : false;
        }

        return false;
    }

    var showChangeMode = () => {
        var i = selectId('hs_lsl_main');
        if (i !== null) {
            i.innerHTML = `<p align=center class="hs-setting-message"><b>${getTranslate('hs-saved', 'Saved!')}</b> ${getTranslate('hs-text', 'for append all changes, refresh page. ')} <a href="javascript:location.reload(true)">${getTranslate('hs-refresh', 'Refresh now')}</a><br /><small> ${getTranslate('hs-notice', 'you can clear that message!')}</small> <i onclick="document.getElementById('hs_lsl_main').innerHTML='';" class="fas fa-trash ia"></i></p>`;
        } else {
            console.warn( eventMessage['open_setting'] );
            return false;
        }
    }

    var setModeLight = () => {
        var mode = 'light',
        i = selectId('hs_tool_show_mode'),
        cName = 'hash_js_toolitop_mode',
        opLight = selectId('hs_op_light'),
        opDark = selectId('hs_op_dark');
        if (!haveClass(i, 'hs-mode-sun')) {
            if (getCookie(cName) !== mode) {
                setCookie(cName, mode, 30);
            }
            if (i !== null) {
                addClass(i, ['hs-mode-sun', 'fa-sun']);
                removeClass(i, ['hs-mode-moon', 'fa-moon']);
            }
            if (opDark !== null && opLight !== null) {
                opLight.setAttribute('selected', '');
                opDark.removeAttribute('selected');
            }
            showChangeMode();
        }

        return true;
    }

    var setModeDark = () => {
        var mode = 'dark',
        i = selectId('hs_tool_show_mode'),
        cName = 'hash_js_toolitop_mode',
        opLight = selectId('hs_op_light'),
        opDark = selectId('hs_op_dark');
        if (!haveClass(i, 'hs-mode-moon')) {
            if (getCookie(cName) !== mode) {
                setCookie(cName, mode, 30);
            }
            if (i !== null) {
                addClass(i, ['hs-mode-moon', 'fa-moon']);
                removeClass(i, ['hs-mode-sun', 'fa-sun']);
            }
            if (opDark !== null && opLight !== null) {
                opDark.setAttribute('selected', '');
                opLight.removeAttribute('selected');
            }
            showChangeMode();
        }

        return true;
    }

    var setStatusYes = () => {
        var status = 'yes',
        i = selectId('hs_tool_show_status'),
        cName = 'hash_js_toolitop_status',
        opYes = selectId('hs_op_yes'),
        opNo = selectId('hs_op_no');
        if (!haveClass(i, 'hs-status-yes')) {
            if (getCookie(cName) !== status) {
                setCookie(cName, status, 30);
            }
            if (i !== null) {
                addClass(i, ['hs-status-yes', 'fa-check']);
                removeClass(i, ['hs-status-no', 'fa-times']);
            }
            if (opNo !== null && opYes !== null) {
                opYes.setAttribute('selected', '');
                opNo.removeAttribute('selected');
            }
            showChangeMode('mode');
        }

        return true;
    }

    var setStatusNo = () => {
        var status = 'no',
        i = selectId('hs_tool_show_status'),
        cName = 'hash_js_toolitop_status',
        opYes = selectId('hs_op_yes'),
        opNo = selectId('hs_op_no');
        if (!haveClass(i, 'hs-status-no')) {
            if (getCookie(cName) !== status) {
                setCookie(cName, status, 30);
            }
            if (i !== null) {
                addClass(i, ['hs-status-no', 'fa-times']);
                removeClass(i, ['hs-status-yes', 'fa-check']);
            }
            if (opNo !== null && opYes !== null) {
                opNo.setAttribute('selected', '');
                opYes.removeAttribute('selected');
            }
            showChangeMode('mode');
        }

        return true;
    }

    var removeAttr = (el, attr) => {
        if (el !== null) {
            if (el.hasAttribute(attr)) {
                el.removeAttribute(attr);
            }
        }

        return true;
    }


    var getTranslate = (tr, instead="") => {
        var el = selectId('hs_translate');
        var ret = '';
        if (el !== null) {
            ret = AttrTool(el ,tr);
        }

        return ret !== "" ? ret : instead;
    }

    class HashJsIsLinkShow extends HTMLAnchorElement {
        constructor() {
            super();
            
            //Get all vars
            var isLink = this.hasAttribute('hs-link') ? this.hasAttribute('hs-link-html') ? BoolTool(this.getAttribute('hs-link')) : false : false;
            var htmlVe = AttrTool(this, 'hs-link-html');
            var imgVe = AttrTool(this, 'hs-link-img');
            var modeEval = AttrTool(this, 'hs-link-mode');

            //Pooper attr
            this.setAttribute('aria-describedby', 'tooltip');

            //Check mode
            modeEval = modeEval.toLowerCase();
            modeEval = modeEval == 'light' || modeEval == 'dark' ? modeEval : 'light';

            var nightMode = false;
            if (this.hasAttribute('hs-link-mode')) {
                if (modeEval == 'light') {
                    nightMode = false;
                } else {
                    nightMode = true;
                }
            }

            //Show status
            var showStatus = true;
            if (this.hasAttribute('hs-link-status')) {
                var status = AttrTool(this, 'hs-link-status');
                status = status.toLowerCase();
                status = status == 'yes' || status == 'no' ? status : 'yes';

                if (status == 'yes') {
                    showStatus = true;
                } else {
                    showStatus = false;
                }
            }


            //Check method id
            if (this.hasAttribute('id') && this.getAttribute('id') !== "") {
                var app_id = this.getAttribute('id');
            } else {
                var app_id = `hs_overlay_${Date.now()*Math.ceil(Math.random()*10^4)}`;
                this.setAttribute('id', app_id);
            }

            //Get the element value text
            var inText = this.innerText;

            //Remove this href link
            if (!this.hasAttribute('href')) {
                this.setAttribute('href', 'javascript:void(0)');
            }

            //Remove title of element if exits
            if (this.hasAttribute('title')) {
                this.removeAttribute('title');
            }

            //Set the toolitop window
            if (isLink) {
                //Replace all TEXT values to <b>
                htmlVe = htmlVe.replace(new RegExp(inText, 'g'), `<b>${inText}</b>`);
                //Make html for win
                var adj = `
                <div class="animated hs-overley${nightMode ? ' hs-night' : ''}" id="${app_id}_main">
                    ${imgVe!=="" ? `<img class="hs-overley-img" id="${app_id}_img" src="${imgVe}">` : ''}
                    <img class="hs-overley-img" id="${app_id}_img_error" style="display:none">
                    <div class="hs-overley-txt">
                        ${htmlVe}
                    </div>
                    <!-- <div class="hs-overlay-btn">
                        <button onclick="(new Hash.toolitop()).openSetting()"><i class="fas fa-cog"></i></button>
                    </div> -->
                    <div class="hs-arrow" data-popper-arrow></div>
                </div>
                `;
                //Set classes
                addClass(this, ['hs-lshl']);
                removeClass(this, ['hs-lsnl']);
            } else {
                //Make html for win
                var adj = `
                <div class="animated hs-overley${nightMode ? ' hs-night' : ''}" id="${app_id}_main">
                    <div class="hs-overley-txt">
                        ${getTranslate('hs-without-page', 'Not exits any page for <b>%s</b>').replace(new RegExp('%s', 'g'), inText)}
                    </div>
                    <!-- <div class="hs-overlay-btn">
                        <button onclick="(new Hash.toolitop()).openSetting()"><i class="fas fa-cog"></i></button>
                    </div> -->
                    <div class="hs-arrow" data-popper-arrow></div>
                </div>
                `;
                //Set classes
                addClass(this, ['hs-lsnl']);
                removeClass(this, ['hs-lshl']);
            }

            //Add toolitop after than a element
            var btEl = selectId(app_id);
            btEl.insertAdjacentHTML('afterend', adj);

            //Get toolitop window id and address
            var elGet = app_id+'_main';;
            var elMain = selectId(elGet);

            //Add special class
            addClass(elMain, 'hs-link-special-vertual');

            //Img part
            if (this.hasAttribute('hs-link-img')) {
                var elImg = app_id+'_img', elImgError = app_id+'_img_error';
                var elImage = selectId(elImg);
                var elImageErr = selectId(elImgError);
                var brokenImg = 'file:///C:/Users/paresh/Desktop/failed-loading.png';
                var loadingImg = 'file:///F:/xampp/htdocs/hash.js/loading-img.png';
                elImage.onerror = function() {
                    elImage.error = '';
                    Show(elImageErr);
                    Hide(elImage);
                    elImageErr.src = loadingImg;
                }
                elImage.onload = function() {
                    this.style.maxHeight = this.style.width;
                }
    
                elImageErr.setAttribute('src', loadingImg);
    
                if (!IsImageOk(elImage)) {
    
                    //Check point
                    var imgLoad = 0;
    
                    Hide(elImage);
                    Show(elImageErr);
    
                    var imgInt = setInterval(function() {
                        imgLoad ++;
        
                        if (imgLoad < 20) {
                            if (IsImageOk(elImage)) {
                                Show(elImage);
                                Hide(elImageErr);
                                window.clearInterval(imgInt);
                            }
                        } else {
                            elImageErr.setAttribute('src', brokenImg);
                            window.clearInterval(imgInt);
                        }
        
                    }, 1000);
                }
            }

            //Set toolitop window style
            if (this.hasAttribute('hs-link-style')) {
                selectId(elGet).style.cssText = this.getAttribute('hs-link-style');
            }

            //Set toolitop window class
            if (this.hasAttribute('hs-link-class')) {
                selectId(elGet).classList.add(this.getAttribute('hs-link-class'));
            }

            //Pooper
            var button = document.querySelector('#'+app_id);
            var tooltip = document.querySelector('#'+app_id+'_main');

            let popperInstance = null;

            function HScreatePooper() {
                popperInstance = Popper.createPopper(button, tooltip, {
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 8],
                            }
                
                        }   
                    ]
                });
            }

            function HSdestroyPopper() {
                if (popperInstance) {
                    popperInstance.destroy();
                    popperInstance = null;
                }
            }

            function HSshowPopper() {
                tooltip.setAttribute('data-show', '');
                HScreatePooper();
            }

            function HShidePopper() {
                tooltip.removeAttribute('data-show');
                HSdestroyPopper();
            }

            function HSshowPopperNew() {
                HScreatePooper();
            }

            //Set a hover for show toolitop window
            OnHover(this, function() {
                HSshowPopper();
            }, function() {
                HShidePopper();
            });

            OnHover(document.getElementById(elGet), function() {
                HSshowPopperNew();
            }, function() {
                HShidePopper();
            });

            //Disable
            if (!showStatus) {
                elMain.innerHTML = "";
                addClass(elMain, ['hidden-all'])
            }

        }

    }

    var loadElementsTool = () => {
        customElements.define('hs-link', HashJsIsLinkShow, { extends: 'a' });
    }

    Tool = function(n={}) {

        this.settingLoad = (m={}) => {

            m.translate = gdsTool(m.translate, {}, 'object');
            m.translate.every_time = gdTool(m.translate.every_time, 'Every time');
            m.translate.never = gdTool(m.translate.never, 'Never');
            m.translate.modeText = gdTool(m.translate.modeText, 'Toolitop mode');
            m.translate.day = gdTool(m.translate.day, 'Light');
            m.translate.night = gdTool(m.translate.night, 'Dark');
            m.translate.statusText = gdTool(m.translate.statusText, 'Toolitop show status');
            m.translate.title = gdTool(m.translate.title, 'Description setting');


            m.setting = gdsTool(m.setting, {}, 'object');
            m.setting.new = gdTool(m.setting.new, []);
            m.setting.new = Array.isArray(m.setting.new) ? Array.from(new Set(m.setting.new)) : [];

            var plusSetting = '';
            m.setting.new.forEach(item => {
                plusSetting += item;
            });

            m.close = gdsTool(m.close, 'fas fa-minus', 'string');

            var HSetting = `<p align=center>${m.translate.statusText} <select><option id="hs_op_yes" onclick="(new Hash.toolitop()).showEnable()">${m.translate.every_time}</option><option id="hs_op_no" onclick="(new Hash.toolitop()).showDisable()">${m.translate.never}</option></select> <i class="fas fa-check hs-status-show hs-status-yes" id="hs_tool_show_status"></i></p>` +`<p align=center>${m.translate.modeText} <select><option id="hs_op_light" onclick="(new Hash.toolitop()).lightMode()">${m.translate.day}</option><option id="hs_op_dark" onclick="(new Hash.toolitop()).darkMode()">${m.translate.night}</option></select> <i class="fas fa-sun hs-mode-show hs-mode-sun" id="hs_tool_show_mode"></i></p>${plusSetting}`;
            
            var settingCha = document.createElement('div');
            settingCha.classList = "hs-link-setting animated fadeIn";
            settingCha.id = "hs_link_show_setting";
            settingCha.style.display = "none";
            settingCha.innerHTML = `<div class="hs-link-setting-lable animated slideInUp"><div class="hs-lsl-header">${m.translate.title} <i class="${m.close}" onclick="(new Hash.toolitop()).closeSetting()"></i></div><div class="hs-lsl-main">${HSetting}</div><div class="hs-lsl-main" id="hs_lsl_main"></div></div>`;
            
            if (document.body !== null) {
                document.body.appendChild(settingCha);
            } else {
                console.warn( eventMessage['append_setting'] );
            }
        }

        this.openSetting = (m={}) => {
            m.do = gdsTool(m.do, function() {}, 'function');
            m.do.call(this);

            var i = selectId('hs_link_show_setting');
            if (i !== null) {
                addClass(i, ['fadeIn']);
                removeClass(i, ['fadeOut']);
                Show(i);

                return true;
            } else {
                console.warn( eventMessage['open_setting'] );

                return false;
            }
        }

        this.addSetting = (m={}) => {
            m.new = gdTool(m.new, '');
            var i = selectId('hs_lsl_main');
            if (i !== null) {
                i.innerHTML += m.new;
                return true;
            } else {
                console.warn( eventMessage['open_setting'] );
                return false;
            }
        }

        this.closeSetting = (m={}) => {
            m.do = gdsTool(m.do, function() {}, 'function');
            m.do.call(this);

            var i = selectId('hs_link_show_setting');
            if (i !== null) {
                addClass(i, ['fadeOut']);
                removeClass(i, ['fadeIn']);
                var seLoad = setTimeout(function() {
                    Hide(i);
                    window.clearTimeout(seLoad);
                }, 700);

                return true;
            } else {
                console.warn( eventMessage['open_setting'] );

                return false;
            }
        }

        this.lightMode = (m={}) => {
            return setModeLight();
        }

        this.darkMode = (m={}) => {
            return setModeDark();
        }

        this.showEnable = (m={}) => {
            return setStatusYes();
        }

        this.showDisable = (m={}) => {
            return setStatusNo();
        }

        this.getStatus = (m={}) => {
            var cName = 'hash_js_toolitop_status';
            if (haveCookie(cName)) {
                return getCookie(cName);
            }

            return null;
        }

        this.getMode = (m={}) => {
            var cName = 'hash_js_toolitop_mode';
            if (haveCookie(cName)) {
                return getCookie(cName);
            }

            return null;
        }

        this.loadMode = (m={}) => {
            m.mode = gdsTool(m.mode, 'light', 'string');
            m.mode = m.mode.toLowerCase();
            var cName = 'hash_js_toolitop_mode';

            if (m.mode == 'light' || m.mode == 'dark') {
                if (!haveCookie(cName)) {
                    if (getCookie(cName) !== m.mode) {
                        setCookie(cName, m.mode, 30);
                    }
                }
            } else {
                console.warn( eventMessage['load_mode'].replace('%s', m.mode) );
            }

            if (haveCookie(cName)) {
                var modeTool = getCookie(cName);
                modeTool = modeTool == 'light' || modeTool == 'dark' ? modeTool : 'yes';
                if (modeTool == 'light') {
                    setModeLight();
                } else {
                    setModeDark();

                    var plLoad = 0;
                    var plSet = setInterval(function() {
                        plLoad ++;
                        var theMain = document.getElementsByClassName('hs-overley');

                        if (plLoad >= 5 || theMain.length !== 0) {
                            for(var h=0 ; h<theMain.length ; h++) {
                                addClass(theMain[h], ['hs-night']);
                            }
                            window.clearInterval(plSet);
                        }

                    }, 100);
                }
            }

            return true;
        }

        this.loadStatus = (m={}) => {
            m.status = gdsTool(m.status, 'yes', 'string');
            m.status = m.status.toLowerCase();
            var cName = 'hash_js_toolitop_status';

            if (m.status == 'yes' || m.status == 'no') {
                if (!haveCookie(cName)) {
                    if (getCookie(cName) !== m.status) {
                        setCookie(cName, m.status, 30);
                    }
                }
            } else {
                console.warn( eventMessage['load_status'].replace('%s', m.status) );
            }

            if (haveCookie(cName)) {
                var statusTool = getCookie(cName);
                statusTool = statusTool == 'yes' || statusTool == 'no' ? statusTool : 'yes';
                if (statusTool == 'yes') {
                    setStatusYes();
                } else {
                    setStatusNo();

                    var plLoad = 0;
                    var plSet = setInterval(function() {
                        plLoad ++;
                        var theMain = document.getElementsByClassName('hs-overley');

                        if (plLoad >= 5 || theMain.length !== 0) {
                            for(var h=0 ; h<theMain.length ; h++) {
                                theMain[h].innerHTML = "";
                                addClass(theMain[h], ['hidden-all']);
                            }
                            window.clearInterval(plSet);
                        }

                    }, 100);
                }
            }

            return true;
        }

    }


    var HashTool = Tool;

    if ( typeof Hash !== 'undefined' ) {

        if ( typeof Popper !== 'undefined' ) {

            var LoadHashNewTool = false;

            if (typeof define === 'function' && define.amd) {
                define(HashTool);
                LoadHashNewTool = true;
            } else {
                window.Hash.toolitop = HashTool;
                LoadHashNewTool = true;
            }
        
            if (typeof exports === 'object') {
                module.exports = HashTool();
                LoadHashNewTool = true;
            }
    
            if ( LoadHashNewTool ) {
                window.addEventListener('load', loadElementsTool);
            }

        } else {
            console.error( eventMessage['load_popper'] );
        }

    } else {
        console.error( eventMessage['load_error'] );
    }

})(window)