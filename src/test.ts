import { element } from "./element";

const card = element("card", {
  clickCount: 0,
});

const title = element("title");

card.onClick((self) => {
  self.state.clickCount += 1;
  self.spread(self, "Count", self.state.clickCount);
  title.innerText = `You have clicked ${self.state.clickCount}`;
});
