# Document
Here you can read some of `Hash.js` documentation.

# Creating object
For create a constructor you must use that `new` in `javascript`.
```javascript
var ob = new Hash.lib(); // Here i use main library
```

# Hash.lib
`set` this used for set new hash to page.
```javascript
// create an object from Hash.lib
var ob = new Hash.lib();
// use set() in Hash.lib()
ob.set({
   val : 'hello' 
});
```
`get` this used for set new hash to page.
```javascript
// create an object from Hash.lib
var ob = new Hash.lib();
// use get() in Hash.lib(). This return a value.
var hash = ob.get(true); // with first sharp or not?
// use page hash
alert("Page hash is " + hash);
```
`have` this checks if page have any hash.
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

`lock` by this user can't change hash of the page.
```javascript
// create an object from Hash.lib
var ob = new Hash.lib();
ob.lock();
```

`clear` this clears the hash of the page.
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
	el : 'app', // element id
	def : 'home', // main page component
	component : {
		'home' : {
			title : 'home (welcome) | spa app', // page title
			main : 'welcome to home!' // element html
		},
		'home/start' : {
			title : 'home start | spa app',
			main : 'start working with us',
		 	do : function() { // spa function
				alert('start now!');
		 	}
	  	}
	},
	error : {
		'404' : {
			main : 'page not found!',
			title : 'error 404 | spa app',
		}
	}
});
```

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



