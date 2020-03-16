<p align="center"><img width="100" src="https://raw.githubusercontent.com/irmmr/hash.js/master/logo/logo.png" alt="Hash Js"></p>

<p align="center">
  <a href="https://github.com/irmmr/hash.js/blob/master/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/irmmr/hash.js"></a>
    <img alt="GitHub license" src="https://img.shields.io/static/v1?label=version&message=v1.2.7&color=success">
  <img alt="GitHub license" src="https://img.shields.io/static/v1?label=npm&message=not%20yet&color=inactive">
  <a href="https://github.com/irmmr/hash.js/tree/master/doc"><img alt="GitHub license" src="https://img.shields.io/static/v1?label=docs&message=passing&color=blue"></a>
  
</p>

# Hash.js
**Hash.js** is a simple and useful javascript library! it's just for fun and the truth is that **Hash.js** is not very powerful. This library don't need Node and Node don't need this library!
**Hash.js** have 4 main parts! A main library plus 3 plugin. This plugins used for load, server(ajax), spa.

This library is mostly used to manage `The page hash`, but you can provide a `router` and a `spa` with it.

# Demo
To watching demos, check [demo](/demo) folder.
> First, **download** or **clone** the project and next open [`index file`](/demo/index.html) in your browser.

# Document
To read all the documents, check the [doc](/doc) folder. The document of every version only have different parts and new features.

# Examples
You can see example sources in [EXAMPLE.md](EXAMPLE.md) file. All example sources are only a sample for better using for you.
```javascript
/*
* Simple example for set a query
* #page=12&type=test
*/
var ob = new Hash.lib();
ob.set({
  query : {
    page : 12,
    type : 'test'
  }
});
// or
// #hello/babe
ob.set({
  val : 'hello/babe'
});
```

# Plugins
This plugins are Hash.load, Hash.server, Hash.spa. You can get them in "all file" or you can use them separately. [see plugins](/plugins)
> To using them you can use `hash.all` or include `plugins/{name}/Hash.{name}.js`

# How to use?
To use `Hash.js`, use [hash.all.min.js](/src/hash.all.min.js) file in your project or add `hash.js` with other plugins.
> If `Hash.ready`, you are using hash.js.

# Libraries
- `Hash.lib` : The main library for manage page hash and make query.
- `Hash.el` : The element library for some abilities in replace and other.
- `Hash.info` : The info library for getting plugins status and package versions.
- `Hash.ready` : A simple variable for check library is ready.
- `Hash.event` : A simple function like **addEventListener**.
- `Hash.spa` : The spa library for making simple spa and router plus rendering in page.
- `Hash.server` : The server library that only can create ajax request.
- `Hash.load` : The loader library for making page loading and components loading.

# Target
This library is for entertainment purposes only. If you can't use complex libraries, you can make a simple spa and used that. If you want make query with your page `hash` you can use `Hash.js` or when you want create a ajax request. 

The `Hash.spa` is not a complex `spa` but it usable in many times.
