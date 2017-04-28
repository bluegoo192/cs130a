module.exports = class linkedlist {
  constructor(data, next) {
    this.data = data;
    this.next = next;
  }

  append(data) {
    if (this.next) {
      this.next.append(data);
    } else {
      this.next = new linkedlist(data);
    }
  }

  seek(data) {
    if (this.data === data) return this;
    if (this.next) return this.next.seek(data);
    return null;
  }

}
