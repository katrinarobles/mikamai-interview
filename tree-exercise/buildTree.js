const MyNode = require('./treeNode.js');
const MyTree = require('./myTree.js');


/*const tree = new MyTree();
console.log("ROOT");
console.log(tree.root);

console.log("\nSNICKS1");
console.log(tree.root.addNode("test1"));
console.log(tree.root);

console.log("\nSNICKS2");
console.log(tree.root.addNode("test2"));
console.log(tree.root);
*/
// var tree = new MyTree();
// var firstNode = tree.root.addNode('1st');
// var secondNode = tree.root.addNode('2nd');
// firstNode.addNode().addNode({ data: 'leaf1' });
// firstNode.getNodeAt(0).addNode({ data: 'leaf2' });
// firstNode.addNode('null').addNode('leaf1');
// firstNode.getNodeAt(0).addNode('leaf2');
// console.log(tree.root.maxDepth())  // => 3
// console.log(firstNode.maxDepth())  // => 2
// console.log(secondNode.maxDepth()) // => 0
// console.log(firstNode.parent())    // => MyNode {data: undefined, __children: Array(2), __parent: null}

var tree = new MyTree();
var firstNode = tree.root.addNode();
var secondNode = tree.root.addNode();
console.log(firstNode);
console.log(secondNode);
firstNode.addNode().addNode({ data: 'leaf1' });
firstNode.getNodeAt(0).addNode({ data: 'leaf2' });
console.log(tree.root.maxDepth())  // => 3
console.log(firstNode.maxDepth())  // => 2
console.log(secondNode.maxDepth()) // => 0
console.log(firstNode.parent())     // => MyNode {data: undefined, __children: Array(2), __parent: null}
