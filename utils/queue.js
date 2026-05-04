class DeliveryQueue {
  constructor() { this.items = []; }

  enqueue(req) {
    req.id        = Date.now();
    req.status    = 'pending';
    req.timestamp = new Date().toISOString();
    this.items.push(req);
    return req;
  }

  dequeue() {
    if (this.isEmpty()) return null;
    const item = this.items.shift();
    item.status = 'processed';
    return item;
  }

  peek()    { return this.items[0] || null; }
  isEmpty() { return this.items.length === 0; }
  getAll()  { return this.items; }
  size()    { return this.items.length; }
}

module.exports = new DeliveryQueue();