# Wrong argument order

I was writing a quick test utility, `nestedDropNullAndUndefined`. Here's how it looked.

```typescript
function nestedDropNullsAndUndefined(x) {
  if (Array.isArray(x)) {
    return x.map(nestedDropNullsAndUndefined);
  }
  if (typeof x === "object") {
    return Object.keys(x).reduce((k, obj) => {
      if (obj[k] !== null && obj[k] !== undefined) {
        obj[k] = nestedDropNullsAndUndefined(obj[k]);
      }
      return obj;
    }, {});
  }
  return x;
}
```

With that code, TypeScript will warn you about every use of `obj[k]`: "Type '{}' cannot be used as an index type". Despite the names I gave them, the arguments given to reduce's callback are `acc, curr`, in that order. I guessed the wrong order, but TypeScript had my back.
