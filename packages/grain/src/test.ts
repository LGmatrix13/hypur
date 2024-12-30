import { Grain } from "./grain";
import { GrainForm } from "./grainForm";
import { prepend } from "./prepend";

interface ICommentData {
  user: string;
  content: string;
  image: string;
}

class Comment extends Grain<ICommentData> {
  constructor() {
    super("comment");
  }
}

class Comments extends Grain {
  constructor() {
    super("comment");
  }
}

interface IButtonState {
  clicks: number;
}

class Button extends Grain<IButtonState> {
  constructor() {
    super("button", {
      clicks: 0,
    });
  }

  override handle() {
    this.onClick(() => {
      this.setState((prev) => ({
        clicks: prev.clicks + 1,
      }));
    });
  }
}

class CommentForm extends GrainForm {
  constructor() {
    super("comment-form");
  }

  override async handleResponse(response: Response) {
    const target = new Comments();
    const predessor = new Comment();
    const hypermedia = await response.text();
    prepend.hypermedia(target, predessor, hypermedia);
  }
}

(() => {
  new CommentForm();
})();
