# Creating a Reactive Grain

This builds off of the [Creating a Grain](/creating-a-grain.md) tutorial. Recall the `ButtonGrain` we created:

```html
<div>
  <span>I have not been clicked</span>
  <button is="button-grain">Click me</button>
</div>
```

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

Let's say we want to count the number of times a grain is clicked. To do this, we must `extends` `ReactiveGrain` instead of `Grain` to introduce state for `ButtonGrain`:

```ts
class ButtonGrain extends ReactiveGrain {
  constructor() {
    super();
  }

  override onClick() {
    console.log("I was clicked!");
  }
}
```

I'm using typescript here, so let's create an `interface` so our state is typed. This can be passed as a generic into `ReactiveGrain`. Let's also initialize state in our constructor `super()` call:

```ts
interface IButtonGrainState {
  clicks: number;
}

class ButtonGrain extends ReactiveGrain<IButtonGrainState> {
  constructor() {
    super({
      clicks: 0,
    });
  }

  override onClick() {
    console.log("I was clicked!");
  }
}
```

We'll want to increment counts when the button is clicked, so let's update `ButtonGrain`'s state in the `onClick` function:

```ts
interface IButtonGrainState {
  clicks: number;
}

class ButtonGrain extends ReactiveGrain<IButtonGrainState> {
  constructor() {
    super({
      clicks: 0,
    });
  }

  override onClick() {
    this.state.clicks++;
  }
}
```

That's nice, but we probably want to reflect state updates on our UI. Let's update our HTML to add a `is` attribute to our `span` element:

```html
<div>
  <span is="click-count">I have not been clicked</span>
  <button is="button-grain">Click me</button>
</div>
```

Now, we can use `Sow` to locate `click-count` and update its contents. Read [Locating Elements](/locating-elements.md) to learn more about `Sow`:

```ts
interface IButtonGrainState {
  clicks: number;
}

class ButtonGrain extends ReactiveGrain<IButtonGrainState> {
  constructor() {
    super({
      clicks: 0,
    });
  }

  override onClick() {
    this.state.clicks++;
    Grain.first(
      "click-count"
    ).innerText = `I have been clicked ${this.state.clicks} times`;
  }
}
```

Now we have a simple counter clicker app in roughly 12 lines of client-side code!
