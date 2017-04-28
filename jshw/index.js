var LinkedList = require('./prog1/linkedlist');
var Heap = require('./prog1/heapnode');

var testlist = new LinkedList(1);
var heap = new Heap(2);

test = function () {
  heap.insert(1);
  heap.insert(3);
  heap.insert(5);
  console.log(JSON.stringify(heap));
}

checkheap = function(h) {
  console.log("leaf? " + h.isLeaf());
  console.log("depth: " + h.depth());
}

test();
