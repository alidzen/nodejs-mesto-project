// errors/not-found-err.js

class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
