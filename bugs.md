### `.clear()` trigger is running faster that others

```javascript
Hash.on("change", (e) => console.log(Date.now(), e.to));

Hash.set("/message?page=1&content=hey")
  .v.add("-page")
  .q.update("page", 2)
  .str.add("-b", "after:content")
  .m.clear();

/*
...3230 <empty string>
...3232 /message?page=1&content=hey
...3232 /message-page?page=1&content=hey
...3233 /message-page?page=2&content=hey
...3233 /message-page?page=2&content-b=hey
*/
```
