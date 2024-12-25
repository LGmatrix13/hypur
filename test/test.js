import { div, button, elements } from "./index.js";

function counter() {
  const counter = div("clicker", {
    count: 0,
    message: "",
  }).bind();
  const count = button("count");

  count.onClick(() => {
    counter.setState((prev) => ({
      message: `Clicked ${prev.count + 1}`,
      count: prev.count + 1,
    }));
  });
}

function likeButtons() {
  const likeButtons = elements("likeButton", {
    liked: false,
    likeButtonTitle: "Like?",
  }).bind();
  const likeButtonRemove = elements("likeButtonRemove");

  likeButtons.onClick((self) => {
    self.setState((prev) => ({
      liked: !prev.liked,
      likeButtonTitle: prev.liked ? "Like?" : "Liked!",
    }));
  });

  likeButtonRemove.onClick((self) => {
    self.parent.remove();
  });
}

onLoad(() => {
  counter();
  likeButtons();
});
