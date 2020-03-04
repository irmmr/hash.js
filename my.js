
if (Hash.ready) {
    
    var inf = new Hash.info(),
        adn = inf.addons;

    
    if (adn.spa) {

        var spa = new Hash.spa(),
            lib = new Hash.lib();

            function setContent(title, description, buttons = [], val = '') {
    
                var butt = ``;
                for (var i=0 ; i<buttons.length ; i++) {
                    butt += `<h-link link="${buttons[i].link}" h-top="${buttons[i].top}"><button>${buttons[i].text}</button></h-link>`;
                }
            
                return `
                    <h1>${title}</h1>
                    <h5>${description}</h5>
                    <div class="space-2"></div>
                    ${butt}
                    <div class="space-3"></div>
                    <div class="content">${val}</div>`;
            }
        
        spa.app({
            el : 'app',
            def : 'start',
            component : {
                'start' : {
                    main : setContent('Hash.js', 'Simple and useful javascript library',
                        [{text : 'View demo', link : 'demo', top : false}, {text : 'Documents', link : 'documents', top : false },
                        {text : 'Download', link : 'download', top : false }, {text : 'Contact', link : 'contact', top : false }],
                        `<div class="txt"><b>Welcome: </b> Hash.js is a simple and useful library for javascript. like all js libraries.</div>
                        <div class="txt">You can use that for append a simple spa and router with javascript. it's mostly use for manage and check page <b>hash</b>.</div>
                        <div class="txt">Hash.js main script is contain "Hash.event", "Hash.lib", "Hash.info", "Hash.el".</div>
                        <div class="txt"><b>Hash.event: </b> It's used for add an listener for page hash change.</div>
                        <div class="txt"><b>Hash.lib: </b> This part contain all functions for manage and controll page hash.</div>
                        <div class="txt"><b>Hash.el: </b> This part contain some functions for replace and create elements.</div>
                        <div class="txt"><b>Hash.info: </b> It's show library version and plugins status.</div>
                        <div class="txt">for more informations you can read douments!</div>
                        <h-link link="start/step/1" h-top="false"><button class="active">Start - step 1</button></h-link>`
                    ),
                    title : 'Hash.js | javascript library'
                },
                'start/step/1' : {
                    main : setContent('Step 1', 'For start using hash js',
                        [{text : 'Back to home', link : 'start', top : false}],
                        `<div class="txt"><b>Download: </b> For using hash.js, you first should download lastest version of this library. if you intrested to hash.js, you can go to github and download it or use this:</div>
                        <h-link link="download" h-top="true"><button class="dl">Download</button></h-link>
                        <h-link link="start/step/2" h-top="false"><button class="active">Next step</button></h-link>`
                    ),
                    title : 'Step 1 for start | javascript library'
                },
                'start/step/2' : {
                    main : setContent('Step 2', 'For start using hash js',
                        [{text : 'Back to home', link : 'start', top : false}],
                        `<div class="txt"><b>Read documents: </b>  First you must read hash.js documents that's have very simple write type. you can use 'document' page for this step!</div>
                        <h-link link="start/step/1" h-top="false"><button class="active">Prev step</button></h-link>
                        <h-link link="documents" h-top="true"><button class="dl">Documents</button></h-link>
                        <h-link link="start/step/3" h-top="false"><button class="active">Next step</button></h-link>`
                    ),
                    title : 'Step 1 for start | javascript library'
                },
                'start/step/3' : {
                    main : setContent('Step 3', 'For start using hash js',
                        [{text : 'Back to home', link : 'start', top : false}],
                        `<div class="txt"><b>Create project: </b> Now you can use hash.js in your projects! easy and simple! befor that you must read this notices:</div>
                        <div class="txt"><font color="red">(1) </font>This library is just for simple SPA and for use the main spa projects you must use Vue, Angular, React and other.</div>
                        <div class="txt"><font color="red">(2) </font>You can't use Hash.js in node!</div>
                        <h-link link="start/step/2" h-top="false"><button class="active">Prev step</button></h-link>`
                    ),
                    title : 'Step 1 for start | javascript library'
                },
                'demo' : {
                    main : setContent('Demo', 'You can see all library demoes here',
                        [{text : 'Home', link : 'start', top : false}],
                        `<div class="txt"><b>Welcome: </b> Hash.js is a simple and useful library for javascript. like all js libraries.</div>`
                    ),
                    title : 'View demo | javascript library'
                },
                'contact' : {
                    main : setContent('Contact', 'Contact us in 24h',
                        [{text : 'Home', link : 'start', top : false}],
                        `<div class="txt"><b>Hi: </b> if you have any questions, you can tell us and we answered you fastly! for send message enter your informations.</div>
                        <form>
                            <label for="name" style="font-weight:700">What's your name?</label> <br />
                            <input type="text" id="st_name">
                            <br />
                            <label for="name" style="font-weight:700">Enter subject:</label> <br />
                            <input type="text" id="st_subject">
                            <br />
                            <label for="name" style="font-weight:700">Write message:</label> <br />
                            <textarea id="st_text"></textarea>
                            <br />
                            <button class="active" onclick="sendMessage()">Send</button>
                        </form>`
                    ),
                    title : 'Contact us | Hash.js'
                },
                'documents' : {
                    main : setContent('Documents', 'Read documents and start with us',
                    [{text : 'Home', link : 'start', top : false}, {text : 'ver 1.0', link : 'documents/ver/1.0', top : true},
                    {text : 'ver 2.0', link : 'documents/ver/2.0', top : true}, {text : 'ver 3.0', link : 'documents/ver/3.0', top : true}],
                    `<div class="txt"><b>Hi: </b> if you have any questions, you can tell us and we answered you fastly! for send message enter your informations.</div>`
                    ),
                    title : 'Document | Hash.js'
                }
            },
            error : {
                '404' : {
                    main : setContent('404', 'Your page not found in our server',
                    [{text : 'Back to home', link : 'start', top : false}],
                    `<div class="txt"><b>Notice: </b>we can't find this page please try again or use F5. You can tell us if you need this page informations. check the address! you searching for this page</div><!--h:error-->
                    <label style="font-weight:700">Page</label><br /><input type="text" id="page_u" onmouseover="getNowHash()"><br />
                    <button class="active" onclick="goPage()">Go there</button>`),
                    title : `page does not exits`
                }
            },
            block : [
                'contact/message/name/{any}/mess/{any}/{any}'
            ]
        });

        spa.router({
            router : 'contact/message/name/{any}/mess/{any}/{any}',
            do : function(data) {
                var nm = unescape(data[0]),
                    sb = unescape(data[1]),
                    ms = unescape(data[2]),
                    el = document.getElementById('app');

                var sent = true;

                var sentContent = setContent('Sent', 'Your message succesfully sent',
                [{text : 'Home', link : 'start', top : false}, {text : 'Send new', link : 'contact', top : false}],
                `<div class="txt"><b>Status: </b><font color=green>message sent! </font>we answer you in next 24h. please check your email.</div>
                <div class="txt"><b>Name: </b>${nm} (${nm.length})</div>
                <div class="txt"><b>Subject: </b>${sb} (${sb.length})</div>
                <div class="txt"><b>Message: </b>${ms} (${ms.length})</div>`),
                failedContent = setContent('Failed', 'Your message not sent',
                [{text : 'Home', link : 'start', top : false}, {text : 'Send new', link : 'contact', top : false}],
                `<div class="txt"><b>Status: </b><font color=red>message not sent! </font>we answer you in next 24h. please check your email.</div>
                <div class="txt"><b>Name: </b>${nm} (${nm.length})</div>
                <div class="txt"><b>Subject: </b>${sb} (${sb.length})</div>
                <div class="txt"><b>Message: </b>${ms} (${ms.length})</div>`);

                el.innerHTML = sent ? sentContent : failedContent;
            }
        });

    }


    // Loading
    if (adn.load) {

        var loa = new Hash.load(),
            loading = document.getElementById('loading'),
            loadingRole = document.getElementById('loading_role');        

        var loadInt = null;

        function startLoading() {

            // Set loading attr
            if (!loading.hasAttribute('now-loading')) {

                //Block
                loading.style.display = "block";

                //Set attr
                loading.setAttribute('now-loading', 'yes');

                //Check and set style
                loadingRole.style.transition = "0.5s all";
                loadingRole.style.width = "0%";
                loadingRole.style.height = "7px";
    
                //Load timeOut
                loadInt = setInterval(function() {
                    var nowW = Number(loadingRole.style.width.replace('%', ''));
                    if (nowW < 100) {
                        var wid = nowW + 5 + "%";
                        loadingRole.style.width = wid;
                    } else {
                        window.clearInterval(loadInt);
                    }
                }, 100);

            }


        }

        function endLoading() {

            if (loading.hasAttribute('now-loading')) {

                //Set timeOut
                var timeOutLoad = setTimeout(function() {
                    window.clearInterval(loadInt);
                    loadingRole.style.width = "100%";
                    var lo = setTimeout(function() {

                        //Delete attr
                        loading.removeAttribute('now-loading');

                        //Set style
                        loadingRole.style.transition = "0s all";
                        loadingRole.style.width = "0";
                        loadingRole.style.height = "0";

                        //None
                        loading.style.display = "none";

                        //Clear this timeOut
                        window.clearTimeout(lo);

                    }, 600);
                    window.clearTimeout(timeOutLoad);
                }, 200);

            }

        }

        loa.page({
            load : startLoading,
            do : endLoading
        });

        loa.component({
            app : 'app',
            load : startLoading,
            do : endLoading
        });

    }

    //Other functions
    function sendMessage() {
        var name = document.getElementById('st_name').value,
            sub = document.getElementById('st_subject').value,
            mess = document.getElementById('st_text').value;

        if (name !== '' && sub !== '' && mess !== '') {

            lib.set({
                val : `contact/message/name/${escape(name)}/mess/${escape(sub)}/${escape(mess)}`
            });

        } else {
            alert('Please enter all informations!');
        }
    }

    function goPage() {
        var pg = document.getElementById('page_u').value;

        if (pg !== '') {
            lib.set({
                val : pg
            });
        } else {
            document.getElementById('page_u').placeholder = "Enter somthing...";
        }
    }

    function getNowHash() {
        var nh = lib.get(true),
            el = document.getElementById('page_u');
        
        if (el.value == '') {
            el.value = nh;
        }
    }


}