# Config

All features and origin of hash can be changed with configs. Of course, this can also cause errors.

! Changing any configuration can change the entire behavior of the library, manipulating setters and getters can screw things up if not done right. It doesn't mean that you can't change the settings, but I just want to tell you, you have to do it carefully.

#### Default configs

```javascript
Hash.config().defaults();
```

```json
{
  "getHashCallback": null,
  "setHashCallback": null,
  "getHashFilter": null,
  "setHashFilter": null,
  "getHrefCallback": null,
  "window": null,
  "log": true,
  "querySymbols": {
    "and": "&",
    "equ": "=",
    "que": "?"
  },
  "parseQueryValue": true
}
```

Null value in functions and window is considered the same as the default value.

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

## Reset to default

If you use `null` for each case, the default value and function will be specified. Use this method to reset all settings:

```javascript
Hash.config().reset();
```

## Change window

If the window is changed, all listeners and the origin of all changes will be transferred to the new window.

```javascript
// open a new window using "open"
const win = window.open("https://site.com", "popup");

// update window in config
Hash.config({ window: win });

// set a hash
// opened window => https://site.com#Hello
Hash.set("Hello");
```

```javascript
// get parent window
const win = window.opener;

// update window in config
Hash.config({ window: win });

// set a hash
// parent window => https://site.com#Hey
Hash.set("Hey");
```

By doing this, `listeners` and `events` only work on the currently active window.
