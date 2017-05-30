var Node = require('./treenode.js');
var exists = require('./exists.js');

function Splaytree() {
    this.insert = function(data) {
        if (typeof this.root === 'undefined' || this.root === null) {
            this.root = new Node(data, null);
            this.largest = data;
            return "item "+data+" inserted";
        } else {//if we have data in the tree
            if (data > this.largest) this.largest = data;
            this.root.insert(data);//todo: replace
        }
    }
    this.split(i, t) {
        var both = [];
        if (!exists(t.root)) return null;
        t.access(i);
        var side = ((t.root.data > i) ? 'left' : 'right');
        both = [t.root[side], t.root];
        t.root[side] = null;
        return both;
    }
    this.access = function(i) {
        if (exists(this.root)) {
            return this.root.access(i);
        } else {
            return null;
        }
    }
    this.find = function(i) {
        if (exists(this.access(i))) {
            return "item "+i+" found";
        } else {
            return "item "+i+" not found";
        }
    }
}

module.exports = Splaytree
