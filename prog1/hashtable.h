#include "linkedlist.h"
#include <vector>
#include <ostream>

class HashTable {

    private:
        std::vector<LinkedList> table;
        unsigned int hash(int item);

    public:
        HashTable() { table.resize(97); }
        bool insert(int item); //return true iff item wasn't already present, & was added successfully
        bool lookup(int item); //return true iff item is in the table
        bool deleteItem(int item); //return true iff item wasn't already present, & was deleted successfully

};
