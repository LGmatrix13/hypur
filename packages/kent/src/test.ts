import { element } from "./element";
import { elements } from "./elements";

const url = new URL("/todos", "localhost:3000");

const deleteButtons = elements({ className: "delete-button" });
const likeButtons = elements({ className: "like-button" });
const counter = element({
  id: "counter",
  state: {
    count: 0,
  },
});
const hideButton = element({
  id: "open-modal",
  state: {
    hidden: false,
  },
});
const modal = element({ id: "modal" });
const todoInput = element({
  id: "todo-input",
  state: {
    value: "",
  },
});
const todoSubmitBtn = element({ id: "todo-btn" });
const todos = elements({ className: "todos" });

deleteButtons.onClick((element) => {
  element.delete(url, () => {
    element.remove();
  });
});

likeButtons.onClick((element) => {
  element.post(url, () => {
    element.innerText = "Liked!";
  });
});

hideButton.onClick((element) => {
  element.state.hidden = !element.state.hidden;
  modal.hidden = element.state.hidden;
});

todoSubmitBtn.onEvent("submit", () => {
  todoInput.state.value = todoInput.innerText;
  todoInput.post(url, async (data) => {
    const json = await data.json();
    todos.append(json.task);
  });
});

counter.onClick((element) => {
  element.state.count++;
  element.innerText = `I have been counted ${element.state.count} times`;
});
