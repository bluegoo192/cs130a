var Splaytree = require('./src/splaytree.js');
var Treenode = require('./src/treenode.js');
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

var tree = new Splaytree();

rl.on('line', function(line) {
    var words = line.split(" ");
    if (words[0] === "insert") console.log(tree.insert(parseInt(words[1], 10)));
    if (words[0] === "find") console.log(tree.find(parseInt(words[1], 10)));
    if (words[0] === "delete") console.log(tree.delete(parseInt(words[1], 10)));
    if (words[0] === "print") tree.print();
    if (words[0] === "dprint") tree.detailedPrint();
})
