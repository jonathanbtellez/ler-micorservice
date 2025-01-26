export class NotFound extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}