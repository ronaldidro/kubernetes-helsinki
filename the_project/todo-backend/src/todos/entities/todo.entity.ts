export class Todo {
  id: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(description: string) {
    this.id = Date.now().toString();
    this.description = description;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
