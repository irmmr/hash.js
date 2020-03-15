# 1.2.7 version document
This document only has new features and modified functions.

# using Query in `is()`
You can use query feature in `is()` function now.

`is()`
```javascript
// create an object from Hash.lib . This return a boolean.
var ob = new Hash.lib();

// The hash is "hello"?
var re = ob.is('hello');

// The "page" query is '66'? , page=66 ?
var re = ob.is('66', {
    query : 'page'
});
```

`query frunctions`
You can make any function for yourself to use and get hash queries.
```javascript
// create an object from Hash.lib . This return a boolean.
var ob = new Hash.lib();

// have query
function haveQ(queryName) {
    return ob.have(queryName, 'query');
}

// check query value
function theQis(queryName, queryValue) {
    return ob.have(queryName, 'query') && ob.is(queryValue, {
        query : queryName
    });
}

// get query
function getQ(queryName) {
    // check if page hash, having this query
    if (ob.have(queryName, 'query')) {
        return ob.get(true, {
            query : queryName 
        })[queryName];
    }
    
    return '';
}
// or (get)
function getQ(queryName) {
    var allQ = ob.get(true, {
        query : '*'
    });
    if (allQ.hasOwnProperty(queryName)) {
        return allQ[queryName];
    }
    
    return '';
}

// set query (using for single query)
function setQsingle(queryName, queryValue) {
    if (!ob.have(queryName, 'query') || ob.is(queryValue, { query : queryName })) {
    
        var theQ = {};
        theQ[queryName] = queryValue;
        
        ob.set({
            query : theQ
        });
        
    }
}
// set query (using for multi query)
function setQmulti(myQuery = {}) {
    ob.set({
        query : myQuery
    });
}

```