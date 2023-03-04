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
