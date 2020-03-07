# Document
Here you can read some of `Hash.js` documentation.

# Creating object
For create a constructor you must use that `new` in `javascript`.
```javascript
var ob = new Hash.lib(); // Here i use main library
```

# Hash.lib
`set` this used for set new hash to page.

| object | type | Assumption | description |
| ------ | ------ | ------ | ------ |
| val | string | nothing | It is used for the hash value |

```javascript
// create an object from Hash.lib
var ob = new Hash.lib();
// use set() in Hash.lib()
ob.set({
   val : 'hello' 
});
```
`get` this used for set new hash to page.

| argument | type | Assumption | description |
| ------ | ------ | ------ | ------ |
| without | boolean | true | It is used for hash first sharp status |

```javascript
// create an object from Hash.lib
var ob = new Hash.lib();
// use get() in Hash.lib(). This return a value.
var hash = ob.get(true); // with first sharp or not?
// use page hash
alert("Page hash is " + hash);
```
`have` this checks if page have any hash.

| argument | type | Assumption | description |
| ------ | ------ | ------ | ------ |
| include | string | nothing | It is used for check hash |

```javascript
// create an object from Hash.lib
var ob = new Hash.lib();
// use have() in Hash.lib(). This return a boolean.
if (ob.have()) {
    alert("This page have hash.");
}
// or
if (ob.have('hello')) {
    alert("This page have 'hello' in itself.");
}
```

`remove` This removes some words from the page hash.

| object | type | Assumption | description |
| ------ | ------ | ------ | ------ |
| words | array | [] | It is used for enter words (remove from hash) |

```javascript
// create an object from Hash.lib
var ob = new Hash.lib();
// use remove()
ob.remove({
    words : ['bad', 'babe'] 
});
```

`lock` by this user can't change hash of the page.
```javascript
// create an object from Hash.lib
var ob = new Hash.lib();
ob.lock();
```

`clear` this clears the hash of the page.

| object | type | Assumption | description |
| ------ | ------ | ------ | ------ |
| sharp | boolean | true | If true, page hash clear plus first # |

```javascript
// create an object from Hash.lib
var ob = new Hash.lib();
ob.clear();
// or
ob.clear({
   sharp : false // remove # or not? 
});
```

# Hash.el

`replace` This is a universal replacement.

| object | type | Assumption | description |
| ------ | ------ | ------ | ------ |
| text | string | nothing | It is main text for replacement |
| replace | array[object] | nothing | It is an array for replace |
| replace => from | string | null | From what? |
| replace => to | string | null | To what? |

```javascript
// create an object from Hash.el
var ob = new Hash.el();
// do replace. This returned a value.
var replaced = ob.replace({
    text : 'Nothing here for us!',
    replace : [
        {from : 'us', to : 'you'},
        {from : '!', to : '.'},
        {from : ' ', to : '-'}
    ]
});
// Print 'replaced'
document.write(replaced); //Nothing-here-for-you.
```

# Hash.info
`version` This used for get library version.
```javascript
// create an object from Hash.info
var ob = new Hash.info(),
    // version information. (string)
    ver = ob.version;
// alert lib version
alert("This library version: " + ver);

```

`addons` This used for check plugins status.

| output | type | Assumption | description |
| ------ | ------ | ------ | ------ |
| load | boolean | false | If load library is ready! |
| server | boolean | false | If server library is ready! |
| spa | boolean | false | If spad library is ready! |

```javascript
// create an object from Hash.info
var ob = new Hash.info(),
    // addons(plugins) status. (object)
    adn = ob.addons;
/*
adn output: {
    load : boolean,
    spa : boolean,
    server : boolean
}
*/
if (adn.load) {
    // Hash.load plugin is ready!
}

if (adn.spa) {
    // Hash.spa plugin is ready!
}

if (adn.server) {
    // Hash.server plugin is ready!
}

```

# Hash.spa
`app` It makes a spa in page.
```javascript
// create an object from Hash.spa
var ob = new Hash.spa();
// use app() from Hash.spa
ob.app({
    // element id
	el : 'app',
	// main page component
	def : 'home',
	// spa componenets
	component : {
		'home' : {
			title : 'home (welcome) | spa app', // page title
			main : 'welcome to home!' // element html
		},
		'home/start' : {
			title : 'home start | spa app',
			main : 'start working with us, this href is {href:get}',
		 	do : function() { // spa function
				alert('start now!');
		 	}
	  	}
	},
	// set error (404)
	error : {
		'404' : {
			main : 'page not found!',
			title : 'page "{hash:get}" not found | spa app',
		}
	},
	// routers for block
	block : [
	    'page/{any}'
	]
});
```
>  In `title`, `main` for getting the hash of page or page href, you can use `{hash:get}` or `{href:get}`.

`router` It makes a router in page.
```javascript
// create an object from Hash.spa
var ob = new Hash.spa();
// use router
ob.router({
    router : 'page/{any}',
    do : function(data, info) {
        
        // getting data in array for every '{any}'. in this router address we have 1 '{any}' router.
        var page = data[0];
        
        // getting info
        var hash = info.hash,
            rout = info.router;
            
        // using them
        alert("Now you are in page " + page);
        
    }
});
```
>  For run `router` in this spa, you must add all routers in `block`.

`Spa link element` Spa library uses a custom element for links that set hash. `h-link`
```css
h-link {
    cursor: pointer;
}
```
```html
<h-link link="download" h-top="true">Download file</h-link>
```
| attr | type | description |
| ------ | ------ | ------ |
| link | string (hash) | Link address : This can be a router or spa address |
| h-top | boolean (true,false) | Scroll status : If true, the scrollbar goes up when clicked. |

# Hash.server
`ajax` Using for ajax connection.
```javascript
// create an object from Hash.server
var ob = new Hash.server();
// use ajax
ob.ajax({
    // set ajax url
    url : 'https://site.com/page/raw',
    // set ajax type | get or post
    type : 'post',
    // set data for send
    data : {
        token : '12Hn',
        message : 234
    },
    // make result actions
    result : {
        // success
        success : function(res) {
            alert("Success! result is " + res);
        },
        // error
        error : function(resCode) {
            alert("Failed. result code: " + resCode);
        }
    }
});
```

# Hash.load
`page` Used for page loading.
```javascript
// create an object from Hash.load
var ob = new Hash.load();
// use for page
ob.page({
    // when loading is started
    load : function(e) {
        // document.getElementById('loading').style.display = 'block'
        console.log("Loading started in " + e.startTime);
    },
    // when page loaded
    do : function(e) {
        // document.getElementById('loading').style.display = 'none'
        var lt = e.loadTime, // get load time
            cl = e.checkLen, // get check time
            sl = e.startLoad, // get start time
            el = e.endLoad, // get end time
            status = e.load; // get loading status
        console.log(`Page loaded in ${lt} ms. loading started in ${sl} and ended in ${el}. Loading status is ${status} in ${cl} time check.`);
    }
});
```

`component` Used for page loading.
```javascript
// create an object from Hash.load
var ob = new Hash.load();
// use for spa
ob.component({
    // set app id
    app : 'app',
    // when loading is started
    load : function(e) {
        // document.getElementById('loading').style.display = 'block'
        console.log(`Loading "${e.hash}" page is started in ${e.startTime}`);
    },
    // when page loaded
    do : function(e) {
        // document.getElementById('loading').style.display = 'none'
        var lt = e.loadTime, // get load time
            cl = e.checkLen, // get check time
            sl = e.startTime, // get start time
            el = e.endTime, // get end time
            status = e.load, // get loading status
            hash = e.hash;
        console.log(`Page "${hash}" is loaded in ${lt} ms. loading started in ${sl} and ended in ${el}. Loading status is ${status} in ${cl} time check.`);
    }
});
```
>  `component` used with `Hash.spa`.

# Hash.ready
It only returns and check library status.
```javascript
if (Hash.ready) {
    // Hash library is ready!
}
```

# Hash.event
It works like addEventListener!
```javascript
Hash.event('change', function() {
    alert('The hash of the page is changed!');
});
```
*  **change** : Runs during the hash of page change

# Example use
>  For checking plugins, you can use `Hash.info`

`Example 1`

```javascript
var lib = new Hash.lib(),
    inf = new Hash.info(),
    ver = Number(inf.version);

if (ver >= 1.2) {
    lib.set({
        val : 'start/document' 
    });
} else {
    console.warn(`Please update hash.js!`);
}
```

`Example 2`

```html
<div id="loading" style="display:none">Loading ...</div>
```

```javascript
var lib = new Hash.lib(),
    inf = new Hash.info(),
    adnLoad = inf.addons.load,
    loading = document.getElementById('loading');
    
function startLoading() {
    loading.style.display = 'block';
}

function endLoading(e) {
    loading.style.display = 'none';
    console.log(`page loaded in ${e.loadTime} ms`);
}
    
if (adnLoad) {
    var loa = new Hash.load();
    loa.page({
        load : startLoading,
        do : endLoading
    });
} else {
    console.warn(`"Loader" is not ready!`);
}
```

`Example 3`

```html
<div id="file"></div>
```

```javascript
var lib = new Hash.lib(),
    inf = new Hash.info(),
    adnServ = inf.addons.server,
    file = document.getElementById('file');
    
if (adnServ) {
    var ser = new Hash.server();
    ser.ajax({
        url : 'file.txt',
        type : 'GET',
        result : {
            success : function(res) {
                file.innerHTML = res;
            },
            error : function(code) {
                file.innerHTML = `File get failed! code: ${code}`;
            }
        }
    });
} else {
    file.innerHTML = `Server is not ready! try again later.`;
}
```

`Example 4`


```javascript
var lib = new Hash.lib();

function checkReload() {
    if (lib.have()) {
        var hsh = lib.get(true).toLowerCase();
    
        if (hsh == 'reload') {
            location.reload(true);
        }
    }
}

checkReload(), Hash.event('change', checkReload);

```

`Example 5`


```javascript
var lib = new Hash.lib(),
    inf = new Hash.info(),
    adnSpa = inf.addons.spa;
    
if (adnSpa) {
    
    var sp = new Hash.spa();
    sp.router({
        router : 'go/{any}/time/{any}',
        do : function(d) {
            
            var loc = unescape(d[0]),
                time = Number(d[1]);
                
            // time in S
            var fTime = Number.isNaN(time) ? 0 : time;
            
            var goL = setTimeout(function() {
            
                window.location.href = loc;
                window.clearTimeout(goL);
                
            }, fTime*1000);
            
        }
    });
    
}

```


`Example 6`

```javascript
var lib = new Hash.lib();

if (lib.have())
    lib.clear();
```

`Example 7`

```html
<!-- in spa library -->
<h-link link="home" h-top="false">Home</h-link>
<h-link link="doc" h-top="true">Document</h-link>
<h-link link="download/2234/file/48884452345">Download</h-link>
```

