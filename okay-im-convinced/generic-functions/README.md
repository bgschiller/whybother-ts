# Generic Functions

Let's think about a simple log function

```typescript
function log(x) {
  console.log(x);
  return x;
}
```

I find it to be more useful than `console.log` on its own because I can use it in big chains to see what's going on.

```typescript{3,5}
const commandLineArgs = args
  .map(validate)
  .map(log) // logs values without modifying them
  .filter(differentThanDefault)
  .map(log)
  .reduce(collect, {});
```

But what's its type signature? As it stands, the function accepts an `any` argument and returns an `any` value.
https://clip.brianschiller.com/PKtd6C1-2019-02-07.txt
