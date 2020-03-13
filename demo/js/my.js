/* 
* HashJs demo my.js
*/

if (Hash.ready) {
    
    var inf = new Hash.info(),
        adn = inf.addons;

    
    if (adn.spa) {

        var spa = new Hash.spa(),
            lib = new Hash.lib(),
            exp = new spa.exports();
        

        function setContent(title, description, buttons = [], val = '') {
            var butt = ``;
            for (var i=0 ; i<buttons.length ; i++) {
                butt += `<h-link link="${buttons[i].link}" h-top="${buttons[i].top}"><button><img src="icon/${buttons[i].icon}" width="24px" style="float:left;margin-right:10px"> ${buttons[i].text}</button></h-link>`;
            }
            var icon = `<img src="./../logo/logo.png" width="100px">`;
            return `<h1>${icon}${title}${icon}</h1><h5>${description}</h5><div class="space-2"></div>${butt}<div class="space-3"></div><div class="content">${val}</div>`;
        }
        
        spa.app({
            el : 'app',
            def : 'start',
            component : {
                'start' : {
                    main : setContent('Hash.js', 'Simple and useful javascript library',
                        [
                            {text : 'View demo', link : 'demo', top : false, icon : 'demo.png'},
                            {text : 'Documents', link : 'documents', top : false, icon : 'document.png'},
                            {text : 'Download', link : 'download', top : false, icon : 'download.png'},
                            {text : 'Contact', link : 'contact', top : false, icon : 'phone.png'}
                        ],
                        `<div class="txt"><b>Welcome: </b> Hash.js is a simple and useful javascript library! it's just for fun and the truth is that Hash.js is not very powerful. This library don't need Node and Node don't need this library!
                        Hash.js have 4 main parts! A main library plus 3 plugin. This plugins used for load, server(ajax), spa.</div>
                        <h-link link="start/step/1" h-top="false"><button class="active">Start - step 1</button></h-link>`
                    ),
                    title : 'Hash.js | javascript library'
                },
                'start/step/1' : {
                    main : setContent('Step 1', 'For start using hash js',
                        [
                            {text : 'Back to home', link : 'start', top : false, icon : 'logo.png'}
                        ],
                        `<div class="txt"><b>Download: </b> For using hash.js, you first should download latest version of this library. if you interested to hash.js, you can go to github and download it or use this:</div>
                        <h-link link="download" h-top="true"><button class="dl">Download</button></h-link>
                        <h-link link="start/step/2" h-top="false"><button class="active">Next step</button></h-link>`
                    ),
                    title : 'Step 1 for start | javascript library'
                },
                'start/step/2' : {
                    main : setContent('Step 2', 'For start using hash js',
                        [
                            {text : 'Back to home', link : 'start', top : false, icon : 'logo.png'}
                        ],
                        `<div class="txt"><b>Read documents: </b> First you must read hash.js documents that have very simple syntax. you can use 'document' page for this step!</div>
                        <h-link link="start/step/1" h-top="false"><button class="active">Prev step</button></h-link>
                        <h-link link="documents" h-top="true"><button class="dl">Documents</button></h-link>
                        <h-link link="start/step/3" h-top="false"><button class="active">Next step</button></h-link>`
                    ),
                    title : 'Step 1 for start | javascript library'
                },
                'start/step/3' : {
                    main : setContent('Step 3', 'For start using hash js',
                        [
                            {text : 'Back to home', link : 'start', top : false, icon : 'logo.png'}
                        ],
                        `<div class="txt"><b>Create project: </b> Now you can use hash.js in your projects! easy and simple!</div>
                        <h-link link="start/step/2" h-top="false"><button class="active">Prev step</button></h-link>`
                    ),
                    title : 'Step 1 for start | javascript library'
                },
                'demo' : {
                    main : setContent('Demo', 'You can see all library demoes here',
                        [
                            {text : 'Back to home', link : 'start', top : false, icon : 'logo.png'}
                        ],
                        `<div class="txt"><b>Welcome: </b> Hash.js is a simple and useful library for javascript. like all js libraries.</div>`
                    ),
                    title : 'View demo | javascript library'
                },
                'contact' : {
                    main : setContent('Contact', 'Contact us in 24h',
                        [
                            {text : 'Home', link : 'start', top : false, icon : 'logo.png'}
                        ],
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
                    [
                        {text : 'Home', link : 'start', top : false, icon : 'logo.png'}
                    ],
                    `<div class="txt"><b>DOC.md: </b> For read documents, you must read <b>DOC.md</b> file in Gitlab or Github.</div>`
                    ),
                    title : 'Document | Hash.js'
                },
                'download' : {
                    main : setContent('Download', 'Download library for start using',
                    [
                        {text : 'Home', link : 'start', top : false, icon : 'logo.png'}
                    ],
                    `<div class="txt"><b>Help: </b> for using hash.js, you can clone it from github or gitlab. If you do not want to clone this project, you must download it in zip format.</div>
                    <b>From GitLab</b> <br />
                    <input type="text" readonly value="https://gitlab.com/irmmr/hash.js.git">
                    <a href="https://gitlab.com/irmmr/hash.js" target="_blank"><button class="dl">Download</button></a>
                    <br /> <b>From GitHub</b> <br />
                    <input type="text" readonly value="https://github.com/irmmr/hash.js.git">
                    <a href="https://github.com/irmmr/hash.js" target="_blank"><button class="active">Download</button></a>`
                    ),
                    title : 'Document | Hash.js'
                }
            },
            error : {
                '404' : {
                    main : setContent('404', 'Your page not found in our server',
                    [
                        {text : 'Back to home', link : 'start', top : false, icon : 'logo.png'}
                    ],
                    `<div class="txt"><b>Notice: </b>we can't find this page please try again or use F5. You can tell us if you need this page informations. check the address! you searching for this page</div><!--h:error-->
                    <label style="font-weight:700">Page</label><br /><input type="text" id="page_u" value="{hash:get}"><br />
                    <button class="active" onclick="goPage()">Go there</button>`),
                    title : `page "{hash:get}" does not exits`
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
                    ms = unescape(data[2]);

                // it's just for demo

                var sentContent = setContent('Sent', 'Your message succesfully sent',
                [{text : 'Back to home', link : 'start', top : false, icon : 'logo.png'}, {text : 'Send new', link : 'contact', top : false, icon : 'send.png'}],
                `<div class="txt"><b>Status: </b><font color=green>message sent! </font>we answer you in next 24h. please check your email.</div>
                <div class="txt"><b>Name: </b>${nm} (${nm.length})</div>
                <div class="txt"><b>Subject: </b>${sb} (${sb.length})</div>
                <div class="txt"><b>Message: </b>${ms} (${ms.length})</div>`);

                exp.render({
                    el : 'app',
                    render : sentContent
                });

                exp.title(`"${sb}" message sent`);

            }
        });

    }


    // Loading
    if (adn.load) {

        // Append loading
        var loading_app = document.createElement('div');
		loading_app.id = "loading";
		loading_app.innerHTML = `<div id="loading_role"></div>`;
		document.body.appendChild(loading_app);

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