# Document
The document includes all the functions that you can use with this package.

## Event
This function are for adding listeners to the page hash.
### .event(string listeners, function callback)
**listeners** -> The listeners name.

**callback** -> The listener callback.

> Listener names can be separated by `,`.
#### Listeners:
- load : when page loaded.
- change: when page hash was changed.
```javascript
Hash.event('change, load', function () {
    console.log('page hash: ', Hash.get());
});
```

## info
This function is for getting package/library information.

### .info()
**- return** -> object
- version : The package version.
```javascript
Hash.info();
```

## Set
These functions are used to set the page hash.

### .set(string value)
**value** -> Adjust the value you want.

**- return** -> boolean
```javascript
Hash.set('hello-babe');
```
```
Page's hash => '#hello-babe'
```

### .setValue(string value)
**value** -> Adjust the value you want.

**- return** -> boolean

`setValue` differs from the `set` in that the `set` clears everything to record the new value, but `setValue` retains the queries.
```javascript
Hash.setValue('hello-val');
```
```
Page's hash => '#hello-val'
```

### .setQuery(object queries)
**queries** -> List of all queries to set.

**- return** -> boolean

`setQuery` does the exact opposite of` setValue` and only deletes queries to register new values and leaves the values unchanged.
```javascript
Hash.setQuery({
    page: 2,
    sort: 'desc'
});
```
```
Page's hash => '#?page=2&sort=desc'
```

## Get
These functions are for receiving hash values and page queries.
> For examples, we consider page hash : `#hello-val?page=2&sort=desc&online&emp=`

### .get()
**- return** -> string, the hash
```javascript
Hash.get();
```
```
Returns => 'hello-val?page=2&sort=desc&online&emp='
```

### .getValue()
**- return** -> string, the hash value
```javascript
Hash.getValue();
```
```
Returns => 'hello-val'
```

### .getQuery(string|array que = [])
This function can be selected and used in several ways. The value of queries is defined as follows:
- **string**: Query value if exists.
- **null**: Query with no defined value.
- **undefined**: The query does not exist.

#### .getQuery()
This item is used to receive all queries.

**- return** -> object, list of all queries
```javascript
Hash.getQuery();
```
```
Returns => Object {page: "2", sort: "desc", online: null, emp: ""}
```

#### .getQuery(string query)
This item is used to receive all queries.

**query** -> The query name as string.

**- return** -> string|null|undefined, the query value
```javascript
Hash.getQuery('sort');   // Returns => 'desc'
Hash.getQuery('online'); // Returns => null
Hash.getQuery('name');   // Returns => undefined
```

#### .getQuery(array queries)
Receive the value of two or more queries.

**queries** -> The queries name list.

**- return** -> object, the queries list

> If you request a query that does not exist in the query name list, the undefined value will be returned so that there is no error in executing your code.

1)
```javascript
Hash.getQuery(['sort', 'online']);
```
```
Returns => Object {sort: "desc", online: null}
```
2)
```javascript
Hash.getQuery(['sort', 'online', 'nova', '_ha']);
```
```
Returns => Object {sort: "desc", online: null, nova: undefined, _ha: undefined}
```

## Add
These functions are for adding values or queries to the page hash.
> For examples, we consider page hash : `#/message?name=joe&message=hi`

### .add(string value)
**value** -> The string that you want to add on hash.

**- return** -> boolean
```javascript
Hash.add('-custom-general');
```
```
Page's hash => '#/message?name=joe&message=hi-custom-general'
```

### .addValue(string value)
**value** -> The value string that you want to add on hash.

**- return** -> boolean
```javascript
Hash.addValue('Me');
```
```
Page's hash => '#/messageMe?name=joe&message=hi'
```

### .addQuery(object queries)
**queries** -> The list of queries.

**- return** -> boolean
```javascript
Hash.addQuery({
    pri: 0,
    comment: 'test-message'
});
```
```
Page's hash => '#/message?name=joe&message=hi&pri=0&comment=test-message'
```

## Remove
These functions are for removing values or queries from the page hash.
> For examples, we consider page hash : `#/message?name=joe&message=hi`

### .remove(string|array values)
**values** -> The value/values to remove from page hash.

**- return** -> boolean
1)
```javascript
Hash.remove('/mess');
```
```
Page's hash => '#age?name=joe&message=hi'
```
2)
```javascript
Hash.remove(['/', '=hi']);
```
```
Page's hash => '#message?name=joe&message'
```

### .removeValue(string|array values)
**values** -> The value/values to remove from page hash value.

**- return** -> boolean
```javascript
Hash.removeValue('message');
```
```
Page's hash => '#/?name=joe&message=hi'
```

### .removeQuery(string|array queries)
**values** -> The query/queries name to remove from page hash query.

**- return** -> boolean
```javascript
Hash.removeQuery('name');
```
```
Page's hash => '#/message?message=hi'
```

## Update query
This function is for updating queries.
> For examples, we consider page hash : `#nova?co=true&opp=rare`

### .updateQuery(string queryName, string|null|number value)
**queryName** -> The query name for update.

**value** -> The new value.

**- return** -> boolean
```javascript
Hash.updateQuery('opp', 'lool');
```
```
Page's hash => '#nova?co=true&opp=lool'
```


## Have
These functions are for checking the existence of quantities and queries.
> For examples, we consider page hash : `#the-value?page=1&name=uui`

### .have(string|array values)
**values** -> The values and strings to check.

**- return** -> boolean, true if all values exist and false if not all values are available.

```javascript
Hash.have('the-val');            // Returns => true
Hash.have(['?page=', 'name']);   // Returns => true
Hash.have('msg');                // Returns => false
```

### .haveValue(string|array values)
**values** -> The values and strings to check.

**- return** -> boolean, true if all values exist and false if not all values are available.

```javascript
Hash.haveValue('the-');           // Returns => true
Hash.haveValue(['value', '-']);   // Returns => true
Hash.haveValue('/val');           // Returns => false
```

### .haveQuery(string|array queries)
**queries** -> The queries name to check.

**- return** -> boolean, true if query/queries exist and false if query is not exists.

```javascript
Hash.haveQuery('page');           // Returns => true
Hash.haveQuery(['page', 'mes']);  // Returns => false
Hash.haveQuery('dir');            // Returns => false
```

## Is
These functions are for checking values and estimates.
> For examples, we consider page hash : `#my-val?page=3&redirect=/home`

### .is(string value)
**value** -> The string to check.

**- return** -> boolean, true if it's same and false for not same.

```javascript
Hash.is('nova-hash?page=2');             // Returns => false
Hash.is('my-val?page=3&redirect=/home'); // Returns => true
```

### .isValue(string value)
**value** -> The string to check.

**- return** -> boolean, true if it's same and false for not same.

```javascript
Hash.isValue('myValue'); // Returns => false
Hash.isValue('my-val');  // Returns => true
```

### .isQuery(string queryName, string|null|undefined value)
**queryName** -> The name of query to check.

**value** -> The value of query to check.

**- return** -> boolean, true if query has same valued and false for different value.

```javascript
Hash.isQuery('page', '5');          // Returns => false
Hash.isQuery('redirect', '/home');  // Returns => true
Hash.isQuery('message', undefined); // Returns => true
```

## Clear
These functions are for clearing hashes and their values completely.
> For examples, we consider page hash : `#val?page=1`

### .clear(boolean removeSharp)
**removeSharp** -> default: true, Define that the '#' removed from page hash or not.

**- return** -> boolean

1)
```javascript
Hash.clear();
```
```
Page's hash => NOTHING
```
2)
```javascript
Hash.clear(false);
```
```
Page's hash => '#'
```

### .clearValue()
**- return** -> boolean

```javascript
Hash.clearValue();
```
```
Page's hash => '#?page=1'
```

### .clearQuery()
**- return** -> boolean

```javascript
Hash.clearQuery();
```
```
Page's hash => '#val'
```

## Lock
These functions are for locking and unlocking the page hash. This will keep page hash still.
> For examples, we consider page hash : `#value?que=hey`

### .lock(object options)
**options** -> The list of options for lock.
- force: boolean, define the lock as forced for disable unlock.

**- return** -> boolean
```javascript
Hash.lock();
```
If you do not want it to be open anymore:
```javascript
Hash.lock({
    force: true
});
```
Try to change page hash:
```javascript
Hash.set('hello');     // Page's hash => '#value?que=hey'
Hash.clearValue();     // Page's hash => '#value?que=hey'
// the page hash can not be changed after lock !
```

### .unLock()
This function opens the hash of the page and returns it to its previous state, if it is not set by `force`.

**- return** -> boolean
```javascript
Hash.unLock();
```


### .isLocked()
Check if the page hash is locked or not.

**- return** -> boolean, true if locked and false if it is not locked.
```javascript
Hash.isLocked();
```

<br>
This file is constantly updated ...