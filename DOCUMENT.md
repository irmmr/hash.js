# Document
The document includes all the functions that you can use with this package.

## Main components
The document will be completed soon.
```
Hash.NAME
```

## Value components
The document will be completed soon.
```
Hash.v.NAME or Hash.value.NAME
```

## Query components
The document will be completed soon.
```
Hash.q.NAME or Hash.query.NAME
```

## Query string components
The document will be completed soon.
```
Hash.q.str.NAME or Hash.query.str.NAME
```

## Direct/old components
Older components that were available in older versions are now deprecated.

[view doc ->](doc/DIRECT.md)

<hr>

## Event/On
This function are for adding listeners to the page hash.
### .event(string listeners, function callback)
**listeners** -> The listeners name.

**callback** -> The listener callback.

> Listener names can be separated by `,` or `space`.
#### Listeners:
- load : when page loaded.
- change: when page hash was changed.
```javascript
Hash.event('change load', () => {
    console.log('page hash change/loaded!')
})

Hash.on('change', ([e, ch]) => {
    // e: event
    // ch: {newHash, oldHash}
    alert(`Hash changed from ${ch.oldHash} to ${ch.newHash}`)
})
```

<hr>

## info
This function is for getting package/library information.

### .info()
**- return** -> object
- version : The package version.
- name : The package name.
- module : The package module name.
```javascript
Hash.info()
```

<hr>


