#include <math.h>
#include "maxheap.h"
#include "linkedlist.h"

void printVector(std::ostream& str, std::vector<int> target) {
    str << "\nActual array: ";
    for (auto i = target.begin(); i!= target.end(); ++i) str << *i << " ";
    str << "\n";
}
int MaxHeap::left(int index) const {
    return (2*index)+1;
}
int MaxHeap::getSize() {
    return data.size();
}
int MaxHeap::right(int index) const {
    return (2*index)+2;
}
int MaxHeap::parent(int index) const {
    return (index-1)/2;
}
int MaxHeap::getMax() const {
    return data[0];
}
int MaxHeap::get(int index) const {
    return data[index];
}
void MaxHeap::percolateUp(int index, std::vector<int> &target) {
    //while data[index]>data[index parent], swap them
    if (index <= 0) { return; }
    int parent = this->parent(index);
    if (target[index] < target[parent]) { return; }
    int temp = target[index];
    target[index] = target[parent];
    target[parent] = temp;
    this->percolateUp(parent, target);
    //todo: percolate down from index
} 
void MaxHeap::percolateUp(int index) {
    percolateUp(index, data);
}
void MaxHeap::percolateDown(int index) {
    percolateDown(index, data);
}
void MaxHeap::percolateDown(int index, std::vector<int> &target) {
  //  printVector(std::cout, target);
    if (this->left(index) < target.size()) {
        int largerChildIndex = this->left(index);
        if ((target[this->right(index)] > target[largerChildIndex]) && (this->right(index) < target.size())) {
            largerChildIndex = this->right(index);
        }
//        std::cout << "\nPerc: larger child is " << target[largerChildIndex] << "@" << largerChildIndex << "; index is " << index << "\n";
        if (target.at(index) < target.at(largerChildIndex)) {//if target is smaller than it's largest child
            //swap them
            int temp = target.at(index);
            target.at(index) = target.at(largerChildIndex);
            target.at(largerChildIndex) = temp;
            this->percolateDown(largerChildIndex, target);//continue percolating
        } 
    } else { return; }

} 

bool MaxHeap::insert(int item) {
    data.push_back(item);
    this->percolateUp(size);
    size++;
    return true;
}
bool MaxHeap::deleteItem(int item) {
    this->delete_helper(item, 0);
    return true;
}
int MaxHeap::deleteMax() {
    int retval = data.at(0);
    data[0] = data[data.size() - 1];
    data.pop_back();
    this->percolateDown(0);
    return retval;
}
void MaxHeap::delete_helper(int item, int index) {
    if (index >= data.size()) { return; } //return if out of bounds
    if (data.at(index) == item) {
        data[index] = data.at(data.size() - 1);
        data.pop_back();
        this->percolateDown(index);
    } else {
        this->delete_helper(item, this->left(index));
        this->delete_helper(item, this->right(index));
    }
}
void MaxHeap::print(std::ostream& str = std::cout) {
    std::vector<int> backup = data;
    this->print_helper(str, backup);
}
void MaxHeap::print_helper(std::ostream& str, std::vector<int> &target) {
    //printVector(str, target);
    if (target.size() <= 0) { return; }//if the data is empty just return
    str << target[0] << " ";//append the largest element
    target[0] = target[target.size() - 1];//move the last element to the start
    target.pop_back();//remove the last element
    this->percolateDown(0, target);//reorder the heap
    this->print_helper(str, target);//rinse & repeat
}

std::ostream& operator<<(std::ostream& str, MaxHeap& data) {
    data.print(str);
    return str;
}
