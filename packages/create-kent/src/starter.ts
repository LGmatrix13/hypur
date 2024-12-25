import { element } from "../../kent/build";

const button = element({
  id: "button",
  state: {
    count: 0,
  },
});

button.onClick((self) => {
  self.state.count++;
  self.innerText = `I have been clicked ${self.state.count} times`;
});
