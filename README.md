<p align="center"><a href="https://irmmr.github.io/hash.js/" target="_blank"><img width="100" src="https://raw.githubusercontent.com/irmmr/hash.js/master/logo/logo.png" alt="Hash Js"></a></p>

<p align="center">
  <a href="https://github.com/irmmr/hash.js/blob/master/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/irmmr/hash.js"></a>
    <img alt="version" src="https://img.shields.io/static/v1?label=version&message=v1.5.1&color=success">
   <a href="https://irmmr.github.io/hash.js/" target="_blank">
    <img alt="see page" src="https://img.shields.io/static/v1?label=page&message=click%20here&color=yellow">
  </a>
</p>

# Hash.js
**Hash.js** is a simple javascript library by pure js that manage the page `location.hash`. to `change`, `add`, `set`, `check`, `get` the hash value or query you can use this library. The page hash is a combination of 2 parts, "value" and "query". This value is set as follows: `#value?query`. This principle may be incorrect, but it is defined in this library!

# Usage
As mentioned this library used for managing page location hash. What is the page's hash? Page's hash is a value that defined in url and starts with a "#". for example : `https://site.com/#some-value`.
This library can do these works for you:
- `change` : Change the page's hash value or query
- `add` : Add some values or queries to page's hash
- `evaluate` - Evaluate and check hash values and queries
- `set` - Set vlues and queries to page's hash
- `update` - Update hash values and queries
- `clear` - Clear the page's hash
- `remove` - Remove some parts of page's hash
- `manage` - Manage the changes of page's hash
- ...

# Structure
The functions of this library are summarized in 3 sections. The main part is called `lib` and is used as a constructor that you need create an object from it to use its features. The other section is `info` and just shows the library versions. The last section is `event` that only have two mods and have listeners duty: **load** and **change**
- `load` : The page's load event listener
- `change` : The page's hashchange event listener
> In addition to this types, this library can be used from `window.location.HashModule`.
```javascript
// use Hash.js main library
const hsh = Hash();

// use Hash.js information
const inf = Hash().info();

// use Hash.js event
Hash().event(listener, function () {
  // do somthing ...
});
```

# Examples
I will add some examples soon ...
> These do not include all features.
```javascript
// To use, you must use this way.
const hsh = Hash();
```
```javascript
// Simple example for set and get page's hash.

// set a simple value
hsh.set('hello');       // page's hash => #hello

// get location's hash
let ha = hsh.get();     // returns     => 'hello
```
```javascript
// Simple example for set and get query

// #{value}?{query}
// set a query
hsh.setQuery({
  a : 'b',
  c : 'd',
  e : null
});                         // page's hash => #?a=b&c=d&e

// get query
let hq = hsh.getQuery();    // returns     => Object { a: "b", c: "d", e: null }
let a  = hsh.getQuery('a'); // returns     => 'b'
```
```javascript
// Get the location's hash query and value

// set value and query
hsh.set('value?a=1&b=2&redirect=/');  // page's hash => #value?a=1&b=2&redirect=/

// set value and query
hsh.setValue('new-value');            // page's hash => #new-value?a=1&b=2&redirect=/
hsh.setQuery({
  page: 1,
  redirect: '/home'
})                                    // page's hash => #new-value?page=1&redirect=/home
```
```javascript
// Lock location's hash

// set a value before
hsh.set('hello');                    // page's hash => #hello

// lock it
hsh.lock();

// set new value
hsh.set('goodbye');                 // page's hash => #hello
hsh.set('anything');                // page's hash => #hello
hsh.clear();                        // page's hash => #hello
```

# How to use ?
To using `Hash.js`, you need add `hash.js` as a script to your html codes!
```html
<script src="path/to/hash.js"></script>
```

