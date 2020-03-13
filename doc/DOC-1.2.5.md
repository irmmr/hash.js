# 1.2.5 version document
This document only has new features and modified functions.

# Hash.lib
`is` This function check the hash value. This function return a boolean.

| argumant | type | Assumption | description |
| ------ | ------ | ------ | ------ |
| 0 | string | nothing | It is check by hash value |

```javascript
// create an object from Hash.lib
var ob = new Hash.lib();
// use is() in Hash.lib()
if (ob.is('hello')) {
    alert('Hash is hello');
}
```

# Hash.info
`hashVersion` This used for get hash main library version.
```javascript
// create an object from Hash.info
var ob = new Hash.info(),
    // version information. (string)
    ver = ob.hashVersion;
// alert lib version
alert("Hash.js version is  " + ver);
```

`packVersion` This used for get all library version. **Useful**
```javascript
// create an object from Hash.info
var ob = new Hash.info(),
    // version information. (string)
    ver = ob.packVersion;
// alert lib version
alert("This library version is  " + ver);
```
>  You can't use `version` anymore.

# Hash.spa

`exports` It is a constructor used for `rendering`, `title change` and other parts of the spa.


| constructor | Assumption | description |
| ------ | ------ | ------ |
| render | nothing | Render |
| title | nothing | Change title |


```javascript
// create an object from Hash.spa
var ob = new Hash.spa();
// Create exports
var exp = new ob.exports();
```

**exports -> render** This used for render html.

| object | type | Assumption | description |
| ------ | ------ | ------ | ------ |
| el | string (element id) | nothing | This is a element id # |
| render | string (html) | nothing | This is append to element |

```javascript
// create an object from Hash.spa
var ob = new Hash.spa();
// Create exports
var exp = new ob.exports();

// Use render
exp.render({
    el : 'app',
    render : '<b>Hello</b>'
});
```

**exports -> title** This used for change title.

| argumant | type | Assumption | description |
| ------ | ------ | ------ | ------ |
| 0 | string | nothing | This for append title |

```javascript
// create an object from Hash.spa
var ob = new Hash.spa();
// Create exports
var exp = new ob.exports();

// Use title
exp.title('page title');
```

