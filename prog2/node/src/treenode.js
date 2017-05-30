var exists = require('./exists.js');

function Node(data, parent) {
    this.data = data;
    this.parent = parent;
    this.setLeft = function(child) {
        this.left = new Node(child, this);
    }
    this.setRight = function(child) {
        this.right = new Node(child, this);
    }
    this.valueOf = function() { return this.data; }
    if (typeof this.data === 'undefined' || this.data === null) {
        console.log("something is terribly wrong, we have a node with no data");
    }
    this.isLeftChild = function() {
        if (typeof this.parent === 'undefined' || this.parent === null) return false;
        return (this === this.parent.left);
    }
    this.isRightChild = function() {
        if (typeof this.parent === 'undefined' || this.parent === null) return false;
        return (this === this.parent.right);
    }
    this.setTo = function(node) {
        this.parent = node.parent;
        this.data = node.data;
        this.left = node.left;
        if (exists(this.left)) this.left.parent = this;
        this.right = node.right;
        if (exists(this.right)) this.right.parent = this;
    }
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

//rotate the current node upwards
//unlike rotateChild, this does the operation in-place
Node.prototype.rotateUp = function() {
    //return if root
    if (!exists(this.parent)) return;
    var newChild = new Node(this.parent.data, this);
    if (this.isLeftChild()) {   //rotate left
        newChild.left = this.right;
        newChild.right = this.parent.right;
        if (exists(newChild.left)) newChild.left.parent = newChild;
        this.right = newChild;
    } else if (this.isRightChild()) {   //rotate right
        newChild.right = this.left;
        newChild.left = this.parent.left;
        if (exists(newChild.right)) newChild.right.parent = newChild;
        this.left = newChild;
    } else {
        //we've got a serious error -- this isn't a left OR right child???
        console.log("SERIOUS WTF ERROR IN ROTATEUP");
        console.log(this.isLeftChild +" "+this.isRightChild)
        return;
    }
    var grandparent = this.parent.parent;
    this.parent.setTo(this);
    this.parent = grandparent;
}

Node.prototype.splayOnce = function() {
    if (typeof this.parent == 'undefined' || this.parent === null) return;//if root
    if (typeof this.parent.parent == 'undefined' || this.parent.parent === null) {
        //case 1: parent is root
        this.rotateUp();//rotate the child upwards
        return;
    } else if ( (this.isLeftChild() && this.parent.isLeftChild()) ||
                (this.isRightChild() && this.parent.isRightChild()) ) {
        //case 2: parent is not root, x and parent are on the same side
        this.parent.rotateUp();
        this.rotateUp();
    } else {
        //case 3: parent isn't root, x and parent on different sides
        this.rotateUp();
        this.parent.rotateUp();
    }
}

Node.prototype.splay = function() {
    while (exists(this.parent)) {
        this.splayOnce();
    }
}

module.exports = Node;
