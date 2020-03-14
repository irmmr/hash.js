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

# Plugins
This plugins are Hash.load, Hash.server, Hash.spa. You can get them in "all file" or you can use them separately. [see plugins](/plugins)
> To using them you can use `hash.all` or include `plugins/{name}/Hash.{name}.js`

# How to use?
To use `Hash.js`, use [hash.all.min.js](/src/hash.all.min.js) file in your project or add `hash.js` with other plugins.
> If `Hash.ready`, you are using hash.js.

# Main library
`Hash.lib()` This is main library for manage page hash and change it. [click here](/src)

# Library informations
`Hahs.info()` It's for get library and plugins informations such as plugins status.

# Elements
`Hash.el()` I have nothing to say!

# Spa - plugin
`Hash.spa()` This is not a extensive SPA, this SPA just create a rout and append main html codes to element. You must add an element for SPA and add some routers. This library have Router too and by that you can run your functions and get informations from page hash.

# Loader - plugin
`Hash.load()` This library manage page loading and SPA loading. You can run your functions when page loaded. It's could also be in SPA loading too.

# Server and ajax - plugin
`Hash.server()` It's just ajax with POST and GET methods!

# Other
By `Hash.event` you can add some possibilities like `addEventListener` and by `Hash.ready` you can check library status.