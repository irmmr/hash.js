# The query components

All components related to hash `query`. These components only manage the hash query and do not change the other parts.

```javascript
// Hash => #?page=3
Hash.q.set("page", 3);

// Hash => #Hello?p=1&order=ASC
Hash.query.set({
  p: 1,
  order: "ASC",
});
```

**QueryValues** The value of the queries can be in the form of numbers, strings, Boolean and Null.

- **number** => ?name=1
- **string** => ?name=hello
- **boolean** => ?name=true
- **null** => ?name

## .set()

Set query to hash.

### .set(name, value)

Set a single query with value.

**name** (`string`) Query name

**value** (`string`|`number`|`boolean`|`null`) Query value

### .set(data)

Set multiple queries.

**data** (`object`)\<`string`:`QueryValues`\> Queries as an object

**returns** `HashCpQuery`

```javascript
// Hash is => #Hello-World
// After => #Hello-World?page=1
Hash.q.set("page", 1);

// Hash is => #Hello-World?page=1
// After => #Hello-World?page=1&order
Hash.q.set("order", null);

// Hash is => #Hello-World?a=b
// After => #Hello-World?a=b&c=d&e=false
Hash.q.set({
  c: "d",
  e: false,
});
```

## .get()

Get any query or queries with values.

### .get()

Get all queries with values.

**returns** `object`

### .get(name)

Get a single query value.

**name** (`string`) Query name

**returns** `QueryValues`|`undefined`

### .get(names)

Get some of queries with name.

> If the entered name does not exist, the value will be set to `undefined`.

**returns** `object`\<`string`:`QueryValues`|`undefined`\>

```javascript
// Hash is => #hey?a=b&id=898482
// Returns => Object { a: "b", id: 898482 }
Hash.q.get();

// Hash is => #hey?a=b&id=898482
// Returns => 898482
Hash.q.get("id");

// Hash is => #hey?a=b&id=898482
// Returns => undefiend
Hash.q.get("type");

// Hash is => #hey?a=b&id=898482&s=false
// Returns => Object { a: "b", s: false }
Hash.q.get(["a", "s"]);

// Hash is => #hey?a=b&id=898482&s=false
// Returns => Object { a: "b", ot: undefined }
Hash.q.get(["a", "ot"]);
```

## .add()

Add query.

### .add(name, value)

Add a single query with value.

**name** (`string`) Query name

**value** (`string`|`number`|`boolean`|`null`) Query value

### .add(data)

Set multiple queries.

**data** (`object`)\<`string`:`QueryValues`\> Queries as an object

**returns** `HashCpQuery`

```javascript
// Hash => #/message?page=1
// After => #/message?page=1&type=normal
Hash.q.add("type", "normal");

// Hash => #/message?page=1
// After => #/message?page=1&order=DESC&active=false
Hash.q.add({
  order: "DESC",
  active: false,
});
```

## .clear()

Clear query from hash.

### .clear()

**returns** `HashCpQuery`

```javascript
// Hash => #message?page=1
// After => #message
Hash.q.clear();
```

## .define()

Define queries by deleting other ones.

### .define(data)

**data** (`object`)\<`string`:`QueryValues`\> Queries as an object

**returns** `HashCpQuery`

```javascript
// Hash => #msg?page=1
// After => #msg?p=12&any
Hash.q.define({
  p: 12,
  any: null,
});
```

## .have()

Check for the existence of query types.

### .have()

Is there a query at all?

**returns** `boolean`

### .have(name)

Checking the existence of a query with a name.

**name** (`string`) Query name

**returns** `boolean`

### .have(names)

Checking the existence of multiple queries with their name.

**name** (`array`)\<`string`\> Queries name

**returns** `boolean`

```javascript
// Hash is => #val?a=b&c=d&h&i=93035
// Returns => true
Hash.q.have();

// Hash is => #val
// Returns => false
Hash.q.have();

// Hash is => #val?a=b&c=d&h&i=93035
// Returns => true
Hash.q.have("i");

// Hash is => #val?a=b&c=d&h&i=93035
// Returns => true
Hash.q.have(["a", "c", "h"]);
```

## .is()

Check a query value.

### .is(name, value)

**name** (`string`) Query name

**value** (`QueryValues`|`undefined`) Value to check

**returns** `boolean`

```javascript
// Hash is => #val?a=b&c=d
// Returns => false
Hash.q.is("a", "anything");

// Hash is => #val?a=b&c=d
// Returns => true
Hash.q.is("c", "d");

// Hash is => #val?a=b&c=d&h&i=93035
// Returns => true
Hash.q.is(h, null);

// Hash is => #val?a=b&i=93035
// Returns => true
// Means "type" is not defined as a query
Hash.q.is("type", undefined);
```

## .remove()

Remove query.

### .remove(name)

Single query remove.

**name** (`string`) Query name

### .remove(names)

Multiple query remove.

**name** (`array`)\<`string`\> Queries name

**returns** `HashCpQuery`

```javascript
// Hash is => #val?a=b&c=d
// After => #val?c=d
Hash.q.remove("a");

// Hash is => #val?a=b&c=d&e=f
// After => #val?e=f
Hash.q.remove(["a", "c"]);
```

## .update()

Update queries.

### .update(name, value)

Update a query value.

**name** (`string`) Query name

**value** (`string`|`number`|`boolean`|`null`) Query value

### .update(data)

Update multiple queries.

**data** (`object`)\<`string`:`QueryValues`\> Queries as an object

**returns** `HashCpQuery`

```javascript
// Hash => #msg?page=1
// After => #msg?page=20
Hash.q.update("page", 20);

// Hash => #msg?page=1&order=ad&float=false
// After => #msg?page=1&order&float=true
Hash.q.update({
  order: null,
  float: true,
});
```
