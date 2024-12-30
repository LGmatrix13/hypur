import { button, p } from "./element.js";
import { onLoad, append } from "./hypur/index.js";

onLoad(() => {
  const search = input("search", {
    searchTerm: "",
  });
  const searchTerm = p("searchTerm", {
    clicked: 0,
  });
  const card = div("card");
  const addButton = button("addButton");

  function handleSearch(element, event) {
    search.setState(() => ({
      searchTerm: event.target.value,
    }));

    element.base.value = search.state.searchTerm;
    searchTerm.innerText(search.state.searchTerm);
  }

  function handleAddButton() {
    append(card, searchTerm, (element) => {
      element.innerText("Test");
    });
  }

  function handleSearchTerm(element) {
    element.setState((prev) => ({
      clicked: prev.clicked + 1,
    }));
    alert(`clicked ${element.state.clicked}`);
  }

  search.onEvent("input", handleSearch);
  addButton.onClick(handleAddButton);
  searchTerm.onClick(handleSearchTerm);
});
