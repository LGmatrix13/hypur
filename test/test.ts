import { Grain, ReactiveGrain } from "../builds/grain/index.js";

interface ICardButtonState {
  clicks: number;
}

class CardButton extends ReactiveGrain<ICardButtonState> {
  constructor() {
    const defaultState = {
      clicks: 0,
    };
    super("card-button", defaultState);
  }

  override onClick() {
    this.state = {
      clicks: this.state.clicks + 1,
    };
    const card = Grain.within(
      this.base.parentElement as HTMLElement,
      "card-title"
    );
    card.innerText(`I have been clicked ${this.state.clicks} times!`);
  }
}

class AddCardButton extends Grain {
  constructor() {
    super("button-add-card");
  }

  override onClick() {
    const newCard = Grain.last("card").clone();
    Grain.first("cards").append(newCard);
    mount();
  }
}

function mount() {
  new AddCardButton().mount();
  new CardButton().mount();
}
