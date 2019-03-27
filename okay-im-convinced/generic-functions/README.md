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

But what's its type signature? As it stands, the function accepts an `any` argument and returns an `any` value. We do want it to work for any possible value, but by returning an `any` we are interfering with TypeScript's ability to track the types of values.

```typescript
const nums: number[] = [5, 6, 7, 8];
const squares = nums.map(x => x * x); // inferred as number[]
const loggedSquares = log(squares); // inferred as any
```

This is a problem because if TypeScript things our value is of type `any` rather than `number[]`, it won't catch when we make a mistake:

```typescript
// Error: Operator '+' cannot be applied to types number[] and 5
const plusFive = squares + 5;

// no complaint from TS
const loggedPlusFive = loggedSquares + 5;
```

What we really want to say is not "`log` accepts an arg of any type and returns a value of any type" but rather "`log` accepts an arg of some type and returns a value of _that same type_". Generic Functions give us a way to do this. Let's rewrite our `log` function using generics.

```typescript
function log<T>(x: T): T {
  console.log(x);
  return x;
}
```

The `<T>` syntax introduces what's called a "type variable" or "type parameter". Just how function parameters are stand-ins for a value that will be determined later, a type variable is a stand-in for a _type_ that will be determined later. Giving a name to the type is how we're able to specify "`log` accepts a variable of some type `T` and returns a variable of that same type `T`".

### Type Parameter Inference

In rare occasions, you may need to specify what concrete types you want in your type parameters. Most of the time, TypeScript will figure it out for you. Using our `log` function from before:

```typescript
const x: number = 5;

log<number>(x); // you're allowed to specify what type you want
log(x); // TS knows x is a number, so it figures out that log<T> should be log<number>
```

### Type parameters in other languages

Sometimes it's helpful to see how the same concept looks in other languages. Python is another language that recently had a type system bolted on top of it. In python, we need to declare a value as a type parameter before using it.

```python
from typing import Sequence, TypeVar

T = TypeVar('T')  # Declare the type variable

def first(lst: Sequence[T]) -> T:
  return lst[0]
```

Without that `T = TypeVar('T')` declaration, python would go looking for a nearby or imported type called literally `T`. Probably, it would fail with a `NameError` when it didn't find a type of that name. Worse, maybe there _is_ a type called `T`, and we've unwittingly written a function that only works on values of that type. By declaring it as a `TypeVar`, we're telling the typechecker: "There isn't really a type called `T`. Instead, `T` is a placeholder for a type to be decided later.

In my opinion, TypeScript's `<T>` is a nicer syntax, but it serves the same purpose.

### Multiple Type Parameters

Some functions' type definitions have two or more type variables. `map` is a common example: It takes an array of some type (the first type parameter), a function from that first type to another type, and returns an array of that second type. It's even hard to write about without using names! Let's try again with names:

> `map` accepts an array of some type `T`, a function from `T` to another type `R`, and produces an array of `R`.

With practice, the TypeScript syntax will become easier to read than the english. Here's what it looks like for map:

```typescript
function map<T, R>(arr: T[], mapper: (t: T) => R): R[]
```

And once more, with descriptions alongside

```typescript
function map
  <T, R>( // for some types T and R
    arr: T[], // arr is an array of T
    mapper: (t: T) => R // mapper is a function from T to R
  ): R[] // The return value is an array of R
```


### References

- [the TypeScript docs on Generics](https://www.typescriptlang.org/docs/handbook/generics.html)
