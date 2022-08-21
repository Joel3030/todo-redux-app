export class Todo {
  public done: boolean;
  public id: number;
  public text: string;

  constructor(text: string) {
    this.done = false;
    this.id = Math.random();
    this.text = text;
  }
}
