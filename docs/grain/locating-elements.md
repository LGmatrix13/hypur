# Locating Elements

Use helper methods available via `Sow` to locate and work with other grains. Suppose you wanted to create a show/hide interface:

```html
<div>
  <p hidden="false" is="show-hide-message">I am visible!</p>
  <button is="show-hide-button">Hide message above</button>
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
