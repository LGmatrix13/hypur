# Creating a Grain

Creating your first grain is easy. Start in your html file. Let's have a button be a grain:

```html
<div>
  <span>I have not been clicked</span>
  <button is="button-grain">Click me</button>
</div>
```

Then, create a class to represents this grain:

```ts
class ButtonGrain extends Grain {
  constructor() {
    super();
  }
}
```

Let's say we want to react to `button-grain` being clicked. To do this, we can `override` the `onClick` function:

```ts
class ButtonGrain extends Grain {
  constructor() {
    super();
  }

  override onClick() {
    console.log("I was clicked!");
  }
}
```

Now let's mount this grain using `Grain.mount` to see the magic happen:

```ts
class ButtonGrain extends Grain {
  constructor() {
    super();
  }

  override onClick() {
    console.log("I was clicked!");
  }
}

Grain.mount("button-grain", ButtonGrain);
```

In the console you should now see "I was clicked!" when you click `button-grain`!
