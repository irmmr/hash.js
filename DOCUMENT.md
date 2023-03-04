# Document

The document includes all the functions that you can use with this package.

## Main components (`value?query`)

The main components that controls hole hash value and query as string and relates to other parts of the hash.

```
Hash.NAME
```

```javascript
Hash.set("Hello");
```

[view document ->](doc/MAIN.md)

## Value components (`value`?query)

These components are only for managing values and have nothing to do with other parts.

```
Hash.v.NAME or Hash.value.NAME
```

```javascript
Hash.v.set("Hello-Value");
```

[view document ->](doc/VALUE.md)

## Query components (value?`query`)

These components are only for managing queries and have nothing to do with other parts.

```
Hash.q.NAME or Hash.query.NAME
```

```javascript
Hash.q.set("say", "Hello");
```

[view document ->](doc/QUERY.md)

## Query string components (value?`query`)

These components are only for managing queries as string and have nothing to do with other parts.

```
Hash.q.str.NAME or Hash.query.str.NAME
```

```javascript
Hash.q.str.set("hey=nope");
```

[view document ->](doc/QUERY_STR.md)

## Direct/old components

Older components that were available in older versions are now deprecated.

> Do not use these components!

[view doc ->](doc/DIRECT.md)

## Event/On

This function are for adding listeners to the page hash.

```javascript
Hash.on("change", (e) => {
  console.log(`Hash changed from ${e.from} to ${e.to}`);
});
```

[read more about Events](doc/EVENT.md)

## info

This function is for getting package/library information.

### .info()

**- return** -> object

- version : The package version.
- name : The package name.
- module : The package module name.

```javascript
Hash.info();
```

## isReady

Checking status

### .isReady()

This function is only for get ready status.

**- returns** [boolean] true if it's ready and false if not.

```javascript
if (Hash.isReady()) {
  alert("its ok!");
}
```

### .ready()

This function can be used in one-line usage of this module if it is ready.

**- returns** [HashComponent|null] "null" if Hash is not ready and HashComponent if it is.

```javascript
Hash.ready()?.set("string").q.set("page", 10);
```

## Config

You can customize the main logical parts and define your own methods and change some actions for better usability and performance.

> see [config.js](/src/config.js)

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
  querySymbols: {
    and: "&",
    equ: "=",
    que: "?",
  },
  // parse query value or just return string?
  parseQueryValue: true,
});
```

[read more about Config](doc/CONFIG.md)

## Api

The api is for access to trigger or store class or other Hash main parts.

### trigger

With trigger you can access [trigger.js](/src/trigger.js) and use all methods in it.

```javascript
// trigger.js: manage triggers
const trigger = Hash.api.trigger;

// add an event for change
Hash.on("change", (e, i) => {
  console.log(`changed from ${e.from} to ${e.to}`);

  // remove this listener :)
  const { event: name, id } = i;
  trigger.removeListener(name, id);
});

// get 'change' event listeners
// If we have not deleted the event and there is a case
// Object { 18ViFkFP66mKQrdp...3752: Object { time: ...23752, callback: (e) } }
trigger.get("change");

// get listener
// Object { time: ...23752, callback: (e) }
trigger.getListener("change", "18ViFkFP66mKQrdp...");

// or event remove it
trigger.remove("change");
```

I won't say much more about this class and you can just see the source to know the class better.

### store

With store you can access [store.js](/src/store.js) and use all data that saved in it and every component main data will be saved in store.

- ready [boolean] -> The ready status
- readyDate [int] -> The ready time that saved with `Date.now()`
- lock [object] { status, force, time, value } The lock data that will be saved with `.lock()`, `.unlock()`

```javascript
// store.js: all saved data
const store = Hash.api.store;

// locking hash on 'my-name'
Hash.set("my-name").lock();

// Object { status: true, force: false, time: ...3453, value: "my-name" }
console.log(store.lock);

// true
console.log(store.ready);

// ...3456
console.log(store.readyDate);
```

## Helpers

You can use all helpers that defined in [helpers.js](/src/helpers.js) with `h`.

I have only given a few examples, and for the rest, you can refer to the file itself.

```javascript
// get all helpers
const h = Hash.h;

he.isEmpty(""); // returns -> true
he.isEmpty({}); // returns -> true
he.isEmpty("H"); // returns -> false
he.objSize({ p: 1, a: "d" }); // returns -> 2
he.makeRandStr(10); // returns -> Oj7NNLxREZ
```

## One-line usage

This library is designed for single line use and you can easily use it in single line. In addition, you can connect to the list of other components by using the desired methods of each category.

- `v` or `value` (value components)
- `q` or `query` (query components)
- `m` or `main` (main components)

```javascript
Hash.set("Hello-Babe").replace("Hello", "Hey");
```

The one-line rule is available for all components except for checkers.

```javascript
Hash.set("/message?page=1&content=hey")
  // #/message-page?page=1&content=hey
  .v.add("-page")
  // #/message-page?page=2&content=hey
  .q.update("page", 2)
  // #/message-page?page=2&content-b=hey
  .str.add("-b", "after:content")
  // none
  .m.clear();
```
