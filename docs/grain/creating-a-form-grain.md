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
