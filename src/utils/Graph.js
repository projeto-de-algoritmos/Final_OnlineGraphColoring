export class Graph {
    constructor() {
      this.nodes = [];
      this.edges = {};
      this.colors = {};
    }
  
    addNode(node) {
      this.nodes.push(node);
      this.edges[node] = [];
      this.colors[node] = -1;
    }
  
    addEdge(node1, node2) {
      if (node1 !== node2) {
        this.edges[node1].push(node2); 
        this.edges[node2].push(node1);        
      }
    }
  }
  
  export class FormatedGraph {
    constructor() {
      this.nodes = [];
      this.links = [];
    }
  
    addNode(node) {
      this.nodes.push(node);
    }
  
    addLink(Link) {
      this.links.push(Link);
    }
  }
  
  export class Node {
    constructor(id) {
      this.id = id;
      this.val = 1;
      this.color = "#121212";
    }
  
    toDict() {
      return { id: this.id, val: this.val, color: this.color };
    }
  }
  
  export class Link {
    constructor(source, target) {
      this.source = source;
      this.target = target;
    }
  
    toDict() {
      return { source: this.source, target: this.target.toString() };
    }
  }
  