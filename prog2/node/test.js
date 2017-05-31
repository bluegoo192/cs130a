var Splaytree = require('./src/splaytree.js');
var Treenode = require('./src/treenode.js');

var make = require('./tests/make.js');
var verify = require('./tests/verify.js');

var tree = new Splaytree();
tree.insert(5)
tree.insert(8)
tree.insert(6)
tree.insert(7)
tree.insert(2)
tree.insert(3)
tree.insert(4)
tree.insert(9)
tree.insert(10)
tree.insert(1)
tree.find(9)
tree.delete(6)
tree.find(2)
tree.delete(1)
