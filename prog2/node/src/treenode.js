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
    this.isLeftChild = function() {
        if (typeof this.parent === 'undefined' || this.parent === null) return false;
        return (this === this.parent.left);
    }
    this.isRightChild = function() {
        if (typeof this.parent === 'undefined' || this.parent === null) return false;
        return (this === this.parent.right);
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
//rotate with a child
//this is a really bad function -- make sure to assign the returned value or you're screwed
//todo: fix
/*Node.prototype.rotateChild = function(childstr) {
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
}*/

//rotate the current node upwards
//unlike rotateChild, this does the operation in-place
Node.prototype.rotateUp = function() {
    if (typeof this.parent === 'undefined' || this.parent === null) return;//return if root
    if (this.parent.isLeftChild()) var refToParent = 'left';
    if (this.parent.isRightChild()) var refToParent = 'right';
    var newChild = new Node(this.parent.data, this);
    if (this.isLeftChild()) {
        //rotate left
        newChild.left = this.right;
        newChild.left.parent = newChild;
        this.right = newChild;
    } else if (this.isRightChild()) {
        //rotate right
        newChild.right = this.left;
        newChild.right.parent = newChild;
        this.left = newChild;
    } else {
        //we've got a serious error -- this isn't a left OR right child???
        console.log("SERIOUS WTF ERROR IN ROTATEUP")
        return;
    }
    this.parent = this.parent.parent;//assign parent reference to grandparent
    if (!(typeof this.parent === 'undefined' || this.parent === null)) {
        //if our new parent exists, update it's reference to this
        this.parent[refToParent] = this;
    }
}

Node.prototype.splay = function() {
    return;
    if (typeof this.parent == 'undefined' || this.parent === null) return;//if root
    if (typeof this.parent.parent == 'undefined' || this.parent.parent === null) {
        //case 1: parent is root
        this.rotateUp();//rotate the child upwards
        return;
    } else {
        console.log("looks like you're trying to splay. not implemented yet");
    }
}

module.exports = Node;
