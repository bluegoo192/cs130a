function exists(obj) {
    return (!(typeof obj === 'undefined' || obj === null));
}

module.exports = exists;
