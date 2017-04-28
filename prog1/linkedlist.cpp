#include "linkedlist.h"

void LinkedList::append(int item) {
    if (head == nullptr) {
        head = new Node(item, nullptr, nullptr);
        tail = head;
    } else {
        tail->next = new Node(item, tail, nullptr);
        tail = tail->next;
    }
}

void LinkedList::deleteFirst(int item) {
    if (head == nullptr) {
        return;
    }
    Node* cursor = head;
    while (cursor != NULL) {//while our cursor exists
        if (cursor->data == item) {//if we've found our item
            if (cursor->prev != NULL) {//if there's an element before this
                cursor->prev->next = cursor->next;//move prev's next to the next node, skipping this one
            } else {
                head = cursor->next;
            }
            if (cursor->next != NULL) {//if there's an element after this
                cursor->next->prev = cursor->prev;//move next's prev to the prev node, skipping this one
            }
            delete cursor;
            return;
        }
        cursor = cursor->next;
    }
}

void LinkedList::print(std::ostream& str = std::cout) const {
    Node* cursor = head;
    while (cursor != NULL) {
        str << cursor->data << "\n";
        cursor = cursor->next;
    }
}

bool LinkedList::contains(int item) {
    if (head == nullptr) { return false; }
    Node* cursor = head;
    while (cursor != nullptr) {
        if (cursor->data == item) { return true; }
        cursor = cursor->next;
    }
    return false;
}

std::ostream& operator<<(std::ostream& str, const LinkedList& data) {
    data.print(str);
    return str;
}
