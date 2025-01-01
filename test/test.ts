import { Grain, ReactiveGrain } from "../builds/grain/index.js";

interface ICardButtonState {
  clicks: number;
}

class CardButton extends ReactiveGrain<ICardButtonState> {
  constructor() {
    super({
      clicks: 0,
    });
  }

  override onClick() {
    this.post("/test", () => {
      
    });
    this.state = {
      clicks: this.state.clicks + 1,
    };
    const card = Grain.within(
      this.parentElement as HTMLElement,
      "card-title"
    ) as HTMLElement;
    card.innerText = `I have been clicked ${this.state.clicks} times!`;
  }
}

class AddCardButton extends Grain {
  constructor() {
    super();
  }

  override onClick() {
    const newCard = Grain.last("card").cloneNode(true) as HTMLElement;
    Grain.spread(newCard, {
      "card-title": "New Card!",
      "card-button": "Click me, i'm new!",
    });
    Grain.first("cards").append(newCard);
  }
}

Grain.mount("button-add-card", AddCardButton);
Grain.mount("card-button", CardButton);
