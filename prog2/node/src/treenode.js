function Node(data) {
    this.data = data;
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
    console.log("splaying "+this.data);
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
    var target = ((item > this.data) ? this.right : this.left);
    if (typeof target === 'undefined' || target === null) { //if we reach null
        target = new Node(item);
    } else {
        target.insert(item);
    }
}

module.exports = Node;
