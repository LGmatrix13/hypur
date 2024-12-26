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

  function handleSearch(self, event) {
    search.setState(() => ({
      searchTerm: event.target.value,
    }));
    self.value = search.state.searchTerm;
    searchTerm.element.innerText = search.state.searchTerm;
  }

  function handleAddButton() {
    append(card, searchTerm, (self) => {
      self.element.innerText = "Test";
    });
  }

  function handleSearchTerm(self) {
    self.setState((prev) => ({
      clicked: prev.clicked + 1,
    }));
    alert(`clicked ${self.state.clicked}`);
  }

  search.onEvent("input", handleSearch);
  addButton.onClick(handleAddButton);
  searchTerm.onClick(handleSearchTerm);
});
