# Sharing State Between a Grain and the Server

We don't want your state to feel trapped. If there is a state that lives on the server that needs to the piped down to a grain, take advantage of HTML attributes.

Take our button clicker example from (Creating a Reactive Grain)["/creating-a-reactive-grain.md"]:

```html
<div>
  <span is="clicker-count">I have not been clicked</span>
  <button is="clicker-button">Click me</button>
</div>
```

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
    Sow.first("clicker-count").innerText = `I have been clicked ${this.state.clicks} times`;
  }
}

Grain.mount("clicker-button", ButtonGrain);
```

Let's assume our backend can interpolate the current button count in the `p` tag' such that if the count is 5, it would return:

```html
<div>
  <span is="clicker-count">I have been clicked 5 times!</span>
  <button is="clicker-button">Click me</button>
</div>
```

To have 5 be used by our grain as the starting count, let's create an attribute `current-count="5"`:

```html
<div>
  <span is="clicker-count" current-count="5">I have been clicked 5 times!</span>
  <button is="clicker-button">Click me</button>
</div>
```

We can then use this in the `constructor` of our grain:

```ts
interface IButtonGrainState {
  clicks: number;
}

class ButtonGrain extends ReactiveGrain<IButtonGrainState> {
  constructor() {
    const currentCount = this.getAttribute("current-count");
    super({
      clicks: Number(currentCount),
    });
  }

  override onClick() {
    this.state.clicks++;
    Sow.first("clicker-count").innerText = `I have been clicked ${this.state.clicks} times`;
  }
}

Grain.mount("click-button", ButtonGrain);
```

`this.getAttribute("current-count")` is all we need to get that data from the html and save it into `ButtonGrain`'s state. Note that any value mapped to an attribute is a `string`, requiring casting as appropriate.

Say we now want to save the current count when the user stops clicking. We can use `this.put`, which sends a `PUT` request to the server with `ButtonGrain`'s state, inside an `override` for a `onMouseLeave`:

```ts
interface IButtonGrainState {
  clicks: number;
}

class ButtonGrain extends ReactiveGrain<IButtonGrainState> {
  constructor() {
    const currentCount = this.getAttribute("current-count");
    super({
      clicks: Number(currentCount),
    });
  }

  override onClick() {
    this.state.clicks++;
    Sow.first("clicker-count").innerText = `I have been clicked ${this.state.clicks} times`;
  }

  override onMouseLeave() {
    this.put("/save");
  }
}

Grain.mount("clicker-button", ButtonGrain);
```

That's it! In roughly 20 lines of code, we have an interface that shares state with a server!
