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

[view doc ->](doc/DIRECT.md)

## Event/On

This function are for adding listeners to the page hash.

### .on(string listeners, function callback)

**listeners** (`string`) -> The listeners name.

**callback** (`callable`) -> The listener callback.

> Listener names can be separated by `,` or `space`.

```javascript
Hash.on("ready", (data, info) => {
  // data for each listener is diffrent
  // Object { time: 1668165923573 }
  // time => the ready time
  console.log(data);

  // event info that managed in trigger
  // Object { time: ...049540, event: "ready", id: "FOVfCHNtDLShQvDE...9540" }
  console.log(info);
});
```

#### Event data

Data includes an object that returns the output data of the executed event.

#### Event information

The event information includes the function that you have passed and while storing the basic event information, it gives you information about the time and type of the event, as well as access to manage the function. This one returns a [HashTriggerListener](./src/event/triggerListener.js).

> `id` => An event ID constructed with a random string to identify this event.

> `time` => The event time when this event created by user.

> `event` => The event name for your usage :)

> `remove()` => To remove event listener

> `get()` => To get this event listener from trigger

#### Listeners:

##### `lock`

when hash locked.

> Object { at: ...6981, value: "my-ytfgui", force: false }

##### `unlock`

when hash unlocked.

> Object { lockedAt: 1668165016981, at: 1668165090530, value: "my-ytfgui", force: false }

##### `ready`

when Hash was ready.

> Object { time: 1668165016519 }

##### `change`

when page hash was changed.

> Object { from: "first", to: "after" }

##### `set`

when page hash was set.

> Object { value: "after" }

##### `clear`

when page was cleared.

> Object { from: "after" }

##### `set.value`

when page value was set.

> Object { value: "str" }

##### `set.query`

when page query was set.

> Object { value: Object { a: "b", c: "d" }
> valueStr: "a=b&c=d" }

##### `change.value`

when page value was changed.

> Object { from: "str", to: "str2" }

##### `change.query`

when page query was changed.

> Object { from: Object { a: "b", c: "d" }, to: Object { a: "b", c: 10 }, str: Object { from: "a=b&c=d", to: "a=b&c=10" } }

##### `clear.value`

when page value was cleared.

> Object { from: "str" }

##### `clear.query`

when page query was cleared.

> Object { from: Object { a: "b" }, fromStr: "a=b" }

```javascript
Hash.event("change", (e, i) => {
  console.log(`changed from ${e.from} to ${e.to}`);
});

Hash.on("clear", (e, i) => {
  console.log(`hash cleared from ${e.from}`);
});

let page = 1;
Hash.on("set.query", (e) => {
  const p = e.value.page || 1;

  if (p !== page) {
    page = p;
    console.info(`new page -> ${page}`);
  }
});
```

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

! Changing any configuration can change the entire behavior of the library, manipulating setters and getters can screw things up if not done right. It doesn't mean that you can't change the settings, but I just want to tell you, you have to do it carefully.

### getHashCallback

You can change getter and define your own.

> default: () => window.location.hash

```javascript
Hash.config({
  getHashCallback: () => {
    // This doesn't work for multiple "#"
    return document.URL.split("#")[1];
  },
});
```

### setHashCallback

You can change setter and define your own.

> default: (d) => window.location.hash = d

```javascript
Hash.config({
  setHashCallback: (d) => {
    // Shows only as a alert
    alert(`setting on ${d}`);
  },
});
```

### setHashFilter

You can set a filter for setter.

```javascript
Hash.config({
  setHashFilter: (d) => "/" + d,
});

// #/hello?str=ha
Hash.set("hello").q.set("str", "ha");
```

### getHashFilter

You can set a filter for getter.

```javascript
Hash.config({
  getHashFilter: (d) => d.replace("hello", ""),
});

// /?str=ha
console.log(Hash.get());
```

### getHrefCallback

Set a custom callback to get location href.

> default: () => window.location.href

```javascript
Hash.config({
  getHrefCallback: () => document.URL,
});
```

### window `*`

Set a custom window that **Hash** can use it for everything like `addEventListener` or get hash and set it using `window.location`.

> default: window

```javascript
// don't do this, it's an example
Hash.config({
  window: window.opener,
});
```

### log

Log anything in console?

> default: true

```javascript
Hash.config({
  log: false,
});
```

### querySymbols

Define custom query builder symbols.

- and [default: `&`]
- equ [default: `=`]
- que [default: `?`]

```javascript
Hash.config({
  querySymbols: {
    and: "+",
    equ: ">",
    que: "$",
  },
});

// Default => #?page=1&order=ASC
// Custom => #$page>1+order>ASC
Hash.q.set({
  page: 1,
  order: "ASC",
});
```

### parseQueryValue

Define that **Hash** must change query values with types or only return them as **string**.

> default: true

```javascript
// Hash is => #?page=1&status=true&order=ASC

// Returns => Object { page: 1, status: true, order: "ASC" }
Hash.q.get();

Hash.config({
  parseQueryValue: false,
});

// Returns => Object { page: "1", status: "true", order: "ASC" }
Hash.q.get();
```

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
