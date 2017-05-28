function verify(node) {
    if (typeof node === 'undefined' || node === null) return true;
    if (!node.verify()) return false;
    return (verify(node.left) && verify(node.right));
}

module.exports = verify;
