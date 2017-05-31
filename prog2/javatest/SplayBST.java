import java.io.PrintStream;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Scanner;
import java.util.concurrent.BlockingQueue;

public class SplayBST<Key extends Comparable<Key>, Value>  {

    public Node root;   // root of the BST

    // BST helper node data type
    private class Node {
        private Key key;            // key
        private Value value;        // associated data
        private Node left, right;   // left and right subtrees

        public Node(Key key, Value value) {
            this.key   = key;
            this.value = value;
        }
    }

    public boolean contains(Key key) {
        return get(key) != null;
    }

    // return value associated with the given key
    // if no such value, return null
    public String get(Key key) {
        root = splay(root, key);
        int cmp = key.compareTo(root.key);
        if (cmp == 0) return "item "+key+" found";
        else          return "item "+key+" not found";
    }

    /***************************************************************************
     *  Splay tree insertion.
     ***************************************************************************/
    public String put(Key key, Value value) {
        // splay key to root
        if (root == null) {
            root = new Node(key, value);
            return "item "+key+" inserted";
        }

        root = splay(root, key);

        int cmp = key.compareTo(root.key);

        // Insert new node at root
        if (cmp < 0) {
            Node n = new Node(key, value);
            n.left = root.left;
            n.right = root;
            root.left = null;
            root = n;
            return "item "+key+" inserted";
        }

        // Insert new node at root
        else if (cmp > 0) {
            Node n = new Node(key, value);
            n.right = root.right;
            n.left = root;
            root.right = null;
            root = n;
            return "item "+key+" inserted";
        }

        // It was a duplicate key. Simply replace the value
        else {
            return "item "+key+" not inserted ; already present";
        }

    }

    /***************************************************************************
     *  Splay tree deletion.
     ***************************************************************************/
    /* This splays the key, then does a slightly modified Hibbard deletion on
     * the root (if it is the node to be deleted; if it is not, the key was
     * not in the tree). The modification is that rather than swapping the
     * root (call it node A) with its successor, it's successor (call it Node B)
     * is moved to the root position by splaying for the deletion key in A's
     * right subtree. Finally, A's right child is made the new root's right
     * child.
     */
    public String remove(Key key) {
        if (root == null) return "item "+key+" not deleted ; not present"; // empty tree

        root = splay(root, key);

        int cmp = key.compareTo(root.key);

        if (cmp == 0) {
            if (root.left == null) {
                root = root.right;
            }
            else {
                Node x = root.right;
                root = root.left;
                splay(root, key);
                root.right = x;
            }
            return "item "+key+" deleted";
        }
        return "item "+key+" not deleted ; not present";
        // else: it wasn't in the tree to remove
    }


    /***************************************************************************
     * Splay tree function.
     * **********************************************************************/
    // splay key in the tree rooted at Node h. If a node with that key exists,
    //   it is splayed to the root of the tree. If it does not, the last node
    //   along the search path for the key is splayed to the root.
    private Node splay(Node h, Key key) {
        if (h == null) return null;

        int cmp1 = key.compareTo(h.key);

        if (cmp1 < 0) {
            // key not in tree, so we're done
            if (h.left == null) {
                return h;
            }
            int cmp2 = key.compareTo(h.left.key);
            if (cmp2 < 0) {
                h.left.left = splay(h.left.left, key);
                h = rotateRight(h);
            }
            else if (cmp2 > 0) {
                h.left.right = splay(h.left.right, key);
                if (h.left.right != null)
                    h.left = rotateLeft(h.left);
            }

            if (h.left == null) return h;
            else                return rotateRight(h);
        }

        else if (cmp1 > 0) {
            // key not in tree, so we're done
            if (h.right == null) {
                return h;
            }

            int cmp2 = key.compareTo(h.right.key);
            if (cmp2 < 0) {
                h.right.left  = splay(h.right.left, key);
                if (h.right.left != null)
                    h.right = rotateRight(h.right);
            }
            else if (cmp2 > 0) {
                h.right.right = splay(h.right.right, key);
                h = rotateLeft(h);
            }

            if (h.right == null) return h;
            else                 return rotateLeft(h);
        }

        else return h;
    }

    public void print() {
        LinkedList<Node> q = new LinkedList<>();
        q.add(this.root);
        int count = 0;
        while (q.peek() != null) {
            count = q.size();
            for (int i=0; i<count; i++) {
                Node current = q.poll();
                if (i==0) {
                    System.out.println();
                    System.out.print(current.value);
                } else {
                    System.out.print(", "+current.value);
                }
                if (current.left != null) q.add(current.left);
                if (current.right != null) q.add(current.right);
            }
        }
        System.out.println();
    }

    public String dprint(Node n) {
        if (n == null) return "[]";
        return ("[ "+n.value+dprint(n.left)+dprint(n.right)+" ]");
    }


    /***************************************************************************
     *  Helper functions.
     ***************************************************************************/

    // height of tree (1-node tree has height 0)
    public int height() { return height(root); }
    private int height(Node x) {
        if (x == null) return -1;
        return 1 + Math.max(height(x.left), height(x.right));
    }


    public int size() {
        return size(root);
    }

    private int size(Node x) {
        if (x == null) return 0;
        else return 1 + size(x.left) + size(x.right);
    }

    // right rotate
    private Node rotateRight(Node h) {
        Node x = h.left;
        h.left = x.right;
        x.right = h;
        return x;
    }

    // left rotate
    private Node rotateLeft(Node h) {
        Node x = h.right;
        h.right = x.left;
        x.left = h;
        return x;
    }

    // test client
    public static void main(String[] args) {
        SplayBST<Integer, Integer> tree = new SplayBST<Integer, Integer>();
        Scanner in = new Scanner(System.in);
        String command = in.nextLine();
        tree.put(1,1);
        tree.put(3,3);
        tree.put(5,5);
        tree.put(2,2);
        tree.put(6,6);
        tree.put(6,6);
        tree.remove(7);
        tree.remove(1);
        while (command != null) {
            String[] words = command.split(" ");
            if (words[0].equals("insert")) System.out.println(tree.put(Integer.parseInt(words[1]), Integer.parseInt(words[1])));
            if (words[0].equals("find")) System.out.println(tree.get(Integer.parseInt(words[1])));
            if (words[0].equals("delete")) System.out.println(tree.remove(Integer.parseInt(words[1])));
            if (words[0].equals("print")) {
                tree.print();
                return;
            }
            if (words[0].equals("dprint")) System.out.println(tree.dprint(tree.root));
            command = in.nextLine();
        }
    }

}


