function exit( status ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // +      input by: Paul
    // +   bugfixed by: Hyam Singer (http://www.impact-computing.com/)
    // +   improved by: Philip Peterson
    // +   bugfixed by: Brett Zamir (http://brettz9.blogspot.com)
    // %        note 1: Should be considered expirimental. Please comment on this function.
    // *     example 1: exit();
    // *     returns 1: null

    var i;

    if (typeof status === 'string') {
        alert(status);
    }

    window.addEventListener('error', function (e) {e.preventDefault();e.stopPropagation();}, false);

    var handlers = [
        'copy', 'cut', 'paste',
        'beforeunload', 'blur', 'change', 'click', 'contextmenu', 'dblclick', 'focus', 'keydown', 'keypress', 'keyup', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'resize', 'scroll',
        'DOMNodeInserted', 'DOMNodeRemoved', 'DOMNodeRemovedFromDocument', 'DOMNodeInsertedIntoDocument', 'DOMAttrModified', 'DOMCharacterDataModified', 'DOMElementNameChanged', 'DOMAttributeNameChanged', 'DOMActivate', 'DOMFocusIn', 'DOMFocusOut', 'online', 'offline', 'textInput',
        'abort', 'close', 'dragdrop', 'load', 'paint', 'reset', 'select', 'submit', 'unload'
    ];

    function stopPropagation (e) {
        e.stopPropagation();
        // e.preventDefault(); // Stop for the form controls, etc., too?
    }
    for (i=0; i < handlers.length; i++) {
        window.addEventListener(handlers[i], function (e) {stopPropagation(e);}, true);
    }

    if (window.stop) {
        window.stop();
    }

    throw '';
}


typeof Hash !== 'undefined' ? Hash.ready ? null : exit("HashJs is not ready") : exit("can't load HashJs");


var App = new Hash.SPA({
    el: '#app',
    defualt: 'page',
    components: {
        'home': {
            main: 'Welcome!',
            title: 'Home Direct',
            loop: {
                'page': {
                    main: 'New Page',
                    title: 'Page for me',
                    loop: {
                        'vue': {
                            main: 'Vue app',
                            title: 'MY Vue',
                            loop: {
                                'cli': {
                                    main: 'Vue CLI App',
                                    title: 'Just CLI',
                                },
                                'mvc': {
                                    main: 'MVC App',
                                    title: 'mvc for me !'
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    errors: {
        'not_found': {
            render: 'error 404 <!-- My Error -->',
            title: 'Not Found'
        }
    },
    router: [
        'page/{any}'
    ]
});

App.router({
    el: '#app',
    Router: 'page/{any}',
    render: 'In page {HS:1} {HS:1}',
    title: 'Page {HS:1} | 10Mix'
});

//Loader style
document.getElementById('loader').style.cssText = "position:fixed;bottom:2px;left:7px;width:20%;float:right";

function addLoader(text, color="white", bg="rgba(0,0,0,0.8)") {
    let appId = `loader_${Date.now()*Math.ceil(Math.random())}`;
    document.getElementById('loader').innerHTML = `<h-block id="${appId}" hs-text-align="center" hs-width="calc(100% - 30px)" hs-direction="ltr" hs-padding="15px" hs-margin-bottom="8px" hs-float="right" hs-font-size="19px" hs-box-shadow="0 0 15px rgba(0, 0, 0, 0.05)" hs-border-radius="3px" hs-background-color="${bg}" hs-color="${color}">${text}</h-block>`;
    return appId;
}

var hx = new Hash.info();

if ( hx.addons.load ) {

    var loadComponent = new Hash.load();
    loadComponent.component({
        app : 'app',
        load : function(e) {
            addLoader(`Loading on <b>${e.hash}</b> <br /> started in <b>${e.startLoad}</b>`);
            //console.log( `Loading | ${e.hash}, ${e.startLoad}` );
        },
        do : function(e) {
            addLoader(`<b>${e.hash}</b> succesfully loaded <br />Component loaded in <b>${e.loadTime} ms</b><br />Start: <b>${e.startLoad}</b><br />End: <b>${e.endLoad}</b><br /><b>${e.checkLen}</b> time checked!`, 'white', 'green');
            //console.log( `Loaded on ${e.hash}, ${e.startLoad}, ${e.endLoad}, ${e.checkLen}, ${e.loadTime}` );
        },
        error : "<!-- My Error -->",

    });

}

Hash.event('change', function() {
    //Empty
});

