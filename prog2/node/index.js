var splaytree = require('./src/splaytree.js');
var treenode = require('./src/treenode.js');

var tree = new splaytree();
tree.insert(4);

console.log(JSON.stringify(tree));
