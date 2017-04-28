#include "hashtable.h"

unsigned int HashTable::hash(int item) {
    return item%97;//stub
}

bool HashTable::lookup(int item) {
    int hash = this->hash(item);
    return table[hash].contains(item);
}

bool HashTable::insert(int item) {
    int hash = this->hash(item);
    if (this->lookup(item)) { return false; }
    table[hash].append(item);
    return true;
}

bool HashTable::deleteItem(int item) {
    if (!this->lookup(item)) { return false; }
    int hash = this->hash(item);
    table[hash].deleteFirst(item);
    return true;
}
