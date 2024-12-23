import { element, state } from "./build";

// elements
const btn = element("btn");

// state + singals
const { get: getCount, set: setCount } = state(0, (value) =>
  btn.setContent(value)
);

// listeners
btn.onClick(() => setCount(getCount() + 1));
