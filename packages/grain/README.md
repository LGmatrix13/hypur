# @hypur/grain

Lightweight package to easily introduce reactivity to to server-side applications

# Installation

Use your favorite package manager to install `@hypur/grain`

## Via NPM

```bash
npm install @hypur/grain
```

## Via yarn

```bash
yarn add @hypur/grain
```

## Via Bun

```bash
bun add @hypur/gain
```

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

# Creating a Form Grain

Forms are essential to the web. Using a `GrainForm` you can add client side reactativity to a `form` element.

Consider the following signup form and related grain:

```html
<form method="POST" action="/submit" is="signup-form">
  <input name="username" type="text" value="" required />
  <input name="password" type="password" value="" required />
</form>
```

```ts
interface ISignupFormData {
  username: string;
  password: string;
}

class SignupForm extends GrainForm<ISignupFormData> {
  constructor() {
    super();
  }
}

Grain.mount("signup-form", SignupForm);
```

We already have an interface for our data we expect the form to record. `GrainForm` accepts this as a generic, similar to how this is done in a `ReactiveGrain` for state.

Let's `console.log` the data recieved from the form. We can do this by creating an `override` for `handleData`:

```ts
interface ISignupFormData {
  username: string;
  password: string;
}

class SignupForm extends GrainForm<ISignupFormData> {
  constructor() {
    super();
  }

  override handleData(data: ISignupFormData) {
    console.log(data);
  }
}

Grain.mount("signup-form", SignupForm);
```

Nice! If you also check the network tab, the a `POST` request to `/submit` will be made since `action="/submit` and `method="POST"` on our `form` elements. If we didn't want a network request to happen, these attributes can be removed.

Suppose we wanted to handle the response recieved from server after making the `POST` to `/submit`. This also isn't hard. Simply make an `override` for `handleResponse`, which accepts a `Response` object. We want to get the json of the `Response`, so we'll make `handleResponse` an `async` function:

```ts
interface ISignupFormData {
  username: string;
  password: string;
}

class SignupForm extends GrainForm<ISignupFormData> {
  constructor() {
    super();
  }

  override async handleResponse(response: Response) {
    const json = await response.json();
    console.log(json);
  }
}

Grain.mount("signup-form", SignupForm);
```

Neat! What about [hypermedia](https://htmx.org/essays/hypermedia-apis-vs-data-apis/), though? We can use `Sow` to replace our form with the hypermedia sent from the server:

```ts
interface ISignupFormData {
  username: string;
  password: string;
}

class SignupForm extends GrainForm<ISignupFormData> {
  constructor() {
    super();
  }

  override async handleResponse(response: Response) {
    const hypermedia = await response.text();
    Sow.first("signup-form").outerHTML = hypermedia;
  }
}

Grain.mount("signup-form", SignupForm);
```

# Locating Elements

Use helper methods available via `Sow` to locate and work with other grains. Suppose you wanted to create a show/hide interface:

```html
<div>
  <p hidden="false" is="show-hide-message">I am visible!</p>
  <button>Hide message above</button>
</div>
```

```ts
class ShowHideButton extends Grain {
  constructor() {
    super();
  }

  override onClick() {
    const showHideMessage = Sow.first("show-hide-message");
    showHideMessage.hidden = !showHideMessage.hidden;
  }
}

Grain.mount("show-hidden-button", ShowHideButton);
```

`Sow` works by using the name you pass and compares it to elements with an `is` attribute. It returns an `HTMLElement`, so all your regular DOM methods are available.

# Sharing State Between a Grain and the Server

We don't want your state to feel trapped. If there is a state that lives on the server that needs to the piped down to a grain, take advantage of HTML attributes.

Take our button clicker example from (Creating a Reactive Grain)["/creating-a-reactive-grain.md"]:

```html
<div>
  <span is="click-count">I have not been clicked</span>
  <button is="click-button">Click me</button>
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
    Grain.first(
      "click-count"
    ).innerText = `I have been clicked ${this.state.clicks} times`;
  }
}

Grain.mount("click-button", ButtonGrain);
```

Let's assume our backend can interpolate the current button count in the `p` tag' such that if the count is 5, it would return:

```html
<div>
  <span is="click-count">I have been clicked 5 times!</span>
  <button is="click-button">Click me</button>
</div>
```

To have 5 be used by our grain as the starting count, let's create an attribute `current-count="5"`:

```html
<div>
  <span is="click-count" current-count="5">I have been clicked 5 times!</span>
  <button is="button-grain">Click me</button>
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
    Grain.first(
      "click-count"
    ).innerText = `I have been clicked ${this.state.clicks} times`;
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
    Grain.first(
      "click-count"
    ).innerText = `I have been clicked ${this.state.clicks} times`;
  }

  override onMouseLeave() {
    this.put("/save");
  }
}

Grain.mount("click-button", ButtonGrain);
```

That's it! In roughly 20 lines of code, we have an interface that shares state with a server!
