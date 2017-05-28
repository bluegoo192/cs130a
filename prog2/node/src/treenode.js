function Node(data) {
    this.data = data;
    this.setLeft = function(child) {
        this.left = child;
    }
    this.setRight = function(child) {
        this.right = child;
    }
}

module.exports = Node;
