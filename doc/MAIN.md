# The main components

All components related to hash management as string.

## .set()

Set new hash as string.

### .set(value)

**value** (`string`) Value of hash

**returns** `Hash`

```javascript
// Hash is => #Hello-World
// After => #Hello
Hash.set("Hello");

// Hash is => NONE
// After => #Hello-Babe?type=1
Hash.set("Hello-Babe?type=1");
```

## .get()

Get all hash as string.

### .get()

**returns** `string`

```javascript
// Hash is => #Hello-World
// Returns => "Hello-World"
Hash.get();
```

## .add()

Add value to hash.

### .add(value, {options})

**value** (`string`) Amount to be added.

**position** (`string`) Define hole position.

**returns** `Hash`

### .add(value, position)

**value** (`string`) Amount to be added.

**options** (`object`) Options to define position, index.

- position (`string`) Define position.
- multiple (`boolean`) For use in position after and before.

**returns** `Hash`

#### Position entry

- index (`number`): Set position in an index with number.
- after (`string`) Set position after a value or string.
- before (`string`) Set position before a value or string.

```javascript
// Hash value is => #Hello-World
// After => #simpleHello-World
Hash.add("simple", "before");

// Hash value is => #Hello-World
// After => #Hello-Worldsimple
Hash.add("simple", "after");

// Hash value is => #Hello-World
// After => #Hellosimple-World
Hash.add("simple", "after:Hello");

// Hash value is => #Hello-World
// After => #Hello-simpleWorld
Hash.add("simple", "after:-");

// Hash value is => #Hello-World
// After => #HRIGHTello-World
Hash.add("Big", "index:1");

// Hash value is => #Hello-World
// After => #HelloBig-WoBigrld
Hash.add("Big", {
  position: "after:o",
  multiple: true,
});
```

## .clear()

Clear all hash.

### .clear(push_state)

**push_state** (`boolean`) _[default: true]_ Remove # using push state?

**returns** `Hash`

```javascript
// Hash is => #Hello-World
// After => NONE
Hash.clear();

// Hash is => #Hello-World
// After => #
Hash.clear(false);
```

## .have()

Check hash exists.

### .have()

Check if any hash exists.

### .have(data)

Check if any hash exists.

**data** (`string`) Any word or string to check

### .have(data)

Check if any hash exists (multiple).

**data** (`array`)\<`string`\> Words to check

**returns** `boolean`

```javascript
// Hash is => #Hello-World
// Returns => true
Hash.have();

// Hash is => #Hello-World
// Returns => true
Hash.have("World");

// Hash is => #Hello-World
// Returns => false
Hash.have("Pro");

// Hash is => #Hello-World
// Returns => true
Hash.have(["Hello", "o", "Wo"]);
```

## .is()

Check hash value.

### .is(data)

**data** (`string`) Any word or string to check

**returns** `boolean`

```javascript
// Hash is => #Hello-World
// Returns => true
Hash.is("Hello-World");

// Hash is => #Hello-World
// Returns => false
Hash.is("World");
```

## .lock()

Lock hash value.

### .lock(options)

**options** (`object`) All lock options

- force (`boolean`) don't let it unlocked

**returns** `Hash`

```javascript
// Hash is => #Hello-World
Hash.lock();

// Hash is => #Hello-World
// Can't be changed or unlocked
Hash.lock({
  force: true,
});
```

## .isLocked()

Check if hash is locked.

### .isLocked()

**returns** `boolean`

```javascript
// Hash is => #Hello-World
Hash.lock();

// Returns => true
Hash.isLocked();
```

## .unlock()

Unlock hash if not locked with force.

### .unlock()

**returns** `Hash`

```javascript
// unlock it
Hash.unlock();
```

## .remove()

Remove parts of hash as string.

### .remove(value)

**values** (`string`|`RegExp`) Word/RegExp to remove

### .remove(values)

**values** (`array`)\<`string`|`RegExp`\> Words to remove

**returns** `Hash`

```javascript
// Hash is => #Hello-World
// After => #-World
Hash.remove("Hello");

// Hash is => #Hello-World
// After => #World
Hash.remove(["Hello", /\-/g]);
```

## .replace()

Replace hash as string.

### .replace(from, to)

**from** (`string`|`RegExp`) Find anything

**to** (`string`) Replace to anything

**returns** `Hash`

```javascript
// Hash is => #Hello-World
// After => #Hi-World
Hash.replace("Hello", "Hi");

// Hash is => #Hello-World
// After => #Hello+World
Hash.replace(/-/g, "+");
```
