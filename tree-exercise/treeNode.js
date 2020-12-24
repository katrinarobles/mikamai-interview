const LEFT = 0;
const RIGHT = 1;

class TreeNode {
  constructor({ data = undefined } = {}) {
    this.data = data;
    this._children = [];
    this._parent = null;
  }

  addNode(data){
      const newNode = new TreeNode(data);

    if (this.root) {
      const { found, parent } = this.getNodeAt(data); // <1>
      if (found) { // duplicated: value already exist on the tree
        found = (found || 1) + 1; // <2>
      } else if (data < parent.data) {
        parent.setLeftAndUpdateParent(newNode);
      } else {
        parent.setRightAndUpdateParent(newNode);
      }
    } else {
      this.root = newNode;
    }

    this.size += 1;
    return newNode;
  }

  get left() {
    return this.descendents[LEFT];
  }

  set left(node) {
    this.descendents[LEFT] = node;
    if (node) {
      node.parent = this;
    }
  }

  get right() {
    return this.descendents[RIGHT];
  }

  set right(node) {
    this.descendents[RIGHT] = node;
    if (node) {
      node.parent = this;
    }
  }

  has(data) {
    return !!this.find(data);
  }

  find(data) {
    return this.getNodeAt(data).found;
  }


  getNodeAt(data, node = this.root, parent = null) {
    if (!node || node.data === data) {
      return { found: node, parent };
    } if (data < node.data) {
      return this.getNodeAt(data, node.left, node);
    }
    return this.getNodeAt(data, node.right, node);
  }

  getRightmost(node = this.root) {
    if (!node || !node.right) {
      return node;
    }
    return this.getMax(node.right);
  }

  getLeftmost(node = this.root) {
    if (!node || !node.left) {
      return node;
    }
    return this.getMin(node.left);
  }

  removeNode(data) {
    const { found: nodeToRemove, parent } = this.getNodeAt(data); // <1>

    if (!nodeToRemove) return false; // <2>

    // Combine left and right children into one subtree without nodeToRemove
    const removedNodeChildren = this.combineLeftIntoRightSubtree(nodeToRemove); // <3>

    if (nodeToRemove && nodeToRemove > 1) { // <4>
      nodeToRemove -= 1; // handles duplicated
    } else if (nodeToRemove === this.root) { // <5>
      // Replace (root) node to delete with the combined subtree.
      this.root = removedNodeChildren;
      if (this.root) { this.root.parent = null; } // clearing up old parent
    } else if (nodeToRemove.isParentLeftChild) { // <6>
      // Replace node to delete with the combined subtree.
      parent.setLeftAndUpdateParent(removedNodeChildren);
    } else {
      parent.setRightAndUpdateParent(removedNodeChildren);
    }

    this.size -= 1;
    return true;
  }
  // end::remove[]

  // tag::combine[]
  combineLeftIntoRightSubtree(node) {
    if (node.right) {
      const leftmost = this.getLeftmost(node.right);
      leftmost.setLeftAndUpdateParent(node.left);
      return node.right;
    }
    return node.left;
  }
  // end::combine[]

  // tag::bfs[]
  /**
   * Breath-first search for a tree (always starting from the root element).
   * @yields {BinaryTreeNode}
   */
  * bfs() {
    const queue = new Queue();

    queue.addNode(this.root);

    while (!queue.isEmpty()) {
      const node = queue.remove();
      yield node;

      if (node.left) { queue.addNode(node.left); }
      if (node.right) { queue.addNode(node.right); }
    }
  }
  // end::bfs[]

  // tag::dfs[]
  /**
   * Depth-first search for a tree (always starting from the root element)
   * @see preOrderTraversal Similar results to the pre-order transversal.
   * @yields {BinaryTreeNode}
   */
  * dfs() {
    const stack = new Stack();

    stack.addNode(this.root);

    while (!stack.isEmpty()) {
      const node = stack.remove();
      yield node;

      if (node.right) { stack.addNode(node.right); }
      if (node.left) { stack.addNode(node.left); }
    }
  }
  // end::dfs[]

  // tag::inOrderTraversal[]
  /**
   * In-order traversal on a tree: left-root-right.
   * If the tree is a BST, then the values will be sorted in ascendent order
   * @param {BinaryTreeNode} node first node to start the traversal
   * @yields {BinaryTreeNode}
   */
  * inOrderTraversal(node = this.root) {
    if (node && node.left) { yield* this.inOrderTraversal(node.left); }
    yield node;
    if (node && node.right) { yield* this.inOrderTraversal(node.right); }
  }
  // end::inOrderTraversal[]

  // tag::preOrderTraversal[]
  /**
   * Pre-order traversal on a tree: root-left-right.
   * Similar results to DFS
   * @param {BinaryTreeNode} node first node to start the traversal
   * @yields {BinaryTreeNode}
   */
  * preOrderTraversal(node = this.root) {
    yield node;
    if (node.left) { yield* this.preOrderTraversal(node.left); }
    if (node.right) { yield* this.preOrderTraversal(node.right); }
  }
  // end::preOrderTraversal[]

  // tag::postOrderTraversal[]
  /**
   * Post-order traversal on a tree: left-right-root.
   * @param {BinaryTreeNode} node first node to start the traversal
   * @yields {BinaryTreeNode}
   */
  * postOrderTraversal(node = this.root) {
    if (node.left) { yield* this.postOrderTraversal(node.left); }
    if (node.right) { yield* this.postOrderTraversal(node.right); }
    yield node;
  }
  // end::postOrderTraversal[]

  /**
   * Represent Binary Tree as an array.
   *
   * Leaf nodes will have two `undefined` descendents.
   *
   * The array representation of the binary tree is as follows:
   *
   * First element (index=0) is the root.
   * The following two elements (index=1,2) are descendents of the root: left (a) and right (b).
   * The next two elements (index=3,4) are the descendents of a
   * The next two elements (index=5,6) are the descendents of b and so on.
   *
   *  0     1            2             3       4        5       6        n
   * [root, a=root.left, b=root.right, a.left, a.right, b.left, b.right, ...]
   *
   * You can also find the parents as follows
   *
   * e.g.
   * Parent 0: children 1,2
   * Parent 1: children 3,4
   * Parent 2: children 5,6
   * Parent 3: children 7,8
   *
   * Given any index you can find the parent index with the following formula:
   *
   * parent = (index) => Math.floor((index-1)/2)
   */
  toArray() {
    const array = [];
    const queue = new Queue();
    const visited = new Map();

    if (this.root) { queue.addNode(this.root); }

    while (!queue.isEmpty()) {
      const current = queue.removeNode();
      array.push(current && current.value);

      if (current) { visited.set(current); }

      if (current && !visited.has(current.left)) { queue.addNode(current.left); }
      if (current && !visited.has(current.right)) { queue.addNode(current.right); }
    }

    return array;
  }
}


TreeNode.RIGHT = RIGHT;
TreeNode.LEFT = LEFT;
TreeNode.prototype.insert = TreeNode.prototype.addNode;
TreeNode.prototype.set = TreeNode.prototype.addNode;
TreeNode.prototype.delete = TreeNode.prototype.removeNode;
TreeNode.prototype.getMin = TreeNode.prototype.getLeftmost;
TreeNode.prototype.minDepth = TreeNode.prototype.getMin;
TreeNode.prototype.getMax = TreeNode.prototype.getRightmost;
TreeNode.prototype.maxDepth = TreeNode.prototype.getMax;
TreeNode.prototype.get = TreeNode.prototype.find;

module.exports = TreeNode;
