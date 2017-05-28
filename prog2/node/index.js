var splaytree = require('./src/splaytree.js');
var treenode = require('./src/treenode.js');

var node = new treenode("hi");
node.setLeft("left child");

console.log(JSON.stringify(node));
