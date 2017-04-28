#include <vector>

class MaxHeap {

    private:
        std::vector<int> data;
        int size;
        void percolateUp(int index, std::vector<int> &target);//return the new index
        void percolateUp(int index);
        void percolateDown(int index, std::vector<int> &target);
        void percolateDown(int index);
        int left(int index) const;//get the INDEX of the item to the left
        int right(int index) const;//get the INDEX of the item to the right
        int parent(int index) const;//get the INDEX of the parent
        void print_helper(std::ostream& str, std::vector<int> &target); 
        void delete_helper(int item, int index);

    public:
        MaxHeap() : size(0) {}
        bool insert(int item);//return true if successful
        int getMax() const;//return the largest item in the heap
        int deleteMax();//delete the largest item and return it
        bool deleteItem(int item);//return true if successful
        int get(int index) const;//get the element at an index
        void print(std::ostream& str);
        friend std::ostream& operator<<(std::ostream& str, MaxHeap& data);
        

};
