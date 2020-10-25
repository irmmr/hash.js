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
| 0 | boolean | true | It is used for hash first sharp status |

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
| 0 | string | nothing | It is used for check hash |

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

`ref` This receives page reference.

| argument | type | Assumption | description |
| ------ | ------ | ------ | ------ |
| 0 | string | nothing | It is used for check reference |

```javascript
// create an object from Hash.lib
var ob = new Hash.lib();
// use ref() in Hash.lib(). This return a string.
var ref = ob.ref();
// or . this return a boolean
if (ob.ref('https://google.com/raw')) {
    alert("Ok);
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

| object | type | Assumption | description |
| ------ | ------ | ------ | ------ |
| el | string | nothing | You must enter spa element id |
| def | string (a component) | nothing | It is default component |
| component | array object | nothing | All of components for use |
| component => main | string | nothing | Rendering html codes |
| component => title | string | nothing | Page title |
| component => do | function | nothing | Page function for run |
| error | array object | nothing | Page error for spa |
| error => main | string | nothing | Rendering html codes |
| error => title | string | nothing | Page title |
| error => do | function | nothing | Page function for run |
| block | array | nothing | All routers addresses that must be blocked |

**Page errors**
*  `404` : This include page 404 error and page not found.

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

| object | type | Assumption | description |
| ------ | ------ | ------ | ------ |
| router | string | nothing | The router address |
| do | function(data, info) | nothing | The router function that must be run |

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

| object | type | Assumption | description |
| ------ | ------ | ------ | ------ |
| url | string | nothing | Page url for connect |
| type | string | nothing | The ajax method (POST or GET) |
| data | array object | nothing | The connection data for send |
| result | object | nothing | Manage connection result |
| result => success | function(result) | nothing | Connect function when 'success' |
| result => error | function(code) | nothing | Connect function when 'error' |

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

| object | type | Assumption | description |
| ------ | ------ | ------ | ------ |
| load | function(info) | nothing | Function when loading is started |
| do | function(info) | nothing | Function when loading is ended |

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

| object | type | Assumption | description |
| ------ | ------ | ------ | ------ |
| app | string | nothing | Spa app id |
| load | function(info) | nothing | Function when loading is started |
| do | function(info) | nothing | Function when loading is ended |

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

| argument | type | Assumption | description |
| ------ | ------ | ------ | ------ |
| 0 | string | nothing | Event name |
| 1 | function | nothing | Function when event run |

```javascript
Hash.event('change', function() {
    alert('The hash of the page is changed!');
});
```
*  **change** : Runs during the hash of page change