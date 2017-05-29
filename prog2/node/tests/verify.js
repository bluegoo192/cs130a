var Node = require('../src/treenode.js');

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

function verify(node) {
    if (typeof node === 'undefined' || node === null) return true;
    if (!node.verify()) return false;
    return (verify(node.left) && verify(node.right));
}

module.exports = verify;
