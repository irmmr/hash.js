# Examples
For better known about `hash.js`, see this examples!

# Use version

```javascript
var lib = new Hash.lib(),
    inf = new Hash.info(),
    pkv = inf.packVersion,
    hsv = inf.hashVersion;

console.log(`Pack version is ${pkv}`, `Hash version is ${hsv}`);
```

# Page loading

```html
<div id="loading" style="display:none">Loading ...</div>
```

```javascript
var lib = new Hash.lib(),
    inf = new Hash.info(),
    adnLoad = inf.addons.load,
    loading = document.getElementById('loading');
    
function startLoading() {
    loading.style.display = 'block';
}

function endLoading(e) {
    loading.style.display = 'none';
    console.log(`page loaded in ${e.loadTime} ms`);
}
    
if (adnLoad) {
    var loa = new Hash.load();
    loa.page({
        load : startLoading,
        do : endLoading
    });
} else {
    console.warn(`"Loader" is not ready!`);
}
```

# Get file contect with ajax

```html
<div id="file"></div>
```

```javascript
var lib = new Hash.lib(),
    inf = new Hash.info(),
    adnServ = inf.addons.server,
    file = document.getElementById('file');
    
if (adnServ) {
    var ser = new Hash.server();
    ser.ajax({
        url : 'file.txt',
        type : 'GET',
        result : {
            success : function(res) {
                file.innerHTML = res;
            },
            error : function(code) {
                file.innerHTML = `File get failed! code: ${code}`;
            }
        }
    });
} else {
    file.innerHTML = `Server is not ready! try again later.`;
}
```

# Reload with hash and event

```javascript
var lib = new Hash.lib();

function checkReload() {
    if (lib.have()) {
        var hsh = lib.get(true).toLowerCase();
    
        if (hsh == 'reload') {
            location.reload(true);
        }
    }
}

checkReload(), Hash.event('change', checkReload);

```

> For `is()` to use, the library version must be **1.2.5** or higher.

```javascript
var lib = new Hash.lib();

function checkReload() {
    if (lib.is('reload')) {
        location.reload(true);
    }
}

checkReload(), Hash.event('change', checkReload);

```

# Show nav with query

```javascript
var lib = new Hash.lib();

function showNavs() {
       
    // query name => #nav=?
    var nav = 'nav';
    
    // check if page have `nav` query
    if (lib.have(nav, 'query')) {
        // if query is not null => !#nav
        if (!lib.is(null, { query : nav })) {
            
            //get 'nav' query
            var nav_val = lib.get(true, {
                query : nav
            })[nav];
            
            //get element => myElem : elm_$
            var elm = document.getElementById('elm_' + nav_val);
            
            if (elm !== null) {
                elm.style.display = 'block';
            } else {
                lib.remove({
                    query : [nav]
                });
            }
            
        } else {
            lib.remove({
                query : [nav]
            });
        }
    }
}

showNavs(), Hash.event('change', showNavs);
```

# Render and change title

```javascript
var sp = new Hash.spa(),
    el = document.getElementById('my_element');
    
// create new constructor from sp.exports
var ep = new sp.exports();

ep.render({
    el : el,
    render : '<h1>Hello</h1>'
});

ep.title('Hello :)');
```

# Make a router for transfer user

```javascript
var lib = new Hash.lib(),
    inf = new Hash.info(),
    adnSpa = inf.addons.spa;
    
if (adnSpa) {
    
    var sp = new Hash.spa();
    sp.router({
        router : 'go/{any}/time/{any}',
        do : function(d) {
            
            var loc = unescape(d[0]),
                time = Number(d[1]);
                
            // time in S
            var fTime = Number.isNaN(time) ? 0 : time;
            
            var goL = setTimeout(function() {
            
                window.location.href = loc;
                window.clearTimeout(goL);
                
            }, fTime*1000);
            
        }
    });
    
}
```

# Make a router and render

```javascript
var inf = new Hash.info(),
    adnSpa = inf.addons.spa;
    
if (adnSpa) {
    
    var sp = new Hash.spa(),
        exp = new sp.exports();
    
    sp.router({
        router : 'name/{any}/message/{any}',
        do : function(d) {
            
            var name = d[0],
                mess = d[1];
                
            var yourAlert = `You have a new message from <b>${name}</b>`,
                yourMessage = `Your message is ${mess}`;
                
            // set new title
            exp.title(`Read message from ${name} | Hash.js`);
            
            // set new html
            exp.render({
               el : 'myApp',
               render : `${yourAlert} <br /> ${yourMessage}`
            });
            
        }
    });
    
}
```

# Clear page hash

```javascript
var lib = new Hash.lib();

if (lib.have())
    lib.clear();
```

# Making links in spa

```html
<!-- in spa library -->
<h-link link="home" h-top="false">
    <button>Home</button>
</h-link>
<h-link link="doc" h-top="true">Document</h-link>
<h-link link="download/2234/file/48884452345">Download</h-link>
<!-- or -->
<a href="#home">Home</a>
```

# Using with another type (in console)

```javascript
// Set hash
(new Hash.lib()).set({ val : 'hello' });
// Get hash
var h = (new Hash.lib()).get();
// Clear hash
(new Hash.lib()).clear();
// ...
```

```html
<button onclick="(new Hash.lib()).clear()">Clear page hash</button>
```


