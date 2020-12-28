class MyNode {
  constructor(data) {
    this._data = data;
    this._children = [];
    this._parent = null;
  }

  addNode(data){
    if (this._children.length >= 2) {
        return null;
    } else {
        let newNode = new MyNode(data);
        newNode.setParent(this);
        this._children.push(newNode);

        return newNode;
    }
  }

  getNodeAt(pos) {
    if(this._children == null || this._children.length == 0 || this._children.length < pos) {
        return null;
    } else {
        return this._children[pos];
    }
  }

  parent() {
    return this._parent;
  }

  children() {
    return this._children;
  }

  data() {
    return this.data.toString();
  }

  maxDepth() {
    if(this._children == null || this._children.length === 0) {
        return 0;
    } else {
        return this.maxDepthHandler(this, 0);
    }
  }

  /**
   * @param {MyNode} node - The node
   * @param {int} num - The current depth
   */
  maxDepthHandler(node, num) {
      if(node.children() == null || node.children().length === 0) {
        return num;
    }

    if (node.getNodeAt(0) != null && node.getNodeAt(1) != null){
        return Math.max( this.maxDepthHandler(node.getNodeAt(0), num+1), this.maxDepthHandler(node.getNodeAt(1), num + 1));
      }  else if (node.getNodeAt(1) != null){
          return this.maxDepthHandler(node.getNodeAt(1), num+1);
      } else {
          return this.maxDepthHandler(node.getNodeAt(0), num+1);
      }
  }

  setParent(prt) {
      this._parent = prt;
  }

  setData(data) {
      this._data = data;
  }


}

module.exports = MyNode;
