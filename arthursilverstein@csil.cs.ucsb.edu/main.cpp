#include <iostream>
#include <string>
#include "heaptable.h"

int main() {
    HeapTable ht;
    std::string command;
    std::cin >> command;//get the size(first line). should be 97
    std::cin >> command;//get the number of commands(2nd line)
    std::string param;
    while (std::cin >> command) {
        if (command == "insert") {
            std::cin >> param;
            ht.insert(std::stoi(param));
        } else if (command == "delete") {
            std::cin >> param;
            ht.deleteItem(std::stoi(param));
        } else if (command == "lookup") {
            std::cin >> param;
            ht.lookup(std::stoi(param));
        } else if (command == "deleteMax") {
            ht.deleteMax();
        } else if (command == "print") {
            ht.print();
        }
    }
    return 0;
}
