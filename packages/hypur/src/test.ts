import { element } from "./element";
import { elements } from "./elements";

const url = new URL("/todos", "localhost:3000");

const deleteButtons = elements("delete-button");
const likeButtons = elements("like-button");
const hideButton = element("open-modal", {
  hidden: false,
});

deleteButtons.onClick((self) => {
  self.delete(url, () => {
    self.remove();
  });
});

likeButtons.onClick((self) => {
  self.post(url, () => {
    self.element.innerText = "Liked!";
  });
});

hideButton.onClick((element) => {
  element.state.hidden = !element.state.hidden;
});
