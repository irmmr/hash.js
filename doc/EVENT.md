# Events

Events are for checking various page hash changes. By means of this item, all changes can be checked.

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

### Event data

Data includes an object that returns the output data of the executed event.

### Event information

The event information includes the function that you have passed and while storing the basic event information, it gives you information about the time and type of the event, as well as access to manage the function. This one returns a [HashTriggerListener](../src/event/triggerListener.js).

> `id` => An event ID constructed with a random string to identify this event.

> `time` => The event time when this event created by user.

> `event` => The event name for your usage :)

> `remove()` => To remove event listener

> `get()` => To get this event listener from trigger

### Listeners

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
// when page's hash changed
Hash.event("change", (e, i) => {
  console.log(`changed from ${e.from} to ${e.to}`);
});

// when page's hash cleared
Hash.on("clear", (e, i) => {
  console.log(`hash cleared from ${e.from}`);
});

// looking for any setting about queries
let page = 1;
Hash.on("set.query", (e) => {
  const p = e.value.page || 1;

  if (p !== page) {
    page = p;
    console.info(`new page -> ${page}`);
  }
});

// check for hash value and query clearing
Hash.on("clear.value clear.query", (e) => {
  console.log("cleared", e);
});
```
