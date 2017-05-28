function rand() {
    return Math.floor(Math.random() * 1000)
}

function makerandom(iterations) {
    var rn = new Treenode(rand())
    for (var i=0; i<iterations; i++) {
        rn.insert(rand());
    }
    return rn;
}
module.exports = makerandom;
