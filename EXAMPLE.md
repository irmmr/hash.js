# Example use
>  For checking plugins, you can use `Hash.info`

`Example 1`

```javascript
var lib = new Hash.lib(),
    inf = new Hash.info(),
    ver = Number(inf.version);

if (ver >= 1.2) {
    lib.set({
        val : 'start/document' 
    });
} else {
    console.warn(`Please update hash.js!`);
}
```

`Example 2`

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

`Example 3`

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

`Example 4`


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

`Example 5`


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


`Example 6`

```javascript
var lib = new Hash.lib();

if (lib.have())
    lib.clear();
```

`Example 7`

```html
<!-- in spa library -->
<h-link link="home" h-top="false">Home</h-link>
<h-link link="doc" h-top="true">Document</h-link>
<h-link link="download/2234/file/48884452345">Download</h-link>
```


