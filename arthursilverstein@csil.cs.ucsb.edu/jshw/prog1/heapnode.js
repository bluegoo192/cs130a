module.exports = class heapnode {

  constructor(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
  }

  //get the key to this node
  key() {
    if (this.data.key) return this.data.key;//if data has a key function, use it
    return this.data; //otherwise just use data itself as the key
  }

  isLeaf() {
    if (this.left || this.right) return false;
    return true;
  }

  depth() {//return the maximum depth of this node(starting at 0 for leaf nodes)
    if (this.isLeaf()) return 0;
    //since the tree fills left to right, the left is always deeper
    return (1+this.left.depth());
  }

  insert(data) {
    //simple case: one or both children are null
    if (!this.left) {//check the left side
      this.left = new heapnode(data);
    } else if (!this.right) {//then the right side
      this.right = new heapnode(data);
    } else {
      //both children exist already
      if (this.right.depth() < this.left.depth) {//if left is deeper
        this.right.insert(data); //recursively insert on the right
      } else {
        //right should NEVER be deeper than left, so if we are here, they're even
        this.left.insert(data);
      }
    }

    this.percolate();
  }

  percolate() {
    if (this.isLeaf()) return;
    if (!this.right) {
      var smallerChild = this.left;
    } else {
      var smallerChild = (this.left.key() < this.right.key()) ? this.left : this.right;
    }
    console.log("  this.key="+this.key()+"  smallerChild.key="+smallerChild.key());
    if (this.key() > smallerChild.key()) {
      console.log("  percolating!");
      var swap = this.data;
      this.data = smallerChild.data;
      smallerChild.data = swap;
      smallerChild.percolate();
    }
  }

}
