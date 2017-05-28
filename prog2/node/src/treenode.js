function Node(data, parent) {
    this.data = data;
    this.parent = parent;
    this.setLeft = function(child) {
        this.left = new Node(child);
    }
    this.setRight = function(child) {
        this.right = new Node(child);
    }
    this.valueOf = function() { return this.data; }
    if (typeof this.data === 'undefined' || this.data === null) {
        console.log("something is terribly wrong, we have a node with no data");
    }
}

Node.prototype.splay = function() {
    //console.log("splaying "+this.data);
}

Node.prototype.verify = function() {
    //ONLY VERIFIES THE CURRENT NODE.  DOES NOT CHECK CHILDREN
    var correct = true
    if (!(typeof this.left === 'undefined' || this.left === null)) {
        if (this.left.data >= this.data) {
            correct = false;
            console.log("Something's wrong. left("+this.left.data+") >= data("+this.data+")");
        }
    }
    if (!(typeof this.right === 'undefined' || this.right === null)) {
        if (this.right.data <= this.data) {
            correct = false;
            console.log("Something's wrong. right("+this.right.data+") <= data("+this.data+")");
        }
    }
    return correct;
}

Node.prototype.access = function(target) {
    if (this.data === target) { //if we reached our target
        this.splay();           //splay
        return this;            //and return
    }
    var next = ((target > this.data) ? this.right : this.left);
    if (typeof next === 'undefined' || next === null) { //if we reach a null node
        this.splay();                                   //splay
        return null;                                    //return null
    } else {
        return next.access(target);//otherwise, recurse onwards
    }
}

Node.prototype.insert = function(item) {
    if (this.access(item) !== null) return false;
    var target = ((item > this.data) ? 'right' : 'left');
    if (typeof this[target] === 'undefined' || target === null) { //if we reach null
        this[target] = new Node(item, this);
    } else {
        this[target].insert(item);
    }
}

Node.prototype.rotate = function() {
    //simple rotation
    this.
}

module.exports = Node;
