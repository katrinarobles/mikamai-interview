var tree = new MyTree();
var firstNode = tree.root.addNode();
var secondNode = tree.root.addNode();
firstNode.addNode().addNode({ data: 'leaf1' });
firstNode.getNodeAt(0).addNode({ data: 'leaf2' });
console.log(tree.root.maxDepth())  // => 3
console.log(firstNode.maxDepth())  // => 2
console.log(secondNode.maxDepth()) // => 0
console.log(firstNode.parent())    // => MyNode {data: undefined, __children: Array(2), __parent: null}
