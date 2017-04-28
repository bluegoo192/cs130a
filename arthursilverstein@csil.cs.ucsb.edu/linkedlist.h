#include <iostream>

class LinkedList {

    struct Node {
        int data;
        Node* prev;
        Node* next;
        Node(int data, Node* prev, Node* next) : data(data), prev(prev), next(next) {}
    };

    Node* head;
    Node* tail;

    public:
        LinkedList(): head(nullptr), tail(nullptr) {}

        ~LinkedList() {
            Node* tmp;
            for (; head; head=tmp) {
                tmp = head->next;
                delete head;
            }
        }
        void append(int item);
        void deleteFirst(int item);//delete the first occurence of item
        void deleteTail();//delete the last item in the list
        void print(std::ostream& str) const;
        bool contains(int item);
        friend std::ostream& operator<<(std::ostream& str, const LinkedList& data);
};
