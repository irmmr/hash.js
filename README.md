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
<script src="https://cdn.jsdelivr.net/npm/@irmmr/hash.js@1.7.2"></script>
```

# Usage
As mentioned this library used for managing page location hash. What is the page's hash? Page's hash is a value that defined in url and starts with a "#". for example : `https://site.com/#some-value`.
This library can do these works for you:
- `change` : Change the page's hash value or query
- `add` : Add some values or queries to page's hash
- `evaluate` - Evaluate and check hash values and queries
- `set` - Set values and queries to page's hash
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
### Config
Configures are for changing a series of library functions and values so that you have more access
```javascript
Hash.config({
    // get page hash by collecting custom data
    getHashCallback: null,
    // set page hash by custom action
    setHashCallback: null,
    // get page hash using filter
    getHashFilter: null,
    // set page hash by a filter
    setHashFilter: null,
    // get location href using custom callback
    getHrefCallback: null,
    // the 'window' main object for using in library
    // if it is null, the original 'window' is inserted
    window: null,
    // should errors be logged in console or not?
    log: true
})
```
**hey :** If you use `null` for each case, the default value and function will be specified.

**notice :** These values and functions are for your testing and understanding only and you do not need to use them at all. These apply only when you want to customize the received functions and so on. 
```javascript
Hash.config({
    getHashCallback: () => {
        // default -> window.location.hash
        return document.URL.split('#')[1]
    },
    setHashCallback: (data) => {
        // default -> window.location.hash = data
        window.location.href = document.URL.split('#')[0] + '#' + data
    },
    getHashFilter: (hash) => {
        return hash + ":)"
    },
    setHashFilter: (data) => {
        return data.replace('#', '')
    },
    getHrefCallback: () => {
        // default -> window.location.href
        return document.URL
    },
    // if 'window' is not entered properly, everything will go wrong.
    // if the value is null, it changes to "window".
    window: window,
    // false if you do not want the errors to cause errors in the script in any way.
    log: false
})
```
### Use it !
```javascript
// set a value to location.hash
Hash.set('hello-babe'); // page's hash => '#hello-babe'

// get location.hash
Hash.get();             // returns => 'hello-babe'
```
View the full document: [Document](/DOCUMENT.md)