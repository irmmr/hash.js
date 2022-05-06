# The main components
All components related to hash management.

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
// After => #Hellosimple-World
Hash.add('simple', 'after:Hello');

// Hash value is => #Hello-World
// After => #Hellosimple-World
Hash.add('simple', 'after:-');
```

...
