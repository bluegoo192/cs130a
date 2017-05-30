var Splaytree = require('./src/splaytree.js');
var Treenode = require('./src/treenode.js');

var make = require('./tests/make.js');
var verify = require('./tests/verify.js');

var tree = new Splaytree();
tree.insert(5);
tree.insert(-6);
tree.insert(10);
tree.insert(3);
