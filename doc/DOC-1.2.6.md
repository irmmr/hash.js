# 1.2.6 version document
This document only has new features and modified functions.

# Query
New part of this version is query and you can see some documents about it.

# Add()
`(new)`  `add` This function add some values to page hash.

| object | type | Assumption | description |
| ------ | ------ | ------ | ------ |
| val | string | nothing | Adding value |
| query | string | nothing | Adding query |

```javascript
// create an object from Hash.lib
var ob = new Hash.lib();
// use add() in Hash.lib()
ob.add({
    val : 'hello',
    //or
    query : {
        page : 12,
        example : 'hello'
    }
});
```

# Using query

`set()`
```javascript
// create an object from Hash.lib
var ob = new Hash.lib();

ob.set({
    val : 'hello',
    // or
    query : {
        page : 12,
        example : 'hello'
    }
});
```

`get()`
```javascript
// create an object from Hash.lib
var ob = new Hash.lib();

ob.get(true, {
    //all queries
    query : '*',
    //some queries (OR)
    query : ['page', 'name'],
    //one query (OR)
    query : 'page'
});
```

`remove()`
```javascript
// create an object from Hash.lib
var ob = new Hash.lib();

ob.remove({
    words : ['bad', 'me'],
    query : ['page']
});
```
