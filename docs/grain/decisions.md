# Decisions

Here are some details to the design decisions involved with `@hypur/grain`.

## Why classes?

JavaScript and TypeScript developers hate classes. I get it, they're certainly a more verbose form of abstraction in JavaScript. However, for creating grains, they're really great. The `Grain` class is actually an extension of the `HTMLElement` class. This brings all APIs available in an `HTMLElement` to a grain. Moreovoer, extending the `HTMLElement` class is the only way to create custom Web Components. This is what a grain is: the HTML web component API allows grains and their respective state and events listeners to be easily reused and encapsulated. See [Web Components]("https://developer.mozilla.org/en-US/docs/Web/API/Web_components") to learn more about Web Components.
