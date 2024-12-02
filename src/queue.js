class Queue {
  constructor() {
    this.queue = [];
    this.cursor = -1;

    setInterval(() => {
      if (this.queue.length > 0 && this.cursor !== -1) {
        const currentTicket = this.queue[this.cursor];
        this.queue.splice(this.cursor, 1);
        this.queue.push(currentTicket);
        this.cursor = 0;
      }
    }, 15000);
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
