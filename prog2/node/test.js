var Splaytree = require('./src/splaytree.js');
var Treenode = require('./src/treenode.js');

var make = require('./tests/make.js');
var verify = require('./tests/verify.js');

var tree = new Splaytree();
var node = new Treenode(5, null);
node.left = new Treenode(3, node);
node.right = new Treenode(7, node);
