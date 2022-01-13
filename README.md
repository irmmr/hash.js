<p align="center"><a href="https://irmmr.github.io/hash.js/" target="_blank"><img width="100" src="https://raw.githubusercontent.com/irmmr/hash.js/master/logo/hashjs-hashtag.png" alt="Hash Js"></a></p>

<p align="center">
  <a href="https://github.com/irmmr/hash.js/blob/master/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/irmmr/hash.js"></a>
  <a href="https://www.npmjs.com/package/@irmmr/hash.js"><img alt="npm" src="https://img.shields.io/npm/v/@irmmr/hash.js"></a>
</p>

# Hash.js
> It is better to use version **1.7.0** and above. Lower versions are not recommended at all.

**Hash.js** is a simple and flexible javascript library that manages the `location.hash` page. To `change`, `add`, `set`, `check`, `get` the hash value or query you can use this library. The page hash is a combination of 2 parts, "value" and "query". This value is set as follows: `#value?query`.
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
<script src="https://cdn.jsdelivr.net/npm/@irmmr/hash.js@1.7.3"></script>
```

# Document
The document contains all the components included in the package.

[view document ->](DOCUMENT.md)

# Test
You can test this library in the browser online. [view ->](https://irmmr.github.io/hash.js/test/)

Otherwise, you must use the following commands to test the items:
```shell
# install test packages
npm run build

# test last published version
npm test

# test last changed file
npm test -- --dev
```

# Structure
The components of this library are divided into 3 main sections, which include **main**, **value** and **query**. query itself includes the (str)string section so that query items can be implemented as a string.


```javascript
import Hash from '@irmmr/hash.js'

// use Hash.js information
Hash.info()

// use Hash.js event
Hash.on(listener, () => {
    // ...
})
```
**Main**: Items for general hash management. `value?query`
```javascript
// set example
Hash.set('string-for-me')

// replace example
Hash.replace(/-/g, '')
```
**Value**: Items for value hash management. `value`?query
```javascript
// Hash.v == Hash.value
// set example
Hash.v.set('new-value')

// get example
console.log(Hash.value.get())
```
**Query**: Items for query hash management. value?`query` (objective)
```javascript
// Hash.q == Hash.query
// set example
Hash.q.set('query-name', 'query-val')

// get example
console.log(Hash.query.get('query-name'))
```
**Query str**: Items for query hash management as string. value?`query` (string)
```javascript
// add example
Hash.q.str.add('q=v', 'after:g')

// get example
console.log(Hash.q.str.get())
```

# Config
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
    log: true,
    // query symbols
    andSymbol: '&',
    equSymbol: '=',
    queSymbol: '?'
})
```
**hey :** If you use `null` for each case, the default value and function will be specified. Use this method to reset all settings:
```javascript
Hash.config().reset()
```
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
    log: false,
    andSymbol: '*', // default: &
    equSymbol: '-', // default: =
    queSymbol: '|' // default: ?
})
```

# How to use?
These include a few simple examples.

### Use it !
```javascript
// set a value to location.hash (main component)
Hash.set('hello-babe')      // page's hash => '#hello-babe'

// get location.hash            (main component)
Hash.get()                  // returns => 'hello-babe'

// set new value                (value component)
Hash.v.set('hey-value')     // page's hash => '#hey-value'

// set 'page' query             (query component)
Hash.q.set('page', 1)       // page's hash => '#hey-value?page=1'

// set 'e' query                (query string component)
Hash.q.str.set('ev=12')     // page's hash => '#hey-value?ev=12'
```
