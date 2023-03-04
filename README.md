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
<script src="path/to/dist/hash.min.js"></script>
```

You can also use with: `jsdelivr`:

```html
<script src="https://cdn.jsdelivr.net/npm/@irmmr/hash.js"></script>
```

# Document

The document contains all the components included in the package.

[view document ->](DOCUMENT.md)

# Test

You can test this library in the browser online. [view ->](https://irmmr.github.io/hash.js/test/)

Otherwise, you must use the following commands to test the items:

```shell
# install test packages
npm run start

# test last published version
npm test

# test last changed file
npm test -- --dev
```

# Structure

The components of this library are divided into 3 main sections, which include **main**, **value** and **query**. query itself includes the (str)string section so that query items can be implemented as a string.

```javascript
import Hash from "@irmmr/hash.js";

// use Hash.js information
// Object { version: "1.7.5", name: "HashJs", module: "Hash" }
Hash.info();

// use Hash.js event
Hash.on(listener, (e, i) => {
  //...
});
```

**Main**: Items for general hash management. `value?query`

```javascript
// set example
// => #string-for-me
Hash.set("string-for-me");

// replace example
// => #stringforme
Hash.replace(/-/g, "");
```

**Value**: Items for value hash management. `value`?query

```javascript
// Hash.v == Hash.value
// set example
Hash.v.set("new-value");

// get example
console.log(Hash.value.get());
```

**Query**: Items for query hash management. value?`query` (objective)

```javascript
// Hash.q == Hash.query
// set example
Hash.q.set("query-name", "query-val");

// get example
console.log(Hash.query.get("query-name"));
```

**Query str**: Items for query hash management as string. value?`query` (string)

```javascript
// add example
Hash.q.str.add("q=v", "after:g");

// get example
console.log(Hash.q.str.get());
```

# How to use?

These include a few simple examples.

### Use it !

```javascript
// set a value to location.hash (main component)
Hash.set("hello-babe"); // page's hash => '#hello-babe'

// get location.hash            (main component)
Hash.get(); // returns => 'hello-babe'

// set new value                (value component)
Hash.v.set("hey-value"); // page's hash => '#hey-value'

// set 'page' query             (query component)
Hash.q.set("page", 1); // page's hash => '#hey-value?page=1'

// set 'e' query                (query string component)
Hash.q.str.set("ev=12"); // page's hash => '#hey-value?ev=12'
```

**ready() one-line usage**

```javascript
// #data-type?name=J
Hash.ready()?.set("data-type").q.set("name", "J");
```
