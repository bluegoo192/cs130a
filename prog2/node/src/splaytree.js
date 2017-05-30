var Node = require('./treenode.js');
var exists = require('./exists.js');

function Splaytree() {
    this.insert = function(data) {
        if (typeof this.root === 'undefined' || this.root === null) {
            this.root = new Node(data, null);
            this.largest = data;
            return "item "+data+" inserted";
        } else if (!exists(this.root.access(data))) {//if we have data in the tree
            if (data > this.largest) this.largest = data;
            var branches = this.split(data, this);
            this.root = new Node(data, null);
            if (exists(branches[0])) {
                var side = ((branches[0].data > data) ? 'right' : 'left');
                this.root[side] = branches[0];
                this.root[side].parent = this.root;
            }
            if (exists(branches[1])) {
                var side = ((branches[1].data > data) ? 'right' : 'left');
                this.root[side] = branches[1];
                this.root[side].parent = this.root;
            }
            return "item "+data+" inserted";
        } else {
            return "item "+data+" not inserted ; already present";
        }
    }
    this.split = function(i, t) {
        var both = [];
        if (!exists(t.root)) return null;
        t.access(i);
        var side = ((t.root.data > i) ? 'left' : 'right');
        both = [t.root[side], t.root];
        t.root[side] = null;
        if (exists(both[0])) both[0].parent = null;
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
    this.print = function() {
        if (exists(this.root)) this.root.print();
    }
    this.join = function(t1, t2) {
        t1.access(t1.largest);
        if (t1.root.data >= t2.root.data || !exists(t1.root) || !exists(t2.root)) {
            console.log('error: bad parameters for tree.join');
            return null;
        }
        t1.root.right = t2.root;
        t1.largest = t2.largest;
        return t1;
    }
}

module.exports = Splaytree
