function Node(data, parent = null) {
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
Node.prototype.rotate = function(childstr) {
    //call this method on the parent; child is the node to rotate
    //childstr is either 'left' or 'right'
    //this method does modify other nodes directly, but returns a new tree
    if (childstr !== 'left' && childstr !== 'right') {//check params
        console.log("Something's wrong.  Node.rotate called with bad parameter, should be left or right");
        return null;
    }
    if (typeof this[childstr] === 'undefined' || this[childstr] === null) return this;
    var otherside = ((childstr === 'left') ? 'right' : 'left');
    var root = new Node(this[childstr].data, this.parent);//create a new root
    root[childstr] = this[childstr][childstr];
    if (!(typeof root[childstr] === 'undefined' || root[childstr] === null)) {
        root[childstr].parent = root;
    }
    var otherchild = new Node(this.data, root);
    otherchild[otherside] = this[otherside];
    if (!(typeof otherchild[otherside] === 'undefined' || otherchild[otherside] === null)) {
        otherchild[otherside].parent = otherchild;
    }
    otherchild[childstr] = this[childstr][otherside];
    if (!(typeof otherchild[childstr] === 'undefined' || otherchild[childstr] === null)) {
        otherchild[childstr].parent = otherchild;
    }
    root[otherside] = otherchild;
    otherchild.parent = root;
    return root;
}

module.exports = Node;
