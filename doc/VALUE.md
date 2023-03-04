# The value components

All components related to hash `value`. These components only control the values and do not make any changes to the rest of the parts.

> All components work like main components without making changes in `queries`.

```javascript
// Hash Value => #Hello?anyQuery
Hash.v.set("Hello");

// Hash Value => #Hello?anyQuery
Hash.value.set("Hello");
```

## .set()

Set new hash value.

### .set(value)

**value** (`string`) Value of hash

**returns** `HashCpValue`

```javascript
// Hash is => #Hello-World?query=data
// After => #Hello?query=data
Hash.v.set("Hello");

// Hash is => NONE
// After => #Hello-Babe
Hash.v.set("Hello-Babe");
```

## .get()

Get hash value.

### .get()

**returns** `string`

```javascript
// Hash is => #Hello-World
// Returns => "Hello-World"
Hash.v.get();

// Hash is => #Hello?page=1
// Returns => "Hello"
Hash.v.get();
```

## .add()

Add string to value.

### .add(value, {options})

**value** (`string`) Amount to be added.

**position** (`string`) Define hole position.

**returns** `HashCpValue`

### .add(value, position)

**value** (`string`) Amount to be added.

**options** (`object`) Options to define position, index.

- position (`string`) Define position.
- multiple (`boolean`) For use in position after and before.

**returns** `HashCpValue`

#### Position entry

- index (`number`): Set position in an index with number.
- after (`string`) Set position after a value or string.
- before (`string`) Set position before a value or string.

```javascript
// Hash is => #Hello-World
// After => #simpleHello-World
Hash.v.add("simple", "before");

// Hash value is => #Hello-World?def=false
// After => #Hello-Worldsimple?def=false
Hash.v.add("simple", "after");

// Hash value is => #Hello-World?query
// After => #Hellosimple-World?query
Hash.v.add("simple", "after:Hello");

// Hash value is => #Hello-World
// After => #Hello-simpleWorld
Hash.v.add("simple", "after:-");

// Hash value is => #Hello-World?a=b&c=d
// After => #HBigello-World?a=b&c=d
Hash.v.add("Big", "index:1");

// Hash value is => #Hello-World
// After => #HelloBig-WoBigrld
Hash.v.add("Big", {
  position: "after:o",
  multiple: true,
});
```

## .clear()

Clear hash value.

### .clear()

**returns** `HashCpValue`

```javascript
// Hash is => #Hello-World
// After => #
Hash.v.clear();

// Hash is => #Hello-World?a=hello&h=4902
// After => #?a=hello&h=4902
Hash.v.clear();
```

## .have()

Check hash value exists.

### .have()

Check if any hash value exists.

### .have(data)

Check if hash value contains anything.

**data** (`string`) Any word or string to check

### .have(data)

Check if any hash exists (multiple).

**data** (`array`)\<`string`\> Words to check

**returns** `boolean`

```javascript
// Hash is => #Hello-World
// Returns => true
Hash.v.have();

// Hash is => #?page=2
// Returns => false
Hash.v.have();

// Hash is => #Hello-World?Paper
// Returns => true
Hash.v.have("World");

// Hash is => #Hello-World?Pro=none
// Returns => false
Hash.v.have("Pro");

// Hash is => #Hello-World
// Returns => true
Hash.v.have(["Hello", "o", "Wo"]);
```

## .is()

Check hash value.

### .is(data)

**data** (`string`) Any word or string to check

**returns** `boolean`

```javascript
// Hash is => #Hello-World?no=163
// Returns => true
Hash.v.is("Hello-World");

// Hash is => #Hello-World
// Returns => false
Hash.is("World");
```

## .remove()

Remove parts of hash value.

### .remove(value)

**values** (`string`|`RegExp`) Word/RegExp to remove

### .remove(values)

**values** (`array`)\<`string`|`RegExp`\> Words to remove

**returns** `HashCpValue`

```javascript
// Hash is => #Hello-World?p=2
// After => #-World?p=2
Hash.v.remove("Hello");

// Hash is => #Hello-World?t-code=12
// After => #World?t-code=12
Hash.v.remove(["Hello", /\-/g]);
```

## .replace()

Replace hash value.

### .replace(from, to)

**from** (`string`|`RegExp`) Find anything

**to** (`string`) Replace to anything

**returns** `HashCpValue`

```javascript
// Hash is => #Hello-World?que=val
// After => #Hi-World?que=val
Hash.v.replace("Hello", "Hi");

// Hash is => #Hello-World?i
// After => #Hello+World?i
Hash.v.replace(/-/g, "+");
```
