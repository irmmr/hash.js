# The query string components

These components are for managing queries as strings and do not process queries at all.

```javascript
// Hash is => #Hello?repeat=10

// Returns => Object { repeat: 10 }
Hash.q.get();

// Returns => "repeat=10"
Hash.q.str.get();
```

## .set()

Set query string.

### .set(string)

**string** (`string`) Query value

**returns** `HashCpQueryStr`

```javascript
// Hash is => #hey?name=jj
// After => #hey?name=f&age=90
Hash.q.str.set("name=f&age=90");
```

## .get()

Get query as string.

### .get()

**returns** `string`

```javascript
// Hash is => #hey?name=jj&age=90
// Returns => "name=jj&age=90"
Hash.q.str.get();
```

## .add()

Add string to query.

### .add(value, {options})

**value** (`string`) Amount to be added.

**position** (`string`) Define hole position.

**returns** `HashCpQueryStr`

### .add(value, position)

**value** (`string`) Amount to be added.

**options** (`object`) Options to define position, index.

- position (`string`) Define position.
- multiple (`boolean`) For use in position after and before.

**returns** `HashCpQueryStr`

#### Position entry

- index (`number`): Set position in an index with number.
- after (`string`) Set position after a value or string.
- before (`string`) Set position before a value or string.

```javascript
// Hash is => #hey?wea=cloud
// After => #hey?simplewea=cloud
Hash.q.str.add("simple", "before");

// Hash is => #hey?wea=cloud
// After => #hey?wea=cloudsimple
Hash.q.str.add("simple", "after");

// Hash is => #hey?wea=cloud
// After => #hey?weasimple=cloud
Hash.q.str.add("simple", "after:wea");

// Hash is => #hey?wea=cloud
// After => #hey?wea=simplecloud
Hash.q.str.add("simple", "after:=");

// Hash is => #hey?wea=cloud
// After => #hey?wBigea=cloud
Hash.q.str.add("Big", "index:1");

// Hash is => #hey?wea=cloud&m=14
// After => #hey?wea=>cloud&m=>14
Hash.q.str.add(">", {
  position: "after:=",
  multiple: true,
});
```

## .have()

Check hash value exists.

### .have()

Looking for any query as string.

### .have(data)

Check if hash query str contains anything.

**data** (`string`) Any word or string to check

### .have(data)

Check if any hash exists (multiple).

**data** (`array`)\<`string`\> Words to check

**returns** `boolean`

```javascript
// Hash is => #Hello?name=lola
// Returns => true
Hash.q.str.have();

// Hash is => #Hello
// Returns => false
Hash.q.str.have();

// Hash is => #Hello?name=lola
// Returns => true
Hash.q.str.have("me");

// Hash is => #Hello?name=lola
// Returns => false
Hash.q.str.have("s");

// Hash is => #Hello?name=lola
// Returns => true
Hash.q.str.have(["name", "lola", "a"]);
```

## .is()

Check equality.

### .is(data)

**data** (`string`) Anything to check

**returns** `boolean`

```javascript
// Hash is => #pa?p=11&flame=783
// Returns => true
Hash.q.str.is("p=11&flame=783");

// Hash is => #pa?p=11&flame=783
// Returns => false
Hash.q.str.is("p=11&fl");
```

## .remove()

Remove parts of hash query as string.

### .remove(value)

**values** (`string`|`RegExp`) Word/RegExp to remove

### .remove(values)

**values** (`array`)\<`string`|`RegExp`\> Words to remove

**returns** `HashCpQueryStr`

```javascript
// Hash is => #msg?name=hoe&date=802-5225
// After => #msg?name=hoe&5225
Hash.q.str.remove("date=802-");

// Hash is => #msg?name=hoe&date=802-5225
// After => #msg?na=hoe&date=-
Hash.q.str.remove(["me", /[\d+]/g]);
```

## .replace()

Replace hash query as string.

### .replace(from, to)

**from** (`string`|`RegExp`) Find anything

**to** (`string`) Replace to anything

**returns** `HashCpQueryStr`

```javascript
// Hash is => #msg?name=hoe&age=10
// After => #msg?name=jay&age=10
Hash.q.str.replace("hoe", "jay");

// Hash is => #msg?name=hoe&age=10
// After => #msg?name=hoe+age=10
Hash.q.str.replace(/\&/g, "+");
```
