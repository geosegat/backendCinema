class Queue {
  constructor() {
    this.queue = [];
    this.cursor = -1;

    setInterval(() => {
      this.callNext();
    }, 10000);
  }

  getMyNumber() {
    const ticketNumber = Date.now();
    this.queue.push(ticketNumber);
    if (this.cursor === -1) {
      this.cursor = 0;
    }
    return ticketNumber;
  }

  getCurrentInQueue() {
    return this.queue[this.cursor];
  }

  getNextInQueue() {
    return this.cursor + 1;
  }

  callNext() {
    const hasNext = !!this.queue[this.cursor + 1];

    if (hasNext) {
      this.cursor++;
    } else {
      this.queue = [];
      this.cursor = -1;
    }
  }

  getDistance(ticketNumber) {
    console.log(this.queue, this.cursor, ticketNumber);

    const ticketNumberPosition = this.queue.findIndex(
      (t) => t === ticketNumber
    );
    console.log(ticketNumberPosition);
    if (ticketNumberPosition === -1) {
      return null;
    }
    return ticketNumberPosition - this.cursor;
  }
}

exports.cinemaQueue = new Queue();
