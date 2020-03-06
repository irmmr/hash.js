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



