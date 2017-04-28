#include "heaptable.h"

bool HeapTable::insert(int item) {
    if (table->lookup(item)) {
        std::cout << "error : item already exists\n";
        return false;
    } else {
        table->insert(item);
        heap->insert(item);
        return true;
    }
}

bool HeapTable::lookup(int item) {
    bool status = table->lookup(item);
    if (status) {
        std::cout << "found " << item << std::endl;
    } else {
        std::cout << item << " not found" << std::endl;
    }
    return status;
}

int HeapTable::deleteMax() {
    int max = heap->deleteMax();
    table->deleteItem(max);
    std::cout << max << std::endl;
    return max;
}

bool HeapTable::deleteItem(int item) {
    if (table->lookup(item)) {
        table->deleteItem(item);
        heap->deleteItem(item);
        return true;
    } else {
        std::cout << "error : item not present" << std::endl;
        return false;
    }
}

void HeapTable::print() {
    std::cout << *heap << std::endl;
}
