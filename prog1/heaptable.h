#include "maxheap.h"
#include "hashtable.h"

class HeapTable {

    MaxHeap* heap;
    HashTable* table;

    public:
        HeapTable(): heap(new MaxHeap()), table(new HashTable) {}
        ~HeapTable() {
            delete heap;
            delete table;
        }

        bool insert(int item);
        bool lookup(int item);
        int deleteMax();
        bool deleteItem(int item);
        void print();

};
