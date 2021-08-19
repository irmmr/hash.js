<p align="center"><a href="https://irmmr.github.io/hash.js/" target="_blank"><img width="100" src="https://raw.githubusercontent.com/irmmr/hash.js/master/logo/logo.png" alt="Hash Js"></a></p>

<p align="center">
  <a href="https://github.com/irmmr/hash.js/blob/master/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/irmmr/hash.js"></a>
  <a href="https://www.npmjs.com/package/@irmmr/hash.js"><img alt="npm" src="https://img.shields.io/npm/v/@irmmr/hash.js"></a>
</p>

# Hash.js
> It is better to use version **1.7.0** and above. Lower versions are not recommended at all.

**Hash.js** is a simple javascript library by pure js that manage the page `location.hash`. to `change`, `add`, `set`, `check`, `get` the hash value or query you can use this library. The page hash is a combination of 2 parts, "value" and "query". This value is set as follows: `#value?query`. This principle may be incorrect, but it is defined in this library!

# Install
You can install this package with ‍‍`npm` and use it.

```
npm install @irmmr/hash.js
```

Or use the built-in version of this library separately.
```html
<script src="path/to/dist/hash.js"></script>
```
You can also use with: `jsdelivr`:
```html
<script src="https://cdn.jsdelivr.net/npm/@irmmr/hash.js@1.7.0"></script>
```

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
```javascript
import Hash from '@irmmr/hash.js';

// use Hash.js information
Hash.info();

// use Hash.js event
Hash.event(listener, function () {
  // do somthing ...
});
```
`Versions less than 1.7.0`: You must use the Hash method as a function.
```javascript
import Hash from '@irmmr/hash.js';

// use Hash.js information
Hash().info();

// use Hash.js event
Hash().event(listener, function () {
    // do somthing ...
});
```

# How to use?
These include a few simple examples.
> These do not include all features.
```javascript
// set a simple value
Hash.set('hello');       // page's hash => #hello

// get location's hash
let ha = Hash.get();     // returns     => 'hello
```
```javascript
// #{value}?{query}
// set a query
Hash.setQuery({
  a : 'b',
  c : 'd',
  e : null
});                         // page's hash => #?a=b&c=d&e

// get query
let hq = Hash.getQuery();    // returns     => Object { a: "b", c: "d", e: null }
let a  = Hash.getQuery('a'); // returns     => 'b'
```
```javascript
// set value and query
Hash.set('value?a=1&b=2&redirect=/');  // page's hash => #value?a=1&b=2&redirect=/

// set value and query
Hash.setValue('new-value');            // page's hash => #new-value?a=1&b=2&redirect=/
Hash.setQuery({
  page: 1,
  redirect: '/home'
})                                     // page's hash => #new-value?page=1&redirect=/home
```
