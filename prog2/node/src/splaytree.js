var Node = require('./treenode.js');

function Splaytree() {
    this.insert = function(data) {
        if (typeof this.data === 'undefined' || this.data === null) {
            this.data = new Node(data);
        } else {
            console.log('adding multiple nodes is not supported yet');
        }
    }
}

module.exports = Splaytree
